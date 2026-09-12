/**
 * Granular Sites and Sacred Landmarks of 1st-Century Herodian Jerusalem (~6 BC - 100 AD)
 * Contains exact micro-coordinates, KJV scriptures, ChurchofJesusChrist.org direct study links,
 * historical overviews, biblical witnesses, and political/cultural insights under Roman rule.
 */
const JERUSALEM_SITES = [
  {
    id: "jer-temple-sanctuary",
    name: "The Second Temple (Herod's Temple)",
    ancientName: "Beit HaMikdash",
    area: "Temple Mount",
    lat: 31.7780,
    lng: 35.2354,
    category: "temple",
    icon: "🏛️",
    summary: "The glorious spiritual heart of Israel, reconstructed on an immense scale by Herod the Great with massive white limestone blocks and gleaming gold plating.",
    overview: "The Temple Mount was the epicenter of Jewish worship, national identity, and pilgrim gatherings. Here the Holy Place and Holy of Holies stood behind the sacred veil. Jesus visited the Temple as a twelve-year-old boy, taught daily during festival pilgrimages, and prophesied that not one stone would be left upon another.",
    scriptures: [
      {
        ref: "Matthew 24:1-2",
        text: "And Jesus went out, and departed from the temple: and his disciples came to him for to shew him the buildings of the temple. And Jesus said unto them, See ye not all these things? verily I say unto you, There shall not be left here one stone upon another, that shall not be thrown down.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/24?lang=eng#1"
      },
      {
        ref: "Luke 2:46-49",
        text: "After three days they found him in the temple, sitting in the midst of the doctors, both hearing them, and asking them questions... And he said unto them, How is it that ye sought me? wist ye not that I must be about my Father's business?",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/2?lang=eng#46"
      },
      {
        ref: "John 2:19-21",
        text: "Jesus answered and said unto them, Destroy this temple, and in three days I will raise it up... But he spake of the temple of his body.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/2?lang=eng#19"
      }
    ],
    peopleAndChurch: "Zechariah the priest (father of John the Baptist) burning incense; Simeon and the prophetess Anna blessing the infant Christ; the twelve-year-old Jesus with the doctors of the law; the Sanhedrin priests; the Apostles Peter and John continuing in daily prayer.",
    politicalInsights: "Herod the Great poured colossal treasury wealth into expanding the Temple Mount esplanade into the largest sacred precinct of the classical Mediterranean to curry favor with his Jewish subjects. The Roman Prefect in Caesarea kept custody of the High Priest's holy vestments in the adjacent Antonia Fortress, releasing them only during pilgrimage festivals.",
    eraChronology: "• ~20 BC: Herod begins rebuilding the Temple.\n• ~8 AD: The twelve-year-old Jesus in the temple (Luke 2:46–49).\n• ~27–30 AD: Jesus teaches and cleanses the Temple (Matthew 21:12–13; John 2:13–17)—mortal ministry, not later.\n• After Pentecost: Peter and John in the temple (Acts 3:1–16); apostolic meeting place ~30–66 AD.\n• 70 AD: Destroyed by Titus (not a New Testament narrative)."
  },
  {
    id: "jer-court-gentiles",
    name: "Court of the Gentiles & Cleansing of the Temple",
    ancientName: "Atrium Gentium",
    area: "Temple Mount (Outer Court)",
    lat: 31.7770,
    lng: 35.2350,
    category: "temple",
    icon: "🕊️",
    summary: "The vast outer stone court of the Temple where non-Jews could assemble, commercialized by extortionate animal merchants and currency changers.",
    overview: "Jesus twice cleansed this sacred space—overturning tables and casting out those who bought and sold. A stone balustrade (the Soreg) stood at the inner boundary, bearing inscribed warnings forbidding Gentiles to proceed further upon pain of death ('the middle wall of partition' referenced in Ephesians 2:14).",
    scriptures: [
      {
        ref: "Matthew 21:12-13",
        text: "And Jesus went into the temple of God, and cast out all them that sold and bought in the temple, and overthrew the tables of the moneychangers, and the seats of them that sold doves, And said unto them, It is written, My house shall be called the house of prayer; but ye have made it a den of thieves.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/21?lang=eng#12"
      },
      {
        ref: "Ephesians 2:14",
        text: "For he is our peace, who hath made both one, and hath broken down the middle wall of partition between us.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/eph/2?lang=eng#14"
      }
    ],
    peopleAndChurch: "Temple merchants, money changers converting Roman and Greek coins into Tyrian shekels, Annas and the aristocratic Sadducean high priestly family who leased the market booths (Bazaars of Annas), visiting Greek pilgrims seeking Jesus (John 12:20).",
    politicalInsights: "The money-changing franchise was a lucrative monopoly managed by the Sadducean high priestly family. By attacking this commercial apparatus on Monday of Passion Week, Jesus directly threatened the chief priests' economic and political supremacy, accelerating their conspiracy to crucify Him.",
    eraChronology: "Scene of Jesus's righteous zeal on Nisan 10, Spring 30 AD."
  },
  {
    id: "jer-solomons-porch",
    name: "Solomon's Porch & The Beautiful Gate",
    ancientName: "Porticus Salomonis",
    area: "Temple Mount (Eastern Colonnade)",
    lat: 31.7778,
    lng: 35.2370,
    category: "temple",
    icon: "🏛️",
    summary: "The grand covered colonnade running along the eastern boundary of the Temple Mount, overlooking the Kidron Valley.",
    overview: "During the winter Feast of Dedication (Hanukkah), Jesus walked in Solomon's Porch and declared: 'I and my Father are one' (John 10:30). Following Pentecost, the early Christian Church met here daily with one accord, and Peter and John healed a man lame from birth at the adjacent Beautiful Gate.",
    scriptures: [
      {
        ref: "Acts 3:1-8, 11",
        text: "Now Peter and John went up together into the temple at the hour of prayer, being the ninth hour. And a certain man lame from his mother's womb was carried, whom they laid daily at the gate of the temple which is called Beautiful... And Peter said, Silver and gold have I none; but such as I have give I thee: In the name of Jesus Christ of Nazareth rise up and walk... And all the people ran together unto them in the porch that is called Solomon's, greatly wondering.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/3?lang=eng#1"
      },
      {
        ref: "John 10:22-23",
        text: "And it was at Jerusalem the feast of the dedication, and it was winter. And Jesus walked in the temple in Solomon's porch.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/10?lang=eng#22"
      }
    ],
    peopleAndChurch: "Peter, John, the healed lame man walking and leaping and praising God; the thousands of believers gathering for apostolic teaching (Acts 5:12).",
    politicalInsights: "The Apostles boldly utilized public space within the Temple precinct under the eyes of the Temple Guard (commanded by the Saggan) to proclaim Christ's resurrection, resulting in their repeated arrests and miraculous angelic deliverances from prison.",
    eraChronology: "• Winter ~29 AD: Jesus walked in Solomon's porch at the feast of the dedication (John 10:22–30)—mortal ministry.\n• After Pentecost: Peter and John, and the church in Solomon's porch (Acts 3:11; 5:12)—apostolic, not the Lord discoursing in 30–35 AD."
  },
  {
    id: "jer-antonia-fortress",
    name: "Antonia Fortress (Roman Military Citadel)",
    ancientName: "Castra Antonia",
    area: "Northwest Corner of Temple Mount",
    lat: 31.7792,
    lng: 35.2340,
    category: "roman",
    icon: "🛡️",
    summary: "The imposing Roman fortress built by Herod and named for Mark Antony, housing the Roman garrison overlooking the Temple.",
    overview: "From its high stone battlements, Roman soldiers kept watch over volatile crowds during Jewish festivals. When a mob dragged Paul from the Temple court and beat him, Roman Tribune Claudius Lysias and centurions rushed down the stairs to rescue him. Paul stood on these very steps to address the multitude in Hebrew (Acts 21–22).",
    scriptures: [
      {
        ref: "Acts 21:31-40",
        text: "And as they went about to kill him, tidings came unto the chief captain of the band, that all Jerusalem was in an uproar... Who immediately took soldiers and centurions, and ran down unto them... Then the chief captain took him, and commanded him to be carried into the castle... Paul stood on the stairs, and beckoned with the hand unto the people.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/21?lang=eng#31"
      },
      {
        ref: "Acts 22:24-29",
        text: "The chief captain commanded him to be brought into the castle... And as they bound him with thongs, Paul said unto the centurion that stood by, Is it lawful for you to scourge a man that is a Roman, and uncondemned?",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/22?lang=eng#24"
      }
    ],
    peopleAndChurch: "The Apostle Paul, Roman Tribune Claudius Lysias, Roman centurions, the Sanhedrin council, Paul's nephew who warned the Tribune of an ambush conspiracy (Acts 23).",
    politicalInsights: "The fortress housed the Cohors I Augusta, roughly 500 to 1,000 Roman legionaries. The garrison was the military instrument of imperial Roman control in Jerusalem, primed to suppress anti-Roman riots instantly.",
    eraChronology: "Constructed ~35 BC; scene of Paul's rescue and defense in 58 AD; first stronghold captured and breached by Titus in 70 AD."
  },
  {
    id: "jer-gethsemane",
    name: "The Garden of Gethsemane",
    ancientName: "Gat Shmanim (Oil Press)",
    area: "Foot of Mount of Olives / Kidron Valley",
    lat: 31.7794,
    lng: 35.2397,
    category: "passion",
    icon: "🫒",
    summary: "The quiet olive orchard across the Brook Kidron where the Savior offered the infinite Atoning Sacrifice.",
    overview: "Following the Last Supper, Jesus retired with His disciples to this olive grove. Taking Peter, James, and John deeper into the garden, He knelt in anguish. There, taking upon Himself the weight of all human sins, griefs, and pains, He bled at every pore and submitted to the Father's will: 'Not my will, but thine, be done.' Here Judas betrayed Him with a kiss.",
    scriptures: [
      {
        ref: "Luke 22:39-44",
        text: "And he came out, and went, as he was wont, to the mount of Olives; and his disciples also followed him... And he was withdrawn from them about a stone's cast, and kneeled down, and prayed, Saying, Father, if thou be willing, remove this cup from me: nevertheless not my will, but thine, be done. And there appeared an angel unto him from heaven, strengthening him. And being in an agony he prayed more earnestly: and his sweat was as it were great drops of blood falling down to the ground.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/22?lang=eng#39"
      },
      {
        ref: "Matthew 26:36-46",
        text: "Then cometh Jesus with them unto a place called Gethsemane, and saith unto the disciples, Sit ye here, while I go and pray yonder... My soul is exceeding sorrowful, even unto death: tarry ye here, and watch with me.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/26?lang=eng#36"
      },
      {
        ref: "John 18:1-11",
        text: "When Jesus had spoken these words, he went forth with his disciples over the brook Cedron, where was a garden, into the which he entered, and his disciples... And Judas also, which betrayed him, knew the place.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/18?lang=eng#1"
      }
    ],
    peopleAndChurch: "The Savior Jesus Christ, Peter, James, John, the strengthening angel from heaven, Judas Iscariot, Malchus (whose severed ear Jesus healed), the armed band of Temple officers and Roman cohort.",
    politicalInsights: "Judas conspired with the chief priests to arrest Jesus in secret by night, away from the Passover crowds who revered Him as a prophet, fearing an uprising in the city.",
    eraChronology: "Thursday Night / Friday Early Morning, Nisan 14, Spring 30 AD."
  },
  {
    id: "jer-mount-olives-summit",
    name: "Mount of Olives Summit & Site of the Ascension",
    ancientName: "Har HaZeitim",
    area: "Eastern Ridge Overlooking Jerusalem",
    lat: 31.7785,
    lng: 35.2450,
    category: "resurrection",
    icon: "☁️",
    summary: "The sacred ridge east of Jerusalem where Jesus delivered the Olivet Discourse and ascended into heaven.",
    overview: "Standing higher than the Temple Mount, the summit offers panoramic vistas of the holy city. Here Jesus gave the great Olivet Discourse regarding the destruction of Jerusalem and the signs of His Second Coming. Forty days after His resurrection, He gathered the Eleven here, imparted His final blessing, and ascended into heaven in a cloud.",
    scriptures: [
      {
        ref: "Acts 1:9-12",
        text: "And when he had spoken these things, while they beheld, he was taken up; and a cloud received him out of their sight. And while they looked stedfastly toward heaven as he went up, behold, two men stood by them in white apparel; Which also said, Ye men of Galilee, why stand ye gazing up into heaven? this same Jesus, which is taken up from you into heaven, shall so come in like manner as ye have seen him go into heaven. Then returned they unto Jerusalem from the mount called Olivet.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/1?lang=eng#9"
      },
      {
        ref: "Matthew 24:3",
        text: "And as he sat upon the mount of Olives, the disciples came unto him privately, saying, Tell us, when shall these things be? and what shall be the sign of thy coming, and of the end of the world?",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/24?lang=eng#3"
      }
    ],
    peopleAndChurch: "The risen Lord Jesus Christ, the Eleven Apostles, the two angels in white apparel testifying of the Second Coming.",
    politicalInsights: "In Zechariah 14:4, the Messiah's feet are prophesied to stand upon the Mount of Olives. The Roman 10th Legion (Fretensis) later encamped on this summit in 70 AD to bombard the city with catapults.",
    eraChronology: "Scene of Christ's Olivet teachings (Spring 30 AD) and Ascension (40 days post-resurrection, Spring 30 AD)."
  },
  {
    id: "jer-upper-room",
    name: "The Upper Room (Cenacle on Mount Zion)",
    ancientName: "Coenaculum / Upper City",
    area: "Western Hill / Mount Zion",
    lat: 31.7717,
    lng: 35.2289,
    category: "passion",
    icon: "🍷",
    summary: "The furnished upper room where the Last Supper was held and where the Holy Spirit fell on Pentecost.",
    overview: "In this private chamber in Jerusalem's Upper City, Jesus observed the Passover meal with the Twelve. He washed the disciples' feet, instituted the ordinance of the Sacrament / Lord's Supper, identified Judas as His betrayer, and promised the Comforter. Following the Ascension, the 120 disciples continued here in prayer until the Day of Pentecost.",
    scriptures: [
      {
        ref: "Luke 22:12-20",
        text: "And he shall shew you a large upper room furnished: there make ready... And he took bread, and gave thanks, and brake it, and gave unto them, saying, This is my body which is given for you: this do in remembrance of me. Likewise also the cup after supper, saying, This cup is the new testament in my blood, which is shed for you.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/22?lang=eng#12"
      },
      {
        ref: "Acts 1:13-14",
        text: "And when they were come in, they went up into an upper room, where abode both Peter, and James, and John... These all continued with one accord in prayer and supplication, with the women, and Mary the mother of Jesus, and with his brethren.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/1?lang=eng#13"
      },
      {
        ref: "Acts 2:1-4",
        text: "And when the day of Pentecost was fully come, they were all with one accord in one place. And suddenly there came a sound from heaven as of a rushing mighty wind... And they were all filled with the Holy Ghost.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/2?lang=eng#1"
      }
    ],
    peopleAndChurch: "The Savior, the Twelve Apostles, Mary the mother of Jesus, His brethren, and the 120 disciples gathered at Pentecost.",
    politicalInsights: "The Upper City was home to affluent and aristocratic Jerusalem families. Disciples secured this spacious room through an anonymous householder bearing a pitcher of water (a distinctive signal, as women typically carried water jars).",
    eraChronology: "Thursday Evening, Nisan 14, 30 AD (Last Supper); Summer 30 AD (Day of Pentecost)."
  },
  {
    id: "jer-caiaphas-palace",
    name: "Palace of Caiaphas & Peter's Denials",
    ancientName: "Domus Caiaphas / Sanhedrin Court",
    area: "Upper City / Mount Zion",
    lat: 31.7725,
    lng: 35.2295,
    category: "passion",
    icon: "⚖️",
    summary: "The luxurious mansion of the High Priest where Jesus faced late-night interrogation and Peter denied knowing Him.",
    overview: "Arrested in Gethsemane, Jesus was brought first to Annas and then to the palace of his son-in-law Joseph Caiaphas, the presiding High Priest. In the courtyard around a charcoal fire, Peter denied three times that he knew Jesus before the cock crew, whereupon Jesus turned and looked upon Peter, and Peter wept bitterly.",
    scriptures: [
      {
        ref: "Matthew 26:57, 63-65",
        text: "And they that had laid hold on Jesus led him away to Caiaphas the high priest, where the scribes and the elders were assembled... And the high priest said unto him, I adjure thee by the living God, that thou tell us whether thou be the Christ, the Son of God. Jesus saith unto him, Thou hast said... Then the high priest rent his clothes, saying, He hath spoken blasphemy.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/26?lang=eng#57"
      },
      {
        ref: "Luke 22:61-62",
        text: "And the Lord turned, and looked upon Peter. And Peter remembered the word of the Lord, how he had said unto him, Before the cock crow, thou shalt deny me thrice. And Peter went out, and wept bitterly.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/22?lang=eng#61"
      }
    ],
    peopleAndChurch: "High Priest Caiaphas, former High Priest Annas, members of the Sanhedrin, false witnesses, temple guards, Peter, John, and the courtyard servant maid.",
    politicalInsights: "Caiaphas served as High Priest for 18 consecutive years (18–36 AD) by maintaining a shrewd political alliance with Roman Prefect Pontius Pilate. Under Roman law, the Sanhedrin lacked the authority to execute capital punishment (John 18:31), necessitating transfer of Jesus to the Roman governor.",
    eraChronology: "Midnight to dawn, Friday, Nisan 14, 30 AD."
  },
  {
    id: "jer-praetorium-pilate",
    name: "The Praetorium (Herod's Palace / Pilate's Judgment Hall)",
    ancientName: "Praetorium Caesaris",
    area: "Western City Wall (Near Jaffa Gate)",
    lat: 31.7758,
    lng: 35.2280,
    category: "passion",
    icon: "👑",
    summary: "The palatial fortress where Roman Governor Pontius Pilate examined Jesus, offered Barabbas, and delivered Christ to be crucified.",
    overview: "At daybreak, the Jewish leaders brought Jesus to the Praetorium. Pilate interrogated Christ regarding His kingship: 'My kingdom is not of this world.' Finding no fault, Pilate sent Him briefly to Herod Antipas, then scourged Jesus. Soldiers crowned Him with thorns and clothed Him in purple. Caving to political blackmail ('If thou let this man go, thou art not Caesar's friend'), Pilate washed his hands and condemned Christ.",
    scriptures: [
      {
        ref: "John 18:33, 36-38",
        text: "Then Pilate entered into the judgment hall again, and called Jesus, and said unto him, Art thou the King of the Jews?... Jesus answered, My kingdom is not of this world... Pilate saith unto him, What is truth? And when he had said this, he went out again unto the Jews, and saith unto them, I find in him no fault at all.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/18?lang=eng#33"
      },
      {
        ref: "Matthew 27:24-26",
        text: "When Pilate saw that he could prevail nothing, but that rather a tumult was made, he took water, and washed his hands before the multitude, saying, I am innocent of the blood of this just person: see ye to it... Then released he Barabbas unto them: and when he had scourged Jesus, he delivered him to be crucified.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/27?lang=eng#24"
      }
    ],
    peopleAndChurch: "Pontius Pilate (Roman Prefect), Jesus Christ, Claudia Procula (Pilate's wife who warned him of her dream), the robber Barabbas, Roman soldiers scourging and mocking Christ, the incited crowd shouting 'Crucify him!'.",
    politicalInsights: "Pilate had strained relations with Emperor Tiberius following earlier diplomatic blunders (bringing Roman standards with Caesar's effigies into Jerusalem). The Jewish hierarchy exploited his vulnerable political standing to force Christ's execution under threat of accusing Pilate of treason against Caesar.",
    eraChronology: "Friday Morning, Nisan 14, 30 AD (~6:00 AM – 9:00 AM)."
  },
  {
    id: "jer-golgotha-calvary",
    name: "Golgotha / Calvary (Place of the Skull)",
    ancientName: "Golgotha / Calvaria",
    area: "Outside the Second Wall (Northwest)",
    lat: 31.7785,
    lng: 35.2298,
    category: "passion",
    icon: "✝️",
    summary: "The rocky knoll outside the city gate where the Son of God was lifted up on the cross for the salvation of mankind.",
    overview: "Bearing His cross down the Via Dolorosa, Jesus arrived at Golgotha. Nailed between two thieves beneath an inscription in Hebrew, Greek, and Latin ('JESUS OF NAZARETH THE KING OF THE JEWS'), He forgave His executioners, entrusted Mary to John, and cried with a loud voice: 'It is finished!' Darkness covered the land from the sixth to the ninth hour as the veil of the temple was rent in twain.",
    scriptures: [
      {
        ref: "Luke 23:33-46",
        text: "And when they were come to the place, which is called Calvary, there they crucified him, and the malefactors, one on the right hand, and the other on the left. Then said Jesus, Father, forgive them; for they know not what they do... And it was about the sixth hour, and there was a darkness over all the earth until the ninth hour. And the sun was darkened, and the veil of the temple was rent in the midst. And when Jesus had cried with a loud voice, he said, Father, into thy hands I commend my spirit: and having said thus, he gave up the ghost.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/23?lang=eng#33"
      },
      {
        ref: "John 19:25-30",
        text: "Now there stood by the cross of Jesus his mother, and his mother's sister, Mary the wife of Cleophas, and Mary Magdalene. When Jesus therefore saw his mother, and the disciple standing by, whom he loved, he saith unto his mother, Woman, behold thy son!... When Jesus therefore had received the vinegar, he said, It is finished: and he bowed his head, and gave up the ghost.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/19?lang=eng#25"
      }
    ],
    peopleAndChurch: "The Savior, Mary the mother of Jesus, the Apostle John, Mary Magdalene, Mary the wife of Cleophas, the repentant thief, the unrepentant thief, the Roman Centurion who confessed 'Truly this was the Son of God!', Roman legionaries casting lots for His seamless robe.",
    politicalInsights: "Crucifixion was the supreme Roman penalty reserved for rebels, insurrectionists, and non-Roman slaves. Executions were conducted publicly beside main roads outside city gates to terrorize subject populations into submission to the Pax Romana.",
    eraChronology: "Friday, Nisan 14, 30 AD (Crucified ~9:00 AM, died ~3:00 PM)."
  },
  {
    id: "jer-garden-tomb",
    name: "The Garden Tomb & Holy Sepulchre (The Empty Tomb)",
    ancientName: "Sepulchrum Christi",
    area: "Garden Outside Damascus Gate / Second Wall",
    lat: 31.7836,
    lng: 35.2300,
    category: "resurrection",
    icon: "🌅",
    summary: "The rock-hewn sepulchre in an ancient garden where Christ's body was laid, and from which He rose victorious over death.",
    overview: "Joseph of Arimathea and Nicodemus took down the body of Jesus, wrapped it in clean linen with hundredweight spices of myrrh and aloes, and placed it in a brand-new tomb hewn out of rock. A massive circular rolling stone sealed the entrance, secured with a Roman wax seal and armed guard. On the first day of the week, angels rolled away the stone: 'He is not here: for he is risen!'",
    scriptures: [
      {
        ref: "Matthew 28:1-6",
        text: "In the end of the sabbath, as it began to dawn toward the first day of the week, came Mary Magdalene and the other Mary to see the sepulchre. And, behold, there was a great earthquake: for the angel of the Lord descended from heaven, and came and rolled back the stone from the door, and sat upon it... And the angel answered and said unto the women, Fear not ye: for I know that ye seek Jesus, which was crucified. He is not here: for he is risen, as he said. Come, see the place where the Lord lay.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/28?lang=eng#1"
      },
      {
        ref: "John 20:11-17",
        text: "But Mary stood without at the sepulchre weeping... Jesus saith unto her, Woman, why weepest thou? whom seekest thou? She, supposing him to be the gardener, saith unto him, Sir, if thou have borne him hence, tell me where thou hast laid him, and I will take him away. Jesus saith unto her, Mary. She turned herself, and saith unto him, Rabboni; which is to say, Master.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/20?lang=eng#11"
      }
    ],
    peopleAndChurch: "The resurrected Lord Jesus Christ, Mary Magdalene, Mary the mother of James, Salome, Joanna, the angels of God, Peter and John running to the tomb, Joseph of Arimathea, Nicodemus, the terrified Roman guards.",
    politicalInsights: "Chief priests bribed the Roman guards with large sums of money to circulate the false report: 'His disciples came by night, and stole him away while we slept.' Pilate and the Sanhedrin feared the resurrection announcement above all else.",
    eraChronology: "Friday Evening (Burial) to Sunday Dawn (Glorious Resurrection), Nisan 16, 30 AD."
  },
  {
    id: "jer-pool-bethesda",
    name: "The Pool of Bethesda (Sheep Gate)",
    ancientName: "Beit Hesda (House of Mercy)",
    area: "Northeast of Temple Mount",
    lat: 31.7814,
    lng: 35.2361,
    category: "miracle",
    icon: "💧",
    summary: "The twin reservoirs with five covered porticoes where Jesus healed the man who had been paralyzed for thirty-eight years.",
    overview: "A great multitude of impotent folk—blind, halt, withered—lay in the five colonnades awaiting the troubling of the water. Jesus bypassed the crowd to find a man paralyzed 38 years who had no one to put him into the pool. Commanded Jesus: 'Rise, take up thy bed, and walk.' When religious authorities objected to carrying a bed on the Sabbath, Christ revealed His divine equality with the Father.",
    scriptures: [
      {
        ref: "John 5:2-9, 17-18",
        text: "Now there is at Jerusalem by the sheep market a pool, which is called in the Hebrew tongue Bethesda, having five porches... And a certain man was there, which had an infirmity thirty and eight years. When Jesus saw him lie, and knew that he had been now a long time in that case, he saith unto him, Wilt thou be made whole?... Jesus saith unto him, Rise, take up thy bed, and walk. And immediately the man was made whole... But Jesus answered them, My Father worketh hitherto, and I work.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/5?lang=eng#2"
      }
    ],
    peopleAndChurch: "Jesus Christ, the healed invalid of 38 years, the religious leaders confronting him on Sabbath regulations.",
    politicalInsights: "Sabbath observance was one of the three primary identity markers of post-exilic Judaism. By performing public healings and commanding individuals to carry burdens on the Sabbath, Jesus directly challenged rabbinic oral traditions (Halakha), inciting charges of heresy and plots against His life.",
    eraChronology: "Passover / Feast of 28 AD."
  },
  {
    id: "jer-pool-siloam",
    name: "The Pool of Siloam",
    ancientName: "Breikhat HaShiloah (Sent)",
    area: "Lower City / Southern Tip of City of David",
    lat: 31.7705,
    lng: 35.2355,
    category: "miracle",
    icon: "👁️",
    summary: "The monumental freshwater pool fed by Hezekiah's Tunnel where Jesus restored sight to a man born blind.",
    overview: "During the Feast of Tabernacles (Sukkot), priests drew water in golden pitchers from Siloam to pour out on the Temple altar. Encountering a man blind from his birth, Jesus spat on the ground, made clay of the spittle, anointed the blind man's eyes, and commanded: 'Go, wash in the pool of Siloam.' The man washed and returned seeing, boldly testifying before the Sanhedrin: 'One thing I know, that, whereas I was blind, now I see.'",
    scriptures: [
      {
        ref: "John 9:6-7, 25",
        text: "He spat on the ground, and made clay of the spittle, and he anointed the eyes of the blind man with the clay, And said unto him, Go, wash in the pool of Siloam, (which is by interpretation, Sent.) He went his way therefore, and washed, and came seeing... He answered and said, Whether he be a sinner or no, I know not: one thing I know, that, whereas I was blind, now I see.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/9?lang=eng#6"
      }
    ],
    peopleAndChurch: "Jesus Christ, the man born blind, his fearful parents, the Pharisees investigating the miracle, festive Jewish pilgrims carrying palm branches (Lulav).",
    politicalInsights: "The Sanhedrin had decreed that if any man confessed Jesus to be the Christ, he should be put out of the synagogue (excommunicated, John 9:22). The healed man's fearless defiance exposed the spiritual blindness of the temple elite.",
    eraChronology: "Autumn 29 AD (Feast of Tabernacles)."
  },
  {
    id: "jer-stephen-martyrdom",
    name: "Site of Stephen's Martyrdom",
    ancientName: "Locus Sancti Stephani",
    area: "Outside Eastern Gate / Kidron Valley",
    lat: 31.7806,
    lng: 35.2405,
    category: "apostolic",
    icon: "🪨",
    summary: "The location outside the northeastern walls where Stephen, the first Christian martyr, was stoned.",
    overview: "Stephen, one of the seven chosen deacons full of grace and power, delivered a panoramic defense of God's redemptive work before the Sanhedrin. Being full of the Holy Ghost, he looked up into heaven and saw Jesus standing on the right hand of God. Enraged, the council cast him out of the city and stoned him while a young man named Saul guarded their cloaks.",
    scriptures: [
      {
        ref: "Acts 7:54-60",
        text: "When they heard these things, they were cut to the heart, and they gnashed on him with their teeth. But he, being full of the Holy Ghost, looked up stedfastly into heaven, and saw the glory of God, and Jesus standing on the right hand of God, And said, Behold, I see the heavens opened, and the Son of man standing on the right hand of God... And they stoned Stephen, calling upon God, and saying, Lord Jesus, receive my spirit. And he kneeled down, and cried with a loud voice, Lord, lay not this sin to their charge.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/7?lang=eng#54"
      }
    ],
    peopleAndChurch: "Stephen the Protomartyr, Saul of Tarsus (consenting unto his death), the Sanhedrin council members, devout men who buried Stephen with great lamentation.",
    politicalInsights: "Under Roman occupation, execution without prefectural confirmation was technically illegal. However, during periods of Roman administrative vacuum (or with tacit Roman indifference to intra-religious blasphemy disputes), mob violence and summary stonings were carried out.",
    eraChronology: "Autumn 34 AD."
  },
  {
    id: "jer-bethphage",
    name: "Bethphage (House of Unripe Figs)",
    ancientName: "Beit Pagi",
    area: "Eastern Slope of Mount of Olives",
    lat: 31.7770,
    lng: 35.2530,
    category: "passion",
    icon: "🐴",
    summary: "The village on the eastern flank of the Mount of Olives where disciples found the colt for Christ's Triumphal Entry.",
    overview: "Approaching Jerusalem, Jesus sent two disciples ahead to Bethphage, instructing them: 'Go into the village over against you, and straightway ye shall find an ass tied, and a colt with her: loose them, and bring them unto me.' Fulfilling Zechariah 9:9, Jesus mounted the unbroken colt to begin His royal descent down the Mount of Olives into the holy city.",
    scriptures: [
      {
        ref: "Matthew 21:1-7",
        text: "And when they drew nigh unto Jerusalem, and were come to Bethphage, unto the mount of Olives, then sent Jesus two disciples, Saying unto them, Go into the village over against you... All this was done, that it might be fulfilled which was spoken by the prophet, saying, Tell ye the daughter of Sion, Behold, thy King cometh unto thee, meek, and sitting upon an ass, and a colt the foal of an ass.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/21?lang=eng#1"
      }
    ],
    peopleAndChurch: "Jesus Christ, the two sent disciples, the colt's owners who willingly released the animal when told 'The Lord hath need of him.'",
    politicalInsights: "Entering on a donkey's colt signified a King coming in peace, humility, and salvation, in stark contrast to Roman generals or emperors who entered conquered cities on armored war horses.",
    eraChronology: "Sunday Morning, Nisan 9, 30 AD (Palm Sunday)."
  },
  {
    id: "jer-bethany",
    name: "Bethany (House of Dates / Affliction)",
    ancientName: "Beit Ania / Al-Eizariya",
    area: "Eastern Slope of Mount of Olives (2 miles from Jerusalem)",
    lat: 31.7719,
    lng: 35.2617,
    category: "miracle",
    icon: "🏡",
    summary: "The cherished village refuge of Jesus, home to Mary, Martha, Lazarus, and Simon the Leper.",
    overview: "Bethany served as Christ's lodging during festival weeks. Here Jesus raised Lazarus from the dead after four days in the tomb, proclaiming: 'I am the resurrection, and the life.' Days before the Crucifixion, at Simon the Leper's house in Bethany, Mary anointed Jesus's feet with costly spikenard ointment, preparing Him for burial.",
    scriptures: [
      {
        ref: "John 11:1-44",
        text: "Now a certain man was sick, named Lazarus, of Bethany, the town of Mary and her sister Martha... Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live... He cried with a loud voice, Lazarus, come forth. And he that was dead came forth, bound hand and foot with graveclothes.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/11?lang=eng#1"
      },
      {
        ref: "John 12:1-8",
        text: "Then Jesus six days before the passover came to Bethany, where Lazarus was which had been dead... Then took Mary a pound of ointment of spikenard, very costly, and anointed the feet of Jesus, and wiped his feet with her hair: and the house was filled with the odour of the ointment.",
        churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/12?lang=eng#1"
      }
    ],
    peopleAndChurch: "Jesus Christ, Lazarus, Martha, Mary of Bethany, Simon the Leper, the weeping mourners from Jerusalem, Judas objecting to the costly ointment.",
    politicalInsights: "The resurrection of Lazarus in full public view just two miles outside Jerusalem galvanized the Sanhedrin into formal action. Caiaphas famously prophesied: 'It is expedient for us, that one man should die for the people, and that the whole nation perish not' (John 11:50).",
    eraChronology: "Winter 30 AD (Raising of Lazarus); Nisan 8, Spring 30 AD (Anointing for burial)."
  }
];
