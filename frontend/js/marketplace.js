/* =============================================================
   LAMURI — marketplace.js
   Products with real Unsplash images, no emoji
   ============================================================= */

let PRODUCTS = [];

async function fetchProducts() {
  try {
    const res = await fetch('/api/products'); // Ganti dengan URL Render saat produksi
    const data = await res.json();
    PRODUCTS = data.map(p => ({
      ...p,
      id: p._id // Sesuaikan _id dari MongoDB ke id untuk frontend
    }));
    renderProducts();
  } catch (err) {
    console.error('Gagal mengambil data produk dari API:', err);
  }
}

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
  fetchProducts();

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
          bannerText.innerHTML = 'Karena sifatnya yang mudah busuk, limbah mentah hanya melayani <strong>Pick-Up (Ambil Sendiri)</strong> atau <strong>Pengiriman Instan</strong> dalam radius 15km dari <strong>LAMURI Hub</strong> untuk menjaga kesegaran dan kebersihan.';
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
