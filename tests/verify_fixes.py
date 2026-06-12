"""Standalone browser verification for the bug fixes (runs on Windows).

Usage: python tests/verify_fixes.py  (requires a server on :4173)
"""
import json
import sys
import time

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:4173"
STORAGE_KEY = "alex-journal-prototype"


def ink_pixels(page):
    return page.evaluate(
        """() => {
          const c = document.getElementById('ink-layer');
          if (!c) return -1;
          const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
          let n = 0;
          for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n += 1;
          return n;
        }"""
    )


def storage(page):
    raw = page.evaluate(f"() => localStorage.getItem('{STORAGE_KEY}')")
    return json.loads(raw) if raw else {}


def active_page(page):
    data = storage(page)
    journals = data.get("journals", [])
    journal = next((j for j in journals if j["id"] == data.get("activeJournal")), None)
    if not journal:
        return {}
    return next((p for p in journal["pages"] if p["id"] == data.get("activePageId")), {})


def run():
    failures = []
    with sync_playwright() as p:
        try:
            browser = p.chromium.launch()
        except Exception:
            browser = p.firefox.launch()
        page = browser.new_page(viewport={"width": 1280, "height": 900})
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))

        page.goto(BASE, wait_until="domcontentloaded")
        page.wait_for_selector(".onboarding-screen", timeout=5000)
        page.click("[data-action='create-sample-notebook']")
        page.wait_for_selector(".app-shell", timeout=5000)

        # Churn renders: with the stacking-listener bug, each of these
        # would have added another document-level click handler.
        for tab in ["Pages", "Paper", "Pens", "Paper", "Pages", "Paper"]:
            page.click(f"[data-inspector-tab='{tab}']")
            page.wait_for_timeout(50)

        # --- Habit tracker: one click must toggle exactly once ---
        page.click("[data-template='habit']")
        page.click("[data-tool='select']")  # leave pen mode so the page is tappable
        check = "[data-habit-row='0'][data-habit-day='0']"
        page.wait_for_selector(check)
        before = page.get_attribute(check, "aria-pressed")
        page.click(check)
        page.wait_for_timeout(100)
        after = page.get_attribute(check, "aria-pressed")
        if before == after:
            failures.append(f"habit check did not toggle (stuck at {before})")
        page.click(check)
        page.wait_for_timeout(100)
        again = page.get_attribute(check, "aria-pressed")
        if again != before:
            failures.append(f"habit double-toggle broken: {before} -> {after} -> {again}")

        # --- Mood tracker: select + deselect, persisted ---
        mood = "[data-mood-day='2']"
        page.click(mood)
        page.wait_for_timeout(300)
        cls = page.get_attribute(mood, "class") or ""
        if "selected" not in cls:
            failures.append("mood button did not select on click")
        saved = active_page(page).get("moodChecks", {})
        if saved.get("m-2") != 2:
            failures.append(f"mood not persisted, moodChecks={saved}")
        page.click(mood)
        page.wait_for_timeout(300)
        cls = page.get_attribute(mood, "class") or ""
        if "selected" in cls:
            failures.append("mood button did not deselect on second click")

        # --- Ink survives re-renders ---
        page.click("[data-tool='pen']")
        canvas = page.locator("#ink-layer")
        box = canvas.bounding_box()
        cx, cy = box["x"] + box["width"] / 2, box["y"] + box["height"] / 2
        page.mouse.move(cx, cy)
        page.mouse.down()
        for i in range(1, 12):
            page.mouse.move(cx + i * 6, cy + (i % 3) * 4)
        page.mouse.up()
        page.wait_for_timeout(300)
        drawn = ink_pixels(page)
        if drawn <= 0:
            failures.append(f"drawing produced no ink pixels ({drawn})")
        page.click("[data-tool='select']")
        page.click(check)  # forces a full re-render
        page.wait_for_timeout(300)
        survived = ink_pixels(page)
        if survived <= 0:
            failures.append(f"ink vanished after re-render ({drawn} -> {survived})")
        page.click("[data-action='undo']")
        page.wait_for_timeout(300)

        # --- Reading log: type, rate, add a second book, remove it ---
        page.click("[data-template='reading']")
        title_input = "[data-reading-field='title'][data-reading-index='0']"
        page.wait_for_selector(title_input)
        page.fill(title_input, "The Secret Garden")
        page.wait_for_timeout(400)
        page.click("[data-rating='4'][data-reading-index='0']")
        page.wait_for_timeout(400)
        stars = page.locator(".rating-star.filled").count()
        if stars != 4:
            failures.append(f"expected 4 filled stars, got {stars}")
        value = page.input_value(title_input)
        if value != "The Secret Garden":
            failures.append(f"title input lost text after rating click: '{value}'")
        entry = (active_page(page).get("readingEntries") or [{}])[0]
        if entry.get("title") != "The Secret Garden" or entry.get("rating") != 4:
            failures.append(f"reading entry not persisted: {entry}")
        page.click("[data-reading-add]")
        page.wait_for_timeout(300)
        cards = page.locator(".reading-card").count()
        if cards != 2:
            failures.append(f"expected 2 reading cards after add, got {cards}")
        page.fill("[data-reading-field='title'][data-reading-index='1']", "Anne of Green Gables")
        page.wait_for_timeout(400)
        entries = active_page(page).get("readingEntries") or []
        if len(entries) != 2 or entries[1].get("title") != "Anne of Green Gables":
            failures.append(f"second book not persisted: {entries}")
        page.once("dialog", lambda d: d.accept())
        page.click("[data-reading-remove='1']")
        page.wait_for_timeout(400)
        entries = active_page(page).get("readingEntries") or []
        if len(entries) != 1 or entries[0].get("title") != "The Secret Garden":
            failures.append(f"remove book failed: {entries}")

        # --- Daily page: toggle a task, edit schedule, persists ---
        page.click("[data-template='daily']")
        task_check = "[data-daily-task='0']"
        page.wait_for_selector(task_check)
        page.fill("[data-daily-field='task'][data-daily-index='0']", "water the plants")
        page.wait_for_timeout(400)
        page.click(task_check)
        page.wait_for_timeout(300)
        pressed = page.get_attribute(task_check, "aria-pressed")
        if pressed != "true":
            failures.append(f"daily task did not toggle done, aria-pressed={pressed}")
        task_value = page.input_value("[data-daily-field='task'][data-daily-index='0']")
        if task_value != "water the plants":
            failures.append(f"daily task text lost after toggle: '{task_value}'")
        page.fill("[data-daily-field='schedule'][data-daily-index='0']", "8:00 slow breakfast")
        page.wait_for_timeout(400)
        saved_daily = (active_page(page).get("templateData") or {}).get("daily", {})
        if not saved_daily.get("topThree", [{}])[0].get("done"):
            failures.append(f"daily task done not persisted: {saved_daily}")
        if saved_daily.get("schedule", [""])[0] != "8:00 slow breakfast":
            failures.append(f"daily schedule not persisted: {saved_daily}")

        # --- Weekly page: real dates + editable entries ---
        page.click("[data-template='week']")
        page.wait_for_selector("[data-week-day='0'][data-week-slot='0']")
        import datetime
        monday = datetime.date.today() - datetime.timedelta(days=datetime.date.today().weekday())
        shown = page.text_content(".day-row .date-card strong")
        if shown != str(monday.day):
            failures.append(f"weekly Monday shows {shown}, expected {monday.day}")
        page.fill("[data-week-day='2'][data-week-slot='0']", "library trip")
        page.wait_for_timeout(400)
        saved_week = (active_page(page).get("templateData") or {}).get("weekly", {})
        if saved_week.get("2", ["", ""])[0] != "library trip":
            failures.append(f"weekly entry not persisted: {saved_week}")

        # --- Storage warning stays out of the layout flow ---
        position = page.eval_on_selector("#storage-warning", "el => getComputedStyle(el).position")
        if position != "fixed":
            failures.append(f"storage warning position is '{position}', expected fixed")

        # --- Reload: app boots cleanly (default startup is the library) ---
        page.reload(wait_until="domcontentloaded")
        page.wait_for_selector(".app-shell, .library-home", timeout=5000)

        if errors:
            failures.append(f"page errors: {errors}")
        browser.close()

    if failures:
        print("FAILURES:")
        for f in failures:
            print("  -", f)
        sys.exit(1)
    print("All browser checks passed.")


if __name__ == "__main__":
    run()
