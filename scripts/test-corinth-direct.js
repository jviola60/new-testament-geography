const fs = require("fs");
const path = require("path");
let code = fs.readFileSync(path.join(__dirname, "render-tabs-smoke.js"), "utf8");
code += `
const dCorinth = sandbox.COMMUNITIES_DATA.diasporaSettlements.find(d => d.id === 'diaspora-corinth');
console.log('=== VERIFYING CORINTH DIASPORA HUB TABS ===');
ui.currentActiveItem = { type: 'diaspora', data: dCorinth };
['scripture', 'people', 'political', 'chronology', 'teachings'].forEach(tab => {
  ui.currentTab = tab;
  ui.sidebarContent.innerHTML = '';
  ui.renderActiveItemTabs();
  const html = ui.sidebarContent.innerHTML;
  console.log('--- ' + tab.toUpperCase() + ' TAB (' + html.length + ' chars) ---');
  console.log(html.slice(0, 300) + '...\\n');
});
`;
eval(code);
