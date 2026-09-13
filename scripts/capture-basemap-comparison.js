/**
 * Side-by-side screenshot: current Esri World Shaded Relief vs a free
 * OpenTopoMap basemap at the phone Eastern Mediterranean start extent.
 * Does not change the production default basemap.
 */
const { chromium } = require("/tmp/pw/node_modules/playwright-core");
const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const OUT = process.env.COMPARE_OUT || "/tmp/ntg-basemap-compare";
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function serve(dir, port) {
  return new Promise((resolve, reject) => {
    const child = spawn("python3", ["-m", "http.server", String(port), "--bind", "127.0.0.1"], {
      cwd: dir,
      stdio: "ignore"
    });
    child.on("error", reject);
    const t0 = Date.now();
    const tick = () => {
      http.get({ host: "127.0.0.1", port, path: "/", timeout: 800 }, (res) => {
        res.resume();
        resolve(child);
      }).on("error", () => {
        if (Date.now() - t0 > 8000) reject(new Error(`server on ${port} did not start`));
        else setTimeout(tick, 150);
      });
    };
    setTimeout(tick, 200);
  });
}

(async () => {
  const root = path.join(__dirname, "..");
  const server = await serve(root, 8091);
  const browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome-stable",
    args: ["--no-sandbox", "--disable-dev-shm-usage"]
  });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const page = await ctx.newPage();
  await page.goto("http://127.0.0.1:8091/", { waitUntil: "commit", timeout: 60000 });
  await page.waitForFunction(() => window.app && window.app.map && window.app.map.map, { timeout: 20000 });
  await sleep(2500);

  const esriPath = path.join(OUT, "basemap_esri_shaded_relief.png");
  await page.screenshot({ path: esriPath, fullPage: false });

  await page.evaluate(() => {
    const ctrl = window.app.map;
    const map = ctrl.map;
    if (ctrl.tileLayers && ctrl.tileLayers.parchment) {
      map.removeLayer(ctrl.tileLayers.parchment);
    }
    const otm = window.L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
      maxZoom: 17,
      attribution: "© OpenStreetMap contributors, SRTM | © OpenTopoMap (CC-BY-SA)"
    });
    otm.addTo(map);
    window.__otmPreview = otm;
  });
  await sleep(3500);

  const otmPath = path.join(OUT, "basemap_opentopomap.png");
  await page.screenshot({ path: otmPath, fullPage: false });

  const pair = await page.evaluate(async () => {
    const map = document.getElementById("map");
    const r = map.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });

  const clip = {
    x: Math.max(0, Math.round(pair.x)),
    y: Math.max(0, Math.round(pair.y)),
    width: Math.round(pair.width),
    height: Math.round(pair.height)
  };

  await page.evaluate(() => {
    const ctrl = window.app.map;
    if (window.__otmPreview) ctrl.map.removeLayer(window.__otmPreview);
    if (ctrl.tileLayers && ctrl.tileLayers.parchment) {
      ctrl.tileLayers.parchment.addTo(ctrl.map);
    }
  });
  await sleep(2500);
  const esriClip = path.join(OUT, "basemap_esri_map_only.png");
  await page.screenshot({ path: esriClip, clip, fullPage: false });

  await page.evaluate(() => {
    const ctrl = window.app.map;
    if (ctrl.tileLayers && ctrl.tileLayers.parchment) {
      ctrl.map.removeLayer(ctrl.tileLayers.parchment);
    }
    const otm = window.L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
      maxZoom: 17
    });
    otm.addTo(ctrl.map);
    window.__otmPreview = otm;
  });
  await sleep(3500);
  const otmClip = path.join(OUT, "basemap_otm_map_only.png");
  await page.screenshot({ path: otmClip, clip, fullPage: false });

  await browser.close();
  server.kill();

  const composite = path.join(OUT, "basemap_esri_vs_opentopomap.png");
  const stitch = spawn("python3", ["-c", `
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
left = Image.open(${JSON.stringify(esriClip)}).convert("RGB")
right = Image.open(${JSON.stringify(otmClip)}).convert("RGB")
gap = 10
bar = 36
w = left.width + gap + right.width
h = bar + max(left.height, right.height)
out = Image.new("RGB", (w, h), (28, 22, 16))
draw = ImageDraw.Draw(out)
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 16)
except Exception:
    font = ImageFont.load_default()
draw.text((12, 10), "Esri World Shaded Relief (current)", fill=(253, 248, 237), font=font)
draw.text((left.width + gap + 12, 10), "OpenTopoMap (free, CC-BY-SA)", fill=(253, 248, 237), font=font)
out.paste(left, (0, bar))
out.paste(right, (left.width + gap, bar))
out.save(${JSON.stringify(composite)})
print("wrote", ${JSON.stringify(composite)})
`], { stdio: "inherit" });
  const code = await new Promise((resolve) => stitch.on("close", resolve));
  if (code !== 0) {
    console.warn("Pillow stitch failed; individual frames are in", OUT);
  }
  console.log("Wrote comparison frames to", OUT);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
