import React, { useState, useEffect } from 'react';
import { Play, Pause, Calendar, ArrowRight, MapPin } from 'lucide-react';
import { DISCOGRAPHY, TOUR_DATES, GALLERY_ITEMS, GalleryItem } from '../data/bandData';
import { audioEngine, TRACKS } from '../utils/audioEngine';
import { handleImageError } from '../utils/imageHelper';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenLightbox: (item: GalleryItem) => void;
  onOpenTicketModal: (gigId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenLightbox,
  onOpenTicketModal
}) => {
  const latestRelease = DISCOGRAPHY[0];
  const featuredGig = TOUR_DATES[0];
  const previewGallery = GALLERY_ITEMS.slice(0, 4);
  const [audioState, setAudioState] = useState(audioEngine.getState());

  useEffect(() => {
    const unsub = audioEngine.subscribe(() => {
      setAudioState({ ...audioEngine.getState() });
    });
    return () => unsub();
  }, []);

  const leadSingleTrack = TRACKS.find((t) => t.id === 'so-sweet') || TRACKS[0];

  const handlePlayLeadSingle = () => {
    audioEngine.togglePlay(leadSingleTrack);
  };

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-16" aria-labelledby="hero-title">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Hero Headline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
            <div className="lg:col-span-8">
              <h1
                id="hero-title"
                className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-tighter leading-none text-dirty-white uppercase"
              >
                AFTER<span className="text-crimson">HOURS</span>
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-dirty-white max-w-2xl leading-relaxed font-bold">
                Independent alternative rock band from Leeds, UK.
                Overdriven guitar amplifiers, torn gig setlists, and zero backing tracks.
              </p>
            </div>

            {/* Quick Hero Call-to-Actions */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:pt-6">
              <button
                onClick={handlePlayLeadSingle}
                className="btn-punk flex items-center justify-center gap-2"
                title="Play Lead Single: So Sweet (Runaway)"
              >
                {audioState.isPlaying && audioState.currentTrack.id === leadSingleTrack.id ? (
                  <>
                    <Pause className="w-5 h-5 fill-current" />
                    PAUSE LEAD SINGLE
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    PLAY LEAD SINGLE (DEMO)
                  </>
                )}
              </button>
              <button
                onClick={() => onNavigate('shows')}
                className="btn-punk-outline flex items-center justify-center gap-2"
              >
                AUTUMN 2025 TOUR DATES
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero Photographic Banner: Full Band Backstage Corridor */}
          <div className="relative group overflow-hidden bg-punk-zinc">
            <div className="aspect-[16/9] w-full bg-punk-black overflow-hidden relative">
              <img
                src="images/band-hero.jpg"
                alt="AFTERHOURS band members Maya Lin, Kieran Cruz, Dexter Vance, and Samira Patel backstage"
                onError={handleImageError}
                className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
              />

              <div className="absolute top-4 left-4 bg-punk-black p-4 text-base text-dirty-white max-w-sm hidden sm:block">
                <span className="text-crimson font-bold block mb-0.5">LINEUP:</span>
                <p className="text-base leading-tight text-dirty-white">
                  Maya Lin, Kieran Cruz, Dexter Vance, Samira Patel
                </p>
              </div>

              <div className="absolute bottom-4 right-4 bg-crimson text-white text-base font-bold px-4 py-2 uppercase tracking-wider">
                35MM DIRECT FLASH &bull; LIVE CORRIDOR
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LATEST RELEASE SPOTLIGHT: "STATIC DREAMS AT 3AM" */}
      <section className="bg-punk-zinc py-16 sm:py-24" aria-labelledby="latest-release-title">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 gap-4">
            <div>
              <h2
                id="latest-release-title"
                className="font-display text-4xl sm:text-6xl text-dirty-white tracking-tight uppercase"
              >
                STATIC DREAMS AT 3AM
              </h2>
            </div>
            <div className="text-base text-dirty-white font-bold">
              DEBUT 12&quot; LP &bull; RELEASED 2025 &bull; 10 TRACKS
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Album Cover */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 bg-punk-black overflow-hidden">
                <img
                  src={latestRelease.coverImage}
                  alt="Album Cover for Static Dreams at 3AM"
                  onError={handleImageError}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4 bg-punk-black flex justify-between items-center text-base">
                  <span className="text-dirty-white font-bold">180G BLOOD-RED VINYL</span>
                  <span className="text-crimson font-bold">LOW STOCK</span>
                </div>
              </div>
            </div>

            {/* Right: Album Details & Tracklist Sampler */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-base text-dirty-white leading-relaxed">
                {latestRelease.description}
              </p>

              {/* Featured Track Sampler List without index numbers */}
              <div className="space-y-3 py-4">
                <span className="text-base uppercase font-bold text-white block mb-2">
                  SELECTED TRACK SAMPLER (CLICK TO PLAY DEMO):
                </span>
                {latestRelease.tracks.slice(0, 4).map((trk) => {
                  const isTrackActive = audioState.isPlaying && audioState.currentTrack.id === trk.audioTrackId;
                  return (
                    <div
                      key={trk.number}
                      className={`flex items-center justify-between p-4 transition-colors group border ${
                        isTrackActive ? 'bg-crimson/20 border-crimson' : 'bg-punk-black border-punk-border hover:bg-punk-card'
                      }`}
                    >
                      <div className="min-w-0 pr-4">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display text-xl text-dirty-white group-hover:text-crimson transition-colors">
                            {trk.title}
                          </h4>
                          {isTrackActive && (
                            <span className="text-[10px] font-mono font-bold bg-crimson text-white px-1.5 py-0.5 tracking-wider animate-pulse">
                              PLAYING
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-dirty-white/80 italic truncate max-w-xs sm:max-w-md">
                          &ldquo;{trk.lyricsSnippet}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-base text-dirty-white">{trk.duration}</span>
                        {trk.hasDemoAudio && (
                          <button
                            onClick={() => {
                              const trackObj = TRACKS.find((t) => t.id === trk.audioTrackId);
                              if (trackObj) audioEngine.togglePlay(trackObj);
                            }}
                            className={`p-2.5 text-white transition-all ${
                              isTrackActive
                                ? 'bg-crimson border-2 border-white scale-105 shadow-[0_0_10px_rgba(225,29,72,0.8)]'
                                : 'bg-crimson hover:bg-crimson-glow'
                            }`}
                            title={isTrackActive ? `Pause ${trk.title}` : `Play ${trk.title}`}
                            aria-label={isTrackActive ? `Pause ${trk.title}` : `Play ${trk.title}`}
                          >
                            {isTrackActive ? (
                              <Pause className="w-5 h-5 fill-current" />
                            ) : (
                              <Play className="w-5 h-5 fill-current" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => onNavigate('music')}
                  className="btn-punk"
                >
                  VIEW FULL DISCOGRAPHY &amp; LYRICS
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="btn-punk-outline"
                >
                  ORDER PHYSICAL MERCH &amp; VINYL
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED GIG: Leeds Brudenell Club */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 my-16 relative z-10" aria-labelledby="featured-gig-title">
        <div className="bg-punk-zinc p-6 sm:p-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <h3
                id="featured-gig-title"
                className="font-display text-3xl sm:text-5xl text-dirty-white tracking-tight uppercase"
              >
                LEEDS BRUDENELL CLUB
              </h3>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-base text-dirty-white">
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <Calendar className="w-4 h-4 text-crimson" /> {featuredGig.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-crimson" /> DOORS {featuredGig.doors}
                </span>
                <span className="text-dirty-white/80">
                  SUPPORT: {featuredGig.support}
                </span>
              </div>
              <p className="text-base text-dirty-white/90 pt-2 max-w-xl">
                {featuredGig.notes} Tape recorders and crowd moshers welcome.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => onOpenTicketModal(featuredGig.id)}
                className="btn-punk text-lg py-3"
              >
                RESERVE TICKETS &bull; {featuredGig.price}
              </button>
              <button
                onClick={() => onNavigate('shows')}
                className="btn-punk-outline text-base py-2.5"
              >
                SEE ALL 10 TOUR DATES
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BASEMENT POLAROIDS & LIVE ARCHIVE SAMPLER */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 my-24 py-12 relative z-10" aria-labelledby="archive-sampler-title">
        <div className="flex flex-col sm:flex-row items-baseline justify-between pb-4 mb-10 gap-2">
          <div>
            <h2
              id="archive-sampler-title"
              className="font-display text-4xl sm:text-5xl text-dirty-white tracking-tight uppercase"
            >
              VISCERAL BASEMENT SESSIONS
            </h2>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="text-base text-crimson hover:underline flex items-center gap-1 font-bold"
          >
            VIEW FULL GALLERY &amp; PRINTS &rarr;
          </button>
        </div>

        {/* Tilted Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewGallery.map((item) => (
            <button
              key={item.id}
              onClick={() => onOpenLightbox(item)}
              className="group text-left p-4 bg-paper-cream text-punk-black transition-transform duration-300 hover:-translate-y-1 relative"
              aria-label={`Open photo lightbox for ${item.title}`}
            >
              <div className="aspect-[4/3] bg-punk-black overflow-hidden mb-3">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-1">
                <span className="text-base font-bold text-crimson uppercase block">
                  {item.category} &bull; {item.date}
                </span>
                <h4 className="font-display text-xl uppercase tracking-tight text-punk-black line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-base text-punk-black/90 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 5. BAND ETHOS MANIFESTO STRIP */}
      <section className="bg-punk-black-pure py-16" aria-label="Band Ethos Statement">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <p className="font-display text-xl sm:text-2xl text-dirty-white uppercase leading-normal tracking-wide">
            &ldquo;MUSIC BUILT IN BASEMENT REHEARSALS, NOT IN AN ALGORITHM LAB.&rdquo;
          </p>
          <p className="text-base text-dirty-white/90 leading-relaxed max-w-2xl mx-auto">
            We record to tape because imperfection has teeth. We play small clubs because the sweat on the ceiling belongs to everyone in the room. Four instruments, one loud room, no pretense.
          </p>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('band')}
              className="btn-punk"
            >
              MEET THE FOUR MEMBERS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
