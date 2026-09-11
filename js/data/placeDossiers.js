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
      overview: "Jerusalem was the covenant capital of Judah and the spiritual center of the Jewish world. Perched on a limestone plateau in the Judean hill country 2,500 feet above sea level, the Holy City was enclosed by massive fortifications and flanked by the deep natural ravines of the Kidron, Hinnom, and Tyropoeon Valleys. Herod the Great enlarged the Temple Mount into a thirty-five-acre platform—the grandest religious sanctuary in the Roman Mediterranean—adorned with the Royal Stoa, 162 towering Corinthian columns, and the sacred marble-and-gold inner temple housing the Holy of Holies.\n\nJerusalem is the epicenter of the New Testament narrative. Here the boy Jesus astounded the doctors in the Temple; here the Savior taught during the great pilgrim feasts of Passover, Tabernacles, and Hanukkah; here in Gethsemane He suffered the infinite agony of the Atonement; at Golgotha He was crucified; from Joseph of Arimathea's garden tomb He rose triumphant over death; from the Mount of Olives He ascended to heaven; and upon Mount Zion the Holy Ghost was poured out at Pentecost, birthing the Apostolic Church.",
      teachings: {
        teacher: "Jesus Christ, the Twelve Apostles, and the Deacon Stephen",
        audience: "The inhabitants of Jerusalem, pilgrim multitudes at feast days, priests, scribes, Pharisees, Sadducees, and the Sanhedrin",
        whatWasTaught: "The Gospel of the Kingdom; the fulfillment of the Law and the Prophets in Christ; the New Covenant established in His blood; the true Temple not made with hands; repentance and remission of sins; and the bodily resurrection of the dead.",
        whyTaught: "To call the covenant nation to its promised Messiah, redeem humanity through the infinite Atonement and Resurrection, and establish the Church of God.",
        context: "Covenant capital of Judah; site of Herod's magnificent Second Temple Mount; governed jointly by the Roman prefect (Pontius Pilate) and the Sadducean High Priestly aristocracy (Annas and Caiaphas).",
        howAccepted: "Deeply polarized response: on the Day of Pentecost 3,000 souls believed, soon growing to over 5,000 men with many priests becoming obedient to the faith. Yet the ruling Sanhedrin and chief priests violently resisted, arresting the Apostles, stoning Stephen, and executing James the brother of John. Jerusalem's tragic rejection of her King culminated in the Roman siege and total destruction of the Temple by Titus in 70 AD.",
        passages: ["Luke 13:34-35", "Luke 24:44-48", "Acts 1:8", "Acts 2:1-41", "Acts 4:1-22", "Acts 7:51-60"]
      },
      scriptures: [
        v("Luke 13:34", "O Jerusalem, Jerusalem, which killest the prophets, and stonest them that are sent unto thee; how often would I have gathered thy children together, as a hen doth gather her brood under her wings, and ye would not!", nt("luke", "13", "34")),
        v("Luke 24:46-48", "And said unto them, Thus it is written, and thus it behoved Christ to suffer, and to rise from the dead the third day: And that repentance and remission of sins should be preached in his name among all nations, beginning at Jerusalem.", nt("luke", "24", "46")),
        v("Acts 1:8", "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.", nt("acts", "1", "8")),
        v("Acts 2:1-4", "And when the day of Pentecost was fully come, they were all with one accord in one place... And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance.", nt("acts", "2", "1")),
        v("Acts 2:41-42", "Then they that gladly received his word were baptized: and the same day there were added unto them about three thousand souls. And they continued stedfastly in the apostles' doctrine and fellowship, and in breaking of bread, and in prayers.", nt("acts", "2", "41"))
      ],
      peopleAndChurch: "Home of the Temple priesthood, the Sanhedrin, and pilgrim multitudes at Passover. The infant Church was led by Peter, John, and later James the Just. Mary the mother of Jesus, the Twelve, and thousands baptized at Pentecost gathered in homes and in Solomon's Porch.",
      politicalInsights: "After 6 AD Judea was governed by Roman prefects at Caesarea Maritima, who came up to Jerusalem with cohorts at the feasts. The Sadducean high priests managed the Temple while Rome reserved the power of capital punishment. Tension ended in the siege of 70 AD.",
      eraChronology: "~4 BC: Death of Herod the Great; ~8 AD: the boy Jesus in the Temple; Spring 30 AD: Passion, Resurrection, Pentecost; 49 AD: Jerusalem Council; 70 AD: Temple destroyed by Titus."
    },
    bethlehem: {
      overview: "Bethlehem of Judaea, the City of David, is a hill-country village about five miles south of Jerusalem. Micah foretold that the Messiah would come from this little town. In the days of Caesar Augustus's census, Mary brought forth her firstborn son and laid Him in a manger.",
      teachings: {
        teacher: "Heavenly Angels & Prophets of Israel",
        audience: "Shepherds keeping watch by night, Mary, Joseph, and the Magi",
        whatWasTaught: "The Good Tidings of Great Joy: A Saviour is born in the City of David, Christ the Lord; glory to God in the highest, and on earth peace, good will toward men.",
        whyTaught: "To herald the mortal advent of the Son of God to the humble of the earth.",
        context: "Judean hill country village during the imperial Roman census decreed by Caesar Augustus.",
        howAccepted: "Humble shepherds hurried to the manger, saw the child, and spread abroad the angelic saying; Eastern Magi knelt in adoration presenting gold, frankincense, and myrrh; while Herod the Great sought to destroy the infant King.",
        passages: ["Micah 5:2", "Luke 2:4-20", "Matthew 2:1-12"]
      },
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
      overview: "Nazareth was an unassuming agricultural village nestled in a natural limestone bowl in the hills of Lower Galilee, about fifteen miles southwest of the Sea of Galilee and three miles from Sepphoris (the Roman-Herodian administrative capital). Inhabited by several hundred working-class Jewish farmers and craftsmen, Nazareth was viewed with patronizing skepticism by cosmopolitan Judeans ('Can there any good thing come out of Nazareth?' John 1:46).\n\nYet here the angel Gabriel appeared to the virgin Mary to announce the miraculous conception of the Son of the Highest. Here Joseph and Mary settled upon returning from Egypt; here the child Jesus grew in wisdom, stature, and in favor with God and man. And here, in the local village synagogue on the Sabbath day, Jesus stood up to read from Isaiah 61, declaring: 'The Spirit of the Lord is upon me... This day is this scripture fulfilled in your ears' (Luke 4:18–21).",
      teachings: {
        teacher: "Jesus of Nazareth",
        audience: "His childhood neighbors, townsfolk, elders, and synagogue attendees in Lower Galilee",
        whatWasTaught: "The Messianic fulfillment of Isaiah 61: 'The Spirit of the Lord is upon me, because he hath anointed me to preach the gospel to the poor... This day is this scripture fulfilled in your ears' (Luke 4:18–21); the universality of God's grace.",
        whyTaught: "To announce the arrival of the Messianic Jubilee in His hometown and proclaim that God's covenant blessings extend to the humble and outsiders rather than the proud.",
        context: "An obscure hillside agricultural village of ~400 inhabitants in Lower Galilee, overshadowed by nearby Sepphoris.",
        howAccepted: "Violent and hostile rejection: though initially marveled by His gracious words, the hearers took offense when Jesus cited how God blessed a Phoenician widow in Elijah's day and a Syrian leper in Elisha's day instead of Israel. Filled with wrath, the synagogue crowd rose up, drove Him out of town to the cliff's edge to cast Him down headlong, but He passed safely through their midst. Jesus declared, 'No prophet is accepted in his own country,' and did not many mighty works there because of their unbelief.",
        passages: ["Luke 4:16-30", "Matthew 13:54-58", "Mark 6:1-6"]
      },
      scriptures: [
        v("Luke 1:26-31", "And in the sixth month the angel Gabriel was sent from God unto a city of Galilee, named Nazareth, To a virgin... And the angel said unto her, Fear not, Mary: for thou hast found favour with God.", nt("luke", "1", "26")),
        v("Luke 2:51-52", "And he went down with them, and came to Nazareth, and was subject unto them... And Jesus increased in wisdom and stature, and in favour with God and man.", nt("luke", "2", "51")),
        v("Luke 4:16-21", "And he came to Nazareth, where he had been brought up: and, as his custom was, he went into the synagogue on the sabbath day, and stood up for to read... This day is this scripture fulfilled in your ears.", nt("luke", "4", "16")),
        v("Luke 4:28-30", "And all they in the synagogue, when they heard these things, were filled with wrath, And rose up, and thrust him out of the city, and led him unto the brow of the hill whereon their city was built, that they might cast him down headlong. But he passing through the midst of them went his way.", nt("luke", "4", "28"))
      ],
      peopleAndChurch: "Mary the mother of Jesus; Joseph the carpenter; the boy Jesus; His brethren James, Joses, Simon, and Judas; the synagogue attendants and townspeople who rejected Him.",
      politicalInsights: "Nazareth belonged to the tetrarchy of Galilee under Herod Antipas. Its obscurity ('Can there any good thing come out of Nazareth?') stood in contrast to nearby Sepphoris, Antipas's early capital.",
      eraChronology: "~6 BC: Annunciation; ~4 BC–26 AD: hidden years in Nazareth; ~28 AD: synagogue rejection; the village continued as a Galilean town after the Resurrection."
    },
    capernaum: {
      overview: "Capernaum ('Village of Nahum') sat gracefully upon the northwest shore of the Sea of Galilee along the bustling Via Maris (Way of the Sea), the premier international military and caravan road linking Damascus and Egypt. Endowed with a sheltered basalt harbor, fertile black soil, and a thriving fishing industry, Capernaum also housed an imperial customs post and Roman garrison under the authority of Herod Antipas.\n\nAfter His rejection at Nazareth, Jesus chose Capernaum as 'his own city' (Matthew 9:1)—the headquarters of His entire Galilean ministry. Here in Capernaum, Jesus called the fishermen Peter, Andrew, James, and John, and the tax collector Matthew from the receipt of custom. In the local synagogue, Jesus taught with astonishing authority and cast out unclean spirits. In Peter's home, He healed Peter's mother-in-law and countless sick who gathered at the doorway at sundown. Across Capernaum He healed the centurion's paralyzed servant, forgave and raised the paralytic lowered through the roof, and raised Jairus's daughter from the dead.",
      teachings: {
        teacher: "Jesus Christ",
        audience: "Galilean fishermen, tax collectors, crowds from across Decapolis and Galilee, synagogue leaders, and Roman centurions",
        whatWasTaught: "The Bread of Life Discourse ('I am the bread of life: he that cometh to me shall never hunger; and he that believeth on me shall never thirst,' John 6:35); kingdom repentance; the Son of Man's divine authority on earth to forgive sins; child-like humility; and faith that overcomes physical illness and demonic possession.",
        whyTaught: "To establish the headquarters of the Galilean ministry, call and train His Apostles, reveal His divine Sonship through unmatched signs, and redirect people from temporal bread to eternal life.",
        context: "A thriving frontier fishing port, toll-station, and garrison town along the Sea of Galilee on the international Via Maris trade route between Herod Antipas's Galilee and Philip's tetrarchy.",
        howAccepted: "Enthusiastic initial following turned to tragic spiritual failure: crowds thronged Peter's house so densely that a paralytic had to be lowered through the roof, and thousands chased Him around the lake by boat. Yet when Jesus preached the spiritual reality of eating His flesh and drinking His blood, many disciples murmured, 'This is an hard saying; who can hear it?' and walked no more with Him. Despite witnessing more mighty works than any other city on earth, Capernaum as a whole refused to repent, prompting Jesus's piercing woe: 'And thou, Capernaum, which art exalted unto heaven, shalt be brought down to hell' (Matthew 11:23).",
        passages: ["Matthew 4:13-17", "Matthew 11:20-24", "Mark 2:1-12", "John 6:24-69"]
      },
      scriptures: [
        v("Matthew 4:13-17", "And leaving Nazareth, he came and dwelt in Capernaum, which is upon the sea coast, in the borders of Zabulon and Nephthalim... From that time Jesus began to preach, and to say, Repent: for the kingdom of heaven is at hand.", nt("matt", "4", "13")),
        v("Mark 2:1-5", "And again he entered into Capernaum after some days... they uncovered the roof where he was: and when they had broken it up, they let down the bed wherein the sick of the palsy lay.", nt("mark", "2", "1")),
        v("John 6:35", "And Jesus said unto them, I am the bread of life: he that cometh to me shall never hunger; and he that believeth on me shall never thirst.", nt("john", "6", "35")),
        v("Matthew 11:23-24", "And thou, Capernaum, which art exalted unto heaven, shalt be brought down to hell: for if the mighty works, which have been done in thee, had been done in Sodom, it would have remained until this day. But I say unto you, That it shall be more tolerable for the land of Sodom in the day of judgment, than for thee.", nt("matt", "11", "23"))
      ],
      peopleAndChurch: "Simon Peter, Andrew, James, John, and Matthew the tax collector; Jairus the synagogue ruler; the Roman centurion whose faith exceeded all in Israel; Peter's mother-in-law; the nobleman whose dying son was healed.",
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
      overview: "Sychar in Samaria, nestled near Jacob's Well at the base of Mount Gerizim and Mount Ebal, was situated in the historic territory of ancient Shechem. Deep theological and ethnic hostility separated the Jewish and Samaritan peoples, who avoided sharing food, vessels, or friendly contact. The Samaritans venerated Mount Gerizim as the only legitimate place of sacrifice, rejecting Jerusalem's Temple.\n\nJourneying northward from Judea to Galilee, Jesus 'must needs go through Samaria' (John 4:4). Wearied from His journey, He sat at midday by Jacob's Well while His disciples went into Sychar to buy meat. When a Samaritan woman came to draw water, Jesus broke every cultural and religious barrier by asking her for a drink. He revealed to her the 'living water' springing up into everlasting life, demonstrated prophetic knowledge of her past, declared that true worshippers worship the Father in spirit and in truth, and explicitly revealed Himself as the Messiah ('I that speak unto thee am he').",
      teachings: {
        teacher: "Jesus Christ (and later Philip the Evangelist, Peter, and John)",
        audience: "The Samaritan woman at Jacob's Well and the townspeople of Sychar",
        whatWasTaught: "The Living Water springing up into everlasting life (John 4:10–14); God is a Spirit, and they that worship Him must worship in spirit and in truth rather than disputing Mount Gerizim versus Jerusalem; and Jesus's direct Messianic self-revelation: 'I that speak unto thee am he' (John 4:26).",
        whyTaught: "To break through centuries of bitter ethnic and theological enmity between Jews and Samaritans, and proclaim the universal scope of the Messiah's salvation.",
        context: "An ancient Samaritan town nestled between Mount Gerizim (the Samaritan holy mountain) and Mount Ebal in the biblical heartland of Shechem.",
        howAccepted: "One of the most open and warm receptions in all the Gospels: the Samaritan woman dropped her waterpot and hurried into town testifying, 'Come, see a man, which told me all things that ever I did: is not this the Christ?' The citizens came out, invited Jesus into their community, and begged Him to remain with them two days. Many believed on Him for the woman's testimony, and far more believed because of His own words, confessing: 'Now we believe... for we have heard him ourselves, and know that this is indeed the Christ, the Saviour of the world' (John 4:42).",
        passages: ["John 4:4-42", "Acts 8:4-17"]
      },
      scriptures: [
        v("John 4:13-14", "Jesus answered and said unto her, Whosoever drinketh of this water shall thirst again: But whosoever drinketh of the water that I shall give him shall never thirst; but the water that I shall give him shall be in him a well of water springing up into everlasting life.", nt("john", "4", "13")),
        v("John 4:23-26", "The hour cometh, and now is, when the true worshippers shall worship the Father in spirit and in truth: for the Father seeketh such to worship him. God is a Spirit: and they that worship him must worship him in spirit and in truth. The woman saith unto him, I know that Messias cometh... Jesus saith unto her, I that speak unto thee am he.", nt("john", "4", "23")),
        v("John 4:39-42", "And many of the Samaritans of that city believed on him for the saying of the woman... And said unto the woman, Now we believe, not because of thy saying: for we have heard him ourselves, and know that this is indeed the Christ, the Saviour of the world.", nt("john", "4", "39")),
        v("Acts 8:5-8", "Then Philip went down to the city of Samaria, and preached Christ unto them. And the people with one accord gave heed unto those things which Philip spake, hearing and seeing the miracles which he did... And there was great joy in that city.", nt("acts", "8", "5"))
      ],
      peopleAndChurch: "The Samaritan woman at the well; the townspeople of Sychar who believed; the Twelve Apostles; later Philip the Evangelist (Acts 8); Peter and John who laid hands on Samaritan converts to receive the Holy Ghost.",
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
      overview: "Caesarea Maritima was the administrative capital and military headquarters of Roman Judea for over six centuries. Masterfully constructed between 22 and 10 BC by Herod the Great and named in honor of Caesar Augustus, the city featured Sebastos—an engineering wonder of an artificial deep-water harbor built using underwater pozzolana concrete. Caesarea boasted a magnificent temple to Rome and Augustus, a 4,000-seat theater overlooking the Mediterranean, a coastal hippodrome, aqueducts, and the luxurious praetorium (palace) of the Roman governors.\n\nCaesarea is central to the global expansion of the New Testament Church. Here the Gentile Roman centurion Cornelius had an angelic vision and summoned the Apostle Peter from Joppa. Following Peter's preaching in Cornelius's house, the Holy Ghost fell upon the Gentile household—the 'Gentile Pentecost'—leading Peter to command their baptism and settling the landmark truth that 'God is no respecter of persons' (Acts 10:34). Later, Philip the Evangelist made Caesarea his permanent residence with his four prophesying daughters (Acts 21:8). Paul was held prisoner in Herod's praetorium for two full years (58–60 AD), defending his faith before Roman governors Antonius Felix and Porcius Festus, and delivering his impassioned testimony before the Jewish client king Herod Agrippa II and his sister Bernice.",
      teachings: {
        teacher: "The Apostle Peter and the Apostle Paul",
        audience: "Cornelius the Roman centurion and his household; Roman governors Felix and Festus; King Herod Agrippa II and Queen Bernice",
        whatWasTaught: "Universal divine grace ('Of a truth I perceive that God is no respecter of persons: But in every nation he that feareth him, and worketh righteousness, is accepted with him'); remission of sins through Jesus Christ; the defense of the Christian hope and the bodily resurrection of the dead; righteousness, temperance, and judgment to come.",
        whyTaught: "To open the door of the Kingdom to uncircumcised Gentiles without requiring conversion to Judaism, and to bear witness of Christ before kings and rulers as commanded by the Lord.",
        context: "The Roman governor's palace (Herod's Praetorium) and military barracks of the Italian and Augustan cohorts overlooking the Mediterranean Sea.",
        howAccepted: "Cornelius, his kinsmen, and close friends received Peter's words with reverence; the Holy Ghost fell on them as on the Apostles at the beginning, speaking in tongues and magnifying God before their baptism. In contrast, the Roman and royal hearings met political maneuvering: Governor Felix trembled at Paul's preaching on judgment yet kept him imprisoned hoping for a bribe; Festus cried out that Paul's great learning had made him mad; while King Agrippa II was visibly moved, uttering the historic words: 'Almost thou persuadest me to be a Christian' (Acts 26:28).",
        passages: ["Acts 10:1-48", "Acts 21:8-14", "Acts 24:22-27", "Acts 25:10-12", "Acts 26:1-32"]
      },
      scriptures: [
        v("Acts 10:1-5", "There was a certain man in Caesarea called Cornelius, a centurion of the band called the Italian band, A devout man, and one that feared God with all his house... He saw in a vision evidently about the ninth hour of the day an angel of God coming in to him.", nt("acts", "10", "1")),
        v("Acts 10:34-35", "Then Peter opened his mouth, and said, Of a truth I perceive that God is no respecter of persons: But in every nation he that feareth him, and worketh righteousness, is accepted with him.", nt("acts", "10", "34")),
        v("Acts 10:44-48", "While Peter yet spake these words, the Holy Ghost fell on all them which heard the word... And he commanded them to be baptized in the name of the Lord.", nt("acts", "10", "44")),
        v("Acts 21:8-9", "And the next day we that were of Paul's company departed, and came unto Caesarea: and we entered into the house of Philip the evangelist, which was one of the seven; and abode with him. And the same man had four daughters, virgins, which did prophesy.", nt("acts", "21", "8")),
        v("Acts 26:27-29", "King Agrippa, believest thou the prophets? I know that thou believest. Then Agrippa said unto Paul, Almost thou persuadest me to be a Christian. And Paul said, I would to God, that not only thou, but also all that hear me this day, were both almost, and altogether such as I am, except these bonds.", nt("acts", "26", "27"))
      ],
      peopleAndChurch: "Cornelius and his household (first Gentile converts); Peter; Philip the Evangelist and his four prophesying daughters; Roman governors Felix and Festus; King Herod Agrippa II and Bernice; the Roman soldiers of the Italian cohort; Agabus the prophet (who bound Paul's hands with his girdle, Acts 21:10–11).",
      politicalInsights: "Seat of the Roman equestrian prefect/procurator of Judea (confirmed archaeologically in 1961 by the discovery of the 'Pilate Stone' in the Caesarea theater). Ethnic tensions between Greek-Syrian citizens and the Jewish population in Caesarea in 66 AD sparked the Great Jewish Revolt that culminated in the destruction of Jerusalem in 70 AD.",
      eraChronology: "~10 BC: Sebastos harbor dedicated by Herod the Great; ~38 AD: Conversion of Cornelius; 44 AD: Herod Agrippa I dies suddenly in the Caesarea theater (Acts 12:20–23); 58–60 AD: Paul's two-year imprisonment in Herod's praetorium; 66 AD: Synagogue desecration and massacre trigger Jewish War."
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
      overview: "Damascus is one of the oldest continuously inhabited cities on earth, situated in a lush, river-fed oasis watered by the Barada (ancient Abana) River on the edge of the Syrian desert. As an ancient caravan capital connecting Mesopotamia, Arabia, and the Levant, Damascus held a large, prosperous Jewish diaspora community organized into multiple synagogues. In the years immediately following the resurrection, Damascus became an early refuge for disciples fleeing the persecution in Jerusalem that followed Stephen's martyrdom.\n\nBreathing out threatenings and slaughter against the disciples of the Lord, Saul of Tarsus obtained extradition arrest warrants from the High Priest in Jerusalem to bind and bring any followers of 'the Way' back to Jerusalem. As Saul drew near Damascus, suddenly at midday a blinding light from heaven flashed around him, casting him to the earth. The risen Lord spoke: 'Saul, Saul, why persecutest thou me?... I am Jesus whom thou persecutest' (Acts 9:4–5). Blinded for three days, Saul was led by the hand into Damascus to the house of Judas on the street called Straight. Ananias, a devout local disciple obedient to a divine vision, laid hands upon Saul, restoring his sight and baptizing him. Saul straightway began preaching in the Damascus synagogues that Jesus is the Son of God, shocking all who heard him.",
      teachings: {
        teacher: "The Risen Jesus Christ to Saul, Ananias to Saul, and Paul in the synagogues",
        audience: "Saul of Tarsus; Jewish synagogue elders and congregations of Damascus",
        whatWasTaught: "Jesus of Nazareth is the risen, living Son of God and the promised Messiah of Israel; divine calling and election to bear Christ's name before the Gentiles, kings, and the children of Israel; repentance and turning to God with works meet for repentance.",
        whyTaught: "To transform Christianity's fiercest persecutor into its greatest missionary, and demonstrate the power of Christ's resurrection in the synagogues of Syria.",
        context: "An ancient Syrian oasis city under Roman provincial authority, influenced by the Nabataean kingdom of King Aretas IV, along the colonnaded Decumanus Maximus (the Street called Straight).",
        howAccepted: "Hearers in the Damascus synagogues were astounded and confounded: 'Is not this he that destroyed them which called on this name in Jerusalem?' As Paul proved with increasing power that Jesus is the Christ, traditionalist leaders conspired to assassinate him, inducing the governor under Nabataean King Aretas to guard the city gates day and night to apprehend him. Faithful disciples thwarted the plot by taking Paul at night and lowering him down through a window in a large rope basket along the city wall, allowing him to escape into Arabia.",
        passages: ["Acts 9:1-25", "Acts 22:6-16", "Acts 26:12-20", "2 Corinthians 11:32-33", "Galatians 1:15-18"]
      },
      scriptures: [
        v("Acts 9:3-6", "And as he journeyed, he came near Damascus: and suddenly there shined round about him a light from heaven: And he fell to the earth, and heard a voice saying unto him, Saul, Saul, why persecutest thou me? And he said, Who art thou, Lord? And the Lord said, I am Jesus whom thou persecutest.", nt("acts", "9", "3")),
        v("Acts 9:17-20", "And Ananias went his way, and entered into the house; and putting his hands on him said, Brother Saul, the Lord, even Jesus... hath sent me, that thou mightest receive thy sight, and be filled with the Holy Ghost... And straightway he preached Christ in the synagogues, that he is the Son of God.", nt("acts", "9", "17")),
        v("Acts 9:23-25", "And after that many days were fulfilled, the Jews took counsel to kill him... Then the disciples took him by night, and let him down by the wall in a basket.", nt("acts", "9", "23")),
        v("2 Corinthians 11:32-33", "In Damascus the governor under Aretas the king kept the city of the Damascenes with a garrison, desirous to apprehend me: And through a window in a basket was I let down by the wall, and escaped his hands.", nt("2-cor", "11", "32"))
      ],
      peopleAndChurch: "Saul (Paul); Ananias (devout disciple who baptized Paul); Judas (whose house on the street called Straight hosted blinded Saul); early Damascus believers who risked their lives to lower Paul over the wall.",
      politicalInsights: "Damascus sat on the boundary of the Roman province of Syria and the Nabataean kingdom. During Caligula's reign (~37–40 AD), the Nabataean king Aretas IV exercised administrative control over the city, explaining why his ethnarch/governor guarded the gates to seize Paul on behalf of the Jewish authorities.",
      eraChronology: "~34 AD: Conversion of Saul on the Damascus road; ~34–37 AD: Saul's ministry in Damascus and withdrawal to Arabia (Galatians 1:17); ~37 AD: Basket escape over the city wall; Damascus became a premier bishopric of the Syrian Church."
    },
    "antioch-syria": {
      overview: "Antioch on the Orontes (modern Antakya, Turkey) was the illustrious capital of the Roman province of Syria and the third metropolis of the Roman Empire, trailing only Rome and Alexandria in size, wealth, and influence with a population exceeding 500,000. Founded in 300 BC by Seleucus I Nicator, Antioch was famed for its grand two-mile colonnaded street paved with marble and illuminated at night, its lush pleasure suburb of Daphne with the sanctuary of Apollo, and its multi-ethnic melting pot of Syrians, Greeks, Romans, and a privileged Jewish community with rights guaranteed by the Seleucids.\n\nFollowing the scattering that arose over Stephen's martyrdom in Jerusalem, certain Jewish-Christian refugees from Cyprus and Cyrene traveled to Antioch and took the bold, unprecedented step of speaking directly to the Hellenists (Greek Gentiles), preaching the Lord Jesus (Acts 11:20). A massive number believed and turned unto the Lord. Hearing of this breakthrough, the Jerusalem mother church dispatched Barnabas, who rejoiced to see the grace of God and immediately traveled to Tarsus to enlist Saul. Together, Barnabas and Saul labored in Antioch for a full year, teaching large crowds. Here in Antioch, the disciples were first called 'Christians' (Christianoi, Acts 11:26). Antioch became the sending church and headquarters for the worldwide Gentile mission, commissioning Paul and Barnabas on their missionary journeys.",
      teachings: {
        teacher: "Barnabas, Saul (Paul), the Prophet Agabus, Simeon Niger, Lucius of Cyrene, and Manaen",
        audience: "The pioneering multi-ethnic congregation of Greek Gentiles, Hellenistic Jews, and proselytes",
        whatWasTaught: "Universal salvation in Jesus Christ without the yoke of Mosaic circumcision; the grace of God manifested in Christian brotherhood; sacrificial love and famine relief for impoverished brethren in Judea; and the guidance of the Holy Ghost in world evangelism.",
        whyTaught: "To establish the first intentional multi-ethnic Gentile congregation, settle the dispute over Gentile inclusion, and launch the global expansion of the Christian movement.",
        context: "Capital of Roman Syria and military headquarters of the Roman legates; a cosmopolitan trade nexus along the Orontes River sixteen miles inland from its seaport of Seleucia Pieria.",
        howAccepted: "Eager and enthusiastic reception across cultural and racial divides: 'the hand of the Lord was with them: and a great number believed, and turned unto the Lord' (Acts 11:21). When the prophet Agabus predicted an empire-wide famine under Claudius, the Antiochene disciples demonstrated Christian love by sending relief to Jerusalem according to their ability. Later, when Judaizing legalists from Judea arrived insisting on circumcision, the Antiochene church stood firm and sent Paul and Barnabas to Jerusalem to convene the historic Jerusalem Council (Acts 15), securing the doctrinal charter of Gentile freedom.",
        passages: ["Acts 11:19-30", "Acts 13:1-4", "Acts 14:26-28", "Acts 15:1-35", "Galatians 2:11-16"]
      },
      scriptures: [
        v("Acts 11:20-24", "And some of them were men of Cyprus and Cyrene, which, when they were come to Antioch, spake unto the Grecians, preaching the Lord Jesus. And the hand of the Lord was with them: and a great number believed... For he was a good man, and full of the Holy Ghost and of faith: and much people was added unto the Lord.", nt("acts", "11", "20")),
        v("Acts 11:25-26", "Then departed Barnabas to Tarsus, for to seek Saul: And when he had found him, he brought him unto Antioch. And it came to pass, that a whole year they assembled themselves with the church, and taught much people. And the disciples were called Christians first in Antioch.", nt("acts", "11", "25")),
        v("Acts 13:1-3", "Now there were in the church that was at Antioch certain prophets and teachers; as Barnabas, and Simeon that was called Niger, and Lucius of Cyrene, and Manaen... and Saul. As they ministered to the Lord, and fasted, the Holy Ghost said, Separate me Barnabas and Saul for the work whereunto I have called them. And when they had fasted and prayed, and laid their hands on them, they sent them away.", nt("acts", "13", "1")),
        v("Galatians 2:11-12", "But when Peter was come to Antioch, I withstood him to the face, because he was to be blamed. For before that certain came from James, he did eat with the Gentiles: but when they were come, he withdrew and separated himself, fearing them which were of the circumcision.", nt("gal", "2", "11"))
      ],
      peopleAndChurch: "Barnabas (the 'Son of Consolation'); Saul of Tarsus; Simeon called Niger; Lucius of Cyrene; Manaen (foster brother of Herod Antipas); the Prophet Agabus; the Apostle Peter (who visited Antioch and shared table fellowship with Gentiles before being confronted by Paul); Titus; and John Mark.",
      politicalInsights: "Seat of the Roman consular legate governing Syria, commanding four legions and overseeing regional client kingdoms. The designation 'Christianoi' was originally coined by Antiochene civic authorities or Latin-speaking magistrates as a political/legal label designating followers of Christos, similar to 'Herodiani' or 'Caesariani.'",
      eraChronology: "~40–42 AD: Church established among Greek Gentiles; ~43–44 AD: Barnabas brings Saul from Tarsus; 46 AD: Famine relief sent to Judea; 47 AD: Paul & Barnabas sent on 1st Missionary Journey; 49 AD: Antioch delegates sent to Jerusalem Council; early 2nd century: Bishop Ignatius of Antioch martyred."
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
      overview: "Ephesus was the grand metropolis, administrative capital, and commercial gateway of the Roman senatorial province of Asia (modern western Turkey), ranking alongside Rome, Alexandria, and Syrian Antioch as one of the four greatest cities in the Mediterranean world. Located near the mouth of the Cayster River on the Aegean Sea, Ephesus controlled vast sea trade and inland caravan routes leading across the Anatolian plateau. The city was world-renowned as the temple-guardian (neōkoros) of the Temple of Artemis (Diana of the Ephesians)—a colossal marble sanctuary four times the size of the Parthenon in Athens and hailed as one of the Seven Wonders of the Ancient World. The city was also an infamous center for the occult, black magic, and astrological incantations known throughout the empire as 'Ephesian Letters' (Ephesia Grammata).\n\nPaul made Ephesus his primary missionary headquarters for nearly three years (~52–55 AD) during his third missionary journey (Acts 19). Beginning in the local synagogue for three months, Paul reasoned and persuaded concerning the kingdom of God. When hardened opposition arose, he withdrew the disciples and took up daily lectures in the lecture hall of Tyrannus (a Greek philosopher's academy), teaching during the hot midday rest hours (from 11 AM to 4 PM) for two full years. As a result, Luke records that 'all they which dwelt in Asia heard the word of the Lord Jesus, both Jews and Greeks' (Acts 19:10). From Ephesus, the Gospel radiated outward, establishing congregations across the Lycus Valley (Colossae, Laodicea, Hierapolis) and the cities addressed in Revelation. Later, Timothy was assigned as apostolic overseer of Ephesus, and the Apostle John made the city his home and pastorate in his later decades, tradition holding that he cared for Mary the mother of Jesus here.",
      teachings: {
        teacher: "The Apostle Paul and later Timothy and the Apostle John",
        audience: "Ephesian disciples, international students and merchants at the Hall of Tyrannus, Jewish synagogue elders, reformed occultists, and Asian saints",
        whatWasTaught: "The true baptism of Jesus and the endowment of the Holy Ghost (Acts 19:1–6); salvation by grace through faith apart from works (Ephesians 2:8–10); the cosmic mystery of Christ uniting Jews and Gentiles into one holy temple in the Lord; the divine constitution of the Christian household; the spiritual armor of God to withstand principalities and powers in heavenly places (Ephesians 6:10–18); and returning to one's 'first love' (Revelation 2:1–7).",
        whyTaught: "To shatter pagan superstitious fear of demonic magic and astrological fate, build a theological fortress against commercialized idolatry, unite Jewish and Gentile believers into a single covenant family, and guard the flock against incoming 'grievous wolves' teaching perverse doctrines.",
        context: "Metropolis of Roman Asia, seat of the imperial proconsul; home to the Great Theater seating 25,000 citizens, the Temple of Artemis, the Commercial Agora, and flourishing silver guilds manufacturing miniature pagan shrines.",
        howAccepted: "Unparalleled, sweeping regional revival marked by dramatic spiritual warfare. God wrought special miracles by the hands of Paul, such that aprons and handkerchiefs carried from his body healed the sick and cast out evil spirits. When seven vagabond Jewish exorcists (the sons of chief priest Sceva) attempted to cast out demons using Jesus's name without authority, the possessed man leaped on them, overcoming and wounding them until they fled naked. Fear fell upon all Ephesus; believers confessed their occult deeds, and practitioners of the magical arts publicly heaped their sorcery scrolls into a massive bonfire valued at 50,000 pieces of silver. Alarmed that their lucrative trade was collapsing, Demetrius the silversmith incited thousands of craftsmen and citizens into a frenzy, filling the Great Theater and roaring for two straight hours: 'Great is Diana of the Ephesians!' The city clerk finally dispersed the riot, and the Ephesian church became the pillar congregation of Asia Minor.",
        passages: ["Acts 19:1-20", "Acts 19:23-41", "Acts 20:17-38", "Ephesians 1:3-14", "Ephesians 2:8-19", "Ephesians 6:10-18", "Revelation 2:1-7"]
      },
      scriptures: [
        v("Acts 19:1-6", "Paul having passed through the upper coasts came to Ephesus: and finding certain disciples, He said unto them, Have ye received the Holy Ghost since ye believed?... And when Paul had laid his hands upon them, the Holy Ghost came on them; and they spake with tongues, and prophesied.", nt("acts", "19", "1")),
        v("Acts 19:8-10", "And he went into the synagogue, and spake boldly for the space of three months... But when divers were hardened, and believed not... he departed from them, and separated the disciples, disputing daily in the school of one Tyrannus. And this continued by the space of two years; so that all they which dwelt in Asia heard the word of the Lord Jesus, both Jews and Greeks.", nt("acts", "19", "8")),
        v("Acts 19:18-20", "And many that believed came, and confessed, and shewed their deeds. Many of them also which used curious arts brought their books together, and burned them before all men: and they counted the price of them, and found it fifty thousand pieces of silver. So mightily grew the word of God and prevailed.", nt("acts", "19", "18")),
        v("Acts 19:28-29", "And when they heard these sayings, they were full of wrath, and cried out, saying, Great is Diana of the Ephesians. And the whole city was filled with confusion: and having caught Gaius and Aristarchus, men of Macedonia, Paul's companions in travel, they rushed with one accord into the theatre.", nt("acts", "19", "28")),
        v("Ephesians 2:8-10", "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast. For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them.", nt("eph", "2", "8")),
        v("Ephesians 6:11-13", "Put on the whole armour of God, that ye may be able to stand against the wiles of the devil. For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places.", nt("eph", "6", "11")),
        v("Revelation 2:1-5", "Unto the angel of the church of Ephesus write... I know thy works, and thy labour, and thy patience... Nevertheless I have somewhat against thee, because thou hast left thy first love. Remember therefore from whence thou art fallen, and repent.", nt("rev", "2", "1"))
      ],
      peopleAndChurch: "Aquila and Priscilla (who established the church in their house and instructed Apollos); Apollos of Alexandria; Timothy (first pastor/bishop of Ephesus, recipient of 1 & 2 Timothy); the twelve disciples of John the Baptist; Demetrius the silversmith; Alexander the coppersmith; Trophimus the Ephesian; the elders of Ephesus who wept with Paul at Miletus; and the Apostle John who spent his final decades ministering to the Asian churches.",
      politicalInsights: "Seat of the Roman proconsular governor of Asia and center of the provincial imperial cult (neōkoros). The city assembly (Dēmos) met regularly in the Great Theater. The prudent intervention of the city recorder / town clerk (grammateus) in Acts 19:35–41 demonstrated Roman administrative rigor: he warned the rioting populace that they were in danger of being charged with sedition by Rome for an unlawful assembly, since regular courts (conventus) and proconsuls were readily available to adjudicate civil grievances.",
      eraChronology: "52 AD: Paul visits briefly on the second journey leaving Aquila & Priscilla; 52–55 AD: Paul's three-year residency on the third journey; 57 AD: Paul's emotional farewell to Ephesian elders at Miletus; ~62 AD: Paul writes the Epistle to the Ephesians from Roman imprisonment; 63–66 AD: Timothy serves as pastor (1 & 2 Timothy); ~95 AD: Apostle John writes Revelation from Patmos with letter to Ephesus; early 2nd century: Ignatius of Antioch writes to the Ephesians."
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
      overview: "Philippi was a premier Roman veteran colony situated on the fertile plain of eastern Macedonia along the Via Egnatia—the imperial military highway linking Rome with Byzantium and the East. Named after Philip II of Macedon (father of Alexander the Great) who seized its nearby gold mines in 356 BC, the city became famous for the decisive Battle of Philippi (42 BC), in which Mark Antony and Octavian defeated Caesar's assassins, Brutus and Cassius. Octavian later refounded it as Colonia Iulia Augusta Philippensis, bestowing the prized ius Italicum, which granted its veteran Roman colonists the legal privileges, landownership rights, and tax immunities of Italian soil.\n\nFollowing the 'Macedonian Call' at Troas ('Come over into Macedonia, and help us,' Acts 16:9), Paul, Silas, Timothy, and Luke crossed the Aegean Sea to Philippi in 50 AD, marking the historic entry of the Gospel into Europe. Because the city had fewer than ten Jewish men required to sustain a formal synagogue, the missionaries sought out a riverside place of prayer outside the colonial walls along the Gangites River. There they met Lydia of Thyatira, a wealthy merchant of royal purple dye. The Lord opened her heart, and she was baptized with her entire household, warmly hosting the apostolic company in her home. After Paul exorcised a spirit of divination from a slave girl—destroying the lucrative fortune-telling profits of her masters—the magistrates had Paul and Silas stripped, severely beaten with lictor rods, and cast into maximum security within the inner prison.",
      teachings: {
        teacher: "The Apostle Paul and Silas (joined by Luke and Timothy)",
        audience: "Lydia and devout women at the riverside; the Roman prison jailer and his family; colonial veterans and citizens",
        whatWasTaught: "Salvation through faith in the Lord Jesus Christ ('Believe on the Lord Jesus Christ, and thou shalt be saved, and thy house'); Christian joy and contentment in all circumstances; the transcendent 'Christ Hymn' of divine condescension and exaltation (Philippians 2:5–11: 'Who, being in the form of God... made himself of no reputation, and took upon him the form of a servant'); and pressing toward the mark for the prize of the high calling of God in Christ Jesus.",
        whyTaught: "To plant the first European church, comfort afflicted believers facing civic hostility, foster humble unity modeled after the Savior, and encourage generous partnership in the furtherance of the Gospel.",
        context: "A proud Roman military colony administered by duovirs (praetors) and lictors, where Roman citizens fiercely guarded Latin customs, uniforms, and civic cults against eastern 'foreign' superstitions.",
        howAccepted: "Remarkable conversions occurred at opposite poles of colonial society. Lydia, a wealthy businesswoman, believed immediately and opened her home as the church's headquarters. Following the midnight earthquake that shook the prison foundations and loosed their fetters, the terrified Roman jailer fell down trembling before Paul and Silas, washed their bloody stripes, and was baptized that same hour with all his household. The Philippian congregation became Paul's most beloved and affectionate church—his 'joy and crown'—repeatedly sending financial relief to him in Thessalonica, Corinth, and Rome.",
        passages: ["Acts 16:12-15", "Acts 16:22-34", "Philippians 1:3-11", "Philippians 2:5-11", "Philippians 3:7-14", "Philippians 4:4-13"]
      },
      scriptures: [
        v("Acts 16:13-15", "And on the sabbath we went out of the city by a river side, where prayer was wont to be made; and we sat down, and spake unto the women... And a certain woman named Lydia, a seller of purple... whose heart the Lord opened.", nt("acts", "16", "13")),
        v("Acts 16:22-24", "And the magistrates rent off their clothes, and commanded to beat them. And when they had laid many stripes upon them, they cast them into prison, charging the jailor to keep them safely.", nt("acts", "16", "22")),
        v("Acts 16:25-31", "And at midnight Paul and Silas prayed, and sang praises unto God: and the prisoners heard them. And suddenly there was a great earthquake... And the keeper of the prison... cried, Sirs, what must I do to be saved? And they said, Believe on the Lord Jesus Christ, and thou shalt be saved, and thy house.", nt("acts", "16", "25")),
        v("Philippians 1:3-6", "I thank my God upon every remembrance of you, Always in every prayer of mine for you all making request with joy, For your fellowship in the gospel from the first day until now; Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ.", nt("phil", "1", "3")),
        v("Philippians 2:5-8", "Let this mind be in you, which was also in Christ Jesus: Who, being in the form of God, thought it not robbery to be equal with God: But made himself of no reputation, and took upon him the form of a servant, and was made in the likeness of men: And being found in fashion as a man, he humbled himself, and became obedient unto death, even the death of the cross.", nt("phil", "2", "5")),
        v("Philippians 4:11-13", "Not that I speak in respect of want: for I have learned, in whatsoever state I am, therewith to be content... I can do all things through Christ which strengtheneth me.", nt("phil", "4", "11"))
      ],
      peopleAndChurch: "Lydia of Thyatira (first recorded European convert, purple-goods merchant); the Philippian jailer and his family; Luke the physician (who remained in Philippi to shepherd the young congregation during the 'we-passages' gap); Silas and Timothy; Epaphroditus (who brought financial gifts to Paul in Rome and nearly died of sickness); and female co-laborers Euodias and Syntyche.",
      politicalInsights: "Possessed ius Italicum status under Roman colonial law. When colonial magistrates realized they had unlawfully stripped, flogged, and imprisoned Roman citizens without trial (violating the Lex Porcia and Lex Julia), they came in person to apologize, beseeching Paul and Silas to leave peacefully.",
      eraChronology: "356 BC: Philip II captures and renames the city; 42 BC: Triumvirs defeat Brutus and Cassius; 50 AD: Paul and Silas plant the first European church; 56–57 AD: Paul revisits Philippi during his 3rd journey; ~62 AD: Paul writes the Epistle to the Philippians from Roman house arrest."
    },
    thessalonica: {
      overview: "Thessalonica was the bustling provincial capital and naval metropolis of Roman Macedonia, superbly positioned on the Thermaic Gulf where the Via Egnatia intersected the primary overland trade routes to the Danube. Founded in 315 BC by King Cassander and named after his wife Thessalonike (sister of Alexander the Great), the city supported Rome in the civil wars and was rewarded with the coveted status of a 'free city' (civitas libera). This afforded Thessalonica autonomy from Roman garrisons, the right to mint local coinage, and governance by native magistrates titled politarchs.\n\nArriving in autumn 50 AD after departing Philippi, Paul, Silas, and Timothy made Thessalonica their second European stop. According to his custom, Paul entered the local Jewish synagogue and for three consecutive Sabbath days reasoned intensely with them from the Hebrew scriptures, opening and alleging that the promised Messiah had to suffer and rise again from the dead, declaring: 'This Jesus, whom I preach unto you, is Christ' (Acts 17:3). A major congregation was quickly gathered, but envious opponents formed a mob with marketplace agitators, assaulted the house of Jason looking for the missionaries, and dragged Jason before the politarchs with the volatile political charge that the Christians were defying Caesar's imperial decrees by proclaiming 'another king, one Jesus.'",
      teachings: {
        teacher: "The Apostle Paul, Silas, and Timothy",
        audience: "Jewish synagogue members, a great multitude of God-fearing Greeks, prominent noblewomen, and Thessalonian tradesmen",
        whatWasTaught: "The scriptural necessity of the Messiah's suffering and bodily resurrection; holy sanctification and moral purity in contrast to Gentile pagan passions (1 Thes 4:3–5); honest labor with one's own hands; and the majestic theology of the Second Coming of Jesus Christ and the resurrection of the dead ('For the Lord himself shall descend from heaven with a shout, with the voice of the archangel, and with the trump of God: and the dead in Christ shall rise first,' 1 Thes 4:16).",
        whyTaught: "To anchor young converts facing intense local social ostracism, comfort believers mourning the death of brethren before the Parousia, and correct rumors that the Day of the Lord had already occurred.",
        context: "A wealthy, autonomous Greek seaport and administrative capital of Macedonia, where imperial loyalty to Caesar was enthusiastically celebrated and where the populace was hyper-sensitive to any hint of political treason.",
        howAccepted: "The Gospel enjoyed immediate, rapid acceptance among Hellenistic God-fearers and influential Greek women, but stirred fierce backlash from traditional Jewish synagogue leaders. Unable to find Paul and Silas, an angry mob attacked Jason's home and dragged him and other brethren before the politarchs. Jason was forced to post heavy security bond, and the brethren prudently escorted Paul and Silas out of the city by night to Berea. Despite continuing severe affliction from their own countrymen, the Thessalonian saints became renowned across Macedonia and Achaia as a model church whose faith 'sounded out' like a trumpet.",
        passages: ["Acts 17:1-9", "1 Thessalonians 1:2-10", "1 Thessalonians 2:8-13", "1 Thessalonians 4:13-18", "2 Thessalonians 2:1-4"]
      },
      scriptures: [
        v("Acts 17:1-4", "They came to Thessalonica, where was a synagogue of the Jews: And Paul, as his manner was, went in unto them, and three sabbath days reasoned with them out of the scriptures, Opening and alleging, that Christ must needs have suffered, and risen again from the dead; and that this Jesus, whom I preach unto you, is Christ. And some of them believed.", nt("acts", "17", "1")),
        v("Acts 17:5-9", "But the Jews which believed not, moved with envy, took unto them certain lewd fellows of the baser sort, and gathered a company, and set all the city on an uproar, and assaulted the house of Jason... crying, These that have turned the world upside down are come hither also... saying that there is another king, one Jesus.", nt("acts", "17", "5")),
        v("1 Thessalonians 1:6-8", "And ye became followers of us, and of the Lord, having received the word in much affliction, with joy of the Holy Ghost: So that ye were ensamples to all that believe in Macedonia and Achaia. For from you sounded out the word of the Lord.", nt("1-thes", "1", "6")),
        v("1 Thessalonians 4:16-18", "For the Lord himself shall descend from heaven with a shout, with the voice of the archangel, and with the trump of God: and the dead in Christ shall rise first: Then we which are alive and remain shall be caught up together with them in the clouds, to meet the Lord in the air... Wherefore comfort one another with these words.", nt("1-thes", "4", "16")),
        v("2 Thessalonians 3:7-10", "For yourselves know how ye ought to follow us: for we behaved not ourselves disorderly among you; Neither did we eat any man's bread for nought; but wrought with labour and travail night and day... If any would not work, neither should he eat.", nt("2-thes", "3", "7"))
      ],
      peopleAndChurch: "Jason (who housed the apostolic mission and posted bond); Aristarchus and Secundus (Thessalonian leaders who accompanied Paul through the riot at Ephesus and on his final voyage to Rome); Demas (initially a co-worker before forsaking Paul for the present world); a large contingent of prominent Greek women and God-fearers.",
      politicalInsights: "Governed by native Greek magistrates known as politarchs (politarchai)—a municipal title once challenged by critics of Acts until 19th-century archaeologists uncovered over thirty Macedonian inscriptions verifying the exact term, including on Thessalonica's Vardar Gate. The accusation of treason against Caesar's decrees highlights Roman political sensitivity in free cities.",
      eraChronology: "315 BC: City founded by Cassander; 168 BC: Becomes capital of Roman Macedonia; 42 BC: Named a free city by Antony and Octavian; Autumn 50 AD: Paul's synagogue preaching and Jason's trial; 51 AD: Paul writes 1 & 2 Thessalonians from Corinth (his earliest preserved epistles)."
    },
    berea: {
      overview: "Berea (modern Veria) was a prosperous and venerable Macedonian city nestled in the fertile orchard country on the eastern foothills of Mount Bermion, about 45 miles west of Thessalonica and south of the Via Egnatia. Known for its abundant spring waters and ancient Hellenistic heritage, Berea served as a cultural haven, somewhat insulated from the frantic maritime traffic of Thessalonica, yet firmly integrated into Roman regional governance.\n\nSent away by night from Thessalonica to escape mob violence, Paul and Silas arrived in Berea and immediately visited the local Jewish synagogue. Unlike the volatile crowds of Thessalonica, the Berean Jews and Gentile God-fearers distinguished themselves by their intellectual and spiritual integrity. Luke records their immortal tribute: 'These were more noble than those in Thessalonica, in that they received the word with all readiness of mind, and searched the scriptures daily, whether those things were so' (Acts 17:11).",
      teachings: {
        teacher: "The Apostle Paul and Silas (joined shortly by Timothy)",
        audience: "Berean Jewish scholars, Hellenistic God-fearers, and prominent Greek women and men of civic standing",
        whatWasTaught: "Systematic prophetic verification that the life, suffering, crucifixion, and resurrection of Jesus of Nazareth fulfilled the Messianic promises of the Law, the Prophets, and the Psalms; daily scriptural examination and spiritual discernment.",
        whyTaught: "To ground converts upon an unshakeable foundation of the written Word of God, verifying apostolic claims through daily personal study rather than blind credulity.",
        context: "A serene, educated inland Macedonian community featuring a well-ordered synagogue frequented by prominent civic leaders and honorable families.",
        howAccepted: "The Berean response was one of the most positive, orderly, and fruitful in the Book of Acts. Many believed, including a substantial number of honorable Greek women of nobility and prominent men. However, when hostile Jewish leaders in Thessalonica learned that the word of God was being preached at Berea, they traveled the 45 miles overland, agitated the crowds, and stirred up civic turmoil. To protect Paul, the Berean brethren immediately escorted him south to the sea coast to sail for Athens, while Silas and Timothy remained behind to establish and nurture the newly planted assembly.",
        passages: ["Acts 17:10-15", "Acts 20:4"]
      },
      scriptures: [
        v("Acts 17:10-12", "And the brethren immediately sent away Paul and Silas by night unto Berea: who coming thither went into the synagogue of the Jews. These were more noble than those in Thessalonica, in that they received the word with all readiness of mind, and searched the scriptures daily, whether those things were so. Therefore many of them believed; also of honourable women which were Greeks, and of men, not a few.", nt("acts", "17", "10")),
        v("Acts 17:13-15", "But when the Jews of Thessalonica had knowledge that the word of God was preached of Paul at Berea, they came thither also, and stirred up the people. And then immediately the brethren sent away Paul to go as it were to the sea: but Silas and Timotheus abode there still. And they that conducted Paul brought him unto Athens.", nt("acts", "17", "13")),
        v("Acts 20:4", "And there accompanied him into Asia Sopater of Berea; and of the Thessalonians, Aristarchus and Secundus; and Gaius of Derbe, and Timotheus.", nt("acts", "20", "4"))
      ],
      peopleAndChurch: "Sopater of Berea (son of Pyrrhus, who represented the Berean church and accompanied Paul delivering the great relief collection to Jerusalem); Silas and Timothy (who stayed to pastor the new converts); numerous noble Greek women and men whose names are preserved in the heavenly record.",
      politicalInsights: "Part of the Roman administrative district of Macedonia Secunda. The Berean incident illustrates how hostile networks of opposition could cross municipal boundaries, utilizing travel infrastructure to agitate sister cities against the apostles.",
      eraChronology: "168 BC: First Macedonian city to surrender to Rome after the Battle of Pydna; Autumn 50 AD: Paul and Silas's noble reception; late 50 AD: Silas and Timothy rejoin Paul in Corinth; 57 AD: Sopater of Berea journeys with Paul carrying the collection."
    },
    athens: {
      overview: "Athens was the intellectual, philosophical, and artistic cradle of Western civilization. Though stripped of its political empire by Rome, Athens retained immense cultural prestige as a university city, celebrated for its classical architecture, rhetoric, and philosophical academies. Dominating the skyline stood the Acropolis with the Parthenon, while below stretched the bustling Agora (marketplace) and the rocky knoll of Mars' Hill (the Areopagus). The city was famous—and notorious—for its boundless polytheism, prompting the satirist Petronius to remark that it was easier to find a god in Athens than a man.\n\nArriving alone from Berea while waiting for Silas and Timothy, Paul's spirit was deeply provoked within him when he saw the entire city wholly given over to idolatry (Acts 17:16). He reasoned weekly in the synagogue with Jews and God-fearers, and daily in the Agora with whoever crossed his path. Encountering elite philosophers of the Stoic and Epicurean traditions, who initially mocked him as a babbler (spermologos, 'seed-picker') and a proclaimer of strange foreign deities (Jesus and Anastasis / Resurrection), they brought him to the Areopagus—the revered council that regulated religion, morality, and foreign philosophy.",
      teachings: {
        teacher: "The Apostle Paul",
        audience: "Epicurean and Stoic philosophers, members of the Council of the Areopagus, and Athenian citizens gathered to hear new ideas",
        whatWasTaught: "The True Creator God revealed through the altar 'TO THE UNKNOWN GOD' (Agnōstō Theō): that God made the world and all things therein; that as Lord of heaven and earth He dwelleth not in temples made with hands; that He hath made of one blood all nations of men to seek after Him; that 'in him we live, and move, and have our being' (quoting Aratus and Epimenides); that humanity is the offspring of God, making gold and stone idols foolish; and that God now commandeth all men everywhere to repent, having appointed a day to judge the world by Jesus Christ, whom He raised from the dead.",
        whyTaught: "To confront pagan pantheism, polytheism, and philosophical materialism with the living, transcendent, and personal Creator-Judge, proclaiming the reality of the physical resurrection.",
        context: "The limestone summit of Mars' Hill beneath the shadow of the Acropolis temples, addressing the supreme council of Athenian civic and religious jurisprudence.",
        howAccepted: "A mixed and polarized intellectual reception. When the sophisticated Greek audience heard Paul speak of the literal resurrection of the dead (an idea alien to Greek thought, which viewed the physical body as a prison of the soul), some openly mocked. Others adopted polite procrastination, saying: 'We will hear thee again of this matter.' However, a vital remnant embraced the apostolic witness: Dionysius the Areopagite (an elite member of the governing judicial council), a woman named Damaris, and several others with them, laying the foundation for Christianity in Athens.",
        passages: ["Acts 17:16-21", "Acts 17:22-31", "Acts 17:32-34", "1 Thessalonians 3:1-2"]
      },
      scriptures: [
        v("Acts 17:16-18", "Now while Paul waited for them at Athens, his spirit was stirred in him, when he saw the city wholly given to idolatry... Then certain philosophers of the Epicureans, and of the Stoicks, encountered him. And some said, What will this babbler say? other some, He seemeth to be a setter forth of strange gods: because he preached unto them Jesus, and the resurrection.", nt("acts", "17", "16")),
        v("Acts 17:22-25", "Then Paul stood in the midst of Mars' hill, and said, Ye men of Athens, I perceive that in all things ye are too superstitious. For as I passed by, and beheld your devotions, I found an altar with this inscription, TO THE UNKNOWN GOD. Whom therefore ye ignorantly worship, him declare I unto you. God that made the world and all things therein, seeing that he is Lord of heaven and earth, dwelleth not in temples made with hands.", nt("acts", "17", "22")),
        v("Acts 17:26-28", "And hath made of one blood all nations of men for to dwell on all the face of the earth... That they should seek the Lord, if haply they might feel after him, and find him, though he be not far from every one of us: For in him we live, and move, and have our being; as certain also of your own poets have said, For we are also his offspring.", nt("acts", "17", "26")),
        v("Acts 17:30-34", "And the times of this ignorance God winked at; but now commandeth all men every where to repent: Because he hath appointed a day, in the which he will judge the world in righteousness by that man whom he hath ordained; whereof he hath given assurance unto all men, in that he hath raised him from the dead. And when they heard of the resurrection of the dead, some mocked... Howbeit certain men clave unto him, and believed: among the which was Dionysius the Areopagite, and a woman named Damaris, and others with them.", nt("acts", "17", "30"))
      ],
      peopleAndChurch: "Dionysius the Areopagite (court magistrate who converted and, according to early church tradition, became the first bishop of Athens); Damaris (a prominent Athenian woman); Silas and Timothy (who rejoined Paul briefly before being dispatched back to Thessalonica); early house church believers.",
      politicalInsights: "Athens was a civitas libera (free city) allied with Rome, governed by its ancient institutions—the Assembly (Ekklesia) and the venerable Council of the Areopagus. The Areopagus held jurisdiction over foreign religions, educational lectures, and public morals, making Paul's address a formal evaluation before city elders rather than a criminal trial.",
      eraChronology: "86 BC: Roman general Sulla sacks Athens; 51 AD: Paul delivers the Areopagus Sermon on Mars' Hill; ~125 AD: Athenian Christian philosophers Quadratus and Aristides present early Christian apologies to Emperor Hadrian."
    },
    corinth: {
      overview: "Corinth occupied one of the most commanding and wealthy geographic positions in antiquity, perched upon the four-mile-wide Isthmus connecting mainland Greece with the Peloponnese. Ships avoided the treacherous 250-mile voyage around Cape Malea by using the Diolkos—a paved limestone trackway over which vessels and cargo were dragged between the Saronic Gulf (port of Cenchreae, facing Asia and Egypt) and the Corinthian Gulf (port of Lechaion, facing Italy and Rome). Destroyed by the Roman general Lucius Mummius in 146 BC, the city was refounded a century later in 44 BC by Julius Caesar as a Roman colony (Colonia Laus Iulia Corinthiensis), populated by freedmen, Italian veterans, Syrian merchants, and Greek artisans.\n\nPaul arrived in autumn 50 AD, alone and in need of support after his philosophical confrontation at Athens. He lodged and worked daily as a leatherworker and tentmaker with Aquila and Priscilla, Jewish-Christian exiles recently expelled from Rome under Claudius's imperial edict. Paul ministered in Corinth for eighteen months (Acts 18:1–18)—his second-longest recorded stay. Comforted by a nighttime vision in which Christ assured him, 'Be not afraid, but speak, and hold not thy peace: for I am with thee, and no man shall set on thee to hurt thee: for I have much people in this city,' Paul established one of the largest, most socially diverse, and spiritually gifted congregations in the Mediterranean. From Corinth, Paul also penned 1 & 2 Thessalonians and his masterwork theological treatise, the Epistle to the Romans.",
      teachings: {
        teacher: "The Apostle Paul (assisted by Silas, Timothy, Aquila, and Priscilla; later Apollos)",
        audience: "Synagogue leader Crispus, Justus, Gaius, Erastus the city treasurer, Jewish God-fearers, and Greek converts from dockworkers to wealthy households",
        whatWasTaught: "The power and wisdom of the Cross over human eloquence ('we preach Christ crucified, unto the Jews a stumblingblock, and unto the Greeks foolishness'); moral holiness and the sanctity of the physical body as a temple of the Holy Ghost (1 Cor 6:19–20); Christian liberty governed by love for weaker consciences regarding meats offered to idols; the sacred memorial and worthy partaking of the Lord's Supper (1 Cor 11:23–26); spiritual gifts operating harmoniously in one Body (1 Cor 12); the supremacy of Charity (agape) above prophecy, tongues, and miracles (1 Cor 13); and the definitive apostolic witness of Christ's physical Resurrection and the resurrection of all humanity (1 Cor 15).",
        whyTaught: "To resolve intense congregational factions ('I am of Paul, and I of Apollos'), rampant sexual immorality and pagan banquet attendance, believers suing one another in pagan civil courts, disorderly abuses of ecstatic tongues, and intellectual skepticism that denied the literal bodily resurrection.",
        context: "Provincial capital of Roman Achaia; bustling isthmus metropolis hosting the biennial Isthmian Games; dominated by the 1,886-foot Acrocorinth citadel, Roman public baths, civic basilica, and the judicial Bema tribunal in the Agora.",
        howAccepted: "A large and vibrant church took root, but amid fierce civic friction. Chief synagogue ruler Crispus believed on the Lord with all his house and was baptized, along with Gaius, Stephanas, and many Corinthian Greeks. When orthodox synagogue leaders vehemently blasphemed and opposed Paul, he shook his raiment and relocated next door to the home of Titus Justus, a Gentile God-fearer. Opponents united and dragged Paul before the judgment seat (Bema) of the newly arrived Roman Proconsul Gallio, accusing him of persuading men to worship contrary to the law. Gallio famously refused to adjudicate internal religious controversies ('words and names and your law') and drove them from the tribunal. The Greek crowd then beat Sosthenes (the new synagogue leader) before the Bema while Gallio looked on with indifferent neutrality. This monumental legal precedent established de facto imperial toleration for Christian preaching under Roman law, granting Paul peace to instruct the church for another full year.",
        passages: ["Acts 18:1-17", "1 Corinthians 1:18-25", "1 Corinthians 6:19-20", "1 Corinthians 11:23-26", "1 Corinthians 13:1-13", "1 Corinthians 15:12-22", "1 Corinthians 15:51-58", "Romans 16:1-2, 21-23"]
      },
      scriptures: [
        v("Acts 18:1-4", "After these things Paul departed from Athens, and came to Corinth; And found a certain Jew named Aquila, born in Pontus, lately come from Italy, with his wife Priscilla; (because that Claudius had commanded all Jews to depart from Rome:) and came unto them. And because he was of the same craft, he abode with them, and wrought: for by their occupation they were tentmakers.", nt("acts", "18", "1")),
        v("Acts 18:9-11", "Then spake the Lord to Paul in the night by a vision, Be not afraid, but speak, and hold not thy peace: For I have much people in this city. And he continued there a year and six months, teaching the word of God among them.", nt("acts", "18", "9")),
        v("Acts 18:12-16", "And when Gallio was the deputy of Achaia, the Jews made insurrection with one accord against Paul, and brought him to the judgment seat, Saying, This fellow persuadeth men to worship God contrary to the law. And when Paul was now about to open his mouth, Gallio said unto the Jews... If it be a question of words and names, and of your law, look ye to it; for I will be no judge of such matters. And he drave them from the judgment seat.", nt("acts", "18", "12")),
        v("1 Corinthians 1:18-24", "For the preaching of the cross is to them that perish foolishness; but unto us which are saved it is the power of God... But we preach Christ crucified, unto the Jews a stumblingblock, and unto the Greeks foolishness; But unto them which are called, both Jews and Greeks, Christ the power of God, and the wisdom of God.", nt("1-cor", "1", "18")),
        v("1 Corinthians 6:19-20", "What? know ye not that your body is the temple of the Holy Ghost which is in you, which ye have of God, and ye are not your own? For ye are bought with a price: therefore glorify God in your body, and in your spirit, which are God's.", nt("1-cor", "6", "19")),
        v("1 Corinthians 11:23-26", "For I have received of the Lord that which also I delivered unto you, That the Lord Jesus the same night in which he was betrayed took bread: And when he had given thanks, he brake it, and said, Take, eat: this is my body, which is broken for you: this do in remembrance of me... For as often as ye eat this bread, and drink this cup, ye do shew the Lord's death till he come.", nt("1-cor", "11", "23")),
        v("1 Corinthians 13:1-8", "Though I speak with the tongues of men and of angels, and have not charity, I am become as sounding brass, or a tinkling cymbal... Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up... Charity never faileth.", nt("1-cor", "13", "1")),
        v("1 Corinthians 15:20-22", "But now is Christ risen from the dead, and become the firstfruits of them that slept. For since by man came death, by man came also the resurrection of the dead. For as in Adam all die, even so in Christ shall all be made alive.", nt("1-cor", "15", "20")),
        v("Romans 16:21-23", "Timotheus my workfellow, and Lucius, and Jason, and Sosipater, my kinsmen, salute you. I Tertius, who wrote this epistle, salute you in the Lord. Gaius mine host, and of the whole church, saluteth you. Erastus the chamberlain of the city saluteth you, and Quartus a brother.", nt("rom", "16", "21"))
      ],
      peopleAndChurch: "Aquila and Priscilla (Jewish-Christian leatherworkers who hosted Paul and mentored Apollos); Crispus (synagogue ruler who converted with his household); Titus Justus (God-fearer whose home next door to the synagogue became a Christian gathering point); Sosthenes (synagogue leader beaten before Gallio, later co-sender of 1 Corinthians); Gaius (wealthy host of Paul and the whole church); Erastus (city treasurer / aedile, commemorated on an excavated marble pavement at Corinth); Stephanas, Fortunatus, and Achaicus (the 'firstfruits of Achaia'); Phoebe (deaconess of the port church at Cenchreae who carried Paul's Epistle to Rome); Chloe's household (who alerted Paul to Corinthian divisions); and Apollos of Alexandria (whose fiery eloquence nurtured the church).",
      politicalInsights: "Seat of the Roman senatorial proconsul of Achaia. Lucius Junius Gallio (elder brother of the Stoic philosopher Seneca and tutor to Emperor Nero) arrived as governor in 51 AD (dated precisely by the Delphi Inscription). His dismissal of charges against Paul established an empire-wide judicial precedent recognizing Christianity under the umbrella of Judaism's legal protections (religio licita). As a Roman colonia, Corinth operated under Latin law and civic charters, while its cosmopolitan commerce gave freedmen unprecedented political mobility—exemplified by Erastus rising to high civic office (aedile).",
      eraChronology: "146 BC: Roman consul Mummius sacks classical Corinth; 44 BC: Julius Caesar refounds as Colonia Laus Iulia Corinthiensis; 49 AD: Emperor Claudius expels Jews from Rome (Aquila & Priscilla arrive in Corinth); Autumn 50 AD – Spring 52 AD: Paul's 18-month ministry; Summer 51 AD: Paul arraigned before Gallio at the Bema; 55–57 AD: 1 & 2 Corinthians composed to guide the congregation; Winter 57 AD: Paul writes Epistle to the Romans while hosted by Gaius in Corinth."
    },
    rome: {
      overview: "Rome, the imperial caput mundi ('head of the world') and capital of the Caesars, was an immense cosmopolitan metropolis of over one million people. Boasting magnificent marble temples, the Forum Romanum, the Palatine imperial palaces, and crowded multistory insulae (tenement blocks), the city sat at the center of 50,000 miles of paved highways and vast Mediterranean shipping lanes. An estimated 40,000 to 50,000 Jewish residents lived in Rome across neighborhoods like Trastevere and the Subura, organized into at least eleven documented synagogues.\n\nChristianity arrived in Rome early, likely carried by Jewish pilgrims returning from Peter's Pentecost sermon in Jerusalem (Acts 2:10: 'strangers of Rome, Jews and proselytes'). In 49 AD, Emperor Claudius expelled Jews from Rome due to riots connected with 'Chrestus' (Suetonius, Claudius 25.4), sending Aquila and Priscilla into exile. Writing from Corinth around 57 AD, Paul sent his magnum opus, the Epistle to the Romans, addressing a flourishing network of Jewish and Gentile house churches. In 60 AD, Paul finally arrived in Rome in chains following his appeal to Caesar (provocatio). For two whole years under military custody, Paul dwelt in his own rented quarters, preaching the Kingdom of God with all boldness, unhindered, until his martyrdom under Nero alongside the Apostle Peter.",
      teachings: {
        teacher: "The Apostle Paul and the Apostle Peter",
        audience: "Jewish and Gentile believers gathered in home assemblies across Rome, Roman Praetorian guards, visiting Jewish leaders, and members of Caesar's imperial household",
        whatWasTaught: "The Gospel as the power of God unto salvation to everyone that believeth; universal human guilt before God; justification by grace through faith in Jesus Christ apart from the deeds of the Mosaic law; the inner struggle between the flesh and the spirit (Romans 7); life in the Spirit ('There is therefore now no condemnation to them which are in Christ Jesus,' Romans 8:1); God's sovereign covenant with Israel (Romans 9–11); living sacrifices in practical holiness (Romans 12); submission to civil authorities (Romans 13); and unwavering hope in Christ.",
        whyTaught: "To resolve theological tensions between returning Jewish Christians and Gentile believers, establish apostolic doctrine in the capital, prepare a missionary launchpad toward Spain, and fortify the saints against imperial persecution.",
        context: "The heart of the Roman Empire under Nero's early reign; a city of extreme contrast between imperial luxury and squalid tenements, where Caesar was hailed as divine lord (Kyrios Kaisar).",
        howAccepted: "Roman Christians gave Paul a triumphant greeting, walking forty miles along the Appian Way to Appii Forum and Three Taverns to escort him. At his rented lodging, Paul summoned the local Jewish elders; after a daylong debate from morning to evening, some believed and some believed not. Paul continued two full years under Roman soldier guard, receiving all who came to him and preaching unhindered. Converts were won even among the Praetorian Guard and within Caesar's household (Philippians 1:13; 4:22). Following the Great Fire of Rome in 64 AD, Nero scapegoated the Christians, initiating horrific martyrdoms in the Circus Vaticanus—where, by early church testimony, Peter was crucified upside down and Paul was beheaded on the Ostian Way.",
        passages: ["Romans 1:7-17", "Romans 8:31-39", "Romans 12:1-5", "Romans 16:1-16", "Acts 28:14-31", "Philippians 1:12-14", "Philippians 4:22", "2 Timothy 4:6-8"]
      },
      scriptures: [
        v("Romans 1:7-16", "To all that be in Rome, beloved of God, called to be saints... For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth; to the Jew first, and also to the Greek.", nt("rom", "1", "7")),
        v("Romans 8:35-39", "Who shall separate us from the love of Christ? shall tribulation, or distress, or persecution, or famine, or nakedness, or peril, or sword?... For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.", nt("rom", "8", "35")),
        v("Acts 28:16", "And when we came to Rome, the centurion delivered the prisoners to the captain of the guard: but Paul was suffered to dwell by himself with a soldier that kept him.", nt("acts", "28", "16")),
        v("Acts 28:30-31", "And Paul dwelt two whole years in his own hired house, and received all that came in unto him, Preaching the kingdom of God, and teaching those things which concern the Lord Jesus Christ, with all confidence, no man forbidding him.", nt("acts", "28", "30")),
        v("Philippians 4:22", "All the saints salute you, chiefly they that are of Caesar's household.", nt("phil", "4", "22")),
        v("2 Timothy 4:6-8", "For I am now ready to be offered, and the time of my departure is at hand. I have fought a good fight, I have finished my course, I have kept the faith: Henceforth there is laid up for me a crown of righteousness.", nt("2-tim", "4", "6"))
      ],
      peopleAndChurch: "Phoebe of Cenchreae (courier of Romans); Priscilla and Aquila (who risked their necks for Paul); Andronicus and Junia ('of note among the apostles'); Rufus and his mother; Hermes, Hermas, Patrobas; saints in Caesar's imperial household; Luke the beloved physician; Mark; Onesimus; Aristarchus; Peter and Paul as apostolic martyr-witnesses.",
      politicalInsights: "The epic center of Roman law and imperial administration. As a Roman citizen, Paul exercised his fundamental constitutional right of provocatio (appeal to Caesar) against provincial corruption, bringing his case before the supreme imperial tribunal in Rome. Claudius's 49 AD edict and Nero's 64 AD persecution marked the transition of Christianity from a protected Jewish sect into an illicit and persecuted movement.",
      eraChronology: "49 AD: Claudius expels Jews from Rome; ~57 AD: Paul writes Epistle to the Romans from Corinth; Spring 60 AD: Paul arrives in Rome via Puteoli; 60–62 AD: Two years of unhindered preaching in his hired house; 64 AD: Great Fire of Rome and Neronian persecution; ~64–67 AD: Martyrdoms of Peter and Paul."
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
        v("Acts 16:13-15", "And on the sabbath we went out of the city by a river side, where prayer was wont to be made; and we sat down, and spake unto the women which resorted thither. And a certain woman named Lydia, a seller of purple... whose heart the Lord opened, that she attended unto the things which were spoken of Paul. And when she was baptized, and her household, she besought us...", nt("acts", "16", "13")),
        v("Acts 16:25-34", "And at midnight Paul and Silas prayed, and sang praises unto God: and the prisoners heard them. And suddenly there was a great earthquake... And the keeper of the prison awaking out of his sleep... fell down before Paul and Silas... And they said, Believe on the Lord Jesus Christ, and thou shalt be saved, and thy house.", nt("acts", "16", "25")),
        v("Philippians 1:3-6", "I thank my God upon every remembrance of you, Always in every prayer of mine for you all making request with joy, For your fellowship in the gospel from the first day until now; Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ.", nt("phil", "1", "3")),
        v("Philippians 4:4-7", "Rejoice in the Lord alway: and again I say, Rejoice. Let your moderation be known unto all men. The Lord is at hand. Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.", nt("phil", "4", "4"))
      ],
      peopleAndChurch: "• Lydia of Thyatira: Wealthy businesswoman and dealer in purple cloth; first recorded European convert; opened her home as the apostolic mission base.\n\n• The Philippian Jailer & Family: Roman official converted during the miraculous midnight earthquake; washed the apostles' stripes and was baptized with his household.\n\n• Silas, Timothy & Luke: Paul's missionary companions; Luke remained in Philippi to shepherd the young congregation (indicated by the 'we' to 'they' transition in Acts 16).\n\n• Epaphroditus: Devoted Philippian minister who risked his life carrying financial relief to Paul in Roman prison (Phil 2:25–30).\n\n• Euodia and Syntyche: Prominent women co-laborers urged by Paul to be of the same mind in the Lord (Phil 4:2).",
      politicalInsights: "• Roman Colony of Colonia Augusta Iulia Philippensis: Founded by Octavian and Antony after the defeat of Caesar's assassins (Brutus and Cassius) in 42 BC, populated by retired legionaries and granted the high status of ius Italicum (immunity from provincial taxation and governance under Roman municipal law).\n\n• Civic Magistrates & The Gangites River: Lacking a quorum of ten Jewish men to build a formal synagogue, believers met at a riverside proseuche (place of prayer). When Paul cast out a spirit of divination, the magistrates (duoviri) had Paul and Silas stripped and beaten without trial—prompting Paul's later assertion of Roman citizenship rights (Acts 16:37–39).",
      eraChronology: "• 42 BC: Battle of Philippi; city established as a Roman military colony.\n• 50 AD: Paul, Silas, Timothy, and Luke arrive on Second Missionary Journey; Lydia and the jailer baptized.\n• 56–57 AD: Paul revisits Philippi on his Third Missionary Journey (Acts 20:1–6).\n• ~62 AD: Paul pens the joyful Epistle to the Philippians from Roman imprisonment.\n• ~110 AD: Polycarp of Smyrna addresses his famous letter to the Philippian church.",
      epistles: ["Philippians"]
    },
    "Thessalonica & Berea": {
      scriptures: [
        v("Acts 17:1-4", "Now when they had passed through Amphipolis and Apollonia, they came to Thessalonica, where was a synagogue of the Jews: And Paul, as his manner was, went in unto them, and three sabbath days reasoned with them out of the scriptures, Opening and alleging, that Christ must needs have suffered, and risen again from the dead; and that this Jesus, whom I preach unto you, is Christ. And some of them believed, and consorted with Paul and Silas; and of the devout Greeks a great multitude, and of the chief women not a few.", nt("acts", "17", "1")),
        v("Acts 17:10-12", "And the brethren immediately sent away Paul and Silas by night unto Berea: who coming thither went into the synagogue of the Jews. These were more noble than those in Thessalonica, in that they received the word with all readiness of mind, and searched the scriptures daily, whether those things were so. Therefore many of them believed; also of honourable women which were Greeks, and of men, not a few.", nt("acts", "17", "10")),
        v("1 Thessalonians 1:6-8", "And ye became followers of us, and of the Lord, having received the word in much affliction, with joy of the Holy Ghost: So that ye were ensamples to all that believe in Macedonia and Achaia. For from you sounded out the word of the Lord not only in Macedonia and Achaia, but also in every place your faith to God-ward is spread abroad.", nt("1-thes", "1", "6"))
      ],
      peopleAndChurch: "• Jason: Host of Paul and Silas in Thessalonica whose home was mobbed by opponents; posted bail before the politarchs.\n\n• Aristarchus and Secundus: Thessalonian disciples who traveled with Paul to Rome and shared his imprisonment (Acts 20:4; 27:2; Col 4:10).\n\n• Sopater of Berea: Berean disciple who accompanied Paul on his final journey to Jerusalem with the collection for the poor (Acts 20:4).\n\n• Devout Greeks & Chief Women: A substantial company of Greek seekers and prominent civic women who embraced the Gospel.",
      politicalInsights: "• Free City of the Roman Empire & Politarchs: Thessalonica served as the capital of the senatorial province of Macedonia, situated along the Via Egnatia highway. Governed by locally elected civic magistrates termed 'politarchs' (politarchai, an exact title preserved in Acts 17:6 and confirmed by nineteen Macedonian inscriptions).\n\n• Accusation of Caesar Treason: Hostile factions dragged Jason before the politarchs accusing the disciples of subverting Caesar's decrees by proclaiming 'another king, one Jesus' (Acts 17:7), reflecting the heightened Roman sensitivity to sedition.",
      eraChronology: "• 168 BC: Rome conquers Macedonia; Thessalonica named regional capital.\n• 50 AD: Paul and Silas plant the church in Thessalonica; move to Berea under night cover.\n• 51 AD: Paul writes 1 and 2 Thessalonians from Corinth—his earliest surviving epistles.\n• 57 AD: Paul revisits Macedonia on Third Journey; receives generous relief funds.",
      epistles: ["1 Thessalonians", "2 Thessalonians"]
    },
    "Corinth & Cenchreae": {
      scriptures: [
        v("Acts 18:1-4", "After these things Paul departed from Athens, and came to Corinth; And found a certain Jew named Aquila, born in Pontus, lately come from Italy, with his wife Priscilla; (because that Claudius had commanded all Jews to depart from Rome:) and came unto them. And because he was of the same craft, he abode with them, and wrought: for by their occupation they were tentmakers. And he reasoned in the synagogue every sabbath, and persuaded the Jews and the Greeks.", nt("acts", "18", "1")),
        v("Acts 18:8-11", "And Crispus, the chief ruler of the synagogue, believed on the Lord with all his house; and many of the Corinthians hearing believed, and were baptized. Then spake the Lord to Paul in the night by a vision, Be not afraid, but speak, and hold not thy peace: For I am with thee, and no man shall set on thee to hurt thee: for I have much people in this city. And he continued there a year and six months, teaching the word of God among them.", nt("acts", "18", "8")),
        v("Acts 18:12-17", "And when Gallio was the deputy of Achaia, the Jews made insurrection with one accord against Paul, and brought him to the judgment seat... Gallio said unto the Jews, If it be a question of words and names, and of your law, look ye to it; for I will be no judge of such matters... Then all the Greeks took Sosthenes, the chief ruler of the synagogue, and beat him before the judgment seat. And Gallio cared for none of those things.", nt("acts", "18", "12")),
        v("1 Corinthians 1:1-3", "Paul, called to be an apostle of Jesus Christ through the will of God, and Sosthenes our brother, Unto the church of God which is at Corinth, to them that are sanctified in Christ Jesus, called to be saints, with all that in every place call upon the name of Jesus Christ our Lord, both their's and our's: Grace be unto you, and peace, from God our Father, and from the Lord Jesus Christ.", nt("1-cor", "1", "1")),
        v("1 Corinthians 1:14-17", "I thank God that I baptized none of you, but Crispus and Gaius; Lest any should say that I had baptized in mine own name. And I baptized also the household of Stephanas... For Christ sent me not to baptize, but to preach the gospel: not with wisdom of words, lest the cross of Christ should be made of none effect.", nt("1-cor", "1", "14")),
        v("1 Corinthians 9:24-27", "Know ye not that they which run in a race run all, but one receiveth the prize? So run, that ye may obtain. And every man that striveth for the mastery is temperate in all things. Now they do it to obtain a corruptible crown; but we an incorruptible.", nt("1-cor", "9", "24")),
        v("1 Corinthians 13:1-8", "Though I speak with the tongues of men and of angels, and have not charity, I am become as sounding brass, or a tinkling cymbal... Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up... Charity never faileth.", nt("1-cor", "13", "1")),
        v("1 Corinthians 15:20-22", "But now is Christ risen from the dead, and become the firstfruits of them that slept. For since by man came death, by man came also the resurrection of the dead. For as in Adam all die, even so in Christ shall all be made alive.", nt("1-cor", "15", "20")),
        v("2 Corinthians 1:1-4", "Paul, an apostle of Jesus Christ by the will of God, and Timothy our brother, unto the church of God which is at Corinth, with all the saints which are in all Achaia: Grace be to you and peace from God our Father, and from the Lord Jesus Christ. Blessed be God... the God of all comfort; Who comforteth us in all our tribulation...", nt("2-cor", "1", "1")),
        v("Romans 16:1-2", "I commend unto you Phebe our sister, which is a servant of the church which is at Cenchrea: That ye receive her in the Lord, as becometh saints, and that ye assist her in whatsoever business she hath need of you: for she hath been a succourer of many, and of myself also.", nt("rom", "16", "1")),
        v("Romans 16:21-23", "Timotheus my workfellow, and Lucius, and Jason, and Sosipater, my kinsmen, salute you. I Tertius, who wrote this epistle, salute you in the Lord. Gaius mine host, and of the whole church, saluteth you. Erastus the chamberlain of the city saluteth you, and Quartus a brother.", nt("rom", "16", "21"))
      ],
      peopleAndChurch: "• Aquila & Priscilla: Jewish tentmakers exiled from Rome under Claudius (49 AD); hosts, partners, and lifelong fellow-laborers of Paul who nurtured house churches and instructed Apollos (Acts 18:2–3, 26).\n\n• Crispus: Chief ruler of the synagogue (archisynagogos) who converted with his whole household and was personally baptized by Paul (Acts 18:8; 1 Cor 1:14).\n\n• Sosthenes: Successor synagogue leader beaten before Gallio; later converted and became Paul's trusted companion and co-sender of 1 Corinthians (Acts 18:17; 1 Cor 1:1).\n\n• Titius Justus: A God-fearing Gentile whose home adjoined the synagogue; opened his doors as Paul's teaching headquarters when synagogue leaders opposed the gospel (Acts 18:7).\n\n• Gaius: Baptized by Paul; host to Paul and the entire Corinthian church when the Epistle to the Romans was composed (Rom 16:23; 1 Cor 1:14).\n\n• Erastus: City treasurer and commissioner of public works (oikonomos / aedile), confirmed by the excavated 1st-century limestone pavement inscription (Rom 16:23).\n\n• Stephanas, Fortunatus & Achaicus: The 'firstfruits of Achaia'; devoted ministers who traveled across the Aegean to visit Paul in Ephesus (1 Cor 16:15–17).\n\n• Chloe's Household: Disciples who alerted Paul to divisive sectarian factions ('Paul vs. Apollos vs. Cephas') fragmenting the congregation (1 Cor 1:11).\n\n• Apollos of Alexandria: Eloquent scholar who watered the gospel seeds Paul planted in Corinth (Acts 18:27–28; 1 Cor 3:6).\n\n• Phoebe of Cenchreae: Deaconess and patroness of the eastern harbor assembly, entrusted by Paul to deliver the Epistle to the Romans (Rom 16:1–2).\n\n• Tertius & Quartus: Tertius, the scribe who penned Romans from Corinth, and Quartus, a Corinthian brother (Rom 16:22–23).",
      politicalInsights: "• Roman Colony of Colonia Laus Iulia Corinthiensis: Sacked by Mummius in 146 BC, Corinth was refounded in 44 BC by Julius Caesar as a Roman colony. Populated by freedmen, veterans, and merchants, it operated under Latin law and civic charters, offering unprecedented social mobility.\n\n• Capital of Achaia & The Bema: Designated the provincial capital of Achaia in 27 BC, housing the Roman Proconsul. In the central Agora stood the monumental marble Bema (tribunal), where public magistrates issued binding verdicts.\n\n• Proconsul Lucius Junius Gallio (51–52 AD): Elder brother of Seneca. Hauling Paul before the Bema, accusers alleged illegal worship. Gallio dismissed the case, ruling that Roman law does not arbitrate internal Jewish religious disputes. This historic precedent granted early Christianity de facto imperial protection throughout the empire as a protected religious movement.\n\n• The Claudius Expulsion Edict (49 AD): Claudius's banishment of Jews from Rome drove skilled merchant refugees (including Aquila and Priscilla) directly to the Corinthian Isthmus.\n\n• Dual-Harbor Economy & Diolkos: Controlling Lechaion (facing Rome) and Cenchreae (facing Asia and Egypt), Corinth grew wealthy hauling ships and cargo across the stone Diolkos trackway, concentrating Mediterranean trade, cosmopolitan cultures, and temple cults (Apollo, Aphrodite, Asklepios).\n\n• Archaeological Inscriptions: The Erastus Inscription ('Erastus pro aedilitate s. p. stravit'), the Agora Bema platform, and the 'Synagogue of the Hebrews' (Synagoge Hebraion) lintel confirm the biblical account.",
      eraChronology: "• 44 BC: Julius Caesar re-founds Corinth as a Roman colony (Colonia Laus Iulia Corinthiensis).\n• 27 BC: Augustus organizes Achaia as a senatorial province with Corinth as capital.\n• ~6 BC – 14 AD: Rapid Augustan architectural expansion of Forum, South Stoa, and Lechaion Road.\n• 49 AD: Emperor Claudius expels Jews from Rome; Aquila & Priscilla arrive in Corinth.\n• Autumn 50 AD: Paul arrives from Athens; stays with Aquila and Priscilla; begins Sabbath synagogue preaching.\n• 51 AD: Crispus and his household convert; Paul relocates next door to Titius Justus; vision from the Lord.\n• July 51 – Summer 52 AD: Proconsul Gallio takes office; Paul arraigned at the Bema and acquitted; Sosthenes beaten.\n• Autumn 52 AD: Paul takes a Nazirite vow at Cenchreae; departs for Ephesus with Priscilla and Aquila.\n• 53–55 AD: Apollos ministers powerfully in Corinth.\n• 55–56 AD: Paul writes 1 Corinthians from Ephesus to address factions, immorality, gifts, and the Resurrection.\n• Late 56 AD: Paul writes 2 Corinthians from Macedonia following Titus's report.\n• Winter 57 AD: Paul spends 3 months in Corinth with Gaius (Acts 20:2–3); writes the Epistle to the Romans, sent with Phoebe.\n• 67 AD: Nero breaks ground on the Corinth canal with 6,000 Jewish prisoners.\n• ~96 AD: Clement of Rome sends 1 Clement to restore order in the Corinthian church.",
      epistles: ["1 Corinthians", "2 Corinthians", "Romans"]
    },
    Ephesus: {
      scriptures: [
        v("Acts 19:8-10", "And he went into the synagogue, and spake boldly for the space of three months, disputing and persuading the things concerning the kingdom of God. But when divers were hardened, and believed not... he departed from them, and separated the disciples, disputing daily in the school of one Tyrannus. And this continued by the space of two years; so that all they which dwelt in Asia heard the word of the Lord Jesus, both Jews and Greeks.", nt("acts", "19", "8")),
        v("Acts 19:23-28", "And the same time there arose no small stir about that way. For a certain man named Demetrius, a silversmith, which made silver shrines for Diana, brought no small gain unto the craftsmen; Whom he called together with the workmen of like occupation, and said, Sirs, ye know that by this craft we have our wealth... And when they heard these sayings, they were full of wrath, and cried out, saying, Great is Diana of the Ephesians.", nt("acts", "19", "23")),
        v("Ephesians 2:19-22", "Now therefore ye are no more strangers and foreigners, but fellowcitizens with the saints, and of the household of God; And are built upon the foundation of the apostles and prophets, Jesus Christ himself being the chief corner stone; In whom all the building fitly framed together groweth unto an holy temple in the Lord.", nt("eph", "2", "19")),
        v("Revelation 2:1-5", "Unto the angel of the church of Ephesus write... I know thy works, and thy labour, and thy patience, and how thou canst not bear them which are evil... Remember therefore from whence thou art fallen, and repent, and do the first works.", nt("rev", "2", "1"))
      ],
      peopleAndChurch: "• Paul: Ministered three full years (53–56 AD); lectured daily in the School of Tyrannus.\n\n• Aquila & Priscilla: Planted the church before Paul's arrival and hosted house gatherings (Acts 18:18–19, 26; 1 Cor 16:19).\n\n• Apollos: Learned Alexandrian Jew catechized in Ephesus before his Corinthian mission.\n\n• Timothy: Left as bishop/overseer of Ephesus to confront false doctrine and ordain elders (1 Tim 1:3).\n\n• The Apostle John: Church tradition records John's long ministry and burial at Ephesus following his exile on Patmos.",
      politicalInsights: "• Metropolis of Roman Asia & The Artemision: Ephesus was the wealthiest trading port in the Aegean and the seat of the Roman Proconsul of Asia. It hosted the Temple of Artemis (one of the Seven Wonders of the Ancient World).\n\n• The Great Theater Riot: The civic riot sparked by Demetrius packed the 25,000-seat theater for two hours until calmed by the city recorder (grammateus), who warned of Roman charges of rioting (Acts 19:35–41).",
      eraChronology: "• 52 AD: Paul visits briefly; leaves Priscilla and Aquila.\n• 53–56 AD: Paul's three-year ministry; School of Tyrannus; extraordinary miracles.\n• 57 AD: Paul bids farewell to Ephesian elders at Miletus (Acts 20:17–38).\n• ~62 AD: Paul writes Ephesians from Roman prison.\n• ~65 AD: Timothy oversees the Ephesian church.\n• ~95 AD: John records Christ's letter to Ephesus in Revelation 2.",
      epistles: ["Ephesians", "1 Timothy", "2 Timothy"]
    },
    "Colossae, Laodicea & Hierapolis": {
      scriptures: [
        v("Colossians 1:3-6", "We give thanks to God... praying always for you, Since we heard of your faith in Christ Jesus, and of the love which ye have to all the saints, For the hope which is laid up for you in heaven... Which is come unto you, as it is in all the world; and bringeth forth fruit...", nt("col", "1", "3")),
        v("Colossians 4:12-16", "Epaphras, who is one of you, a servant of Christ, saluteth you, always labouring fervently for you in prayers... For I bear him record, that he hath a great zeal for you, and them that are in Laodicea, and them in Hierapolis... And when this epistle is read among you, cause that it be read also in the church of the Laodiceans.", nt("col", "4", "12")),
        v("Revelation 3:14-19", "And unto the angel of the church of the Laodiceans write... I know thy works, that thou art neither cold nor hot: I would thou wert cold or hot. So then because thou art lukewarm, and neither cold nor hot, I will spue thee out of my mouth.", nt("rev", "3", "14"))
      ],
      peopleAndChurch: "• Epaphras: Founder and native evangelist of the Lycus Valley churches who visited Paul in Rome.\n\n• Philemon & Apphia: Wealthy Colossian house church leaders and owners of Onesimus.\n\n• Onesimus: Runaway slave converted by Paul in Rome, sent back as a 'brother beloved' (Philem 1:16).\n\n• Archippus: Minister urged to fulfill his calling in the Lord (Col 4:17).",
      politicalInsights: "• The Lycus River Tri-Cities: Famous for black glossy wool, banking, and medical eye salves (collyrium). Laodicea was so prosperous that after the catastrophic earthquake of 60 AD, it rebuilt entirely out of its own civic treasury, refusing imperial Roman relief funds.",
      eraChronology: "• ~53–55 AD: Epaphras plants churches while Paul teaches at Ephesus.\n• ~60 AD: Severe Lycus Valley earthquake.\n• ~62 AD: Paul writes Colossians and Philemon from Roman imprisonment.\n• ~95 AD: John writes to the church at Laodicea (Rev 3).",
      epistles: ["Colossians", "Philemon"]
    },
    Rome: {
      scriptures: [
        v("Romans 1:7-16", "To all that be in Rome, beloved of God, called to be saints: Grace to you and peace from God our Father, and the Lord Jesus Christ. First, I thank my God through Jesus Christ for you all, that your faith is spoken of throughout the whole world... For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth; to the Jew first, and also to the Greek.", nt("rom", "1", "7")),
        v("Romans 8:35-39", "Who shall separate us from the love of Christ? shall tribulation, or distress, or persecution, or famine, or nakedness, or peril, or sword?... For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.", nt("rom", "8", "35")),
        v("Acts 28:16-24", "And when we came to Rome, the centurion delivered the prisoners to the captain of the guard: but Paul was suffered to dwell by himself with a soldier that kept him. And it came to pass, that after three days Paul called the chief of the Jews together... And some believed the things which were spoken, and some believed not.", nt("acts", "28", "16")),
        v("Acts 28:30-31", "And Paul dwelt two whole years in his own hired house, and received all that came in unto him, Preaching the kingdom of God, and teaching those things which concern the Lord Jesus Christ, with all confidence, no man forbidding him.", nt("acts", "28", "30"))
      ],
      peopleAndChurch: "• Aquila & Priscilla: Returned to Rome following Claudius's death; hosted a vibrant house church in their home (Rom 16:3–5).\n\n• The Saints of Caesar's Household: Imperial servants, freedmen, and praetorian guards won to the faith during Paul's custody (Phil 1:13; 4:22).\n\n• The Twenty-Six Saints of Romans 16: Including Andronicus and Junia ('of note among the apostles'), Rufus and his mother, Amplias, Urbanus, and Narcissus.\n\n• The Apostles Peter and Paul: According to 1st-century church testimony (Clement of Rome, Ignatius, Irenaeus), both apostles labored and suffered martyrdom in Rome under Nero.",
      politicalInsights: "• Imperial Capital of the World: Center of Mediterranean governance, law, and military legions. Rome's 50,000 miles of paved roads and naval routes facilitated rapid apostolic transit and communication.\n\n• The Great Fire & Neronian Persecution (64 AD): Nero blamed the catastrophic fire on Christians, initiating savage executions in the Circus Vaticanus and imperial gardens, establishing the first state-sponsored persecution.",
      eraChronology: "• 30 AD: Roman pilgrims hear Peter at Pentecost (Acts 2:10) and carry the faith to Rome.\n• 49 AD: Claudius expels Jews and Jewish Christians over 'Chrestus' unrest.\n• ~57 AD: Paul writes Romans from Corinth.\n• 60–62 AD: Paul's first Roman custody in his hired quarters; prison epistles written.\n• 64 AD: Great Fire of Rome; Nero's persecution begins.\n• 64–67 AD: Martyrdoms of Peter and Paul under Nero.\n• ~96 AD: Clement of Rome pens 1 Clement.",
      epistles: ["Romans", "Ephesians", "Philippians", "Colossians", "Philemon", "2 Timothy"]
    },
    "Seven Churches of Asia (Smyrna, Pergamum, Thyatira, Sardis, Philadelphia)": {
      scriptures: [
        v("Revelation 1:10-11", "I was in the Spirit on the Lord's day, and heard behind me a great voice, as of a trumpet, Saying, I am Alpha and Omega, the first and the last: and, What thou seest, write in a book, and send it unto the seven churches which are in Asia; unto Ephesus, and unto Smyrna, and unto Pergamos, and unto Thyatira, and unto Sardis, and unto Philadelphia, and unto Laodicea.", nt("rev", "1", "10")),
        v("Revelation 2:8-10", "And unto the angel of the church in Smyrna write... Fear none of those things which thou shalt suffer: behold, the devil shall cast some of you into prison, that ye may be tried... be thou faithful unto death, and I will give thee a crown of life.", nt("rev", "2", "8")),
        v("Revelation 2:12-13", "And to the angel of the church in Pergamos write... I know thy works, and where thou dwellest, even where Satan's seat is: and thou holdest fast my name, and hast not denied my faith, even in those days wherein Antipas was my faithful martyr, who was slain among you...", nt("rev", "2", "12"))
      ],
      peopleAndChurch: "• The Apostle John: Exiled to the Isle of Patmos 'for the word of God, and for the testimony of Jesus Christ' (Rev 1:9); spiritual shepherd to the Asian churches.\n\n• Antipas of Pergamum: Honored by Christ as 'my faithful martyr,' slain where 'Satan's seat is' (Rev 2:13).\n\n• Polycarp of Smyrna: Disciple of John who later served as bishop of Smyrna and was martyred in 155 AD.",
      politicalInsights: "• Centers of the Imperial Cult & Provincial Temples: Pergamum and Smyrna were premier centers of emperor worship (Sebastoi), requiring civic citizens to offer incense to Caesar's statue. Christian refusal led to economic boycotts, disenfranchisement, and execution.",
      eraChronology: "• Mid-1st Century: Congregations planted through the Ephesian missionary expansion (Acts 19:10).\n• 81–96 AD: Reign of Domitian; heightened imperial cult enforcement.\n• ~95 AD: John receives the Apocalypse on Patmos and circulates the prophetic letters.",
      epistles: ["Revelation"]
    }
  };

  const DIASPORA_DOSSIERS = {
    "diaspora-alexandria": {
      scriptures: [
        v("Acts 18:24-28", "And a certain Jew named Apollos, born at Alexandria, an eloquent man, and mighty in the scriptures, came to Ephesus. This man was instructed in the way of the Lord; and being fervent in the spirit, he spake and taught diligently the things of the Lord... For he mightily convinced the Jews, and that publickly, shewing by the scriptures that Jesus was Christ.", nt("acts", "18", "24")),
        v("Acts 2:10", "Phrygia, and Pamphylia, in Egypt, and in the parts of Libya about Cyrene, and strangers of Rome, Jews and proselytes.", nt("acts", "2", "10")),
        v("Acts 6:9", "Then there arose certain of the synagogue, which is called the synagogue of the Libertines, and Cyrenians, and Alexandrians, and of them of Cilicia and of Asia, disputing with Stephen.", nt("acts", "6", "9"))
      ],
      peopleAndChurch: "• Apollos: Brilliant Alexandrian scholar whose profound mastery of Hebrew scriptures and fiery rhetoric energized early congregations in Ephesus and Corinth (Acts 18:24–28; 1 Cor 3:6).\n\n• Philo Judaeus (Philo of Alexandria): Prominent 1st-century Jewish philosopher who harmonized the Torah with Greek philosophy and led diplomatic embassies to Caligula.\n\n• Pentecost Pilgrims: Egyptian Jewish pilgrims present in Jerusalem who carried the Gospel back to the Nile Delta.\n\n• Mark the Evangelist: Ancient church tradition (Eusebius) records Mark founding the Alexandrian Christian catechetical school.",
      politicalInsights: "• Metropolis of Egypt & The Delta Quarter: The second city of the Roman Empire, Alexandria housed over 150,000 Jews occupying two of five civic quarters (Delta and Beta). Governed by an ethnarch and council under the direct Roman equestrian Prefect of Egypt.\n\n• Civic Conflicts: Tensions erupted between Greeks and Jews under Caligula (38 AD), prompting imperial decrees from Claudius confirming Jewish religious autonomy.",
      eraChronology: "• ~280–150 BC: Translation of the Hebrew Tanakh into the Greek Septuagint (LXX) at Alexandria.\n• 30 AD: Alexandrian pilgrims hear Peter at Pentecost.\n• ~40 AD: Philo leads delegation to Rome before Caligula.\n• 52 AD: Apollos begins apostolic teaching in Ephesus and Corinth.\n• ~62 AD: Mark ministers in Alexandria according to early tradition."
    },
    "diaspora-antioch": {
      scriptures: [
        v("Acts 11:19-26", "Now they which were scattered abroad upon the persecution that arose about Stephen travelled as far as Phenice, and Cyprus, and Antioch, preaching the word to none but unto the Jews only. And some of them were men of Cyprus and Cyrene, which, when they were come to Antioch, spake unto the Grecians, preaching the Lord Jesus. And the hand of the Lord was with them: and a great number believed, and turned unto the Lord... And the disciples were called Christians first in Antioch.", nt("acts", "11", "19")),
        v("Acts 13:1-3", "Now there were in the church that was at Antioch certain prophets and teachers; as Barnabas, and Simeon that was called Niger, and Lucius of Cyrene, and Manaen, which had been brought up with Herod the tetrarch, and Saul. As they ministered to the Lord, and fasted, the Holy Ghost said, Separate me Barnabas and Saul for the work whereunto I have called them.", nt("acts", "13", "1")),
        v("Galatians 2:11-14", "But when Peter was come to Antioch, I withstood him to the face, because he was to be blamed. For before that certain came from James, he did eat with the Gentiles: but when they were come, he withdrew and separated himself, fearing them which were of the circumcision.", nt("gal", "2", "11"))
      ],
      peopleAndChurch: "• Barnabas & Saul (Paul): Taught for a full year in Antioch, establishing the primary missionary hub of early Christianity.\n\n• Disciples of Cyprus & Cyrene: First to cross ethnic barriers by proclaiming Jesus directly to Greek Gentiles (Acts 11:20).\n\n• Simeon Niger, Lucius & Manaen: Multi-ethnic leadership council reflecting Antioch's diverse, cosmopolitan congregation.\n\n• Peter: Visited Antioch where Paul defended table fellowship between Jewish and Gentile believers (Gal 2:11–14).",
      politicalInsights: "• Third City of the Roman Empire: Capital of the imperial province of Syria, housing the Roman Legate and four military legions. Antioch possessed full citizen charters and extensive synagogue legal privileges dating back to Seleucus I.",
      eraChronology: "• 300 BC: Founded by Seleucus I Nicator.\n• ~35 AD: Hellenistic disciples flee persecution to Antioch; Gentile conversion harvest.\n• ~40–44 AD: Disciples first called Christians; famine relief dispatched to Jerusalem.\n• 47 AD: Barnabas and Saul commissioned on First Missionary Journey.\n• ~107 AD: Ignatius, bishop of Antioch, writes his letters en route to martyrdom in Rome."
    },
    "diaspora-rome": {
      scriptures: [
        v("Acts 18:2", "And found a certain Jew named Aquila, born in Pontus, lately come from Italy, with his wife Priscilla; (because that Claudius had commanded all Jews to depart from Rome:) and came unto them.", nt("acts", "18", "2")),
        v("Acts 28:17-24", "And it came to pass, that after three days Paul called the chief of the Jews together: and when they were come together, he said unto them, Men and brethren, though I have committed nothing against the people, or customs of our fathers, yet was I delivered prisoner from Jerusalem into the hands of the Romans... And some believed the things which were spoken, and some believed not.", nt("acts", "28", "17")),
        v("Acts 28:30-31", "And Paul dwelt two whole years in his own hired house, and received all that came in unto him, Preaching the kingdom of God, and teaching those things which concern the Lord Jesus Christ, with all confidence, no man forbidding him.", nt("acts", "28", "30")),
        v("Romans 16:3-5", "Greet Priscilla and Aquila my helpers in Christ Jesus: Who have for my life laid down their own necks: unto whom not only I give thanks, but also all the churches of the Gentiles. Likewise greet the church that is in their house.", nt("rom", "16", "3"))
      ],
      peopleAndChurch: "• Aquila & Priscilla: Exiled from Rome under Claudius (49 AD), returned after 54 AD to host a house congregation (Rom 16:3–5).\n\n• Chief Jewish Leaders of Rome: Summoned by Paul to his hired house; engaged in daylong scriptural dialogue concerning the Hope of Israel (Acts 28:17–23).\n\n• Roman Synagogue Communities: At least 11 distinct synagogues recorded archaeologically (including the Synagogue of the Augustenses, Agrippenses, and Hebrews).\n\n• Christian Disciples along the Appian Way: Believers who traveled 40 miles to Appii Forum and Three Taverns to welcome Paul.",
      politicalInsights: "• Claudius's Edict of Expulsion (49 AD): Roman historian Suetonius records that Claudius expelled the Jews because they 'constantly made disturbances at the instigation of Chrestus' (likely disputes over Jesus as Christ).\n\n• Imperial Legal Framework: Under Augustus and Tiberius, Roman Jews enjoyed protected religious status (collegia licita), exemptions from Sabbath court appearances, and rights to transmit the temple tax to Jerusalem.",
      eraChronology: "• 160 BC: First diplomatic treaties between Judas Maccabeus and the Roman Senate.\n• 63 BC: Pompey brings Jewish captives to Rome, founding the Trastevere community.\n• 49 AD: Claudius expels Jewish leaders from Rome.\n• 54 AD: Claudius dies; edict lapses; Jewish Christians return.\n• 60–62 AD: Paul's two-year custody in Rome.\n• 64 AD: Great Fire of Rome and Nero's persecutions."
    },
    "diaspora-babylon": {
      scriptures: [
        v("Acts 2:9", "Parthians, and Medes, and Elamites, and the dwellers in Mesopotamia, and in Judaea, and Cappadocia, in Pontus, and Asia.", nt("acts", "2", "9")),
        v("1 Peter 5:13", "The church that is at Babylon, elected together with you, saluteth you; and so doth Marcus my son.", nt("1-pet", "5", "13"))
      ],
      peopleAndChurch: "• The Oldest Diaspora Population: Tens of thousands of Jews remained in Mesopotamia after the Babylonian Exile, maintaining ancient academies at Nehardea and Nisibis.\n\n• Pentecost Pilgrims: Mesopotamian and Parthian Jews who journeyed 800 miles to Jerusalem and heard Peter preach in their own languages.\n\n• Peter & Mark: Peter addressed his epistle with greetings from 'the church that is at Babylon' (1 Peter 5:13).",
      politicalInsights: "• Beyond the Roman Frontier in the Parthian Empire: Living outside Roman jurisdiction under the Arsacids, Mesopotamian Jews enjoyed internal autonomy under an Exilarch (Resh Galuta), sending annual gold caravans to the Jerusalem Temple.",
      eraChronology: "• 586 BC: Babylonian Exile under Nebuchadnezzar.\n• 30 AD: Pilgrims from Mesopotamia attend Pentecost in Jerusalem.\n• ~64 AD: Peter's first epistle includes greetings from the congregation in Babylon."
    },
    "diaspora-cyrene": {
      scriptures: [
        v("Luke 23:26", "And as they led him away, they laid hold upon one Simon, a Cyrenian, coming out of the country, and on him they laid the cross, that he might bear it after Jesus.", nt("luke", "23", "26")),
        v("Acts 11:20", "And some of them were men of Cyprus and Cyrene, which, when they were come to Antioch, spake unto the Grecians, preaching the Lord Jesus.", nt("acts", "11", "20")),
        v("Acts 13:1", "Now there were in the church that was at Antioch certain prophets and teachers; as Barnabas, and Simeon that was called Niger, and Lucius of Cyrene...", nt("acts", "13", "1"))
      ],
      peopleAndChurch: "• Simon of Cyrene: Compelled by Roman legionaries to carry the cross of Jesus (Luke 23:26); father of Alexander and Rufus (Mark 15:21; Rom 16:13).\n\n• Cyrenian Evangelists: Pioneering Jewish disciples who crossed the ethnic barrier at Antioch to preach to Greeks (Acts 11:20).\n\n• Lucius of Cyrene: Teacher and prophet in the founding council of the Antioch church (Acts 13:1).",
      politicalInsights: "• Libyan Hellenistic Settlement: Located in North Africa (modern Libya), Strabo noted that the civic population of Cyrene was divided into four distinct orders, one of which was the Jewish community, possessing chartered civic rights under Ptolemaic and Roman rulers.",
      eraChronology: "• ~300 BC: Ptolemy I settles thousands of Jews in Cyrenaica.\n• Spring 30 AD: Simon of Cyrene carries Christ's cross in Jerusalem.\n• ~35 AD: Disciples from Cyrene found the Antioch Gentile mission.\n• 115–117 AD: Cyrene becomes the epicenter of the Diaspora Kitos War."
    },
    "diaspora-damascus": {
      scriptures: [
        v("Acts 9:1-2", "And Saul, yet breathing out threatenings and slaughter against the disciples of the Lord, went unto the high priest, And desired of him letters to Damascus to the synagogues, that if he found any of this way, whether they were men or women, he might bring them bound unto Jerusalem.", nt("acts", "9", "1")),
        v("Acts 9:10-12", "And there was a certain disciple at Damascus, named Ananias; and to him said the Lord in a vision, Ananias. And he said, Behold, I am here, Lord. And the Lord said unto him, Arise, and go into the street which is called Straight, and enquire in the house of Judas for one called Saul, of Tarsus: for, behold, he prayeth.", nt("acts", "9", "10")),
        v("2 Corinthians 11:32-33", "In Damascus the governor under Aretas the king kept the city of the Damascenes with a garrison, desirous to apprehend me: And through a window in a basket was I let down by the wall, and escaped his hands.", nt("2-cor", "11", "32"))
      ],
      peopleAndChurch: "• Ananias: Holy disciple who received the heavenly vision to lay hands on the blinded Saul, restoring his sight and baptizing him.\n\n• Saul of Tarsus: Converted on the Damascus Road; immediately preached Christ in the synagogues of Damascus (Acts 9:20).\n\n• Judas of the Street Called Straight: Disciple who hosted the blind, praying Saul.\n\n• Damascus Disciples: Aided Paul's midnight escape in a basket through an aperture in the city wall.",
      politicalInsights: "• High Priestly Extradition & Nabataean Influence: The Jerusalem Sanhedrin exercised recognized religious jurisdiction to extradite Jewish offenders across provincial borders. During Paul's escape, Damascus was under the civil authority of King Aretas IV of Nabatea.",
      eraChronology: "• Ancient Era: Ancient oasis city along the King's Highway.\n• ~34 AD: Saul's Damascus road conversion and baptism.\n• ~37 AD: Paul escapes Damascus in a basket and journeys to Arabia."
    },
    "diaspora-sardis": {
      scriptures: [
        v("Revelation 3:1-4", "And unto the angel of the church in Sardis write; These things saith he that hath the seven Spirits of God, and the seven stars; I know thy works, that thou hast a name that thou livest, and art dead... Thou hast a few names even in Sardis which have not defiled their garments; and they shall walk with me in white: for they are worthy.", nt("rev", "3", "1")),
        v("Obadiah 1:20", "And the captivity of this host of the children of Israel shall possess that of the Canaanites, even unto Zarephath; and the captivity of Jerusalem, which is in Sepharad, shall possess the cities of the south.", nt("obad", "1", "20"))
      ],
      peopleAndChurch: "• The Saints of Sardis: Addressed in Revelation 3; warned against spiritual complacency while commended for the few who remained undefiled.\n\n• A Monumental Jewish Community: Ancient Sepharad (Obadiah 1:20) possessed an exceptionally wealthy and prominent Jewish settlement.",
      politicalInsights: "• Civic Integration in Roman Lydia: Antiquities unearthed at Sardis reveal the largest excavated synagogue in the ancient world, directly adjoining the Roman public bath-gymnasium complex, demonstrating unprecedented civic standing and royal decrees dating from Antiochus III.",
      eraChronology: "• ~500 BC: Persian-era Jewish settlement in Sepharad (Sardis).\n• 17 AD: Devastating earthquake; rebuilt with massive imperial aid from Tiberius.\n• ~95 AD: John pens the apocalyptic letter to the church at Sardis."
    },
    "diaspora-corinth": {
      scriptures: [
        v("Acts 18:1-4", "After these things Paul departed from Athens, and came to Corinth; And found a certain Jew named Aquila, born in Pontus, lately come from Italy, with his wife Priscilla; (because that Claudius had commanded all Jews to depart from Rome:) and came unto them. And because he was of the same craft, he abode with them, and wrought: for by their occupation they were tentmakers. And he reasoned in the synagogue every sabbath, and persuaded the Jews and the Greeks.", nt("acts", "18", "1")),
        v("Acts 18:4-8", "And he reasoned in the synagogue every sabbath, and persuaded the Jews and the Greeks. And when Silas and Timotheus were come from Macedonia, Paul was pressed in the spirit, and testified to the Jews that Jesus was Christ... And he departed thence, and entered into a certain man's house, named Justus, one that worshipped God, whose house joined hard to the synagogue. And Crispus, the chief ruler of the synagogue, believed on the Lord with all his house; and many of the Corinthians hearing believed, and were baptized.", nt("acts", "18", "4")),
        v("Acts 18:9-11", "Then spake the Lord to Paul in the night by a vision, Be not afraid, but speak, and hold not thy peace: For I am with thee, and no man shall set on thee to hurt thee: for I have much people in this city. And he continued there a year and six months, teaching the word of God among them.", nt("acts", "18", "9")),
        v("Acts 18:12-17", "And when Gallio was the deputy of Achaia, the Jews made insurrection with one accord against Paul, and brought him to the judgment seat, Saying, This fellow persuadeth men to worship God contrary to the law... Gallio said unto the Jews, If it be a question of words and names, and of your law, look ye to it; for I will be no judge of such matters... Then all the Greeks took Sosthenes, the chief ruler of the synagogue, and beat him before the judgment seat. And Gallio cared for none of those things.", nt("acts", "18", "12")),
        v("1 Corinthians 1:1-3", "Paul, called to be an apostle of Jesus Christ through the will of God, and Sosthenes our brother, Unto the church of God which is at Corinth, to them that are sanctified in Christ Jesus, called to be saints, with all that in every place call upon the name of Jesus Christ our Lord, both their's and our's: Grace be unto you, and peace, from God our Father, and from the Lord Jesus Christ.", nt("1-cor", "1", "1")),
        v("1 Corinthians 1:14-17", "I thank God that I baptized none of you, but Crispus and Gaius; Lest any should say that I had baptized in mine own name. And I baptized also the household of Stephanas: besides, I know not whether I baptized any other. For Christ sent me not to baptize, but to preach the gospel: not with wisdom of words, lest the cross of Christ should be made of none effect.", nt("1-cor", "1", "14")),
        v("1 Corinthians 9:24-27", "Know ye not that they which run in a race run all, but one receiveth the prize? So run, that ye may obtain. And every man that striveth for the mastery is temperate in all things. Now they do it to obtain a corruptible crown; but we an incorruptible.", nt("1-cor", "9", "24")),
        v("1 Corinthians 13:1-8", "Though I speak with the tongues of men and of angels, and have not charity, I am become as sounding brass, or a tinkling cymbal... Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up... Charity never faileth.", nt("1-cor", "13", "1")),
        v("1 Corinthians 15:20-22", "But now is Christ risen from the dead, and become the firstfruits of them that slept. For since by man came death, by man came also the resurrection of the dead. For as in Adam all die, even so in Christ shall all be made alive.", nt("1-cor", "15", "20")),
        v("Romans 16:1-2", "I commend unto you Phebe our sister, which is a servant of the church which is at Cenchrea: That ye receive her in the Lord, as becometh saints, and that ye assist her in whatsoever business she hath need of you: for she hath been a succourer of many, and of myself also.", nt("rom", "16", "1")),
        v("Romans 16:21-23", "Timotheus my workfellow, and Lucius, and Jason, and Sosipater, my kinsmen, salute you. I Tertius, who wrote this epistle, salute you in the Lord. Gaius mine host, and of the whole church, saluteth you. Erastus the chamberlain of the city saluteth you, and Quartus a brother.", nt("rom", "16", "21"))
      ],
      peopleAndChurch: "• Synagogue Leadership & Converts: Crispus served as chief ruler of the synagogue (archisynagogos) before converting with his entire household and being baptized by Paul; Sosthenes succeeded him, was beaten before Gallio, and subsequently converted to become Paul's trusted co-worker and co-sender of 1 Corinthians (Acts 18:8, 17; 1 Cor 1:1).\n\n• Aquila & Priscilla: Jewish leatherworkers expelled from Rome under Claudius (49 AD); they hosted Paul, labored with him in tentmaking, led house assemblies, and catechized Apollos (Acts 18:2–3, 26).\n\n• Titius (Titus) Justus: A devout Gentile God-fearer whose home adjoined the synagogue wall; became Paul's teaching center when synagogue leadership blasphemed the gospel (Acts 18:7).\n\n• Gaius & Erastus: Gaius hosted Paul and the whole Corinthian church (Rom 16:23; 1 Cor 1:14), while Erastus served as city treasurer / commissioner of public works (oikonomos / aedile), attested by the excavated Erastus Pavement.\n\n• Stephanas, Fortunatus & Achaicus: The 'firstfruits of Achaia'; devoted ministers who crossed the Aegean to visit Paul in Ephesus (1 Cor 16:15–17).\n\n• Chloe's Household: Corinthian believers who traveled to Ephesus to inform Paul of sectarian factions fragmenting the church (1 Cor 1:11).\n\n• Apollos of Alexandria: Eloquent scholar who watered what Paul planted in Corinth (Acts 18:27–28; 1 Cor 3:6).\n\n• Phoebe of Cenchreae: Deaconess and patroness of the eastern port congregation, entrusted with delivering Paul's Epistle to the Romans (Rom 16:1–2).\n\n• Tertius & Quartus: Tertius, Paul's scribe who inscribed Romans from Corinth, and Quartus, a Corinthian brother (Rom 16:22–23).",
      politicalInsights: "• Jewish Diaspora Standing & Collegia Licita: Under Roman law, Jewish communities were recognized as licit associations (collegia licita), protecting their right to assemble on the Sabbath, collect the temple tax, and adjudicate internal religious matters.\n\n• Proconsul Gallio's Landmark Bema Ruling (51–52 AD): Hauling Paul before the Bema (the elevated judgment seat in the central Agora), accusers alleged illegal worship. Proconsul Lucius Junius Gallio (brother of Seneca) issued a historic legal precedent: he ruled that Roman provincial authorities would not adjudicate internal Jewish doctrinal or textual debates ('words and names and your law'). This established de facto imperial toleration, shielding Christian preaching under Judaism's legal umbrella throughout the empire.\n\n• Re-founded Roman Colony (44 BC): Julius Caesar refounded the destroyed city as Colonia Laus Iulia Corinthiensis, settling it with Roman freedmen, veterans, and merchants. Latin was the language of law, and Roman legal charters governed commerce and citizenship, giving freedmen and Jewish merchants remarkable social and economic mobility.\n\n• The Dual-Port Mercantile Isthmus: Positioned between Lechaion (Gulf of Corinth) and Cenchreae (Saronic Gulf), Jewish merchants played key roles in Mediterranean trade, transport, and banking, utilizing the stone Diolkos trackway to ferry goods between Italy, Greece, Asia, and Egypt.\n\n• Archaeological Evidence: The 'Synagogue of the Hebrews' (Synagoge Hebraion) marble lintel found near the Lechaion Road, the monumental Bema platform in the Agora, and the Erastus Inscription confirm the vibrant interplay of Jewish, Greek, and Roman life described in Acts 18.",
      eraChronology: "• 44 BC: Julius Caesar re-founds Corinth as a Roman colony (Colonia Laus Iulia Corinthiensis).\n• 27 BC: Augustus organizes Achaia as a senatorial province with Corinth as its capital.\n• ~6 BC – 14 AD: Rapid Augustan expansion of the Forum, South Stoa, and Lechaion Road.\n• 49 AD: Emperor Claudius expels Jews from Rome; Aquila and Priscilla migrate to Corinth.\n• Autumn 50 AD: Paul arrives in Corinth; stays with Aquila and Priscilla; reasons in the synagogue every Sabbath.\n• 51 AD: Crispus and his household convert; Paul relocates next door to Titius Justus; receives vision from the Lord promising protection.\n• July 51 – Summer 52 AD: Lucius Junius Gallio serves as Proconsul of Achaia; dismisses charges against Paul at the Bema; Sosthenes beaten.\n• Autumn 52 AD: Paul concludes 18 months of ministry; departs for Ephesus with Priscilla and Aquila via Cenchreae.\n• 53–55 AD: Apollos arrives in Corinth and strengthens the disciples through public debate.\n• 55–56 AD: Paul writes 1 Corinthians from Ephesus to address factions, lawsuits, gifts, and the Resurrection.\n• Late 56 AD: Paul writes 2 Corinthians from Macedonia following Titus's report.\n• Winter 57 AD: Paul spends 3 months in Corinth (Acts 20:2–3), lodging with Gaius, where he writes the Epistle to the Romans.\n• 67 AD: Nero breaks ground on the Corinthian canal with 6,000 Jewish prisoners.\n• ~96 AD: Clement of Rome sends 1 Clement to restore order in the Corinthian church.",
      epistles: ["1 Corinthians", "2 Corinthians", "Romans"]
    },
    "diaspora-ephesus": {
      scriptures: [
        v("Acts 18:19-21", "And he came to Ephesus, and left them there: but he himself entered into the synagogue, and reasoned with the Jews. When they desired him to tarry longer time with them, he consented not; But bade them farewell, saying, I must by all means keep this feast that cometh in Jerusalem: but I will return again unto you, if God will.", nt("acts", "18", "19")),
        v("Acts 19:8-10", "And he went into the synagogue, and spake boldly for the space of three months, disputing and persuading the things concerning the kingdom of God. But when divers were hardened, and believed not, but spake evil of that way before the multitude, he departed from them, and separated the disciples, disputing daily in the school of one Tyrannus. And this continued by the space of two years; so that all they which dwelt in Asia heard the word of the Lord Jesus, both Jews and Greeks.", nt("acts", "19", "8")),
        v("Acts 19:17-20", "And this was known to all the Jews and Greeks also dwelling at Ephesus; and fear fell on them all, and the name of the Lord Jesus was magnified... Many of them also which used curious arts brought their books together, and burned them before all men... So mightily grew the word of God and prevailed.", nt("acts", "19", "17"))
      ],
      peopleAndChurch: "• Asian Jewish Community: Granted exemptions from military conscription and Sabbath legal immunity by Roman decrees (Josephus, Ant. 14.10).\n\n• Aquila & Priscilla: Maintained a synagogue and house-church presence in Ephesus, mentoring Apollos and preparing the way for Paul (Acts 18:19, 26).\n\n• Sceva's Seven Sons: Jewish chief priest family whose itinerant exorcisms were dramatically overcome by an evil spirit (Acts 19:13–16).\n\n• Disciples of John: Twelve men who received John's baptism and were baptized in Jesus's name and filled with the Holy Ghost through Paul (Acts 19:1–7).",
      politicalInsights: "• Roman Protections in the Shadow of Artemis: Ephesus was the chief city of Roman Asia. Synagogue worship was legally shielded by Roman senatorial decrees despite fierce civic and commercial hostility from silversmith guilds producing idols of Artemis.",
      eraChronology: "• Hellenistic Period: Jewish settlement established under Antiochus II Theos.\n• 52 AD: Paul's initial synagogue visit.\n• 53–56 AD: Three-month synagogue preaching followed by two years in the Lecture Hall of Tyrannus.\n• ~95 AD: John ministers among Asian churches from Patmos."
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
    ["overview", "peopleAndChurch", "politicalInsights", "eraChronology", "summary", "teachings", "epistles"].forEach((key) => {
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
