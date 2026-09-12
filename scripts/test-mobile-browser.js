/**
 * Headless Playwright pass at phone and tablet widths.
 * Checks overflow, layer chips, city picker, place tabs, and timeline.
 */
const { chromium } = require("/tmp/pw/node_modules/playwright-core");
const fs = require("fs");
const path = require("path");

const OUT = "/tmp/ntg-mobile-shots";
fs.mkdirSync(OUT, { recursive: true });

function fail(msg) {
  console.error("FAIL:", msg);
  throw new Error(msg);
}

function assertTap(name, box, min = 44) {
  if (!box) fail(`${name} not found for tap-target check`);
  if (box.height + 0.5 < min) fail(`${name} tap height ${box.height}px < ${min}px`);
  if (box.width + 0.5 < min && name !== "filter-chip" && name !== "era-tab" && name !== "tab-btn" && name !== "speed-btn") {
    fail(`${name} tap width ${box.width}px < ${min}px`);
  }
}

async function measureOverflow(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    return {
      layout: document.body.className,
      innerWidth: window.innerWidth,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      overflowX: doc.scrollWidth - doc.clientWidth
    };
  });
}

(async () => {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome-stable",
    args: ["--no-sandbox", "--disable-dev-shm-usage"]
  });

  const phone = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const page = await phone.newPage();
  page.on("pageerror", err => console.warn("pageerror:", err.message));

  await page.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForFunction(() => window.app && window.app.map && window.app.ui, { timeout: 20000 });
  await page.waitForTimeout(1200);

  const phoneOverflow = await measureOverflow(page);
  console.log("Phone layout:", phoneOverflow);
  if (!phoneOverflow.layout.includes("layout-mobile")) fail("Expected layout-mobile at 390x844");
  if (phoneOverflow.overflowX > 2) fail(`Horizontal overflow on phone: ${phoneOverflow.overflowX}px`);

  const stack = await page.evaluate(() => {
    const badge = document.getElementById("floatingEraBadge");
    const fabs = document.querySelector(".map-floating-actions");
    const recenter = document.getElementById("recenterBtn");
    const jerusalem = document.getElementById("jerusalemQuickBtn");
    const zoom = document.querySelector(".leaflet-control-zoom");
    const toggle = document.getElementById("mobileBasemapToggle");
    const left = document.querySelector(".leaflet-top.leaflet-left");
    const badgeR = badge.getBoundingClientRect();
    const fabR = fabs.getBoundingClientRect();
    const zoomR = zoom.getBoundingClientRect();
    const toggleR = toggle.getBoundingClientRect();
    const stripeX = badgeR.left + 2;
    const stripeY = badgeR.top + badgeR.height / 2;
    const hit = (x, y) => document.elementsFromPoint(x, y);
    const underStripe = hit(stripeX, stripeY).map(el => ({
      id: el.id || "",
      tag: el.tagName,
      cls: typeof el.className === "string" ? el.className : (el.className.baseVal || el.tagName)
    }));
    const underBadge = hit(badgeR.left + badgeR.width / 2, badgeR.top + badgeR.height / 2)
      .filter(el => el !== badge && !badge.contains(el))
      .map(el => el.id || (typeof el.className === "string" ? el.className : el.tagName));
    const interactiveUnder = hit(stripeX, stripeY)
      .concat(hit(badgeR.left + badgeR.width / 2, stripeY))
      .filter((el, i, arr) => arr.indexOf(el) === i)
      .filter(el => el.closest("button, a, .floating-btn, .leaflet-control-zoom, .mobile-basemap-toggle"))
      .filter(el => !badge.contains(el) && el !== badge)
      .map(el => el.id || el.className);
    const topleftControls = left ? left.querySelectorAll(".leaflet-control").length : 0;
    const borderLeft = getComputedStyle(badge).borderLeft;
    const borderColor = getComputedStyle(badge).borderLeftColor;
    return {
      title: (document.getElementById("eraTitle") || {}).textContent || "",
      badge: { left: badgeR.left, top: badgeR.top, right: badgeR.right, bottom: badgeR.bottom, width: badgeR.width, height: badgeR.height },
      fabs: { left: fabR.left, top: fabR.top, right: fabR.right, bottom: fabR.bottom, width: fabR.width, height: fabR.height },
      recenter: recenter.getBoundingClientRect(),
      jerusalem: jerusalem.getBoundingClientRect(),
      zoom: { left: zoomR.left, top: zoomR.top, bottom: zoomR.bottom },
      toggle: { top: toggleR.top, bottom: toggleR.bottom, right: toggleR.right, height: toggleR.height },
      gapBadgeFabs: fabR.top - badgeR.bottom,
      gapToggleZoom: zoomR.top - toggleR.bottom,
      gapBadgeToggle: toggleR.left - badgeR.right,
      overlapBadgeFabs: badgeR.left < fabR.right && badgeR.right > fabR.left && badgeR.top < fabR.bottom && badgeR.bottom > fabR.top,
      overlapBadgeZoom: badgeR.left < zoomR.right && badgeR.right > zoomR.left && badgeR.top < zoomR.bottom && badgeR.bottom > zoomR.top,
      overlapBadgeToggle: badgeR.left < toggleR.right && badgeR.right > toggleR.left && badgeR.top < toggleR.bottom && badgeR.bottom > toggleR.top,
      underStripe,
      underBadge,
      interactiveUnder,
      topleftControls,
      borderLeft,
      borderColor,
      fabTopVar: getComputedStyle(document.documentElement).getPropertyValue("--left-fab-top").trim(),
      zoomTopVar: getComputedStyle(document.documentElement).getPropertyValue("--zoom-stack-top").trim()
    };
  });
  console.log("Period-title stack:", JSON.stringify({
    title: stack.title,
    gapBadgeFabs: stack.gapBadgeFabs,
    gapToggleZoom: stack.gapToggleZoom,
    gapBadgeToggle: stack.gapBadgeToggle,
    borderLeft: stack.borderLeft,
    borderColor: stack.borderColor,
    interactiveUnder: stack.interactiveUnder,
    topleftControls: stack.topleftControls
  }, null, 2));
  if (!/nativity/i.test(stack.title)) fail(`Expected Nativity period title, got "${stack.title}"`);
  if (stack.overlapBadgeFabs) fail("Period title overlaps the left FAB stack");
  if (stack.overlapBadgeZoom) fail("Period title overlaps the zoom control");
  if (stack.overlapBadgeToggle) fail("Period title overlaps the Map|Satellite chip");
  if (stack.gapBadgeFabs < 6) fail(`Left FABs must clear the period title, gap=${stack.gapBadgeFabs}`);
  if (stack.gapToggleZoom < 8) fail(`Zoom stack must clear Map|Satellite chip, gap=${stack.gapToggleZoom}`);
  if (stack.gapBadgeToggle < 8) fail(`Period title must clear Map|Satellite chip, gap=${stack.gapBadgeToggle}`);
  if (stack.topleftControls > 0) fail(`Leaflet top-left still has ${stack.topleftControls} control(s) under the period title`);
  if (stack.interactiveUnder.length) fail(`Interactive control under the period-title stripe: ${JSON.stringify(stack.interactiveUnder)}`);
  if (stack.recenter.height + 0.5 < 44) fail(`Reset FAB tap height ${stack.recenter.height}px < 44px`);
  if (stack.jerusalem.height + 0.5 < 44) fail(`Jerusalem FAB tap height ${stack.jerusalem.height}px < 44px`);
  if (!/rgb\(163,\s*40,\s*34\)|#A32822/i.test(stack.borderColor) && !/5px/.test(stack.borderLeft)) {
    fail(`Expected decorative crimson period-title accent, got border=${stack.borderLeft} color=${stack.borderColor}`);
  }
  await page.screenshot({ path: path.join(OUT, "phone_nativity_stack.png"), fullPage: false });

  const basemap = page.locator("#mobileBasemapToggle");
  if (!(await basemap.isVisible())) fail("Map/Satellite toggle must be visible on phone");
  await page.locator('#mobileBasemapToggle [data-style="satellite"]').click();
  await page.waitForTimeout(400);
  const satOn = await page.evaluate(() => {
    const theme = window.app.map.currentTheme;
    const pressed = document.querySelector('#mobileBasemapToggle [data-style="satellite"]').getAttribute("aria-pressed");
    return { theme, pressed };
  });
  if (satOn.theme !== "satellite") fail(`Satellite toggle did not switch basemap, theme=${satOn.theme}`);
  if (satOn.pressed !== "true") fail("Satellite toggle did not show pressed state");
  await page.locator('#mobileBasemapToggle [data-style="parchment"]').click();
  await page.waitForTimeout(300);
  await page.locator("#mobileBasemapMoreBtn").click();
  await page.waitForSelector("#mobileMoreSheet.open", { timeout: 5000 });
  const styleItems = await page.locator("#mobileMapStyleList .mobile-more-item").allTextContents();
  if (!styleItems.some(t => /satellite/i.test(t))) fail("More styles sheet missing satellite");
  if (!styleItems.some(t => /parchment|relief|ancient/i.test(t))) fail("More styles sheet missing parchment/relief");
  if (styleItems.length < 3) fail(`Expected desktop basemap list in More, found ${styleItems.length}`);
  await page.locator("#mobileMoreClose").click();
  await page.screenshot({ path: path.join(OUT, "phone_basemap.png"), fullPage: false });

  await page.locator("#timelineSlider").evaluate(el => {
    el.value = "100";
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await page.waitForTimeout(200);
  const thumbFit = await page.evaluate(() => {
    const slider = document.getElementById("timelineSlider");
    const footer = document.querySelector(".app-timeline-footer");
    const r = slider.getBoundingClientRect();
    const fr = footer.getBoundingClientRect();
    return {
      sliderBottom: r.bottom,
      footerBottom: fr.bottom,
      viewH: window.innerHeight,
      footerPad: getComputedStyle(footer).paddingBottom
    };
  });
  if (thumbFit.sliderBottom > thumbFit.viewH - 16) {
    fail(`Timeline track is clipped at the viewport: bottom=${thumbFit.sliderBottom} view=${thumbFit.viewH}`);
  }
  if (thumbFit.footerBottom > thumbFit.viewH + 1) {
    fail(`Timeline footer extends past the viewport: ${thumbFit.footerBottom} > ${thumbFit.viewH}`);
  }

  const cityBar = page.locator("#mobileCityPickerBtn");
  const filterBtn = page.locator("#mobileFilterBtn");
  if (!(await cityBar.isVisible())) fail("City picker bar not visible on phone");
  if (!(await filterBtn.isVisible())) fail("Filter dropdown trigger not visible on phone");

  const commandRow = await page.evaluate(() => {
    const filter = document.getElementById("mobileFilterBtn").getBoundingClientRect();
    const city = document.getElementById("mobileCityPickerBtn").getBoundingClientRect();
    const bar = document.getElementById("mobileCityBar").getBoundingClientRect();
    const chipRows = document.querySelector(".filter-chip-rows");
    const chipOpen = getComputedStyle(chipRows).display !== "none";
    return {
      filter: { top: filter.top, bottom: filter.bottom, left: filter.left, right: filter.right, height: filter.height, width: filter.width },
      city: { top: city.top, bottom: city.bottom, left: city.left, right: city.right, height: city.height, width: city.width },
      barHeight: bar.height,
      sameRow: Math.abs(filter.top - city.top) < 8,
      sideBySide: filter.right <= city.left + 1,
      chipMenuOpen: chipOpen
    };
  });
  console.log("Command row:", commandRow);
  if (!commandRow.sameRow) fail("Filter dropdown and city jump must share one row");
  if (!commandRow.sideBySide) fail("City jump must sit beside the filter dropdown, not underneath");
  if (commandRow.barHeight > 56) fail(`Command row should be one compact strip, height=${commandRow.barHeight}`);
  if (commandRow.chipMenuOpen) fail("Filter list should stay closed until the dropdown is opened");
  assertTap("mobile-filter-trigger", commandRow.filter);
  assertTap("mobile-city-picker-btn", commandRow.city);

  const mapChrome = await page.evaluate(() => {
    const main = document.querySelector(".app-main-container").getBoundingClientRect();
    const footer = document.querySelector(".app-timeline-footer").getBoundingClientRect();
    const header = document.querySelector(".app-header").getBoundingClientRect();
    const bar = document.getElementById("mobileCityBar").getBoundingClientRect();
    return {
      viewH: window.innerHeight,
      viewW: window.innerWidth,
      mapH: main.height,
      headerH: header.height,
      commandH: bar.height,
      footerH: footer.height,
      chromeH: header.height + bar.height + footer.height,
      footerTokens: getComputedStyle(document.documentElement).getPropertyValue("--footer-height").trim()
    };
  });
  console.log("Phone map chrome:", mapChrome);
  // main stacked two 52px bars + 176px footer = 328px chrome with 48px header.
  // Compact row + 136px footer should free >= 80px of map.
  const mainChrome = 48 + 52 + 52 + 176;
  const gain = mainChrome - mapChrome.chromeH;
  console.log(`Map viewport ${mapChrome.mapH}px; chrome ${mapChrome.chromeH}px; gain vs main chrome ≈ ${gain}px`);
  if (mapChrome.mapH < mapChrome.viewH - 260) {
    fail(`Map viewport too short: ${mapChrome.mapH}px in ${mapChrome.viewH}px view (chrome=${mapChrome.chromeH})`);
  }
  if (gain < 80) fail(`Expected ≥80px chrome savings vs main, got ${gain}px`);
  if (mapChrome.footerH > 160) fail(`Timeline footer still too tall: ${mapChrome.footerH}px`);

  await page.locator("#mobileFilterBtn").click();
  await page.waitForFunction(() => document.documentElement.classList.contains("filter-menu-open"), { timeout: 3000 });
  const rows = await page.locator(".filter-chip-row").count();
  if (rows !== 2) fail(`Expected 2 chip rows, found ${rows}`);
  const chips = await page.locator(".filter-chip").count();
  if (chips < 8) fail(`Expected 8+ chips, found ${chips}`);

  await page.locator('.filter-chip[data-filter="savior"]').click();
  await page.locator('.filter-chip[data-filter="journeys"]').click();
  await page.locator('.filter-chip[data-filter="heatmaps"]').click();
  await page.waitForTimeout(300);
  const active = await page.locator(".filter-chip.active").count();
  if (active < 3) fail("Layer chips did not activate");
  const filterLabel = (await page.locator("#mobileFilterLabel").innerText()).trim();
  if (!/Savior|Journey|Heatmap|\+\d/i.test(filterLabel)) {
    fail(`Filter trigger should show current selection, got "${filterLabel}"`);
  }
  await page.screenshot({ path: path.join(OUT, "phone_filter_dropdown.png"), fullPage: false });
  await page.locator("#mobileFilterBtn").click();
  await page.waitForTimeout(150);

  const closedSheet = await page.evaluate(() => {
    const el = document.getElementById("detailSidebar");
    const r = el.getBoundingClientRect();
    return { top: r.top, height: r.height, viewH: window.innerHeight };
  });
  if (closedSheet.top < closedSheet.viewH - 4) {
    fail(`Closed details sheet still visible at top=${closedSheet.top} in ${closedSheet.viewH}px viewport`);
  }
  await page.screenshot({ path: path.join(OUT, "phone_layers.png"), fullPage: false });

  await page.evaluate(() => window.app.ui.openSidebar());
  await page.waitForTimeout(400);
  const welcomeOverlap = await page.evaluate(() => {
    const el = document.getElementById("detailSidebar");
    const footer = document.querySelector(".app-timeline-footer");
    const quote = document.querySelector(".quote-text");
    const sheetRect = el.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const quoteRect = quote ? quote.getBoundingClientRect() : null;
    return {
      sheetZ: parseInt(getComputedStyle(el).zIndex, 10) || 0,
      footerZ: parseInt(getComputedStyle(footer).zIndex, 10) || 0,
      sheetBottom: sheetRect.bottom,
      footerTop: footerRect.top,
      quoteText: quote ? quote.textContent.trim() : "",
      quoteBottom: quoteRect ? quoteRect.bottom : null,
      quoteCovered: quoteRect ? quoteRect.bottom > footerRect.top + 2 : true
    };
  });
  if (!(welcomeOverlap.sheetZ > welcomeOverlap.footerZ)) {
    fail(`Welcome sheet z-index ${welcomeOverlap.sheetZ} must beat timeline ${welcomeOverlap.footerZ}`);
  }
  if (welcomeOverlap.sheetBottom > welcomeOverlap.footerTop + 2) {
    fail("Welcome details sheet still overlaps the timeline bar");
  }
  if (!/God so loved/i.test(welcomeOverlap.quoteText)) fail("John 3:16 welcome quote missing");
  if (welcomeOverlap.quoteCovered) fail("John 3:16 is still covered by the timeline");

  await page.locator("#mobileFilterBtn").click();
  await page.waitForFunction(() => document.documentElement.classList.contains("filter-menu-open"), { timeout: 3000 });
  const taps = await page.evaluate(() => {
    const box = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { width: r.width, height: r.height };
    };
    const label = document.querySelector(".city-label-text.city-label-primary");
    return {
      chip: box(".filter-chip"),
      tab: box(".tab-btn"),
      era: box(".era-tab"),
      fab: box(".map-floating-actions .floating-btn"),
      speed: box(".speed-btn"),
      handle: box(".sheet-handle"),
      filter: box("#mobileFilterBtn"),
      city: box("#mobileCityPickerBtn"),
      labelSize: label ? parseFloat(getComputedStyle(label).fontSize) : null
    };
  });
  assertTap("filter-chip", taps.chip);
  assertTap("mobile-filter-trigger", taps.filter);
  assertTap("mobile-city-picker-btn", taps.city);
  assertTap("tab-btn", taps.tab);
  assertTap("era-tab", taps.era);
  assertTap("floating-btn", taps.fab);
  assertTap("speed-btn", taps.speed);
  assertTap("sheet-handle", taps.handle);
  await page.screenshot({ path: path.join(OUT, "phone_welcome_sheet.png"), fullPage: false });
  await page.locator("#mobileFilterBtn").click();
  await page.waitForTimeout(150);
  await page.locator("#closeSidebarBtn").click();
  await page.waitForTimeout(250);
  const cityTap = await page.locator("#mobileCityPickerBtn").boundingBox();
  assertTap("mobile-city-picker-btn", cityTap);

  await cityBar.click();
  await page.waitForSelector("#mobileCityPickerSheet.open", { timeout: 5000 });
  await page.fill("#mobileCitySearch", "Corinth");
  await page.waitForTimeout(200);
  const corinth = page.locator('#mobileCityList [data-jump-value="city:corinth"]');
  if (!(await corinth.count())) fail("Corinth not found in searchable city list");
  await page.screenshot({ path: path.join(OUT, "phone_city_picker.png"), fullPage: false });
  await corinth.click();
  await page.waitForTimeout(800);

  const sheetOpen = await page.evaluate(() => {
    const el = document.getElementById("detailSidebar");
    const footer = document.querySelector(".app-timeline-footer");
    const quote = document.querySelector(".quote-text");
    const sheetRect = el.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const quoteRect = quote ? quote.getBoundingClientRect() : null;
    const sheetZ = parseInt(getComputedStyle(el).zIndex, 10) || 0;
    const footerZ = parseInt(getComputedStyle(footer).zIndex, 10) || 0;
    return {
      open: el && !el.classList.contains("closed") && el.classList.contains("sheet-half"),
      sheetZ,
      footerZ,
      sheetBottom: sheetRect.bottom,
      footerTop: footerRect.top,
      quoteBottom: quoteRect ? quoteRect.bottom : null,
      quoteVisible: quoteRect ? quoteRect.bottom <= footerRect.top + 1 && quoteRect.height > 8 : false
    };
  });
  if (!sheetOpen.open) fail("Place sheet did not open to half after city jump");
  if (!(sheetOpen.sheetZ > sheetOpen.footerZ)) fail(`Sheet z-index ${sheetOpen.sheetZ} must beat timeline ${sheetOpen.footerZ}`);
  if (sheetOpen.sheetBottom > sheetOpen.footerTop + 2) fail("Details sheet still overlaps the timeline bar");
  if (sheetOpen.quoteBottom != null && sheetOpen.quoteBottom > sheetOpen.footerTop + 2) {
    fail("Overview quote is still covered by the timeline");
  }

  const title = await page.locator("#sidebarTitle").innerText();
  if (!/corinth/i.test(title)) fail(`Expected Corinth in sheet title, got: ${title}`);

  const tabs = await page.locator(".sidebar-tabs .tab-btn").count();
  if (tabs !== 7) fail(`Expected 7 place tabs, found ${tabs}`);
  await page.locator('.tab-btn[data-tab="scripture"]').click();
  await page.waitForTimeout(250);
  await page.locator('.tab-btn[data-tab="people"]').click();
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(OUT, "phone_place_sheet.png"), fullPage: false });

  await page.locator("#timelineSlider").evaluate(el => {
    el.value = "50";
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  const year = await page.locator("#displayYear").innerText();
  console.log("Timeline year after scrub:", year);
  if (!/50/.test(year) && !/AD/.test(year)) fail(`Unexpected year after scrub: ${year}`);

  await page.locator("#playPauseBtn").click();
  await page.waitForTimeout(400);
  await page.locator("#playPauseBtn").click();

  await page.locator("#mobileSearchBtn").click();
  await page.waitForTimeout(200);
  const searchOpen = await page.evaluate(() => document.body.classList.contains("search-open"));
  if (!searchOpen) fail("Search overlay did not open");
  await page.screenshot({ path: path.join(OUT, "phone_search.png"), fullPage: false });
  await page.locator("#mobileMoreBtn").click();
  await page.waitForSelector("#mobileMoreSheet.open", { timeout: 5000 });
  await page.screenshot({ path: path.join(OUT, "phone_more_tools.png"), fullPage: false });
  await page.locator("#mobileMoreClose").click();

  const chrome = await page.evaluate(() => {
    const bar = document.getElementById("mobileCityBar");
    const tabs = document.querySelector(".sidebar-tabs");
    const eras = document.querySelector(".era-selector-tabs");
    const fabs = document.querySelector(".map-floating-actions");
    const barRect = bar.getBoundingClientRect();
    const tabRect = tabs.getBoundingClientRect();
    return {
      commandHeight: barRect.height,
      tabHeight: tabRect.height,
      tabScroll: tabs.scrollWidth > tabs.clientWidth - 4,
      eraOverflow: getComputedStyle(eras).overflowX,
      fabLeft: fabs.getBoundingClientRect().left,
      labelsHiddenAtDefault: !document.documentElement.classList.contains("mobile-zoomed")
    };
  });
  if (chrome.commandHeight > 56) fail(`Command row should be a single strip, height=${chrome.commandHeight}`);
  if (chrome.tabHeight > 68) fail(`Place tabs should be a single row, height=${chrome.tabHeight}`);
  if (chrome.eraOverflow !== "auto" && chrome.eraOverflow !== "scroll") fail(`Era pills overflow-x=${chrome.eraOverflow}`);
  if (chrome.fabLeft > 80) fail(`Map FABs should sit on the left, left=${chrome.fabLeft}`);

  await page.locator("#mobileToursBtn").click();
  await page.waitForSelector("#tourModal", { state: "visible", timeout: 5000 });
  const tourOverlap = await page.evaluate(() => {
    const cards = [...document.querySelectorAll(".tour-select-card")];
    if (cards.length < 2) return { count: cards.length, overlap: false };
    const rects = cards.map(c => c.getBoundingClientRect());
    let overlap = false;
    for (let i = 0; i < rects.length; i++) {
      for (let j = i + 1; j < rects.length; j++) {
        const a = rects[i], b = rects[j];
        const hits = a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
        if (hits) overlap = true;
      }
    }
    return { count: cards.length, overlap, titles: cards.map(c => c.querySelector(".tour-card-title")?.textContent || "") };
  });
  if (tourOverlap.count < 4) fail(`Expected 4+ tour cards, found ${tourOverlap.count}`);
  if (tourOverlap.overlap) fail("Tour picker cards overlap");
  await page.locator("#tourModalBody").evaluate(el => { el.scrollTop = el.scrollHeight; });
  await page.waitForTimeout(200);
  const lastCard = await page.evaluate(() => {
    const cards = [...document.querySelectorAll(".tour-select-card")];
    const last = cards[cards.length - 1];
    const r = last.getBoundingClientRect();
    const title = last.querySelector(".tour-card-title")?.textContent || "";
    return { title, top: r.top, bottom: r.bottom, height: r.height };
  });
  if (!/Seven Churches/i.test(lastCard.title)) fail(`Last tour card should be Seven Churches, got ${lastCard.title}`);
  if (lastCard.height < 70) fail("Last tour card is collapsed/clipped");
  await page.screenshot({ path: path.join(OUT, "phone_tours.png"), fullPage: false });
  await page.locator("#closeTourModalBtn").click();

  await page.locator("#closeSidebarBtn").click();
  await page.waitForTimeout(250);
  await page.evaluate(() => window.app.map.focusRegion("holy-land"));
  await page.waitForTimeout(1800);
  const holy = await page.evaluate(() => {
    const zoom = document.querySelector(".leaflet-control-zoom");
    const fabs = document.querySelector(".map-floating-actions");
    const labels = [...document.querySelectorAll(".city-label-text")].filter(el => {
      const s = getComputedStyle(el);
      return s.display !== "none" && s.visibility !== "hidden" && el.offsetParent !== null;
    }).map(el => el.textContent.trim());
    const primary = document.querySelector(".city-label-text.city-label-primary");
    const zoomR = zoom.getBoundingClientRect();
    const fabR = fabs.getBoundingClientRect();
    const toggle = document.getElementById("mobileBasemapToggle").getBoundingClientRect();
    const overlap = zoomR.left < fabR.right && zoomR.right > fabR.left && zoomR.top < fabR.bottom && zoomR.bottom > fabR.top;
    return {
      zoomLeft: zoomR.left,
      fabRight: fabR.right,
      toggleVisible: toggle.width > 0,
      overlap,
      labels,
      zoomClass: document.documentElement.classList.contains("mobile-zoomed"),
      primaryLabelPx: primary ? parseFloat(getComputedStyle(primary).fontSize) : null
    };
  });
  if (holy.zoomLeft < 200) fail(`Zoom control should sit on the right, left=${holy.zoomLeft}`);
  if (holy.overlap) fail("Zoom control overlaps the left FAB stack");
  if (!holy.toggleVisible) fail("Basemap toggle missing on Holy Land view");
  if (holy.labels.some(n => /smyrna/i.test(n))) fail("Smyrna label should stay hidden at Holy Land zoom");
  if (holy.primaryLabelPx != null && holy.primaryLabelPx < 11) {
    fail(`Primary zoomed city labels are ${holy.primaryLabelPx}px; need ≥11px`);
  }
  await page.screenshot({ path: path.join(OUT, "phone_holy_land.png"), fullPage: false });

  // Narrow phone + large text: command row and footer must still fit
  const narrow = await browser.newContext({
    viewport: { width: 360, height: 640 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const npage = await narrow.newPage();
  await npage.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await npage.waitForFunction(() => window.app && window.app.map, { timeout: 20000 });
  await npage.addStyleTag({ content: "html { font-size: 20px; }" });
  await npage.waitForTimeout(400);
  const narrowState = await npage.evaluate(() => {
    const filter = document.getElementById("mobileFilterBtn").getBoundingClientRect();
    const city = document.getElementById("mobileCityPickerBtn").getBoundingClientRect();
    const bar = document.getElementById("mobileCityBar").getBoundingClientRect();
    const footer = document.querySelector(".app-timeline-footer").getBoundingClientRect();
    const slider = document.getElementById("timelineSlider").getBoundingClientRect();
    const play = document.getElementById("playPauseBtn").getBoundingClientRect();
    const era = document.querySelector(".era-tab").getBoundingClientRect();
    const main = document.querySelector(".app-main-container").getBoundingClientRect();
    return {
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      sameRow: Math.abs(filter.top - city.top) < 10,
      sideBySide: filter.right <= city.left + 2,
      barHeight: bar.height,
      filterH: filter.height,
      cityH: city.height,
      playH: play.height,
      eraH: era.height,
      footerH: footer.height,
      sliderBottom: slider.bottom,
      footerBottom: footer.bottom,
      viewH: window.innerHeight,
      mapH: main.height
    };
  });
  console.log("360 large-text chrome:", narrowState);
  if (narrowState.overflowX > 2) fail(`Horizontal overflow at 360px large text: ${narrowState.overflowX}px`);
  if (!narrowState.sameRow || !narrowState.sideBySide) fail("360px large text must keep filter + jump on one row");
  if (narrowState.filterH + 0.5 < 44) fail(`360 filter tap ${narrowState.filterH}px < 44`);
  if (narrowState.cityH + 0.5 < 44) fail(`360 city tap ${narrowState.cityH}px < 44`);
  if (narrowState.playH + 0.5 < 44) fail(`360 play tap ${narrowState.playH}px < 44`);
  if (narrowState.eraH + 0.5 < 44) fail(`360 era tap ${narrowState.eraH}px < 44`);
  if (narrowState.sliderBottom > narrowState.viewH - 12) {
    fail(`360px scrubber clipped: bottom=${narrowState.sliderBottom} view=${narrowState.viewH}`);
  }
  if (narrowState.mapH < 300) fail(`360px map viewport too short: ${narrowState.mapH}px`);
  await npage.screenshot({ path: path.join(OUT, "phone_360_large_text.png"), fullPage: false });
  await narrow.close();

  // Tablet width
  const tablet = await browser.newContext({
    viewport: { width: 768, height: 1024 },
    deviceScaleFactor: 2,
    hasTouch: true
  });
  const tpage = await tablet.newPage();
  await tpage.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await tpage.waitForFunction(() => window.app && window.app.map, { timeout: 20000 });
  await tpage.waitForTimeout(1000);
  const tabletOverflow = await measureOverflow(tpage);
  console.log("Tablet layout:", tabletOverflow);
  if (tabletOverflow.overflowX > 2) fail(`Horizontal overflow on tablet: ${tabletOverflow.overflowX}px`);
  // 768px is the mobile breakpoint inclusive; layout-mobile is expected.
  await tpage.screenshot({ path: path.join(OUT, "tablet_home.png"), fullPage: false });
  await tablet.close();

  // Desktop regression
  const desk = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dpage = await desk.newPage();
  await dpage.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await dpage.waitForFunction(() => window.app && window.app.map, { timeout: 20000 });
  await dpage.waitForTimeout(1000);
  const deskState = await dpage.evaluate(() => ({
    layout: document.body.className,
    cityBar: getComputedStyle(document.getElementById("mobileCityBar")).display,
    filterBtn: getComputedStyle(document.getElementById("mobileFilterBtn")).display,
    basemap: getComputedStyle(document.getElementById("mobileBasemapToggle")).display,
    sidebar: getComputedStyle(document.getElementById("detailSidebar")).width,
    headerRight: getComputedStyle(document.querySelector(".header-right")).display
  }));
  console.log("Desktop layout:", deskState);
  if (deskState.layout.includes("layout-mobile")) fail("Desktop should not use layout-mobile");
  if (deskState.cityBar !== "none") fail("Mobile city bar should be hidden on desktop");
  if (deskState.filterBtn !== "none") fail("Mobile filter dropdown should be hidden on desktop");
  if (deskState.basemap !== "none") fail("Mobile basemap toggle should be hidden on desktop");
  await dpage.screenshot({ path: path.join(OUT, "desktop_home.png"), fullPage: false });
  await desk.close();

  await browser.close();
  console.log("✓ Browser verification passed. Shots in", OUT);
})().catch(err => {
  console.error(err);
  process.exit(1);
});
