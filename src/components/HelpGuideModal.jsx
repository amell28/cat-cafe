import React from 'react';
import { X, Sparkles, Navigation, Heart, Target, Fish, Bath, Camera, Sun, Award } from 'lucide-react';

export default function HelpGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '32px', marginBottom: '4px' }}>🐾 ✨</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 4.8vw, 1.6rem)', color: '#2f3542' }}>
            Selamat Datang di NekoHaven 3D!
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#747d8c' }}>
            Panduan Interaksi Dunia 3D Pet Shop & Kucing-kucing Lucu
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: 'min(58dvh, 520px)', overflowY: 'auto', WebkitOverflowScrolling: 'touch', paddingRight: '4px' }}>
          {/* Section 1: Navigasi Kamera */}
          <div style={{ background: '#ffffff', padding: '14px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#2f3542', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Navigation size={16} color="#70a1ff" />
              1. Jelajahi Sudut Pandang 3D (Luar & Dalam)
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#57606f', lineHeight: '1.5' }}>
              Gunakan bilah tab di atas untuk berganti pemandangan seketika:
            </p>
            <ul style={{ fontSize: '0.82rem', color: '#57606f', paddingLeft: '20px', marginTop: '6px', lineHeight: '1.5' }}>
              <li><strong>Tampilan Luar:</strong> Pemandangan menyeluruh fasad storefront, kanopi netral, trotoar, dan aktivitas jalanan.</li>
              <li><strong>City Lights & Kota:</strong> Panorama gedung-gedung bertingkat kota, gemerlap city lights ribuan jendela, deretan bangunan townhouse kiri-kanan, dan hembusan angin.</li>
              <li><strong>Taman Depan:</strong> Pemandangan taman hijau asri di depan cafe dengan pepohonan rindang yang bergoyang tertiup angin, guguran daun, dan jalan setapak batu.</li>
              <li><strong>Toko Buku Sebelah:</strong> Bangunan aktivitas di sebelah cafe berisi rak buku komik kucing bertingkat, sudut baca hangat, dan mesin arcade.</li>
              <li><strong>Cafe Luar:</strong> Meja bistro kopi berpayung kanopi, cangkir kopi mengepul, croissant hangat, dan Kuro yang santai di kursi.</li>
              <li><strong>Aktivitas Luar:</strong> Sepeda pengantar kue dengan anak kucing di keranjang, burung merpati mematuk remahan, air mancur batu, kupu-kupu terbang, dan area agility Milo.</li>
              <li><strong>Lounge Dalam:</strong> Ruang bersantai dalam pet shop dengan lantai kayu ek Skandinavia, kasur donat, dan karpet cakar kucing.</li>
              <li><strong>Menara Kucing:</strong> Menara cat tree bertingkat tempat bertenggernya Luna.</li>
              <li><strong>Salon & Spa:</strong> Bak mandi air hangat berbusa tempat santai Latte.</li>
              <li><strong>Mode Bebas 360°:</strong> Drag mouse untuk putar 360°, scroll untuk zoom in/out!</li>
            </ul>
          </div>

          {/* Section 2: Fitur Interaksi */}
          <div style={{ background: '#ffffff', padding: '14px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#2f3542', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Target size={16} color="#ff4757" />
              2. Alat & Minigame Interaktif (Dock Bawah)
            </h3>
            <ul style={{ fontSize: '0.82rem', color: '#57606f', paddingLeft: '20px', lineHeight: '1.6' }}>
              <li><strong>👆 Elus:</strong> Klik kucing mana pun untuk mendengar dengkuran <em>purr</em> dan meow khasnya.</li>
              <li><strong>🔴 Laser Pointer:</strong> Gerakkan kursor di lantai, kucing akan mengejar titik merah!</li>
              <li><strong>🐟 Beri Makan:</strong> Klik lantai untuk melempar snack ikan salmon, kucing terdekat akan datang memakannya.</li>
              <li><strong>🫧 Salon & Spa:</strong> Mandikan kucing dengan busa sabun wangi dan tingkatkan kebersihannya.</li>
              <li><strong>🎩 Kostum 3D:</strong> Kenakan topi penyihir, mahkota emas, pita dasi, atau kacamata hitam.</li>
              <li><strong>📸 Photobooth:</strong> Ambil foto Polaroid estetik langsung dari canvas 3D dan unduh ke perangkatmu.</li>
              <li><strong>🚪 Pintu Cafe Interaktif:</strong> Klik pintu depan cafe untuk membuka dan menutupnya (ada lonceng cafe bergemerincing!).</li>
              <li><strong>☕ Bar & Mesin Kopi:</strong> Klik mesin espresso atau cangkir latte art di bar untuk menyeduh kopi beruap hangat bersama Boba sang barista!</li>
            </ul>
          </div>

          {/* Section 3: Adopsi Kucing */}
          <div style={{ background: '#ffffff', padding: '14px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#2f3542', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Award size={16} color="#ffa502" />
              3. Sertifikat Adopsi Resmi
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#57606f', lineHeight: '1.5' }}>
              Pilih salah satu dari 6 kucing (Oyen, Mochi, Luna, Boba, Kuro, Latte), buka profilnya, dan klik <strong>"Adopsi Kucing Ini! 💖"</strong>. Masukkan namamu untuk mendapatkan sertifikat adopsi resmi lengkap dengan stempel emas dan selebrasi kembang api konfeti!
            </p>
          </div>

          {/* Section 4: Suasana & Lo-Fi Beats */}
          <div style={{ background: '#ffffff', padding: '14px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#2f3542', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sun size={16} color="#e67e22" />
              4. Waktu Siang / Sore / Malam & Musik Lo-Fi
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#57606f', lineHeight: '1.5' }}>
              Tekan ikon matahari/bulan di navigasi atas untuk mengubah suasana waktu menjadi Siang Cerah, Sore Senja bernuansa jingga, atau Malam Berbintang dengan nyala lampu jalan dan neon toko. Nyalakan juga musik cozy lo-fi untuk pengalaman yang semakin menenangkan.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <button className="btn-primary" style={{ width: '100%', padding: '12px' }} onClick={onClose}>
            <span>Mulai Bermain Bersama Kucing 🐾</span>
          </button>
        </div>
      </div>
    </div>
  );
}
