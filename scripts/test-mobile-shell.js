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
const mapJs = fs.readFileSync(path.join(root, "js/mapController.js"), "utf8");
const citiesJs = fs.readFileSync(path.join(root, "js/data/cities.js"), "utf8");
const regionsJs = fs.readFileSync(path.join(root, "js/data/regions.js"), "utf8");

assert(html.includes('css/mobile.css'), "index.html should load mobile.css");
assert(html.includes("js/mobileShell.js"), "index.html should load mobileShell.js");
assert(html.includes('id="mobileCityPickerBtn"'), "Expected mobile city picker button");
assert(html.includes('id="mobileFilterBtn"'), "Expected mobile filter dropdown trigger");
assert(html.includes('id="mobilePeriodBtn"'), "Expected mobile period dropdown trigger");
assert(html.includes('id="mobileMenuBtn"'), "Expected phone hamburger button");
assert(html.includes('id="mobileNavSheet"'), "Expected hamburger bottom-sheet menu");
assert(html.includes('id="mobileAboutSheet"'), "Expected About sheet from the hamburger");
assert(html.includes('id="mobileNavLayers"') && html.includes('id="mobileNavPeriod"') && html.includes('id="mobileNavJump"'), "Hamburger sheet must list Layers, Period, and Jump");
assert(html.includes('id="mobileFilterMenu"'), "Expected existing filter chips to back the dropdown");
assert(html.includes('id="eraTabs"'), "Expected existing era tabs to back the period dropdown");
assert(/id="mobileFilterLabel">Layers</.test(html), "Layers trigger must start with the fixed Layers label");
assert(/id="mobilePeriodLabel">Period</.test(html), "Period trigger must start with the fixed Period label");
assert(/class="mobile-city-picker-label">Jump</.test(html), "Jump idle label should be the short Jump copy");
assert(/id="mobileNavJump"[\s\S]*?Jump to place/.test(html), "Hamburger should list Jump to place");
assert(!/Jump to any city or region/i.test(html), "Jump idle label must not keep the long city/region sentence");
assert(html.includes('legend.style.display = "none"'), "Phone first paint should hide the Atlas Legend chip — Legend lives in the hamburger");
assert(html.includes('id="mobileNavBasemapPanel"'), "Map / Satellite hamburger item must expand into a submenu");
assert(html.includes('id="mobileNavRecenter"') && html.includes('id="mobileNavJerusalem"'), "Hamburger Map / Satellite section must host the on-map atlas tools");
assert(html.includes('id="mobileNavHolyLand"'), "Hamburger Map / Satellite section should include Holy Land");
assert(html.includes('id="mobileFilterSubtitle"'), "Layers menu should expose a subtitle for the current selection");
assert(html.includes('id="mobilePeriodSubtitle"'), "Period menu should expose a subtitle for the current era");
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
["filter-chip", "tab-btn", "era-tab", "floating-btn", "mobile-city-picker-btn", "mobile-filter-trigger", "mobile-period-trigger", "mobile-menu-btn", "mobile-nav-item", "mobile-nav-tool", "speed-btn", "sheet-handle"].forEach(sel => {
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
assert(mobileJs.includes("applyStartExtentIfNeeded"), "Phone invalidateSize should finish the Eastern Mediterranean start extent");
assert(mobileCss.includes("city-label-overview"), "Phone CSS should reveal curated overview city labels at cold-start zoom");
assert(mobileCss.includes("region-label-overview"), "Phone CSS should reveal ASIA / GALATIA at cold-start zoom");
assert(mapJs.includes("getStartExtent") && mapJs.includes("drawOverviewRegionLabels"), "MapController should own phone start extent and overview region labels");
assert(regionsJs.includes("startExtent") && regionsJs.includes("29.2") && regionsJs.includes("37.2"), "regions.js should document the Eastern Mediterranean start box");
["jerusalem", "damascus", "antioch-syria", "ephesus", "corinth", "alexandria"].forEach((id) => {
  const block = citiesJs.split("{").find((chunk) => chunk.includes(`id: "${id}"`));
  assert(block && block.includes("overviewLabel: true"), `${id} should be flagged as an overview label`);
});
assert(mobileJs.includes("sheet-open"), "Mobile shell should flag an open details sheet");
assert(mobileJs.includes('el.style.display = "none"'), "Phone zoom +/- must be hidden so users pinch instead");
assert(mobileJs.includes("bindBasemapToggle"), "Mobile shell should wire the Map / Satellite control inside the hamburger");
assert(mobileJs.includes("toggleBasemapSubmenu"), "Map / Satellite hamburger item should expand a nested submenu");
assert(mobileJs.includes("mobileNavRecenter"), "Hamburger should proxy the Reset view atlas tool");
assert(mobileJs.includes("syncLeftMapStack"), "Mobile shell may still measure the period title");
assert(!mobileJs.includes("topright"), "Phone zoom control must not be repositioned onto the map");
assert(mobileJs.includes("bindHamburgerMenu"), "Mobile shell should wire the phone hamburger bottom sheet");
assert(mobileJs.includes("openNavSheet"), "Hamburger should open a bottom sheet, not a left drawer");
assert(mobileJs.includes("nav-menu-open"), "Hamburger open state should use a nav-menu-open class");
assert(mobileJs.includes("bindFilterDropdown"), "Mobile shell should wire the compact filter dropdown");
assert(mobileJs.includes("syncFilterLabel"), "Filter trigger should show the current layer selection");
assert(mobileJs.includes("bindPeriodDropdown"), "Mobile shell should wire the compact period dropdown");
assert(mobileJs.includes("syncPeriodLabel"), "Period trigger should keep a Period label and put the era in the menu subtitle");
{
  const bindPeriod = mobileJs.slice(mobileJs.indexOf("bindPeriodDropdown() {"), mobileJs.indexOf("isPeriodMenuOpen() {"));
  const observe = bindPeriod.match(/\.observe\(\s*eraHost\s*,\s*\{([\s\S]*?)\}\s*\)/);
  assert(observe, "Period menu should observe #eraTabs for active-tab class changes");
  assert(!/childList\s*:\s*true/.test(observe[1]), "Period observer must not watch childList (subtitle lives inside #eraTabs)");
  assert(!/characterData\s*:\s*true/.test(observe[1]), "Period observer must not watch characterData (syncPeriodLabel writes the nested subtitle)");
  assert(/attributeFilter\s*:\s*\[\s*["']class["']\s*\]/.test(observe[1]), "Period observer should watch only class changes on era tabs");
}
assert(mobileJs.includes("closeChromeMenus"), "Search/Tours/More must share a close for Layers + Period menus");
assert(mobileJs.includes("collapseLegend"), "Phone shell must be able to collapse the atlas legend");
assert(mobileJs.includes("openLegendSheet"), "Phone legend should expand as a sheet/modal");
assert(mobileJs.includes("legend-sheet-open"), "Expanded phone legend should use a sheet class");
assert(mobileJs.includes("bindLegendSheet"), "Mobile shell should wire the legend chip/sheet");
{
  const bind = mobileJs.slice(mobileJs.indexOf("bindLegendSheet() {"), mobileJs.indexOf("bindSheet() {"));
  assert(bind.includes("isLegendOpen"), "Legend chip toggle must use isLegendOpen(), not body display");
  assert(/if\s*\(\s*this\.isLegendOpen\(\)\s*\)[\s\S]{0,120}collapseLegend/.test(bind), "Open legend must collapse on tap");
  assert(/else[\s\S]{0,80}openLegendSheet/.test(bind), "Closed legend must open on tap");
  assert(!/body\.style\.display !== "none"/.test(bind), "Inverted display !== none check must not remain");
}
assert(
  /layout-mobile[\s\S]{0,80}return/.test(uiJs.slice(uiJs.indexOf("legendToggleHeader"), uiJs.indexOf("Search Bar"))),
  "Desktop legend toggle must no-op on phone so bindLegendSheet owns the chip"
);
{
  const firstPaint = html.slice(html.indexOf("legend.style.display"), html.indexOf("</script>"));
  assert(firstPaint.includes('classList.toggle("active"'), "Phone first paint should sync chip active classes before app init");
  assert(firstPaint.includes('"churches"') && firstPaint.includes('"journeys"'), "Phone first-paint chip sync should keep Churches + Journeys only");
}
{
  const header = mobileJs.slice(mobileJs.indexOf("bindHeader() {"), mobileJs.indexOf("bindHamburgerMenu() {"));
  assert(header.includes("closeChromeMenus"), "Header Search/Tours/More must close the period menu");
  assert(/if \(open\)[\s\S]{0,80}closeChromeMenus/.test(header), "Opening Search must close the period menu");
  assert(/toursBtn[\s\S]{0,200}closeChromeMenus/.test(header), "Opening Tours must close the period menu");
  assert(/closeChromeMenus[\s\S]{0,80}openMoreSheet/.test(header), "Opening More must close the period menu");
}
{
  const burger = mobileJs.slice(mobileJs.indexOf("bindHamburgerMenu() {"), mobileJs.indexOf("closeChromeMenus() {"));
  assert(burger.includes("openFilterMenu"), "Hamburger Layers must open the existing layer UI");
  assert(burger.includes("openPeriodMenu"), "Hamburger Period must open the existing period UI");
  assert(burger.includes("openCityPicker"), "Hamburger Jump must open the existing place picker");
  assert(burger.includes("closeNavSheet"), "Selecting Layers/Period/Jump/Legend must close the hamburger sheet");
  assert(burger.includes("toggleBasemapSubmenu"), "Map / Satellite must expand in-place instead of leaving the hamburger");
  assert(!/toggleBasemapFromMenu/.test(burger), "Map / Satellite must not immediately toggle and dismiss");
  assert(!/left drawer|side-drawer|offcanvas/i.test(burger), "Hamburger must not open a left drawer");
}
assert(mobileJs.includes('textContent = "Period"'), "Period trigger copy should stay the short Period label");
assert(mobileJs.includes('textContent = "Layers"'), "Layers trigger copy should stay the short Layers label");
assert(mobileJs.includes('textContent = "Jump"'), "Jump trigger copy should stay the short Jump label");
{
  const openFilter = mobileJs.slice(mobileJs.indexOf("openFilterMenu() {"), mobileJs.indexOf("closeFilterMenu() {"));
  assert(openFilter.includes("collapseLegend"), "Opening Layers must auto-collapse the legend");
  assert(openFilter.includes("closePeriodMenu"), "Opening Layers must close Period");
  assert(openFilter.includes("closeJumpAndMore"), "Opening Layers must close Jump");
  assert(openFilter.includes("showBackdrop"), "Layers should open over a dimmed backdrop");
}
{
  const openPeriod = mobileJs.slice(mobileJs.indexOf("openPeriodMenu() {"), mobileJs.indexOf("closePeriodMenu() {"));
  assert(openPeriod.includes("collapseLegend"), "Opening Period must auto-collapse the legend");
  assert(openPeriod.includes("closeFilterMenu"), "Opening Period must close Layers");
  assert(openPeriod.includes("closeJumpAndMore"), "Opening Period must close Jump");
}
{
  const openJump = mobileJs.slice(mobileJs.indexOf("openCityPicker() {"), mobileJs.indexOf("refreshCatalog() {"));
  assert(openJump.includes("collapseLegend"), "Opening Jump must auto-collapse the legend");
  assert(openJump.includes("closeChromeMenus"), "Opening Jump must close Layers and Period");
}
{
  const sheet = mobileJs.slice(mobileJs.indexOf("setSheet(mode, opts = {}) {"), mobileJs.indexOf("onSidebarOpened() {"));
  assert(sheet.includes("collapseLegend"), "Opening a place sheet must auto-collapse the legend");
}
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
assert(mobileCss.includes("mobile-basemap-toggle"), "Mobile CSS should style the basemap toggle in the hamburger");
assert(mobileCss.includes("mobile-nav-submenu"), "Mobile CSS should nest atlas tools under Map / Satellite");
assert(/leaflet-control-zoom[\s\S]{0,80}display:\s*none/.test(mobileCss), "Phone CSS must hide Leaflet +/- zoom");
assert(/map-floating-actions[\s\S]{0,80}display:\s*none/.test(mobileCss), "Phone CSS must hide on-map atlas FABs");
assert(/map-legend-box:not\(\.legend-open\)[\s\S]{0,80}display:\s*none/.test(mobileCss), "Phone CSS must hide the ATLAS LEGEND+ chip");
assert(/crimson left edge/.test(mobileCss), "Period-title crimson accent should stay documented as decorative");

assert(uiJs.includes("getQuickJumpCatalog"), "uiController should expose the shared place catalog");
assert(uiJs.includes("jumpToQuickJumpValue"), "uiController should expose shared jump logic");
assert(uiJs.includes("onSidebarOpened"), "Sidebar open should notify the mobile shell");

assert(mainCss.includes("@media (max-width: 900px)"), "Desktop CSS must keep main's 900px rules");
assert(mobileCss.includes("era-selector-tabs"), "Mobile CSS should reuse era tabs as the period menu");
assert(mobileJs.includes("max-width: 768px"), "Mobile shell JS must use the 768px breakpoint");
assert(/--footer-height:\s*118px/.test(mobileCss), "Mobile footer should stay compact after the hamburger change");
assert(/--citybar-height:\s*0px/.test(mobileCss), "Phone hamburger must hide the Layers|Period|Jump command row");
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
  /padding:\s*10px 2px 10px/.test(mobileCss),
  "Slider track wrap may tighten empty pad under the scrubber only"
);
assert(
  /timeline-slider::-webkit-slider-thumb[\s\S]{0,80}width:\s*28px/.test(mobileCss),
  "Scrubber thumb must stay 28px (PR #4)"
);
assert(mobileCss.includes("NT Geography"), "Slim header may shorten the title on phone");
assert(/html\.layout-mobile \.mobile-city-bar[\s\S]{0,220}display:\s*none/.test(mobileCss), "Command row must not consume map space on phone");
assert(/html\.layout-mobile \.mobile-menu-btn[\s\S]{0,160}display:\s*inline-flex/.test(mobileCss), "Hamburger must show in the slim phone header");
assert(
  /sheet-open \.mobile-city-bar[\s\S]{0,120}display:\s*none/.test(mobileCss),
  "Command row must be display:none while the place sheet is open"
);
assert(/badge-season[\s\S]{0,220}clip:\s*rect\(0,\s*0,\s*0,\s*0\)/.test(mobileCss), "Season subtitle must be visually hidden on phone");
assert(mobileJs.includes('aria-hidden'), "Sheet-open should aria-hide the command row");
assert(mobileJs.includes("syncYearBadgeAria"), "Year badge should keep season in aria-label");

const chipTags = html.match(/<button class="filter-chip[^"]*"[^>]*data-filter="[^"]+"/g) || [];
assert(chipTags.length >= 8, `Expected at least 8 filter chips, found ${chipTags.length}`);
chipTags.forEach(chip => {
  const isGrowth = chip.includes('data-filter="heatmaps"');
  if (isGrowth) {
    assert(!chip.includes(" active"), `Growth Heatmap must start inactive: ${chip}`);
  } else {
    assert(chip.includes(" active"), `Core overlay chip must start active: ${chip}`);
  }
});
assert(html.includes('id="displayYear">100 AD<'), "Mobile first paint should show 100 AD");
assert(/id="mobilePeriodSubtitle">Apostolic Age</.test(html), "Mobile period menu subtitle should start on Apostolic Age");
assert(mobileCss.includes("legend-open"), "Phone legend should expand with a .legend-open sheet");
assert(mobileCss.includes("#3B2D20"), "Period list items need dark readable text on phone");
assert(mobileCss.includes(".era-tab.active"), "Period list must restyle the selected era on phone");

const mapJs = fs.readFileSync(path.join(root, "js/mapController.js"), "utf8");
assert(mapJs.includes("applyViewportDefaultFilters"), "MapController should apply calmer phone cold-start layers");
assert(mapJs.includes('phoneOn') || mapJs.includes('"churches"'), "Phone defaults should keep Christian Churches on");
assert(mapJs.includes("isPhoneViewport"), "Phone overlay defaults must be viewport-gated so desktop stays unchanged");

console.log("✓ Mobile shell markup, CSS, and JS hooks look complete.");

function makeClassList(initial) {
  const set = new Set(initial || []);
  return {
    add(...cls) { cls.forEach((c) => set.add(c)); },
    remove(...cls) { cls.forEach((c) => set.delete(c)); },
    contains(cls) { return set.has(cls); },
    toggle(cls, on) {
      if (on === undefined) {
        if (set.has(cls)) set.delete(cls);
        else set.add(cls);
      } else if (on) set.add(cls);
      else set.delete(cls);
      return set.has(cls);
    }
  };
}

const legendBody = { style: { display: "none" } };
const legendCollapseBtn = { textContent: "+" };
const legendEl = {
  classList: makeClassList(),
  style: { display: "block" },
  setAttribute() {},
  removeAttribute() {}
};
const headerListeners = [];
const header = {
  addEventListener(evt, fn) { if (evt === "click") headerListeners.push(fn); }
};
const htmlEl = { classList: makeClassList(["layout-mobile"]), style: { setProperty() {} } };
const bodyEl = { classList: makeClassList(["layout-mobile"]) };
const backdrop = { hidden: true, classList: makeClassList() };
const els = {
  legendToggleHeader: header,
  legendBody,
  legendCollapseBtn,
  mapLegend: legendEl,
  mobileBackdrop: backdrop
};

const prevWindow = global.window;
const prevDocument = global.document;
global.window = {
  matchMedia: () => ({ matches: true, addEventListener() {}, addListener() {} })
};
global.document = {
  documentElement: htmlEl,
  body: bodyEl,
  getElementById: (id) => els[id] || null,
  querySelector: () => null,
  querySelectorAll: () => []
};

const vm = require("vm");
vm.runInThisContext(mobileJs);
const shell = new MobileShell();
shell.legendEl = legendEl;
shell.legendBody = legendBody;
shell.legendCollapseBtn = legendCollapseBtn;
shell.backdrop = backdrop;
shell.bindLegendSheet();

assert.strictEqual(headerListeners.length, 1, "Legend header should bind one phone click handler");
assert.strictEqual(shell.isLegendOpen(), false, "Legend starts closed");
assert.strictEqual(legendBody.style.display, "none", "Collapsed first paint hides the legend body");

headerListeners[0]();
assert.strictEqual(shell.isLegendOpen(), true, "First tap on a collapsed chip must open the legend sheet");
assert.strictEqual(legendBody.style.display, "flex", "Open sheet shows the legend body");
assert(legendEl.classList.contains("legend-open"), "Open sheet adds .legend-open");
assert(backdrop.classList.contains("visible"), "Open sheet shows the dimmed backdrop");

headerListeners[0]();
assert.strictEqual(shell.isLegendOpen(), false, "Second tap must collapse the open legend sheet");
assert.strictEqual(legendBody.style.display, "none", "Collapsed sheet hides the legend body");
assert(!legendEl.classList.contains("legend-open"), "Collapsed sheet removes .legend-open");
assert(!backdrop.classList.contains("visible"), "Collapsed sheet dismisses the backdrop");

global.window = prevWindow;
global.document = prevDocument;
console.log("✓ Legend chip toggle opens when closed and collapses when open.");

// Writing the Period subtitle (a child of #eraTabs) must not re-enter the
// MutationObserver. childList/characterData on that host froze App.init.
{
  const observed = [];
  class FakeMutationObserver {
    constructor(cb) { this.cb = cb; }
    observe(target, options) { observed.push({ target, options }); }
    disconnect() {}
  }
  const periodHtml = { classList: makeClassList(["layout-mobile"]), style: { setProperty() {} } };
  const periodBody = { classList: makeClassList(["layout-mobile"]) };
  const periodLabel = { textContent: "Period" };
  const periodSubtitle = { textContent: "Apostolic Age" };
  const periodBtn = {
    addEventListener() {},
    setAttribute() {},
    getAttribute() { return ""; }
  };
  const eraTab = { textContent: "Apostolic Age (70–100)", classList: makeClassList(["active"]), addEventListener() {} };
  const eraHost = { __periodLabelObs: null };
  const prevMO = global.MutationObserver;
  const prevWin = global.window;
  const prevDoc = global.document;
  global.MutationObserver = FakeMutationObserver;
  global.window = { matchMedia: () => ({ matches: true, addEventListener() {}, addListener() {} }) };
  global.document = {
    documentElement: periodHtml,
    body: periodBody,
    getElementById: () => null,
    querySelector: (sel) => (sel === ".era-tab" ? eraTab : null),
    querySelectorAll: (sel) => (sel === ".era-tab.active" || sel === ".era-tab" ? [eraTab] : []),
    addEventListener() {}
  };
  const periodShell = new MobileShell();
  periodShell.periodBtn = periodBtn;
  periodShell.periodLabel = periodLabel;
  periodShell.periodSubtitle = periodSubtitle;
  periodShell.periodMenu = eraHost;
  periodShell.bindPeriodDropdown();

  assert.strictEqual(observed.length, 1, "Period dropdown should attach one MutationObserver");
  assert.strictEqual(observed[0].options.childList, undefined, "Observer must omit childList");
  assert.strictEqual(observed[0].options.characterData, undefined, "Observer must omit characterData");
  assert.deepStrictEqual(observed[0].options.attributeFilter, ["class"], "Observer should watch class only");

  let syncs = 0;
  const observerCb = eraHost.__periodLabelObs && eraHost.__periodLabelObs.cb;
  assert(typeof observerCb === "function", "Observer callback should be stored");
  const origText = Object.getOwnPropertyDescriptor(periodSubtitle, "textContent");
  Object.defineProperty(periodSubtitle, "textContent", {
    get() { return origText.get ? origText.get.call(this) : this._text; },
    set(v) {
      this._text = v;
      const opts = observed[0].options;
      if (opts.childList || opts.characterData) observerCb();
    },
    configurable: true
  });
  periodSubtitle._text = "Apostolic Age";
  const origSync = periodShell.syncPeriodLabel.bind(periodShell);
  periodShell.syncPeriodLabel = function (preferred) {
    syncs += 1;
    assert(syncs < 25, "syncPeriodLabel re-entered — period subtitle write must not notify the eraTabs observer");
    return origSync(preferred);
  };
  periodSubtitle._text = "Stale era";
  periodShell.syncPeriodLabel();
  observerCb();
  assert.strictEqual(periodSubtitle._text, "Apostolic Age", "Subtitle should sync to the active era");
  assert(syncs >= 2 && syncs < 25, `Expected a bounded sync (got ${syncs}), not an observer loop`);

  global.MutationObserver = prevMO;
  global.window = prevWin;
  global.document = prevDoc;
  console.log("✓ Period subtitle write does not re-enter the eraTabs MutationObserver.");
}
