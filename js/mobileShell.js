/**
 * Mobile / tablet shell — remaps the desktop atlas chrome for thumbs
 * without duplicating map, timeline, or place-detail logic.
 */
class MobileShell {
  constructor() {
    this.phoneQuery = window.matchMedia("(max-width: 768px)");
    this.sheetMode = "hidden";
    this.catalog = [];
    this._resizeTimer = null;
    this._drag = null;
  }

  init() {
    this.sidebar = document.getElementById("detailSidebar");
    this.sheetHandle = document.getElementById("sheetHandle");
    this.cityBtn = document.getElementById("mobileCityPickerBtn");
    this.citySheet = document.getElementById("mobileCityPickerSheet");
    this.cityList = document.getElementById("mobileCityList");
    this.citySearch = document.getElementById("mobileCitySearch");
    this.cityCurrent = document.getElementById("mobileCityPickerCurrent");
    this.moreSheet = document.getElementById("mobileMoreSheet");
    this.backdrop = document.getElementById("mobileBackdrop");
    this.searchBtn = document.getElementById("mobileSearchBtn");
    this.toursBtn = document.getElementById("mobileToursBtn");
    this.moreBtn = document.getElementById("mobileMoreBtn");
    this.filterBtn = document.getElementById("mobileFilterBtn");
    this.filterLabel = document.getElementById("mobileFilterLabel");
    this.filterDot = document.getElementById("mobileFilterDot");
    this.filterMenu = document.getElementById("mobileFilterMenu");
    this.periodBtn = document.getElementById("mobilePeriodBtn");
    this.periodLabel = document.getElementById("mobilePeriodLabel");
    this.periodMenu = document.getElementById("eraTabs");
    this.cityBar = document.getElementById("mobileCityBar");
    this.dateBadge = document.getElementById("currentDateBadge");

    this.applyLayout();
    this.bindViewport();
    this.bindHeader();
    this.bindSheet();
    this.bindFilterDropdown();
    this.bindPeriodDropdown();
    this.bindCityPicker();
    this.bindMoreSheet();
    this.bindBasemapToggle();
    this.bindMapInvalidation();
    this.bindMobileMapZoom();
    this.bindLeftMapStack();

    if (this.isPhone()) {
      this.setSheet("hidden", { silent: true });
      if (this.sidebar) this.sidebar.classList.add("closed");
      this.collapseLegend();
      this.tagPrimaryCityLabels();
    }
  }

  isPhone() {
    return this.phoneQuery.matches;
  }

  applyLayout() {
    const root = document.documentElement;
    const body = document.body;
    const phone = this.isPhone();
    root.classList.toggle("layout-mobile", phone);
    body.classList.toggle("layout-mobile", phone);
    body.classList.toggle("layout-desktop", !phone);

    if (!this.isPhone()) {
      root.classList.remove("search-open", "mobile-zoomed", "mobile-zoomed-deep", "sheet-open", "filter-menu-open", "period-menu-open");
      body.classList.remove("search-open", "sheet-open", "filter-menu-open", "period-menu-open");
      if (this.cityBar) this.cityBar.removeAttribute("aria-hidden");
      this.closeOverlays();
      if (this.sidebar) {
        this.sidebar.classList.remove("sheet-half", "sheet-full", "sheet-peek", "sheet-dragging", "closed");
        this.sidebar.style.height = "";
      }
    } else {
      this.syncZoomClass();
    }

    this.syncZoomControl();
    this.syncLeftMapStack();
    this.invalidateMap(80);
  }

  bindViewport() {
    const onChange = () => this.applyLayout();
    if (this.phoneQuery.addEventListener) {
      this.phoneQuery.addEventListener("change", onChange);
    } else {
      this.phoneQuery.addListener(onChange);
    }

    window.addEventListener("orientationchange", () => {
      this.invalidateMap(180);
      setTimeout(() => this.invalidateMap(320), 320);
    });
  }

  bindMapInvalidation() {
    const schedule = () => this.invalidateMap(60);
    window.addEventListener("resize", schedule);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", schedule);
    }
  }

  invalidateMap(delay = 40) {
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(() => {
      const map = window.app && window.app.map && window.app.map.map;
      if (map && typeof map.invalidateSize === "function") {
        map.invalidateSize({ animate: false, pan: false });
      }
      this.syncLeftMapStack();
    }, delay);
  }

  syncZoomControl() {
    const map = window.app && window.app.map && window.app.map.map;
    if (!map || !map.zoomControl) return;
    map.zoomControl.setPosition(this.isPhone() ? "topright" : "topleft");
  }

  bindLeftMapStack() {
    const badge = document.getElementById("floatingEraBadge");
    if (badge && !badge.__leftStackObs) {
      badge.__leftStackObs = new MutationObserver(() => this.syncLeftMapStack());
      badge.__leftStackObs.observe(badge, { childList: true, subtree: true, characterData: true });
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => this.syncLeftMapStack()).catch(() => {});
    }
    this.syncLeftMapStack();
  }

  syncLeftMapStack() {
    const root = document.documentElement;
    const badge = document.getElementById("floatingEraBadge");
    if (!this.isPhone()) {
      root.style.removeProperty("--left-fab-top");
      root.style.removeProperty("--zoom-stack-top");
      if (badge) badge.style.maxWidth = "";
      return;
    }

    const main = document.querySelector(".app-main-container");
    const toggle = document.getElementById("mobileBasemapToggle");
    const mainTop = main ? main.getBoundingClientRect().top : 0;

    if (badge && badge.offsetParent && toggle && toggle.offsetParent) {
      const sideGap = 10;
      const maxW = Math.floor(toggle.getBoundingClientRect().left - badge.getBoundingClientRect().left - sideGap);
      badge.style.maxWidth = `${Math.max(96, maxW)}px`;
    }

    if (badge && badge.offsetParent) {
      const gap = 8;
      const top = Math.ceil(badge.getBoundingClientRect().bottom - mainTop + gap);
      root.style.setProperty("--left-fab-top", `${Math.max(top, 56)}px`);
    }

    if (toggle && toggle.offsetParent) {
      const gap = 10;
      const top = Math.ceil(toggle.getBoundingClientRect().bottom - mainTop + gap);
      const fallback = 8 + 44 + 10;
      root.style.setProperty("--zoom-stack-top", `${Math.max(top, fallback)}px`);
    }
  }

  bindMobileMapZoom() {
    const attach = () => {
      const map = window.app && window.app.map && window.app.map.map;
      if (!map || map.__mobileZoomBound) return !!map;
      map.__mobileZoomBound = true;
      map.on("zoomend", () => this.syncZoomClass());
      this.syncZoomClass();
      this.tagPrimaryCityLabels();
      return true;
    };
    if (!attach()) {
      let tries = 0;
      const timer = setInterval(() => {
        tries += 1;
        if (attach() || tries > 40) clearInterval(timer);
      }, 150);
    }
  }

  syncZoomClass() {
    const root = document.documentElement;
    if (!this.isPhone()) {
      root.classList.remove("mobile-zoomed", "mobile-zoomed-deep");
      return;
    }
    const map = window.app && window.app.map && window.app.map.map;
    if (!map) return;
    const zoom = map.getZoom();
    root.classList.toggle("mobile-zoomed", zoom >= 8);
    root.classList.toggle("mobile-zoomed-deep", zoom >= 10.5);
  }

  tagPrimaryCityLabels() {
    const primary = new Set([
      "Jerusalem", "Nazareth", "Bethlehem", "Capernaum", "Rome", "Corinth",
      "Ephesus", "Antioch", "Athens", "Damascus", "Alexandria", "Patmos"
    ]);
    document.querySelectorAll(".city-label-text").forEach((el) => {
      if (primary.has((el.textContent || "").trim())) {
        el.classList.add("city-label-primary");
      }
    });
  }

  bindHeader() {
    if (this.searchBtn) {
      this.searchBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = document.body.classList.toggle("search-open");
        document.documentElement.classList.toggle("search-open", open);
        this.searchBtn.setAttribute("aria-expanded", open ? "true" : "false");
        if (open) {
          this.closeFilterMenu();
          const input = document.getElementById("globalSearchInput");
          if (input) input.focus();
        }
      });
    }

    if (this.toursBtn) {
      this.toursBtn.addEventListener("click", () => {
        this.closeSearch();
        this.closeFilterMenu();
        this.closeOverlays();
        const desktopTours = document.getElementById("storyToursBtn");
        if (desktopTours) desktopTours.click();
      });
    }

    if (this.moreBtn) {
      this.moreBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.closeSearch();
        this.closeFilterMenu();
        this.openMoreSheet();
      });
    }

    document.addEventListener("click", (e) => {
      if (!document.documentElement.classList.contains("search-open") && !document.body.classList.contains("search-open")) return;
      if (e.target.closest(".header-center") || e.target.closest("#mobileSearchBtn")) return;
      this.closeSearch();
    });
  }

  closeSearch() {
    document.documentElement.classList.remove("search-open");
    document.body.classList.remove("search-open");
    if (this.searchBtn) this.searchBtn.setAttribute("aria-expanded", "false");
  }

  collapseLegend() {
    const legendBody = document.getElementById("legendBody");
    const legendCollapseBtn = document.getElementById("legendCollapseBtn");
    if (legendBody) legendBody.style.display = "none";
    if (legendCollapseBtn) legendCollapseBtn.textContent = "+";
  }

  bindSheet() {
    if (!this.sidebar || !this.sheetHandle) return;

    this.sheetHandle.addEventListener("pointerdown", (e) => this.beginSheetDrag(e));
    this.sheetHandle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.cycleSheet();
      }
    });
    this.sheetHandle.addEventListener("click", (e) => {
      if (this._didDrag) return;
      e.preventDefault();
      this.cycleSheet();
    });
  }

  beginSheetDrag(e) {
    if (!this.isPhone()) return;
    this._didDrag = false;
    const startY = e.clientY;
    const startH = this.sidebar.getBoundingClientRect().height;
    this.sidebar.classList.add("sheet-dragging");
    this.sidebar.classList.remove("closed");
    try { this.sheetHandle.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }

    const onMove = (ev) => {
      const dy = startY - ev.clientY;
      if (Math.abs(dy) > 6) this._didDrag = true;
      const maxH = Math.round(window.innerHeight * 0.9);
      const next = Math.max(72, Math.min(maxH, startH + dy));
      this.sidebar.style.height = `${next}px`;
    };

    const onUp = () => {
      this.sheetHandle.removeEventListener("pointermove", onMove);
      this.sheetHandle.removeEventListener("pointerup", onUp);
      this.sheetHandle.removeEventListener("pointercancel", onUp);
      this.sidebar.classList.remove("sheet-dragging");
      const h = this.sidebar.getBoundingClientRect().height;
      const vh = window.innerHeight;
      this.sidebar.style.height = "";
      if (h < vh * 0.22) {
        this.onSidebarClosed();
        if (this.sidebar) this.sidebar.classList.add("closed");
      } else if (h < vh * 0.64) {
        this.setSheet("half");
      } else {
        this.setSheet("full");
      }
    };

    this.sheetHandle.addEventListener("pointermove", onMove);
    this.sheetHandle.addEventListener("pointerup", onUp);
    this.sheetHandle.addEventListener("pointercancel", onUp);
  }

  cycleSheet() {
    if (!this.isPhone()) return;
    if (this.sheetMode === "hidden" || this.sheetMode === "peek") this.setSheet("half");
    else if (this.sheetMode === "half") this.setSheet("full");
    else this.setSheet("half");
  }

  setSheet(mode, opts = {}) {
    this.sheetMode = mode;
    if (!this.sidebar) return;
    this.sidebar.classList.remove("sheet-hidden", "sheet-peek", "sheet-half", "sheet-full");
    if (mode === "hidden") {
      this.sidebar.classList.add("closed");
    } else {
      this.sidebar.classList.remove("closed");
      this.sidebar.classList.add(`sheet-${mode}`);
    }
    const sheetOpen = this.isPhone() && mode !== "hidden";
    document.documentElement.classList.toggle("sheet-open", sheetOpen);
    document.body.classList.toggle("sheet-open", sheetOpen);
    if (this.cityBar) this.cityBar.setAttribute("aria-hidden", sheetOpen ? "true" : "false");
    if (sheetOpen) {
      this.closeFilterMenu();
      this.closePeriodMenu();
    }
    if (!opts.silent) this.invalidateMap(320);
  }

  onSidebarOpened() {
    if (!this.isPhone()) {
      this.invalidateMap(320);
      return;
    }
    this.closeSearch();
    this.setSheet(this.sheetMode === "full" ? "full" : "half");
    this.nudgeMapForSheet();
  }

  onSidebarClosed() {
    if (!this.isPhone()) {
      this.invalidateMap(320);
      return;
    }
    this.setSheet("hidden");
  }

  nudgeMapForSheet() {
    const map = window.app && window.app.map && window.app.map.map;
    if (!map || !this.sidebar) return;
    const shift = Math.round(this.sidebar.getBoundingClientRect().height * 0.28);
    if (shift < 24) return;
    setTimeout(() => {
      map.panBy([0, shift], { animate: true, duration: 0.35 });
    }, 400);
  }

  bindFilterDropdown() {
    if (!this.filterBtn) return;

    this.filterBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.closeSearch();
      this.closePeriodMenu();
      if (this.isFilterMenuOpen()) this.closeFilterMenu();
      else this.openFilterMenu();
    });

    document.addEventListener("click", (e) => {
      if (!this.isFilterMenuOpen()) return;
      if (e.target.closest("#mobileFilterBtn") || e.target.closest("#mobileFilterMenu")) return;
      this.closeFilterMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isFilterMenuOpen()) this.closeFilterMenu();
    });

    document.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => this.syncFilterLabel());
    });

    this.syncFilterLabel();
  }

  isFilterMenuOpen() {
    return document.documentElement.classList.contains("filter-menu-open");
  }

  openFilterMenu() {
    if (this.citySheet && this.citySheet.classList.contains("open")) this.closeOverlays();
    document.documentElement.classList.add("filter-menu-open");
    document.body.classList.add("filter-menu-open");
    this.filterBtn.setAttribute("aria-expanded", "true");
    if (this.filterMenu) this.filterMenu.setAttribute("role", "listbox");
  }

  closeFilterMenu() {
    document.documentElement.classList.remove("filter-menu-open");
    document.body.classList.remove("filter-menu-open");
    if (this.filterBtn) this.filterBtn.setAttribute("aria-expanded", "false");
  }

  syncFilterLabel() {
    const chips = [...document.querySelectorAll(".filter-chip")];
    const active = chips.filter((chip) => chip.classList.contains("active"));
    const names = active.map((chip) => (chip.textContent || "").replace(/\s+/g, " ").trim());
    let label = "Layers";
    let dotClass = "";

    if (active.some((chip) => chip.dataset.filter === "all") || names.includes("All Visible")) {
      label = "All Visible";
      dotClass = "dot-all";
    } else if (names.length === 1) {
      label = names[0];
      const key = active[0].dataset.filter;
      const mapped = {
        savior: "dot-savior",
        diaspora: "dot-diaspora",
        churches: "dot-church",
        journeys: "dot-journey",
        heatmaps: "dot-heatmap",
        provinces: "dot-provinces",
        jerusalemSites: "dot-jerusalem",
        jerusalemGeography: "dot-jerusalem-geo"
      };
      dotClass = mapped[key] || "";
    } else if (names.length > 1) {
      label = `${names[0]} +${names.length - 1}`;
      dotClass = "dot-all";
    }

    if (this.filterLabel) this.filterLabel.textContent = label;
    if (this.filterDot) {
      this.filterDot.className = `mobile-filter-dot ${dotClass}`.trim();
    }
    if (this.filterBtn) {
      this.filterBtn.setAttribute("aria-label", `Map layers, ${label}`);
    }
  }

  bindPeriodDropdown() {
    if (!this.periodBtn) return;

    this.periodBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.closeSearch();
      this.closeFilterMenu();
      if (this.isPeriodMenuOpen()) this.closePeriodMenu();
      else this.openPeriodMenu();
    });

    document.addEventListener("click", (e) => {
      if (!this.isPeriodMenuOpen()) return;
      if (e.target.closest("#mobilePeriodBtn") || e.target.closest("#eraTabs")) return;
      this.closePeriodMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isPeriodMenuOpen()) this.closePeriodMenu();
    });

    document.querySelectorAll(".era-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        this.syncPeriodLabel();
        this.closePeriodMenu();
      });
    });

    const eraHost = this.periodMenu;
    if (eraHost && !eraHost.__periodLabelObs) {
      eraHost.__periodLabelObs = new MutationObserver(() => this.syncPeriodLabel());
      eraHost.__periodLabelObs.observe(eraHost, {
        subtree: true,
        attributes: true,
        attributeFilter: ["class"],
        childList: true,
        characterData: true
      });
    }

    if (this.dateBadge && !this.dateBadge.__yearAriaObs) {
      this.dateBadge.__yearAriaObs = new MutationObserver(() => this.syncYearBadgeAria());
      this.dateBadge.__yearAriaObs.observe(this.dateBadge, {
        subtree: true,
        childList: true,
        characterData: true
      });
    }

    this.syncPeriodLabel();
    this.syncYearBadgeAria();
  }

  isPeriodMenuOpen() {
    return document.documentElement.classList.contains("period-menu-open");
  }

  openPeriodMenu() {
    if (this.citySheet && this.citySheet.classList.contains("open")) this.closeOverlays();
    document.documentElement.classList.add("period-menu-open");
    document.body.classList.add("period-menu-open");
    this.periodBtn.setAttribute("aria-expanded", "true");
    if (this.periodMenu) this.periodMenu.setAttribute("role", "listbox");
  }

  closePeriodMenu() {
    document.documentElement.classList.remove("period-menu-open");
    document.body.classList.remove("period-menu-open");
    if (this.periodBtn) this.periodBtn.setAttribute("aria-expanded", "false");
  }

  shortEraName(tab) {
    const text = ((tab && tab.textContent) || "").replace(/\s+/g, " ").trim();
    const cut = text.replace(/\s*[\(（].*$/, "").trim();
    return cut || text || "Period";
  }

  syncPeriodLabel() {
    const active = document.querySelector(".era-tab.active") || document.querySelector(".era-tab");
    const name = this.shortEraName(active);
    const label = `Period · ${name}`;
    if (this.periodLabel) this.periodLabel.textContent = label;
    if (this.periodBtn) {
      this.periodBtn.setAttribute("aria-label", `Timeline period, ${name}`);
    }
  }

  syncYearBadgeAria() {
    if (!this.dateBadge) return;
    const yearEl = document.getElementById("displayYear");
    const seasonEl = document.getElementById("displaySeason");
    const year = (yearEl && yearEl.textContent) || "";
    const season = (seasonEl && seasonEl.textContent) || "";
    const parts = [year.trim(), season.trim()].filter(Boolean);
    if (parts.length) this.dateBadge.setAttribute("aria-label", parts.join(", "));
    if (seasonEl && this.isPhone()) seasonEl.setAttribute("aria-hidden", "true");
    else if (seasonEl) seasonEl.removeAttribute("aria-hidden");
  }

  bindCityPicker() {
    if (!this.cityBtn) return;

    this.cityBtn.addEventListener("click", () => {
      this.closeSearch();
      this.closeFilterMenu();
      this.closePeriodMenu();
      this.openCityPicker();
    });

    const closeBtn = document.getElementById("mobileCityPickerClose");
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeOverlays());

    if (this.citySearch) {
      this.citySearch.addEventListener("input", () => this.renderCityList(this.citySearch.value));
    }

    if (this.cityList) {
      this.cityList.addEventListener("click", (e) => {
        const item = e.target.closest("[data-jump-value]");
        if (!item) return;
        this.choosePlace(item.dataset.jumpValue, item.textContent.trim());
      });
    }
  }

  openCityPicker() {
    this.refreshCatalog();
    this.renderCityList(this.citySearch ? this.citySearch.value : "");
    this.citySheet.hidden = false;
    this.citySheet.classList.add("open");
    this.showBackdrop();
    this.cityBtn.setAttribute("aria-expanded", "true");
    if (this.citySearch) {
      this.citySearch.value = "";
      this.renderCityList("");
      setTimeout(() => this.citySearch.focus(), 80);
    }
  }

  refreshCatalog() {
    if (window.app && window.app.ui && typeof window.app.ui.getQuickJumpCatalog === "function") {
      this.catalog = window.app.ui.getQuickJumpCatalog();
    }
  }

  renderCityList(query) {
    if (!this.cityList) return;
    this.refreshCatalog();
    const q = (query || "").trim().toLowerCase();
    const html = [];

    this.catalog.forEach(group => {
      const items = group.items.filter(item => {
        if (!q) return true;
        return (item.searchText || item.label).toLowerCase().includes(q) || item.label.toLowerCase().includes(q);
      });
      if (!items.length) return;
      html.push(`<div class="mobile-picker-group-label">${group.label}</div>`);
      items.forEach(item => {
        html.push(`<button type="button" class="mobile-picker-item" data-jump-value="${item.value}">${item.label}</button>`);
      });
    });

    this.cityList.innerHTML = html.length
      ? html.join("")
      : `<div class="mobile-picker-empty">No matching cities, sites, or regions.</div>`;
  }

  choosePlace(value, label) {
    this.closeOverlays();
    if (this.cityCurrent && label) {
      this.cityCurrent.textContent = label;
      if (this.cityBar) this.cityBar.classList.add("has-place");
    }
    if (window.app && window.app.ui) {
      window.app.ui.jumpToQuickJumpValue(value);
    }
  }

  bindBasemapToggle() {
    const root = document.getElementById("mobileBasemapToggle");
    if (!root) return;

    root.addEventListener("click", (e) => {
      const more = e.target.closest("#mobileBasemapMoreBtn");
      if (more) {
        e.preventDefault();
        this.closeSearch();
        this.openMoreSheet();
        return;
      }
      const btn = e.target.closest("[data-style]");
      if (!btn) return;
      const src = document.querySelector(`#mapStyleDropdown [data-style="${btn.dataset.style}"]`);
      if (src) src.click();
      this.syncBasemapToggle();
    });

    this.syncBasemapToggle();
  }

  syncBasemapToggle() {
    const theme = (window.app && window.app.map && window.app.map.currentTheme) || "parchment";
    document.querySelectorAll("#mobileBasemapToggle [data-style]").forEach((btn) => {
      const style = btn.dataset.style;
      const on = style === theme || (style === "satellite" && theme === "modern-satellite");
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  bindMoreSheet() {
    const closeBtn = document.getElementById("mobileMoreClose");
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeOverlays());

    const openPanel = document.getElementById("mobileOpenPanelBtn");
    if (openPanel) {
      openPanel.addEventListener("click", () => {
        this.closeOverlays();
        if (window.app && window.app.ui) window.app.ui.openSidebar();
      });
    }

    if (this.backdrop) {
      this.backdrop.addEventListener("click", () => this.closeOverlays());
    }
  }

  openMoreSheet() {
    this.populateMoreLists();
    this.moreSheet.hidden = false;
    this.moreSheet.classList.add("open");
    this.showBackdrop();
    if (this.moreBtn) this.moreBtn.setAttribute("aria-expanded", "true");
  }

  populateMoreLists() {
    const styleHost = document.getElementById("mobileMapStyleList");
    const regionHost = document.getElementById("mobileRegionList");
    if (styleHost && !styleHost.dataset.ready) {
      document.querySelectorAll("#mapStyleDropdown .dropdown-item").forEach(src => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "mobile-more-item";
        btn.textContent = src.textContent.trim();
        btn.addEventListener("click", () => {
          this.closeOverlays();
          src.click();
          this.syncBasemapToggle();
        });
        styleHost.appendChild(btn);
      });
      styleHost.dataset.ready = "1";
    }
    if (regionHost && !regionHost.dataset.ready) {
      document.querySelectorAll("#regionDropdown .dropdown-item").forEach(src => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "mobile-more-item";
        btn.textContent = src.textContent.trim();
        btn.addEventListener("click", () => {
          this.closeOverlays();
          src.click();
        });
        regionHost.appendChild(btn);
      });
      regionHost.dataset.ready = "1";
    }
  }

  showBackdrop() {
    if (!this.backdrop) return;
    this.backdrop.hidden = false;
    this.backdrop.classList.add("visible");
  }

  closeOverlays() {
    if (this.citySheet) {
      this.citySheet.classList.remove("open");
      this.citySheet.hidden = true;
    }
    if (this.moreSheet) {
      this.moreSheet.classList.remove("open");
      this.moreSheet.hidden = true;
    }
    if (this.backdrop) {
      this.backdrop.classList.remove("visible");
      this.backdrop.hidden = true;
    }
    if (this.cityBtn) this.cityBtn.setAttribute("aria-expanded", "false");
    if (this.moreBtn) this.moreBtn.setAttribute("aria-expanded", "false");
    this.closeFilterMenu();
    this.closePeriodMenu();
  }
}
