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

async function measureViewportFill(page) {
  return page.evaluate(() => {
    const header = document.querySelector(".app-header").getBoundingClientRect();
    const bar = document.getElementById("mobileCityBar").getBoundingClientRect();
    const main = document.querySelector(".app-main-container").getBoundingClientRect();
    const footer = document.querySelector(".app-timeline-footer").getBoundingClientRect();
    const slider = document.getElementById("timelineSlider").getBoundingClientRect();
    const vvH = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    return {
      headerTop: header.top,
      headerBottom: header.bottom,
      barTop: bar.top,
      barBottom: bar.bottom,
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

function assertViewportFill(label, fill) {
  if (fill.headerTop > 1) fail(`${label}: unused band above header (top=${fill.headerTop})`);
  if (Math.abs(fill.barTop - fill.headerBottom) > 2) {
    fail(`${label}: gap between header and command row (${fill.headerBottom} → ${fill.barTop})`);
  }
  if (Math.abs(fill.mapTop - fill.barBottom) > 2) {
    fail(`${label}: gap between command row and map (${fill.barBottom} → ${fill.mapTop})`);
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

  await page.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForFunction(() => window.app && window.app.map && window.app.ui, { timeout: 20000 });
  await page.waitForTimeout(1200);

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
      chips,
      heatmaps: window.app.map.filterState.heatmaps,
      savior: window.app.map.filterState.savior,
      diaspora: window.app.map.filterState.diaspora,
      churches: window.app.map.filterState.churches,
      journeys: window.app.map.filterState.journeys,
      provinces: window.app.map.filterState.provinces,
      timelineYear: window.app.timeline.currentYear
    };
  });
  console.log("Cold start:", coldStart);
  if (coldStart.year !== "100 AD" || Number(coldStart.slider) !== 100 || coldStart.timelineYear !== 100) {
    fail(`Cold start year should be 100 AD, got year="${coldStart.year}" slider=${coldStart.slider} js=${coldStart.timelineYear}`);
  }
  if (coldStart.heatmaps) fail("Growth Heatmap must start OFF");
  ["savior", "diaspora", "churches", "journeys", "provinces"].forEach((key) => {
    if (!coldStart[key]) fail(`${key} overlay must start ON`);
  });
  const growthChip = coldStart.chips.find((chip) => chip.key === "heatmaps");
  if (!growthChip || growthChip.active) fail("Growth Heatmap chip must start inactive");
  const coreOff = coldStart.chips.filter((chip) => chip.key !== "heatmaps" && !chip.active);
  if (coreOff.length) fail(`Core overlay chips must start ON, off=${coreOff.map((c) => c.key).join(",")}`);
  if (!/All Visible/i.test(coldStart.filterLabel)) {
    fail(`Mobile layer trigger should read All Visible, got "${coldStart.filterLabel}"`);
  }
  if (!/Period · Apostolic Age/i.test(coldStart.period)) {
    fail(`Mobile period trigger should read Period · Apostolic Age, got "${coldStart.period}"`);
  }

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

  await page.locator("#timelineSlider").evaluate(el => {
    el.value = "-6";
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await page.waitForTimeout(150);

  const cityBar = page.locator("#mobileCityPickerBtn");
  const filterBtn = page.locator("#mobileFilterBtn");
  const periodBtn = page.locator("#mobilePeriodBtn");
  if (!(await cityBar.isVisible())) fail("City picker bar not visible on phone");
  if (!(await filterBtn.isVisible())) fail("Filter dropdown trigger not visible on phone");
  if (!(await periodBtn.isVisible())) fail("Period dropdown trigger not visible on phone");

  const commandRow = await page.evaluate(() => {
    const filter = document.getElementById("mobileFilterBtn").getBoundingClientRect();
    const period = document.getElementById("mobilePeriodBtn").getBoundingClientRect();
    const city = document.getElementById("mobileCityPickerBtn").getBoundingClientRect();
    const bar = document.getElementById("mobileCityBar").getBoundingClientRect();
    const chipRows = document.querySelector(".filter-chip-rows");
    const eras = document.querySelector(".era-selector-tabs");
    const jumpLabel = (document.querySelector(".mobile-city-picker-label") || {}).textContent || "";
    const periodLabel = (document.getElementById("mobilePeriodLabel") || {}).textContent || "";
    const chipOpen = getComputedStyle(chipRows).display !== "none";
    const eraOpen = getComputedStyle(eras).display !== "none";
    return {
      filter: { top: filter.top, bottom: filter.bottom, left: filter.left, right: filter.right, height: filter.height, width: filter.width },
      period: { top: period.top, bottom: period.bottom, left: period.left, right: period.right, height: period.height, width: period.width },
      city: { top: city.top, bottom: city.bottom, left: city.left, right: city.right, height: city.height, width: city.width },
      barHeight: bar.height,
      sameRow: Math.abs(filter.top - period.top) < 8 && Math.abs(period.top - city.top) < 8,
      sideBySide: filter.right <= period.left + 1 && period.right <= city.left + 1,
      chipMenuOpen: chipOpen,
      periodMenuOpen: eraOpen,
      jumpLabel: jumpLabel.trim(),
      periodLabel: periodLabel.trim()
    };
  });
  console.log("Command row:", commandRow);
  if (!commandRow.sameRow) fail("Layers, Period, and Jump must share one row");
  if (!commandRow.sideBySide) fail("Period must sit between Layers and Jump, not underneath");
  if (commandRow.barHeight > 56) fail(`Command row should be one compact strip, height=${commandRow.barHeight}`);
  if (commandRow.chipMenuOpen) fail("Filter list should stay closed until the dropdown is opened");
  if (commandRow.periodMenuOpen) fail("Period list should stay closed until the dropdown is opened");
  if (!/^Jump to place$/i.test(commandRow.jumpLabel)) {
    fail(`Jump idle label should be "Jump to place", got "${commandRow.jumpLabel}"`);
  }
  if (/JUMP TO ANY CITY OR REGION/i.test(commandRow.jumpLabel)) {
    fail("Jump idle label must not use the long all-caps city/region sentence");
  }
  await page.evaluate(() => (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve());
  const jumpFits = await page.evaluate(() => {
    const label = document.querySelector(".mobile-city-picker-label");
    if (!label) return { ok: false };
    return { ok: label.scrollWidth <= label.clientWidth + 2, scroll: label.scrollWidth, client: label.clientWidth };
  });
  console.log("Jump label fit:", jumpFits);
  if (!jumpFits.ok) {
    console.warn('Idle "Jump to place" is ellipsized at 390px; Riley should-fix left for Jeff phone-check');
  }
  if (!/^Period · Nativity$/i.test(commandRow.periodLabel)) {
    fail(`Period trigger should read Period · Nativity at 6 BC, got "${commandRow.periodLabel}"`);
  }
  assertTap("mobile-filter-trigger", commandRow.filter);
  assertTap("mobile-period-trigger", commandRow.period);
  assertTap("mobile-city-picker-btn", commandRow.city);
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

  await page.locator("#mobileFilterBtn").click();
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

  await page.locator("#mobilePeriodBtn").click();
  await page.waitForFunction(() => document.documentElement.classList.contains("period-menu-open"), { timeout: 3000 });
  const eraCount = await page.locator(".era-tab").count();
  if (eraCount < 8) fail(`Expected 8 era tabs in the period menu, found ${eraCount}`);
  const openEra = await page.locator(".era-tab").nth(1).boundingBox();
  assertTap("era-tab", openEra);
  await page.screenshot({ path: path.join(OUT, "phone_period_dropdown.png"), fullPage: false });
  await page.evaluate(() => {
    const tab = document.querySelectorAll(".era-tab")[1];
    if (tab) tab.click();
  });
  await page.waitForFunction(() => {
    const year = (document.getElementById("displayYear") || {}).textContent || "";
    const open = document.documentElement.classList.contains("period-menu-open");
    const label = (document.getElementById("mobilePeriodLabel") || {}).textContent || "";
    return /4 BC/.test(year) && !open && /Period · Nazareth/i.test(label);
  }, { timeout: 4000 });
  const afterPeriod = await page.evaluate(() => ({
    open: document.documentElement.classList.contains("period-menu-open"),
    label: (document.getElementById("mobilePeriodLabel") || {}).textContent || "",
    year: (document.getElementById("displayYear") || {}).textContent || "",
    eraDisplay: getComputedStyle(document.querySelector(".era-selector-tabs")).display
  }));
  if (afterPeriod.open || afterPeriod.eraDisplay !== "none") fail("Period menu should close after choosing an era");
  if (!/Period · Nazareth/i.test(afterPeriod.label)) {
    fail(`Period trigger should show Period · Nazareth, got "${afterPeriod.label}"`);
  }
  if (!/4 BC/.test(afterPeriod.year)) fail(`Choosing Nazareth should jump the timeline to 4 BC, year=${afterPeriod.year}`);

  const assertPeriodClosedBy = async (label, openAction) => {
    await page.locator("#mobilePeriodBtn").click();
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
  await page.waitForTimeout(150);

  await assertPeriodClosedBy("More", async () => {
    await page.locator("#mobileMoreBtn").click();
    await page.waitForSelector("#mobileMoreSheet.open", { timeout: 5000 });
  });
  await page.locator("#mobileMoreClose").click();
  await page.waitForTimeout(150);

  await assertPeriodClosedBy("Tours", async () => {
    await page.locator("#mobileToursBtn").click();
    await page.waitForSelector("#tourModal", { state: "visible", timeout: 5000 });
  });
  await page.locator("#closeTourModalBtn").click();
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
      fab: box(".map-floating-actions .floating-btn"),
      speed: box(".speed-btn"),
      handle: box(".sheet-handle"),
      labelSize: label ? parseFloat(getComputedStyle(label).fontSize) : null
    };
  });
  assertTap("tab-btn", taps.tab);
  assertTap("floating-btn", taps.fab);
  assertTap("speed-btn", taps.speed);
  assertTap("sheet-handle", taps.handle);
  await page.screenshot({ path: path.join(OUT, "phone_welcome_sheet.png"), fullPage: false });
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
  const jumpedPlace = await page.evaluate(() => ({
    current: (document.getElementById("mobileCityPickerCurrent") || {}).textContent || "",
    hasPlace: document.getElementById("mobileCityBar").classList.contains("has-place")
  }));
  if (!/corinth/i.test(jumpedPlace.current)) {
    fail(`After pick, Jump should show the place name, got "${jumpedPlace.current}"`);
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
    const fabs = document.querySelector(".map-floating-actions");
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
      fabLeft: fabs.getBoundingClientRect().left,
      playVisible: vis(play),
      yearVisible: vis(year),
      scrubberVisible: vis(slider),
      labelsHiddenAtDefault: !document.documentElement.classList.contains("mobile-zoomed")
    };
  });
  if (chrome.commandHeight > 56) fail(`Command row should be a single strip, height=${chrome.commandHeight}`);
  if (chrome.tabHeight > 68) fail(`Place tabs should be a single row, height=${chrome.tabHeight}`);
  if (!chrome.playVisible || !chrome.yearVisible || !chrome.scrubberVisible) {
    fail("Play, year, and scrubber must remain visible");
  }
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

  // Taller iPhone-like viewport: map must grow with the extra height
  const tallPhone = await browser.newContext({
    viewport: { width: 430, height: 932 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const tallPage = await tallPhone.newPage();
  await tallPage.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await tallPage.waitForFunction(() => window.app && window.app.map && window.app.ui, { timeout: 20000 });
  await tallPage.waitForTimeout(800);
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
  await npage.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await npage.waitForFunction(() => window.app && window.app.map, { timeout: 20000 });
  await npage.addStyleTag({ content: "html { font-size: 20px; }" });
  await npage.waitForTimeout(400);
  const narrowState = await npage.evaluate(() => {
    const filter = document.getElementById("mobileFilterBtn").getBoundingClientRect();
    const period = document.getElementById("mobilePeriodBtn").getBoundingClientRect();
    const city = document.getElementById("mobileCityPickerBtn").getBoundingClientRect();
    const bar = document.getElementById("mobileCityBar").getBoundingClientRect();
    const footer = document.querySelector(".app-timeline-footer").getBoundingClientRect();
    const slider = document.getElementById("timelineSlider").getBoundingClientRect();
    const play = document.getElementById("playPauseBtn").getBoundingClientRect();
    const year = document.getElementById("displayYear").getBoundingClientRect();
    const season = document.getElementById("displaySeason").getBoundingClientRect();
    const main = document.querySelector(".app-main-container").getBoundingClientRect();
    return {
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      sameRow: Math.abs(filter.top - period.top) < 10 && Math.abs(period.top - city.top) < 10,
      sideBySide: filter.right <= period.left + 2 && period.right <= city.left + 2,
      barHeight: bar.height,
      filterH: filter.height,
      periodH: period.height,
      cityH: city.height,
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
  if (!narrowState.sameRow || !narrowState.sideBySide) fail("360px large text must keep Layers + Period + Jump on one row");
  if (narrowState.filterH + 0.5 < 44) fail(`360 filter tap ${narrowState.filterH}px < 44`);
  if (narrowState.periodH + 0.5 < 44) fail(`360 period tap ${narrowState.periodH}px < 44`);
  if (narrowState.cityH + 0.5 < 44) fail(`360 city tap ${narrowState.cityH}px < 44`);
  if (narrowState.playH + 0.5 < 44) fail(`360 play tap ${narrowState.playH}px < 44`);
  if (!narrowState.yearVisible) fail("360px year badge must stay visible");
  if (narrowState.seasonVisible) fail("360px season subtitle must stay visually hidden");
  await npage.locator("#mobilePeriodBtn").click();
  await npage.waitForFunction(() => document.documentElement.classList.contains("period-menu-open"), { timeout: 3000 });
  const narrowEra = await npage.locator(".era-tab").first().boundingBox();
  assertTap("era-tab", narrowEra);
  await npage.locator("#mobilePeriodBtn").click();
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
    periodBtn: getComputedStyle(document.getElementById("mobilePeriodBtn")).display,
    basemap: getComputedStyle(document.getElementById("mobileBasemapToggle")).display,
    sidebar: getComputedStyle(document.getElementById("detailSidebar")).width,
    headerRight: getComputedStyle(document.querySelector(".header-right")).display
  }));
  console.log("Desktop layout:", deskState);
  if (deskState.layout.includes("layout-mobile")) fail("Desktop should not use layout-mobile");
  if (deskState.cityBar !== "none") fail("Mobile city bar should be hidden on desktop");
  if (deskState.filterBtn !== "none") fail("Mobile filter dropdown should be hidden on desktop");
  if (deskState.periodBtn !== "none") fail("Mobile period dropdown should be hidden on desktop");
  if (deskState.basemap !== "none") fail("Mobile basemap toggle should be hidden on desktop");
  await dpage.screenshot({ path: path.join(OUT, "desktop_home.png"), fullPage: false });
  await desk.close();

  await browser.close();
  console.log("✓ Browser verification passed. Shots in", OUT);
})().catch(err => {
  console.error(err);
  process.exit(1);
});
