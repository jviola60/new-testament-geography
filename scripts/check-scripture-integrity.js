/**
 * Scripture-integrity guards for place cards.
 * Run: node scripts/check-scripture-integrity.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const files = [
  "js/data/regions.js",
  "js/data/cities.js",
  "js/data/jerusalemSites.js",
  "js/data/jerusalemGeography.js",
  "js/data/saviorEvents.js",
  "js/data/missionaryJourneys.js",
  "js/data/communities.js",
  "js/data/timelineEvents.js",
  "js/data/tours.js",
  "js/data/placeDossiers.js",
  "js/data/scriptureTranslations.js",
  "js/data/churchVideos.js",
  "js/uiController.js"
];

const sandbox = { window: {}, console, document: { getElementById() { return null; }, querySelector() { return null; }, querySelectorAll() { return []; } } };
vm.createContext(sandbox);
let bundle = files.map((f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8")).join("\n;\n");
bundle = bundle.replace(/^const ([A-Z_][A-Z0-9_]*)/gm, "var $1");
bundle = bundle.replace(/^class UIController/m, "var UIController = class UIController");
vm.runInContext(bundle, sandbox);

const ui = new sandbox.UIController();
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };

const bannedFallback = /Jesus Christ & His Apostles|Early Believers, Inquirers, and Synagogue Worshippers/;
ok(!bannedFallback.test(fs.readFileSync("js/uiController.js", "utf8")), "uiController still contains the old Jesus+synagogue fallback strings");

const empty = ui.normalizeTeachings("geo", { name: "Unknown Ridge", region: "Nowhere" });
ok(empty.teacher === "See scriptures for who taught here.", `empty fallback teacher is "${empty.teacher}"`);
ok(!/Jesus/.test(empty.teacher), "empty fallback still names Jesus as teacher");
ok(!/synagogue/i.test(empty.audience), `empty fallback audience invents a synagogue: "${empty.audience}"`);

const missingTeacher = ui.normalizeTeachings("city", { teachings: { whatWasTaught: "silence" } });
ok(missingTeacher.teacher === "See scriptures for who taught here.", "empty teacher field defaults to Jesus");

ok(ui.findCityByName("Pisidian Antioch")?.id === "pisidian-antioch", "Pisidian Antioch lookup failed");
ok(ui.findCityByName("Antioch in Pisidia")?.id === "pisidian-antioch", "Antioch in Pisidia lookup failed");
ok(ui.findCityByName("Antioch on the Orontes")?.id === "antioch-syria", "Syrian Antioch lookup failed");
ok(ui.findCityByName("Antioch")?.id === "antioch-syria", "bare Antioch must not inherit Pisidian");
ok(ui.findCityByName("Caesarea Philippi")?.id === "caesarea-philippi", "Caesarea Philippi lookup failed");
ok(ui.findCityByName("Caesarea Maritima")?.id === "caesarea-maritima", "Caesarea Maritima lookup failed");
ok(ui.findCityByName("Caesarea") == null, "bare Caesarea must not guess a city");

const requiredIds = [
  "caesarea-philippi",
  "caesarea-maritima",
  "antioch-syria",
  "salamis-cyprus",
  "paphos-cyprus",
  "pisidian-antioch"
];
const cities = sandbox.CITIES_DATA || [];
requiredIds.forEach((id) => {
  const city = cities.find((c) => c.id === id);
  ok(city, `missing city pin ${id}`);
  ok(city && city.teachings && city.teachings.teacher, `missing CITY_DOSSIER teachings for ${id}`);
});

const malta = cities.find((c) => c.id === "malta");
ok(malta && /Paul/.test(malta.teachings.teacher), `Malta teacher is "${malta && malta.teachings && malta.teachings.teacher}"`);
ok(malta && !/Jesus/.test(malta.teachings.teacher), "Malta still names Jesus as teacher");
ok(malta && !/synagogue/i.test(malta.teachings.whatWasTaught + malta.teachings.context) || /does not.*synagogue/i.test(malta.teachings.whatWasTaught + " " + malta.teachings.context), "Malta teachings do not deny a synagogue");
ok(malta && malta.hasSynagogue === false, "Malta synagogue badge should be false");
ok(/Mark 16:18/.test(malta.teachings.whatWasTaught) && /not taught content|Related footnote/i.test(malta.teachings.whatWasTaught), "Malta should mention Mark 16:18 only as a related footnote");

const eventMalta = ui.normalizeTeachings("event", { id: "event-malta-shipwreck", name: "The Shipwreck on the Island of Malta", title: "The Shipwreck on the Island of Malta" });
ok(/Paul/.test(eventMalta.teacher), `Malta event inherit teacher is "${eventMalta.teacher}"`);
ok(!/Jesus Christ &/.test(eventMalta.teacher), "Malta event still uses the old Jesus fallback");

const pisidian = ui.normalizeTeachings("city", { name: "Pisidian Antioch", id: "pisidian-antioch" });
ok(/Paul/.test(pisidian.teacher), "Pisidian Antioch teacher is not Paul");
ok(/Pisid/i.test(pisidian.context + pisidian.whatWasTaught) || /Acts 13/.test(JSON.stringify(pisidian)), "Pisidian teachings missing Acts 13");
ok(!/Orontes|first called Christians/i.test(pisidian.whatWasTaught), "Pisidian Antioch inherited Syrian Antioch content");

const paulineNoJesus = ["malta", "tarsus", "alexandria", "cyrene", "paphos-cyprus", "philippi", "rome"];
paulineNoJesus.forEach((id) => {
  const city = cities.find((c) => c.id === id);
  const t = city && city.teachings && city.teachings.teacher;
  ok(t && !/^Jesus Christ$/.test(t) && !/Jesus Christ & His Apostles/.test(t), `${id} teacher invents Jesus's personal ministry: "${t}"`);
});

const synagogueFalse = [
  "philippi", "paphos-cyprus", "bethlehem", "bethsaida", "jericho", "joppa",
  "tarsus", "colossae", "miletus", "cyrene", "laodicea", "pergamum",
  "smyrna", "philadelphia", "malta", "magdala", "tiberias", "bethany",
  "sardis", "rome", "antioch-syria", "emmaus"
];
synagogueFalse.forEach((id) => {
  const city = cities.find((c) => c.id === id);
  ok(city && city.hasSynagogue === false, `${id} hasSynagogue should be false (got ${city && city.hasSynagogue})`);
});
ok(cities.find((c) => c.id === "athens")?.hasSynagogue === true, "Athens synagogue badge should stay true");
ok(cities.find((c) => c.id === "salamis-cyprus")?.hasSynagogue === true, "Salamis synagogue badge should stay true");
ok(cities.find((c) => c.id === "pisidian-antioch")?.hasSynagogue === true, "Pisidian Antioch synagogue badge should stay true");

const pisidianCity = cities.find((c) => c.id === "pisidian-antioch");
const pisidianPassages = JSON.stringify(pisidianCity && pisidianCity.teachings && pisidianCity.teachings.passages);
ok(pisidianPassages.includes("Acts 13"), "Pisidian Antioch lost Acts 13 passages");
ok(!/Galatians 2/.test(pisidianPassages), "Pisidian Antioch still cites Galatians 2 (Syrian Antioch)");

const bethlehem = cities.find((c) => c.id === "bethlehem");
const bethTeacher = bethlehem && bethlehem.teachings && bethlehem.teachings.teacher;
ok(bethTeacher && !/Micah|Wise Men|Magi/i.test(bethTeacher), `Bethlehem teacher still lists Micah or Magi: "${bethTeacher}"`);
ok(bethlehem && /angel/i.test(bethlehem.teachings.teacher), "Bethlehem teacher should be the angelic announcement");

const nazareth = cities.find((c) => c.id === "nazareth");
ok(nazareth && /^Jesus/.test(nazareth.teachings.teacher) && !/Gabriel/i.test(nazareth.teachings.teacher), `Nazareth teacher should be Jesus, not Gabriel as co-teacher: "${nazareth && nazareth.teachings && nazareth.teachings.teacher}"`);
ok(nazareth && /Annunciation note|prior note/i.test(nazareth.teachings.audience + nazareth.teachings.whatWasTaught), "Nazareth should keep Gabriel as an Annunciation note");

const cana = cities.find((c) => c.id === "cana");
ok(cana && cana.teachings.teacher === "Jesus Christ", `Cana teacher should be Jesus only: "${cana && cana.teachings && cana.teachings.teacher}"`);
ok(cana && /counsel to the servants|not a teaching office/i.test(cana.teachings.whatWasTaught), "Cana should label Mary's John 2:5 as counsel, not teaching office");
ok(cana && /later reading|not the plain sense/i.test(cana.teachings.whatWasTaught), "Cana should not state OT→NT wine allegory as plain sense");

const bethsaida = cities.find((c) => c.id === "bethsaida");
ok(bethsaida && !/make Him an earthly political king|make him a king/i.test(bethsaida.teachings.howAccepted), "Bethsaida howAccepted still treats John 6:15 as a Bethsaida scene");
ok(bethsaida && /John 6:15/.test(bethsaida.teachings.context) && /Capernaum|Tiberias/.test(bethsaida.teachings.context), "Bethsaida should relocate John 6:15 to the Capernaum/Tiberias arc");
ok(bethsaida && bethsaida.teachings.passages.includes("Luke 9:10-17") && bethsaida.teachings.passages.includes("Mark 8:22-26") && bethsaida.teachings.passages.includes("Matthew 11:21-22"), "Bethsaida lost Luke 9 / Mark 8 / Matt 11 passages");
ok(bethsaida && !bethsaida.teachings.passages.some((p) => /John 6/.test(p)), "Bethsaida passages still include the John 6 feeding arc");

const jericho = cities.find((c) => c.id === "jericho");
ok(jericho && !jericho.teachings.passages.some((p) => /Luke 10/.test(p)), "Jericho teachings passages still list Luke 10 as a Jericho sermon");
ok(jericho && /parable/.test(jericho.teachings.context), "Jericho should mark Luke 10 as parable setting, not a local sermon");

const lystra = cities.find((c) => c.id === "lystra");
ok(lystra && /already/.test(lystra.teachings.howAccepted) && /Acts 16:1/.test(lystra.teachings.howAccepted), "Lystra should say Timothy was already a disciple (Acts 16:1)");
ok(lystra && /2 Timothy 1:5/.test(lystra.teachings.howAccepted) && !/conversion and spiritual formation of young Timothy/.test(lystra.teachings.howAccepted), "Lystra should not treat Lois/Eunice as an Acts 14 conversion");

const smyrna = cities.find((c) => c.id === "smyrna");
ok(smyrna && /later Christian memory/i.test(smyrna.teachings.howAccepted) && /Polycarp/.test(smyrna.teachings.howAccepted), "Smyrna should label Polycarp as later Christian memory");

const philadelphia = cities.find((c) => c.id === "philadelphia");
ok(philadelphia && !/1390|14th/.test(philadelphia.teachings.howAccepted), "Philadelphia howAccepted should stop at Revelation 3");
ok(philadelphia && /Revelation 3/.test(philadelphia.teachings.howAccepted), "Philadelphia howAccepted should cite Revelation 3");

const laodicea = cities.find((c) => c.id === "laodicea");
ok(laodicea && /epistle from Laodicea/i.test(laodicea.teachings.howAccepted) && !/lost Epistle/.test(laodicea.teachings.howAccepted + JSON.stringify(laodicea.epistles || [])), "Laodicea should treat Col 4:16 as a letter exchange, not a proven lost Pauline epistle");
ok(laodicea && /inference/.test(laodicea.teachings.howAccepted) && /later history/i.test(laodicea.teachings.howAccepted), "Laodicea should label Epaphras planting as inference and the Council as later history");

const pergamum = cities.find((c) => c.id === "pergamum");
ok(pergamum && /Antipas/.test(pergamum.teachings.howAccepted), "Pergamum lost Antipas");
ok(pergamum && !/lasting Christian center|Byzantine era/.test(pergamum.teachings.howAccepted), "Pergamum howAccepted still claims later civic triumph");

const thyatira = cities.find((c) => c.id === "thyatira");
ok(thyatira && /Reconstruction/.test(thyatira.teachings.context), "Thyatira should label guild/Apollo as reconstruction");
ok(thyatira && !/centuries of subsequent/.test(thyatira.teachings.howAccepted), "Thyatira howAccepted still invents centuries of witness");

const jerusalem = cities.find((c) => c.id === "jerusalem");
ok(jerusalem && /brother of the Lord/.test(jerusalem.teachings.teacher), "Jerusalem teacher should name James as brother of the Lord, not bishop");
ok(jerusalem && !/bishop/i.test(jerusalem.teachings.teacher + jerusalem.teachings.howAccepted), "Jerusalem teaching fields still use bishop");
ok(jerusalem && /Later history/.test(jerusalem.teachings.howAccepted) && /70/.test(jerusalem.teachings.howAccepted), "Jerusalem should label James ~62 and Temple 70 as later history");

const emmaus = cities.find((c) => c.id === "emmaus");
ok(emmaus && emmaus.lat && emmaus.lng, "Emmaus city pin missing");
ok(emmaus && /traditional/i.test(emmaus.jewishDiasporaInfo + (emmaus.overview || "")), "Emmaus pin should document traditional site identification");

const magdala = cities.find((c) => c.id === "magdala");
ok(magdala && magdala.teachings.passages.includes("Matthew 15:39"), "Magdala passages should include Matthew 15:39");
ok(magdala && /Magadan/.test(magdala.teachings.whatWasTaught) && /No synagogue sermon/i.test(magdala.teachings.whatWasTaught), "Magdala should be honest about coasts of Magdala/Magadan and no synagogue sermon");
ok(magdala && !/^Jesus Christ$/.test(magdala.teachings.teacher), `Magdala teacher still invents a local office: "${magdala && magdala.teachings && magdala.teachings.teacher}"`);
ok(magdala && /Matthew 15:39/.test(magdala.teachings.teacher) && /no synagogue sermon/i.test(magdala.teachings.teacher), "Magdala teacher should mirror Malta-style honesty (coasts recorded; no narrated synagogue sermon)");

const capernaumContext = cities.find((c) => c.id === "capernaum");
ok(capernaumContext && /Archaeological color \(not a verse\)/.test(capernaumContext.teachings.context), "Capernaum context should label basalt/Peter's house as archaeological color, not a verse");
ok(capernaumContext && /Mark 1:21/.test(capernaumContext.teachings.context), "Capernaum context should keep the synagogue on a verse (Mark 1:21)");

ok(cities.find((c) => c.id === "antioch-syria")?.hasSynagogue === false, "Antioch on the Orontes synagogue badge should be false (no narrated synagogue discourse)");

// --- Year-gate: no mortal-Jesus teacher on post-33 events (Joseph · Gospel) ---
const events = sandbox.TIMELINE_EVENTS || [];
const appearanceIds = new Set([
  "event-saul-conversion",
  "event-john-patmos-revelation",
  "savior-emmaus",
  "savior-resurrection",
  "savior-ascension"
]);

function isAllowedAppearance(ev) {
  if (!ev) return false;
  if (ev.id === "savior-emmaus") return ev.year == null || ev.year <= 30;
  if (appearanceIds.has(ev.id)) return true;
  return false;
}

events.forEach((ev) => {
  const t = ui.normalizeTeachings("event", ev);
  const teacher = (t && t.teacher) || "";
  if (ev.year > 33 && /^Jesus Christ/.test(teacher) && !isAllowedAppearance(ev)) {
    ok(false, `year ${ev.year} event "${ev.id}" teacher starts with Jesus Christ: "${teacher}"`);
  }
  const loc = `${ev.locationName || ""} ${ev.title || ""} ${ev.id || ""}`.toLowerCase();
  if (ev.year >= 34 && /samaria|ethiopian eunuch|philip/.test(loc) && /Jesus(\s+Christ)?/.test(teacher) && !/not this|not the earlier|not a later/.test(teacher)) {
    ok(false, `Samaria year ${ev.year} event "${ev.id}" still has Jesus teacher: "${teacher}"`);
  }
  if (ev.year >= 34 && /jerusalem/.test(loc) && /Jesus/.test(teacher) && !isAllowedAppearance(ev)) {
    ok(false, `Jerusalem year ${ev.year} event "${ev.id}" still has Jesus in teacher: "${teacher}"`);
  }
});

const fall = ui.normalizeTeachings("event", events.find((e) => e.id === "event-destruction-jerusalem") || {
  id: "event-destruction-jerusalem", year: 70, title: "Fall of Jerusalem & Burning of the Second Temple",
  locationName: "Temple Mount, Jerusalem", category: "historical"
});
ok(!/^Jesus Christ/.test(fall.teacher), `Fall of Jerusalem teacher starts with Jesus Christ: "${fall.teacher}"`);
ok(/Matthew 24:1-2|Matthew 24:1–2/.test(fall.teacher + fall.whatWasTaught + JSON.stringify(fall.passages)), "Fall of Jerusalem lost Matt 24:1–2");
ok(/Luke 21:20/.test(fall.teacher + fall.whatWasTaught + JSON.stringify(fall.passages)), "Fall of Jerusalem lost Luke 21:20");
ok(!/Apostles Peter and John/.test(fall.teacher), "Fall of Jerusalem still names Peter and John as 70 AD teachers");

const council = ui.normalizeTeachings("event", events.find((e) => e.id === "event-council-jerusalem") || {
  id: "event-council-jerusalem", year: 49, title: "The Apostolic Council of Jerusalem",
  locationName: "Jerusalem, Judea", category: "apostolic"
});
ok(/James/.test(council.teacher) && /Acts 15/.test(council.teacher + council.whatWasTaught), `Council teacher is "${council.teacher}"`);
ok(/Peter/.test(council.teacher) && /Paul/.test(council.teacher), "Council teacher missing Peter or Paul");
ok(!/^Jesus/.test(council.teacher) && !/Jesus Christ &/.test(council.teacher), `Council still uses a Jesus+Apostles teacher: "${council.teacher}"`);

const philip = ui.normalizeTeachings("event", events.find((e) => e.id === "event-philip-samaria-gaza") || {
  id: "event-philip-samaria-gaza", year: 34, title: "Philip in Samaria & the Ethiopian Eunuch",
  locationName: "Desert Road to Gaza", category: "apostolic"
});
ok(/^Philip/.test(philip.teacher) || /Philip \(Acts 8/.test(philip.teacher), `Philip event teacher is "${philip.teacher}"`);
ok(/Acts 8:5/.test(philip.teacher + philip.whatWasTaught + JSON.stringify(philip.passages)), "Philip event lost Acts 8:5");
ok(!/^Jesus Christ$/.test(philip.teacher) && !/^Jesus Christ \(/.test(philip.teacher), `Philip/Samaria year 34 still hardcodes Jesus: "${philip.teacher}"`);

const annunciation = ui.normalizeTeachings("event", {
  id: "savior-annunciation", year: -6, title: "The Annunciation in Nazareth",
  locationName: "Nazareth, Galilee", category: "nativity",
  scriptures: [{ ref: "Luke 1:26-38" }]
});
ok(/Gabriel/i.test(annunciation.teacher), `Annunciation teacher is "${annunciation.teacher}"`);
ok(!/^Jesus Christ$/.test(annunciation.teacher) && !/Jesus Christ \(/.test(annunciation.teacher), `Annunciation still uses Nazareth Jesus hardcode: "${annunciation.teacher}"`);
ok(/Luke 1:26/.test(annunciation.teacher + JSON.stringify(annunciation.passages)), "Annunciation lost Luke 1:26");

const settlement = ui.normalizeTeachings("event", {
  id: "savior-return-nazareth", year: -3, title: "Settlement in Nazareth",
  locationName: "Nazareth, Galilee", category: "childhood"
});
ok(!/^Jesus Christ$/.test(settlement.teacher), `Settlement Nazareth still uses Jesus hardcode: "${settlement.teacher}"`);
ok(/Matthew 2:19/.test(settlement.teacher + settlement.whatWasTaught + JSON.stringify(settlement.passages)), "Settlement lost Matthew 2:19–23");

const romeFire = ui.normalizeTeachings("event", events.find((e) => e.id === "event-neronian-persecution") || {
  id: "event-neronian-persecution", year: 64, title: "Great Fire of Rome & Neronian Persecution",
  locationName: "Rome", category: "persecution"
});
ok(!/hired house|Acts 28:30/.test(romeFire.teacher), `Rome fire still inherits Acts 28 hired-house teacher: "${romeFire.teacher}"`);
ok(/2 Timothy 4/.test(romeFire.teacher + romeFire.whatWasTaught + JSON.stringify(romeFire.passages)), "Rome fire lost 2 Timothy 4");

const templeSite = ui.normalizeTeachings("jerusalemSite", {
  id: "jer-temple-sanctuary", name: "The Second Temple (Herod's Temple)", category: "temple"
});
ok(/Matthew 21:12/.test(templeSite.teacher + templeSite.whatWasTaught + templeSite.context), "Temple site missing Matt 21:12–13 era");
ok(/Acts 3:1/.test(templeSite.teacher + templeSite.whatWasTaught + templeSite.context), "Temple site missing Acts 3:1–16 apostolic era");
ok(/not the Lord teaching after|thereafter Peter and John/.test(templeSite.teacher), `Temple site did not split eras: "${templeSite.teacher}"`);

const magdalaEventish = ui.normalizeTeachings("event", {
  id: "later-galilee", year: 67, title: "Later Galilee note", locationName: "Magdala, Galilee", category: "historical"
});
ok(!/^Jesus Christ$/.test(magdalaEventish.teacher), `Galilee catch-all still assigns Jesus to Magdala/post-33: "${magdalaEventish.teacher}"`);

const emmausOk = ui.normalizeTeachings("event", {
  id: "savior-emmaus", year: 30, title: "Appearance on the Road to Emmaus",
  locationName: "Road to Emmaus", category: "resurrection"
});
ok(/Risen|risen|Emmaus|Luke 24/.test(emmausOk.teacher + emmausOk.whatWasTaught + JSON.stringify(emmausOk.passages)), `Emmaus year 30 lost the resurrection appearance: "${emmausOk.teacher}"`);

const damascusOk = ui.normalizeTeachings("event", events.find((e) => e.id === "event-saul-conversion") || {
  id: "event-saul-conversion", year: 35, title: "Conversion of Saul on the Damascus Road",
  locationName: "Road to Damascus", category: "apostolic"
});
ok(/appeared|Acts 9/.test(damascusOk.teacher), `Damascus appearance teacher is "${damascusOk.teacher}"`);

const patmosOk = ui.normalizeTeachings("event", events.find((e) => e.id === "event-john-patmos-revelation") || {
  id: "event-john-patmos-revelation", year: 95, title: "John on Patmos: The Apocalypse",
  locationName: "Patmos", category: "prophecy"
});
ok(/glorified|vision|Patmos|Revelation 1/i.test(patmosOk.teacher), `Patmos teacher is "${patmosOk.teacher}"`);

// --- Joseph supplement (same PR) ---
const feeding = events.find((e) => e.id === "savior-feeding-5000") || {};
const feedingRefs = JSON.stringify(feeding.scriptures || []);
ok(/Luke 9:10/.test(feedingRefs), "Feeding 5,000 at Bethsaida lost Luke 9:10–17");
ok(/Mark 6/.test(feedingRefs) && /Matthew 14/.test(feedingRefs), "Feeding 5,000 lost Mark 6 / Matthew 14");
ok(!/John 6:9/.test(feedingRefs), "Feeding 5,000 still cites John 6:9–11 as the Bethsaida verse (John 6 does not name Bethsaida)");
const feedingT = ui.normalizeTeachings("event", feeding);
ok(/Luke 9:10/.test(feedingT.context + JSON.stringify(feedingT.passages)), "Feeding 5,000 teachings lost the Bethsaida desert-place cite");
ok(/John 6/.test(feedingT.context) && /Capernaum|Tiberias/.test(feedingT.context), "Feeding 5,000 should keep John 6 on the Capernaum/Tiberias arc");

const tiberiasD = cities.find((c) => c.id === "tiberias") || {};
ok(!/palace in Tiberias/.test((tiberiasD.overview || "") + (tiberiasD.eraChronology || "")), "Tiberias still invents a palace venue for Luke 9:7–9");
ok(/Luke 9:7/.test((tiberiasD.overview || "") + (tiberiasD.eraChronology || "")), "Tiberias lost Luke 9:7–9 for Herod hearing");

const ephesusD = cities.find((c) => c.id === "ephesus") || {};
ok(!/Timothy serves as bishop of Ephesus/.test(ephesusD.eraChronology || ""), "Ephesus era still titles Timothy bishop 63–66");
ok(/1 Timothy 1:3/.test(ephesusD.eraChronology || ""), "Ephesus era lost 1 Timothy 1:3");

const revolt = events.find((e) => e.id === "event-jewish-revolt") || {};
ok(/Luke 21:20/.test(JSON.stringify(revolt.scriptures || []) + (revolt.description || "")), "Jewish revolt lost Luke 21:20–21");
ok(/Eusebius|later (Christian )?memory/i.test(revolt.description || ""), "Jewish revolt should label Pella as later memory");

const neronian = events.find((e) => e.id === "event-neronian-persecution") || {};
ok(/early church testimony/i.test(neronian.description || "") && /not a New Testament verse/i.test(neronian.description || ""), "Neronian description should prefix Peter/Paul martyrdoms as early church testimony");

const transfig = events.find((e) => e.id === "savior-transfiguration") || {};
ok(!/on Mount Hermon/.test(transfig.title || ""), "Transfiguration title still treats Mount Hermon as a named fact");
ok(/high mountain/i.test(transfig.locationName || transfig.title || ""), "Transfiguration lost Matthew 17:1 high mountain");
ok(/traditional/i.test((transfig.locationName || "") + (transfig.description || "")), "Transfiguration should label Hermon as traditional ID only");
const transfigT = ui.normalizeTeachings("event", transfig);
ok(/traditional/i.test(transfigT.context), "Transfiguration teachings should label Hermon as traditional");

const patmosD = cities.find((c) => c.id === "patmos") || {};
ok(/Later Christian memory/.test(patmosD.eraChronology || ""), "Patmos era should label John's return to Ephesus as later memory");
ok(!/late 96 AD: John returns to Ephesus, where he spends his final years/.test(patmosD.eraChronology || ""), "Patmos era still states return to Ephesus as fact");

const philD = cities.find((c) => c.id === "philadelphia") || {};
ok(!/1390|14th/.test((philD.eraChronology || "") + (philD.teachings && philD.teachings.howAccepted || "")), "Philadelphia chronology/howAccepted still runs to 1390 / 14th century");
ok(/Revelation 3/.test(philD.eraChronology || ""), "Philadelphia era should stop at Revelation 3 (+ optional Ignatius)");

const tours = sandbox.TOURS_DATA || [];
ok(!JSON.stringify(tours).includes("Isle of Patmos (Cave of the Apocalypse)"), "Tours still title Patmos as Cave of the Apocalypse");
ok(/Patmos \(Revelation 1:9\)/.test(JSON.stringify(tours) + ((events.find((e) => e.id === "event-john-patmos-revelation") || {}).locationName || "")), "Patmos tour/event should name the isle (Rev 1:9)");

const pergD = cities.find((c) => c.id === "pergamum") || {};
ok(/Revelation 2:13/.test(pergD.peopleAndChurch || ""), "Pergamum lost Revelation 2:13 for Antipas");
ok(/legend|not a New Testament verse/i.test(pergD.peopleAndChurch || ""), "Pergamum should legend-label the bronze bull");
ok(/not a New Testament verse/.test(pergD.eraChronology || ""), "Pergamum era should legend-label ~92");

// --- Year>33 inherit: do not keep the wrong city's teachers ---
events.forEach((ev) => {
  if (ev.year <= 33) return;
  const teacher = ((ui.normalizeTeachings("event", ev) || {}).teacher) || "";
  const blob = `${ev.id} ${ev.title} ${ev.locationName || ""}`.toLowerCase();
  if (/Barnabas/.test(teacher) && /Agabus/.test(teacher) && !/event-church-antioch|gentile church at antioch/.test(blob)) {
    ok(false, `year ${ev.year} "${ev.id}" inherited Syrian Antioch teachers: "${teacher}"`);
  }
  if (/Paul/.test(teacher) && /Timothy/.test(teacher) && /John/.test(teacher) && ev.year >= 90) {
    ok(false, `year ${ev.year} "${ev.id}" inherited Ephesus Paul/Timothy/John teacher: "${teacher}"`);
  }
  if (/cornelius|peter-cornelius/.test(blob) && /Apostle Paul|Peter and the Apostle Paul/.test(teacher)) {
    ok(false, `"${ev.id}" Acts 10 scene still names Paul as teacher: "${teacher}"`);
  }
});

const gospelsWritten = ui.normalizeTeachings("event", events.find((e) => e.id === "event-gospels-written") || {
  id: "event-gospels-written", year: 75, title: "Compilation and Spread of the Four Gospels",
  locationName: "Antioch, Ephesus & Rome", category: "scripture"
});
ok(/not a single teaching scene|no one NT verse|not narrate a 75/i.test(gospelsWritten.teacher), `Gospels-written teacher is "${gospelsWritten.teacher}"`);
ok(!/Barnabas|Agabus/.test(gospelsWritten.teacher), `Gospels-written still inherits Antioch: "${gospelsWritten.teacher}"`);

const closeAge = ui.normalizeTeachings("event", events.find((e) => e.id === "event-close-apostolic-age") || {
  id: "event-close-apostolic-age", year: 100, title: "Close of the Apostolic Era",
  locationName: "Ephesus, Asia Minor", category: "apostolic"
});
ok(/later memory|not an Acts sermon/i.test(closeAge.teacher), `Close-apostolic-age teacher is "${closeAge.teacher}"`);
ok(!/Acts 19/.test(closeAge.teacher) && !/Paul \(Acts 19\)/.test(closeAge.teacher), `Close-apostolic-age still inherits Ephesus Paul teacher: "${closeAge.teacher}"`);

const cornelius = ui.normalizeTeachings("event", events.find((e) => e.id === "event-peter-cornelius") || {
  id: "event-peter-cornelius", year: 38, title: "Peter's Vision & Conversion of Cornelius",
  locationName: "Caesarea Maritima", category: "apostolic"
});
ok(/Peter/.test(cornelius.teacher) && !/Apostle Paul/.test(cornelius.teacher), `Cornelius event teacher is "${cornelius.teacher}"`);
ok(/Acts 10/.test(cornelius.teacher + cornelius.whatWasTaught + JSON.stringify(cornelius.passages)), "Cornelius event lost Acts 10");

ok(!/apostolic overseer/.test((ephesusD.overview || "") + (ephesusD.peopleAndChurch || "")), "Ephesus still calls Timothy apostolic overseer");
ok(/abide still at Ephesus|abide at Ephesus/.test((ephesusD.overview || "") + (ephesusD.peopleAndChurch || "")), "Ephesus lost 1 Timothy 1:3 abide wording");

if (fails.length) {
  console.error(`FAIL ${fails.length}`);
  fails.forEach((f) => console.error(" -", f));
  process.exit(1);
}
console.log("Scripture integrity checks passed.");
