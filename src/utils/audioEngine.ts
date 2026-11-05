// Web Audio API Synthesizer Engine for AFTERHOURS Demo Tracks
// Generates authentic alternative rock & pop-punk riffs, basslines, and drums

export interface Track {
  id: string;
  title: string;
  album: string;
  duration: number; // in seconds
  bpm: number;
  key: string;
  year: string;
  lyricsSnippet: string;
  fullLyrics?: string[];
  credits: string;
  description: string;
}

export const TRACKS: Track[] = [
  {
    id: 'static-dreams',
    title: 'Static Dreams at 3AM',
    album: 'Static Dreams at 3AM (2025 LP)',
    duration: 184, // 3:04
    bpm: 144,
    key: 'D minor',
    year: '2025',
    lyricsSnippet: 'Radio hiss on the dashboard clock / We drove past midnight just to feel the shock',
    fullLyrics: [
      "Radio hiss on the dashboard clock",
      "We drove past midnight just to feel the shock",
      "Streetlights bleeding into wet asphalt",
      "You said the breakdown wasn't anyone's fault",
      "",
      "[CHORUS]",
      "Static dreams at three in the morning",
      "We take the hit without a warning",
      "Scratched on the pavement, loud through the floor",
      "You swore you'd never call my name no more",
      "",
      "Fluorescent buzz in the all-night diner",
      "Nothing looks clean, but nothing feels finer",
      "Ten thousand decibels ringing in my head",
      "Better off screaming than leaving things unsaid"
    ],
    credits: 'Written by Lin / Cruz / Vance / Patel. Recorded at Old Chapel Studios, Leeds. Produced by AFTERHOURS.',
    description: 'The explosive lead single. Driving eighth-note power chords, thunderous tom fills, and a soaring vocal line recorded through an overdriven guitar cab.'
  },
  {
    id: 'subway-florescent',
    title: 'Subway Florescent',
    album: 'Static Dreams at 3AM (2025 LP)',
    duration: 168, // 2:48
    bpm: 128,
    key: 'A minor',
    year: '2025',
    lyricsSnippet: 'Tiles peeling off the platform wall / Waiting for the echo of your final call',
    fullLyrics: [
      "Tiles peeling off the platform wall",
      "Waiting for the echo of your final call",
      "Train tracks humming with an empty wire",
      "Smell of cold metal and a dying fire",
      "",
      "[CHORUS]",
      "Underneath the city in the flicker and hum",
      "Count every heartbeat like a funeral drum",
      "Subway fluorescent, flickering white",
      "We disappeared into the northern night"
    ],
    credits: 'Written by Lin / Vance. Recorded live to tape at The Basement, Manchester.',
    description: 'Post-punk bass-driven tension that detonates into a jagged wall of Telecaster distortion.'
  },
  {
    id: 'burn-the-tape',
    title: 'Burn the Tape',
    album: 'Disconnected Wire (2024 EP)',
    duration: 135, // 2:15
    bpm: 162,
    key: 'E minor',
    year: '2024',
    lyricsSnippet: 'Two minutes flat and the speakers blow / Don’t look back where the embers glow',
    fullLyrics: [
      "Two minutes flat and the speakers blow",
      "Don't look back where the embers glow",
      "We stole the cassette from the rental van",
      "Running down the alley with a broken plan",
      "",
      "[CHORUS]",
      "Burn the tape! Let the magnet fry!",
      "No nostalgic tears in a bloodshot eye!",
      "Faster than the siren on the motorway",
      "We've got nothing to salvage anyway!"
    ],
    credits: 'Written by Cruz / Patel. Mixed by Dex Vance on a 4-track TASCAM Portastudio.',
    description: 'Pure 162-BPM adrenaline pop-punk. Fast palm-muted riffs, crashing China cymbals, and breathless vocal delivery.'
  },
  {
    id: 'dead-letters',
    title: 'Dead Letters (4-Track Acoustic Demo)',
    album: 'Disconnected Wire (2024 EP)',
    duration: 210, // 3:30
    bpm: 96,
    key: 'C major',
    year: '2024',
    lyricsSnippet: 'Pencil scratches through the envelope fold / Some stories are better left untold',
    fullLyrics: [
      "Pencil scratches through the envelope fold",
      "Some stories are better left untold",
      "Coffee ring stains on your farewell note",
      "Still wearing your grandfather's trench coat",
      "",
      "[CHORUS]",
      "Dead letters piling at the cellar door",
      "Dust on the pedals, blood on the floor",
      "You said tomorrow was a different town",
      "I watched the rain bring the chimney down"
    ],
    credits: 'Written & performed solo by Maya Lin in an empty rehearsal hall at 4:30 AM.',
    description: 'Raw, emotional acoustic grunge ballad recorded with a single condenser mic in a cavernous stairwell.'
  }
];

class RockAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isPlaying: boolean = false;
  private currentTrack: Track = TRACKS[0];
  private playbackTime: number = 0;
  private intervalId: number | null = null;
  private timerStartTime: number = 0;
  private listeners: Set<() => void> = new Set();
  private volume: number = 0.8;
  private loopTimer: number | null = null;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Distortion curve generator
  private makeDistortionCurve(amount: number = 30): Float32Array {
    const k = amount;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  // Play power chord on electric guitar
  private playGuitarChord(freqs: number[], time: number, dur: number, gainLevel: number = 0.12) {
    if (!this.ctx || !this.masterGain) return;

    freqs.forEach(freq => {
      // 2 detuned oscillators per note for thick analog crunch
      [-3, 3].forEach(detune => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const shaper = this.ctx!.createWaveShaper();
        const filter = this.ctx!.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, time);
        osc.detune.setValueAtTime(detune, time);

        // Distortion curve
        shaper.curve = this.makeDistortionCurve(45) as any;
        shaper.oversample = '2x';

        // Amp cabinet filter simulation (rolls off harsh highs above 4500Hz)
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3800, time);
        filter.Q.setValueAtTime(1.2, time);

        // Amplitude envelope
        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.exponentialRampToValueAtTime(gainLevel, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(gainLevel * 0.7, time + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);

        osc.connect(shaper);
        shaper.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(time);
        osc.stop(time + dur);
      });
    });
  }

  // Play bass note
  private playBassNote(freq: number, time: number, dur: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.22, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + dur);
  }

  // Play punchy rock kick drum
  private playKick(time: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(38, time + 0.14);

    gain.gain.setValueAtTime(0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.25);
  }

  // Play rock snare drum (snappy white noise + tone burst)
  private playSnare(time: number) {
    if (!this.ctx || !this.masterGain) return;

    // Noise buffer
    const bufferSize = this.ctx.sampleRate * 0.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(900, time);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    // Body tone
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, time);
    osc.frequency.exponentialRampToValueAtTime(80, time + 0.1);

    oscGain.gain.setValueAtTime(0.25, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    noise.start(time);
    osc.start(time);
    noise.stop(time + 0.2);
    osc.stop(time + 0.15);
  }

  // Play hi-hat / cymbal
  private playHiHat(time: number, open: boolean = false) {
    if (!this.ctx || !this.masterGain) return;

    const dur = open ? 0.35 : 0.06;
    const bufferSize = Math.floor(this.ctx.sampleRate * dur);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(open ? 0.18 : 0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + dur);
  }

  // Schedules one 4-measure rock phrase
  private scheduleRockBar(startTime: number) {
    if (!this.ctx || !this.isPlaying) return;

    const beatLen = 60 / this.currentTrack.bpm;
    const barLen = beatLen * 4;

    // Distinct chords depending on track
    let chordProgression: number[][] = [];
    let bassProgression: number[] = [];

    if (this.currentTrack.id === 'static-dreams') {
      // Dm -> Bb -> F -> C (Classic punk-rock drive)
      chordProgression = [
        [146.83, 220.00, 293.66], // Dm (D3, A3, D4)
        [116.54, 174.61, 233.08], // Bb (Bb2, F3, Bb3)
        [174.61, 261.63, 349.23], // F (F3, C4, F4)
        [130.81, 196.00, 261.63], // C (C3, G3, C4)
      ];
      bassProgression = [73.42, 58.27, 87.31, 65.41]; // D2, Bb1, F2, C2
    } else if (this.currentTrack.id === 'subway-florescent') {
      // Am -> F -> G -> Em
      chordProgression = [
        [220.00, 329.63, 440.00], // Am
        [174.61, 261.63, 349.23], // F
        [196.00, 293.66, 392.00], // G
        [164.81, 246.94, 329.63], // Em
      ];
      bassProgression = [55.00, 43.65, 49.00, 41.20]; // A1, F1, G1, E1
    } else if (this.currentTrack.id === 'burn-the-tape') {
      // Fast E5 -> G5 -> A5 -> B5
      chordProgression = [
        [164.81, 246.94, 329.63],
        [196.00, 293.66, 392.00],
        [220.00, 329.63, 440.00],
        [246.94, 370.00, 493.88],
      ];
      bassProgression = [82.41, 98.00, 110.00, 123.47];
    } else {
      // Dead Letters (Warm grunge acoustic)
      chordProgression = [
        [130.81, 196.00, 261.63, 329.63], // C
        [174.61, 220.00, 261.63, 349.23], // F
        [146.83, 220.00, 293.66, 349.23], // Dm
        [196.00, 246.94, 293.66, 392.00], // G
      ];
      bassProgression = [65.41, 87.31, 73.42, 98.00];
    }

    // Schedule 4 bars
    for (let b = 0; b < 4; b++) {
      const barStart = startTime + b * barLen;
      const chords = chordProgression[b % chordProgression.length];
      const bassNote = bassProgression[b % bassProgression.length];

      // Rhythm guitar: 8th notes strumming pattern
      for (let eighth = 0; eighth < 8; eighth++) {
        const strumTime = barStart + eighth * (beatLen / 2);
        const dur = (beatLen / 2) * 0.85;
        this.playGuitarChord(chords, strumTime, dur, eighth % 2 === 0 ? 0.12 : 0.08);
      }

      // Bass notes: quarter note groove
      for (let q = 0; q < 4; q++) {
        this.playBassNote(bassNote, barStart + q * beatLen, beatLen * 0.9);
      }

      // Drums
      if (this.currentTrack.id !== 'dead-letters') {
        // Kick on beats 1 and 3 (plus syncopated kick on beat 2.5)
        this.playKick(barStart);
        this.playKick(barStart + beatLen * 2);
        if (b % 2 === 1) {
          this.playKick(barStart + beatLen * 1.5);
        }

        // Snare on beats 2 and 4
        this.playSnare(barStart + beatLen);
        this.playSnare(barStart + beatLen * 3);

        // Hi-hats on all 8 eighth notes
        for (let h = 0; h < 8; h++) {
          const hatTime = barStart + h * (beatLen / 2);
          const isOpen = h === 7;
          this.playHiHat(hatTime, isOpen);
        }
      } else {
        // Subtle hi-hat / shaker for acoustic track
        for (let h = 0; h < 4; h++) {
          this.playHiHat(barStart + h * beatLen, false);
        }
      }
    }

    // Loop trigger for next 4-bar phrase
    const nextPhraseTime = 4 * barLen * 1000;
    this.loopTimer = window.setTimeout(() => {
      if (this.isPlaying && this.ctx) {
        this.scheduleRockBar(this.ctx.currentTime);
      }
    }, nextPhraseTime - 250);
  }

  public play(track?: Track) {
    this.initContext();

    if (track && track.id !== this.currentTrack.id) {
      this.currentTrack = track;
      this.playbackTime = 0;
    }

    if (this.isPlaying) return;

    this.isPlaying = true;
    this.timerStartTime = Date.now() - this.playbackTime * 1000;

    // Start audio synthesis
    if (this.ctx) {
      this.scheduleRockBar(this.ctx.currentTime + 0.05);
    }

    // Update playback timer
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.playbackTime = (Date.now() - this.timerStartTime) / 1000;
      if (this.playbackTime >= this.currentTrack.duration) {
        this.nextTrack();
      }
      this.notify();
    }, 250);

    this.notify();
  }

  public pause() {
    this.isPlaying = false;
    if (this.loopTimer) clearTimeout(this.loopTimer);
    if (this.intervalId) clearInterval(this.intervalId);
    this.notify();
  }

  public togglePlay(track?: Track) {
    if (track && track.id !== this.currentTrack.id) {
      this.play(track);
      return;
    }

    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public seek(seconds: number) {
    this.playbackTime = Math.max(0, Math.min(seconds, this.currentTrack.duration));
    this.timerStartTime = Date.now() - this.playbackTime * 1000;
    this.notify();
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  public nextTrack() {
    const currentIndex = TRACKS.findIndex(t => t.id === this.currentTrack.id);
    const nextIndex = (currentIndex + 1) % TRACKS.length;
    this.playbackTime = 0;
    if (this.loopTimer) clearTimeout(this.loopTimer);
    this.play(TRACKS[nextIndex]);
  }

  public prevTrack() {
    const currentIndex = TRACKS.findIndex(t => t.id === this.currentTrack.id);
    const prevIndex = (currentIndex - 1 + TRACKS.length) % TRACKS.length;
    this.playbackTime = 0;
    if (this.loopTimer) clearTimeout(this.loopTimer);
    this.play(TRACKS[prevIndex]);
  }

  public selectTrack(track: Track) {
    this.playbackTime = 0;
    if (this.loopTimer) clearTimeout(this.loopTimer);
    this.currentTrack = track;
    if (this.isPlaying) {
      this.play(track);
    } else {
      this.notify();
    }
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack,
      playbackTime: this.playbackTime,
      volume: this.volume,
    };
  }

  public getVisualizerData(dataArray: Uint8Array): void {
    if (this.analyser && this.isPlaying) {
      this.analyser.getByteFrequencyData(dataArray as any);
    } else {
      dataArray.fill(0);
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }
}

export const audioEngine = new RockAudioEngine();
