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
    this.navSheet = document.getElementById("mobileNavSheet");
    this.aboutSheet = document.getElementById("mobileAboutSheet");
    this.menuBtn = document.getElementById("mobileMenuBtn");
    this.backdrop = document.getElementById("mobileBackdrop");
    this.searchBtn = document.getElementById("mobileSearchBtn");
    this.toursBtn = document.getElementById("mobileToursBtn");
    this.moreBtn = document.getElementById("mobileMoreBtn");
    this.navLayersDetail = document.getElementById("mobileNavLayersDetail");
    this.navLayersDot = document.getElementById("mobileNavLayersDot");
    this.navPeriodDetail = document.getElementById("mobileNavPeriodDetail");
    this.navJumpDetail = document.getElementById("mobileNavJumpDetail");
    this.navBasemapDetail = document.getElementById("mobileNavBasemapDetail");
    this.filterBtn = document.getElementById("mobileFilterBtn");
    this.filterLabel = document.getElementById("mobileFilterLabel");
    this.filterDot = document.getElementById("mobileFilterDot");
    this.filterMenu = document.getElementById("mobileFilterMenu");
    this.filterSubtitle = document.getElementById("mobileFilterSubtitle");
    this.periodBtn = document.getElementById("mobilePeriodBtn");
    this.periodLabel = document.getElementById("mobilePeriodLabel");
    this.periodSubtitle = document.getElementById("mobilePeriodSubtitle");
    this.periodMenu = document.getElementById("eraTabs");
    this.jumpLabel = document.querySelector(".mobile-city-picker-label");
    this.jumpSubtitle = document.getElementById("mobileJumpSubtitle");
    this.legendEl = document.getElementById("mapLegend");
    this.legendBody = document.getElementById("legendBody");
    this.legendCollapseBtn = document.getElementById("legendCollapseBtn");
    this.cityBar = document.getElementById("mobileCityBar");
    this.dateBadge = document.getElementById("currentDateBadge");

    this.applyLayout();
    this.bindViewport();
    this.bindHeader();
    this.bindHamburgerMenu();
    this.bindSheet();
    this.bindFilterDropdown();
    this.bindPeriodDropdown();
    this.bindCityPicker();
    this.bindLegendSheet();
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
      root.classList.remove("search-open", "mobile-zoomed", "mobile-zoomed-deep", "sheet-open", "filter-menu-open", "period-menu-open", "legend-sheet-open", "nav-menu-open", "basemap-submenu-open");
      body.classList.remove("search-open", "sheet-open", "filter-menu-open", "period-menu-open", "legend-sheet-open", "nav-menu-open", "basemap-submenu-open");
      this.closeBasemapSubmenu();
      if (this.cityBar) this.cityBar.removeAttribute("aria-hidden");
      this.closeOverlays();
      this.restoreDesktopLegend();
      if (this.sidebar) {
        this.sidebar.classList.remove("sheet-half", "sheet-full", "sheet-peek", "sheet-dragging", "closed");
        this.sidebar.style.height = "";
      }
    } else {
      this.syncZoomClass();
    }

    this.syncViewportHeight();
    this.syncZoomControl();
    this.syncLeftMapStack();
    this.invalidateMap(80);
  }

  syncViewportHeight() {
    const root = document.documentElement;
    if (!this.isPhone()) {
      root.style.removeProperty("--app-vh");
      return;
    }
    const vv = window.visualViewport;
    const next = Math.round((vv && vv.height) || window.innerHeight);
    if (next > 0) {
      root.style.setProperty("--app-vh", `${next}px`);
    }
  }

  bindViewport() {
    const onChange = () => this.applyLayout();
    if (this.phoneQuery.addEventListener) {
      this.phoneQuery.addEventListener("change", onChange);
    } else {
      this.phoneQuery.addListener(onChange);
    }

    window.addEventListener("orientationchange", () => {
      this.syncViewportHeight();
      this.invalidateMap(180);
      setTimeout(() => this.invalidateMap(320), 320);
    });
  }

  bindMapInvalidation() {
    const schedule = () => this.invalidateMap(60);
    window.addEventListener("resize", schedule);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", schedule);
      window.visualViewport.addEventListener("scroll", schedule);
    }
  }

  invalidateMap(delay = 40) {
    this.syncViewportHeight();
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(() => {
      this.syncViewportHeight();
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
    const el = typeof map.zoomControl.getContainer === "function"
      ? map.zoomControl.getContainer()
      : null;
    if (this.isPhone()) {
      if (el) el.style.display = "none";
      return;
    }
    if (el) el.style.display = "";
    map.zoomControl.setPosition("topleft");
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
          this.closeChromeMenus();
          this.closeNavSheet();
          this.collapseLegend();
          this.syncBackdrop();
          const input = document.getElementById("globalSearchInput");
          if (input) input.focus();
        }
      });
    }

    if (this.toursBtn) {
      this.toursBtn.addEventListener("click", () => {
        this.closeSearch();
        this.closeChromeMenus();
        this.closeNavSheet();
        this.collapseLegend();
        this.closeOverlays();
        const desktopTours = document.getElementById("storyToursBtn");
        if (desktopTours) desktopTours.click();
      });
    }

    if (this.moreBtn) {
      this.moreBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.closeSearch();
        this.closeChromeMenus();
        this.collapseLegend();
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

  bindHamburgerMenu() {
    if (this.menuBtn) {
      this.menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (this.isNavMenuOpen()) {
          this.closeNavSheet();
          this.syncBackdrop();
        } else {
          this.openNavSheet();
        }
      });
    }

    const navClose = document.getElementById("mobileNavClose");
    if (navClose) navClose.addEventListener("click", () => this.closeOverlays());

    const aboutClose = document.getElementById("mobileAboutClose");
    if (aboutClose) aboutClose.addEventListener("click", () => this.closeOverlays());

    const bindNav = (id, handler) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        handler();
      });
    };

    bindNav("mobileNavLayers", () => {
      this.closeNavSheet();
      this.openFilterMenu();
    });
    bindNav("mobileNavPeriod", () => {
      this.closeNavSheet();
      this.openPeriodMenu();
    });
    bindNav("mobileNavJump", () => {
      this.closeNavSheet();
      this.openCityPicker();
    });
    bindNav("mobileNavLegend", () => {
      this.closeNavSheet();
      this.openLegendSheet();
    });
    bindNav("mobileNavBasemap", () => {
      this.toggleBasemapSubmenu();
    });
    bindNav("mobileNavAbout", () => {
      this.closeNavSheet();
      this.openAboutSheet();
    });

    const bindAtlasTool = (id, targetId) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        this.closeOverlays();
        const src = document.getElementById(targetId);
        if (src) src.click();
      });
    };
    bindAtlasTool("mobileNavRecenter", "recenterBtn");
    bindAtlasTool("mobileNavHolyLand", "holyLandQuickBtn");
    bindAtlasTool("mobileNavJerusalem", "jerusalemQuickBtn");

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (this.isNavMenuOpen() || this.isAboutOpen()) {
        this.closeOverlays();
      }
    });
  }

  isNavMenuOpen() {
    return document.documentElement.classList.contains("nav-menu-open");
  }

  isAboutOpen() {
    return !!(this.aboutSheet && this.aboutSheet.classList.contains("open"));
  }

  openNavSheet() {
    if (!this.isPhone() || !this.navSheet) return;
    this.closeSearch();
    this.closeChromeMenus();
    this.closeJumpAndMore();
    this.collapseLegend();
    this.syncNavDetails();
    this.navSheet.hidden = false;
    this.navSheet.classList.add("open");
    document.documentElement.classList.add("nav-menu-open");
    document.body.classList.add("nav-menu-open");
    if (this.menuBtn) this.menuBtn.setAttribute("aria-expanded", "true");
    this.showBackdrop();
  }

  closeNavSheet() {
    if (this.navSheet) {
      this.navSheet.classList.remove("open");
      this.navSheet.hidden = true;
    }
    this.closeBasemapSubmenu();
    document.documentElement.classList.remove("nav-menu-open");
    document.body.classList.remove("nav-menu-open");
    if (this.menuBtn) this.menuBtn.setAttribute("aria-expanded", "false");
  }

  isBasemapSubmenuOpen() {
    const panel = document.getElementById("mobileNavBasemapPanel");
    return !!(panel && panel.classList.contains("open"));
  }

  toggleBasemapSubmenu() {
    if (this.isBasemapSubmenuOpen()) this.closeBasemapSubmenu();
    else this.openBasemapSubmenu();
  }

  openBasemapSubmenu() {
    const panel = document.getElementById("mobileNavBasemapPanel");
    const btn = document.getElementById("mobileNavBasemap");
    if (panel) {
      panel.hidden = false;
      panel.classList.add("open");
    }
    if (btn) btn.setAttribute("aria-expanded", "true");
    document.documentElement.classList.add("basemap-submenu-open");
    document.body.classList.add("basemap-submenu-open");
    this.syncBasemapToggle();
  }

  closeBasemapSubmenu() {
    const panel = document.getElementById("mobileNavBasemapPanel");
    const btn = document.getElementById("mobileNavBasemap");
    if (panel) {
      panel.classList.remove("open");
      panel.hidden = true;
    }
    if (btn) btn.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("basemap-submenu-open");
    document.body.classList.remove("basemap-submenu-open");
  }

  openAboutSheet() {
    if (!this.aboutSheet) return;
    this.closeChromeMenus();
    this.closeJumpAndMore();
    this.collapseLegend();
    this.aboutSheet.hidden = false;
    this.aboutSheet.classList.add("open");
    this.showBackdrop();
  }

  closeAboutSheet() {
    if (this.aboutSheet) {
      this.aboutSheet.classList.remove("open");
      this.aboutSheet.hidden = true;
    }
  }

  syncNavDetails() {
    if (this.navLayersDetail && this.filterSubtitle) {
      this.navLayersDetail.textContent = this.filterSubtitle.textContent || "Map overlays";
    }
    if (this.navLayersDot && this.filterDot) {
      const extra = [...this.filterDot.classList].filter((c) => c !== "mobile-filter-dot").join(" ");
      this.navLayersDot.className = `mobile-nav-dot ${extra}`.trim();
    }
    if (this.navPeriodDetail && this.periodSubtitle) {
      this.navPeriodDetail.textContent = this.periodSubtitle.textContent || "Period";
    }
    if (this.navJumpDetail) {
      const current = ((this.cityCurrent && this.cityCurrent.textContent) || "").trim();
      const hasPlace = this.cityBar && this.cityBar.classList.contains("has-place") && current &&
        !/searchable list/i.test(current);
      this.navJumpDetail.textContent = hasPlace ? current : "Search cities & sites";
    }
    if (this.navBasemapDetail) {
      const theme = (window.app && window.app.map && window.app.map.currentTheme) || "parchment";
      this.navBasemapDetail.textContent = theme === "satellite" || theme === "modern-satellite"
        ? "Satellite terrain"
        : "Ancient relief";
    }
  }

  closeChromeMenus() {
    this.closeFilterMenu();
    this.closePeriodMenu();
  }

  collapseLegend() {
    const legendBody = this.legendBody || document.getElementById("legendBody");
    const legendCollapseBtn = this.legendCollapseBtn || document.getElementById("legendCollapseBtn");
    const legend = this.legendEl || document.getElementById("mapLegend");
    if (legendBody) legendBody.style.display = "none";
    if (legendCollapseBtn) legendCollapseBtn.textContent = "+";
    if (legend) {
      legend.classList.remove("legend-open");
      legend.setAttribute("aria-expanded", "false");
      if (this.isPhone()) legend.style.display = "none";
    }
    document.documentElement.classList.remove("legend-sheet-open");
    document.body.classList.remove("legend-sheet-open");
  }

  restoreDesktopLegend() {
    const legend = this.legendEl || document.getElementById("mapLegend");
    const legendBody = this.legendBody || document.getElementById("legendBody");
    const legendCollapseBtn = this.legendCollapseBtn || document.getElementById("legendCollapseBtn");
    if (legend) {
      legend.classList.remove("legend-open");
      legend.removeAttribute("aria-expanded");
    }
    document.documentElement.classList.remove("legend-sheet-open");
    document.body.classList.remove("legend-sheet-open");
    if (legendBody && legendBody.style.display === "none") {
      legendBody.style.display = "flex";
    }
    if (legendCollapseBtn) legendCollapseBtn.textContent = "−";
    if (window.app && window.app.map && typeof window.app.map.updateLegend === "function") {
      window.app.map.updateLegend();
    }
  }

  isLegendOpen() {
    return document.documentElement.classList.contains("legend-sheet-open");
  }

  openLegendSheet() {
    if (!this.isPhone()) return;
    this.closeSearch();
    this.closeChromeMenus();
    this.closeNavSheet();
    this.closeAboutSheet();
    this.closeJumpAndMore();
    const legendBody = this.legendBody || document.getElementById("legendBody");
    const legendCollapseBtn = this.legendCollapseBtn || document.getElementById("legendCollapseBtn");
    const legend = this.legendEl || document.getElementById("mapLegend");
    if (legendBody) legendBody.style.display = "flex";
    if (legendCollapseBtn) legendCollapseBtn.textContent = "−";
    if (legend) {
      legend.style.display = "block";
      legend.classList.add("legend-open");
      legend.setAttribute("aria-expanded", "true");
    }
    document.documentElement.classList.add("legend-sheet-open");
    document.body.classList.add("legend-sheet-open");
    this.showBackdrop();
  }

  bindLegendSheet() {
    const header = document.getElementById("legendToggleHeader");
    if (!header || header.__mobileLegendBound) return;
    header.__mobileLegendBound = true;
    header.addEventListener("click", () => {
      if (!this.isPhone()) return;
      if (this.isLegendOpen()) {
        this.collapseLegend();
        this.syncBackdrop();
      } else {
        this.openLegendSheet();
      }
    });
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
      this.closeNavSheet();
      this.closeAboutSheet();
      this.closeChromeMenus();
      this.collapseLegend();
      this.syncBackdrop();
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
      if (this.isFilterMenuOpen()) {
        this.closeChromeMenus();
        this.syncBackdrop();
      } else {
        this.openFilterMenu();
      }
    });

    document.addEventListener("click", (e) => {
      if (!this.isFilterMenuOpen()) return;
      if (e.target.closest("#mobileFilterBtn") || e.target.closest("#mobileFilterMenu")) return;
      this.closeFilterMenu();
      this.syncBackdrop();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isFilterMenuOpen()) {
        this.closeFilterMenu();
        this.syncBackdrop();
      }
    });

    document.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => this.syncFilterLabel());
    });

    this.syncFilterLabel();
    if (this.jumpLabel) this.jumpLabel.textContent = "Jump";

    const filterClose = document.getElementById("mobileFilterClose");
    if (filterClose) {
      filterClose.addEventListener("click", (e) => {
        e.stopPropagation();
        this.closeFilterMenu();
        this.syncBackdrop();
      });
    }
  }

  isFilterMenuOpen() {
    return document.documentElement.classList.contains("filter-menu-open");
  }

  openFilterMenu() {
    this.closeNavSheet();
    this.closeAboutSheet();
    this.closePeriodMenu();
    this.closeJumpAndMore();
    this.collapseLegend();
    document.documentElement.classList.add("filter-menu-open");
    document.body.classList.add("filter-menu-open");
    this.filterBtn.setAttribute("aria-expanded", "true");
    if (this.filterMenu) this.filterMenu.setAttribute("role", "listbox");
    this.syncFilterLabel();
    this.showBackdrop();
  }

  closeFilterMenu() {
    document.documentElement.classList.remove("filter-menu-open");
    document.body.classList.remove("filter-menu-open");
    if (this.filterBtn) this.filterBtn.setAttribute("aria-expanded", "false");
  }

  syncFilterLabel() {
    const chips = [...document.querySelectorAll(".filter-chip")];
    const active = chips.filter((chip) => chip.classList.contains("active"));
    const names = active
      .filter((chip) => chip.dataset.filter !== "all")
      .map((chip) => (chip.textContent || "").replace(/\s+/g, " ").trim());
    let detail = "No overlays";
    let dotClass = "";

    if (active.some((chip) => chip.dataset.filter === "all")) {
      detail = "All Visible";
      dotClass = "dot-all";
    } else if (names.length === 1) {
      detail = names[0];
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
      detail = names.join(" · ");
      const churchOn = active.some((chip) => chip.dataset.filter === "churches");
      const journeyOn = active.some((chip) => chip.dataset.filter === "journeys");
      if (churchOn && !journeyOn) dotClass = "dot-church";
      else if (journeyOn && !churchOn) dotClass = "dot-journey";
      else dotClass = "dot-all";
    }

    if (this.filterLabel) this.filterLabel.textContent = "Layers";
    if (this.filterSubtitle) this.filterSubtitle.textContent = detail;
    if (this.filterDot) {
      this.filterDot.className = `mobile-filter-dot ${dotClass}`.trim();
    }
    if (this.filterBtn) {
      this.filterBtn.setAttribute("aria-label", `Map layers, ${detail}`);
    }
    if (this.navLayersDetail) this.navLayersDetail.textContent = detail;
    if (this.navLayersDot) {
      this.navLayersDot.className = `mobile-nav-dot ${dotClass}`.trim();
    }
  }

  bindPeriodDropdown() {
    if (!this.periodBtn) return;

    this.periodBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.closeSearch();
      if (this.isPeriodMenuOpen()) {
        this.closeChromeMenus();
        this.syncBackdrop();
      } else {
        this.openPeriodMenu();
      }
    });

    document.addEventListener("click", (e) => {
      if (!this.isPeriodMenuOpen()) return;
      if (e.target.closest("#mobilePeriodBtn") || e.target.closest("#eraTabs")) return;
      this.closePeriodMenu();
      this.syncBackdrop();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isPeriodMenuOpen()) {
        this.closePeriodMenu();
        this.syncBackdrop();
      }
    });

    document.querySelectorAll(".era-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        this.closePeriodMenu();
        this.syncPeriodLabel(tab);
        this.syncBackdrop();
      });
    });

    const eraHost = this.periodMenu;
    if (eraHost && !eraHost.__periodLabelObs) {
      // Watch only .era-tab class changes. #mobilePeriodSubtitle lives inside
      // #eraTabs; childList/characterData here re-enters syncPeriodLabel() and
      // freezes App.init (map tiles partial, chrome never finishes).
      eraHost.__periodLabelObs = new MutationObserver(() => this.syncPeriodLabel());
      eraHost.__periodLabelObs.observe(eraHost, {
        subtree: true,
        attributes: true,
        attributeFilter: ["class"]
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

    const periodClose = document.getElementById("mobilePeriodClose");
    if (periodClose) {
      periodClose.addEventListener("click", (e) => {
        e.stopPropagation();
        this.closePeriodMenu();
        this.syncBackdrop();
      });
    }
  }

  isPeriodMenuOpen() {
    return document.documentElement.classList.contains("period-menu-open");
  }

  openPeriodMenu() {
    this.closeNavSheet();
    this.closeAboutSheet();
    this.closeFilterMenu();
    this.closeJumpAndMore();
    this.collapseLegend();
    document.documentElement.classList.add("period-menu-open");
    document.body.classList.add("period-menu-open");
    this.periodBtn.setAttribute("aria-expanded", "true");
    if (this.periodMenu) this.periodMenu.setAttribute("role", "listbox");
    this.syncPeriodLabel();
    this.showBackdrop();
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

  syncPeriodLabel(preferred) {
    const actives = [...document.querySelectorAll(".era-tab.active")];
    const active = preferred || actives[actives.length - 1] || document.querySelector(".era-tab");
    const name = this.shortEraName(active);
    if (this.periodLabel && this.periodLabel.textContent !== "Period") {
      this.periodLabel.textContent = "Period";
    }
    if (this.periodSubtitle && this.periodSubtitle.textContent !== name) {
      this.periodSubtitle.textContent = name;
    }
    if (this.periodBtn) {
      this.periodBtn.setAttribute("aria-label", `Timeline period, ${name}`);
    }
    if (this.navPeriodDetail && this.navPeriodDetail.textContent !== name) {
      this.navPeriodDetail.textContent = name;
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
      this.closeChromeMenus();
      this.collapseLegend();
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
    this.closeNavSheet();
    this.closeAboutSheet();
    this.closeChromeMenus();
    this.collapseLegend();
    this.refreshCatalog();
    this.renderCityList(this.citySearch ? this.citySearch.value : "");
    this.syncJumpSubtitle();
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
    this.syncJumpSubtitle();
    if (this.jumpLabel) this.jumpLabel.textContent = "Jump";
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
        this.closeChromeMenus();
        this.collapseLegend();
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
    if (this.navBasemapDetail) {
      this.navBasemapDetail.textContent = (theme === "satellite" || theme === "modern-satellite")
        ? "Satellite terrain"
        : "Ancient relief";
    }
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
    this.closeNavSheet();
    this.closeAboutSheet();
    this.closeChromeMenus();
    this.collapseLegend();
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

  hideBackdrop() {
    if (!this.backdrop) return;
    this.backdrop.classList.remove("visible");
    this.backdrop.hidden = true;
  }

  syncBackdrop() {
    const need = this.isNavMenuOpen() || this.isAboutOpen() ||
      this.isFilterMenuOpen() || this.isPeriodMenuOpen() || this.isLegendOpen() ||
      (this.citySheet && this.citySheet.classList.contains("open")) ||
      (this.moreSheet && this.moreSheet.classList.contains("open"));
    if (need) this.showBackdrop();
    else this.hideBackdrop();
  }

  syncJumpSubtitle() {
    const current = ((this.cityCurrent && this.cityCurrent.textContent) || "").trim();
    const hasPlace = this.cityBar && this.cityBar.classList.contains("has-place") && current &&
      !/searchable list/i.test(current);
    if (this.jumpSubtitle) {
      this.jumpSubtitle.textContent = hasPlace ? current : "";
      this.jumpSubtitle.hidden = !hasPlace;
    }
    if (this.navJumpDetail) {
      this.navJumpDetail.textContent = hasPlace ? current : "Search cities & sites";
    }
  }

  closeJumpAndMore() {
    if (this.citySheet) {
      this.citySheet.classList.remove("open");
      this.citySheet.hidden = true;
    }
    if (this.moreSheet) {
      this.moreSheet.classList.remove("open");
      this.moreSheet.hidden = true;
    }
    if (this.cityBtn) this.cityBtn.setAttribute("aria-expanded", "false");
    if (this.moreBtn) this.moreBtn.setAttribute("aria-expanded", "false");
  }

  closeOverlays() {
    this.closeNavSheet();
    this.closeAboutSheet();
    this.closeJumpAndMore();
    this.closeChromeMenus();
    if (this.isPhone()) this.collapseLegend();
    this.hideBackdrop();
  }
}
