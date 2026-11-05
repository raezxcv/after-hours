import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  FileText,
  ChevronUp,
  ChevronDown,
  X,
  Sliders,
  Sparkles
} from 'lucide-react';
import { audioEngine, TRACKS } from '../utils/audioEngine';

export const AudioPlayerDock: React.FC = () => {
  const [playerState, setPlayerState] = useState(audioEngine.getState());
  const [isMuted, setIsMuted] = useState(false);
  const [showLyricsModal, setShowLyricsModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showRemainingTime, setShowRemainingTime] = useState(false);
  const [dragTime, setDragTime] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrubberContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe(() => {
      setPlayerState({ ...audioEngine.getState() });
    });
    return () => unsubscribe();
  }, []);

  // Web Audio Visualizer Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dataArray = new Uint8Array(32);

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      audioEngine.getVisualizerData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = 3;
      let x = 0;

      for (let i = 0; i < 16; i++) {
        const val = dataArray[i];
        const barHeight = playerState.isPlaying
          ? Math.max(3, (val / 255) * canvas.height)
          : Math.sin(Date.now() / 400 + i * 0.5) * 2 + 3;

        if (i % 2 === 0) {
          ctx.fillStyle = '#e11d48'; // crimson
        } else {
          ctx.fillStyle = '#a1a1aa'; // dirty-white
        }

        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 2;
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [playerState.isPlaying]);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePlayToggle = () => {
    audioEngine.togglePlay();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    audioEngine.setVolume(val);
    if (val > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      audioEngine.setVolume(0.85);
      setIsMuted(false);
    } else {
      audioEngine.setVolume(0);
      setIsMuted(true);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setDragTime(null);
    audioEngine.seek(val);
  };

  const handleSeekInput = (e: React.FormEvent<HTMLInputElement>) => {
    const val = parseFloat((e.target as HTMLInputElement).value);
    setDragTime(val);
  };

  const displayTime = dragTime !== null ? dragTime : playerState.playbackTime;
  const currentTrack = playerState.currentTrack;
  const currentDuration = playerState.duration || currentTrack.duration;
  const progressPercent = currentDuration > 0
    ? Math.min(100, (displayTime / currentDuration) * 100)
    : 0;
  const bufferedPercent = currentDuration > 0
    ? Math.min(100, (playerState.bufferedTime / currentDuration) * 100)
    : 0;

  return (
    <>
      {/* Bottom Sticky Player Dock */}
      <aside
        data-dock="true"
        aria-label="AFTERHOURS Demo Audio Player"
        className="fixed bottom-0 left-0 right-0 z-50 bg-punk-black border-t-2 border-crimson shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Left: Track Information & Core Controls */}
            <div className="flex items-center gap-3 w-full md:w-auto min-w-0 justify-between md:justify-start">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => audioEngine.prevTrack()}
                  className="p-2 text-dirty-white hover:text-crimson bg-punk-zinc transition-colors border border-punk-border active:scale-95"
                  title="Previous Track"
                  aria-label="Previous Track"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={handlePlayToggle}
                  className="w-11 h-11 bg-crimson hover:bg-crimson-glow text-white flex-shrink-0 flex items-center justify-center border-2 border-white transition-all active:scale-95"
                  title={playerState.isPlaying ? 'Pause' : 'Play Track'}
                  aria-label={playerState.isPlaying ? 'Pause audio track' : 'Play audio track'}
                >
                  {playerState.isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current translate-x-0.5" />
                  )}
                </button>

                <button
                  onClick={() => audioEngine.nextTrack()}
                  className="p-2 text-dirty-white hover:text-crimson bg-punk-zinc transition-colors border border-punk-border active:scale-95"
                  title="Next Track"
                  aria-label="Next Track"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              <div className="min-w-0 pr-2">
                <h4 className="font-display text-lg sm:text-xl text-dirty-white truncate tracking-wide leading-tight">
                  {currentTrack.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-faded-light truncate">
                  <span className="truncate">{currentTrack.album}</span>
                  <span>&bull;</span>
                  <span className="truncate">{currentTrack.bpm} BPM</span>
                  <span>&bull;</span>
                  <span className="truncate">{currentTrack.key}</span>
                </div>
              </div>

              {/* Mobile Quick Lyrics */}
              <button
                onClick={() => setShowLyricsModal(true)}
                className="p-2 text-dirty-white bg-punk-zinc border border-punk-border hover:text-crimson md:hidden flex-shrink-0"
                title="View Lyrics Sheet"
                aria-label="View Lyrics"
              >
                <FileText className="w-4 h-4 text-crimson" />
              </button>
            </div>

            {/* Center: Simple Clean Progress Bar */}
            <div className="w-full md:flex-1 max-w-xl flex items-center gap-3">
              <span className="font-mono text-xs text-dirty-white w-10 text-right font-medium tabular-nums select-none">
                {formatTime(displayTime)}
              </span>

              {/* Scrubber Rail */}
              <div
                ref={scrubberContainerRef}
                className="relative flex-1 h-6 flex items-center cursor-pointer group select-none"
                title="Click or drag to seek"
              >
                {/* Track background */}
                <div className="relative w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  {/* Buffered Progress */}
                  <div
                    style={{ width: `${bufferedPercent}%` }}
                    className="absolute top-0 bottom-0 left-0 bg-zinc-700/50"
                  />
                  {/* Active Crimson Playback Fill */}
                  <div
                    style={{ width: `${progressPercent}%` }}
                    className="absolute top-0 bottom-0 left-0 bg-crimson"
                  />
                </div>

                {/* Simple Thumb Indicator */}
                <div
                  style={{ left: `${progressPercent}%` }}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow pointer-events-none transition-transform group-hover:scale-125"
                />

                {/* Range Input for accessibility & dragging */}
                <input
                  type="range"
                  min="0"
                  max={currentDuration > 0 ? currentDuration : 100}
                  step="0.1"
                  value={displayTime || 0}
                  onInput={handleSeekInput}
                  onChange={handleSeekChange}
                  onMouseUp={() => setDragTime(null)}
                  onTouchEnd={() => setDragTime(null)}
                  aria-label="Track Progress Scrubber"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>

              {/* Duration / Remaining Toggle */}
              <button
                onClick={() => setShowRemainingTime(!showRemainingTime)}
                className="font-mono text-xs text-dirty-white w-12 text-left font-medium tabular-nums hover:text-crimson transition-colors select-none"
                title="Toggle remaining / total duration"
                aria-label="Toggle duration format"
              >
                {showRemainingTime
                  ? `-${formatTime(Math.max(0, currentDuration - displayTime))}`
                  : formatTime(currentDuration)}
              </button>
            </div>

            {/* Right: Visualizer, Volume & Drawer Trigger */}
            <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
              {/* Visualizer Canvas */}
              <div className="flex flex-col items-center">
                <canvas
                  ref={canvasRef}
                  width={80}
                  height={20}
                  className="bg-punk-zinc border border-punk-border"
                  title="Live Web Audio Analyser"
                />
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleMute}
                  className="text-faded-light hover:text-dirty-white"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || playerState.volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-crimson" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-dirty-white" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : playerState.volume}
                  onChange={handleVolumeChange}
                  aria-label="Master Volume"
                  className="w-16 h-1.5 bg-punk-zinc appearance-none cursor-pointer accent-crimson border border-punk-border"
                />
              </div>

              {/* Lyrics Button */}
              <button
                onClick={() => setShowLyricsModal(true)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-bold text-dirty-white bg-punk-zinc border border-punk-border hover:border-crimson hover:text-crimson transition-colors"
                title="View Handwritten Lyrics Sheet"
              >
                <FileText className="w-3.5 h-3.5 text-crimson" />
                <span>LYRICS</span>
              </button>

              {/* Expand Drawer Button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-faded-light hover:text-white bg-punk-zinc border border-punk-border transition-colors"
                aria-label={isExpanded ? 'Collapse player' : 'Expand player'}
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Drawer */}
        {isExpanded && (
          <div className="bg-punk-zinc px-4 sm:px-6 py-5 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-punk-border">
            <div>
              <h5 className="text-xs font-mono text-crimson font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sliders className="w-4 h-4" /> 5 DEMO TRACKS
              </h5>
              <div className="space-y-1.5">
                {TRACKS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => audioEngine.selectTrack(t)}
                    className={`w-full text-left p-2.5 text-xs font-mono flex items-center justify-between border transition-colors ${
                      t.id === currentTrack.id
                        ? 'bg-crimson text-white font-bold border-white'
                        : 'bg-punk-black text-dirty-white border-punk-border hover:border-dirty-white'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <span className="font-bold">{t.title}</span>
                      <span className="text-[10px] text-faded-light block">{t.bpm} BPM &bull; {t.key}</span>
                    </div>
                    <span className="text-[11px] font-bold flex-shrink-0">{formatTime(t.duration)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-xs font-mono text-dirty-white uppercase tracking-wider mb-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> PRODUCTION LOG
              </h5>
              <p className="text-xs text-faded-light leading-relaxed mb-3">
                {currentTrack.description}
              </p>
              <div className="p-3 bg-punk-black border border-punk-border text-xs text-faded-light space-y-1 font-mono">
                <p><span className="text-dirty-white">CREDITS:</span> {currentTrack.credits}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-xs font-mono text-dirty-white uppercase tracking-wider">
                  LYRICS SNIPPET
                </h5>
                <button
                  onClick={() => setShowLyricsModal(true)}
                  className="text-xs font-mono text-crimson hover:underline font-bold"
                >
                  FULL SHEET &rarr;
                </button>
              </div>
              <div className="p-3 bg-punk-black border border-punk-border text-xs text-dirty-white italic leading-relaxed font-mono">
                &ldquo;{currentTrack.lyricsSnippet}&rdquo;
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Handwritten Lyrics Sheet Modal */}
      {showLyricsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-paper-cream text-punk-black p-6 sm:p-8 border-4 border-punk-black shadow-2xl tape-top-left">
            <button
              onClick={() => setShowLyricsModal(false)}
              className="absolute top-4 right-4 p-2 bg-punk-black text-dirty-white hover:bg-crimson transition-colors"
              aria-label="Close Lyrics Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-3 mb-4 border-b-2 border-punk-black">
              <span className="text-xs uppercase font-bold tracking-widest text-crimson block font-mono">
                AUTHENTIC REHEARSAL LYRICS &bull; AFTERHOURS
              </span>
              <h3 className="font-display text-3xl sm:text-4xl tracking-tight uppercase text-punk-black mt-1">
                {currentTrack.title}
              </h3>
              <div className="font-mono text-xs text-punk-black/80 flex flex-wrap gap-2 mt-1">
                <span className="font-bold text-crimson">{currentTrack.album}</span>
                <span>&bull;</span>
                <span>{currentTrack.bpm} BPM</span>
                <span>&bull;</span>
                <span>KEY: {currentTrack.key}</span>
              </div>
            </div>

            <div className="text-sm sm:text-base leading-relaxed max-h-96 overflow-y-auto pr-2 space-y-2.5 font-mono text-punk-black font-semibold">
              {currentTrack.fullLyrics.map((line, idx) => (
                <p
                  key={idx}
                  className={
                    line.startsWith('[')
                      ? 'text-crimson font-bold text-sm tracking-wider mt-4 border-b border-punk-black/20 pb-0.5'
                      : line === ''
                      ? 'h-2'
                      : 'text-punk-black/90'
                  }
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-6 pt-3 border-t-2 border-punk-black flex items-center justify-between font-mono text-xs text-punk-black/80">
              <span>* Matches real vocal audio recording</span>
              <button
                onClick={() => setShowLyricsModal(false)}
                className="font-bold uppercase text-crimson hover:underline"
              >
                Close Sheet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
