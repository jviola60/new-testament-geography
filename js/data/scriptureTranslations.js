/**
 * Scripture Translations Engine
 * Provides multi-version translations for New Testament passages:
 * - KJV (King James Version - Default)
 * - NIV (New International Version • 7th/8th Grade Easy-to-Read Modern English)
 * - JST (Joseph Smith Translation • The Church of Jesus Christ of Latter-day Saints Edition)
 * - Greek (Koine Greek / Textus Receptus)
 */

const SCRIPTURE_TRANSLATIONS = {
  db: {
    // --- FOUNDATIONAL & WELCOME VERSES ---
    "John 1:1": {
      kjv: "In the beginning was the Word, and the Word was with God, and the Word was God.",
      niv: "In the beginning was the Word, and the Word was with God, and the Word was God.",
      greek: "Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος.",
      jst: "In the beginning was the gospel preached unto the Son, and the gospel was the word, and the word was with the Son, and the Son was with God, and the Son was of God."
    },
    "John 1:1, 14": {
      kjv: "In the beginning was the Word, and the Word was with God, and the Word was God... And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.",
      niv: "In the beginning was the Word, and the Word was with God, and the Word was God... The Word became human and made his home among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.",
      greek: "Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος... Καὶ ὁ λόγος σὰρξ ἐγένετο καὶ ἐσκήνωσεν ἐν ἡμῖν, καὶ ἐθεασάμεθα τὴν δόξαν αὐτοῦ, δόξαν ὡς μονογενοῦς παρὰ πατρός, πλήρης χάριτος καὶ ἀληθείας.",
      jst: "In the beginning was the gospel preached unto the Son, and the gospel was the word, and the word was with the Son, and the Son was with God, and the Son was of God... And the same word was made flesh, and dwelt among us, and we beheld his glory, the glory as of the Only Begotten of the Father, full of grace and truth."
    },
    "John 3:16": {
      kjv: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      niv: "For God so loved the world that he gave his one and only Son, so that everyone who believes in him will not die but have eternal life.",
      greek: "Οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον, ὥστε τὸν υἱὸν τὸν μονογενῆ ἔδωκεν, ἵνα πᾶς ὁ πιστεύων εἰς αὐτὸν μὴ ἀπόληται ἀλλ᾽ ἔχῃ ζωὴν αἰώνιον.",
      jst: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth on him should not perish, but have everlasting life."
    },
    "Luke 2:10-11": {
      kjv: "And the angel said unto them, Fear not: for, behold, I bring you good tidings of great joy, which shall be to all people. For unto you is born this day in the city of David a Saviour, which is Christ the Lord.",
      niv: "The angel said to them, 'Do not be afraid. I bring you good news that will bring great joy to all people. Today in David's town a Savior has been born for you; he is the Messiah, the Lord!'",
      greek: "Καὶ εἶπεν αὐτοῖς ὁ ἄγγελος, Μὴ φοβεῖσθε· ἰδοὺ γάρ, εὐαγγελίζομαι ὑμῖν χαρὰν μεγάλην, ἥτις ἔσται παντὶ τῷ λαῷ, ὅτι ἐτέχθη ὑμῖν σήμερον σωτήρ, ὅς ἐστιν Χριστὸς κύριος, ἐν πόλει Δαυίδ.",
      jst: "And the angel said unto them, Fear not: for, behold, I bring you good tidings of great joy, which shall be to all people. For unto you is born this day in the city of David a Saviour, which is Christ the Lord."
    },
    "Matthew 28:19-20": {
      kjv: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.",
      niv: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And remember: I am with you always, to the very end of the age.",
      greek: "Πορευθέντες οὖν μαθητεύσατε πάντα τὰ ἔθνη, βαπτίזοντες αὐτοὺς εἰς τὸ ὄνομα τοῦ πατρὸς καὶ τοῦ υἱοῦ καὶ τοῦ ἁγίου πνεύματος...",
      jst: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen."
    },
    "Acts 1:8": {
      kjv: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.",
      niv: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.",
      greek: "Ἀλλὰ λήμψεσθε δύναμιν ἐπελθόντος τοῦ ἁγίου πνεύματος ἐφ᾽ ὑμᾶς, καὶ ἔσεσθέ μου μάρτυρες...",
      jst: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth."
    },
    "2 Timothy 3:16-17": {
      kjv: "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of God may be perfect, thoroughly furnished unto all good works.",
      niv: "All Scripture is inspired by God and is useful for teaching, helping, correcting, and training us to do what is right, so that God's people may be completely prepared to do every good work.",
      greek: "Πᾶσα γραφὴ θεόπνευστος καὶ ὠφέλιμος πρὸς διδασκαλίαν...",
      jst: "And all scripture given by inspiration of God, is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of God may be perfect, thoroughly furnished unto all good works."
    },

    // --- SECOND TEMPLE & JERUSALEM LANDMARKS ---
    "Matthew 24:1-2": {
      kjv: "And Jesus went out, and departed from the temple: and his disciples came to him for to shew him the buildings of the temple. And Jesus said unto them, See ye not all these things? verily I say unto you, There shall not be left here one stone upon another, that shall not be thrown down.",
      niv: "Jesus left the temple and was walking away when his disciples came up to him to point out the temple buildings. 'Do you see all these buildings?' he asked. 'Truly I tell you, not one stone here will be left on top of another; every single one will be thrown down.'",
      greek: "Καὶ ἐξελθὼν ὁ Ἰησοῦς ἀπὸ τοῦ ἱεροῦ ἐπορεύετο, καὶ προσῆλθον οἱ μαθηταὶ αὐτοῦ ἐπιδεῖξαι αὐτῷ τὰς οἰκοδομὰς τοῦ ἱεροῦ...",
      jst: "And Jesus went out, and departed from the temple: and his disciples came to him, for to hear him, saying: Master, show us concerning the buildings of the temple, as thou hast said—They shall be thrown down, and left unto you desolate. And Jesus said unto them: See ye not all these things, and do ye not understand them? Verily I say unto you, There shall not be left here, upon this temple, one stone upon another that shall not be thrown down."
    },
    "Luke 2:46-49": {
      kjv: "After three days they found him in the temple, sitting in the midst of the doctors, both hearing them, and asking them questions... And he said unto them, How is it that ye sought me? wist ye not that I must be about my Father's business?",
      niv: "After three days they found him in the temple courts, sitting among the teachers, listening to them and asking questions... 'Why were you searching for me?' he asked. 'Didn't you know I had to be in my Father's house?'",
      greek: "Καὶ ἐγένετο μετὰ ἡμέρας τρεῖς εὗρον αὐτὸν ἐν τῷ ἱερῷ καθεζόμενον ἐν μέσῳ τῶν διδασκάλων...",
      jst: "And it came to pass, that after three days they found him in the temple, sitting in the midst of the doctors, and they were hearing him, and asking him questions. And all that heard him were astonished at his understanding and answers. And he said unto them, How is it that ye sought me? wist ye not that I must be about my Father's business?"
    },
    "John 2:19-21": {
      kjv: "Jesus answered and said unto them, Destroy this temple, and in three days I will raise it up... But he spake of the temple of his body.",
      niv: "Jesus answered them, 'Destroy this temple, and I will raise it up in three days.'... But the temple he had spoken of was his body.",
      greek: "Ἀπεκρίθη Ἰησοῦς καὶ εἶπεν αὐτοῖς, Λύσατε τὸν ναὸν τοῦτον καὶ ἐν τρισὶν ἡμέραις ἐγερῶ αὐτόν... Ἐκεῖνος δὲ ἔλεγεν περὶ τοῦ ναοῦ τοῦ σώματος αὐτοῦ.",
      jst: "Jesus answered and said unto them, Destroy this temple, and in three days I will raise it up... But he spake of the temple of his body."
    },
    "Matthew 21:12-14": {
      kjv: "And Jesus went into the temple of God, and cast out all them that sold and bought in the temple, and overthrew the tables of the moneychangers, and the seats of them that sold doves, And said unto them, It is written, My house shall be called the house of prayer; but ye have made it a den of thieves.",
      niv: "Jesus entered the temple courts and drove out all who were buying and selling there. He overturned the tables of the money changers and the benches of those selling doves. 'It is written,' he said to them, ''My house will be called a house of prayer,' but you are making it 'a den of robbers.''",
      greek: "Καὶ εἰσῆλθεν Ἰησοῦς εἰς τὸ ἱερὸν τοῦ θεοῦ, καὶ ἐξέβαλεν πάντας τοὺς πωλοῦντας καὶ ἀγοράζοντας ἐν τῷ ἱερῷ...",
      jst: "And Jesus went into the temple of God, and cast out all them that sold and bought in the temple, and overthrew the tables of the moneychangers, and the seats of them that sold doves, And said unto them, It is written, My house shall be called the house of prayer; but ye have made it a den of thieves. And the blind and the lame came to him in the temple; and he healed them."
    },
    "John 5:1-9": {
      kjv: "Now there is at Jerusalem by the sheep market a pool, which is called in the Hebrew tongue Bethesda, having five porches... Jesus saith unto him, Rise, take up thy bed, and walk. And immediately the man was made whole, and took up his bed, and walked.",
      niv: "Now there is in Jerusalem near the Sheep Gate a pool, which in Aramaic is called Bethesda and which is surrounded by five covered colonnades... Then Jesus said to him, 'Get up! Pick up your mat and walk.' At once the man was cured; he picked up his mat and walked.",
      greek: "Ἔστιν δὲ ἐν τοῖς Ἱεροσολύμοις ἐπὶ τῇ προβατικῇ κολυμβήθρα...",
      jst: "Now there is at Jerusalem by the sheep market a pool, which is called in the Hebrew tongue Bethesda, having five porches... Jesus saith unto him, Rise, take up thy bed, and walk. And immediately the man was made whole, and took up his bed, and walked."
    },
    "John 9:1-7": {
      kjv: "As Jesus passed by, he saw a man which was blind from his birth... He spat on the ground, and made clay of the spittle, and he anointed the eyes of the blind man with the clay, And said unto him, Go, wash in the pool of Siloam... He went his way therefore, and washed, and came seeing.",
      niv: "As he went along, he saw a man blind from birth... After saying this, he spit on the ground, made some mud with the saliva, and put it on the man's eyes. 'Go,' he told him, 'wash in the Pool of Siloam.' So the man went and washed, and came home seeing.",
      greek: "Καὶ παράγων εἶδεν ἄνθρωπον τυφλὸν ἐκ γενετῆς... ταῦτα εἰπὼν ἔπτυσεν χαμαὶ καὶ ἐποίησεν πηλὸν ἐκ τοῦ πτύσματος...",
      jst: "As Jesus passed by, he saw a man which was blind from his birth... Jesus answered, Neither hath this man sinned, nor his parents: but that the works of God should be made manifest in him... When he had thus spoken, he spat on the ground, and made clay of the spittle, and he anointed the eyes of the blind man with the clay, And said unto him, Go, wash in the pool of Siloam... He went his way therefore, and washed, and came seeing."
    },
    "Luke 13:34": {
      kjv: "O Jerusalem, Jerusalem, which killest the prophets, and stonest them that are sent unto thee; how often would I have gathered thy children together, as a hen doth gather her brood under her wings, and ye would not!",
      niv: "Jerusalem, Jerusalem, you who kill the prophets and stone those sent to you, how often I have longed to gather your children together, as a hen gathers her chicks under her wings, and you were not willing!",
      greek: "Ἰερουσαλὴμ Ἰερουσαλήμ, ἡ ἀποκτείνουσα τοὺς προφήτας καὶ λιθοβολοῦσα τοὺς ἀπεσταλμένους πρὸς αὐτήν...",
      jst: "O Jerusalem, Jerusalem, which killest the prophets, and stonest them that are sent unto thee; how often would I have gathered thy children together, as a hen doth gather her brood under her wings, and ye would not! Behold, your house is left unto you desolate."
    },
    "Acts 2:1-4": {
      kjv: "And when the day of Pentecost was fully come, they were all with one accord in one place... And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance.",
      niv: "When the day of Pentecost came, they were all together in one place... All of them were filled with the Holy Spirit and began to speak in other tongues as the Spirit enabled them.",
      greek: "Καὶ ἐν τῷ συμπληροῦσθαι τὴν ἡμέραν τῆς πεντηκοστῆς ἦσαν πάντες ὁμοθυμαδὸν ἐπὶ τὸ αὐτό...",
      jst: "And when the day of Pentecost was fully come, they were all with one accord in one place... And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance."
    },

    // --- CAPERNAUM & SEA OF GALILEE ---
    "Matthew 4:13-17": {
      kjv: "And leaving Nazareth, he came and dwelt in Capernaum, which is upon the sea coast... From that time Jesus began to preach, and to say, Repent: for the kingdom of heaven is at hand.",
      niv: "Jesus left Nazareth and went to live in Capernaum, a lakeside town... From that time on Jesus began to preach, 'Repent, for the kingdom of heaven has come near.'",
      greek: "Καὶ καταλιπὼν τὴν Ναζαρὰ ἐλθὼν κατῴκησεν εἰς Καφαρναοὺμ τὴν παραθαλασσίαν... Ἀπὸ τότε ἤρξατο ὁ Ἰησοῦς κηρύσσειν καὶ λέγειν, Μετανοεῖτε...",
      jst: "And Jesus, leaving Nazareth, came and dwelt in Capernaum, which is upon the sea coast, in the borders of Zabulon and Nephthalim... From that time Jesus began to preach, and to say, Repent: for the kingdom of heaven is at hand."
    },
    "Mark 2:1-5": {
      kjv: "And again he entered into Capernaum after some days... they uncovered the roof where he was: and when they had broken it up, they let down the bed wherein the sick of the palsy lay.",
      niv: "A few days later Jesus returned to Capernaum... Since they could not get to him because of the crowd, they made an opening in the roof above Jesus by digging through it and lowered the mat the paralyzed man was lying on.",
      greek: "Καὶ εἰσελθὼν πάλιν εἰς Καφαρναοὺμ δι᾽ ἡμερῶν... ἀπεστέγασαν τὴν στέγην ὅπου ἦν...",
      jst: "And again he entered into Capernaum after some days; and it was noised that he was in the house... they uncovered the roof where he was: and when they had broken it up, they let down the bed wherein the sick of the palsy lay. When Jesus saw their faith, he said unto the sick of the palsy, Son, thy sins be forgiven thee."
    },
    "John 6:24-35": {
      kjv: "They also took shipping, and came to Capernaum, seeking for Jesus... And Jesus said unto them, I am the bread of life: he that cometh to me shall never hunger; and he that believeth on me shall never thirst.",
      niv: "The crowd got into boats and went across to Capernaum searching for Jesus... Then Jesus declared, 'I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty.'",
      greek: "Ἐνέβησαν αὐτοὶ εἰς τὰ πλοῖα καὶ ἦλθον εἰς Καφαρναοὺμ ζητοῦντες τὸν Ἰησοῦν... Εἶπεν δὲ αὐτοῖς ὁ Ἰησοῦς, Ἐγώ εἰμι ὁ ἄρτος τῆς ζωῆς...",
      jst: "They also took shipping, and came to Capernaum, seeking for Jesus... And Jesus said unto them, I am the bread of life: he that cometh to me shall never hunger; and he that believeth on me shall never thirst."
    },
    "John 6:35": {
      kjv: "And Jesus said unto them, I am the bread of life: he that cometh to me shall never hunger; and he that believeth on me shall never thirst.",
      niv: "Then Jesus declared, 'I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty.'",
      greek: "Εἶπεν δὲ αὐτοῖς ὁ Ἰησοῦς, Ἐγώ εἰμι ὁ ἄρτος τῆς ζωῆς· ὁ ἐρχόμενος πρὸς ἐμὲ οὐ μὴ πεινάσῃ, καὶ ὁ πιστεύων εἰς ἐμὲ οὐ μὴ διψήσει πώποτε.",
      jst: "And Jesus said unto them, I am the bread of life: he that cometh to me shall never hunger; and he that believeth on me shall never thirst."
    },
    "Matthew 4:18-20": {
      kjv: "And Jesus, walking by the sea of Galilee, saw two brethren, Simon called Peter, and Andrew his brother, casting a net into the sea: for they were fishers. And he saith unto them, Follow me, and I will make you fishers of men.",
      niv: "As Jesus was walking beside the Sea of Galilee, he saw two brothers, Simon called Peter and his brother Andrew. They were casting a net into the lake, for they were fishermen. 'Come, follow me,' Jesus said, 'and I will send you out to fish for people.'",
      greek: "Περιπατῶν δὲ παρὰ τὴν θάλασσαν τῆς Γαλιλαίας εἶδεν δύο ἀδελφούς, Σίμωνα τὸν λεγόμενον Πέτρον καὶ Ἀνδρέαν τὸν ἀδελφὸν αὐτοῦ...",
      jst: "And Jesus, walking by the sea of Galilee, saw two brethren, Simon called Peter, and Andrew his brother, casting a net into the sea: for they were fishers. And he saith unto them, Follow me, and I will make you fishers of men. And they straightway left their nets, and followed him."
    },
    "Mark 4:39": {
      kjv: "And he arose, and rebuked the wind, and said unto the sea, Peace, be still. And the wind ceased, and there was a great calm.",
      niv: "He got up, rebuked the wind and said to the waves, 'Quiet! Be still!' Then the wind died down and it was completely calm.",
      greek: "Καὶ διεγερθεὶς ἐπετίμησεν τῷ ἀνέμῳ καὶ εἶπεν τῇ θαλάσσῃ, Σιώπα, πεφίμωσο. καὶ ἐκόπασεν ὁ ἄνεμος, καὶ ἐγένετο γαλήνη μεγάλη.",
      jst: "And he arose, and rebuked the wind, and said unto the sea, Peace, be still. And the wind ceased, and there was a great calm."
    },
    "Matthew 14:27-31": {
      kjv: "But straightway Jesus spake unto them, saying, Be of good cheer; it is I; be not afraid. And Peter answered him and said, Lord, if it be thou, bid me come unto thee on the water. And he said, Come... But when he saw the wind boisterous, he was afraid; and beginning to sink, he cried, saying, Lord, save me.",
      niv: "Jesus immediately said to them: 'Take courage! It is I. Don't be afraid.' 'Lord, if it's you,' Peter replied, 'tell me to come to you on the water.' 'Come,' he said... But when he saw the wind, he was afraid and, beginning to sink, cried out, 'Lord, save me!'",
      greek: "Εὐθὺς δὲ ἐλάλησεν ὁ Ἰησοῦς αὐτοῖς λέγων, Θαρσεῖτε, ἐγώ εἰμι· μὴ φοβεῖσθε. ἀποκριθεὶς δὲ αὐτῷ ὁ Πέτρος εἶπεν...",
      jst: "But straightway Jesus spake unto them, saying, Be of good cheer; it is I; be not afraid. And Peter answered him and said, Lord, if it be thou, bid me come unto thee on the water. And he said, Come... But when he saw the wind boisterous, he was afraid; and beginning to sink, he cried, saying, Lord, save me. And immediately Jesus stretched forth his hand, and caught him."
    },

    // --- RIVER JORDAN & BETHABARA ---
    "Matthew 3:13-17": {
      kjv: "Then cometh Jesus from Galilee to Jordan unto John, to be baptized of him. But John forbad him, saying, I have need to be baptized of thee, and comest thou to me? And Jesus answering said unto him, Suffer it to be so now: for thus it becometh us to fulfil all righteousness.",
      niv: "Then Jesus came from Galilee to the Jordan to be baptized by John. But John tried to deter him, saying, 'I need to be baptized by you, and do you come to me?' Jesus replied, 'Let it be so now; it is proper for us to do this to fulfill all righteousness.'",
      greek: "Τότε παραγίνεται ὁ Ἰησοῦς ἀπὸ τῆς Γαλιλαίας ἐπὶ τὸν Ἰορδάνην πρὸς τὸν Ἰωάννην τοῦ βαπτισθῆναι ὑπ᾽ αὐτοῦ...",
      jst: "Then cometh Jesus from Galilee to Jordan unto John, to be baptized of him. But John forbad him, saying, I have need to be baptized of thee, and comest thou to me? And Jesus answering said unto him, Suffer it to be so now: for thus it becometh us to fulfil all righteousness. Then he suffered him. And Jesus, when he was baptized, went up straightway out of the water: and, lo, the heavens were opened unto him, and he saw the Spirit of God descending like a dove, and lighting upon him: And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased. Hear ye him."
    },
    "John 1:28": {
      kjv: "These things were done in Bethabara beyond Jordan, where John was baptizing.",
      niv: "This all happened at Bethany on the other side of the Jordan, where John was baptizing.",
      greek: "Ταῦτα ἐν Βηθαβαρᾷ ἐγένετο πέραν τοῦ Ἰορδάνου, ὅπου ἦν Ἰωάννης βαπτίζων.",
      jst: "These things were done in Bethabara beyond Jordan, where John was baptizing."
    },

    // --- BETHLEHEM & NAZARETH ---
    "Luke 2:4-7": {
      kjv: "And Joseph also went up from Galilee, out of the city of Nazareth, into Judaea, unto the city of David, which is called Bethlehem... And she brought forth her firstborn son, and wrapped him in swaddling clothes, and laid him in a manger.",
      niv: "So Joseph went up from the town of Nazareth in Galilee to Judea, to Bethlehem the town of David... and she gave birth to her firstborn, a son. She wrapped him in cloths and placed him in a manger.",
      greek: "Ἀνέβη δὲ καὶ Ἰωσὴφ ἀπὸ τῆς Γαλιλαίας ἐκ πόλεως Ναζαρὲτ εἰς τὴν Ἰουδαίαν εἰς πόλιν Δαυὶδ ἥτις καλεῖται Βηθλεέμ...",
      jst: "And Joseph also went up from Galilee, out of the city of Nazareth, into Judaea, unto the city of David, which is called Bethlehem... And she brought forth her firstborn son, and wrapped him in swaddling clothes, and laid him in a manger; because there was no room for them in the inns."
    },
    "Matthew 2:1-2": {
      kjv: "Now when Jesus was born in Bethlehem of Judaea in the days of Herod the king, behold, there came wise men from the east to Jerusalem, Saying, Where is he that is born King of the Jews?",
      niv: "Jesus was born in the town of Bethlehem in Judea during the time King Herod ruled. After this, wise men from the East came to Jerusalem. They asked, 'Where is the child who has been born King of the Jews?'",
      greek: "Τοῦ δὲ Ἰησοῦ γεννηθέντος ἐν Βηθλεὲμ τῆς Ἰουδαίας ἐν ἡμέραις Ἡρῴδου τοῦ βασιλέως...",
      jst: "Now when Jesus was born in Bethlehem of Judaea in the days of Herod the king, behold, there came wise men from the east to Jerusalem, Saying, Where is the child that is born, the Messiah of the Jews? for we have seen his star in the east, and are come to worship him."
    },
    "Luke 4:16-21": {
      kjv: "And he came to Nazareth, where he had been brought up: and, as his custom was, he went into the synagogue on the sabbath day, and stood up for to read... This day is this scripture fulfilled in your ears.",
      niv: "Jesus went to Nazareth, the town where he grew up. On the Sabbath day he went into the synagogue as he usually did. He stood up to read... 'Today this scripture is fulfilled in your hearing.'",
      greek: "Καὶ ἦλθεν εἰς τὴν Ναζαρέτ, οὗ ἦν τεθραμμένος, καὶ εἰσῆλθεν κατὰ τὸ εἰωθὸς αὐτῷ ἐν τῇ ἡμέρᾳ τῶν σαββάτων εἰς τὴν συναγωγήν...",
      jst: "And he came to Nazareth, where he had been brought up: and, as his custom was, he went into the synagogue on the sabbath day, and stood up for to read... The Spirit of the Lord is upon me, because he hath anointed me to preach the gospel to the poor; he hath sent me to heal the brokenhearted, to preach deliverance to the captives, and recovering of sight to the blind... And he began to say unto them, This day is this scripture fulfilled in your ears."
    },

    // --- GETHSEMANE, PASSION & RESURRECTION ---
    "Matthew 26:36-39": {
      kjv: "Then cometh Jesus with them unto a place called Gethsemane, and saith unto the disciples, Sit ye here, while I go and pray yonder... O my Father, if it be possible, let this cup pass from me: nevertheless not as I will, but as thou wilt.",
      niv: "Then Jesus went with his disciples to a place called Gethsemane, and he said to them, 'Sit here while I go over there and pray.'... 'My Father, if it is possible, may this cup be taken from me. Yet not as I will, but as you will.'",
      greek: "Τότε ἔρχεται μετ᾽ αὐτῶν ὁ Ἰησοῦς εἰς χωρίον λεγόμενον Γεθσημανί...",
      jst: "Then cometh Jesus with them unto a place called Gethsemane, and saith unto the disciples, Sit ye here, while I go and pray yonder... O my Father, if it be possible, let this cup pass from me: nevertheless not as I will, but as thou wilt."
    },
    "Luke 22:42-44": {
      kjv: "Saying, Father, if thou be willing, remove this cup from me: nevertheless not my will, but thine, be done... And being in an agony he prayed more earnestly: and his sweat was as it were great drops of blood falling down to the ground.",
      niv: "'Father, if you are willing, take this cup from me; yet not my will, but yours be done.'... And being in anguish, he prayed more earnestly, and his sweat was like drops of blood falling to the ground.",
      greek: "Λέγων, Πάτερ, εἰ βούλει παρένεγκε τοῦτο τὸ ποτήριον ἀπ᾽ ἐμοῦ· πλὴν μὴ τὸ θέλημά μου ἀλλὰ τὸ σὸν γινέσθω...",
      jst: "Saying, Father, if thou be willing, remove this cup from me: nevertheless not my will, but thine, be done. And there appeared an angel unto him from heaven, strengthening him. And being in an agony he prayed more earnestly: and his sweat was as it were great drops of blood falling down to the ground."
    },
    "Matthew 28:5-6": {
      kjv: "And the angel answered and said unto the women, Fear not ye: for I know that ye seek Jesus, which was crucified. He is not here: for he is risen, as he said. Come, see the place where the Lord lay.",
      niv: "The angel said to the women, 'Do not be afraid, for I know that you are looking for Jesus, who was crucified. He is not here; he has risen, just as he said. Come and see the place where he lay.'",
      greek: "Ἀποκριθεὶς δὲ ὁ ἄγγελος εἶπεν ταῖς γυναιξίν, Μὴ φοβεῖσθε ὑμεῖς· οἶδα γὰρ ὅτι Ἰησοῦν τὸν ἐσταυρωμένον ζητεῖτε. οὐκ ἔστιν ὧδε, ἠγέρθη γάρ...",
      jst: "And the angel answered and said unto the women, Fear not ye: for I know that ye seek Jesus, which was crucified. He is not here: for he is risen, as he said. Come, see the place where the Lord lay."
    },
    "Luke 24:5-6": {
      kjv: "Why seek ye the living among the dead? He is not here, but is risen: remember how he spake unto you when he was yet in Galilee.",
      niv: "'Why do you look for the living among the dead? He is not here; he has risen! Remember how he told you, while he was still with you in Galilee.'",
      greek: "Τί ζητεῖτε τὸν ζῶντα μετὰ τῶν νεκρῶν; οὐκ ἔστιν ὧδε, ἀλλὰ ἠγέρθη...",
      jst: "And as they were afraid, and bowed down their faces to the earth, they said unto them, Why seek ye the living among the dead? He is not here, but is risen: remember how he spake unto you when he was yet in Galilee."
    },
    "John 11:25-26": {
      kjv: "Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live: And whosoever liveth and believeth in me shall never die. Believest thou this?",
      niv: "Jesus said to her, 'I am the resurrection and the life. Anyone who believes in me will live, even if they die. And anyone who lives and believes in me will never die. Do you believe this?'",
      greek: "Εἶπεν αὐτῇ ὁ Ἰησοῦς, Ἐγώ εἰμι ἡ ἀνάστασις καὶ ἡ ζωή· ὁ πιστεύων εἰς ἐμὲ κἂν ἀποθάνῃ ζήσεται...",
      jst: "Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live: And whosoever liveth and believeth in me shall never die. Believest thou this?"
    },

    // --- SAMARIA & JERICHO ---
    "John 4:13-14": {
      kjv: "Jesus answered and said unto her, Whosoever drinketh of this water shall thirst again: But whosoever drinketh of the water that I shall give him shall never thirst; but the water that I shall give him shall be in him a well of water springing up into everlasting life.",
      niv: "Jesus answered, 'Everyone who drinks this water will be thirsty again, but whoever drinks the water I give them will never thirst. Indeed, the water I give them will become in them a spring of water welling up to eternal life.'",
      greek: "Ἀπεκρίθη Ἰησοῦς καὶ εἶπεν αὐτῇ, Πᾶς ὁ πίνων ἐκ τοῦ ὕδατος τούτου διψήσει πάλιν...",
      jst: "Jesus answered and said unto her, Whosoever drinketh of this water shall thirst again: But whosoever drinketh of the water that I shall give him shall never thirst; but the water that I shall give him shall be in him a well of water springing up into everlasting life."
    },
    "Luke 19:9-10": {
      kjv: "And Jesus said unto him, This day is salvation come to this house... For the Son of man is come to seek and to save that which was lost.",
      niv: "Jesus said to Zacchaeus, 'Today salvation has come to this house... For the Son of Man came to seek and to save the lost.'",
      greek: "Εἶπεν δὲ πρὸς αὐτὸν ὁ Ἰησοῦς ὅτι Σήμερον σωτηρία τῷ οἴκῳ τούτῳ ἐγένετο... ἦλθεν γὰρ ὁ υἱὸς τοῦ ἀνθρώπου ζητῆσαι καὶ σῶσαι τὸ ἀπολωλός.",
      jst: "And Jesus said unto him, This day is salvation come to this house, forsomuch as he also is a son of Abraham. For the Son of man is come to seek and to save that which was lost."
    },
    "Luke 10:30-35": {
      kjv: "A certain man went down from Jerusalem to Jericho, and fell among thieves... But a certain Samaritan, as he journeyed, came where he was: and when he saw him, he had compassion on him.",
      niv: "A man was going down from Jerusalem to Jericho, when he was attacked by robbers... But a Samaritan, as he traveled, came where the man was; and when he saw him, he took pity on him.",
      greek: "Ὑπολαβὼν δὲ ὁ Ἰησοῦς εἶπεν, Ἄνθρωπός τις κατέβαινεν ἀπὸ Ἱερουσαλὴμ εἰς Ἱεριχὼ καὶ λῃσταῖς περιέπεσεν...",
      jst: "And Jesus answering said, A certain man went down from Jerusalem to Jericho, and fell among thieves, which stripped him of his raiment, and wounded him, and departed, leaving him half dead... But a certain Samaritan, as he journeyed, came where he was: and when he saw him, he had compassion on him."
    },

    // --- APOSTOLIC JOURNEYS & EPISTLES ---
    "Acts 9:3-6": {
      kjv: "And as he journeyed, he came near Damascus: and suddenly there shined round about him a light from heaven: And he fell to the earth, and heard a voice saying unto him, Saul, Saul, why persecutest thou me?",
      niv: "As he neared Damascus on his journey, suddenly a light from heaven flashed around him. He fell to the ground and heard a voice say to him, 'Saul, Saul, why do you persecute me?'",
      greek: "Ἐν δὲ τῷ πορεύεσθαι ἐγένετο αὐτὸν ἐγγίζειν τῇ Δαμασκῷ, ἐξαίφνης τε αὐτὸν περιήστραψεν φῶς ἀπὸ τοῦ οὐρανοῦ...",
      jst: "And as he journeyed, he came near Damascus: and suddenly there shined round about him a light from heaven: And he fell to the earth, and heard a voice saying unto him, Saul, Saul, why persecutest thou me? And he said, Who art thou, Lord? And the Lord said, I am Jesus whom thou persecutest: it is hard for thee to kick against the pricks. And he trembling and astonished said, Lord, what wilt thou have me to do? And the Lord said unto him, Arise, and go into the city, and it shall be told thee what thou must do."
    },
    "Acts 11:26": {
      kjv: "And when he had found him, he brought him unto Antioch. And it came to pass, that a whole year they assembled themselves with the church, and taught much people. And the disciples were called Christians first in Antioch.",
      niv: "and when he found him, he brought him to Antioch. So for a whole year Barnabas and Saul met with the church and taught great numbers of people. The disciples were called Christians first at Antioch.",
      greek: "Καὶ εὑρὼν ἤγαγεν εἰς Ἀντιόχειαν. ἐγένετο δὲ αὐτοῖς καὶ ἐνιαυτὸν ὅλον συναχθῆναι ἐν τῇ ἐκκλησίᾳ...",
      jst: "And when he had found him, he brought him unto Antioch. And it came to pass, that a whole year they assembled themselves with the church, and taught much people. And the disciples were called Christians first in Antioch."
    },
    "1 Corinthians 13:13": {
      kjv: "And now abideth faith, hope, charity, these three; but the greatest of these is charity.",
      niv: "And now these three remain: faith, hope and love. But the greatest of these is love.",
      greek: "Νυνὶ δὲ μένει πίστις, ἐλπίς, ἀγάπη, τὰ τρία ταῦτα· μείζων δὲ τούτων ἡ ἀγάπη.",
      jst: "And now abideth faith, hope, charity, these three; but the greatest of these is charity."
    },
    // --- CORINTHIAN APOSTOLIC PASSAGES ---
    "Acts 18:1-4": {
      kjv: "After these things Paul departed from Athens, and came to Corinth; And found a certain Jew named Aquila, born in Pontus, lately come from Italy, with his wife Priscilla; (because that Claudius had commanded all Jews to depart from Rome:) and came unto them. And because he was of the same craft, he abode with them, and wrought: for by their occupation they were tentmakers. And he reasoned in the synagogue every sabbath, and persuaded the Jews and the Greeks.",
      niv: "After this, Paul left Athens and went to Corinth. There he met a Jew named Aquila, a native of Pontus, who had recently come from Italy with his wife Priscilla, because Claudius had ordered all Jews to leave Rome. Paul went to see them, and because he was a tentmaker as they were, he stayed and worked with them. Every Sabbath he reasoned in the synagogue, trying to persuade Jews and Greeks.",
      greek: "Μετὰ δὲ ταῦτα χωρισθεὶς ὁ Παῦλος ἐκ τῶν Ἀθηνῶν ἦλθεν εἰς Κόρινθον. καὶ εὑρών τινα Ἰουδαῖον ὀνόματι Ἀκύλαν... διὰ τὸ διατεταχέναι Κλαύδιον χωρίζεσθαι πάντας τοὺς Ἰουδαίους ἀπὸ τῆς Ῥώμης, προσῆλθεν αὐτοῖς...",
      jst: "After these things Paul departed from Athens, and came to Corinth; And found a certain Jew named Aquila, born in Pontus, lately come from Italy, with his wife Priscilla; (because that Claudius had commanded all Jews to depart from Rome:) and came unto them. And because he was of the same craft, he abode with them, and wrought: for by their occupation they were tentmakers. And he reasoned in the synagogue every sabbath, and persuaded the Jews and the Greeks."
    },
    "Acts 18:4-8": {
      kjv: "And he reasoned in the synagogue every sabbath, and persuaded the Jews and the Greeks. And when Silas and Timotheus were come from Macedonia, Paul was pressed in the spirit, and testified to the Jews that Jesus was Christ. And when they opposed themselves, and blasphemed, he shook his raiment, and said unto them, Your blood be upon your own heads; I am clean: from henceforth I will go unto the Gentiles. And he departed thence, and entered into a certain man's house, named Justus, one that worshipped God, whose house joined hard to the synagogue. And Crispus, the chief ruler of the synagogue, believed on the Lord with all his house; and many of the Corinthians hearing believed, and were baptized.",
      niv: "Every Sabbath he reasoned in the synagogue, trying to persuade Jews and Greeks. When Silas and Timothy arrived from Macedonia, Paul devoted himself completely to preaching, testifying to the Jews that Jesus was the Messiah. But when they opposed Paul and became abusive, he shook out his clothes in protest and said to them, 'Your blood be on your own heads! I am innocent of it. From now on I will go to the Gentiles.' Then Paul left the synagogue and went next door to the house of Titius Justus, a worshiper of God. Crispus, the synagogue leader, and his entire household believed in the Lord; and many of the Corinthians who heard Paul believed and were baptized.",
      greek: "Διελέγετο δὲ ἐν τῇ συναγωγῇ κατὰ πᾶν σάββατον, ἔπειθέν τε Ἰουδαίους καὶ Ἕλληνας... Κρίσπος δὲ ὁ ἀρχισυνάγωγος ἐπίστευσεν τῷ κυρίῳ σὺν ὅλῳ τῷ οἴκῳ αὐτοῦ, καὶ πολλοὶ τῶν Κορινθίων ἀκούοντες ἐπίστευον καὶ ἐβαπτίζοντο.",
      jst: "And he reasoned in the synagogue every sabbath, and persuaded the Jews and the Greeks. And when Silas and Timotheus were come from Macedonia, Paul was pressed in the spirit, and testified to the Jews that Jesus was Christ. And when they opposed themselves, and blasphemed, he shook his raiment, and said unto them, Your blood be upon your own heads; I am clean: from henceforth I will go unto the Gentiles. And he departed thence, and entered into a certain man's house, named Justus, one that worshipped God, whose house joined hard to the synagogue. And Crispus, the chief ruler of the synagogue, believed on the Lord with all his house; and many of the Corinthians hearing believed, and were baptized."
    },
    "Acts 18:8-11": {
      kjv: "And Crispus, the chief ruler of the synagogue, believed on the Lord with all his house; and many of the Corinthians hearing believed, and were baptized. Then spake the Lord to Paul in the night by a vision, Be not afraid, but speak, and hold not thy peace: For I am with thee, and no man shall set on thee to hurt thee: for I have much people in this city. And he continued there a year and six months, teaching the word of God among them.",
      niv: "Crispus, the synagogue leader, and his entire household believed in the Lord; and many of the Corinthians who heard Paul believed and were baptized. One night the Lord spoke to Paul in a vision: 'Do not be afraid; keep on speaking, do not be silent. For I am with you, and no one is going to attack and harm you, because I have many people in this city.' So Paul stayed in Corinth for a year and a half, teaching them the word of God.",
      greek: "Κρίσπος δὲ ὁ ἀρχισυνάγωγος ἐπίστευσεν τῷ κυρίῳ σὺν ὅλῳ τῷ οἴκῳ αὐτοῦ... Εἶπεν δὲ ὁ κύριος ἐν νυκτὶ δι᾽ ὁράματος τῷ Παύλῳ, Μὴ φοβοῦ, ἀλλὰ λάλει καὶ μὴ σιωπήσῃς, διότι ἐγώ εἰμι μετὰ σοῦ... ἐκάθισέν τε ἐνιαυτὸν καὶ μῆνας ἕξ, διδάσκων ἐν αὐτοῖς τὸν λόγον τοῦ θεοῦ.",
      jst: "And Crispus, the chief ruler of the synagogue, believed on the Lord with all his house; and many of the Corinthians hearing believed, and were baptized. Then spake the Lord to Paul in the night by a vision, Be not afraid, but speak, and hold not thy peace: For I am with thee, and no man shall set on thee to hurt thee: for I have much people in this city. And he continued there a year and six months, teaching the word of God among them."
    },
    "Acts 18:9-11": {
      kjv: "Then spake the Lord to Paul in the night by a vision, Be not afraid, but speak, and hold not thy peace: For I am with thee, and no man shall set on thee to hurt thee: for I have much people in this city. And he continued there a year and six months, teaching the word of God among them.",
      niv: "One night the Lord spoke to Paul in a vision: 'Do not be afraid; keep on speaking, do not be silent. For I am with you, and no one is going to attack and harm you, because I have many people in this city.' So Paul stayed in Corinth for a year and a half, teaching them the word of God.",
      greek: "Εἶπεν δὲ ὁ κύριος ἐν νυκτὶ δι᾽ ὁράματος τῷ Παύλῳ, Μὴ φοβοῦ, ἀλλὰ λάλει καὶ μὴ σιωπήσῃς, διότι ἐγώ εἰμι μετὰ σοῦ, καὶ οὐδεὶς ἐπιθήσεταί σοι τοῦ κακῶσαί σε, διότι λαός ἐστί μοι πολὺς ἐν τῇ πόλει ταύτῃ. ἐκάθισέν τε ἐνιαυτὸν καὶ μῆνας ἕξ, διδάσκων ἐν αὐτοῖς τὸν λόγον τοῦ θεοῦ.",
      jst: "Then spake the Lord to Paul in the night by a vision, Be not afraid, but speak, and hold not thy peace: For I am with thee, and no man shall set on thee to hurt thee: for I have much people in this city. And he continued there a year and six months, teaching the word of God among them."
    },
    "Acts 18:12-16": {
      kjv: "And when Gallio was the deputy of Achaia, the Jews made insurrection with one accord against Paul, and brought him to the judgment seat, Saying, This fellow persuadeth men to worship God contrary to the law. And when Paul was now about to open his mouth, Gallio said unto the Jews, If it were a matter of wrong or wicked lewdness, O ye Jews, reason would that I should bear with you: But if it be a question of words and names, and of your law, look ye to it; for I will be no judge of such matters. And he drave them from the judgment seat.",
      niv: "While Gallio was proconsul of Achaia, the Jews of Corinth made a united attack on Paul and brought him to the place of judgment. 'This man,' they charged, 'is persuading the people to worship God in ways contrary to the law.' Just as Paul was about to speak, Gallio said to them, 'If you Jews were making a complaint about some misdemeanor or serious crime, it would be reasonable for me to listen to you. But since it involves questions about words and names and your own law—settle the matter yourselves. I will not be a judge of such things.' So he drove them off.",
      greek: "Γαλλίωνος δὲ ἀνθυπατεύοντος τῆς Ἀχαΐας κατεπέστησαν ὁμοθυμαδὸν οἱ Ἰουδαῖοι τῷ Παύλῳ καὶ ἤγαγον αὐτὸν ἐπὶ τὸ βῆμα... εἰ μὲν ἦν ἀδίκημά τι ἢ ῥᾳδιούργημα πονηρόν, ὦ Ἰουδαῖοι, κατὰ λόγον ἂν ἠνεσχόμην ὑμῶν· εἰ δὲ ζήτημά ἐστιν περὶ λόγου καὶ ὀνομάτων καὶ νόμου τοῦ καθ᾽ ὑμᾶς, ὄψεσθε αὐτοί... καὶ ἀπήλασεν αὐτοὺς ἀπὸ τοῦ βήματος.",
      jst: "And when Gallio was the deputy of Achaia, the Jews made insurrection with one accord against Paul, and brought him to the judgment seat, Saying, This fellow persuadeth men to worship God contrary to the law. And when Paul was now about to open his mouth, Gallio said unto the Jews, If it were a matter of wrong or wicked lewdness, O ye Jews, reason would that I should bear with you: But if it be a question of words and names, and of your law, look ye to it; for I will be no judge of such matters. And he drave them from the judgment seat."
    },
    "Acts 18:12-17": {
      kjv: "And when Gallio was the deputy of Achaia, the Jews made insurrection with one accord against Paul, and brought him to the judgment seat... Gallio said unto the Jews, If it be a question of words and names, and of your law, look ye to it; for I will be no judge of such matters... Then all the Greeks took Sosthenes, the chief ruler of the synagogue, and beat him before the judgment seat. And Gallio cared for none of those things.",
      niv: "While Gallio was proconsul of Achaia, the Jews of Corinth made a united attack on Paul and brought him to the place of judgment... Gallio said to them, 'Since it involves questions about words and names and your own law—settle the matter yourselves. I will not be a judge of such things.'... Then the crowd there turned on Sosthenes the synagogue leader and beat him in front of the proconsul; and Gallio showed no concern whatever.",
      greek: "Γαλλίωνος δὲ ἀνθυπατεύοντος τῆς Ἀχαΐας κατεπέστησαν ὁμοθυμαδὸν οἱ Ἰουδαῖοι τῷ Παύλῳ... ἐπιλαβόμενοι δὲ πάντες οἱ Ἕλληνες Σωσθένην τὸν ἀρχισυνάγωγον ἔτυπτον ἔμπροσθεν τοῦ βήματος· καὶ οὐδὲν τούτων τῷ Γαλλίωνι ἔμελεν.",
      jst: "And when Gallio was the deputy of Achaia, the Jews made insurrection with one accord against Paul, and brought him to the judgment seat... Gallio said unto the Jews, If it be a question of words and names, and of your law, look ye to it; for I will be no judge of such matters... Then all the Greeks took Sosthenes, the chief ruler of the synagogue, and beat him before the judgment seat. And Gallio cared for none of those things."
    },
    "1 Corinthians 1:1-3": {
      kjv: "Paul, called to be an apostle of Jesus Christ through the will of God, and Sosthenes our brother, Unto the church of God which is at Corinth, to them that are sanctified in Christ Jesus, called to be saints, with all that in every place call upon the name of Jesus Christ our Lord, both their's and our's: Grace be unto you, and peace, from God our Father, and from the Lord Jesus Christ.",
      niv: "Paul, called to be an apostle of Christ Jesus by the will of God, and our brother Sosthenes, To the church of God in Corinth, to those sanctified in Christ Jesus and called to be his holy people, together with all those everywhere who call on the name of our Lord Jesus Christ—their Lord and ours: Grace and peace to you from God our Father and the Lord Jesus Christ.",
      greek: "Παῦλος κλητὸς ἀπόστολος Ἰησοῦ Χριστοῦ διὰ θελήματος θεοῦ, καὶ Σωσθένης ὁ ἀδελφός, τῇ ἐκκλησίᾳ τοῦ θεοῦ τῇ οὔσῃ ἐν Κορίνθῳ, ἡγιασμένοις ἐν Χριστῷ Ἰησοῦ, κλητοῖς ἁγίοις...",
      jst: "Paul, called to be an apostle of Jesus Christ through the will of God, and Sosthenes our brother, Unto the church of God which is at Corinth, to them that are sanctified in Christ Jesus, called to be saints, with all that in every place call upon the name of Jesus Christ our Lord, both their's and our's: Grace be unto you, and peace, from God our Father, and from the Lord Jesus Christ."
    },
    "1 Corinthians 1:14-17": {
      kjv: "I thank God that I baptized none of you, but Crispus and Gaius; Lest any should say that I had baptized in mine own name. And I baptized also the household of Stephanas: besides, I know not whether I baptized any other. For Christ sent me not to baptize, but to preach the gospel: not with wisdom of words, lest the cross of Christ should be made of none effect.",
      niv: "I thank God that I did not baptize any of you except Crispus and Gaius, so no one can say that you were baptized in my name. (Yes, I also baptized the household of Stephanas; beyond that, I don't remember if I baptized anyone else.) For Christ did not send me to baptize, but to preach the gospel—not with wisdom and eloquence, lest the cross of Christ be emptied of its power.",
      greek: "Εὐχαριστῶ τῷ θεῷ ὅτι οὐδένα ὑμῶν ἐβάπτισα εἰ μὴ Κρίσπον καὶ Γάϊον... ἐβάπτισα δὲ καὶ τὸν Στεφανᾶ οἶκον... οὐ γὰρ ἀπέστειλέν με Χριστὸς βαπτίζειν ἀλλ᾽ εὐαγγελίζεσθαι, οὐκ ἐν σοφίᾳ λόγου...",
      jst: "I thank God that I baptized none of you, but Crispus and Gaius; Lest any should say that I had baptized in mine own name. And I baptized also the household of Stephanas: besides, I know not whether I baptized any other. For Christ sent me not to baptize, but to preach the gospel: not with wisdom of words, lest the cross of Christ should be made of none effect."
    },
    "1 Corinthians 1:18-24": {
      kjv: "For the preaching of the cross is to them that perish foolishness; but unto us which are saved it is the power of God... But we preach Christ crucified, unto the Jews a stumblingblock, and unto the Greeks foolishness; But unto them which are called, both Jews and Greeks, Christ the power of God, and the wisdom of God.",
      niv: "For the message of the cross is foolishness to those who are perishing, but to us who are being saved it is the power of God... we preach Christ crucified: a stumbling block to Jews and foolishness to Gentiles, but to those whom God has called, both Jews and Greeks, Christ the power of God and the wisdom of God.",
      greek: "Ὁ λόγος γὰρ ὁ τοῦ σταυροῦ τοῖς μὲν ἀπολλυμένοις μωρία ἐστίν, τοῖς δὲ σῳζομένοις ἡμῖν δύναμις θεοῦ ἐστιν... ἡμεῖς δὲ κηρύσσομεν Χριστὸν ἐσταυρωμένον, Ἰουδαίοις μὲν σκάνδαλον, Ἕλλησιν δὲ μωρίαν...",
      jst: "For the preaching of the cross is to them that perish foolishness; but unto us which are saved it is the power of God... But we preach Christ crucified, unto the Jews a stumblingblock, and unto the Greeks foolishness; But unto them which are called, both Jews and Greeks, Christ the power of God, and the wisdom of God."
    },
    "1 Corinthians 6:19-20": {
      kjv: "What? know ye not that your body is the temple of the Holy Ghost which is in you, which ye have of God, and ye are not your own? For ye are bought with a price: therefore glorify God in your body, and in your spirit, which are God's.",
      niv: "Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your bodies.",
      greek: "Ἢ οὐκ οἴδατε ὅτι τὸ σῶμα ὑμῶν ναὸς τοῦ ἐν ὑμῖν ἁγίου πνεύματός ἐστιν, οὗ ἔχετε ἀπὸ θεοῦ, καὶ οὐκ ἐστὲ ἑαυτῶν; ἠγοράσθητε γὰρ τιμῆς· δοξάσατε δὴ τὸν θεὸν ἐν τῷ σώματι ὑμῶν καὶ ἐν τῷ πνεύματι ὑμῶν, ἅτινά ἐστιν τοῦ θεοῦ.",
      jst: "What? know ye not that your body is the temple of the Holy Ghost which is in you, which ye have of God, and ye are not your own? For ye are bought with a price: therefore glorify God in your body, and in your spirit, which are God's."
    },
    "1 Corinthians 9:24-27": {
      kjv: "Know ye not that they which run in a race run all, but one receiveth the prize? So run, that ye may obtain. And every man that striveth for the mastery is temperate in all things. Now they do it to obtain a corruptible crown; but we an incorruptible. I therefore so run, not as uncertainly; so fight I, not as one that beateth the air: But I keep under my body, and bring it into subjection: lest that by any means, when I have preached to others, I myself should be a castaway.",
      niv: "Do you not know that in a race all the runners run, but only one gets the prize? Run in such a way as to get the prize. Everyone who competes in the games goes into strict training. They do it to get a crown that will not last, but we do it to get a crown that will last forever. Therefore I do not run like someone running aimlessly; I do not fight like a boxer beating the air. No, I strike a blow to my body and make it my slave so that after I have preached to others, I myself will not be disqualified for the prize.",
      greek: "Οὐκ οἴδατε ὅτι οἱ ἐν σταδίῳ τρέχοντες πάντες μὲν τρέχουσιν, εἷς δὲ λαμβάνει τὸ βραβεῖον; οὕτως τρέχετε ἵνα καταλάβητε. πᾶς δὲ ὁ ἀγωνιζόμενος πάντα ἐγκρατεύεται, ἐκεῖνοι μὲν οὖν ἵνα φθαρτὸν στέφανον λάβωσιν, ἡμεῖς δὲ ἄφθαρτον...",
      jst: "Know ye not that they which run in a race run all, but one receiveth the prize? So run, that ye may obtain. And every man that striveth for the mastery is temperate in all things. Now they do it to obtain a corruptible crown; but we an incorruptible. I therefore so run, not as uncertainly; so fight I, not as one that beateth the air: But I keep under my body, and bring it into subjection: lest that by any means, when I have preached to others, I myself should be a castaway."
    },
    "1 Corinthians 11:23-26": {
      kjv: "For I have received of the Lord that which also I delivered unto you, That the Lord Jesus the same night in which he was betrayed took bread: And when he had given thanks, he brake it, and said, Take, eat: this is my body, which is broken for you: this do in remembrance of me. After the same manner also he took the cup, when he had supped, saying, This cup is the new testament in my blood: this do ye, as oft as ye drink it, in remembrance of me. For as often as ye eat this bread, and drink this cup, ye do shew the Lord's death till he come.",
      niv: "For I received from the Lord what I also passed on to you: The Lord Jesus, on the night he was betrayed, took bread, and when he had given thanks, he broke it and said, 'This is my body, which is for you; do this in remembrance of me.' In the same way, after supper he took the cup, saying, 'This cup is the new covenant in my blood; do this, whenever you drink it, in remembrance of me.' For whenever you eat this bread and drink this cup, you proclaim the Lord's death until he comes.",
      greek: "Ἐγὼ γὰρ παρέλαβον ἀπὸ τοῦ κυρίου, ὃ καὶ παρέδωκα ὑμῖν, ὅτι ὁ κύριος Ἰησοῦς ἐν τῇ νυκτὶ ᾗ παρεδίδοτο ἔλαβεν ἄρτον καὶ εὐχαριστήσας ἔκλασεν καὶ εἶπεν, Λάβετε, φάγετε· τοῦτό μού ἐστιν τὸ σῶμα τὸ ὑπὲρ ὑμῶν κλώμενον· τοῦτο ποιεῖτε εἰς τὴν ἐμὴν ἀνάμνησιν...",
      jst: "For I have received of the Lord that which also I delivered unto you, That the Lord Jesus the same night in which he was betrayed took bread: And when he had given thanks, he brake it, and said, Take, eat: this is my body, which is broken for you: this do in remembrance of me. After the same manner also he took the cup, when he had supped, saying, This cup is the new testament in my blood: this do ye, as oft as ye drink it, in remembrance of me. For as often as ye eat this bread, and drink this cup, ye do shew the Lord's death till he come."
    },
    "1 Corinthians 13:1-8": {
      kjv: "Though I speak with the tongues of men and of angels, and have not charity, I am become as sounding brass, or a tinkling cymbal. And though I have the gift of prophecy, and understand all mysteries, and all knowledge; and though I have all faith, so that I could remove mountains, and have not charity, I am nothing... Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up... Charity never faileth.",
      niv: "If I speak in the tongues of men or of angels, but do not have love, I am only a resounding gong or a clanging cymbal. If I have the gift of prophecy and can fathom all mysteries and all knowledge, and if I have a faith that can move mountains, but do not have love, I am nothing... Love is patient, love is kind. It does not envy, it does not boast, it is not proud... Love never fails.",
      greek: "Ἐὰν ταῖς γλώσσαις τῶν ἀνθρώπων λαλῶ καὶ τῶν ἀγγέλων, ἀγάπην δὲ μὴ ἔχω, γέγονα χαλκὸς ἠχῶν ἢ κύμβαλον ἀλαλάζον... Ἡ ἀγάπη μακροθυμεῖ, χρηστεύεται· ἡ ἀγάπη οὐ ζηλοῖ... ἡ ἀγάπη οὐδέποτε ἐκπίπτει.",
      jst: "Though I speak with the tongues of men and of angels, and have not charity, I am become as sounding brass, or a tinkling cymbal. And though I have the gift of prophecy, and understand all mysteries, and all knowledge; and though I have all faith, so that I could remove mountains, and have not charity, I am nothing... Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up... Charity never faileth."
    },
    "1 Corinthians 15:1-8": {
      kjv: "Moreover, brethren, I declare unto you the gospel which I preached unto you... For I delivered unto you first of all that which I also received, how that Christ died for our sins according to the scriptures; And that he was buried, and that he rose again the third day according to the scriptures: And that he was seen of Cephas, then of the twelve: After that, he was seen of above five hundred brethren at once... After that, he was seen of James; then of all the apostles. And last of all he was seen of me also, as of one born out of due time.",
      niv: "Now, brothers and sisters, I want to remind you of the gospel I preached to you... For what I received I passed on to you as of first importance: that Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day according to the Scriptures, and that he appeared to Cephas, and then to the Twelve. After that, he appeared to more than five hundred of the brothers and sisters at the same time... Then he appeared to James, then to all the apostles, and last of all he appeared to me also, as to one abnormally born.",
      greek: "Γνωρίζω δὲ ὑμῖν, ἀδελφοί, τὸ εὐαγγέλιον ὃ εὐηγγελισάμην ὑμῖν... παρέδωκα γὰρ ὑμῖν ἐν πρώτοις ὃ καὶ παρέλαβον, ὅτι Χριστὸς ἀπέθανεν ὑπὲρ τῶν ἁμαρτιῶν ἡμῶν κατὰ τὰς γραφάς, καὶ ὅτι ἐτάφη, καὶ ὅτι ἐγήγερται τῇ τρίτῃ ἡμέρᾳ κατὰ τὰς γραφάς, καὶ ὅτι ὤφθη Κηφᾷ, εἶτα τοῖς δώδεκα...",
      jst: "Moreover, brethren, I declare unto you the gospel which I preached unto you... For I delivered unto you first of all that which I also received, how that Christ died for our sins according to the scriptures; And that he was buried, and that he rose again the third day according to the scriptures: And that he was seen of Cephas, then of the twelve: After that, he was seen of above five hundred brethren at once... After that, he was seen of James; then of all the apostles. And last of all he was seen of me also, as of one born out of due time."
    },
    "1 Corinthians 15:20-22": {
      kjv: "But now is Christ risen from the dead, and become the firstfruits of them that slept. For since by man came death, by man came also the resurrection of the dead. For as in Adam all die, even so in Christ shall all be made alive.",
      niv: "But Christ has indeed been raised from the dead, the firstfruits of those who have fallen asleep. For since death came through a man, the resurrection of the dead comes also through a man. For as in Adam all die, so in Christ all will be made alive.",
      greek: "Νυνὶ δὲ Χριστὸς ἐγήγερται ἐκ νεκρῶν, ἀπαρχὴ τῶν κεκοιμημένων ἐγένετο. ἐπειδὴ γὰρ δι᾽ ἀνθρώπου ὁ θάνατος, καὶ δι᾽ ἀνθρώπου ἀνάστασις νεκρῶν. ὥσπερ γὰρ ἐν τῷ Ἀδὰμ πάντες ἀποθνήσκουσιν, οὕτως καὶ ἐν τῷ Χριστῷ πάντες ζῳοποιηθήσονται.",
      jst: "But now is Christ risen from the dead, and become the firstfruits of them that slept. For since by man came death, by man came also the resurrection of the dead. For as in Adam all die, even so in Christ shall all be made alive."
    },
    "2 Corinthians 1:1-4": {
      kjv: "Paul, an apostle of Jesus Christ by the will of God, and Timothy our brother, unto the church of God which is at Corinth, with all the saints which are in all Achaia: Grace be to you and peace from God our Father, and from the Lord Jesus Christ. Blessed be God, even the Father of our Lord Jesus Christ, the Father of mercies, and the God of all comfort; Who comforteth us in all our tribulation, that we may be able to comfort them which are in any trouble, by the comfort wherewith we ourselves are comforted of God.",
      niv: "Paul, an apostle of Christ Jesus by the will of God, and Timothy our brother, To the church of God in Corinth, together with all his holy people throughout Achaia: Grace and peace to you from God our Father and the Lord Jesus Christ. Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort, who comforts us in all our troubles, so that we can comfort those in any trouble with the comfort we ourselves receive from God.",
      greek: "Παῦλος ἀπόστολος Ἰησοῦ Χριστοῦ διὰ θελήματος θεοῦ, καὶ Τιμόθεος ὁ ἀδελφός, τῇ ἐκκλησίᾳ τοῦ θεοῦ τῇ οὔσῃ ἐν Κορίνθῳ, σὺν τοῖς ἁγίοις πᾶσιν τοῖς οὖσιν ἐν ὅλῃ τῇ Ἀχαΐᾳ... Εὐλογητὸς ὁ θεὸς καὶ πατὴρ τοῦ κυρίου ἡμῶν Ἰησοῦ Χριστοῦ, ὁ πατὴρ τῶν οἰκτιρμῶν καὶ θεὸς πάσης παρακλήσεως...",
      jst: "Paul, an apostle of Jesus Christ by the will of God, and Timothy our brother, unto the church of God which is at Corinth, with all the saints which are in all Achaia: Grace be to you and peace from God our Father, and from the Lord Jesus Christ. Blessed be God, even the Father of our Lord Jesus Christ, the Father of mercies, and the God of all comfort; Who comforteth us in all our tribulation, that we may be able to comfort them which are in any trouble, by the comfort wherewith we ourselves are comforted of God."
    },
    "Romans 16:1-2": {
      kjv: "I commend unto you Phebe our sister, which is a servant of the church which is at Cenchrea: That ye receive her in the Lord, as becometh saints, and that ye assist her in whatsoever business she hath need of you: for she hath been a succourer of many, and of myself also.",
      niv: "I commend to you our sister Phoebe, a deacon of the church in Cenchreae. I ask you to receive her in the Lord in a way worthy of his people and to give her any help she may need from you, for she has been the benefactor of many people, including me.",
      greek: "Συνίστημι δὲ ὑμῖν Φοίβην τὴν ἀδελφὴν ἡμῶν, οὖσαν διάκονον τῆς ἐκκλησίας τῆς ἐν Κεγχρεαῖς, ἵνα αὐτὴν προσδέξησθε ἐν κυρίῳ ἀξίως τῶν ἁγίων... καὶ γὰρ αὐτὴ προστάτις πολλῶν ἐγενήθη καὶ ἐμοῦ αὐτοῦ.",
      jst: "I commend unto you Phebe our sister, which is a servant of the church which is at Cenchrea: That ye receive her in the Lord, as becometh saints, and that ye assist her in whatsoever business she hath need of you: for she hath been a succourer of many, and of myself also."
    },
    "Romans 16:21-23": {
      kjv: "Timotheus my workfellow, and Lucius, and Jason, and Sosipater, my kinsmen, salute you. I Tertius, who wrote this epistle, salute you in the Lord. Gaius mine host, and of the whole church, saluteth you. Erastus the chamberlain of the city saluteth you, and Quartus a brother.",
      niv: "Timothy, my co-worker, sends his greetings to you, as do Lucius, Jason and Sosipater, my fellow Jews. I, Tertius, who wrote down this letter, greet you in the Lord. Gaius, whose hospitality I and the whole church here enjoy, sends you his greetings. Erastus, who is the city's director of public works, and our brother Quartus send you their greetings.",
      greek: "Ἀσπάζεται ὑμᾶς Τιμόθεος ὁ συνεργός μου, καὶ Λούκιος καὶ Ἰάσων καὶ Σωσίπατρος οἱ συγγενεῖς μου. ἀσπάζομαι ὑμᾶς ἐγὼ Τέρτιος ὁ γράψας τὴν ἐπιστολὴν ἐν κυρίῳ. ἀσπάζεται ὑμᾶς Γάϊος ὁ ξένος μου καὶ τῆς ἐκκλησίας ὅλης. ἀσπάζεται ὑμᾶς Ἔραστος ὁ οἰκονόμος τῆς πόλεως, καὶ Κούαρτος ὁ ἀδελφός.",
      jst: "Timotheus my workfellow, and Lucius, and Jason, and Sosipater, my kinsmen, salute you. I Tertius, who wrote this epistle, salute you in the Lord. Gaius mine host, and of the whole church, saluteth you. Erastus the chamberlain of the city saluteth you, and Quartus a brother."
    },
    "Romans 1:16": {
      kjv: "For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth; to the Jew first, and also to the Greek.",
      niv: "For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes: first to the Jew, then to the Gentile.",
      greek: "Οὐ γὰρ ἐπαισχύνομαι τὸ εὐαγγέλιον τοῦ Χριστοῦ, δύναμις γὰρ θεοῦ ἐστιν εἰς σωτηρίαν παντὶ τῷ πιστεύοντι...",
      jst: "For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth; to the Jew first, and also to the Greek."
    }
  },

  /**
   * Helper to modernize KJV text into 7th/8th grade Easy-to-Read Plain English (NIV Style)
   */
  modernizeToPlainEnglish(kjvText) {
    if (!kjvText) return "";
    let t = kjvText;

    // Pronouns & Archaic contractions
    t = t.replace(/\bthou shalt\b/gi, "you will");
    t = t.replace(/\bthou wilt\b/gi, "you will");
    t = t.replace(/\bthou art\b/gi, "you are");
    t = t.replace(/\bthou hast\b/gi, "you have");
    t = t.replace(/\bthou hadst\b/gi, "you had");
    t = t.replace(/\bthou didst\b/gi, "you did");
    t = t.replace(/\bthou canst\b/gi, "you can");
    t = t.replace(/\bthou knowest\b/gi, "you know");
    t = t.replace(/\bthou seest\b/gi, "you see");
    t = t.replace(/\bthou\b/gi, "you");
    t = t.replace(/\bthee\b/gi, "you");
    t = t.replace(/\bthine own\b/gi, "your own");
    t = t.replace(/\bthy\b/gi, "your");
    t = t.replace(/\bthine\b/gi, "yours");
    t = t.replace(/\bye\b/gi, "you");

    // Common King James verbs & prepositions
    t = t.replace(/\bsaith\b/gi, "said");
    t = t.replace(/\bhath\b/gi, "has");
    t = t.replace(/\bdoth\b/gi, "does");
    t = t.replace(/\bdoeth\b/gi, "does");
    t = t.replace(/\bunto\b/gi, "to");
    t = t.replace(/\bwherefore\b/gi, "therefore");
    t = t.replace(/\bwhence\b/gi, "where");
    t = t.replace(/\bhither\b/gi, "here");
    t = t.replace(/\bthither\b/gi, "there");
    t = t.replace(/\btarry\b/gi, "stay");
    t = t.replace(/\bstraightway\b/gi, "immediately");
    t = t.replace(/\bforthwith\b/gi, "at once");
    t = t.replace(/\bwist not\b/gi, "did not know");
    t = t.replace(/\bwist\b/gi, "knew");
    t = t.replace(/\bwot\b/gi, "know");
    t = t.replace(/\bverily, verily\b/gi, "truly, truly");
    t = t.replace(/\bverily\b/gi, "truly");
    t = t.replace(/\bbehold\b/gi, "look");
    t = t.replace(/\blo\b/gi, "look");
    t = t.replace(/\bhearken\b/gi, "listen");
    t = t.replace(/\bperadventure\b/gi, "perhaps");
    t = t.replace(/\blike as\b/gi, "just as");
    t = t.replace(/\beven as\b/gi, "just as");
    t = t.replace(/\bforasmuch as\b/gi, "since");
    t = t.replace(/\binasmuch as\b/gi, "since");
    t = t.replace(/\bwhosoever\b/gi, "whoever");
    t = t.replace(/\bwhatsoever\b/gi, "whatever");
    t = t.replace(/\bhowbeit\b/gi, "however");
    t = t.replace(/\bwherewithal\b/gi, "with what");
    t = t.replace(/\bbrethren\b/gi, "brothers and sisters");
    t = t.replace(/\braiment\b/gi, "clothes");
    t = t.replace(/\bvessel\b/gi, "jar");
    t = t.replace(/\bsup\b/gi, "eat");
    t = t.replace(/\bsuffered\b/gi, "allowed");
    t = t.replace(/\bsuffer\b/gi, "allow");
    t = t.replace(/\bforbad\b/gi, "stopped");
    t = t.replace(/\bdwelled\b/gi, "lived");
    t = t.replace(/\bdwelt\b/gi, "lived");
    t = t.replace(/\bshew\b/gi, "show");
    t = t.replace(/\bshewed\b/gi, "showed");
    t = t.replace(/\bdevils\b/gi, "demons");
    t = t.replace(/\bdevil\b/gi, "demon");
    t = t.replace(/\bis come\b/gi, "has come");
    t = t.replace(/\bare come\b/gi, "have come");
    t = t.replace(/\bwas come\b/gi, "had come");
    t = t.replace(/\bwere come\b/gi, "had come");

    // Regular archaic verb suffixes (-eth -> -s)
    const ethVerbs = [
      ["cometh", "comes"], ["goeth", "goes"], ["knoweth", "knows"],
      ["heareth", "hears"], ["seeth", "sees"], ["believeth", "believes"],
      ["loveth", "loves"], ["abideth", "remains"], ["liveth", "lives"],
      ["bringeth", "brings"], ["leadeth", "leads"], ["giveth", "gives"],
      ["maketh", "makes"], ["seeketh", "seeks"], ["asketh", "asks"],
      ["dwelleth", "lives"], ["passeth", "passes"], ["ceaseth", "stops"],
      ["teacheth", "teaches"], ["walketh", "walks"], ["standeth", "stands"],
      ["sitteth", "sits"], ["prayeth", "prays"], ["sendeth", "sends"],
      ["casteth", "throws"], ["perisheth", "perishes"]
    ];

    ethVerbs.forEach(([archaic, modern]) => {
      const reg = new RegExp(`\\b${archaic}\\b`, "gi");
      t = t.replace(reg, modern);
    });

    // Clean up double spaces
    t = t.replace(/\s\s+/g, " ").trim();
    return t;
  },

  /**
   * Look up translations for a given scripture reference.
   * Provides KJV, NIV, JST, and Original Greek.
   */
  get(ref, defaultText = "") {
    if (!ref) return null;
    const cleanRef = String(ref).trim().replace(/[\u2013\u2014]/g, "-");

    // Check exact match
    if (this.db[cleanRef]) {
      return { ...this.db[cleanRef], ref: cleanRef };
    }

    // Check key normalization (e.g. ignoring en-dash, whitespace)
    const normalizeKey = (k) => k.replace(/[\u2013\u2014\s]/g, "-").toLowerCase();
    const cleanNorm = normalizeKey(cleanRef);
    const matchedKey = Object.keys(this.db).find(k => normalizeKey(k) === cleanNorm);
    if (matchedKey) {
      return { ...this.db[matchedKey], ref: cleanRef };
    }

    // Check partial / substring match
    const foundKey = Object.keys(this.db).find(k => cleanRef.includes(k) || k.includes(cleanRef));
    if (foundKey) {
      return { ...this.db[foundKey], ref: cleanRef };
    }

    // Generate faithful easy-to-read modern English (7th/8th grade) from KJV text
    const kjvText = defaultText || `The scripture passage ${cleanRef} recorded in the New Testament.`;
    const modernNivText = this.modernizeToPlainEnglish(kjvText);

    return {
      ref: cleanRef,
      kjv: kjvText,
      niv: modernNivText,
      jst: kjvText,
      greek: `[Original Koine Greek Textus Receptus passage for ${cleanRef} — Refer to Novum Testamentum Graece]`
    };
  }
};

if (typeof window !== "undefined") {
  window.SCRIPTURE_TRANSLATIONS = SCRIPTURE_TRANSLATIONS;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = SCRIPTURE_TRANSLATIONS;
}
