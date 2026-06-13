from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import json
import re
import threading
import urllib.request


ROOT = Path(__file__).resolve().parents[1]


def read(path):
    return (ROOT / path).read_text(encoding="utf-8")


def test_app_shell_references_required_assets():
    html = read("index.html")
    assert '<div id="root"></div>' in html
    assert "./src/styles.css" in html
    assert "./src/app.js" in html
    assert "./manifest.webmanifest" in html
    assert 'serviceWorker.register("./sw.js")' in html


def test_manifest_is_installable_app_metadata():
    manifest = json.loads(read("manifest.webmanifest"))
    assert manifest["name"] == "Alex"
    assert manifest["display"] == "standalone"
    assert manifest["start_url"] == "./index.html"
    assert manifest["icons"][0]["src"] == "./assets/alex-icon.svg"


def test_service_worker_caches_app_shell():
    sw = read("sw.js")
    for asset in [
        "./index.html",
        "./src/app.js",
        "./src/styles.css",
        "./manifest.webmanifest",
        "./assets/alex-icon.svg",
    ]:
        assert asset in sw
    assert "caches.open" in sw
    assert "fetch" in sw


def test_notebook_core_features_are_wired():
    app = read("src/app.js")
    for feature in [
        "function makePage",
        "function createJournal",
        "function createPage",
        "function duplicatePage",
        "function renamePage",
        "function deletePage",
        "function deleteJournal",
        "function reorderPage",
        "function exportNotebook",
        "function exportNotebookPdf",
        "function notebookPrintHtml",
        "function printablePageHtml",
        "function printableElementHtml",
        "function printableInkSvg",
        "function importNotebook",
        "function importPdf",
        "function backupReminderHtml",
        "function shouldShowBackupReminder",
        "function saveStatusText",
        "function backupStatusText",
        "function formatRelativeTime",
        "function showNotice",
        "function exportPagePng",
        "function drawExportBackground",
        "function drawExportElements",
        "function capturePageState",
        "function onboardingScreen",
        "function createStartHereNotebook",
        "function libraryHome",
        "function settingsScreen",
        "function updateSetting",
        "function applyAppTheme",
        "function cameraStyle",
        "APP_VERSION",
        "function clampZoom",
        "function zoomCameraAt",
        "function stageCenterPoint",
        "railSections",
        "function resizeSelectedElement",
        "function clampElementSize",
        "function applyElementSizeStyle",
        "function normalizeHabitChecks",
        "function normalizeHabitRows",
        "function normalizeHabitLayout",
        "function habitDayLabels",
        "function habitCheckKey",
        "function isHabitChecked",
        "function toggleHabitCheck",
        "function renameHabitRow",
        "function addHabitRow",
        "function removeHabitRow",
        "function setHabitLayout",
        "function normalizeMoodChecks",
        "function toggleMoodDay",
        "function normalizeReadingEntries",
        "function updateReadingEntry",
        "function setReadingRating",
        "function addReadingEntry",
        "function removeReadingEntry",
        "function normalizeTemplateData",
        "function currentWeekDates",
        "function toggleDailyTask",
        "function updateDailyField",
        "function updateWeekEntry",
        "function monthPage",
        "function updateMonthEntry",
        "function templateUseCount",
        "function visibleStickerItems",
        "function setStickerPack",
        "function normalizeCustomTemplates",
        "function saveCustomTemplate",
        "function applyCustomTemplate",
        "function removeCustomTemplate",
        "function journalsForStorage",
        "function placeImageFile",
        "function handlePageDrop",
        "function favoriteColorsHtml",
        "toggle-lock-element",
        "save-favorite-color",
        "data-favorite-color",
        "data-remove-favorite",
        "data-shape",
        "function touchListDistance",
        "function bindLayerPinchResize",
        "function touchesHitElement",
        "function handleBlankSelectionDown",
        "function drawTapeExport",
        "function notebookCard",
        "function pagePreview",
        "function pageSummary",
        "function librarySearchResults",
        "function openJournal",
        "function openPageFromLibrary",
        "function handleKeyboardShortcut",
        "function focusLibrarySearch",
        "function localPoint",
        "function canvasPoint",
        "function adjustInkAlignment",
        "function resetInkAlignment",
        "function startInkCalibration",
        "function calibrateInkFromEvent",
        "function calibrationTargetHtml",
        "function penDiagnosticsHtml",
        "function recordPenDiagnostics",
        "activePointerId",
        "activeTouches",
        "pinchState",
        "function handlePinchStart",
        "function updatePinchZoom",
        "function touchMidpoint",
        "function applyLiveZoom",
        "canvas.style.width",
        "book?.clientWidth",
    ]:
        assert feature in app

    for action in [
        "new-page",
        "duplicate-page",
        "move-page-up",
        "move-page-down",
        "rename-page",
        "delete-page",
        "delete-journal",
        "export-notebook",
        "export-notebook-pdf",
        "import-pdf",
        "dismiss-backup-reminder",
        "import-notebook",
        "export-page-png",
        "go-library",
        "go-settings",
        "complete-onboarding",
        "create-sample-notebook",
        "open-editor",
        "data-open-journal",
        "data-open-page",
        "data-setting-key",
        "data-inspector-tab=\"${section.tab}\"",
        "defaultSettings",
        "onboardingComplete",
        "window.onkeydown",
        "ctrlKey || event.metaKey",
        "key === \"delete\" || key === \"backspace\"",
        "state.view === \"editor\" && state.selectedId && !isTyping",
        "Clear all handwriting on this page?",
        "Alex needs at least one notebook.",
        "This cannot be undone.",
        "ink-align-up",
        "start-ink-calibration",
        "drawOffsetY",
        "penDiagnostics",
        "state.activeTool = \"pen\"",
        "state.activeTool = \"select\"",
        "state.activeInspectorTab = \"Marks\"",
        "pendingFocusElementId = addElement(\"text\", \"New note\")",
        "data-tape",
        "data-habit-row",
        "data-habit-day",
        "data-habit-name",
        "data-habit-remove",
        "data-habit-layout",
        "data-mood-day",
        "data-reading-field",
        "data-reading-add",
        "data-reading-remove",
        "data-daily-task",
        "data-daily-field",
        "data-week-day",
        "data-month-day",
        "data-sticker-pack",
        "data-custom-template",
        "data-custom-template-remove",
        "save-page-template",
        "add-habit-row",
        "habitChecks",
        "habitRows",
        "habitLayout",
        "aria-pressed",
        "addElement(\"tape\"",
        "state.selectedId = null",
        "pinchResize",
        "event.touches.length !== 2",
        "touchesHitElement",
        "pinchResizeBound",
        "--inverse-camera-scale",
        "pinchState.baseLeft",
        "build-badge",
        "drawing-inactive",
        "CSS.escape(id)",
        "Choose a mark from the panel",
        "event.pointerType !== \"pen\"",
        "pageFooter.addEventListener(\"pointerdown\"",
        "pageFooter.addEventListener(\"contextmenu\"",
        "function clearAccidentalSelection",
        "const target = canvas || book",
    ]:
        assert action in app


def test_handwriting_features_are_wired():
    app = read("src/app.js")
    for feature in [
        "const penPresets",
        "Gel Pen",
        "Fountain Pen",
        "Pencil",
        "Marker",
        "Highlighter",
        "function drawSmoothPath",
        "function strokePoint",
        "function addStrokePoint",
        "function pressureWidth",
        "function drawStrokePath",
        "function shouldDrawJoinedStroke",
        "function averageStrokeWidth",
        "function drawJoinedStroke",
        "drawJoinedStroke(ctx, points)",
        "ctx.lineTo(current.x, current.y)",
        "function lockPageWhileWriting",
        "function unlockPageAfterWriting",
        "function cancelActiveStroke",
        "document.body.classList.add(\"is-writing\")",
        "window.addEventListener(\"blur\", cancelActiveStroke)",
        "event.pressure",
        "function undoInk",
        "function redoInk",
        "function pageSnapshot",
        "function restoreSnapshot",
        "function pushHistory",
        "function setZoom",
        "function resetView",
        "function nudgeSelected",
        "function duplicateSelectedElement",
        "function moveSelectedLayer",
        "function normalizeElements",
        "pointercancel",
        "pointerrawupdate",
        "lostpointercapture",
        "book?.addEventListener(\"pointerdown\", handlePinchStart)",
        "getCoalescedEvents",
        "canvas.style.width",
        "clientWidth || rect.width",
        "event.pageY",
        "document.getElementById(\"book-spread\")",
        "clientY - rect.top",
        "event.preventDefault()",
        "undoStack",
        "redoStack",
        "redoPaths",
    ]:
        assert feature in app


def test_styles_include_notebook_controls():
    css = read("src/styles.css")
    for selector in [
        ".book-spread.paper-lined",
        ".book-spread.paper-dot",
        ".book-spread.paper-grid",
        ".cover-grid",
        ".page-stack",
        ".page-preview",
        ".notebook-preview-strip",
        ".preview-stickers",
        ".page-result-list",
        ".page-result",
        ".library-home",
        ".notebook-grid",
        ".continue-card",
        ".settings-screen",
        ".settings-panel",
        ".onboarding-screen",
        ".onboarding-steps",
        ".theme-swatch",
        "body[data-theme=\"mint\"]",
        "@media (pointer: coarse)",
        "@media (max-width: 1180px)",
        "grid-template-areas:\n      \"left canvas right\"",
        "grid-template-columns: minmax(0, 1fr) minmax(278px, 34vw)",
        "@media (max-width: 620px)",
        ".new-journal.danger",
        ".rail-button:hover",
        ".rail-button:focus-visible",
        ".preset-grid",
        ".stage-transform",
        "grid-column: 1 / -1",
        "pointer-events: auto",
        "max-width: 100%",
        ".ink-layer.inactive",
        "body.is-writing",
        "-webkit-user-select: none",
        "-webkit-touch-callout: none",
        "textarea",
        "touch-action: none !important",
        ".selection-actions",
        ".export-grid",
        ".canvas-pdf",
        ".canvas-tape",
        ".canvas-sticker",
        ".canvas-tape.selected",
        ".habit-check",
        ".habit-check.filled",
        ".habit-check:focus-visible",
        ".habit-controls",
        ".habit-layout-toggle",
        ".habit-grid.habit-month",
        ".habit-name",
        ".habit-remove",
        ".habit-scroll",
        ".mood-button",
        ".mood-button.selected",
        ".reading-card",
        ".reading-add",
        ".rating-star",
        ".daily-task-check",
        ".daily-task-text",
        ".day-entry",
        ".day-row.today",
        ".today-date",
        ".month-grid",
        ".month-cell.today",
        ".month-note",
        ".sticker-pack-tabs",
        ".custom-template-row",
        ".lock-toggle",
        ".favorite-swatch",
        ".favorite-add",
        ".shape-grid",
        ".canvas-shape",
        "background: transparent !important",
        "#dff0f7 2px 18px",
        "min-width: 10px",
        "-webkit-appearance: none",
        "scale(var(--inverse-camera-scale, 1))",
        "transform-origin: 0 0",
        ".object-layer.drawing-inactive",
        ".backup-reminder",
        ".app-toast",
        ".build-badge",
        ".alignment-pad",
        ".alignment-note",
        ".calibration-target",
        ".calibration-actions",
        ".pen-diagnostics",
        "@keyframes toast-in",
        "-webkit-touch-callout: none",
        "overscroll-behavior: contain",
        "scroll-snap-type: x proximity",
    ]:
        assert selector in css


def test_local_server_serves_app_files():
    server = ThreadingHTTPServer(("127.0.0.1", 0), SimpleHTTPRequestHandler)
    port = server.server_address[1]
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        for path in [
            "index.html",
            "src/app.js",
            "src/styles.css",
            "manifest.webmanifest",
            "sw.js",
            "assets/alex-icon.svg",
            "ROADMAP.md",
        ]:
            with urllib.request.urlopen(f"http://127.0.0.1:{port}/{path}", timeout=5) as response:
                assert response.status == 200
                assert response.read()
    finally:
        server.shutdown()


def test_javascript_shape_is_balanced():
    app = read("src/app.js")
    assert app.count("`") % 2 == 0
    assert app.count("{") == app.count("}")
    assert not re.search(r"TODO|FIXME", app)
