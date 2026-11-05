import React, { useState } from 'react';
import { ArrowUp, Disc3, Radio, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-punk-black-pure pt-16 pb-48 text-dirty-white relative z-10">
      <div className="max-w-7xl mx-auto px-8 sm:px-10">
        {/* Top Grid: Newsletter + Band Lore */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          {/* Dispatch Newsletter */}
          <div className="md:col-span-6 space-y-4 my-4 relative z-10">
            <span className="text-sm uppercase font-bold text-crimson flex items-center gap-2">
              <Radio className="w-4 h-4 text-crimson" /> The 3am Dispatch
            </span>
            <p className="text-lg sm:text-xl text-dirty-white tracking-tight font-bold uppercase">
              JOIN THE UNDERGROUND TAPE CIRCLE
            </p>
            <p className="text-base text-faded-light max-w-md leading-relaxed">
              No sponsored spam or promotional PR rubbish. Direct notifications when secret warehouse shows are announced, unreleased four-track tape demos leak, or fresh physical merch drops.
            </p>

            {subscribed ? (
              <div className="p-3.5 bg-crimson/15 text-dirty-white text-sm flex items-center gap-2 font-bold">
                <Check className="w-4 h-4 text-crimson flex-shrink-0" />
                <span>YOU&apos;RE ON THE TAPE LIST. CHECK YOUR INBOX BEFORE 3 AM.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="your.email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-punk-zinc text-dirty-white px-3.5 py-2.5 text-sm focus:outline-none"
                  aria-label="Email address for band newsletter"
                />
                <button
                  type="submit"
                  className="btn-punk text-sm py-2 px-5 whitespace-nowrap"
                >
                  DISPATCH ME
                </button>
              </form>
            )}
          </div>

          {/* Quick Page Links */}
          <div className="md:col-span-3 space-y-3 text-sm">
            <h4 className="font-display text-xl text-dirty-white uppercase tracking-wider mb-3">
              NAVIGATION
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-crimson transition-colors">
                  &rarr; 01. HOME &amp; LATEST RELEASE
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('band')} className="hover:text-crimson transition-colors">
                  &rarr; 02. THE BAND &amp; DOSSIERS
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('music')} className="hover:text-crimson transition-colors">
                  &rarr; 03. DISCOGRAPHY &amp; DEMOS
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shows')} className="hover:text-crimson transition-colors">
                  &rarr; 04. UK &amp; EU TOUR DATES
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-crimson transition-colors">
                  &rarr; 05. GALLERY &amp; MERCH
                </button>
              </li>
            </ul>
          </div>

          {/* Label & Technical Credentials */}
          <div className="md:col-span-3 space-y-3 text-sm text-faded-light">
            <h4 className="font-display text-xl text-dirty-white uppercase tracking-wider mb-3">
              LABEL &amp; SPECS
            </h4>
            <p>
              <strong className="text-dirty-white">LABEL:</strong> SUBTERRANEAN TAPES
            </p>
            <p>
              <strong className="text-dirty-white">CATALOG:</strong> AH-001-LP / AH-002-EP
            </p>
            <p>
              <strong className="text-dirty-white">LOCATION:</strong> Basement Studio, Leeds
            </p>
            <p className="break-all">
              <strong className="text-dirty-white">BOOKING:</strong> booking@afterhoursband.co.uk
            </p>
            <div className="pt-2">
              <span className="inline-block bg-punk-zinc px-2 py-1 text-sm text-dirty-white font-bold">
                FICTIONAL ALTERNATIVE ROCK BAND
              </span>
            </div>
          </div>
        </div>

        {/* Studio Close: Giant Prominent AFTERHOURS Watermark */}
        <div className="pt-12 pb-16 overflow-hidden select-none">
          <div
            className="font-display text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] xl:text-[15rem] tracking-tight text-dirty-white/35 hover:text-crimson/50 transition-colors duration-300 select-none leading-none w-full text-center block"
          >
            AFTERHOURS
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-24 text-sm text-faded-light">
          <div className="flex items-center gap-2">
            <Disc3 className="w-4 h-4 text-crimson" />
            <span>&copy; 2025 AFTERHOURS BAND. INDEPENDENT RECORDINGS.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>PHOTOGRAPHY: 35MM DIRECT FLASH</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-dirty-white hover:text-crimson transition-colors"
              aria-label="Back to top"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-4 h-4 text-crimson" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
