/* =============================================================
   LAMURI — SEA AI Assistant JS
   Smart Ecological Assistant — Not a basic chatbot.
   ============================================================= */

// ── SEA Knowledge Base ─────────────────────────────────────────
// Keyword-based intelligent response system with contextual understanding
const SEA_KNOWLEDGE = {
  greetings: {
    triggers: ['halo', 'hai', 'hello', 'hi', 'selamat', 'assalamualaikum', 'pagi', 'siang', 'malam', 'sore'],
    response: () => `Wa'alaikumsalam! 🌊 Selamat datang di **SEA** — Smart Ecological Assistant dari LAMURI.

Saya siap membantu Anda dengan:
- 🐟 **Pengolahan limbah ikan** (sisik, tulang, kulit, minyak)
- 🛒 **Panduan jual-beli** di platform LAMURI
- 🌿 **Informasi nilai gizi & produk** olahan
- 💡 **Rekomendasi bisnis** berbasis ekonomi sirkular
- 🎓 **Edukasi** seputar limbah laut & SDGs

Ada yang bisa saya bantu hari ini?`
  },

  sisakulit: {
    triggers: ['kulit ikan', 'olah kulit', 'manfaat kulit ikan', 'jual kulit'],
    response: () => `## 🐟 Pengolahan Kulit Ikan

Kulit ikan yang biasanya dibuang ternyata punya **nilai ekonomi sangat tinggi!** Berikut panduan lengkapnya:

### Cara Pengolahan:
1. **Cuci bersih** dengan air garam 3% untuk sterilisasi
2. **Kerok sisa daging** menggunakan pisau tumpul
3. **Jemur 8-12 jam** di bawah sinar matahari langsung
4. **Simpan** di wadah bersih, bebas lembab

### Produk yang Bisa Dibuat:
- 🥨 **Keripik kulit ikan** (nilai jual Rp 35.000-80.000/150g)
- 👜 **Bahan kerajinan tas & dompet** 
- 💊 **Ekstrak kolagen** untuk suplemen kecantikan

### Standar Kualitas:
- Kadar air < 12%
- Bebas bau amis yang menyengat
- Warna konsisten (putih kekuningan)

Ingin tahu proses spesifik untuk salah satu produk di atas? Tanyakan saja! 😊`
  },

  sisik: {
    triggers: ['sisik', 'olah sisik', 'jual sisik', 'sisik ikan'],
    response: () => `## ✨ Potensi Sisik Ikan yang Luar Biasa

Sisik ikan adalah **limbah paling undervalued** di industri perikanan, padahal nilainya luar biasa!

### Kandungan Utama Sisik Ikan:
| Komponen | Kandungan |
|----------|-----------|
| Kolagen tipe I | 60-70% |
| Hidroksiapatit (Ca) | 15-20% |
| Protein lainnya | 10-15% |

### Cara Membersihkan Sisik:
1. Rendam air panas 60°C selama **15 menit**
2. Cuci dengan **deterjen food-grade**
3. Bilas bersih, jemur hingga **kering sempurna**
4. Simpan dalam wadah kedap udara

### Produk Unggulan:
- 📿 **Perhiasan** (gelang, kalung, anting) — nilai tinggi!
- 💊 **Kapsul kolagen** — pasar beauty supplement sangat besar
- 🎨 **Cat & pigmen alami** untuk seni

### Harga Pasaran Sisik (per kg):
- Sisik mentah kering: **Rp 15.000-25.000**
- Kolagen ekstrak: **Rp 200.000-500.000**

Mau tahu cara daftar jadi mitra penjual di LAMURI? 🚀`
  },

  tulang: {
    triggers: ['tulang ikan', 'olah tulang', 'tepung tulang', 'hidroksiapatit'],
    response: () => `## 🦴 Tulang Ikan: Tambang Kalsium Tersembunyi

Tulang ikan mengandung **hidroksiapatit** — mineral kalsium yang identik dengan struktur tulang manusia. Ini menjadikannya sangat berharga!

### Proses Pengolahan Tulang Ikan:
**Tahap 1 — Pra-tratment:**
- Rebus tulang 30 menit untuk menghilangkan daging tersisa
- Rendam dalam **larutan NaOH 2%** selama 1 jam (degumming)
- Cuci bersih, keringkan

**Tahap 2 — Produksi:**
- Untuk **tepung tulang**: giling halus, keringkan oven 100°C/2 jam
- Untuk **pupuk**: campurkan dengan bahan organik lain, fermentasi 21 hari
- Untuk **suplemen**: proses lebih lanjut butuh lab food-grade

### Kandungan Nutrisi Tepung Tulang Ikan:
- Kalsium (Ca): **22-28%**
- Fosfor (P): **11-15%**
- Protein kasar: **25-35%**

### Target Pasar:
1. Peternak ayam & sapi (pakan suplemen)
2. Petani organik (pupuk)
3. Industri suplemen kesehatan

Ingin konsultasi bisnis pengolahan tulang ikan? 📞`
  },

  minyak: {
    triggers: ['minyak ikan', 'fish oil', 'omega 3', 'ekstrak minyak'],
    response: () => `## 🛢️ Minyak Ikan — Liquid Gold dari Laut

Minyak ikan adalah salah satu produk turunan limbah paling bernilai tinggi di dunia!

### Sumber Minyak Ikan Terbaik:
- 🐟 **Ikan lemuru** (Bali/Aceh) — kandungan omega-3 tertinggi
- 🐡 **Hati ikan** — kaya vitamin A, D, E
- 🦈 **Hati hiu** — squalene premium (berhati-hati regulasi)

### Proses Ekstraksi Sederhana:
1. **Wet rendering**: Rebus limbah ikan, pisahkan lapisan minyak
2. **Sentrifugasi**: Gunakan centrifuge untuk memisahkan minyak-air
3. **Pemurnian**: Filter dengan karbon aktif untuk hilangkan bau
4. **Pengemasan**: Botol gelap (minyak sensitif cahaya)

### Manfaat & Produk:
| Produk | Nilai Jual |
|--------|-----------|
| Minyak ikan mentah (pakan) | Rp 12.000/L |
| Minyak ikan food-grade | Rp 45.000/L |
| Kapsul omega-3 (60 kap) | Rp 89.000 |
| Sabun minyak ikan | Rp 22.000 |

Butuh panduan teknis lebih detail? Saya bisa bantu! 🌊`
  },

  daftar: {
    triggers: ['daftar', 'registrasi', 'cara jual', 'jadi penjual', 'mitra', 'bergabung'],
    response: () => `## 🚀 Cara Bergabung sebagai Mitra LAMURI

Proses pendaftaran sangat mudah dan **GRATIS**! Berikut langkah-langkahnya:

### Dokumen yang Diperlukan:
- 📋 KTP/NIK aktif
- 📸 Foto produk minimal 3 buah
- 📍 Alamat lengkap usaha/rumah
- 📱 Nomor WhatsApp aktif

### Alur Pendaftaran:
1. **Klik "Mulai Jual"** di halaman Marketplace
2. Isi formulir profil penjual (5 menit)
3. Upload foto produk & dokumen
4. **Verifikasi tim LAMURI** (1-2 hari kerja)
5. Akun aktif — mulai berjualan! 🎉

### Keuntungan Menjadi Mitra:
- ✅ 0% komisi untuk 3 bulan pertama
- ✅ Tampil di peta lokasi (fitur Lokasi)
- ✅ Akses ke program pelatihan pengolahan limbah
- ✅ Jaringan distribusi ke kota besar
- ✅ Sertifikat mitra ekonomi sirkular

### Kategori Mitra:
| Tipe | Keterangan |
|------|------------|
| 🎣 Nelayan Hulu | Pasok limbah mentah |
| 🏭 Pengolah | Buat produk jadi |
| 🛍️ Reseller | Jual produk LAMURI |

Ada pertanyaan lain tentang pendaftaran? 😊`
  },

  sdgs: {
    triggers: ['sdgs', 'sdg', 'pembangunan berkelanjutan', 'lingkungan', 'ocean', 'ekosistem laut', 'sdg 14'],
    response: () => `## 🌍 LAMURI & Sustainable Development Goals (SDGs)

LAMURI secara langsung berkontribusi pada **5 poin SDGs PBB**:

### 🌊 SDG 14 — Life Below Water (Prioritas Utama)
Dengan mengurangi limbah ikan yang dibuang ke laut, LAMURI membantu:
- ↓ Pencemaran laut dari limbah organik
- ↓ Eutrofikasi (ledakan alga) di pesisir
- ↑ Kesehatan ekosistem terumbu karang

### 💚 SDG 12 — Responsible Consumption & Production
- Mengubah **100% limbah** menjadi produk bernilai
- Model **Zero Waste Fishery**
- Edukasi konsumen tentang produk ramah lingkungan

### 💰 SDG 8 — Decent Work & Economic Growth
- Membuka lapangan kerja baru bagi **nelayan & ibu rumah tangga**
- Meningkatkan pendapatan rata-rata nelayan **35-60%**

### 🍎 SDG 2 — Zero Hunger
- Tepung tulang ikan untuk **pakan ternak** berkualitas tinggi
- Pupuk organik untuk **ketahanan pangan** lokal

### 🤝 SDG 17 — Partnerships for the Goals
- Kolaborasi dengan universitas, pemerintah, dan industri

*LAMURI telah divalidasi oleh tim riset UTU sebagai model bisnis circular economy yang terstandar.*`
  },

  ekonomi_sirkular: {
    triggers: ['ekonomi sirkular', 'circular economy', 'daur ulang', 'zero waste', 'upcycling'],
    response: () => `## ♻️ Ekonomi Sirkular dalam Model Bisnis LAMURI

Ekonomi sirkular adalah sistem di mana **tidak ada yang disebut "sampah"** — setiap output adalah input untuk proses berikutnya.

### Alur Sirkular LAMURI:

\`\`\`
Laut → Nelayan → Pengolah Ikan
         ↓              ↓
    Limbah Ikan    Produk Ikan
         ↓              ↓
   Toko Penjual ← Konsumen
         ↓
  Produk Bernilai Tinggi:
  Keripik, Kolagen, Pupuk, Kerajinan
         ↓
  Kembali ke Alam/Petani/Konsumen
\`\`\`

### Nilai Ekonomi yang Tercipta:
Dari **1 ton ikan tongkol**, potensi nilai limbahnya:
| Limbah | Produk | Nilai |
|--------|--------|-------|
| Kulit (5%) | Keripik | Rp 1.750.000 |
| Sisik (2%) | Kolagen | Rp 2.000.000 |
| Tulang (12%) | Pupuk/Tepung | Rp 480.000 |
| Isi Perut (8%) | Pelet Pakan | Rp 320.000 |
| **Total** | | **Rp 4.550.000** |

Yang sebelumnya dibuang begitu saja! 🤯

Ingin perhitungan lebih spesifik untuk jenis ikan Anda? Tanyakan! 📊`
  },

  harga: {
    triggers: ['harga', 'berapa harga', 'tarif', 'price', 'biaya', 'berapa jual'],
    response: () => `## 💰 Panduan Harga Produk LAMURI

Berikut daftar harga referensi di platform kami:

### 🍽️ Kategori Makanan Olahan:
| Produk | Harga |
|--------|-------|
| Keripik Kulit Ikan 150g | Rp 35.000 |
| Abon Ikan Premium 100g | Rp 28.000 |
| Dendeng Ikan Tuna 200g | Rp 52.000 |

### 🌿 Kategori Pakan & Pertanian:
| Produk | Harga |
|--------|-------|
| Pupuk Cair Organik 1L | Rp 28.000 |
| Pelet Pakan Ikan 1Kg | Rp 15.000 |
| Kompos Padat 2Kg | Rp 12.000 |

### 💊 Kategori Kesehatan & Kecantikan:
| Produk | Harga |
|--------|-------|
| Kapsul Kolagen 60 kap | Rp 89.000 |
| Sabun Minyak Ikan 100g | Rp 22.000 |
| Krim Kolagen 50ml | Rp 145.000 |

### ✨ Kategori Kerajinan:
| Produk | Harga |
|--------|-------|
| Tas Anyaman Sisik | Rp 125.000 |
| Gelang & Kalung | Rp 45.000 |
| Frame Foto Sisik | Rp 78.000 |

*Harga dapat berubah. Cek marketplace untuk harga terupdate!*

Butuh penawaran **bulk order**? Hubungi tim kami! 📦`
  },

  nelayan: {
    triggers: ['nelayan', 'petani ikan', 'pembudidaya', 'kapal', 'tangkap ikan'],
    response: () => `## 🎣 Program Khusus Nelayan LAMURI

LAMURI hadir untuk **memberdayakan nelayan** pesisir, bukan hanya pembeli!

### Manfaat untuk Nelayan:
1. **💵 Pendapatan Tambahan**: Jual limbah yang sebelumnya dibuang
   - Sisik: Rp 15.000-25.000/kg
   - Tulang: Rp 8.000-15.000/kg  
   - Kulit: Rp 12.000-20.000/kg
   
2. **📚 Pelatihan Gratis**:
   - Pengolahan limbah dasar
   - Pengemasan & branding
   - Digital marketing
   
3. **🚐 Pickup Limbah**:
   - Tim LAMURI akan **menjemput limbah** dari dermaga
   - Tidak perlu repot-repot antar sendiri
   
4. **💳 Pembayaran Cepat**:
   - Transfer H+1 setelah serah terima
   - Harga transparan, tidak ada potongan tersembunyi

### Cara Mulai:
1. Foto limbah ikan Anda 📸
2. WhatsApp ke nomor Toko Penjual terdekat
3. Tentukan jadwal pickup
4. Terima pembayaran! 💰

*Program ini didukung oleh Dinas Kelautan Provinsi Aceh.*`
  },

  default: {
    response: (query) => `Terima kasih sudah bertanya tentang **"${query}"**! 🌊

Saya memahami pertanyaan Anda, namun saya butuh konteks lebih spesifik untuk memberikan jawaban terbaik.

Mungkin maksud Anda adalah salah satu dari ini?
- 🐟 Cara **mengolah limbah ikan** (sisik, tulang, kulit, minyak)
- 🛒 **Cara berjualan** di platform LAMURI
- 💰 **Informasi harga** produk & limbah
- 🌿 **Manfaat & kandungan** produk olahan
- 🌍 Dampak bisnis terhadap **lingkungan & SDGs**

Silakan pilih topik dari panel kanan, atau ketik pertanyaan Anda lebih spesifik! Saya siap membantu. 😊`
  }
};

// ── State ──────────────────────────────────────────────────────
let conversationHistory = [
  {
    id: 'conv-1',
    title: 'Cara mengolah sisik ikan',
    time: '2 jam lalu',
    icon: '✨',
    messages: []
  },
  {
    id: 'conv-2',
    title: 'Harga limbah ikan di LAMURI',
    time: 'Kemarin',
    icon: '💰',
    messages: []
  },
  {
    id: 'conv-3',
    title: 'Program mitra nelayan',
    time: '3 hari lalu',
    icon: '🎣',
    messages: []
  }
];

let activeConversation = 'current';
let isTyping = false;
let messageCount = 0;

// ── Find best response ─────────────────────────────────────────
function findResponse(query) {
  const lowerQuery = query.toLowerCase();

  for (const [key, data] of Object.entries(SEA_KNOWLEDGE)) {
    if (key === 'default') continue;
    if (data.triggers && data.triggers.some(trigger => lowerQuery.includes(trigger))) {
      return typeof data.response === 'function' ? data.response() : data.response;
    }
  }

  return SEA_KNOWLEDGE.default.response(query);
}

// ── Add message ────────────────────────────────────────────────
function addMessage(content, role = 'sea', isMarkdown = false) {
  const messagesEl = document.getElementById('ai-messages');
  if (!messagesEl) return;

  // Remove welcome screen if present
  const welcome = messagesEl.querySelector('.ai-welcome');
  if (welcome) welcome.remove();

  messageCount++;
  const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  const msgEl = document.createElement('div');
  msgEl.className = `msg-row ${role}`;
  msgEl.id = `msg-${messageCount}`;

  const avatar = role === 'sea' ? '🌊' : '👤';
  const sender = role === 'sea' ? 'SEA' : 'Anda';

  // Parse markdown-like formatting
  const formatted = formatMessage(content);

  msgEl.innerHTML = `
    <div class="msg-avatar">${avatar}</div>
    <div class="msg-bubble-wrap">
      <div class="msg-sender">${sender}</div>
      <div class="msg-bubble">${formatted}</div>
      <div class="msg-time">${time}</div>
    </div>
  `;

  messagesEl.appendChild(msgEl);
  messagesEl.scrollTop = messagesEl.scrollHeight;

  return msgEl;
}

// ── Format message (simple markdown parser) ───────────────────
function formatMessage(text) {
  return text
    // Headers
    .replace(/^## (.+)$/gm, '<h4 style="font-family:Outfit,sans-serif;font-size:1rem;font-weight:700;color:#f0f4fa;margin-bottom:8px;margin-top:4px;">$1</h4>')
    .replace(/^### (.+)$/gm, '<h5 style="font-family:Outfit,sans-serif;font-size:0.9rem;font-weight:700;color:#a8bdd4;margin-bottom:6px;margin-top:8px;">$1</h5>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Tables
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.every(c => c.trim().match(/^[-:]+$/))) return ''; // separator row
      return '<div style="display:flex;gap:0;margin:2px 0;">' +
        cells.map(c => `<span style="flex:1;padding:4px 8px;background:rgba(42,77,134,0.2);border:1px solid rgba(217,217,216,0.1);font-size:0.8rem;">${c.trim()}</span>`).join('') +
        '</div>';
    })
    // Code blocks
    .replace(/```[\s\S]*?```/g, (match) => {
      const code = match.replace(/```\w*/g, '').replace(/```/g, '').trim();
      return `<pre style="background:rgba(0,0,0,0.3);border-radius:8px;padding:12px;font-size:0.78rem;overflow-x:auto;margin:8px 0;border:1px solid rgba(217,217,216,0.1);white-space:pre-wrap;">${code}</pre>`;
    })
    // Inline code
    .replace(/`(.+?)`/g, '<code style="background:rgba(42,77,134,0.3);padding:2px 6px;border-radius:4px;font-size:0.82rem;">$1</code>')
    // Bullet points
    .replace(/^- (.+)$/gm, '<li style="margin-left:16px;margin-bottom:4px;font-size:0.87rem;list-style:disc;">$1</li>')
    // Numbered lists
    .replace(/^\d+\. (.+)$/gm, '<li style="margin-left:16px;margin-bottom:4px;font-size:0.87rem;list-style:decimal;">$1</li>')
    // Line breaks
    .replace(/\n\n/g, '</p><p style="margin-top:8px;">')
    .replace(/\n/g, '<br>');
}

// ── Show typing indicator ──────────────────────────────────────
function showTyping() {
  const messagesEl = document.getElementById('ai-messages');
  if (!messagesEl) return;

  const typingEl = document.createElement('div');
  typingEl.className = 'msg-row sea';
  typingEl.id = 'typing-indicator';
  typingEl.innerHTML = `
    <div class="msg-avatar">🌊</div>
    <div class="msg-bubble-wrap">
      <div class="msg-sender">SEA</div>
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  `;
  messagesEl.appendChild(typingEl);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function hideTyping() {
  document.getElementById('typing-indicator')?.remove();
}

// ── Send message ───────────────────────────────────────────────
async function sendMessage() {
  const input = document.getElementById('ai-input');
  if (!input) return;

  const text = input.value.trim();
  if (!text || isTyping) return;

  // Add user message
  addMessage(text, 'user');
  input.value = '';
  input.style.height = 'auto';

  // Update char count
  updateCharCount(0);

  // Show typing
  isTyping = true;
  showTyping();

  // Disable send button
  const sendBtn = document.getElementById('ai-send');
  if (sendBtn) sendBtn.disabled = true;

  // Simulate AI processing delay (realistic)
  const delay = 800 + Math.random() * 1200;
  await new Promise(resolve => setTimeout(resolve, delay));

  // Get response
  const response = findResponse(text);

  // Hide typing
  hideTyping();
  isTyping = false;

  // Add response
  addMessage(response, 'sea', true);

  // Re-enable send
  if (sendBtn) sendBtn.disabled = false;

  // Update conversation history
  updateConversationHistory(text);
}

// ── Update conversation history ────────────────────────────────
function updateConversationHistory(latestMsg) {
  const histList = document.querySelector('.ai-history-list');
  if (!histList) return;

  // Check if current session exists in history
  const currentItem = histList.querySelector('[data-conv="current"]');
  if (!currentItem) {
    const item = document.createElement('div');
    item.className = 'ai-history-item active';
    item.dataset.conv = 'current';
    item.innerHTML = `
      <span class="ai-history-icon">💬</span>
      <div>
        <div class="ai-history-text">${latestMsg.length > 40 ? latestMsg.substring(0, 40) + '...' : latestMsg}</div>
        <div class="ai-history-time">Baru saja</div>
      </div>
    `;
    histList.insertBefore(item, histList.firstChild);
  }
}

// ── Handle suggestion chips ────────────────────────────────────
function useSuggestion(text) {
  const input = document.getElementById('ai-input');
  if (!input) return;
  input.value = text;
  input.focus();
  sendMessage();
}

// ── Update char count ──────────────────────────────────────────
function updateCharCount(count) {
  const hint = document.querySelector('.ai-input-hint');
  if (hint) {
    hint.textContent = count > 0
      ? `${count} karakter · Enter untuk kirim`
      : 'Tekan Enter untuk kirim, Shift+Enter untuk baris baru';
  }
}

// ── SEA capabilities data ─────────────────────────────────────
const SEA_STATS = {
  accuracy: 94,
  knowledge: 87,
  response: 99
};

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('ai-input');
  const sendBtn = document.getElementById('ai-send');

  // Send on button click
  sendBtn?.addEventListener('click', sendMessage);

  // Send on Enter (not Shift+Enter)
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize textarea
  input?.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 160) + 'px';
    updateCharCount(input.value.length);
  });

  // Suggestion chips
  document.querySelectorAll('.ai-suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      useSuggestion(chip.dataset.msg || chip.textContent.trim());
    });
  });

  // Topic buttons (right panel)
  document.querySelectorAll('.ai-topic-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      useSuggestion(btn.dataset.msg);
    });
  });

  // History items
  document.querySelectorAll('.ai-history-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.ai-history-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // New chat button
  document.querySelector('.ai-new-chat-btn')?.addEventListener('click', () => {
    const messagesEl = document.getElementById('ai-messages');
    if (!messagesEl) return;
    messagesEl.innerHTML = `
      <div class="ai-welcome">
        <div class="ai-welcome-icon">🌊</div>
        <h2>Halo! Saya SEA</h2>
        <p>Smart Ecological Assistant yang siap membantu Anda memahami dunia limbah ikan dan potensi bisnisnya.</p>
      </div>
    `;
    messageCount = 0;
    document.querySelectorAll('.ai-history-item').forEach(i => i.classList.remove('active'));
  });

  // Animate SEA stats bars
  setTimeout(() => {
    document.querySelectorAll('.ai-stat-bar-fill').forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => { bar.style.transition = 'width 1.2s ease'; bar.style.width = width; }, 100);
    });
  }, 500);

  // Action buttons (clear, export, etc.)
  document.querySelector('[data-action="clear"]')?.addEventListener('click', () => {
    document.querySelector('.ai-new-chat-btn')?.click();
  });
});

// Expose globally
window.useSuggestion = useSuggestion;
