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
        page.wait_for_selector(".app-shell")

        assert page.title() == "Alex"
        assert "Alex" in page.locator(".brand").inner_text()

        initial_pages = page.locator(".page-row").count()
        page.locator('[data-action="new-page"]').click()
        assert page.locator(".page-row").count() == initial_pages + 1

        page.locator('[data-action="duplicate-page"]').click()
        assert page.locator(".page-row").count() == initial_pages + 2

        page.locator('[data-action="move-page-up"]').click()
        assert page.locator('[data-testid="page-indicator"]').inner_text()

        page.locator('[data-preset="pencil"]').click()
        assert "selected" in page.locator('[data-preset="pencil"]').get_attribute("class")

        page.locator('[data-paper="dot"]').click()
        assert "paper-dot" in page.locator("#book-spread").get_attribute("class")

        page.locator('[data-cover="mint"]').click()
        assert "selected" in page.locator('[data-cover="mint"]').get_attribute("class")

        page.locator('[data-action="zoom-in"]').click()
        assert "110%" in page.locator('[data-testid="zoom-readout"]').inner_text()
        page.locator('[data-action="reset-view"]').click()
        assert "100%" in page.locator('[data-testid="zoom-readout"]').inner_text()

        page.locator('[data-sticker]').first.click()
        assert page.locator("#element-size").count() == 1
        page.locator("#element-size").evaluate("(input) => { input.value = 55; input.dispatchEvent(new Event('input', { bubbles: true })); }")
        selected_font_size = page.locator("[data-element].selected").evaluate(
            "(element) => window.getComputedStyle(element).fontSize"
        )
        assert selected_font_size == "55px"
        page.locator('[data-action="nudge-right"]').click()

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
