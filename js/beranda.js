/* =============================================================
   LAMURI — Beranda JS v6
   Fish path animation, side waves, bubbles, hero slider
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── Marquee duplication ──────────────────────────────────────
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const items = marqueeTrack.innerHTML;
    marqueeTrack.innerHTML = items + items;
  }

  // ── Hero Bubbles ──────────────────────────────────────────────
  const bubblesContainer = document.getElementById('hero-bubbles');
  if (bubblesContainer) {
    for (let i = 0; i < 18; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      const size = Math.random() * 60 + 20;
      bubble.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        bottom: ${Math.random() * 20}%;
        animation-duration: ${Math.random() * 12 + 8}s;
        animation-delay: ${Math.random() * 8}s;
      `;
      bubblesContainer.appendChild(bubble);
    }
  }

  // ── Location preview mini-map ────────────────────────────────
  const previewMap = document.getElementById('preview-map');
  if (previewMap && typeof L !== 'undefined') {
    const map = L.map('preview-map', {
      center: [5.548, 95.323],
      zoom: 12,
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: false,
      attributionControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.8
    }).addTo(map);

    const icon = L.divIcon({
      html: '<div style="width:16px;height:16px;border-radius:50%;background:#2a4d88;border:3px solid #fff;box-shadow:0 0 12px rgba(42,77,136,0.6)"></div>',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      className: ''
    });

    L.marker([5.548, 95.323], { icon }).addTo(map);
    L.marker([5.555, 95.344], { icon }).addTo(map);
    L.marker([5.504, 95.298], { icon }).addTo(map);
  }

  // ── Hero Slider ───────────────────────────────────────────────
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-slider-dots .dot');
  const btnPrev = document.querySelector('.hero-slider-btn.prev');
  const btnNext = document.querySelector('.hero-slider-btn.next');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() { showSlide(currentSlide + 1); }
  function prevSlide() { showSlide(currentSlide - 1); }

  if (slides.length > 0) {
    btnNext?.addEventListener('click', () => { nextSlide(); resetInterval(); });
    btnPrev?.addEventListener('click', () => { prevSlide(); resetInterval(); });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { showSlide(i); resetInterval(); });
    });

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 3500);
    }
    resetInterval();
  }

  // ── Side Wave Canvases ────────────────────────────────────────
  const waveLeft  = document.getElementById('wave-left');
  const waveRight = document.getElementById('wave-right');
  const canvasL   = document.getElementById('canvas-wave-left');
  const canvasR   = document.getElementById('canvas-wave-right');

  function drawWave(canvas, side, offset) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width = 120;
    const H = canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, W, H);
    
    const t = Date.now() * 0.001;
    for (let w = 0; w < 3; w++) {
      const alpha = 0.15 - (w * 0.04);
      const amp = 30 + w * 15;
      const freq = 0.012 + w * 0.004;
      const phaseShift = w * 1.2;

      ctx.beginPath();
      ctx.strokeStyle = `rgba(42,77,136,${alpha})`;
      ctx.lineWidth = 1.5 - w * 0.3;

      const xBase = side === 'left' ? W - 10 - w * 22 : 10 + w * 22;

      for (let y = 0; y <= H; y += 2) {
        const x = xBase + Math.sin(y * freq + t + phaseShift) * amp;
        if (y === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  let waveAnimId;
  function animateWaves() {
    if (canvasL) drawWave(canvasL, 'left', 0);
    if (canvasR) drawWave(canvasR, 'right', Math.PI);
    waveAnimId = requestAnimationFrame(animateWaves);
  }

  let wavesRunning = false;
  function handleWaveScroll() {
    const scrolled = window.scrollY > 100;
    if (scrolled && !wavesRunning) {
      wavesRunning = true;
      animateWaves();
    }
    if (waveLeft)  waveLeft.classList.toggle('visible', scrolled);
    if (waveRight) waveRight.classList.toggle('visible', scrolled);
  }

  window.addEventListener('scroll', handleWaveScroll, { passive: true });

  // ── Fish Path Animation Removed (Replaced by pure CSS) ──

  // ── SDG Progress Bars ─────────────────────────────────────────
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

  // ── Smooth scroll for CTA ──────────────────────────────────────
  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.scrollTo);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ── Featured Products ─────────────────────────────────────────
  function renderFeaturedProducts() {
    const featuredGrid = document.getElementById('featured-products-grid');
    if (!featuredGrid) return;

    if (typeof PRODUCTS === 'undefined' || !PRODUCTS.length) {
      setTimeout(renderFeaturedProducts, 300);
      return;
    }

    const featured = [...PRODUCTS].sort((a, b) => b.sold - a.sold).slice(0, 8);

    if (featured.length === 0) {
      featuredGrid.innerHTML = '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;padding:40px;">Memuat produk...</p>';
      return;
    }

    featuredGrid.innerHTML = featured.map((p, i) => {
      const priceStr = 'Rpu00a0' + p.price.toLocaleString('id-ID');
      const oldStr   = p.oldPrice ? 'Rpu00a0' + p.oldPrice.toLocaleString('id-ID') : '';
      const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
      return `
        <a href="produk.html?id=${p.id}" class="produk-card" style="animation-delay:${i * 0.07}s">
          <div style="position:relative;overflow:hidden;">
            <img src="${p.image}" alt="${p.name}" class="produk-card-img" loading="lazy"
                 onerror="this.src='https://images.unsplash.com/photo-1544473244-f6895e69da8e?auto=format&fit=crop&w=400&h=185&q=80'">
            ${discount > 0 ? `<div style="position:absolute;top:10px;left:10px;background:#ef4444;color:#fff;font-size:0.65rem;font-weight:700;padding:3px 8px;border-radius:99px;">-${discount}%</div>` : ''}
          </div>
          <div class="produk-card-body">
            ${p.badge ? `<div class="produk-card-badge">${p.badge}</div>` : ''}
            <div class="produk-card-name">${p.name}</div>
            <div class="produk-card-seller">🚢 ${p.seller}</div>
            <div class="produk-card-footer">
              <div>
                <span class="produk-card-price">${priceStr}</span>
                ${oldStr ? `<span class="produk-card-old">${oldStr}</span>` : ''}
              </div>
              <div class="produk-card-rating">
                <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ${p.rating} &bull; <span style="font-size:0.7rem;">${p.sold.toLocaleString('id-ID')} terjual</span>
              </div>
            </div>
          </div>
        </a>`;
    }).join('');

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    featuredGrid.querySelectorAll('.produk-card').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`;
      cardObserver.observe(el);
    });
  }

  renderFeaturedProducts();

});
