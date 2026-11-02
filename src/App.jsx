import React, { useState, useCallback } from 'react';
import ThreeScene from './three/ThreeScene.jsx';
import Navbar from './components/Navbar.jsx';
import Toolbelt from './components/Toolbelt.jsx';
import CatProfileModal from './components/CatProfileModal.jsx';
import AdoptionCertificateModal from './components/AdoptionCertificateModal.jsx';
import CatDirectoryDrawer from './components/CatDirectoryDrawer.jsx';
import PhotoboothModal from './components/PhotoboothModal.jsx';
import HelpGuideModal from './components/HelpGuideModal.jsx';

import { INITIAL_CATS, CAMERA_VIEWS } from './data/catsData.js';
import { soundEngine } from './audio/soundEffects.js';

export default function App() {
  const [catsList, setCatsList] = useState(INITIAL_CATS);
  const [activeView, setActiveView] = useState(CAMERA_VIEWS[0]); // Exterior storefront
  const [timeOfDay, setTimeOfDay] = useState('morning'); // Pagi, Siang, Sore, Malam
  const [weather, setWeather] = useState('clear'); // 'clear' | 'rain'
  const [activeTool, setActiveTool] = useState('pet');

  // Modals state
  const [selectedCat, setSelectedCat] = useState(null);
  const [adoptionTargetCat, setAdoptionTargetCat] = useState(null);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [isSnapshotRequested, setIsSnapshotRequested] = useState(false);

  // Audio State
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // View Change
  const handleSelectView = (view) => {
    setActiveView(view);
  };

  // Fly Camera to Cat's spot
  const handleFlyToCat = (cat) => {
    let targetViewId = 'interior';
    if (cat.location === 'exterior_porch') targetViewId = 'outdoor_cafe';
    else if (cat.location === 'exterior_playground') targetViewId = 'outdoor_play';
    else if (cat.location === 'interior_cat_tree') targetViewId = 'cat_tree';
    else if (cat.location === 'interior_spa') targetViewId = 'spa';

    const view = CAMERA_VIEWS.find((v) => v.id === targetViewId) || CAMERA_VIEWS[0];
    setActiveView(view);
  };

  // Petting a cat
  const handlePetCat = (catId) => {
    setCatsList((prev) =>
      prev.map((c) => {
        if (c.id === catId) {
          const newHappiness = Math.min(100, c.stats.happiness + 5);
          return { ...c, stats: { ...c.stats, happiness: newHappiness } };
        }
        return c;
      })
    );
    // If selected in modal, keep updated
    if (selectedCat && selectedCat.id === catId) {
      setSelectedCat((prev) => ({
        ...prev,
        stats: { ...prev.stats, happiness: Math.min(100, prev.stats.happiness + 5) }
      }));
    }
  };

  // Feeding a cat
  const handleFeedCat = (catId) => {
    setCatsList((prev) =>
      prev.map((c) => {
        if (c.id === catId) {
          const newEnergy = Math.min(100, c.stats.energy + 8);
          const newHappiness = Math.min(100, c.stats.happiness + 4);
          return { ...c, stats: { ...c.stats, energy: newEnergy, happiness: newHappiness } };
        }
        return c;
      })
    );
    if (selectedCat && selectedCat.id === catId) {
      setSelectedCat((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          energy: Math.min(100, prev.stats.energy + 8),
          happiness: Math.min(100, prev.stats.happiness + 4)
        }
      }));
    }
  };

  // Change 3D accessory
  const handleChangeAccessory = (catId, accessoryId) => {
    setCatsList((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, accessory: accessoryId } : c))
    );
    if (selectedCat && selectedCat.id === catId) {
      setSelectedCat((prev) => ({ ...prev, accessory: accessoryId }));
    }
  };

  // Start Spa session
  const handleStartSpa = (cat) => {
    setCatsList((prev) =>
      prev.map((c) => {
        if (c.id === cat.id) {
          return {
            ...c,
            stats: {
              ...c.stats,
              cleanliness: 100,
              happiness: Math.min(100, c.stats.happiness + 10)
            }
          };
        }
        return c;
      })
    );
    if (selectedCat && selectedCat.id === cat.id) {
      setSelectedCat((prev) => ({
        ...prev,
        stats: { ...prev.stats, cleanliness: 100, happiness: Math.min(100, prev.stats.happiness + 10) }
      }));
    }
    // Fly camera to spa
    const spaView = CAMERA_VIEWS.find((v) => v.id === 'spa');
    if (spaView) setActiveView(spaView);
  };

  // Adoption Confirmation
  const handleConfirmAdoption = (catId, adopterName) => {
    setCatsList((prev) =>
      prev.map((c) =>
        c.id === catId ? { ...c, isAdopted: true, adopterName } : c
      )
    );
    if (selectedCat && selectedCat.id === catId) {
      setSelectedCat((prev) => ({ ...prev, isAdopted: true, adopterName }));
    }
  };

  // Photobooth snapshot trigger
  const handleRequestSnapshot = () => {
    setIsSnapshotRequested(true);
  };

  const handleSnapshotReady = useCallback((dataUrl) => {
    setIsSnapshotRequested(false);
    setPhotoDataUrl(dataUrl);
  }, []);

  // Audio toggles
  const handleToggleMusic = () => {
    const active = soundEngine.toggleAmbientMusic();
    setIsMusicPlaying(active);
  };

  const handleToggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="app-viewport">
      {/* Top Navbar */}
      <Navbar
        activeViewId={activeView.id}
        onSelectView={handleSelectView}
        timeOfDay={timeOfDay}
        onChangeTimeOfDay={setTimeOfDay}
        weather={weather}
        onToggleWeather={() => setWeather((prev) => (prev === 'clear' ? 'rain' : 'clear'))}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenDirectory={() => setIsDirectoryOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        catsCount={catsList.length}
      />

      {/* 3D Scene Viewport */}
      <ThreeScene
        activeView={activeView.id}
        timeOfDay={timeOfDay}
        weather={weather}
        activeTool={activeTool}
        catsList={catsList}
        cameraPreset={activeView}
        onSelectCat={(cat) => setSelectedCat(cat)}
        onCatPetted={handlePetCat}
        snapshotRequested={isSnapshotRequested}
        onSnapshotReady={handleSnapshotReady}
      />

      {/* Bottom Interactive Toolbelt */}
      <Toolbelt
        activeTool={activeTool}
        onSelectTool={setActiveTool}
        onRequestSnapshot={handleRequestSnapshot}
      />

      {/* Cat Profile Modal */}
      {selectedCat && (
        <CatProfileModal
          cat={selectedCat}
          onClose={() => setSelectedCat(null)}
          onFeedCat={handleFeedCat}
          onPetCat={handlePetCat}
          onChangeAccessory={handleChangeAccessory}
          onStartSpa={handleStartSpa}
          onOpenAdoptionModal={(cat) => setAdoptionTargetCat(cat)}
        />
      )}

      {/* Adoption Certificate Modal */}
      {adoptionTargetCat && (
        <AdoptionCertificateModal
          cat={adoptionTargetCat}
          onClose={() => setAdoptionTargetCat(null)}
          onConfirmAdoption={handleConfirmAdoption}
        />
      )}

      {/* Cat Directory Drawer */}
      <CatDirectoryDrawer
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
        catsList={catsList}
        onSelectCat={(cat) => {
          setSelectedCat(cat);
          setIsDirectoryOpen(false);
        }}
        onFlyToCat={handleFlyToCat}
      />

      {/* Photobooth Snapshot Modal */}
      {photoDataUrl && (
        <PhotoboothModal
          photoUrl={photoDataUrl}
          onClose={() => setPhotoDataUrl(null)}
        />
      )}

      {/* Help & Tutorial Guide Modal */}
      <HelpGuideModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
