import React, { useState } from 'react';
import { DISCOGRAPHY, Release } from '../data/bandData';
import { audioEngine, TRACKS, Track } from '../utils/audioEngine';
import { Play, Pause, Radio, AlertCircle, Sliders } from 'lucide-react';
import { handleImageError } from '../utils/imageHelper';

export const MusicPage: React.FC = () => {
  const [selectedRelease, setSelectedRelease] = useState<Release>(DISCOGRAPHY[0]);
  const [activeLyricsTrack, setActiveLyricsTrack] = useState<Track | null>(TRACKS[0]);
  const [audioState, setAudioState] = useState(audioEngine.getState());

  // Listen for audio engine state changes
  React.useEffect(() => {
    const unsub = audioEngine.subscribe(() => {
      setAudioState({ ...audioEngine.getState() });
    });
    return () => unsub();
  }, []);

  const handlePlayTrack = (trackId?: string) => {
    if (!trackId) return;
    const foundTrack = TRACKS.find((t) => t.id === trackId);
    if (foundTrack) {
      if (audioState.isPlaying && audioState.currentTrack.id === trackId) {
        audioEngine.pause();
      } else {
        audioEngine.play(foundTrack);
        setActiveLyricsTrack(foundTrack);
      }
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32 pt-6 sm:pt-12">
      {/* 1. Header & Catalog Specs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="music-title">
        <div className="border-b-2 border-punk-border pb-6 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
            <span className="bg-crimson text-white font-mono text-xs font-bold uppercase tracking-widest px-2.5 py-1">
              OFFICIAL DISCOGRAPHY &bull; RECORDINGS
            </span>
            <span className="font-mono text-xs text-amber-400 bg-amber-950/60 border border-amber-600/40 px-2 py-0.5">
              ALL DEMOS SYNTHESIZED IN REAL-TIME VIA WEB AUDIO API
            </span>
          </div>

          <h1
            id="music-title"
            className="font-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-dirty-white uppercase"
          >
            DISCOGRAPHY &amp; DEMOS
          </h1>
          <p className="font-mono text-base text-dirty-white/90 max-w-2xl mt-2">
            Original recordings cut live to 2-inch tape and TASCAM 4-track cassette recorders.
          </p>
        </div>

        {/* Notice on Fictional Portfolio Demos */}
        <div className="mb-12 p-4 bg-punk-zinc border-l-4 border-crimson font-mono text-xs text-dirty-white/90 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-crimson flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-crimson uppercase block">PORTFOLIO NOTICE &amp; AUDIO ENGINE:</strong>
            <span>
              AFTERHOURS is a fictional band concept. All track titles, lyrics, and recording liner notes are 100% original. The demo player uses our proprietary procedural Web Audio API rock sound synthesizer to recreate distorted guitars, basslines, and punchy drum fills live in your browser.
            </span>
          </div>
        </div>

        {/* Release Selector Tabs: LP vs EP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {DISCOGRAPHY.map((release) => {
            const isSelected = selectedRelease.id === release.id;
            return (
              <button
                key={release.id}
                onClick={() => setSelectedRelease(release)}
                className={`p-5 text-left border-2 transition-all ${
                  isSelected
                    ? 'border-crimson bg-crimson/15 text-white shadow-harsh'
                    : 'border-punk-border bg-punk-zinc text-dirty-white/80 hover:border-dirty-white'
                }`}
              >
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-mono text-xs text-crimson font-bold uppercase tracking-widest">
                    {release.type} &bull; {release.year}
                  </span>
                  <span className="font-mono text-xs text-faded-light">{release.catalogNumber}</span>
                </div>
                <h3 className="font-display text-3xl uppercase tracking-tight text-dirty-white">
                  {release.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Selected Release Showcase Card */}
        <div className="bg-punk-zinc border-2 border-punk-border p-6 sm:p-10 shadow-2xl tape-top-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Sleeve Art & Physical Specs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border-2 border-punk-border bg-punk-black overflow-hidden shadow-2xl relative">
                <img
                  src={selectedRelease.coverImage}
                  alt={`${selectedRelease.title} Cover Artwork`}
                  onError={handleImageError}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-3 bg-punk-black border-t border-punk-border flex justify-between items-center font-mono text-xs">
                  <span className="text-dirty-white font-bold">{selectedRelease.catalogNumber}</span>
                  <span className="text-crimson font-bold">{selectedRelease.type} EDITION</span>
                </div>
              </div>

              {/* Physical Formats Stock List */}
              <div className="p-4 bg-punk-black border border-punk-border space-y-3 font-mono text-xs">
                <span className="font-bold text-dirty-white uppercase tracking-wider block border-b border-punk-border pb-2">
                  PHYSICAL MEDIA EDITIONS:
                </span>
                {selectedRelease.formats.map((fmt, idx) => (
                  <div key={idx} className="flex justify-between items-center text-dirty-white/90">
                    <span className="truncate pr-2">{fmt.format}</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-bold text-dirty-white">{fmt.price}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 border ${
                          fmt.status === 'Sold Out'
                            ? 'text-faded-gray border-punk-border'
                            : fmt.status === 'Low Stock'
                            ? 'text-amber-400 border-amber-500/40'
                            : 'text-emerald-400 border-emerald-500/40'
                        }`}
                      >
                        {fmt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Album Overview & Full Tracklist */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-mono text-xs uppercase font-bold text-crimson block mb-1">
                  RECORDING CATALOG SPECIFICATIONS
                </span>
                <h2 className="font-display text-4xl sm:text-5xl text-dirty-white uppercase tracking-tight">
                  {selectedRelease.title}
                </h2>
                <p className="font-mono text-xs text-faded-light mt-1">
                  {selectedRelease.year} &bull; {selectedRelease.tracks.length} TRACKS &bull; SUBTERRANEAN TAPES
                </p>
              </div>

              <p className="font-body text-sm sm:text-base text-dirty-white/90 leading-relaxed">
                {selectedRelease.description}
              </p>

              {/* Master Credits */}
              <div className="p-3 bg-punk-black border border-punk-border text-xs font-mono text-faded-light space-y-1">
                <p><strong className="text-dirty-white">RECORDED:</strong> {selectedRelease.credits.recorded}</p>
                <p><strong className="text-dirty-white">MIXED:</strong> {selectedRelease.credits.mixed}</p>
                <p><strong className="text-dirty-white">MASTERING:</strong> {selectedRelease.credits.mastered}</p>
              </div>

              {/* Full Track Listing */}
              <div className="space-y-2 pt-2">
                <span className="font-mono text-xs uppercase font-bold text-crimson block mb-2">
                  COMPLETE TRACK LISTING ({selectedRelease.tracks.length} TRACKS):
                </span>

                {selectedRelease.tracks.map((track) => {
                  const isTrackActive =
                    audioState.isPlaying &&
                    audioState.currentTrack.id === track.audioTrackId;

                  return (
                    <div
                      key={track.number}
                      className={`p-3 border flex items-center justify-between transition-colors ${
                        isTrackActive
                          ? 'bg-crimson/20 border-crimson'
                          : 'bg-punk-black border-punk-border hover:border-dirty-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <span className="font-mono text-xs font-bold text-crimson w-6">
                          {track.number < 10 ? `0${track.number}` : track.number}
                        </span>
                        <div className="truncate">
                          <h4 className="font-display text-lg text-dirty-white tracking-wide truncate">
                            {track.title}
                          </h4>
                          <p className="font-mono text-[11px] text-faded-light italic truncate">
                            &ldquo;{track.lyricsSnippet}&rdquo;
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="font-mono text-xs text-faded-gray">{track.duration}</span>

                        {track.hasDemoAudio ? (
                          <button
                            onClick={() => handlePlayTrack(track.audioTrackId)}
                            className={`px-3 py-1 text-xs font-mono flex items-center gap-1.5 border font-bold ${
                              isTrackActive
                                ? 'bg-crimson text-white border-white animate-pulse'
                                : 'bg-punk-zinc text-dirty-white border-punk-border hover:border-crimson hover:text-crimson'
                            }`}
                            title={`Play demo of ${track.title}`}
                            aria-label={isTrackActive ? `Pause ${track.title}` : `Play ${track.title}`}
                          >
                            {isTrackActive ? (
                              <>
                                <Pause className="w-3 h-3 fill-current" />
                                <span>PLAYING</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3 fill-current" />
                                <span>DEMO</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <span className="font-mono text-[10px] text-faded-gray border border-punk-border px-2 py-0.5">
                            VINYL ONLY
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEMO SOUND LAB & HANDWRITTEN LYRICS CONSOLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="sound-lab-heading">
        <div className="bg-punk-black-pure border-2 border-punk-border p-6 sm:p-12 tape-top-right shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-punk-border pb-4 mb-8 gap-4">
            <div>
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-crimson flex items-center gap-1.5">
                <Sliders className="w-4 h-4" /> REHEARSAL SOUND LAB &amp; LYRIC ARCHIVE
              </span>
              <h2
                id="sound-lab-heading"
                className="font-display text-4xl sm:text-5xl text-dirty-white tracking-tight uppercase"
              >
                THE 4-TRACK DEMO TAPES
              </h2>
            </div>
            <p className="font-mono text-xs text-faded-light max-w-sm">
              Select any synthesized demo to load full handwritten rehearsal lyrics and production notes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Interactive Demo Selector */}
            <div className="lg:col-span-5 space-y-3">
              <span className="font-mono text-xs uppercase font-bold text-faded-light block">
                CHOOSE DEMO STEM TRACK:
              </span>
              {TRACKS.map((t) => {
                const isCurrent = activeLyricsTrack?.id === t.id;
                const isPlaying = audioState.isPlaying && audioState.currentTrack.id === t.id;

                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveLyricsTrack(t);
                      audioEngine.play(t);
                    }}
                    className={`w-full text-left p-4 border-2 transition-all ${
                      isCurrent
                        ? 'border-crimson bg-crimson/15 shadow-harsh'
                        : 'border-punk-border bg-punk-zinc hover:border-dirty-white'
                    }`}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-mono text-[10px] text-crimson font-bold uppercase">
                        {t.bpm} BPM &bull; KEY: {t.key}
                      </span>
                      <span className="font-mono text-xs text-faded-light">
                        {Math.floor(t.duration / 60)}:{t.duration % 60 < 10 ? '0' : ''}{t.duration % 60}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-2xl uppercase tracking-tight text-dirty-white">
                        {t.title}
                      </h4>
                      {isPlaying ? (
                        <Radio className="w-5 h-5 text-crimson animate-pulse" />
                      ) : (
                        <Play className="w-4 h-4 text-faded-light" />
                      )}
                    </div>

                    <p className="font-mono text-xs text-faded-light mt-1 truncate">
                      {t.album}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right: Handwritten Lyric Sheet Viewer */}
            <div className="lg:col-span-7">
              {activeLyricsTrack && (
                <div className="bg-paper-cream text-punk-black border-2 border-punk-black p-6 sm:p-8 shadow-harsh relative tape-top-left">
                  <div className="border-b-2 border-punk-black pb-3 mb-4 flex justify-between items-start">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-crimson uppercase tracking-widest block">
                        ORIGINAL REHEARSAL LYRIC SHEET
                      </span>
                      <h3 className="font-display text-3xl sm:text-4xl uppercase tracking-tight">
                        {activeLyricsTrack.title}
                      </h3>
                      <p className="font-mono text-xs text-punk-black/70">
                        Tempo: {activeLyricsTrack.bpm} BPM &bull; Key: {activeLyricsTrack.key} &bull; 4-Track Demo
                      </p>
                    </div>

                    <button
                      onClick={() => audioEngine.togglePlay(activeLyricsTrack)}
                      className="btn-punk text-xs py-1.5 px-3 flex items-center gap-1.5"
                    >
                      {audioState.isPlaying && audioState.currentTrack.id === activeLyricsTrack.id ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>PAUSE</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>PLAY DEMO</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Synchronized Rehearsal Tape Scrubber */}
                  <div className="bg-punk-black text-dirty-white p-3 mb-4 border border-punk-black font-mono text-xs">
                    <div className="flex justify-between items-center mb-1 text-[11px]">
                      <span className="text-crimson font-bold uppercase flex items-center gap-1">
                        <Radio className={`w-3 h-3 ${audioState.isPlaying && audioState.currentTrack.id === activeLyricsTrack.id ? 'animate-pulse text-crimson' : 'text-zinc-500'}`} />
                        {audioState.isPlaying && audioState.currentTrack.id === activeLyricsTrack.id ? 'TAPE ACTIVE' : 'TAPE READY'}
                      </span>
                      <span className="text-dirty-white/90">
                        {audioState.currentTrack.id === activeLyricsTrack.id
                          ? `${Math.floor(audioState.playbackTime / 60)}:${Math.floor(audioState.playbackTime % 60) < 10 ? '0' : ''}${Math.floor(audioState.playbackTime % 60)} / ${Math.floor(activeLyricsTrack.duration / 60)}:${activeLyricsTrack.duration % 60 < 10 ? '0' : ''}${activeLyricsTrack.duration % 60}`
                          : `0:00 / ${Math.floor(activeLyricsTrack.duration / 60)}:${activeLyricsTrack.duration % 60 < 10 ? '0' : ''}${activeLyricsTrack.duration % 60}`}
                      </span>
                    </div>
                    <div
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                        if (audioState.currentTrack.id !== activeLyricsTrack.id) {
                          audioEngine.play(activeLyricsTrack);
                        }
                        audioEngine.seek(pct * activeLyricsTrack.duration);
                      }}
                      className="relative w-full h-3 bg-zinc-900 border border-zinc-700 cursor-pointer overflow-hidden shadow-inner"
                      title="Click anywhere to scrub playback"
                    >
                      <div
                        style={{
                          width: `${
                            audioState.currentTrack.id === activeLyricsTrack.id
                              ? Math.min(100, (audioState.playbackTime / activeLyricsTrack.duration) * 100)
                              : 0
                          }%`
                        }}
                        className="h-full bg-crimson transition-all duration-75 shadow-[0_0_8px_rgba(225,29,72,0.8)]"
                      />
                    </div>
                  </div>

                  {/* Lyrics text */}
                  <div className="font-mono text-xs sm:text-sm leading-relaxed max-h-80 overflow-y-auto pr-2 space-y-2 whitespace-pre-line text-punk-black font-semibold">
                    {activeLyricsTrack.fullLyrics?.map((line, idx) => (
                      <p
                        key={idx}
                        className={line.startsWith('[') ? 'text-crimson font-bold text-sm mt-3' : ''}
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* Tape Engineering Footnote */}
                  <div className="mt-4 pt-3 border-t border-dashed border-punk-black/40 font-mono text-[11px] text-punk-black/80">
                    <p><strong>ENGINEERING LOG:</strong> {activeLyricsTrack.credits}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
