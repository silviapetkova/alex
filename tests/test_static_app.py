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
    assert "./sw.js" in html


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
        "function reorderPage",
        "function exportNotebook",
        "function importNotebook",
        "function capturePageState",
    ]:
        assert feature in app

    for action in [
        "new-page",
        "duplicate-page",
        "move-page-up",
        "move-page-down",
        "rename-page",
        "delete-page",
        "export-notebook",
        "import-notebook",
    ]:
        assert action in app


def test_handwriting_features_are_wired():
    app = read("src/app.js")
    for feature in [
        "const penPresets",
        "Gel Pen",
        "Pencil",
        "Marker",
        "Highlighter",
        "function drawSmoothPath",
        "function undoInk",
        "function redoInk",
        "function setZoom",
        "function resetView",
        "function nudgeSelected",
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
        ".preset-grid",
        ".stage-transform",
        ".selection-actions",
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
