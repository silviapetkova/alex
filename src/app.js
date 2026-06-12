const STORAGE_KEY = "alex-journal-prototype";
const APP_VERSION = "v3";

const templates = [
  { title: "Notebook Pages", template: "notebook", icon: "&#9636;" },
  { title: "Daily Pages", template: "daily", icon: "&#10022;" },
  { title: "Habit Trackers", template: "habit", icon: "&#10003;" },
  { title: "Reading Logs", template: "reading", icon: "&#9636;" },
  { title: "Weekly Planners", template: "week", icon: "&#9633;" },
  { title: "Monthly Plans", template: "month", icon: "&#9634;" },
  { title: "Blank Pages", template: "blank", icon: "&#9998;" },
];

const defaultHabitRows = ["Drink water", "Move my body", "Read", "No sugar", "Meditate"];
const habitLayouts = {
  week: ["M", "T", "W", "T", "F", "S", "S"],
  month: Array.from({ length: 31 }, (_, index) => String(index + 1)),
};
const stickerPacks = [
  { id: "classic", label: "Classic", items: [
    { glyph: "&#9825;", name: "heart" }, { glyph: "&#10047;", name: "flower" }, { glyph: "&#10048;", name: "blossom" },
    { glyph: "&#9749;", name: "tea" }, { glyph: "&#9729;", name: "cloud" }, { glyph: "&#9733;", name: "star" },
    { glyph: "&#10038;", name: "sparkle" }, { glyph: "&#128214;", name: "open book" }, { glyph: "&#127872;", name: "ribbon" },
    { glyph: "&#127793;", name: "sprout" }, { glyph: "&#9993;", name: "letter" }, { glyph: "&#128247;", name: "camera" },
  ] },
  { id: "nature", label: "Nature", items: [
    { glyph: "&#127799;", name: "tulip" }, { glyph: "&#127803;", name: "sunflower" }, { glyph: "&#127812;", name: "mushroom" },
    { glyph: "&#127769;", name: "moon" }, { glyph: "&#127752;", name: "rainbow" }, { glyph: "&#127810;", name: "autumn leaf" },
    { glyph: "&#129419;", name: "butterfly" }, { glyph: "&#128026;", name: "shell" }, { glyph: "&#127800;", name: "cherry blossom" },
    { glyph: "&#127808;", name: "clover" }, { glyph: "&#10052;", name: "snowflake" }, { glyph: "&#9728;", name: "sun" },
  ] },
  { id: "treats", label: "Treats", items: [
    { glyph: "&#129473;", name: "cupcake" }, { glyph: "&#127827;", name: "strawberry" }, { glyph: "&#129360;", name: "croissant" },
    { glyph: "&#127856;", name: "cake" }, { glyph: "&#127855;", name: "honey" }, { glyph: "&#127850;", name: "cookie" },
    { glyph: "&#127819;", name: "lemon" }, { glyph: "&#127825;", name: "peach" }, { glyph: "&#129371;", name: "milk" },
    { glyph: "&#127849;", name: "donut" }, { glyph: "&#127852;", name: "candy" }, { glyph: "&#127846;", name: "ice cream" },
  ] },
  { id: "study", label: "Study", items: [
    { glyph: "&#128218;", name: "books" }, { glyph: "&#9999;", name: "pencil" }, { glyph: "&#128204;", name: "pin" },
    { glyph: "&#128206;", name: "paperclip" }, { glyph: "&#128221;", name: "memo" }, { glyph: "&#128161;", name: "idea" },
    { glyph: "&#128269;", name: "magnifier" }, { glyph: "&#128197;", name: "calendar" }, { glyph: "&#9200;", name: "alarm" },
    { glyph: "&#127757;", name: "globe" }, { glyph: "&#127891;", name: "graduation" }, { glyph: "&#128278;", name: "bookmark" },
  ] },
  { id: "celebrate", label: "Celebrate", items: [
    { glyph: "&#127873;", name: "gift" }, { glyph: "&#127880;", name: "balloon" }, { glyph: "&#10024;", name: "sparkles" },
    { glyph: "&#127882;", name: "confetti" }, { glyph: "&#127881;", name: "party" }, { glyph: "&#128081;", name: "crown" },
    { glyph: "&#128142;", name: "gem" }, { glyph: "&#127942;", name: "trophy" }, { glyph: "&#127925;", name: "music" },
    { glyph: "&#127912;", name: "art" }, { glyph: "&#128140;", name: "love letter" }, { glyph: "&#127775;", name: "glowing star" },
  ] },
];
const stickers = stickerPacks.flatMap((pack) => pack.items.map((item) => item.glyph));
const tapes = ["gingham", "blue-grid", "leaf", "dots", "linen", "ink-dots"];
const colors = ["#202225", "#4d5256", "#e96d7b", "#c98255", "#d8aa2f", "#3c9b70", "#4f90b5", "#8a64b0", "#ffb7b9", "#f8d66d", "#9edbb8", "#a9d1e8"];
const paperStyles = [
  { id: "lined", label: "Lined" },
  { id: "dot", label: "Dot Grid" },
  { id: "grid", label: "Grid" },
  { id: "blank", label: "Blank" },
  { id: "linen", label: "Linen" },
  { id: "wood", label: "Wood" },
  { id: "concrete", label: "Concrete" },
];
const coverStyles = ["pink", "mint", "butter", "sky", "lavender", "rose"];
const themeStyles = [
  { id: "blush", label: "Blush Cozy", note: "Warm pink paper desk" },
  { id: "mint", label: "Mint Calm", note: "Fresh green study corner" },
  { id: "sky", label: "Sky Study", note: "Soft blue focus space" },
];
const railSections = [
  { icon: "book", label: "Pages", tab: "Pages" },
  { icon: "pen", label: "Pens", tab: "Pens" },
  { icon: "palette", label: "Paper", tab: "Paper" },
  { icon: "heart", label: "Marks", tab: "Marks" },
  { icon: "file", label: "Export", tab: "Export" },
];
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

const startHereElements = [
  { id: "start-note-1", type: "text", value: "Welcome to Alex. Try writing with the pen, adding marks, and changing paper from the tools.", x: 57, y: 63, size: 17 },
  { id: "start-heart-1", type: "sticker", value: "&#9825;", x: 31, y: 27, size: 42 },
  { id: "start-flower-1", type: "sticker", value: "&#10047;", x: 70, y: 36, size: 36 },
];

const defaultSettings = {
  theme: "blush",
  defaultPaper: "lined",
  defaultPenPreset: "gel",
  startupView: "library",
};

function makePage(title = "Notebook Page", template = "notebook", paper = "lined", elements = [], penPaths = [], habitChecks = {}, habitRows = defaultHabitRows, habitLayout = "week", moodChecks = {}, readingEntries = [], templateData = {}) {
  return {
    id: `page-${Date.now()}-${Math.round(Math.random() * 100000)}`,
    title,
    template,
    paper,
    elements: structuredClone(elements),
    penPaths: structuredClone(penPaths),
    habitChecks: normalizeHabitChecks(habitChecks),
    habitRows: normalizeHabitRows(habitRows),
    habitLayout: normalizeHabitLayout(habitLayout),
    moodChecks: normalizeMoodChecks(moodChecks),
    readingEntries: normalizeReadingEntries(readingEntries),
    templateData: normalizeTemplateData(templateData),
    redoPaths: [],
    undoStack: [],
    redoStack: [],
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
  view: "library",
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
  habitChecks: {},
  habitRows: structuredClone(defaultHabitRows),
  habitLayout: "week",
  moodChecks: {},
  readingEntries: [],
  templateData: {},
  activeStickerPack: "classic",
  customTemplates: [],
  redoPaths: [],
  undoStack: [],
  redoStack: [],
  page: 1,
  query: "",
  libraryQuery: "",
  activeInspectorTab: "Pens",
  journalMenuOpen: false,
  settings: { ...defaultSettings },
  onboardingComplete: false,
  lastSavedAt: null,
  lastBackupAt: null,
  backupReminderDismissedAt: null,
  editCountSinceBackup: 0,
  drawOffsetX: 0,
  drawOffsetY: 0,
  calibrationMode: false,
  calibrationTargetX: 50,
  calibrationTargetY: 50,
  penDiagnostics: null,
};

let loadedStoredState = false;
try {
  const storedState = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  state = { ...state, ...storedState };
  loadedStoredState = Boolean(localStorage.getItem(STORAGE_KEY));
} catch {
  state = { ...state };
}

normalizeState();

const root = document.getElementById("root");
let canvas;
let drawing = false;
let activePointerId = null;
let saveTimer;
let noticeTimer;
let scrollLockSnapshot = null;
const activeTouches = new Map();
let pinchState = null;
let pendingFocusElementId = null;

function normalizeState() {
  if (!state.journals?.length) state.journals = structuredClone(defaultJournals);

  state.journals = state.journals.map((journal, journalIndex) => {
    const pages = journal.pages?.length
      ? journal.pages.map((page, pageIndex) => ({
          id: page.id || `page-${journal.id}-${pageIndex + 1}`,
          title: page.title || `Page ${pageIndex + 1}`,
          template: page.template || state.activeTemplate || "notebook",
          paper: page.paper || state.activePaper || "lined",
          elements: normalizeElements(page.elements || []),
          penPaths: structuredClone(page.penPaths || []),
          habitChecks: normalizeHabitChecks(page.habitChecks),
          habitRows: normalizeHabitRows(page.habitRows),
          habitLayout: normalizeHabitLayout(page.habitLayout),
          moodChecks: normalizeMoodChecks(page.moodChecks),
          readingEntries: normalizeReadingEntries(page.readingEntries),
          templateData: normalizeTemplateData(page.templateData),
          redoPaths: structuredClone(page.redoPaths || []),
          undoStack: structuredClone(page.undoStack || []),
          redoStack: structuredClone(page.redoStack || []),
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
  state.settings = { ...defaultSettings, ...(state.settings || {}) };
  if (!themeStyles.some((theme) => theme.id === state.settings.theme)) state.settings.theme = defaultSettings.theme;
  if (!paperStyles.some((paper) => paper.id === state.settings.defaultPaper)) state.settings.defaultPaper = defaultSettings.defaultPaper;
  if (!penPresets.some((preset) => preset.id === state.settings.defaultPenPreset)) state.settings.defaultPenPreset = defaultSettings.defaultPenPreset;
  if (!["library", "editor"].includes(state.settings.startupView)) state.settings.startupView = defaultSettings.startupView;
  if (loadedStoredState && state.settings.startupView !== "editor") state.view = "library";
  if (loadedStoredState && state.settings.startupView === "editor") state.view = "editor";
  if (typeof state.onboardingComplete !== "boolean") state.onboardingComplete = false;
  if (!state.onboardingComplete) state.view = "onboarding";
  if (!state.activeColor) state.activeColor = colors[0];
  if (!state.view) state.view = "library";
  if (typeof state.libraryQuery !== "string") state.libraryQuery = "";
  if (!state.penPreset) state.penPreset = "gel";
  if (!state.penWidth) state.penWidth = 4;
  if (!state.zoom) state.zoom = 1;
  if (!state.activeInspectorTab) state.activeInspectorTab = "Pens";
  if (typeof state.journalMenuOpen !== "boolean") state.journalMenuOpen = false;
  if (typeof state.editCountSinceBackup !== "number") state.editCountSinceBackup = 0;
  if (typeof state.lastSavedAt !== "string") state.lastSavedAt = state.lastSavedAt || null;
  if (typeof state.lastBackupAt !== "string") state.lastBackupAt = state.lastBackupAt || null;
  if (typeof state.backupReminderDismissedAt !== "string") state.backupReminderDismissedAt = state.backupReminderDismissedAt || null;
  if (typeof state.panX !== "number") state.panX = 0;
  if (typeof state.panY !== "number") state.panY = 0;
  if (typeof state.drawOffsetX !== "number") state.drawOffsetX = 0;
  if (typeof state.drawOffsetY !== "number") state.drawOffsetY = 0;
  if (typeof state.calibrationMode !== "boolean") state.calibrationMode = false;
  if (typeof state.calibrationTargetX !== "number") state.calibrationTargetX = 50;
  if (typeof state.calibrationTargetY !== "number") state.calibrationTargetY = 50;
  if (!state.penDiagnostics || typeof state.penDiagnostics !== "object") state.penDiagnostics = null;
  if (!state.redoPaths) state.redoPaths = [];
  if (!state.undoStack) state.undoStack = [];
  if (!state.redoStack) state.redoStack = [];
  state.customTemplates = normalizeCustomTemplates(state.customTemplates);
  if (!stickerPacks.some((pack) => pack.id === state.activeStickerPack)) state.activeStickerPack = "classic";
}

function currentJournals() {
  return state.journals?.length ? state.journals : defaultJournals;
}

function normalizeElements(elements) {
  return structuredClone(elements).map((element) => ({
    rotation: 0,
    ...element,
    size: element.size || (element.type === "text" ? 18 : 38),
  }));
}

function normalizeHabitChecks(checks) {
  if (!checks || typeof checks !== "object" || Array.isArray(checks)) return {};
  return Object.fromEntries(Object.entries(checks).filter(([key, value]) => /^h-\d+-\d+$/.test(key) && typeof value === "boolean"));
}

function normalizeHabitRows(rows) {
  if (!Array.isArray(rows)) return structuredClone(defaultHabitRows);
  const cleaned = rows.map((row) => String(row || "").trim()).filter(Boolean).slice(0, 12);
  return cleaned.length ? cleaned : structuredClone(defaultHabitRows);
}

function normalizeHabitLayout(layout) {
  return Object.hasOwn(habitLayouts, layout) ? layout : "week";
}

function habitDayLabels() {
  return habitLayouts[normalizeHabitLayout(state.habitLayout)];
}

function normalizeMoodChecks(checks) {
  if (!checks || typeof checks !== "object" || Array.isArray(checks)) return {};
  return Object.fromEntries(Object.entries(checks).filter(([key, value]) => /^m-\d+$/.test(key) && typeof value === "number" && value >= 0 && value <= 6));
}

function normalizeReadingEntries(entries) {
  if (!Array.isArray(entries)) return [];
  return entries.map((entry) => ({
    title: String(entry?.title || "").trim().slice(0, 100),
    author: String(entry?.author || "").trim().slice(0, 100),
    quote: String(entry?.quote || "").trim().slice(0, 300),
    thoughts: String(entry?.thoughts || "").trim().slice(0, 500),
    rating: Math.min(5, Math.max(0, Number(entry?.rating || 0))),
  })).slice(0, 20);
}

function normalizeTemplateData(data) {
  const source = data && typeof data === "object" && !Array.isArray(data) ? data : {};
  const daily = source.daily && typeof source.daily === "object" ? source.daily : {};
  const topThree = Array.isArray(daily.topThree) ? daily.topThree : [];
  const schedule = Array.isArray(daily.schedule) ? daily.schedule : [];
  const weekly = source.weekly && typeof source.weekly === "object" ? source.weekly : {};
  return {
    daily: {
      topThree: Array.from({ length: 3 }, (_, index) => ({
        done: Boolean(topThree[index]?.done),
        text: String(topThree[index]?.text || "").slice(0, 80),
      })),
      schedule: Array.from({ length: 4 }, (_, index) => String(schedule[index] || "").slice(0, 80)),
      joys: String(daily.joys || "").slice(0, 200),
    },
    weekly: Object.fromEntries(Array.from({ length: 7 }, (_, day) => {
      const slots = Array.isArray(weekly[day]) ? weekly[day] : [];
      return [day, Array.from({ length: 2 }, (_, slot) => String(slots[slot] || "").slice(0, 80))];
    })),
    monthly: Object.fromEntries(
      Object.entries(source.monthly && typeof source.monthly === "object" && !Array.isArray(source.monthly) ? source.monthly : {})
        .filter(([key]) => /^([1-9]|[12]\d|3[01])$/.test(key))
        .map(([key, value]) => [key, String(value || "").slice(0, 40)])
        .filter(([, value]) => value)
    ),
  };
}

function templateUseCount(templateId) {
  return currentJournals().reduce(
    (total, journal) => total + (journal.pages || []).filter((page) => (page.template || "notebook") === templateId).length,
    0
  );
}

function startOfWeek(date) {
  const result = new Date(date);
  result.setDate(result.getDate() - ((result.getDay() + 6) % 7));
  return result;
}

function currentWeekDates() {
  const monday = startOfWeek(new Date());
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + index);
    return day;
  });
}

function shortDateLabel(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function habitCheckKey(row, day) {
  return `h-${row}-${day}`;
}

function defaultHabitChecked(row, day) {
  return (day + row) % 4 !== 0;
}

function isHabitChecked(row, day) {
  const key = habitCheckKey(row, day);
  return state.habitChecks?.[key] ?? defaultHabitChecked(row, day);
}

function moodCheckKey(day) {
  return `m-${day}`;
}

function getMoodForDay(day) {
  const key = moodCheckKey(day);
  return state.moodChecks?.[key] ?? -1;
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
  state.elements = normalizeElements(page.elements || []);
  state.penPaths = structuredClone(page.penPaths || []);
  state.habitChecks = normalizeHabitChecks(page.habitChecks);
  state.habitRows = normalizeHabitRows(page.habitRows);
  state.habitLayout = normalizeHabitLayout(page.habitLayout);
  state.moodChecks = normalizeMoodChecks(page.moodChecks);
  state.readingEntries = normalizeReadingEntries(page.readingEntries);
  state.templateData = normalizeTemplateData(page.templateData);
  state.redoPaths = structuredClone(page.redoPaths || []);
  state.undoStack = structuredClone(page.undoStack || []);
  state.redoStack = structuredClone(page.redoStack || []);
}

function capturePageState() {
  const journal = currentJournal();
  const page = currentPage();
  if (!journal || !page) return;
  page.template = state.activeTemplate;
  page.paper = state.activePaper;
  page.elements = structuredClone(state.elements || []);
  page.penPaths = structuredClone(state.penPaths || []);
  page.habitChecks = normalizeHabitChecks(state.habitChecks);
  page.habitRows = normalizeHabitRows(state.habitRows);
  page.habitLayout = normalizeHabitLayout(state.habitLayout);
  page.moodChecks = normalizeMoodChecks(state.moodChecks);
  page.readingEntries = normalizeReadingEntries(state.readingEntries);
  page.templateData = normalizeTemplateData(state.templateData);
  page.redoPaths = structuredClone(state.redoPaths || []);
  page.undoStack = structuredClone(state.undoStack || []);
  page.redoStack = structuredClone(state.redoStack || []);
  page.updatedAt = new Date().toISOString();
  journal.meta = "Edited just now";
}

function pageSnapshot() {
  return {
    template: state.activeTemplate,
    paper: state.activePaper,
    elements: structuredClone(state.elements || []),
    penPaths: structuredClone(state.penPaths || []),
    habitChecks: normalizeHabitChecks(state.habitChecks),
    habitRows: normalizeHabitRows(state.habitRows),
    habitLayout: normalizeHabitLayout(state.habitLayout),
    moodChecks: normalizeMoodChecks(state.moodChecks),
    readingEntries: normalizeReadingEntries(state.readingEntries),
    templateData: normalizeTemplateData(state.templateData),
    selectedId: state.selectedId,
  };
}

function restoreSnapshot(snapshot) {
  if (!snapshot) return;
  state.activeTemplate = snapshot.template || "notebook";
  state.activePaper = snapshot.paper || "lined";
  state.elements = structuredClone(snapshot.elements || []);
  state.penPaths = structuredClone(snapshot.penPaths || []);
  state.habitChecks = normalizeHabitChecks(snapshot.habitChecks);
  state.habitRows = normalizeHabitRows(snapshot.habitRows);
  state.habitLayout = normalizeHabitLayout(snapshot.habitLayout);
  state.moodChecks = normalizeMoodChecks(snapshot.moodChecks);
  state.readingEntries = normalizeReadingEntries(snapshot.readingEntries);
  state.templateData = normalizeTemplateData(snapshot.templateData);
  state.selectedId = snapshot.selectedId || null;
  state.redoPaths = [];
}

function pushHistory() {
  state.undoStack = [...(state.undoStack || []), pageSnapshot()].slice(-60);
  state.redoStack = [];
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
  applyAppTheme();

  if (state.view === "onboarding") {
    root.innerHTML = onboardingScreen();
    bind();
    return;
  }

  if (state.view === "settings") {
    root.innerHTML = settingsScreen();
    bind();
    return;
  }

  if (state.view === "library") {
    root.innerHTML = libraryHome();
    bind();
    return;
  }

  const journal = currentJournal();
  const pageData = currentPage();
  const pageIndex = journal.pages.findIndex((page) => page.id === pageData.id);
  root.innerHTML = `
    <div class="app-shell">
      <input id="image-import" type="file" accept="image/*" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0;" />
      <input class="hidden-file" id="pdf-import" type="file" accept="application/pdf,.pdf" />
      <input class="hidden-file" id="notebook-import" type="file" accept="application/json,.json" />
      <header class="topbar">
        <div class="brand">Alex<span>&hearts;</span></div>
        <button class="icon-button" data-action="go-library" aria-label="Notebook library">${icon("book")}</button>
        <div class="journal-switch-wrap">
          <button class="journal-switch" data-action="toggle-journal-menu" aria-expanded="${state.journalMenuOpen ? "true" : "false"}">${journal.title}<span>${icon("down")}</span></button>
          ${state.journalMenuOpen ? `
            <div class="journal-menu" role="menu" aria-label="Switch notebook">
              ${currentJournals().map((item) => `<button class="journal-menu-item ${item.id === journal.id ? "selected" : ""}" data-journal="${item.id}" role="menuitem">${escapeHtml(item.title)}</button>`).join("")}
            </div>
          ` : ""}
        </div>
        <div class="toolstrip" aria-label="Main tools">
          ${toolButton("pointer", "Select", "select")}
          ${toolButton("pen", "Pen", "pen")}
          ${toolButton("highlighter", "Highlight", "highlighter")}
          ${toolButton("erase", "Erase", "erase")}
          ${toolButton("text", "Text", "text")}
          ${toolButton("sticker", "Marks", "sticker")}
          ${imageToolButton()}
        </div>
        <div class="top-actions">
          <button class="icon-button" data-action="undo" aria-label="Undo">${icon("undo")}</button>
          <button class="icon-button" data-action="redo" aria-label="Redo">${icon("redo")}</button>
          <button class="export-button" data-action="export-page-png">${icon("export")}<span>Export PNG</span></button>
          <div class="save-status">${icon("save")}<span id="save-note">${saveStatusText()}</span></div>
          <div class="build-badge">${APP_VERSION}</div>
        </div>
      </header>
      <div id="storage-warning" class="storage-warning" style="display: none;">
        <span>⚠️ Running out of storage space. Consider exporting notebooks or clearing old pages.</span>
      </div>
      <main class="workspace">
        ${leftPanel(journal)}
        <section class="canvas-zone">
          <div class="journal-stage">
            <div class="stage-transform" id="stage-transform" style="${cameraStyle()}">
              <div class="book-spread paper-${state.activePaper}" id="book-spread">
                <div class="page left-page">${pageTemplate("left")}</div>
                <div class="page right-page">${pageTemplate("right")}</div>
                <canvas class="ink-layer ${isDrawingTool() ? "" : "inactive"}" id="ink-layer"></canvas>
                ${state.calibrationMode ? calibrationTargetHtml() : ""}
                <div id="elements-layer" class="object-layer ${isDrawingTool() ? "drawing-inactive" : ""}"></div>
              </div>
            </div>
          </div>
          <div class="page-footer">
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

function onboardingScreen() {
  return `
    <div class="onboarding-screen">
      <section class="onboarding-hero">
        <div class="onboarding-copy">
          <div class="brand">Alex<span>&hearts;</span></div>
          <h1>Make your first cozy notebook</h1>
          <p>Start with a gentle sample notebook, then write, decorate, plan, and keep everything saved locally on this device.</p>
          <div class="onboarding-actions">
            <button class="primary-action" data-action="create-sample-notebook">Start with Sample</button>
            <button class="secondary-action" data-action="complete-onboarding">Skip for Now</button>
          </div>
        </div>
        <div class="onboarding-preview" aria-label="Sample Alex notebook preview">
          <div class="preview-book cover pink">
            <span>Start Here</span>
          </div>
          <div class="preview-pages">
            <span class="paper-sample lined"></span>
            <span class="paper-sample dot"></span>
            <span class="paper-sample grid"></span>
          </div>
        </div>
      </section>
      <section class="onboarding-steps" aria-label="What you can do in Alex">
        <article><span>${icon("pen")}</span><strong>Write by hand</strong><small>Use pen, marker, highlighter, and eraser.</small></article>
        <article><span>${icon("heart")}</span><strong>Decorate pages</strong><small>Add stickers, text notes, images, and covers.</small></article>
        <article><span>${icon("save")}</span><strong>Save locally</strong><small>Your notebooks stay on this device.</small></article>
      </section>
    </div>
  `;
}

function libraryHome() {
  const query = state.libraryQuery.trim().toLowerCase();
  const results = librarySearchResults(query);
  const activeJournal = currentJournal();
  return `
    <div class="library-home">
      <input class="hidden-file" id="notebook-import" type="file" accept="application/json,.json" />
      <header class="library-hero">
        <div>
          <div class="brand">Alex<span>&hearts;</span></div>
          <h1>Your cozy notebook shelf</h1>
          <p>Open a notebook, keep writing, or start a fresh handwritten space. Everything stays saved on this device.</p>
        </div>
        <div class="library-actions">
          <button class="primary-action" data-action="open-editor">Continue Writing</button>
          <button class="secondary-action" data-action="new-journal">${icon("plus")} New Notebook</button>
          <button class="secondary-action" data-action="go-settings">${icon("palette")} Settings</button>
          <button class="secondary-action" data-action="import-notebook">${icon("export")} Restore</button>
        </div>
      </header>
      <main class="library-main">
        <section class="continue-card">
          <div class="cover ${activeJournal.cover}"></div>
          <div>
            <span class="section-kicker">Last notebook</span>
            <h2>${escapeHtml(activeJournal.title)}</h2>
            <p>${activeJournal.pages.length === 1 ? "1 page" : `${activeJournal.pages.length} pages`} ready for notes, sketches, and plans.</p>
          </div>
          <button data-open-journal="${activeJournal.id}">Open</button>
        </section>
        <section class="shelf-panel">
          <div class="shelf-toolbar">
            <div>
              <span class="section-kicker">Library</span>
              <h2>Notebooks</h2>
            </div>
            <label class="library-search">${icon("search")}<input id="library-search" value="${escapeHtml(state.libraryQuery)}" placeholder="Search notebooks and pages" /></label>
          </div>
          <div class="notebook-grid">
            ${results.map((result) => notebookCard(result.journal, result)).join("") || `<p class="empty-library">No notebooks or pages match that search.</p>`}
          </div>
        </section>
      </main>
    </div>
  `;
}

function settingsScreen() {
  return `
    <div class="settings-screen">
      <input class="hidden-file" id="notebook-import" type="file" accept="application/json,.json" />
      <header class="settings-topbar">
        <div>
          <div class="brand">Alex<span>&hearts;</span></div>
          <h1>Settings</h1>
          <p>Choose the cozy defaults Alex uses when you start writing and make new pages.</p>
        </div>
        <div class="library-actions">
          <button class="primary-action" data-action="go-library">Library</button>
          <button class="secondary-action" data-action="open-editor">Open Notebook</button>
        </div>
      </header>
      <main class="settings-grid">
        ${settingsSection("Cozy Theme", "Sets the app mood across the library, editor, and settings.", themeStyles.map((theme) => `
          <button class="setting-choice theme-choice ${state.settings.theme === theme.id ? "selected" : ""}" data-setting-key="theme" data-setting-value="${theme.id}">
            <span class="theme-swatch ${theme.id}"></span>
            <span class="setting-copy"><strong>${theme.label}</strong><small>${theme.note}</small></span>
          </button>
        `).join(""))}
        ${settingsSection("New Page Paper", "Used for new notebooks and new pages.", paperStyles.map((paper) => `
          <button class="setting-choice ${state.settings.defaultPaper === paper.id ? "selected" : ""}" data-setting-key="defaultPaper" data-setting-value="${paper.id}">
            <span class="paper-sample ${paper.id}"></span>
            <span class="setting-copy"><strong>${paper.label}</strong></span>
          </button>
        `).join(""))}
        ${settingsSection("Default Pen", "Used when Alex creates a fresh writing space.", penPresets.map((preset) => `
          <button class="setting-choice ${state.settings.defaultPenPreset === preset.id ? "selected" : ""}" data-setting-key="defaultPenPreset" data-setting-value="${preset.id}">
            <span class="pen-dot ${preset.id}"></span>
            <span class="setting-copy"><strong>${preset.label}</strong></span>
          </button>
        `).join(""))}
        ${settingsSection("Start Screen", "Choose what opens when you return to Alex.", `
          <button class="setting-choice ${state.settings.startupView === "library" ? "selected" : ""}" data-setting-key="startupView" data-setting-value="library">
            <span class="setting-symbol">${icon("book")}</span>
            <span class="setting-copy"><strong>Library first</strong><small>Start at your notebook shelf.</small></span>
          </button>
          <button class="setting-choice ${state.settings.startupView === "editor" ? "selected" : ""}" data-setting-key="startupView" data-setting-value="editor">
            <span class="setting-symbol">${icon("pen")}</span>
            <span class="setting-copy"><strong>Notebook first</strong><small>Jump back into writing.</small></span>
          </button>
        `)}
      </main>
    </div>
  `;
}

function settingsSection(title, note, content) {
  return `
    <section class="settings-panel">
      <div class="settings-panel-heading">
        <h2>${title}</h2>
        <p>${note}</p>
      </div>
      <div class="settings-options">${content}</div>
    </section>
  `;
}

function librarySearchResults(query) {
  return currentJournals()
    .map((journal) => {
      const titleMatch = query && journal.title.toLowerCase().includes(query);
      const pageMatches = query
        ? journal.pages.filter((page) => page.title.toLowerCase().includes(query))
        : [];
      return { journal, titleMatch: Boolean(titleMatch), pageMatches };
    })
    .filter((result) => !query || result.titleMatch || result.pageMatches.length);
}

function notebookCard(journal, result = { pageMatches: [] }) {
  const pageLabel = journal.pages.length === 1 ? "1 page" : `${journal.pages.length} pages`;
  const latest = journal.pages.find((page) => page.id === state.activePageId && journal.id === state.activeJournal) || journal.pages[0];
  const pageMatches = result.pageMatches || [];
  return `
    <article class="notebook-card">
      <button class="notebook-cover ${journal.cover}" data-open-journal="${journal.id}" aria-label="Open ${escapeHtml(journal.title)}">
        <span>${escapeHtml(journal.title.slice(0, 1))}</span>
      </button>
      <div class="notebook-card-body">
        <div class="notebook-preview-strip" aria-hidden="true">
          ${journal.pages.slice(0, 3).map((page) => pagePreview(page, "mini")).join("")}
        </div>
        <h3>${escapeHtml(journal.title)}</h3>
        <p>${pageLabel} · ${escapeHtml(latest.title || "Notebook Page")}</p>
        ${pageMatches.length ? `
          <div class="page-result-list" aria-label="Matching pages">
            ${pageMatches.slice(0, 3).map((page) => `
              <button class="page-result" data-open-page="${journal.id}:${page.id}">
                ${pagePreview(page, "search")}
                <span><strong>${escapeHtml(page.title)}</strong><small>${page.template || "notebook"} page</small></span>
              </button>
            `).join("")}
          </div>
        ` : ""}
        <button data-open-journal="${journal.id}">Open Notebook</button>
      </div>
    </article>
  `;
}

function pagePreview(page, size = "list") {
  const elements = page.elements || [];
  const textPreview = elements.find((element) => element.type === "text")?.value || page.title || "";
  const stickers = elements.filter((element) => element.type === "sticker").slice(0, size === "mini" ? 2 : 3);
  const inkCount = (page.penPaths || []).length;
  const className = `page-preview ${size} ${page.paper || "lined"}`;
  return `
    <span class="${className}">
      <span class="preview-title">${escapeHtml(page.title || "Page")}</span>
      <span class="preview-lines"><i></i><i></i><i></i></span>
      <span class="preview-text">${escapeHtml(String(textPreview).slice(0, 48))}</span>
      <span class="preview-stickers">${stickers.map((element) => `<b>${element.value}</b>`).join("")}</span>
      ${inkCount ? `<span class="preview-ink" style="width:${Math.min(72, 22 + inkCount * 8)}%"></span>` : ""}
    </span>
  `;
}

function pageSummary(page) {
  const textCount = (page.elements || []).filter((element) => element.type === "text").length;
  const markCount = (page.elements || []).filter((element) => element.type === "sticker").length;
  const inkCount = (page.penPaths || []).length;
  const parts = [];
  if (inkCount) parts.push(`${inkCount} ink`);
  if (textCount) parts.push(`${textCount} text`);
  if (markCount) parts.push(`${markCount} marks`);
  return parts.join(", ") || "blank";
}

function toolButton(iconName, label, tool) {
  const active = state.activeTool === tool ? " active" : "";
  return `<button class="tool-button${active}" data-tool="${tool}"><span class="tool-icon">${icon(iconName)}</span><span>${label}</span></button>`;
}

function imageToolButton() {
  return `<label class="tool-button" data-image-tool="true" for="image-import" role="button" tabindex="0"><span class="tool-icon">${icon("image")}</span><span>Image</span></label>`;
}

function isDrawingTool() {
  return ["pen", "highlighter", "erase"].includes(state.activeTool);
}

function cameraStyle() {
  const inverse = 1 / (state.zoom || 1);
  return `--camera-scale:${state.zoom};--inverse-camera-scale:${inverse};transform: translate(${state.panX}px, ${state.panY}px) scale(${state.zoom})`;
}

function leftPanel(activeJournal) {
  return `
    <aside class="left-panel">
      <nav class="rail-icons" aria-label="Sections">
        ${railSections.map((section) => `
          <button class="rail-button ${state.activeInspectorTab === section.tab ? "active" : ""}" data-inspector-tab="${section.tab}" aria-label="${section.label}" title="${section.label}">
            ${icon(section.icon)}
          </button>
        `).join("")}
      </nav>
      <div class="library">
        <div class="panel-heading"><span>Notebooks</span><button data-action="new-journal" aria-label="New notebook">${icon("plus")}</button></div>
        <div class="journal-list">
          ${currentJournals().map((journal) => `
            <button class="journal-row ${activeJournal.id === journal.id ? "selected" : ""}" data-journal="${journal.id}">
              <span class="cover ${journal.cover}"></span>
              <span><strong>${journal.title}</strong><small>${journal.pages.length === 1 ? "1 page" : `${journal.pages.length} pages`}</small></span>
            </button>
          `).join("")}
        </div>
        <button class="new-journal" data-action="new-journal">${icon("plus")}<span>New Notebook</span></button>
        <button class="new-journal quiet" data-action="rename-journal">${icon("edit")}<span>Rename Notebook</span></button>
        <button class="new-journal quiet danger" data-action="delete-journal">${icon("trash")}<span>Delete Notebook</span></button>
        <div class="template-head"><span>Covers</span><button data-inspector-tab="Export">Export</button></div>
        <div class="cover-grid">
          ${coverStyles.map((cover) => `<button class="cover ${cover} ${activeJournal.cover === cover ? "selected" : ""}" data-cover="${cover}" aria-label="${cover} cover"></button>`).join("")}
        </div>
        <button class="new-journal quiet" data-inspector-tab="Export">${icon("export")}<span>Backup & Restore</span></button>
        <div class="template-head"><span>Page Types</span><button>See all</button></div>
        <div class="template-list">
          ${templates.map((item) => `
            <button class="template-row ${state.activeTemplate === item.template ? "selected" : ""}" data-template="${item.template}">
              <span class="template-icon">${item.icon}</span><span>${item.title}</span><small>${templateUseCount(item.template)}</small>
            </button>
          `).join("")}
        </div>
        ${normalizeCustomTemplates(state.customTemplates).length ? `
        <div class="template-head"><span>My Templates</span></div>
        <div class="template-list">
          ${normalizeCustomTemplates(state.customTemplates).map((template) => `
            <div class="custom-template-row">
              <button class="template-row" data-custom-template="${template.id}">
                <span class="template-icon">&#9734;</span><span>${escapeHtml(template.name)}</span>
              </button>
              <button class="custom-template-remove" data-custom-template-remove="${template.id}" aria-label="Delete ${escapeHtml(template.name)}">-</button>
            </div>
          `).join("")}
        </div>` : ""}
        <button class="new-journal quiet" data-action="save-page-template">${icon("plus")}<span>Save Page as Template</span></button>
      </div>
    </aside>
  `;
}

function visibleStickerItems() {
  const query = (state.query || "").trim().toLowerCase();
  if (query) return stickerPacks.flatMap((pack) => pack.items).filter((item) => item.name.includes(query));
  const pack = stickerPacks.find((entry) => entry.id === state.activeStickerPack) || stickerPacks[0];
  return pack.items;
}

function rightPanel(journal, pageData) {
  const visibleStickers = visibleStickerItems();
  return `
    <aside class="right-panel">
      <div class="asset-tabs" role="tablist" aria-label="Inspector tabs">${["Pens", "Paper", "Marks", "Pages", "Export"].map((tab) => `<button class="${state.activeInspectorTab === tab ? "active" : ""}" data-inspector-tab="${tab}" role="tab" aria-selected="${state.activeInspectorTab === tab ? "true" : "false"}">${tab}</button>`).join("")}</div>
      ${inspectorTabContent(state.activeInspectorTab, journal, pageData, visibleStickers)}
    </aside>
  `;
}

function inspectorTabContent(tab, journal, pageData, visibleStickers) {
  if (tab === "Paper") {
    return `
      ${panelSection("Paper", `<div class="paper-grid">${paperStyles.map((paper) => `<button class="${state.activePaper === paper.id ? "selected" : ""}" data-paper="${paper.id}"><span class="paper-sample ${paper.id}"></span>${paper.label}</button>`).join("")}</div>`)}
      ${panelSection("Pages", pageList(journal, pageData))}
    `;
  }

  if (tab === "Marks") {
    return `
      <label class="search-box">${icon("search")}<input id="sticker-search" value="${state.query}" placeholder="Search marks" /></label>
      ${state.query.trim() ? "" : `<div class="sticker-pack-tabs">${stickerPacks.map((pack) => `<button class="${(state.activeStickerPack || "classic") === pack.id ? "active" : ""}" data-sticker-pack="${pack.id}">${pack.label}</button>`).join("")}</div>`}
      ${panelSection("Margin Marks", stickerGrid(visibleStickers))}
      ${panelSection("Washi Tape", `<div class="tape-grid">${tapes.map((tape) => `<button class="${tape}" data-tape="${tape}" aria-label="${tape} tape"></button>`).join("")}</div>`)}
    `;
  }

  if (tab === "Pages") {
    return `${panelSection("Pages", pageList(journal, pageData))}`;
  }

  if (tab === "Export") {
    return `
      ${panelSection("Export Page", `
        <div class="export-grid">
          <button data-action="export-page-png">Export Page PNG</button>
          <button data-action="export">Export Page JSON</button>
        </div>
      `)}
      ${panelSection("Notebook Backup", `
        ${backupReminderHtml(journal)}
        <div class="export-grid">
          <button data-action="export-notebook-pdf">Export Notebook PDF</button>
          <button data-action="import-pdf">Import PDF as Page</button>
          <button data-action="export-notebook">Backup Notebook JSON</button>
          <button data-action="import-notebook">Restore Notebook JSON</button>
        </div>
        <p class="export-note">Last saved: ${saveStatusText()}. Last backup: ${backupStatusText()}.</p>
        <p class="export-note">PDF export opens a print-ready notebook. Imported PDFs become local notebook pages with movable PDF attachments.</p>
      `)}
    `;
  }

  return `
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
    ${panelSection("Ink Alignment", inkAlignmentControls())}
    ${panelSection("Ink Colors", `<div class="color-grid">${colors.map((color) => `<button class="${state.activeColor === color ? "selected" : ""}" style="background:${color}" data-color="${color}"></button>`).join("")}</div>`)}
    ${panelSection("Selection", selectionControls())}
  `;
}

function inkAlignmentControls() {
  return `
    <div class="calibration-actions">
      <button data-action="start-ink-calibration">${state.calibrationMode ? "Tap target on page" : "Calibrate on Page"}</button>
      <button data-action="ink-align-reset">Reset</button>
    </div>
    <div class="alignment-pad" aria-label="Ink alignment controls">
      <button data-action="ink-align-up">Up</button>
      <button data-action="ink-align-left">Left</button>
      <button data-action="start-ink-calibration">Target</button>
      <button data-action="ink-align-right">Right</button>
      <button data-action="ink-align-down">Down</button>
    </div>
    <p class="alignment-note">Offset: ${Math.round(state.drawOffsetX)}px, ${Math.round(state.drawOffsetY)}px</p>
    ${penDiagnosticsHtml()}
  `;
}

function penDiagnosticsHtml() {
  const data = state.penDiagnostics;
  if (!data) return `<pre class="pen-diagnostics">Tap/write once to show Pencil data.</pre>`;
  return `<pre class="pen-diagnostics">${escapeHtml([
    `event ${data.type || "pointer"} id ${data.pointerId ?? "-"} ${data.pointerType || "-"}`,
    `client ${data.clientX}, ${data.clientY}`,
    `page ${data.pageX}, ${data.pageY}`,
    `offset ${data.offsetX}, ${data.offsetY}`,
    `book ${data.bookLeft}, ${data.bookTop}, ${data.bookWidth}x${data.bookHeight}`,
    `canvas ${data.canvasWidth}x${data.canvasHeight}`,
    `point ${data.pointX}, ${data.pointY}`,
    `scroll ${data.scrollX}, ${data.scrollY}`,
    `ink ${Math.round(state.drawOffsetX)}px, ${Math.round(state.drawOffsetY)}px`,
  ].join("\n"))}</pre>`;
}

function calibrationTargetHtml() {
  return `
    <button class="calibration-target" id="calibration-target" style="left:${state.calibrationTargetX}%;top:${state.calibrationTargetY}%" aria-label="Tap here with Pencil">
      <span></span>
    </button>
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
          ${pagePreview(page)}
          <span class="page-row-copy"><strong>${index + 1}. ${escapeHtml(page.title)}</strong><small>${page.template || "notebook"} page - ${pageSummary(page)}</small></span>
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
  const label = selected.type === "text" ? "Text Size" : selected.type === "image" ? "Image Size" : selected.type === "pdf" ? "PDF Size" : "Mark Size";
  const min = selected.type === "text" ? 12 : 20;
  const max = selected.type === "image" || selected.type === "pdf" ? 120 : 72;
  const canRotate = selected.type !== "text";
  return `
    <label class="range-row"><span>${label}</span><input id="element-size" type="range" min="${min}" max="${max}" value="${selected.size}" /></label>
    ${canRotate ? `<label class="range-row"><span>Rotate</span><input id="element-rotation" type="range" min="-180" max="180" value="${selected.rotation || 0}" /></label>` : ""}
    <div class="selection-actions">
      <button data-action="nudge-left">${icon("left")}</button>
      <button data-action="nudge-up">Up</button>
      <button data-action="nudge-down">Down</button>
      <button data-action="nudge-right">${icon("right")}</button>
      <button data-action="duplicate-element">Duplicate</button>
      <button data-action="bring-forward">Forward</button>
      <button data-action="send-backward">Backward</button>
      <button data-action="bring-front">Front</button>
      <button data-action="send-back">Back</button>
      <button data-action="delete-element">Delete</button>
    </div>
  `;
}

function backupReminderHtml(journal) {
  if (!shouldShowBackupReminder(journal)) return "";
  return `
    <div class="backup-reminder" role="status">
      <div>
        <strong>Time for a local backup</strong>
        <span>${journal.pages.length} pages saved here. Export a JSON backup so your notebook has a copy outside the browser.</span>
      </div>
      <button data-action="dismiss-backup-reminder" aria-label="Dismiss backup reminder">Dismiss</button>
    </div>
  `;
}

function shouldShowBackupReminder(journal) {
  if (!journal?.pages?.length) return false;
  if (journal.pages.length < 3 && state.editCountSinceBackup < 8) return false;
  if (state.lastBackupAt && state.lastSavedAt && new Date(state.lastBackupAt) >= new Date(state.lastSavedAt)) return false;
  if (state.backupReminderDismissedAt && state.lastSavedAt && new Date(state.backupReminderDismissedAt) >= new Date(state.lastSavedAt)) return false;
  return true;
}

function saveStatusText() {
  return state.lastSavedAt ? `Saved ${formatRelativeTime(state.lastSavedAt)}` : "Saved locally";
}

function backupStatusText() {
  return state.lastBackupAt ? formatRelativeTime(state.lastBackupAt) : "not backed up yet";
}

function formatRelativeTime(value) {
  const timestamp = new Date(value).getTime();
  if (!Number.isFinite(timestamp)) return "locally";
  const seconds = Math.max(1, Math.round((Date.now() - timestamp) / 1000));
  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

function showNotice(message, type = "success") {
  clearTimeout(noticeTimer);
  document.querySelector(".app-toast")?.remove();
  const toast = document.createElement("div");
  toast.className = `app-toast ${type}`;
  toast.setAttribute("role", "status");
  toast.textContent = message;
  document.body.append(toast);
  noticeTimer = setTimeout(() => {
    toast.classList.add("leaving");
    setTimeout(() => toast.remove(), 220);
  }, 2400);
}

function stickerGrid(items) {
  if (!items.length) return `<div class="sticker-grid-empty">No marks match that search.</div>`;
  return `<div class="sticker-grid">${items.map((item) => `<button data-sticker="${item.glyph}" title="${item.name}" aria-label="${item.name}">${item.glyph}</button>`).join("")}</div>`;
}

function panelSection(title, content) {
  return `<section class="panel-section"><h3>${title}</h3>${content}</section>`;
}

function pageTemplate(side) {
  const template = state.activeTemplate;
  if (template === "daily") return side === "left" ? dailyPage() : notesPage();
  if (template === "month") return side === "left" ? monthPage() : notesPage();
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
  const data = normalizeTemplateData(state.templateData);
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hints = ["Morning notes", "Sketch ideas", "Meeting notes", "Study session", "Freewriting", "Reading notes", "Plan next week"];
  const dates = currentWeekDates();
  const today = new Date().getDate();
  return `<h1>Cozy Week <span>&#9825;</span></h1><div class="week-list">${dayNames.map((day, index) => `
    <div class="day-row ${dates[index].getDate() === today ? "today" : ""}"><div class="date-card ${day.toLowerCase()}"><span>${day}</span><strong>${dates[index].getDate()}</strong></div><div class="day-entries">${[0, 1].map((slot) => `<input class="day-entry" data-week-day="${index}" data-week-slot="${slot}" value="${escapeHtml(data.weekly[index][slot])}" placeholder="${slot === 0 ? hints[index] : "Add a note"}" maxlength="80" />`).join("")}</div></div>
  `).join("")}</div>`;
}

function trackerPage() {
  const days = habitDayLabels();
  const rows = normalizeHabitRows(state.habitRows);
  const week = currentWeekDates();
  const rangeLabel = state.habitLayout === "month"
    ? new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : `${shortDateLabel(week[0])} - ${shortDateLabel(week[6])}`;
  return `
    <div class="tape-label blue">${rangeLabel}</div>
    <div class="habit-controls" aria-label="Habit tracker controls">
      <button data-action="add-habit-row">+ Habit</button>
      <div class="habit-layout-toggle">
        ${Object.keys(habitLayouts).map((layout) => `<button class="${state.habitLayout === layout ? "active" : ""}" data-habit-layout="${layout}" aria-pressed="${state.habitLayout === layout}">${layout === "week" ? "Week" : "Month"}</button>`).join("")}
      </div>
    </div>
    <h2>habit tracker</h2>
    <div class="habit-scroll"><div class="habit-grid habit-${state.habitLayout}"><div></div>${days.map((day) => `<b>${day}</b>`).join("")}${rows.map((habit, row) => `<span class="habit-row-label"><button class="habit-name" data-habit-name="${row}" aria-label="Rename ${escapeHtml(habit)}">${escapeHtml(habit)}</button><button class="habit-remove" data-habit-remove="${row}" aria-label="Remove ${escapeHtml(habit)}">-</button></span>${days.map((day, index) => `<button class="habit-check ${isHabitChecked(row, index) ? "filled" : ""}" data-habit-row="${row}" data-habit-day="${index}" aria-pressed="${isHabitChecked(row, index)}" aria-label="${escapeHtml(habit)} ${day}"></button>`).join("")}`).join("")}</div></div>
    <h2>mood tracker</h2>
    <div class="moods">${["&#9786;", "&#9787;", "-", "&#9675;", "&#9825;", "&#9685;", "&#9733;"].map((emoji, moodIndex) => {
      const dayLabel = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][moodIndex];
      return `<div class="mood-day"><button class="mood-button ${getMoodForDay(moodIndex) === moodIndex ? "selected" : ""}" data-mood-day="${moodIndex}" data-mood-value="${moodIndex}" aria-pressed="${getMoodForDay(moodIndex) === moodIndex}" aria-label="Mood ${moodIndex} on ${dayLabel}">${emoji}</button><small>${dayLabel}</small></div>`;
    }).join("")}</div>
    <div class="notes-box"><div class="tape-label small">notes</div></div>
  `;
}

function dailyPage() {
  const daily = normalizeTemplateData(state.templateData).daily;
  const taskHints = ["gentle morning", "write one page", "tidy desk"];
  const scheduleHints = ["9:00 tea + planning", "12:30 lunch walk", "15:00 deep focus", "18:00 reset"];
  const todayLabel = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  return `<h1>Today <span>&#9825;</span></h1><div class="today-date">${todayLabel}</div><div class="daily-grid">
    <section><h2>top three</h2><div class="daily-tasks">${daily.topThree.map((task, index) => `<div class="daily-task"><button class="daily-task-check ${task.done ? "done" : ""}" data-daily-task="${index}" aria-pressed="${task.done}" aria-label="Toggle task ${index + 1}"></button><input class="daily-task-text ${task.done ? "done" : ""}" data-daily-field="task" data-daily-index="${index}" value="${escapeHtml(task.text)}" placeholder="${taskHints[index]}" maxlength="80" /></div>`).join("")}</div></section>
    <section><h2>schedule</h2><div class="daily-schedule">${daily.schedule.map((entry, index) => `<input class="daily-schedule-entry" data-daily-field="schedule" data-daily-index="${index}" value="${escapeHtml(entry)}" placeholder="${scheduleHints[index]}" maxlength="80" />`).join("")}</div></section>
    <section><h2>little joys</h2><textarea class="daily-joys" data-daily-field="joys" data-daily-index="0" placeholder="fresh flowers, soft socks, music" maxlength="200">${escapeHtml(daily.joys)}</textarea></section>
  </div>`;
}

function habitPage(title) {
  return `<h1>${title}</h1>${trackerPage()}`;
}

function monthPage() {
  const data = normalizeTemplateData(state.templateData);
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const monthLabel = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const heads = ["M", "T", "W", "T", "F", "S", "S"].map((day) => `<b class="month-head">${day}</b>`).join("");
  const blanks = Array.from({ length: firstOffset }, () => `<div class="month-cell empty"></div>`).join("");
  const cells = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    return `<div class="month-cell ${day === now.getDate() ? "today" : ""}"><b>${day}</b><input class="month-note" data-month-day="${day}" value="${escapeHtml(data.monthly[day] || "")}" maxlength="40" aria-label="Plan for day ${day}" /></div>`;
  }).join("");
  return `<h1>${monthLabel} <span>&#9825;</span></h1><div class="month-grid">${heads}${blanks}${cells}</div>`;
}

function readingPage() {
  const saved = normalizeReadingEntries(state.readingEntries);
  const entries = saved.length ? saved : [{ title: "", author: "", quote: "", thoughts: "", rating: 0 }];
  return `<h1>Reading Log</h1>
    <div class="reading-form">
      ${entries.map((entry, index) => `
      <div class="reading-card">
        <div class="reading-card-top">
          <input class="reading-input" data-reading-field="title" data-reading-index="${index}" placeholder="Book title" value="${escapeHtml(entry.title)}" maxlength="100" />
          ${entries.length > 1 ? `<button class="reading-remove" data-reading-remove="${index}" aria-label="Remove book">-</button>` : ""}
        </div>
        <input class="reading-input" data-reading-field="author" data-reading-index="${index}" placeholder="Author" value="${escapeHtml(entry.author)}" maxlength="100" />
        <textarea class="reading-input reading-textarea" data-reading-field="thoughts" data-reading-index="${index}" placeholder="Thoughts, favorite quotes..." maxlength="500">${escapeHtml(entry.thoughts)}</textarea>
        <div class="rating-buttons">
          ${[1, 2, 3, 4, 5].map((star) => `<button class="rating-star ${entry.rating >= star ? "filled" : ""}" data-rating="${star}" data-reading-index="${index}" aria-pressed="${entry.rating >= star}" aria-label="Rate ${star} of 5">&#9733;</button>`).join("")}
        </div>
      </div>`).join("")}
      <button class="reading-add" data-reading-add>+ Add a book</button>
    </div>`;
}

function blankPage(title) {
  return `<h1>${title}</h1><div class="blank-lines"></div>`;
}

function notesPage() {
  return blankPage("Notes");
}

let delegatedEventsBound = false;

function bindDelegatedEvents() {
  if (delegatedEventsBound) return;
  delegatedEventsBound = true;

  document.addEventListener("click", (event) => {
    const habitCheck = event.target.closest?.("[data-habit-row][data-habit-day]");
    if (habitCheck) return toggleHabitCheck(habitCheck.dataset.habitRow, habitCheck.dataset.habitDay);
    const habitName = event.target.closest?.("[data-habit-name]");
    if (habitName) return renameHabitRow(habitName.dataset.habitName);
    const habitRemove = event.target.closest?.("[data-habit-remove]");
    if (habitRemove) return removeHabitRow(habitRemove.dataset.habitRemove);
    const habitLayout = event.target.closest?.("[data-habit-layout]");
    if (habitLayout) return setHabitLayout(habitLayout.dataset.habitLayout);
    const moodButton = event.target.closest?.("[data-mood-day]");
    if (moodButton) return toggleMoodDay(moodButton.dataset.moodDay, moodButton.dataset.moodValue);
    const ratingButton = event.target.closest?.("[data-rating]");
    if (ratingButton) return setReadingRating(ratingButton.dataset.readingIndex, ratingButton.dataset.rating);
    const readingAdd = event.target.closest?.("[data-reading-add]");
    if (readingAdd) return addReadingEntry();
    const readingRemove = event.target.closest?.("[data-reading-remove]");
    if (readingRemove) return removeReadingEntry(readingRemove.dataset.readingRemove);
    const dailyTask = event.target.closest?.("[data-daily-task]");
    if (dailyTask) return toggleDailyTask(dailyTask.dataset.dailyTask);
    const stickerPack = event.target.closest?.("[data-sticker-pack]");
    if (stickerPack) return setStickerPack(stickerPack.dataset.stickerPack);
    const customTemplate = event.target.closest?.("[data-custom-template]");
    if (customTemplate) return applyCustomTemplate(customTemplate.dataset.customTemplate);
    const customTemplateRemove = event.target.closest?.("[data-custom-template-remove]");
    if (customTemplateRemove) return removeCustomTemplate(customTemplateRemove.dataset.customTemplateRemove);
  });

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (target.matches?.("[data-reading-field]")) {
      updateReadingEntry(target.dataset.readingIndex, target.dataset.readingField, target.value);
    } else if (target.matches?.("[data-daily-field]")) {
      updateDailyField(target.dataset.dailyField, target.dataset.dailyIndex, target.value);
    } else if (target.matches?.("[data-week-day]")) {
      updateWeekEntry(target.dataset.weekDay, target.dataset.weekSlot, target.value);
    } else if (target.matches?.("[data-month-day]")) {
      updateMonthEntry(target.dataset.monthDay, target.value);
    }
  });
}

function bind() {
  window.onkeydown = handleKeyboardShortcut;
  bindDelegatedEvents();

  document.querySelectorAll("[data-tool]").forEach((button) => {
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      button.dataset.lastToolPress = String(Date.now());
      runToolAction(button.dataset.tool);
    });
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const lastPress = Number(button.dataset.lastToolPress || 0);
      if (Date.now() - lastPress < 500) return;
      runToolAction(button.dataset.tool);
    });
  });

  document.querySelectorAll("[data-image-tool]").forEach((button) => {
    const prepareImageImport = () => {
      state.activeTool = "select";
    };
    button.addEventListener("pointerdown", prepareImageImport);
    button.addEventListener("click", prepareImageImport);
    button.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      prepareImageImport();
      document.getElementById("image-import")?.click();
    });
  });

  document.querySelectorAll("[data-journal]").forEach((button) => {
    button.addEventListener("click", () => switchJournal(button.dataset.journal));
  });

  document.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => switchPage(button.dataset.page));
  });

  document.querySelectorAll("[data-open-journal]").forEach((button) => {
    button.addEventListener("click", () => openJournal(button.dataset.openJournal));
  });

  document.querySelectorAll("[data-open-page]").forEach((button) => {
    button.addEventListener("click", () => {
      const [journalId, pageId] = button.dataset.openPage.split(":");
      openPageFromLibrary(journalId, pageId);
    });
  });

  document.querySelectorAll("[data-inspector-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeInspectorTab = button.dataset.inspectorTab;
      render();
      persist();
    });
  });

  document.querySelectorAll("[data-template]").forEach((button) => {
    button.addEventListener("click", () => {
      pushHistory();
      state.activeTemplate = button.dataset.template;
      render();
      persist();
    });
  });

  document.querySelectorAll("[data-sticker]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTool = "select";
      addElement("sticker", button.dataset.sticker);
      render();
      persist();
    });
  });

  document.querySelectorAll("[data-tape]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTool = "select";
      addElement("tape", button.dataset.tape);
      state.selectedId = null;
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
      pushHistory();
      state.activePaper = button.dataset.paper;
      render();
      persist();
    });
  });

  document.querySelectorAll("[data-cover]").forEach((button) => {
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      button.dataset.lastCoverPress = String(Date.now());
      runCoverAction(button.dataset.cover);
    });
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const lastPress = Number(button.dataset.lastCoverPress || 0);
      if (Date.now() - lastPress < 500) return;
      runCoverAction(button.dataset.cover);
    });
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", (event) => handleAction(button.dataset.action, event));
  });

  const calibrationTarget = document.getElementById("calibration-target");
  if (calibrationTarget) {
    calibrationTarget.addEventListener("pointerdown", (event) => {
      calibrateInkFromEvent(event);
      render();
      persist();
    });
  }

  if (pendingFocusElementId) {
    const id = pendingFocusElementId;
    pendingFocusElementId = null;
    focusElementSoon(id, true);
  }

  document.querySelectorAll("[data-setting-key]").forEach((button) => {
    button.addEventListener("click", () => updateSetting(button.dataset.settingKey, button.dataset.settingValue));
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
      if (!elementSize.dataset.historyStarted) {
        pushHistory();
        elementSize.dataset.historyStarted = "true";
      }
      selected.size = Number(event.target.value);
      drawElements();
      persist();
    });
  }

  const elementRotation = document.getElementById("element-rotation");
  if (elementRotation) {
    elementRotation.addEventListener("input", (event) => {
      const selected = state.elements.find((element) => element.id === state.selectedId);
      if (!selected) return;
      if (!elementRotation.dataset.historyStarted) {
        pushHistory();
        elementRotation.dataset.historyStarted = "true";
      }
      selected.rotation = Number(event.target.value);
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

  const librarySearch = document.getElementById("library-search");
  if (librarySearch) {
    librarySearch.addEventListener("input", (event) => {
      state.libraryQuery = event.target.value;
      render();
      const nextSearch = document.getElementById("library-search");
      if (nextSearch) {
        nextSearch.focus();
        nextSearch.selectionStart = nextSearch.selectionEnd = nextSearch.value.length;
      }
      persist();
    });
  }

  const imageImport = document.getElementById("image-import");
  if (imageImport) imageImport.addEventListener("change", importImage);

  const pdfImport = document.getElementById("pdf-import");
  if (pdfImport) pdfImport.addEventListener("change", importPdf);

  const notebookImport = document.getElementById("notebook-import");
  if (notebookImport) notebookImport.addEventListener("change", importNotebook);
  const pageFooter = document.querySelector(".page-footer");
  if (pageFooter) {
    pageFooter.addEventListener("contextmenu", (event) => event.preventDefault());
    pageFooter.addEventListener("pointerdown", (event) => {
      if (event.pointerType !== "pen") return;
      event.preventDefault();
      event.stopPropagation();
    }, { capture: true });
  }
  document.onselectionchange = clearAccidentalSelection;
}

function runToolAction(tool) {
  if (tool === "text") {
    state.activeTool = "select";
    state.activeInspectorTab = "Pens";
    pendingFocusElementId = addElement("text", "New note");
  } else if (tool === "image") {
    state.activeTool = "select";
    document.getElementById("image-import")?.click();
    persist();
    return;
  } else if (tool === "sticker") {
    state.activeTool = "select";
    state.activeInspectorTab = "Marks";
    showNotice("Choose a mark from the panel");
  } else {
    state.activeTool = tool;
    if (isDrawingTool()) state.selectedId = null;
  }
  render();
  persist();
}

function runCoverAction(cover) {
  if (!cover || !coverStyles.includes(cover)) return;
  const journal = currentJournal();
  journal.cover = cover;
  journal.meta = "Cover updated";
  render();
  persist();
}

function toggleHabitCheck(rowValue, dayValue) {
  const row = Number(rowValue);
  const day = Number(dayValue);
  const rows = normalizeHabitRows(state.habitRows);
  const days = habitDayLabels();
  if (!Number.isInteger(row) || !Number.isInteger(day)) return;
  if (row < 0 || row >= rows.length || day < 0 || day >= days.length) return;
  pushHistory();
  const key = habitCheckKey(row, day);
  state.habitChecks = normalizeHabitChecks(state.habitChecks);
  state.habitChecks[key] = !isHabitChecked(row, day);
  render();
  persist();
}

function renameHabitRow(indexValue) {
  const index = Number(indexValue);
  const rows = normalizeHabitRows(state.habitRows);
  if (!Number.isInteger(index) || index < 0 || index >= rows.length) return;
  const nextName = window.prompt("Habit name", rows[index]);
  if (!nextName?.trim()) return;
  pushHistory();
  rows[index] = nextName.trim().slice(0, 28);
  state.habitRows = rows;
  render();
  persist();
}

function addHabitRow() {
  const rows = normalizeHabitRows(state.habitRows);
  if (rows.length >= 12) {
    window.alert("Alex can show up to 12 habits on one tracker.");
    return;
  }
  const nextName = window.prompt("New habit", "New habit");
  if (!nextName?.trim()) return;
  pushHistory();
  state.habitRows = [...rows, nextName.trim().slice(0, 28)];
  render();
  persist();
}

function removeHabitRow(indexValue) {
  const index = Number(indexValue);
  const rows = normalizeHabitRows(state.habitRows);
  if (!Number.isInteger(index) || index < 0 || index >= rows.length) return;
  if (rows.length <= 1) {
    window.alert("Keep at least one habit row.");
    return;
  }
  if (!window.confirm(`Remove "${rows[index]}" from this tracker?`)) return;
  pushHistory();
  const nextChecks = {};
  Object.entries(normalizeHabitChecks(state.habitChecks)).forEach(([key, value]) => {
    const [, rowPart, dayPart] = key.split("-");
    const row = Number(rowPart);
    const day = Number(dayPart);
    if (row < index) nextChecks[habitCheckKey(row, day)] = value;
    if (row > index) nextChecks[habitCheckKey(row - 1, day)] = value;
  });
  state.habitRows = rows.filter((_, row) => row !== index);
  state.habitChecks = nextChecks;
  render();
  persist();
}

function setHabitLayout(layout) {
  const nextLayout = normalizeHabitLayout(layout);
  if (nextLayout === state.habitLayout) return;
  pushHistory();
  state.habitLayout = nextLayout;
  render();
  persist();
}

function toggleMoodDay(dayValue, moodValue) {
  const day = Number(dayValue);
  const mood = Number(moodValue);
  if (!Number.isInteger(day) || !Number.isInteger(mood)) return;
  if (day < 0 || day >= 7 || mood < 0 || mood > 6) return;
  pushHistory();
  state.moodChecks = normalizeMoodChecks(state.moodChecks);
  const key = moodCheckKey(day);
  state.moodChecks[key] = getMoodForDay(day) === mood ? -1 : mood;
  render();
  persist();
}

function blankReadingEntry() {
  return { title: "", author: "", quote: "", thoughts: "", rating: 0 };
}

function updateReadingEntry(indexValue, field, value) {
  const index = Number(indexValue);
  if (!Number.isInteger(index) || index < 0 || index >= 20) return;
  const entries = normalizeReadingEntries(state.readingEntries);
  while (entries.length <= index) entries.push(blankReadingEntry());
  if (field === "title") entries[index].title = String(value).slice(0, 100);
  else if (field === "author") entries[index].author = String(value).slice(0, 100);
  else if (field === "quote") entries[index].quote = String(value).slice(0, 300);
  else if (field === "thoughts") entries[index].thoughts = String(value).slice(0, 500);
  else return;
  state.readingEntries = entries;
  persist();
}

function setReadingRating(indexValue, ratingValue) {
  const index = Number(indexValue);
  const rating = Number(ratingValue);
  if (!Number.isInteger(index) || index < 0 || index >= 20) return;
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return;
  const entries = normalizeReadingEntries(state.readingEntries);
  while (entries.length <= index) entries.push(blankReadingEntry());
  pushHistory();
  entries[index].rating = entries[index].rating === rating ? 0 : rating;
  state.readingEntries = entries;
  render();
  persist();
}

function addReadingEntry() {
  const entries = normalizeReadingEntries(state.readingEntries);
  if (entries.length >= 20) {
    window.alert("Alex can keep up to 20 books on one log.");
    return;
  }
  pushHistory();
  state.readingEntries = [...(entries.length ? entries : [blankReadingEntry()]), blankReadingEntry()];
  render();
  persist();
}

function removeReadingEntry(indexValue) {
  const index = Number(indexValue);
  const entries = normalizeReadingEntries(state.readingEntries);
  if (!Number.isInteger(index) || index < 0 || index >= entries.length) return;
  const label = entries[index].title || "this book";
  if (!window.confirm(`Remove "${label}" from the reading log?`)) return;
  pushHistory();
  state.readingEntries = entries.filter((_, entryIndex) => entryIndex !== index);
  render();
  persist();
}

function toggleDailyTask(indexValue) {
  const index = Number(indexValue);
  if (!Number.isInteger(index) || index < 0 || index > 2) return;
  pushHistory();
  const data = normalizeTemplateData(state.templateData);
  data.daily.topThree[index].done = !data.daily.topThree[index].done;
  state.templateData = data;
  render();
  persist();
}

function updateDailyField(field, indexValue, value) {
  const index = Number(indexValue);
  const data = normalizeTemplateData(state.templateData);
  if (field === "task" && index >= 0 && index < 3) data.daily.topThree[index].text = String(value).slice(0, 80);
  else if (field === "schedule" && index >= 0 && index < 4) data.daily.schedule[index] = String(value).slice(0, 80);
  else if (field === "joys") data.daily.joys = String(value).slice(0, 200);
  else return;
  state.templateData = data;
  persist();
}

function updateWeekEntry(dayValue, slotValue, value) {
  const day = Number(dayValue);
  const slot = Number(slotValue);
  if (!Number.isInteger(day) || day < 0 || day > 6) return;
  if (!Number.isInteger(slot) || slot < 0 || slot > 1) return;
  const data = normalizeTemplateData(state.templateData);
  data.weekly[day][slot] = String(value).slice(0, 80);
  state.templateData = data;
  persist();
}

function updateMonthEntry(dayValue, value) {
  const day = Number(dayValue);
  if (!Number.isInteger(day) || day < 1 || day > 31) return;
  const data = normalizeTemplateData(state.templateData);
  const text = String(value).slice(0, 40);
  if (text) data.monthly[day] = text;
  else delete data.monthly[day];
  state.templateData = data;
  persist();
}

function setStickerPack(packId) {
  if (!stickerPacks.some((pack) => pack.id === packId)) return;
  state.activeStickerPack = packId;
  state.query = "";
  render();
}

function normalizeCustomTemplates(list) {
  if (!Array.isArray(list)) return [];
  return list.map((item) => ({
    id: String(item?.id || `tpl-${Date.now()}-${Math.round(Math.random() * 100000)}`),
    name: String(item?.name || "My Template").trim().slice(0, 40) || "My Template",
    template: String(item?.template || "notebook"),
    paper: String(item?.paper || "lined"),
    elements: normalizeElements(Array.isArray(item?.elements) ? item.elements : []),
  })).slice(0, 12);
}

function saveCustomTemplate() {
  const existing = normalizeCustomTemplates(state.customTemplates);
  if (existing.length >= 12) {
    window.alert("Alex can keep up to 12 saved templates.");
    return;
  }
  capturePageState();
  const page = currentPage();
  const name = window.prompt("Template name", page.title || "My Template");
  if (!name?.trim()) return;
  state.customTemplates = [...existing, {
    id: `tpl-${Date.now()}-${Math.round(Math.random() * 100000)}`,
    name: name.trim().slice(0, 40),
    template: page.template || "notebook",
    paper: page.paper || "lined",
    elements: structuredClone(page.elements || []),
  }];
  render();
  persist();
  showNotice("Template saved");
}

function applyCustomTemplate(id) {
  const template = normalizeCustomTemplates(state.customTemplates).find((entry) => entry.id === id);
  if (!template) return;
  capturePageState();
  const journal = currentJournal();
  const page = makePage(template.name, template.template, template.paper, template.elements);
  const index = journal.pages.findIndex((entry) => entry.id === state.activePageId);
  journal.pages.splice(index + 1, 0, page);
  loadPageIntoState(page);
  render();
  persist();
  showNotice(`New page from "${template.name}"`);
}

function removeCustomTemplate(id) {
  const existing = normalizeCustomTemplates(state.customTemplates);
  const template = existing.find((entry) => entry.id === id);
  if (!template) return;
  if (!window.confirm(`Delete the "${template.name}" template? Pages made from it stay.`)) return;
  state.customTemplates = existing.filter((entry) => entry.id !== id);
  render();
  persist();
}

function clearAccidentalSelection() {
  const active = document.activeElement;
  if (active?.matches?.("input, textarea, [contenteditable='true']")) return;
  const selection = window.getSelection?.();
  if (selection && !selection.isCollapsed) selection.removeAllRanges();
}

function handleAction(action, event) {
  if (action === "complete-onboarding") {
    state.onboardingComplete = true;
    state.view = "library";
  }
  if (action === "create-sample-notebook") createStartHereNotebook();
  if (action === "go-settings") {
    capturePageState();
    state.view = "settings";
    state.journalMenuOpen = false;
  }
  if (action === "go-library") {
    capturePageState();
    state.view = "library";
    state.journalMenuOpen = false;
  }
  if (action === "open-editor") {
    state.view = "editor";
    state.journalMenuOpen = false;
  }
  if (action === "toggle-journal-menu") state.journalMenuOpen = !state.journalMenuOpen;
  if (action === "undo") undoInk();
  if (action === "redo") redoInk();
  if (action === "zoom-in") setZoom(state.zoom + 0.1, stageCenterPoint());
  if (action === "zoom-out") setZoom(state.zoom - 0.1, stageCenterPoint());
  if (action === "reset-view") resetView();
  if (action === "ink-align-up") adjustInkAlignment(0, -12);
  if (action === "ink-align-down") adjustInkAlignment(0, 12);
  if (action === "ink-align-left") adjustInkAlignment(-12, 0);
  if (action === "ink-align-right") adjustInkAlignment(12, 0);
  if (action === "ink-align-reset") resetInkAlignment();
  if (action === "start-ink-calibration") startInkCalibration();
  if (action === "calibrate-ink") {
    calibrateInkFromEvent(event);
    render();
    persist();
    return;
  }
  if (action === "nudge-left") {
    pushHistory();
    nudgeSelected(-1.5, 0);
  }
  if (action === "nudge-right") {
    pushHistory();
    nudgeSelected(1.5, 0);
  }
  if (action === "nudge-up") {
    pushHistory();
    nudgeSelected(0, -1.5);
  }
  if (action === "nudge-down") {
    pushHistory();
    nudgeSelected(0, 1.5);
  }
  if (action === "delete-element") {
    pushHistory();
    deleteSelectedElement();
  }
  if (action === "shrink-element") {
    pushHistory();
    resizeSelectedElement(-6);
  }
  if (action === "grow-element") {
    pushHistory();
    resizeSelectedElement(6);
  }
  if (action === "duplicate-element") {
    pushHistory();
    duplicateSelectedElement();
  }
  if (action === "bring-forward") {
    pushHistory();
    moveSelectedLayer(1);
  }
  if (action === "send-backward") {
    pushHistory();
    moveSelectedLayer(-1);
  }
  if (action === "bring-front") {
    pushHistory();
    moveSelectedLayer("front");
  }
  if (action === "send-back") {
    pushHistory();
    moveSelectedLayer("back");
  }
  if (action === "new-journal") createJournal();
  if (action === "rename-journal") renameJournal();
  if (action === "delete-journal") deleteJournal();
  if (action === "import-notebook") {
    document.getElementById("notebook-import")?.click();
    return;
  }
  if (action === "import-pdf") {
    document.getElementById("pdf-import")?.click();
    return;
  }
  if (action === "dismiss-backup-reminder") {
    state.backupReminderDismissedAt = new Date().toISOString();
    showNotice("Backup reminder hidden");
  }
  if (action === "export-notebook") exportNotebook();
  if (action === "export-notebook-pdf") exportNotebookPdf();
  if (action === "export-page-png") exportPagePng();
  if (action === "new-page") createPage();
  if (action === "duplicate-page") duplicatePage();
  if (action === "move-page-up") reorderPage(-1);
  if (action === "move-page-down") reorderPage(1);
  if (action === "rename-page") renamePage();
  if (action === "delete-page") deletePage();
  if (action === "add-habit-row") {
    addHabitRow();
    return;
  }
  if (action === "save-page-template") {
    saveCustomTemplate();
    return;
  }
  if (action === "clear-ink") {
    if (state.penPaths.length && !window.confirm("Clear all handwriting on this page?")) return;
    pushHistory();
    state.penPaths = [];
    showNotice("Handwriting cleared");
  }
  if (action === "previous-page") movePage(-1);
  if (action === "next-page") movePage(1);
  if (action === "export") exportPage();
  render();
  persist();
}

function handleKeyboardShortcut(event) {
  const key = event.key.toLowerCase();
  const command = event.ctrlKey || event.metaKey;
  const target = event.target;
  const isTyping = target?.matches?.("input, textarea, [contenteditable='true']");

  if (key === "escape") {
    event.preventDefault();
    state.journalMenuOpen = false;
    state.selectedId = null;
    if (state.view === "settings") state.view = "library";
    render();
    persist();
    return;
  }

  if ((key === "delete" || key === "backspace") && state.view === "editor" && state.selectedId && !isTyping) {
    event.preventDefault();
    pushHistory();
    deleteSelectedElement();
    render();
    persist();
    return;
  }

  if (!command || isTyping) return;

  if (key === "k") {
    event.preventDefault();
    state.view = "library";
    render();
    focusLibrarySearch();
    persist();
    return;
  }

  if (key === ",") {
    event.preventDefault();
    state.view = "settings";
    render();
    persist();
    return;
  }

  if (key === "n") {
    event.preventDefault();
    if (state.view === "library") createJournal();
    else if (state.view === "editor") createPage();
    render();
    persist();
    return;
  }

  if (state.view !== "editor") return;

  if (key === "z") {
    event.preventDefault();
    if (event.shiftKey) redoInk();
    else undoInk();
    render();
    persist();
    return;
  }

  if (key === "y") {
    event.preventDefault();
    redoInk();
    render();
    persist();
    return;
  }

  if (key === "=" || key === "+") {
    event.preventDefault();
    setZoom(state.zoom + 0.1, stageCenterPoint());
    render();
    persist();
    return;
  }

  if (key === "-") {
    event.preventDefault();
    setZoom(state.zoom - 0.1, stageCenterPoint());
    render();
    persist();
    return;
  }

  if (key === "0") {
    event.preventDefault();
    resetView();
    render();
    persist();
  }
}

function focusLibrarySearch() {
  requestAnimationFrame(() => {
    const search = document.getElementById("library-search");
    if (!search) return;
    search.focus();
    search.selectionStart = search.selectionEnd = search.value.length;
  });
}

function clampZoom(value) {
  return Math.max(0.65, Math.min(1.9, Number(value.toFixed(3))));
}

function setZoom(value, focalPoint = stageCenterPoint()) {
  zoomCameraAt(value, focalPoint);
}

function resetView() {
  state.zoom = 1;
  state.panX = 0;
  state.panY = 0;
}

function stageCenterPoint() {
  const stage = document.getElementById("stage-transform");
  const rect = stage?.getBoundingClientRect?.();
  if (rect?.width && rect?.height) {
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }
  return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
}

function zoomCameraAt(value, focalPoint = stageCenterPoint()) {
  const stage = document.getElementById("stage-transform");
  const oldZoom = state.zoom || 1;
  const nextZoom = clampZoom(value);
  if (!stage || !focalPoint) {
    state.zoom = nextZoom;
    return;
  }
  const rect = stage.getBoundingClientRect();
  const localX = (focalPoint.x - rect.left) / oldZoom;
  const localY = (focalPoint.y - rect.top) / oldZoom;
  const baseLeft = rect.left - (state.panX || 0);
  const baseTop = rect.top - (state.panY || 0);
  state.zoom = nextZoom;
  state.panX = focalPoint.x - baseLeft - localX * nextZoom;
  state.panY = focalPoint.y - baseTop - localY * nextZoom;
}

function adjustInkAlignment(dx, dy) {
  state.drawOffsetX = Math.max(-220, Math.min(220, (state.drawOffsetX || 0) + dx));
  state.drawOffsetY = Math.max(-220, Math.min(220, (state.drawOffsetY || 0) + dy));
  showNotice(`Ink offset ${Math.round(state.drawOffsetX)}px, ${Math.round(state.drawOffsetY)}px`);
}

function resetInkAlignment() {
  state.drawOffsetX = 0;
  state.drawOffsetY = 0;
  state.calibrationMode = false;
  showNotice("Ink alignment reset");
}

function startInkCalibration() {
  state.calibrationMode = true;
  state.activeTool = "select";
  state.activeInspectorTab = "Pens";
  showNotice("Tap the target with the Pencil");
}

function calibrateInkFromEvent(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  const book = document.getElementById("book-spread");
  if (!book || !event) return;
  const rawX = state.drawOffsetX || 0;
  const rawY = state.drawOffsetY || 0;
  state.drawOffsetX = 0;
  state.drawOffsetY = 0;
  const measured = localPoint(event, book);
  state.drawOffsetX = rawX;
  state.drawOffsetY = rawY;
  const targetX = (state.calibrationTargetX / 100) * book.clientWidth;
  const targetY = (state.calibrationTargetY / 100) * book.clientHeight;
  state.drawOffsetX = Math.max(-260, Math.min(260, Math.round(targetX - measured.x)));
  state.drawOffsetY = Math.max(-260, Math.min(260, Math.round(targetY - measured.y)));
  state.calibrationMode = false;
  state.activeTool = "pen";
  showNotice(`Ink calibrated: ${state.drawOffsetX}px, ${state.drawOffsetY}px`);
}

function applyAppTheme() {
  document.body.dataset.theme = state.settings?.theme || defaultSettings.theme;
}

function updateSetting(key, value) {
  if (!Object.hasOwn(defaultSettings, key)) return;
  state.settings = { ...state.settings, [key]: value };
  if (key === "theme") applyAppTheme();
  if (key === "defaultPenPreset") applyDefaultPen();
  showNotice("Setting saved");
  render();
  persist();
}

function applyDefaultPen() {
  const preset = penPresets.find((entry) => entry.id === state.settings.defaultPenPreset) || penPresets[0];
  state.penPreset = preset.id;
  state.penWidth = preset.width;
  state.activeTool = preset.id === "highlighter" ? "highlighter" : "pen";
}

function createStartHereNotebook() {
  const existing = currentJournals().find((journal) => journal.id === "start-here");
  state.onboardingComplete = true;
  state.view = "editor";
  if (existing) {
    state.activeJournal = existing.id;
    loadPageIntoState(existing.pages[0]);
    state.page = 1;
    showNotice("Start Here opened");
    return;
  }

  const introPage = makePage("Start Here", "notebook", "lined", startHereElements, []);
  introPage.id = "page-start-here-intro";
  const plannerPage = makePage("Cozy Planning", "daily", "dot", [], []);
  plannerPage.id = "page-start-here-planning";
  const playPage = makePage("Creative Play", "blank", "grid", [
    { id: "start-star-1", type: "sticker", value: "&#9733;", x: 34, y: 34, size: 38 },
    { id: "start-note-2", type: "text", value: "Try dragging this note or resizing it from the Pens panel.", x: 58, y: 56, size: 18 },
  ], []);
  playPage.id = "page-start-here-play";
  const journal = {
    id: "start-here",
    title: "Start Here",
    meta: "Sample notebook",
    cover: "lavender",
    pages: [introPage, plannerPage, playPage],
  };
  state.journals = [journal, ...currentJournals()];
  state.activeJournal = journal.id;
  loadPageIntoState(introPage);
  state.page = 1;
  showNotice("Start Here notebook created");
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

function resizeSelectedElement(delta) {
  const selected = state.elements.find((element) => element.id === state.selectedId);
  if (!selected) return;
  selected.size = clampElementSize(selected, (selected.size || 38) + delta);
}

function clampElementSize(element, size) {
  const min = element.type === "text" ? 12 : 20;
  const max = element.type === "image" || element.type === "pdf" ? 120 : element.type === "tape" ? 96 : 72;
  return Math.max(min, Math.min(max, size));
}

function elementSizeStyle(element) {
  const size = element.size || (element.type === "text" ? 18 : 38);
  if (element.type === "text") {
    return `font-size:${size}px;width:${Math.max(150, size * 10)}px;min-height:${Math.max(46, size * 3.2)}px`;
  }
  if (element.type === "sticker") {
    const box = Math.max(44, size * 1.72);
    return `font-size:${size}px;width:${box}px;height:${box}px`;
  }
  if (element.type === "image" || element.type === "pdf") {
    return `width:${size * 4}px`;
  }
  if (element.type === "tape") {
    return `width:${size * 4}px;height:${Math.max(24, size * 0.8)}px`;
  }
  return "";
}

function applyElementSizeStyle(elementNode, element) {
  const size = element.size || (element.type === "text" ? 18 : 38);
  if (element.type === "text") {
    elementNode.style.fontSize = `${size}px`;
    elementNode.style.width = `${Math.max(150, size * 10)}px`;
    elementNode.style.minHeight = `${Math.max(46, size * 3.2)}px`;
    return;
  }
  if (element.type === "sticker") {
    const box = Math.max(44, size * 1.72);
    elementNode.style.fontSize = `${size}px`;
    elementNode.style.width = `${box}px`;
    elementNode.style.height = `${box}px`;
    return;
  }
  if (element.type === "image" || element.type === "pdf") elementNode.style.width = `${size * 4}px`;
  if (element.type === "tape") {
    elementNode.style.width = `${size * 4}px`;
    elementNode.style.height = `${Math.max(24, size * 0.8)}px`;
  }
}

function elementVisualSize(element) {
  const size = element.size || (element.type === "text" ? 18 : 38);
  if (element.type === "text") {
    return {
      width: Math.max(150, size * 10),
      height: Math.max(46, size * 3.2),
    };
  }
  if (element.type === "sticker") {
    const box = Math.max(44, size * 1.72);
    return { width: box, height: box };
  }
  if (element.type === "image" || element.type === "pdf") {
    return { width: size * 4, height: element.type === "pdf" ? 270 : size * 3 };
  }
  if (element.type === "tape") {
    return { width: size * 4, height: Math.max(24, size * 0.8) };
  }
  return { width: size, height: size };
}

function touchListDistance(touches) {
  if (!touches || touches.length < 2) return 0;
  return Math.hypot(touches[1].clientX - touches[0].clientX, touches[1].clientY - touches[0].clientY);
}

function duplicateSelectedElement() {
  const selected = state.elements.find((element) => element.id === state.selectedId);
  if (!selected) return;
  const copy = {
    ...structuredClone(selected),
    id: `${selected.type}-${Date.now()}`,
    x: Math.min(92, selected.x + 3),
    y: Math.min(92, selected.y + 3),
  };
  state.elements.push(copy);
  state.selectedId = copy.id;
}

function moveSelectedLayer(direction) {
  const index = state.elements.findIndex((element) => element.id === state.selectedId);
  if (index < 0) return;
  const [element] = state.elements.splice(index, 1);
  let nextIndex = index;
  if (direction === "front") nextIndex = state.elements.length;
  else if (direction === "back") nextIndex = 0;
  else nextIndex = Math.max(0, Math.min(state.elements.length, index + direction));
  state.elements.splice(nextIndex, 0, element);
}

function addElement(type, value) {
  pushHistory();
  const id = `${type}-${Date.now()}`;
  state.elements.push({
    id,
    type,
    value,
    x: type === "text" ? 60 : 64,
    y: type === "text" ? 64 : 31,
    size: type === "text" ? 16 : type === "tape" ? 34 : type === "sticker" ? 26 : 38,
    rotation: 0,
  });
  state.selectedId = id;
  return id;
}

function switchJournal(journalId) {
  capturePageState();
  state.activeJournal = journalId;
  state.journalMenuOpen = false;
  const journal = currentJournal();
  loadPageIntoState(journal.pages[0]);
  state.page = 1;
  render();
  persist();
}

function openJournal(journalId) {
  state.view = "editor";
  switchJournal(journalId);
}

function openPageFromLibrary(journalId, pageId) {
  capturePageState();
  state.view = "editor";
  state.activeJournal = journalId;
  state.journalMenuOpen = false;
  const journal = currentJournal();
  const page = journal.pages.find((entry) => entry.id === pageId) || journal.pages[0];
  loadPageIntoState(page);
  state.page = journal.pages.findIndex((entry) => entry.id === page.id) + 1;
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
  const firstPage = makePage("Notebook Page", "notebook", state.settings.defaultPaper, [], []);
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
  state.view = "editor";
  applyDefaultPen();
  loadPageIntoState(firstPage);
  state.page = 1;
  showNotice(`${journal.title} created`);
}

function renameJournal() {
  const journal = currentJournal();
  const nextTitle = window.prompt("Notebook name", journal.title);
  if (!nextTitle?.trim()) return;
  journal.title = nextTitle.trim();
  journal.meta = "Renamed just now";
  showNotice("Notebook renamed");
}

function deleteJournal() {
  const journals = currentJournals();
  if (journals.length <= 1) {
    window.alert("Alex needs at least one notebook.");
    return;
  }

  const journal = currentJournal();
  const pageCount = journal.pages.length;
  const pageLabel = pageCount === 1 ? "1 page" : `${pageCount} pages`;
  const confirmed = window.confirm(`Delete "${journal.title}" and all ${pageLabel}? This cannot be undone.`);
  if (!confirmed) return;

  capturePageState();
  const index = journals.findIndex((entry) => entry.id === journal.id);
  const nextJournals = journals.filter((entry) => entry.id !== journal.id);
  const nextJournal = nextJournals[Math.max(0, index - 1)] || nextJournals[0];
  state.journals = nextJournals;
  state.activeJournal = nextJournal.id;
  state.activePageId = nextJournal.pages[0].id;
  state.page = 1;
  state.selectedId = null;
  state.journalMenuOpen = false;
  loadPageIntoState(nextJournal.pages[0]);
  showNotice("Notebook deleted");
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
  const newPage = makePage(`Page ${journal.pages.length + 1}`, "notebook", state.settings.defaultPaper || state.activePaper || "lined", [], []);
  journal.pages.push(newPage);
  applyDefaultPen();
  loadPageIntoState(newPage);
  state.page = journal.pages.length;
  showNotice("New page added");
}

function duplicatePage() {
  capturePageState();
  const journal = currentJournal();
  const page = currentPage();
  const copy = makePage(`${page.title} Copy`, page.template, page.paper, page.elements, page.penPaths, page.habitChecks, page.habitRows, page.habitLayout, page.moodChecks, page.readingEntries, page.templateData);
  const index = journal.pages.findIndex((entry) => entry.id === page.id);
  journal.pages.splice(index + 1, 0, copy);
  loadPageIntoState(copy);
  state.page = index + 2;
  showNotice("Page duplicated");
}

function renamePage() {
  const page = currentPage();
  const nextTitle = window.prompt("Page name", page.title);
  if (!nextTitle?.trim()) return;
  page.title = nextTitle.trim();
  showNotice("Page renamed");
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
  showNotice("Page deleted");
}

function undoInk() {
  const snapshot = state.undoStack?.pop();
  if (!snapshot) return;
  state.redoStack = [...(state.redoStack || []), pageSnapshot()].slice(-60);
  restoreSnapshot(snapshot);
}

function redoInk() {
  const snapshot = state.redoStack?.pop();
  if (!snapshot) return;
  state.undoStack = [...(state.undoStack || []), pageSnapshot()].slice(-60);
  restoreSnapshot(snapshot);
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

function importPdf(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    capturePageState();
    const journal = currentJournal();
    const pdfPage = makePage(file.name.replace(/\.pdf$/i, "") || `PDF ${journal.pages.length + 1}`, "pdf", "blank", [
      {
        id: `pdf-${Date.now()}`,
        type: "pdf",
        value: reader.result,
        name: file.name,
        x: 50,
        y: 54,
        size: 78,
        rotation: 0,
      },
    ], []);
    journal.pages.push(pdfPage);
    loadPageIntoState(pdfPage);
    state.activeInspectorTab = "Pages";
    state.page = journal.pages.length;
    render();
    persist();
    showNotice("PDF imported as a new page");
    event.target.value = "";
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
  state.lastBackupAt = new Date().toISOString();
  state.backupReminderDismissedAt = state.lastBackupAt;
  state.editCountSinceBackup = 0;
  showNotice("Notebook backup downloaded");
}

function exportNotebookPdf() {
  capturePageState();
  const journal = currentJournal();
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    window.alert("Alex could not open the print preview. Please allow popups for this app and try again.");
    return;
  }
  printWindow.document.open();
  printWindow.document.write(notebookPrintHtml(journal));
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 350);
  showNotice("Print-ready PDF opened");
}

function notebookPrintHtml(journal) {
  return `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(journal.title)} - Alex PDF</title>
        <style>
          @page { size: landscape; margin: 12mm; }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            color: #202225;
            background: #f8f1ed;
            font-family: "Segoe UI", system-ui, sans-serif;
          }
          .print-cover,
          .print-page {
            width: 100%;
            min-height: 180mm;
            page-break-after: always;
            break-after: page;
            background: #fffdf7;
            border: 1px solid #eadfd8;
            border-radius: 18px;
            overflow: hidden;
            position: relative;
          }
          .print-cover {
            display: grid;
            place-items: center;
            text-align: center;
            background: linear-gradient(135deg, #ffd1d3, #f4a8b1);
          }
          .print-cover h1 {
            margin: 0;
            padding: 28px 44px;
            border-radius: 999px;
            background: rgba(255, 253, 247, 0.78);
            font-family: "Comic Sans MS", "Segoe Print", cursive;
            font-size: 54px;
          }
          .print-page {
            padding: 26px 30px;
          }
          .print-page.lined { background: repeating-linear-gradient(#fffdf7 0 31px, #d9e6ef 32px 33px); }
          .print-page.dot { background-image: radial-gradient(#9fa4a7 1px, transparent 1px); background-size: 18px 18px; }
          .print-page.grid {
            background-image: linear-gradient(#d6e8f3 1px, transparent 1px), linear-gradient(90deg, #d6e8f3 1px, transparent 1px);
            background-size: 24px 24px;
          }
          .print-page h2 {
            margin: 0;
            font-family: "Comic Sans MS", "Segoe Print", cursive;
            font-size: 34px;
          }
          .print-meta {
            margin-top: 8px;
            color: #78716c;
            font-size: 13px;
            text-transform: uppercase;
          }
          .print-element {
            position: absolute;
            transform: translate(-50%, -50%) rotate(var(--rotate));
            transform-origin: center center;
          }
          .print-text {
            width: 260px;
            white-space: pre-wrap;
            font-family: "Comic Sans MS", "Segoe Print", cursive;
          }
          .print-sticker {
            line-height: 1;
            text-align: center;
          }
          .print-image {
            max-width: 260px;
            max-height: 220px;
            object-fit: cover;
            border: 8px solid #fffaf6;
            border-radius: 8px;
          }
          .print-pdf {
            min-height: 220px;
            display: grid;
            place-items: center;
            gap: 8px;
            padding: 24px;
            border: 2px dashed #d9c8bf;
            border-radius: 12px;
            background: rgba(255, 250, 246, 0.82);
            text-align: center;
          }
          .print-pdf strong,
          .print-pdf span {
            display: block;
          }
          .print-pdf span {
            color: #78716c;
            font-size: 14px;
          }
          svg.print-ink {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
          }
        </style>
      </head>
      <body>
        <section class="print-cover"><h1>${escapeHtml(journal.title)}</h1></section>
        ${journal.pages.map((page, index) => printablePageHtml(page, index)).join("")}
      </body>
    </html>`;
}

function printablePageHtml(page, index) {
  return `
    <section class="print-page ${page.paper || "lined"}">
      <h2>${index + 1}. ${escapeHtml(page.title || "Notebook Page")}</h2>
      <div class="print-meta">${escapeHtml(page.template || "notebook")} page</div>
      ${printableInkSvg(page.penPaths || [])}
      ${(page.elements || []).map(printableElementHtml).join("")}
    </section>
  `;
}

function printableElementHtml(element) {
  const style = `left:${element.x || 50}%;top:${element.y || 50}%;--rotate:${element.rotation || 0}deg;`;
  if (element.type === "text") {
    return `<div class="print-element print-text" style="${style}font-size:${element.size || 18}px">${escapeHtml(element.value || "")}</div>`;
  }
  if (element.type === "image") {
    return `<img class="print-element print-image" style="${style}width:${(element.size || 60) * 4}px" src="${element.value}" alt="" />`;
  }
  if (element.type === "pdf") {
    return `<div class="print-element print-pdf" style="${style};width:${(element.size || 78) * 4}px"><strong>PDF attachment</strong><span>${escapeHtml(element.name || "Imported PDF")}</span></div>`;
  }
  return `<div class="print-element print-sticker" style="${style}font-size:${element.size || 38}px">${element.value || ""}</div>`;
}

function printableInkSvg(paths) {
  if (!paths.length) return "";
  const lines = paths.map((path) => {
    const points = (path.points || []).map((point) => `${point.x},${point.y}`).join(" ");
    if (!points) return "";
    const opacity = path.alpha ?? 1;
    const width = path.width || 4;
    return `<polyline points="${points}" fill="none" stroke="${escapeHtml(path.color || "#202225")}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}" />`;
  }).join("");
  return `<svg class="print-ink" viewBox="0 0 920 635" preserveAspectRatio="none">${lines}</svg>`;
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
          habitChecks: normalizeHabitChecks(page.habitChecks),
          habitRows: normalizeHabitRows(page.habitRows),
          habitLayout: normalizeHabitLayout(page.habitLayout),
          moodChecks: normalizeMoodChecks(page.moodChecks),
          readingEntries: normalizeReadingEntries(page.readingEntries),
          templateData: normalizeTemplateData(page.templateData),
          redoPaths: [],
          updatedAt: page.updatedAt || new Date().toISOString(),
        })),
      };
      state.journals = [...currentJournals(), imported];
      state.activeJournal = imported.id;
      state.view = "editor";
      loadPageIntoState(imported.pages[0]);
      state.page = 1;
      render();
      persist();
      showNotice("Notebook restored as a new copy");
    } catch {
      window.alert("Alex could not read that notebook file.");
    } finally {
      event.target.value = "";
    }
  });
  reader.readAsText(file);
}

function exportPagePng() {
  capturePageState();
  const book = document.getElementById("book-spread");
  if (!book) return;
  const rect = book.getBoundingClientRect();
  const scale = 2;
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = Math.round((rect.width / (state.zoom || 1)) * scale);
  exportCanvas.height = Math.round((rect.height / (state.zoom || 1)) * scale);
  const ctx = exportCanvas.getContext("2d");
  ctx.scale(scale, scale);
  drawExportBackground(ctx, exportCanvas.width / scale, exportCanvas.height / scale);
  drawExportTemplate(ctx, exportCanvas.width / scale, exportCanvas.height / scale);
  drawStoredInk(ctx, state.penPaths || []);
  drawExportElements(ctx);
  exportCanvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(currentJournal().title)}-${slugify(currentPage().title)}.png`;
    link.click();
    URL.revokeObjectURL(url);
    showNotice("Page PNG downloaded");
  }, "image/png");
}

function drawExportBackground(ctx, width, height) {
  ctx.fillStyle = "#fffdf7";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#d99c97";
  ctx.lineWidth = 6;
  roundRect(ctx, 3, 3, width - 6, height - 6, 28);
  ctx.stroke();
  ctx.strokeStyle = "#eadbd0";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();

  if (state.activePaper === "lined") {
    ctx.strokeStyle = "#d9e6ef";
    ctx.lineWidth = 1;
    for (let y = 32; y < height; y += 32) {
      ctx.beginPath();
      ctx.moveTo(24, y);
      ctx.lineTo(width - 24, y);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(233, 118, 132, 0.28)";
    ctx.beginPath();
    ctx.moveTo(56, 18);
    ctx.lineTo(56, height - 18);
    ctx.stroke();
  } else if (state.activePaper === "grid") {
    ctx.strokeStyle = "rgba(169, 209, 232, 0.55)";
    for (let x = 26; x < width; x += 26) {
      ctx.beginPath();
      ctx.moveTo(x, 18);
      ctx.lineTo(x, height - 18);
      ctx.stroke();
    }
    for (let y = 26; y < height; y += 26) {
      ctx.beginPath();
      ctx.moveTo(18, y);
      ctx.lineTo(width - 18, y);
      ctx.stroke();
    }
  } else if (state.activePaper === "dot") {
    ctx.fillStyle = "rgba(88, 91, 94, 0.35)";
    for (let x = 24; x < width; x += 18) {
      for (let y = 24; y < height; y += 18) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

function drawExportTemplate(ctx, width) {
  ctx.fillStyle = "#202225";
  ctx.font = "42px Comic Sans MS, Segoe Print, cursive";
  ctx.fillText(state.activeTemplate === "notebook" ? "Notebook" : currentPage().title, 34, 72);
  ctx.fillText(state.activeTemplate === "notebook" ? "Thoughts" : "Notes", width / 2 + 34, 72);
  ctx.fillStyle = "#6f625c";
  ctx.font = "18px Comic Sans MS, Segoe Print, cursive";
  ctx.fillText("Date: ______________________________", 36, 118);
  ctx.fillText("Topic: ______________________________", width / 2 + 36, 118);
}

function drawStoredInk(ctx, paths) {
  paths.forEach((path) => {
    ctx.save();
    ctx.globalCompositeOperation = path.composite || "source-over";
    ctx.globalAlpha = path.alpha || 1;
    ctx.strokeStyle = path.color;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    drawStrokePath(ctx, path);
    ctx.restore();
  });
}

function drawExportElements(ctx) {
  const book = document.getElementById("book-spread");
  const rect = book.getBoundingClientRect();
  const width = rect.width / (state.zoom || 1);
  const height = rect.height / (state.zoom || 1);
  state.elements.forEach((element) => {
    const x = (element.x / 100) * width;
    const y = (element.y / 100) * height;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(((element.rotation || 0) * Math.PI) / 180);
    if (element.type === "text") {
      ctx.fillStyle = "#242222";
      ctx.font = `${element.size || 18}px Comic Sans MS, Segoe Print, cursive`;
      String(element.value).split("\n").forEach((line, index) => ctx.fillText(line, -120, index * (element.size * 1.35)));
    } else if (element.type === "sticker") {
      ctx.font = `${element.size || 38}px Segoe UI Symbol, Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(decodeHtml(element.value), 0, 0);
    } else if (element.type === "tape") {
      drawTapeExport(ctx, element.value, element.size || 42);
    } else if (element.type === "pdf") {
      const boxWidth = (element.size || 78) * 4;
      const boxHeight = (element.size || 78) * 2.8;
      ctx.fillStyle = "rgba(255, 250, 246, 0.92)";
      ctx.strokeStyle = "#d9c8bf";
      ctx.lineWidth = 2;
      ctx.fillRect(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight);
      ctx.strokeRect(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight);
      ctx.fillStyle = "#202225";
      ctx.font = "700 20px Segoe UI, Arial";
      ctx.textAlign = "center";
      ctx.fillText("PDF attachment", 0, -8);
      ctx.fillStyle = "#78716c";
      ctx.font = "14px Segoe UI, Arial";
      ctx.fillText(element.name || "Imported PDF", 0, 18);
    }
    ctx.restore();
  });
}

function drawTapeExport(ctx, tape, size) {
  const width = size * 3.8;
  const height = size * 0.74;
  ctx.fillStyle = tape === "blue-grid" ? "#c9e3ef" : tape === "leaf" ? "#edf5d8" : tape === "dots" ? "#ffd982" : tape === "linen" ? "#e8d2bd" : "#ffd9db";
  if (tape === "ink-dots") ctx.fillStyle = "#fff";
  ctx.fillRect(-width / 2, -height / 2, width, height);
  ctx.strokeStyle = "rgba(48, 45, 45, 0.18)";
  ctx.lineWidth = 1;
  if (tape === "dots" || tape === "ink-dots") {
    ctx.fillStyle = tape === "ink-dots" ? "#302d2d" : "#cc9d5b";
    for (let x = -width / 2 + 8; x < width / 2; x += 12) {
      for (let y = -height / 2 + 8; y < height / 2; y += 12) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else {
    for (let x = -width / 2; x < width / 2; x += 14) {
      ctx.beginPath();
      ctx.moveTo(x, -height / 2);
      ctx.lineTo(x, height / 2);
      ctx.stroke();
    }
  }
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
}

function drawElements() {
  const layer = document.getElementById("elements-layer");
  if (!layer) return;
  layer.innerHTML = state.elements.map((element) => {
    const transform = `translate(-50%, -50%) rotate(${element.rotation || 0}deg)`;
    const sizeStyle = elementSizeStyle(element);
    if (element.type === "text") {
      return `<textarea class="canvas-text ${state.selectedId === element.id ? "selected" : ""}" data-element="${element.id}" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off" style="left:${element.x}%;top:${element.y}%;${sizeStyle};transform:${transform}">${escapeHtml(element.value)}</textarea>`;
    }
    if (element.type === "image") {
      return `<img class="canvas-image ${state.selectedId === element.id ? "selected" : ""}" data-element="${element.id}" style="left:${element.x}%;top:${element.y}%;${sizeStyle};transform:${transform}" src="${element.value}" alt="Imported journal item" />`;
    }
    if (element.type === "pdf") {
      return `<div class="canvas-pdf ${state.selectedId === element.id ? "selected" : ""}" data-element="${element.id}" style="left:${element.x}%;top:${element.y}%;${sizeStyle};transform:${transform}"><object data="${element.value}" type="application/pdf" aria-label="${escapeHtml(element.name || "Imported PDF")}"></object><span><strong>PDF</strong>${escapeHtml(element.name || "Imported PDF")}</span></div>`;
    }
    if (element.type === "tape") {
      return `<button class="canvas-tape tape-${escapeHtml(element.value)} ${state.selectedId === element.id ? "selected" : ""}" data-element="${element.id}" style="left:${element.x}%;top:${element.y}%;${sizeStyle};transform:${transform}" aria-label="Washi tape"></button>`;
    }
    return `<button class="canvas-sticker ${state.selectedId === element.id ? "selected" : ""}" data-element="${element.id}" style="left:${element.x}%;top:${element.y}%;${sizeStyle};transform:${transform}">${element.value}</button>`;
  }).join("");
  drawSelectionHandles(layer);

  bindLayerPinchResize(layer);

  document.querySelectorAll("[data-element]").forEach((elementNode) => {
    const id = elementNode.dataset.element;
    let press = null;
    let pinchResize = null;
    elementNode.addEventListener("touchstart", (event) => {
      if (event.touches.length !== 2) return;
      event.preventDefault();
      event.stopPropagation();
      pushHistory();
      const item = state.elements.find((entry) => entry.id === id);
      if (!item) return;
      state.selectedId = id;
      document.querySelectorAll("[data-element]").forEach((node) => node.classList.toggle("selected", node.dataset.element === id));
      pinchResize = {
        distance: touchListDistance(event.touches),
        size: item.size || 38,
      };
      press = null;
    }, { passive: false });
    elementNode.addEventListener("touchmove", (event) => {
      if (!pinchResize || event.touches.length !== 2) return;
      event.preventDefault();
      event.stopPropagation();
      const item = state.elements.find((entry) => entry.id === id);
      if (!item || !pinchResize.distance) return;
      const nextDistance = touchListDistance(event.touches);
      item.size = clampElementSize(item, pinchResize.size * (nextDistance / pinchResize.distance));
      applyElementSizeStyle(elementNode, item);
      persist();
    }, { passive: false });
    elementNode.addEventListener("touchend", () => {
      if (!pinchResize) return;
      pinchResize = null;
      drawElements();
    });
    elementNode.addEventListener("pointerdown", (event) => {
      if (pinchResize) return;
      if (isDrawingTool()) return;
      event.stopPropagation();
      state.selectedId = id;
      document.querySelectorAll("[data-element]").forEach((node) => node.classList.toggle("selected", node.dataset.element === id));
      if (elementNode.tagName === "TEXTAREA" && !isTextMoveZone(event, elementNode)) {
        persist();
        return;
      }
      event.preventDefault();
      elementNode.blur?.();
      const item = state.elements.find((entry) => entry.id === id);
      const book = document.getElementById("book-spread");
      const rect = book.getBoundingClientRect();
      const local = localPoint(event, book, rect, false);
      press = {
        pointerX: event.clientX,
        pointerY: event.clientY,
        dragging: false,
        historyStarted: false,
        offsetX: local.x - (item.x / 100) * book.clientWidth,
        offsetY: local.y - (item.y / 100) * book.clientHeight,
      };
      elementNode.setPointerCapture(event.pointerId);
    });
    elementNode.addEventListener("pointermove", (event) => {
      if (!press) return;
      const item = state.elements.find((entry) => entry.id === id);
      const book = document.getElementById("book-spread");
      const rect = book.getBoundingClientRect();
      const local = localPoint(event, book, rect, false);
      const moved = Math.hypot(event.clientX - press.pointerX, event.clientY - press.pointerY) > 5;
      if (!press.dragging && !moved) return;
      if (!press.historyStarted) {
        pushHistory();
        press.historyStarted = true;
      }
      press.dragging = true;
      event.preventDefault();
      elementNode.blur?.();
      item.x = Math.max(2, Math.min(92, ((local.x - press.offsetX) / book.clientWidth) * 100));
      item.y = Math.max(2, Math.min(92, ((local.y - press.offsetY) / book.clientHeight) * 100));
      elementNode.style.left = `${item.x}%`;
      elementNode.style.top = `${item.y}%`;
      moveSelectionHandlesTo(item);
      persist();
    });
    elementNode.addEventListener("pointerup", (event) => {
      if (!press) return;
      const shouldRedraw = Boolean(press?.dragging);
      press = null;
      if (!shouldRedraw && elementNode.tagName === "TEXTAREA") {
        drawElements();
        focusElementSoon(id, false);
        persist();
        return;
      }
      if (!shouldRedraw) {
        event.preventDefault();
        drawElements();
        persist();
        return;
      }
      if (shouldRedraw) drawElements();
    });
    elementNode.addEventListener("pointercancel", () => {
      press = null;
      drawElements();
    });
    if (elementNode.tagName === "TEXTAREA") {
      elementNode.addEventListener("focus", () => {
        if (elementNode.dataset.historyStarted) return;
        pushHistory();
        elementNode.dataset.historyStarted = "true";
      });
      elementNode.addEventListener("input", (event) => {
        const item = state.elements.find((entry) => entry.id === id);
        item.value = event.target.value;
        persist();
      });
    }
  });
  bindSelectionHandles();
}

function isTextMoveZone(event, elementNode) {
  const rect = elementNode.getBoundingClientRect();
  const edge = 18;
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return x <= edge || x >= rect.width - edge || y <= edge || y >= rect.height - edge;
}

function focusElementSoon(id, shouldSelect = false) {
  requestAnimationFrame(() => {
    const element = document.querySelector(`[data-element="${CSS.escape(id)}"]`);
    if (!element) return;
    element.focus?.();
    if (shouldSelect && element.tagName === "TEXTAREA") element.select?.();
  });
}

function drawSelectionHandles(layer) {
  if (isDrawingTool()) return;
  const selected = state.elements.find((element) => element.id === state.selectedId);
  const book = document.getElementById("book-spread");
  if (!selected || !book) return;
  const visual = elementVisualSize(selected);
  const halfX = ((visual.width / 2) / book.clientWidth) * 100;
  const halfY = ((visual.height / 2) / book.clientHeight) * 100;
  const handles = [
    { id: "nw", x: selected.x - halfX, y: selected.y - halfY },
    { id: "ne", x: selected.x + halfX, y: selected.y - halfY },
    { id: "sw", x: selected.x - halfX, y: selected.y + halfY },
    { id: "se", x: selected.x + halfX, y: selected.y + halfY },
  ];
  layer.insertAdjacentHTML("beforeend", handles.map((handle) =>
    `<button class="resize-handle handle-${handle.id}" data-resize-handle="${handle.id}" style="left:${handle.x}%;top:${handle.y}%" aria-label="Resize selected object"></button>`
  ).join(""));
}

function moveSelectionHandlesTo(selected) {
  const book = document.getElementById("book-spread");
  if (!selected || !book) return;
  const visual = elementVisualSize(selected);
  const halfX = ((visual.width / 2) / book.clientWidth) * 100;
  const halfY = ((visual.height / 2) / book.clientHeight) * 100;
  const positions = {
    nw: { x: selected.x - halfX, y: selected.y - halfY },
    ne: { x: selected.x + halfX, y: selected.y - halfY },
    sw: { x: selected.x - halfX, y: selected.y + halfY },
    se: { x: selected.x + halfX, y: selected.y + halfY },
  };
  Object.entries(positions).forEach(([id, position]) => {
    const handle = document.querySelector(`[data-resize-handle="${id}"]`);
    if (!handle) return;
    handle.style.left = `${position.x}%`;
    handle.style.top = `${position.y}%`;
  });
}

function bindSelectionHandles() {
  document.querySelectorAll("[data-resize-handle]").forEach((handle) => {
    let resize = null;
    handle.addEventListener("pointerdown", (event) => {
      const selected = state.elements.find((element) => element.id === state.selectedId);
      if (!selected) return;
      event.preventDefault();
      event.stopPropagation();
      pushHistory();
      resize = {
        startX: event.clientX,
        startY: event.clientY,
        size: selected.size || 38,
      };
      handle.setPointerCapture(event.pointerId);
    });
    handle.addEventListener("pointermove", (event) => {
      if (!resize) return;
      const selected = state.elements.find((element) => element.id === state.selectedId);
      const elementNode = selected ? document.querySelector(`[data-element="${CSS.escape(selected.id)}"]`) : null;
      if (!selected || !elementNode) return;
      event.preventDefault();
      event.stopPropagation();
      const direction = handle.dataset.resizeHandle || "se";
      const signX = direction.includes("w") ? -1 : 1;
      const signY = direction.includes("n") ? -1 : 1;
      const delta = ((event.clientX - resize.startX) * signX + (event.clientY - resize.startY) * signY) / 2;
      selected.size = clampElementSize(selected, resize.size + delta / Math.max(0.7, state.zoom || 1));
      applyElementSizeStyle(elementNode, selected);
      moveSelectionHandlesTo(selected);
      persist();
    });
    handle.addEventListener("pointerup", () => {
      resize = null;
      drawElements();
    });
    handle.addEventListener("pointercancel", () => {
      resize = null;
      drawElements();
    });
  });
}

function bindLayerPinchResize(layer) {
  if (layer.dataset.pinchResizeBound) return;
  layer.dataset.pinchResizeBound = "true";
  let resize = null;
  layer.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 2 || !state.selectedId || isDrawingTool()) return;
    const elementNode = document.querySelector(`[data-element="${CSS.escape(state.selectedId)}"]`);
    const selected = state.elements.find((element) => element.id === state.selectedId);
    if (!elementNode || !selected || !touchesHitElement(event.touches, elementNode)) return;
    event.preventDefault();
    event.stopPropagation();
    pushHistory();
    resize = {
      distance: touchListDistance(event.touches),
      size: selected.size || 38,
    };
  }, { passive: false, capture: true });
  layer.addEventListener("touchmove", (event) => {
    if (!resize || event.touches.length !== 2) return;
    event.preventDefault();
    event.stopPropagation();
    const selected = state.elements.find((element) => element.id === state.selectedId);
    const elementNode = selected ? document.querySelector(`[data-element="${CSS.escape(selected.id)}"]`) : null;
    if (!selected || !elementNode || !resize.distance) return;
    const nextDistance = touchListDistance(event.touches);
    selected.size = clampElementSize(selected, resize.size * (nextDistance / resize.distance));
    applyElementSizeStyle(elementNode, selected);
    persist();
  }, { passive: false, capture: true });
  layer.addEventListener("touchend", () => {
    if (!resize) return;
    resize = null;
    drawElements();
  }, { capture: true });
}

function touchesHitElement(touches, elementNode) {
  const rect = elementNode.getBoundingClientRect();
  const pad = 36;
  return [...touches].every((touch) =>
    touch.clientX >= rect.left - pad &&
    touch.clientX <= rect.right + pad &&
    touch.clientY >= rect.top - pad &&
    touch.clientY <= rect.bottom + pad
  );
}

function setupCanvas() {
  canvas = document.getElementById("ink-layer");
  if (!canvas) return;
  const book = document.getElementById("book-spread");
  resizeCanvas();
  requestAnimationFrame(resizeCanvas);
  window.onresize = resizeCanvas;
  window.visualViewport?.addEventListener("resize", resizeCanvas);
  window.addEventListener("blur", cancelActiveStroke);
  canvas.addEventListener("pointerdown", beginDraw);
  canvas.addEventListener("pointermove", moveDraw);
  canvas.addEventListener("pointerrawupdate", moveDraw);
  canvas.addEventListener("pointerup", endDraw);
  canvas.addEventListener("pointercancel", endDraw);
  canvas.addEventListener("pointerleave", endDraw);
  canvas.addEventListener("lostpointercapture", endDraw);
  book?.addEventListener("pointerdown", handlePinchStart);
  book?.addEventListener("pointerdown", handleBlankSelectionDown);
  book?.addEventListener("pointermove", handlePinchMove);
  book?.addEventListener("pointerup", handlePinchEnd);
  book?.addEventListener("pointercancel", handlePinchEnd);
  paintPaths();
}

function handleBlankSelectionDown(event) {
  if (isDrawingTool() || !state.selectedId) return;
  if (event.target.closest?.("[data-element], input, textarea, [contenteditable='true']")) return;
  state.selectedId = null;
  drawElements();
  persist();
}

function handlePinchStart(event) {
  if (event.pointerType !== "touch") return;
  trackTouch(event);
  if (maybeStartPinch()) event.preventDefault();
}

function handlePinchMove(event) {
  if (updatePinchZoom(event)) event.preventDefault();
}

function handlePinchEnd(event) {
  releaseTouch(event);
  if (!pinchState) persist();
}

function trackTouch(event) {
  if (event.pointerType !== "touch") return;
  activeTouches.set(event.pointerId, { x: event.clientX, y: event.clientY });
}

function updateTouch(event) {
  if (event.pointerType !== "touch" || !activeTouches.has(event.pointerId)) return;
  activeTouches.set(event.pointerId, { x: event.clientX, y: event.clientY });
}

function releaseTouch(event) {
  if (event?.pointerType === "touch") activeTouches.delete(event.pointerId);
  if (activeTouches.size < 2) pinchState = null;
}

function maybeStartPinch() {
  if (activeTouches.size < 2) return false;
  const [first, second] = [...activeTouches.values()];
  const distance = touchDistance(first, second);
  if (!pinchState) {
    cancelActiveStroke(true);
    const midpoint = touchMidpoint(first, second);
    const stage = document.getElementById("stage-transform");
    const rect = stage?.getBoundingClientRect?.();
    const zoom = state.zoom || 1;
    const baseLeft = rect ? rect.left - (state.panX || 0) : 0;
    const baseTop = rect ? rect.top - (state.panY || 0) : 0;
    pinchState = {
      distance,
      zoom,
      baseLeft,
      baseTop,
      localX: rect ? (midpoint.x - rect.left) / zoom : 0,
      localY: rect ? (midpoint.y - rect.top) / zoom : 0,
    };
  }
  return true;
}

function updatePinchZoom(event) {
  if (event.pointerType !== "touch") return false;
  updateTouch(event);
  if (!maybeStartPinch() || !pinchState) return false;
  const [first, second] = [...activeTouches.values()];
  const nextDistance = touchDistance(first, second);
  if (!pinchState.distance || !nextDistance) return true;
  const midpoint = touchMidpoint(first, second);
  const nextZoom = clampZoom(pinchState.zoom * (nextDistance / pinchState.distance));
  state.zoom = nextZoom;
  state.panX = midpoint.x - pinchState.baseLeft - pinchState.localX * nextZoom;
  state.panY = midpoint.y - pinchState.baseTop - pinchState.localY * nextZoom;
  applyLiveZoom();
  return true;
}

function touchDistance(first, second) {
  return Math.hypot(second.x - first.x, second.y - first.y);
}

function touchMidpoint(first, second) {
  return { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 };
}

function applyLiveZoom() {
  const stage = document.getElementById("stage-transform");
  if (stage) {
    stage.style.setProperty("--camera-scale", state.zoom);
    stage.style.setProperty("--inverse-camera-scale", 1 / (state.zoom || 1));
    stage.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoom})`;
  }
  const readout = document.querySelector('[data-testid="zoom-readout"]');
  if (readout) readout.textContent = `${Math.round(state.zoom * 100)}%`;
}

function resizeCanvas() {
  const book = document.getElementById("book-spread");
  const rect = book?.getBoundingClientRect?.() || canvas.getBoundingClientRect();
  const width = Math.max(1, Math.round(book?.clientWidth || rect.width || canvas.offsetWidth || 1));
  const height = Math.max(1, Math.round(book?.clientHeight || rect.height || canvas.offsetHeight || 1));
  const dpr = window.devicePixelRatio || 1;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  paintPaths();
}

function localPoint(event, element, rect = element.getBoundingClientRect(), includeInkOffset = true) {
  const width = element.clientWidth || rect.width;
  const height = element.clientHeight || rect.height;
  const xRatio = rect.width ? width / rect.width : 1;
  const yRatio = rect.height ? height / rect.height : 1;
  const clientX = Number.isFinite(event.clientX) ? event.clientX : (event.pageX || 0) - window.scrollX;
  const clientY = Number.isFinite(event.clientY) ? event.clientY : (event.pageY || 0) - window.scrollY;
  return {
    x: (clientX - rect.left) * xRatio + (includeInkOffset ? state.drawOffsetX || 0 : 0),
    y: (clientY - rect.top) * yRatio + (includeInkOffset ? state.drawOffsetY || 0 : 0),
  };
}

function canvasPoint(event) {
  const book = document.getElementById("book-spread");
  const target = canvas || book;
  const computed = localPoint(event, target);
  recordPenDiagnostics(event, computed, book || target);
  return computed;
}

function recordPenDiagnostics(event, computed, book = document.getElementById("book-spread")) {
  const bookRect = book?.getBoundingClientRect?.();
  state.penDiagnostics = {
    type: event.type,
    pointerId: event.pointerId,
    pointerType: event.pointerType,
    clientX: Math.round(event.clientX || 0),
    clientY: Math.round(event.clientY || 0),
    pageX: Math.round(event.pageX || 0),
    pageY: Math.round(event.pageY || 0),
    offsetX: Math.round(event.offsetX || 0),
    offsetY: Math.round(event.offsetY || 0),
    bookLeft: Math.round(bookRect?.left || 0),
    bookTop: Math.round(bookRect?.top || 0),
    bookWidth: Math.round(bookRect?.width || 0),
    bookHeight: Math.round(bookRect?.height || 0),
    canvasWidth: Math.round(canvas?.clientWidth || 0),
    canvasHeight: Math.round(canvas?.clientHeight || 0),
    pointX: Math.round(computed.x || 0),
    pointY: Math.round(computed.y || 0),
    scrollX: Math.round(window.scrollX || 0),
    scrollY: Math.round(window.scrollY || 0),
  };
}

function point(event) {
  return canvasPoint(event);
}

function beginDraw(event) {
  trackTouch(event);
  if (maybeStartPinch()) {
    event.preventDefault();
    return;
  }
  if (!["pen", "highlighter", "erase"].includes(state.activeTool)) return;
  if (drawing && activePointerId !== event.pointerId) return;
  event.preventDefault();
  resizeCanvas();
  drawing = true;
  activePointerId = event.pointerId;
  lockPageWhileWriting();
  canvas.setPointerCapture(event.pointerId);
  pushHistory();
  state.redoPaths = [];
  const preset = penPresets.find((entry) => entry.id === state.penPreset) || penPresets[0];
  const width = state.activeTool === "erase" ? Math.max(16, state.penWidth * 2) : state.activeTool === "highlighter" ? Math.max(12, state.penWidth) : state.penWidth;
  state.penPaths.push({
    color: state.activeTool === "erase" ? "#fffdf7" : state.activeColor,
    alpha: state.activeTool === "highlighter" ? 0.34 : preset.alpha,
    composite: state.activeTool === "erase" ? "destination-out" : "source-over",
    preset: state.activeTool === "erase" ? "eraser" : state.activeTool === "highlighter" ? "highlighter" : preset.id,
    width,
    points: [strokePoint(event)],
  });
}

function moveDraw(event) {
  if (updatePinchZoom(event)) {
    event.preventDefault();
    return;
  }
  if (!drawing || activePointerId !== event.pointerId) return;
  event.preventDefault();
  const path = state.penPaths[state.penPaths.length - 1];
  const events = typeof event.getCoalescedEvents === "function" ? event.getCoalescedEvents() : [event];
  events.forEach((inputEvent) => addStrokePoint(path, inputEvent));
  paintPaths();
  persist();
}

function endDraw(event) {
  releaseTouch(event);
  if (pinchState) {
    persist();
    return;
  }
  if (event?.pointerId && activePointerId !== event.pointerId) return;
  if (canvas && event?.pointerId && canvas.hasPointerCapture?.(event.pointerId)) {
    canvas.releasePointerCapture(event.pointerId);
  }
  drawing = false;
  activePointerId = null;
  unlockPageAfterWriting();
  persist();
}

function cancelActiveStroke() {
  if (!drawing) return;
  drawing = false;
  activePointerId = null;
  unlockPageAfterWriting();
  persist();
}

function lockPageWhileWriting() {
  if (scrollLockSnapshot) return;
  scrollLockSnapshot = {
    bodyOverflow: document.body.style.overflow,
    bodyTouchAction: document.body.style.touchAction,
    rootTouchAction: document.documentElement.style.touchAction,
    userSelect: document.body.style.userSelect,
  };
  document.body.classList.add("is-writing");
  document.body.style.overflow = "hidden";
  document.body.style.touchAction = "none";
  document.documentElement.style.touchAction = "none";
  document.body.style.userSelect = "none";
}

function unlockPageAfterWriting() {
  if (!scrollLockSnapshot) return;
  document.body.classList.remove("is-writing");
  document.body.style.overflow = scrollLockSnapshot.bodyOverflow;
  document.body.style.touchAction = scrollLockSnapshot.bodyTouchAction;
  document.documentElement.style.touchAction = scrollLockSnapshot.rootTouchAction;
  document.body.style.userSelect = scrollLockSnapshot.userSelect;
  scrollLockSnapshot = null;
}

function paintPaths() {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  state.penPaths.forEach((path) => {
    ctx.save();
    ctx.globalCompositeOperation = path.composite || "source-over";
    ctx.globalAlpha = path.alpha || 1;
    ctx.strokeStyle = path.color;
    drawStrokePath(ctx, path);
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

function strokePoint(event) {
  const nextPoint = point(event);
  const pressure = Number.isFinite(event.pressure) && event.pressure > 0 ? event.pressure : event.pointerType === "pen" ? 0.62 : 0.72;
  return {
    ...nextPoint,
    pressure: Math.max(0.12, Math.min(1, pressure)),
    t: Date.now(),
  };
}

function addStrokePoint(path, event) {
  const nextPoint = strokePoint(event);
  const lastPoint = path.points[path.points.length - 1];
  if (lastPoint && distanceBetween(lastPoint, nextPoint) < 0.85) return;
  path.points.push(nextPoint);
}

function distanceBetween(a, b) {
  return Math.hypot((b.x || 0) - (a.x || 0), (b.y || 0) - (a.y || 0));
}

function pressureWidth(path, point) {
  const baseWidth = path.width || 4;
  if (path.preset === "highlighter" || path.preset === "eraser") return baseWidth;
  const pressure = point?.pressure ?? 0.7;
  return Math.max(1, baseWidth * (0.72 + pressure * 0.5));
}

function shouldDrawJoinedStroke(path) {
  return ["pencil", "marker", "highlighter"].includes(path.preset);
}

function averageStrokeWidth(path, points) {
  const total = points.reduce((sum, point) => sum + pressureWidth(path, point), 0);
  return total / Math.max(1, points.length);
}

function drawJoinedStroke(ctx, points) {
  ctx.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length; index += 1) {
    ctx.lineTo(points[index].x, points[index].y);
  }
}

function drawStrokePath(ctx, path) {
  const points = path.points || [];
  if (!points.length) return;
  if (points.length === 1) {
    const width = pressureWidth(path, points[0]);
    ctx.beginPath();
    ctx.fillStyle = path.color || ctx.strokeStyle;
    ctx.arc(points[0].x, points[0].y, Math.max(0.5, width / 2), 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  if (shouldDrawJoinedStroke(path)) {
    ctx.beginPath();
    ctx.lineWidth = averageStrokeWidth(path, points);
    drawJoinedStroke(ctx, points);
    ctx.stroke();
    return;
  }

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    ctx.beginPath();
    ctx.lineWidth = (pressureWidth(path, previous) + pressureWidth(path, current)) / 2;
    ctx.moveTo(previous.x, previous.y);
    ctx.lineTo(current.x, current.y);
    ctx.stroke();
  }
}

function toHighlighter(color) {
  return `color-mix(in srgb, ${color} 40%, #fff59d)`;
}

function toolLabel() {
  if (state.activeTool === "erase") return "Eraser";
  if (state.activeTool === "highlighter") return "Highlighter";
  return penPresets.find((entry) => entry.id === state.penPreset)?.label || "Pen";
}

function checkStorageQuota() {
  if (!("storage" in navigator) || !("estimate" in navigator.storage)) return;
  navigator.storage.estimate?.().then((estimate) => {
    const percentUsed = (estimate.usage / estimate.quota) * 100;
    const warning = document.getElementById("storage-warning");
    if (percentUsed > 80 && warning) {
      warning.style.display = "block";
    } else if (warning) {
      warning.style.display = "none";
    }
  }).catch(() => {});
}

function persist() {
  capturePageState();
  const note = document.getElementById("save-note");
  if (note) note.textContent = "Saving...";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    state.lastSavedAt = new Date().toISOString();
    state.editCountSinceBackup = Math.min(999, (state.editCountSinceBackup || 0) + 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      view: state.view,
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
      libraryQuery: state.libraryQuery,
      activeInspectorTab: state.activeInspectorTab,
      settings: state.settings,
      customTemplates: normalizeCustomTemplates(state.customTemplates),
      onboardingComplete: state.onboardingComplete,
      drawOffsetX: state.drawOffsetX,
      drawOffsetY: state.drawOffsetY,
      calibrationMode: state.calibrationMode,
      calibrationTargetX: state.calibrationTargetX,
      calibrationTargetY: state.calibrationTargetY,
      penDiagnostics: state.penDiagnostics,
      lastSavedAt: state.lastSavedAt,
      lastBackupAt: state.lastBackupAt,
      backupReminderDismissedAt: state.backupReminderDismissedAt,
      editCountSinceBackup: state.editCountSinceBackup,
    }));
    const freshNote = document.getElementById("save-note");
    if (freshNote) freshNote.textContent = saveStatusText();
    checkStorageQuota();
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
  showNotice("Page JSON downloaded");
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "alex-notebook";
}

function decodeHtml(value) {
  const element = document.createElement("textarea");
  element.innerHTML = value;
  return element.value;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

render();
