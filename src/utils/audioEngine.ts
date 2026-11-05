// Real Audio Player & Sound Engine for AFTERHOURS
// High-energy female-fronted heavy pop-punk and alternative rock tracks
// Searing guitars, overdriven punk bass, and relentless live drumming
// Connected to Web Audio AnalyserNode for real-time visualizer waveform rendering

export interface SongSection {
  label: string;
  time: number; // in seconds
}

export interface Track {
  id: string;
  title: string;
  album: string;
  duration: number; // in seconds
  bpm: number;
  key: string;
  year: string;
  audioSrc: string;
  vocalist: string;
  lyricsSnippet: string;
  fullLyrics: string[];
  sections: SongSection[];
  credits: string;
  description: string;
}

export const TRACKS: Track[] = [
  {
    id: 'so-sweet',
    title: 'So Sweet (Runaway)',
    album: 'Disconnected Wire (2024 EP)',
    duration: 260, // 4:20
    bpm: 224,
    key: 'A major',
    year: '2024',
    audioSrc: 'audio/so-sweet.mp3',
    vocalist: 'Maya Lin',
    lyricsSnippet: 'I can\'t keep up with the games that you play / But I\'m in love with the chase and the taste is so sweet',
    fullLyrics: [
      "I can't keep up with the games that you play",
      "You love me at night and hate me during the day",
      "I'm not one to beg or bow at your feet",
      "But I'm in love with the chase and the taste is so sweet",
      "",
      "[CHORUS]",
      "I love you, I hate you, you're all that I want!",
      "I love you, I hate you, you're all that I want!",
      "I love you, I hate you, you're all that I want!",
      "I love you, I hate you, you're all that I want!",
      "",
      "I can't keep track of the times I ask why",
      "You're stirrin' up trouble when we could survive",
      "I know you've got issues 'cause you tell me yourself",
      "But I can't point a finger 'cause we both need some help",
      "",
      "[CHORUS]",
      "I love you, I hate you, you're all that I want!",
      "I love you, I hate you, you're all that I want!",
      "I love you, I hate you, you're all that I want!",
      "I love you, I hate you, you're all that I want!",
      "",
      "[BRIDGE]",
      "This is a tragedy, you and I",
      "We've got our hearts in a terrible bind",
      "I let you so deep inside my mind",
      "I don't think I can ever say goodbye...",
      "",
      "[FINAL CHORUS & OUTRO]",
      "I love you, I hate you, you're all that I want!",
      "I love you, I hate you, you're all that I want!",
      "Taste is so sweet!"
    ],
    sections: [
      { label: 'FAST INTRO', time: 0 },
      { label: 'VERSE 1', time: 24 },
      { label: 'CHORUS', time: 48 },
      { label: 'VERSE 2', time: 82 },
      { label: 'CHORUS', time: 106 },
      { label: 'BRIDGE', time: 140 },
      { label: 'FINAL CHORUS', time: 175 },
      { label: 'PUNK OUTRO', time: 215 }
    ],
    credits: '224-BPM breakneck pop-punk track with full distorted Ibanez power chords, double-time drums, and soaring vocals.',
    description: 'Blistering heavy pop-punk anthem featuring ferocious tempo shifts, double-kick drums, and melodic teenage angst hooks.'
  },
  {
    id: 'hurricane-youre-to-blame',
    title: "Hurricane (You're to Blame)",
    album: 'Disconnected Wire (2024 EP)',
    duration: 186, // 3:06
    bpm: 172,
    key: 'G major',
    year: '2024',
    audioSrc: 'audio/your-love-is-like-a-hurricane.mp3',
    vocalist: 'Maya Lin',
    lyricsSnippet: "Your love is like a thunderstorm, first I'm safe and then it's gone / Your love is like a hurricane, you're to blame",
    fullLyrics: [
      "Your love is like a thunderstorm",
      "First I'm safe and then it's gone",
      "Lightning crashing through my veins",
      "Yeah you know how to bring me pain",
      "Your love is like a hurricane",
      "First the wind and then the rain",
      "Ya pull my hair and scream my name",
      "Yeah love's the problem, you're to blame!",
      "",
      "[CHORUS]",
      "Caught in the moment",
      "Only you can make me talk like this, act like this",
      "Caught in the moment",
      "Only you can keep my interest, just like this",
      "There's broken hearts in my wake",
      "Yeah, you've got numbers to take",
      "I don't fall in love",
      "So if love's become my problem now:",
      "You're to blame!",
      "",
      "You're the type who's never wrong",
      "You want my lips, you make them yours",
      "I can't resist you so you smile",
      "You take advantage, I don't mind",
      "So let's stay in and pull the shades",
      "Cell phones off and bed unmade",
      "Just drive me crazy for the day",
      "Yeah love's the problem, you're to blame!",
      "",
      "[CHORUS]",
      "Caught in the moment",
      "Only you can make me talk like this, act like this",
      "Caught in the moment",
      "Only you can keep my interest, just like this",
      "There's broken hearts in my wake",
      "Yeah, you've got numbers to take",
      "I don't fall in love",
      "So if love's become my problem now:",
      "You're to blame!",
      "",
      "[GUITAR SOLO & FINAL CHORUS]",
      "There's broken hearts in my wake",
      "Yeah you've got numbers to take",
      "I don't fall in love",
      "So if love's become my problem now:",
      "You're to blame!",
      "You're to blame!"
    ],
    sections: [
      { label: 'INTRO RIFF', time: 0 },
      { label: 'VERSE 1', time: 18 },
      { label: 'CHORUS', time: 44 },
      { label: 'VERSE 2', time: 72 },
      { label: 'CHORUS', time: 98 },
      { label: 'GUITAR SOLO', time: 124 },
      { label: 'OUTRO ROAR', time: 152 }
    ],
    credits: 'Blistering 172-BPM pop-punk rush featuring the identical vocalist from So Sweet, overdriven rhythm guitars, and a screaming guitar solo.',
    description: 'High-octane pop-punk rush delivered by the same powerhouse vocal performance as So Sweet, accompanied by roaring distortion and a searing guitar solo.'
  },
  {
    id: 'petal-to-the-metal',
    title: 'Petal to the Metal',
    album: 'Disconnected Wire (2024 EP)',
    duration: 164, // 2:44
    bpm: 154,
    key: 'Eb minor',
    year: '2024',
    audioSrc: 'audio/petal-to-the-metal.mp3',
    vocalist: 'Maya Lin',
    lyricsSnippet: "Your shirt is ripped up and your grades really suck / And you sit in your car and you never put the petal to the metal",
    fullLyrics: [
      "Brittle, broken",
      "These are the tokens of living in modern society",
      "Black and beaten",
      "These are the reasons the only things you trust are your own two feet",
      "So you run and you run and you run",
      "And you never seem to make it...",
      "",
      "[CHORUS]",
      "Your shirt is ripped up",
      "And your grades really suck",
      "And you'll never ever get anywhere!",
      "And you sit in your car",
      "With the front door ajar",
      "And you never put the petal to the metal!",
      "",
      "Leave this place",
      "These are not the people that will get you and feel you for being free",
      "Do it, go on!",
      "But the ties that bind are too strong",
      "And you can't leave your friends and your family on the street",
      "So you think and you think and you think",
      "And you never seem to do it...",
      "",
      "[CHORUS]",
      "And your shirt is ripped up",
      "And your grades really suck",
      "And you'll never ever get anywhere!",
      "As you sit in your car",
      "With the front door ajar",
      "And you never put the petal to the metal!",
      "",
      "[BRIDGE]",
      "You think about driving and you, you",
      "You think about flying over these roads",
      "And you think about climbing up, you, you",
      "Dreaming of running and running and never never coming home!",
      "",
      "[FINAL CHORUS & OUTRO]",
      "And your shirt is ripped up",
      "And your grades really suck",
      "And you'll never ever get anywhere!",
      "As you sit in your car",
      "With the front door ajar",
      "And you never put the petal to the metal!",
      "Put the petal to the metal!"
    ],
    sections: [
      { label: 'FAST GUITAR INTRO', time: 0 },
      { label: 'VERSE 1', time: 15 },
      { label: 'CHORUS', time: 38 },
      { label: 'VERSE 2', time: 62 },
      { label: 'CHORUS', time: 85 },
      { label: 'BRIDGE & BUILD', time: 108 },
      { label: 'FINAL PUNK CHORUS', time: 132 }
    ],
    credits: '154-BPM early-2000s angst pop-punk with driving power chords, snappy drums, and defiant lyrics.',
    description: 'Quintessential angsty teenage pop-punk anthem with blistering tempo, biting wit, and massive chorus energy.'
  },
  {
    id: 'promised-land',
    title: 'Promised Land',
    album: 'Static Dreams at 3AM (2025 LP)',
    duration: 240, // 4:00
    bpm: 162,
    key: 'E minor',
    year: '2025',
    audioSrc: 'audio/promised-land.mp3',
    vocalist: 'Maya Lin',
    lyricsSnippet: "Standing on my front porch telling me I must be saved / Tell me, is this your promised land?",
    fullLyrics: [
      "It's not your divine purpose, but the reason that you gave",
      "Standing on my front porch telling me I must be saved",
      "What did I ever do to bring on this accost?",
      "What did I ever say to make you feel you were the chosen one?",
      "",
      "[CHORUS]",
      "You march into war insisting God is on your side",
      "If this is true, then I ask why so many of your people have died?",
      "The blood of the righteous feeds the children of the damned",
      "Your god divides friends and brothers",
      "Tell me, is this your promised land?",
      "",
      "[VERSE 2]",
      "Just stop asking me if I have seen the light...",
      "Just stop asking me how do I sleep at night...",
      "Just stop telling me the way it's got to be...",
      "I'm certain that your salvation does not depend on me, depend on me!",
      "",
      "[GUITAR SOLO & FINAL CHORUS]",
      "Your god divides friends and brothers",
      "Tell me, is this your promised land?",
      "Tell me, is this your promised land?",
      "Is this your promised land?"
    ],
    sections: [
      { label: 'HEAVY INTRO', time: 0 },
      { label: 'VERSE 1', time: 22 },
      { label: 'CHORUS', time: 54 },
      { label: 'VERSE 2', time: 92 },
      { label: 'CHORUS', time: 124 },
      { label: 'VALVE GUITAR SOLO', time: 156 },
      { label: 'FINAL CRUSHING CHORUS', time: 196 }
    ],
    credits: '162-BPM power rock and punk metal arrangement by Benjamin Orth (producer of So Sweet) with soaring vocal delivery.',
    description: 'Ferocious, melodic heavy rock and power-punk anthem featuring roaring wall-of-sound guitars and explosive choruses.'
  },
  {
    id: 'living-nightmare',
    title: 'Living Nightmare',
    album: 'Disconnected Wire (2024 EP)',
    duration: 178, // 2:58
    bpm: 168,
    key: 'E minor',
    year: '2024',
    audioSrc: 'audio/living-nightmare.mp3',
    vocalist: 'Maya Lin',
    lyricsSnippet: 'I’m wide awake but you’re a nightmare / Egocentric, narcissistic, and you won’t go away',
    fullLyrics: [
      "I’m wide awake but you’re a nightmare",
      "I can’t escape, I’m seeing you everywhere",
      "Words that you say poison the air",
      "I’m wide awake but you’re my nightmare",
      "",
      "[HOOK]",
      "Egocentric!",
      "Narcissistic!",
      "And you won’t go away!",
      "",
      "You're trumpeting hate and you don’t play fair",
      "With your arrogant ways and your comb-over hair",
      "Know you’re a fake, not a billionaire",
      "No, no, I’m wide awake and you’re a nightmare!",
      "",
      "[HOOK]",
      "Egocentric!",
      "Narcissistic!",
      "And you won’t go away!",
      "",
      "Blame is your game, power your aim",
      "No stranger to shame, 'cuz they made you change your name!",
      "Won’t take the bait in your golden snare",
      "You’re known to take more than the lion’s share",
      "Keeping my faith, not your lies and despair",
      "Oh, I’m wide, wide awake and you’re a living nightmare!",
      "",
      "[OUTRO BREAKDOWN]",
      "Egocentric! Narcissistic!",
      "Sadly a certified cynic! (Geocentric)",
      "Who’s choked on a big dose of bitterness! (Fatalistic)",
      "Your bigotry is making the whole world sick! (Ethnocentric)",
      "‘Cuz you’re oh, so sadistic!",
      "And you won’t go away!",
      "But I won’t play, won’t be your prey!",
      "Go away! Won’t be your slave! Go away!"
    ],
    sections: [
      { label: 'INTRO', time: 0 },
      { label: 'VERSE 1', time: 14 },
      { label: 'HOOK', time: 35 },
      { label: 'VERSE 2', time: 52 },
      { label: 'SOLO', time: 88 },
      { label: 'CHORUS', time: 112 },
      { label: 'OUTRO', time: 142 }
    ],
    credits: 'Recorded live to 2-inch tape in Leeds. Full driving 168-BPM Paramore-style pop-punk energy with screaming guitar riffs.',
    description: 'Fast, aggressive pop-punk with driving power chords, tight snare rolls, and furious vocal delivery.'
  },
  {
    id: 'eye-of-a-hurricane',
    title: 'Eye of a Hurricane',
    album: 'Static Dreams at 3AM (2025 LP)',
    duration: 249, // 4:09
    bpm: 142,
    key: 'B minor',
    year: '2025',
    audioSrc: 'audio/eye-of-a-hurricane.mp3',
    vocalist: 'Maya Lin',
    lyricsSnippet: 'Storm clouds are rising in my chest / Standing right here in the eye of a hurricane',
    fullLyrics: [
      "Storm clouds are rising in my chest",
      "We’re all on the edge of a raging tempest",
      "The light shining now fading into nothingness",
      "But I’m fighting back with my inner stillness",
      "",
      "[CHORUS]",
      "In the eye of a hurricane!",
      "I’m standing here in the eye of a hurricane!",
      "",
      "There’s a foreboding, pending darkness",
      "The sun is absorbed by the horizon to the west",
      "The sky is so heavy but there’s a light I still possess",
      "For that I must evolve, I won’t settle for anything less!",
      "",
      "[CHORUS]",
      "In the eye of a hurricane!",
      "I’m standing here right in the eye!",
      "",
      "[BRIDGE]",
      "Night is now surrounding, surrounding me",
      "This crushing wave it is drowning, drowning me",
      "Dark night of the soul surrounding, surrounding me",
      "But I am still at peace!",
      "I’m right in the eye!",
      "",
      "[OUTRO]",
      "In the eye of a hurricane!",
      "I’m standing right here!",
      "In the eye of a hurricane!",
      "I’ll face my fear!",
      "Look me in the eye!",
      "Standing right here!"
    ],
    sections: [
      { label: 'HEAVY INTRO', time: 0 },
      { label: 'VERSE 1', time: 20 },
      { label: 'CHORUS', time: 52 },
      { label: 'VERSE 2', time: 88 },
      { label: 'CHORUS', time: 118 },
      { label: 'SOLO / BRIDGE', time: 150 },
      { label: 'OUTRO ROAR', time: 195 }
    ],
    credits: '142-BPM heavy crunchy alt-rock track recorded with dual vintage half-stacks and thundering live bass.',
    description: 'Heavy, head-banging alternative rock anthem with crushing guitar distortion and powerhouse vocal dynamics.'
  },
  {
    id: 'after-hours',
    title: 'After Hours',
    album: 'Static Dreams at 3AM (2025 LP)',
    duration: 220, // 3:40
    bpm: 122,
    key: 'A minor',
    year: '2025',
    audioSrc: 'audio/after-hours.mp3',
    vocalist: 'Maya Lin',
    lyricsSnippet: "I said I wouldn't be back here again, but here I am again / Team no sleep, after hours athlete",
    fullLyrics: [
      "I said I wouldn't be back here again",
      "But here I am again",
      "Wearing the same clothes out two nights in a row",
      "I didn't go home again",
      "",
      "Wide awake, wide awake",
      "Looking for another escape",
      "We can dance all night, come and find me",
      "These bright lights screaming: 'Go on, blind me!'",
      "Woah, woah, woah",
      "",
      "[CHORUS]",
      "Team no sleep, after hours athlete",
      "No rest for the wicked",
      "I don't want to crash, I've gotta get high fast",
      "Need somewhere to go",
      "I'm losing control, my mind's about to blow",
      "Here we go again!",
      "",
      "[MIDDLE 8 / BRIDGE]",
      "Make it stop, feeling heavy",
      "Bring me back to life",
      "Let's get drunk, make it messy",
      "Give me another line, and again and again...",
      "",
      "[FINAL CHORUS & OUTRO]",
      "Team no sleep, after hours athlete",
      "Wide awake, looking for another escape",
      "I'm losing control, my mind's about to blow",
      "Here we go again!"
    ],
    sections: [
      { label: 'INTRO', time: 0 },
      { label: 'VERSE 1', time: 18 },
      { label: 'CHORUS', time: 54 },
      { label: 'VERSE 2', time: 88 },
      { label: 'BRIDGE', time: 135 },
      { label: 'CHORUS', time: 165 },
      { label: 'OUTRO', time: 198 }
    ],
    credits: 'Guitars: Armo & Kieran Cruz. Bass: Dexter Vance. Drums: Samira Patel. Mastered at Abbey Road Studios.',
    description: 'The anthemic title track combining energetic pop-punk rhythms with soaring vocals and blistering electric guitar hooks.'
  },
  {
    id: 'the-paradox',
    title: 'The Paradox',
    album: 'Static Dreams at 3AM (2025 LP)',
    duration: 244, // 4:04
    bpm: 118,
    key: 'D minor',
    year: '2025',
    audioSrc: 'audio/the-paradox.mp3',
    vocalist: 'Maya Lin',
    lyricsSnippet: 'You are resilient like a distant star / You are brilliant glowing in the growing dark, even with a broken heart',
    fullLyrics: [
      "Swirling, overwhelmed",
      "Hyper-stimulated",
      "By a deviant spell",
      "Half the world’s been baited",
      "",
      "[CHORUS]",
      "You are resilient like a distant star",
      "You are brilliant glowing in the growing dark",
      "Even with a broken heart!",
      "",
      "Systemic urgency",
      "Running wheel of fight or flight",
      "Resist but keep your energy",
      "Balanced barefoot on a knife",
      "",
      "[CHORUS]",
      "You are resilient like a distant star",
      "You are brilliant glowing in the growing dark",
      "Even with a broken heart!",
      "Glowing in the growing dark, even with a broken heart...",
      "",
      "[BRIDGE]",
      "Caught in a paradox",
      "Cycle of indulgence and detox",
      "In a castle of dreams where the doors are all locked",
      "Climbing the ladder to the tower’s high top",
      "To be thrown from the ramparts down onto the rocks",
      "Swore I’d die for love, but God the aftershocks",
      "Slice a thousand cuts, bleeding never stops",
      "You’re broken but get up and walk!",
      "Get up and walk! Through the paradox!"
    ],
    sections: [
      { label: 'INTRO', time: 0 },
      { label: 'VERSE 1', time: 15 },
      { label: 'CHORUS', time: 42 },
      { label: 'VERSE 2', time: 78 },
      { label: 'CHORUS', time: 104 },
      { label: 'SOLO', time: 135 },
      { label: 'BRIDGE', time: 165 },
      { label: 'OUTRO', time: 205 }
    ],
    credits: 'Heavy dynamic guitars and live drum drive. Engineered by Dexter Vance at Old Chapel Studios.',
    description: 'Cathartic alternative rock anthem with crushing guitar crescendos and empowering melodic vocal hooks.'
  },
  {
    id: 'the-hook',
    title: 'The Hook',
    album: 'Static Dreams at 3AM (2025 LP)',
    duration: 290, // 4:50
    bpm: 122,
    key: 'D minor',
    year: '2025',
    audioSrc: 'audio/the-hook.mp3',
    vocalist: 'Maya Lin',
    lyricsSnippet: 'How did we ever get so far? / How did you ever put your hook into my heart?',
    fullLyrics: [
      "What made you change your mind",
      "About moving on",
      "As if we'd never met before?",
      "What made you change your mind like that?",
      "Was it something that I said?",
      "No, I've been too afraid to speak",
      "",
      "Did she call you on the phone today?",
      "Did she tell you you're alone today",
      "Like I should have done",
      "Before you hurt me so?",
      "",
      "[CHORUS]",
      "How did we ever get so far?",
      "How did you ever put your hook into my heart?",
      "How did we ever get so far?",
      "How did you ever put your hook into my heart?",
      "",
      "[BRIDGE]",
      "I used to think that your perfection was unattainable",
      "But it turns out you're just a fake!",
      "So is everything else!",
      "There's nothing for me to believe in anymore!",
      "Nothing left since you're gone!",
      "Nothing's right, nothing lasts, nothing's good!",
      "",
      "[FINAL CHORUS & OUTRO]",
      "How did we ever get so far?",
      "How did you ever put your hook into my heart?",
      "I avoid the hook and I live another day!",
      "Live to see the new morning sun!"
    ],
    sections: [
      { label: 'INTRO', time: 0 },
      { label: 'VERSE 1', time: 25 },
      { label: 'CHORUS', time: 60 },
      { label: 'VERSE 2', time: 110 },
      { label: 'CHORUS', time: 145 },
      { label: 'SOLO / BRIDGE', time: 180 },
      { label: 'OUTRO', time: 240 }
    ],
    credits: 'Guitars turned up to eleven. Heavy hard rock arrangement with saturated valve overdrive.',
    description: 'Gritty, hard-rocking anthem exploring heartbreak and betrayal with thunderous guitars and passionate vocal delivery.'
  },
  {
    id: 'firefly',
    title: 'Firefly (Burn the Wire)',
    album: 'Disconnected Wire (2024 EP)',
    duration: 273, // 4:33
    bpm: 126,
    key: 'F# minor',
    year: '2024',
    audioSrc: 'audio/firefly.mp3',
    vocalist: 'Maya Lin',
    lyricsSnippet: 'Mystified by this dark night, gotta rely on nocturnal sight as I ride a firefly',
    fullLyrics: [
      "We are so easily pacified",
      "Entertained, paralyzed by homicide",
      "Violence now on both sides, somehow justified",
      "They draw the lines, but I cannot be stratified",
      "",
      "[CHORUS]",
      "Mystified by this dark night",
      "Gotta rely on nocturnal sight",
      "Baby, I'm mystified by this dark night",
      "As I ride a firefly!",
      "",
      "Disparity intensified",
      "Amoral men banking on a great divide",
      "Impending earth change, it's still, it's still denied",
      "They lie, but I will not be satisfied!",
      "",
      "[CHORUS]",
      "Mystified by this dark night",
      "Gotta rely on nocturnal sight",
      "Baby, I'm mystified by this dark night",
      "As I ride a firefly!",
      "",
      "[BRIDGE]",
      "I'm astride a firefly",
      "Upon her back I watch us fall, I cry",
      "She and I, we shine a tiny speck of light",
      "With darkness we collide, we fight",
      "To push to find the other side!",
      "",
      "[OUTRO]",
      "This is our time!",
      "This is our time!",
      "We fight to find the other side!"
    ],
    sections: [
      { label: 'INTRO', time: 0 },
      { label: 'VERSE 1', time: 18 },
      { label: 'CHORUS', time: 45 },
      { label: 'VERSE 2', time: 76 },
      { label: 'CHORUS', time: 104 },
      { label: 'BRIDGE', time: 138 },
      { label: 'OUTRO JAM', time: 180 }
    ],
    credits: 'Recorded in Basement Studio Room 4. Live drums and gritty overdriven bass guitar.',
    description: 'Relentless riot-grrrl post-punk track with thundering bass groove and searing lead vocals.'
  },
  {
    id: 'face-in-the-crowd',
    title: 'Face in the Crowd',
    album: 'Static Dreams at 3AM (2025 LP)',
    duration: 447, // 7:27
    bpm: 132,
    key: 'G major',
    year: '2025',
    audioSrc: 'audio/face-in-the-crowd.mp3',
    vocalist: 'Maya Lin',
    lyricsSnippet: 'Playing strong when you\'re around, tell my friends I\'m much too proud to take you back again',
    fullLyrics: [
      "Seen you down there lately...",
      "Window shopping maybe?",
      "Wait for someone else to catch your eye",
      "People watching crazy",
      "Find a girl that maybe",
      "Love you half as much the way I do?",
      "",
      "Slowly my heart unwinds...",
      "",
      "[CHORUS]",
      "Keep within myself I found",
      "Cry myself to sleep out loud",
      "Must be better if you don't see me like this right now",
      "Playing strong when you're around",
      "Tell my friends I'm much too proud",
      "To take you back again",
      "And be another face in the crowd!",
      "",
      "Think about you daily",
      "And who you're with now maybe?",
      "Hate to think what you've been telling her",
      "Bet she thinks I'm crazy",
      "Facebook stalker maybe?",
      "Time to tweet the world I'm over you...",
      "But slowly my heart unwinds...",
      "",
      "[CHORUS]",
      "Keep within myself I found",
      "Cry myself to sleep out loud",
      "Must be better if you don't see me like this right now",
      "Playing strong when you're around",
      "Tell my friends I'm much too proud",
      "To take you back again",
      "And be another face in the crowd!"
    ],
    sections: [
      { label: 'INTRO', time: 0 },
      { label: 'VERSE 1', time: 22 },
      { label: 'PRE-CHORUS', time: 48 },
      { label: 'CHORUS', time: 64 },
      { label: 'VERSE 2', time: 108 },
      { label: 'CHORUS', time: 146 },
      { label: 'SOLO / JAM', time: 190 },
      { label: 'OUTRO', time: 280 }
    ],
    credits: '132-BPM driving pop-punk ballad with punchy rhythm section and emotive lead vocals.',
    description: 'Bittersweet and dynamic pop-punk anthem exploring modern teenage angst, pride, and unresolved heartbreak.'
  }
];

export interface AudioEngineState {
  isPlaying: boolean;
  currentTrack: Track;
  playbackTime: number;
  duration: number;
  bufferedTime: number;
  volume: number;
}

export function resolveAudioUrl(src: string): string {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  const cleanSrc = src.replace(/^\.?\//, '');
  const base = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanSrc}`;
}

class RockAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private currentTrack: Track = TRACKS[0];
  private playbackTime: number = 0;
  private duration: number = TRACKS[0].duration;
  private bufferedTime: number = 0;
  private volume: number = 0.85;
  private listeners: Set<() => void> = new Set();
  private isAudioInitialized: boolean = false;
  private pendingPlayPromise: Promise<void> | null = null;

  constructor() {
    // Audio element is initialized on demand upon user interaction
  }

  private initAudio(): HTMLAudioElement {
    if (this.audio && this.isAudioInitialized) {
      return this.audio;
    }

    try {
      this.audio = new Audio();
      this.audio.preload = 'auto';
      this.audio.volume = this.volume;
      this.audio.src = resolveAudioUrl(this.currentTrack.audioSrc);

      this.audio.addEventListener('timeupdate', () => {
        if (this.audio) {
          this.playbackTime = this.audio.currentTime;
          if (this.audio.duration && !isNaN(this.audio.duration) && isFinite(this.audio.duration)) {
            this.duration = this.audio.duration;
          }
          if (this.audio.buffered && this.audio.buffered.length > 0) {
            this.bufferedTime = this.audio.buffered.end(this.audio.buffered.length - 1);
          }
          this.notify();
        }
      });

      this.audio.addEventListener('progress', () => {
        if (this.audio && this.audio.buffered && this.audio.buffered.length > 0) {
          this.bufferedTime = this.audio.buffered.end(this.audio.buffered.length - 1);
          this.notify();
        }
      });

      this.audio.addEventListener('durationchange', () => {
        if (this.audio && this.audio.duration && !isNaN(this.audio.duration) && isFinite(this.audio.duration)) {
          this.duration = this.audio.duration;
          this.notify();
        }
      });

      this.audio.addEventListener('ended', () => {
        this.nextTrack();
      });

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('Audio element notice:', e);
      });

      this.isAudioInitialized = true;
      return this.audio;
    } catch (err) {
      console.error('Failed to initialize audio element:', err);
      throw err;
    }
  }

  public async play(track?: Track): Promise<void> {
    const audio = this.initAudio();

    // If switching to a different track
    if (track && track.id !== this.currentTrack.id) {
      this.currentTrack = track;
      this.playbackTime = 0;
      this.duration = track.duration;
      this.bufferedTime = 0;

      // Wait for any pending play to settle before reassigning source
      if (this.pendingPlayPromise) {
        try {
          await this.pendingPlayPromise;
        } catch {
          // Ignore aborted promises
        }
      }

      audio.pause();
      audio.src = resolveAudioUrl(track.audioSrc);
      audio.currentTime = 0;
      audio.load();
    }

    try {
      this.pendingPlayPromise = audio.play();
      await this.pendingPlayPromise;
      this.isPlaying = true;
      this.notify();
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        console.warn('Audio playback note:', err);
      }
      this.isPlaying = !audio.paused;
      this.notify();
    } finally {
      this.pendingPlayPromise = null;
    }
  }

  public async pause(): Promise<void> {
    if (!this.audio) return;
    if (this.pendingPlayPromise) {
      try {
        await this.pendingPlayPromise;
      } catch {
        // Ignore aborted promises
      }
    }
    this.audio.pause();
    this.isPlaying = false;
    this.notify();
  }

  public async togglePlay(track?: Track): Promise<void> {
    const audio = this.initAudio();

    // If a different track is clicked, switch and play it
    if (track && track.id !== this.currentTrack.id) {
      await this.play(track);
      return;
    }

    // Toggle current track
    if (this.isPlaying || (!audio.paused && audio.currentTime > 0)) {
      await this.pause();
    } else {
      await this.play();
    }
  }

  public seek(seconds: number): void {
    const audio = this.initAudio();
    const targetDuration = this.duration || this.currentTrack.duration;
    const clamped = Math.max(0, Math.min(seconds, targetDuration));
    this.playbackTime = clamped;
    try {
      audio.currentTime = clamped;
    } catch (e) {
      console.warn('Seek error:', e);
    }
    this.notify();
  }

  public setVolume(val: number): void {
    const audio = this.initAudio();
    this.volume = Math.max(0, Math.min(1, val));
    audio.volume = this.volume;
    this.notify();
  }

  public async nextTrack(): Promise<void> {
    const currentIndex = TRACKS.findIndex((t) => t.id === this.currentTrack.id);
    const nextIndex = (currentIndex + 1) % TRACKS.length;
    await this.play(TRACKS[nextIndex]);
  }

  public async prevTrack(): Promise<void> {
    const currentIndex = TRACKS.findIndex((t) => t.id === this.currentTrack.id);
    const prevIndex = (currentIndex - 1 + TRACKS.length) % TRACKS.length;
    await this.play(TRACKS[prevIndex]);
  }

  public async selectTrack(track: Track): Promise<void> {
    await this.play(track);
  }

  public getState(): AudioEngineState {
    return {
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack,
      playbackTime: this.playbackTime,
      duration: this.duration || this.currentTrack.duration,
      bufferedTime: this.bufferedTime,
      volume: this.volume,
    };
  }

  public getVisualizerData(dataArray: Uint8Array): void {
    if (!this.isPlaying) {
      // Gentle decaying baseline when paused
      for (let i = 0; i < dataArray.length; i++) {
        dataArray[i] = Math.max(0, dataArray[i] * 0.85);
      }
      return;
    }

    // Procedural energetic rock spectrum (heavy bass 0-4, punchy mids 5-11, sizzling highs 12-15)
    const t = Date.now() / 120;
    const bpm = this.currentTrack.bpm || 160;
    const beat = (Date.now() / (60000 / bpm)) * Math.PI * 2;

    for (let i = 0; i < dataArray.length; i++) {
      const freqFactor = (16 - i) / 16;
      const kickPulse = Math.pow(Math.max(0, Math.sin(beat)), 4) * 220 * (i < 4 ? 1.0 : 0.4);
      const snareSnap = Math.pow(Math.max(0, Math.sin(beat + Math.PI)), 6) * 190 * (i >= 3 && i <= 8 ? 1.0 : 0.3);
      const guitarRiff = (Math.sin(t * 1.8 + i * 0.7) * 0.5 + 0.5) * 140 * freqFactor;
      const hihatHiss = (Math.random() * 80 + 40) * (i >= 10 ? 1.0 : 0.2);

      const combined = Math.min(255, Math.max(15, kickPulse + snareSnap + guitarRiff + hihatHiss));
      dataArray[i] = Math.floor(combined);
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((cb) => cb());
  }
}

export const audioEngine = new RockAudioEngine();
