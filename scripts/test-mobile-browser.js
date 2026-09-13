/**
 * Headless Playwright pass at phone and tablet widths.
 * Checks overflow, layer chips, city picker, place tabs, and timeline.
 */
const { chromium } = require("/tmp/pw/node_modules/playwright-core");
const fs = require("fs");
const path = require("path");

const OUT = "/tmp/ntg-mobile-shots";
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

async function measureViewportFill(page) {
  return page.evaluate(() => {
    const header = document.querySelector(".app-header").getBoundingClientRect();
    const bar = document.getElementById("mobileCityBar").getBoundingClientRect();
    const burger = document.getElementById("mobileMenuBtn").getBoundingClientRect();
    const main = document.querySelector(".app-main-container").getBoundingClientRect();
    const footer = document.querySelector(".app-timeline-footer").getBoundingClientRect();
    const slider = document.getElementById("timelineSlider").getBoundingClientRect();
    const vvH = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    return {
      headerTop: header.top,
      headerBottom: header.bottom,
      barTop: bar.top,
      barBottom: bar.bottom,
      barH: bar.height,
      burgerH: burger.height,
      burgerW: burger.width,
      mapTop: main.top,
      mapBottom: main.bottom,
      mapH: main.height,
      footerTop: footer.top,
      footerBottom: footer.bottom,
      sliderBottom: slider.bottom,
      viewH: window.innerHeight,
      vvH,
      appVh: getComputedStyle(document.documentElement).getPropertyValue("--app-vh").trim(),
      unusedBelow: window.innerHeight - footer.bottom
    };
  });
}

async function openFromHamburger(page, navId) {
  if (!(await page.locator("#mobileNavSheet.open").count())) {
    await page.locator("#mobileMenuBtn").click();
    await page.waitForSelector("#mobileNavSheet.open", { timeout: 3000 });
  }
  await page.locator(navId).click();
}

function assertViewportFill(label, fill) {
  if (fill.headerTop > 1) fail(`${label}: unused band above header (top=${fill.headerTop})`);
  if (fill.barH > 2) {
    fail(`${label}: command row must stay hidden so the map is first (barH=${fill.barH})`);
  }
  if (fill.burgerH + 0.5 < 44 || fill.burgerW + 0.5 < 44) {
    fail(`${label}: hamburger tap ${fill.burgerW}x${fill.burgerH} < 44`);
  }
  if (Math.abs(fill.mapTop - fill.headerBottom) > 2) {
    fail(`${label}: gap between header and map (${fill.headerBottom} → ${fill.mapTop})`);
  }
  if (Math.abs(fill.footerTop - fill.mapBottom) > 2) {
    fail(`${label}: gap between map and footer (${fill.mapBottom} → ${fill.footerTop})`);
  }
  if (fill.unusedBelow > 2) {
    fail(`${label}: unused space below footer: ${fill.unusedBelow}px (footerBottom=${fill.footerBottom} view=${fill.viewH})`);
  }
  if (fill.footerBottom > fill.viewH + 1) {
    fail(`${label}: footer extends past the viewport: ${fill.footerBottom} > ${fill.viewH}`);
  }
  if (fill.sliderBottom > fill.viewH - 12) {
    fail(`${label}: scrubber clipped: bottom=${fill.sliderBottom} view=${fill.viewH}`);
  }
  const appVhPx = parseFloat(fill.appVh);
  if (!(appVhPx > 0)) fail(`${label}: --app-vh should be set, got "${fill.appVh}"`);
  if (Math.abs(appVhPx - fill.vvH) > 2) {
    fail(`${label}: --app-vh ${appVhPx}px should match visual viewport ${fill.vvH}px`);
  }
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

  await page.goto("http://127.0.0.1:8080/", { waitUntil: "commit", timeout: 60000 });
  await page.waitForFunction(() => window.app && window.app.map && window.app.ui, { timeout: 20000 });
  await sleep(1200);

  const coldStart = await page.evaluate(() => {
    const chips = [...document.querySelectorAll(".filter-chip")].map((chip) => ({
      key: chip.dataset.filter,
      active: chip.classList.contains("active"),
      label: (chip.textContent || "").replace(/\s+/g, " ").trim()
    }));
    return {
      year: ((document.getElementById("displayYear") || {}).textContent || "").trim(),
      slider: document.getElementById("timelineSlider") ? document.getElementById("timelineSlider").value : "",
      period: ((document.getElementById("mobilePeriodLabel") || {}).textContent || "").trim(),
      filterLabel: ((document.getElementById("mobileFilterLabel") || {}).textContent || "").trim(),
      jumpLabel: ((document.querySelector(".mobile-city-picker-label") || {}).textContent || "").trim(),
      filterSubtitle: ((document.getElementById("mobileFilterSubtitle") || {}).textContent || "").trim(),
      periodSubtitle: ((document.getElementById("mobilePeriodSubtitle") || {}).textContent || "").trim(),
      chips,
      heatmaps: window.app.map.filterState.heatmaps,
      savior: window.app.map.filterState.savior,
      diaspora: window.app.map.filterState.diaspora,
      churches: window.app.map.filterState.churches,
      journeys: window.app.map.filterState.journeys,
      provinces: window.app.map.filterState.provinces,
      jerusalemSites: window.app.map.filterState.jerusalemSites,
      jerusalemGeography: window.app.map.filterState.jerusalemGeography,
      all: window.app.map.filterState.all,
      timelineYear: window.app.timeline.currentYear,
      legendOpen: document.documentElement.classList.contains("legend-sheet-open"),
      legendBodyDisplay: document.getElementById("legendBody") ? document.getElementById("legendBody").style.display : "",
      legendTitle: ((document.querySelector(".legend-title") || {}).textContent || "").trim()
    };
  });
  console.log("Cold start:", coldStart);
  if (coldStart.year !== "100 AD" || Number(coldStart.slider) !== 100 || coldStart.timelineYear !== 100) {
    fail(`Cold start year should be 100 AD, got year="${coldStart.year}" slider=${coldStart.slider} js=${coldStart.timelineYear}`);
  }
  if (coldStart.heatmaps) fail("Growth Heatmap must start OFF");
  if (coldStart.all) fail("All Visible must start OFF on phone");
  if (!coldStart.churches) fail("Christian Churches must start ON on phone");
  if (!coldStart.journeys) fail("Paul's Journeys must start ON on phone");
  ["savior", "diaspora", "provinces", "jerusalemSites", "jerusalemGeography"].forEach((key) => {
    if (coldStart[key]) fail(`${key} overlay must start OFF on phone`);
  });
  const growthChip = coldStart.chips.find((chip) => chip.key === "heatmaps");
  if (!growthChip || growthChip.active) fail("Growth Heatmap chip must start inactive");
  const allChip = coldStart.chips.find((chip) => chip.key === "all");
  if (!allChip || allChip.active) fail("All Visible chip must start inactive on phone");
  const phoneOn = coldStart.chips.filter((chip) => chip.active).map((c) => c.key).sort();
  if (phoneOn.join(",") !== "churches,journeys") {
    fail(`Phone cold-start chips should be churches+journeys, got ${phoneOn.join(",")}`);
  }
  if (coldStart.filterLabel !== "Layers") {
    fail(`Mobile layer trigger should read Layers, got "${coldStart.filterLabel}"`);
  }
  if (coldStart.period !== "Period") {
    fail(`Mobile period trigger should read Period, got "${coldStart.period}"`);
  }
  if (coldStart.jumpLabel !== "Jump") {
    fail(`Mobile jump trigger should read Jump, got "${coldStart.jumpLabel}"`);
  }
  if (!/Christian Churches/i.test(coldStart.filterSubtitle) || !/Paul's Journeys/i.test(coldStart.filterSubtitle)) {
    fail(`Layers subtitle should name Churches + Journeys, got "${coldStart.filterSubtitle}"`);
  }
  if (!/Apostolic Age/i.test(coldStart.periodSubtitle)) {
    fail(`Period subtitle should start on Apostolic Age, got "${coldStart.periodSubtitle}"`);
  }
  if (coldStart.legendOpen) fail("Atlas Legend must start collapsed on phone");
  if (coldStart.legendBodyDisplay !== "none") fail("Atlas Legend body must start hidden on phone");
  if (!/atlas legend/i.test(coldStart.legendTitle)) fail("Hamburger Legend item should still be the Atlas Legend");

  const startExtent = await page.evaluate(() => {
    const map = window.app.map.map;
    const bounds = map.getBounds();
    const center = map.getCenter();
    const visible = [...document.querySelectorAll(".city-label-text, .region-label-text")].filter((el) => {
      const s = getComputedStyle(el);
      return s.display !== "none" && s.visibility !== "hidden" && el.getClientRects().length > 0;
    }).map((el) => el.textContent.trim());
    return {
      south: bounds.getSouth(),
      west: bounds.getWest(),
      north: bounds.getNorth(),
      east: bounds.getEast(),
      lat: center.lat,
      lng: center.lng,
      zoom: map.getZoom(),
      labels: visible
    };
  });
  console.log("Phone start extent:", startExtent);
  if (startExtent.west > 21.5 || startExtent.east < 35.0) {
    fail(`Phone start longitude should cover Greece–Levant, west=${startExtent.west} east=${startExtent.east}`);
  }
  if (startExtent.south > 31.4 || startExtent.north < 41.0) {
    fail(`Phone start latitude should cover Egypt–Black Sea, south=${startExtent.south} north=${startExtent.north}`);
  }
  if (startExtent.zoom < 4.4 || startExtent.zoom > 5.7) {
    fail(`Phone start zoom should stay an overview (~5), got ${startExtent.zoom}`);
  }
  ["Jerusalem", "Antioch", "Ephesus", "Corinth", "Alexandria", "Damascus", "ASIA", "GALATIA"].forEach((name) => {
    if (!startExtent.labels.some((label) => label === name || label.startsWith(name))) {
      fail(`Cold-start overview should show "${name}", got ${startExtent.labels.join(", ")}`);
    }
  });
  if (startExtent.labels.some((label) => /smyrna|bethlehem|nazareth|capernaum/i.test(label))) {
    fail(`Overview labels are cluttered: ${startExtent.labels.join(", ")}`);
  }

  const phoneOverflow = await measureOverflow(page);
  console.log("Phone layout:", phoneOverflow);
  if (!phoneOverflow.layout.includes("layout-mobile")) fail("Expected layout-mobile at 390x844");
  if (phoneOverflow.overflowX > 2) fail(`Horizontal overflow on phone: ${phoneOverflow.overflowX}px`);
  await page.screenshot({ path: path.join(OUT, "phone_hamburger_closed.png"), fullPage: false });
  await page.screenshot({ path: path.join(OUT, "phone_cold_start.png"), fullPage: false });

  const burgerClosed = await page.evaluate(() => {
    const burger = document.getElementById("mobileMenuBtn");
    const bar = document.getElementById("mobileCityBar");
    const nav = document.getElementById("mobileNavSheet");
    const br = burger.getBoundingClientRect();
    const title = getComputedStyle(document.querySelector(".brand-title"), "::before").content;
    return {
      burgerVisible: br.width > 0 && br.height > 0,
      burgerH: br.height,
      burgerW: br.width,
      burgerLeft: br.left,
      barDisplay: getComputedStyle(bar).display,
      navOpen: nav.classList.contains("open"),
      titleBefore: title
    };
  });
  console.log("Hamburger closed:", burgerClosed);
  if (!burgerClosed.burgerVisible) fail("Hamburger must be visible in the slim header");
  if (burgerClosed.burgerH + 0.5 < 44 || burgerClosed.burgerW + 0.5 < 44) {
    fail(`Hamburger tap ${burgerClosed.burgerW}x${burgerClosed.burgerH} < 44`);
  }
  if (burgerClosed.burgerLeft > 20) fail(`Hamburger should sit top-left, left=${burgerClosed.burgerLeft}`);
  if (burgerClosed.barDisplay !== "none") fail(`Command row must be hidden on phone, display=${burgerClosed.barDisplay}`);
  if (burgerClosed.navOpen) fail("Hamburger sheet must start closed");
  if (!/NT Geography/i.test(burgerClosed.titleBefore || "")) {
    fail(`Slim header title should shorten to NT Geography, got ${burgerClosed.titleBefore}`);
  }

  await page.locator("#mobileMenuBtn").click();
  await page.waitForSelector("#mobileNavSheet.open", { timeout: 3000 });
  const menuOpen = await page.evaluate(() => {
    const sheet = document.getElementById("mobileNavSheet");
    const card = sheet.querySelector(".mobile-picker-card");
    const r = card.getBoundingClientRect();
    const items = [...document.querySelectorAll(".mobile-nav-item")].map((el) => (el.textContent || "").replace(/\s+/g, " ").trim());
    return {
      top: r.top,
      width: r.width,
      viewW: window.innerWidth,
      viewH: window.innerHeight,
      backdrop: document.getElementById("mobileBackdrop").classList.contains("visible"),
      items,
      navClass: document.documentElement.classList.contains("nav-menu-open")
    };
  });
  console.log("Hamburger open:", menuOpen);
  if (!menuOpen.navClass) fail("Opening ☰ must add nav-menu-open");
  if (!menuOpen.backdrop) fail("Hamburger sheet must dim the map");
  if (menuOpen.top < menuOpen.viewH * 0.25) fail("Hamburger must be a bottom sheet, not a left drawer");
  if (Math.abs(menuOpen.width - menuOpen.viewW) > 8) fail("Hamburger sheet should be full width");
  ["Layers", "Period", "Jump to place", "Atlas Legend", "Map / Satellite"].forEach((label) => {
    if (!menuOpen.items.some((t) => t.includes(label))) fail(`Hamburger sheet missing ${label}`);
  });
  await page.screenshot({ path: path.join(OUT, "phone_hamburger_open.png"), fullPage: false });

  await page.locator("#mobileNavBasemap").click();
  await page.waitForFunction(() => {
    const panel = document.getElementById("mobileNavBasemapPanel");
    return panel && panel.classList.contains("open");
  }, { timeout: 3000 });
  const mapSection = await page.evaluate(() => {
    const panel = document.getElementById("mobileNavBasemapPanel");
    const r = panel.getBoundingClientRect();
    const tools = [...panel.querySelectorAll(".mobile-nav-tool")].map((el) => (el.textContent || "").replace(/\s+/g, " ").trim());
    const toggle = document.getElementById("mobileBasemapToggle");
    const tr = toggle.getBoundingClientRect();
    const navOpen = document.documentElement.classList.contains("nav-menu-open");
    return {
      panelH: r.height,
      toggleVisible: tr.width > 0 && tr.height > 0,
      tools,
      navOpen,
      mapLabel: ((document.querySelector('#mobileBasemapToggle [data-style="parchment"]') || {}).textContent || "").trim(),
      satLabel: ((document.querySelector('#mobileBasemapToggle [data-style="satellite"]') || {}).textContent || "").trim()
    };
  });
  console.log("Map/Satellite section:", mapSection);
  if (!mapSection.navOpen) fail("Expanding Map / Satellite must keep the hamburger open");
  if (!mapSection.toggleVisible) fail("Map / Satellite submenu must show the Map|Satellite control");
  if (mapSection.mapLabel !== "Map" || mapSection.satLabel !== "Satellite") {
    fail(`Expected Map and Satellite buttons, got "${mapSection.mapLabel}" / "${mapSection.satLabel}"`);
  }
  ["Reset view", "Holy Land", "Jerusalem"].forEach((label) => {
    if (!mapSection.tools.includes(label)) fail(`Map / Satellite submenu missing atlas tool: ${label}`);
  });
  await page.screenshot({ path: path.join(OUT, "phone_hamburger_map_satellite.png"), fullPage: false });
  await page.locator("#mobileNavClose").click();
  await sleep(150);

  const legendChip = await page.evaluate(() => {
    const box = document.getElementById("mapLegend");
    const body = document.getElementById("legendBody");
    const r = box.getBoundingClientRect();
    return {
      visible: r.width > 0 && r.height > 0,
      width: r.width,
      height: r.height,
      bodyH: body.getBoundingClientRect().height,
      open: document.documentElement.classList.contains("legend-sheet-open")
    };
  });
  console.log("Legend chip:", legendChip);
  if (legendChip.visible) fail("Atlas Legend chip must not sit on the phone map (Legend is in the hamburger)");
  if (legendChip.open) fail("Legend sheet must start closed");
  if (legendChip.bodyH > 2) fail("Collapsed legend must not show the legend list");

  await openFromHamburger(page, "#mobileNavLegend");
  await page.waitForFunction(() => document.documentElement.classList.contains("legend-sheet-open"), { timeout: 3000 });
  const legendSheet = await page.evaluate(() => {
    const box = document.getElementById("mapLegend");
    const r = box.getBoundingClientRect();
    return {
      top: r.top,
      width: r.width,
      viewW: window.innerWidth,
      viewH: window.innerHeight,
      backdrop: document.getElementById("mobileBackdrop") && document.getElementById("mobileBackdrop").classList.contains("visible")
    };
  });
  if (Math.abs(legendSheet.width - legendSheet.viewW) > 8) fail("Expanded legend should be a full-width sheet");
  if (!legendSheet.backdrop) fail("Expanded legend should use a dimmed backdrop");
  if (legendSheet.top < legendSheet.viewH * 0.25) fail("Expanded legend should be a sheet, not a persistent map card");

  await openFromHamburger(page, "#mobileNavLayers");
  await page.waitForFunction(() => document.documentElement.classList.contains("filter-menu-open"), { timeout: 3000 });
  const afterLayers = await page.evaluate(() => ({
    legend: document.documentElement.classList.contains("legend-sheet-open"),
    period: document.documentElement.classList.contains("period-menu-open"),
    jump: document.getElementById("mobileCityPickerSheet").classList.contains("open"),
    layers: document.documentElement.classList.contains("filter-menu-open"),
    nav: document.documentElement.classList.contains("nav-menu-open"),
    backdrop: document.getElementById("mobileBackdrop").classList.contains("visible"),
    subtitle: ((document.getElementById("mobileFilterSubtitle") || {}).textContent || "").trim()
  }));
  if (!afterLayers.layers) fail("Layers menu did not open");
  if (afterLayers.nav) fail("Opening Layers from the hamburger must close the hamburger sheet");
  if (afterLayers.legend) fail("Opening Layers must auto-collapse the legend");
  if (afterLayers.period) fail("Opening Layers must close Period");
  if (afterLayers.jump) fail("Opening Layers must close Jump");
  if (!afterLayers.backdrop) fail("Layers menu should sit over a dimmed backdrop");
  await page.screenshot({ path: path.join(OUT, "phone_layers_from_menu.png"), fullPage: false });
  await page.screenshot({ path: path.join(OUT, "phone_layers_open.png"), fullPage: false });

  await openFromHamburger(page, "#mobileNavPeriod");
  await page.waitForFunction(() => document.documentElement.classList.contains("period-menu-open"), { timeout: 3000 });
  const afterPeriodOpen = await page.evaluate(() => ({
    layers: document.documentElement.classList.contains("filter-menu-open"),
    period: document.documentElement.classList.contains("period-menu-open"),
    legend: document.documentElement.classList.contains("legend-sheet-open"),
    jump: document.getElementById("mobileCityPickerSheet").classList.contains("open")
  }));
  if (!afterPeriodOpen.period) fail("Period menu did not open");
  if (afterPeriodOpen.layers) fail("Opening Period must close Layers");
  if (afterPeriodOpen.legend) fail("Opening Period must close the legend");
  if (afterPeriodOpen.jump) fail("Opening Period must close Jump");

  await openFromHamburger(page, "#mobileNavJump");
  await page.waitForSelector("#mobileCityPickerSheet.open", { timeout: 5000 });
  const afterJump = await page.evaluate(() => ({
    layers: document.documentElement.classList.contains("filter-menu-open"),
    period: document.documentElement.classList.contains("period-menu-open"),
    legend: document.documentElement.classList.contains("legend-sheet-open"),
    jump: document.getElementById("mobileCityPickerSheet").classList.contains("open")
  }));
  if (!afterJump.jump) fail("Jump sheet did not open");
  if (afterJump.layers) fail("Opening Jump must close Layers");
  if (afterJump.period) fail("Opening Jump must close Period");
  if (afterJump.legend) fail("Opening Jump must close the legend");
  await page.locator("#mobileCityPickerClose").click();
  await sleep(150);

  const stack = await page.evaluate(() => {
    const badge = document.getElementById("floatingEraBadge");
    const fabs = document.querySelector(".map-floating-actions");
    const zoom = document.querySelector(".leaflet-control-zoom");
    const toggle = document.getElementById("mobileBasemapToggle");
    const legend = document.getElementById("mapLegend");
    const left = document.querySelector(".leaflet-top.leaflet-left");
    const badgeR = badge.getBoundingClientRect();
    const fabR = fabs.getBoundingClientRect();
    const zoomR = zoom ? zoom.getBoundingClientRect() : { width: 0, height: 0, left: 0, right: 0, top: 0, bottom: 0 };
    const toggleR = toggle.getBoundingClientRect();
    const legendR = legend.getBoundingClientRect();
    const stripeX = badgeR.left + 2;
    const stripeY = badgeR.top + badgeR.height / 2;
    const hit = (x, y) => document.elementsFromPoint(x, y);
    const interactiveUnder = hit(stripeX, stripeY)
      .concat(hit(badgeR.left + badgeR.width / 2, stripeY))
      .filter((el, i, arr) => arr.indexOf(el) === i)
      .filter(el => el.closest("button, a, .floating-btn, .leaflet-control-zoom, .mobile-basemap-toggle"))
      .filter(el => !badge.contains(el) && el !== badge)
      .map(el => el.id || el.className);
    const topleftControls = left ? [...left.querySelectorAll(".leaflet-control")].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    }).length : 0;
    const borderLeft = getComputedStyle(badge).borderLeft;
    const borderColor = getComputedStyle(badge).borderLeftColor;
    return {
      title: (document.getElementById("eraTitle") || {}).textContent || "",
      badge: { left: badgeR.left, top: badgeR.top, width: badgeR.width, height: badgeR.height },
      fabsVisible: fabR.width > 0 && fabR.height > 0,
      zoomVisible: zoomR.width > 0 && zoomR.height > 0,
      toggleVisible: toggleR.width > 0 && toggleR.height > 0,
      legendVisible: legendR.width > 0 && legendR.height > 0,
      interactiveUnder,
      topleftControls,
      borderLeft,
      borderColor
    };
  });
  console.log("Period-title stack:", JSON.stringify({
    title: stack.title,
    fabsVisible: stack.fabsVisible,
    zoomVisible: stack.zoomVisible,
    toggleVisible: stack.toggleVisible,
    legendVisible: stack.legendVisible,
    borderLeft: stack.borderLeft,
    borderColor: stack.borderColor,
    interactiveUnder: stack.interactiveUnder,
    topleftControls: stack.topleftControls
  }, null, 2));
  if (!/apostolic/i.test(stack.title)) fail(`Expected Apostolic period title at 100 AD, got "${stack.title}"`);
  if (stack.fabsVisible) fail("On-map atlas FABs must leave the phone map");
  if (stack.zoomVisible) fail("Phone +/- zoom buttons must be hidden");
  if (stack.toggleVisible) fail("Map|Satellite pill must not sit on the phone map");
  if (stack.legendVisible) fail("ATLAS LEGEND+ chip must not sit on the phone map");
  if (stack.topleftControls > 0) fail(`Leaflet top-left still has ${stack.topleftControls} control(s) under the period title`);
  if (stack.interactiveUnder.length) fail(`Interactive control under the period-title stripe: ${JSON.stringify(stack.interactiveUnder)}`);
  if (!/rgb\(163,\s*40,\s*34\)|#A32822/i.test(stack.borderColor) && !/5px/.test(stack.borderLeft)) {
    fail(`Expected decorative crimson period-title accent, got border=${stack.borderLeft} color=${stack.borderColor}`);
  }
  await page.screenshot({ path: path.join(OUT, "phone_nativity_stack.png"), fullPage: false });
  await page.screenshot({ path: path.join(OUT, "phone_map_clean.png"), fullPage: false });

  await page.locator("#mobileMenuBtn").click();
  await page.waitForSelector("#mobileNavSheet.open", { timeout: 3000 });
  await page.locator("#mobileNavBasemap").click();
  await page.waitForFunction(() => {
    const panel = document.getElementById("mobileNavBasemapPanel");
    return panel && panel.classList.contains("open");
  }, { timeout: 3000 });
  await page.locator('#mobileBasemapToggle [data-style="satellite"]').click();
  await sleep(400);
  const satOn = await page.evaluate(() => {
    const theme = window.app.map.currentTheme;
    const pressed = document.querySelector('#mobileBasemapToggle [data-style="satellite"]').getAttribute("aria-pressed");
    const navOpen = document.documentElement.classList.contains("nav-menu-open");
    return { theme, pressed, navOpen };
  });
  if (satOn.theme !== "satellite") fail(`Satellite toggle did not switch basemap, theme=${satOn.theme}`);
  if (satOn.pressed !== "true") fail("Satellite toggle did not show pressed state");
  if (!satOn.navOpen) fail("Choosing Satellite must keep the hamburger Map / Satellite section open");
  await page.locator('#mobileBasemapToggle [data-style="parchment"]').click();
  await sleep(300);
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
  await sleep(200);
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

  await page.locator("#timelineSlider").evaluate(el => {
    el.value = "-6";
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await sleep(150);

  const cityBar = page.locator("#mobileCityPickerBtn");
  const burgerBtn = page.locator("#mobileMenuBtn");
  if (!(await burgerBtn.isVisible())) fail("Hamburger is not visible on phone");
  if (await cityBar.isVisible()) fail("City picker command button must stay hidden on phone");

  const commandRow = await page.evaluate(() => {
    const bar = document.getElementById("mobileCityBar");
    const burger = document.getElementById("mobileMenuBtn").getBoundingClientRect();
    const chipRows = document.querySelector(".filter-chip-rows");
    const eras = document.querySelector(".era-selector-tabs");
    const jumpLabel = (document.querySelector(".mobile-city-picker-label") || {}).textContent || "";
    const periodLabel = (document.getElementById("mobilePeriodLabel") || {}).textContent || "";
    return {
      burger: { height: burger.height, width: burger.width },
      barHeight: bar.getBoundingClientRect().height,
      barDisplay: getComputedStyle(bar).display,
      chipMenuOpen: getComputedStyle(chipRows).display !== "none",
      periodMenuOpen: getComputedStyle(eras).display !== "none",
      jumpLabel: jumpLabel.trim(),
      periodLabel: periodLabel.trim()
    };
  });
  console.log("Command row hidden:", commandRow);
  if (commandRow.barDisplay !== "none" || commandRow.barHeight > 2) {
    fail(`Command row must stay hidden, display=${commandRow.barDisplay} height=${commandRow.barHeight}`);
  }
  if (commandRow.chipMenuOpen) fail("Filter list should stay closed until opened from the hamburger");
  if (commandRow.periodMenuOpen) fail("Period list should stay closed until opened from the hamburger");
  if (!/^Jump$/i.test(commandRow.jumpLabel)) {
    fail(`Jump idle label should be "Jump", got "${commandRow.jumpLabel}"`);
  }
  if (!/^Period$/i.test(commandRow.periodLabel)) {
    fail(`Period trigger should read Period at 6 BC, got "${commandRow.periodLabel}"`);
  }
  assertTap("mobile-menu-btn", commandRow.burger);
  await page.screenshot({ path: path.join(OUT, "phone_home_compact.png"), fullPage: false });

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
  // Current main (PR #6): 48 header + 52 command + 168 footer = 268.
  const mainChrome = 48 + 52 + 168;
  const gain = mainChrome - mapChrome.chromeH;
  console.log(`Map viewport ${mapChrome.mapH}px; chrome ${mapChrome.chromeH}px; gain vs main chrome ≈ ${gain}px`);
  if (mapChrome.mapH < mapChrome.viewH - 240) {
    fail(`Map viewport too short: ${mapChrome.mapH}px in ${mapChrome.viewH}px view (chrome=${mapChrome.chromeH})`);
  }
  if (gain < 36) fail(`Expected ≥36px chrome savings vs PR #6 main (collapsed period chips), got ${gain}px`);
  if (mapChrome.footerH > 168) fail(`Timeline footer grew past main's 168px: ${mapChrome.footerH}px`);
  const fill390 = await measureViewportFill(page);
  console.log("Phone 390 fill:", fill390);
  assertViewportFill("390x844", fill390);
  await page.screenshot({ path: path.join(OUT, "phone_390x844_fill.png"), fullPage: false });
  const footerPad = await page.evaluate(() => getComputedStyle(document.querySelector(".app-timeline-footer")).paddingBottom);
  const padPx = parseFloat(footerPad);
  if (!(padPx >= 27.5)) fail(`Footer padding-bottom ${footerPad} must restore PR #4's 28px clearance`);

  await openFromHamburger(page, "#mobileNavLayers");
  await page.waitForFunction(() => document.documentElement.classList.contains("filter-menu-open"), { timeout: 3000 });
  const rows = await page.locator(".filter-chip-row").count();
  if (rows !== 2) fail(`Expected 2 chip rows, found ${rows}`);
  const chips = await page.locator(".filter-chip").count();
  if (chips < 8) fail(`Expected 8+ chips, found ${chips}`);

  const openChip = await page.locator('.filter-chip[data-filter="savior"]').boundingBox();
  assertTap("filter-chip", openChip);
  await page.locator('.filter-chip[data-filter="savior"]').click();
  await page.locator('.filter-chip[data-filter="journeys"]').click();
  await page.locator('.filter-chip[data-filter="heatmaps"]').click();
  await sleep(300);
  const active = await page.locator(".filter-chip.active").count();
  if (active < 3) fail("Layer chips did not activate");
  const filterLabel = (await page.locator("#mobileFilterLabel").innerText()).trim();
  const filterSubtitle = (await page.locator("#mobileFilterSubtitle").innerText()).trim();
  if (filterLabel !== "Layers") {
    fail(`Filter trigger must stay Layers, got "${filterLabel}"`);
  }
  if (!/Savior|Journey|Heatmap|Church/i.test(filterSubtitle)) {
    fail(`Filter menu subtitle should show current selection, got "${filterSubtitle}"`);
  }
  await page.screenshot({ path: path.join(OUT, "phone_filter_dropdown.png"), fullPage: false });
  await page.locator("#mobileFilterClose").click();
  await sleep(150);

  const yearBadge = await page.evaluate(() => {
    const year = document.getElementById("displayYear");
    const season = document.getElementById("displaySeason");
    const badge = document.getElementById("currentDateBadge");
    const play = document.getElementById("playPauseBtn");
    const back = document.getElementById("stepBackBtn");
    const fwd = document.getElementById("stepForwardBtn");
    const speed = document.querySelector(".speed-btn");
    const slider = document.getElementById("timelineSlider");
    const yr = year.getBoundingClientRect();
    const sn = season.getBoundingClientRect();
    const vis = (el) => {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return s.display !== "none" && s.visibility !== "hidden" && r.width > 2 && r.height > 2;
    };
    return {
      yearText: (year.textContent || "").trim(),
      seasonText: (season.textContent || "").trim(),
      yearVisible: vis(year),
      seasonVisible: vis(season) && sn.height > 4,
      seasonH: sn.height,
      yearH: yr.height,
      aria: badge.getAttribute("aria-label") || "",
      play: vis(play),
      skip: vis(back) && vis(fwd),
      speed: vis(speed),
      scrubber: vis(slider)
    };
  });
  console.log("Year badge:", yearBadge);
  if (!yearBadge.yearVisible) fail("Year badge must stay visible on phone");
  if (!/6 BC/.test(yearBadge.yearText)) fail(`Expected year-only "6 BC", got "${yearBadge.yearText}"`);
  if (yearBadge.seasonVisible) fail(`Season subtitle must not be visible on phone, height=${yearBadge.seasonH}`);
  if (!/Roman Census|Annunciation/i.test(yearBadge.aria + " " + yearBadge.seasonText)) {
    fail("Season copy should remain for assistive text");
  }
  if (!yearBadge.play || !yearBadge.skip || !yearBadge.speed || !yearBadge.scrubber) {
    fail("Play, skip, speed, and scrubber must stay visible after the period dropdown change");
  }

  await openFromHamburger(page, "#mobileNavPeriod");
  await page.waitForFunction(() => document.documentElement.classList.contains("period-menu-open"), { timeout: 3000 });
  const eraCount = await page.locator(".era-tab").count();
  if (eraCount < 8) fail(`Expected 8 era tabs in the period menu, found ${eraCount}`);
  const openEra = await page.locator(".era-tab").nth(1).boundingBox();
  assertTap("era-tab", openEra);
  const periodContrast = await page.evaluate(() => {
    const parse = (c) => {
      const m = String(c).match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : [0, 0, 0];
    };
    const lum = ([r, g, b]) => {
      const n = [r, g, b].map((v) => {
        const x = v / 255;
        return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2];
    };
    const contrast = (a, b) => {
      const l1 = lum(a);
      const l2 = lum(b);
      const hi = Math.max(l1, l2);
      const lo = Math.min(l1, l2);
      return (hi + 0.05) / (lo + 0.05);
    };
    const idle = document.querySelector(".era-tab:not(.active)");
    const active = document.querySelector(".era-tab.active");
    const idleCs = getComputedStyle(idle);
    const activeCs = getComputedStyle(active);
    return {
      idleRatio: contrast(parse(idleCs.color), parse(idleCs.backgroundColor)),
      activeRatio: contrast(parse(activeCs.color), parse(activeCs.backgroundColor)),
      idleColor: idleCs.color,
      idleBg: idleCs.backgroundColor,
      activeColor: activeCs.color,
      activeBg: activeCs.backgroundColor
    };
  });
  console.log("Period contrast:", periodContrast);
  if (periodContrast.idleRatio < 4.5) {
    fail(`Period list text is too faint: contrast ${periodContrast.idleRatio.toFixed(2)} (${periodContrast.idleColor} on ${periodContrast.idleBg})`);
  }
  if (periodContrast.activeRatio < 4.5) {
    fail(`Selected period state is too weak: contrast ${periodContrast.activeRatio.toFixed(2)} (${periodContrast.activeColor} on ${periodContrast.activeBg})`);
  }
  await page.screenshot({ path: path.join(OUT, "phone_period_dropdown.png"), fullPage: false });
  await page.evaluate(() => {
    const tab = document.querySelectorAll(".era-tab")[1];
    if (tab) tab.click();
  });
  await page.waitForFunction(() => {
    const year = (document.getElementById("displayYear") || {}).textContent || "";
    const open = document.documentElement.classList.contains("period-menu-open");
    const label = (document.getElementById("mobilePeriodLabel") || {}).textContent || "";
    const subtitle = (document.getElementById("mobilePeriodSubtitle") || {}).textContent || "";
    return /4 BC/.test(year) && !open && /^Period$/i.test(label.trim()) && /Nazareth/i.test(subtitle);
  }, { timeout: 4000 });
  const afterPeriod = await page.evaluate(() => ({
    open: document.documentElement.classList.contains("period-menu-open"),
    label: (document.getElementById("mobilePeriodLabel") || {}).textContent || "",
    subtitle: (document.getElementById("mobilePeriodSubtitle") || {}).textContent || "",
    year: (document.getElementById("displayYear") || {}).textContent || "",
    eraDisplay: getComputedStyle(document.querySelector(".era-selector-tabs")).display
  }));
  if (afterPeriod.open || afterPeriod.eraDisplay !== "none") fail("Period menu should close after choosing an era");
  if (!/^Period$/i.test(afterPeriod.label.trim())) {
    fail(`Period trigger should stay Period, got "${afterPeriod.label}"`);
  }
  if (!/Nazareth/i.test(afterPeriod.subtitle)) {
    fail(`Period menu subtitle should show Nazareth, got "${afterPeriod.subtitle}"`);
  }
  if (!/4 BC/.test(afterPeriod.year)) fail(`Choosing Nazareth should jump the timeline to 4 BC, year=${afterPeriod.year}`);

  const assertPeriodClosedBy = async (label, openAction) => {
    await openFromHamburger(page, "#mobileNavPeriod");
    await page.waitForFunction(() => document.documentElement.classList.contains("period-menu-open"), { timeout: 3000 });
    await openAction();
    const state = await page.evaluate(() => ({
      open: document.documentElement.classList.contains("period-menu-open"),
      display: getComputedStyle(document.querySelector(".era-selector-tabs")).display
    }));
    if (state.open || state.display !== "none") {
      fail(`Period menu stayed open after opening ${label}`);
    }
  };

  await assertPeriodClosedBy("Search", async () => {
    await page.locator("#mobileSearchBtn").click();
    await page.waitForFunction(() => document.body.classList.contains("search-open"), { timeout: 3000 });
  });
  await page.screenshot({ path: path.join(OUT, "phone_period_closed_by_search.png"), fullPage: false });
  await page.locator("#mobileSearchBtn").click();
  await sleep(150);

  await assertPeriodClosedBy("Hamburger", async () => {
    await page.locator("#mobileMenuBtn").click();
    await page.waitForSelector("#mobileNavSheet.open", { timeout: 5000 });
  });
  await page.locator("#mobileNavClose").click();
  await sleep(150);

  await assertPeriodClosedBy("Tours", async () => {
    await page.locator("#mobileToursBtn").click();
    await page.waitForSelector("#tourModal", { state: "visible", timeout: 5000 });
  });
  await page.locator("#closeTourModalBtn").click();
  await sleep(150);

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
  await sleep(400);
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

  const sheetChrome = await page.evaluate(() => {
    const bar = document.getElementById("mobileCityBar");
    const filter = document.getElementById("mobileFilterBtn");
    const city = document.getElementById("mobileCityPickerBtn");
    const barStyle = getComputedStyle(bar);
    return {
      display: barStyle.display,
      pointerEvents: barStyle.pointerEvents,
      ariaHidden: bar.getAttribute("aria-hidden"),
      filterH: filter.getBoundingClientRect().height,
      periodH: document.getElementById("mobilePeriodBtn").getBoundingClientRect().height,
      cityH: city.getBoundingClientRect().height
    };
  });
  if (sheetChrome.display !== "none") fail(`Command row must hide when sheet is open, display=${sheetChrome.display}`);
  if (sheetChrome.filterH > 0 || sheetChrome.periodH > 0 || sheetChrome.cityH > 0) {
    fail(`Layers/Period/Jump still painting while sheet is open: filter=${sheetChrome.filterH} period=${sheetChrome.periodH} city=${sheetChrome.cityH}`);
  }
  if (sheetChrome.ariaHidden !== "true") fail("Command row should be aria-hidden while the sheet is open");

  const taps = await page.evaluate(() => {
    const box = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { width: r.width, height: r.height };
    };
    const label = document.querySelector(".city-label-text.city-label-primary");
    return {
      tab: box(".tab-btn"),
      speed: box(".speed-btn"),
      handle: box(".sheet-handle"),
      labelSize: label ? parseFloat(getComputedStyle(label).fontSize) : null
    };
  });
  assertTap("tab-btn", taps.tab);
  assertTap("speed-btn", taps.speed);
  assertTap("sheet-handle", taps.handle);
  await page.screenshot({ path: path.join(OUT, "phone_welcome_sheet.png"), fullPage: false });
  await page.locator("#closeSidebarBtn").click();
  await sleep(250);
  const burgerTap = await page.locator("#mobileMenuBtn").boundingBox();
  assertTap("mobile-menu-btn", burgerTap);
  await page.locator("#mobileMenuBtn").click();
  await page.waitForSelector("#mobileNavSheet.open", { timeout: 3000 });
  await page.locator("#mobileNavBasemap").click();
  const toolTap = await page.locator("#mobileNavRecenter").boundingBox();
  assertTap("mobile-nav-tool", toolTap);
  await page.locator("#mobileNavClose").click();
  await sleep(150);

  await openFromHamburger(page, "#mobileNavJump");
  await page.waitForSelector("#mobileCityPickerSheet.open", { timeout: 5000 });
  await page.fill("#mobileCitySearch", "Corinth");
  await sleep(200);
  const corinth = page.locator('#mobileCityList [data-jump-value="city:corinth"]');
  if (!(await corinth.count())) fail("Corinth not found in searchable city list");
  await page.screenshot({ path: path.join(OUT, "phone_city_picker.png"), fullPage: false });
  await corinth.click();
  await sleep(800);

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
  const jumpedPlace = await page.evaluate(() => ({
    current: (document.getElementById("mobileCityPickerCurrent") || {}).textContent || "",
    hasPlace: document.getElementById("mobileCityBar").classList.contains("has-place")
  }));
  if (!/corinth/i.test(jumpedPlace.current)) {
    fail(`After pick, Jump sheet should remember the place name, got "${jumpedPlace.current}"`);
  }
  const jumpBtnLabel = await page.locator(".mobile-city-picker-label").innerText();
  if (jumpBtnLabel.trim() !== "Jump") {
    fail(`Jump command button must stay Jump after a pick, got "${jumpBtnLabel}"`);
  }

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
  await sleep(250);
  await page.locator('.tab-btn[data-tab="people"]').click();
  await sleep(250);
  await page.screenshot({ path: path.join(OUT, "phone_place_sheet.png"), fullPage: false });

  await page.locator("#timelineSlider").evaluate(el => {
    el.value = "50";
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  const year = await page.locator("#displayYear").innerText();
  console.log("Timeline year after scrub:", year);
  if (!/50/.test(year) && !/AD/.test(year)) fail(`Unexpected year after scrub: ${year}`);

  await page.locator("#playPauseBtn").click();
  await sleep(400);
  await page.locator("#playPauseBtn").click();

  await page.locator("#mobileSearchBtn").click();
  await sleep(200);
  const searchOpen = await page.evaluate(() => document.body.classList.contains("search-open"));
  if (!searchOpen) fail("Search overlay did not open");
  await page.screenshot({ path: path.join(OUT, "phone_search.png"), fullPage: false });
  await openFromHamburger(page, "#mobileNavAbout");
  await page.waitForSelector("#mobileAboutSheet.open", { timeout: 5000 });
  await page.screenshot({ path: path.join(OUT, "phone_more_tools.png"), fullPage: false });
  await page.locator("#mobileAboutClose").click();

  const chrome = await page.evaluate(() => {
    const bar = document.getElementById("mobileCityBar");
    const tabs = document.querySelector(".sidebar-tabs");
    const fabs = document.querySelector(".map-floating-actions");
    const zoom = document.querySelector(".leaflet-control-zoom");
    const play = document.getElementById("playPauseBtn");
    const year = document.getElementById("displayYear");
    const slider = document.getElementById("timelineSlider");
    const barRect = bar.getBoundingClientRect();
    const tabRect = tabs.getBoundingClientRect();
    const vis = (el) => el && el.getBoundingClientRect().height > 2;
    return {
      commandHeight: barRect.height,
      tabHeight: tabRect.height,
      tabScroll: tabs.scrollWidth > tabs.clientWidth - 4,
      fabVisible: vis(fabs),
      zoomVisible: vis(zoom),
      playVisible: vis(play),
      yearVisible: vis(year),
      scrubberVisible: vis(slider),
      labelsHiddenAtDefault: !document.documentElement.classList.contains("mobile-zoomed")
    };
  });
  if (chrome.commandHeight > 2) fail(`Command row must stay hidden, height=${chrome.commandHeight}`);
  if (chrome.tabHeight > 68) fail(`Place tabs should be a single row, height=${chrome.tabHeight}`);
  if (!chrome.playVisible || !chrome.yearVisible || !chrome.scrubberVisible) {
    fail("Play, year, and scrubber must remain visible");
  }
  if (chrome.fabVisible) fail("Map FABs must stay off the phone map");
  if (chrome.zoomVisible) fail("Zoom +/- must stay off the phone map");

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
  await sleep(200);
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
  await sleep(250);
  await page.evaluate(() => window.app.map.focusRegion("holy-land"));
  await sleep(1800);
  const holy = await page.evaluate(() => {
    const zoom = document.querySelector(".leaflet-control-zoom");
    const fabs = document.querySelector(".map-floating-actions");
    const labels = [...document.querySelectorAll(".city-label-text")].filter(el => {
      const s = getComputedStyle(el);
      return s.display !== "none" && s.visibility !== "hidden" && el.offsetParent !== null;
    }).map(el => el.textContent.trim());
    const primary = document.querySelector(".city-label-text.city-label-primary");
    const zoomR = zoom ? zoom.getBoundingClientRect() : { width: 0, height: 0 };
    const fabR = fabs.getBoundingClientRect();
    const toggle = document.getElementById("mobileBasemapToggle").getBoundingClientRect();
    return {
      zoomVisible: zoomR.width > 0 && zoomR.height > 0,
      fabVisible: fabR.width > 0 && fabR.height > 0,
      toggleVisible: toggle.width > 0,
      labels,
      zoomClass: document.documentElement.classList.contains("mobile-zoomed"),
      primaryLabelPx: primary ? parseFloat(getComputedStyle(primary).fontSize) : null
    };
  });
  if (holy.zoomVisible) fail("Zoom +/- must stay hidden on the Holy Land view");
  if (holy.fabVisible) fail("Atlas FABs must stay hidden on the Holy Land view");
  if (holy.toggleVisible) fail("Map|Satellite pill must stay off the Holy Land view");
  if (holy.labels.some(n => /smyrna/i.test(n))) fail("Smyrna label should stay hidden at Holy Land zoom");
  if (holy.primaryLabelPx != null && holy.primaryLabelPx < 11) {
    fail(`Primary zoomed city labels are ${holy.primaryLabelPx}px; need ≥11px`);
  }
  await page.screenshot({ path: path.join(OUT, "phone_holy_land.png"), fullPage: false });

  // Taller iPhone-like viewport: map must grow with the extra height
  const tallPhone = await browser.newContext({
    viewport: { width: 430, height: 932 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const tallPage = await tallPhone.newPage();
  await tallPage.goto("http://127.0.0.1:8080/", { waitUntil: "commit", timeout: 60000 });
  await tallPage.waitForFunction(() => window.app && window.app.map && window.app.ui, { timeout: 20000 });
  await sleep(800);
  const fill932 = await measureViewportFill(tallPage);
  console.log("Phone 430x932 fill:", fill932);
  assertViewportFill("430x932", fill932);
  const extraH = fill932.viewH - fill390.viewH;
  const extraMap = fill932.mapH - fill390.mapH;
  console.log(`Tall-phone map gain: +${extraMap}px map for +${extraH}px viewport`);
  if (extraH >= 80 && extraMap < extraH - 8) {
    fail(`Map did not grow with the taller phone: map +${extraMap}px vs viewport +${extraH}px`);
  }
  if (fill932.mapH <= fill390.mapH) {
    fail(`Taller phone map (${fill932.mapH}px) must exceed 390×844 map (${fill390.mapH}px)`);
  }
  await tallPage.screenshot({ path: path.join(OUT, "phone_430x932_fill.png"), fullPage: false });
  await tallPhone.close();

  // Narrow phone + large text: command row and footer must still fit
  const narrow = await browser.newContext({
    viewport: { width: 360, height: 640 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const npage = await narrow.newPage();
  await npage.goto("http://127.0.0.1:8080/", { waitUntil: "commit", timeout: 60000 });
  await npage.waitForFunction(() => window.app && window.app.map, { timeout: 20000 });
  await npage.addStyleTag({ content: "html { font-size: 20px; }" });
  await sleep(400);
  const narrowState = await npage.evaluate(() => {
    const burger = document.getElementById("mobileMenuBtn").getBoundingClientRect();
    const bar = document.getElementById("mobileCityBar").getBoundingClientRect();
    const footer = document.querySelector(".app-timeline-footer").getBoundingClientRect();
    const slider = document.getElementById("timelineSlider").getBoundingClientRect();
    const play = document.getElementById("playPauseBtn").getBoundingClientRect();
    const year = document.getElementById("displayYear").getBoundingClientRect();
    const season = document.getElementById("displaySeason").getBoundingClientRect();
    const main = document.querySelector(".app-main-container").getBoundingClientRect();
    return {
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      barHeight: bar.height,
      burgerH: burger.height,
      burgerW: burger.width,
      playH: play.height,
      yearVisible: year.height > 4,
      seasonVisible: season.height > 4,
      footerH: footer.height,
      sliderBottom: slider.bottom,
      footerBottom: footer.bottom,
      viewH: window.innerHeight,
      mapH: main.height
    };
  });
  console.log("360 large-text chrome:", narrowState);
  if (narrowState.overflowX > 2) fail(`Horizontal overflow at 360px large text: ${narrowState.overflowX}px`);
  if (narrowState.barHeight > 2) fail(`360px command row must stay hidden, height=${narrowState.barHeight}`);
  if (narrowState.burgerH + 0.5 < 44) fail(`360 hamburger tap ${narrowState.burgerH}px < 44`);
  if (narrowState.playH + 0.5 < 44) fail(`360 play tap ${narrowState.playH}px < 44`);
  if (!narrowState.yearVisible) fail("360px year badge must stay visible");
  if (narrowState.seasonVisible) fail("360px season subtitle must stay visually hidden");
  await openFromHamburger(npage, "#mobileNavPeriod");
  await npage.waitForFunction(() => document.documentElement.classList.contains("period-menu-open"), { timeout: 3000 });
  const narrowEra = await npage.locator(".era-tab").first().boundingBox();
  assertTap("era-tab", narrowEra);
  await npage.locator("#mobilePeriodClose").click();
  if (narrowState.sliderBottom > narrowState.viewH - 12) {
    fail(`360px scrubber clipped: bottom=${narrowState.sliderBottom} view=${narrowState.viewH}`);
  }
  if (narrowState.mapH < 300) fail(`360px map viewport too short: ${narrowState.mapH}px`);
  if (narrowState.viewH - narrowState.footerBottom > 2) {
    fail(`360px unused space below footer: ${narrowState.viewH - narrowState.footerBottom}px`);
  }
  await npage.screenshot({ path: path.join(OUT, "phone_360_large_text.png"), fullPage: false });
  await narrow.close();

  // Tablet width
  const tablet = await browser.newContext({
    viewport: { width: 768, height: 1024 },
    deviceScaleFactor: 2,
    hasTouch: true
  });
  const tpage = await tablet.newPage();
  await tpage.goto("http://127.0.0.1:8080/", { waitUntil: "commit", timeout: 60000 });
  await tpage.waitForFunction(() => window.app && window.app.map, { timeout: 20000 });
  await sleep(1000);
  const tabletOverflow = await measureOverflow(tpage);
  console.log("Tablet layout:", tabletOverflow);
  if (tabletOverflow.overflowX > 2) fail(`Horizontal overflow on tablet: ${tabletOverflow.overflowX}px`);
  // 768px is the mobile breakpoint inclusive; layout-mobile is expected.
  await tpage.screenshot({ path: path.join(OUT, "tablet_home.png"), fullPage: false });
  await tablet.close();

  // Desktop regression
  const desk = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dpage = await desk.newPage();
  await dpage.goto("http://127.0.0.1:8080/", { waitUntil: "commit", timeout: 60000 });
  await dpage.waitForFunction(() => window.app && window.app.map, { timeout: 20000 });
  await sleep(1000);
  const deskState = await dpage.evaluate(() => ({
    layout: document.body.className,
    cityBar: getComputedStyle(document.getElementById("mobileCityBar")).display,
    hamburger: getComputedStyle(document.getElementById("mobileMenuBtn")).display,
    navSheet: getComputedStyle(document.getElementById("mobileNavSheet")).display,
    filterBtn: getComputedStyle(document.getElementById("mobileFilterBtn")).display,
    periodBtn: getComputedStyle(document.getElementById("mobilePeriodBtn")).display,
    basemap: getComputedStyle(document.getElementById("mobileBasemapToggle")).display,
    sidebar: getComputedStyle(document.getElementById("detailSidebar")).width,
    headerRight: getComputedStyle(document.querySelector(".header-right")).display,
    heading: getComputedStyle(document.getElementById("mobileFilterHeading")).display,
    filters: {
      all: window.app.map.filterState.all,
      savior: window.app.map.filterState.savior,
      diaspora: window.app.map.filterState.diaspora,
      churches: window.app.map.filterState.churches,
      journeys: window.app.map.filterState.journeys,
      provinces: window.app.map.filterState.provinces,
      jerusalemSites: window.app.map.filterState.jerusalemSites,
      jerusalemGeography: window.app.map.filterState.jerusalemGeography,
      heatmaps: window.app.map.filterState.heatmaps
    },
    year: window.app.map.currentYear,
    legendBody: document.getElementById("legendBody") ? getComputedStyle(document.getElementById("legendBody")).display : ""
  }));
  console.log("Desktop layout:", deskState);
  if (deskState.layout.includes("layout-mobile")) fail("Desktop should not use layout-mobile");
  if (deskState.cityBar !== "none") fail("Mobile city bar should be hidden on desktop");
  if (deskState.hamburger !== "none") fail("Phone hamburger must stay hidden on desktop");
  if (deskState.navSheet !== "none") fail("Hamburger sheet must stay hidden on desktop");
  if (deskState.filterBtn !== "none") fail("Mobile filter dropdown should be hidden on desktop");
  if (deskState.periodBtn !== "none") fail("Mobile period dropdown should be hidden on desktop");
  if (deskState.basemap !== "none") fail("Mobile basemap toggle should be hidden on desktop");
  if (deskState.heading !== "none") fail("Mobile menu heading must stay hidden on desktop");
  ["all", "savior", "diaspora", "churches", "journeys", "provinces", "jerusalemSites", "jerusalemGeography"].forEach((key) => {
    if (!deskState.filters[key]) fail(`Desktop cold start must keep ${key} ON`);
  });
  if (deskState.filters.heatmaps) fail("Desktop Growth Heatmap must stay OFF");
  if (deskState.year !== 100) fail(`Desktop timeline must stay 100 AD, got ${deskState.year}`);
  if (deskState.legendBody === "none") fail("Desktop Atlas Legend must stay expanded/open by default");
  await dpage.screenshot({ path: path.join(OUT, "desktop_home.png"), fullPage: false });
  await desk.close();

  const desk1280 = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const d1280 = await desk1280.newPage();
  await d1280.goto("http://127.0.0.1:8080/", { waitUntil: "commit", timeout: 60000 });
  await d1280.waitForFunction(() => window.app && window.app.map, { timeout: 20000 });
  await sleep(800);
  const wide = await d1280.evaluate(() => ({
    layout: document.body.className,
    hamburger: getComputedStyle(document.getElementById("mobileMenuBtn")).display,
    title: (document.querySelector(".brand-title") || {}).textContent || ""
  }));
  if (wide.layout.includes("layout-mobile")) fail("1280 desktop should not use layout-mobile");
  if (wide.hamburger !== "none") fail("Hamburger must stay hidden at 1280");
  if (!/New Testament Geography/.test(wide.title)) fail(`1280 title must stay full, got "${wide.title}"`);
  await d1280.screenshot({ path: path.join(OUT, "desktop_1280.png"), fullPage: false });
  await desk1280.close();

  await browser.close();
  console.log("✓ Browser verification passed. Shots in", OUT);
})().catch(err => {
  console.error(err);
  process.exit(1);
});
