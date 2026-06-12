# Alex Product Roadmap

Alex is a soft, cozy personal notebook and creative planner app. The long-term target is a Zinnia-like personal application with strong handwriting, journaling, planning, and decorative tools.

## Phase 1: Real Notebook Core

- Make real notebooks with multiple pages.
- Save each page separately: handwriting, text, images, stickers, paper style, and template.
- Add page thumbnails or a page list.
- Add rename, duplicate, delete, and reorder pages.
- Add notebook covers and notebook rename.
- Add automatic local backup, export, and import.

## Phase 2: Handwriting Experience

- Improve pen smoothing so writing feels less jagged.
- Add pen presets: pencil, gel pen, fountain pen, marker, and highlighter.
- Add adjustable stroke size and opacity.
- Add undo and redo history per page.
- Add zoom and pan.
- Add tablet-friendly touch behavior.

## Phase 3: Creative Journal Tools

- Add sticker packs and decorative marks.
- Add washi tape, labels, frames, shapes, and photo cutouts.
- Add layers: send forward/back, lock, and group.
- Add resize and rotate handles for stickers, text, and images.
- Add color palettes and saved favorite tools.
- Add drag-and-drop image placement.

## Phase 4: Templates & Planning

- Build a template library: blank, lined, dot grid, daily, weekly, monthly. **Done** with 3 bonus textures (linen, wood, concrete).
- Add habit trackers, mood trackers, reading logs, and budget pages. **Done** with:
  - Habit tracker (tappable checks, editable names, row add/remove, week/month layouts)
  - Mood tracker (7 selectable moods per day with visual feedback)
  - Reading log (editable title, author, quote, thoughts, 5-star rating)
- Add custom template creation. (Deferred - would need template builder UI)
- Add reusable page layouts. (Deferred - complex state management)
- Add calendar-aware planner pages later. (Phase 5+)

## Phase 5: Export, Import, Backup

- Export a single page as PNG or PDF.
- Export a full notebook as PDF. Done in prototype.
- Import images and PDFs. Done in prototype.
- Import/export Alex notebook files.
- Add local backup reminders. Done in prototype.
- Later add cloud sync if desired.

## Phase 6: App Polish

- Add a proper home/library screen. Done in prototype.
- Add onboarding with a sample notebook. Done in prototype.
- Add settings: theme, default paper, and default pen. Done in prototype.
- Add search across notebook titles and pages. Done in prototype.
- Add keyboard shortcuts for desktop. Done in prototype.
- Improve mobile and tablet layout.

## Phase 7: iPad Version

- Package the web app as an installable app first.
- Try Capacitor for a faster iPad build.
- If handwriting needs to feel premium, rebuild the drawing surface in native SwiftUI + PencilKit.
- Add Apple Pencil support.
- Add iCloud/local Files integration.
- Prepare App Store assets and privacy notes.

## Current Focus

Phase 4 mostly complete. Next: performance monitoring, mobile optimization, and considering Phase 7 (iPad native app).

## Latest Updates (Feature Complete)

- Completed mood tracker interactivity: 7 daily mood selections with persistence
- Completed reading log with editable fields: title, author, quote, thoughts, rating
- Added page background textures: linen, wood, concrete (CSS-based, no image loading)
- Added storage quota monitoring: warns users when >80% of localStorage used
- Performance optimizations: event delegation, incremental canvas rendering

## Progress Log

- Saved the roadmap in the project.
- Added real notebook/page storage in local browser storage.
- Added page list, page switching, new page, duplicate page, rename page, guarded delete page, and notebook rename.
- Added page reorder controls, notebook cover selection, and full notebook backup/import.
- Started Phase 2 with pen presets, smoothed stroke rendering, and ink undo/redo.
- Added canvas zoom/reset view and basic object resize/nudge/delete controls.
- Replaced ink-only undo/redo with per-page snapshot history for ink, objects, paper, and templates.
- Added object rotation, duplication, and layer ordering controls.
- Added an Export panel with page PNG export, page JSON export, notebook backup, and notebook restore actions.
- Added a cozy notebook library/home screen with continue writing, notebook search, open notebook, create notebook, and restore actions.
- Added first iPad/tablet polish pass with larger touch controls, a tablet editor layout, and safer touch drawing behavior.
- Added a Settings screen with cozy theme, default paper, default pen, and startup screen preferences.
- Added first-launch onboarding with a Start Here sample notebook and skip path.
- Added visual page previews in notebook library cards and the Pages panel.
- Expanded library search to find notebook titles and page titles, with direct page-opening results.
- Added keyboard shortcuts for search, settings, new page/notebook, zoom, undo, redo, and escape behavior.
- Added print-ready full notebook PDF export.
- Added PDF import as local notebook pages with movable, resizable PDF attachments.
- Added last-saved status and gentle backup reminders that clear after JSON backup export.
- Added mobile/iPad QA polish for wrapping page controls, scrollable tool strips, and responsive editor panels.
- Added gentle success messages for key actions and a safer clear-handwriting confirmation.
- Fixed iPad touch/Pencil coordinate mapping so handwriting and dragged page objects land where the user touches.
- Hardened the iPad Pencil/touch drawing path with single-pointer tracking, coalesced Pencil movement, resize safety, and stronger scroll prevention over the notebook.
- Switched iPad Pencil/touch coordinate mapping to document/page coordinates to fix vertical offset in Safari.
- Added Ink Alignment controls in the Pens panel so iPad Safari Pencil offset can be corrected and saved locally.
- Added a Pen Calibration target that measures the iPad Pencil offset against a visible notebook target before writing.
- Updated the pen path to prefer direct canvas-relative pointer coordinates, with calibration as the final correction layer.
- Made the ink canvas an explicit full-spread overlay and mapped pen input against the whole book spread for iPad Safari.
- Added Pen Diagnostics readout so real iPad Safari Pencil coordinates can be captured and fixed precisely.
- Fixed the iPad ink layer size mismatch by locking canvas CSS and drawing dimensions to the visible book spread.
- Tightened iPad Pencil mapping by keeping pointer and notebook rectangle math in the same screen-coordinate system.
- Mapped Pencil strokes to the ink canvas instead of the outer book border to remove the remaining small iPad offset.
- Improved Pencil feel with pressure-aware stroke rendering and small jitter filtering.
- Added writing lock behavior to prevent page scroll, text selection, and touch callouts during active Pencil strokes.
- Fixed iPad interaction bugs: disabled inactive footer view buttons, added two-finger pinch zoom, and made Marks enter Select mode after placement.
- Refactored notebook zoom into a camera-style transform anchored around the pinch midpoint.
- Added two-finger camera panning during pinch zoom so zoomed notebook movement is visibly different and controllable.
- Kept selected-object controls screen-sized while page content scales with the notebook camera.
- Disabled stale service-worker caching during active iPad testing and added a visible build badge.
- Removed inactive footer view icons so the writing toolbar only shows useful controls.
- Added a Pencil-only footer guard so accidental Apple Pencil taps do not trigger footer controls while handwriting.
- Blocked accidental iPad text-selection callouts on notebook controls while preserving editable text fields.
- Fixed the top Marks tool so it opens the Marks panel and uses the same placement flow as the sidebar.
- Added an on-page mini-toolbar for selected marks, text, images, and tape so resize, duplicate, and delete are easy on iPad.
- Added two-finger pinch resizing for selected page objects on iPad.
- Hid object controls while writing so selected marks/text do not intercept Pencil strokes.
- Added tap-away dismissal and a compact close control for selected-object mini toolbars.
- Fixed Washi tape placement so each selected tape keeps its visual pattern on the page.
- Restored the iPad editor inspector to the right side and made the top Text tool focus a new note immediately.
- Restored the tablet breakpoint inspector layout so the right sidebar stays beside the notebook.
- Added safe notebook deletion with confirmation and protection for the final remaining notebook.
- Wired the left rail icons to switch Pages, Pens, Paper, Marks, and Export panels.
- Made Habit Tracker check circles tappable and saved per page while keeping the default habit names static.
- Made Habit Tracker names editable, added per-page habit row add/remove controls, and added a saved Week/Month layout choice.
- Repaired regressions from the feature pass (stacking listeners, vanishing ink, layout breaks) and added a Windows-runnable browser verification script.
- Turned the planner templates into real interactive pages: Daily has tappable top-three tasks, an editable schedule, little joys, and today's real date; Weekly shows the actual current week with editable entries per day and highlights today; the Habit Tracker label shows the real week range or current month; the Reading Log keeps up to 20 books with add/remove and per-book star ratings. All saved per page.
