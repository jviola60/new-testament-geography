/**
 * NEW TESTAMENT GEOGRAPHY - MOBILE SHELL CONTROLLER
 * Dynamic Pill & 3-State Sheet Mobile Architecture:
 * - 1. Top Floating Era Capsule (.floating-era-badge): ~34px pill [🟢 ERA: ~Year • Title ▾]
 *      Collapsible #floatingEraBody with historical summary and clickable featured location chips.
 * - 2. Floating Timeline Capsule (.app-timeline-footer): Glassmorphic pill resting ~60px from bottom.
 *      Smooth slide transitions (.timeline-hidden) with zero layer collision.
 * - 3. 3-State Codex Bottom Sheet (.detail-sidebar):
 *      - State 1: Closed on Startup (transform: translateY(115%))
 *      - State 2: Peek (~195px) on pin/search selection with ⌃ Full Codex toggle & auto timeline tuck
 *      - State 3: Expanded (82dvh) with horizontally scrollable tab strip
 *      - Dismissal (✕): Closes sheet and restores floating timeline capsule
 * - 4. 5-Button Touch Navigation Bar (.mobile-bottom-bar, 52px, z-index: 1000):
 *      [🗺️ Map], [🔍 Search], [⚙️ Filters], [📜 Codex], [☰ Menu]
 */

class MobileShell {
  constructor() {
    this.isMobile = false;
    this.navSheet = null;
    this.filtersSheet = null;
    this.pickerSheet = null;
    this.toursSheet = null;
    this.backdrop = null;
    this.sidebar = null;
    this.timelineFooter = null;
    this.floatingEraBadge = null;
    this.mobileExpandCodexBtn = null;
    this.mobileDragHandle = null;
    this.touchStartY = 0;
    this.touchCurrentY = 0;
  }

  init() {
    console.log("📱 Initializing New Testament Mobile Shell Controller (Dynamic Pill & 3-State Sheet)...");

    this.sidebar = document.getElementById("detailSidebar");
    this.navSheet = document.getElementById("mobileNavSheet");
    this.filtersSheet = document.getElementById("mobileFiltersSheet");
    this.pickerSheet = document.getElementById("mobilePickerSheet");
    this.toursSheet = document.getElementById("mobileToursSheet");
    this.backdrop = document.getElementById("mobileSheetBackdrop");
    this.timelineFooter = document.querySelector(".app-timeline-footer") || document.getElementById("timelineFooter");
    this.floatingEraBadge = document.getElementById("floatingEraBadge");
    this.mobileExpandCodexBtn = document.getElementById("mobileExpandCodexBtn");
    this.mobileDragHandle = document.getElementById("mobileDragHandle");

    this.checkMobile();
    this.setupViewportHeight();
    this.setupFloatingEraCapsule();
    this.setupMobileMenu();
    this.setupMobileHeaderActions();
    this.setupBottomBar();
    this.setupBottomSheetSidebar();
    this.setupMobilePicker();
    this.setupMobileFilters();
    this.setupMobileNavActions();

    window.addEventListener("resize", () => {
      this.checkMobile();
      this.setupViewportHeight();
    });

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", () => this.setupViewportHeight());
    }

    // Initial era capsule sync
    if (window.app && window.app.timeline) {
      const curYear = window.app.timeline.currentYear || -6;
      const era = window.app.timeline.getEraForYear(curYear);
      this.updateEraCapsule(curYear, era);
    }
  }

  checkMobile() {
    this.isMobile = window.matchMedia("(max-width: 768px)").matches || /iPhone|iPad|iPod|Android|Mobile/i.test(navigator.userAgent);
    document.documentElement.classList.toggle("layout-mobile", this.isMobile);
    document.body.classList.toggle("layout-mobile", this.isMobile);

    if (this.isMobile && this.sidebar) {
      // State 1: By default closed on mobile so map canvas is completely unobstructed
      if (!this.sidebar.classList.contains("open") && !this.sidebar.classList.contains("expanded") && !this.sidebar.classList.contains("peek")) {
        this.closeCodexSheet();
      }
    }
  }

  setupViewportHeight() {
    const vv = window.visualViewport;
    const h = Math.round((vv && vv.height) || window.innerHeight);
    if (h) {
      document.documentElement.style.setProperty("--app-vh", h + "px");
      document.documentElement.style.setProperty("--vh", (h * 0.01) + "px");
    }
  }

  /* --------------------------------------------------------------------------
     1. Specification 1: Top Floating Era Capsule (.floating-era-badge)
     -------------------------------------------------------------------------- */
  setupFloatingEraCapsule() {
    if (!this.floatingEraBadge) return;

    // Toggle dropdown card on badge click
    this.floatingEraBadge.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        if (e.target.closest(".era-featured-chip")) return;
        this.floatingEraBadge.classList.toggle("is-expanded");
      }
    });

    // Dismiss when tapping outside on map canvas
    const mapElement = document.getElementById("map");
    if (mapElement) {
      mapElement.addEventListener("click", (e) => {
        if (this.floatingEraBadge && !e.target.closest("#floatingEraBadge")) {
          this.floatingEraBadge.classList.remove("is-expanded");
        }
      });
    }

    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 768 && this.floatingEraBadge) {
        if (!e.target.closest("#floatingEraBadge")) {
          this.floatingEraBadge.classList.remove("is-expanded");
        }
      }
    });
  }

  updateEraCapsule(year, era) {
    if (!era) return;
    const tagEl = document.getElementById("floatingEraTag") || document.getElementById("eraTag");
    const titleEl = document.getElementById("floatingEraTitle") || document.getElementById("eraTitle");
    const descEl = document.getElementById("floatingEraDesc") || document.getElementById("eraDesc");
    const chipsEl = document.getElementById("floatingEraChips");

    const yearStr = window.app && window.app.timeline ? window.app.timeline.formatYear(year) : (year < 0 ? `${Math.abs(year)} BC` : `${year} AD`);

    if (tagEl) tagEl.textContent = "ERA:";
    if (titleEl) titleEl.textContent = `${yearStr} • ${era.title}`;
    if (descEl) descEl.textContent = era.desc;

    if (chipsEl && era.featured && era.featured.length && typeof CITIES_DATA !== "undefined") {
      chipsEl.innerHTML = "";
      era.featured.forEach(cityId => {
        const city = CITIES_DATA.find(c => c.id === cityId);
        if (city) {
          const chip = document.createElement("span");
          chip.className = "era-featured-chip";
          chip.textContent = city.name;
          chip.setAttribute("data-city-id", city.id);
          chip.addEventListener("click", (e) => {
            e.stopPropagation();
            if (this.floatingEraBadge) this.floatingEraBadge.classList.remove("is-expanded");
            if (window.app && window.app.ui) {
              window.app.ui.showCityDetail(city);
            }
            if (window.app && window.app.map) {
              window.app.map.flyToLocation(city.lat, city.lng, 10);
            }
            if (window.innerWidth <= 768) {
              this.openPeekSheet();
            }
          });
          chipsEl.appendChild(chip);
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     2. Specification 3: 3-State Codex Bottom Sheet (.detail-sidebar)
     -------------------------------------------------------------------------- */
  setupBottomSheetSidebar() {
    if (!this.sidebar) return;

    // Expand / Collapse toggle button in header
    if (this.mobileExpandCodexBtn) {
      this.mobileExpandCodexBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleCodexMode();
      });
    }

    // Drag handle tap to toggle
    if (this.mobileDragHandle) {
      this.mobileDragHandle.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleCodexMode();
      });
    }

    // Dismissal (✕): Closes completely and restores floating timeline capsule
    const closeBtns = document.querySelectorAll("#closeSidebarBtn, .close-btn");
    closeBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (window.innerWidth <= 768) {
          this.closeCodexSheet();
        } else if (window.app && window.app.ui) {
          window.app.ui.closeSidebar();
        }
      });
    });

    // Touch drag / swipe down gestures
    const setupSwipe = (element, onSwipeDown) => {
      if (!element) return;
      let startY = 0;
      let startX = 0;

      element.addEventListener("touchstart", (e) => {
        if (e.touches && e.touches[0]) {
          startY = e.touches[0].clientY;
          startX = e.touches[0].clientX;
        }
      }, { passive: true });

      element.addEventListener("touchend", (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
          const deltaY = e.changedTouches[0].clientY - startY;
          const deltaX = Math.abs(e.changedTouches[0].clientX - startX);
          if (deltaY > 35 && deltaY > deltaX) {
            onSwipeDown();
          }
        }
      }, { passive: true });
    };

    const handleSidebarSwipeDown = () => {
      if (!this.sidebar || window.innerWidth > 768) return;
      if (this.sidebar.classList.contains("expanded")) {
        this.openPeekSheet();
      } else if (this.sidebar.classList.contains("peek")) {
        this.closeCodexSheet();
      }
    };

    if (this.mobileDragHandle) setupSwipe(this.mobileDragHandle, handleSidebarSwipeDown);
    const sidebarHeader = document.querySelector("#detailSidebar .sidebar-header");
    if (sidebarHeader) setupSwipe(sidebarHeader, handleSidebarSwipeDown);
  }

  /**
   * State 1: Closed on Startup or Dismissed (✕)
   * Leaves map 100% visible and floating timeline fully usable.
   */
  closeCodexSheet() {
    if (!this.sidebar) return;
    this.sidebar.classList.add("closed");
    this.sidebar.classList.remove("peek", "expanded", "open");

    // Smoothly restore timeline capsule
    const timeline = this.timelineFooter || document.querySelector(".app-timeline-footer") || document.getElementById("timelineFooter");
    if (timeline) {
      timeline.classList.remove("timeline-hidden");
    }

    if (this.mobileExpandCodexBtn) {
      this.mobileExpandCodexBtn.textContent = "⌃ Full Codex";
    }

    this.updateBottomNavState();
  }

  /**
   * State 2: Peek (~195px)
   * Triggered when marker pin or search result is selected.
   * CRITICAL: Automatically adds .timeline-hidden to timeline footer for zero collision.
   */
  openPeekSheet() {
    if (!this.sidebar) return;
    this.sidebar.classList.remove("closed", "expanded");
    this.sidebar.classList.add("peek", "open");

    // Smoothly tuck timeline off-screen
    const timeline = this.timelineFooter || document.querySelector(".app-timeline-footer") || document.getElementById("timelineFooter");
    if (timeline) {
      timeline.classList.add("timeline-hidden");
    }

    if (this.mobileExpandCodexBtn) {
      this.mobileExpandCodexBtn.textContent = "⌃ Full Codex";
    }

    this.updateBottomNavState();
  }

  /**
   * State 3: Expanded (82dvh)
   * Triggered by tapping ⌃ Full Codex or dragging drag handle up.
   */
  openExpandedSheet() {
    if (!this.sidebar) return;
    this.sidebar.classList.remove("closed", "peek");
    this.sidebar.classList.add("expanded", "open");

    const timeline = this.timelineFooter || document.querySelector(".app-timeline-footer") || document.getElementById("timelineFooter");
    if (timeline) {
      timeline.classList.add("timeline-hidden");
    }

    if (this.mobileExpandCodexBtn) {
      this.mobileExpandCodexBtn.textContent = "⌄ Collapse";
    }

    this.updateBottomNavState();
  }

  toggleCodexMode() {
    if (!this.sidebar) return;
    if (this.sidebar.classList.contains("expanded")) {
      this.openPeekSheet();
    } else {
      this.openExpandedSheet();
    }
  }

  /* --------------------------------------------------------------------------
     3. Specification 4: Mobile Bottom Navigation Bar (52px, z-index: 1000)
     [🗺️ Map], [🔍 Search], [⚙️ Filters], [📜 Codex], [☰ Menu]
     -------------------------------------------------------------------------- */
  setupBottomBar() {
    const mapBtn = document.getElementById("mobBottomMapBtn");
    const searchBtn = document.getElementById("mobBottomSearchBtn");
    const filtersBtn = document.getElementById("mobBottomFiltersBtn");
    const codexBtn = document.getElementById("mobBottomCodexBtn") || document.getElementById("mobBottomDetailsBtn");
    const menuBtn = document.getElementById("mobBottomMenuBtn") || document.getElementById("mobileMenuBtn");

    // [🗺️ Map]: Primary return button: closes all modals/drawers and restores the clear map view
    if (mapBtn) {
      mapBtn.addEventListener("click", () => {
        this.closeAllSheets();
        this.closeCodexSheet();
        if (window.app && window.app.map) {
          window.app.map.recenter();
        }
        this.updateBottomNavState();
      });
    }

    // [🔍 Search]
    if (searchBtn) {
      searchBtn.addEventListener("click", () => {
        const isOpen = this.pickerSheet && this.pickerSheet.classList.contains("open");
        this.closeAllSheets();
        if (!isOpen) {
          this.openPickerSheet();
        }
        this.updateBottomNavState();
      });
    }

    // [⚙️ Filters]
    if (filtersBtn) {
      filtersBtn.addEventListener("click", () => {
        const isOpen = this.filtersSheet && this.filtersSheet.classList.contains("open");
        this.closeAllSheets();
        if (!isOpen) {
          this.openFiltersSheet();
        }
        this.updateBottomNavState();
      });
    }

    // [📜 Codex]
    if (codexBtn) {
      codexBtn.addEventListener("click", () => {
        this.closeAllSheets();
        if (!this.sidebar) return;
        if (this.sidebar.classList.contains("closed")) {
          this.openPeekSheet();
        } else if (this.sidebar.classList.contains("peek")) {
          this.openExpandedSheet();
        } else {
          this.closeCodexSheet();
        }
      });
    }

    // [☰ Menu]
    if (menuBtn) {
      menuBtn.addEventListener("click", () => {
        const isOpen = this.navSheet && this.navSheet.classList.contains("open");
        this.closeAllSheets();
        if (!isOpen) {
          this.openNavSheet();
        }
        this.updateBottomNavState();
      });
    }
  }

  updateBottomNavState() {
    const mapBtn = document.getElementById("mobBottomMapBtn");
    const searchBtn = document.getElementById("mobBottomSearchBtn");
    const filtersBtn = document.getElementById("mobBottomFiltersBtn");
    const codexBtn = document.getElementById("mobBottomCodexBtn") || document.getElementById("mobBottomDetailsBtn");
    const menuBtn = document.getElementById("mobBottomMenuBtn");

    document.querySelectorAll(".mobile-bottom-btn").forEach(b => b.classList.remove("active"));

    if (this.filtersSheet && this.filtersSheet.classList.contains("open")) {
      if (filtersBtn) filtersBtn.classList.add("active");
    } else if (this.pickerSheet && this.pickerSheet.classList.contains("open")) {
      if (searchBtn) searchBtn.classList.add("active");
    } else if (this.navSheet && this.navSheet.classList.contains("open")) {
      if (menuBtn) menuBtn.classList.add("active");
    } else if (this.sidebar && !this.sidebar.classList.contains("closed") && (this.sidebar.classList.contains("peek") || this.sidebar.classList.contains("expanded"))) {
      if (codexBtn) codexBtn.classList.add("active");
    } else {
      if (mapBtn) mapBtn.classList.add("active");
    }
  }

  // Mobile Left Slide-out Drawer Menu
  setupMobileMenu() {
    const menuBtn = document.getElementById("mobileMenuBtn");
    const closeBtn = document.getElementById("closeMobileNavBtn");

    if (menuBtn) {
      menuBtn.addEventListener("click", () => this.openNavSheet());
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeNavSheet());
    }

    if (this.backdrop) {
      this.backdrop.addEventListener("click", () => this.closeAllSheets());
    }
  }

  openNavSheet() {
    this.closeAllSheets(false);
    if (this.navSheet) this.navSheet.classList.add("open");
    if (this.backdrop) this.backdrop.classList.add("active");
    this.updateBottomNavState();
  }

  closeNavSheet() {
    if (this.navSheet) this.navSheet.classList.remove("open");
    if (this.backdrop) this.backdrop.classList.remove("active");
    this.updateBottomNavState();
  }

  closeAllSheets(hideBackdrop = true) {
    if (this.navSheet) this.navSheet.classList.remove("open");
    if (this.filtersSheet) this.filtersSheet.classList.remove("open");
    if (this.pickerSheet) this.pickerSheet.classList.remove("open");
    if (this.toursSheet) this.toursSheet.classList.remove("open");
    if (hideBackdrop && this.backdrop) this.backdrop.classList.remove("active");

    const modals = document.querySelectorAll(".modal-backdrop.open, .modal-backdrop.show");
    modals.forEach(m => {
      m.classList.remove("open", "show");
      m.style.display = "none";
    });

    this.updateBottomNavState();
  }

  setupMobileHeaderActions() {
    const searchBtn = document.getElementById("mobileSearchToggleBtn");
    const codexBtn = document.getElementById("mobileCodexToggleBtn");

    if (searchBtn) {
      searchBtn.addEventListener("click", () => this.openPickerSheet());
    }

    if (codexBtn) {
      codexBtn.addEventListener("click", () => {
        if (!this.sidebar) return;
        if (this.sidebar.classList.contains("closed")) {
          this.openPeekSheet();
        } else {
          this.closeCodexSheet();
        }
      });
    }
  }

  // Biblical Locations Quick Picker Sheet
  setupMobilePicker() {
    const closeBtn = document.getElementById("closeMobilePickerBtn");
    const searchInput = document.getElementById("mobilePickerSearchInput");

    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closePickerSheet());
    }

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.renderPickerList(e.target.value.trim().toLowerCase());
      });
    }

    this.renderPickerList("");
  }

  openPickerSheet() {
    this.closeAllSheets(false);
    if (this.pickerSheet) this.pickerSheet.classList.add("open");
    if (this.backdrop) this.backdrop.classList.add("active");

    const searchInput = document.getElementById("mobilePickerSearchInput");
    if (searchInput) {
      searchInput.value = "";
      this.renderPickerList("");
      setTimeout(() => searchInput.focus(), 150);
    }
    this.updateBottomNavState();
  }

  closePickerSheet() {
    if (this.pickerSheet) this.pickerSheet.classList.remove("open");
    if (this.backdrop) this.backdrop.classList.remove("active");
    this.updateBottomNavState();
  }

  renderPickerList(filterText = "") {
    const listContainer = document.getElementById("mobilePickerList");
    if (!listContainer || typeof CITIES_DATA === "undefined") return;

    const filtered = CITIES_DATA.filter(city => {
      if (!filterText) return true;
      return city.name.toLowerCase().includes(filterText) ||
             (city.ancientName && city.ancientName.toLowerCase().includes(filterText)) ||
             (city.region && city.region.toLowerCase().includes(filterText)) ||
             (city.significance && city.significance.toLowerCase().includes(filterText));
    });

    if (filtered.length === 0) {
      listContainer.innerHTML = `<div style="padding:1.5rem; text-align:center; color:var(--text-muted); font-size:0.85rem;">No biblical sites matching "${filterText}"</div>`;
      return;
    }

    listContainer.innerHTML = filtered.map(city => `
      <div class="mobile-picker-item" data-id="${city.id}">
        <div class="mobile-picker-item-left">
          <div class="mobile-picker-name">${city.name}</div>
          <div class="mobile-picker-meta">${city.ancientName || city.region} • ${city.region}</div>
        </div>
        <span class="mobile-picker-badge badge-city">${city.region}</span>
      </div>
    `).join("");

    listContainer.querySelectorAll(".mobile-picker-item").forEach(item => {
      item.addEventListener("click", () => {
        const id = item.getAttribute("data-id");
        const found = CITIES_DATA.find(c => c.id === id);
        if (found && window.app && window.app.map) {
          window.app.map.flyToLocation(found.lat, found.lng, 11);
          if (window.app.ui) window.app.ui.showCityDetail(found);
        }
        this.closePickerSheet();
        if (window.innerWidth <= 768) {
          this.openPeekSheet();
        }
      });
    });
  }

  // Mobile Layers & Filters Bottom Sheet
  setupMobileFilters() {
    const closeBtn = document.getElementById("closeMobileFiltersBtn");
    const doneBtn = document.getElementById("mobFiltersDoneBtn");
    const resetBtn = document.getElementById("mobFiltersResetBtn");

    if (closeBtn) closeBtn.addEventListener("click", () => this.closeFiltersSheet());
    if (doneBtn) doneBtn.addEventListener("click", () => this.closeFiltersSheet());

    if (this.filtersSheet) {
      this.filtersSheet.querySelectorAll(".filter-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          const filterKey = chip.getAttribute("data-filter");
          const isActive = chip.classList.contains("active");

          if (filterKey === "all") {
            const newState = !isActive;
            this.filtersSheet.querySelectorAll(".filter-chip").forEach(c => c.classList.toggle("active", newState));
            document.querySelectorAll(".layer-filter-bar .filter-chip").forEach(c => c.classList.toggle("active", newState));
            if (window.app && window.app.map) window.app.map.setLayerFilter("all", newState);
            return;
          }

          chip.classList.toggle("active");
          const activeNow = chip.classList.contains("active");

          const desktopChip = document.querySelector(`.layer-filter-bar .filter-chip[data-filter="${filterKey}"]`);
          if (desktopChip) desktopChip.classList.toggle("active", activeNow);

          if (window.app && window.app.map) {
            window.app.map.setLayerFilter(filterKey, activeNow);
          }
        });
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        const chips = this.filtersSheet.querySelectorAll(".filter-chip");
        chips.forEach(c => c.classList.add("active"));
        document.querySelectorAll(".layer-filter-bar .filter-chip").forEach(c => c.classList.add("active"));
        if (window.app && window.app.map) {
          ["savior", "jerusalemSites", "jerusalemGeography", "journeys", "churches", "heatmaps", "diaspora", "provinces", "hydrography", "decapolis", "all"].forEach(k => {
            window.app.map.setLayerFilter(k, true);
          });
        }
      });
    }
  }

  openFiltersSheet() {
    this.closeAllSheets(false);
    if (this.filtersSheet) this.filtersSheet.classList.add("open");
    if (this.backdrop) this.backdrop.classList.add("active");
    this.updateBottomNavState();
  }

  closeFiltersSheet() {
    if (this.filtersSheet) this.filtersSheet.classList.remove("open");
    if (this.backdrop) this.backdrop.classList.remove("active");
    this.updateBottomNavState();
  }

  // Drawer Action Handlers
  setupMobileNavActions() {
    const searchNavBtn = document.getElementById("mobNavSearchBtn");
    const jumpNavBtn = document.getElementById("mobNavJumpBtn");
    const codexNavBtn = document.getElementById("mobNavCodexBtn");
    const toursNavBtn = document.getElementById("mobNavToursBtn");

    if (searchNavBtn) {
      searchNavBtn.addEventListener("click", () => {
        this.closeNavSheet();
        this.openPickerSheet();
      });
    }

    if (jumpNavBtn) {
      jumpNavBtn.addEventListener("click", () => {
        this.closeNavSheet();
        this.openPickerSheet();
      });
    }

    if (codexNavBtn) {
      codexNavBtn.addEventListener("click", () => {
        this.closeNavSheet();
        if (window.innerWidth <= 768) {
          this.openPeekSheet();
        }
      });
    }

    if (toursNavBtn && this.toursSheet) {
      toursNavBtn.addEventListener("click", () => {
        this.closeNavSheet();
        if (window.app && window.app.ui && typeof window.app.ui.renderMobileToursList === "function") {
          window.app.ui.renderMobileToursList();
        }
        this.toursSheet.classList.add("open");
        if (this.backdrop) this.backdrop.classList.add("active");
      });
    }

    // Region shortcuts
    document.querySelectorAll(".mob-region-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const region = btn.getAttribute("data-region");
        this.closeNavSheet();
        if (window.app && window.app.map) {
          window.app.map.focusRegion(region);
        }
      });
    });

    // Era chips in drawer
    document.querySelectorAll(".mob-era-chip").forEach(btn => {
      btn.addEventListener("click", () => {
        const yr = parseFloat(btn.getAttribute("data-year"));
        this.closeNavSheet();
        if (window.app && window.app.timeline) {
          window.app.timeline.setYear(yr);
        }
      });
    });
  }
}

if (typeof window !== "undefined") {
  window.MobileShell = MobileShell;
}
