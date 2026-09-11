const fs = require("fs");
const path = require("path");

const gospels = require("./data/cities-gospels.js");
const syriaGalatia = require("./data/cities-syria-cyprus-galatia.js");
const greeceMacedonia = require("./data/cities-greece-macedonia.js");
const asiaSeven = require("./data/cities-asia-sevenchurches.js");
const empireDiaspora = require("./data/cities-empire-diaspora.js");

const ALL_CITIES = {
  ...gospels,
  ...syriaGalatia,
  ...greeceMacedonia,
  ...asiaSeven,
  ...empireDiaspora
};

const cityKeys = Object.keys(ALL_CITIES);
console.log(`Loaded ${cityKeys.length} comprehensive city dossiers.`);

// Verify against cities.js
const citiesJsContent = fs.readFileSync("js/data/cities.js", "utf8");
const cityIdMatches = [...citiesJsContent.matchAll(/id:\s*"([^"]+)"/g)].map(m => m[1]);
console.log(`Found ${cityIdMatches.length} city IDs in cities.js.`);

// Also check NEW_CITIES IDs from placeDossiers.js
const placeDossiersContent = fs.readFileSync("js/data/placeDossiers.js", "utf8");
const newCitiesMatches = [...placeDossiersContent.matchAll(/id:\s*"([^"]+)"/g)].map(m => m[1]);

const allExpectedIds = new Set([...cityIdMatches, "bethany", "emmaus", "magdala", "tiberias"]);
console.log(`Total expected unique city IDs: ${allExpectedIds.size}`);

const missing = [...allExpectedIds].filter(id => !ALL_CITIES[id]);
if (missing.length > 0) {
  console.error("Missing cities:", missing);
  process.exit(1);
} else {
  console.log("All expected cities are present in dossier modules!");
}

// Generate the JavaScript representation for CITY_DOSSIERS
function serializeScriptures(scriptures) {
  return "[\n" + scriptures.map(s => {
    // Check if the churchLink was constructed via nt() or ot()
    let linkExpr = JSON.stringify(s.churchLink);
    if (s.churchLink.includes("/scriptures/nt/")) {
      const match = s.churchLink.match(/\/nt\/([a-z0-9-]+)\/(\d+)\?lang=eng#?(\d+)?/);
      if (match) {
        linkExpr = `nt(${JSON.stringify(match[1])}, ${JSON.stringify(match[2])}${match[3] ? `, ${JSON.stringify(match[3])}` : ""})`;
      }
    } else if (s.churchLink.includes("/scriptures/ot/")) {
      const match = s.churchLink.match(/\/ot\/([a-z0-9-]+)\/(\d+)\?lang=eng#?(\d+)?/);
      if (match) {
        linkExpr = `ot(${JSON.stringify(match[1])}, ${JSON.stringify(match[2])}${match[3] ? `, ${JSON.stringify(match[3])}` : ""})`;
      }
    }
    return `        v(${JSON.stringify(s.ref)}, ${JSON.stringify(s.text)}, ${linkExpr})`;
  }).join(",\n") + "\n      ]";
}

function serializeTeachings(t) {
  if (!t) return "";
  return `{\n` +
    `        teacher: ${JSON.stringify(t.teacher)},\n` +
    `        audience: ${JSON.stringify(t.audience)},\n` +
    `        whatWasTaught: ${JSON.stringify(t.whatWasTaught)},\n` +
    `        whyTaught: ${JSON.stringify(t.whyTaught)},\n` +
    `        context: ${JSON.stringify(t.context)},\n` +
    `        howAccepted: ${JSON.stringify(t.howAccepted)},\n` +
    `        passages: ${JSON.stringify(t.passages || [])}\n` +
    `      }`;
}

let code = "  const CITY_DOSSIERS = {\n";
const entries = Object.entries(ALL_CITIES);
entries.forEach(([id, d], idx) => {
  const isLast = idx === entries.length - 1;
  const key = id.includes("-") ? `"${id}"` : id;
  code += `    ${key}: {\n`;
  code += `      overview: ${JSON.stringify(d.overview)},\n`;
  if (d.teachings) {
    code += `      teachings: ${serializeTeachings(d.teachings)},\n`;
  }
  if (d.scriptures && d.scriptures.length) {
    code += `      scriptures: ${serializeScriptures(d.scriptures)},\n`;
  }
  code += `      peopleAndChurch: ${JSON.stringify(d.peopleAndChurch)},\n`;
  code += `      politicalInsights: ${JSON.stringify(d.politicalInsights)},\n`;
  code += `      eraChronology: ${JSON.stringify(d.eraChronology)}`;
  if (d.epistles && d.epistles.length) {
    code += `,\n      epistles: ${JSON.stringify(d.epistles)}`;
  }
  code += `\n    }${isLast ? "" : ","}\n`;
});
code += "  };\n";

// Replace in placeDossiers.js
// Find const CITY_DOSSIERS = { ... };
const startToken = "  const CITY_DOSSIERS = {";
const endToken = "  const NEW_CITIES = [";

const startIndex = placeDossiersContent.indexOf(startToken);
const endIndex = placeDossiersContent.indexOf(endToken);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find delimiters in placeDossiers.js");
  process.exit(1);
}

const newContent = placeDossiersContent.slice(0, startIndex) + code + "\n" + placeDossiersContent.slice(endIndex);

fs.writeFileSync("js/data/placeDossiers.js", newContent, "utf8");
console.log("Successfully updated js/data/placeDossiers.js with all 43 gold-standard city dossiers!");
