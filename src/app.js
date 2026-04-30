const STORAGE_KEY = "alex-journal-prototype";

const templates = [
  { title: "Notebook Pages", count: 18, template: "notebook", icon: "&#9636;" },
  { title: "Daily Pages", count: 14, template: "daily", icon: "&#10022;" },
  { title: "Habit Trackers", count: 10, template: "habit", icon: "&#10003;" },
  { title: "Reading Logs", count: 8, template: "reading", icon: "&#9636;" },
  { title: "Weekly Planners", count: 12, template: "week", icon: "&#9633;" },
  { title: "Blank Pages", count: 13, template: "blank", icon: "&#9998;" },
];

const stickers = ["&#9825;", "&#10047;", "&#10048;", "&#9749;", "&#9729;", "&#9733;", "&#10038;", "&#128214;", "&#127872;", "&#127793;", "&#9993;", "&#128247;"];
const tapes = ["gingham", "blue-grid", "leaf", "dots", "linen", "ink-dots"];
const colors = ["#202225", "#4d5256", "#e96d7b", "#c98255", "#d8aa2f", "#3c9b70", "#4f90b5", "#8a64b0", "#ffb7b9", "#f8d66d", "#9edbb8", "#a9d1e8"];
const paperStyles = [
  { id: "lined", label: "Lined" },
  { id: "dot", label: "Dot Grid" },
  { id: "grid", label: "Grid" },
  { id: "blank", label: "Blank" },
];
const coverStyles = ["pink", "mint", "butter", "sky", "lavender", "rose"];
const penPresets = [
  { id: "gel", label: "Gel Pen", width: 4, alpha: 1, composite: "source-over" },
  { id: "pencil", label: "Pencil", width: 3, alpha: 0.62, composite: "source-over" },
  { id: "marker", label: "Marker", width: 8, alpha: 0.82, composite: "source-over" },
  { id: "highlighter", label: "Highlighter", width: 14, alpha: 0.34, composite: "source-over" },
];

const seedElements = [
  { id: "note-1", type: "text", value: "Write, sketch, underline, and collect thoughts here.", x: 64, y: 72, size: 18 },
  { id: "sticker-1", type: "sticker", value: "&#9825;", x: 37, y: 78, size: 40 },
];

function makePage(title = "Notebook Page", template = "notebook", paper = "lined", elements = [], penPaths = []) {
  return {
    id: `page-${Date.now()}-${Math.round(Math.random() * 100000)}`,
    title,
    template,
    paper,
    elements: structuredClone(elements),
    penPaths: structuredClone(penPaths),
    redoPaths: [],
    updatedAt: new Date().toISOString(),
  };
}

const defaultJournals = [
  {
    id: "cozy-week",
    title: "Cozy Week",
    meta: "Edited just now",
    cover: "pink",
    pages: [
      makePage("Morning Notes", "notebook", "lined", seedElements, []),
      makePage("Daily Reflection", "daily", "lined", [], []),
      makePage("Reading Notes", "reading", "dot", [], []),
    ],
  },
  { id: "morning-pages", title: "Morning Pages", meta: "Today", cover: "mint", pages: [makePage("Freewrite", "notebook", "lined", [], [])] },
  { id: "gratitude-log", title: "Gratitude Log", meta: "Apr 28, 2026", cover: "butter", pages: [makePage("Gratitude List", "notebook", "dot", [], [])] },
  { id: "study-notes", title: "Study Notes", meta: "Notebook", cover: "sky", pages: [makePage("Chapter Notes", "notebook", "grid", [], [])] },
];

let state = {
  activeTool: "pen",
  activeJournal: "cozy-week",
  activePageId: defaultJournals[0].pages[0].id,
  journals: defaultJournals,
  activeTemplate: "notebook",
  activeColor: colors[0],
  activePaper: "lined",
  penPreset: "gel",
  penWidth: 4,
  zoom: 1,
  panX: 0,
  panY: 0,
  selectedId: null,
  elements: structuredClone(seedElements),
  penPaths: [],
  redoPaths: [],
  page: 1,
  query: "",
};

try {
  state = { ...state, ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}) };
} catch {
  state = { ...state };
}

normalizeState();

const root = document.getElementById("root");
let canvas;
let drawing = false;
let saveTimer;

function normalizeState() {
  if (!state.journals?.length) state.journals = structuredClone(defaultJournals);

  state.journals = state.journals.map((journal, journalIndex) => {
    const pages = journal.pages?.length
      ? journal.pages.map((page, pageIndex) => ({
          id: page.id || `page-${journal.id}-${pageIndex + 1}`,
          title: page.title || `Page ${pageIndex + 1}`,
          template: page.template || state.activeTemplate || "notebook",
          paper: page.paper || state.activePaper || "lined",
          elements: structuredClone(page.elements || []),
          penPaths: structuredClone(page.penPaths || []),
          redoPaths: structuredClone(page.redoPaths || []),
          updatedAt: page.updatedAt || new Date().toISOString(),
        }))
      : [
          makePage(
            journalIndex === 0 ? "Morning Notes" : "Notebook Page",
            state.activeTemplate || "notebook",
            state.activePaper || "lined",
            journal.id === state.activeJournal ? state.elements || [] : [],
            journal.id === state.activeJournal ? state.penPaths || [] : []
          ),
        ];
    return { ...journal, pages };
  });

  if (!currentJournals().some((journal) => journal.id === state.activeJournal)) {
    state.activeJournal = currentJournals()[0].id;
  }

  const journal = currentJournal();
  if (!journal.pages.some((page) => page.id === state.activePageId)) {
    state.activePageId = journal.pages[0].id;
  }

  const page = currentPage();
  loadPageIntoState(page);
  if (!state.activeColor) state.activeColor = colors[0];
  if (!state.penPreset) state.penPreset = "gel";
  if (!state.penWidth) state.penWidth = 4;
  if (!state.zoom) state.zoom = 1;
  if (typeof state.panX !== "number") state.panX = 0;
  if (typeof state.panY !== "number") state.panY = 0;
  if (!state.redoPaths) state.redoPaths = [];
}

function currentJournals() {
  return state.journals?.length ? state.journals : defaultJournals;
}

function currentJournal() {
  return currentJournals().find((journal) => journal.id === state.activeJournal) || currentJournals()[0];
}

function currentPage() {
  const journal = currentJournal();
  return journal.pages.find((page) => page.id === state.activePageId) || journal.pages[0];
}

function loadPageIntoState(page) {
  state.activePageId = page.id;
  state.activeTemplate = page.template || "notebook";
  state.activePaper = page.paper || "lined";
  state.elements = structuredClone(page.elements || []);
  state.penPaths = structuredClone(page.penPaths || []);
  state.redoPaths = structuredClone(page.redoPaths || []);
}

function capturePageState() {
  const journal = currentJournal();
  const page = currentPage();
  if (!journal || !page) return;
  page.template = state.activeTemplate;
  page.paper = state.activePaper;
  page.elements = structuredClone(state.elements || []);
  page.penPaths = structuredClone(state.penPaths || []);
  page.redoPaths = structuredClone(state.redoPaths || []);
  page.updatedAt = new Date().toISOString();
  journal.meta = "Edited just now";
}

function icon(name) {
  const icons = {
    menu: "&#9776;", pointer: "&#8982;", pen: "&#9998;", highlighter: "&#9644;", erase: "&#9003;", text: "T", sticker: "&#9734;", image: "&#9639;",
    undo: "&#8630;", redo: "&#8631;", export: "&#8681;", save: "&#10003;", plus: "+", search: "&#8981;",
    book: "&#9637;", tags: "&#9671;", heart: "&#9825;", palette: "&#9680;", file: "&#9783;", grid: "&#9638;",
    left: "&#8249;", right: "&#8250;", down: "&#8964;", edit: "&#9997;", trash: "&#9003;"
  };
  return icons[name] || "&#8226;";
}

function render() {
  const journal = currentJournal();
  const pageData = currentPage();
  const pageIndex = journal.pages.findIndex((page) => page.id === pageData.id);
  root.innerHTML = `
    <div class="app-shell">
      <input class="hidden-file" id="image-import" type="file" accept="image/*" />
      <input class="hidden-file" id="notebook-import" type="file" accept="application/json,.json" />
      <header class="topbar">
        <div class="brand">Alex<span>&hearts;</span></div>
        <button class="icon-button" aria-label="Menu">${icon("menu")}</button>
        <button class="journal-switch">${journal.title}<span>${icon("down")}</span></button>
        <div class="toolstrip" aria-label="Main tools">
          ${toolButton("pointer", "Select", "select")}
          ${toolButton("pen", "Pen", "pen")}
          ${toolButton("highlighter", "Highlight", "highlighter")}
          ${toolButton("erase", "Erase", "erase")}
          ${toolButton("text", "Text", "text")}
          ${toolButton("sticker", "Marks", "sticker")}
          ${toolButton("image", "Image", "image")}
        </div>
        <div class="top-actions">
          <button class="icon-button" data-action="undo" aria-label="Undo">${icon("undo")}</button>
          <button class="icon-button" data-action="redo" aria-label="Redo">${icon("redo")}</button>
          <button class="export-button" data-action="export">${icon("export")}<span>Export</span></button>
          <div class="save-status">${icon("save")}<span id="save-note">Saved locally</span></div>
        </div>
      </header>
      <main class="workspace">
        ${leftPanel(journal)}
        <section class="canvas-zone">
          <div class="journal-stage">
            <div class="stage-transform" id="stage-transform" style="transform: translate(${state.panX}px, ${state.panY}px) scale(${state.zoom})">
              <div class="book-spread paper-${state.activePaper}" id="book-spread">
                <div class="page left-page">${pageTemplate("left")}</div>
                <div class="page right-page">${pageTemplate("right")}</div>
                <canvas class="ink-layer" id="ink-layer"></canvas>
                <div id="elements-layer"></div>
              </div>
            </div>
          </div>
          <div class="page-footer">
            <button class="icon-button" aria-label="Grid view">${icon("grid")}</button>
            <button class="icon-button active-soft" aria-label="Book view">${icon("book")}</button>
            <button class="icon-button" data-action="zoom-out" aria-label="Zoom out">-</button>
            <button class="page-select zoom-readout" data-testid="zoom-readout">${Math.round(state.zoom * 100)}%</button>
            <button class="icon-button" data-action="zoom-in" aria-label="Zoom in">+</button>
            <button class="icon-button" data-action="reset-view" aria-label="Reset view">${icon("pointer")}</button>
            <button class="icon-button" data-action="previous-page" aria-label="Previous page">${icon("left")}</button>
            <button class="page-select" data-testid="page-indicator">${pageIndex + 1} / ${journal.pages.length}<span>${icon("down")}</span></button>
            <button class="icon-button" data-action="next-page" aria-label="Next page">${icon("right")}</button>
            <button class="icon-button" data-action="clear-ink" aria-label="Clear ink">${icon("erase")}</button>
          </div>
        </section>
        ${rightPanel(journal, pageData)}
      </main>
    </div>
  `;
  bind();
  drawElements();
  setupCanvas();
}

function toolButton(iconName, label, tool) {
  const active = state.activeTool === tool ? " active" : "";
  return `<button class="tool-button${active}" data-tool="${tool}"><span class="tool-icon">${icon(iconName)}</span><span>${label}</span></button>`;
}

function leftPanel(activeJournal) {
  return `
    <aside class="left-panel">
      <nav class="rail-icons" aria-label="Sections">
        ${["book", "pen", "palette", "heart", "file"].map((name, index) => `<button class="rail-button ${index === 0 ? "active" : ""}" aria-label="Section">${icon(name)}</button>`).join("")}
      </nav>
      <div class="library">
        <div class="panel-heading"><span>Notebooks</span><button data-action="new-journal" aria-label="New notebook">${icon("plus")}</button></div>
        <div class="journal-list">
          ${currentJournals().map((journal) => `
            <button class="journal-row ${activeJournal.id === journal.id ? "selected" : ""}" data-journal="${journal.id}">
              <span class="cover ${journal.cover}"></span>
              <span><strong>${journal.title}</strong><small>${journal.pages.length} pages</small></span>
            </button>
          `).join("")}
        </div>
        <button class="new-journal" data-action="new-journal">${icon("plus")}<span>New Notebook</span></button>
        <button class="new-journal quiet" data-action="rename-journal">${icon("edit")}<span>Rename Notebook</span></button>
        <div class="template-head"><span>Covers</span><button data-action="export-notebook">Backup</button></div>
        <div class="cover-grid">
          ${coverStyles.map((cover) => `<button class="cover ${cover} ${activeJournal.cover === cover ? "selected" : ""}" data-cover="${cover}" aria-label="${cover} cover"></button>`).join("")}
        </div>
        <button class="new-journal quiet" data-action="import-notebook">${icon("export")}<span>Import Notebook</span></button>
        <div class="template-head"><span>Page Types</span><button>See all</button></div>
        <div class="template-list">
          ${templates.map((item) => `
            <button class="template-row ${state.activeTemplate === item.template ? "selected" : ""}" data-template="${item.template}">
              <span class="template-icon">${item.icon}</span><span>${item.title}</span><small>${item.count}</small>
            </button>
          `).join("")}
        </div>
      </div>
    </aside>
  `;
}

function rightPanel(journal, pageData) {
  const visibleStickers = stickers.filter((sticker) => !state.query || sticker.toLowerCase().includes(state.query.toLowerCase()));
  return `
    <aside class="right-panel">
      <div class="asset-tabs">${["Pens", "Paper", "Marks", "Pages"].map((tab, index) => `<button class="${index === 0 ? "active" : ""}">${tab}</button>`).join("")}</div>
      ${panelSection("Handwriting", `
        <div class="pen-preview">
          <span style="background:${state.activeTool === "highlighter" || state.penPreset === "highlighter" ? toHighlighter(state.activeColor) : state.activeColor};height:${Math.max(3, state.penWidth)}px"></span>
          <strong>${toolLabel()}</strong>
        </div>
        <div class="preset-grid">
          ${penPresets.map((preset) => `<button class="${state.penPreset === preset.id ? "selected" : ""}" data-preset="${preset.id}">${preset.label}</button>`).join("")}
        </div>
        <label class="range-row"><span>Stroke</span><input id="pen-width" type="range" min="1" max="18" value="${state.penWidth}" /></label>
      `)}
      ${panelSection("Ink Colors", `<div class="color-grid">${colors.map((color) => `<button class="${state.activeColor === color ? "selected" : ""}" style="background:${color}" data-color="${color}"></button>`).join("")}</div>`)}
      ${panelSection("Paper", `<div class="paper-grid">${paperStyles.map((paper) => `<button class="${state.activePaper === paper.id ? "selected" : ""}" data-paper="${paper.id}"><span class="paper-sample ${paper.id}"></span>${paper.label}</button>`).join("")}</div>`)}
      ${panelSection("Selection", selectionControls())}
      ${panelSection("Pages", pageList(journal, pageData))}
      <label class="search-box">${icon("search")}<input id="sticker-search" value="${state.query}" placeholder="Search marks" /></label>
      ${panelSection("Margin Marks", stickerGrid(visibleStickers))}
      ${panelSection("Washi Tape", `<div class="tape-grid">${tapes.map((tape) => `<button class="${tape}" data-sticker="&#9644;" aria-label="${tape} tape"></button>`).join("")}</div>`)}
    </aside>
  `;
}

function pageList(journal, pageData) {
  return `
    <div class="page-actions">
      <button data-action="new-page">${icon("plus")} New</button>
      <button data-action="duplicate-page">Duplicate</button>
      <button data-action="move-page-up">${icon("left")} Move Up</button>
      <button data-action="move-page-down">Move Down ${icon("right")}</button>
      <button data-action="rename-page">${icon("edit")} Rename</button>
      <button data-action="delete-page">${icon("trash")} Delete</button>
    </div>
    <div class="page-stack">
      ${journal.pages.map((page, index) => `
        <button class="page-row ${page.id === pageData.id ? "selected" : ""}" data-page="${page.id}">
          <span class="page-thumb ${page.paper || "lined"}"></span>
          <span><strong>${index + 1}. ${escapeHtml(page.title)}</strong><small>${page.template || "notebook"} page</small></span>
        </button>
      `).join("")}
    </div>
    <div class="page-chips">${templates.slice(0, 4).map((item) => `<button data-template="${item.template}">${item.title.replace(" Pages", "")}</button>`).join("")}<button data-action="clear-ink">Clear Ink</button></div>
  `;
}

function selectionControls() {
  const selected = state.elements.find((element) => element.id === state.selectedId);
  if (!selected) {
    return `<div class="empty-selection">Select text, an image, or a mark to resize it.</div>`;
  }
  const label = selected.type === "text" ? "Text Size" : selected.type === "image" ? "Image Size" : "Mark Size";
  const min = selected.type === "text" ? 12 : 20;
  const max = selected.type === "image" ? 120 : 72;
  return `
    <label class="range-row"><span>${label}</span><input id="element-size" type="range" min="${min}" max="${max}" value="${selected.size}" /></label>
    <div class="selection-actions">
      <button data-action="nudge-left">${icon("left")}</button>
      <button data-action="nudge-up">Up</button>
      <button data-action="nudge-down">Down</button>
      <button data-action="nudge-right">${icon("right")}</button>
      <button data-action="delete-element">Delete</button>
    </div>
  `;
}

function stickerGrid(items) {
  return `<div class="sticker-grid">${items.map((sticker) => `<button data-sticker="${sticker}">${sticker}</button>`).join("")}</div>`;
}

function panelSection(title, content) {
  return `<section class="panel-section"><h3>${title}</h3>${content}</section>`;
}

function pageTemplate(side) {
  const template = state.activeTemplate;
  if (template === "daily") return side === "left" ? dailyPage() : notesPage();
  if (template === "habit") return side === "left" ? habitPage("Habit Focus") : notesPage();
  if (template === "reading") return side === "left" ? readingPage() : notesPage();
  if (template === "week") return side === "left" ? weeklyPage() : trackerPage();
  if (template === "blank") return blankPage(side === "left" ? "Freewrite" : "Notes");
  return notebookPage(side);
}

function notebookPage(side) {
  return `
    <h1>${side === "left" ? "Notebook" : "Thoughts"} <span>&#9825;</span></h1>
    <div class="notebook-prompt">
      <p>${side === "left" ? "Date" : "Topic"}: ______________________________</p>
      <p>${side === "left" ? "Focus" : "Questions"}: ___________________________</p>
    </div>
  `;
}

function weeklyPage() {
  const days = [
    ["Mon", "12", "Morning notes", "Underline key tasks"],
    ["Tue", "13", "Sketch ideas", "Review class notes"],
    ["Wed", "14", "Meeting notes", "Add summary"],
    ["Thu", "15", "Study session", "Highlight terms"],
    ["Fri", "16", "Freewriting", "Weekly reflection"],
    ["Sat", "17", "Reading notes", "Collect quotes"],
    ["Sun", "18", "Plan next week", "Gentle reset"],
  ];
  return `<h1>Cozy Week <span>&#9825;</span></h1><div class="week-list">${days.map(([day, date, first, second]) => `
    <div class="day-row"><div class="date-card ${day.toLowerCase()}"><span>${day}</span><strong>${date}</strong></div><ul><li>${first}</li><li>${second}</li></ul></div>
  `).join("")}</div>`;
}

function trackerPage() {
  const habits = ["Drink water", "Move my body", "Read", "No sugar", "Meditate"];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return `
    <div class="tape-label blue">Apr 30 - May 6</div>
    <h2>habit tracker</h2>
    <div class="habit-grid"><div></div>${days.map((day) => `<b>${day}</b>`).join("")}${habits.map((habit, row) => `<span>${habit}</span>${days.map((_, index) => `<i class="${(index + row) % 4 !== 0 ? "filled" : ""}"></i>`).join("")}`).join("")}</div>
    <h2>mood tracker</h2>
    <div class="moods">${["&#9786;", "&#9787;", "-", "&#9675;", "&#9825;", "&#9685;", "&#9733;"].map((mood, index) => `<span>${mood}<small>${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</small></span>`).join("")}</div>
    <div class="notes-box"><div class="tape-label small">notes</div></div>
  `;
}

function dailyPage() {
  return `<h1>Today <span>&#9825;</span></h1><div class="daily-grid">
    <section><h2>top three</h2><p>&#9744; gentle morning<br>&#9744; write one page<br>&#9744; tidy desk</p></section>
    <section><h2>schedule</h2><p>9:00 tea + planning<br>12:30 lunch walk<br>18:00 reset</p></section>
    <section><h2>little joys</h2><p>fresh flowers, soft socks, music</p></section>
  </div>`;
}

function habitPage(title) {
  return `<h1>${title}</h1>${trackerPage()}`;
}

function readingPage() {
  return `<h1>Reading Log</h1><div class="reading-lines">${["Book", "Author", "Favorite quote", "Thoughts", "Rating"].map((label) => `<p><b>${label}</b></p>`).join("")}</div>`;
}

function blankPage(title) {
  return `<h1>${title}</h1><div class="blank-lines"></div>`;
}

function notesPage() {
  return blankPage("Notes");
}

function bind() {
  document.querySelectorAll("[data-tool]").forEach((button) => {
    button.addEventListener("click", () => {
      const tool = button.dataset.tool;
      if (tool === "text") {
        state.activeTool = "select";
        addElement("text", "New note");
      } else if (tool === "image") {
        state.activeTool = "select";
        document.getElementById("image-import")?.click();
        persist();
        return;
      } else {
        state.activeTool = tool;
      }
      render();
      persist();
    });
  });

  document.querySelectorAll("[data-journal]").forEach((button) => {
    button.addEventListener("click", () => switchJournal(button.dataset.journal));
  });

  document.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => switchPage(button.dataset.page));
  });

  document.querySelectorAll("[data-template]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTemplate = button.dataset.template;
      render();
      persist();
    });
  });

  document.querySelectorAll("[data-sticker]").forEach((button) => {
    button.addEventListener("click", () => {
      addElement("sticker", button.dataset.sticker);
      render();
      persist();
    });
  });

  document.querySelectorAll("[data-color]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeColor = button.dataset.color;
      render();
      persist();
    });
  });

  document.querySelectorAll("[data-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = penPresets.find((entry) => entry.id === button.dataset.preset);
      if (!preset) return;
      state.penPreset = preset.id;
      state.penWidth = preset.width;
      state.activeTool = preset.id === "highlighter" ? "highlighter" : "pen";
      render();
      persist();
    });
  });

  document.querySelectorAll("[data-paper]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activePaper = button.dataset.paper;
      render();
      persist();
    });
  });

  document.querySelectorAll("[data-cover]").forEach((button) => {
    button.addEventListener("click", () => {
      const journal = currentJournal();
      journal.cover = button.dataset.cover;
      journal.meta = "Cover updated";
      render();
      persist();
    });
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.action));
  });

  const width = document.getElementById("pen-width");
  if (width) {
    width.addEventListener("input", (event) => {
      state.penWidth = Number(event.target.value);
      const preview = document.querySelector(".pen-preview span");
      if (preview) preview.style.height = `${Math.max(3, state.penWidth)}px`;
      persist();
    });
  }

  const elementSize = document.getElementById("element-size");
  if (elementSize) {
    elementSize.addEventListener("input", (event) => {
      const selected = state.elements.find((element) => element.id === state.selectedId);
      if (!selected) return;
      selected.size = Number(event.target.value);
      drawElements();
      persist();
    });
  }

  const search = document.getElementById("sticker-search");
  if (search) {
    search.addEventListener("input", (event) => {
      state.query = event.target.value;
      render();
      const nextSearch = document.getElementById("sticker-search");
      if (nextSearch) {
        nextSearch.focus();
        nextSearch.selectionStart = nextSearch.selectionEnd = nextSearch.value.length;
      }
    });
  }

  const imageImport = document.getElementById("image-import");
  if (imageImport) imageImport.addEventListener("change", importImage);

  const notebookImport = document.getElementById("notebook-import");
  if (notebookImport) notebookImport.addEventListener("change", importNotebook);
}

function handleAction(action) {
  if (action === "undo") undoInk();
  if (action === "redo") redoInk();
  if (action === "zoom-in") setZoom(state.zoom + 0.1);
  if (action === "zoom-out") setZoom(state.zoom - 0.1);
  if (action === "reset-view") resetView();
  if (action === "nudge-left") nudgeSelected(-1.5, 0);
  if (action === "nudge-right") nudgeSelected(1.5, 0);
  if (action === "nudge-up") nudgeSelected(0, -1.5);
  if (action === "nudge-down") nudgeSelected(0, 1.5);
  if (action === "delete-element") deleteSelectedElement();
  if (action === "new-journal") createJournal();
  if (action === "rename-journal") renameJournal();
  if (action === "import-notebook") {
    document.getElementById("notebook-import")?.click();
    return;
  }
  if (action === "export-notebook") exportNotebook();
  if (action === "new-page") createPage();
  if (action === "duplicate-page") duplicatePage();
  if (action === "move-page-up") reorderPage(-1);
  if (action === "move-page-down") reorderPage(1);
  if (action === "rename-page") renamePage();
  if (action === "delete-page") deletePage();
  if (action === "clear-ink") state.penPaths = [];
  if (action === "previous-page") movePage(-1);
  if (action === "next-page") movePage(1);
  if (action === "export") exportPage();
  render();
  persist();
}

function setZoom(value) {
  state.zoom = Math.max(0.65, Math.min(1.7, Number(value.toFixed(2))));
}

function resetView() {
  state.zoom = 1;
  state.panX = 0;
  state.panY = 0;
}

function nudgeSelected(dx, dy) {
  const selected = state.elements.find((element) => element.id === state.selectedId);
  if (!selected) return;
  selected.x = Math.max(2, Math.min(92, selected.x + dx));
  selected.y = Math.max(2, Math.min(92, selected.y + dy));
}

function deleteSelectedElement() {
  if (!state.selectedId) return;
  state.elements = state.elements.filter((element) => element.id !== state.selectedId);
  state.selectedId = null;
}

function addElement(type, value) {
  const id = `${type}-${Date.now()}`;
  state.elements.push({
    id,
    type,
    value,
    x: type === "text" ? 60 : 64,
    y: type === "text" ? 64 : 31,
    size: type === "text" ? 18 : 38,
  });
  state.selectedId = id;
}

function switchJournal(journalId) {
  capturePageState();
  state.activeJournal = journalId;
  const journal = currentJournal();
  loadPageIntoState(journal.pages[0]);
  state.page = 1;
  render();
  persist();
}

function switchPage(pageId) {
  capturePageState();
  const page = currentJournal().pages.find((entry) => entry.id === pageId);
  if (page) {
    loadPageIntoState(page);
    state.page = currentJournal().pages.findIndex((entry) => entry.id === pageId) + 1;
  }
  render();
  persist();
}

function movePage(direction) {
  capturePageState();
  const journal = currentJournal();
  const currentIndex = journal.pages.findIndex((page) => page.id === state.activePageId);
  const nextIndex = Math.max(0, Math.min(journal.pages.length - 1, currentIndex + direction));
  loadPageIntoState(journal.pages[nextIndex]);
  state.page = nextIndex + 1;
}

function createJournal() {
  capturePageState();
  const count = currentJournals().length + 1;
  const firstPage = makePage("Notebook Page", "notebook", "lined", [], []);
  const journal = {
    id: `journal-${Date.now()}`,
    title: `Notebook ${count}`,
    meta: "Created just now",
    cover: ["pink", "mint", "butter", "sky"][count % 4],
    pages: [firstPage],
  };
  state.journals = [...currentJournals(), journal];
  state.activeJournal = journal.id;
  state.activePageId = firstPage.id;
  loadPageIntoState(firstPage);
  state.page = 1;
}

function renameJournal() {
  const journal = currentJournal();
  const nextTitle = window.prompt("Notebook name", journal.title);
  if (!nextTitle?.trim()) return;
  journal.title = nextTitle.trim();
  journal.meta = "Renamed just now";
}

function reorderPage(direction) {
  capturePageState();
  const journal = currentJournal();
  const index = journal.pages.findIndex((entry) => entry.id === state.activePageId);
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= journal.pages.length) return;
  const [page] = journal.pages.splice(index, 1);
  journal.pages.splice(nextIndex, 0, page);
  state.page = nextIndex + 1;
  journal.meta = "Pages reordered";
}

function createPage() {
  capturePageState();
  const journal = currentJournal();
  const newPage = makePage(`Page ${journal.pages.length + 1}`, "notebook", state.activePaper || "lined", [], []);
  journal.pages.push(newPage);
  loadPageIntoState(newPage);
  state.page = journal.pages.length;
}

function duplicatePage() {
  capturePageState();
  const journal = currentJournal();
  const page = currentPage();
  const copy = makePage(`${page.title} Copy`, page.template, page.paper, page.elements, page.penPaths);
  const index = journal.pages.findIndex((entry) => entry.id === page.id);
  journal.pages.splice(index + 1, 0, copy);
  loadPageIntoState(copy);
  state.page = index + 2;
}

function renamePage() {
  const page = currentPage();
  const nextTitle = window.prompt("Page name", page.title);
  if (!nextTitle?.trim()) return;
  page.title = nextTitle.trim();
}

function deletePage() {
  const journal = currentJournal();
  if (journal.pages.length <= 1) {
    window.alert("A notebook needs at least one page.");
    return;
  }
  const page = currentPage();
  const confirmed = window.confirm(`Delete "${page.title}"? This removes the page from this notebook.`);
  if (!confirmed) return;
  const index = journal.pages.findIndex((entry) => entry.id === page.id);
  journal.pages.splice(index, 1);
  const nextPage = journal.pages[Math.max(0, index - 1)];
  loadPageIntoState(nextPage);
  state.page = journal.pages.findIndex((entry) => entry.id === nextPage.id) + 1;
}

function undoInk() {
  const stroke = state.penPaths.pop();
  if (stroke) state.redoPaths = [...(state.redoPaths || []), stroke];
}

function redoInk() {
  const stroke = state.redoPaths?.pop();
  if (stroke) state.penPaths = [...state.penPaths, stroke];
}

function importImage(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    addElement("image", reader.result);
    render();
    persist();
  });
  reader.readAsDataURL(file);
}

function exportNotebook() {
  capturePageState();
  const journal = currentJournal();
  const data = JSON.stringify({
    app: "Alex",
    version: 1,
    exportedAt: new Date().toISOString(),
    notebook: journal,
  }, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slugify(journal.title)}.alex-notebook.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importNotebook(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      const incoming = parsed.notebook || parsed;
      if (!incoming?.title || !Array.isArray(incoming.pages)) {
        window.alert("That file does not look like an Alex notebook backup.");
        return;
      }
      capturePageState();
      const imported = {
        ...incoming,
        id: `journal-${Date.now()}`,
        title: `${incoming.title} Import`,
        meta: "Imported just now",
        cover: coverStyles.includes(incoming.cover) ? incoming.cover : "pink",
        pages: incoming.pages.map((page, index) => ({
          id: `page-${Date.now()}-${index}`,
          title: page.title || `Page ${index + 1}`,
          template: page.template || "notebook",
          paper: page.paper || "lined",
          elements: Array.isArray(page.elements) ? page.elements : [],
          penPaths: Array.isArray(page.penPaths) ? page.penPaths : [],
          redoPaths: [],
          updatedAt: page.updatedAt || new Date().toISOString(),
        })),
      };
      state.journals = [...currentJournals(), imported];
      state.activeJournal = imported.id;
      loadPageIntoState(imported.pages[0]);
      state.page = 1;
      render();
      persist();
    } catch {
      window.alert("Alex could not read that notebook file.");
    } finally {
      event.target.value = "";
    }
  });
  reader.readAsText(file);
}

function drawElements() {
  const layer = document.getElementById("elements-layer");
  if (!layer) return;
  layer.innerHTML = state.elements.map((element) => {
    if (element.type === "text") {
      return `<textarea class="canvas-text ${state.selectedId === element.id ? "selected" : ""}" data-element="${element.id}" style="left:${element.x}%;top:${element.y}%;font-size:${element.size}px">${escapeHtml(element.value)}</textarea>`;
    }
    if (element.type === "image") {
      return `<img class="canvas-image ${state.selectedId === element.id ? "selected" : ""}" data-element="${element.id}" style="left:${element.x}%;top:${element.y}%;width:${element.size * 4}px" src="${element.value}" alt="Imported journal item" />`;
    }
    return `<button class="canvas-sticker ${state.selectedId === element.id ? "selected" : ""}" data-element="${element.id}" style="left:${element.x}%;top:${element.y}%;font-size:${element.size}px">${element.value}</button>`;
  }).join("");

  document.querySelectorAll("[data-element]").forEach((elementNode) => {
    const id = elementNode.dataset.element;
    let drag = null;
    elementNode.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
      state.selectedId = id;
      document.querySelectorAll("[data-element]").forEach((node) => node.classList.toggle("selected", node.dataset.element === id));
      const item = state.elements.find((entry) => entry.id === id);
      const rect = document.getElementById("book-spread").getBoundingClientRect();
      const zoom = state.zoom || 1;
      drag = {
        offsetX: (event.clientX - rect.left) / zoom - (item.x / 100) * (rect.width / zoom),
        offsetY: (event.clientY - rect.top) / zoom - (item.y / 100) * (rect.height / zoom),
      };
      elementNode.setPointerCapture(event.pointerId);
    });
    elementNode.addEventListener("pointermove", (event) => {
      if (!drag) return;
      const item = state.elements.find((entry) => entry.id === id);
      const rect = document.getElementById("book-spread").getBoundingClientRect();
      const zoom = state.zoom || 1;
      const logicalWidth = rect.width / zoom;
      const logicalHeight = rect.height / zoom;
      item.x = Math.max(2, Math.min(92, (((event.clientX - rect.left) / zoom - drag.offsetX) / logicalWidth) * 100));
      item.y = Math.max(2, Math.min(92, (((event.clientY - rect.top) / zoom - drag.offsetY) / logicalHeight) * 100));
      elementNode.style.left = `${item.x}%`;
      elementNode.style.top = `${item.y}%`;
      persist();
    });
    elementNode.addEventListener("pointerup", () => {
      drag = null;
    });
    if (elementNode.tagName === "TEXTAREA") {
      elementNode.addEventListener("input", (event) => {
        const item = state.elements.find((entry) => entry.id === id);
        item.value = event.target.value;
        persist();
      });
    }
  });
}

function setupCanvas() {
  canvas = document.getElementById("ink-layer");
  if (!canvas) return;
  resizeCanvas();
  window.onresize = resizeCanvas;
  canvas.addEventListener("pointerdown", beginDraw);
  canvas.addEventListener("pointermove", moveDraw);
  canvas.addEventListener("pointerup", endDraw);
  canvas.addEventListener("pointerleave", endDraw);
  paintPaths();
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  paintPaths();
}

function point(event) {
  const rect = canvas.getBoundingClientRect();
  const zoom = state.zoom || 1;
  return { x: (event.clientX - rect.left) / zoom, y: (event.clientY - rect.top) / zoom };
}

function beginDraw(event) {
  if (!["pen", "highlighter", "erase"].includes(state.activeTool)) return;
  drawing = true;
  canvas.setPointerCapture(event.pointerId);
  state.redoPaths = [];
  const preset = penPresets.find((entry) => entry.id === state.penPreset) || penPresets[0];
  const width = state.activeTool === "erase" ? Math.max(16, state.penWidth * 2) : state.activeTool === "highlighter" ? Math.max(12, state.penWidth) : state.penWidth;
  state.penPaths.push({
    color: state.activeTool === "erase" ? "#fffdf7" : state.activeColor,
    alpha: state.activeTool === "highlighter" ? 0.34 : preset.alpha,
    composite: state.activeTool === "erase" ? "destination-out" : "source-over",
    preset: state.activeTool === "erase" ? "eraser" : state.activeTool === "highlighter" ? "highlighter" : preset.id,
    width,
    points: [point(event)],
  });
}

function moveDraw(event) {
  if (!drawing) return;
  const path = state.penPaths[state.penPaths.length - 1];
  path.points.push(point(event));
  paintPaths();
  persist();
}

function endDraw() {
  drawing = false;
}

function paintPaths() {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  state.penPaths.forEach((path) => {
    ctx.save();
    ctx.globalCompositeOperation = path.composite || "source-over";
    ctx.globalAlpha = path.alpha || 1;
    ctx.strokeStyle = path.color;
    ctx.lineWidth = path.width;
    ctx.beginPath();
    drawSmoothPath(ctx, path.points);
    ctx.stroke();
    ctx.restore();
  });
}

function drawSmoothPath(ctx, points) {
  if (!points?.length) return;
  ctx.moveTo(points[0].x, points[0].y);
  if (points.length === 1) {
    ctx.lineTo(points[0].x + 0.1, points[0].y + 0.1);
    return;
  }
  for (let index = 1; index < points.length - 1; index += 1) {
    const midpoint = {
      x: (points[index].x + points[index + 1].x) / 2,
      y: (points[index].y + points[index + 1].y) / 2,
    };
    ctx.quadraticCurveTo(points[index].x, points[index].y, midpoint.x, midpoint.y);
  }
  const last = points[points.length - 1];
  ctx.lineTo(last.x, last.y);
}

function toHighlighter(color) {
  return `color-mix(in srgb, ${color} 40%, #fff59d)`;
}

function toolLabel() {
  if (state.activeTool === "erase") return "Eraser";
  if (state.activeTool === "highlighter") return "Highlighter";
  return penPresets.find((entry) => entry.id === state.penPreset)?.label || "Pen";
}

function persist() {
  capturePageState();
  const note = document.getElementById("save-note");
  if (note) note.textContent = "Saving...";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      activeTool: state.activeTool,
      activeJournal: state.activeJournal,
      activePageId: state.activePageId,
      journals: currentJournals(),
      activeColor: state.activeColor,
      penPreset: state.penPreset,
      penWidth: state.penWidth,
      zoom: state.zoom,
      panX: state.panX,
      panY: state.panY,
      page: state.page,
    }));
    const freshNote = document.getElementById("save-note");
    if (freshNote) freshNote.textContent = "Saved locally";
  }, 220);
}

function exportPage() {
  capturePageState();
  const data = JSON.stringify({
    activeJournal: currentJournal(),
    activePage: currentPage(),
  }, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "alex-notebook-page.json";
  link.click();
  URL.revokeObjectURL(url);
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "alex-notebook";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

render();
