// Comprehensive band data for AFTERHOURS

export interface Member {
  id: string;
  name: string;
  nickname: string;
  role: string;
  instrument: string;
  hometown: string;
  image: string;
  quote: string;
  bio: string;
  gear: string[];
  influences: string[];
}

export interface Release {
  id: string;
  title: string;
  type: 'LP' | 'EP' | 'SINGLE';
  year: string;
  catalogNumber: string;
  coverImage: string;
  description: string;
  tracks: {
    number: number;
    title: string;
    duration: string;
    hasDemoAudio: boolean;
    audioTrackId?: string;
    lyricsSnippet: string;
  }[];
  credits: {
    recorded: string;
    mixed: string;
    mastered: string;
    artwork: string;
  };
  formats: {
    format: string;
    status: 'In Stock' | 'Low Stock' | 'Sold Out';
    price: string;
  }[];
}

export interface Gig {
  id: string;
  date: string;
  day: string;
  city: string;
  country: string;
  region: 'UK' | 'EU';
  venue: string;
  doors: string;
  support: string;
  status: 'On Sale' | 'Low Tickets' | 'Sold Out';
  price: string;
  ticketUrl: string;
  notes?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'LIVE' | 'BACKSTAGE' | 'REHEARSAL' | 'ARTWORK';
  imageUrl: string;
  date: string;
  location: string;
  photographer: string;
  caption: string;
}

export const BAND_MEMBERS: Member[] = [
  {
    id: 'maya',
    name: 'Maya Lin',
    nickname: 'Maya',
    role: 'Lead Vocals, Rhythm Guitar & Lyrics',
    instrument: '1996 Fender Telecaster (Daphne Blue), VOX AC30',
    hometown: 'Leeds, West Yorkshire',
    image: 'images/portrait-maya.jpg',
    quote: '"If a song doesn’t make your ribcage vibrate when you play it in a concrete stairwell, throw it in the dustbin."',
    bio: 'Maya founded AFTERHOURS in late 2022 after spending two years recording lo-fi demo tapes on a broken 4-track recorder in an uninsulated mill attic. Her lyrics combine sharp, bittersweet observational storytelling with ferocious vocal dynamism—ranging from whisper-quiet vulnerability to roaring primal choruses.',
    gear: [
      '1996 Fender Telecaster Custom (Daphne Blue, covered in venue stickers)',
      '1970s VOX AC30 Top Boost Amp',
      'ProCo Vintage Rat Distortion',
      'Electro-Harmonix Holy Grail Reverb',
      'Shure 55SH Series II Vintage Microphone'
    ],
    influences: ['Yeah Yeah Yeahs', 'PJ Harvey', 'Wolf Alice', 'The Cranberries', 'Patti Smith']
  },
  {
    id: 'kieran',
    name: 'Kieran Cruz',
    nickname: 'Ren',
    role: 'Lead Guitar & Backing Vocals',
    instrument: 'Gibson Les Paul Junior, Marshall JCM800',
    hometown: 'Manchester',
    image: 'images/portrait-kieran.jpg',
    quote: '"Guitar solos shouldn’t be polite exercises in technique. They should sound like an engine throwing a piston."',
    bio: 'A native of Manchester who cut his teeth playing in underground post-hardcore basements and indie clubs. Kieran brings razor-sharp sonic kineticism, lightning chord changes, and screaming harmonic feedback loops that anchor the band’s signature dual-guitar wall of sound.',
    gear: [
      '2004 Gibson Les Paul Junior (Single P-90 pickup)',
      '1983 Marshall JCM800 2203 Lead Amp',
      'Ibanez TS9 Tube Screamer (1981 original)',
      'Electro-Harmonix Deluxe Memory Man Delay',
      'Jim Dunlop Cry Baby Wah'
    ],
    influences: ['The Clash', 'Television', 'The Libertines', 'Turnstile', 'Dinosaur Jr.']
  },
  {
    id: 'dexter',
    name: 'Dexter Vance',
    nickname: 'Dex',
    role: 'Bass Guitar & Synthesizers',
    instrument: '1978 Fender Precision Bass, Ampeg SVT-CL',
    hometown: 'Sheffield',
    image: 'images/portrait-dexter.jpg',
    quote: '"The bass isn’t just backing the drums; it’s the heartbeat that keeps people moving when the world falls apart."',
    bio: 'The musical architect and engineer of the group. Dex holds a degree in sound recording and runs an analog tape repair workshop when not on tour. He provides the thundering, immovable low-end groove alongside atmospheric analog synth drones that give AFTERHOURS their cinematic weight.',
    gear: [
      '1978 Fender Precision Bass (Sunburst, heavily worn finish)',
      'Ampeg SVT-CL Classic Head with 8x10 Cabinet',
      'Darkglass Microtubes B7K Bass Preamp/Overdrive',
      'Korg MS-20 Monophonic Analog Synthesizer',
      'Boss OC-2 Octave Pedal'
    ],
    influences: ['Joy Division', 'Gang of Four', 'Fugazi', 'New Order', 'IDLES']
  },
  {
    id: 'samira',
    name: 'Samira Patel',
    nickname: 'Sam',
    role: 'Drums, Percussion & Backing Vocals',
    instrument: 'Ludwig Vistalite Clear Acrylic Kit, Zildjian K Cymbals',
    hometown: 'Bradford',
    image: 'images/portrait-samira.jpg',
    quote: '"Play every measure like the venue bouncers are about to pull the main power switch."',
    bio: 'Samira grew up drumming to punk rock, hardcore, and North Indian dhol rhythms. Her drumming is relentless, dynamic, and mathematically precise yet explosive. She drives the band’s breakneck tempos and is known for breaking at least three pairs of Vater 5B sticks per set.',
    gear: [
      'Ludwig Vistalite Clear Acrylic 4-piece Kit (22" Kick, 12" Rack, 16" Floor)',
      '14" x 6.5" Black Beauty Snare Drum',
      'Zildjian K Sweet Cymbal Pack (15" Hats, 19" Crash, 21" Ride)',
      'DW 9000 Series Double Bass Pedal',
      'Vater 5B Wood Tip Sticks'
    ],
    influences: ['Dave Grohl (Nirvana)', 'Janet Weiss (Sleater-Kinney)', 'Travis Barker', 'John Bonham']
  }
];

export const DISCOGRAPHY: Release[] = [
  {
    id: 'static-dreams-lp',
    title: 'STATIC DREAMS AT 3AM',
    type: 'LP',
    year: '2025',
    catalogNumber: 'AH-001-LP',
    coverImage: 'images/album-static-dreams.jpg',
    description: 'The monumental debut full-length album from AFTERHOURS. Recorded entirely live onto 2-inch tape at Old Chapel Studios in Leeds across ten freezing days in January. An urgent, cathartic record exploring modern disconnection, late-night transit, fleeting intimacy, and youthful defiance.',
    tracks: [
      { number: 1, title: 'Promised Land', duration: '4:00', hasDemoAudio: true, audioTrackId: 'promised-land', lyricsSnippet: "Standing on my front porch telling me I must be saved / Tell me, is this your promised land?" },
      { number: 2, title: 'Eye of a Hurricane', duration: '4:09', hasDemoAudio: true, audioTrackId: 'eye-of-a-hurricane', lyricsSnippet: "Storm clouds are rising in my chest / Standing right here in the eye of a hurricane" },
      { number: 3, title: 'After Hours', duration: '3:40', hasDemoAudio: true, audioTrackId: 'after-hours', lyricsSnippet: "I said I wouldn't be back here again / Team no sleep, after hours athlete" },
      { number: 4, title: 'The Paradox', duration: '4:04', hasDemoAudio: true, audioTrackId: 'the-paradox', lyricsSnippet: "You are resilient like a distant star / You are brilliant glowing in the growing dark" },
      { number: 5, title: 'The Hook', duration: '4:50', hasDemoAudio: true, audioTrackId: 'the-hook', lyricsSnippet: "How did we ever get so far? / How did you ever put your hook into my heart?" },
      { number: 6, title: 'Face in the Crowd', duration: '7:27', hasDemoAudio: true, audioTrackId: 'face-in-the-crowd', lyricsSnippet: "Tell my friends I'm much too proud to take you back again and be another face in the crowd" },
      { number: 7, title: 'Bleach & Leather', duration: '3:15', hasDemoAudio: false, lyricsSnippet: 'Smell of cigarettes in a thrift store coat / Every word you never spoke still caught in your throat' },
      { number: 8, title: 'The Last Bus to Nowhere', duration: '3:42', hasDemoAudio: false, lyricsSnippet: 'Empty seats on the upper deck / Rain tracing down the collar of my neck' },
      { number: 9, title: 'Broken Neon Sign', duration: '2:56', hasDemoAudio: false, lyricsSnippet: 'Letters buzzing in the dark / Leave a scar and make a mark' },
      { number: 10, title: 'Concrete Garden', duration: '4:12', hasDemoAudio: false, lyricsSnippet: 'Weeds pushing through the cracks in the street / The city hum underneath our feet' }
    ],
    credits: {
      recorded: 'Old Chapel Studios, Leeds (Engineered by Dexter Vance & Tom Miller)',
      mixed: 'The Fallout Shelter, London',
      mastered: 'Abbey Road Studios (Direct Metal Vinyl Cut)',
      artwork: 'AFTERHOURS & Studio 07 Risograph Collective'
    },
    formats: [
      { format: '180g Blood-Red Smoke Vinyl (Gatefold + 24pg Photo Zine)', status: 'Low Stock', price: '£28.00' },
      { format: 'Limited Edition Solid Red Cassette (Numbered /500)', status: 'In Stock', price: '£12.00' },
      { format: 'Digipak CD with Scratched Metallic Booklet', status: 'In Stock', price: '£14.00' },
      { format: 'Deluxe 24-Bit FLAC + Full Audio Stems Download', status: 'In Stock', price: '£10.00' }
    ]
  },
  {
    id: 'disconnected-wire-ep',
    title: 'DISCONNECTED WIRE',
    type: 'EP',
    year: '2024',
    catalogNumber: 'AH-002-EP',
    coverImage: 'images/album-disconnected-wire.jpg',
    description: 'The raw, photocopied debut EP that launched the band onto BBC Introducing and underground punk circuits. Recorded in a single weekend in a damp Leeds rehearsal basement for under £300, it captures pure, unvarnished DIY adrenaline.',
    tracks: [
      { number: 1, title: 'So Sweet (Runaway)', duration: '4:20', hasDemoAudio: true, audioTrackId: 'so-sweet', lyricsSnippet: "I can't keep up with the games that you play / But I'm in love with the chase and the taste is so sweet" },
      { number: 2, title: "Hurricane (You're to Blame)", duration: '3:06', hasDemoAudio: true, audioTrackId: 'hurricane-youre-to-blame', lyricsSnippet: "Your love is like a thunderstorm, first I'm safe and then it's gone / Your love is like a hurricane" },
      { number: 3, title: 'Living Nightmare', duration: '2:58', hasDemoAudio: true, audioTrackId: 'living-nightmare', lyricsSnippet: "I'm wide awake but you're a nightmare / Egocentric, narcissistic, and you won't go away" },
      { number: 4, title: 'Petal to the Metal', duration: '2:44', hasDemoAudio: true, audioTrackId: 'petal-to-the-metal', lyricsSnippet: "Your shirt is ripped up and your grades really suck / And you sit in your car and you never put the petal to the metal" },
      { number: 5, title: 'Firefly (Burn the Wire)', duration: '4:33', hasDemoAudio: true, audioTrackId: 'firefly', lyricsSnippet: "Mystified by this dark night, gotta rely on nocturnal sight as I ride a firefly" }
    ],
    credits: {
      recorded: 'Basement Room 4, Kirkstall Road, Leeds',
      mixed: 'Dexter Vance on a TASCAM Portastudio 424',
      mastered: 'DIY Tape Splicing',
      artwork: 'Handmade Photocopy Collage by Maya Lin'
    },
    formats: [
      { format: '7-inch Clear Lathe-Cut Vinyl with Xerox Sleeve', status: 'Sold Out', price: '£15.00' },
      { format: 'C-30 Cassette Tape with Handwritten Tracklist', status: 'Low Stock', price: '£10.00' },
      { format: 'Digital EP Download (MP3 / WAV)', status: 'In Stock', price: '£6.00' }
    ]
  }
];

export const TOUR_DATES: Gig[] = [
  {
    id: 'gig-01',
    date: 'FRI 14 NOV 2025',
    day: '14 NOV',
    city: 'Leeds',
    country: 'United Kingdom',
    region: 'UK',
    venue: 'Brudenell Social Club (Community Room)',
    doors: '19:30',
    support: 'Dead Youth Club + The Scraps',
    status: 'Sold Out',
    price: '£14.50',
    ticketUrl: '#',
    notes: 'Homecoming Headline Show. Live cassette recording on the night.'
  },
  {
    id: 'gig-02',
    date: 'SAT 15 NOV 2025',
    day: '15 NOV',
    city: 'Manchester',
    country: 'United Kingdom',
    region: 'UK',
    venue: 'The Deaf Institute (Music Hall)',
    doors: '19:00',
    support: 'Dead Youth Club',
    status: 'Low Tickets',
    price: '£15.00',
    ticketUrl: '#',
    notes: 'Under 100 tickets remaining. Strict 23:00 curfew.'
  },
  {
    id: 'gig-03',
    date: 'TUE 18 NOV 2025',
    day: '18 NOV',
    city: 'Glasgow',
    country: 'United Kingdom',
    region: 'UK',
    venue: "King Tut's Wah Wah Hut",
    doors: '20:00',
    support: 'Static Glow',
    status: 'Low Tickets',
    price: '£14.00',
    ticketUrl: '#',
    notes: 'Historic rock stage. 14+ show (under 16s with adult).'
  },
  {
    id: 'gig-04',
    date: 'THU 20 NOV 2025',
    day: '20 NOV',
    city: 'Bristol',
    country: 'United Kingdom',
    region: 'UK',
    venue: 'The Fleece',
    doors: '19:30',
    support: 'Feral Punks',
    status: 'On Sale',
    price: '£15.00',
    ticketUrl: '#',
    notes: 'Legendary subterranean brick arches.'
  },
  {
    id: 'gig-05',
    date: 'FRI 21 NOV 2025',
    day: '21 NOV',
    city: 'London',
    country: 'United Kingdom',
    region: 'UK',
    venue: 'The 100 Club (Oxford Street)',
    doors: '19:00',
    support: 'Dead Youth Club + Secret Special Guests',
    status: 'Sold Out',
    price: '£18.50',
    ticketUrl: '#',
    notes: 'Historic Oxford St punk cellar. No re-entry.'
  },
  {
    id: 'gig-06',
    date: 'SAT 22 NOV 2025',
    day: '22 NOV',
    city: 'Birmingham',
    country: 'United Kingdom',
    region: 'UK',
    venue: 'The Sunflower Lounge',
    doors: '20:00',
    support: 'Rat Trap',
    status: 'Low Tickets',
    price: '£13.50',
    ticketUrl: '#',
    notes: 'Intimate 120-cap basement sweaty set.'
  },
  {
    id: 'gig-07',
    date: 'WED 26 NOV 2025',
    day: '26 NOV',
    city: 'Dublin',
    country: 'Ireland',
    region: 'EU',
    venue: "Whelan's (Upstairs)",
    doors: '20:00',
    support: 'Silver Tides',
    status: 'On Sale',
    price: '€16.00',
    ticketUrl: '#',
    notes: 'First time playing Ireland. Irish tour exclusive merch tee available.'
  },
  {
    id: 'gig-08',
    date: 'FRI 28 NOV 2025',
    day: '28 NOV',
    city: 'Amsterdam',
    country: 'Netherlands',
    region: 'EU',
    venue: 'Paradiso (Upstairs Hall)',
    doors: '19:30',
    support: 'The Dregs (NL)',
    status: 'Low Tickets',
    price: '€18.00',
    ticketUrl: '#',
    notes: 'Weteringschans venue. Club night admission included.'
  },
  {
    id: 'gig-09',
    date: 'SUN 30 NOV 2025',
    day: '30 NOV',
    city: 'Berlin',
    country: 'Germany',
    region: 'EU',
    venue: 'SO36 (Kreuzberg)',
    doors: '20:00',
    support: 'Kaltfront (DE)',
    status: 'On Sale',
    price: '€20.00',
    ticketUrl: '#',
    notes: 'Historic Kreuzberg punk institution.'
  },
  {
    id: 'gig-10',
    date: 'TUE 02 DEC 2025',
    day: '02 DEC',
    city: 'Paris',
    country: 'France',
    region: 'EU',
    venue: 'Supersonic (Bastille)',
    doors: '19:30',
    support: 'Les Chiens Perdus',
    status: 'On Sale',
    price: 'Free / €5 Solidarité',
    ticketUrl: '#',
    notes: 'Final night of the European Tour.'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Sweatbox Basement Ritual',
    category: 'LIVE',
    imageUrl: 'images/live-gig.jpg',
    date: 'OCT 2025',
    location: 'Underground Rock Club, Manchester',
    photographer: 'Steve Halpin (35mm Ilford HP5)',
    caption: 'Maya leaning into the crowd monitor as Kieran’s guitar detonates into feedback. 200 people singing every word of "Static Dreams at 3AM".'
  },
  {
    id: 'gal-02',
    title: 'The Full AFTERHOURS Lineup',
    category: 'BACKSTAGE',
    imageUrl: 'images/band-hero.jpg',
    date: 'SEP 2025',
    location: 'Mill Backstage Corridor, Leeds',
    photographer: 'Gwen Carter (Kodak Tri-X)',
    caption: 'Maya, Kieran, Dexter, and Samira five minutes before stepping onto the stage. Battered leather, worn cords, and peeling gig posters.'
  },
  {
    id: 'gal-03',
    title: 'Maya Lin: Raw Vocal Delivery',
    category: 'BACKSTAGE',
    imageUrl: 'images/portrait-maya.jpg',
    date: 'OCT 2025',
    location: 'Green Room, Leeds',
    photographer: 'Gwen Carter (Contax T2 direct flash)',
    caption: 'Post-show dressing room portrait. Smeared eyeliner, post-gig sweat, and chipped black nails.'
  },
  {
    id: 'gal-04',
    title: 'Kieran Tuning Before Soundcheck',
    category: 'BACKSTAGE',
    imageUrl: 'images/portrait-kieran.jpg',
    date: 'OCT 2025',
    location: 'Equipment corridor beside flight cases',
    photographer: 'Gwen Carter',
    caption: 'Ren dialing in the P-90 pickup on his Gibson Les Paul Junior against the Marshall JCM800.'
  },
  {
    id: 'gal-05',
    title: 'Dexter Vance with the 1978 P-Bass',
    category: 'BACKSTAGE',
    imageUrl: 'images/portrait-dexter.jpg',
    date: 'SEP 2025',
    location: 'Soundcheck stage edge',
    photographer: 'Steve Halpin',
    caption: 'The quiet anchor. Dexter calibrating the pedalboard and dialling in the Ampeg SVT low-end.'
  },
  {
    id: 'gal-06',
    title: 'Samira Patel Behind the Acrylics',
    category: 'BACKSTAGE',
    imageUrl: 'images/portrait-samira.jpg',
    date: 'OCT 2025',
    location: 'Rehearsal Studio Room 4',
    photographer: 'Gwen Carter',
    caption: 'Sam grinning after a 160-BPM run-through of "Burn The Tape". Sticks splintered, relentless pulse.'
  },
  {
    id: 'gal-07',
    title: 'The Rehearsal Bunker',
    category: 'REHEARSAL',
    imageUrl: 'images/rehearsal-room.jpg',
    date: 'AUG 2025',
    location: 'Basement Studio, Kirkstall Road',
    photographer: 'Band Archive',
    caption: 'Where every song started. Spaghetti black audio cables, half-drunk filter coffees, handwritten chord progressions on cardboard.'
  },
  {
    id: 'gal-08',
    title: 'Official Tour Screenprint Artwork',
    category: 'ARTWORK',
    imageUrl: 'images/tour-poster.jpg',
    date: 'NOV 2025',
    location: 'Leeds Print Workshop',
    photographer: 'Studio 07 Risograph Press',
    caption: 'High-contrast risograph two-color print. Hand-pulled screenprint on 270gsm heavy French paper stock.'
  }
];

export const MERCH_ITEMS = [
  {
    id: 'merch-01',
    name: 'STATIC DREAMS Tour Tee',
    price: '£25.00',
    description: 'Heavyweight 240gsm distressed black organic cotton. Blood-red screenprint front & UK/EU tour dates on reverse.',
    badge: 'Best Seller',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    status: 'In Stock'
  },
  {
    id: 'merch-02',
    name: 'DISCONNECTED WIRE Longsleeve',
    price: '£32.00',
    description: 'Faded charcoal vintage wash with white xerox halftone band photo on chest and wire graphic down both sleeves.',
    badge: 'Limited Run',
    sizes: ['M', 'L', 'XL'],
    status: 'Low Stock'
  },
  {
    id: 'merch-03',
    name: 'AFTERHOURS Issue #01 Zine + Tape Bundle',
    price: '£18.00',
    description: '36-page A5 photocopied zine featuring unreleased 35mm tour contact sheets, diary entries, handwritten guitar tabs, plus limited cassette.',
    badge: 'Hand-Numbered',
    sizes: ['One Size'],
    status: 'In Stock'
  },
  {
    id: 'merch-04',
    name: 'Subterranean Embroidered Beanie',
    price: '£16.00',
    description: 'Ribbed black knit with blood-red embroidered AFTERHOURS stencil wordmark. Built for freezing winter tour vans.',
    badge: 'Tour Essential',
    sizes: ['One Size'],
    status: 'In Stock'
  }
];

