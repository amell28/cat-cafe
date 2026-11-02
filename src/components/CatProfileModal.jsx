import React from 'react';
import {
  X,
  Heart,
  Zap,
  Sparkles,
  Bath,
  Fish,
  Award,
  Smile,
  ShieldCheck
} from 'lucide-react';
import { CAT_ACCESSORIES } from '../data/catsData.js';
import { soundEngine } from '../audio/soundEffects.js';

export default function CatProfileModal({
  cat,
  onClose,
  onFeedCat,
  onPetCat,
  onChangeAccessory,
  onStartSpa,
  onOpenAdoptionModal
}) {
  if (!cat) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        {/* Header with Cat Color & Identity */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '18px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              backgroundColor: cat.colorHex,
              border: `3px solid ${cat.secondaryHex || '#ffffff'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
              boxShadow: 'var(--shadow-md)',
              flexShrink: 0
            }}
          >
            <span>🐱</span>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#2f3542' }}>
                {cat.name}
              </h2>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  background: cat.isAdopted ? '#2ed573' : 'rgba(255, 107, 129, 0.15)',
                  color: cat.isAdopted ? '#ffffff' : '#ff4757'
                }}
              >
                {cat.isAdopted ? `Telah Diadopsi oleh ${cat.adopterName}` : 'Tersedia untuk Adopsi'}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#747d8c', marginTop: '2px' }}>
              {cat.breed} • {cat.gender} • {cat.age}
            </p>
          </div>
        </div>

        {/* Cat Dialogue Speech Bubble */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '14px',
            padding: '12px 16px',
            fontStyle: 'italic',
            fontSize: '0.9rem',
            color: '#4b4b4b',
            marginBottom: '18px',
            position: 'relative'
          }}
        >
          "{cat.dialogue}"
        </div>

        {/* Cat Stats */}
        <div style={{ background: 'rgba(0, 0, 0, 0.03)', padding: '16px', borderRadius: '16px', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '0.88rem', fontWeight: '700', marginBottom: '12px', color: '#2f3542' }}>
            📊 Indikator Status & Kebugaran
          </h3>

          <div className="stat-item">
            <div className="stat-label-row">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Heart size={14} color="#8d6e63" /> Kebahagiaan
              </span>
              <span>{cat.stats.happiness}%</span>
            </div>
            <div className="stat-bar-track">
              <div
                className="stat-bar-fill"
                style={{ width: `${cat.stats.happiness}%`, background: 'linear-gradient(90deg, #b08968, #7f5539)' }}
              />
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-label-row">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={14} color="#c49a6c" /> Energi & Kelincahan
              </span>
              <span>{cat.stats.energy}%</span>
            </div>
            <div className="stat-bar-track">
              <div
                className="stat-bar-fill"
                style={{ width: `${cat.stats.energy}%`, background: 'linear-gradient(90deg, #ddb892, #b08968)' }}
              />
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-label-row">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Smile size={14} color="#8d99ae" /> Keempukan Bulu
              </span>
              <span>{cat.stats.fluffiness}%</span>
            </div>
            <div className="stat-bar-track">
              <div
                className="stat-bar-fill"
                style={{ width: `${cat.stats.fluffiness}%`, background: 'linear-gradient(90deg, #bcaaa4, #8d6e63)' }}
              />
            </div>
          </div>

          <div className="stat-item" style={{ marginBottom: 0 }}>
            <div className="stat-label-row">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} color="#607d67" /> Kebersihan Tubuh
              </span>
              <span>{cat.stats.cleanliness}%</span>
            </div>
            <div className="stat-bar-track">
              <div
                className="stat-bar-fill"
                style={{ width: `${cat.stats.cleanliness}%`, background: 'linear-gradient(90deg, #819885, #556b59)' }}
              />
            </div>
          </div>
        </div>

        {/* Fun Facts & Personality */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: '8px', marginBottom: '16px' }}>
          <div style={{ background: '#ffffff', padding: '10px 12px', borderRadius: '12px', fontSize: '0.82rem' }}>
            <strong style={{ color: '#2f3542' }}>🐟 Snack Favorit:</strong>
            <p style={{ color: '#57606f', marginTop: '3px' }}>{cat.favoriteSnack}</p>
          </div>
          <div style={{ background: '#ffffff', padding: '10px 12px', borderRadius: '12px', fontSize: '0.82rem' }}>
            <strong style={{ color: '#2f3542' }}>✨ Hal yang Disukai:</strong>
            <p style={{ color: '#57606f', marginTop: '3px' }}>{cat.likes}</p>
          </div>
        </div>

        {/* Wearable Accessories Customization */}
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '0.88rem', fontWeight: '700', marginBottom: '8px', color: '#2f3542' }}>
            🎩 Pilih Aksesoris 3D
          </h3>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {CAT_ACCESSORIES.map((acc) => {
              const isSelected = (cat.accessory || 'none') === acc.id;
              return (
                <button
                  key={acc.id}
                  onClick={() => {
                    soundEngine.playClick();
                    onChangeAccessory(cat.id, acc.id);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '6px 11px',
                    borderRadius: '999px',
                    border: isSelected ? '2px solid #8d6e63' : '1px solid rgba(0,0,0,0.1)',
                    background: isSelected ? '#f5ede3' : '#ffffff',
                    color: isSelected ? '#5d4037' : '#57606f',
                    cursor: 'pointer',
                    fontSize: '0.78rem',
                    fontWeight: isSelected ? '700' : '500',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{acc.icon}</span>
                  <span>{acc.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons Row */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            className="btn-secondary"
            style={{ flex: '1 1 calc(33.3% - 6px)', minWidth: '85px', padding: '9px 8px' }}
            onClick={() => {
              soundEngine.playPurr();
              onPetCat(cat.id);
            }}
          >
            <Heart size={15} color="#8d6e63" />
            <span>Elus</span>
          </button>

          <button
            className="btn-secondary"
            style={{ flex: '1 1 calc(33.3% - 6px)', minWidth: '85px', padding: '9px 8px' }}
            onClick={() => {
              soundEngine.playTreatCrunch();
              onFeedCat(cat.id);
            }}
          >
            <Fish size={15} color="#ffa502" />
            <span>Snack</span>
          </button>

          <button
            className="btn-secondary"
            style={{ flex: '1 1 calc(33.3% - 6px)', minWidth: '85px', padding: '9px 8px' }}
            onClick={() => {
              soundEngine.playBubble();
              onStartSpa(cat);
            }}
          >
            <Bath size={15} color="#70a1ff" />
            <span>Spa</span>
          </button>

          <div style={{ flex: '1 1 100%', marginTop: '4px' }}>
            <button
              className="btn-primary"
              style={{ width: '100%', padding: '12px 16px' }}
              onClick={() => {
                soundEngine.playClick();
                onOpenAdoptionModal(cat);
              }}
            >
              <Award size={17} />
              <span>{cat.isAdopted ? 'Lihat Sertifikat Adopsi' : 'Adopsi Kucing Ini! 💖'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
