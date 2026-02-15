"use client";

// ============================================================
// CNY AUDIO ENGINE — Web Audio API synthesized sounds
// Background pentatonic melody + sound effects
// ============================================================

class CNYAudio {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private bgGain: GainNode | null = null;
  private bgTimeout: ReturnType<typeof setTimeout> | null = null;
  private bgPlaying = false;
  private muted = false;

  private ensureCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(1, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // --- Plucked string note (music box / guzheng-like) ---
  private pluck(freq: number, time: number, dur: number, vol: number = 0.12) {
    const ctx = this.ensureCtx();
    // Fundamental
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, time);

    // Slight detune for warmth
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq * 2.01, time);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(vol, time + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0, time);
    gain2.gain.linearRampToValueAtTime(vol * 0.3, time + 0.005);
    gain2.gain.exponentialRampToValueAtTime(0.001, time + dur * 0.6);

    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(this.bgGain || this.masterGain!);
    gain2.connect(this.bgGain || this.masterGain!);

    osc.start(time);
    osc.stop(time + dur + 0.05);
    osc2.start(time);
    osc2.stop(time + dur + 0.05);
  }

  // --- Pentatonic scale (C major pentatonic) ---
  // C4=262, D4=294, E4=330, G4=392, A4=440
  // C5=523, D5=587, E5=659, G5=784
  private readonly N: Record<string, number> = {
    C4: 261.63, D4: 293.66, E4: 329.63, G4: 392.00, A4: 440.00,
    C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880.00,
    C3: 130.81, G3: 196.00,
  };

  // --- Background melody ---
  // A gentle, looping CNY-inspired pentatonic melody
  // Each entry: [note, duration in beats]
  private readonly MELODY: [string, number][] = [
    // Phrase 1 — ascending, hopeful
    ["E4", 1], ["E4", 0.5], ["D4", 0.5], ["E4", 1], ["G4", 1],
    ["A4", 1], ["G4", 0.5], ["E4", 0.5], ["D4", 1], ["C4", 1],
    // Phrase 2 — call and response
    ["D4", 1], ["E4", 1], ["G4", 1.5], ["E4", 0.5],
    ["D4", 1], ["C4", 1], ["D4", 1], ["E4", 1],
    // Phrase 3 — climbing higher
    ["G4", 1], ["A4", 0.5], ["G4", 0.5], ["E4", 1], ["G4", 1],
    ["C5", 1.5], ["A4", 0.5], ["G4", 1], ["E4", 1],
    // Phrase 4 — resolve
    ["D4", 1], ["E4", 0.5], ["D4", 0.5], ["C4", 2],
    ["_", 1], ["_", 1], // rest
  ];

  private bgNoteIndex = 0;
  private readonly BG_TEMPO = 280; // ms per beat

  startBackground() {
    if (this.bgPlaying) return;
    this.bgPlaying = true;

    const ctx = this.ensureCtx();
    this.bgGain = ctx.createGain();
    this.bgGain.gain.setValueAtTime(0, ctx.currentTime);
    // Fade in over 1.5s
    this.bgGain.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 1.5);
    this.bgGain.connect(this.masterGain!);

    this.bgNoteIndex = 0;
    this.scheduleNext();
  }

  private scheduleNext() {
    if (!this.bgPlaying) return;

    const [note, beats] = this.MELODY[this.bgNoteIndex % this.MELODY.length];
    const dur = beats * this.BG_TEMPO / 1000;

    if (note !== "_" && this.ctx) {
      const now = this.ctx.currentTime;
      const freq = this.N[note];
      if (freq) {
        this.pluck(freq, now, Math.max(dur * 1.5, 0.4), 0.1);

        // Add bass note every 4 beats
        if (this.bgNoteIndex % 4 === 0) {
          const bassNote = note.includes("C") ? "C3" : "G3";
          this.pluck(this.N[bassNote], now, 1.2, 0.05);
        }
      }
    }

    this.bgNoteIndex++;
    this.bgTimeout = setTimeout(() => this.scheduleNext(), beats * this.BG_TEMPO);
  }

  stopBackground() {
    this.bgPlaying = false;
    if (this.bgTimeout) {
      clearTimeout(this.bgTimeout);
      this.bgTimeout = null;
    }
    if (this.bgGain && this.ctx) {
      this.bgGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.8);
    }
  }

  // --- SFX: Gong ---
  playGong() {
    const ctx = this.ensureCtx();
    const now = ctx.currentTime;

    // Low fundamental
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(110, now);
    osc1.frequency.exponentialRampToValueAtTime(75, now + 3);
    const g1 = ctx.createGain();
    g1.gain.setValueAtTime(0.35, now);
    g1.gain.exponentialRampToValueAtTime(0.001, now + 3);
    osc1.connect(g1);
    g1.connect(this.masterGain!);
    osc1.start(now);
    osc1.stop(now + 3.1);

    // Metallic overtone
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(220, now);
    osc2.frequency.exponentialRampToValueAtTime(180, now + 2);
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.15, now);
    g2.gain.exponentialRampToValueAtTime(0.001, now + 2);
    osc2.connect(g2);
    g2.connect(this.masterGain!);
    osc2.start(now);
    osc2.stop(now + 2.1);

    // High shimmer
    const osc3 = ctx.createOscillator();
    osc3.type = "sine";
    osc3.frequency.setValueAtTime(440, now);
    const g3 = ctx.createGain();
    g3.gain.setValueAtTime(0.06, now);
    g3.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    osc3.connect(g3);
    g3.connect(this.masterGain!);
    osc3.start(now);
    osc3.stop(now + 1.3);

    // Attack transient (noise burst)
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.2, now);
    ng.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(800, now);
    noise.connect(lp);
    lp.connect(ng);
    ng.connect(this.masterGain!);
    noise.start(now);
  }

  // --- SFX: Paper tear / crack ---
  playTear() {
    const ctx = this.ensureCtx();
    const now = ctx.currentTime;

    const bufLen = ctx.sampleRate * 0.4;
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufLen, 0.5);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.setValueAtTime(2000, now);
    hp.frequency.linearRampToValueAtTime(6000, now + 0.2);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    noise.connect(hp);
    hp.connect(gain);
    gain.connect(this.masterGain!);
    noise.start(now);
  }

  // --- SFX: Celebration fanfare ---
  playCelebration() {
    const ctx = this.ensureCtx();
    const now = ctx.currentTime;

    // Ascending pentatonic arpeggio
    const notes = [523.25, 659.25, 783.99, 880.00, 1046.50]; // C5 E5 G5 A5 C6
    notes.forEach((freq, i) => {
      const t = now + i * 0.1;

      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(t);
      osc.stop(t + 1);
    });

    // Final chord ring
    const chordTime = now + notes.length * 0.1 + 0.05;
    [523.25, 659.25, 783.99].forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, chordTime);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, chordTime);
      gain.gain.linearRampToValueAtTime(0.08, chordTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, chordTime + 1.8);
      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(chordTime);
      osc.stop(chordTime + 2);
    });
  }

  // --- SFX: Card flip whoosh ---
  playFlip() {
    const ctx = this.ensureCtx();
    const now = ctx.currentTime;

    const bufLen = ctx.sampleRate * 0.18;
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufLen) * Math.PI);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(800, now);
    bp.frequency.linearRampToValueAtTime(3000, now + 0.12);
    bp.Q.setValueAtTime(1.5, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    noise.connect(bp);
    bp.connect(gain);
    gain.connect(this.masterGain!);
    noise.start(now);
  }

  // --- Mute toggle ---
  toggleMute(): boolean {
    this.muted = !this.muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(
        this.muted ? 0 : 1,
        this.ctx.currentTime + 0.1
      );
    }
    return this.muted;
  }

  isMuted(): boolean {
    return this.muted;
  }
}

// Singleton — only created in browser
export const cnyAudio = typeof window !== "undefined" ? new CNYAudio() : null;
