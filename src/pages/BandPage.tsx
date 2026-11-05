import React, { useState } from 'react';
import { BAND_MEMBERS, Member } from '../data/bandData';
import { Wrench, Music, Quote, MapPin } from 'lucide-react';
import { handleImageError } from '../utils/imageHelper';

interface BandPageProps {
  onNavigate: (page: string) => void;
}

export const BandPage: React.FC<BandPageProps> = ({ onNavigate }) => {
  const [selectedMember, setSelectedMember] = useState<Member>(BAND_MEMBERS[0]);

  return (
    <div className="space-y-24 sm:space-y-32 pt-6 sm:pt-12">
      {/* 1. Header & Group Hero Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="band-title">
        <div className="border-b-2 border-punk-border pb-6 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
            <span className="bg-crimson text-white font-mono text-xs font-bold uppercase tracking-widest px-2.5 py-1">
              BAND DOSSIER &bull; LEEDS, UK
            </span>
            <span className="font-mono text-xs text-faded-light">
              ACTIVE SINCE 2022 &bull; INDEPENDENT ARTIST
            </span>
          </div>

          <h1
            id="band-title"
            className="font-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-dirty-white uppercase"
          >
            THE FOUR OF US
          </h1>
          <p className="font-mono text-base text-dirty-white/90 max-w-2xl mt-2">
            No session players. No hired producers. Meet Maya, Kieran, Dexter, and Samira.
          </p>
        </div>

        {/* Group Photo with Zine Tape Framing */}
        <div className="relative border-2 border-punk-border bg-punk-black tape-top-left tape-top-right shadow-2xl overflow-hidden mb-16">
          <div className="aspect-[16/9] w-full bg-punk-black overflow-hidden relative">
            <img
              src="images/band-hero.jpg"
              alt="AFTERHOURS four members in concrete backstage hallway"
              onError={handleImageError}
              className="w-full h-full object-cover filter contrast-105"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-punk-black/90 border border-punk-border p-4 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-dirty-white font-bold">
                LEFT TO RIGHT: KIERAN CRUZ (GUITAR), SAMIRA PATEL (DRUMS), MAYA LIN (LEAD VOCALS/GUITAR), DEXTER VANCE (BASS)
              </span>
              <span className="text-crimson font-bold">LEEDS 2025</span>
            </div>
          </div>
        </div>

        {/* The Origin Story Manifesto */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-punk-zinc p-8 sm:p-12 border-2 border-punk-border tape-top-left">
          <div className="md:col-span-5 space-y-3">
            <span className="font-mono text-xs uppercase font-bold text-crimson block">
              ORIGIN STORY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-dirty-white uppercase tracking-tight">
              A MILL ATTIC ON KIRKSTALL ROAD
            </h2>
            <p className="font-mono text-xs text-faded-light flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-crimson" /> LEEDS, WEST YORKSHIRE
            </p>
          </div>

          <div className="md:col-span-7 space-y-4 font-body text-sm sm:text-base text-dirty-white/90 leading-relaxed">
            <p>
              AFTERHOURS began in November 2022 when Maya Lin posted a torn-paper notice in a Leeds record shop:
              <em> &ldquo;Wanted: Rhythm section with bad tempers and reliable cars. No covers. Only fast songs about leaving town.&rdquo;</em>
            </p>
            <p>
              Samira replied the same afternoon with an audio cassette of drum breaks recorded on her phone. Dexter showed up with a 1978 Fender Precision bass and an uncalibrated tape machine. Kieran arrived two days later with a battered Les Paul and two chords that turned into the opening riff of &ldquo;Burn The Tape&rdquo;.
            </p>
            <p>
              Rehearsing through northern winters in a freezing room with no central heating forged their signature urgent sound: loud enough to keep warm, fast enough to beat the last night bus.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Deep Member Profiles: 4 Individual Direct-Flash Dossiers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="profiles-heading">
        <div className="border-b border-punk-border pb-4 mb-12">
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-crimson block">
            INDIVIDUAL DOSSIERS
          </span>
          <h2
            id="profiles-heading"
            className="font-display text-4xl sm:text-6xl text-dirty-white tracking-tight uppercase"
          >
            PERSONNEL &amp; GEAR ROSTER
          </h2>
        </div>

        {/* Member Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {BAND_MEMBERS.map((member) => {
            const isSelected = selectedMember.id === member.id;
            return (
              <button
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className={`p-3 text-left border-2 font-display text-xl sm:text-2xl tracking-wide uppercase transition-all ${
                  isSelected
                    ? 'border-crimson bg-crimson text-white shadow-harsh'
                    : 'border-punk-border bg-punk-zinc text-dirty-white/80 hover:border-dirty-white'
                }`}
              >
                <span className="block font-mono text-[10px] tracking-widest text-faded-light uppercase">
                  {member.role.split(',')[0]}
                </span>
                {member.name}
              </button>
            );
          })}
        </div>

        {/* Selected Member Detail Showcase */}
        <div className="bg-punk-zinc border-2 border-punk-border p-6 sm:p-10 shadow-2xl tape-top-right">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Member Direct Flash Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="border-2 border-punk-border bg-paper-cream p-3 text-punk-black shadow-harsh relative">
                <div className="aspect-[3/4] overflow-hidden border border-punk-black bg-black">
                  <img
                    src={selectedMember.image}
                    alt={`${selectedMember.name} portrait`}
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 flex justify-between items-baseline font-mono text-xs text-punk-black">
                  <span className="font-bold uppercase tracking-wider">{selectedMember.name}</span>
                  <span className="text-crimson font-bold">{selectedMember.hometown}</span>
                </div>
              </div>
            </div>

            {/* Member Dossier Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-mono text-xs uppercase font-bold text-crimson block mb-1">
                  OFFICIAL ROLE &bull; {selectedMember.hometown.toUpperCase()}
                </span>
                <h3 className="font-display text-4xl sm:text-5xl text-dirty-white uppercase tracking-tight">
                  {selectedMember.name}
                </h3>
                <p className="font-mono text-sm text-dirty-white/80 font-bold mt-1">
                  {selectedMember.role}
                </p>
              </div>

              {/* Distressed Quote Block */}
              <div className="p-4 bg-punk-black border-l-4 border-crimson font-hand text-sm sm:text-base text-dirty-white italic leading-relaxed">
                <Quote className="w-4 h-4 text-crimson inline mr-2" />
                {selectedMember.quote}
              </div>

              {/* Biography */}
              <div>
                <h4 className="font-mono text-xs uppercase font-bold text-faded-light tracking-wider mb-2">
                  BACKGROUND &amp; CONTRIBUTION
                </h4>
                <p className="font-body text-sm sm:text-base text-dirty-white/90 leading-relaxed">
                  {selectedMember.bio}
                </p>
              </div>

              {/* Primary Gear Specs */}
              <div>
                <h4 className="font-mono text-xs uppercase font-bold text-crimson tracking-wider mb-2 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" /> STAGE &amp; STUDIO EQUIPMENT
                </h4>
                <ul className="space-y-1.5 font-mono text-xs text-dirty-white/90">
                  {selectedMember.gear.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-crimson font-bold">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Musical Influences Badges */}
              <div>
                <h4 className="font-mono text-xs uppercase font-bold text-faded-light tracking-wider mb-2 flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5" /> KEY INFLUENCES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.influences.map((inf, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-punk-black border border-punk-border font-mono text-xs text-dirty-white"
                    >
                      {inf}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. REHEARSAL ESSAY: Behind the Scenes in Basement Room 4 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="rehearsal-essay-title">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-punk-zinc/50 border-2 border-punk-border p-6 sm:p-12 tape-top-left">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-xs uppercase font-bold text-crimson block">
              BEHIND THE CURTAIN
            </span>
            <h2
              id="rehearsal-essay-title"
              className="font-display text-4xl sm:text-5xl text-dirty-white tracking-tight uppercase"
            >
              INSIDE BASEMENT ROOM 4
            </h2>
            <p className="font-body text-sm sm:text-base text-dirty-white/90 leading-relaxed">
              We don’t believe in sterile professional soundproofed suites with leather sofas and espresso machines. Every demo for <em>Static Dreams at 3AM</em> was arranged in a basement surrounded by damp brickwork, coils of gaffer tape, and spilled filter coffee.
            </p>
            <p className="font-body text-sm text-faded-light leading-relaxed">
              When Dexter brings in a fresh bassline, we run it through the VOX AC30 until the speakers start groaning. If a song doesn’t lock in after three takes, we tear up the lyric sheet and start again. That raw friction is the fifth member of AFTERHOURS.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('music')}
                className="btn-punk"
              >
                LISTEN TO REHEARSAL DEMOS
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="border-2 border-punk-border shadow-2xl bg-punk-black overflow-hidden relative">
              <img
                src="images/rehearsal-room.jpg"
                alt="AFTERHOURS rehearsal in basement studio with cables and amplifiers"
                onError={handleImageError}
                className="w-full aspect-[16/10] object-cover"
              />
              <div className="p-3 bg-punk-black border-t border-punk-border font-mono text-xs text-faded-light flex justify-between items-center">
                <span>DOCUMENTARY PHOTO ARCHIVE &bull; LEEDS</span>
                <span className="text-crimson font-bold">UNSTAGED 35MM</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
