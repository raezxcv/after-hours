import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AudioPlayerDock } from './components/AudioPlayerDock';
import { LightboxModal } from './components/LightboxModal';
import { TicketModal } from './components/TicketModal';
import { HomePage } from './pages/HomePage';
import { BandPage } from './pages/BandPage';
import { MusicPage } from './pages/MusicPage';
import { ShowsPage } from './pages/ShowsPage';
import { GalleryContactPage } from './pages/GalleryContactPage';
import { GALLERY_ITEMS, TOUR_DATES, GalleryItem, Gig } from './data/bandData';
import { audioEngine } from './utils/audioEngine';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);

  // Sync isPlaying state with Web Audio Engine
  useEffect(() => {
    const unsubscribe = audioEngine.subscribe(() => {
      setIsPlaying(audioEngine.getState().isPlaying);
    });
    return () => unsubscribe();
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTogglePlay = () => {
    audioEngine.togglePlay();
  };

  const handleOpenTicketModal = (gigId: string) => {
    const gig = TOUR_DATES.find((g) => g.id === gigId);
    if (gig) setSelectedGig(gig);
  };

  return (
    <div className="min-h-[100dvh] bg-punk-black text-dirty-white font-body flex flex-col selection:bg-crimson selection:text-white paper-grain overflow-x-hidden">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
      />

      {/* Main Page Content */}
      <main id="main-content" className="flex-1 pb-44" tabIndex={-1}>
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenLightbox={(item) => setLightboxItem(item)}
            onOpenTicketModal={handleOpenTicketModal}
          />
        )}

        {currentPage === 'band' && (
          <BandPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'music' && (
          <MusicPage />
        )}

        {currentPage === 'shows' && (
          <ShowsPage onOpenTicketModal={handleOpenTicketModal} />
        )}

        {currentPage === 'contact' && (
          <GalleryContactPage
            onOpenLightbox={(item) => setLightboxItem(item)}
          />
        )}
      </main>

      {/* Lightbox Modal */}
      <LightboxModal
        item={lightboxItem}
        items={GALLERY_ITEMS}
        onClose={() => setLightboxItem(null)}
        onNavigate={(newItem) => setLightboxItem(newItem)}
      />

      {/* Ticket Pass Modal */}
      <TicketModal
        gig={selectedGig}
        onClose={() => setSelectedGig(null)}
      />

      {/* Persistent Cassette Player Console Dock */}
      <AudioPlayerDock />

      {/* Designed Footer Close */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
