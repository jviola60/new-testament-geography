/**
 * Test NIV switching logic and Bible Videos rendering
 */
const fs = require("fs");
const vm = require("vm");
const path = require("path");

const files = [
  "js/data/regions.js",
  "js/data/cities.js",
  "js/data/jerusalemSites.js",
  "js/data/jerusalemGeography.js",
  "js/data/saviorEvents.js",
  "js/data/missionaryJourneys.js",
  "js/data/communities.js",
  "js/data/timelineEvents.js",
  "js/data/tours.js",
  "js/data/placeDossiers.js",
  "js/data/scriptureTranslations.js",
  "js/data/churchVideos.js",
  "js/uiController.js"
];

// Helper to create DOM element mock
function createMockCard(htmlSnippet) {
  const card = {
    attributes: {},
    dataset: {},
    classList: {
      _classes: new Set(),
      add(c) { this._classes.add(c); },
      remove(c) { this._classes.delete(c); },
      contains(c) { return this._classes.has(c); }
    },
    getAttribute(attr) { return this.attributes[attr] || null; },
    setAttribute(attr, val) { this.attributes[attr] = val; },
    _children: {},
    querySelector(sel) {
      if (sel === ".version-badge" || sel === ".scripture-kjv-tag") {
        if (!this._badge) {
          this._badge = {
            textContent: "KJV",
            innerHTML: "KJV",
            classList: {
              _classes: new Set(),
              add(c) { this._classes.add(c); },
              remove(c) { this._classes.delete(c); },
              contains(c) { return this._classes.has(c); }
            }
          };
        }
        return this._badge;
      }
      if (!this._children[sel]) {
        this._children[sel] = {
          textContent: "",
          innerHTML: "",
          classList: {
            _classes: new Set(),
            add(c) { this._classes.add(c); },
            remove(c) { this._classes.delete(c); },
            contains(c) { return this._classes.has(c); }
          },
          querySelectorAll() { return []; }
        };
      }
      return this._children[sel];
    },
    querySelectorAll() { return []; }
  };

  // Parse attributes from html snippet
  const refMatch = htmlSnippet.match(/data-ref="([^"]+)"/);
  if (refMatch) card.dataset.ref = refMatch[1];
  const kjvMatch = htmlSnippet.match(/data-kjv="([^"]+)"/);
  if (kjvMatch) {
    card.setAttribute("data-kjv", kjvMatch[1]);
    card.querySelector(".scripture-body").textContent = decodeURIComponent(kjvMatch[1]);
  }
  const nivMatch = htmlSnippet.match(/data-niv="([^"]+)"/);
  if (nivMatch) card.setAttribute("data-niv", nivMatch[1]);
  const greekMatch = htmlSnippet.match(/data-greek="([^"]+)"/);
  if (greekMatch) card.setAttribute("data-greek", greekMatch[1]);
  const hebrewMatch = htmlSnippet.match(/data-hebrew="([^"]+)"/);
  if (hebrewMatch) card.setAttribute("data-hebrew", hebrewMatch[1]);

  return card;
}

const sandbox = {
  window: { app: { timeline: { formatYear: (y) => `${y}` }, map: { flyToLocation() {} } } },
  console,
  document: {
    getElementById: () => ({ querySelector: () => null, addEventListener: () => {} }),
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: () => {}
  }
};
sandbox.window = Object.assign(sandbox.window, sandbox);
vm.createContext(sandbox);

let bundle = files.map((f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8")).join("\n;\n");
bundle = bundle.replace(/^const ([A-Z_][A-Z0-9_]*)/gm, "var $1");
bundle = bundle.replace(/^class UIController/, "var UIController = class UIController");
vm.runInContext(bundle, sandbox);

const ui = vm.runInContext("new UIController()", sandbox);

console.log("--- Testing Scripture Cards Generation & NIV Switching ---");

const testPlaces = [
  { name: "Capernaum", scriptures: sandbox.CITIES_DATA.find(c => c.id === "capernaum").scriptures },
  { name: "Nazareth", scriptures: sandbox.CITIES_DATA.find(c => c.id === "nazareth").scriptures },
  { name: "Bethlehem", scriptures: sandbox.CITIES_DATA.find(c => c.id === "bethlehem").scriptures },
  { name: "Second Temple", scriptures: (sandbox.JERUSALEM_SITES.find(s => s.id.includes("temple")) || sandbox.JERUSALEM_SITES[0]).scriptures },
  { name: "Gethsemane", scriptures: (sandbox.JERUSALEM_SITES.find(s => s.id.includes("gethsemane") || s.name.includes("Gethsemane")) || sandbox.JERUSALEM_SITES[1]).scriptures }
];

let totalVersesTested = 0;
let passes = 0;
let failures = [];

testPlaces.forEach(place => {
  console.log(`\nTesting Place: ${place.name} (${place.scriptures.length} scriptures)`);
  const cardsHtml = ui.renderScriptureCards(place.scriptures);

  // Extract individual card HTML blocks
  const cardBlocks = cardsHtml.split('class="scripture-verse-card"').slice(1);
  
  cardBlocks.forEach((block, idx) => {
    totalVersesTested++;
    const card = createMockCard(block);
    const ref = card.dataset.ref;
    const originalKjv = decodeURIComponent(card.getAttribute("data-kjv"));
    
    // Switch to NIV
    ui.switchScriptureVersion(card, "niv");
    const nivText = card.querySelector(".scripture-body").textContent;
    const badgeText = card.querySelector(".scripture-kjv-tag").textContent;

    if (!nivText || nivText.length < 10) {
      failures.push(`[${place.name} - ${ref}] NIV text is empty or too short: "${nivText}"`);
      return;
    }

    if (badgeText !== "NIV (Easy-to-Read)") {
      failures.push(`[${place.name} - ${ref}] Badge text is wrong: "${badgeText}"`);
      return;
    }

    // Ensure NIV is not simply Elizabethan KJV
    if (nivText === originalKjv && (originalKjv.includes("thou") || originalKjv.includes("thee") || originalKjv.includes("hath") || originalKjv.includes("dwelt"))) {
      failures.push(`[${place.name} - ${ref}] NIV is identical to Elizabethan KJV! KJV: "${originalKjv.slice(0, 50)}..."`);
      return;
    }

    // Switch to Hebrew
    ui.switchScriptureVersion(card, "hebrew");
    const hebText = card.querySelector(".scripture-body").textContent;
    if (!hebText || hebText.length < 5) {
      failures.push(`[${place.name} - ${ref}] Hebrew text missing`);
      return;
    }

    // Switch to Greek
    ui.switchScriptureVersion(card, "greek");
    const grkText = card.querySelector(".scripture-body").textContent;
    if (!grkText || grkText.length < 5) {
      failures.push(`[${place.name} - ${ref}] Greek text missing`);
      return;
    }

    // Switch back to KJV
    ui.switchScriptureVersion(card, "kjv");
    const restoredKjv = card.querySelector(".scripture-body").textContent.replace(/^"|"$/g, "");
    if (restoredKjv !== originalKjv) {
      failures.push(`[${place.name} - ${ref}] KJV restoration failed: got "${restoredKjv}" expected "${originalKjv}"`);
      return;
    }

    passes++;
    console.log(`  ✓ ${ref} | KJV -> NIV -> Hebrew -> Greek -> KJV verified.`);
    console.log(`    NIV Preview: "${nivText.slice(0, 75)}..."`);
  });
});

console.log("\n--- Testing Bible Videos Rendering ---");
["capernaum", "jerusalem", "nazareth"].forEach(id => {
  const city = sandbox.CITIES_DATA.find(c => c.id === id);
  const html = ui.renderVideosTab(city, "city");
  if (!html.includes("churchofjesuschrist.org") || !html.includes("video-card")) {
    failures.push(`City ${id} video tab missing expected ChurchofJesusChrist.org links or video cards`);
  } else {
    console.log(`  ✓ City ${id} Bible Videos tab rendered with official video links`);
  }
});

console.log("\n=================================");
console.log(`Total tests: ${totalVersesTested} verses + video tabs`);
console.log(`Passes: ${passes}`);
console.log(`Failures: ${failures.length}`);
if (failures.length > 0) {
  failures.forEach(f => console.error("  ❌", f));
  process.exit(1);
} else {
  console.log("🎉 ALL TESTS PASSED! NIV, Hebrew, Greek switching and Bible Videos work seamlessly!");
}
