import React, { useState } from 'react';
import { X, Ticket, CheckCircle2, AlertCircle, Calendar, MapPin, Clock } from 'lucide-react';
import { Gig } from '../data/bandData';

interface TicketModalProps {
  gig: Gig | null;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ gig, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [qty, setQty] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const [ticketCode, setTicketCode] = useState('');

  if (!gig) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    // Generate authentic ticket serial
    const code = `AH-${gig.city.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketCode(code);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-punk-black text-dirty-white border-2 border-crimson shadow-2xl p-6 sm:p-8 tape-top-left">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-punk-zinc hover:bg-crimson text-dirty-white transition-colors"
          aria-label="Close Ticket Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="border-b border-punk-border pb-4 mb-6">
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-crimson flex items-center gap-1.5">
                <Ticket className="w-4 h-4" /> OFFICIAL TOUR PASS RESERVATION
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-dirty-white tracking-tight mt-1">
                {gig.city.toUpperCase()}
              </h3>
              <p className="font-mono text-xs text-faded-light mt-1 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-crimson" /> {gig.venue}
              </p>
              <div className="flex items-center gap-4 mt-2 font-mono text-xs text-faded-gray">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {gig.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> DOORS {gig.doors}</span>
                <span className="text-dirty-white font-bold">{gig.price}</span>
              </div>
            </div>

            {/* Notice */}
            <div className="mb-6 p-3 bg-punk-zinc/90 border border-amber-500/40 text-xs font-mono text-amber-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>PORTFOLIO DEMO:</strong> This is a fictional band tour date. Reserving generates a real-time commemorative digital concert pass!
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-faded-light uppercase tracking-wider mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-punk-zinc border border-punk-border text-dirty-white px-3.5 py-2.5 font-mono text-sm focus:border-crimson focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-faded-light uppercase tracking-wider mb-1.5">
                  Email Address for Pass Delivery
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@underground.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-punk-zinc border border-punk-border text-dirty-white px-3.5 py-2.5 font-mono text-sm focus:border-crimson focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-faded-light uppercase tracking-wider mb-1.5">
                  Ticket Quantity (Max 4 per order)
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setQty(num)}
                      className={`flex-1 py-2 font-mono text-sm border font-bold ${
                        qty === num
                          ? 'bg-crimson border-crimson text-white'
                          : 'bg-punk-zinc border-punk-border text-dirty-white hover:border-dirty-white'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-punk"
                >
                  CONFIRM RESERVATION ({qty} TICKET{qty > 1 ? 'S' : ''})
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmed Ticket Stub Presentation */
          <div className="text-center py-2 animate-fadeIn">
            <div className="inline-flex p-2.5 bg-crimson/20 border border-crimson text-crimson mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-display text-3xl text-dirty-white tracking-wide">
              RESERVATION CONFIRMED
            </h4>
            <p className="font-mono text-xs text-faded-light mt-1">
              Your digital ticket pass has been issued for {name}.
            </p>

            {/* Photocopied Ticket Pass Graphic */}
            <div className="my-6 p-4 bg-paper-cream text-punk-black border-2 border-punk-black shadow-harsh text-left relative overflow-hidden">
              <div className="border-b-2 border-dashed border-punk-black pb-3 mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-crimson uppercase tracking-widest block">
                      AFTERHOURS • AUTUMN TOUR 2025
                    </span>
                    <h5 className="font-display text-2xl uppercase tracking-tight">
                      {gig.city} — {gig.venue}
                    </h5>
                  </div>
                  <span className="font-mono text-xs font-bold bg-punk-black text-dirty-white px-2 py-0.5">
                    {qty}x GENERAL ADM
                  </span>
                </div>
                <p className="font-mono text-xs text-punk-black/80 mt-1">
                  DATE: {gig.date} • DOORS: {gig.doors}
                </p>
              </div>

              <div className="flex justify-between items-end font-mono text-xs">
                <div>
                  <p className="text-[10px] text-punk-black/60 uppercase">PASS HOLDER</p>
                  <p className="font-bold text-sm uppercase">{name}</p>
                  <p className="text-[10px] text-punk-black/70">{email}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-punk-black/60 uppercase">SERIAL CODE</p>
                  <p className="font-bold text-sm text-crimson">{ticketCode}</p>
                </div>
              </div>

              {/* Fictional Barcode Lines */}
              <div className="mt-4 pt-2 border-t border-punk-black/30 flex items-center justify-center gap-1 opacity-80 h-7 overflow-hidden">
                {Array.from({ length: 42 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-punk-black h-full"
                    style={{ width: `${(i % 3) + 1.5}px` }}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 btn-punk-outline text-sm py-2"
              >
                PRINT / SAVE TICKET
              </button>
              <button
                onClick={onClose}
                className="flex-1 btn-punk text-sm py-2"
              >
                DONE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
