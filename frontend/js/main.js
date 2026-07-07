/* =============================================================
   LAMURI — main.js
   Shared utilities: nav scroll, reveal, counter, mobile menu
   ============================================================= */

// ── Navigation scroll behavior & Parallax ──────────────────────
const navbar = document.getElementById('navbar');
const wave = document.querySelector('.hero-wave');

function handleNavScroll() {
  const currentScrollY = window.scrollY;
  
  // Wave animation
  if (wave) {
    if (currentScrollY > 10) {
      wave.classList.add('show');
    } else {
      wave.classList.remove('show');
    }
  }

  if (!navbar) return;
  
  const canBeTransparent = navbar.hasAttribute('data-transparent');
  
  if (currentScrollY > 60) {
    if (canBeTransparent) navbar.classList.remove('transparent');
    navbar.classList.add('scrolled');
    navbar.classList.add('nav-compact');
  } else {
    if (canBeTransparent) {
      navbar.classList.add('transparent');
      navbar.classList.remove('scrolled');
    }
    navbar.classList.remove('nav-compact');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });

// ── Mobile menu ───────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close menu on link click
navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger?.classList.remove('active');
  });
});

// ── Scroll-reveal ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Counter animation ─────────────────────────────────────────
function animateCounter(el) {
  const target  = parseInt(el.dataset.target) || 0;
  const suffix  = el.dataset.suffix || '';
  const duration = 1800;
  const step     = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('id-ID') + suffix;
  }, step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ── SDG progress bars ──────────────────────────────────────────
const sdgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.sdg-bar-fill[data-width]').forEach(bar => {
        const w = bar.dataset.width;
        setTimeout(() => { bar.style.width = w + '%'; }, 200);
      });
      sdgObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.sdgs-grid').forEach(el => sdgObserver.observe(el));

// ── Toast notification ────────────────────────────────────────
window.showToast = function(msg, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.style.cssText = `
      position:fixed;bottom:24px;right:24px;z-index:9999;
      display:flex;flex-direction:column;gap:8px;
    `;
    document.body.appendChild(container);
  }

  const colors = {
    info:    { bg: '#EEF3FA', border: '#D6E0EE', text: '#2A4D86' },
    success: { bg: '#ecfdf5', border: '#a7f3d0', text: '#059669' },
    error:   { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' }
  };
  const c = colors[type] || colors.info;

  const toast = document.createElement('div');
  toast.style.cssText = `
    background:${c.bg};border:1px solid ${c.border};
    border-radius:12px;padding:12px 18px;color:${c.text};
    font-family:'Inter',sans-serif;font-size:0.85rem;
    display:flex;align-items:center;gap:10px;
    box-shadow:0 8px 32px rgba(42,77,134,0.12);
    opacity:0;transform:translateY(16px);transition:all 0.3s;
    max-width:340px;font-weight:500;
  `;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '1'; toast.style.transform = 'translateY(0)'; }, 10);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3500);
};

// ── Marquee duplicate ──────────────────────────────────────────
const marqueeTrack = document.getElementById('marquee-track');
if (marqueeTrack) {
  const clone = marqueeTrack.innerHTML;
  marqueeTrack.innerHTML += clone;
}

// ── Preview map (beranda only) ────────────────────────────────
function initPreviewMap() {
  const el = document.getElementById('preview-map');
  if (!el || typeof L === 'undefined') return;

  const map = L.map('preview-map', {
    center: [5.548, 95.3238],
    zoom: 11,
    zoomControl: false,
    scrollWheelZoom: false,
    dragging: false,
    attributionControl: false
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // Toko Penjual markers
  const hubs = [
    { pos: [5.548, 95.3238], name: 'Toko Penjual Ulee Lheue' },
    { pos: [5.555, 95.344],  name: 'Toko Penjual Peunayong' },
    { pos: [5.504, 95.298],  name: 'Toko Penjual Lampuuk' }
  ];

  const icon = L.divIcon({
    html: `<div style="width:14px;height:14px;background:#2A4D86;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(42,77,134,0.4);"></div>`,
    className: '',
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });

  hubs.forEach(h => L.marker(h.pos, { icon }).addTo(map).bindPopup(h.name));

  document.getElementById('map-loading')?.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('preview-map')) initPreviewMap();
});
