import React, { useState } from 'react';
import { X, Download, Sparkles, Heart } from 'lucide-react';

export default function PhotoboothModal({
  photoUrl,
  onClose
}) {
  const [selectedSticker, setSelectedSticker] = useState('🐾 Purrfect Day at NekoHaven!');
  const stickers = [
    '🐾 Purrfect Day at NekoHaven!',
    '🐱 Best Cat Parent Ever!',
    '💖 Si Oyen & Friends Forever',
    '✨ Meow Magic Boutique & Cafe',
    '😴 Mochi Napping Master'
  ];

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const handleDownload = () => {
    if (!photoUrl) return;
    const link = document.createElement('a');
    link.download = `NekoHaven-Polaroid-${Date.now()}.png`;
    link.href = photoUrl;
    link.click();
  };

  if (!photoUrl) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '520px', textAlign: 'center' }}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#2f3542', marginBottom: '4px' }}>
          📸 Photobooth Polaroid Kucing
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#747d8c', marginBottom: '14px' }}>
          Abadikan pemandangan pet shop & kucing favoritmu dalam bingkai Polaroid estetik
        </p>

        {/* Vintage Polaroid Frame */}
        <div
          style={{
            background: '#ffffff',
            padding: 'clamp(12px, 3.5vw, 16px) clamp(12px, 3.5vw, 16px) clamp(18px, 5vw, 28px) clamp(12px, 3.5vw, 16px)',
            borderRadius: '12px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
            marginBottom: '16px',
            border: '1px solid rgba(0,0,0,0.06)'
          }}
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '16/10',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#000',
              marginBottom: '12px'
            }}
          >
            <img
              src={photoUrl}
              alt="Snapshot Pet Shop 3D"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Polaroid Handwritten Caption & Sticker */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px', flexWrap: 'wrap', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.88rem, 3.2vw, 1.05rem)',
                color: '#2f3542',
                fontWeight: '600',
                textAlign: 'left'
              }}
            >
              {selectedSticker}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#a4b0be' }}>
              {currentDate}
            </span>
          </div>
        </div>

        {/* Choose Sticker */}
        <div style={{ marginBottom: '18px', textAlign: 'left' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: '700', color: '#57606f', marginBottom: '6px' }}>
            Pilih Label Stiker Polaroid:
          </p>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {stickers.map((stk) => (
              <button
                key={stk}
                onClick={() => setSelectedSticker(stk)}
                style={{
                  padding: '5px 11px',
                  borderRadius: '999px',
                  border: selectedSticker === stk ? '1.5px solid #ff4757' : '1px solid rgba(0,0,0,0.1)',
                  background: selectedSticker === stk ? '#fff0f2' : '#ffffff',
                  color: selectedSticker === stk ? '#ff4757' : '#57606f',
                  fontSize: '0.74rem',
                  cursor: 'pointer'
                }}
              >
                {stk}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button className="btn-secondary" style={{ flex: '1 1 120px' }} onClick={onClose}>
            Ambil Ulang
          </button>
          <button className="btn-primary" style={{ flex: '1.4 1 160px' }} onClick={handleDownload}>
            <Download size={16} />
            <span>Download Foto Polaroid</span>
          </button>
        </div>
      </div>
    </div>
  );
}
