import React, { useState } from 'react';
import { GALLERY_ITEMS, MERCH_ITEMS, GalleryItem } from '../data/bandData';
import { Camera, ShoppingBag, Send, CheckCircle2, AlertCircle, Filter } from 'lucide-react';

interface GalleryContactPageProps {
  onOpenLightbox: (item: GalleryItem) => void;
}

export const GalleryContactPage: React.FC<GalleryContactPageProps> = ({ onOpenLightbox }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [contactMode, setContactMode] = useState<'FAN' | 'BOOKING'>('FAN');

  // Fan form state
  const [fanName, setFanName] = useState('');
  const [fanEmail, setFanEmail] = useState('');
  const [fanMessage, setFanMessage] = useState('');
  const [fanSubmitted, setFanSubmitted] = useState(false);

  // Booking form state
  const [promoterName, setPromoterName] = useState('');
  const [promoterEmail, setPromoterEmail] = useState('');
  const [venueCity, setVenueCity] = useState('');
  const [capacity, setCapacity] = useState('200-500');
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Merch order mock state
  const [merchOrdered, setMerchOrdered] = useState<string | null>(null);

  const filteredGallery = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'ALL') return true;
    return item.category === activeCategory;
  });

  const handleFanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fanName.trim() || !fanEmail.trim() || !fanMessage.trim()) return;
    setFanSubmitted(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoterName.trim() || !promoterEmail.trim() || !venueCity.trim()) return;
    setBookingSubmitted(true);
  };

  return (
    <div className="space-y-24 sm:space-y-32 pt-6 sm:pt-12">
      {/* 1. Header: Gallery Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="gallery-title">
        <div className="border-b-2 border-punk-border pb-6 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
            <span className="bg-crimson text-white font-mono text-xs font-bold uppercase tracking-widest px-2.5 py-1">
              VISUAL REPOSITORIES &bull; 35MM ANALOG
            </span>
            <span className="font-mono text-xs text-faded-light">
              ALL PHOTOGRAPHS SHOT ON FILM &bull; CLICK FOR HIGH-RES LIGHTBOX
            </span>
          </div>

          <h1
            id="gallery-title"
            className="font-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-dirty-white uppercase"
          >
            GALLERY &amp; MERCHANDISE
          </h1>
          <p className="font-mono text-base text-dirty-white/90 max-w-2xl mt-2">
            Direct on-camera flash, rehearsal basement film contact sheets, and screenprinted physical merch.
          </p>
        </div>

        {/* Gallery Filter Categories */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-punk-border pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-faded-light">
            <Filter className="w-3.5 h-3.5 text-crimson" />
            <span className="uppercase font-bold">CATEGORY:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {['ALL', 'LIVE', 'BACKSTAGE', 'REHEARSAL', 'ARTWORK'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 font-mono text-xs uppercase font-bold border transition-all ${
                  activeCategory === cat
                    ? 'bg-crimson border-crimson text-white shadow-harsh'
                    : 'bg-punk-zinc border-punk-border text-dirty-white/80 hover:border-dirty-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Photographic Grid with Interactive Lightbox Triggers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <button
              key={item.id}
              onClick={() => onOpenLightbox(item)}
              className="group text-left bg-punk-zinc border-2 border-punk-border hover:border-crimson p-3 transition-all duration-300 relative shadow-lg flex flex-col justify-between"
              aria-label={`View photo: ${item.title}`}
            >
              {/* Category Badge */}
              <div className="flex justify-between items-center mb-2 font-mono text-[10px] text-faded-light">
                <span className="text-crimson font-bold uppercase">{item.category}</span>
                <span>{item.date}</span>
              </div>

              {/* Photo Frame */}
              <div className="aspect-[4/3] bg-punk-black overflow-hidden border border-punk-border relative mb-3">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="font-mono text-xs bg-crimson text-white px-2.5 py-1 font-bold flex items-center gap-1 shadow-harsh">
                    <Camera className="w-3.5 h-3.5" /> ZOOM
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div>
                <h3 className="font-display text-xl text-dirty-white uppercase tracking-tight line-clamp-1 group-hover:text-crimson transition-colors">
                  {item.title}
                </h3>
                <p className="font-mono text-[11px] text-faded-light truncate mt-0.5">
                  {item.location}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 2. MERCHANDISE RACK */}
      <section className="bg-punk-zinc/60 border-y-2 border-punk-border py-16 sm:py-24" aria-labelledby="merch-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-punk-border pb-4 mb-10 gap-2">
            <div>
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-crimson block">
                OFFICIAL SCREENPRINTS &amp; PHYSICAL ARTEFACTS
              </span>
              <h2
                id="merch-title"
                className="font-display text-4xl sm:text-6xl text-dirty-white tracking-tight uppercase"
              >
                BAND MERCHANDISE RACK
              </h2>
            </div>
            <p className="font-mono text-xs text-faded-light">
              ALL TEES HAND-SCREENPRINTED IN LEEDS ON ORGANIC HEAVYWEIGHT COTTON
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MERCH_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-punk-black border-2 border-punk-border p-5 flex flex-col justify-between tape-top-left relative shadow-xl"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-mono text-[10px] uppercase font-bold text-crimson border border-crimson/40 px-2 py-0.5">
                      {item.badge}
                    </span>
                    <span className="font-mono text-sm font-bold text-dirty-white">
                      {item.price}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl uppercase tracking-tight text-dirty-white mb-2">
                    {item.name}
                  </h3>

                  <p className="font-body text-xs text-faded-light leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="font-mono text-[11px] text-faded-gray mb-4">
                    SIZES: <span className="text-dirty-white">{item.sizes.join(', ')}</span>
                  </div>
                </div>

                <div>
                  {merchOrdered === item.id ? (
                    <div className="p-2 bg-crimson/20 border border-crimson text-dirty-white text-center font-mono text-xs">
                      ADDED TO BASKET &bull; PREPARED FOR DISPATCH
                    </div>
                  ) : (
                    <button
                      onClick={() => setMerchOrdered(item.id)}
                      className="w-full btn-punk text-xs py-2 flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> ORDER MERCH ({item.price})
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DUAL-CHANNEL CONTACT & BOOKING TERMINAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12" aria-labelledby="contact-heading">
        <div className="bg-punk-black-pure border-2 border-punk-border p-6 sm:p-12 tape-top-right shadow-2xl">
          <div className="border-b border-punk-border pb-6 mb-8">
            <span className="font-mono text-xs uppercase font-bold tracking-widest text-crimson block mb-1">
              COMMUNICATION LINES
            </span>
            <h2
              id="contact-heading"
              className="font-display text-4xl sm:text-5xl text-dirty-white uppercase tracking-tight"
            >
              DISPATCH &amp; BOOKING TERMINAL
            </h2>
            <p className="font-mono text-xs text-faded-light mt-1">
              Select channel: Send a note to the band or submit a promoter booking inquiry.
            </p>
          </div>

          {/* Channel Switcher */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setContactMode('FAN')}
              className={`px-4 py-2 font-mono text-xs uppercase font-bold border transition-all ${
                contactMode === 'FAN'
                  ? 'bg-crimson border-crimson text-white shadow-harsh'
                  : 'bg-punk-zinc border-punk-border text-dirty-white hover:border-dirty-white'
              }`}
            >
              1. FAN MAIL &amp; ZINE SUBMISSIONS
            </button>
            <button
              onClick={() => setContactMode('BOOKING')}
              className={`px-4 py-2 font-mono text-xs uppercase font-bold border transition-all ${
                contactMode === 'BOOKING'
                  ? 'bg-crimson border-crimson text-white shadow-harsh'
                  : 'bg-punk-zinc border-punk-border text-dirty-white hover:border-dirty-white'
              }`}
            >
              2. PROMOTER &amp; FESTIVAL BOOKING
            </button>
          </div>

          {/* Notice */}
          <div className="mb-6 p-3 bg-punk-zinc border border-punk-border text-xs font-mono text-faded-light flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-crimson flex-shrink-0" />
            <span>
              All submissions are processed directly through our DIY band inbox. Fictional demo environment with instant interactive receipt.
            </span>
          </div>

          {/* FORM 1: FAN MAIL */}
          {contactMode === 'FAN' && (
            <div>
              {fanSubmitted ? (
                <div className="p-8 bg-paper-cream text-punk-black border-2 border-punk-black tape-top-left text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-crimson mx-auto" />
                  <h3 className="font-display text-3xl uppercase tracking-tight">
                    MESSAGE DELIVERED TO THE BASEMENT
                  </h3>
                  <p className="font-mono text-sm max-w-md mx-auto">
                    Thanks for writing, <strong>{fanName}</strong>. Maya and the band read all fan notes during rehearsal breaks. Keep supporting independent music!
                  </p>
                  <button
                    onClick={() => {
                      setFanSubmitted(false);
                      setFanName('');
                      setFanEmail('');
                      setFanMessage('');
                    }}
                    className="btn-punk text-xs py-1.5 px-4 mt-2"
                  >
                    SEND ANOTHER NOTE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFanSubmit} className="space-y-4 max-w-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs text-faded-light uppercase tracking-wider mb-1.5">
                        Your Name / Handle
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jordan Wells"
                        value={fanName}
                        onChange={(e) => setFanName(e.target.value)}
                        className="w-full bg-punk-zinc border border-punk-border text-dirty-white px-3.5 py-2.5 font-mono text-sm focus:border-crimson focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-faded-light uppercase tracking-wider mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jordan@zine.org"
                        value={fanEmail}
                        onChange={(e) => setFanEmail(e.target.value)}
                        className="w-full bg-punk-zinc border border-punk-border text-dirty-white px-3.5 py-2.5 font-mono text-sm focus:border-crimson focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-faded-light uppercase tracking-wider mb-1.5">
                      Your Message, Setlist Request or Zine Story
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your note to Maya, Kieran, Dex, or Sam..."
                      value={fanMessage}
                      onChange={(e) => setFanMessage(e.target.value)}
                      className="w-full bg-punk-zinc border border-punk-border text-dirty-white px-3.5 py-2.5 font-mono text-sm focus:border-crimson focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-punk text-sm py-2.5 px-6 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" /> SEND DISPATCH TO BAND
                  </button>
                </form>
              )}
            </div>
          )}

          {/* FORM 2: PROMOTER BOOKING */}
          {contactMode === 'BOOKING' && (
            <div>
              {bookingSubmitted ? (
                <div className="p-8 bg-paper-cream text-punk-black border-2 border-punk-black tape-top-left text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-crimson mx-auto" />
                  <h3 className="font-display text-3xl uppercase tracking-tight">
                    BOOKING INQUIRY LOGGED &bull; REF #AH-BKG-2025
                  </h3>
                  <p className="font-mono text-sm max-w-lg mx-auto">
                    Inquiry received for <strong>{venueCity}</strong>. Tour management will review technical rider availability and respond to <strong>{promoterEmail}</strong> within 48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setBookingSubmitted(false);
                      setPromoterName('');
                      setPromoterEmail('');
                      setVenueCity('');
                      setBookingMessage('');
                    }}
                    className="btn-punk text-xs py-1.5 px-4 mt-2"
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4 max-w-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs text-faded-light uppercase tracking-wider mb-1.5">
                        Promoter / Venue Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Manchester Underground Promotions"
                        value={promoterName}
                        onChange={(e) => setPromoterName(e.target.value)}
                        className="w-full bg-punk-zinc border border-punk-border text-dirty-white px-3.5 py-2.5 font-mono text-sm focus:border-crimson focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-faded-light uppercase tracking-wider mb-1.5">
                        Business Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="promoter@venue.co.uk"
                        value={promoterEmail}
                        onChange={(e) => setPromoterEmail(e.target.value)}
                        className="w-full bg-punk-zinc border border-punk-border text-dirty-white px-3.5 py-2.5 font-mono text-sm focus:border-crimson focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs text-faded-light uppercase tracking-wider mb-1.5">
                        City &amp; Venue
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sheffield &bull; The Leadmill"
                        value={venueCity}
                        onChange={(e) => setVenueCity(e.target.value)}
                        className="w-full bg-punk-zinc border border-punk-border text-dirty-white px-3.5 py-2.5 font-mono text-sm focus:border-crimson focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-faded-light uppercase tracking-wider mb-1.5">
                        Room Capacity
                      </label>
                      <select
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        className="w-full bg-punk-zinc border border-punk-border text-dirty-white px-3.5 py-2.5 font-mono text-sm focus:border-crimson focus:outline-none"
                      >
                        <option value="100-200">100 - 200 Cap (Sweatbox)</option>
                        <option value="200-500">200 - 500 Cap (Club Hall)</option>
                        <option value="500-1200">500 - 1,200 Cap (Theater / Ballroom)</option>
                        <option value="Festival">Festival Stage</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-faded-light uppercase tracking-wider mb-1.5">
                      Proposed Date &amp; Financial Offer Details
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Specify requested date, curfew times, backline provided, and financial guarantee..."
                      value={bookingMessage}
                      onChange={(e) => setBookingMessage(e.target.value)}
                      className="w-full bg-punk-zinc border border-punk-border text-dirty-white px-3.5 py-2.5 font-mono text-sm focus:border-crimson focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-punk text-sm py-2.5 px-6 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" /> SUBMIT FORMAL BOOKING PROPOSAL
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
