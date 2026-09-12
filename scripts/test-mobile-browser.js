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

  const cityBar = page.locator("#mobileCityPickerBtn");
  if (!(await cityBar.isVisible())) fail("City picker bar not visible on phone");

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
  await page.screenshot({ path: path.join(OUT, "phone_welcome_sheet.png"), fullPage: false });
  await page.locator("#closeSidebarBtn").click();
  await page.waitForTimeout(250);

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
    const chips = document.querySelector(".filter-chip-rows");
    const tabs = document.querySelector(".sidebar-tabs");
    const eras = document.querySelector(".era-selector-tabs");
    const fabs = document.querySelector(".map-floating-actions");
    const chipRect = chips.getBoundingClientRect();
    const tabRect = tabs.getBoundingClientRect();
    return {
      chipHeight: chipRect.height,
      chipScroll: chips.scrollWidth > chips.clientWidth - 1,
      tabHeight: tabRect.height,
      tabScroll: tabs.scrollWidth > tabs.clientWidth - 4,
      eraOverflow: getComputedStyle(eras).overflowX,
      fabLeft: fabs.getBoundingClientRect().left,
      labelsHiddenAtDefault: !document.documentElement.classList.contains("mobile-zoomed")
    };
  });
  if (chrome.chipHeight > 52) fail(`Layer chips should be a single row, height=${chrome.chipHeight}`);
  if (chrome.tabHeight > 56) fail(`Place tabs should be a single row, height=${chrome.tabHeight}`);
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
    return {
      zoomLeft: zoom ? zoom.getBoundingClientRect().left : -1,
      fabLeft: fabs.getBoundingClientRect().left,
      labels,
      zoomClass: document.documentElement.classList.contains("mobile-zoomed")
    };
  });
  if (holy.zoomLeft > 120) fail(`Zoom control should be bottom-left on Holy Land, left=${holy.zoomLeft}`);
  if (holy.labels.some(n => /smyrna/i.test(n))) fail("Smyrna label should stay hidden at Holy Land zoom");
  await page.screenshot({ path: path.join(OUT, "phone_holy_land.png"), fullPage: false });

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
    sidebar: getComputedStyle(document.getElementById("detailSidebar")).width,
    headerRight: getComputedStyle(document.querySelector(".header-right")).display
  }));
  console.log("Desktop layout:", deskState);
  if (deskState.layout.includes("layout-mobile")) fail("Desktop should not use layout-mobile");
  if (deskState.cityBar !== "none") fail("Mobile city bar should be hidden on desktop");
  await dpage.screenshot({ path: path.join(OUT, "desktop_home.png"), fullPage: false });
  await desk.close();

  await browser.close();
  console.log("✓ Browser verification passed. Shots in", OUT);
})().catch(err => {
  console.error(err);
  process.exit(1);
});
