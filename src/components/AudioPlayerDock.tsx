import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  FileText,
  ChevronDown,
  ChevronUp,
  Sliders,
  X
} from 'lucide-react';
import { audioEngine, TRACKS } from '../utils/audioEngine';

export const AudioPlayerDock: React.FC = () => {
  const [playerState, setPlayerState] = useState(audioEngine.getState());
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLyricsModal, setShowLyricsModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe(() => {
      setPlayerState({ ...audioEngine.getState() });
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dataArray = new Uint8Array(32);

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      audioEngine.getVisualizerData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / 24) - 2;
      let x = 0;

      for (let i = 0; i < 24; i++) {
        const val = playerState.isPlaying
          ? (dataArray[i] > 10 ? dataArray[i] / 255 : (Math.sin(Date.now() / 80 + i) * 0.4 + 0.5) * 0.7)
          : 0.05;

        const barHeight = Math.max(3, val * canvas.height);

        if (val > 0.75) {
          ctx.fillStyle = '#e01e2b';
        } else if (val > 0.4) {
          ctx.fillStyle = '#ede8df';
        } else {
          ctx.fillStyle = '#6b7280';
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
      audioEngine.setVolume(0.8);
      setIsMuted(false);
    } else {
      audioEngine.setVolume(0);
      setIsMuted(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    audioEngine.seek(val);
  };

  const currentTrack = playerState.currentTrack;

  return (
    <>
      {/* Bottom Compact Sticky Player */}
      <aside
        data-dock="true"
        aria-label="AFTERHOURS Demo Audio Player"
        className="fixed bottom-0 left-0 right-0 z-30 bg-punk-black border-t-2 border-crimson"
      >
        {/* Main Player Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-3">
          {/* Left: Track Information & Quick Play */}
          <div className="flex items-center gap-3 min-w-0 flex-1 md:flex-initial md:w-1/3">
            <button
              onClick={() => audioEngine.prevTrack()}
              className="p-1 text-dirty-white hover:text-white hidden sm:block"
              title="Previous Track"
              aria-label="Previous Track"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={handlePlayToggle}
              className="w-10 h-10 bg-crimson hover:bg-crimson-glow text-white flex-shrink-0 flex items-center justify-center border border-white"
              aria-label={playerState.isPlaying ? 'Pause audio demo' : 'Play audio demo'}
            >
              {playerState.isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current translate-x-0.5" />
              )}
            </button>

            <button
              onClick={() => audioEngine.nextTrack()}
              className="p-1 text-dirty-white hover:text-white hidden sm:block"
              title="Next Track"
              aria-label="Next Track"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-display text-lg sm:text-xl text-dirty-white truncate tracking-wide leading-tight">
                  {currentTrack.title}
                </h4>
                <span className="text-sm text-crimson font-bold hidden sm:inline-block">
                  {currentTrack.bpm} BPM
                </span>
              </div>
              <p className="text-sm text-faded-light truncate">
                {currentTrack.album}
              </p>
            </div>
          </div>

          {/* Center: Desktop Scrubber Controls */}
          <div className="hidden md:flex flex-col items-center gap-1 w-5/12">
            <div className="w-full flex items-center gap-3">
              <span className="text-sm text-faded-light w-10 text-right">
                {formatTime(playerState.playbackTime)}
              </span>

              <div className="relative flex-1 flex items-center">
                <input
                  type="range"
                  min="0"
                  max={currentTrack.duration}
                  step="0.5"
                  value={playerState.playbackTime}
                  onChange={handleSeek}
                  aria-label="Track Progress Bar"
                  className="w-full h-1.5 bg-punk-zinc appearance-none cursor-pointer accent-crimson rounded-none"
                />
              </div>

              <span className="text-sm text-faded-light w-10 text-left">
                {formatTime(currentTrack.duration)}
              </span>
            </div>
          </div>

          {/* Right: Actions, Volume & Expand */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Real-time Web Audio Visualizer */}
            <div className="hidden sm:flex flex-col items-center">
              <canvas
                ref={canvasRef}
                width={80}
                height={20}
                className="bg-punk-zinc"
                title="Real-time Web Audio Frequency Monitor"
              />
            </div>

            {/* Volume Control */}
            <div className="hidden lg:flex items-center gap-1.5">
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
                className="w-16 h-1.5 bg-punk-zinc appearance-none cursor-pointer accent-crimson"
              />
            </div>

            {/* Lyrics Button */}
            <button
              onClick={() => setShowLyricsModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 text-sm text-dirty-white bg-punk-zinc hover:text-crimson"
              title="View Handwritten Lyrics Sheet"
            >
              <FileText className="w-3.5 h-3.5 text-crimson" />
              <span>LYRICS</span>
            </button>

            {/* Expand Drawer Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 text-faded-light hover:text-white"
              aria-label={isExpanded ? 'Collapse player' : 'Expand player'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expanded Drawer */}
        {isExpanded && (
          <div className="bg-punk-zinc px-4 sm:px-6 py-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-punk-border">
            <div>
              <h5 className="text-sm text-crimson font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sliders className="w-4 h-4" /> 4-TRACK DEMO TAPES
              </h5>
              <div className="space-y-1.5">
                {TRACKS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => audioEngine.selectTrack(t)}
                    className={`w-full text-left p-2 text-xs flex items-center justify-between ${
                      t.id === currentTrack.id
                        ? 'bg-crimson text-white font-bold'
                        : 'bg-punk-black text-dirty-white hover:bg-punk-card'
                    }`}
                  >
                    <span className="truncate">{t.title}</span>
                    <span className="text-xs text-faded-light ml-2">{formatTime(t.duration)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-sm text-dirty-white uppercase tracking-wider mb-2">
                PRODUCTION LOG
              </h5>
              <p className="text-xs text-faded-light leading-relaxed mb-2">
                {currentTrack.description}
              </p>
              <div className="p-2 bg-punk-black text-xs text-faded-light">
                <p className="text-dirty-white font-bold">MASTER CREDITS:</p>
                <p>{currentTrack.credits}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm text-dirty-white uppercase tracking-wider">
                  LYRICS SNIPPET
                </h5>
                <button
                  onClick={() => setShowLyricsModal(true)}
                  className="text-xs text-crimson hover:underline"
                >
                  FULL SHEET &rarr;
                </button>
              </div>
              <div className="p-2.5 bg-punk-black text-xs text-dirty-white italic leading-relaxed">
                &ldquo;{currentTrack.lyricsSnippet}&rdquo;
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Handwritten Lyrics Sheet Modal */}
      {showLyricsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
          <div className="relative w-full max-w-lg bg-paper-cream text-punk-black p-6 sm:p-8">
            <button
              onClick={() => setShowLyricsModal(false)}
              className="absolute top-4 right-4 p-2 bg-punk-black text-dirty-white hover:bg-crimson"
              aria-label="Close Lyrics Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-3 mb-4 border-b-2 border-punk-black">
              <span className="text-xs uppercase font-bold tracking-widest text-crimson block">
                ORIGINAL STUDIO LYRICS SHEET &bull; AFTERHOURS
              </span>
              <h3 className="font-display text-3xl tracking-tight uppercase text-punk-black">
                {currentTrack.title}
              </h3>
              <p className="text-xs text-punk-black/70">
                Key: {currentTrack.key} &bull; Tempo: {currentTrack.bpm} BPM &bull; Written: {currentTrack.year}
              </p>
            </div>

            <div className="text-sm leading-relaxed max-h-96 overflow-y-auto pr-2 space-y-2 whitespace-pre-line text-punk-black font-semibold">
              {currentTrack.fullLyrics?.map((line, idx) => (
                <p
                  key={idx}
                  className={line.startsWith('[') ? 'text-crimson font-bold text-base mt-3' : ''}
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-6 pt-3 border-t-2 border-punk-black flex items-center justify-between text-xs text-punk-black/80">
              <span>* Scribed by Maya Lin during rehearsals</span>
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
