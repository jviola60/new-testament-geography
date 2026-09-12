# New Testament Geography — Interactive Atlas (~6 BC – 100 AD)

An interactive, high-performance web application mapping the New Testament world spanning 6 BC to 100 AD. Focuses on the life, footsteps, and ministry of Jesus Christ, Paul's missionary journeys, Jewish diaspora settlements, and the exponential multiplication of early Christian communities across the Roman Empire.

Live Demo: [https://jviola60.github.io/new-testament-geography/](https://jviola60.github.io/new-testament-geography/)

---

## Default start state

Every **fresh load** uses the same desktop and mobile defaults. The app does **not** persist layer filters or the timeline year in `localStorage` or the URL hash, so a reload always returns to this start state. Chip and scrubber toggles after load still work as before.

- **Timeline year:** `100 AD` (Apostolic Age). The scrubber range is still 6 BC–100 AD.
- **Layers ON:** `all` (All Visible), `savior` (Savior's Ministry), `diaspora` (Jewish Diaspora), `churches` (Christian Churches), `journeys` (Paul's Journeys), `provinces` (Roman Provinces), `jerusalemSites` (Jerusalem Landmarks), `jerusalemGeography` (Quarters & Walls).
- **Layer OFF:** `heatmaps` (Growth Heatmap). All Visible masters the core place/route overlays only; Growth stays independent.

---

## 🌟 Key Features

- **Dual-Mode Geospatial Engine**: Switch between an **Ancient Biblical Parchment** map and high-definition **Physical Satellite / Topographic Terrain**.
- **Interactive Chronological Timeline (-6 BC to 100 AD)**: Fluid timeline slider with 1×, 2×, and 5× auto-playback controls.
- **Savior's Footsteps & Passion Week**: Dedicated routes, miracles, and Passion Week stations in Jerusalem.
- **Jewish Diaspora & Church Growth**: Visualizing synagogues, house churches, growth heatmaps, and New Testament epistles.
- **5 Guided Scripture Tours**: Step-by-step narrative journeys with auto-camera navigation and synced Bible verses.
- **Global Autocomplete Search**: Search any city, miracle, person, scripture citation, or journey stop.
- **Ambient Biblical Sound**: Optional acoustic harp synthesizer powered by the Web Audio API.

---

## 🚀 GitHub Pages Deployment

This project is built with standard HTML5, Vanilla JavaScript (ES6+), CSS3, and Leaflet.js with zero build steps or server dependencies:

1. Push this repository to GitHub.
2. Go to **Settings** → **Pages**.
3. Under **Build and deployment** > **Branch**, select `main` and root `/`.
4. Click **Save** — your site will be live in seconds.
