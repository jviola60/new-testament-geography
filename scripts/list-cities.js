const fs = require("fs");
const vm = require("vm");

const sandbox = { window: {} };
vm.createContext(sandbox);

let code = fs.readFileSync("js/data/cities.js", "utf8");
code = code.replace(/const CITIES_DATA/, "var CITIES_DATA");
vm.runInContext(code, sandbox);

let code2 = fs.readFileSync("js/data/placeDossiers.js", "utf8");
code2 = code2.replace(/const ([A-Z_]+)/g, "var $1");
try {
  vm.runInContext(code2, sandbox);
} catch(e) {
  // placeDossiers might have IIFE
}

const list = sandbox.CITIES_DATA || [];
console.log("Found", list.length, "cities:");
list.forEach((c, i) => {
  console.log(`${i + 1}. [${c.id}] ${c.name} (${c.region})`);
});
