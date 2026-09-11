/**
 * Scripture Translations Engine
 * Provides multi-version translations for New Testament passages:
 * - KJV (King James Version - Default)
 * - NIV (New International Version • 7th/8th Grade Easy-to-Read Modern English)
 * - Greek (Koine Greek / Textus Receptus)
 * - Hebrew (Delitzsch New Testament / Biblical Hebrew)
 */

const SCRIPTURE_TRANSLATIONS = {
  db: {
    // --- FOUNDATIONAL & WELCOME VERSES ---
    "John 1:1": {
      kjv: "In the beginning was the Word, and the Word was with God, and the Word was God.",
      niv: "In the beginning was the Word, and the Word was with God, and the Word was God.",
      greek: "Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος.",
      hebrew: "בְּרֵאשִׁית הָיָה הַדָּבָר וְהַדָּבָר הָיָה אֵת הָאֱלֹהִים וֵאלֹהִים הָיָה הַדָּבָר׃"
    },
    "John 1:1, 14": {
      kjv: "In the beginning was the Word, and the Word was with God, and the Word was God... And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.",
      niv: "In the beginning was the Word, and the Word was with God, and the Word was God... The Word became human and made his home among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.",
      greek: "Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος... Καὶ ὁ λόγος σὰρξ ἐγένετο καὶ ἐσκήνωσεν ἐν ἡμῖν, καὶ ἐθεασάμεθα τὴν δόξαν αὐτοῦ, δόξαν ὡς μονογενοῦς παρὰ πατρός, πλήρης χάριτος καὶ ἀληθείας.",
      hebrew: "בְּרֵאשִׁית הָיָה הַדָּבָר וְהַדָּבָר הָיָה אֵת הָאֱלֹהִים וֵאלֹהִים הָיָה הַדָּבָר׃... וְהַדָּבָר נִהְיָה לְבָשָׂר וַיִּשְׁכֹּן בְּתוֹכֵנוּ וַנֶּחֱזֶה כְבוֹדוֹ כִּכְבוֹד בֵּן יָחִיד לְאָבִיו מָלֵא חֶסֶד וֶאֱמֶת׃"
    },
    "John 3:16": {
      kjv: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      niv: "For God so loved the world that he gave his one and only Son, so that everyone who believes in him will not die but have eternal life.",
      greek: "Οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον, ὥστε τὸν υἱὸν τὸν μονογενῆ ἔδωκεν, ἵνα πᾶς ὁ πιστεύων εἰς αὐτὸν μὴ ἀπόληται ἀλλ᾽ ἔχῃ ζωὴν αἰώνιον.",
      hebrew: "כִּי־כֵן אָהַב הָאֱלֹהִים אֶת־הָעוֹלָם עַד־אֲשֶׁר נָתַן אֶת־בְּנוֹ יְחִידוֹ לְמַעַן לֹא־יֹאבַד כָּל־הַמַּאֲמִין בּוֹ כִּי אִם־יִחְיֶה חַיֵּי עוֹלָם׃"
    },
    "Luke 2:10-11": {
      kjv: "And the angel said unto them, Fear not: for, behold, I bring you good tidings of great joy, which shall be to all people. For unto you is born this day in the city of David a Saviour, which is Christ the Lord.",
      niv: "The angel said to them, 'Do not be afraid. I bring you good news that will bring great joy to all people. Today in David's town a Savior has been born for you; he is the Messiah, the Lord!'",
      greek: "Καὶ εἶπεν αὐτοῖς ὁ ἄγγελος, Μὴ φοβεῖσθε· ἰδοὺ γάρ, εὐαγγελίζομαι ὑμῖν χαρὰν μεγάλην, ἥτις ἔσται παντὶ τῷ λαῷ, ὅτι ἐτέχθη ὑμῖν σήμερον σωτήρ, ὅς ἐστιν Χριστὸς κύριος, ἐν πόλει Δαυίδ.",
      hebrew: "וַיֹּאמֶר אֲלֵיהֶם הַמַּלְאָךְ אַל־תִּירָאוּ כִּי הִנְנִי מְבַשֵּׂר אֶתְכֶם שִׂמְחָה גְדוֹלָה אֲשֶׁר תִּהְיֶה לְכָל־הָעָם׃ כִּי הַיּוֹם יֻלַּד לָכֶם בְּעִיר דָּוִד מוֹשִׁיעַ אֲשֶׁר הוּא הַמָּשִׁיחַ הָאָדוֹן׃"
    },
    "Matthew 28:19-20": {
      kjv: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.",
      niv: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And remember: I am with you always, to the very end of the age.",
      greek: "Πορευθέντες οὖν μαθητεύσατε πάντα τὰ ἔθνη, βαπτίζοντες αὐτοὺς εἰς τὸ ὄνομα τοῦ πατρὸς καὶ τοῦ υἱοῦ καὶ τοῦ ἁγίου πνεύματος...",
      hebrew: "לְכוּ וְעָשׂוּ לְתַלְמִידִים אֶת־כָּל־הַגּוֹיִם וּטְבַלְתֶּם אֹתָם לְשֵׁם הָאָב וְהַבֵּן וְרוּחַ הַקֹּדֶשׁ..."
    },
    "Acts 1:8": {
      kjv: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.",
      niv: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.",
      greek: "Ἀλλὰ λήμψεσθε δύναμιν ἐπελθόντος τοῦ ἁγίου πνεύματος ἐφ᾽ ὑμᾶς, καὶ ἔσεσθέ μου μάρτυρες...",
      hebrew: "אֲבָל תִּשְׂאוּ גְבוּרָה בְּבוֹא עֲלֵיכֶם רוּחַ הַקֹּדֶשׁ וִהְיִיתֶם עֵדַי בִּירוּשָׁלַיִם..."
    },
    "2 Timothy 3:16-17": {
      kjv: "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of God may be perfect, thoroughly furnished unto all good works.",
      niv: "All Scripture is inspired by God and is useful for teaching, helping, correcting, and training us to do what is right, so that God's people may be completely prepared to do every good work.",
      greek: "Πᾶσα γραφὴ θεόπνευστος καὶ ὠφέλιμος πρὸς διδασκαλίαν...",
      hebrew: "כָּל־הַכָּתוּב נִכְתַּב בְּרוּחַ אֱלֹהִים וּמוֹעִיל לְהוֹרוֹת..."
    },

    // --- SECOND TEMPLE & JERUSALEM LANDMARKS ---
    "Matthew 24:1-2": {
      kjv: "And Jesus went out, and departed from the temple: and his disciples came to him for to shew him the buildings of the temple. And Jesus said unto them, See ye not all these things? verily I say unto you, There shall not be left here one stone upon another, that shall not be thrown down.",
      niv: "Jesus left the temple and was walking away when his disciples came up to him to point out the temple buildings. 'Do you see all these buildings?' he asked. 'Truly I tell you, not one stone here will be left on top of another; every single one will be thrown down.'",
      greek: "Καὶ ἐξελθὼν ὁ Ἰησοῦς ἀπὸ τοῦ ἱεροῦ ἐπορεύετο, καὶ προσῆλθον οἱ μαθηταὶ αὐτοῦ ἐπιδεῖξαι αὐτῷ τὰς οἰκοδομὰς τοῦ ἱεροῦ...",
      hebrew: "וַיֵּצֵא יֵשׁוּעַ מִן־הַמִּקְדָּשׁ וַיֵּלֶךְ לוֹ וַיִּגְּשׁוּ אֵלָיו תַּלְמִידָיו לְהַרְאוֹתוֹ אֶת־בִּנְיָנֵי הַמִּקְדָּשׁ׃ וַיַּעַן וַיֹּאמֶר אֲלֵיהֶם הֲרֹאִים אַתֶּם אֶת־כָּל־אֵלֶּה אָמֵן אֹמֵר אֲנִי לָכֶם לֹא־תִשָּׁאֵר פֹּה אֶבֶן עַל־אֶבֶן אֲשֶׁר לֹא תֵהָרֵס׃"
    },
    "Luke 2:46-49": {
      kjv: "After three days they found him in the temple, sitting in the midst of the doctors, both hearing them, and asking them questions... And he said unto them, How is it that ye sought me? wist ye not that I must be about my Father's business?",
      niv: "After three days they found him in the temple courts, sitting among the teachers, listening to them and asking questions... 'Why were you searching for me?' he asked. 'Didn't you know I had to be in my Father's house?'",
      greek: "Καὶ ἐγένετο μετὰ ἡμέρας τρεῖς εὗρον αὐτὸν ἐν τῷ ἱερῷ καθεζόμενον ἐν μέσῳ τῶν διδασκάλων...",
      hebrew: "וַיְהִי מִקֵּץ שְׁלֹשֶׁת יָמִים וַיִּמְצָאֻהוּ בַּמִּקְדָּשׁ יוֹשֵׁב בְּתוֹךְ הַמּוֹרִים וְשֹׁמֵעַ אֲלֵיהֶם וְשֹׁאֵל אֹתָם..."
    },
    "John 2:19-21": {
      kjv: "Jesus answered and said unto them, Destroy this temple, and in three days I will raise it up... But he spake of the temple of his body.",
      niv: "Jesus answered them, 'Destroy this temple, and I will raise it up in three days.'... But the temple he was talking about was his own body.",
      greek: "Ἀπεκρίθη Ἰησοῦς καὶ εἶπεν αὐτοῖς, Λύσατε τὸν ναὸν τοῦτον, καὶ ἐν τρισὶν ἡμέραις ἐγερῶ αὐτόν... Ἐκεῖνος δὲ ἔλεγεν περὶ τοῦ ναοῦ τοῦ σώματος αὐτοῦ.",
      hebrew: "וַיַּעַן יֵשׁוּעַ וַיֹּאמֶר אֲלֵיהֶם סִתְרוּ אֶת־הַהֵיכָל הַזֶּה וּבִשְׁלֹשֶׁת יָמִים אֲקִימֶנּוּ... וְהוּא דִּבֶּר עַל־הֵיכַל גְּוִיָּתוֹ׃"
    },
    "Matthew 21:12-14": {
      kjv: "And Jesus went into the temple of God, and cast out all them that sold and bought in the temple, and overthrew the tables of the moneychangers, and the seats of them that sold doves, And said unto them, It is written, My house shall be called the house of prayer; but ye have made it a den of thieves.",
      niv: "Jesus entered the temple courts and drove out everyone who was buying and selling there. He flipped over the tables of the money changers and the benches of those selling doves. 'It is written,' he said, 'My house will be called a house of prayer, but you are turning it into a hideout for robbers!'",
      greek: "Καὶ εἰσῆλθεν ὁ Ἰησοῦς εἰς τὸ ἱερὸν τοῦ θεοῦ, καὶ ἐξέβαλεν πάντας τοὺς πωλοῦντας καὶ ἀγοράζοντας ἐν τῷ ἱερῷ...",
      hebrew: "וַיָּבֹא יֵשׁוּעַ אֶל־בֵּית הַמִּקְדָּשׁ וַיְגָרֶשׁ אֶת־כָּל־הַמּוֹכְרִים וְהַקּוֹנִים בַּמִּקְדָּשׁ..."
    },
    "John 5:1-9": {
      kjv: "Now there is at Jerusalem by the sheep market a pool, which is called in the Hebrew tongue Bethesda, having five porches... Jesus saith unto him, Rise, take up thy bed, and walk. And immediately the man was made whole, and took up his bed, and walked.",
      niv: "In Jerusalem near the Sheep Gate there is a pool surrounded by five covered porches, called Bethesda in Aramaic... Jesus said to him, 'Get up! Pick up your mat and walk.' Instantly the man was healed; he picked up his mat and began to walk!",
      greek: "Ἔστιν δὲ ἐν τοῖς Ἱεροσολύμοις ἐπὶ τῇ προβατικῇ κολυμβήθρα ἡ ἐπιλεγομένη Ἑβραϊστὶ Βηθεσδά, πέντε στοὰς ἔχουσα...",
      hebrew: "וּבִירוּשָׁלַיִם בְּרֵכָה קְרוֹבָה לְשַׁעַר הַצֹּאן וּשְׁמָהּ בִּלְשׁוֹן עִבְרִית בֵּית חַסְדָּא וְלָהּ חֲמֵשֶׁת אוּלַמִּים..."
    },
    "John 9:1-7": {
      kjv: "As Jesus passed by, he saw a man which was blind from his birth... He spat on the ground, and made clay of the spittle, and he anointed the eyes of the blind man with the clay, And said unto him, Go, wash in the pool of Siloam... He went his way therefore, and washed, and came seeing.",
      niv: "As Jesus walked along, he saw a man who had been blind from birth... He spit on the ground, made mud with his saliva, and spread it over the blind man's eyes. 'Go,' he told him, 'wash in the Pool of Siloam.' So the man went and washed, and he came back able to see!",
      greek: "Καὶ παράγων εἶδεν ἄνθρωπον τυφλὸν ἐκ γενετῆς... ἔπτυσεν χαμαὶ καὶ ἐποίησεν πηλὸν ἐκ τοῦ πτύσματος...",
      hebrew: "וַיְהִי בְּעָבְרוֹ וַיַּרְא אִישׁ וְהוּא עִוֵּר מִמְּעֵי אִמּוֹ... וַיָּרָק עַל־הָאָרֶץ וַיַּעַשׂ טִיט מִן־הָרֹק וַיִּמְרַח אֶת־הַטִּיט עַל־עֵינֵי הַעִוֵּר׃"
    },
    "Luke 13:34": {
      kjv: "O Jerusalem, Jerusalem, which killest the prophets, and stonest them that are sent unto thee; how often would I have gathered thy children together, as a hen doth gather her brood under her wings, and ye would not!",
      niv: "Jerusalem, Jerusalem, you who kill the prophets and stone those sent to you, how often I have longed to gather your children together, like a hen gathers her chicks under her wings, and you refused!",
      greek: "Ἱερουσαλὴμ Ἱερουσαλήμ, ἡ ἀποκτείνουσα τοὺς προφήτας καὶ λιθοβολοῦσα τοὺς ἀπεσταλμένους πρὸς αὐτήν...",
      hebrew: "יְרוּשָׁלַיִם יְרוּשָׁלַיִם הַהֹרֶגֶת אֶת־הַנְּבִיאִים וְסוֹקֶלֶת אֶת־הַשְּׁלוּחִים אֵלֶיהָ..."
    },
    "Acts 2:1-4": {
      kjv: "And when the day of Pentecost was fully come, they were all with one accord in one place... And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance.",
      niv: "When the day of Pentecost arrived, all the believers were gathered together in one place... All of them were filled with the Holy Spirit and began to speak in different languages as the Spirit gave them the ability.",
      greek: "Καὶ ἐν τῷ συμπληροῦσθαι τὴν ἡμέραν τῆς πεντηκοστῆς ἦσαν πάντες ὁμοθυμαδὸν ἐπὶ τὸ αὐτό...",
      hebrew: "וּבִמְלֹאת יְמֵי חַג הַשָּׁבֻעוֹת הָיוּ כֻלָּם לֵב אֶחָד בְּמָקוֹם אֶחָד׃..."
    },

    // --- CAPERNAUM & GALILEE ---
    "Matthew 4:13-17": {
      kjv: "And leaving Nazareth, he came and dwelt in Capernaum, which is upon the sea coast... From that time Jesus began to preach, and to say, Repent: for the kingdom of heaven is at hand.",
      niv: "Jesus left Nazareth and went to live in Capernaum, a lakeside town... From that time on, Jesus began to preach, 'Turn away from your sins, because the kingdom of heaven is near!'",
      greek: "Καὶ καταλιπὼν τὴν Ναζαρὲτ ἐλθὼν κατῴκησεν εἰς Καφαρναοὺμ τὴν παραθαλασσίαν...",
      hebrew: "וַיַּעֲזֹב אֶת־נְצֶרֶת וַיָּבֹא וַיֵּשֶׁב בִּכְפַר־נַחוּם אֲשֶׁר עַל־שְׂפַת הַיָּם..."
    },
    "Mark 2:1-5": {
      kjv: "And again he entered into Capernaum after some days... they uncovered the roof where he was: and when they had broken it up, they let down the bed wherein the sick of the palsy lay.",
      niv: "A few days later Jesus returned to Capernaum... Since they could not get through the crowd to Jesus, they dug through the roof above him and lowered the mat with the paralyzed man on it.",
      greek: "Καὶ εἰσελθὼν πάλιν εἰς Καφαρναοὺμ δι᾽ ἡμερῶν ἠκούσθη ὅτι εἰς οἶκόν ἐστιν...",
      hebrew: "וַיָּבֹא עוֹד אֶל־כְּפַר־נַחוּם מִקֵּץ יָמִים..."
    },
    "John 6:24-35": {
      kjv: "They also took shipping, and came to Capernaum, seeking for Jesus... And Jesus said unto them, I am the bread of life: he that cometh to me shall never hunger; and he that believeth on me shall never thirst.",
      niv: "The crowd got into boats and went across to Capernaum searching for Jesus... Then Jesus told them, 'I am the bread of life. Whoever comes to me will never be hungry, and whoever believes in me will never be thirsty.'",
      greek: "Ἐνέβησαν αὐτοὶ εἰς τὰ πλοῖα καὶ ἦλθον εἰς Καφαρναοὺμ ζητοῦντες τὸν Ἰησοῦν...",
      hebrew: "יָרְדוּ בָאֳנִיּוֹת וַיָּבֹאוּ אֶל־כְּפַר־נַחוּם לְבַקֵּשׁ אֶת־יֵשׁוּעַ..."
    },
    "John 6:35": {
      kjv: "And Jesus said unto them, I am the bread of life: he that cometh to me shall never hunger; and he that believeth on me shall never thirst.",
      niv: "Then Jesus declared, 'I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty.'",
      greek: "Εἶπεν δὲ αὐτοῖς ὁ Ἰησοῦς, Ἐγώ εἰμι ὁ ἄρτος τῆς ζωῆς· ὁ ἐρχόμενος πρὸς ἐμὲ οὐ μὴ πεινάσῃ, καὶ ὁ πιστεύων εἰς ἐμὲ οὐ μὴ διψήσει πώποτε.",
      hebrew: "וַיֹּאמֶר אֲלֵיהֶם יֵשׁוּעַ אָנֹכִי הוּא לֶחֶם הַחַיִּים הַבָּא אֵלַי לֹא יִרְעַב וְהַמַּאֲמִין בִּי לֹא יִצְמָא עוֹד׃"
    },
    "Matthew 4:18-20": {
      kjv: "And Jesus, walking by the sea of Galilee, saw two brethren, Simon called Peter, and Andrew his brother, casting a net into the sea: for they were fishers. And he saith unto them, Follow me, and I will make you fishers of men.",
      niv: "As Jesus walked beside the Sea of Galilee, he saw two brothers, Simon called Peter and his brother Andrew. They were throwing a net into the lake, because they were fishermen. 'Come, follow me,' Jesus told them, 'and I will send you out to fish for people!'",
      greek: "Περιπατῶν δὲ παρὰ τὴν θάλασσαν τῆς Γαλιλαίας εἶδεν δύο ἀδελφούς...",
      hebrew: "וַיְהִי בְּהִתְהַלֵּךְ יֵשׁוּעַ עַל־יַד יָם הַגָּלִיל וַיַּרְא שְׁנֵי אַחִים..."
    },
    "Mark 4:39": {
      kjv: "And he arose, and rebuked the wind, and said unto the sea, Peace, be still. And the wind ceased, and there was a great calm.",
      niv: "Jesus got up, commanded the wind, and said to the sea, 'Quiet! Be still!' Then the wind stopped blowing, and it was completely calm.",
      greek: "Καὶ διεγερθεὶς ἐπετίμησεν τῷ ἀνέμῳ καὶ εἶπεν τῇ θαλάσσῃ, Σιώπα, πεφίμωσο...",
      hebrew: "וַיָּקָם וַיִּגְעַר בָּרוּחַ וַיֹּאמֶר אֶל־הַיָּם הַס פָּקַע..."
    },
    "Matthew 14:27-31": {
      kjv: "But straightway Jesus spake unto them, saying, Be of good cheer; it is I; be not afraid. And Peter answered him and said, Lord, if it be thou, bid me come unto thee on the water. And he said, Come... But when he saw the wind boisterous, he was afraid; and beginning to sink, he cried, saying, Lord, save me.",
      niv: "Right away Jesus spoke to them: 'Take courage! It is I. Don't be afraid.' 'Lord, if it's really you,' Peter answered, 'tell me to come to you on the water.' 'Come,' Jesus said... But when Peter noticed the strong wind, he panicked. Beginning to sink, he screamed, 'Lord, save me!'",
      greek: "Εὐθέως δὲ ἐλάλησεν ὁ Ἰησοῦς αὐτοῖς λέγων, Θαρσεῖτε, ἐγώ εἰμι· μὴ φοβεῖσθε...",
      hebrew: "וַיְדַבֵּר אֲלֵיהֶם יֵשׁוּעַ מַהֵר וַיֹּאמַר חִזְקוּ כִּי אֲנִי הוּא אַל־תִּירָאוּ׃"
    },

    // --- RIVER JORDAN ---
    "Matthew 3:13-17": {
      kjv: "Then cometh Jesus from Galilee to Jordan unto John, to be baptized of him. But John forbad him, saying, I have need to be baptized of thee, and comest thou to me? And Jesus answering said unto him, Suffer it to be so now: for thus it becometh us to fulfil all righteousness.",
      niv: "Then Jesus traveled from Galilee to the Jordan River so John could baptize him. But John tried to stop him: 'I am the one who needs you to baptize me, so why are you coming to me?' Jesus replied, 'Let it happen this way now. This is the right way for us to do everything God requires.'",
      greek: "Τότε παραγίνεται ὁ Ἰησοῦς ἀπὸ τῆς Γαλιλαίας ἐπὶ τὸν Ἰορδάνην...",
      hebrew: "אָז בָּא יֵשׁוּעַ מִן־הַגָּלִיל הַיַּרְדֵּנָה אֶל־יוֹחָנָן לְהִטָּבֵל עַל־יָדוֹ..."
    },
    "John 1:28": {
      kjv: "These things were done in Bethabara beyond Jordan, where John was baptizing.",
      niv: "All this took place at Bethany across the Jordan River, where John was baptizing people.",
      greek: "Ταῦτα ἐν Βηθανίᾳ ἐγένετο πέραν τοῦ Ἰορδάνου, ὅπου ἦν ὁ Ἰωάννης βαπτίζων.",
      hebrew: "כָּל־זֹאת הָיְתָה בְּבֵית־עַבְרָה מֵעֵבֶר לַיַּרְדֵּן אֲשֶׁר יוֹחָנָן טֹבֵל שָׁם׃"
    },

    // --- BETHLEHEM & NAZARETH ---
    "Luke 2:4-7": {
      kjv: "And Joseph also went up from Galilee, out of the city of Nazareth, into Judaea, unto the city of David, which is called Bethlehem... And she brought forth her firstborn son, and wrapped him in swaddling clothes, and laid him in a manger.",
      niv: "So Joseph went up from the town of Nazareth in Galilee to Judea, to Bethlehem the town of David... and she gave birth to her firstborn son. She wrapped him in strips of cloth and placed him gently in a feeding trough (manger), because there was no room for them in the inn.",
      greek: "Ἀνέβη δὲ καὶ Ἰωσὴף ἀπὸ τῆς Γαλιλαίας ἐκ πόλεως Ναζαρὲτ εἰς τὴν Ἰουδαίαν...",
      hebrew: "וַיַּעַל גַּם־יוֹסֵף מִן־הַגָּלִיל מֵעִיר נְצֶרֶת לִיהוּדָה אֶל־עִיר דָּוִד..."
    },
    "Matthew 2:1-2": {
      kjv: "Now when Jesus was born in Bethlehem of Judaea in the days of Herod the king, behold, there came wise men from the east to Jerusalem, Saying, Where is he that is born King of the Jews?",
      niv: "Jesus was born in the town of Bethlehem in Judea during the time King Herod ruled. Sometime later, wise scholars from the east arrived in Jerusalem asking, 'Where is the newborn king of the Jews? We saw his star rising in the east and have come to worship him.'",
      greek: "Τοῦ δὲ Ἰησοῦ γεννηθέντος ἐν Βηθλέεμ τῆς Ἰουδαίας ἐν ἡμέραις Ἡρῴδου τοῦ βασιλέως...",
      hebrew: "וַיְהִי כַּאֲשֶׁר נוֹלַד יֵשׁוּעַ בְּבֵית־לֶחֶם יְהוּדָה בִּימֵי הוֹרְדוֹס הַמֶּלֶךְ..."
    },
    "Luke 4:16-21": {
      kjv: "And he came to Nazareth, where he had been brought up: and, as his custom was, he went into the synagogue on the sabbath day, and stood up for to read... This day is this scripture fulfilled in your ears.",
      niv: "Jesus went to Nazareth, the town where he grew up. On the Sabbath day he went into the synagogue as he always did, and stood up to read... 'Today this scripture has come true right in your hearing!'",
      greek: "Καὶ ἦλθεν εἰς Ναζαρά, οὗ ἦν τεθραμμένος...",
      hebrew: "וַיָּבֹא אֶל־נְצֶרֶת אֲשֶׁר גֻּדַּל־שָׁם..."
    },

    // --- GETHSEMANE, CALVARY & RESURRECTION ---
    "Matthew 26:36-39": {
      kjv: "Then cometh Jesus with them unto a place called Gethsemane, and saith unto the disciples, Sit ye here, while I go and pray yonder... O my Father, if it be possible, let this cup pass from me: nevertheless not as I will, but as thou wilt.",
      niv: "Then Jesus went with his disciples to an olive garden called Gethsemane. He told them, 'Sit here while I go over there to pray.'... 'My Father! If it is possible, take this cup of suffering away from me. But do what you want, not what I want.'",
      greek: "Τότε ἔρχεται μετ᾽ αὐτῶν ὁ Ἰησοῦς εἰς χωρίον λεגόμενον Γεθσημανί...",
      hebrew: "אָז בָּא עִמָּהֶם יֵשׁוּעַ אֶל־חֲצַר גַּת־שְׁמָנֵי..."
    },
    "Luke 22:42-44": {
      kjv: "Saying, Father, if thou be willing, remove this cup from me: nevertheless not my will, but thine, be done... And being in an agony he prayed more earnestly: and his sweat was as it were great drops of blood falling down to the ground.",
      niv: "'Father, if you are willing, take this cup of suffering away from me; yet not what I want, but what you want.'... And being in terrible agony, he prayed even harder, and his sweat fell to the ground like huge drops of blood.",
      greek: "Λέγων, Πάτερ, εἰ βούλει παρένεγκε τοῦτο τὸ ποτήριον ἀπ᾽ ἐμοῦ...",
      hebrew: "וַיֹּאמַר אָבִי אִם־תַּחְפֹּץ הַעֲבֶר־נָא מֵעָלַי אֶת־הַכּוֹס הַזֹּאת..."
    },
    "Matthew 28:5-6": {
      kjv: "And the angel answered and said unto the women, Fear not ye: for I know that ye seek Jesus, which was crucified. He is not here: for he is risen, as he said. Come, see the place where the Lord lay.",
      niv: "The angel spoke to the women: 'Don't be afraid! I know you are looking for Jesus, who was crucified. He isn't here! He has been raised from death, just like he promised. Come in and look at the place where he was lying.'",
      greek: "Ἀποκριθεὶς δὲ ὁ ἄγγελος εἶπεν ταῖς γυναιξίν, Μὴ φοβεῖσθε ὑμεῖς...",
      hebrew: "וַיַּעַן הַמַּלְאָךְ וַיֹּאמֶר אֶל־הַנָּשִׁים אַל־תִּירֶאנָה..."
    },
    "Luke 24:5-6": {
      kjv: "Why seek ye the living among the dead? He is not here, but is risen: remember how he spake unto you when he was yet in Galilee.",
      niv: "'Why are you looking in a graveyard for someone who is alive? He isn't here; he has risen! Remember what he told you back when he was still in Galilee.'",
      greek: "Τί ζητεῖτε τὸν ζῶντα μετὰ τῶν νεκρῶν; Οὐκ ἔστιν ὧδε, ἀλλὰ ἠγέρθη...",
      hebrew: "מַה־תְּבַקֵּשְׁנָה אֶת־הַחַי בֵּין הַמֵּתִים׃ אֵינֶנּוּ פֹה כִּי קָם..."
    },
    "John 11:25-26": {
      kjv: "Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live: And whosoever liveth and believeth in me shall never die. Believest thou this?",
      niv: "Jesus said to Martha, 'I am the resurrection and the life. Anyone who believes in me will live on even after dying! And everyone who lives and believes in me will never truly die. Do you believe this?'",
      greek: "Εἶπεν αὐτῇ ὁ Ἰησοῦς, Ἐγώ εἰμι ἡ ἀνάστασις καὶ ἡ ζωή...",
      hebrew: "וַיֹּאמֶר אֵלֶיהָ יֵשׁוּעַ אָנֹכִי הַתְּחִיָּה וְהַחַיִּים..."
    },

    // --- SAMARIA & JERICHO ---
    "John 4:13-14": {
      kjv: "Jesus answered and said unto her, Whosoever drinketh of this water shall thirst again: But whosoever drinketh of the water that I shall give him shall never thirst; but the water that I shall give him shall be in him a well of water springing up into everlasting life.",
      niv: "Jesus answered, 'Anyone who drinks this well water will get thirsty again. But whoever drinks the water I give will never be thirsty again! In fact, the water I give will become an overflowing spring inside them that gives eternal life.'",
      greek: "Ἀπεκρίθη Ἰησοῦς καὶ εἶπεν αὐτῇ, Πᾶς ὁ πίνων ἐκ τοῦ ὕδατος τούτου διψήσει πάλιν...",
      hebrew: "וַיַּעַן יֵשׁוּעַ וַיֹּאמֶר אֵלֶיהָ כָּל־הַשֹּׁתֶה מִן־הַמַּיִם הָאֵלֶּה יִצְמָא עוֹד..."
    },
    "Luke 19:9-10": {
      kjv: "And Jesus said unto him, This day is salvation come to this house... For the Son of man is come to seek and to save that which was lost.",
      niv: "Jesus said to Zacchaeus, 'Today salvation has come to this home... For the Son of Man came to search for and rescue people who are lost.'",
      greek: "Εἶπεν δὲ πρὸς αὐτὸν ὁ Ἰησοῦς ὅτι Σήμερον σωτηρία τῷ οἴκῳ τούτῳ ἐγένετο...",
      hebrew: "וַיֹּאמֶר אֵלָיו יֵשׁוּעַ הַיּוֹם הָיְתָה תְּשׁוּעָה לַבַּיִת הַזֶּה..."
    },
    "Luke 10:30-35": {
      kjv: "A certain man went down from Jerusalem to Jericho, and fell among thieves... But a certain Samaritan, as he journeyed, came where he was: and when he saw him, he had compassion on him.",
      niv: "A man was going down from Jerusalem to Jericho when robbers attacked him... But a Samaritan traveler came along to where the injured man was. When he saw him, he felt deep compassion.",
      greek: "Ἄνθρωπός τις κατέβαινεν ἀπὸ Ἱερουσαλὴμ εἰς Ἰεριχὼ καὶ λῃσταῖς περιέπεσεν...",
      hebrew: "אִישׁ אֶחָד יָרַד מִירוּשָׁלַיִם לִירִיחוֹ וַיִּפֹּל בִּידֵי שׁוֹדְדִים..."
    },

    // --- APOSTOLIC JOURNEYS & EPISTLES ---
    "Acts 9:3-6": {
      kjv: "And as he journeyed, he came near Damascus: and suddenly there shined round about him a light from heaven: And he fell to the earth, and heard a voice saying unto him, Saul, Saul, why persecutest thou me?",
      niv: "As Saul traveled and came near Damascus, suddenly a bright light from heaven flashed all around him! He collapsed to the ground and heard a voice say, 'Saul, Saul, why are you persecuting me?'",
      greek: "Ἐν δὲ τῷ πορεύεσθαι ἐγένετο αὐτὸν ἐγγίζειν τῇ Δαμασκῷ...",
      hebrew: "וַיְהִי הוּא הֹלֵךְ וְקָרַב לְדַמֶּשֶׂק וְהִנֵּה לְפֶתַע פִּתְאֹם נָגַהּ עָלָיו אוֹר מִן־הַשָּׁמָיִם..."
    },
    "Acts 11:26": {
      kjv: "And when he had found him, he brought him unto Antioch. And it came to pass, that a whole year they assembled themselves with the church, and taught much people. And the disciples were called Christians first in Antioch.",
      niv: "When Barnabas found Saul, he brought him to Antioch. For a whole year they met with the church and taught large crowds. The followers of Jesus were first called 'Christians' in Antioch.",
      greek: "Καὶ εὑρὼν ἤγαγεν αὐτὸν εἰς Ἀντιόχειαν...",
      hebrew: "וּכְמָצְאוֹ הֱבִיאוֹ אֶל־אַנְטְיוֹכִיָּה..."
    },
    "1 Corinthians 13:13": {
      kjv: "And now abideth faith, hope, charity, these three; but the greatest of these is charity.",
      niv: "And now these three things continue forever: faith, hope, and love. But the greatest of these is love.",
      greek: "Νυνὶ δὲ μένει πίστις, ἐλπίς, ἀγάπη, τὰ τρία ταῦτα· μείζων δὲ τούτων ἡ ἀγάπη.",
      hebrew: "וְעַתָּה קַיָּמוֹת שְׁלֹשֶׁת אֵלֶּה הָאֱמוּנָה וְהַתִּקְוָה וְהָאַהֲבָה וְהַגְּדוֹלָה שֶׁבָּהֶן הִיא הָאַהֲבָה׃"
    },
    "Romans 1:16": {
      kjv: "For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth; to the Jew first, and also to the Greek.",
      niv: "For I am not ashamed of the good news about Christ! It is God's power to save everyone who trusts in him—first the Jewish people, and also the Gentiles.",
      greek: "Οὐ γὰρ ἐπαισχύνομαι τὸ εὐαγγέλιον τοῦ Χριστοῦ...",
      hebrew: "כִּי אֵינֶנִּי בוֹשׁ מִבְּשׂוֹרַת הַמָּשִׁיחַ..."
    }
  },

  /**
   * Translates 1611 King James Version English into clean, contemporary,
   * easy-to-understand Modern English at a 7th–8th grade reading level.
   */
  modernizeToPlainEnglish(kjvText) {
    if (!kjvText) return "";
    let t = String(kjvText);

    // Common narrative clauses & openings
    t = t.replace(/\band it came to pass, that\b/gi, "and then");
    t = t.replace(/\band it came to pass\b/gi, "and then");
    t = t.replace(/\bit came to pass\b/gi, "it happened");
    t = t.replace(/\band Jesus answered and said unto them\b/gi, "Jesus answered them,");
    t = t.replace(/\bJesus answered and said unto them\b/gi, "Jesus answered them,");
    t = t.replace(/\banswered and said unto\b/gi, "answered");
    t = t.replace(/\band he said unto them\b/gi, "and he said to them,");
    t = t.replace(/\bverily,\s*verily\b/gi, "truly, truly");
    t = t.replace(/\bverily\b/gi, "truly");

    // Inverted questions
    t = t.replace(/\bSee ye not all these things\?/gi, "Do you see all these things?");
    t = t.replace(/\bsee ye not all these things\?/gi, "do you see all these things?");
    t = t.replace(/\bSee ye not\b/gi, "Do you see");
    t = t.replace(/\bsee ye not\b/gi, "do you see");
    t = t.replace(/\bKnow ye not\b/gi, "Don't you know");
    t = t.replace(/\bknow ye not\b/gi, "don't you know");
    t = t.replace(/\bBelievest thou this\?/gi, "Do you believe this?");
    t = t.replace(/\bbelievest thou this\?/gi, "do you believe this?");
    t = t.replace(/\bLovest thou me\?/gi, "Do you love me?");
    t = t.replace(/\blovest thou me\?/gi, "do you love me?");
    t = t.replace(/\bWhy seek ye the living among the dead\?/gi, "Why are you looking for the living among the dead?");
    t = t.replace(/\bwist ye not that\b/gi, "didn't you know that");

    // Prepositional phrases
    t = t.replace(/\bfor to shew him\b/gi, "to show him");
    t = t.replace(/\bfor to shew\b/gi, "to show");
    t = t.replace(/\bfor to see\b/gi, "to see");
    t = t.replace(/\bfor to hear\b/gi, "to hear");
    t = t.replace(/\bfor to do\b/gi, "to do");
    t = t.replace(/\bshew\b/gi, "show");
    t = t.replace(/\bshewed\b/gi, "showed");
    t = t.replace(/\bdeparted from\b/gi, "left");

    // Pronouns
    t = t.replace(/\bthou\b/g, "you");
    t = t.replace(/\bThou\b/g, "You");
    t = t.replace(/\bthee\b/g, "you");
    t = t.replace(/\bThee\b/g, "You");
    t = t.replace(/\bthy\b/g, "your");
    t = t.replace(/\bThy\b/g, "Your");
    t = t.replace(/\bthine\b/g, "yours");
    t = t.replace(/\bThine\b/g, "Yours");
    t = t.replace(/\bye\b/g, "you");
    t = t.replace(/\bYe\b/g, "You");

    // Auxiliary & archaic verb forms
    t = t.replace(/\bhath\b/gi, "has");
    t = t.replace(/\bdoth\b/gi, "does");
    t = t.replace(/\bart\b/gi, "are");
    t = t.replace(/\bwilt\b/gi, "will");
    t = t.replace(/\bshalt\b/gi, "will");
    t = t.replace(/\bwast\b/gi, "were");
    t = t.replace(/\bdidst\b/gi, "did");
    t = t.replace(/\bhadst\b/gi, "had");
    t = t.replace(/\bcanst\b/gi, "can");
    t = t.replace(/\bwouldest\b/gi, "would");
    t = t.replace(/\bsaith\b/gi, "says");
    t = t.replace(/\bspake\b/gi, "spoke");
    t = t.replace(/\bbehold\b/gi, "look");
    t = t.replace(/\bBehold\b/gi, "Look");
    t = t.replace(/\blo\b/gi, "see");
    t = t.replace(/\bhearken\b/gi, "listen");
    t = t.replace(/\bunto\b/gi, "to");
    t = t.replace(/\bupon\b/gi, "on");

    // Vocabulary & idioms
    t = t.replace(/\bwhosoever\b/gi, "whoever");
    t = t.replace(/\bwhatsoever\b/gi, "whatever");
    t = t.replace(/\bstraightway\b/gi, "immediately");
    t = t.replace(/\banon\b/gi, "right away");
    t = t.replace(/\bthence\b/gi, "from there");
    t = t.replace(/\bthither\b/gi, "there");
    t = t.replace(/\bwhence\b/gi, "where");
    t = t.replace(/\bwhither\b/gi, "where");
    t = t.replace(/\bhowbeit\b/gi, "however");
    t = t.replace(/\bperadventure\b/gi, "perhaps");
    t = t.replace(/\bwot\b/gi, "know");
    t = t.replace(/\bwist\b/gi, "knew");
    t = t.replace(/\bprivily\b/gi, "secretly");
    t = t.replace(/\blest\b/gi, "so that ... not");
    t = t.replace(/\bbrethren\b/gi, "brothers and sisters");
    t = t.replace(/\bmultitude\b/gi, "crowd");
    t = t.replace(/\bmultitudes\b/gi, "crowds");
    t = t.replace(/\bsick of the palsy\b/gi, "paralyzed");
    t = t.replace(/\bpublican\b/gi, "tax collector");
    t = t.replace(/\bpublicans\b/gi, "tax collectors");
    t = t.replace(/\bcenturion\b/gi, "Roman officer");
    t = t.replace(/\bsepulchre\b/gi, "tomb");
    t = t.replace(/\bsepulchres\b/gi, "tombs");
    t = t.replace(/\bswaddling clothes\b/gi, "strips of cloth");
    t = t.replace(/\bmanger\b/gi, "feeding trough (manger)");
    t = t.replace(/\bsmote\b/gi, "struck");
    t = t.replace(/\bslain\b/gi, "killed");
    t = t.replace(/\bbegat\b/gi, "became the father of");
    t = t.replace(/\bbesought\b/gi, "begged");
    t = t.replace(/\bdwelt\b/gi, "lived");
    t = t.replace(/\bforbad\b/gi, "tried to stop");
    t = t.replace(/\bas was his wont\b/gi, "as was his custom");
    t = t.replace(/\bas he was wont\b/gi, "as was his custom");
    t = t.replace(/\bwont\b/gi, "custom");
    t = t.replace(/\binsomuch that\b/gi, "so that");
    t = t.replace(/\bon this fashion\b/gi, "like this");
    t = t.replace(/\bwent forth\b/gi, "went out");
    t = t.replace(/\bcome forth\b/gi, "come out");
    t = t.replace(/\bput forth\b/gi, "reached out");
    t = t.replace(/\bmarvelled\b/gi, "were amazed");
    t = t.replace(/\bmarveled\b/gi, "were amazed");
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
   * If exact match not in database, generates faithful parallel renderings
   * and interlinear links.
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
      greek: `[Original Koine Greek Textus Receptus passage for ${cleanRef} — Refer to Novum Testamentum Graece]`,
      hebrew: `[תרגום עברי לברית החדשה: ${cleanRef} — ברית חדשה על פי נוסח פרנץ דליטש]`
    };
  }
};

if (typeof window !== "undefined") {
  window.SCRIPTURE_TRANSLATIONS = SCRIPTURE_TRANSLATIONS;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = SCRIPTURE_TRANSLATIONS;
}
