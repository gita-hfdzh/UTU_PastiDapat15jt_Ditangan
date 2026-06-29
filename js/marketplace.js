/* =============================================================
   LAMURI — marketplace.js
   Products with real Unsplash images, no emoji
   ============================================================= */

const PRODUCTS = [
  {
    id: 991, name: 'Tulang Ikan Tuna Segar (Per Kg)', mainType: 'limbah',
    category: 'tulang', price: 5000, oldPrice: null,
    rating: 4.5, sold: 450, stock: 120,
    seller: 'Koperasi Nelayan Lampulo',
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=400&h=280&q=80',
    badge: 'Bahan Baku', badgeType: 'badge-warning',
    description: 'Limbah tulang ikan tuna segar, cocok untuk bahan baku pembuatan tepung ikan atau pupuk cair organik. Diambil langsung dari hasil tangkapan harian.',
    journey: [
      { title: 'Tangkapan Pagi', desc: 'Ikan ditangkap oleh nelayan lokal di perairan Aceh.', loc: 'Perairan Aceh' },
      { title: 'Fillet & Pemisahan', desc: 'Daging dipisahkan untuk pasar, tulang dan sisa kepala dikumpulkan khusus.', loc: 'TPI Lampulo' }
    ]
  },
  {
    id: 992, name: 'Kulit Ikan Kakap Mentah (Per Kg)', mainType: 'limbah',
    category: 'kulit', price: 12000, oldPrice: null,
    rating: 4.9, sold: 120, stock: 45,
    seller: 'Pengepul Lokal Meulaboh',
    image: 'https://images.unsplash.com/photo-1595166244673-8b74fb2fa177?auto=format&fit=crop&w=400&h=280&q=80',
    badge: 'Limbah Mentah', badgeType: 'badge-light',
    description: 'Kulit ikan kakap segar kualitas terbaik. Siap diolah menjadi keripik atau diekstrak kolagennya.',
    journey: [
      { title: 'Tangkapan Harian', desc: 'Kakap merah ditangkap segar dari laut dangkal.', loc: 'Pesisir Meulaboh' },
      { title: 'Pemisahan Kulit', desc: 'Kulit dipisahkan dengan teknik steril tanpa merusak serat.', loc: 'Toko Penjual Nelayan Meulaboh' }
    ]
  },
  {
    id: 1, name: 'Keripik Kulit Ikan Tongkol', mainType: 'olahan',
    category: 'makanan', price: 35000, oldPrice: 45000,
    rating: 4.8, sold: 2140, stock: 42,
    seller: 'Dapur Pesisir Aceh',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&h=280&q=80',
    badge: 'Terlaris', badgeType: 'badge-blue',
    description: 'Keripik renyah dari kulit ikan tongkol segar, diproses higienis tanpa pengawet. Kaya protein dan kolagen alami.',
    journey: [
      { title: 'Tangkapan Segar di Laut', desc: 'Nelayan mitra LAMURI menangkap ikan tongkol segar di perairan Samudera Hindia, sekitar 20 mil dari pesisir Aceh.', loc: 'Perairan Aceh Besar' },
      { title: 'Pemisahan dan Pembersihan', desc: 'Kulit ikan dipisahkan, dicuci dengan air garam steril, dan dibersihkan dari sisa daging dengan teknik food-grade.', loc: 'Toko Penjual Ulee Lheue' },
      { title: 'Pengeringan dan Penggorengan', desc: 'Kulit dijemur 8 jam, kemudian digoreng pada suhu 180°C menggunakan minyak sawit murni. Tidak ada tambahan pengawet.', loc: 'Dapur Pengolahan Bersertifikat' },
      { title: 'Pengemasan Higienis', desc: 'Dikemas dalam kemasan aluminium foil kedap udara dengan label nutrisi lengkap, dipacking oleh tim terlatih bersertifikat BPOM.', loc: 'Fasilitas Pengemasan LAMURI' }
    ]
  },
  {
    id: 2, name: 'Pupuk Cair Organik dari Limbah Ikan', mainType: 'olahan',
    category: 'pakan', price: 28000,
    rating: 4.7, sold: 891, stock: 120,
    seller: 'GreenAceh Fertilizer',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&h=280&q=80',
    badge: 'Organik',  badgeType: 'badge-success',
    description: 'Pupuk cair dari fermentasi limbah ikan. Kaya nitrogen, fosfor, dan kalium — cocok untuk semua jenis tanaman.',
    journey: [
      { title: 'Pengumpulan Limbah Organik', desc: 'Sisa kepala, tulang, dan isi perut ikan dikumpulkan dari nelayan mitra dalam kondisi segar untuk mencegah pembusukan.', loc: 'Dermaga Ulee Lheue' },
      { title: 'Fermentasi Anaerobik', desc: 'Limbah difermentasi selama 21 hari dalam biodigester tertutup dengan starter bakteri EM4 untuk menghasilkan nutrisi optimal.', loc: 'Fasilitas Fermentasi LAMURI' },
      { title: 'Penyaringan dan Pengenceran', desc: 'Cairan hasil fermentasi disaring 3 tahap, diencerkan, dan diuji kandungan NPK di laboratorium terakreditasi.', loc: 'Lab Agritech Aceh' },
      { title: 'Bottling dan Distribusi', desc: 'Dikemas dalam botol HDPE 1 liter dengan petunjuk penggunaan, siap dikirim ke petani seluruh Aceh.', loc: 'Gudang Distribusi LAMURI' }
    ]
  },
  {
    id: 3, name: 'Tas Anyaman Sisik Ikan Premium', mainType: 'olahan',
    category: 'kerajinan', price: 125000,
    rating: 4.9, sold: 347, stock: 8,
    seller: 'Karya Pesisir Artisan',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&h=280&q=80',
    badge: 'Handmade', badgeType: 'badge-warning',
    description: 'Tas tangan handmade dari sisik ikan yang diawetkan dan dirangkai secara artistik. Unik, kuat, dan ramah lingkungan.',
    journey: [
      { title: 'Panen Sisik dari Nelayan', desc: 'Sisik ikan dari berbagai spesies — baronang, kakap, kerapu — dikumpulkan setelah proses fillet. Setiap kg sisik setara produksi dari sekitar 50 ekor ikan.', loc: 'Pelabuhan Ikan Lampulo' },
      { title: 'Pembersihan dan Sterilisasi', desc: 'Sisik direndam larutan NaOH 2%, disikat manual, disterilkan UV, lalu dikeringkan sempurna. Proses ini memastikan tidak ada bau tersisa.', loc: 'Workshop LAMURI' },
      { title: 'Pewarnaan Alami', desc: 'Sisik diwarnai dengan pewarna alami dari kunyit, indigo, dan daun pandan — tanpa bahan kimia sintetis.', loc: 'Sentra Pewarna Alami Aceh' },
      { title: 'Perangkaian Artistik', desc: 'Pengrajin berpengalaman 10+ tahun merangkai sisik satu per satu dengan teknik wire-wrapping. Satu tas membutuhkan 4–6 jam kerja.', loc: 'Atelier Karya Pesisir' }
    ]
  },
  {
    id: 4, name: 'Kapsul Kolagen Sisik Ikan', mainType: 'olahan',
    category: 'kesehatan', price: 89000, oldPrice: 120000,
    rating: 4.6, sold: 1620, stock: 65,
    seller: 'Biohealth Aceh',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&h=280&q=80',
    badge: 'Terlaris', badgeType: 'badge-blue',
    description: 'Suplemen kolagen tipe I & III dari sisik ikan. Bioavailabilitas tinggi untuk kulit sehat, sendi fleksibel, dan rambut kuat.',
    journey: [
      { title: 'Ekstraksi Kolagen Sisik', desc: 'Sisik ikan kering dihidrolisis dengan enzim papain pada suhu terkontrol 55°C selama 6 jam untuk menghasilkan kolagen peptida murni.', loc: 'Lab Bioekstraksi LAMURI' },
      { title: 'Purifikasi Multi-tahap', desc: 'Kolagen dimurnikan melalui ultrafiltrasi membran, dikeringkan dengan spray-drying pada suhu rendah untuk menjaga aktivitas biologis.', loc: 'Fasilitas Purifikasi Kelas C' },
      { title: 'Pengujian Kualitas', desc: 'Setiap batch diuji kandungan kolagen, logam berat, dan mikrobiologi oleh BPOM dan laboratorium independen terakreditasi.', loc: 'Lab Uji BPOM Aceh' },
      { title: 'Enkapsulasi', desc: 'Kolagen dikemas dalam kapsul vegetarian ukuran 00, isi 500mg per kapsul, 60 kapsul per botol. Bebas gelatin babi.', loc: 'Fasilitas Farmasi GMP' }
    ]
  },
  {
    id: 5, name: 'Pelet Pakan Ikan Budidaya', mainType: 'olahan',
    category: 'pakan', price: 15000,
    rating: 4.5, sold: 4200, stock: 500,
    seller: 'AquaFeed Aceh',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=400&h=280&q=80',
    description: 'Pelet pakan dari tepung tulang dan daging ikan reject berkualitas. Kandungan protein 35% — optimal untuk budidaya ikan lele dan nila.',
    journey: [
      { title: 'Seleksi Bahan Baku', desc: 'Tulang, kepala, dan sisa daging ikan yang tidak masuk standar konsumsi dipilih sebagai bahan baku pelet pakan berkualitas tinggi.', loc: 'Pabrik Ikan Lampulo' },
      { title: 'Penggilingan dan Pengeringan', desc: 'Bahan dikeringkan di oven bersuhu 100°C selama 4 jam, kemudian digiling halus menjadi tepung ikan dengan kadar air < 10%.', loc: 'Fasilitas Pengolahan AquaFeed' },
      { title: 'Formulasi dan Peletisasi', desc: 'Tepung ikan dicampur dedak, vitamin mineral premix, dan binder alami, lalu dicetak pelet ukuran 3mm menggunakan mesin pelet.', loc: 'Pabrik Pelet Aceh' },
      { title: 'Pengemasan Karung', desc: 'Pelet dikemas dalam karung PE 1kg, 5kg, dan 25kg, dilengkapi analisis proksimat (protein, lemak, serat kasar) pada label.', loc: 'Gudang Distribusi AquaFeed' }
    ]
  },
  {
    id: 6, name: 'Gelang Sisik Ikan Warna Alami', mainType: 'olahan',
    category: 'kerajinan', price: 45000,
    rating: 4.8, sold: 520, stock: 30,
    seller: 'Karya Pesisir Artisan',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&h=280&q=80',
    description: 'Gelang cantik dari sisik ikan asli dengan pewarna alami. Setiap gelang adalah karya seni unik yang tidak ada duanya.',
    journey: [
      { title: 'Seleksi Sisik Terbaik', desc: 'Hanya sisik berukuran > 1.5cm dengan kilap alami yang dipilih — biasanya dari ikan kerapu dan kakap merah.', loc: 'Toko Penjual Pengolahan LAMURI' },
      { title: 'Pembersihan dan Sterilisasi', desc: 'Sisik dibersihkan dengan ultrasonik, disterilkan UV, dan dikeringkan dalam kondisi terkontrol untuk mempertahankan kilap alami.', loc: 'Workshop Artisan' },
      { title: 'Pewarnaan Etis', desc: 'Diwarnai dengan pigmen alami dari tumbuhan lokal Aceh — kunyit (kuning), indigo (biru), dan campuran bebas logam berat.', loc: 'Laboratorium Pewarna Alami' },
      { title: 'Perakitan Handmade', desc: 'Pengrajin merangkai setiap sisik dengan kawat tembaga food-safe. Setiap gelang dilengkapi sertifikat keaslian dan kisah pengrajinnya.', loc: 'Atelier Karya Pesisir, Banda Aceh' }
    ]
  },
  {
    id: 7, name: 'Sabun Minyak Ikan Premium', mainType: 'olahan',
    category: 'kesehatan', price: 22000,
    rating: 4.4, sold: 780, stock: 95,
    seller: 'Pure Aceh Skincare',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&h=280&q=80',
    description: 'Sabun cold-process dari minyak hati ikan. Kaya omega-3 dan vitamin D — melembapkan, mencerahkan, dan merawat kulit kering.',
    journey: [
      { title: 'Ekstraksi Minyak Hati Ikan', desc: 'Minyak diekstraksi dari hati ikan segar menggunakan metode wet rendering suhu rendah (60°C) untuk mempertahankan nutrisi sensitif panas.', loc: 'Fasilitas Ekstraksi LAMURI' },
      { title: 'Pemurnian dan Deodorisasi', desc: 'Minyak mentah dimurnikan dengan karbon aktif dan divolatilisasi untuk menghilangkan bau amis — hasilnya minyak jernih tak berbau.', loc: 'Lab Pemurnian Minyak' },
      { title: 'Formulasi Sabun Cold-Process', desc: 'Minyak ikan dicampur minyak kelapa, NaOH pharma-grade, dan essensial oil lavender. Proses saponifikasi berlangsung 48 jam alami.', loc: 'Soap Kitchen Pure Aceh' },
      { title: 'Curing 4 Minggu', desc: 'Sabun dikeringkan 4 minggu dalam ruang sirkulasi udara — memastikan pH sempurna (8-9) dan konsistensi bar optimal sebelum dikemas.', loc: 'Curing Room Pure Aceh' }
    ]
  },
  {
    id: 8, name: 'Kompos Padat Tulang Ikan', mainType: 'olahan',
    category: 'pakan', price: 12000,
    rating: 4.3, sold: 1150, stock: 200,
    seller: 'GreenAceh Fertilizer',
    image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=400&h=280&q=80',
    description: 'Kompos granular dari tulang ikan fermentasi. Kandungan kalsium dan fosfor tinggi — memperkuat akar tanaman dan meningkatkan hasil panen.',
    journey: [
      { title: 'Pengumpulan Tulang Ikan', desc: 'Tulang dari berbagai spesies dikumpulkan setelah proses fillet dan pemisahan daging. Tidak ada tulang bercampur plastik atau logam.', loc: 'Toko Penjual Ulee Lheue LAMURI' },
      { title: 'Perebusan dan Penghalusan', desc: 'Tulang direbus 2 jam untuk sterilisasi, kemudian dihancurkan menjadi tepung kasar menggunakan hammer mill.', loc: 'Fasilitas Pengolahan' },
      { title: 'Komposting Aerobik', desc: 'Tepung tulang dicampur sekam, jerami, dan mikroba Trichoderma. Dikomposekan 30 hari dengan pembalikan setiap 3 hari.', loc: 'Kompos Facility GreenAceh' },
      { title: 'Granulasi dan Pengemasan', desc: 'Kompos matang digranulasi ukuran 2-4mm, dikemas 2kg dengan analisis kandungan Ca, P, dan pH untuk kemudahan aplikasi.', loc: 'Fasilitas Granulasi LAMURI' }
    ]
  },
  {
    id: 9, name: 'Abon Ikan Cakalang Premium', mainType: 'olahan',
    category: 'makanan', price: 42000,
    rating: 4.7, sold: 3600, stock: 55,
    seller: 'Dapur Pesisir Aceh',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&h=280&q=80',
    badge: 'Terlaris', badgeType: 'badge-blue',
    description: 'Abon ikan cakalang buatan tangan dengan bumbu rempah Aceh asli. Kaya protein, rendah lemak, tanpa MSG dan pengawet.',
    journey: [
      { title: 'Seleksi Ikan Cakalang Segar', desc: 'Hanya ikan cakalang segar yang ditangkap pagi hari dan tiba di darat dalam waktu 4 jam yang dipilih. Tidak ada ikan beku.', loc: 'Pelabuhan Lampulo, Banda Aceh' },
      { title: 'Pengolahan Daging Ikan', desc: 'Ikan dicuci, direbus, dipisahkan dagingnya secara manual, lalu disuwir halus. Tulang dan kulit dijadikan bahan olahan lain — zero waste.', loc: 'Dapur Pengolahan Higienis' },
      { title: 'Tumis dengan Rempah Aceh', desc: 'Daging ikan disangrai dengan bumbu rempah khas Aceh — serai, lengkuas, daun kari — tanpa tambahan MSG, pewarna, atau pengawet sintetis.', loc: 'Dapur Pesisir Aceh' },
      { title: 'Pengemasan Vacuum-Sealed', desc: 'Abon didinginkan, lalu dikemas vacuum-sealed dalam aluminium foil untuk ketahanan 6 bulan tanpa pengawet kimia.', loc: 'Packaging Room Dapur Pesisir' }
    ]
  },
  {
    id: 10, name: 'Kulit Ikan Tenggiri Mentah (Grade A)', mainType: 'limbah',
    category: 'kulit', price: 15000, oldPrice: 18000,
    rating: 4.6, sold: 1200, stock: 80,
    seller: 'Toko Penjual Ulee Lheue',
    image: 'https://images.unsplash.com/photo-1596700755913-9111e1f7a077?auto=format&fit=crop&w=400&h=280&q=80',
    badge: 'Segar', badgeType: 'badge-blue',
    description: 'Kulit ikan tenggiri mentah bersih hasil sisa fillet. Cocok untuk bahan baku kerupuk kulit, ekstraksi kolagen, atau kerajinan.',
    journey: [
      { title: 'Fillet Ikan', desc: 'Pemrosesan ikan tenggiri segar dari nelayan untuk kebutuhan daging konsumsi.', loc: 'Pelabuhan Lampulo' },
      { title: 'Pemisahan Kulit', desc: 'Kulit dipisahkan dengan hati-hati, bebas sisa daging, dan langsung dicuci dengan air dingin mengalir.', loc: 'Fasilitas Fillet' },
      { title: 'Penyimpanan Dingin', desc: 'Disimpan pada suhu -20°C untuk menjaga kualitas sebelum dikirim ke pembeli.', loc: 'Cold Storage LAMURI' },
      { title: 'Pengiriman', desc: 'Dikemas dalam box styrofoam dengan dry ice untuk menjamin kesegaran sampai ke tangan Anda.', loc: 'Toko Penjual Logistik' }
    ]
  },
  {
    id: 11, name: 'Tulang dan Kepala Ikan Kakap Merah', mainType: 'limbah',
    category: 'tulang', price: 8000,
    rating: 4.5, sold: 850, stock: 150,
    seller: 'Koperasi Nelayan Mulia',
    image: 'https://images.unsplash.com/photo-1509315682142-b0521eec4b29?auto=format&fit=crop&w=400&h=280&q=80',
    description: 'Limbah tulang dan kepala ikan kakap merah segar. Sangat ideal sebagai bahan baku kaldu ikan, tepung tulang, atau kompos organik.',
    journey: [
      { title: 'Pengumpulan Limbah', desc: 'Sisa potongan tulang dan kepala ikan kakap dikumpulkan langsung setelah fillet.', loc: 'Pasar Ikan Peunayong' },
      { title: 'Pembersihan', desc: 'Dibersihkan dari kotoran dan insang untuk mengurangi bau dan menjaga higienitas bahan baku.', loc: 'Area Pembersihan' },
      { title: 'Pengemasan', desc: 'Dikemas per 5kg dalam plastik vakum dan dibekukan.', loc: 'Gudang Penyimpanan' },
      { title: 'Distribusi', desc: 'Siap dikirim ke industri pakan, pengrajin kaldu, atau pembuat kompos.', loc: 'Toko Penjual Distribusi' }
    ]
  },
  {
    id: 12, name: 'Sisik Ikan Kerapu Mentah Kering', mainType: 'limbah',
    category: 'sisik', price: 12000,
    rating: 4.4, sold: 400, stock: 60,
    seller: 'Koperasi Nelayan Mulia',
    image: 'https://images.unsplash.com/photo-1558231908-1678be8cde47?auto=format&fit=crop&w=400&h=280&q=80',
    badge: 'Kering', badgeType: 'badge-warning',
    description: 'Sisik ikan kerapu asli yang sudah dicuci bersih dan dijemur kering. Cocok untuk bahan kerajinan artisan dan ekstraksi peptida.',
    journey: [
      { title: 'Pengumpulan Sisik', desc: 'Sisik ikan kerapu besar dikumpulkan sesaat setelah ikan merapat di dermaga.', loc: 'TPI Lampulo' },
      { title: 'Pencucian', desc: 'Dicuci dengan air mengalir dan disikat ringan untuk membuang sisa lendir.', loc: 'Area Pembersihan' },
      { title: 'Pengeringan', desc: 'Dijemur di bawah sinar matahari langsung selama 2 hari hingga kadar air < 12%.', loc: 'Sentra Pengeringan' },
      { title: 'Distribusi', desc: 'Dikemas aman dalam kantong ziplock dan siap dikirim ke pengrajin seluruh Indonesia.', loc: 'Toko Penjual Distribusi' }
    ]
  }
];

const SUBCATS = {
  limbah: [
    { id: 'all', name: 'Semua Limbah' },
    { id: 'tulang', name: 'Tulang & Kepala' },
    { id: 'sisik', name: 'Sisik Ikan' },
    { id: 'kulit', name: 'Kulit Ikan' }
  ],
  olahan: [
    { id: 'all', name: 'Semua Olahan' },
    { id: 'makanan', name: 'Gastronomi' },
    { id: 'kesehatan', name: 'Kesehatan & Kecantikan' },
    { id: 'kerajinan', name: 'Kerajinan Artisan' },
    { id: 'pakan', name: 'Agrikultur & Akuakultur' }
  ]
};

// ── State ─────────────────────────────────────────────────────
let activeMain = 'limbah';
let activeCategory = 'all';
let sortOrder = 'best-seller';
let wishlist = new Set();
let cartCount = 0;

// ── Render Products ───────────────────────────────────────────
function getFilteredProducts() {
  let products = PRODUCTS.filter(p => p.mainType === activeMain);

  // Category
  if (activeCategory !== 'all') {
    products = products.filter(p => p.category === activeCategory);
  }

  // Price filter
  const min = parseInt(document.getElementById('price-min')?.value) || 0;
  const max = parseInt(document.getElementById('price-max')?.value) || Infinity;
  if (min > 0 || max < Infinity) {
    products = products.filter(p => p.price >= min && p.price <= max);
  }

  // Rating filter
  const rating = parseFloat(document.querySelector('input[name="rating"]:checked')?.value) || 0;
  if (rating > 0) {
    products = products.filter(p => p.rating >= rating);
  }

  // Stock filter
  const stockAvailable = document.getElementById('stock-available')?.checked;
  if (stockAvailable) {
    products = products.filter(p => (p.stock || 0) > 0);
  }

  // Search
  const query = document.getElementById('mp-search')?.value.toLowerCase().trim();
  if (query && query.length > 1) {
    products = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.seller.toLowerCase().includes(query)
    );
  }

  // Sort
  switch (sortOrder) {
    case 'best-seller': products.sort((a, b) => b.sold - a.sold); break;
    case 'rating':      products.sort((a, b) => b.rating - a.rating); break;
    case 'price-asc':   products.sort((a, b) => a.price - b.price); break;
    case 'price-desc':  products.sort((a, b) => b.price - a.price); break;
  }

  return products;
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const products = getFilteredProducts();
  const count = document.getElementById('mp-count');
  if (count) count.innerHTML = `Menampilkan <strong>${products.length}</strong> produk`;

  if (products.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:64px 32px;color:var(--text-muted);">
        <div style="font-size:0.95rem;font-weight:600;margin-bottom:8px;color:var(--text-secondary);">Produk tidak ditemukan</div>
        <div style="font-size:0.83rem;">Coba ubah filter atau kata kunci pencarian</div>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map((p, i) => `
    <div class="product-card" data-id="${p.id}" style="opacity:0;transform:translateY(20px);transition:opacity 0.5s ease ${i*0.06}s,transform 0.5s ease ${i*0.06}s;">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="product-badges">
          ${p.badge ? `<span class="badge ${p.badgeType || 'badge-light'}">${p.badge}</span>` : ''}
          ${p.stock < 15 ? `<span class="badge badge-red">Stok Terbatas</span>` : ''}
        </div>
        <!-- Traceability Badge overlay -->
        <div style="position:absolute; bottom:10px; right:10px; background:rgba(255,255,255,0.9); color:var(--ocean-darkest); font-size:0.65rem; font-weight:700; padding:4px 8px; border-radius:4px; display:flex; align-items:center; gap:4px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Jejak Ekologis
        </div>
        <button class="product-wish ${wishlist.has(p.id) ? 'liked' : ''}" data-id="${p.id}" aria-label="Simpan ke wishlist">
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div class="product-body">
        <div class="product-info">
          <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:4px; display:flex; align-items:center; gap:4px;">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Toko: ${p.seller}
          </div>
          <div class="product-cat">${categoryLabel(p.category)}</div>
          <div class="product-name">${p.name}</div>
        </div>
        <div class="product-meta">
          <span class="product-stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}</span>
          <span class="product-rating">${p.rating}</span>
          <span class="product-sold">${p.sold.toLocaleString('id-ID')} terjual</span>
        </div>
        <div class="product-footer">
          <div>
            <div class="product-price">Rp ${p.price.toLocaleString('id-ID')}</div>
            ${p.oldPrice ? `<div class="product-price-old">Rp ${p.oldPrice.toLocaleString('id-ID')}</div>` : ''}
          </div>
          <button class="add-btn" data-id="${p.id}" aria-label="Tambah ke keranjang">+</button>
        </div>
      </div>
    </div>
  `).join('');

  // Trigger fade-in animation for all cards
  requestAnimationFrame(() => {
    grid.querySelectorAll('.product-card').forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  });

  // Attach events
  grid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.product-wish') || e.target.closest('.add-btn')) return;
        window.location.href = `produk.html?id=${card.dataset.id}`;
      });
  });

  grid.querySelectorAll('.product-wish').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      if (wishlist.has(id)) {
        wishlist.delete(id);
        btn.classList.remove('liked');
        btn.querySelector('svg').style.fill = 'none';
        showToast('Dihapus dari wishlist');
      } else {
        wishlist.add(id);
        btn.classList.add('liked');
        showToast('Ditambahkan ke wishlist');
      }
    });
  });

  grid.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount++;
      showToast('Berhasil ditambahkan ke keranjang', 'success');
    });
  });
}


function categoryLabel(cat) {
  const map = {
    'tulang': 'Tulang & Kepala',
    'sisik': 'Sisik Ikan',
    'kulit': 'Kulit Ikan',
    'makanan': 'Gastronomi',
    'pakan': 'Pakan & Pertanian',
    'kerajinan': 'Kerajinan',
    'kesehatan': 'Kesehatan'
  };
  return map[cat] || cat;
}


// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();

  function renderSubcategories() {
    const subcats = SUBCATS[activeMain];
    
    // Top tabs
    const subTabs = document.getElementById('mp-sub-tabs');
    if (subTabs) {
      subTabs.innerHTML = subcats.map(c => 
        `<button class="mp-cat-tab ${c.id === activeCategory ? 'active' : ''}" data-cat="${c.id}">${c.name}</button>`
      ).join('');
    }

    // Sidebar
    const sideSubs = document.getElementById('sidebar-sub-cats');
    if (sideSubs) {
      sideSubs.innerHTML = subcats.map(c => {
        const count = c.id === 'all' 
          ? PRODUCTS.filter(p => p.mainType === activeMain).length
          : PRODUCTS.filter(p => p.mainType === activeMain && p.category === c.id).length;
        return `<button class="cat-btn ${c.id === activeCategory ? 'active' : ''}" data-cat="${c.id}">${c.name} <span class="cat-count">${count}</span></button>`;
      }).join('');
    }

    // Attach events
    document.querySelectorAll('.mp-cat-tab, .cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.cat;
        renderSubcategories(); // re-render to update active states
        renderProducts();
      });
    });
  }

  renderSubcategories();

  // Initialize the banner properly
  setTimeout(() => {
    document.querySelector('.main-side-btn.active')?.click();
  }, 100);

  // Main Tabs (Top & Side)
  document.querySelectorAll('.main-tab-btn, .main-side-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeMain = btn.dataset.main;
      activeCategory = 'all'; // reset subcategory

      // Update Top Tabs
      document.querySelectorAll('.main-tab-btn').forEach(t => {
        if (t.dataset.main === activeMain) {
          t.classList.remove('btn-outline-dark');
          t.classList.add('btn-navy', 'active');
        } else {
          t.classList.remove('btn-navy', 'active');
          t.classList.add('btn-outline-dark');
        }
      });

      // Update Side Tabs
      document.querySelectorAll('.main-side-btn').forEach(t => {
        t.classList.toggle('active', t.dataset.main === activeMain);
      });

      // Update Info Banner
      const infoBanner = document.getElementById('marketplace-info-banner');
      const bannerTitle = document.getElementById('banner-title');
      const bannerText = document.getElementById('banner-text');
      const bannerIcon = document.getElementById('banner-icon');

      if (infoBanner && bannerTitle && bannerText && bannerIcon) {
        if (activeMain === 'limbah') {
          infoBanner.style.display = 'block';
          infoBanner.style.backgroundColor = '#fffbeb'; // yellow-50
          infoBanner.style.borderLeftColor = '#f59e0b'; // amber-500
          bannerIcon.style.color = '#d97706'; // amber-600
          bannerIcon.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
          bannerTitle.innerText = 'Info Pengiriman Limbah Mentah';
          bannerTitle.style.color = '#92400e';
          bannerText.innerHTML = 'Karena sifatnya yang mudah busuk, limbah mentah hanya melayani <strong>Pick-Up (Ambil Sendiri)</strong> atau <strong>Pengiriman Instan</strong> dalam radius 15km dari Toko Penjual untuk menjaga kesegaran dan kebersihan.';
        } else if (activeMain === 'olahan') {
          infoBanner.style.display = 'block';
          infoBanner.style.backgroundColor = '#f0fdf4'; // green-50
          infoBanner.style.borderLeftColor = '#22c55e'; // green-500
          bannerIcon.style.color = '#16a34a'; // green-600
          bannerIcon.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>';
          bannerTitle.innerText = 'Smart Bulk Order Aktif';
          bannerTitle.style.color = '#166534';
          bannerText.innerHTML = 'Gunakan fitur <strong>Smart Bulk Order</strong>. Jika Anda membeli dalam jumlah tonase besar, sistem kami otomatis mengumpulkan (agregasi) stok dari berbagai toko mitra terdekat sekaligus.';
        } else {
          infoBanner.style.display = 'none';
        }
      }

      renderSubcategories();
      renderProducts();
    });
  });

  // Sort
  document.getElementById('mp-sort')?.addEventListener('change', (e) => {
    sortOrder = e.target.value;
    renderProducts();
  });

  // Search
  document.getElementById('mp-search')?.addEventListener('input', () => renderProducts());
  document.querySelector('.mp-search-btn')?.addEventListener('click', () => {
    document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' });
    renderProducts();
  });

  // Price filter
  document.getElementById('price-min')?.addEventListener('input', renderProducts);
  document.getElementById('price-max')?.addEventListener('input', renderProducts);

  // Rating filter
  document.querySelectorAll('input[name="rating"]').forEach(r => {
    r.addEventListener('change', renderProducts);
  });

  // Stock filter
  document.getElementById('stock-available')?.addEventListener('change', renderProducts);



  // Reset filter
  document.getElementById('sidebar-reset')?.addEventListener('click', () => {
    activeCategory = 'all';
    sortOrder = 'best-seller';
    renderSubcategories();
    document.getElementById('price-min').value = '';
    document.getElementById('price-max').value = '';
    document.querySelector('input[name="rating"][value="all"]').checked = true;
    document.getElementById('stock-available').checked = false;
    document.getElementById('mp-sort').value = 'best-seller';
    document.getElementById('mp-search').value = '';
    renderProducts();
  });

  // View toggle
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const grid = document.getElementById('products-grid');
      if (grid) {
        grid.style.gridTemplateColumns = btn.dataset.view === 'list' ? '1fr' : '';
      }
    });
  });
});
