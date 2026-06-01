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
- First-launch onboarding with optional Start Here sample notebook
- Cozy notebook library/home screen
- Continue writing and open notebook actions
- Search notebooks and pages by title
- Settings screen for theme, default paper, default pen, and startup screen
- Tablet/iPad layout polish with larger touch targets
- Mobile/iPad QA polish for wrapping page controls, scrollable tool strips, and responsive panels
- New journal creation
- Real notebooks with separately saved pages
- Visual page previews in notebook cards and the Pages panel
- Direct page search results from the library
- Desktop/iPad keyboard shortcuts for search, navigation, new page, zoom, undo, and redo
- Page list with page switching
- New, duplicated, renamed, and deleted pages
- Page reorder controls
- Notebook rename
- Safe notebook deletion with last-notebook protection
- Notebook cover selection
- Full notebook backup and import as Alex JSON files
- Full notebook PDF export through a print-ready view
- PDF import as movable notebook page attachments
- Export current page as PNG
- Clear export panel for page exports, notebook backups, and restores
- Handwritten notebook defaults
- Pen, highlighter, and eraser drawing
- Safer touch drawing that avoids accidental page scrolling
- iPad-safe drawing coordinates for Pencil/finger writing and dragged page objects
- Hardened iPad Pencil/touch handling with one active pointer, smoother movement events, and less accidental page scrolling
- Safari/iPad document-coordinate mapping to reduce vertical Pencil offset
- Ink Alignment controls for tuning Pencil offset directly on iPad Safari
- Pen Calibration target that measures iPad Pencil offset from the notebook page
- Full-spread ink overlay and book-relative pointer mapping for more accurate iPad Safari writing
- Pen Diagnostics readout for real iPad Safari coordinate debugging
- Canvas sizing locked to the visible book spread for iPad Pencil accuracy
- Pen mapping uses matching screen coordinates for the Pencil and notebook rectangle
- Pen input maps directly to the ink canvas to avoid book-border offset on iPad
- Pressure-aware Pencil strokes with small jitter filtering for smoother handwriting
- Writing lock that prevents page scroll, text selection, and touch callouts during active Pencil strokes
- Two-finger pinch zoom on the notebook surface
- Notebook camera zoom anchors around the pinch midpoint so the page stays under your fingers
- Two-finger zoom can also pan the notebook camera while zoomed
- Object controls stay screen-sized while selected page objects scale with the notebook
- Local iPad testing disables stale service-worker caches and shows the active build badge
- Inactive footer view buttons disabled so they cannot steal Pencil touches
- Removed inactive footer view icons so the writing controls stay simple and useful
- Footer controls ignore Apple Pencil presses to prevent accidental activation during handwriting
- iPad text-selection callouts are blocked around the notebook controls while inputs remain editable
- Marks switch into Select mode after placement so they can be moved and resized
- Top Marks tool opens the Marks panel for the same placement flow as the sidebar
- Selected marks, text, images, and tape show an on-page mini-toolbar for resize, copy, and delete
- Selected page objects can be resized with a two-finger pinch gesture on iPad
- Object controls stay hidden while writing so Pencil strokes are not intercepted
- Object controls can be dismissed with a compact close button or by tapping outside the object
- Washi tape places the selected tape pattern instead of a plain line
- Left rail icons switch the matching right-side tool panel
- iPad editor keeps the inspector panel on the right side instead of pushing it below the notebook
- Tablet editor breakpoint also keeps the inspector on the right instead of below the canvas
- Top Text tool creates and focuses a new editable note
- Pen presets: gel pen, pencil, marker, and highlighter
- Smoothed stroke rendering
- Per-page snapshot undo and redo for ink, objects, paper, and templates
- Stroke width control
- Canvas zoom and reset view
- Selection resize, rotate, duplicate, layer, nudge, and delete controls for page objects
- Lined, dot grid, grid, and blank paper styles
- Stickers, washi-style marks, text notes, and imported images
- Imported PDF attachments saved locally with notebook pages
- Template switching
- Local autosave
- Last-saved status and gentle local backup reminders
- Gentle in-app success messages for page, settings, import, export, and backup actions
- Safer clear-handwriting confirmation before removing page ink
- Export current page data as JSON
- Install/offline metadata when served through a local web server

## iPad Path

This is built as a touch-first web app so the product shape can be tested quickly. A later iPad version can reuse the workflow and visuals, then move the drawing layer to native PencilKit for better Apple Pencil feel.

For a first real iPad test over Wi-Fi, double-click `start-ipad-server.bat`, then open the address from `IPAD_TESTING.md` in Safari on the iPad.

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
