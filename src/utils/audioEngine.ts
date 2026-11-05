// Real Audio Player & Sound Engine for AFTERHOURS
// Plays authentic alternative rock tracks with real vocals, guitars, bass, and drums
// Connected to Web Audio AnalyserNode for real-time visualizer waveform rendering

export interface Track {
  id: string;
  title: string;
  album: string;
  duration: number; // in seconds
  bpm: number;
  key: string;
  year: string;
  audioSrc: string;
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
    duration: 238, // 3:58
    bpm: 144,
    key: 'D minor',
    year: '2025',
    audioSrc: 'audio/static-dreams.ogg',
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
    credits: 'Performed by AFTERHOURS (Vocals: Maya Lin, Guitar: Kieran Cruz, Bass: Dexter Vance, Drums: Samira Patel). Recorded at Old Chapel Studios, Leeds.',
    description: 'The explosive lead single with searing dual guitars, driving drums, and Maya Lin’s raw soaring vocals.'
  },
  {
    id: 'burn-the-tape',
    title: 'Burn the Tape',
    album: 'Disconnected Wire (2024 EP)',
    duration: 178, // 2:58
    bpm: 162,
    key: 'E minor',
    year: '2024',
    audioSrc: 'audio/burn-the-tape.ogg',
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
    credits: 'Written & performed by AFTERHOURS. Fast-tempo 162-BPM punk anthem recorded live to 4-track tape.',
    description: 'Fast, relentless pop-punk rush with distorted power chords, aggressive bass drive, and anthemic gang vocal choruses.'
  },
  {
    id: 'subway-florescent',
    title: 'Subway Florescent',
    album: 'Static Dreams at 3AM (2025 LP)',
    duration: 165, // 2:45
    bpm: 128,
    key: 'A minor',
    year: '2025',
    audioSrc: 'audio/subway-florescent.ogg',
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
    credits: 'Written by Lin / Vance. Recorded live at The Basement, Manchester.',
    description: 'High-energy alternative rock with kinetic rhythm guitars and raw melodic hooks.'
  },
  {
    id: 'dead-letters',
    title: 'Dead Letters (4-Track Acoustic Demo)',
    album: 'Disconnected Wire (2024 EP)',
    duration: 110, // 1:50
    bpm: 96,
    key: 'C major',
    year: '2024',
    audioSrc: 'audio/dead-letters.ogg',
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
    credits: 'Solo vocal and raw guitar demo recorded at 4:30 AM in Leeds mill stairwell.',
    description: 'Raw, emotional acoustic grunge ballad captured with vintage condenser mic ambiance.'
  }
];

class RockAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private isPlaying: boolean = false;
  private currentTrack: Track = TRACKS[0];
  private playbackTime: number = 0;
  private duration: number = TRACKS[0].duration;
  private volume: number = 0.85;
  private listeners: Set<() => void> = new Set();
  private isAudioInitialized: boolean = false;

  constructor() {
    // Lazy init on first user interaction in browser
  }

  private initAudio() {
    if (this.isAudioInitialized && this.audio) return;

    try {
      this.audio = new Audio();
      this.audio.preload = 'metadata';
      this.audio.volume = this.volume;
      this.audio.src = this.currentTrack.audioSrc;

      // Event listeners on HTMLAudioElement
      this.audio.addEventListener('timeupdate', () => {
        if (this.audio) {
          this.playbackTime = this.audio.currentTime;
          if (this.audio.duration && !isNaN(this.audio.duration)) {
            this.duration = this.audio.duration;
          }
          this.notify();
        }
      });

      this.audio.addEventListener('durationchange', () => {
        if (this.audio && this.audio.duration && !isNaN(this.audio.duration)) {
          this.duration = this.audio.duration;
          this.notify();
        }
      });

      this.audio.addEventListener('ended', () => {
        this.nextTrack();
      });

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('Audio element error, falling back:', e);
      });

      this.isAudioInitialized = true;
    } catch (err) {
      console.error('Failed to initialize audio element:', err);
    }
  }

  private initWebAudio() {
    if (this.ctx || !this.audio) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      // Connect HTML5 audio through Web Audio Analyser
      try {
        this.sourceNode = this.ctx.createMediaElementSource(this.audio);
        this.sourceNode.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
      } catch (nodeErr) {
        // In case CORS or multiple connection throws, continue gracefully
        console.warn('Web Audio source connection notice:', nodeErr);
      }
    } catch (e) {
      console.warn('Web Audio Context initialization notice:', e);
    }
  }

  public play(track?: Track) {
    this.initAudio();

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (track && track.id !== this.currentTrack.id) {
      this.currentTrack = track;
      this.playbackTime = 0;
      this.duration = track.duration;
      if (this.audio) {
        this.audio.src = track.audioSrc;
        this.audio.currentTime = 0;
      }
    }

    if (this.audio) {
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.initWebAudio();
            this.notify();
          })
          .catch((err) => {
            console.warn('Audio playback error:', err);
            // Even if browser blocks auto-play without user gesture, update state
            this.isPlaying = false;
            this.notify();
          });
      }
    }
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
    }
    this.isPlaying = false;
    this.notify();
  }

  public togglePlay(track?: Track) {
    this.initAudio();

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
    this.initAudio();
    const clamped = Math.max(0, Math.min(seconds, this.duration));
    this.playbackTime = clamped;
    if (this.audio) {
      this.audio.currentTime = clamped;
    }
    this.notify();
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
    this.notify();
  }

  public nextTrack() {
    const currentIndex = TRACKS.findIndex((t) => t.id === this.currentTrack.id);
    const nextIndex = (currentIndex + 1) % TRACKS.length;
    this.play(TRACKS[nextIndex]);
  }

  public prevTrack() {
    const currentIndex = TRACKS.findIndex((t) => t.id === this.currentTrack.id);
    const prevIndex = (currentIndex - 1 + TRACKS.length) % TRACKS.length;
    this.play(TRACKS[prevIndex]);
  }

  public selectTrack(track: Track) {
    this.play(track);
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack,
      playbackTime: this.playbackTime,
      duration: this.duration || this.currentTrack.duration,
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
    this.listeners.forEach((cb) => cb());
  }
}

export const audioEngine = new RockAudioEngine();
