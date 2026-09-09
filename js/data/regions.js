/**
 * Roman Provinces, Tetrarchies, and Biblical Regional Boundaries (~6 BC - 100 AD)
 * Contains complete 5-tab dossiers for every region:
 * 1. Overview & Topography
 * 2. Verbatim KJV Scriptures with direct ChurchofJesusChrist.org study links
 * 3. People & Church (Inhabitants, Apostles, Demographics)
 * 4. Political Insights (Roman Governors, Client Kings, Legal Jurisdiction)
 * 5. Sacred Era Chronology & Milestones
 */
const REGIONS_DATA = {
  regions: [
    {
      id: "judea",
      name: "Judea (Iudaea)",
      ancientName: "Yehudah / Provincia Iudaea",
      capital: "Jerusalem (Religious) / Caesarea Maritima (Administrative)",
      governor: "Herod the Great (-4 BC), Archelaus (-4 to 6 AD), Roman Prefects (Coponius, Valerius Gratus, Pontius Pilate 26–36 AD, Antonius Felix, Porcius Festus)",
      elevation: "700 m – 1,000 m (Judean Hill Country) descending to -430 m (Dead Sea)",
      color: "#92400E",
      bounds: [[31.3, 34.7], [32.1, 35.5]],
      summary: "The sacred covenant heartland of the Jewish people, centered upon the Holy City of Jerusalem, the Herodian Temple, the Nativity city of Bethlehem, and the Judean Wilderness.",
      overview: "Judea was the southern mountainous province of the Holy Land. To the east, the rugged hills drop precipitously through the barren Judean Wilderness down into the deep Jordan Rift Valley and the hypersaline Dead Sea. To the west, the Shephelah (foothills) descend to the fertile coastal plain. Judea was the arena of the Savior's birth (Bethlehem), baptism and temptation (Wilderness of Judea), triumph, agonizing Atonement (Gethsemane), trial before Pontius Pilate, Crucifixion (Golgotha), and glorious Resurrection.",
      scriptures: [
        {
          ref: "Acts 1:8",
          text: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/1?lang=eng#8"
        },
        {
          ref: "Matthew 2:1-2",
          text: "Now when Jesus was born in Bethlehem of Judaea in the days of Herod the king, behold, there came wise men from the east to Jerusalem, saying, Where is he that is born King of the Jews? for we have seen his star in the east, and are come to worship him.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/2?lang=eng#1"
        },
        {
          ref: "Luke 1:65",
          text: "And fear came on all that dwelt round about them: and all these sayings were noised abroad throughout all the hill country of Judaea.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/1?lang=eng#65"
        },
        {
          ref: "John 3:22",
          text: "After these things came Jesus and his disciples into the land of Judaea; and there he tarried with them, and baptized.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/3?lang=eng#22"
        }
      ],
      peopleAndChurch: "Inhabited predominantly by Judean Jews, the priestly Aaronic aristocracy, Levites, Pharisees, Sadducees, Essenes at Qumran, and Roman military contingents. The Mother Church at Jerusalem was governed by James the Just and the Twelve Apostles. During the persecution following Stephen's martyrdom, believers scattered throughout the regions of Judea and Samaria, establishing vibrant home congregations.",
      politicalInsights: "Following the deposition of Herod Archelaus in 6 AD, Judea was placed under direct equestrian Roman prefects headquartered at Caesarea Maritima. The prefect controlled military garrisons, imperial taxation, and the ultimate power of capital punishment (ius gladii), while the Jewish Sanhedrin exercised domestic religious authority. Deep anti-Roman zealot sentiment fueled sporadic revolts culminating in the catastrophic Great Jewish Revolt of 66–70 AD.",
      eraChronology: "~4 BC: Death of Herod the Great; 6 AD: Judea annexed as Roman Province; 26–36 AD: Prefecture of Pontius Pilate and Crucifixion of Christ; 30–66 AD: Rapid multiplication of the Judean church; 70 AD: Siege and total destruction of Jerusalem and the Temple by Roman General Titus."
    },
    {
      id: "galilee",
      name: "Galilee (Galilaea)",
      ancientName: "Galil HaGoyim (Galilee of the Nations)",
      capital: "Sepphoris (until ~20 AD) / Tiberias (founded by Herod Antipas)",
      governor: "Herod Antipas (Tetrarch, 4 BC – 39 AD), later Herod Agrippa I & II",
      elevation: "-212 m (Sea of Galilee) to 1,200 m (Upper Galilee)",
      color: "#D97706",
      bounds: [[32.5, 35.1], [33.1, 35.7]],
      summary: "The fertile northern region where Jesus was raised in Nazareth and conducted the vast majority of His mortal ministry, teachings, and miracles around the Sea of Galilee.",
      overview: "Divided into Lower Galilee (rolling fertile hills and agricultural valleys) and Upper Galilee (rugged forested mountains), the region is crowned by the freshwater Sea of Galilee (Lake of Gennesaret). Galilee enjoyed rich soil, abundant rainfall, thriving fisheries, and major international trade routes (Via Maris connecting Egypt and Damascus). Here Jesus made His headquarters at Capernaum, walked upon the waves, delivered the Sermon on the Mount, and called His disciples.",
      scriptures: [
        {
          ref: "Matthew 4:15-16",
          text: "The land of Zabulon, and the land of Nephthalim, by the way of the sea, beyond Jordan, Galilee of the Gentiles; The people which sat in darkness saw great light; and to them which sat in the region and shadow of death light is sprung up.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/4?lang=eng#15"
        },
        {
          ref: "Matthew 4:23",
          text: "And Jesus went about all Galilee, teaching in their synagogues, and preaching the gospel of the kingdom, and healing all manner of sickness and all manner of disease among the people.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/4?lang=eng#23"
        },
        {
          ref: "Acts 10:37",
          text: "That word, I say, ye know, which was published throughout all Judaea, and began from Galilee, after the baptism which John preached.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/10?lang=eng#37"
        }
      ],
      peopleAndChurch: "Populated by devout, hardworking Jewish farmers, fishermen, olive growers, and craftsmen, alongside Phoenician, Syrian, and Greek trading enclaves. Eleven of the Twelve Apostles were Galileans. Following the Resurrection, the Savior appeared to more than five hundred brethren at once on a mountain in Galilee (1 Cor 15:6, Matt 28:16).",
      politicalInsights: "Ruled as a semi-autonomous client tetrarchy under Herod Antipas for 43 years. Antipas modernized Sepphoris and built the Greco-Roman capital of Tiberias. While Antipas executed John the Baptist and interrogated Jesus during Passion Week, Galilee enjoyed relative internal stability compared to the volatile direct Roman administration in Judea.",
      eraChronology: "4 BC – 39 AD: Reign of Herod Antipas; ~27–30 AD: Public ministry of Jesus Christ; 41–44 AD: Unified under Herod Agrippa I; 67 AD: Roman legions under Vespasian reconquer Galilee during the Jewish War."
    },
    {
      id: "samaria",
      name: "Samaria (Samaritis)",
      ancientName: "Shomron / Sebaste",
      capital: "Sebaste (reconstructed by Herod the Great with a grand temple to Augustus)",
      governor: "Administered under the Roman Province of Judea",
      elevation: "400 m – 940 m (Mount Gerizim & Mount Ebal)",
      color: "#854D0E",
      bounds: [[32.0, 35.0], [32.5, 35.5]],
      summary: "Central hill country between Judea and Galilee. Home to the Samaritans who worshiped at Mount Gerizim; site of the Savior's discourse with the woman at Jacob's Well.",
      overview: "Samaria occupies the fertile central ridge of the Palestinian highlands, featuring olive terraces, barley valleys, and historic mountain passes. Mutual religious antipathy existed between Judeans and Samaritans since the Babylonian exile. Jewish pilgrims traveling between Galilee and Jerusalem frequently crossed the Jordan to avoid Samaria, but Jesus purposefully 'must needs go through Samaria' (John 4:4), modeling universal compassion in the Parable of the Good Samaritan and healing the ten lepers.",
      scriptures: [
        {
          ref: "John 4:4-7",
          text: "And he must needs go through Samaria. Then cometh he to a city of Samaria, which is called Sychar... Now Jacob's well was there. Jesus therefore, being wearied with his journey, sat thus on the well... There cometh a woman of Samaria to draw water: Jesus saith unto her, Give me to drink.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/4?lang=eng#4"
        },
        {
          ref: "Acts 8:5-6",
          text: "Then Philip went down to the city of Samaria, and preached Christ unto them. And the people with one accord gave heed unto those things which Philip spake, hearing and seeing the miracles which he did.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/8?lang=eng#5"
        },
        {
          ref: "Luke 10:33",
          text: "But a certain Samaritan, as he journeyed, came where he was: and when he saw him, he had compassion on him.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/10?lang=eng#33"
        }
      ],
      peopleAndChurch: "The Samaritans practiced an ancient form of Yahwistic religion based strictly on the Samaritan Pentateuch. Following the persecution in Jerusalem, Philip the Evangelist established a thriving church in Samaria, confirmed when Apostles Peter and John laid hands on converts to bestow the Gift of the Holy Ghost (Acts 8:14-17).",
      politicalInsights: "Herod the Great refounded the ancient city of Samaria as Sebaste, settling veteran Roman mercenaries and constructing temples to Caesar Augustus. Roman governors maintained heavy military surveillance over Mount Gerizim; in 36 AD, Pontius Pilate's violent suppression of a Samaritan religious gathering led to his recall to Rome.",
      eraChronology: "27 BC: Herod rebuilds Sebaste; ~28 AD: Jesus teaches at Sychar; ~34 AD: Apostolic mission of Philip, Peter, and John across Samaritan villages."
    },
    {
      id: "decapolis",
      name: "The Decapolis (Ten Cities)",
      ancientName: "Dekapolis (League of Ten Cities)",
      capital: "Scythopolis (Beth Shean) / Gadara / Philadelphia (Amman)",
      governor: "Semi-autonomous Hellenistic league under the Roman Legate of Syria",
      elevation: "-120 m to 800 m (Transjordanian Plateau)",
      color: "#65A30D",
      bounds: [[32.1, 35.6], [32.9, 36.3]],
      summary: "A confederation of ten Greco-Roman city-states east and south of the Sea of Galilee, characterized by Hellenistic theaters, colonnaded cardos, temples, and pagan populations.",
      overview: "Established following Pompey's conquest of the Near East in 63 BC, the Decapolis included Scythopolis, Gadara, Gerasa, Pella, Hippos, Philadelphia, Capitolias, Canatha, Abila, and Damascus. Jesus ministered here, casting out the legion of devils into the herd of swine at Gadara/Gergesa and feeding the four thousand.",
      scriptures: [
        {
          ref: "Mark 7:31",
          text: "And again, departing from the coasts of Tyre and Sidon, he came unto the sea of Galilee, through the midst of the coasts of Decapolis.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/mark/7?lang=eng#31"
        },
        {
          ref: "Mark 5:20",
          text: "And he departed, and began to publish in Decapolis how great things Jesus had done for him: and all men did marvel.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/mark/5?lang=eng#20"
        },
        {
          ref: "Matthew 4:25",
          text: "And there followed him great multitudes of people from Galilee, and from Decapolis, and from Jerusalem, and from Judaea, and from beyond Jordan.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/4?lang=eng#25"
        }
      ],
      peopleAndChurch: "Predominantly Greek-speaking gentiles, Syrian merchants, Roman colonists, and minority Jewish diaspora enclaves. Pella in the Decapolis served as the divine refuge for early Jerusalem Christians fleeing the Roman siege in 68 AD, heeding Christ's warning to 'flee into the mountains'.",
      politicalInsights: "Self-governing Hellenistic city republics allied under Roman imperial protection. Each city minted its own coinage and fielded its own municipal militia under ultimate supervision of the Legate of Syria.",
      eraChronology: "63 BC: Pompey frees Greek cities; ~29 AD: Jesus heals in Decapolis; 68 AD: Jerusalem Christians evacuate to Pella."
    },
    {
      id: "perea",
      name: "Perea (Beyond Jordan)",
      ancientName: "Peran tou Iordanou (The Land Beyond the Jordan)",
      capital: "Machaerus (Stronghold of Herod Antipas)",
      governor: "Herod Antipas (Tetrarch, 4 BC – 39 AD)",
      elevation: "300 m to 1,000 m (Highlands of Moab and Gilead)",
      color: "#CA8A04",
      bounds: [[31.5, 35.5], [32.3, 36.0]],
      summary: "Jewish territory east of the Jordan River and north of the Arnon River. Site of the mountain fortress of Machaerus where John the Baptist was imprisoned and beheaded.",
      overview: "Perea stretched along the eastern side of the Jordan Valley opposite Judea and Samaria. Culturally and religiously Jewish, it formed a political pair with Galilee under Herod Antipas. Jesus carried out an extensive late ministry in Perea during His final journey to Jerusalem, teaching the parables of the Lost Sheep, Lost Coin, and Prodigal Son.",
      scriptures: [
        {
          ref: "Matthew 19:1",
          text: "And it came to pass, that when Jesus had finished these sayings, he departed from Galilee, and came into the coasts of Judaea beyond Jordan.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/19?lang=eng#1"
        },
        {
          ref: "John 10:40-42",
          text: "And went away again beyond Jordan into the place where John at first baptized; and there he abode. And many resorted unto him... and many believed on him there.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/10?lang=eng#40"
        }
      ],
      peopleAndChurch: "Devout Jewish population maintaining strict Sabbath and pilgrim observance. After the execution of John the Baptist, many former disciples of John in Perea became followers of Jesus Christ.",
      politicalInsights: "Fortified by Herod the Great and Antipas to guard the southeastern border against the Nabataean Arab kingdom of Petra. Antipas's divorce of the Nabataean princess to marry Herodias sparked a border war with King Aretas IV in 36 AD.",
      eraChronology: "4 BC – 39 AD: Tetrarchy of Antipas; ~28–29 AD: Martyrdom of John the Baptist; ~29–30 AD: Perean ministry of Christ."
    },
    {
      id: "syria",
      name: "Syria (Provincia Syria)",
      ancientName: "Syria / Aram",
      capital: "Antioch on the Orontes (Third City of the Roman Empire)",
      governor: "Imperial Legate (governor of consular rank commanding four Roman legions)",
      elevation: "Sea level to 1,500 m",
      color: "#B45309",
      bounds: [[33.0, 35.0], [37.5, 38.0]],
      summary: "Massive Roman imperial frontier province. Antioch became the cradle of gentile Christianity, the site where believers were first called 'Christians', and the launchpad for Paul's journeys.",
      overview: "Syria was the northern anchor of Roman power in the Levant, bordered by the Euphrates River and Parthian Empire. Its grand capital, Antioch, was a bustling cosmopolitan metropolis with paved, lamp-lit colonnades, massive trade wealth, and a large Jewish diaspora. It was in Damascus, Syria, where Saul of Tarsus experienced his miraculous vision of the resurrected Christ.",
      scriptures: [
        {
          ref: "Acts 11:26",
          text: "And when he had found him, he brought him unto Antioch. And it came to pass, that a whole year they assembled themselves with the church, and taught much people. And the disciples were called Christians first in Antioch.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/11?lang=eng#26"
        },
        {
          ref: "Acts 9:3",
          text: "And as he journeyed, he came near Damascus: and suddenly there shined round about him a light from heaven: And he fell to the earth, and heard a voice saying unto him, Saul, Saul, why persecutest thou me?",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/9?lang=eng#3"
        },
        {
          ref: "Galatians 1:21",
          text: "Afterwards I came into the regions of Syria and Cilicia.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/gal/1?lang=eng#21"
        }
      ],
      peopleAndChurch: "Cosmopolitan mix of Greeks, Syrians, Romans, and Jews. The Antioch church was led by Barnabas, Simeon called Niger, Lucius of Cyrene, Manaen, and Paul. Antioch sent forth the first formal overseas Christian mission (Acts 13).",
      politicalInsights: "The Roman governor of Syria was one of the most powerful officials in the empire, commanding four frontline legions (III Gallica, VI Ferrata, X Fretensis, XII Fulminata) and holding authority to intervene in Judean affairs.",
      eraChronology: "64 BC: Pompey organizes Syria; ~34 AD: Conversion of Saul on road to Damascus; ~42 AD: Church at Antioch established; 47–57 AD: Launch of Paul's missionary expeditions."
    },
    {
      id: "asia",
      name: "Asia Proconsularis (Asia Minor)",
      ancientName: "Provincia Asia",
      capital: "Ephesus (Guardian of the Temple of Artemis / Great Commercial Harbor)",
      governor: "Senatorial Proconsul",
      elevation: "Sea level to 2,000 m (Anatolian Mountains)",
      color: "#C2410C",
      bounds: [[37.0, 26.5], [40.0, 30.5]],
      summary: "Wealthy, culturally sophisticated province in western modern Turkey. Epicenter of Paul's three-year ministry in Ephesus, later home to John the Revelator and the Seven Churches of Revelation.",
      overview: "Asia Proconsularis was the jewel of the Aegean world, dotted with wealthy Hellenistic metropolises (Ephesus, Smyrna, Pergamum, Sardis, Philadelphia, Laodicea, Colossae). Paul taught in the lecture hall of Tyrannus at Ephesus for over two years, so that 'all they which dwelt in Asia heard the word of the Lord' (Acts 19:10).",
      scriptures: [
        {
          ref: "Acts 19:10",
          text: "And this continued by the space of two years; so that all they which dwelt in Asia heard the word of the Lord Jesus, both Jews and Greeks.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/19?lang=eng#10"
        },
        {
          ref: "Revelation 1:11",
          text: "Saying, I am Alpha and Omega, the first and the last: and, What thou seest, write in a book, and send it unto the seven churches which are in Asia; unto Ephesus, and unto Smyrna, and unto Pergamos, and unto Thyatira, and unto Sardis, and unto Philadelphia, and unto Laodicea.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/rev/1?lang=eng#11"
        }
      ],
      peopleAndChurch: "Vibrant multi-ethnic urban congregations founded by Paul, Priscilla and Aquila, and Timothy. Later, the Apostle John ministered in Ephesus and was exiled to the nearby island of Patmos where he recorded the Apocalypse.",
      politicalInsights: "Governed by a senatorial proconsul of senior rank. Ephesus held the coveted title of Neokoros (Temple Warden) of Artemis and hosted the Roman provincial assize courts.",
      eraChronology: "133 BC: Bequeathed to Rome; 52–55 AD: Paul's extended ministry at Ephesus; ~95 AD: John exiled to Patmos, writes the Book of Revelation."
    },
    {
      id: "macedonia",
      name: "Macedonia",
      ancientName: "Provincia Macedonia",
      capital: "Thessalonica (Head of the Via Egnatia)",
      governor: "Roman Proconsul",
      elevation: "Sea level to 2,917 m (Mount Olympus)",
      color: "#0369A1",
      bounds: [[40.0, 21.0], [42.0, 25.5]],
      summary: "Northern Greece along the strategic military highway Via Egnatia. Gateway to Europe entered by Paul following the vision of the Macedonian Call.",
      overview: "Macedonia was the homeland of Alexander the Great. In response to a night vision of a man crying 'Come over into Macedonia, and help us' (Acts 16:9), Paul, Silas, and Luke crossed the Aegean Sea, planting the first European churches at Philippi, Thessalonica, and Berea.",
      scriptures: [
        {
          ref: "Acts 16:9-10",
          text: "And a vision appeared to Paul in the night; There stood a man of Macedonia, and prayed him, saying, Come over into Macedonia, and help us. And after he had seen the vision, immediately we endeavoured to go into Macedonia, assuredly gathering that the Lord had called us for to preach the gospel unto them.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/16?lang=eng#9"
        },
        {
          ref: "Philippians 1:3-5",
          text: "I thank my God upon every remembrance of you, Always in every prayer of mine for you all making request with joy, For your fellowship in the gospel from the first day until now.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/phil/1?lang=eng#3"
        }
      ],
      peopleAndChurch: "Lydia the seller of purple (first European convert), the Philippian jailer, Jason of Thessalonica, and noble Bereans who 'searched the scriptures daily'. The Macedonian churches were celebrated by Paul for their sacrificial generosity (2 Cor 8:1-4).",
      politicalInsights: "Philippi was a privileged Roman colony (Colonia Iulia Augusta Philippensis) with ius italicum (exemption from provincial taxation). Thessalonica was a free city (civitas libera) governed by elected politarchs (Acts 17:6).",
      eraChronology: "148 BC: Roman province established; 50 AD: Paul enters Macedonia on Second Journey; 51 AD: Writes 1 & 2 Thessalonians; ~62 AD: Writes Epistle to Philippians."
    },
    {
      id: "achaia",
      name: "Achaia (Classical Greece)",
      ancientName: "Provincia Achaea",
      capital: "Corinth (Double Harbor Isthmus)",
      governor: "Roman Proconsul (Lucius Junius Gallio, brother of philosopher Seneca, 51–52 AD)",
      elevation: "Sea level to 2,457 m (Mount Parnassus)",
      color: "#1D4ED8",
      bounds: [[36.5, 21.5], [39.0, 24.5]],
      summary: "Southern Greece, encompassing intellectual Athens (Areopagus / Mars' Hill) and the bustling maritime commercial crossroads of Corinth.",
      overview: "Achaia united classical intellectual prestige with vibrant Mediterranean trade. In Athens, Paul debated Stoic and Epicurean philosophers at Mars' Hill regarding the 'Unknown God'. In Corinth, Paul labored for eighteen months as a tentmaker alongside Aquila and Priscilla, establishing one of the largest early Christian churches.",
      scriptures: [
        {
          ref: "Acts 17:22-23",
          text: "Then Paul stood in the midst of Mars' hill, and said, Ye men of Athens, I perceive that in all things ye are too superstitious. For as I passed by, and beheld your devotions, I found an altar with this inscription, TO THE UNKNOWN GOD. Whom therefore ye ignorantly worship, him declare I unto you.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/17?lang=eng#22"
        },
        {
          ref: "1 Corinthians 1:2",
          text: "Unto the church of God which is at Corinth, to them that are sanctified in Christ Jesus, called to be saints, with all that in every place call upon the name of Jesus Christ our Lord.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/1-cor/1?lang=eng#2"
        }
      ],
      peopleAndChurch: "Dionysius the Areopagite, Damaris of Athens, Crispus the synagogue ruler, Gaius, Stephanas, and Erastus the city chamberlain. Paul wrote 1 & 2 Corinthians, Romans (from Corinth), and 1 & 2 Thessalonians (from Corinth) to guide these saints.",
      politicalInsights: "The proconsul Gallio dismissed charges brought against Paul by Corinthian adversaries (Acts 18:12-17), establishing an imperial legal precedent that protected Christian preaching under the legal mantle of Judaism.",
      eraChronology: "146 BC: Roman conquest; 44 BC: Caesar refounds Corinth; 50–52 AD: Paul's eighteen-month ministry at Corinth; 57 AD: Paul writes Epistle to the Romans from Corinth."
    },
    {
      id: "italia",
      name: "Italia & Rome",
      ancientName: "Italia / Urbs Roma",
      capital: "Rome (Imperial Capital of the Mediterranean World)",
      governor: "Emperor (Augustus, Tiberius, Caligula, Claudius, Nero, Vespasian, Titus, Domitian)",
      elevation: "Sea level to 1,000 m (Apennine Mountains)",
      color: "#991B1B",
      bounds: [[40.5, 11.5], [43.0, 15.5]],
      summary: "The sovereign imperial heart of the Roman Empire. Destination of Paul's appeal to Caesar; site of Peter and Paul's final ministries and martyrdoms under Nero.",
      overview: "Home to over one million inhabitants, Rome was the political, military, and financial epicenter of the ancient world. Early Christians met in secret home churches and underground catacombs. Paul arrived in Rome in chains around 60 AD, living under house arrest for two years while preaching the kingdom of God to the Praetorian Guard and Caesar's household (Phil 4:22).",
      scriptures: [
        {
          ref: "Romans 1:16",
          text: "For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth; to the Jew first, and also to the Greek.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/rom/1?lang=eng#16"
        },
        {
          ref: "Acts 28:30-31",
          text: "And Paul dwelt two whole years in his own hired house, and received all that came in unto him, Preaching the kingdom of God, and teaching those things which concern the Lord Jesus Christ, with all confidence, no man forbidding him.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/28?lang=eng#30"
        }
      ],
      peopleAndChurch: "Phoebe of Cenchrea, Priscilla and Aquila, Linus, Clement, and members of Caesar's household. Both Peter and Paul sealed their testimonies with martyrdom in Rome during the Neronian persecutions (~64–67 AD).",
      politicalInsights: "Center of imperial law and the Supreme Court of the Emperor. As a free Roman citizen, Paul invoked his right of appeal to Caesar (provocatio ad Caesarem), requiring Roman governors to transfer him safely to the capital.",
      eraChronology: "49 AD: Claudius expels Jews from Rome; ~57 AD: Paul writes Epistle to Romans; 60–62 AD: Paul's first Roman imprisonment; 64 AD: Great Fire of Rome and Nero's persecution; ~67 AD: Martyrdom of Peter and Paul."
    },
    {
      id: "egypt",
      name: "Aegyptus (Egypt)",
      ancientName: "Provincia Aegypti",
      capital: "Alexandria (Great Lighthouse & Library of Antiquity)",
      governor: "Imperial Equestrian Prefect (governing on behalf of the Emperor personally)",
      elevation: "Sea level to 200 m (Nile Delta)",
      color: "#B45309",
      bounds: [[30.0, 29.0], [32.0, 33.0]],
      summary: "Safe haven for the infant Christ fleeing Herod's Massacre of the Innocents. Home to Alexandria, the intellectual capital of Hellenistic Judaism and the Septuagint translation.",
      overview: "The Nile River valley provided unmatched grain wealth to Rome. Alexandria hosted the largest Jewish diaspora population in antiquity (occupying two of the city's five quarters) and produced scholar Philo, the Greek Septuagint Old Testament, and eloquent Christian preacher Apollos.",
      scriptures: [
        {
          ref: "Matthew 2:13-15",
          text: "The angel of the Lord appeareth to Joseph in a dream, saying, Arise, and take the young child and his mother, and flee into Egypt, and be thou there until I bring thee word... that it might be fulfilled which was spoken of the Lord by the prophet, saying, Out of Egypt have I called my son.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/2?lang=eng#13"
        },
        {
          ref: "Acts 18:24",
          text: "And a certain Jew named Apollos, born at Alexandria, an eloquent man, and mighty in the scriptures, came to Ephesus.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/18?lang=eng#24"
        }
      ],
      peopleAndChurch: "The infant Savior Jesus Christ, Mary, and Joseph; Apollos of Alexandria; John Mark (traditional founder of the Church of Alexandria).",
      politicalInsights: "Treated as the private personal estate of the Roman Emperor under an equestrian prefect, strictly forbidding senators from entering without imperial permission.",
      eraChronology: "~4 BC: Holy Family's flight into Egypt; ~40 AD: Philo leads Jewish embassy to Caligula; ~50 AD: Apollos ministers in Ephesus and Corinth."
    },
    {
      id: "cyprus",
      name: "Cyprus",
      ancientName: "Provincia Cyprus",
      capital: "Paphos (Administrative) / Salamis (Commercial)",
      governor: "Roman Proconsul (Sergius Paulus, converted under Paul's ministry)",
      elevation: "Sea level to 1,952 m (Troodos Mountains)",
      color: "#0F766E",
      bounds: [[34.5, 32.0], [35.5, 34.5]],
      summary: "Strategic copper and maritime island in the eastern Mediterranean. Homeland of Barnabas and the first foreign mission destination of Paul's First Journey.",
      overview: "Rich in timber and copper, Cyprus was an early haven for believers fleeing persecution in Jerusalem (Acts 11:19). Barnabas and Paul preached across the entire island from east to west (Salamis to Paphos), where Roman governor Sergius Paulus believed the gospel.",
      scriptures: [
        {
          ref: "Acts 13:4-7",
          text: "So they, being sent forth by the Holy Ghost, departed unto Seleucia; and from thence they sailed to Cyprus... and when they were at Salamis, they preached the word of God in the synagogues of the Jews... And when they had gone through the isle unto Paphos, they found a certain sorcerer, a false prophet... which was with the deputy of the country, Sergius Paulus, a prudent man; who called for Barnabas and Saul, and desired to hear the word of God.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/13?lang=eng#4"
        },
        {
          ref: "Acts 4:36",
          text: "And Joses, who by the apostles was surnamed Barnabas, (which is, being interpreted, The son of consolation,) a Levite, and of the country of Cyprus.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/4?lang=eng#36"
        }
      ],
      peopleAndChurch: "Barnabas, John Mark, Mnason of Cyprus ('an old disciple', Acts 21:16), and Proconsul Sergius Paulus. Barnabas later returned to Cyprus with Mark to strengthen the island congregations.",
      politicalInsights: "Administered as a senatorial province under a propraetorian proconsul with headquarters at Paphos.",
      eraChronology: "58 BC: Annexed by Rome; 47 AD: Paul, Barnabas, and Mark traverse the island; 50 AD: Barnabas and Mark return to Cyprus."
    }
  ],

  // Camera Presets for Quick Focus Buttons
  cameraPresets: {
    "holy-land": { center: [32.1, 35.3], zoom: 9 },
    "galilee": { center: [32.85, 35.55], zoom: 11 },
    "jerusalem": { center: [31.7775, 35.2355], zoom: 15 },
    "mediterranean": { center: [36.5, 27.5], zoom: 5 },
    "asia-minor": { center: [38.5, 28.5], zoom: 7 },
    "greece": { center: [39.2, 23.0], zoom: 7 },
    "rome": { center: [41.9, 13.5], zoom: 7 },
    "egypt": { center: [31.2, 30.5], zoom: 8 }
  }
};
