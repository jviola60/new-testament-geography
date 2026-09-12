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

    this.applyLayout();
    this.bindViewport();
    this.bindHeader();
    this.bindSheet();
    this.bindCityPicker();
    this.bindMoreSheet();
    this.bindMapInvalidation();
    this.bindMobileMapZoom();

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
      root.classList.remove("search-open", "mobile-zoomed", "mobile-zoomed-deep", "sheet-open");
      body.classList.remove("search-open", "sheet-open");
      this.closeOverlays();
      if (this.sidebar) {
        this.sidebar.classList.remove("sheet-half", "sheet-full", "sheet-peek", "sheet-dragging", "closed");
        this.sidebar.style.height = "";
      }
    } else {
      this.syncZoomClass();
    }

    this.syncZoomControl();
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
      if (!map || typeof map.invalidateSize !== "function") return;
      map.invalidateSize({ animate: false, pan: false });
    }, delay);
  }

  syncZoomControl() {
    const map = window.app && window.app.map && window.app.map.map;
    if (!map || !map.zoomControl) return;
    map.zoomControl.setPosition(this.isPhone() ? "bottomleft" : "topleft");
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
          const input = document.getElementById("globalSearchInput");
          if (input) input.focus();
        }
      });
    }

    if (this.toursBtn) {
      this.toursBtn.addEventListener("click", () => {
        this.closeSearch();
        this.closeOverlays();
        const desktopTours = document.getElementById("storyToursBtn");
        if (desktopTours) desktopTours.click();
      });
    }

    if (this.moreBtn) {
      this.moreBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.closeSearch();
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

  bindCityPicker() {
    if (!this.cityBtn) return;

    this.cityBtn.addEventListener("click", () => {
      this.closeSearch();
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
    }
    if (window.app && window.app.ui) {
      window.app.ui.jumpToQuickJumpValue(value);
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
  }
}
