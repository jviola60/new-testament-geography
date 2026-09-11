/**
 * Five-tab dossiers for map cities, churches, diaspora hubs, and landscape features.
 * Merged into CITIES_DATA / COMMUNITIES_DATA at load so every clickable place
 * has Overview, Scriptures, People & Church, Political Insights, and Era Events.
 */
(function applyPlaceDossiers() {
  const nt = (book, chapter, verse) =>
    `https://www.churchofjesuschrist.org/study/scriptures/nt/${book}/${chapter}?lang=eng#${verse || "1"}`;
  const ot = (book, chapter, verse) =>
    `https://www.churchofjesuschrist.org/study/scriptures/ot/${book}/${chapter}?lang=eng#${verse || "1"}`;

  const v = (ref, text, link) => ({ ref, text, churchLink: link });

  const CITY_DOSSIERS = {
    jerusalem: {
      overview: "Jerusalem was the covenant capital of Judah and the spiritual center of the Jewish world. Herod the Great enlarged the Temple Mount into the grandest sanctuary of the Mediterranean. Here the Savior taught, suffered in Gethsemane, was crucified at Golgotha, rose from the tomb, and poured out the Holy Ghost at Pentecost, giving birth to the Church.",
      scriptures: [
        v("Luke 13:34", "O Jerusalem, Jerusalem, which killest the prophets, and stonest them that are sent unto thee; how often would I have gathered thy children together, as a hen doth gather her brood under her wings, and ye would not!", nt("luke", "13", "34")),
        v("Acts 1:8", "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.", nt("acts", "1", "8")),
        v("Acts 2:1-4", "And when the day of Pentecost was fully come, they were all with one accord in one place... And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance.", nt("acts", "2", "1"))
      ],
      peopleAndChurch: "Home of the Temple priesthood, the Sanhedrin, and pilgrim multitudes at Passover. The infant Church was led by Peter, John, and later James the Just. Mary the mother of Jesus, the Twelve, and thousands baptized at Pentecost gathered in homes and in Solomon's Porch.",
      politicalInsights: "After 6 AD Judea was governed by Roman prefects at Caesarea Maritima, who came up to Jerusalem with cohorts at the feasts. The Sadducean high priests managed the Temple while Rome reserved the power of capital punishment. Tension ended in the siege of 70 AD.",
      eraChronology: "~4 BC: Death of Herod the Great; ~8 AD: the boy Jesus in the Temple; Spring 30 AD: Passion, Resurrection, Pentecost; 49 AD: Jerusalem Council; 70 AD: Temple destroyed by Titus."
    },
    bethlehem: {
      overview: "Bethlehem of Judaea, the City of David, is a hill-country village about five miles south of Jerusalem. Micah foretold that the Messiah would come from this little town. In the days of Caesar Augustus's census, Mary brought forth her firstborn son and laid Him in a manger.",
      scriptures: [
        v("Micah 5:2", "But thou, Bethlehem Ephratah, though thou be little among the thousands of Judah, yet out of thee shall he come forth unto me that is to be ruler in Israel; whose goings forth have been from of old, from everlasting.", ot("micah", "5", "2")),
        v("Luke 2:4-7", "And Joseph also went up from Galilee, out of the city of Nazareth, into Judaea, unto the city of David, which is called Bethlehem... And she brought forth her firstborn son, and wrapped him in swaddling clothes, and laid him in a manger.", nt("luke", "2", "4")),
        v("Matthew 2:1-2", "Now when Jesus was born in Bethlehem of Judaea in the days of Herod the king, behold, there came wise men from the east to Jerusalem.", nt("matt", "2", "1"))
      ],
      peopleAndChurch: "Joseph and Mary of the house of David; shepherds of the nearby fields; the wise men from the east; the infants slain by Herod's decree. Early disciples later honored Bethlehem as the Nativity city.",
      politicalInsights: "Bethlehem lay in Herod the Great's Judean domain. The Roman census that brought Joseph from Nazareth fulfilled prophecy while displaying imperial registration of subject peoples.",
      eraChronology: "~5 BC: Birth of Jesus and visit of the shepherds; soon after: Magi and the flight into Egypt; the village remained a Judean town through the Apostolic Age."
    },
    nazareth: {
      overview: "Nazareth was a small agricultural village in the hills of Lower Galilee, near the larger city of Sepphoris. Here Mary received the Annunciation, Jesus grew in wisdom and stature, and later read Isaiah in the synagogue, declaring the scripture fulfilled in their ears.",
      scriptures: [
        v("Luke 1:26-31", "And in the sixth month the angel Gabriel was sent from God unto a city of Galilee, named Nazareth, To a virgin... And the angel said unto her, Fear not, Mary: for thou hast found favour with God.", nt("luke", "1", "26")),
        v("Luke 2:51-52", "And he went down with them, and came to Nazareth, and was subject unto them... And Jesus increased in wisdom and stature, and in favour with God and man.", nt("luke", "2", "51")),
        v("Luke 4:16-21", "And he came to Nazareth, where he had been brought up: and, as his custom was, he went into the synagogue on the sabbath day, and stood up for to read... This day is this scripture fulfilled in your ears.", nt("luke", "4", "16"))
      ],
      peopleAndChurch: "Mary, Joseph the carpenter, the child Jesus, and kinsfolk including James and Jude. Townsfolk who first marveled, then sought to cast Him from the brow of the hill.",
      politicalInsights: "Nazareth belonged to the tetrarchy of Galilee under Herod Antipas. Its obscurity ('Can there any good thing come out of Nazareth?') stood in contrast to nearby Sepphoris, Antipas's early capital.",
      eraChronology: "~6 BC: Annunciation; ~4 BC–26 AD: hidden years in Nazareth; ~28 AD: synagogue rejection; the village continued as a Galilean town after the Resurrection."
    },
    capernaum: {
      overview: "Capernaum, 'His own city,' sat on the northwest shore of the Sea of Galilee along the Via Maris. Jesus made this fishing and toll town His ministry headquarters, teaching in the synagogue, healing in Peter's house, and calling fishermen to become fishers of men.",
      scriptures: [
        v("Matthew 4:13-17", "And leaving Nazareth, he came and dwelt in Capernaum, which is upon the sea coast... From that time Jesus began to preach, and to say, Repent: for the kingdom of heaven is at hand.", nt("matt", "4", "13")),
        v("Mark 2:1-5", "And again he entered into Capernaum after some days... they uncovered the roof where he was: and when they had broken it up, they let down the bed wherein the sick of the palsy lay.", nt("mark", "2", "1")),
        v("John 6:24-35", "They also took shipping, and came to Capernaum, seeking for Jesus... And Jesus said unto them, I am the bread of life: he that cometh to me shall never hunger.", nt("john", "6", "24"))
      ],
      peopleAndChurch: "Simon Peter, Andrew, James, John, and Matthew the publican; Jairus the synagogue ruler; the Roman centurion of great faith; Peter's household. An early meeting place formed in Peter's house.",
      politicalInsights: "A border customs post between Antipas's Galilee and Philip's tetrarchy. The centurion who built the synagogue illustrates Roman presence under local Herodian rule.",
      eraChronology: "~28–29 AD: principal Galilean ministry; many mighty works; later woe pronounced upon the city for unbelief (Matthew 11:23)."
    },
    bethsaida: {
      overview: "Bethsaida, 'house of fishermen,' lay near the Jordan's inflow into the Sea of Galilee. It was the hometown of Peter, Andrew, and Philip, near the feeding of the five thousand and the healing of a blind man.",
      scriptures: [
        v("John 1:44", "Now Philip was of Bethsaida, the city of Andrew and Peter.", nt("john", "1", "44")),
        v("Mark 8:22-25", "And he cometh to Bethsaida; and they bring a blind man unto him... After that he put his hands again upon his eyes, and made him look up: and he was restored, and saw every man clearly.", nt("mark", "8", "22")),
        v("Luke 9:10-17", "And he took them, and went aside privately into a desert place belonging to the city called Bethsaida... And they did eat, and were all filled.", nt("luke", "9", "10"))
      ],
      peopleAndChurch: "Apostles Peter, Andrew, and Philip; the lad with five loaves and two fishes; the blind man healed in stages; Galilean crowds who followed Jesus.",
      politicalInsights: "Philip the Tetrarch rebuilt Bethsaida as Julias in honor of the imperial house, a reminder that even fishing villages sat within Herodian and Roman politics.",
      eraChronology: "~28–29 AD: call of the fishermen and major Galilean miracles; later included among cities upbraided for unbelief (Matthew 11:21)."
    },
    cana: {
      overview: "Cana of Galilee was a hill town near Nazareth, remembered as the scene of Jesus's first public sign—turning water into wine at a marriage feast—and later the healing of a nobleman's son.",
      scriptures: [
        v("John 2:1-11", "And the third day there was a marriage in Cana of Galilee... This beginning of miracles did Jesus in Cana of Galilee, and manifested forth his glory; and his disciples believed on him.", nt("john", "2", "1")),
        v("John 4:46-54", "So Jesus came again into Cana of Galilee... Jesus saith unto him, Go thy way; thy son liveth. And the man believed the word that Jesus had spoken unto him, and he went his way.", nt("john", "4", "46")),
        v("John 21:2", "There were together Simon Peter, and Thomas called Didymus, and Nathanael of Cana in Galilee.", nt("john", "21", "2"))
      ],
      peopleAndChurch: "Mary the mother of Jesus; the bridal household; the disciples who believed; Nathanael (Bartholomew) of Cana; the nobleman whose son was healed at Capernaum.",
      politicalInsights: "A modest Galilean town under Herod Antipas, away from the tetrarch's new capital at Tiberias, showing that the Gospel first took root in village life.",
      eraChronology: "~27 AD: first miracle at the wedding; later the nobleman's son; Cana remained a Galilean village through the first century."
    },
    jericho: {
      overview: "Jericho, the City of Palm Trees, is a lush oasis in the Jordan Rift far below Jerusalem. On the pilgrim road up to the Holy City, Jesus healed blind Bartimaeus and called Zacchaeus the chief publican to repentance.",
      scriptures: [
        v("Luke 18:35-43", "And it came to pass, that as he was come nigh unto Jericho, a certain blind man sat by the way side begging... And Jesus said unto him, Receive thy sight: thy faith hath saved thee.", nt("luke", "18", "35")),
        v("Luke 19:1-10", "And Jesus entered and passed through Jericho. And, behold, there was a man named Zacchaeus, which was the chief among the publicans... This day is salvation come to this house.", nt("luke", "19", "1")),
        v("Luke 10:30", "A certain man went down from Jerusalem to Jericho, and fell among thieves.", nt("luke", "10", "30"))
      ],
      peopleAndChurch: "Bartimaeus; Zacchaeus and his household; pilgrims on the dangerous descent from Jerusalem; later disciples who used the oasis as a stop on the road.",
      politicalInsights: "Herod the Great built winter palaces here. As a customs post on the Jericho road, it concentrated tax collectors under Roman and Herodian administration.",
      eraChronology: "~30 AD: healings and the conversion of Zacchaeus on the final journey to Jerusalem; the oasis remained inhabited after 70 AD."
    },
    sychar: {
      overview: "Sychar in Samaria, by Jacob's Well and in view of Mount Gerizim, is where Jesus asked a Samaritan woman for water and revealed Himself as the Messiah. Many Samaritans believed because of His word.",
      scriptures: [
        v("John 4:4-7", "And he must needs go through Samaria. Then cometh he to a city of Samaria, which is called Sychar... Jesus therefore, being wearied with his journey, sat thus on the well.", nt("john", "4", "4")),
        v("John 4:25-26", "The woman saith unto him, I know that Messias cometh, which is called Christ: when he is come, he will tell us all things. Jesus saith unto her, I that speak unto thee am he.", nt("john", "4", "25")),
        v("Acts 8:5-17", "Then Philip went down to the city of Samaria, and preached Christ unto them... Then laid they their hands on them, and they received the Holy Ghost.", nt("acts", "8", "5"))
      ],
      peopleAndChurch: "The Samaritan woman and the men of the city; later Philip the Evangelist; Apostles Peter and John who confirmed Samaritan converts.",
      politicalInsights: "Samaritans worshiped on Mount Gerizim and were often shunned by Judeans. Roman governors watched Gerizim closely; Pilate's later violence there contributed to his recall.",
      eraChronology: "~27 AD: Jesus at Jacob's Well; ~34 AD: Philip's mission and apostolic confirmation of the Samaritan church."
    },
    "caesarea-philippi": {
      overview: "At the springs of the Jordan beneath Mount Hermon, Philip the Tetrarch built Paneas (Caesarea Philippi) with shrines to Pan and Caesar. Here Peter confessed, 'Thou art the Christ, the Son of the living God,' and the Lord promised to build His Church.",
      scriptures: [
        v("Matthew 16:13-18", "When Jesus came into the coasts of Caesarea Philippi, he asked his disciples, saying, Whom do men say that I the Son of man am?... Simon Peter answered and said, Thou art the Christ, the Son of the living God.", nt("matt", "16", "13")),
        v("Mark 8:27-29", "And Jesus went out, and his disciples, into the towns of Caesarea Philippi... And Peter answereth and saith unto him, Thou art the Christ.", nt("mark", "8", "27"))
      ],
      peopleAndChurch: "Jesus and the Twelve; Peter the spokesman; the confession became a foundation teaching for the Church.",
      politicalInsights: "A Herodian city honoring Caesar at a pagan grotto—precisely where Jesus asked who He was, contrasting the living God with imperial and pagan claims.",
      eraChronology: "~29 AD: Peter's confession and the teaching of the coming Passion; nearby high mountain associated with the Transfiguration."
    },
    "caesarea-maritima": {
      overview: "Caesarea Maritima, Herod's deep-water harbor on the Mediterranean, was the Roman capital of Judea. Here Peter baptized the Gentile centurion Cornelius, Philip the Evangelist dwelt, and Paul was held two years before sailing to Rome.",
      scriptures: [
        v("Acts 10:1-5", "There was a certain man in Caesarea called Cornelius, a centurion of the band called the Italian band... He saw in a vision evidently about the ninth hour of the day an angel of God.", nt("acts", "10", "1")),
        v("Acts 21:8", "And the next day we that were of Paul's company departed, and came unto Caesarea: and we entered into the house of Philip the evangelist, which was one of the seven; and abode with him.", nt("acts", "21", "8")),
        v("Acts 26:27-29", "King Agrippa, believest thou the prophets? I know that thou believest. Then Agrippa said unto Paul, Almost thou persuadest me to be a Christian.", nt("acts", "26", "27"))
      ],
      peopleAndChurch: "Cornelius and his household; Peter; Philip, his four prophesying daughters; Paul before Felix, Festus, Agrippa II, and Bernice; the Italian band.",
      politicalInsights: "Seat of the prefect/procurator, harbor, and garrison. Ethnic strife between Jews and Syrians here helped ignite the revolt of 66 AD. Paul used his Roman citizenship in these courts.",
      eraChronology: "~10 BC: harbor dedicated; ~38 AD: conversion of Cornelius; 58–60 AD: Paul's imprisonment; 66 AD: outbreak of war."
    },
    joppa: {
      overview: "Joppa (Jaffa) was Judea's ancient port. Peter raised Tabitha (Dorcas) from the dead and, on the housetop of Simon the tanner, received the vision that prepared him to take the gospel to Gentiles at Caesarea.",
      scriptures: [
        v("Acts 9:36-40", "Now there was at Joppa a certain disciple named Tabitha, which by interpretation is called Dorcas... Peter... kneeled down, and prayed; and turning him to the body said, Tabitha, arise.", nt("acts", "9", "36")),
        v("Acts 10:9-15", "On the morrow, as they went on their journey, and drew nigh unto the city, Peter went up upon the housetop to pray about the sixth hour... What God hath cleansed, that call not thou common.", nt("acts", "10", "9"))
      ],
      peopleAndChurch: "Tabitha, a woman full of good works; Simon the tanner; Peter; messengers from Cornelius.",
      politicalInsights: "A Jewish port under the Judean prefecture, linking Jerusalem's hinterland to Mediterranean trade and to Caesarea's Roman administration.",
      eraChronology: "~37–38 AD: raising of Tabitha and Peter's vision; Joppa remained a coastal town through the Jewish War."
    },
    damascus: {
      overview: "Damascus, an ancient caravan capital of Syria, held many synagogues. On the road approaching the city the risen Lord appeared to Saul of Tarsus; Ananias baptized him in the house on the street called Straight.",
      scriptures: [
        v("Acts 9:3-6", "And as he journeyed, he came near Damascus: and suddenly there shined round about him a light from heaven... And he said, Who art thou, Lord? And the Lord said, I am Jesus whom thou persecutest.", nt("acts", "9", "3")),
        v("Acts 9:17-20", "And Ananias went his way, and entered into the house; and putting his hands on him said, Brother Saul... And straightway he preached Christ in the synagogues, that he is the Son of God.", nt("acts", "9", "17")),
        v("2 Corinthians 11:32-33", "In Damascus the governor under Aretas the king kept the city of the Damascenes with a garrison, desirous to apprehend me: And through a window in a basket was I let down by the wall.", nt("2-cor", "11", "32"))
      ],
      peopleAndChurch: "Saul (Paul); Ananias of Damascus; disciples who sheltered him; later congregations that grew from those first house churches.",
      politicalInsights: "A Syrian city under Roman influence, at times watched by a Nabataean ethnarch of Aretas IV—showing the layered politics of the frontier.",
      eraChronology: "~34 AD: conversion of Saul; preaching and escape; Damascus remained a major Syrian church center."
    },
    "antioch-syria": {
      overview: "Antioch on the Orontes was the third city of the empire and the cradle of Gentile Christianity. Disciples were first called Christians here. From this church the Holy Ghost sent forth Barnabas and Saul on missionary journeys.",
      scriptures: [
        v("Acts 11:26", "And when he had found him, he brought him unto Antioch... And the disciples were called Christians first in Antioch.", nt("acts", "11", "26")),
        v("Acts 13:2-3", "As they ministered to the Lord, and fasted, the Holy Ghost said, Separate me Barnabas and Saul for the work whereunto I have called them.", nt("acts", "13", "2")),
        v("Galatians 2:11-12", "But when Peter was come to Antioch, I withstood him to the face, because he was to be blamed.", nt("gal", "2", "11"))
      ],
      peopleAndChurch: "Barnabas, Saul, Simeon called Niger, Lucius of Cyrene, Manaen, Agabus, and a mixed Jewish-Gentile congregation that sent famine relief to Judea.",
      politicalInsights: "Capital of the imperial province of Syria, seat of a consular legate commanding legions. Its legal protection and trade wealth made it a natural mission base.",
      eraChronology: "~40–42 AD: church established; 47 AD: first journey launched; later visits after each journey; a leading church through the century."
    },
    tarsus: {
      overview: "Tarsus in Cilicia was a renowned university city and Paul's birthplace—'a citizen of no mean city.' After his conversion he spent silent years here until Barnabas brought him to Antioch.",
      scriptures: [
        v("Acts 21:39", "But Paul said, I am a man which am a Jew of Tarsus, a city in Cilicia, a citizen of no mean city: and, I beseech thee, suffer me to speak unto the people.", nt("acts", "21", "39")),
        v("Acts 22:3", "I am verily a man which am a Jew, born in Tarsus, a city in Cilicia, yet brought up in this city at the feet of Gamaliel.", nt("acts", "22", "3")),
        v("Acts 11:25-26", "Then departed Barnabas to Tarsus, for to seek Saul: And when he had found him, he brought him unto Antioch.", nt("acts", "11", "25"))
      ],
      peopleAndChurch: "The Apostle Paul; Jewish family of Roman citizenship; later Cilician churches he strengthened on the second journey.",
      politicalInsights: "A free city famous for learning and tent-cloth (cilicium). Roman citizenship inherited here later protected Paul before tribunes and governors.",
      eraChronology: "~5–10 AD: Paul's birth (approximate); ~35–40 AD: years in Tarsus after conversion; 49 AD: churches of Cilicia visited."
    },
    "salamis-cyprus": {
      overview: "Salamis was the chief eastern port of Cyprus. Paul, Barnabas (a Levite of Cyprus), and John Mark first preached in its synagogues on the first missionary journey.",
      scriptures: [
        v("Acts 13:4-5", "So they, being sent forth by the Holy Ghost, departed unto Seleucia; and from thence they sailed to Cyprus. And when they were at Salamis, they preached the word of God in the synagogues of the Jews.", nt("acts", "13", "4")),
        v("Acts 4:36", "And Joses, who by the apostles was surnamed Barnabas... a Levite, and of the country of Cyprus.", nt("acts", "4", "36"))
      ],
      peopleAndChurch: "Barnabas, Paul, John Mark; Jewish synagogue hearers; later island congregations strengthened when Barnabas returned with Mark.",
      politicalInsights: "A commercial harbor of the senatorial province of Cyprus, facing Syria—natural first stop from Antioch's port of Seleucia.",
      eraChronology: "47 AD: first preaching in the synagogues; ~50 AD: Barnabas and Mark return to Cyprus."
    },
    "paphos-cyprus": {
      overview: "Paphos was the Roman capital of Cyprus. Here the proconsul Sergius Paulus believed after Paul rebuked Elymas the sorcerer, an early conversion of a Roman governor.",
      scriptures: [
        v("Acts 13:6-12", "And when they had gone through the isle unto Paphos, they found a certain sorcerer... which was with the deputy of the country, Sergius Paulus, a prudent man... Then the deputy, when he saw what was done, believed, being astonished at the doctrine of the Lord.", nt("acts", "13", "6"))
      ],
      peopleAndChurch: "Sergius Paulus; Elymas (Bar-jesus); Barnabas, Paul (Saul begins to be called Paul in this chapter), and John Mark.",
      politicalInsights: "Headquarters of the senatorial proconsul. The conversion of a Roman deputy showed the gospel reaching imperial administration without insurrection.",
      eraChronology: "47 AD: Elymas blinded and the proconsul believes; the team then sails for Perga in Pamphylia."
    },
    "pisidian-antioch": {
      overview: "Pisidian Antioch, a Roman colony in the Phrygian highlands, heard Paul's first recorded synagogue sermon. When many Gentiles believed, the missionaries turned boldly to the nations.",
      scriptures: [
        v("Acts 13:14-16", "They came to Antioch in Pisidia, and went into the synagogue on the sabbath day... Then Paul stood up, and beckoning with his hand said, Men of Israel, and ye that fear God, give audience.", nt("acts", "13", "14")),
        v("Acts 13:46-48", "It was necessary that the word of God should first have been spoken to you: but seeing ye put it from you... we turn to the Gentiles.", nt("acts", "13", "46")),
        v("2 Timothy 3:11", "Persecutions, afflictions, which came unto me at Antioch, at Iconium, at Lystra; what persecutions I endured: but out of them all the Lord delivered me.", nt("2-tim", "3", "11"))
      ],
      peopleAndChurch: "Paul and Barnabas; synagogue rulers; God-fearing Gentiles; later Galatian disciples addressed in the Epistle to the Galatians.",
      politicalInsights: "A military colony (colonia) on the Augusta road, with veteran settlers and an influential synagogue—typical of southern Galatia.",
      eraChronology: "47–48 AD: founding sermon and opposition; later revisits to ordain elders; churches of Galatia receive Paul's letter."
    },
    iconium: {
      overview: "Iconium (Konya) was a crossroads city of Lycaonia where Paul and Barnabas spoke boldly a long time, Jews and Greeks believing, until a plot to stone them forced a flight to Lystra.",
      scriptures: [
        v("Acts 14:1-3", "And it came to pass in Iconium, that they went both together into the synagogue of the Jews, and so spake, that a great multitude both of the Jews and also of the Greeks believed.", nt("acts", "14", "1")),
        v("Acts 14:21-22", "And when they had preached the gospel to that city, and had taught many, they returned again to Lystra, and to Iconium, and Antioch, Confirming the souls of the disciples.", nt("acts", "14", "21"))
      ],
      peopleAndChurch: "A mixed Jewish-Gentile church planted amid persecution; later Timothy's reputation was well reported of at Iconium (Acts 16:2).",
      politicalInsights: "A Hellenistic city of Galatia/Lycaonia under Roman provincial order, with civic factions able to stir magistrates against the apostles.",
      eraChronology: "48 AD: long ministry and plot; later confirmation visits; part of the Galatian circle."
    },
    lystra: {
      overview: "Lystra, a quieter Roman colony, had little synagogue life. After a lame man was healed, crowds hailed Barnabas as Jupiter and Paul as Mercurius; later Paul was stoned and left for dead. Here young Timothy was later called.",
      scriptures: [
        v("Acts 14:8-15", "And there sat a certain man at Lystra, impotent in his feet... The gods are come down to us in the likeness of men... Sirs, why do ye these things? We also are men of like passions with you.", nt("acts", "14", "8")),
        v("Acts 14:19-20", "And there came thither certain Jews from Antioch and Iconium, who persuaded the people, and, having stoned Paul, drew him out of the city, supposing he had been dead.", nt("acts", "14", "19")),
        v("Acts 16:1-3", "Then came he to Derbe and Lystra: and, behold, a certain disciple was there, named Timotheus, the son of a certain woman, which was a Jewess, and believed.", nt("acts", "16", "1"))
      ],
      peopleAndChurch: "The healed lame man; Barnabas and Paul; Lois, Eunice, and Timothy; disciples who stood round about Paul after the stoning.",
      politicalInsights: "A Roman colony with strong local pagan cult (Zeus/Hermes). Absence of a synagogue meant first contact was public miracle rather than Sabbath preaching.",
      eraChronology: "48 AD: healing, attempted worship, stoning; 49 AD: Timothy joins Paul; later letters to Timothy recall these afflictions."
    },
    derbe: {
      overview: "Derbe on the Galatian frontier received the gospel without riot. Paul and Barnabas taught many disciples here and later returned, ordaining elders. Gaius of Derbe accompanied Paul on the third journey.",
      scriptures: [
        v("Acts 14:20-21", "And the next day he departed with Barnabas to Derbe. And when they had preached the gospel to that city, and had taught many, they returned again to Lystra, and to Iconium, and Antioch.", nt("acts", "14", "20")),
        v("Acts 20:4", "And there accompanied him into Asia Sopater of Berea; and of the Thessalonians, Aristarchus and Secundus; and Gaius of Derbe, and Timotheus.", nt("acts", "20", "4"))
      ],
      peopleAndChurch: "Many new disciples; Gaius of Derbe; elders ordained on the return visit.",
      politicalInsights: "A border town of Lycaonia, less volatile than Iconium or Lystra, illustrating how the same gospel met different civic climates.",
      eraChronology: "48 AD: peaceful harvest; later visits; Gaius travels with the collection party toward Jerusalem."
    },
    ephesus: {
      overview: "Ephesus, guardian of Artemis and chief city of Asia, became Paul's base for three years. From the hall of Tyrannus 'all they which dwelt in Asia heard the word.' Later John ministered here, and the church is first among the seven of Revelation.",
      scriptures: [
        v("Acts 19:8-10", "And he went into the synagogue, and spake boldly for the space of three months... And this continued by the space of two years; so that all they which dwelt in Asia heard the word of the Lord Jesus, both Jews and Greeks.", nt("acts", "19", "8")),
        v("Acts 19:28-34", "Great is Diana of the Ephesians... And the whole city was filled with confusion... for the space of about two hours they cried out, Great is Diana of the Ephesians.", nt("acts", "19", "28")),
        v("Revelation 2:1-5", "Unto the angel of the church of Ephesus write... Nevertheless I have somewhat against thee, because thou hast left thy first love.", nt("rev", "2", "1"))
      ],
      peopleAndChurch: "Paul, Aquila, Priscilla, Apollos, Timothy; the seven sons of Sceva; Demetrius the silversmith; later the Apostle John and, by early Christian memory, Mary. Many house churches.",
      politicalInsights: "A senatorial Asian metropolis and neokoros of Artemis. The riot in the theater shows how the gospel touched trade, civic pride, and the imperial cult.",
      eraChronology: "52–55 AD: Paul's residence; ~57 AD: farewell at Miletus; ~95 AD: Revelation's letter to Ephesus."
    },
    smyrna: {
      overview: "Smyrna, a wealthy Aegean seaport, received one of the two unreproved letters of Revelation—called to be faithful unto death and promised a crown of life.",
      scriptures: [
        v("Revelation 2:8-11", "And unto the angel of the church in Smyrna write... Be thou faithful unto death, and I will give thee a crown of life.", nt("rev", "2", "8"))
      ],
      peopleAndChurch: "A suffering congregation; later memory of Bishop Polycarp, who sealed his testimony here in the next century.",
      politicalInsights: "Strong imperial cult and civic competition with other Asian cities. Faithfulness here meant costly loyalty to Christ above Caesar's honors.",
      eraChronology: "Church rooted in the Pauline-Johannine mission of Asia; letter of Revelation ~95 AD."
    },
    pergamum: {
      overview: "Pergamum, once a royal capital, held famous temples and the altar often linked with 'Satan's seat' in Revelation. Antipas was a faithful martyr there.",
      scriptures: [
        v("Revelation 2:12-17", "And to the angel of the church in Pergamos write; These things saith he which hath the sharp sword with two edges; I know thy works, and where thou dwellest, even where Satan's seat is.", nt("rev", "2", "12"))
      ],
      peopleAndChurch: "Saints dwelling in a pagan capital; Antipas 'my faithful martyr'; a church warned against compromising teaching.",
      politicalInsights: "Provincial center of the imperial cult in Asia. Public religion and healing shrines (Asclepius) pressed believers toward civic compromise.",
      eraChronology: "Congregation established by the mid-first century; addressed in Revelation ~95 AD."
    },
    thyatira: {
      overview: "Thyatira was a guild city of dyers and metalworkers, hometown of Lydia of Philippi. Revelation commended love and works yet warned against false teaching tied to idolatrous feasts.",
      scriptures: [
        v("Acts 16:14", "And a certain woman named Lydia, a seller of purple, of the city of Thyatira, which worshipped God, heard us: whose heart the Lord opened.", nt("acts", "16", "14")),
        v("Revelation 2:18-26", "And unto the angel of the church in Thyatira write... I know thy works, and charity, and service, and faith, and thy patience.", nt("rev", "2", "18"))
      ],
      peopleAndChurch: "Lydia, first recorded European convert; a working congregation tempted by guild banquets; saints told to hold fast.",
      politicalInsights: "Trade guilds required religious meals. Refusing idolatry could cost livelihood—an everyday political and economic test.",
      eraChronology: "Lydia met Paul at Philippi in 50 AD; the Thyatiran church is addressed ~95 AD."
    },
    sardis: {
      overview: "Sardis, ancient capital of Lydia, had a name that it lived but was told it was dead. A few names had not defiled their garments. The city later yielded the largest excavated synagogue of the diaspora.",
      scriptures: [
        v("Revelation 3:1-5", "And unto the angel of the church in Sardis write... I know thy works, that thou hast a name that thou livest, and art dead. Be watchful, and strengthen the things which remain.", nt("rev", "3", "1"))
      ],
      peopleAndChurch: "A church warned of spiritual sleep; a remnant of worthy names; a large Jewish community sharing the city's civic life.",
      politicalInsights: "A once-royal city on earthquake-prone ground, famous for wealth. Complacency in prosperity is the letter's burden.",
      eraChronology: "Asian church of the first century; Revelation ~95 AD; synagogue remains illustrate later Jewish life."
    },
    philadelphia: {
      overview: "Philadelphia, 'city of brotherly love,' was promised an open door that no man could shut. The Lord found no rebuke, only a call to hold fast the crown.",
      scriptures: [
        v("Revelation 3:7-12", "And to the angel of the church in Philadelphia write... I have set before thee an open door, and no man can shut it: for thou hast a little strength, and hast kept my word, and hast not denied my name.", nt("rev", "3", "7"))
      ],
      peopleAndChurch: "A small but steadfast flock; promised to be a pillar in the temple of God.",
      politicalInsights: "A gateway city on a seismic fault, often rebuilt. Instability of earth contrasts with the promise of a new name and lasting place in God's house.",
      eraChronology: "Faithful Asian congregation addressed ~95 AD."
    },
    laodicea: {
      overview: "Laodicea in the Lycus Valley was rich in banking, black wool, and eye salve, yet the Lord said it was lukewarm. He still knocked at the door, offering gold tried in the fire and eyesalve.",
      scriptures: [
        v("Revelation 3:14-20", "I know thy works, that thou art neither cold nor hot... Behold, I stand at the door, and knock: if any man hear my voice, and open the door, I will come in to him.", nt("rev", "3", "14")),
        v("Colossians 4:16", "And when this epistle is read among you, cause that it be read also in the church of the Laodiceans.", nt("col", "4", "16"))
      ],
      peopleAndChurch: "A wealthy congregation planted in the circle of Epaphras and Colossae; called to repentant fellowship with Christ.",
      politicalInsights: "So prosperous it rebuilt after earthquake without imperial aid. Material self-sufficiency became a spiritual snare.",
      eraChronology: "Church active by the 50s AD (Colossians); letter of Revelation ~95 AD."
    },
    colossae: {
      overview: "Colossae, a smaller Lycus Valley town, received Paul's letter proclaiming Christ's cosmic supremacy and the restoration of Onesimus. The church met in Philemon's house, planted through Epaphras.",
      scriptures: [
        v("Colossians 1:3-6", "We give thanks to God and the Father of our Lord Jesus Christ, praying always for you... Which is come unto you, as it is in all the world; and bringeth forth fruit.", nt("col", "1", "3")),
        v("Colossians 1:18", "And he is the head of the body, the church: who is the beginning, the firstborn from the dead; that in all things he might have the preeminence.", nt("col", "1", "18")),
        v("Philemon 1:10-16", "I beseech thee for my son Onesimus, whom I have begotten in my bonds... not now as a servant, but above a servant, a brother beloved.", nt("philem", "1", "10"))
      ],
      peopleAndChurch: "Epaphras, Philemon, Apphia, Archippus, Onesimus; house church in Philemon's home.",
      politicalInsights: "A Phrygian town under Asian provincial order, linked by road to Laodicea and Hierapolis. Household social order (including slavery) is addressed in the gospel of brotherhood.",
      eraChronology: "~55 AD: planting; ~60–62 AD: Colossians and Philemon written from Paul's imprisonment."
    },
    miletus: {
      overview: "Miletus, the ancient Ionian port south of Ephesus, was where Paul summoned the Ephesian elders and warned of grievous wolves, commending them to God and the word of His grace.",
      scriptures: [
        v("Acts 20:17-28", "And from Miletus he sent to Ephesus, and called the elders of the church... Take heed therefore unto yourselves, and to all the flock, over the which the Holy Ghost hath made you overseers.", nt("acts", "20", "17")),
        v("Acts 20:36-38", "And when he had thus spoken, he kneeled down, and prayed with them all. And they all wept sore, and fell on Paul's neck, and kissed him.", nt("acts", "20", "36"))
      ],
      peopleAndChurch: "Paul and the Ephesian elders; Luke's 'we' company on the voyage to Jerusalem.",
      politicalInsights: "A still-working harbor on the Asian coast, convenient for a ship bypassing Ephesus in haste toward Pentecost at Jerusalem.",
      eraChronology: "57 AD: farewell discourse; a landmark of pastoral charge to local elders."
    },
    patmos: {
      overview: "Patmos is a rocky Aegean island used for exile. There John was 'in the Spirit on the Lord's day' and received the Revelation of Jesus Christ for the seven churches of Asia.",
      scriptures: [
        v("Revelation 1:9-11", "I John, who also am your brother, and companion in tribulation... was in the isle that is called Patmos, for the word of God, and for the testimony of Jesus Christ.", nt("rev", "1", "9")),
        v("Revelation 1:17-18", "Fear not; I am the first and the last: I am he that liveth, and was dead; and, behold, I am alive for evermore, Amen; and have the keys of hell and of death.", nt("rev", "1", "17"))
      ],
      peopleAndChurch: "John the Revelator; the seven churches who received the letters; later Christian memory of the island as a place of testimony.",
      politicalInsights: "Exile under Domitian (traditionally ~95 AD) shows imperial power used against Christian witness, yet the visions proclaim Christ's rule above emperors.",
      eraChronology: "~95 AD: visions of Revelation; the book circulated to Ephesus, Smyrna, Pergamum, Thyatira, Sardis, Philadelphia, and Laodicea."
    },
    philippi: {
      overview: "Philippi, a Roman veteran colony on the Via Egnatia, was the first European church. Lydia believed by the river; a jailer was baptized at midnight; the congregation later shared generously in Paul's affliction.",
      scriptures: [
        v("Acts 16:13-15", "And on the sabbath we went out of the city by a river side, where prayer was wont to be made... And a certain woman named Lydia... whose heart the Lord opened, that she attended unto the things which were spoken of Paul.", nt("acts", "16", "13")),
        v("Acts 16:25-34", "And at midnight Paul and Silas prayed, and sang praises unto God... Believe on the Lord Jesus Christ, and thou shalt be saved, and thy house.", nt("acts", "16", "25")),
        v("Philippians 1:3-6", "I thank my God upon every remembrance of you... Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ.", nt("phil", "1", "3"))
      ],
      peopleAndChurch: "Lydia and her household; the Philippian jailer; Luke (the 'we' narrative); Silas and Timothy; a church Paul called his joy and crown.",
      politicalInsights: "Colonia Iulia Augusta Philippensis with ius Italicum. Paul and Silas, beaten as Jews, later claimed Roman citizenship—exposing illegal punishment.",
      eraChronology: "50 AD: founding; ~62 AD: Epistle to the Philippians from imprisonment."
    },
    thessalonica: {
      overview: "Thessalonica, capital of Macedonia on the Via Egnatia, heard Paul reason three Sabbaths that the Christ must suffer and rise. A church was born amid civic uproar and later received Paul's earliest letters about the Lord's coming.",
      scriptures: [
        v("Acts 17:1-4", "They came to Thessalonica, where was a synagogue of the Jews: And Paul, as his manner was, went in unto them, and three sabbath days reasoned with them out of the scriptures.", nt("acts", "17", "1")),
        v("1 Thessalonians 1:6-8", "And ye became followers of us, and of the Lord, having received the word in much affliction, with joy of the Holy Ghost... from you sounded out the word of the Lord.", nt("1-thes", "1", "6")),
        v("1 Thessalonians 4:16-18", "For the Lord himself shall descend from heaven with a shout, with the voice of the archangel, and with the trump of God: and the dead in Christ shall rise first.", nt("1-thes", "4", "16"))
      ],
      peopleAndChurch: "Jason who housed the missionaries; devout Greeks and chief women; Timothy later sent to comfort them; a model church in Macedonia.",
      politicalInsights: "A free city with politarchs (Acts 17:6). The charge 'these all do contrary to the decrees of Caesar' shows how messianic preaching could be framed as treason.",
      eraChronology: "50 AD: founding; 51 AD: 1 & 2 Thessalonians written from Corinth."
    },
    berea: {
      overview: "Berea (Veria) is remembered for noble-minded hearers who 'searched the scriptures daily' whether those things were so. Many believed, including honourable women and men of the Greeks.",
      scriptures: [
        v("Acts 17:10-12", "And the brethren immediately sent away Paul and Silas by night unto Berea: who coming thither went into the synagogue of the Jews. These were more noble than those in Thessalonica, in that they received the word with all readiness of mind, and searched the scriptures daily.", nt("acts", "17", "10")),
        v("Acts 20:4", "And there accompanied him into Asia Sopater of Berea.", nt("acts", "20", "4"))
      ],
      peopleAndChurch: "Berean Jews and Greek God-fearers; Sopater of Berea; Silas and Timothy who remained when Paul was sent away.",
      politicalInsights: "An inland Macedonian town quieter than the provincial capital, yet still reached by agitators from Thessalonica—showing networks of opposition as well as faith.",
      eraChronology: "50 AD: noble reception of the word; later Sopater travels with Paul."
    },
    athens: {
      overview: "Athens, city of philosophers, heard Paul on Mars' Hill declare the unknown God, creation, repentance, and the resurrection. Some mocked; others believed, including Dionysius the Areopagite and Damaris.",
      scriptures: [
        v("Acts 17:22-23", "Then Paul stood in the midst of Mars' hill, and said, Ye men of Athens, I perceive that in all things ye are too superstitious... I found an altar with this inscription, TO THE UNKNOWN GOD. Whom therefore ye ignorantly worship, him declare I unto you.", nt("acts", "17", "22")),
        v("Acts 17:30-34", "And the times of this ignorance God winked at; but now commandeth all men every where to repent: Because he hath appointed a day, in the which he will judge the world in righteousness by that man whom he hath ordained; whereof he hath given assurance unto all men, in that he hath raised him from the dead.", nt("acts", "17", "30"))
      ],
      peopleAndChurch: "Dionysius the Areopagite, Damaris, and others; a small but notable beginning in the intellectual capital of Greece.",
      politicalInsights: "A free city famous for the Areopagus court and schools of Stoics and Epicureans. Paul's appeal used civic altars and natural theology without compromising the resurrection.",
      eraChronology: "51 AD: Areopagus address while waiting for Silas and Timothy before moving to Corinth."
    },
    corinth: {
      overview: "Corinth, rebuilt by Julius Caesar on the isthmus of two seas, was Paul's home for eighteen months of tentmaking with Aquila and Priscilla. A large, gifted, sometimes disorderly church received 1 and 2 Corinthians; from Corinth Paul also wrote Romans.",
      scriptures: [
        v("Acts 18:9-11", "Then spake the Lord to Paul in the night by a vision, Be not afraid, but speak, and hold not thy peace: For I have much people in this city. And he continued there a year and six months.", nt("acts", "18", "9")),
        v("Acts 18:12-16", "And when Gallio was the deputy of Achaia, the Jews made insurrection with one accord against Paul... And Gallio said... If it be a question of words and names, and of your law, look ye to it.", nt("acts", "18", "12")),
        v("1 Corinthians 1:2-3", "Unto the church of God which is at Corinth, to them that are sanctified in Christ Jesus, called to be saints.", nt("1-cor", "1", "2"))
      ],
      peopleAndChurch: "Aquila and Priscilla; Crispus the synagogue ruler; Gaius; Stephanas; Erastus the chamberlain; Apollos; a mixed Gentile-Jewish body struggling toward holiness and unity.",
      politicalInsights: "Capital of Achaia under proconsul Gallio (brother of Seneca). Gallio's dismissal of charges gave de facto legal space for preaching. The city's trade and immorality shape Paul's ethical teaching.",
      eraChronology: "50–52 AD: eighteen-month residence; 55–57 AD: Corinthian correspondence; 57 AD: Romans written from Corinth."
    },
    rome: {
      overview: "Rome, capital of the world, already had believers when Paul wrote Romans. He arrived in chains about 60 AD, dwelt two years in his own hired house, and preached the kingdom of God. Tradition and scripture place the martyrdoms of Peter and Paul here under Nero.",
      scriptures: [
        v("Romans 1:7-16", "To all that be in Rome, beloved of God, called to be saints... For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth.", nt("rom", "1", "7")),
        v("Acts 28:16-31", "And when we came to Rome... Paul dwelt two whole years in his own hired house, and received all that came in unto him, Preaching the kingdom of God... with all confidence, no man forbidding him.", nt("acts", "28", "16")),
        v("Philippians 4:22", "All the saints salute you, chiefly they that are of Caesar's household.", nt("phil", "4", "22"))
      ],
      peopleAndChurch: "Priscilla and Aquila; Phoebe of Cenchrea; many named in Romans 16; saints of Caesar's household; Peter and Paul as apostolic witnesses.",
      politicalInsights: "Heart of imperial law. Paul's appeal to Caesar (provocatio) brought him here. Claudius's expulsion of Jews (49 AD) and Nero's persecution after the fire of 64 AD framed the church's trials.",
      eraChronology: "49 AD: Claudian edict; ~57 AD: Epistle to the Romans; 60–62 AD: first Roman imprisonment; 64 AD: Neronian persecution; ~67 AD: traditional date of apostolic martyrdoms."
    },
    malta: {
      overview: "Malta (Melita) is the island of Paul's shipwreck. A viper fastened on his hand without harm; he healed Publius's father and many sick. After three months they sailed on toward Rome.",
      scriptures: [
        v("Acts 28:1-6", "And when they were escaped, then they knew that the island was called Melita... And he shook off the beast into the fire, and felt no harm.", nt("acts", "28", "1")),
        v("Acts 28:7-10", "In the same quarters were possessions of the chief man of the island, whose name was Publius... Paul entered in, and prayed, and laid his hands on him, and healed him.", nt("acts", "28", "7"))
      ],
      peopleAndChurch: "Paul, Luke, Aristarchus; Centurion Julius; Publius the chief man; islanders who showed 'no little kindness.'",
      politicalInsights: "A Roman island on the grain route from Egypt to Italy. Julius's courtesy and Publius's hospitality show provincial kindness within imperial travel.",
      eraChronology: "Winter 59–60 AD: three months on Malta after the storm; then Syracuse, Rhegium, Puteoli, and Rome."
    },
    alexandria: {
      overview: "Alexandria in Egypt was the empire's second city, home of a vast Jewish community, the Septuagint, and Philo. The infant Jesus was taken into Egypt; Apollos, mighty in the scriptures, came from Alexandria.",
      scriptures: [
        v("Matthew 2:13-15", "Arise, and take the young child and his mother, and flee into Egypt... that it might be fulfilled which was spoken of the Lord by the prophet, saying, Out of Egypt have I called my son.", nt("matt", "2", "13")),
        v("Acts 18:24-28", "And a certain Jew named Apollos, born at Alexandria, an eloquent man, and mighty in the scriptures, came to Ephesus... he mightily convinced the Jews, and that publickly, shewing by the scriptures that Jesus was Christ.", nt("acts", "18", "24"))
      ],
      peopleAndChurch: "The Holy Family in sojourn; Apollos; a later church that early Christians associated with Mark. A bridge between Hebrew scripture and Greek learning.",
      politicalInsights: "Egypt was the emperor's personal province under an equestrian prefect, supplying Rome's grain. Jewish-Greek civic tensions periodically flared.",
      eraChronology: "~4 BC: flight of the Holy Family; ~50 AD: Apollos at Ephesus and Corinth; church tradition of Mark in the following decades."
    },
    cyrene: {
      overview: "Cyrene in North Africa had a large Jewish population. Simon of Cyrene bore Jesus's cross; Cyrenians were among those who first preached to Greeks at Antioch; Lucius of Cyrene served in that church.",
      scriptures: [
        v("Luke 23:26", "And as they led him away, they laid hold upon one Simon, a Cyrenian, coming out of the country, and on him they laid the cross, that he might bear it after Jesus.", nt("luke", "23", "26")),
        v("Acts 11:19-21", "And some of them were men of Cyprus and Cyrene, which, when they were come to Antioch, spake unto the Grecians, preaching the Lord Jesus.", nt("acts", "11", "19")),
        v("Acts 13:1", "Now there were in the church that was at Antioch certain prophets and teachers... and Lucius of Cyrene, and Manaen... and Saul.", nt("acts", "13", "1"))
      ],
      peopleAndChurch: "Simon of Cyrene (and, by Mark's naming, his sons Alexander and Rufus); Cyrenian evangelists; Lucius of Cyrene.",
      politicalInsights: "A Hellenistic city of Cyrenaica with a recognized Jewish civic class. Diaspora networks carried both pilgrims to Jerusalem and the gospel to Antioch.",
      eraChronology: "30 AD: Simon bears the cross; ~40 AD: Cyrenians preach at Antioch; 47 AD: Lucius listed among Antioch's prophets and teachers."
    },
    bethany: {
      overview: "Bethany, on the eastern slope of the Mount of Olives about two miles from Jerusalem, was the home of Mary, Martha, and Lazarus. Jesus raised Lazarus, was anointed for burial, and lodged here during Passion Week. Luke also records blessing the disciples near Bethany at the Ascension.",
      scriptures: [
        v("John 11:25-44", "Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live... He cried with a loud voice, Lazarus, come forth.", nt("john", "11", "25")),
        v("John 12:1-3", "Then Jesus six days before the passover came to Bethany... Then took Mary a pound of ointment of spikenard, very costly, and anointed the feet of Jesus.", nt("john", "12", "1")),
        v("Luke 24:50-51", "And he led them out as far as to Bethany, and he lifted up his hands, and blessed them. And it came to pass, while he blessed them, he was parted from them, and carried up into heaven.", nt("luke", "24", "50"))
      ],
      peopleAndChurch: "Lazarus, Martha, Mary of Bethany, Simon the Leper, disciples who lodged with them, mourners from Jerusalem.",
      politicalInsights: "The public raising of Lazarus so near Jerusalem moved the chief priests and Pharisees to counsel that one man should die for the people (John 11:47-53).",
      eraChronology: "Winter 30 AD: raising of Lazarus; Nisan 8–13, 30 AD: lodging and anointing; forty days later: blessing near Bethany at the Ascension."
    },
    emmaus: {
      overview: "Emmaus was a village about threescore furlongs from Jerusalem. On Resurrection day the risen Lord walked with two disciples, expounded the scriptures, and was known of them in breaking of bread. The precise site is remembered in more than one traditional location; the atlas marks the long-attested western road identification for study, without claiming certainty.",
      scriptures: [
        v("Luke 24:13-16", "And, behold, two of them went that same day to a village called Emmaus, which was from Jerusalem about threescore furlongs. And they talked together of all these things which had happened.", nt("luke", "24", "13")),
        v("Luke 24:30-32", "And it came to pass, as he sat at meat with them, he took bread, and blessed it, and brake, and gave to them. And their eyes were opened, and they knew him.", nt("luke", "24", "30"))
      ],
      peopleAndChurch: "Cleopas and his companion; the Eleven to whom they returned that night with the news, 'The Lord is risen indeed.'",
      politicalInsights: "A small Judean village on a road leading west from Jerusalem, outside the immediate Roman garrison but within a Sabbath day's several-hour walk.",
      eraChronology: "Sunday, Nisan 16, 30 AD: the walk, the meal, and the return to Jerusalem."
    },
    magdala: {
      overview: "Magdala (Taricheae), on the western shore of Galilee, was a fishing and fish-salting town. It is remembered as the home of Mary Magdalene, from whom seven devils were cast out, who stood by the cross and was first to see the risen Lord.",
      scriptures: [
        v("Luke 8:1-2", "And it came to pass afterward, that he went throughout every city and village... and the twelve were with him, And certain women, which had been healed of evil spirits and infirmities, Mary called Magdalene, out of whom went seven devils.", nt("luke", "8", "1")),
        v("Matthew 15:39", "And he sent away the multitude, and took ship, and came into the coasts of Magdala.", nt("matt", "15", "39")),
        v("John 20:16-18", "Jesus saith unto her, Mary. She turned herself, and saith unto him, Rabboni... Mary Magdalene came and told the disciples that she had seen the Lord.", nt("john", "20", "16"))
      ],
      peopleAndChurch: "Mary Magdalene, faithful witness of the Crucifixion and Resurrection; Galilean women who ministered to Jesus; fishing households of the western shore.",
      politicalInsights: "A prosperous harbor town of Galilee under Antipas, later involved in the Jewish War as Taricheae. In Jesus's day it was part of the busy lake economy.",
      eraChronology: "~28–30 AD: Mary among the ministering women; Passion and Easter 30 AD: her witness at the tomb."
    },
    tiberias: {
      overview: "Tiberias, founded by Herod Antipas on the western shore and named for Emperor Tiberius, became the capital of Galilee. The Gospels mention the Sea of Tiberias; boats from the city came after the feeding of the five thousand.",
      scriptures: [
        v("John 6:1", "After these things Jesus went over the sea of Galilee, which is the sea of Tiberias.", nt("john", "6", "1")),
        v("John 6:23-24", "Howbeit there came other boats from Tiberias nigh unto the place where they did eat bread, after that the Lord had given thanks... they also took shipping, and came to Capernaum, seeking for Jesus.", nt("john", "6", "23")),
        v("John 21:1", "After these things Jesus shewed himself again to the disciples at the sea of Tiberias; and on this wise shewed he himself.", nt("john", "21", "1"))
      ],
      peopleAndChurch: "Galilean crowds who crossed from Tiberias seeking Jesus; the disciples who later met the risen Lord on this same sea.",
      politicalInsights: "Antipas's Greco-Roman capital, built partly over tombs and thus avoided by some pious Jews at first. It displayed Herodian loyalty to Rome on the lake that saw so many of Jesus's works.",
      eraChronology: "Founded ~20 AD; named in the Gospel narrative of ~29 AD; later a center of Jewish learning after the wars."
    }
  };

  const NEW_CITIES = [
    {
      id: "bethany",
      name: "Bethany",
      ancientName: "Beit Ania (House of Dates)",
      region: "Judea",
      lat: 31.7719,
      lng: 35.2617,
      isMajor: true,
      hasSynagogue: true,
      hasChurch: true,
      population: "~500",
      jewishDiasporaInfo: "A Judean village on the eastern slope of the Mount of Olives, two miles from Jerusalem, within easy walking distance of the Temple.",
      christianChurchInfo: "Home of Mary, Martha, and Lazarus; lodging place of Jesus during festival weeks; associated with the blessing at the Ascension.",
      epistles: [],
      significance: "Raising of Lazarus; anointing at Simon the Leper's house; Bethany lodging in Passion Week."
    },
    {
      id: "emmaus",
      name: "Emmaus",
      ancientName: "Emmaus (60 furlongs from Jerusalem)",
      region: "Judea",
      lat: 31.8394,
      lng: 34.9886,
      isMajor: false,
      hasSynagogue: false,
      hasChurch: true,
      population: "Village",
      jewishDiasporaInfo: "A Judean village on a road west of Jerusalem. More than one site has been proposed; this pin marks a traditional western identification for study.",
      christianChurchInfo: "Remembered for the Resurrection appearance in the breaking of bread (Luke 24).",
      epistles: [],
      significance: "The risen Lord walked with two disciples and was known of them in breaking of bread."
    },
    {
      id: "magdala",
      name: "Magdala",
      ancientName: "Migdal / Taricheae",
      region: "Galilee",
      lat: 32.8250,
      lng: 35.5156,
      isMajor: false,
      hasSynagogue: true,
      hasChurch: false,
      population: "~3,000",
      jewishDiasporaInfo: "Fishing and fish-salting town on the western shore of the Sea of Galilee.",
      christianChurchInfo: "Hometown of Mary Magdalene, witness of the Crucifixion and Resurrection.",
      epistles: [],
      significance: "Home of Mary Magdalene; boats and harbors of the western shore in the Galilean ministry."
    },
    {
      id: "tiberias",
      name: "Tiberias",
      ancientName: "Tiberias Sebaste",
      region: "Galilee",
      lat: 32.7940,
      lng: 35.5350,
      isMajor: true,
      hasSynagogue: false,
      hasChurch: false,
      population: "~8,000",
      jewishDiasporaInfo: "Herodian capital founded by Antipas and named for Emperor Tiberius; later a Jewish center after the wars.",
      christianChurchInfo: "Named in John's Gospel as the Sea of Tiberias; boats from the city sought Jesus after the feeding of the five thousand.",
      epistles: [],
      significance: "Administrative capital of Galilee on the lake that John calls the sea of Tiberias."
    }
  ];

  const CHURCH_DOSSIERS = {
    Jerusalem: {
      scriptures: [
        v("Acts 2:41-42", "Then they that gladly received his word were baptized: and the same day there were added unto them about three thousand souls. And they continued stedfastly in the apostles' doctrine and fellowship, and in breaking of bread, and in prayers.", nt("acts", "2", "41")),
        v("Acts 4:32-33", "And the multitude of them that believed were of one heart and of one soul... And with great power gave the apostles witness of the resurrection of the Lord Jesus.", nt("acts", "4", "32"))
      ],
      peopleAndChurch: "Peter, John, James the Just, the Twelve, the seven servants including Stephen and Philip, and thousands of Jewish believers including a great company of priests (Acts 6:7).",
      politicalInsights: "The mother church lived under the Sanhedrin's scrutiny and Roman prefects. Persecution after Stephen scattered disciples while apostles remained in the city for a season.",
      eraChronology: "30 AD: Pentecost; 34 AD: Stephen; 49 AD: Jerusalem Council; 62 AD: martyrdom of James (Josephus); 70 AD: destruction and flight."
    },
    "Samaria (Sychar & Sebaste)": {
      scriptures: [
        v("Acts 8:5-8", "Then Philip went down to the city of Samaria, and preached Christ unto them. And the people with one accord gave heed... And there was great joy in that city.", nt("acts", "8", "5")),
        v("Acts 1:8", "Ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.", nt("acts", "1", "8"))
      ],
      peopleAndChurch: "Philip the Evangelist; Peter and John; Samaritan believers; Simon the sorcerer confronted.",
      politicalInsights: "First expansion beyond Judean ethnicity, healing an ancient schism under the same Roman province that administered both Judea and Samaria.",
      eraChronology: "~34 AD: Philip's mission and laying on of hands."
    },
    Damascus: {
      scriptures: [
        v("Acts 9:19-22", "Then was Saul certain days with the disciples which were at Damascus. And straightway he preached Christ in the synagogues, that he is the Son of God.", nt("acts", "9", "19"))
      ],
      peopleAndChurch: "Ananias; newly converted Saul; disciples who lowered him in a basket.",
      politicalInsights: "A Syrian synagogue network Saul once sought to police; the gospel took root inside that same network.",
      eraChronology: "~34–35 AD: baptism of Saul and earliest preaching."
    },
    "Caesarea Maritima": {
      scriptures: [
        v("Acts 10:44-48", "While Peter yet spake these words, the Holy Ghost fell on all them which heard the word... And he commanded them to be baptized in the name of the Lord.", nt("acts", "10", "44"))
      ],
      peopleAndChurch: "Cornelius, kinsmen and friends; Peter; Philip's household.",
      politicalInsights: "A Roman garrison city where a centurion's baptism publicly opened the door to the nations.",
      eraChronology: "~38 AD: Cornelius; 58–60 AD: Paul imprisoned here."
    },
    Antioch: {
      scriptures: [
        v("Acts 11:21-26", "And the hand of the Lord was with them: and a great number believed, and turned unto the Lord... And the disciples were called Christians first in Antioch.", nt("acts", "11", "21")),
        v("Acts 13:1-3", "As they ministered to the Lord, and fasted, the Holy Ghost said, Separate me Barnabas and Saul for the work whereunto I have called them.", nt("acts", "13", "1"))
      ],
      peopleAndChurch: "Barnabas, Saul, prophets and teachers, Gentile and Jewish believers together.",
      politicalInsights: "Third city of the empire and launching pad of authorized foreign missions.",
      eraChronology: "~40 AD: founding; 47–57 AD: missionary departures and reports."
    },
    Alexandria: {
      scriptures: [
        v("Acts 18:24-28", "A certain Jew named Apollos, born at Alexandria, an eloquent man, and mighty in the scriptures, came to Ephesus.", nt("acts", "18", "24"))
      ],
      peopleAndChurch: "Apollos; a later church associated in Christian memory with Mark.",
      politicalInsights: "Intellectual capital of Hellenistic Judaism under the imperial prefect of Egypt.",
      eraChronology: "Mid-first century: Apollos; church growth in the following decades."
    },
    "Salamis & Paphos": {
      scriptures: [
        v("Acts 13:4-12", "They sailed to Cyprus... And when they were at Salamis, they preached the word of God in the synagogues of the Jews... Then the deputy, when he saw what was done, believed.", nt("acts", "13", "4"))
      ],
      peopleAndChurch: "Paul, Barnabas, John Mark, Sergius Paulus.",
      politicalInsights: "First recorded conversion of a Roman proconsul.",
      eraChronology: "47 AD: crossing of Cyprus."
    },
    "Pisidian Antioch": {
      scriptures: [
        v("Acts 13:38-39", "Be it known unto you therefore, men and brethren, that through this man is preached unto you the forgiveness of sins: And by him all that believe are justified from all things.", nt("acts", "13", "38"))
      ],
      peopleAndChurch: "Paul, Barnabas, Gentile God-fearers, Galatian disciples.",
      politicalInsights: "Roman colony synagogue that became a hinge from Jewish audience to Gentile mission.",
      eraChronology: "47–48 AD: founding sermon."
    },
    "Iconium, Lystra & Derbe": {
      scriptures: [
        v("Acts 14:21-23", "And when they had preached the gospel to that city, and had taught many, they returned again... And when they had ordained them elders in every church, and had prayed with fasting, they commended them to the Lord.", nt("acts", "14", "21"))
      ],
      peopleAndChurch: "Timothy, Lois, Eunice, Gaius of Derbe, elders in every city.",
      politicalInsights: "Southern Galatian towns mixing colony, synagogue, and pagan countryside.",
      eraChronology: "48 AD: planting; 49 AD: Timothy called."
    },
    Philippi: {
      scriptures: [
        v("Acts 16:14-34", "Lydia... whose heart the Lord opened... Believe on the Lord Jesus Christ, and thou shalt be saved, and thy house.", nt("acts", "16", "14")),
        v("Philippians 4:4-7", "Rejoice in the Lord alway: and again I say, Rejoice... And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.", nt("phil", "4", "4"))
      ],
      peopleAndChurch: "Lydia, the jailer, Luke, Silas, Timothy.",
      politicalInsights: "First church on European soil in a Roman colony.",
      eraChronology: "50 AD: founding; ~62 AD: Philippians."
    },
    "Thessalonica & Berea": {
      scriptures: [
        v("Acts 17:2-12", "Paul... three sabbath days reasoned with them out of the scriptures... These were more noble than those in Thessalonica... and searched the scriptures daily.", nt("acts", "17", "2"))
      ],
      peopleAndChurch: "Jason, noble Bereans, Sopater, devout Greeks and chief women.",
      politicalInsights: "Politarchs at Thessalonica; quieter synagogue at Berea.",
      eraChronology: "50–51 AD: founding and earliest epistles."
    },
    "Corinth & Cenchreae": {
      scriptures: [
        v("Acts 18:8-11", "And Crispus, the chief ruler of the synagogue, believed on the Lord with all his house... And he continued there a year and six months, teaching the word of God among them.", nt("acts", "18", "8")),
        v("Romans 16:1", "I commend unto you Phebe our sister, which is a servant of the church which is at Cenchrea.", nt("rom", "16", "1"))
      ],
      peopleAndChurch: "Aquila, Priscilla, Crispus, Gaius, Phoebe, Apollos.",
      politicalInsights: "Gallio's judgment protected preaching as a synagogue dispute, not a crime.",
      eraChronology: "50–52 AD: residence; 55–57 AD: letters."
    },
    Ephesus: {
      scriptures: [
        v("Acts 19:10", "So that all they which dwelt in Asia heard the word of the Lord Jesus, both Jews and Greeks.", nt("acts", "19", "10")),
        v("Ephesians 2:19-20", "Now therefore ye are no more strangers and foreigners, but fellowcitizens with the saints, and of the household of God.", nt("eph", "2", "19"))
      ],
      peopleAndChurch: "Paul, Priscilla, Aquila, Apollos, Timothy, later John.",
      politicalInsights: "Artemis riot; provincial capital of Asian Christianity.",
      eraChronology: "53–56 AD: three-year ministry; ~95 AD: Revelation 2."
    },
    "Colossae, Laodicea & Hierapolis": {
      scriptures: [
        v("Colossians 1:3-6", "We give thanks to God... praying always for you, Since we heard of your faith in Christ Jesus.", nt("col", "1", "3")),
        v("Colossians 4:13", "For I bear him record, that he hath a great zeal for you, and them that are in Laodicea, and them in Hierapolis.", nt("col", "4", "13"))
      ],
      peopleAndChurch: "Epaphras, Philemon, Onesimus, house churches of the Lycus.",
      politicalInsights: "Valley towns of Asian trade and wool, addressed together in Paul's letters.",
      eraChronology: "~55–62 AD: planting and prison epistles."
    },
    Rome: {
      scriptures: [
        v("Romans 1:8", "First, I thank my God through Jesus Christ for you all, that your faith is spoken of throughout the whole world.", nt("rom", "1", "8")),
        v("Acts 28:30-31", "And Paul dwelt two whole years in his own hired house... preaching the kingdom of God.", nt("acts", "28", "30"))
      ],
      peopleAndChurch: "House churches of Romans 16; Aquila and Priscilla; saints of Caesar's household; Peter and Paul.",
      politicalInsights: "Imperial capital; Neronian persecution after 64 AD.",
      eraChronology: "~45–64 AD: growth; 60–62 AD: Paul; 64–67 AD: persecution and martyrdoms."
    },
    "Seven Churches of Asia (Smyrna, Pergamum, Thyatira, Sardis, Philadelphia)": {
      scriptures: [
        v("Revelation 1:11", "What thou seest, write in a book, and send it unto the seven churches which are in Asia.", nt("rev", "1", "11")),
        v("Revelation 2:10", "Be thou faithful unto death, and I will give thee a crown of life.", nt("rev", "2", "10"))
      ],
      peopleAndChurch: "Congregations of western Asia Minor under John's care, including the martyr Antipas at Pergamum.",
      politicalInsights: "Cities of the imperial cult receiving Christ's letters of commendation, warning, and promise.",
      eraChronology: "Planted mid-century; addressed ~95 AD from Patmos."
    }
  };

  const DIASPORA_DOSSIERS = {
    "diaspora-alexandria": {
      scriptures: [
        v("Acts 18:24", "And a certain Jew named Apollos, born at Alexandria, an eloquent man, and mighty in the scriptures, came to Ephesus.", nt("acts", "18", "24")),
        v("Acts 2:10", "Phrygia, and Pamphylia, in Egypt, and in the parts of Libya about Cyrene, and strangers of Rome, Jews and proselytes.", nt("acts", "2", "10"))
      ],
      peopleAndChurch: "A vast Jewish community; Philo; Apollos; pilgrims at Pentecost from Egypt.",
      politicalInsights: "Two of five city quarters were Jewish. Periodic civic strife occurred under the imperial prefect.",
      eraChronology: "Septuagint centuries earlier; first-century learning that shaped teachers like Apollos."
    },
    "diaspora-antioch": {
      scriptures: [
        v("Acts 11:19-21", "Now they which were scattered abroad upon the persecution that arose about Stephen travelled as far as Phenice, and Cyprus, and Antioch... and a great number believed, and turned unto the Lord.", nt("acts", "11", "19"))
      ],
      peopleAndChurch: "Hellenistic Jews, God-fearing Greeks, Barnabas, Saul.",
      politicalInsights: "Citizenship privileges and a large synagogue community made Antioch a bridge to the nations.",
      eraChronology: "Diaspora centuries old; gospel harvest ~40 AD."
    },
    "diaspora-rome": {
      scriptures: [
        v("Acts 18:2", "And found a certain Jew named Aquila, born in Pontus, lately come from Italy, with his wife Priscilla; (because that Claudius had commanded all Jews to depart from Rome:).", nt("acts", "18", "2")),
        v("Acts 28:17", "And it came to pass, that after three days Paul called the chief of the Jews together.", nt("acts", "28", "17"))
      ],
      peopleAndChurch: "Multiple synagogue communities; Aquila and Priscilla; Jewish leaders who visited Paul in custody.",
      politicalInsights: "Claudius's edict (49 AD) and Nero's later persecution shaped Jewish and Christian fortunes in the capital.",
      eraChronology: "Community from the second century BC; NT era 49–64 AD especially visible."
    },
    "diaspora-babylon": {
      scriptures: [
        v("Acts 2:9", "Parthians, and Medes, and Elamites, and the dwellers in Mesopotamia.", nt("acts", "2", "9")),
        v("1 Peter 5:13", "The church that is at Babylon, elected together with you, saluteth you; and so doth Marcus my son.", nt("1-pet", "5", "13"))
      ],
      peopleAndChurch: "The oldest and largest Jewish population outside the land; pilgrims at Pentecost; the church that Peter greets as 'Babylon.'",
      politicalInsights: "Beyond the Roman frontier under Parthia—yet tied to Jerusalem by pilgrimage and scripture.",
      eraChronology: "Exile from 586 BC; Pentecost 30 AD; Petrine greeting mid-century."
    },
    "diaspora-cyrene": {
      scriptures: [
        v("Luke 23:26", "They laid hold upon one Simon, a Cyrenian... and on him they laid the cross.", nt("luke", "23", "26")),
        v("Acts 11:20", "And some of them were men of Cyprus and Cyrene, which, when they were come to Antioch, spake unto the Grecians, preaching the Lord Jesus.", nt("acts", "11", "20"))
      ],
      peopleAndChurch: "Simon of Cyrene; Cyrenian evangelists; Lucius of Cyrene.",
      politicalInsights: "Jews were a recognized civic class in Cyrene, sending pilgrims and later missionaries.",
      eraChronology: "Hellenistic settlement; NT appearances 30–47 AD."
    },
    "diaspora-damascus": {
      scriptures: [
        v("Acts 9:1-2", "And Saul... desired of him letters to Damascus to the synagogues, that if he found any of this way, whether they were men or women, he might bring them bound unto Jerusalem.", nt("acts", "9", "1"))
      ],
      peopleAndChurch: "Many synagogue communities; Ananias; disciples Saul once hunted.",
      politicalInsights: "Close enough to Jerusalem for high-priestly letters, yet in Syrian orbit.",
      eraChronology: "Ancient community; crisis and conversion ~34 AD."
    },
    "diaspora-sardis": {
      scriptures: [
        v("Revelation 3:1-4", "Unto the angel of the church in Sardis write... Thou hast a few names even in Sardis which have not defiled their garments.", nt("rev", "3", "1"))
      ],
      peopleAndChurch: "A prominent, legally recognized Jewish community living beside a Christian congregation addressed in Revelation.",
      politicalInsights: "Royal charters and later a monumental synagogue show deep civic integration in Asia.",
      eraChronology: "Persian-era roots; first-century church and synagogue side by side."
    },
    "diaspora-corinth": {
      scriptures: [
        v("Acts 18:4-8", "And he reasoned in the synagogue every sabbath, and persuaded the Jews and the Greeks... And Crispus, the chief ruler of the synagogue, believed on the Lord with all his house.", nt("acts", "18", "4"))
      ],
      peopleAndChurch: "Synagogue community; Crispus; Titius Justus next door; Aquila and Priscilla.",
      politicalInsights: "Merchant Jews between two seas; Gallio refused to criminalize the dispute.",
      eraChronology: "Colony from 44 BC; Paul's work 50–52 AD."
    },
    "diaspora-ephesus": {
      scriptures: [
        v("Acts 19:8-9", "And he went into the synagogue, and spake boldly for the space of three months... But when divers were hardened... he departed from them, and separated the disciples, disputing daily in the school of Tyrannus.", nt("acts", "19", "8"))
      ],
      peopleAndChurch: "Asian Jewish community with Sabbath privileges; disciples who moved from synagogue to the lecture hall.",
      politicalInsights: "Roman legal protections for Jewish custom in a city devoted to Artemis.",
      eraChronology: "Long-standing diaspora; three-month synagogue ministry then two years in Tyrannus's school."
    }
  };

  window.GEO_FEATURES = [
    {
      id: "sea-of-galilee",
      name: "Sea of Galilee",
      ancientName: "Lake of Gennesaret / Sea of Tiberias",
      category: "Sacred Waters",
      region: "Galilee",
      lat: 32.8240,
      lng: 35.5880,
      elevation: "-212 m",
      summary: "Freshwater rift lake of Lower Galilee, stage of calling disciples, stilling storms, walking on the water, and resurrection breakfast.",
      overview: "The Sea of Galilee (Kinneret) lies about 212 meters below sea level, ringed by fishing towns—Capernaum, Bethsaida, Magdala, Tiberias. Sudden winds funnel down the surrounding hills. Here Jesus called fishermen, stilled the tempest, walked upon the waves, and after the Resurrection showed Himself again at the sea of Tiberias.",
      scriptures: [
        v("Mark 4:39", "And he arose, and rebuked the wind, and said unto the sea, Peace, be still. And the wind ceased, and there was a great calm.", nt("mark", "4", "39")),
        v("Matthew 14:25-27", "And in the fourth watch of the night Jesus went unto them, walking on the sea... Be of good cheer; it is I; be not afraid.", nt("matt", "14", "25")),
        v("Luke 5:4-10", "Launch out into the deep, and let down your nets for a draught... From henceforth thou shalt catch men.", nt("luke", "5", "4"))
      ],
      peopleAndChurch: "Peter, Andrew, James, John, and other fishermen; the Twelve in the boat; crowds on the shores.",
      politicalInsights: "The lake bordered Antipas's Galilee, Philip's tetrarchy, and Decapolis cities—several jurisdictions meeting on one shore.",
      eraChronology: "~28–30 AD: Galilean ministry; Resurrection appearance (John 21)."
    },
    {
      id: "jordan-river",
      name: "The River Jordan",
      ancientName: "Yarden (The Descender)",
      category: "Waters of Baptism",
      region: "Judea / Perea",
      lat: 31.8385,
      lng: 35.5478,
      elevation: "-250 m to -430 m",
      summary: "The rift river from Hermon to the Dead Sea; place of John's baptism and the Father's witness at Jesus's baptism.",
      overview: "The Jordan drops from Mount Hermon's snows through the Sea of Galilee to the Dead Sea. At the fords near Bethabara / Bethany beyond Jordan, John preached repentance. Jesus was baptized to fulfill all righteousness; the Spirit descended like a dove, and the Father spoke from heaven.",
      scriptures: [
        v("Matthew 3:13-17", "Then cometh Jesus from Galilee to Jordan unto John, to be baptized of him... This is my beloved Son, in whom I am well pleased.", nt("matt", "3", "13")),
        v("John 1:28-29", "These things were done in Bethabara beyond Jordan, where John was baptizing. The next day John seeth Jesus coming unto him, and saith, Behold the Lamb of God, which taketh away the sin of the world.", nt("john", "1", "28")),
        v("Mark 1:4-5", "John did baptize in the wilderness, and preach the baptism of repentance for the remission of sins. And there went out unto him all the land of Judaea... and were all baptized of him in the river of Jordan.", nt("mark", "1", "4"))
      ],
      peopleAndChurch: "John the Baptist; Jesus; Judean and Jerusalem crowds; later the place 'beyond Jordan' where many believed (John 10:40-42).",
      politicalInsights: "The river marked a natural edge between Judea, Perea, and the Decapolis. John's wilderness preaching stood outside Temple control yet drew Jerusalem's leaders to inquire.",
      eraChronology: "~26–27 AD: John's ministry and the baptism of Jesus; ~29 AD: Jesus abides again beyond Jordan."
    },
    {
      id: "mount-hermon",
      name: "Mount Hermon",
      ancientName: "Sirion / Senir",
      category: "Northern Snow Peak",
      region: "Gaulanitis / Iturea",
      lat: 33.4167,
      lng: 35.8500,
      elevation: "2,814 m",
      summary: "Towering northern summit near Caesarea Philippi; the high mountain commonly associated with the Transfiguration.",
      overview: "Mount Hermon, snow-crowned and visible from afar, rises above the springs of the Jordan. After Peter's confession at Caesarea Philippi, Jesus took Peter, James, and John up into a high mountain and was transfigured before them. The Gospels do not name the peak; Christian teachers have long pointed to Hermon as the nearest high mountain, while some have thought of Tabor. The atlas treats Hermon as the probable northern setting without excluding other devout readings.",
      scriptures: [
        v("Matthew 17:1-5", "And after six days Jesus taketh Peter, James, and John his brother, and bringeth them up into an high mountain apart, And was transfigured before them: and his face did shine as the sun.", nt("matt", "17", "1")),
        v("Psalm 133:3", "As the dew of Hermon, and as the dew that descended upon the mountains of Zion: for there the Lord commanded the blessing, even life for evermore.", ot("ps", "133", "3"))
      ],
      peopleAndChurch: "Peter, James, and John; Moses and Elijah appearing in glory; the Father's voice from the bright cloud.",
      politicalInsights: "The mountain watched the borderlands of Philip's tetrarchy and the approaches to Damascus—frontier geography for a revelation of the Son.",
      eraChronology: "~29 AD: Transfiguration shortly after the confession at Caesarea Philippi."
    },
    {
      id: "mount-of-beatitudes",
      name: "Mount of Beatitudes",
      ancientName: "Hillside above the Sea of Galilee",
      category: "Teaching Site",
      region: "Galilee",
      lat: 32.8814,
      lng: 35.5561,
      elevation: "-120 m",
      summary: "Traditional hillside amphitheater above the lake where Jesus taught the Beatitudes and the Sermon on the Mount.",
      overview: "A natural slope northwest of the lake gathers a multitude as in a theater. Here Jesus opened His mouth and taught: Blessed are the poor in spirit; love your enemies; after this manner pray ye. The exact knoll is traditional; the setting matches Matthew's mountain and Luke's level place above the water.",
      scriptures: [
        v("Matthew 5:1-12", "And seeing the multitudes, he went up into a mountain... Blessed are the poor in spirit: for theirs is the kingdom of heaven.", nt("matt", "5", "1")),
        v("Matthew 6:9-13", "After this manner therefore pray ye: Our Father which art in heaven, Hallowed be thy name.", nt("matt", "6", "9")),
        v("Matthew 7:24-25", "Therefore whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock.", nt("matt", "7", "24"))
      ],
      peopleAndChurch: "The Twelve newly forming; Galilean crowds from Decapolis, Jerusalem, and beyond Jordan (Matthew 4:25).",
      politicalInsights: "Teaching a kingdom of meekness and mercy in a land held by Rome and Herod Antipas.",
      eraChronology: "~28 AD: Sermon on the Mount during the Galilean ministry."
    },
    {
      id: "dead-sea",
      name: "The Dead Sea",
      ancientName: "Salt Sea / Yam HaMelakh",
      category: "Wilderness Shore",
      region: "Judea",
      lat: 31.5000,
      lng: 35.4800,
      elevation: "-430 m",
      summary: "The lowest place on earth, east of the Judean Wilderness—backdrop of John's preaching, Qumran's community, and the wilderness temptation.",
      overview: "The Dead Sea receives the Jordan and has no outlet, lying more than 400 meters below sea level. The barren Judean Wilderness rises steeply to the west toward Jerusalem. This wilderness is the setting of John's cry, of Jesus's forty-day fast, and of the desert road toward Gaza.",
      scriptures: [
        v("Matthew 4:1", "Then was Jesus led up of the Spirit into the wilderness to be tempted of the devil.", nt("matt", "4", "1")),
        v("Matthew 3:1-3", "In those days came John the Baptist, preaching in the wilderness of Judaea, And saying, Repent ye: for the kingdom of heaven is at hand.", nt("matt", "3", "1"))
      ],
      peopleAndChurch: "John the Baptist; Jesus fasting; Essene-like desert communities remembered near the northwest shore (Qumran), without claiming more than scripture states.",
      politicalInsights: "A natural eastern barrier of Judea, with fortress Machaerus of Antipas on the Moabite side where John was later imprisoned.",
      eraChronology: "~26–29 AD: wilderness ministry and temptation; 70s AD: region caught in the Jewish War."
    },
    {
      id: "mount-arbel",
      name: "Mount Arbel",
      ancientName: "Cliffs of Arbel",
      category: "Galilean Overlook",
      region: "Galilee",
      lat: 32.8230,
      lng: 35.5000,
      elevation: "181 m",
      summary: "Sheer cliffs above the Plain of Gennesaret, giving a wide view of the lake where so much of the Galilean ministry unfolded.",
      overview: "Mount Arbel's cliffs rise above Magdala and the western shore. The mountain is not named in the New Testament; it is included as geography that helps readers see the lake, Via Maris, and villages of the ministry at a glance.",
      scriptures: [
        v("Matthew 4:18-20", "And Jesus, walking by the sea of Galilee, saw two brethren, Simon called Peter, and Andrew his brother, casting a net into the sea: for they were fishers. And he saith unto them, Follow me.", nt("matt", "4", "18")),
        v("Matthew 28:16-20", "Then the eleven disciples went away into Galilee, into a mountain where Jesus had appointed them... Go ye therefore, and teach all nations.", nt("matt", "28", "16"))
      ],
      peopleAndChurch: "Fishermen of the western shore; the Eleven who met the risen Lord on a mountain in Galilee (the Gospel does not name Arbel).",
      politicalInsights: "The heights watched the lake road and Herodian Tiberias to the south—terrain of Antipas's Galilee.",
      eraChronology: "Setting of the Galilean years ~28–30 AD; Resurrection commission on a Galilean mountain."
    }
  ];

  function mergeFields(target, extra) {
    if (!target || !extra) return;
    ["overview", "peopleAndChurch", "politicalInsights", "eraChronology", "summary", "teachings"].forEach((key) => {
      if (extra[key]) target[key] = extra[key];
    });
    if (extra.scriptures && extra.scriptures.length) {
      target.scriptures = extra.scriptures;
    }
  }

  if (typeof CITIES_DATA !== "undefined" && Array.isArray(CITIES_DATA)) {
    NEW_CITIES.forEach((city) => {
      if (!CITIES_DATA.some((c) => c.id === city.id)) {
        CITIES_DATA.push(city);
      }
    });
    CITIES_DATA.forEach((city) => mergeFields(city, CITY_DOSSIERS[city.id]));
  }

  if (typeof COMMUNITIES_DATA !== "undefined") {
    if (COMMUNITIES_DATA.churchesMultiplication) {
      COMMUNITIES_DATA.churchesMultiplication.forEach((church) => {
        mergeFields(church, CHURCH_DOSSIERS[church.city]);
        if (!church.overview) church.overview = church.significance;
      });
    }
    if (COMMUNITIES_DATA.diasporaSettlements) {
      COMMUNITIES_DATA.diasporaSettlements.forEach((d) => {
        mergeFields(d, DIASPORA_DOSSIERS[d.id]);
        if (!d.overview) d.overview = d.history;
      });
    }
  }

  if (typeof window !== "undefined") {
    window.CITIES_DATA = typeof CITIES_DATA !== "undefined" ? CITIES_DATA : window.CITIES_DATA;
    window.REGIONS_DATA = typeof REGIONS_DATA !== "undefined" ? REGIONS_DATA : window.REGIONS_DATA;
    window.JERUSALEM_SITES = typeof JERUSALEM_SITES !== "undefined" ? JERUSALEM_SITES : window.JERUSALEM_SITES;
    window.JERUSALEM_GEOGRAPHY = typeof JERUSALEM_GEOGRAPHY !== "undefined" ? JERUSALEM_GEOGRAPHY : window.JERUSALEM_GEOGRAPHY;
    window.COMMUNITIES_DATA = typeof COMMUNITIES_DATA !== "undefined" ? COMMUNITIES_DATA : window.COMMUNITIES_DATA;
    window.SAVIOR_EVENTS = typeof SAVIOR_EVENTS !== "undefined" ? SAVIOR_EVENTS : window.SAVIOR_EVENTS;
    window.TIMELINE_EVENTS = typeof TIMELINE_EVENTS !== "undefined" ? TIMELINE_EVENTS : window.TIMELINE_EVENTS;
    window.MISSIONARY_JOURNEYS = typeof MISSIONARY_JOURNEYS !== "undefined" ? MISSIONARY_JOURNEYS : window.MISSIONARY_JOURNEYS;
  }
})();
