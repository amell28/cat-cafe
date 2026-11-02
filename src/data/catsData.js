// Data of all cats in NekoHaven 3D Pet Shop & Cafe with Neutral Aesthetic & Outdoor Activities

export const CAT_ACCESSORIES = [
  { id: 'none', name: 'Tanpa Aksesoris', icon: '🐾' },
  { id: 'wizard_hat', name: 'Topi Sage Penyihir', icon: '🧙‍♂️' },
  { id: 'party_hat', name: 'Topi Pesta Krem', icon: '🎉' },
  { id: 'chef_hat', name: 'Topi Chef Pet Cafe', icon: '🧑‍🍳' },
  { id: 'crown', name: 'Mahkota Emas Antik', icon: '👑' },
  { id: 'ribbon', name: 'Pita Dasi Kupu Cokelat', icon: '🎀' },
  { id: 'glasses', name: 'Kacamata Hitam Vintage', icon: '🕶️' }
];

export const INITIAL_CATS = [
  {
    id: 'oyen',
    name: 'Oyen',
    title: 'Si Pembuat Onar & Juara Laser',
    breed: 'Domestic Orange Tabby',
    origin: 'Kucing Kampung Ras Terkuat',
    gender: 'Jantan ♂',
    age: '1.5 Tahun',
    colorHex: '#d97736', // Muted warm terracotta orange
    secondaryHex: '#a0522d',
    bellyHex: '#f5ebe0',
    eyeColor: '#52796f', // Sage green
    pattern: 'tabby',
    accessory: 'party_hat',
    personality: 'Hyperaktif, penuh energi, dan tak terkalahkan saat berburu titik laser merah!',
    favoriteSnack: 'Ikan Tongkol & Salmon Crunch Bites',
    likes: 'Ngejar laser di lantai, tidur di kardus, memburu remahan pastry di teras',
    dislikes: 'Air mandi dingin, pintu tertutup rapat',
    location: 'interior_carpet',
    stats: {
      happiness: 95,
      energy: 98,
      fluffiness: 88,
      cleanliness: 82
    },
    voicePitch: 1.18,
    isAdopted: false,
    adopterName: '',
    spawnPos: { x: -1.2, y: 0.35, z: 1.2 },
    dialogue: 'Meow! Ada cemilan ga kak? Ayo main laser yuk! 🐾'
  },
  {
    id: 'mochi',
    name: 'Mochi',
    title: 'Bantal Hidup & Ahli Rebahan',
    breed: 'Scottish Fold Longhair',
    origin: 'Highland Scottish',
    gender: 'Betina ♀',
    age: '2 Tahun',
    colorHex: '#faf8f5', // Warm linen white
    secondaryHex: '#ede6db',
    bellyHex: '#faf8f5',
    eyeColor: '#78909c', // Soft slate blue
    pattern: 'solid',
    accessory: 'crown',
    personality: 'Super santuy, pipi bulat gembul, hobi mendengkur lembut di kasur donat favoritnya.',
    favoriteSnack: 'Creamy Chicken Puree Liquid Snack',
    likes: 'Dielus di bawah dagu, tidur 18 jam sehari, bantal beludru empuk',
    dislikes: 'Gerakan mendadak, suara blender/vacuum',
    location: 'interior_bed',
    stats: {
      happiness: 92,
      energy: 35,
      fluffiness: 99,
      cleanliness: 96
    },
    voicePitch: 0.92,
    isAdopted: false,
    adopterName: '',
    spawnPos: { x: 2.8, y: 0.45, z: -1.5 },
    dialogue: 'Purrr... Aku ngantuk banget, tapi kalau dielus aku senang kok... 💤'
  },
  {
    id: 'luna',
    name: 'Luna',
    title: 'Ratu Penjaga Menara Pet Shop',
    breed: 'Tuxedo Shorthair',
    origin: 'British Heritage',
    gender: 'Betina ♀',
    age: '3 Tahun',
    colorHex: '#3a3530', // Warm espresso charcoal
    secondaryHex: '#272320',
    bellyHex: '#faf8f5',
    eyeColor: '#6b9080', // Soft olive green
    pattern: 'tuxedo',
    accessory: 'wizard_hat',
    personality: 'Cerdas, elegan, selalu memantau seisi pet shop dari tingkat paling atas cat tree.',
    favoriteSnack: 'Tuna Sashimi Gourmet Cubes',
    likes: 'Memanjat tempat paling tinggi, mengamati jalanan dari jendela toko',
    dislikes: 'Bulu kusut, orang asing yang terlalu berisik',
    location: 'interior_cat_tree',
    stats: {
      happiness: 88,
      energy: 78,
      fluffiness: 85,
      cleanliness: 98
    },
    voicePitch: 1.02,
    isAdopted: false,
    adopterName: '',
    spawnPos: { x: -3.2, y: 2.35, z: -2.8 },
    dialogue: 'Meoow~ Selamat datang di kerajaanku. Hormatilah sang ratu! ✨'
  },
  {
    id: 'boba',
    name: 'Boba',
    title: 'Maskot Keberuntungan Belang Tiga',
    breed: 'Japanese Bobtail Calico',
    origin: 'Kyoto, Japan',
    gender: 'Betina ♀',
    age: '1 Tahun',
    colorHex: '#faf8f5',
    secondaryHex: '#c49a6c', // Muted warm caramel
    bellyHex: '#3a3530',
    eyeColor: '#cda869', // Antique gold
    pattern: 'calico',
    accessory: 'ribbon',
    personality: 'Sangat ramah dan menyambut semua pelanggan yang masuk lewat pintu pet shop.',
    favoriteSnack: 'Dried Katsuobushi (Bonito Flakes)',
    likes: 'Menyapa tamu di kasir, menggelindingkan bola benang wol wol',
    dislikes: 'Ekornya dipegang, ditinggal sendirian lama-lama',
    location: 'interior_shop_counter',
    stats: {
      happiness: 96,
      energy: 86,
      fluffiness: 90,
      cleanliness: 92
    },
    voicePitch: 1.25,
    isAdopted: false,
    adopterName: '',
    spawnPos: { x: 3.2, y: 1.25, z: 2.2 },
    dialogue: 'Nyaa~! Terima kasih sudah berkunjung ke NekoHaven! Senang kenalan sama kamu! 💖'
  },
  {
    id: 'kuro',
    name: 'Kuro',
    title: 'Penikmat Kopi Teras & Pemburu Kupu-kupu',
    breed: 'Midnight Bombay Panther',
    origin: 'Boutique Garden Resident',
    gender: 'Jantan ♂',
    age: '2.5 Tahun',
    colorHex: '#2b2724', // Deep warm charcoal
    secondaryHex: '#1e1b19',
    bellyHex: '#35302d',
    eyeColor: '#e0a96d', // Warm amber gold
    pattern: 'solid',
    accessory: 'glasses',
    personality: 'Kucing outdoor teras yang suka nongkrong di kursi cafe luar, mencium aroma kopi hangat dan mengejar kupu-kupu.',
    favoriteSnack: 'Roasted Beef Morsels & Croissant Crumbs',
    likes: 'Duduk di meja cafe luar berpayung, sinar matahari pagi di trotoar, rumput catnip segar',
    dislikes: 'Hujan deras, klakson kendaraan keras',
    location: 'exterior_porch',
    stats: {
      happiness: 90,
      energy: 76,
      fluffiness: 82,
      cleanliness: 88
    },
    voicePitch: 0.86,
    isAdopted: false,
    adopterName: '',
    spawnPos: { x: -4.5, y: 0.82, z: 6.8 }, // Sits right at the outdoor cafe bistro table!
    dialogue: 'Mrowr. Duduk di teras cafe sambil melihat burung dan kupu-kupu ini sungguh menenangkan! ☕'
  },
  {
    id: 'milo',
    name: 'Milo',
    title: 'Penjelajah Cilik & Petualang Sepeda',
    breed: 'American Shorthair Mitted',
    origin: 'Outdoor Courtyard Scout',
    gender: 'Jantan ♂',
    age: '8 Bulan',
    colorHex: '#bcaaa4', // Warm taupe beige
    secondaryHex: '#8d6e63',
    bellyHex: '#faf8f5',
    eyeColor: '#81c784', // Soft mint green
    pattern: 'tabby',
    accessory: 'none',
    personality: 'Anak kucing lincah yang gemar berlari di terowongan kayu outdoor dan bersarang di keranjang sepeda!',
    favoriteSnack: 'Crunchy Cat Treats & Dried Cod',
    likes: 'Memanjat batang kayu agility luar, merayap di pipa terowongan, menyapa burung merpati',
    dislikes: 'Dikurung di dalam ruangan terlalu lama',
    location: 'exterior_playground',
    stats: {
      happiness: 98,
      energy: 99,
      fluffiness: 94,
      cleanliness: 86
    },
    voicePitch: 1.32,
    isAdopted: false,
    adopterName: '',
    spawnPos: { x: -0.2, y: 0.35, z: 8.2 }, // Active in outdoor cat agility area!
    dialogue: 'Mew-mew! Lihat aku menyeimbangkan diri di batang kayu luar! Seru banget! 🚴‍♂️'
  },
  {
    id: 'latte',
    name: 'Latte',
    title: 'Putri Spa & Salon Kecantikan',
    breed: 'Seal Point Siamese',
    origin: 'Royal Siam Lineage',
    gender: 'Betina ♀',
    age: '1.8 Tahun',
    colorHex: '#f5ede3', // Warm cream body
    secondaryHex: '#4e342e', // Deep chocolate points
    bellyHex: '#faf4ed',
    eyeColor: '#5c9ead', // Muted sea blue
    pattern: 'siamese',
    accessory: 'chef_hat',
    personality: 'Sangat vokal, manja, dan menyukai sesi mandi berbusa serta disisir bulunya sampai mengkilap.',
    favoriteSnack: 'Gourmet Salmon Mousse',
    likes: 'Mandi air hangat di bak clawfoot, aroma sampo lavender, cermin salon',
    dislikes: 'Bulu basah tanpa hairdryer hangat',
    location: 'interior_spa',
    stats: {
      happiness: 91,
      energy: 82,
      fluffiness: 94,
      cleanliness: 100
    },
    voicePitch: 1.08,
    isAdopted: false,
    adopterName: '',
    spawnPos: { x: -4.0, y: 0.55, z: 1.5 },
    dialogue: 'Miaww~ Waktunya perawatan bulu di salon pet shop! Lihat busa mandiku! 🫧'
  }
];

export const CAMERA_VIEWS = [
  {
    id: 'exterior',
    name: 'Tampilan Luar',
    subtitle: 'Storefront, Trotoar & Cafe Teras',
    icon: 'Store',
    cameraPos: [0, 4.5, 13.5],
    targetPos: [0, 1.8, 5.0],
    description: 'Pemandangan etalase luar toko yang tenang dengan kanopi bergaris netral, trotoar batu, dan aktivitas luar.'
  },
  {
    id: 'city_view',
    name: 'City Lights & Kota',
    subtitle: 'Deretan Gedung, Cahaya Kota & Angin',
    icon: 'Building2',
    cameraPos: [0, 9.5, 25.0],
    targetPos: [0, 4.5, 2.0],
    description: 'Panorama spektakuler gedung-gedung bertingkat kota, gemerlap city lights, deretan townhouse kiri-kanan, dan pepohonan tertiup angin.'
  },
  {
    id: 'park',
    name: 'Taman Depan',
    subtitle: 'Taman Hijau, Pepohonan & Bangku',
    icon: 'Trees',
    cameraPos: [0, 4.2, 19.5],
    targetPos: [0, 1.2, 13.5],
    description: 'Taman hijau asri tepat di depan cafe dengan jalan setapak batu, pepohonan rindang, bunga lavender, dan bangku taman.'
  },
  {
    id: 'adjacent_shop',
    name: 'Toko Buku Sebelah',
    subtitle: 'Neko Books & Arcade Activity',
    icon: 'BookOpen',
    cameraPos: [10.2, 3.2, 8.5],
    targetPos: [10.2, 1.8, 3.0],
    description: 'Bangunan aktivitas di sebelah cafe yang berisi toko buku kucing bertingkat, komik, sudut baca santai, dan mesin arcade.'
  },
  {
    id: 'outdoor_cafe',
    name: 'Cafe Luar',
    subtitle: 'Meja Kopi, Kuro & Santap Croissant',
    icon: 'Coffee',
    cameraPos: [-4.2, 2.2, 9.5],
    targetPos: [-4.5, 0.85, 6.8],
    description: 'Area santai cafe outdoor dengan meja bundar kayu, payung kanopi, cangkir kopi mengepul, dan Kuro yang bersantai.'
  },
  {
    id: 'outdoor_play',
    name: 'Aktivitas Luar',
    subtitle: 'Sepeda Antik, Burung & Agility Milo',
    icon: 'Bike',
    cameraPos: [1.2, 2.4, 11.2],
    targetPos: [0.5, 0.6, 7.8],
    description: 'Aktivitas seru di luar cafe: sepeda antar kue, burung merpati mematuk remahan, air mancur batu, dan rintangan kayu.'
  },
  {
    id: 'interior',
    name: 'Lounge Dalam',
    subtitle: 'Pet Lounge, Kasur & Arena Bermain',
    icon: 'Home',
    cameraPos: [0, 4.0, 4.2],
    targetPos: [0, 1.2, -1.0],
    description: 'Suasana hangat di dalam pet shop dengan lantai kayu ek Skandinavia, karpet wol, dan kasur donat.'
  },
  {
    id: 'cat_tree',
    name: 'Menara Kucing',
    subtitle: 'Deluxe Scratching Tower & Jembatan',
    icon: 'Trees',
    cameraPos: [-2.0, 3.2, -1.0],
    targetPos: [-3.2, 2.0, -2.8],
    description: 'Spot favorit Luna bertengger di ketinggian sambil mengamati seluruh ruangan toko.'
  },
  {
    id: 'spa',
    name: 'Salon & Spa',
    subtitle: 'Bak Mandi Busa & Meja Grooming',
    icon: 'Sparkles',
    cameraPos: [-2.6, 2.5, 3.2],
    targetPos: [-4.0, 0.8, 1.5],
    description: 'Pusat perawatan kucing dengan bak mandi keramik, busa sabun wangi, dan sikat bulu halus.'
  },
  {
    id: 'orbit',
    name: 'Mode Bebas 360°',
    subtitle: 'Putar & Zoom Kamera Sesuka Hati',
    icon: 'Compass',
    cameraPos: [6.0, 6.5, 10.5],
    targetPos: [0, 1.5, 3.0],
    description: 'Gunakan mouse klik kiri untuk memutar pandangan 360°, klik kanan untuk geser, dan scroll untuk zoom.'
  }
];
