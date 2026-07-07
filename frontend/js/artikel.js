/* =============================================================
   LAMURI — Artikel JS
   ============================================================= */

// ── Article Data ──────────────────────────────────────────────
const ARTICLES = [
  {
    id: 1,
    title: 'Bahaya Limbah Ikan yang Dibuang Sembarangan ke Laut: Ancaman Nyata Ekosistem',
    excerpt: 'Jutaan ton limbah ikan dibuang ke laut setiap tahun tanpa pengolahan, menyebabkan eutrofikasi masif dan kematian massal biota laut di perairan pesisir Indonesia.',
    tag: 'Lingkungan',
    emoji: '🌊',
    author: 'Dr. Aminah Bahari',
    date: '24 Jun 2026',
    readTime: '8 min',
    views: 4820,
    featured: true
  },
  {
    id: 2,
    title: 'Kolagen dari Sisik Ikan: Revolusi Industri Kecantikan Berbasis Limbah',
    excerpt: 'Penelitian terbaru menunjukkan kolagen tipe I dari sisik ikan memiliki bioavailabilitas 40% lebih tinggi dibanding kolagen sapi. Ini yang perlu Anda tahu.',
    tag: 'Kesehatan',
    emoji: '💊',
    author: 'Dr. Reza Fitriansyah',
    date: '21 Jun 2026',
    readTime: '6 min',
    views: 3250
  },
  {
    id: 3,
    title: 'Nelayan Banda Aceh Raih Pendapatan 3x Lipat dari Program LAMURI',
    excerpt: 'Pak Syahril, nelayan 20 tahun asal Ulee Lheue kini mendapat tambahan Rp 2-3 juta per bulan hanya dari menjual limbah ikan yang dulu dibuang begitu saja.',
    tag: 'Kisah Sukses',
    emoji: '🎣',
    author: 'Tim LAMURI',
    date: '18 Jun 2026',
    readTime: '5 min',
    views: 6140
  },
  {
    id: 4,
    title: 'Panduan Lengkap Membuat Pupuk Organik dari Limbah Ikan di Rumah',
    excerpt: 'Dengan peralatan sederhana, Anda bisa mengubah limbah ikan menjadi pupuk cair organik berkualitas tinggi yang laku di pasaran. Simak cara lengkapnya!',
    tag: 'Tutorial',
    emoji: '🌿',
    author: 'Ir. Nurul Hidayah',
    date: '15 Jun 2026',
    readTime: '12 min',
    views: 8920
  },
  {
    id: 5,
    title: 'LAMURI dan SDGs: Bagaimana Bisnis Limbah Ikan Memenuhi 5 Target PBB',
    excerpt: 'Analisis mendalam bagaimana model bisnis LAMURI secara sistemik berkontribusi pada Sustainable Development Goals, khususnya SDG 14 tentang ekosistem laut.',
    tag: 'SDGs',
    emoji: '🌍',
    author: 'Prof. Mahfudz Al-Amir',
    date: '12 Jun 2026',
    readTime: '10 min',
    views: 2780
  },
  {
    id: 6,
    title: 'Kerajinan Sisik Ikan: Dari Limbah Jadi Produk Fashion Premium Bernilai Jutaan',
    excerpt: 'Tas anyaman sisik ikan Aceh kini diekspor ke Eropa dan dijual seharga €85-120. Pelajari teknik dasar membuat kerajinan sisik ikan yang laku di pasar internasional.',
    tag: 'Kerajinan',
    emoji: '👜',
    author: 'Siti Maryam',
    date: '9 Jun 2026',
    readTime: '7 min',
    views: 5430
  },
  {
    id: 7,
    title: 'Ekonomi Sirkular Perikanan: Indonesia Bisa Hemat Rp 4,2 Triliun per Tahun',
    excerpt: 'Laporan LIPI 2025 mengungkap potensi ekonomi limbah ikan Indonesia yang belum termanfaatkan. LAMURI hadir sebagai platform untuk mewujudkannya.',
    tag: 'Ekonomi',
    emoji: '📊',
    author: 'Dr. Ahmad Fauzi',
    date: '6 Jun 2026',
    readTime: '9 min',
    views: 3870
  },
  {
    id: 8,
    title: 'Cara Tepat Menyimpan dan Mengeringkan Sisik Ikan agar Laku Tinggi',
    excerpt: 'Kesalahan pengeringan dan penyimpanan bisa membuat sisik ikan berjamur dan tidak laku. Pelajari SOP yang benar dalam artikel komprehensif ini.',
    tag: 'Tutorial',
    emoji: '📋',
    author: 'Tim Riset LAMURI',
    date: '3 Jun 2026',
    readTime: '6 min',
    views: 7250
  }
];

const TAGS = ['Semua', 'Lingkungan', 'Kesehatan', 'Tutorial', 'Kisah Sukses', 'SDGs', 'Kerajinan', 'Ekonomi'];

let activeTag = 'Semua';

// ── Render Featured Article ───────────────────────────────────
function renderFeatured() {
  const featured = ARTICLES.find(a => a.featured);
  if (!featured) return;

  const el = document.querySelector('.featured-card');
  if (!el) return;

  el.innerHTML = `
    <div class="featured-image">
      <span class="fi-emoji">${featured.emoji}</span>
    </div>
    <div class="featured-body glass-card">
      <div class="featured-tag">🔥 Artikel Pilihan</div>
      <h2>${featured.title}</h2>
      <p>${featured.excerpt}</p>
      <div class="featured-meta">
        <div class="featured-author">
          <div class="featured-author-avatar">👤</div>
          <span class="featured-author-name">${featured.author}</span>
        </div>
        <span class="featured-date">📅 ${featured.date}</span>
        <span class="featured-read">⏱️ ${featured.readTime} baca</span>
        <span class="featured-read">👁️ ${featured.views.toLocaleString('id-ID')}</span>
      </div>
    </div>
  `;

  el.addEventListener('click', () => openArticle(featured.id));
}

// ── Render Article Grid ───────────────────────────────────────
function renderArticles() {
  const grid = document.querySelector('.artikel-grid');
  if (!grid) return;

  const filtered = activeTag === 'Semua'
    ? ARTICLES.filter(a => !a.featured)
    : ARTICLES.filter(a => a.tag === activeTag && !a.featured);

  grid.innerHTML = filtered.map(a => `
    <div class="artikel-card glass-card" data-id="${a.id}" onclick="openArticle(${a.id})">
      <div class="artikel-card-image">
        ${a.emoji}
      </div>
      <div class="artikel-card-body">
        <div class="artikel-card-tag">${a.tag}</div>
        <div class="artikel-card-title">${a.title}</div>
        <div class="artikel-card-excerpt">${a.excerpt}</div>
        <div class="artikel-card-footer">
          <div class="artikel-card-author">✍️ ${a.author}</div>
          <div class="artikel-card-meta">
            <span>⏱️ ${a.readTime}</span>
            <span>👁️ ${a.views.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Animate in
  grid.querySelectorAll('.artikel-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 80);
  });
}

// ── Render Popular Articles (Sidebar) ─────────────────────────
function renderPopular() {
  const list = document.querySelector('.popular-list');
  if (!list) return;

  const sorted = [...ARTICLES].sort((a, b) => b.views - a.views).slice(0, 4);
  list.innerHTML = sorted.map((a, i) => `
    <div class="popular-item" onclick="openArticle(${a.id})">
      <div class="popular-item-num">0${i + 1}</div>
      <div>
        <div class="popular-item-title">${a.title}</div>
        <div class="popular-item-meta">👁️ ${a.views.toLocaleString('id-ID')} · ⏱️ ${a.readTime}</div>
      </div>
    </div>
  `).join('');
}

// ── Open Article (mock modal) ─────────────────────────────────
function openArticle(id) {
  const article = ARTICLES.find(a => a.id === id);
  if (!article) return;
  showToast(`📖 Membuka "${article.title.substring(0, 40)}..."`, 'info');
}

// ── Toast ─────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:8px;';
    document.body.appendChild(container);
  }
  const icons = { info: 'ℹ️', success: '✅', error: '❌' };
  const toast = document.createElement('div');
  toast.style.cssText = `
    background:rgba(15,31,61,0.95);border:1px solid rgba(217,217,216,0.2);
    border-radius:12px;padding:12px 18px;color:#f0f4fa;
    font-family:'Inter',sans-serif;font-size:0.85rem;
    display:flex;align-items:center;gap:10px;
    backdrop-filter:blur(16px);box-shadow:0 8px 32px rgba(0,0,0,0.4);
    opacity:0;transform:translateY(16px);transition:all 0.3s;max-width:340px;
  `;
  toast.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '1'; toast.style.transform = 'translateY(0)'; }, 10);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// Expose globally
window.openArticle = openArticle;

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  renderArticles();
  renderPopular();

  // Tag filters
  document.querySelectorAll('.tag-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tag-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTag = btn.textContent.trim();
      renderArticles();
    });
  });

  // Search
  document.querySelector('.artikel-search-input')?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const grid = document.querySelector('.artikel-grid');
    if (!grid) return;
    if (query.length < 2) { renderArticles(); return; }
    const filtered = ARTICLES.filter(a =>
      a.title.toLowerCase().includes(query) ||
      a.excerpt.toLowerCase().includes(query) ||
      a.tag.toLowerCase().includes(query)
    );
    grid.innerHTML = filtered.map(a => `
      <div class="artikel-card glass-card" onclick="openArticle(${a.id})">
        <div class="artikel-card-image">${a.emoji}</div>
        <div class="artikel-card-body">
          <div class="artikel-card-tag">${a.tag}</div>
          <div class="artikel-card-title">${a.title}</div>
          <div class="artikel-card-excerpt">${a.excerpt}</div>
          <div class="artikel-card-footer">
            <div class="artikel-card-author">✍️ ${a.author}</div>
            <div class="artikel-card-meta"><span>⏱️ ${a.readTime}</span><span>👁️ ${a.views.toLocaleString('id-ID')}</span></div>
          </div>
        </div>
      </div>
    `).join('');
  });

  // Newsletter
  document.querySelector('.newsletter-btn')?.addEventListener('click', () => {
    const input = document.querySelector('.newsletter-input');
    if (input?.value) {
      showToast('🎉 Berhasil subscribe newsletter LAMURI!', 'success');
      input.value = '';
    } else {
      showToast('Masukkan email Anda terlebih dahulu', 'error');
    }
  });
});
