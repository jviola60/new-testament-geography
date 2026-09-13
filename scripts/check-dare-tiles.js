/**
 * Confirm Digital Atlas of the Roman Empire tiles load at z=5–11
 * for New Testament landfall (not open-water placeholders).
 */
const https = require("https");
const assert = require("assert");

const DARE = "https://dh.gu.se/tiles/imperium";
const UA = "NTG-DARE-check/1.0";

function tileXY(lat, lng, z) {
  const n = 2 ** z;
  const x = Math.floor((lng + 180) / 360 * n);
  const latRad = lat * Math.PI / 180;
  const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n);
  return { x, y };
}

function fetchTile(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": UA } }, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        resolve({
          status: res.statusCode,
          type: res.headers["content-type"] || "",
          bytes: Buffer.concat(chunks)
        });
      });
    });
    req.on("error", reject);
    req.setTimeout(15000, () => {
      req.destroy(new Error(`timeout ${url}`));
    });
  });
}

const cities = [
  { name: "Jerusalem", lat: 31.7767, lng: 35.2345 },
  { name: "Ephesus", lat: 37.94, lng: 27.3414 },
  { name: "Corinth", lat: 37.9056, lng: 22.8797 },
  { name: "Alexandria", lat: 31.2001, lng: 29.9187 }
];

(async () => {
  for (const city of cities) {
    for (let z = 5; z <= 11; z++) {
      const { x, y } = tileXY(city.lat, city.lng, z);
      const url = `${DARE}/${z}/${x}/${y}.png`;
      const tile = await fetchTile(url);
      assert.strictEqual(tile.status, 200, `${city.name} z=${z} ${url} HTTP ${tile.status}`);
      assert(/image\/png/i.test(tile.type), `${city.name} z=${z} content-type ${tile.type}`);
      assert(tile.bytes.slice(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), `${city.name} z=${z} is not a PNG`);
      // Open-water DARE tiles are ~103 bytes; landfall tiles are tens of KB.
      assert(tile.bytes.length > 8000, `${city.name} z=${z} looks empty (${tile.bytes.length} bytes)`);
      console.log(`✓ ${city.name} z=${z} ${x}/${y} ${tile.bytes.length} bytes`);
    }
  }
  console.log("DARE tiles load at z=5–11 for Jerusalem, Ephesus, Corinth, and Alexandria.");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
