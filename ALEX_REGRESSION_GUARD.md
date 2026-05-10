# Alex Regression Guard

Use this before **every** Codex/Coding-agent change. The goal is to stop the “fix one thing, break another” loop.

## Current protected baseline

- Last committed baseline before today’s guard: `085449f Add safe notebook deletion and polish app workflows`
- Current uncommitted working state had automated checks passing on 2026-05-10:
  - `python -m pytest tests/test_static_app.py tests/test_clickthrough_playwright.py -q` → `9 passed`
  - `node --check src/app.js` → passed
- Alex automation cron is paused: `alex-app-slow-quality-progress` / `23ec60cc2725`

Do not resume broad automated work until a human says the app feels safe again.

## Hard rule for Codex

Codex must do **one narrow fix at a time**. No broad redesigns, no unrelated cleanup, no “while I’m here” refactors.

For every requested fix, Codex must:

1. State the exact files it plans to touch.
2. Add or update a regression check if the fix changes behavior.
3. Run the automated gate below.
4. Report any failures instead of continuing blindly.
5. Stop after the narrow fix; wait for the next instruction.

## Do-not-break checklist

These must keep working after every change:

- Notebook switching works.
- Notebook menu/dropdown opens and closes reliably.
- Safe notebook deletion still protects the last notebook and confirms destructive deletion.
- Page switching works.
- Page add/delete/duplicate/reorder behavior still works.
- Left rail panels switch correctly: Pages, Pens, Paper, Marks, Export.
- Drawing/ink still works on the page.
- Text note creation, selection, editing, moving, and deletion still work.
- Stickers/marks can still be added, selected, moved, resized, and deleted.
- Washi/tape patterns still display correctly.
- Paper/template/background selection still works.
- Export/print/download controls do not break.
- Local save/status/localStorage behavior still works.
- iPad/touch basics remain usable: no accidental footer triggers while writing; controls remain reachable.
- Responsive layout must not introduce horizontal overflow on iPad landscape or cramped split-screen widths.
- No console-breaking JavaScript errors.
- Service worker/cache changes must not strand users on stale broken assets.

## Automated regression gate

Run from the project root:

```bash
python -m pytest tests/test_static_app.py tests/test_clickthrough_playwright.py -q
node --check src/app.js
git diff --stat
```

If UI/layout/touch behavior changed, also do a browser smoke check on:

```text
http://127.0.0.1:4173/index.html
```

Check:

```js
document.documentElement.scrollWidth <= window.innerWidth
```

at least for iPad landscape and a narrow iPad/split-view size.

## Real iPad manual gate

Before saying a touch/Pencil-heavy change is “done”, test on the real iPad using `IPAD_TESTING.md`:

- Write slowly and quickly with Apple Pencil.
- Ink lands under the Pencil.
- Footer controls do not trigger accidentally while writing.
- Text note editing still works.
- Marks/stickers move and resize.
- Left rail panels switch.
- Rotate iPad and repeat a quick drawing/object check.

## If something breaks

1. Stop immediately.
2. Do **not** stack another broad fix.
3. Identify the last known-good commit/checkpoint.
4. Revert only the narrow offending change, or create a tiny targeted fix with a regression test.

## Safe Codex prompt template

Paste this into Codex for future work:

```text
You are working on Alex, a daughter-first iPad journal/planner app.

Do ONE narrow fix only: <describe exact issue>.

Hard constraints:
- Do not redesign unrelated UI.
- Do not refactor unrelated files.
- Preserve all behavior listed in ALEX_REGRESSION_GUARD.md.
- Before editing, say which files you will touch.
- After editing, run:
  python -m pytest tests/test_static_app.py tests/test_clickthrough_playwright.py -q
  node --check src/app.js
  git diff --stat
- If a test fails, stop and report the failure. Do not keep layering fixes.
- Final response must include changed files, tests run, result, and any risks.
```
