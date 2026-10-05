import { Movie, Cinema, Showtime, ConcessionItem, SeatTier } from '../types/cinema';

// Local generated image assets
import heroCinemaImg from '../assets/images/hero_cinema_hall_1791180895996.jpg';
import chronoPosterImg from '../assets/images/poster_chrono_horizon_1791180908690.jpg';
import empirePosterImg from '../assets/images/poster_empire_embers_1791180927550.jpg';

export { heroCinemaImg, chronoPosterImg, empirePosterImg };

export const MOVIES: Movie[] = [
  // 1. Hollywood / USA - Sci-Fi Space Odyssey
  {
    id: 'chrono-horizon',
    title: 'Chrono Horizon: Beyond Event',
    tagline: 'Time was our ally. Now it is the ultimate abyss.',
    rating: 9.3,
    ageRating: 'PG-13',
    duration: 164,
    genres: ['Sci-Fi', 'Cosmic Adventure', 'Thriller'],
    releaseDate: '2026-09-18',
    posterUrl: chronoPosterImg,
    backdropUrl: heroCinemaImg,
    director: 'Christopher Vance',
    cast: ['Christian Sterling', 'Elena Rostova', 'Kenji Sato', 'Amara Bell'],
    synopsis: 'When an uncharted gravitational anomaly tears through the outer solar orbit, an elite crew of temporal astrophysicists ventures beyond the relativistic threshold to rescue humanity\'s stranded pioneer vessel, uncovering a secret that rewrites cosmological time.',
    formats: ['IMAX Laser', 'Dolby Atmos', '4DX Motion'],
    moodTags: ['Mind-Bending', 'Visual Spectacle', 'Epic Immersion'],
    language: 'English (Atmos 7.1.4)',
    country: 'United States',
    countryFlag: '🇺🇸',
    region: 'North America',
    originalLanguage: 'English',
    subtitles: ['Spanish', 'French', 'Japanese', 'Hindi', 'German'],
    dubbedLanguages: ['Spanish', 'French', 'German'],
    trailerYoutubeId: 'd96cjJhvlMA',
    badge: 'Worldwide Blockbuster',
    festivalAward: 'Academy Award VFX Frontrunner'
  },

  // 2. India / Bollywood & Pan-India - Mythological Action Spectacle
  {
    id: 'agnipath-solar-sovereign',
    title: 'Agnipath: The Solar Sovereign',
    tagline: 'When destinies burn, a warrior rises from the sun’s core.',
    rating: 9.4,
    ageRating: 'PG-13',
    duration: 178,
    genres: ['Action', 'Mythological Epic', 'Drama'],
    releaseDate: '2026-10-02',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80',
    director: 'S. S. Varma',
    cast: ['Ram Charan Dev', 'Deepika Padukone', 'Jr. Vikram', 'Nasser'],
    synopsis: 'Set across ancient kingdoms and celestial battlegrounds, an exiled commander rallies divided provinces against an invincible tyrant wielding forbidden solar alchemy in an awe-inspiring spectacle of music, thunderous action, and honor.',
    formats: ['IMAX Laser', 'Dolby Atmos'],
    moodTags: ['Adrenaline Rush', 'Visual Spectacle', 'Epic Immersion'],
    language: 'Hindi / Telugu (Dolby Atmos)',
    country: 'India',
    countryFlag: '🇮🇳',
    region: 'India & South Asia',
    originalLanguage: 'Telugu / Hindi',
    subtitles: ['English', 'French', 'Arabic', 'Japanese'],
    dubbedLanguages: ['Hindi', 'Tamil', 'Malayalam', 'English'],
    trailerYoutubeId: 'KUpwupYj_t8',
    badge: '#1 Global Trending',
    festivalAward: 'Pan-India Box Office Record'
  },

  // 3. Japan - Anime Cinematic Masterpiece
  {
    id: 'spirits-mist-valley',
    title: 'Spirits of the Mist Valley (霧の谷の精霊)',
    tagline: 'Beyond the clouds, forgotten deities still remember our names.',
    rating: 9.5,
    ageRating: 'PG',
    duration: 124,
    genres: ['Animation', 'Fantasy', 'Adventure'],
    releaseDate: '2026-09-15',
    posterUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80',
    director: 'Makoto Shinkai Studio',
    cast: ['Nana Mori (Voice)', 'Ryunosuke Kamiki (Voice)', 'Ken Watanabe'],
    synopsis: 'High in the mist-veiled peaks of Nagano, a high-school cartographer discovers a hidden shrine that opens a celestial gateway between mortal seasons and ancestral wind spirits, culminating in a visually stunning journey through the skies.',
    formats: ['Dolby Atmos', 'IMAX Laser'],
    moodTags: ['Feel Good', 'Visual Spectacle', 'Family Outing'],
    language: 'Japanese (Subtitled)',
    country: 'Japan',
    countryFlag: '🇯🇵',
    region: 'East Asia',
    originalLanguage: 'Japanese',
    subtitles: ['English', 'French', 'Spanish', 'Korean', 'Mandarin'],
    dubbedLanguages: ['English', 'Spanish', 'French'],
    trailerYoutubeId: 'xU47nhruN-Q',
    badge: 'Tokyo Grand Prix Winner',
    festivalAward: 'Venice Film Festival Golden Lion Nominee'
  },

  // 4. South Korea - High Stakes K-Thriller
  {
    id: 'seoul-redline',
    title: 'Seoul Redline (서울 레드라인)',
    tagline: 'In the shadows of Gangnam, truth is the most lethal contraband.',
    rating: 9.1,
    ageRating: 'R',
    duration: 136,
    genres: ['Crime', 'Cyber-Noir', 'Thriller'],
    releaseDate: '2026-09-28',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1600&auto=format&fit=crop&q=80',
    director: 'Park Chan-wook',
    cast: ['Song Kang-ho', 'Bae Doona', 'Wi Ha-jun', 'Han So-hee'],
    synopsis: 'During a citywide blackout that paralyzes Seoul’s digital hyper-infrastructure, an undercover narcotics detective and an elite counter-surveillance hacker form a desperate alliance to stop a rogue financial syndicate before dawn.',
    formats: ['Dolby Atmos', 'Standard 4K'],
    moodTags: ['Dark Thriller', 'Adrenaline Rush', 'Mind-Bending'],
    language: 'Korean (Dolby Atmos)',
    country: 'South Korea',
    countryFlag: '🇰🇷',
    region: 'East Asia',
    originalLanguage: 'Korean',
    subtitles: ['English', 'Japanese', 'French', 'Spanish', 'German'],
    dubbedLanguages: ['English'],
    trailerYoutubeId: 'vM-Bja2Gy04',
    badge: 'Busan Film Festival Selection',
    festivalAward: 'Cannes Best Director Award'
  },

  // 5. France / Europe - Parisian Romance & Drama
  {
    id: 'whispers-of-autumn',
    title: 'Whispers of the Golden Hour (Murmures d\'Automne)',
    tagline: 'Some encounters are written in the autumn leaves of Montmartre.',
    rating: 8.8,
    ageRating: 'PG',
    duration: 112,
    genres: ['Romance', 'Drama', 'Indie'],
    releaseDate: '2026-09-30',
    posterUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&auto=format&fit=crop&q=80',
    director: 'Celine Moreau',
    cast: ['Camille Razat', 'Lucas Hedges', 'Bill Nighy', 'Nathalie Baye'],
    synopsis: 'Two vintage book restorers in the bohemian Montmartre district of Paris find an unsent wartime correspondence hidden in the binding of an 18th-century atlas, initiating an intimate journey through forgotten histories.',
    formats: ['Dolby Atmos', 'Standard 4K'],
    moodTags: ['Date Night', 'Heartfelt Indie', 'Feel Good'],
    language: 'French / English (Subtitled)',
    country: 'France',
    countryFlag: '🇫🇷',
    region: 'Europe',
    originalLanguage: 'French',
    subtitles: ['English', 'German', 'Italian', 'Spanish', 'Japanese'],
    dubbedLanguages: ['English'],
    trailerYoutubeId: '7TavVZMewpY',
    badge: 'Cannes Palme d\'Or Nominee',
    festivalAward: 'Cannes Film Festival Official Selection'
  },

  // 6. United Kingdom / Europe - Medieval Fantasy Epic
  {
    id: 'empire-of-embers',
    title: 'Empire of Embers',
    tagline: 'Heavy lies the crown forged in dragonflame.',
    rating: 8.9,
    ageRating: 'R',
    duration: 152,
    genres: ['Fantasy', 'Action', 'Drama'],
    releaseDate: '2026-09-25',
    posterUrl: empirePosterImg,
    backdropUrl: heroCinemaImg,
    director: 'Guillermo De La Torre',
    cast: ['Seraphina Locke', 'Mads Vane', 'Gwendoline Cruz', 'Liam Haddon'],
    synopsis: 'Amidst volcanic winter and collapsing feudal dynasties, a disavowed heir must claim the cursed Sunken Throne before primordial subterranean behemoths incinerate the final surviving kingdom.',
    formats: ['IMAX Laser', 'Dolby Atmos'],
    moodTags: ['Dark Thriller', 'Visual Spectacle', 'Epic Immersion'],
    language: 'English (Dolby Atmos)',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    region: 'Europe',
    originalLanguage: 'English',
    subtitles: ['French', 'Spanish', 'German', 'Italian', 'Japanese'],
    dubbedLanguages: ['German', 'French', 'Italian'],
    trailerYoutubeId: 'waygJj87_gQ',
    badge: 'Trending Across Europe',
    festivalAward: 'BAFTA Nominee for Best Cinematography'
  },

  // 7. Latin America - Mexico & Colombia
  {
    id: 'cielo-de-fuego',
    title: 'Cielo de Fuego (Sky of Fire)',
    tagline: 'When the mountain awakens, so do the old gods.',
    rating: 9.0,
    ageRating: 'PG-13',
    duration: 130,
    genres: ['Adventure', 'Magical Realism', 'Mystery'],
    releaseDate: '2026-10-01',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    director: 'Alejandro G. Bernal',
    cast: ['Tenoch Huerta', 'Paulina Gaitan', 'Diego Luna', 'Karla Souza'],
    synopsis: 'In the emerald cloud forests of Oaxaca, an indigenous volcanologist traces an anomalous seismic frequency to an underground labyrinth where ancient jade relics begin resonating with celestial constellations.',
    formats: ['Dolby Atmos', 'Standard 4K'],
    moodTags: ['Visual Spectacle', 'Mind-Bending', 'Epic Immersion'],
    language: 'Spanish (English Subtitles)',
    country: 'Mexico',
    countryFlag: '🇲🇽',
    region: 'Latin America',
    originalLanguage: 'Spanish',
    subtitles: ['English', 'Portuguese', 'French', 'German'],
    dubbedLanguages: ['English', 'Portuguese'],
    trailerYoutubeId: 'jNQXAC9IVRw',
    badge: 'Guadalajara Film Festival Winner',
    festivalAward: 'Ariel Award for Best Director'
  },

  // 8. Middle East - Desert Epic
  {
    id: 'mirage-of-oasis',
    title: 'Mirage of the Silk Sands (سراب الرمال)',
    tagline: 'In the eternal dunes, legends never die.',
    rating: 9.2,
    ageRating: 'PG-13',
    duration: 145,
    genres: ['Historical Epic', 'Action', 'Drama'],
    releaseDate: '2026-09-22',
    posterUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1600&auto=format&fit=crop&q=80',
    director: 'Hany Abu-Assad',
    cast: ['Amr Waked', 'Nadine Labaki', 'Tahar Rahim', 'Alexander Siddig'],
    synopsis: 'A sweeping saga following an ancient desert caravan protecting the legendary astronomical charts of Alexandria across the Rub\' al Khali dunes amidst political intrigue and desert storms.',
    formats: ['IMAX Laser', 'Dolby Atmos'],
    moodTags: ['Visual Spectacle', 'Epic Immersion'],
    language: 'Arabic / English (Subtitled)',
    country: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    region: 'Middle East',
    originalLanguage: 'Arabic',
    subtitles: ['English', 'French', 'Hindi', 'German', 'Spanish'],
    dubbedLanguages: ['English', 'French'],
    trailerYoutubeId: 'waygJj87_gQ',
    badge: 'Red Sea Film Festival Gala',
    festivalAward: 'Best Production Design Award'
  },

  // 9. USA - Cyber-Noir Espionage
  {
    id: 'midnight-protocol',
    title: 'Midnight Protocol: Zero Hour',
    tagline: 'In a city wired with surveillance, privacy is a weapon.',
    rating: 8.8,
    ageRating: 'R',
    duration: 128,
    genres: ['Cyber-Noir', 'Espionage', 'Thriller'],
    releaseDate: '2026-10-01',
    posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600&auto=format&fit=crop&q=80',
    director: 'Rachel K. Lin',
    cast: ['Marcus Cole', 'Naomi Zhang', 'Alexander Ward', 'Chloe Bennett'],
    synopsis: 'A former intelligence cryptographer discovers an algorithmic phantom executing preemptive political assassinations. Racing against quantum security drones, she has 48 hours to breach the central firewall.',
    formats: ['Dolby Atmos', 'ScreenX 270°', 'Standard 4K'],
    moodTags: ['Adrenaline Rush', 'Dark Thriller', 'Mind-Bending'],
    language: 'English (Dolby Atmos)',
    country: 'United States',
    countryFlag: '🇺🇸',
    region: 'North America',
    originalLanguage: 'English',
    subtitles: ['Spanish', 'French', 'Japanese', 'Korean'],
    dubbedLanguages: ['Spanish'],
    trailerYoutubeId: 'vM-Bja2Gy04',
    badge: 'Critically Acclaimed'
  },

  // 10. USA / 4DX - High Octane Action
  {
    id: 'neon-velocity',
    title: 'Neon Velocity: Apex Shift',
    tagline: 'Speed has no speed limit in the underground.',
    rating: 8.5,
    ageRating: 'PG-13',
    duration: 122,
    genres: ['Action', 'Crime', 'Speed Thriller'],
    releaseDate: '2026-10-02',
    posterUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1600&auto=format&fit=crop&q=80',
    director: 'Dominic Zhao',
    cast: ['Tyrese Gibson', 'Sora Tanaka', 'Eva Mendes', 'Cole Hauser'],
    synopsis: 'High-octane underground hypercar duelists hijack advanced prototype vehicles across neon suspension bridges, evading autonomous police interceptors in a race for survival.',
    formats: ['4DX Motion', 'IMAX Laser', 'Dolby Atmos'],
    moodTags: ['Adrenaline Rush', 'Visual Spectacle'],
    language: 'English (Dolby Atmos)',
    country: 'United States',
    countryFlag: '🇺🇸',
    region: 'North America',
    originalLanguage: 'English',
    subtitles: ['Spanish', 'French', 'Japanese', 'German'],
    dubbedLanguages: ['Spanish', 'French'],
    trailerYoutubeId: '2LqzF5WauAw',
    badge: '4DX Motion Experience'
  }
];

export const CINEMAS: Cinema[] = [
  // 1. New York City, USA
  {
    id: 'lumiere-ny',
    name: 'Lumière Grand IMAX & Atmos — New York',
    city: 'New York City',
    country: 'United States',
    countryFlag: '🇺🇸',
    neighborhood: 'Times Square & Broadway',
    address: '1540 Broadway, New York, NY 10036',
    distance: '0.4 miles from Times Sq',
    currency: 'USD',
    currencySymbol: '$',
    currencyRate: 1.0,
    amenities: [
      '70mm IMAX Laser Dual-4K (80ft Screen)',
      'Dolby Atmos 64-Channel Spatial Audio',
      'VIP Heated Recliner Lounges',
      'Manhattan Rooftop Lounge & Bar',
      'Underground Valet Parking'
    ],
    auditoriums: [
      {
        id: 'aud-ny-imax',
        name: 'Screen 1 — Grand Broadway IMAX',
        format: 'IMAX Laser',
        screenType: 'Curved 80ft Laser Projection',
        soundSystem: 'IMAX 12-Channel Immersive'
      },
      {
        id: 'aud-ny-atmos',
        name: 'Screen 2 — Dolby Signature Hall',
        format: 'Dolby Atmos',
        screenType: 'Dolby Vision HDR Screen',
        soundSystem: 'Dolby Atmos 64-Channel Spatial'
      }
    ]
  },

  // 2. London, UK
  {
    id: 'lumiere-london',
    name: 'Lumière Odeon Laser — London',
    city: 'London',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    neighborhood: 'Leicester Square, West End',
    address: '24-26 Leicester Square, London WC2H 7LQ',
    distance: 'West End Theatreland',
    currency: 'GBP',
    currencySymbol: '£',
    currencyRate: 0.80,
    amenities: [
      'Royal Circle VIP Leather Chaises',
      'Dolby Cinema Dual Laser HDR',
      'Cocktail Bar & Afternoon Tea Concessions',
      'ScreenX 270° Panoramic Wings'
    ],
    auditoriums: [
      {
        id: 'aud-ldn-1',
        name: 'The Royal Auditorium — Dolby Vision',
        format: 'Dolby Atmos',
        screenType: 'Dolby Vision Dual Laser',
        soundSystem: 'Dolby Atmos 64-Channel Spatial'
      }
    ]
  },

  // 3. Tokyo, Japan
  {
    id: 'lumiere-tokyo',
    name: 'Lumière Shibuya Sky & 4DX — Tokyo',
    city: 'Tokyo',
    country: 'Japan',
    countryFlag: '🇯🇵',
    neighborhood: 'Shibuya Scramble Crossing',
    address: '2-24-12 Shibuya, Shibuya City, Tokyo 150-0002',
    distance: 'Direct Link Shibuya Station',
    currency: 'JPY',
    currencySymbol: '¥',
    currencyRate: 155.0,
    amenities: [
      '4DX Environmental Motion Seats',
      'IMAX Laser with Japanese Subs & English Audio',
      'Matcha & Wagashi Gourmet Cinema Bar',
      'Bilingual Ticketing Service'
    ],
    auditoriums: [
      {
        id: 'aud-tky-1',
        name: 'Screen 1 — Shibuya IMAX Laser',
        format: 'IMAX Laser',
        screenType: 'Ultra-High Gain Laser Curved Screen',
        soundSystem: 'IMAX 12-Channel Immersive'
      },
      {
        id: 'aud-tky-4dx',
        name: 'Screen 2 — 4DX Motion Matrix',
        format: '4DX Motion',
        screenType: 'Environmental Sensory Hall',
        soundSystem: 'Sub-Floor Dynamic Bass'
      }
    ]
  },

  // 4. Mumbai, India
  {
    id: 'lumiere-mumbai',
    name: 'Lumière PVR Grand IMAX — Mumbai',
    city: 'Mumbai',
    country: 'India',
    countryFlag: '🇮🇳',
    neighborhood: 'Bandra West, BKC',
    address: 'G Block, Bandra Kurla Complex, Mumbai, MH 400051',
    distance: 'BKC Cultural District',
    currency: 'INR',
    currencySymbol: '₹',
    currencyRate: 85.0,
    amenities: [
      'Largest IMAX Screen in Western India',
      'Royal Butler Dine-in Service',
      'Truffle Makhana & Chaat Bar',
      'Heated Italian Leather Recliners'
    ],
    auditoriums: [
      {
        id: 'aud-bom-1',
        name: 'Auditorium 1 — Bharat IMAX Laser',
        format: 'IMAX Laser',
        screenType: 'IMAX Laser Commercial 4K',
        soundSystem: 'IMAX 12-Channel Spatial'
      }
    ]
  },

  // 5. Paris, France
  {
    id: 'lumiere-paris',
    name: 'Lumière Champs-Élysées — Paris',
    city: 'Paris',
    country: 'France',
    countryFlag: '🇫🇷',
    neighborhood: '8ème Arrondissement',
    address: '84 Avenue des Champs-Élysées, 75008 Paris',
    distance: 'Near Arc de Triomphe',
    currency: 'EUR',
    currencySymbol: '€',
    currencyRate: 0.92,
    amenities: [
      'Art-Déco Historic Cinema Hall',
      'French Champagne & Macaron Concession Bar',
      'Dolby Atmos Spatial Audio Calibration',
      'Original Version (VOST) with Multi-language Subs'
    ],
    auditoriums: [
      {
        id: 'aud-par-1',
        name: 'Salle Grand Écran — Dolby Atmos',
        format: 'Dolby Atmos',
        screenType: 'Perforated Silver Screen 4K',
        soundSystem: 'Dolby Atmos 64-Channel Spatial'
      }
    ]
  },

  // 6. Dubai, UAE
  {
    id: 'lumiere-dubai',
    name: 'Lumière Marina Panoramic — Dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    neighborhood: 'Downtown Dubai & Marina',
    address: 'Sheikh Mohammed bin Rashid Blvd, Downtown Dubai',
    distance: 'Adjacent to Dubai Mall',
    currency: 'AED',
    currencySymbol: 'AED ',
    currencyRate: 3.67,
    amenities: [
      'Ultra-VIP Royal Chaise Suites',
      'ScreenX 270° Panoramic Screen',
      'Gold Class In-Seat Gourmet Dining',
      'Chilled Rosewater & Pistachio Confections'
    ],
    auditoriums: [
      {
        id: 'aud-dxb-1',
        name: 'Hall 1 — Burj Laser Suite',
        format: 'IMAX Laser',
        screenType: 'Laser Curved Panoramic Screen',
        soundSystem: 'Dolby Atmos 64-Channel Spatial'
      }
    ]
  }
];

export const CONCESSIONS: ConcessionItem[] = [
  {
    id: 'truffle-popcorn',
    name: 'Truffle Butter Warm Popcorn',
    category: 'Popcorn',
    description: 'Freshly popped jumbo kernels tossed in white truffle oil, cultured French butter, and Maldon sea salt flakes.',
    price: 9.50,
    calories: '420 kcal',
    imageEmoji: '🍿',
    popular: true
  },
  {
    id: 'caramel-crunch-popcorn',
    name: 'Artisan Salted Caramel Popcorn',
    category: 'Popcorn',
    description: 'Slow-copper-kettle cooked with rich Madagascar vanilla caramel and pink Himalayan salt.',
    price: 8.75,
    calories: '490 kcal',
    imageEmoji: '🍿'
  },
  {
    id: 'nachos-grande',
    name: 'Lumière Artisan Nachos Grande',
    category: 'Snacks',
    description: 'Stone-ground blue & yellow corn crisps with warm smoked queso, charred jalapeños, and fresh pico de gallo.',
    price: 11.25,
    calories: '610 kcal',
    imageEmoji: '🧀',
    popular: true
  },
  {
    id: 'choc-pretzel-bites',
    name: 'Belgian Dark Chocolate Pretzel Bites',
    category: 'Snacks',
    description: 'Crispy sea-salted Bavarian pretzel nuggets enrobed in 70% Belgian dark chocolate.',
    price: 7.50,
    calories: '380 kcal',
    imageEmoji: '🥨'
  },
  {
    id: 'cinema-combo-duo',
    name: 'Cinema Lovers Duo Combo',
    category: 'Combos',
    description: '1 Large Gourmet Popcorn + 2 Large Fountain Sodas or Sparkling Craft Drinks + 1 Shareable Sweet Box.',
    price: 19.99,
    calories: '890 kcal total',
    imageEmoji: '🎬',
    popular: true
  },
  {
    id: 'craft-soda-berry',
    name: 'Sparkling Wild Berry Craft Soda',
    category: 'Beverages',
    description: 'House-made sparkling soda infused with mountain blackberries, mint essence, and cane sugar.',
    price: 6.25,
    calories: '140 kcal',
    imageEmoji: '🥤'
  },
  {
    id: 'cold-brew-nitro',
    name: 'Nitro Reserve Cold Brew Coffee',
    category: 'Beverages',
    description: 'Single-origin Ethiopian cold brew charged with nitrogen for a silky, creamy cascading head.',
    price: 6.50,
    calories: '5 kcal',
    imageEmoji: '☕'
  },
  {
    id: 'haagen-dazs-pint',
    name: 'Häagen-Dazs Sea Salt Caramel Cup',
    category: 'Desserts',
    description: 'Velvety sweet cream ice cream swirled with ribbons of rich golden caramel sauce.',
    price: 7.75,
    calories: '360 kcal',
    imageEmoji: '🍨'
  }
];

// Helper to generate dynamic dates
export const getAvailableDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    dates.push({ dateStr, dayName, formattedDate });
  }
  return dates;
};

// Generate showtimes dynamically for any movie & date
export const generateShowtimes = (movieId: string, cinemaId: string, date: string): Showtime[] => {
  const times = ['11:45', '14:30', '17:15', '19:45', '21:30', '23:00'];
  const formats: ('IMAX Laser' | 'Dolby Atmos' | '4DX Motion' | 'Standard 4K')[] = [
    'IMAX Laser',
    'Dolby Atmos',
    'IMAX Laser',
    'Dolby Atmos',
    '4DX Motion',
    'Standard 4K'
  ];

  return times.map((time, idx) => {
    // Generate realistic occupied seats based on time
    const occupiedSeats: string[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'];
    
    // Seed deterministically based on movie, cinema, date, time
    const seed = (movieId.length + cinemaId.length + date.length + time.charCodeAt(0) + idx * 7);
    
    rows.forEach((row, rIdx) => {
      const seatsInRow = 12;
      for (let s = 1; s <= seatsInRow; s++) {
        // Center seats are more likely to be occupied
        const isCenter = s >= 4 && s <= 9;
        const probability = isCenter ? 0.45 : 0.25;
        const hash = Math.sin(seed * (rIdx + 1) * s) * 10000;
        if (hash - Math.floor(hash) < probability) {
          occupiedSeats.push(`${row}-${s}`);
        }
      }
    });

    return {
      id: `${movieId}-${cinemaId}-${date}-${time}`,
      movieId,
      cinemaId,
      auditoriumName: idx % 2 === 0 ? 'Auditorium 1 — Grand IMAX' : 'Auditorium 2 — Dolby Atmos',
      format: formats[idx % formats.length],
      date,
      time,
      priceMultiplier: idx >= 3 ? 1.15 : 1.0, // prime evening hours
      seatsOccupied: occupiedSeats
    };
  });
};

// Seat matrix layout builder (Rows A to J, 12 seats per row)
// A-B: VIP Recliner ($24)
// C-F: Premium Lounge ($18.50)
// G-J: Standard Reserved ($13.50)
// Row J seat 1 & 12: Accessible ($13.50)
export const buildAuditoriumSeats = (occupiedIds: string[] = []): { row: string; seats: { id: string; row: string; number: number; tier: 'standard' | 'premium' | 'vip' | 'accessible'; price: number; status: 'available' | 'occupied'; }[] }[] => {
  const rows = [
    { row: 'A', tier: 'vip' as const, price: 24.00 },
    { row: 'B', tier: 'vip' as const, price: 24.00 },
    { row: 'C', tier: 'premium' as const, price: 18.50 },
    { row: 'D', tier: 'premium' as const, price: 18.50 },
    { row: 'E', tier: 'premium' as const, price: 18.50 },
    { row: 'F', tier: 'premium' as const, price: 18.50 },
    { row: 'G', tier: 'standard' as const, price: 13.50 },
    { row: 'H', tier: 'standard' as const, price: 13.50 },
    { row: 'J', tier: 'standard' as const, price: 13.50 },
  ];

  return rows.map(({ row, tier, price }) => {
    const seats = [];
    for (let num = 1; num <= 12; num++) {
      const id = `${row}-${num}`;
      const isAccessible = (row === 'J' && (num === 1 || num === 12));
      const seatTier: SeatTier = isAccessible ? 'accessible' : tier;
      const isOccupied = occupiedIds.includes(id);

      seats.push({
        id,
        row,
        number: num,
        tier: seatTier,
        price: isAccessible ? 13.50 : price,
        status: isOccupied ? ('occupied' as const) : ('available' as const)
      });
    }
    return { row, seats };
  });
};

// Global currency formatting helper
export const formatPrice = (basePriceInUSD: number, cinema: Cinema): string => {
  const converted = basePriceInUSD * cinema.currencyRate;
  if (cinema.currency === 'JPY' || cinema.currency === 'INR') {
    return `${cinema.currencySymbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${cinema.currencySymbol}${converted.toFixed(2)}`;
};
