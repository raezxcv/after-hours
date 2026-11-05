// Real Audio Player & Sound Engine for AFTERHOURS
// High-energy female-fronted pop-punk and alternative rock tracks
// Maya Lin lead vocals with distorted Telecaster & Les Paul guitars, punchy bass, and live drums
// Connected to Web Audio AnalyserNode for real-time visualizer waveform rendering

export interface SongSection {
  label: string;
  time: number; // in seconds
}

export interface Track {
  id: string;
  title: string;
  album: string;
  duration: number; // in seconds
  bpm: number;
  key: string;
  year: string;
  audioSrc: string;
  vocalist: string;
  lyricsSnippet: string;
  fullLyrics: string[];
  sections: SongSection[];
  credits: string;
  description: string;
}

export const TRACKS: Track[] = [
  {
    id: 'after-hours',
    title: 'After Hours',
    album: 'Static Dreams at 3AM (2025 LP)',
    duration: 220, // 3:40
    bpm: 122,
    key: 'A minor',
    year: '2025',
    audioSrc: 'audio/after-hours.mp3',
    vocalist: 'Maya Lin (Female Lead Vocals)',
    lyricsSnippet: "I said I wouldn't be back here again, but here I am again / Team no sleep, after hours athlete",
    fullLyrics: [
      "I said I wouldn't be back here again",
      "But here I am again",
      "Wearing the same clothes out two nights in a row",
      "I didn't go home again",
      "",
      "Wide awake, wide awake",
      "Looking for another escape",
      "We can dance all night, come and find me",
      "These bright lights screaming: 'Go on, blind me!'",
      "Woah, woah, woah",
      "",
      "[CHORUS]",
      "Team no sleep, after hours athlete",
      "No rest for the wicked",
      "I don't want to crash, I've gotta get high fast",
      "Need somewhere to go",
      "I'm losing control, my mind's about to blow",
      "Here we go again!",
      "",
      "[MIDDLE 8 / BRIDGE]",
      "Make it stop, feeling heavy",
      "Bring me back to life",
      "Let's get drunk, make it messy",
      "Give me another line, and again and again...",
      "",
      "[FINAL CHORUS & OUTRO]",
      "Team no sleep, after hours athlete",
      "Wide awake, looking for another escape",
      "I'm losing control, my mind's about to blow",
      "Here we go again!"
    ],
    sections: [
      { label: 'INTRO', time: 0 },
      { label: 'VERSE 1', time: 18 },
      { label: 'CHORUS', time: 54 },
      { label: 'VERSE 2', time: 88 },
      { label: 'BRIDGE', time: 135 },
      { label: 'CHORUS', time: 165 },
      { label: 'OUTRO', time: 198 }
    ],
    credits: 'Vocals: Maya Lin. Guitars: Kieran Cruz. Bass: Dexter Vance. Drums: Samira Patel. Mastered at Abbey Road Studios.',
    description: 'The anthemic title track combining energetic pop-punk rhythms with Maya Lin’s soaring vocals and blistering electric guitar hooks.'
  },
  {
    id: 'living-nightmare',
    title: 'Living Nightmare',
    album: 'Disconnected Wire (2024 EP)',
    duration: 178, // 2:58
    bpm: 168,
    key: 'E minor',
    year: '2024',
    audioSrc: 'audio/living-nightmare.mp3',
    vocalist: 'Maya Lin (Female Lead Vocals)',
    lyricsSnippet: 'I’m wide awake but you’re a nightmare / Egocentric, narcissistic, and you won’t go away',
    fullLyrics: [
      "I’m wide awake but you’re a nightmare",
      "I can’t escape, I’m seeing you everywhere",
      "Words that you say poison the air",
      "I’m wide awake but you’re my nightmare",
      "",
      "[REFRAIN]",
      "Egocentric!",
      "Narcissistic!",
      "And you won’t go away!",
      "",
      "You're trumpeting hate and you don’t play fair",
      "With your arrogant ways and your comb-over hair",
      "Know you’re a fake, not a billionaire",
      "No, no, I’m wide awake and you’re a nightmare!",
      "",
      "[REFRAIN]",
      "Egocentric!",
      "Narcissistic!",
      "And you won’t go away!",
      "",
      "Blame is your game, power your aim",
      "No stranger to shame, 'cuz they made you change your name!",
      "Won’t take the bait in your golden snare",
      "You’re known to take more than the lion’s share",
      "Keeping my faith, not your lies and despair",
      "Oh, I’m wide, wide awake and you’re a living nightmare!",
      "",
      "[OUTRO BREAKDOWN]",
      "Egocentric! Narcissistic!",
      "Sadly a certified cynic! (Geocentric)",
      "Who’s choked on a big dose of bitterness! (Fatalistic)",
      "Your bigotry is making the whole world sick! (Ethnocentric)",
      "‘Cuz you’re oh, so sadistic!",
      "And you won’t go away!",
      "But I won’t play, won’t be your prey!",
      "Go away! Won’t be your slave! Go away!"
    ],
    sections: [
      { label: 'INTRO', time: 0 },
      { label: 'VERSE 1', time: 14 },
      { label: 'HOOK', time: 35 },
      { label: 'VERSE 2', time: 52 },
      { label: 'SOLO', time: 88 },
      { label: 'CHORUS', time: 112 },
      { label: 'OUTRO', time: 142 }
    ],
    credits: 'Written by Lin / Cruz. Recorded live to 2-inch tape in Leeds. Full driving 168-BPM Paramore-style pop-punk energy.',
    description: 'Fast, aggressive pop-punk with driving power chords, tight snare rolls, and furious vocal delivery.'
  },
  {
    id: 'the-paradox',
    title: 'The Paradox',
    album: 'Static Dreams at 3AM (2025 LP)',
    duration: 244, // 4:04
    bpm: 118,
    key: 'D minor',
    year: '2025',
    audioSrc: 'audio/the-paradox.mp3',
    vocalist: 'Maya Lin (Female Lead Vocals)',
    lyricsSnippet: 'You are resilient like a distant star / You are brilliant glowing in the growing dark, even with a broken heart',
    fullLyrics: [
      "Swirling, overwhelmed",
      "Hyper-stimulated",
      "By a deviant spell",
      "Half the world’s been baited",
      "",
      "[CHORUS]",
      "You are resilient like a distant star",
      "You are brilliant glowing in the growing dark",
      "Even with a broken heart!",
      "",
      "Systemic urgency",
      "Running wheel of fight or flight",
      "Resist but keep your energy",
      "Balanced barefoot on a knife",
      "",
      "[CHORUS]",
      "You are resilient like a distant star",
      "You are brilliant glowing in the growing dark",
      "Even with a broken heart!",
      "Glowing in the growing dark, even with a broken heart...",
      "",
      "[BRIDGE]",
      "Caught in a paradox",
      "Cycle of indulgence and detox",
      "In a castle of dreams where the doors are all locked",
      "Climbing the ladder to the tower’s high top",
      "To be thrown from the ramparts down onto the rocks",
      "Swore I’d die for love, but God the aftershocks",
      "Slice a thousand cuts, bleeding never stops",
      "You’re broken but get up and walk!",
      "Get up and walk! Through the paradox!"
    ],
    sections: [
      { label: 'INTRO', time: 0 },
      { label: 'VERSE 1', time: 15 },
      { label: 'CHORUS', time: 42 },
      { label: 'VERSE 2', time: 78 },
      { label: 'CHORUS', time: 104 },
      { label: 'SOLO', time: 135 },
      { label: 'BRIDGE', time: 165 },
      { label: 'OUTRO', time: 205 }
    ],
    credits: 'Heavy dynamic guitars and live drum drive. Engineered by Dexter Vance at Old Chapel Studios.',
    description: 'Cathartic alternative rock anthem with crushing guitar crescendos and empowering melodic vocal hooks.'
  },
  {
    id: 'face-in-the-crowd',
    title: 'Face in the Crowd',
    album: 'Static Dreams at 3AM (2025 LP)',
    duration: 447, // 7:27
    bpm: 132,
    key: 'G major',
    year: '2025',
    audioSrc: 'audio/face-in-the-crowd.mp3',
    vocalist: 'Maya Lin (Female Lead Vocals)',
    lyricsSnippet: 'Playing strong when you\'re around, tell my friends I\'m much too proud to take you back again',
    fullLyrics: [
      "Seen you down there lately...",
      "Window shopping maybe?",
      "Wait for someone else to catch your eye",
      "People watching crazy",
      "Find a girl that maybe",
      "Love you half as much the way I do?",
      "",
      "Slowly my heart unwinds...",
      "",
      "[CHORUS]",
      "Keep within myself I found",
      "Cry myself to sleep out loud",
      "Must be better if you don't see me like this right now",
      "Playing strong when you're around",
      "Tell my friends I'm much too proud",
      "To take you back again",
      "And be another face in the crowd!",
      "",
      "Think about you daily",
      "And who you're with now maybe?",
      "Hate to think what you've been telling her",
      "Bet she thinks I'm crazy",
      "Facebook stalker maybe?",
      "Time to tweet the world I'm over you...",
      "But slowly my heart unwinds...",
      "",
      "[CHORUS]",
      "Keep within myself I found",
      "Cry myself to sleep out loud",
      "Must be better if you don't see me like this right now",
      "Playing strong when you're around",
      "Tell my friends I'm much too proud",
      "To take you back again",
      "And be another face in the crowd!"
    ],
    sections: [
      { label: 'INTRO', time: 0 },
      { label: 'VERSE 1', time: 22 },
      { label: 'PRE-CHORUS', time: 48 },
      { label: 'CHORUS', time: 64 },
      { label: 'VERSE 2', time: 108 },
      { label: 'CHORUS', time: 146 },
      { label: 'SOLO / JAM', time: 190 },
      { label: 'OUTRO', time: 280 }
    ],
    credits: '132-BPM driving pop-punk ballad with punchy rhythm section and emotive lead vocals.',
    description: 'Bittersweet and dynamic pop-punk anthem exploring modern teenage angst, pride, and unresolved heartbreak.'
  },
  {
    id: 'firefly',
    title: 'Firefly (Burn the Wire)',
    album: 'Disconnected Wire (2024 EP)',
    duration: 273, // 4:33
    bpm: 126,
    key: 'F# minor',
    year: '2024',
    audioSrc: 'audio/firefly.mp3',
    vocalist: 'Maya Lin (Female Lead Vocals)',
    lyricsSnippet: 'Mystified by this dark night, gotta rely on nocturnal sight as I ride a firefly',
    fullLyrics: [
      "We are so easily pacified",
      "Entertained, paralyzed by homicide",
      "Violence now on both sides, somehow justified",
      "They draw the lines, but I cannot be stratified",
      "",
      "[CHORUS]",
      "Mystified by this dark night",
      "Gotta rely on nocturnal sight",
      "Baby, I'm mystified by this dark night",
      "As I ride a firefly!",
      "",
      "Disparity intensified",
      "Amoral men banking on a great divide",
      "Impending earth change, it's still, it's still denied",
      "They lie, but I will not be satisfied!",
      "",
      "[CHORUS]",
      "Mystified by this dark night",
      "Gotta rely on nocturnal sight",
      "Baby, I'm mystified by this dark night",
      "As I ride a firefly!",
      "",
      "[BRIDGE]",
      "I'm astride a firefly",
      "Upon her back I watch us fall, I cry",
      "She and I, we shine a tiny speck of light",
      "With darkness we collide, we fight",
      "To push to find the other side!",
      "",
      "[OUTRO]",
      "This is our time!",
      "This is our time!",
      "We fight to find the other side!"
    ],
    sections: [
      { label: 'INTRO', time: 0 },
      { label: 'VERSE 1', time: 18 },
      { label: 'CHORUS', time: 45 },
      { label: 'VERSE 2', time: 76 },
      { label: 'CHORUS', time: 104 },
      { label: 'BRIDGE', time: 138 },
      { label: 'OUTRO JAM', time: 180 }
    ],
    credits: 'Recorded in Basement Studio Room 4. Live drums and gritty overdriven bass guitar.',
    description: 'Relentless riot-grrrl post-punk track with thundering bass groove and searing female lead vocals.'
  }
];

export interface AudioEngineState {
  isPlaying: boolean;
  currentTrack: Track;
  playbackTime: number;
  duration: number;
  bufferedTime: number;
  volume: number;
}

class RockAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private isPlaying: boolean = false;
  private currentTrack: Track = TRACKS[0];
  private playbackTime: number = 0;
  private duration: number = TRACKS[0].duration;
  private bufferedTime: number = 0;
  private volume: number = 0.85;
  private listeners: Set<() => void> = new Set();
  private isAudioInitialized: boolean = false;

  constructor() {
    // Lazy initialized on first user interaction in browser
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
          if (this.audio.buffered && this.audio.buffered.length > 0) {
            this.bufferedTime = this.audio.buffered.end(this.audio.buffered.length - 1);
          }
          this.notify();
        }
      });

      this.audio.addEventListener('progress', () => {
        if (this.audio && this.audio.buffered && this.audio.buffered.length > 0) {
          this.bufferedTime = this.audio.buffered.end(this.audio.buffered.length - 1);
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
        console.warn('Audio element notice:', e);
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
        // Continue gracefully if browser already connected
        console.warn('Web Audio source connection note:', nodeErr);
      }
    } catch (e) {
      console.warn('Web Audio Context note:', e);
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
      this.bufferedTime = 0;
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
            console.warn('Audio playback note:', err);
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
    const targetDuration = this.duration || this.currentTrack.duration;
    const clamped = Math.max(0, Math.min(seconds, targetDuration));
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

  public getState(): AudioEngineState {
    return {
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack,
      playbackTime: this.playbackTime,
      duration: this.duration || this.currentTrack.duration,
      bufferedTime: this.bufferedTime,
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
