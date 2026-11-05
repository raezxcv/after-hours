import React, { useState } from 'react';
import { TOUR_DATES } from '../data/bandData';
import { MapPin, Ticket, AlertCircle, ShieldAlert, Filter } from 'lucide-react';

interface ShowsPageProps {
  onOpenTicketModal: (gigId: string) => void;
}

export const ShowsPage: React.FC<ShowsPageProps> = ({ onOpenTicketModal }) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'UK' | 'EU' | 'LOW'>('ALL');

  const filteredGigs = TOUR_DATES.filter((gig) => {
    if (activeFilter === 'UK') return gig.region === 'UK';
    if (activeFilter === 'EU') return gig.region === 'EU';
    if (activeFilter === 'LOW') return gig.status === 'Low Tickets';
    return true;
  });

  return (
    <div className="space-y-24 sm:space-y-32 pt-6 sm:pt-12">
      {/* 1. Header & Tour Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="shows-title">
        <div className="border-b-2 border-punk-border pb-6 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
            <span className="bg-crimson text-white font-mono text-xs font-bold uppercase tracking-widest px-2.5 py-1">
              AUTUMN / WINTER 2025 TOUR
            </span>
            <span className="font-mono text-xs text-faded-light">
              10 CITIES &bull; UK &amp; EUROPEAN CIRCUIT
            </span>
          </div>

          <h1
            id="shows-title"
            className="font-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-dirty-white uppercase"
          >
            SHOWS &amp; TOUR DATES
          </h1>
          <p className="font-mono text-base text-dirty-white/90 max-w-2xl mt-2">
            Sweaty clubs, sticky floors, loud amplifiers. Real tickets, zero dynamic pricing scalpers.
          </p>
        </div>

        {/* Fictional Tour Notice */}
        <div className="mb-10 p-4 bg-punk-zinc border-l-4 border-crimson font-mono text-xs text-dirty-white/90 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-crimson flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-crimson uppercase block">PORTFOLIO DEMO TOUR:</strong>
            <span>
              All tour dates and venues below are fictional scenarios created for AFTERHOURS. Clicking &ldquo;RESERVE TICKET&rdquo; on any gig generates a commemorative digital concert pass!
            </span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-punk-border pb-4">
          <div className="flex items-center gap-2 font-mono text-xs">
            <Filter className="w-3.5 h-3.5 text-crimson" />
            <span className="text-faded-light uppercase font-bold">FILTER TOUR:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'ALL', label: 'ALL SHOWS (10)' },
              { id: 'UK', label: 'UK CITIES (6)' },
              { id: 'EU', label: 'EUROPEAN (4)' },
              { id: 'LOW', label: 'RUNNING LOW' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as typeof activeFilter)}
                className={`px-3 py-1.5 font-mono text-xs uppercase font-bold border transition-all ${
                  activeFilter === f.id
                    ? 'bg-crimson border-crimson text-white shadow-harsh'
                    : 'bg-punk-zinc border-punk-border text-dirty-white/80 hover:border-dirty-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tour Date Rows */}
        <div className="space-y-3">
          {filteredGigs.map((gig) => {
            const isSoldOut = gig.status === 'Sold Out';
            const isLow = gig.status === 'Low Tickets';

            return (
              <div
                key={gig.id}
                className="bg-punk-zinc border-2 border-punk-border hover:border-crimson p-4 sm:p-6 transition-all duration-200 group flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                {/* Date & City */}
                <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0">
                  <div className="bg-punk-black border border-punk-border px-3 py-2 text-center flex-shrink-0 w-24">
                    <span className="block font-display text-xl sm:text-2xl text-crimson leading-tight">
                      {gig.day}
                    </span>
                    <span className="block font-mono text-[10px] text-faded-light uppercase">
                      2025
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display text-2xl sm:text-3xl text-dirty-white group-hover:text-crimson transition-colors uppercase tracking-tight">
                        {gig.city}
                      </h3>
                      <span className="font-mono text-xs text-faded-gray uppercase">
                        &bull; {gig.country}
                      </span>
                    </div>

                    <p className="font-mono text-sm text-dirty-white/90 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-crimson flex-shrink-0" />
                      {gig.venue}
                    </p>

                    <p className="font-mono text-xs text-faded-light mt-1">
                      SUPPORT: <span className="text-dirty-white">{gig.support}</span> &bull; DOORS {gig.doors}
                    </p>
                  </div>
                </div>

                {/* Status & Action */}
                <div className="flex items-center justify-between lg:justify-end gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-punk-border/60">
                  <div className="text-left lg:text-right font-mono text-xs">
                    <span className="text-dirty-white font-bold block text-sm">{gig.price}</span>
                    <span
                      className={`inline-block font-bold px-2 py-0.5 text-[10px] uppercase border mt-0.5 ${
                        isSoldOut
                          ? 'border-faded-gray text-faded-gray bg-punk-black'
                          : isLow
                          ? 'border-amber-500/50 text-amber-400 bg-amber-950/40'
                          : 'border-emerald-500/50 text-emerald-400 bg-emerald-950/30'
                      }`}
                    >
                      {gig.status}
                    </span>
                  </div>

                  <div>
                    {isSoldOut ? (
                      <button
                        onClick={() => onOpenTicketModal(gig.id)}
                        className="btn-punk-outline text-xs py-2 px-4 border-faded-gray text-faded-light"
                      >
                        JOIN RETURNS WAITING LIST
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenTicketModal(gig.id)}
                        className="btn-punk text-xs py-2 px-5 flex items-center gap-1.5"
                      >
                        <Ticket className="w-4 h-4" />
                        <span>RESERVE PASS</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. TOUR POSTER ART & GIG ARCHIVE EXHIBITION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="poster-archive-title">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-punk-black-pure border-2 border-punk-border p-6 sm:p-12 tape-top-right shadow-2xl">
          {/* Left: Screenprinted Tour Poster Artwork */}
          <div className="lg:col-span-5 relative">
            <div className="border-4 border-dirty-white bg-paper-cream p-3 text-punk-black shadow-harsh relative transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="aspect-[3/4] overflow-hidden border-2 border-punk-black bg-black">
                <img
                  src="/images/tour-poster.jpg"
                  alt="Official Screenprinted Tour Poster for AFTERHOURS UK & Europe Tour"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 flex justify-between items-center font-mono text-xs text-punk-black">
                <span className="font-bold">AUTUMN 2025 TOUR RISOGRAPH</span>
                <span className="text-crimson font-bold">LIMITED /300</span>
              </div>
            </div>
          </div>

          {/* Right: Tour Poster Story & Gig Archive */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase font-bold text-crimson block mb-1">
                TOUR ARTEFACT ARCHIVE
              </span>
              <h2
                id="poster-archive-title"
                className="font-display text-4xl sm:text-5xl text-dirty-white uppercase tracking-tight"
              >
                PULLED BY HAND AT LEEDS PRINT WORKSHOP
              </h2>
            </div>

            <p className="font-body text-base text-dirty-white/90 leading-relaxed">
              Every tour poster is designed and hand-printed by the band at Leeds Print Workshop using vintage French ink and 270gsm heavyweight recycled Kraft stock.
            </p>

            {/* DIY Gig Etiquette Box */}
            <div className="p-5 bg-punk-zinc border border-punk-border space-y-3 font-mono text-xs">
              <h4 className="font-bold text-crimson uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-crimson" /> AFTERHOURS LIVE SHOW ETIQUETTE:
              </h4>
              <ul className="space-y-1.5 text-dirty-white/90">
                <li>&bull; <strong>Pick people up:</strong> If someone falls in the pit, everyone pulls them up before the next chorus.</li>
                <li>&bull; <strong>Earplugs available:</strong> Free foam earplugs at the merch desk. Protect your hearing.</li>
                <li>&bull; <strong>Support opening bands:</strong> Turn up at door times. The opening bands are our friends and they play hard.</li>
                <li>&bull; <strong>No harassment:</strong> Zero tolerance for intimidation, racism, sexism, or homophobia. You will be ejected immediately.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
