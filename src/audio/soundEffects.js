// Web Audio API Procedural Sound Engine for 3D Cat Pet Shop
// Zero external audio files needed - 100% reliable and zero latency!

let audioCtx = null;
let isMuted = false;
let musicGainNode = null;
let sfxGainNode = null;
let isMusicPlaying = false;
let ambientInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
      
      musicGainNode = audioCtx.createGain();
      musicGainNode.gain.setValueAtTime(0.18, audioCtx.currentTime);
      musicGainNode.connect(audioCtx.destination);

      sfxGainNode = audioCtx.createGain();
      sfxGainNode.gain.setValueAtTime(0.28, audioCtx.currentTime);
      sfxGainNode.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const soundEngine = {
  toggleMute() {
    isMuted = !isMuted;
    if (audioCtx) {
      if (sfxGainNode) sfxGainNode.gain.value = isMuted ? 0 : 0.28;
      if (musicGainNode) musicGainNode.gain.value = isMuted ? 0 : 0.18;
    }
    return isMuted;
  },

  getMuted() {
    return isMuted;
  },

  // Play a cute procedural cat meow
  playMeow(pitchMultiplier = 1.0) {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const formant = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    // Frequency trajectory of a cat meow (pitch rises then glides down)
    const baseFreq = 420 * pitchMultiplier;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq * 0.8, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + 0.35);

    // Formant vocal filter
    formant.type = 'bandpass';
    formant.frequency.setValueAtTime(1400 * pitchMultiplier, now);
    formant.frequency.linearRampToValueAtTime(950 * pitchMultiplier, now + 0.35);
    formant.Q.value = 3.5;

    // Amplitude envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc.connect(formant);
    formant.connect(gain);
    gain.connect(sfxGainNode || ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  },

  // Play purr sound (gentle low rumble)
  playPurr() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const amOsc = ctx.createOscillator();
    const amGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(75, now);

    // 24Hz amplitude modulation for the rhythmic purring vibration
    amOsc.type = 'sine';
    amOsc.frequency.setValueAtTime(24, now);
    amGain.gain.setValueAtTime(0.5, now);
    amOsc.connect(gain.gain);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.2);
    gain.gain.linearRampToValueAtTime(0.001, now + 1.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(sfxGainNode || ctx.destination);

    amOsc.start(now);
    osc.start(now);
    amOsc.stop(now + 1.25);
    osc.stop(now + 1.25);
  },

  // Play treat munching / eating sound
  playTreatCrunch() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // 3 quick crunch pops
    for (let i = 0; i < 3; i++) {
      const crunchTime = now + i * 0.09;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'square';
      osc.frequency.setValueAtTime(220 + Math.random() * 80, crunchTime);
      osc.frequency.exponentialRampToValueAtTime(80, crunchTime + 0.05);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, crunchTime);
      filter.Q.value = 2.0;

      gain.gain.setValueAtTime(0.15, crunchTime);
      gain.gain.exponentialRampToValueAtTime(0.001, crunchTime + 0.06);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(sfxGainNode || ctx.destination);

      osc.start(crunchTime);
      osc.stop(crunchTime + 0.07);
    }
  },

  // Play water bubble sound for spa
  playBubble() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const startFreq = 400 + Math.random() * 300;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 2.1, now + 0.12);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(sfxGainNode || ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  },

  // Play celebratory chime for adoption
  playCelebration() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      const time = now + idx * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.18, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.6);

      osc.connect(gain);
      gain.connect(sfxGainNode || ctx.destination);

      osc.start(time);
      osc.stop(time + 0.65);
    });
  },

  // Play click / UI interaction pop
  playClick() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(280, now + 0.05);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(sfxGainNode || ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  },

  // Ambient Lo-Fi Cafe Background Music (soft procedural chords)
  toggleAmbientMusic() {
    if (isMusicPlaying) {
      this.stopAmbientMusic();
      return false;
    } else {
      this.startAmbientMusic();
      return true;
    }
  },

  isMusicActive() {
    return isMusicPlaying;
  },

  startAmbientMusic() {
    const ctx = getAudioContext();
    if (!ctx || isMusicPlaying) return;
    isMusicPlaying = true;

    // Cozy jazz/lo-fi chord progression: Dmaj7 -> Bm7 -> Em7 -> A7sus4
    const chords = [
      [293.66, 369.99, 440.00, 554.37], // Dmaj7
      [246.94, 293.66, 369.99, 440.00], // Bm7
      [329.63, 392.00, 493.88, 587.33], // Em7
      [220.00, 293.66, 329.63, 440.00]  // A7sus4
    ];

    let chordIdx = 0;

    const playChordStep = () => {
      if (!isMusicPlaying || !audioCtx) return;
      const currentChord = chords[chordIdx];
      chordIdx = (chordIdx + 1) % chords.length;

      const now = audioCtx.currentTime;
      currentChord.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const filter = audioCtx.createBiquadFilter();
        const gain = audioCtx.createGain();

        // Warm electric piano timbre
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.04);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(700, now);

        gain.gain.setValueAtTime(0.001, now + i * 0.04);
        gain.gain.linearRampToValueAtTime(0.04, now + 0.3 + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(musicGainNode || audioCtx.destination);

        osc.start(now + i * 0.04);
        osc.stop(now + 2.9);
      });
    };

    playChordStep();
    ambientInterval = setInterval(playChordStep, 3000);
  },

  stopAmbientMusic() {
    isMusicPlaying = false;
    if (ambientInterval) {
      clearInterval(ambientInterval);
      ambientInterval = null;
    }
  },

  // Procedural Cozy Rain Sound Generator
  startRain() {
    if (this.rainSource) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    // Create 2 seconds of pink/white noise buffer
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.12;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Resonant lowpass filter to mimic real rain falling on streets and trees
    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.setValueAtTime(1050, ctx.currentTime);

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.001, ctx.currentTime);
    rainGain.gain.linearRampToValueAtTime(isMuted ? 0 : 0.16, ctx.currentTime + 1.2);

    whiteNoise.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(sfxGainNode || ctx.destination);

    whiteNoise.start();
    this.rainSource = whiteNoise;
    this.rainGain = rainGain;
  },

  stopRain() {
    if (this.rainGain && audioCtx) {
      this.rainGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      setTimeout(() => {
        if (this.rainSource) {
          try { this.rainSource.stop(); } catch (e) {}
          this.rainSource = null;
          this.rainGain = null;
        }
      }, 900);
    }
  },

  // Play crisp handheld laser pointer click / switch sound
  playLaserClick() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Fast high-pitch laser blip
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.06);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(sfxGainNode || ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  },

  // Play playful excited cat chirp/trill when chasing or catching the laser
  playLaserChirp() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    // Rapid cute trill frequency modulation
    osc.frequency.setValueAtTime(750, now);
    osc.frequency.linearRampToValueAtTime(1150, now + 0.04);
    osc.frequency.linearRampToValueAtTime(850, now + 0.08);
    osc.frequency.linearRampToValueAtTime(1250, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.22);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1300, now);
    filter.Q.value = 2.5;

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.19, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(sfxGainNode || ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  },

  // Play cafe entrance door chime / latch sound
  playDoorSound(isOpen) {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    if (isOpen) {
      // Lovely cafe brass bell chime (Ding-dong chime!)
      const chimes = [1318.51, 1760.0, 1975.53]; // E6, A6, B6
      chimes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.08 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.65);

        osc.connect(gain);
        gain.connect(sfxGainNode || ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.7);
      });
    } else {
      // Soft wooden door latch click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(sfxGainNode || ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    }
  },

  // Play espresso machine brewing & steaming sound
  playCoffeeBrew() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Steam hiss / extraction pump noise
    const bufferSize = ctx.sampleRate * 0.8;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const steamFilter = ctx.createBiquadFilter();
    steamFilter.type = 'bandpass';
    steamFilter.frequency.setValueAtTime(2200, now);
    steamFilter.Q.value = 1.8;

    const steamGain = ctx.createGain();
    steamGain.gain.setValueAtTime(0.001, now);
    steamGain.gain.linearRampToValueAtTime(0.2, now + 0.08);
    steamGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    whiteNoise.connect(steamFilter);
    steamFilter.connect(steamGain);
    steamGain.connect(sfxGainNode || ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.85);

    // 2. Finished coffee pour ding
    setTimeout(() => {
      if (isMuted || !audioCtx) return;
      const ding = audioCtx.createOscillator();
      const dGain = audioCtx.createGain();
      ding.type = 'sine';
      ding.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      dGain.gain.setValueAtTime(0.16, audioCtx.currentTime);
      dGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

      ding.connect(dGain);
      dGain.connect(sfxGainNode || audioCtx.destination);
      ding.start(audioCtx.currentTime);
      ding.stop(audioCtx.currentTime + 0.55);
    }, 600);
  }
};
