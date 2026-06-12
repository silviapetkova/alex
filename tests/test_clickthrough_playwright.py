from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import sys
import threading

import pytest


pytest.importorskip("playwright.sync_api")
from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
STORAGE_KEY = "alex-journal-prototype"


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass


@pytest.fixture()
def app_url():
    server = ThreadingHTTPServer(("127.0.0.1", 0), QuietHandler)
    port = server.server_address[1]
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    old_cwd = Path.cwd()
    try:
        import os

        os.chdir(ROOT)
        thread.start()
        yield f"http://127.0.0.1:{port}/index.html"
    finally:
        os.chdir(old_cwd)
        server.shutdown()


def test_alex_notebook_clickthrough(app_url):
    if sys.platform.startswith("win"):
        pytest.skip("Run this Playwright click-through test from WSL/Linux; Windows blocks browser automation in this Codex session.")

    try:
        manager = sync_playwright()
        p = manager.__enter__()
    except PermissionError as error:
        pytest.skip(f"Playwright browser automation is blocked by OS permissions: {error}")

    try:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page_errors = []
        page.on("pageerror", lambda error: page_errors.append(str(error)))

        page.goto(app_url, wait_until="load")
        page.wait_for_selector(".onboarding-screen")

        assert page.get_by_text("Make your first cozy notebook", exact=True).is_visible()
        page.locator('[data-action="create-sample-notebook"]').click()
        page.wait_for_selector(".app-shell")
        assert "Start Here" in page.locator(".journal-switch").inner_text()

        page.locator('[data-action="go-library"]').click()
        page.wait_for_selector(".library-home")

        assert page.title() == "Alex"
        assert "Alex" in page.locator(".brand").inner_text()
        assert page.get_by_text("Your cozy notebook shelf", exact=True).is_visible()
        page.locator('[data-action="go-settings"]').click()
        page.wait_for_selector(".settings-screen")
        page.locator('[data-setting-key="theme"][data-setting-value="mint"]').click()
        assert page.locator("body").get_attribute("data-theme") == "mint"
        page.locator('[data-setting-key="defaultPaper"][data-setting-value="grid"]').click()
        page.locator('[data-setting-key="defaultPenPreset"][data-setting-value="marker"]').click()
        page.locator('[data-setting-key="startupView"][data-setting-value="editor"]').click()
        page.locator('[data-action="go-library"]').click()
        page.wait_for_selector(".library-home")
        page.keyboard.press("Control+K")
        assert page.locator("#library-search").evaluate("(input) => document.activeElement === input")
        page.locator("#library-search").fill("Planning")
        assert page.locator(".page-result").count() >= 1
        page.locator(".page-result").first.click()
        page.wait_for_selector(".app-shell")
        assert "Start Here" in page.locator(".journal-switch").inner_text()
        assert page.locator('[data-testid="page-indicator"]').inner_text().startswith("2 /")
        page.locator('[data-action="go-library"]').click()
        page.wait_for_selector(".library-home")
        page.locator("#library-search").fill("")
        assert page.locator(".notebook-preview-strip .page-preview").count() >= 1
        assert page.locator("[data-open-journal]").count() >= 2
        page.locator("[data-open-journal]").first.click()
        page.wait_for_selector(".app-shell")

        assert "Alex" in page.locator(".brand").inner_text()
        page.locator('[data-action="go-library"]').click()
        page.wait_for_selector(".library-home")
        page.locator("[data-open-journal]").first.click()
        page.wait_for_selector(".app-shell")

        page.locator('.asset-tabs [data-inspector-tab="Pages"]').click()
        assert page.locator(".page-actions").count() == 1
        assert page.locator(".page-row .page-preview").count() >= 1
        initial_pages = page.locator(".page-row").count()
        page.keyboard.press("Control+N")
        assert page.locator(".page-row").count() == initial_pages + 1
        initial_pages += 1
        page.locator('[data-action="new-page"]').click()
        assert page.locator(".page-row").count() == initial_pages + 1

        page.locator('[data-action="duplicate-page"]').click()
        assert page.locator(".page-row").count() == initial_pages + 2

        page.locator('[data-action="move-page-up"]').click()
        assert page.locator('[data-testid="page-indicator"]').inner_text()

        page.locator('[data-action="toggle-journal-menu"]').click()
        assert page.locator(".journal-menu").is_visible()
        journal_menu_items = page.locator(".journal-menu-item")
        assert journal_menu_items.count() >= 2
        current_journal_title = page.locator(".journal-switch").inner_text()
        journal_menu_items.nth(1).click()
        assert page.locator(".journal-switch").inner_text() != current_journal_title
        assert page.locator(".journal-menu").count() == 0

        page.locator('.asset-tabs [data-inspector-tab="Pens"]').click()
        page.locator('[data-preset="pencil"]').click()
        assert "selected" in page.locator('[data-preset="pencil"]').get_attribute("class")

        page.locator('.asset-tabs [data-inspector-tab="Paper"]').click()
        page.locator('[data-paper="dot"]').click()
        assert "paper-dot" in page.locator("#book-spread").get_attribute("class")
        page.locator('.template-list [data-template="habit"]').click()
        assert page.locator(".habit-check").count() == 35
        first_habit_check = page.locator(".habit-check").first
        assert first_habit_check.get_attribute("aria-pressed") == "false"
        first_habit_check.click()
        assert first_habit_check.get_attribute("aria-pressed") == "true"
        page.wait_for_function(
            """(key) => {
                const stored = JSON.parse(window.localStorage.getItem(key));
                const journal = stored.journals.find((entry) => entry.id === stored.activeJournal);
                const page = journal.pages.find((entry) => entry.id === stored.activePageId);
                return page.habitChecks && page.habitChecks["h-0-0"] === true;
            }""",
            arg=STORAGE_KEY,
            timeout=2000,
        )
        page.once("dialog", lambda dialog: dialog.accept("Stretch"))
        page.locator('[data-habit-name="0"]').click()
        assert page.locator('[data-habit-name="0"]').inner_text() == "Stretch"
        page.once("dialog", lambda dialog: dialog.accept("Sleep"))
        page.locator('[data-action="add-habit-row"]').click()
        assert page.locator("[data-habit-name]").count() == 6
        page.locator('[data-habit-layout="month"]').click()
        assert page.locator(".habit-check").count() == 186
        page.once("dialog", lambda dialog: dialog.accept())
        page.locator('[data-habit-remove="5"]').click()
        assert page.locator("[data-habit-name]").count() == 5
        assert page.evaluate(
            """(key) => {
                const stored = JSON.parse(window.localStorage.getItem(key));
                const journal = stored.journals.find((entry) => entry.id === stored.activeJournal);
                const page = journal.pages.find((entry) => entry.id === stored.activePageId);
                return page.habitRows[0] === "Stretch" && page.habitLayout === "month";
            }""",
            STORAGE_KEY,
        )

        page.locator('[data-cover="mint"]').click()
        assert "selected" in page.locator('[data-cover="mint"]').get_attribute("class")
        assert "mint" in page.locator(".journal-row.selected .cover").get_attribute("class")
        assert page.evaluate(
            """(key) => {
                const stored = JSON.parse(window.localStorage.getItem(key));
                const journal = stored.journals.find((entry) => entry.id === stored.activeJournal);
                return journal.cover;
            }""",
            STORAGE_KEY,
        ) == "mint"

        page.locator('.asset-tabs [data-inspector-tab="Marks"]').click()
        assert page.locator("#sticker-search").count() == 1
        assert page.locator(".page-actions").count() == 0

        page.locator('[data-action="zoom-in"]').click()
        assert "110%" in page.locator('[data-testid="zoom-readout"]').inner_text()
        page.keyboard.press("Control+0")
        assert "100%" in page.locator('[data-testid="zoom-readout"]').inner_text()
        page.keyboard.press("Control+=")
        assert "110%" in page.locator('[data-testid="zoom-readout"]').inner_text()
        page.locator('[data-action="reset-view"]').click()
        assert "100%" in page.locator('[data-testid="zoom-readout"]').inner_text()

        page.locator('[data-sticker]').first.click()
        page.locator('.asset-tabs [data-inspector-tab="Pens"]').click()
        assert page.locator("#element-size").count() == 1
        page.locator("#element-size").evaluate("(input) => { input.value = 55; input.dispatchEvent(new Event('input', { bubbles: true })); }")
        selected_font_size = page.locator("[data-element].selected").evaluate(
            "(element) => window.getComputedStyle(element).fontSize"
        )
        assert selected_font_size == "55px"
        page.locator('[data-action="undo"]').click()
        page.wait_for_function(
            "() => window.getComputedStyle(document.querySelector('[data-element].selected')).fontSize !== '55px'",
            timeout=2000,
        )
        page.locator('[data-action="redo"]').click()
        page.wait_for_function(
            "() => window.getComputedStyle(document.querySelector('[data-element].selected')).fontSize === '55px'",
            timeout=2000,
        )
        page.locator("#element-rotation").evaluate("(input) => { input.value = 25; input.dispatchEvent(new Event('input', { bubbles: true })); }")
        selected_transform = page.locator("[data-element].selected").get_attribute("style")
        assert "rotate(25deg)" in selected_transform
        selected_count = page.locator("[data-element]").count()
        page.locator('[data-action="duplicate-element"]').click()
        assert page.locator("[data-element]").count() == selected_count + 1
        page.locator('[data-action="send-back"]').click()
        page.locator('[data-action="bring-front"]').click()
        page.locator('[data-action="nudge-right"]').click()

        page.locator('.asset-tabs [data-inspector-tab="Export"]').click()
        assert page.get_by_text("Export Page PNG", exact=True).is_visible()
        assert page.get_by_text("Export Notebook PDF", exact=True).is_visible()
        assert page.get_by_text("Backup Notebook JSON", exact=True).is_visible()
        assert page.locator(".backup-reminder").is_visible()
        assert "Last saved:" in page.locator(".export-note").first.inner_text()
        exported_notebook_title = page.locator(".journal-switch").inner_text().split("\n")[0].strip()
        page.evaluate(
            """() => {
                window.__alexPrintedHtml = "";
                window.__alexPrintCalled = false;
                window.open = () => ({
                    document: {
                        open() {},
                        write(html) { window.__alexPrintedHtml = html; },
                        close() {},
                    },
                    focus() {},
                    print() { window.__alexPrintCalled = true; },
                });
            }"""
        )
        page.locator('[data-action="export-notebook-pdf"]').first.click()
        page.wait_for_function("() => window.__alexPrintCalled === true", timeout=2000)
        printed_html = page.evaluate("() => window.__alexPrintedHtml")
        assert exported_notebook_title in printed_html
        assert "print-page" in printed_html

        with page.expect_download() as page_png:
            page.locator('[data-action="export-page-png"]').first.click()
        assert page_png.value.suggested_filename.endswith(".png")

        with page.expect_download() as notebook_json:
            page.locator('[data-action="export-notebook"]').first.click()
        assert notebook_json.value.suggested_filename.endswith(".alex-notebook.json")
        page.locator('.asset-tabs [data-inspector-tab="Export"]').click()
        assert page.locator(".backup-reminder").count() == 0

        sample_pdf = ROOT / "tests" / "worksheet-import-test.pdf"
        sample_pdf.write_bytes(
            b"%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n"
            b"2 0 obj<</Type/Pages/Count 0>>endobj\n"
            b"trailer<</Root 1 0 R>>\n%%EOF"
        )
        page.locator("#pdf-import").set_input_files(str(sample_pdf))
        page.wait_for_selector(".canvas-pdf")
        sample_pdf.unlink(missing_ok=True)
        assert "worksheet" in page.locator(".page-row.selected strong").inner_text().lower()
        assert page.locator(".canvas-pdf").count() == 1

        page.locator('[data-tool="pen"]').click()
        canvas = page.locator("#ink-layer")
        box = canvas.bounding_box()
        assert box
        page.mouse.move(box["x"] + 120, box["y"] + 120)
        page.mouse.down()
        page.mouse.move(box["x"] + 180, box["y"] + 170)
        page.mouse.move(box["x"] + 250, box["y"] + 145)
        page.mouse.up()

        page.wait_for_function(
            "(key) => window.localStorage.getItem(key) !== null",
            arg=STORAGE_KEY,
            timeout=2000,
        )
        before_undo = page.evaluate("(key) => window.localStorage.getItem(key)", STORAGE_KEY)
        assert before_undo

        page.locator('[data-action="undo"]').click()
        page.wait_for_function(
            """([key, previous]) => {
                const current = window.localStorage.getItem(key);
                return current && current !== previous;
            }""",
            arg=[STORAGE_KEY, before_undo],
            timeout=2000,
        )
        after_undo = page.evaluate("(key) => window.localStorage.getItem(key)", STORAGE_KEY)
        assert after_undo and after_undo != before_undo

        page.locator('[data-action="redo"]').click()
        page.wait_for_function(
            """([key, previous]) => {
                const current = window.localStorage.getItem(key);
                return current && current !== previous;
            }""",
            arg=[STORAGE_KEY, after_undo],
            timeout=2000,
        )
        after_redo = page.evaluate("(key) => window.localStorage.getItem(key)", STORAGE_KEY)
        assert after_redo and after_redo != after_undo

        assert page_errors == []
        browser.close()
    finally:
        manager.__exit__(None, None, None)
