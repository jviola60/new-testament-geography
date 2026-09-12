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
assert(html.includes('id="mobilePeriodBtn"'), "Expected mobile period dropdown trigger");
assert(html.includes('id="mobileFilterMenu"'), "Expected existing filter chips to back the dropdown");
assert(html.includes('id="eraTabs"'), "Expected existing era tabs to back the period dropdown");
assert(html.includes("Jump to place"), "Jump idle label should be the short 'Jump to place' copy");
assert(!/Jump to any city or region/i.test(html), "Jump idle label must not keep the long city/region sentence");
assert(html.includes('id="mobileCityPickerSheet"'), "Expected searchable city picker sheet");
assert(html.includes('id="mobileCitySearch"'), "Expected city picker search input");
assert(html.includes('id="filterRowPrimary"') && html.includes('id="filterRowSecondary"'), "Expected two filter chip rows");
assert(
  html.indexOf('id="mobileFilterBtn"') < html.indexOf('id="mobilePeriodBtn"') &&
    html.indexOf('id="mobilePeriodBtn"') < html.indexOf('id="mobileCityPickerBtn"'),
  "Command row should be Layers, then Period, then Jump"
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
["filter-chip", "tab-btn", "era-tab", "floating-btn", "mobile-city-picker-btn", "mobile-filter-trigger", "mobile-period-trigger", "speed-btn", "sheet-handle"].forEach(sel => {
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
assert(mobileCss.includes("overflow-x: auto"), "Place tabs must stay horizontally scrollable");
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
assert(mobileJs.includes("bindPeriodDropdown"), "Mobile shell should wire the compact period dropdown");
assert(mobileJs.includes("syncPeriodLabel"), "Period trigger should show Period · current era");
assert(mobileJs.includes("closeChromeMenus"), "Search/Tours/More must share a close for Layers + Period menus");
{
  const header = mobileJs.slice(mobileJs.indexOf("bindHeader() {"), mobileJs.indexOf("collapseLegend() {"));
  assert(header.includes("closeChromeMenus"), "Header Search/Tours/More must close the period menu");
  assert(/if \(open\)[\s\S]{0,80}closeChromeMenus/.test(header), "Opening Search must close the period menu");
  assert(/toursBtn[\s\S]{0,200}closeChromeMenus/.test(header), "Opening Tours must close the period menu");
  assert(/closeChromeMenus[\s\S]{0,80}openMoreSheet/.test(header), "Opening More must close the period menu");
}
assert(mobileJs.includes("Period ·"), "Period trigger copy should use the Period · current pattern");
assert(mobileJs.includes("jumpToQuickJumpValue"), "City jump must keep using existing catalog logic");
assert(!mobileJs.includes("speed dropdown") && !/bindSpeedDropdown/.test(mobileJs), "This PR must not add a Speed dropdown");
assert(!/timeline-collapsed|collapseTimeline|collapsible Timeline/i.test(mobileJs + mobileCss), "This PR must not collapse the Timeline");
assert(mobileCss.includes("100svh"), "Phone shell must fall back to 100svh");
assert(mobileCss.includes("100dvh"), "Phone shell must use 100dvh");
assert(mobileCss.includes("-webkit-fill-available"), "Phone shell must fall back to -webkit-fill-available");
assert(mobileCss.includes("--app-vh"), "Phone shell must honor the visual-viewport --app-vh token");
assert(mobileCss.includes("flex-direction: column"), "Phone body must be a column so the map can flex-grow");
assert(mobileJs.includes("syncViewportHeight"), "Mobile shell must sync --app-vh to the visual viewport");
assert(mobileJs.includes("--app-vh"), "Mobile shell must write --app-vh");
assert(mobileJs.includes("visualViewport"), "Viewport height must track visualViewport, not only innerHeight");
assert(html.includes("--app-vh"), "First paint on phones should set --app-vh before CSS");
assert(mobileCss.includes("safe-area-inset-bottom"), "Timeline footer must pad for Android safe-area");
assert(mobileCss.includes("mobile-basemap-toggle"), "Mobile CSS should show the basemap toggle");
assert(mobileCss.includes("calc(8px + var(--tap) + 10px)"), "Zoom stack should clear the Map|Satellite chip");
assert(mobileCss.includes("--left-fab-top"), "Mobile CSS should place FABs under the period title");
assert(/crimson left edge/.test(mobileCss), "Period-title crimson accent should stay documented as decorative");

assert(uiJs.includes("getQuickJumpCatalog"), "uiController should expose the shared place catalog");
assert(uiJs.includes("jumpToQuickJumpValue"), "uiController should expose shared jump logic");
assert(uiJs.includes("onSidebarOpened"), "Sidebar open should notify the mobile shell");

assert(mainCss.includes("@media (max-width: 900px)"), "Desktop CSS must keep main's 900px rules");
assert(mobileCss.includes("era-selector-tabs"), "Mobile CSS should reuse era tabs as the period menu");
assert(mobileJs.includes("max-width: 768px"), "Mobile shell JS must use the 768px breakpoint");
assert(/--footer-height:\s*124px/.test(mobileCss), "Mobile footer should drop the period-chip row");
assert(/--citybar-height:\s*52px/.test(mobileCss), "Layers + Period + Jump should share one 52px command row");
assert(/--filterbar-height:\s*0px/.test(mobileCss), "Stacked desktop chip bar must not consume a second mobile row");
assert(mobileCss.includes("filter-menu-open"), "Filter chips should open from the compact dropdown");
assert(mobileCss.includes("period-menu-open"), "Era tabs should open from the compact period dropdown");
assert(!mobileCss.includes("--footer-height: 176px"), "Old 176px mobile footer must not remain the phone default");
assert(!mobileCss.includes("--footer-height: 168px"), "PR #6 168px footer must shrink after period chips leave the footer");
assert(
  /max\(28px,\s*calc\(20px \+ env\(safe-area-inset-bottom/.test(mobileCss),
  "Footer must restore PR #4 safe-area padding-bottom"
);
assert(
  /padding:\s*10px 2px 18px/.test(mobileCss),
  "Slider track wrap must keep PR #4 thumb room"
);
assert(
  /sheet-open \.mobile-city-bar[\s\S]{0,120}display:\s*none/.test(mobileCss),
  "Command row must be display:none while the place sheet is open"
);
assert(/badge-season[\s\S]{0,220}clip:\s*rect\(0,\s*0,\s*0,\s*0\)/.test(mobileCss), "Season subtitle must be visually hidden on phone");
assert(mobileJs.includes('aria-hidden'), "Sheet-open should aria-hide the command row");
assert(mobileJs.includes("syncYearBadgeAria"), "Year badge should keep season in aria-label");

const chips = html.match(/<button class="filter-chip[^"]*"/g) || [];
assert(chips.length >= 8, `Expected at least 8 filter chips, found ${chips.length}`);
chips.forEach(chip => {
  assert(!chip.includes(" active"), `Filter chips must stay inactive by default: ${chip}`);
});

console.log("✓ Mobile shell markup, CSS, and JS hooks look complete.");
