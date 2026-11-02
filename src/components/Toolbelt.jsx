import React from 'react';
import {
  Hand,
  Target,
  Fish,
  Sparkles,
  Shirt,
  Camera
} from 'lucide-react';
import { soundEngine } from '../audio/soundEffects.js';

export const TOOLS = [
  {
    id: 'pet',
    name: 'Elus Kucing',
    icon: Hand,
    bannerText: '👆 Klik salah satu kucing untuk mengelus, mendengar dengkuran purr, dan melihat profilnya.'
  },
  {
    id: 'laser',
    name: 'Laser Pointer',
    icon: Target,
    bannerText: '🔴 Gerakkan mouse ke lantai atau dinding untuk mengarahkan sinar laser merah • Klik untuk memancing kucing melompat & menerkam!'
  },
  {
    id: 'feed',
    name: 'Beri Makan',
    icon: Fish,
    bannerText: '🐟 Klik di mana saja pada lantai untuk melempar snack ikan. Kucing terdekat akan lari menyantapnya!'
  },
  {
    id: 'spa',
    name: 'Salon & Spa',
    icon: Sparkles,
    bannerText: '🫧 Klik kucing untuk mengajak mereka mandi busa harum di bak mandi clawfoot spa!'
  },
  {
    id: 'wardrobe',
    name: 'Kostum',
    icon: Shirt,
    bannerText: '🎩 Klik kucing untuk memakaikan topi penyihir, mahkota, dasi pita, atau kacamata keren!'
  },
  {
    id: 'photo',
    name: 'Photobooth',
    icon: Camera,
    bannerText: '📸 Klik tombol ini untuk mengabadikan momen foto Polaroid estetik bersama kucing!'
  }
];

export default function Toolbelt({
  activeTool,
  onSelectTool,
  onRequestSnapshot
}) {
  const currentToolInfo = TOOLS.find((t) => t.id === activeTool) || TOOLS[0];

  return (
    <>
      {/* Active Mode Banner Instruction */}
      <div className="active-mode-banner glass-panel">
        <span>{currentToolInfo.bannerText}</span>
      </div>

      {/* Floating Interactive Dock */}
      <nav className="bottom-dock glass-panel" aria-label="Alat Interaksi Pet Shop">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;

          return (
            <button
              key={tool.id}
              className={`dock-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                soundEngine.playClick();
                if (tool.id === 'photo') {
                  onRequestSnapshot();
                } else {
                  onSelectTool(tool.id);
                }
              }}
              title={tool.name}
            >
              <Icon size={20} />
              <span className="dock-label">{tool.name}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
