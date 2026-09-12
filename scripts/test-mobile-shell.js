/**
 * Markup + CSS smoke test for the mobile atlas shell.
 */
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const mobileCss = fs.readFileSync(path.join(root, "css/mobile.css"), "utf8");
const mobileJs = fs.readFileSync(path.join(root, "js/mobileShell.js"), "utf8");
const uiJs = fs.readFileSync(path.join(root, "js/uiController.js"), "utf8");
const mainCss = fs.readFileSync(path.join(root, "css/main.css"), "utf8");

assert(html.includes('css/mobile.css'), "index.html should load mobile.css");
assert(html.includes("js/mobileShell.js"), "index.html should load mobileShell.js");
assert(html.includes('id="mobileCityPickerBtn"'), "Expected mobile city picker button");
assert(html.includes('id="mobileCityPickerSheet"'), "Expected searchable city picker sheet");
assert(html.includes('id="mobileCitySearch"'), "Expected city picker search input");
assert(html.includes('id="filterRowPrimary"') && html.includes('id="filterRowSecondary"'), "Expected two filter chip rows");
assert(html.includes("sidebar-tab-row"), "Expected two place-detail tab rows");
assert((html.match(/class="tab-btn/g) || []).length >= 7, "Expected all seven place-detail tabs");
assert(html.includes('id="sheetHandle"'), "Expected bottom-sheet handle");
assert(html.includes('id="mobileMoreSheet"'), "Expected more-tools sheet");
assert(html.includes("viewport-fit=cover"), "Expected notch-safe viewport");

assert(mobileCss.includes("layout-mobile"), "mobile.css should key off layout-mobile");
assert(mobileCss.includes("sheet-half"), "mobile.css should define sheet snap heights");
assert(mobileCss.includes("min-height: 44px") || mobileCss.includes("min-height: var(--tap)"), "Expected 44px tap targets");
assert(mobileCss.includes("@media (max-width: 768px)"), "Expected phone breakpoint at 768px");

assert(mobileJs.includes("class MobileShell"), "Expected MobileShell class");
assert(mobileJs.includes("invalidateSize"), "Expected Leaflet invalidateSize on layout changes");
assert(mobileJs.includes("getQuickJumpCatalog"), "City picker should reuse the desktop catalog");

assert(uiJs.includes("getQuickJumpCatalog"), "uiController should expose the shared place catalog");
assert(uiJs.includes("jumpToQuickJumpValue"), "uiController should expose shared jump logic");
assert(uiJs.includes("onSidebarOpened"), "Sidebar open should notify the mobile shell");

assert(mainCss.includes("@media (max-width: 900px)"), "Desktop CSS must keep main's 900px rules");
assert(mobileCss.includes("era-selector-tabs"), "Mobile CSS should restore era tabs below 768px");
assert(mobileJs.includes("max-width: 768px"), "Mobile shell JS must use the 768px breakpoint");

const chips = html.match(/<button class="filter-chip[^"]*"/g) || [];
assert(chips.length >= 8, `Expected at least 8 filter chips, found ${chips.length}`);
chips.forEach(chip => {
  assert(!chip.includes(" active"), `Filter chips must stay inactive by default: ${chip}`);
});

console.log("✓ Mobile shell markup, CSS, and JS hooks look complete.");
