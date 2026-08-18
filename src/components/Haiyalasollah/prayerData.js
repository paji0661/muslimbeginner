/**
 * ============================================================
 *  HAIYALASOLLAH — Prayer Guide Data
 * ============================================================
 *  All prayer recitation data is stored here.
 *  To update Arabic text, transliteration, or image URLs,
 *  edit the STEP_TEMPLATES and PRAYER_CONFIGS objects below.
 *  No changes to app.js or index.html are needed.
 * ============================================================
 */

// ── Step Templates ──────────────────────────────────────────
// Each template holds the label, image, description, and
// recitation (Arabic + Rumi + Translation) for a prayer step.

const STEP_TEMPLATES = {

  // ─── 1. NIAT (Intention) ──────────────────────────────────
  niat_subuh: {
    id: "niat",
    label: "NIAT",
    image: "position/niat.png",
    description: "Berdiri tegak menghadap kiblat, berniat di dalam hati.",
    recitation: {
      arabic: `<div class="text-emerald-400 font-bold text-[0.65rem] uppercase mb-1">Sendiri:</div>أُصَلِّي فَرْضَ الصُّبْحِ رَكْعَتَيْنِ أَدَاءً لِلَّهِ تَعَالَى<div class="text-amber-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Makmum:</div>أُصَلِّي فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مَأْمُومًا لِلَّهِ تَعَالَى<div class="text-blue-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Imam:</div>أُصَلِّي فَرْضَ الصُّبْحِ رَكْعَتَيْنِ إِمَامًا لِلَّهِ تَعَالَى`,
      rumi: `<div class="text-emerald-400 font-bold text-[0.65rem] uppercase mb-1">Sendiri:</div>Usolli fardos subhi rak'ataini adaa'an lillahi ta'aalaa.<div class="text-amber-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Makmum:</div>Usolli fardos subhi rak'ataini makmuuman lillahi ta'aalaa.<div class="text-blue-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Imam:</div>Usolli fardos subhi rak'ataini imaaman lillahi ta'aalaa.`,
      translation: `<div class="text-emerald-400 font-bold text-[0.65rem] uppercase mb-1">Sendiri:</div>Sahaja aku solat fardu Subuh dua rakaat pada waktunya kerana Allah Ta'ala.<div class="text-amber-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Makmum:</div>Sahaja aku solat fardu Subuh dua rakaat sebagai makmum kerana Allah Ta'ala.<div class="text-blue-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Imam:</div>Sahaja aku solat fardu Subuh dua rakaat sebagai imam kerana Allah Ta'ala.`
    }
  },
  niat_zohor: {
    id: "niat",
    label: "NIAT",
    image: "position/niat.png",
    description: "Berdiri tegak menghadap kiblat, berniat di dalam hati.",
    recitation: {
      arabic: `<div class="text-emerald-400 font-bold text-[0.65rem] uppercase mb-1">Sendiri:</div>أُصَلِّي فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعَاتٍ أَدَاءً لِلَّهِ تَعَالَى<div class="text-amber-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Makmum:</div>أُصَلِّي فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعَاتٍ مَأْمُومًا لِلَّهِ تَعَالَى<div class="text-blue-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Imam:</div>أُصَلِّي فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعَاتٍ إِمَامًا لِلَّهِ تَعَالَى`,
      rumi: `<div class="text-emerald-400 font-bold text-[0.65rem] uppercase mb-1">Sendiri:</div>Usolli fardoz zuhri arba'a raka'aatin adaa'an lillahi ta'aalaa.<div class="text-amber-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Makmum:</div>Usolli fardoz zuhri arba'a raka'aatin makmuuman lillahi ta'aalaa.<div class="text-blue-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Imam:</div>Usolli fardoz zuhri arba'a raka'aatin imaaman lillahi ta'aalaa.`,
      translation: `<div class="text-emerald-400 font-bold text-[0.65rem] uppercase mb-1">Sendiri:</div>Sahaja aku solat fardu Zohor empat rakaat pada waktunya kerana Allah Ta'ala.<div class="text-amber-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Makmum:</div>Sahaja aku solat fardu Zohor empat rakaat sebagai makmum kerana Allah Ta'ala.<div class="text-blue-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Imam:</div>Sahaja aku solat fardu Zohor empat rakaat sebagai imam kerana Allah Ta'ala.`
    }
  },
  niat_asar: {
    id: "niat",
    label: "NIAT",
    image: "position/niat.png",
    description: "Berdiri tegak menghadap kiblat, berniat di dalam hati.",
    recitation: {
      arabic: `<div class="text-emerald-400 font-bold text-[0.65rem] uppercase mb-1">Sendiri:</div>أُصَلِّي فَرْضَ الْعَصْرِ أَرْبَعَ رَكَعَاتٍ أَدَاءً لِلَّهِ تَعَالَى<div class="text-amber-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Makmum:</div>أُصَلِّي فَرْضَ الْعَصْرِ أَرْبَعَ رَكَعَاتٍ مَأْمُومًا لِلَّهِ تَعَالَى<div class="text-blue-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Imam:</div>أُصَلِّي فَرْضَ الْعَصْرِ أَرْبَعَ رَكَعَاتٍ إِمَامًا لِلَّهِ تَعَالَى`,
      rumi: `<div class="text-emerald-400 font-bold text-[0.65rem] uppercase mb-1">Sendiri:</div>Usolli fardol 'asri arba'a raka'aatin adaa'an lillahi ta'aalaa.<div class="text-amber-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Makmum:</div>Usolli fardol 'asri arba'a raka'aatin makmuuman lillahi ta'aalaa.<div class="text-blue-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Imam:</div>Usolli fardol 'asri arba'a raka'aatin imaaman lillahi ta'aalaa.`,
      translation: `<div class="text-emerald-400 font-bold text-[0.65rem] uppercase mb-1">Sendiri:</div>Sahaja aku solat fardu Asar empat rakaat pada waktunya kerana Allah Ta'ala.<div class="text-amber-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Makmum:</div>Sahaja aku solat fardu Asar empat rakaat sebagai makmum kerana Allah Ta'ala.<div class="text-blue-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Imam:</div>Sahaja aku solat fardu Asar empat rakaat sebagai imam kerana Allah Ta'ala.`
    }
  },
  niat_maghrib: {
    id: "niat",
    label: "NIAT",
    image: "position/niat.png",
    description: "Berdiri tegak menghadap kiblat, berniat di dalam hati.",
    recitation: {
      arabic: `<div class="text-emerald-400 font-bold text-[0.65rem] uppercase mb-1">Sendiri:</div>أُصَلِّي فَرْضَ الْمَغْرِبِ ثَلَاثَ رَكَعَاتٍ أَدَاءً لِلَّهِ تَعَالَى<div class="text-amber-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Makmum:</div>أُصَلِّي فَرْضَ الْمَغْرِبِ ثَلَاثَ رَكَعَاتٍ مَأْمُومًا لِلَّهِ تَعَالَى<div class="text-blue-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Imam:</div>أُصَلِّي فَرْضَ الْمَغْرِبِ ثَلَاثَ رَكَعَاتٍ إِمَامًا لِلَّهِ تَعَالَى`,
      rumi: `<div class="text-emerald-400 font-bold text-[0.65rem] uppercase mb-1">Sendiri:</div>Usolli fardol maghribi thalaatha raka'aatin adaa'an lillahi ta'aalaa.<div class="text-amber-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Makmum:</div>Usolli fardol maghribi thalaatha raka'aatin makmuuman lillahi ta'aalaa.<div class="text-blue-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Imam:</div>Usolli fardol maghribi thalaatha raka'aatin imaaman lillahi ta'aalaa.`,
      translation: `<div class="text-emerald-400 font-bold text-[0.65rem] uppercase mb-1">Sendiri:</div>Sahaja aku solat fardu Maghrib tiga rakaat pada waktunya kerana Allah Ta'ala.<div class="text-amber-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Makmum:</div>Sahaja aku solat fardu Maghrib tiga rakaat sebagai makmum kerana Allah Ta'ala.<div class="text-blue-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Imam:</div>Sahaja aku solat fardu Maghrib tiga rakaat sebagai imam kerana Allah Ta'ala.`
    }
  },
  niat_isyak: {
    id: "niat",
    label: "NIAT",
    image: "position/niat.png",
    description: "Berdiri tegak menghadap kiblat, berniat di dalam hati.",
    recitation: {
      arabic: `<div class="text-emerald-400 font-bold text-[0.65rem] uppercase mb-1">Sendiri:</div>أُصَلِّي فَرْضَ الْعِشَاءِ أَرْبَعَ رَكَعَاتٍ أَدَاءً لِلَّهِ تَعَالَى<div class="text-amber-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Makmum:</div>أُصَلِّي فَرْضَ الْعِشَاءِ أَرْبَعَ رَكَعَاتٍ مَأْمُومًا لِلَّهِ تَعَالَى<div class="text-blue-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Imam:</div>أُصَلِّي فَرْضَ الْعِشَاءِ أَرْبَعَ رَكَعَاتٍ إِمَامًا لِلَّهِ تَعَالَى`,
      rumi: `<div class="text-emerald-400 font-bold text-[0.65rem] uppercase mb-1">Sendiri:</div>Usolli fardol 'isyaa'i arba'a raka'aatin adaa'an lillahi ta'aalaa.<div class="text-amber-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Makmum:</div>Usolli fardol 'isyaa'i arba'a raka'aatin makmuuman lillahi ta'aalaa.<div class="text-blue-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Imam:</div>Usolli fardol 'isyaa'i arba'a raka'aatin imaaman lillahi ta'aalaa.`,
      translation: `<div class="text-emerald-400 font-bold text-[0.65rem] uppercase mb-1">Sendiri:</div>Sahaja aku solat fardu Isyak empat rakaat pada waktunya kerana Allah Ta'ala.<div class="text-amber-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Makmum:</div>Sahaja aku solat fardu Isyak empat rakaat sebagai makmum kerana Allah Ta'ala.<div class="text-blue-400 font-bold text-[0.65rem] uppercase mt-3 mb-1">Sebagai Imam:</div>Sahaja aku solat fardu Isyak empat rakaat sebagai imam kerana Allah Ta'ala.`
    }
  },

  // ─── 2. TAKBIRATUL IHRAM ──────────────────────────────────
  takbiratul_ihram: {
    id: "takbiratul_ihram",
    label: "TAKBIRATUL IHRAM",
    image: "position/takbiratul_ihram.png",
    description: "Angkat kedua-dua tangan sejajar dengan telinga, lalu lafazkan takbir.",
    recitation: {
      arabic: "اللَّهُ أَكْبَرُ",
      rumi: "Allahu Akbar.",
      translation: "Allah Maha Besar."
    }
  },

  // ─── 3. DOA IFTITAH ──────────────────────────────────────
  doa_iftitah: {
    id: "doa_iftitah",
    label: "DOA IFTITAH",
    image: "position/qiyam.png",
    description: "Baca doa iftitah selepas takbiratul ihram (sunat, rakaat pertama sahaja).",
    recitation: {
      arabic: "اللَّهُ أَكْبَرُ كَبِيرًا وَالْحَمْدُ لِلَّهِ كَثِيرًا وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلًا ● وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالْأَرْضَ حَنِيفًا مُسْلِمًا وَمَا أَنَا مِنَ الْمُشْرِكِينَ ● إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ ● لَا شَرِيكَ لَهُ وَبِذَٰلِكَ أُمِرْتُ وَأَنَا مِنَ الْمُسْلِمِينَ",
      rumi: "Allahu akbar kabiraw walhamdulillahi kasira, wasubhanallahi bukratan wa asiila. Wajjahtu wajhiya lillazi fataras samaawaati wal arda haniifam muslimaw wa maa ana minal musyrikiin. Inna solaatii wa nusukii wa mahyaaya wa mamaatii lillahi rabbil 'aalamiin. Laa syariika lahu wa bizaalika umirtu wa ana minal muslimiin.",
      translation: "Allah Maha Besar sebesar-besarnya, dan segala puji bagi Allah sebanyak-banyaknya, dan Maha Suci Allah pagi dan petang. Aku hadapkan wajahku kepada Allah yang menciptakan langit dan bumi dalam keadaan lurus dan berserah diri, dan aku bukanlah dari golongan orang-orang musyrik. Sesungguhnya solatku, ibadatku, hidupku dan matiku hanyalah untuk Allah, Tuhan sekalian alam. Tiada sekutu bagi-Nya, dan dengan demikian aku diperintahkan, dan aku dari golongan orang-orang Islam."
    }
  },

  // ─── 4. AL-FATIHAH ───────────────────────────────────────
  al_fatihah: {
    id: "al_fatihah",
    label: "AL-FATIHAH",
    image: "position/qiyam.png",
    description: "Membaca Surah Al-Fatihah (wajib pada setiap rakaat).",
    recitation: {
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ● الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ● الرَّحْمَٰنِ الرَّحِيمِ ● مَالِكِ يَوْمِ الدِّينِ ● إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ● اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ● صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ● آمِين",
      rumi: "Bismillahir Rahmaanir Rahiim. Alhamdu lillahi Rabbil 'aalamiin. Ar-Rahmaanir Rahiim. Maaliki yaumid diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinass siraatal mustaqiim. Siraatal laziina an'amta 'alaihim, ghairil maghdhuubi 'alaihim wa ladh-dhaaalliin. Aamiin.",
      translation: "Dengan nama Allah, Yang Maha Pemurah, lagi Maha Mengasihani. Segala puji bagi Allah, Tuhan sekalian alam. Yang Maha Pemurah, lagi Maha Mengasihani. Yang Menguasai hari pembalasan. Hanya Engkau yang kami sembah dan hanya kepada Engkau kami memohon pertolongan. Tunjukkanlah kami jalan yang lurus. Iaitu jalan orang-orang yang Engkau kurniakan nikmat kepada mereka, bukan jalan orang-orang yang dimurkai dan bukan jalan orang-orang yang sesat. Aamiin."
    }
  },

  // ─── 5. SURAH (Short surah after Al-Fatihah) ─────────────
  surah: {
    id: "surah",
    label: "SURAH LAIN",
    image: "position/qiyam.png",
    description: "Baca surah pendek pilihan selepas Al-Fatihah (sunat, rakaat 1 & 2 sahaja). Contoh: Al-Ikhlas.",
    recitation: {
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ● قُلْ هُوَ اللَّهُ أَحَدٌ ● اللَّهُ الصَّمَدُ ● لَمْ يَلِدْ وَلَمْ يُولَدْ ● وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
      rumi: "Bismillahir Rahmaanir Rahiim. Qul huwallahu ahad. Allahus samad. Lam yalid wa lam yuulad. Wa lam yakul lahu kufuwan ahad.",
      translation: "Dengan nama Allah, Yang Maha Pemurah, lagi Maha Mengasihani. Katakanlah: Dialah Allah, Yang Maha Esa. Allah tempat bergantung. Dia tidak beranak dan tidak pula diperanakkan. Dan tidak ada sesuatu pun yang setara dengan-Nya."
    }
  },

  // ─── 6. RUKUK (Bowing) ───────────────────────────────────
  rukuk: {
    id: "rukuk",
    label: "RUKUK",
    image: "position/rukuk.png",
    description: "Tundukkan badan, tangan memegang lutut, belakang lurus.",
    recitation: {
      arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ\n(٣ كالي)",
      rumi: "Subhaana Rabbiyal 'Aziimi wa bihamdih. (3 kali)",
      translation: "Maha Suci Tuhanku Yang Maha Agung dan dengan segala puji-Nya. (3 kali)<div class=\"mt-2 pt-1.5 border-t border-slate-700/50 text-[0.45rem] text-sky-400 font-medium\">💡 Pemahaman: Wajib Tama'ninah (berhenti seketika) di dalam pergerakan ini sebelum beralih ke rukun seterusnya. Jangan terkejar-kejar.</div>"
    }
  },

  // ─── 7. IKTIDAL (Standing from bowing) ───────────────────
  iktidal: {
    id: "iktidal",
    label: "IKTIDAL",
    image: "position/iktidal.png",
    description: "Bangkit berdiri tegak dari rukuk, angkat tangan sejajar bahu.",
    recitation: {
      arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ\n\nرَبَّنَا وَلَكَ الْحَمْدُ",
      rumi: "Sami'allahu liman hamidah.\n\nRabbanaa wa lakal hamd.",
      translation: "Allah mendengar pujian orang yang memuji-Nya.\n\nWahai Tuhan kami, bagi-Mu segala puji.<div class=\"mt-2 pt-1.5 border-t border-slate-700/50 text-[0.45rem] text-sky-400 font-medium\">💡 Pemahaman: Wajib Tama'ninah (berhenti seketika) di dalam pergerakan ini sebelum beralih ke rukun seterusnya. Jangan terkejar-kejar.</div>"
    }
  },

  // ─── 8. DOA QUNUT (Subuh only) ───────────────────────────
  qunut: {
    id: "qunut",
    label: "DOA QUNUT",
    image: "position/qunut.png",
    description: "Doa Qunut dibaca selepas iktidal pada rakaat kedua solat Subuh (sunat ab'adh).",
    recitation: {
      arabic: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ ● وَعَافِنِي فِيمَنْ عَافَيْتَ ● وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ ● وَبَارِكْ لِي فِيمَا أَعْطَيْتَ ● وَقِنِي شَرَّ مَا قَضَيْتَ ● فَإِنَّكَ تَقْضِي وَلَا يُقْضَىٰ عَلَيْكَ ● وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ ● وَلَا يَعِزُّ مَنْ عَادَيْتَ ● تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ ● فَلَكَ الْحَمْدُ عَلَىٰ مَا قَضَيْتَ ● أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ ● وَصَلَّى اللَّهُ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ النَّبِيِّ الْأُمِّيِّ وَعَلَىٰ آلِهِ وَصَحْبِهِ وَسَلَّمَ",
      rumi: "Allahummah dinii fiiman hadait. Wa 'aafinii fiiman 'aafait. Wa tawallanii fiiman tawallait. Wa baarik lii fiimaa a'thait. Wa qinii syarra maa qadhait. Fa innaka taqdhii wa laa yuqdhaa 'alaik. Wa innahu laa yazillu man waalait. Wa laa ya'izzu man 'aadait. Tabaarakta Rabbanaa wa ta'aalait. Fa lakal hamdu 'alaa maa qadhait. Astaghfiruka wa atuubu ilaik. Wa sallallahu 'alaa Sayyidinaa Muhammadin Nabiyyil ummiyyi wa 'alaa aalihi wa sahbihi wa sallam.",
      translation: "Ya Allah, tunjukkanlah aku sebagaimana orang-orang yang telah Engkau tunjukkan. Sejahterakanlah aku sebagaimana orang-orang yang telah Engkau sejahterakan. Peliharalah aku sebagaimana orang-orang yang telah Engkau peliharakan. Berkatilah bagiku apa yang telah Engkau kurniakan. Lindungilah aku dari kejahatan apa yang telah Engkau tentukan. Sesungguhnya Engkau Maha Menentukan dan tiada siapa yang menentukan atas Engkau. Sesungguhnya tidak hina orang yang Engkau pimpin. Dan tidak mulia orang yang Engkau musuhi. Maha Berkat Engkau wahai Tuhan kami dan Maha Tinggi Engkau. Bagi-Mu segala puji di atas apa yang Engkau tentukan. Aku memohon ampun dan bertaubat kepada-Mu. Selawat dan salam ke atas junjungan kami Nabi Muhammad yang ummi, dan ke atas keluarga serta sahabat baginda."
    }
  },

  // ─── 9. SUJUD (Prostration) ──────────────────────────────
  sujud: {
    id: "sujud",
    label: "SUJUD",
    image: "position/sujud.png",
    description: "Sujud dengan 7 anggota menyentuh lantai: dahi, 2 tapak tangan, 2 lutut, 2 hujung kaki.",
    recitation: {
      arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ\n(٣ كالي)",
      rumi: "Subhaana Rabbiyal A'laa wa bihamdih. (3 kali)",
      translation: "Maha Suci Tuhanku Yang Maha Tinggi dan dengan segala puji-Nya. (3 kali)<div class=\"mt-2 pt-1.5 border-t border-slate-700/50 text-[0.45rem] text-sky-400 font-medium\">💡 Pemahaman: Wajib Tama'ninah (berhenti seketika) di dalam pergerakan ini sebelum beralih ke rukun seterusnya. Jangan terkejar-kejar.</div>"
    }
  },

  // ─── 10. DUDUK ANTARA DUA SUJUD ──────────────────────────
  duduk_antara_dua_sujud: {
    id: "duduk_antara_dua_sujud",
    label: "DUDUK ANTARA DUA SUJUD",
    image: "position/duduk_antara_sujud.png",
    description: "Duduk di antara dua sujud dengan tenang (tuma'ninah).",
    recitation: {
      arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي وَعَافِنِي وَاعْفُ عَنِّي",
      rumi: "Rabbighfir lii warhamnii wajburnii warfa'nii warzuqnii wahdinii wa 'aafinii wa'fu 'annii.",
      translation: "Wahai Tuhanku, ampunkanlah dosaku, rahmatilah aku, cukupkanlah kekuranganku, angkatlah darjatku, berilah rezeki kepadaku, berilah petunjuk kepadaku, sihatkan aku, dan maafkanlah aku.<div class=\"mt-2 pt-1.5 border-t border-slate-700/50 text-[0.45rem] text-sky-400 font-medium\">💡 Pemahaman: Wajib Tama'ninah (berhenti seketika) di dalam pergerakan ini sebelum beralih ke rukun seterusnya. Jangan terkejar-kejar.</div>"
    }
  },

  // ─── 11. SUJUD KEDUA ─────────────────────────────────────
  sujud_kedua: {
    id: "sujud_kedua",
    label: "SUJUD KEDUA",
    image: "position/sujud.png",
    description: "Sujud kali kedua, sama seperti sujud pertama.",
    recitation: {
      arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ\n(٣ كالي)",
      rumi: "Subhaana Rabbiyal A'laa wa bihamdih. (3 kali)",
      translation: "Maha Suci Tuhanku Yang Maha Tinggi dan dengan segala puji-Nya. (3 kali)<div class=\"mt-2 pt-1.5 border-t border-slate-700/50 text-[0.45rem] text-sky-400 font-medium\">💡 Pemahaman: Wajib Tama'ninah (berhenti seketika) di dalam pergerakan ini sebelum beralih ke rukun seterusnya. Jangan terkejar-kejar.</div>"
    }
  },

  // ─── 12. BANGUN BERDIRI (Transition) ─────────────────────
  bangun_berdiri: {
    id: "bangun_berdiri",
    label: "BANGUN BERDIRI",
    image: "position/bangun_berdiri.png",
    description: "Bangkit berdiri untuk rakaat seterusnya sambil membaca takbir.",
    recitation: {
      arabic: "اللَّهُ أَكْبَرُ",
      rumi: "Allahu Akbar.",
      translation: "Allah Maha Besar."
    }
  },

  // ─── 13. TAHIYAT AWAL ────────────────────────────────────
  tahiyat_awal: {
    id: "tahiyat_awal",
    label: "TAHIYAT AWAL",
    image: "position/tahiyat_awal.png",
    description: "Duduk tahiyat awal dengan jari telunjuk kanan diangkat ketika membaca syahadah.",
    recitation: {
      arabic: "التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ ● السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ ● السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ ● أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ ● اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
      rumi: "At-tahiyyaatul mubaarakaatus solawaatut toyyibaatu lillah. Assalaamu 'alaika ayyuhan nabiyyu wa rahmatullahi wa barakaatuh. Assalaamu 'alainaa wa 'alaa 'ibaadillahis soolihiin. Asyhadu allaa ilaaha illallah wa asyhadu anna Muhammadar Rasulullah. Allahumma solli 'alaa Muhammad.",
      translation: "Segala penghormatan, keberkatan, selawat dan kebaikan adalah untuk Allah. Salam sejahtera ke atas engkau wahai Nabi, dan rahmat Allah serta keberkatannya. Salam sejahtera ke atas kami dan ke atas hamba-hamba Allah yang soleh. Aku bersaksi bahawa tiada Tuhan melainkan Allah dan aku bersaksi bahawa Muhammad itu pesuruh Allah. Ya Allah, selawatlah ke atas Muhammad."
    }
  },

  // ─── 14. TAHIYAT AKHIR ───────────────────────────────────
  tahiyat_akhir: {
    id: "tahiyat_akhir",
    label: "TAHIYAT AKHIR",
    image: "position/tahiyat_akhir.png",
    description: "Duduk tahiyat akhir (duduk tawarruk). Baca tahiyat penuh dengan selawat Ibrahimiyyah.",
    recitation: {
      arabic: "التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ ● السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ ● السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ ● أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ ● اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ ● كَمَا صَلَّيْتَ عَلَى سَيِّدِنَا إِبْرَاهِيمَ وَعَلَى آلِ سَيِّدِنَا إِبْرَاهِيمَ ● وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ ● كَمَا بَارَكْتَ عَلَى سَيِّدِنَا إِبْرَاهِيمَ وَعَلَى آلِ سَيِّدِنَا إِبْرَاهِيمَ ● فِي الْعَالَمِينَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
      rumi: "At-tahiyyaatul mubaarakaatus solawaatut toyyibaatu lillah. Assalaamu 'alaika ayyuhan nabiyyu wa rahmatullahi wa barakaatuh. Assalaamu 'alainaa wa 'alaa 'ibaadillahis soolihiin. Asyhadu allaa ilaaha illallah wa asyhadu anna Muhammadar Rasulullah. Allahumma solli 'alaa Sayyidinaa Muhammadin wa 'alaa aali Sayyidinaa Muhammad. Kamaa sollaita 'alaa Sayyidinaa Ibraahiima wa 'alaa aali Sayyidinaa Ibraahiim. Wa baarik 'alaa Sayyidinaa Muhammadin wa 'alaa aali Sayyidinaa Muhammad. Kamaa baarakta 'alaa Sayyidinaa Ibraahiima wa 'alaa aali Sayyidinaa Ibraahiim. Fil 'aalamiina innaka Hamiidum Majiid.",
      translation: "Segala penghormatan, keberkatan, selawat dan kebaikan adalah untuk Allah. Salam sejahtera ke atas engkau wahai Nabi, dan rahmat Allah serta keberkatannya. Salam sejahtera ke atas kami dan ke atas hamba-hamba Allah yang soleh. Aku bersaksi bahawa tiada Tuhan melainkan Allah dan aku bersaksi bahawa Muhammad itu pesuruh Allah. Ya Allah, selawatlah ke atas Sayyidina Muhammad dan ke atas keluarga Sayyidina Muhammad, sebagaimana Engkau telah berselawat ke atas Sayyidina Ibrahim dan ke atas keluarga Sayyidina Ibrahim. Dan berkatilah ke atas Sayyidina Muhammad dan ke atas keluarga Sayyidina Muhammad, sebagaimana Engkau telah memberkati Sayyidina Ibrahim dan ke atas keluarga Sayyidina Ibrahim. Di dalam alam ini, sesungguhnya Engkau Maha Terpuji lagi Maha Mulia."
    }
  },

  // ─── 15. SALAM (dual image: kanan + kiri) ─────────────────
  salam: {
    id: "salam",
    label: "SALAM",
    image: "position/salam_kanan.png",
    isDualImage: true,
    dualImages: [
      { src: "position/salam_kanan.png", label: "SALAM KANAN →", alt: "Salam ke Kanan" },
      { src: "position/salam_kiri.png", label: "← SALAM KIRI", alt: "Salam ke Kiri" }
    ],
    description: "Menoleh ke kanan dan ke kiri untuk memberi salam, mengakhiri solat.",
    recitation: {
      arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ\n(ke kanan, kemudian ke kiri)",
      rumi: "Assalaamu'alaikum wa rahmatullah. (ke kanan)\nAssalaamu'alaikum wa rahmatullah. (ke kiri)",
      translation: "Salam sejahtera ke atas kamu dan rahmat Allah. (Menoleh ke kanan, kemudian ke kiri)"
    }
  }
};


// ── Prayer Configurations ───────────────────────────────────
// Each prayer specifies its name, rakaat count, and metadata.
// The actual step sequence is generated by generatePrayerSteps().

const PRAYER_CONFIGS = {
  subuh: {
    key: "subuh",
    name: "Subuh",
    arabicName: "الصُّبْح",
    rakaatCount: 2,
    icon: "🌅",
    timeLabel: "Waktu Fajar",
    color: "from-sky-500 to-indigo-600",
    colorAccent: "#6366f1",
    hasQunut: true
  },
  zohor: {
    key: "zohor",
    name: "Zohor",
    arabicName: "الظُّهْر",
    rakaatCount: 4,
    icon: "☀️",
    timeLabel: "Waktu Tengah Hari",
    color: "from-amber-400 to-orange-500",
    colorAccent: "#f59e0b",
    hasQunut: false
  },
  asar: {
    key: "asar",
    name: "Asar",
    arabicName: "الْعَصْر",
    rakaatCount: 4,
    icon: "🌤️",
    timeLabel: "Waktu Petang",
    color: "from-orange-400 to-red-500",
    colorAccent: "#f97316",
    hasQunut: false
  },
  maghrib: {
    key: "maghrib",
    name: "Maghrib",
    arabicName: "الْمَغْرِب",
    rakaatCount: 3,
    icon: "🌇",
    timeLabel: "Waktu Senja",
    color: "from-rose-500 to-purple-600",
    colorAccent: "#e11d48",
    hasQunut: false
  },
  isyak: {
    key: "isyak",
    name: "Isyak",
    arabicName: "الْعِشَاء",
    rakaatCount: 4,
    icon: "🌙",
    timeLabel: "Waktu Malam",
    color: "from-violet-600 to-slate-800",
    colorAccent: "#7c3aed",
    hasQunut: false
  }
};


// ── Step Generator ──────────────────────────────────────────
// Generates the complete ordered step list for any prayer.
// Handles Tahiyat Awal placement, Qunut for Subuh, and
// surah recitation rules automatically.

function generatePrayerSteps(prayerKey) {
  const config = PRAYER_CONFIGS[prayerKey];
  if (!config) return [];

  const steps = [];
  let stepNumber = 1;

  for (let rakaat = 1; rakaat <= config.rakaatCount; rakaat++) {
    const isFirstRakaat = rakaat === 1;
    const isLastRakaat = rakaat === config.rakaatCount;
    // Surah is read only in first 2 rakaats
    const readsSurah = rakaat <= 2;
    // Tahiyat Awal is after 2nd rakaat for 3+ rakaat prayers
    const hasTahiyatAwal = rakaat === 2 && config.rakaatCount > 2;
    // Qunut is after Iktidal in 2nd rakaat of Subuh only
    const hasQunut = config.hasQunut && rakaat === 2;

    // ── Rakaat marker (visual separator) ──
    const rakaatMarker = {
      stepNumber: null,
      isRakaatMarker: true,
      rakaatNumber: rakaat,
      totalRakaat: config.rakaatCount
    };
    steps.push(rakaatMarker);

    // ── NIAT (only in Rakaat 1) ──
    if (isFirstRakaat) {
      const niatTemplate = STEP_TEMPLATES[`niat_${prayerKey}`];
      steps.push({
        ...niatTemplate,
        stepNumber: stepNumber++,
        rakaatNumber: rakaat,
        tag: "WAJIB"
      });
    }

    // ── TAKBIRATUL IHRAM (only in Rakaat 1) ──
    if (isFirstRakaat) {
      steps.push({
        ...STEP_TEMPLATES.takbiratul_ihram,
        stepNumber: stepNumber++,
        rakaatNumber: rakaat,
        tag: "RUKUN"
      });
    }

    // ── BANGUN BERDIRI (Rakaat 2+) ──
    if (!isFirstRakaat) {
      steps.push({
        ...STEP_TEMPLATES.bangun_berdiri,
        stepNumber: stepNumber++,
        rakaatNumber: rakaat,
        tag: "INTIQAL"
      });
    }

    // ── DOA IFTITAH (Rakaat 1 only) ──
    if (isFirstRakaat) {
      steps.push({
        ...STEP_TEMPLATES.doa_iftitah,
        stepNumber: stepNumber++,
        rakaatNumber: rakaat,
        tag: "SUNAT"
      });
    }

    // ── AL-FATIHAH ──
    steps.push({
      ...STEP_TEMPLATES.al_fatihah,
      stepNumber: stepNumber++,
      rakaatNumber: rakaat,
      tag: "RUKUN"
    });

    // ── SURAH (first 2 rakaats only) ──
    if (readsSurah) {
      steps.push({
        ...STEP_TEMPLATES.surah,
        stepNumber: stepNumber++,
        rakaatNumber: rakaat,
        tag: "SUNAT"
      });
    }

    // ── RUKUK ──
    steps.push({
      ...STEP_TEMPLATES.rukuk,
      stepNumber: stepNumber++,
      rakaatNumber: rakaat,
      tag: "RUKUN"
    });

    // ── IKTIDAL ──
    steps.push({
      ...STEP_TEMPLATES.iktidal,
      stepNumber: stepNumber++,
      rakaatNumber: rakaat,
      tag: "RUKUN"
    });

    // ── DOA QUNUT (Subuh, Rakaat 2 only — after Iktidal) ──
    if (hasQunut) {
      steps.push({
        ...STEP_TEMPLATES.qunut,
        stepNumber: stepNumber++,
        rakaatNumber: rakaat,
        tag: "SUNAT AB'ADH",
        isSpecial: true
      });
    }

    // ── SUJUD ──
    steps.push({
      ...STEP_TEMPLATES.sujud,
      stepNumber: stepNumber++,
      rakaatNumber: rakaat,
      tag: "RUKUN"
    });

    // ── DUDUK ANTARA DUA SUJUD ──
    steps.push({
      ...STEP_TEMPLATES.duduk_antara_dua_sujud,
      stepNumber: stepNumber++,
      rakaatNumber: rakaat,
      tag: "RUKUN"
    });

    // ── SUJUD KEDUA ──
    steps.push({
      ...STEP_TEMPLATES.sujud_kedua,
      stepNumber: stepNumber++,
      rakaatNumber: rakaat,
      tag: "RUKUN"
    });

    // ── TAHIYAT AWAL (after 2nd rakaat, multi-rakaat prayers) ──
    if (hasTahiyatAwal) {
      steps.push({
        ...STEP_TEMPLATES.tahiyat_awal,
        stepNumber: stepNumber++,
        rakaatNumber: rakaat,
        tag: "RUKUN"
      });
    }

    // ── TAHIYAT AKHIR + SALAM (last rakaat only) ──
    if (isLastRakaat) {
      steps.push({
        ...STEP_TEMPLATES.tahiyat_akhir,
        stepNumber: stepNumber++,
        rakaatNumber: rakaat,
        tag: "RUKUN"
      });
      steps.push({
        ...STEP_TEMPLATES.salam,
        stepNumber: stepNumber++,
        rakaatNumber: rakaat,
        tag: "RUKUN"
      });
    }
  }

  return steps;
}


// ── Public API ──────────────────────────────────────────────
// Export for use in app.js

export const PrayerData = {
  STEP_TEMPLATES,
  PRAYER_CONFIGS,
  generatePrayerSteps
};
