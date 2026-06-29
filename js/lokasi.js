/* =============================================================
   RE-OCEAN — Lokasi JS (Leaflet Map + Geolocation)
   ============================================================= */

// ── Mock seller data ──────────────────────────────────────────
const SELLERS = [
  {
    id: 1,
    name: 'UD. Barokah Laut',
    type: 'Olahan & Limbah Ikan',
    icon: '🐟',
    lat: 5.5510,
    lng: 95.3190,
    rating: 4.8,
    products: 24,
    distance: null,
    status: 'open',
    address: 'Jl. Nelayan No.12, Banda Aceh',
    phone: '0811-2345-6789',
    hours: '07.00 – 18.00 WIB'
  },
  {
    id: 2,
    name: 'Koperasi Nelayan Mulia',
    type: 'Limbah & Pakan Ikan',
    icon: '🏪',
    lat: 5.5420,
    lng: 95.3350,
    rating: 4.6,
    products: 18,
    distance: null,
    status: 'open',
    address: 'Jl. Pantai Lhoknga KM 3, Aceh Besar',
    phone: '0813-5678-9012',
    hours: '08.00 – 17.00 WIB'
  },
  {
    id: 3,
    name: 'Hub RE-OCEAN Ulee Lheue',
    type: 'Pusat Pengolahan Limbah',
    icon: '🌊',
    lat: 5.5580,
    lng: 95.2980,
    rating: 4.9,
    products: 47,
    distance: null,
    status: 'open',
    address: 'Pelabuhan Ulee Lheue, Banda Aceh',
    phone: '0821-8765-4321',
    hours: '06.00 – 20.00 WIB'
  },
  {
    id: 4,
    name: 'Toko Berkah Samudra',
    type: 'Kerajinan Limbah Ikan',
    icon: '🛍️',
    lat: 5.5460,
    lng: 95.3100,
    rating: 4.5,
    products: 12,
    distance: null,
    status: 'closed',
    address: 'Jl. Diponegoro No.45, Banda Aceh',
    phone: '0822-1122-3344',
    hours: '09.00 – 17.00 WIB'
  },
  {
    id: 5,
    name: 'CV. Pesisir Mandiri',
    type: 'Bahan Baku & Kesehatan',
    icon: '💊',
    lat: 5.5630,
    lng: 95.3280,
    rating: 4.7,
    products: 31,
    distance: null,
    status: 'open',
    address: 'Kawasan Industri Lampulo, Banda Aceh',
    phone: '0812-9876-5432',
    hours: '07.30 – 16.30 WIB'
  }
];

let map = null;
let userMarker = null;
let sellerMarkers = [];
let userCoords = null;
let selectedSeller = null;

// ── Haversine Distance ─────────────────────────────────────────
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2;
  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))).toFixed(1);
}

// ── Init Map ──────────────────────────────────────────────────
function initMap(center = [5.548, 95.323], zoom = 13) {
  const mapEl = document.getElementById('lokasi-map');
  if (!mapEl || typeof L === 'undefined') return;

  map = L.map('lokasi-map', {
    center,
    zoom,
    zoomControl: false
  });

  // Custom tile layer with dark style
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    opacity: 0.85
  }).addTo(map);

  // Add zoom control to top-right
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // Add map CSS filter for dark style only to tiles (so popup isn't grayed out)
  const style = document.createElement('style');
  style.innerHTML = '.leaflet-tile-pane { filter: hue-rotate(200deg) saturate(0.8) brightness(0.75) contrast(1.1); }';
  document.head.appendChild(style);

  // Add sellers to map
  addSellersToMap();

  // Hide loading
  const loading = document.querySelector('.map-loading');
  if (loading) {
    setTimeout(() => loading.classList.add('hidden'), 1000);
  }
}

// ── Add Seller Markers ────────────────────────────────────────
function addSellersToMap() {
  SELLERS.forEach(seller => {
    const icon = L.divIcon({
      html: `
        <div style="
          width: 44px; height: 44px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          background: linear-gradient(135deg, #2A4D86, #7C94B6);
          border: 2px solid #D9D9D8;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(42,77,134,0.6);
        ">
          <span style="transform: rotate(45deg); font-size: 1.1rem;">${seller.icon}</span>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 44],
      popupAnchor: [0, -44],
      className: ''
    });

    const marker = L.marker([seller.lat, seller.lng], { icon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family:'DM Sans',sans-serif; min-width: 220px; padding: 4px;">
          <div class="map-popup-title" style="font-family:var(--font-serif); font-size:1.2rem; color:var(--navy-900); margin-bottom:4px;">${seller.icon} ${seller.name}</div>
          <div class="map-popup-meta" style="margin-bottom:8px; font-weight:600; color:#1896B8; font-size:0.82rem;">Kategori: ${seller.type}</div>
          <div class="map-popup-meta" style="margin-bottom:12px; font-size:0.8rem; line-height:1.4; color:#6B7F9E;">Toko ini menjual produk olahan limbah ikan premium dan <strong>menerima pesanan online (BOPIS)</strong>.</div>
          <div class="map-popup-meta" style="font-size:0.8rem; color:#2C3A50;">📍 ${seller.address}</div>
          <div class="map-popup-meta" style="font-size:0.8rem; color:#2C3A50; margin-top:4px;">⏰ ${seller.hours}</div>
          <div class="map-popup-meta" style="font-size:0.8rem; color:#2C3A50; margin-top:4px;">⭐ ${seller.rating} · ${seller.products} produk sirkular</div>
          <div style="margin-top:12px; display:flex; justify-content:space-between; align-items:center;">
            <span style="
              display:inline-block; padding:4px 10px;
              border-radius:20px; font-size:0.72rem; font-weight:600;
              background: ${seller.status === 'open' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.1)'};
              color: ${seller.status === 'open' ? '#4ade80' : '#f87171'};
              border: 1px solid ${seller.status === 'open' ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)'};
            ">${seller.status === 'open' ? '🟢 Buka' : '🔴 Tutup'}</span>
            <button onclick="openStoreModal(${seller.id})" style="padding:6px 12px; border-radius:16px; background:var(--navy-600); color:#fff; font-size:0.75rem; font-weight:600; border:none; cursor:pointer;">Kunjungi</button>
          </div>
        </div>
      `);

    marker.on('click', () => selectSeller(seller.id));
    sellerMarkers.push({ id: seller.id, marker });
  });
}

// ── Geolocation ───────────────────────────────────────────────
function locateUser() {
  const btn = document.querySelector('.map-locate-btn');
  if (!navigator.geolocation) {
    showToast('Geolokasi tidak didukung browser ini.', 'error');
    return;
  }

  if (btn) {
    btn.classList.add('loading');
    btn.innerHTML = '⏳ Mencari...';
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      updateUserPosition(userCoords);
      if (btn) {
        btn.classList.remove('loading');
        btn.innerHTML = '📍 Lokasiku';
      }
      showToast('Lokasi berhasil ditemukan!', 'success');
    },
    (err) => {
      // Fallback to mock location (Banda Aceh)
      userCoords = { lat: 5.5500, lng: 95.3180 };
      updateUserPosition(userCoords);
      if (btn) {
        btn.classList.remove('loading');
        btn.innerHTML = '📍 Lokasiku';
      }
      showToast('Menggunakan lokasi demo: Banda Aceh', 'info');
    },
    { timeout: 10000 }
  );
}

function updateUserPosition({ lat, lng }) {
  if (!map) return;

  const userIcon = L.divIcon({
    html: `
      <div style="position:relative;">
        <div style="
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #D9D9D8;
          border: 3px solid #7C94B6;
          box-shadow: 0 0 0 8px rgba(217,217,216,0.2), 0 4px 12px rgba(0,0,0,0.3);
          animation: userPulse 2s ease-in-out infinite;
        "></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    className: ''
  });

  if (userMarker) map.removeLayer(userMarker);
  userMarker = L.marker([lat, lng], { icon: userIcon })
    .addTo(map)
    .bindPopup('<div class="map-popup-title">📍 Lokasi Saya</div><div class="map-popup-meta">Posisi Anda saat ini</div>');

  map.flyTo([lat, lng], 14, { duration: 1.5 });

  // Update distances
  SELLERS.forEach(seller => {
    seller.distance = getDistance(lat, lng, seller.lat, seller.lng);
  });

  // Sort by distance
  SELLERS.sort((a, b) => a.distance - b.distance);

  // Update location card
  updateLocationCard(lat, lng);
  renderNearbyList();
}

// ── Location Card ─────────────────────────────────────────────
function updateLocationCard(lat, lng) {
  const coordEl = document.getElementById('user-coords');
  if (coordEl) {
    coordEl.textContent = `${lat.toFixed(4)}° LU, ${lng.toFixed(4)}° BT`;
  }

  const addressEl = document.getElementById('user-address');
  if (addressEl) addressEl.textContent = 'Banda Aceh, Aceh, Indonesia';
}

// ── Nearby List ───────────────────────────────────────────────
function renderNearbyList() {
  const list = document.querySelector('.nearby-list');
  if (!list) return;

  list.innerHTML = SELLERS.map(seller => `
    <div class="seller-card glass-card-light" id="seller-card-${seller.id}" onclick="selectSeller(${seller.id})">
      <div class="seller-icon">${seller.icon}</div>
      <div class="seller-body">
        <div class="seller-name">${seller.name}</div>
        <div class="seller-type">${seller.type}</div>
        <div class="seller-dist">
          📍 ${seller.distance ? seller.distance + ' km' : 'Menghitung...'}
          &nbsp;·&nbsp; ⭐ ${seller.rating}
        </div>
      </div>
      <div>
        <span class="seller-status ${seller.status}">${seller.status === 'open' ? 'Buka' : 'Tutup'}</span>
        <button class="btn btn-navy" style="margin-top:8px; padding:4px 12px; font-size:0.75rem; width:100%; border-radius:20px;" onclick="openStoreModal(${seller.id}); event.stopPropagation();">Kunjungi</button>
      </div>
    </div>
  `).join('');
}

// ── Select Seller ─────────────────────────────────────────────
function selectSeller(id) {
  const seller = SELLERS.find(s => s.id === id);
  if (!seller || !map) return;

  // Highlight card
  document.querySelectorAll('.seller-card').forEach(c => c.classList.remove('selected'));
  document.getElementById(`seller-card-${id}`)?.classList.add('selected');

  // Fly to marker
  map.flyTo([seller.lat, seller.lng], 15, { duration: 1 });

  // Open popup
  const markerObj = sellerMarkers.find(m => m.id === id);
  if (markerObj) markerObj.marker.openPopup();
}

// ── Store Modal ───────────────────────────────────────────────
function openStoreModal(id) {
  const seller = SELLERS.find(s => s.id === id);
  if (!seller) return;

  document.getElementById('store-modal-icon').textContent = seller.icon;
  document.getElementById('store-modal-name').textContent = seller.name;
  document.getElementById('store-modal-type').textContent = seller.type;
  document.getElementById('store-modal-address').textContent = seller.address;
  document.getElementById('store-modal-hours').textContent = seller.hours + ' (' + (seller.status === 'open' ? 'Buka' : 'Tutup') + ')';
  document.getElementById('store-modal-rating').textContent = seller.rating + ' / 5.0';
  document.getElementById('store-modal-phone').textContent = seller.phone;

  // Mock products list based on seller type
  const products = [
    { name: seller.type.includes('Limbah') ? 'Kulit Ikan Mentah (1kg)' : 'Kerupuk Kulit Ikan', price: 15000 },
    { name: seller.type.includes('Pakan') ? 'Pupuk Cair Organik' : 'Tulang Ikan Kakap Merah', price: 25000 },
    { name: seller.type.includes('Kerajinan') ? 'Tas Anyaman Sisik' : 'Minyak Ikan Premium', price: 45000 }
  ];

  const productsHtml = products.map(p => `
    <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--warm-50); border-radius:12px; margin-bottom:8px;">
      <div style="font-size:0.9rem; font-weight:600; color:var(--navy-900);">${p.name}</div>
      <div style="font-size:0.85rem; font-weight:600; color:var(--teal-600);">Rp ${p.price.toLocaleString('id-ID')}</div>
    </div>
  `).join('');

  document.getElementById('store-modal-products').innerHTML = productsHtml;

  const modal = document.getElementById('store-modal');
  if (modal) {
    const visitBtn = document.getElementById('store-modal-visit-btn');
    if (visitBtn) {
      visitBtn.onclick = () => window.location.href = `toko.html?id=${id}`;
    }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

// ── Expose functions globally ─────────────────────────────────
window.selectSeller = selectSeller;
window.openStoreModal = openStoreModal;

// ── Toast (inline fallback) ───────────────────────────────────
function showToast(msg, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:8px;';
    document.body.appendChild(container);
  }

  const icons = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' };
  const toast = document.createElement('div');
  toast.style.cssText = `
    background:rgba(15,31,61,0.95);border:1px solid rgba(217,217,216,0.2);
    border-radius:12px;padding:12px 18px;color:#f0f4fa;
    font-family:'Inter',sans-serif;font-size:0.85rem;
    display:flex;align-items:center;gap:10px;
    backdrop-filter:blur(16px);box-shadow:0 8px 32px rgba(0,0,0,0.4);
    opacity:0;transform:translateY(16px);transition:all 0.3s;max-width:320px;
  `;
  toast.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '1'; toast.style.transform = 'translateY(0)'; }, 10);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Initialize map
  initMap();

  // Render initial seller list (no distances)
  renderNearbyList();

  // Locate button
  document.querySelector('.map-locate-btn')?.addEventListener('click', locateUser);

  // Auto-locate
  setTimeout(locateUser, 800);

  // Update stats
  const totalSellers = document.getElementById('total-sellers');
  const totalProduks = document.getElementById('total-produks');
  const avgRating = document.getElementById('avg-rating');
  if (totalSellers) totalSellers.textContent = SELLERS.length;
  if (totalProduks) totalProduks.textContent = SELLERS.reduce((a, s) => a + s.products, 0);
  if (avgRating) avgRating.textContent = (SELLERS.reduce((a, s) => a + s.rating, 0) / SELLERS.length).toFixed(1);

  // Modal close events
  document.getElementById('store-modal-close')?.addEventListener('click', () => {
    document.getElementById('store-modal').classList.remove('open');
    document.body.style.overflow = '';
  });

  document.getElementById('store-modal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      document.getElementById('store-modal').classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});
