import React from 'react';
import {
  Store,
  Home,
  Trees,
  Sparkles,
  HeartHandshake,
  Compass,
  Sun,
  Sunset,
  Moon,
  Music,
  Volume2,
  VolumeX,
  HelpCircle,
  Users,
  Coffee,
  Bike,
  BookOpen,
  CloudRain,
  Sunrise,
  Building2
} from 'lucide-react';
import { CAMERA_VIEWS } from '../data/catsData.js';
import { soundEngine } from '../audio/soundEffects.js';

export default function Navbar({
  activeViewId,
  onSelectView,
  timeOfDay,
  onChangeTimeOfDay,
  weather,
  onToggleWeather,
  isMusicPlaying,
  onToggleMusic,
  isMuted,
  onToggleMute,
  onOpenDirectory,
  onOpenHelp,
  catsCount
}) {
  const getIconForView = (iconName) => {
    switch (iconName) {
      case 'Store': return <Store size={15} />;
      case 'Building2': return <Building2 size={15} />;
      case 'BookOpen': return <BookOpen size={15} />;
      case 'Coffee': return <Coffee size={15} />;
      case 'Bike': return <Bike size={15} />;
      case 'Home': return <Home size={15} />;
      case 'Trees': return <Trees size={15} />;
      case 'Sparkles': return <Sparkles size={15} />;
      case 'HeartHandshake': return <HeartHandshake size={15} />;
      case 'Compass': return <Compass size={15} />;
      default: return <Store size={15} />;
    }
  };

  const getTimeLabel = () => {
    switch (timeOfDay) {
      case 'morning': return 'Waktu: Pagi Hangat 🌅 (Klik untuk Siang)';
      case 'day': return 'Waktu: Siang Cerah ☀️ (Klik untuk Sore)';
      case 'sunset': return 'Waktu: Sore Senja 🌇 (Klik untuk Malam)';
      case 'night': return 'Waktu: Malam Berbintang 🌙 (Klik untuk Pagi)';
      default: return 'Waktu: Siang';
    }
  };

  return (
    <header className="top-navbar glass-panel">
      {/* Brand Section */}
      <div className="brand-section">
        <div className="brand-icon-wrapper">
          <span>🐾</span>
        </div>
        <div>
          <h1 className="brand-title">NekoHaven 3D</h1>
          <p className="brand-subtitle">Pet Shop & Cat Cafe Experience</p>
        </div>
      </div>

      {/* Camera View Switcher */}
      <nav className="camera-views-strip" aria-label="Sudut Pandang Kamera 3D">
        {CAMERA_VIEWS.map((view) => {
          const isActive = activeViewId === view.id;
          return (
            <button
              key={view.id}
              className={`view-pill ${isActive ? 'active' : ''}`}
              onClick={() => {
                soundEngine.playClick();
                onSelectView(view);
              }}
              title={view.description}
            >
              {getIconForView(view.icon)}
              <span>{view.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Control Tools Cluster */}
      <div className="nav-controls-cluster">
        {/* 4 Times of Day: Pagi -> Siang -> Sore -> Malam */}
        <button
          className="control-icon-btn"
          onClick={() => {
            soundEngine.playClick();
            if (timeOfDay === 'morning') onChangeTimeOfDay('day');
            else if (timeOfDay === 'day') onChangeTimeOfDay('sunset');
            else if (timeOfDay === 'sunset') onChangeTimeOfDay('night');
            else onChangeTimeOfDay('morning');
          }}
          title={getTimeLabel()}
        >
          {timeOfDay === 'morning' && <Sunrise size={18} color="#d4a373" />}
          {timeOfDay === 'day' && <Sun size={18} color="#c49a6c" />}
          {timeOfDay === 'sunset' && <Sunset size={18} color="#b08968" />}
          {timeOfDay === 'night' && <Moon size={18} color="#8d99ae" />}
        </button>

        {/* Rain Weather Toggle */}
        <button
          className={`control-icon-btn ${weather === 'rain' ? 'active' : ''}`}
          onClick={() => {
            soundEngine.playClick();
            onToggleWeather();
          }}
          title={weather === 'rain' ? 'Cuaca: Hujan Rintik (Klik untuk Cerah)' : 'Cuaca: Cerah (Klik untuk Hujan Rintik)'}
        >
          <CloudRain size={18} color={weather === 'rain' ? '#ffffff' : '#78909c'} />
        </button>

        {/* Lo-Fi Background Music Toggle */}
        <button
          className={`control-icon-btn ${isMusicPlaying ? 'active' : ''}`}
          onClick={() => {
            soundEngine.playClick();
            onToggleMusic();
          }}
          title={isMusicPlaying ? 'Matikan Lo-Fi Music' : 'Putar Cozy Lo-Fi Music'}
        >
          <Music size={18} />
        </button>

        {/* Master Sound FX Mute Toggle */}
        <button
          className="control-icon-btn"
          onClick={() => {
            onToggleMute();
          }}
          title={isMuted ? 'Suara Meow Mati (Klik untuk Nyalakan)' : 'Suara Meow Aktif'}
        >
          {isMuted ? <VolumeX size={18} color="#e74c3c" /> : <Volume2 size={18} />}
        </button>

        {/* Cats Directory Modal Trigger */}
        <button
          className="control-icon-btn"
          onClick={() => {
            soundEngine.playClick();
            onOpenDirectory();
          }}
          title="Daftar & Status Kucing"
        >
          <Users size={18} />
        </button>

        {/* Help / Guide Trigger */}
        <button
          className="control-icon-btn"
          onClick={() => {
            soundEngine.playClick();
            onOpenHelp();
          }}
          title="Panduan Interaksi Web 3D"
        >
          <HelpCircle size={18} />
        </button>
      </div>
    </header>
  );
}
