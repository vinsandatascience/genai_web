export type FormatType = 'IMAX Laser' | 'Dolby Atmos' | '4DX Motion' | 'ScreenX 270°' | 'Standard 4K';

export type SeatTier = 'standard' | 'premium' | 'vip' | 'accessible';

export type SeatStatus = 'available' | 'selected' | 'occupied' | 'holding';

export interface Seat {
  id: string; // e.g. "E-8"
  row: string;
  number: number;
  tier: SeatTier;
  price: number;
  status: SeatStatus;
}

export type WorldRegion = 'All' | 'North America' | 'India & South Asia' | 'East Asia' | 'Europe' | 'Latin America' | 'Middle East';

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  rating: number; // e.g. 9.1
  ageRating: string; // "PG-13", "R", "PG"
  duration: number; // minutes
  genres: string[];
  releaseDate: string;
  posterUrl: string;
  backdropUrl: string;
  director: string;
  cast: string[];
  synopsis: string;
  formats: FormatType[];
  moodTags: string[];
  language: string;
  country: string;
  countryFlag: string;
  region: WorldRegion;
  originalLanguage: string;
  subtitles: string[];
  dubbedLanguages?: string[];
  trailerYoutubeId?: string;
  badge?: string;
  festivalAward?: string;
}

export interface CinemaAuditorium {
  id: string;
  name: string;
  format: FormatType;
  screenType: string;
  soundSystem: string;
}

export interface Cinema {
  id: string;
  name: string;
  city: string;
  country: string;
  countryFlag: string;
  neighborhood: string;
  address: string;
  distance: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'INR' | 'JPY' | 'AED';
  currencySymbol: string;
  currencyRate: number; // Conversion rate relative to USD (1.0)
  amenities: string[];
  auditoriums: CinemaAuditorium[];
}

export interface Showtime {
  id: string;
  movieId: string;
  cinemaId: string;
  auditoriumName: string;
  format: FormatType;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  priceMultiplier: number;
  seatsOccupied: string[]; // array of seat IDs
}

export interface ConcessionItem {
  id: string;
  name: string;
  category: 'Popcorn' | 'Snacks' | 'Beverages' | 'Combos' | 'Desserts';
  description: string;
  price: number;
  calories: string;
  imageEmoji: string;
  popular?: boolean;
}

export interface Booking {
  id: string;
  bookingRef: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  movieBackdrop: string;
  cinemaId: string;
  cinemaName: string;
  cinemaAddress: string;
  showtimeId: string;
  date: string;
  time: string;
  format: FormatType;
  auditorium: string;
  seats: {
    id: string;
    row: string;
    number: number;
    tier: SeatTier;
    price: number;
  }[];
  concessions: {
    item: ConcessionItem;
    quantity: number;
  }[];
  subtotal: number;
  concessionsTotal: number;
  tax: number;
  convenienceFee: number;
  discount: number;
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: 'card' | 'apple_pay' | 'google_pay' | 'upi' | 'gift_card';
  paymentCardLast4?: string;
  currency?: string;
  currencySymbol?: string;
  bookingStatus: 'confirmed' | 'cancelled';
  createdAt: string;
  qrCodeData: string;
}

export interface RecommendationFilter {
  mood: string;
  companion: string;
  format: string;
  genre: string;
  region?: string;
  country?: string;
  query?: string;
}
