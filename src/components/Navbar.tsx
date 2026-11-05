import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Disc3 } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  isPlaying,
  onTogglePlay
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'band', label: 'THE BAND' },
    { id: 'music', label: 'MUSIC' },
    { id: 'shows', label: 'SHOWS & TOUR' },
    { id: 'contact', label: 'GALLERY & CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-punk-black/95">
      {/* Top Urgent Tour Marquee Ribbon */}
      <div className="bg-crimson text-white text-sm py-1.5 px-4 overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap flex gap-8 items-center font-bold">
          <span>New LP &ldquo;Static Dreams at 3AM&rdquo; out now on 180g vinyl and cassette</span>
          <span>&bull; Autumn UK &amp; EU Tour: Leeds &amp; London Sold Out</span>
          <span>&bull; Manchester &amp; Glasgow low tickets remaining</span>
          <span>&bull; 5 Pop-punk demos featuring Maya Lin on lead vocals</span>
          <span>No backing tracks &bull; Three chords &amp; the truth</span>
        </div>
      </div>

      {/* Main Masthead */}
      <div className="max-w-7xl mx-auto px-8 sm:px-10 h-20 flex items-center justify-between">
        {/* Band Wordmark Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group flex items-baseline gap-2 focus:outline-none"
          aria-label="AFTERHOURS Homepage"
        >
          <span className="font-display text-4xl sm:text-5xl tracking-tighter text-dirty-white group-hover:text-crimson transition-colors leading-none">
            AFTERHOURS
          </span>
          <span className="hidden sm:inline-block text-sm tracking-widest text-crimson uppercase font-bold px-1.5 py-0.5">
            LEEDS &bull; UK
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 font-display text-lg lg:text-xl tracking-wider transition-colors ${
                  isActive
                    ? 'text-white bg-crimson'
                    : 'text-dirty-white hover:text-white hover:bg-punk-zinc'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Utility: Audio Demo Trigger + Mobile Hamburger */}
        <div className="flex items-center gap-4 pr-4 sm:pr-6">
          {/* Quick Audio Trigger Button (Desktop Only) */}
          <button
            onClick={onTogglePlay}
            className={`hidden lg:flex items-center gap-2 px-4 py-2 text-sm uppercase tracking-wider font-bold transition-colors ${
              isPlaying
                ? 'bg-crimson text-white'
                : 'text-dirty-white hover:bg-crimson hover:text-white bg-punk-zinc'
            }`}
            title={isPlaying ? 'Pause Demo Audio' : 'Play Live Synthesized Rock Demo'}
            aria-label={isPlaying ? 'Pause audio demo' : 'Play audio demo'}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-white" />
                <span>NOW PLAYING</span>
                <Disc3 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-faded-light" />
                <span>PLAY DEMO</span>
              </>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-dirty-white hover:text-crimson bg-punk-zinc focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-punk-black px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 font-display text-2xl tracking-wider ${
                  isActive
                    ? 'bg-crimson text-white'
                    : 'text-dirty-white hover:text-white hover:bg-punk-zinc'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <div className="pt-4 flex items-center justify-between">
            <span className="text-sm text-faded-light">DEMO AUDIO PLAYER:</span>
            <button
              onClick={onTogglePlay}
              className={`flex items-center gap-2 px-4 py-2 text-sm tracking-wider font-bold ${
                isPlaying
                  ? 'bg-crimson text-white'
                  : 'bg-punk-zinc text-dirty-white'
              }`}
            >
              {isPlaying ? 'PAUSE DEMO' : 'PLAY ROCK DEMO'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
