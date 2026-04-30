# Alex

Alex is a soft, cozy personal journal and planner prototype inspired by creative planner apps.

## Open It

Open `index.html` directly in a browser, or run:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:4173`.

## What Works Now

- Local journal workspace
- New journal creation
- Real notebooks with separately saved pages
- Page list with page switching
- New, duplicated, renamed, and deleted pages
- Page reorder controls
- Notebook rename
- Notebook cover selection
- Full notebook backup and import as Alex JSON files
- Handwritten notebook defaults
- Pen, highlighter, and eraser drawing
- Pen presets: gel pen, pencil, marker, and highlighter
- Smoothed stroke rendering
- Ink undo and redo
- Stroke width control
- Canvas zoom and reset view
- Selection resize, nudge, and delete controls for page objects
- Lined, dot grid, grid, and blank paper styles
- Stickers, washi-style marks, text notes, and imported images
- Template switching
- Local autosave
- Export current page data as JSON
- Install/offline metadata when served through a local web server

## iPad Path

This is built as a touch-first web app so the product shape can be tested quickly. A later iPad version can reuse the workflow and visuals, then move the drawing layer to native PencilKit for better Apple Pencil feel.

## Tests

Run the local safety checks with:

```powershell
python -m pytest tests\test_static_app.py -q
```

When browser automation is available, run the click-through test with:

```powershell
python -m pytest tests\test_clickthrough_playwright.py -q
```

From WSL, use the same command from the project folder, with Linux path separators:

```bash
python -m pytest tests/test_clickthrough_playwright.py -q
```

If the Windows session reports `Access is denied` for Playwright or WSL, run the click-through command from an unlocked WSL terminal instead. The test is designed to skip cleanly when browser automation is blocked by OS permissions.
