import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Award, CheckCircle2, Printer, Heart } from 'lucide-react';
import { soundEngine } from '../audio/soundEffects.js';

export default function AdoptionCertificateModal({
  cat,
  onClose,
  onConfirmAdoption
}) {
  const [adopterName, setAdopterName] = useState(cat.adopterName || '');
  const [isCertified, setIsCertified] = useState(cat.isAdopted);
  const certificateId = `NEKO-ADOPT-${cat.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleAdoptSubmit = (e) => {
    e.preventDefault();
    if (!adopterName.trim()) return;

    setIsCertified(true);
    soundEngine.playCelebration();

    // Trigger celebratory confetti fireworks!
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    onConfirmAdoption(cat.id, adopterName.trim());
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px' }}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        {!isCertified ? (
          // Adoption Form Step
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff6b81, #ffa502)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto',
                  color: '#ffffff',
                  boxShadow: 'var(--shadow-glow)'
                }}
              >
                <Award size={30} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#2f3542' }}>
                Formulir Adopsi Resmi
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#747d8c' }}>
                Jadilah orang tua angkat resmi bagi <strong>{cat.name}</strong> ({cat.breed})
              </p>
            </div>

            <form onSubmit={handleAdoptSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: '#2f3542' }}>
                  Nama Lengkap Orang Tua Asuh / Pemilik:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Amelia Safitri"
                  value={adopterName}
                  onChange={(e) => setAdopterName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,0,0,0.15)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-main)',
                    outline: 'none',
                    background: '#ffffff'
                  }}
                />
              </div>

              <div style={{ background: '#fff9f0', border: '1px solid #ffeaa7', borderRadius: '12px', padding: '14px', fontSize: '0.84rem', color: '#d35400' }}>
                <p><strong>📜 Komitmen Perawatan Kucing:</strong></p>
                <ul style={{ paddingLeft: '18px', marginTop: '6px', lineHeight: '1.5' }}>
                  <li>Memberikan makanan lezat dan air bersih setiap hari.</li>
                  <li>Mengajak bermain laser pointer dan memberi belaian kasih sayang.</li>
                  <li>Merawat kesehatan dan menjaga kebahagiaan seumur hidup.</li>
                </ul>
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '14px', fontSize: '1rem' }}>
                <Heart size={18} />
                <span>Tandatangani & Adopsi Sekarang 🐾</span>
              </button>
            </form>
          </div>
        ) : (
          // Official Issued Adoption Certificate
          <div id="printable-certificate">
            <div
              style={{
                border: '6px double #d4af37',
                borderRadius: '16px',
                padding: '24px',
                background: '#fffdf9',
                textAlign: 'center',
                boxShadow: 'inset 0 0 20px rgba(212, 175, 55, 0.15)',
                position: 'relative'
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>🐾 👑 🐾</div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.7rem',
                  color: '#b8860b',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                Sertifikat Resmi Adopsi
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#7f8c8d', letterSpacing: '0.08em', marginBottom: '16px' }}>
                NEKOHAVEN 3D PET BOUTIQUE & RESCUE LOUNGE
              </p>

              <p style={{ fontSize: '0.9rem', color: '#57606f', marginBottom: '8px' }}>
                Dengan ini secara resmi mengukuhkan bahwa:
              </p>

              <h3
                style={{
                  fontSize: '1.8rem',
                  fontFamily: 'var(--font-display)',
                  color: '#ff4757',
                  borderBottom: '2px solid #f1c40f',
                  display: 'inline-block',
                  padding: '2px 24px',
                  marginBottom: '14px'
                }}
              >
                {adopterName || cat.adopterName}
              </h3>

              <p style={{ fontSize: '0.9rem', color: '#57606f', marginBottom: '8px' }}>
                Telah resmi mengangkat dan menjadi orang tua asuh penuh kasih bagi:
              </p>

              <div
                style={{
                  background: '#fef5e7',
                  borderRadius: '12px',
                  padding: '10px 16px',
                  display: 'inline-block',
                  marginBottom: '18px'
                }}
              >
                <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#d35400' }}>
                  🐱 {cat.name}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#7f8c8d', marginLeft: '8px' }}>
                  ({cat.breed} • {cat.gender})
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.78rem',
                  color: '#7f8c8d',
                  borderTop: '1px dashed #d4af37',
                  paddingTop: '14px',
                  marginTop: '10px'
                }}
              >
                <div>
                  <p><strong>Nomor Registrasi:</strong></p>
                  <p>{certificateId}</p>
                </div>

                {/* Wax / Gold Stamp */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #f1c40f 0%, #b8860b 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                    fontSize: '0.55rem',
                    fontWeight: '800',
                    lineHeight: '1.1'
                  }}
                >
                  <Award size={18} />
                  <span>OFFICIAL</span>
                  <span>SEAL</span>
                </div>

                <div>
                  <p><strong>Tanggal Adopsi:</strong></p>
                  <p>{currentDate}</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={handlePrint}>
                <Printer size={16} />
                <span>Cetak Sertifikat</span>
              </button>
              <button className="btn-primary" style={{ flex: 1 }} onClick={onClose}>
                <CheckCircle2 size={16} />
                <span>Selesai & Tutup</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
