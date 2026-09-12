/**
 * Desktop ≥1280px must stay pixel-identical to origin/main.
 * Serves this checkout and a git-archive of origin/main, then diffs screenshots.
 */
const { spawn } = require("child_process");
const { chromium } = require("/tmp/pw/node_modules/playwright-core");
const fs = require("fs");
const path = require("path");
const http = require("http");

const OUT = "/tmp/ntg-desktop-diff";
const MAIN_DIR = "/tmp/ntg-main-archive";
fs.mkdirSync(OUT, { recursive: true });

function fail(msg) {
  console.error("FAIL:", msg);
  throw new Error(msg);
}

function serve(dir, port) {
  return new Promise((resolve, reject) => {
    const child = spawn("python3", ["-m", "http.server", String(port), "--bind", "127.0.0.1"], {
      cwd: dir,
      stdio: "ignore"
    });
    child.on("error", reject);
    const t0 = Date.now();
    const tick = () => {
      http.get({ host: "127.0.0.1", port, path: "/", timeout: 800 }, res => {
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

function pixelDiff(a, b) {
  if (a.length !== b.length) return { changed: Infinity, total: 0 };
  let changed = 0;
  const total = a.length / 4;
  for (let i = 0; i < a.length; i += 4) {
    if (a[i] !== b[i] || a[i + 1] !== b[i + 1] || a[i + 2] !== b[i + 2] || a[i + 3] !== b[i + 3]) {
      changed += 1;
    }
  }
  return { changed, total };
}

(async () => {
  fs.rmSync(MAIN_DIR, { recursive: true, force: true });
  fs.mkdirSync(MAIN_DIR, { recursive: true });
  await new Promise((resolve, reject) => {
    const tar = spawn("tar", ["-x", "-C", MAIN_DIR], { stdio: ["pipe", "inherit", "inherit"] });
    const git = spawn("git", ["archive", "origin/main"], { stdio: ["ignore", "pipe", "inherit"] });
    git.stdout.pipe(tar.stdin);
    git.on("error", reject);
    tar.on("error", reject);
    tar.on("close", code => (code === 0 ? resolve() : reject(new Error(`tar exit ${code}`))));
  });

  const root = path.join(__dirname, "..");
  const mainSrv = await serve(MAIN_DIR, 8081);
  const branchSrv = await serve(root, 8082);

  const browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome-stable",
    args: ["--no-sandbox", "--disable-dev-shm-usage"]
  });

  const sizes = [
    { name: "1280", width: 1280, height: 900 },
    { name: "1440", width: 1440, height: 900 }
  ];

  for (const size of sizes) {
    const shots = [];
    for (const [label, port] of [["main", 8081], ["branch", 8082]]) {
      const ctx = await browser.newContext({ viewport: { width: size.width, height: size.height } });
      const page = await ctx.newPage();
      await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
      await page.waitForFunction(() => window.app && window.app.map, { timeout: 20000 });
      await page.waitForTimeout(1800);
      const file = path.join(OUT, `desktop_${size.name}_${label}.png`);
      await page.screenshot({ path: file, fullPage: false });
      shots.push(await page.screenshot({ fullPage: false }));
      await ctx.close();
    }
    const diff = pixelDiff(shots[0], shots[1]);
    console.log(`Desktop ${size.width}x${size.height}: changed=${diff.changed} / ${diff.total}`);
    if (diff.changed !== 0) {
      fail(`Desktop ${size.width}x${size.height} pixel-diff is ${diff.changed}, expected 0`);
    }
  }

  await browser.close();
  mainSrv.kill();
  branchSrv.kill();
  console.log("✓ Desktop 1280/1440 pixel-diff vs origin/main is 0");
})().catch(err => {
  console.error(err);
  process.exit(1);
});
