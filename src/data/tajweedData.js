export const tajweedData = [
  {
    id: 'pengenalan',
    title: 'Pengenalan Tajwid',
    icon: '📖',
    content: 'Tajwid (تجويد) dari segi bahasa bermaksud mencantikkan atau memperelokkan. Dari segi istilah, tajwid adalah ilmu untuk membaca al-Quran dengan memberikan setiap huruf haknya (makhraj dan sifat yang melekat pada huruf) dan mustahaqnya (sifat yang datang kemudian seperti tebal atau tipis). Membaca al-Quran dengan bertajwid adalah fardu ain bagi setiap Muslim.',
    examples: []
  },
  {
    id: 'nun_sakinah',
    title: "Hukum Nun Sakinah (نْ) & Tanwin",
    icon: '🔤',
    content: 'Terbahagi kepada 4 bahagian utama apabila bertemu dengan huruf-huruf hijaiyah:',
    subtopics: [
      {
        title: 'Izhar Halqi (Jelas & Terang)',
        desc: 'Dibaca dengan jelas tanpa dengung. Berlaku apabila Nun Sakinah atau Tanwin bertemu salah satu daripada 6 huruf halqum (kerongkong): ء , ه , ع , ح , غ , خ',
        example: 'مِنْ خَوْفٍ (Min khawf)'
      },
      {
        title: 'Idgham Bighunnah (Masuk dengan Dengung)',
        desc: 'Merapatkan sebutan berserta dengung (2 harakat). Hurufnya ada 4: ي , ن , م , و (Singkatan: Yanmu)',
        example: 'مِنْ وَالٍ (Miwwaal)'
      },
      {
        title: 'Idgham Bila Ghunnah (Masuk tanpa Dengung)',
        desc: 'Memasukkan huruf pertama ke dalam huruf kedua tanpa dengung. Hurufnya ada 2: ل , ر',
        example: 'مِنْ رَبِّهِم (Mirrabbihim)'
      },
      {
        title: "Ikhfa' Haqiqi (Sembunyi / Samar)",
        desc: 'Dibaca secara samar di antara Izhar dan Idgham, berserta dengung (2 harakat). Melibatkan 15 huruf hijaiyah yang berbaki (selain huruf Izhar, Idgham & Iqlab).',
        example: 'مِنْ شَرِّ (Min sharri)'
      },
      {
        title: 'Iqlab (Tukar)',
        desc: 'Menukarkan sebutan bunyi Nun Sakinah/Tanwin menjadi Mim (م) berserta dengung apabila bertemu dengan huruf Ba (ب).',
        example: 'مِنْ بَعْدِ (Mim ba\'di)'
      }
    ]
  },
  {
    id: 'mim_sakinah',
    title: 'Hukum Mim Sakinah (مْ)',
    icon: '🔠',
    content: 'Terdapat 3 hukum apabila Mim Mati (مْ) bertemu huruf hijaiyah:',
    subtopics: [
      {
        title: "Ikhfa' Syafawi (Sembunyi Bibir)",
        desc: 'Dibaca secara samar berserta dengung (2 harakat). Berlaku apabila Mim Sakinah bertemu huruf Ba (ب).',
        example: 'تَرْمِيهِمْ بِحِجَارَةٍ (Tarmihim bihijarah)'
      },
      {
        title: 'Idgham Mislain / Syafawi',
        desc: 'Merapatkan sebutan berserta dengung. Berlaku apabila Mim Sakinah bertemu huruf Mim (م).',
        example: 'لَهُمْ مَا (Lahum maa)'
      },
      {
        title: 'Izhar Syafawi (Jelas Bibir)',
        desc: 'Dibaca dengan jelas tanpa dengung. Berlaku apabila Mim Sakinah bertemu kesemua huruf hijaiyah SELAIN Ba (ب) dan Mim (م).',
        example: 'أَلَمْ نَشْرَحْ (Alam nashrah)'
      }
    ]
  },
  {
    id: 'qalqalah',
    title: 'Qalqalah (Lantunan)',
    icon: '🔊',
    content: 'Membunyikan lantunan yang kuat pada huruf yang sukun (mati). Huruf qalqalah ada 5: ق , ط , ب , ج , د (Singkatan: Qutbun Jad).',
    subtopics: [
      {
        title: 'Qalqalah Sughra (Kecil)',
        desc: 'Berlaku di pertengahan ayat. Lantunannya lebih kecil dan tidak terlalu kuat.',
        example: 'يَقْطَعُونَ (Yaqta\'uun)'
      },
      {
        title: 'Qalqalah Kubra (Besar)',
        desc: 'Berlaku di hujung ayat (kerana waqaf). Lantunannya kuat dan jelas.',
        example: 'مِنْ عَلَقٍ (Min \'alaq)'
      }
    ]
  },
  {
    id: 'madd',
    title: 'Hukum Madd (Panjang Asas)',
    icon: '📏',
    content: 'Madd bermaksud memanjangkan suara. Huruf madd ada 3: Alif (ا), Waw (و), dan Ya (ي).',
    subtopics: [
      {
        title: 'Madd Asli / Tabi\'i',
        desc: 'Kadar panjang 2 harakat. Berlaku apabila huruf madd tidak diikuti oleh hamzah (ء) atau sukun/saddah.',
        example: 'قَالَ (Qaala), يَقُولُ (Yaqoolu)'
      },
      {
        title: 'Madd Wajib Muttasil',
        desc: 'Huruf madd bertemu Hamzah (ء) dalam SATU kalimah. Dibaca panjang 4 atau 5 harakat.',
        example: 'سَوَاءٌ (Sawaa\'un)'
      },
      {
        title: 'Madd Jaiz Munfasil',
        desc: 'Huruf madd bertemu Hamzah (ء) dalam DUA kalimah yang berasingan. Dibaca panjang 2, 4 atau 5 harakat.',
        example: 'إِنَّا أَنْزَلْنَاهُ (Innaa anzalnaahu)'
      },
      {
        title: 'Madd Aridh Lissukun',
        desc: 'Huruf madd yang berada di hujung bacaan (waqaf). Dibaca 2, 4 atau 6 harakat.',
        example: 'الْعَالَمِينَ (Al-\'Aalameen)'
      }
    ]
  },
  {
    id: 'waqaf',
    title: 'Tanda Waqaf (Berhenti)',
    icon: '🛑',
    content: 'Dalam al-Quran terdapat tanda-tanda kecil yang memandu pembaca sama ada untuk teruskan bacaan atau berhenti.',
    subtopics: [
      {
        title: 'م (Waqaf Lazim)',
        desc: 'Mesti berhenti.',
        example: ''
      },
      {
        title: 'لا (Waqaf Mamnu\')',
        desc: 'Dilarang berhenti di sini, kecuali jika ia di penghujung ayat.',
        example: ''
      },
      {
        title: 'ج (Waqaf Jaiz)',
        desc: 'Harus berhenti atau harus diteruskan. Dua-dua dibenarkan.',
        example: ''
      },
      {
        title: 'صلے (Al-Wasl Awla)',
        desc: 'Meneruskan bacaan adalah lebih baik.',
        example: ''
      },
      {
        title: 'قلے (Al-Waqf Awla)',
        desc: 'Berhenti adalah lebih baik.',
        example: ''
      },
      {
        title: '∴ ∴ (Waqaf Mua\'naqah)',
        desc: 'Tanda titik tiga kembar. Mesti berhenti pada salah satu tempat sahaja, tidak boleh pada kedua-duanya.',
        example: ''
      },
      {
        title: 'س / سكتة (Saktah)',
        desc: 'Berhenti sejenak tanpa memutuskan nafas (sekadar 2 harakat) sebelum meneruskan bacaan.',
        example: ''
      },
      {
        title: '۩ (Sajdah)',
        desc: 'Tanda sujud tilawah. Disunatkan untuk sujud tilawah apabila membaca atau mendengar ayat ini.',
        example: ''
      },
      {
        title: 'ص / ق (Waqaf yang harus/dibenarkan)',
        desc: 'Tanda-tanda waqaf alternatif atau lama. Dibenarkan berhenti jika nafas tidak panjang.',
        example: ''
      }
    ]
  }
];
