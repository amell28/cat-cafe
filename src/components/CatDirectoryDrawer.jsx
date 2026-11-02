import React from 'react';
import { X, MapPin, Eye, Heart, Award } from 'lucide-react';
import { soundEngine } from '../audio/soundEffects.js';

export default function CatDirectoryDrawer({
  isOpen,
  onClose,
  catsList,
  onSelectCat,
  onFlyToCat
}) {
  if (!isOpen) return null;

  const getLocationLabel = (loc) => {
    switch (loc) {
      case 'exterior_porch': return '☕ Meja Cafe & Teras Luar';
      case 'exterior_playground': return '🚴‍♂️ Sepeda & Agility Luar';
      case 'interior_bed': return '🛋️ Kasur Donat Mewah';
      case 'interior_cat_tree': return '🌳 Puncak Cat Tree';
      case 'interior_carpet': return '🧶 Karpet Arena Bermain';
      case 'interior_spa': return '🫧 Bak Mandi Spa & Salon';
      case 'interior_shop_counter': return '📋 Meja Kasir & Sambutan';
      default: return '🐾 Area Pet Shop';
    }
  };

  return (
    <div className="modal-backdrop cat-directory-backdrop" onClick={onClose}>
      <div
        className="cat-directory-sheet glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag / Grab Indicator Handle */}
        <div className="mobile-sheet-handle" />

        {/* Drawer Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#2f3542' }}>
              🐾 Warga Kucing Pet Shop
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#747d8c' }}>
              Total 6 Kucing Karakter Unik Siap Berinteraksi
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} style={{ position: 'static' }}>
            <X size={18} />
          </button>
        </div>

        {/* Cats List */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {catsList.map((cat) => (
            <div
              key={cat.id}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '16px',
                padding: '14px',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'transform 0.15s ease'
              }}
            >
              {/* Color Avatar */}
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  backgroundColor: cat.colorHex,
                  border: `2px solid ${cat.secondaryHex || '#ffffff'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0
                }}
              >
                🐱
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#2f3542', margin: 0 }}>
                    {cat.name}
                  </h3>
                  {cat.isAdopted && (
                    <span style={{ fontSize: '0.65rem', background: '#2ed573', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                      Diadopsi
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.78rem', color: '#747d8c', margin: '2px 0 4px 0' }}>
                  {cat.breed}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', color: '#ff4757', fontWeight: '600' }}>
                  <MapPin size={12} />
                  <span>{getLocationLabel(cat.location)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <button
                  className="btn-secondary"
                  style={{ padding: '6px 10px', fontSize: '0.74rem' }}
                  onClick={() => {
                    soundEngine.playClick();
                    onFlyToCat(cat);
                    onClose();
                  }}
                  title="Arahkan Kamera ke Kucing Ini"
                >
                  <Eye size={12} />
                  <span>Lihat</span>
                </button>
                <button
                  className="btn-primary"
                  style={{ padding: '6px 10px', fontSize: '0.74rem' }}
                  onClick={() => {
                    soundEngine.playClick();
                    onSelectCat(cat);
                  }}
                  title="Buka Profil Lengkap"
                >
                  <Heart size={12} />
                  <span>Profil</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
