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
assert(html.includes('id="mobileFilterBtn"'), "Expected mobile filter dropdown trigger");
assert(html.includes('id="mobileFilterMenu"'), "Expected existing filter chips to back the dropdown");
assert(html.includes('id="mobileCityPickerSheet"'), "Expected searchable city picker sheet");
assert(html.includes('id="mobileCitySearch"'), "Expected city picker search input");
assert(html.includes('id="filterRowPrimary"') && html.includes('id="filterRowSecondary"'), "Expected two filter chip rows");
assert(
  html.indexOf('id="mobileFilterBtn"') < html.indexOf('id="mobileCityPickerBtn"'),
  "Filter dropdown should sit beside (before) the city jump control"
);
assert(html.includes("sidebar-tab-row"), "Expected two place-detail tab rows");
assert((html.match(/class="tab-btn/g) || []).length >= 7, "Expected all seven place-detail tabs");
assert(html.includes('id="sheetHandle"'), "Expected bottom-sheet handle");
assert(html.includes('id="mobileMoreSheet"'), "Expected more-tools sheet");
assert(html.includes('id="mobileBasemapToggle"'), "Expected visible mobile Map/Satellite control");
assert(html.includes('data-style="parchment"') && html.includes('data-style="satellite"'), "Basemap toggle must expose parchment and satellite");
assert(html.includes("viewport-fit=cover"), "Expected notch-safe viewport");

assert(mobileCss.includes("layout-mobile"), "mobile.css should key off layout-mobile");
assert(mobileCss.includes("sheet-half"), "mobile.css should define sheet snap heights");
assert(mobileCss.includes("min-height: 44px") || mobileCss.includes("min-height: var(--tap)"), "Expected 44px tap targets");
assert(mobileCss.includes("--tap: 44px"), "Expected --tap token at 44px");
["filter-chip", "tab-btn", "era-tab", "floating-btn", "mobile-city-picker-btn", "mobile-filter-trigger", "speed-btn", "sheet-handle"].forEach(sel => {
  const re = new RegExp(`html\\.layout-mobile \\.${sel}(?:[\\s,:][^{]*)?\\{([\\s\\S]{0,240})`);
  const match = mobileCss.match(re);
  assert(match, `Expected mobile rule for .${sel}`);
  assert(/var\(--tap\)|44px/.test(match[1]), `${sel} should use a 44px tap target`);
});
assert(!mobileCss.includes("min-height: 34px"), "Filter chips must not stay at 34px");
assert(!mobileCss.includes("min-height: 32px"), "Speed buttons must not stay at 32px");
assert(mobileCss.includes("font-size: 12px"), "Primary zoomed city labels should be at least 12px");
assert(mobileCss.includes("@media (max-width: 768px)"), "Expected phone breakpoint at 768px");
assert(mobileCss.includes("z-index: 1400"), "Details sheet must stack above the timeline");
assert(mobileCss.includes("overflow-x: auto"), "Chips/tabs/eras must be horizontally scrollable");
assert(mobileCss.includes("contain: layout paint") || mobileCss.includes("isolation: isolate"), "Tour cards must not paint over each other");
assert(!mobileCss.includes("CORINTHS"), "No CORINTHS typo in mobile CSS");

assert(mobileJs.includes("class MobileShell"), "Expected MobileShell class");
assert(mobileJs.includes("invalidateSize"), "Expected Leaflet invalidateSize on layout changes");
assert(mobileJs.includes("getQuickJumpCatalog"), "City picker should reuse the desktop catalog");
assert(mobileJs.includes("mobile-zoomed"), "Mobile shell should gate map labels by zoom");
assert(mobileJs.includes("sheet-open"), "Mobile shell should flag an open details sheet");
assert(mobileJs.includes("topright"), "Zoom control should sit top-right, away from left FABs");
assert(mobileJs.includes("bindBasemapToggle"), "Mobile shell should wire the visible basemap toggle");
assert(mobileJs.includes("syncLeftMapStack"), "Mobile shell should stack left FABs below the period title");
assert(mobileJs.includes("--left-fab-top"), "FAB stack top should follow the period-title height");
assert(mobileJs.includes("bindFilterDropdown"), "Mobile shell should wire the compact filter dropdown");
assert(mobileJs.includes("syncFilterLabel"), "Filter trigger should show the current layer selection");
assert(mobileJs.includes("jumpToQuickJumpValue"), "City jump must keep using existing catalog logic");
assert(mobileCss.includes("safe-area-inset-bottom"), "Timeline footer must pad for Android safe-area");
assert(mobileCss.includes("mobile-basemap-toggle"), "Mobile CSS should show the basemap toggle");
assert(mobileCss.includes("calc(8px + var(--tap) + 10px)"), "Zoom stack should clear the Map|Satellite chip");
assert(mobileCss.includes("--left-fab-top"), "Mobile CSS should place FABs under the period title");
assert(/crimson left edge/.test(mobileCss), "Period-title crimson accent should stay documented as decorative");

assert(uiJs.includes("getQuickJumpCatalog"), "uiController should expose the shared place catalog");
assert(uiJs.includes("jumpToQuickJumpValue"), "uiController should expose shared jump logic");
assert(uiJs.includes("onSidebarOpened"), "Sidebar open should notify the mobile shell");

assert(mainCss.includes("@media (max-width: 900px)"), "Desktop CSS must keep main's 900px rules");
assert(mobileCss.includes("era-selector-tabs"), "Mobile CSS should restore era tabs below 768px");
assert(mobileJs.includes("max-width: 768px"), "Mobile shell JS must use the 768px breakpoint");
assert(/--footer-height:\s*136px/.test(mobileCss), "Mobile footer should be denser than the 176px stacked chrome");
assert(/--citybar-height:\s*52px/.test(mobileCss), "Filter + jump should share one 52px command row");
assert(/--filterbar-height:\s*0px/.test(mobileCss), "Stacked desktop chip bar must not consume a second mobile row");
assert(mobileCss.includes("filter-menu-open"), "Filter chips should open from the compact dropdown");
assert(!mobileCss.includes("--footer-height: 176px"), "Old 176px mobile footer must not remain the phone default");

const chips = html.match(/<button class="filter-chip[^"]*"/g) || [];
assert(chips.length >= 8, `Expected at least 8 filter chips, found ${chips.length}`);
chips.forEach(chip => {
  assert(!chip.includes(" active"), `Filter chips must stay inactive by default: ${chip}`);
});

console.log("✓ Mobile shell markup, CSS, and JS hooks look complete.");
