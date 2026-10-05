import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Filter, Calendar, MapPin, Film, ShieldCheck, Ticket } from 'lucide-react';
import { Movie, Cinema, Showtime, Seat, ConcessionItem, Booking } from './types/cinema';
import { MOVIES, CINEMAS, getAvailableDates, generateShowtimes } from './data/mockData';
import { TopNav } from './components/TopNav';
import { HeroFeatured } from './components/HeroFeatured';
import { MovieCard } from './components/MovieCard';
import { MovieDetailModal } from './components/MovieDetailModal';
import { SeatMap } from './components/SeatMap';
import { ConcessionsModal } from './components/ConcessionsModal';
import { CheckoutModal } from './components/CheckoutModal';
import { TicketConfirmationModal } from './components/TicketConfirmationModal';
import { SmartRecommenderModal } from './components/SmartRecommenderModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { TrailerModal } from './components/TrailerModal';
import { TheatersSection } from './components/TheatersSection';

const STORAGE_KEY = 'lumiere_cinema_bookings_v1';

export default function App() {
  // Navigation & Location
  const [activeSection, setActiveSection] = useState<'movies' | 'theaters'>('movies');
  const [selectedCinema, setSelectedCinema] = useState<Cinema>(CINEMAS[0]);

  // Catalog Filtering & World Cinema
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const dates = getAvailableDates();
  const [selectedDate, setSelectedDate] = useState(dates[0].dateStr);

  // Modals & Panels
  const [inspectMovie, setInspectMovie] = useState<Movie | null>(null);
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);
  const [heroMovie, setHeroMovie] = useState<Movie>(MOVIES[0]);
  const [isRecommenderOpen, setIsRecommenderOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  // Active Booking Flow
  const [bookingStep, setBookingStep] = useState<'catalog' | 'seats' | 'concessions' | 'checkout' | 'confirmed'>('catalog');
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [activeShowtime, setActiveShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedConcessions, setSelectedConcessions] = useState<{ item: ConcessionItem; quantity: number }[]>([]);
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);

  // Real-time seat hold countdown timer (8 minutes)
  const [holdSecondsLeft, setHoldSecondsLeft] = useState(8 * 60);

  // Bookings List (Persistent)
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }

    // Default sample confirmed booking
    return [
      {
        id: 'book-init-01',
        bookingRef: 'LMR-8924-TX',
        movieId: MOVIES[0].id,
        movieTitle: MOVIES[0].title,
        moviePoster: MOVIES[0].posterUrl,
        movieBackdrop: MOVIES[0].backdropUrl,
        cinemaId: CINEMAS[0].id,
        cinemaName: CINEMAS[0].name,
        cinemaAddress: CINEMAS[0].address,
        showtimeId: `${MOVIES[0].id}-${CINEMAS[0].id}-today-19:45`,
        date: dates[0].dateStr,
        time: '19:45',
        format: 'IMAX Laser',
        auditorium: 'Auditorium 1 — The Grand IMAX',
        seats: [
          { id: 'E-6', row: 'E', number: 6, tier: 'premium', price: 18.50 },
          { id: 'E-7', row: 'E', number: 7, tier: 'premium', price: 18.50 }
        ],
        concessions: [],
        subtotal: 37.00,
        concessionsTotal: 0,
        tax: 3.30,
        convenienceFee: 3.00,
        discount: 0,
        totalAmount: 43.30,
        customerName: 'Alex Mercer',
        customerEmail: 'alex.mercer@gmail.com',
        customerPhone: '+1 (555) 234-8901',
        paymentMethod: 'card',
        paymentCardLast4: '4242',
        bookingStatus: 'confirmed',
        createdAt: new Date().toISOString(),
        qrCodeData: 'https://lumierecinema.com/tickets/LMR-8924-TX'
      }
    ];
  });

  // Save bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }, [bookings]);

  // Live Seat Hold Countdown Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if ((bookingStep === 'seats' || bookingStep === 'concessions' || bookingStep === 'checkout') && selectedSeats.length > 0) {
      timer = setInterval(() => {
        setHoldSecondsLeft((prev) => {
          if (prev <= 1) {
            // Timer expired: release seats and reset
            alert('Your 8-minute seat reservation hold has expired. The seats have been released back to the auditorium.');
            setSelectedSeats([]);
            setBookingStep('catalog');
            return 8 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [bookingStep, selectedSeats.length]);

  // Seat Toggle Handler
  const handleToggleSeat = (seat: Seat) => {
    setSelectedSeats((prev) => {
      const exists = prev.some((s) => s.id === seat.id);
      if (exists) {
        return prev.filter((s) => s.id !== seat.id);
      } else {
        if (prev.length >= 8) {
          alert('Maximum 8 seats can be selected per transaction.');
          return prev;
        }
        // Reset timer to full 8 minutes on first selection
        if (prev.length === 0) {
          setHoldSecondsLeft(8 * 60);
        }
        return [...prev, seat];
      }
    });
  };

  // Concession Quantity Handler
  const handleUpdateConcessionQuantity = (item: ConcessionItem, delta: number) => {
    setSelectedConcessions((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (!existing && delta > 0) {
        return [...prev, { item, quantity: 1 }];
      }
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) {
          return prev.filter((c) => c.item.id !== item.id);
        }
        return prev.map((c) => (c.item.id === item.id ? { ...c, quantity: newQty } : c));
      }
      return prev;
    });
  };

  // Start Booking Flow from Movie
  const handleStartBooking = (movie: Movie) => {
    // Generate showtime or pick the prime one
    const showtimes = generateShowtimes(movie.id, selectedCinema.id, selectedDate);
    const chosenShowtime = showtimes[2] || showtimes[0]; // e.g. 17:15 or 19:45

    setActiveMovie(movie);
    setActiveShowtime(chosenShowtime);
    setSelectedSeats([]);
    setSelectedConcessions([]);
    setHoldSecondsLeft(8 * 60);
    setBookingStep('seats');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start Booking Flow from Selected Showtime
  const handleSelectShowtime = (showtime: Showtime) => {
    const movie = MOVIES.find((m) => m.id === showtime.movieId) || MOVIES[0];
    setActiveMovie(movie);
    setActiveShowtime(showtime);
    setSelectedSeats([]);
    setSelectedConcessions([]);
    setHoldSecondsLeft(8 * 60);
    setBookingStep('seats');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Payment Success Handler
  const handlePaymentSuccess = (booking: Booking) => {
    setBookings((prev) => [booking, ...prev]);
    setLastBooking(booking);
    setBookingStep('confirmed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel Booking Handler
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, bookingStatus: 'cancelled' } : b))
    );
  };

  // Worldwide Filter options
  const worldRegions = [
    { label: 'All World 🌍', value: 'All' },
    { label: 'Hollywood / USA 🇺🇸', value: 'North America' },
    { label: 'Bollywood & India 🇮🇳', value: 'India & South Asia' },
    { label: 'East Asia 🇯🇵 🇰🇷', value: 'East Asia' },
    { label: 'Europe 🇫🇷 🇬🇧', value: 'Europe' },
    { label: 'Latin America 🇲🇽', value: 'Latin America' },
    { label: 'Middle East 🇦🇪', value: 'Middle East' }
  ];

  const languages = ['All', 'English', 'Hindi', 'Japanese', 'Korean', 'French', 'Spanish', 'Arabic'];
  const genres = ['All', 'Sci-Fi', 'Action', 'Mythological Epic', 'Animation', 'Crime', 'Romance', 'Fantasy'];
  const formats = ['All', 'IMAX Laser', 'Dolby Atmos', '4DX Motion', 'ScreenX 270°'];

  const filteredMovies = MOVIES.filter((movie) => {
    // Region filter
    if (selectedRegion !== 'All' && movie.region !== selectedRegion) {
      return false;
    }

    // Language filter
    if (selectedLanguage !== 'All' && !movie.originalLanguage.toLowerCase().includes(selectedLanguage.toLowerCase())) {
      return false;
    }

    // Genre filter
    if (selectedGenre !== 'All' && !movie.genres.some((g) => g.toLowerCase().includes(selectedGenre.toLowerCase()))) {
      return false;
    }

    // Format filter
    if (selectedFormat !== 'All' && !movie.formats.includes(selectedFormat as any)) {
      return false;
    }

    // Text search (titles, cast, directors, countries, languages)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = movie.title.toLowerCase().includes(q);
      const matchCast = movie.cast.some((c) => c.toLowerCase().includes(q));
      const matchDirector = movie.director.toLowerCase().includes(q);
      const matchCountry = movie.country.toLowerCase().includes(q);
      const matchRegion = movie.region.toLowerCase().includes(q);
      const matchLang = movie.originalLanguage.toLowerCase().includes(q);
      return matchTitle || matchCast || matchDirector || matchCountry || matchRegion || matchLang;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#08080a] text-neutral-100 flex flex-col font-sans">
      {/* Top Bar Contract (Brand, Nav links, Actions) */}
      <TopNav
        cinemas={CINEMAS}
        selectedCinema={selectedCinema}
        onSelectCinema={setSelectedCinema}
        onOpenBookings={() => setIsMyBookingsOpen(true)}
        bookingCount={bookings.filter((b) => b.bookingStatus === 'confirmed').length}
        onOpenRecommender={() => setIsRecommenderOpen(true)}
        activeSection={activeSection}
        onNavigate={(sec) => {
          setActiveSection(sec === 'recommender' ? 'movies' : sec);
          if (sec === 'recommender') setIsRecommenderOpen(true);
          if (bookingStep !== 'catalog') setBookingStep('catalog');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Step: Seat Selection */}
        {bookingStep === 'seats' && activeMovie && activeShowtime && (
          <SeatMap
            movie={activeMovie}
            cinema={selectedCinema}
            showtime={activeShowtime}
            selectedSeats={selectedSeats}
            onToggleSeat={handleToggleSeat}
            onProceed={() => setBookingStep('concessions')}
            onBack={() => setBookingStep('catalog')}
            holdSecondsLeft={holdSecondsLeft}
          />
        )}

        {/* Step: Concessions */}
        {bookingStep === 'concessions' && activeMovie && (
          <ConcessionsModal
            selectedConcessions={selectedConcessions}
            onUpdateQuantity={handleUpdateConcessionQuantity}
            onProceedToCheckout={() => setBookingStep('checkout')}
            onBackToSeats={() => setBookingStep('seats')}
            ticketSubtotal={selectedSeats.reduce((sum, s) => sum + s.price * (activeShowtime?.priceMultiplier || 1), 0)}
          />
        )}

        {/* Step: Checkout */}
        {bookingStep === 'checkout' && activeMovie && activeShowtime && (
          <CheckoutModal
            movie={activeMovie}
            cinema={selectedCinema}
            showtime={activeShowtime}
            selectedSeats={selectedSeats}
            selectedConcessions={selectedConcessions}
            onBack={() => setBookingStep('concessions')}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {/* Step: Booking Confirmed & E-Ticket */}
        {bookingStep === 'confirmed' && lastBooking && (
          <TicketConfirmationModal
            booking={lastBooking}
            onClose={() => setBookingStep('catalog')}
            onViewAllBookings={() => {
              setBookingStep('catalog');
              setIsMyBookingsOpen(true);
            }}
          />
        )}

        {/* Main Catalog View */}
        {bookingStep === 'catalog' && (
          <>
            {activeSection === 'movies' ? (
              <>
                {/* Hero Featured Movie Banner with World Premiere Selector */}
                <HeroFeatured
                  movie={heroMovie}
                  selectedCinema={selectedCinema}
                  onBookTickets={handleStartBooking}
                  onWatchTrailer={(m) => setTrailerMovie(m)}
                  onOpenRecommender={() => setIsRecommenderOpen(true)}
                />

                {/* World Cinema Region Selector Ribbon */}
                <section className="border-b border-neutral-800 bg-neutral-950 py-3 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                        <span>World Region:</span>
                      </span>
                      {worldRegions.map((region) => (
                        <button
                          key={region.value}
                          onClick={() => setSelectedRegion(region.value)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                            selectedRegion === region.value
                              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                              : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                          }`}
                        >
                          {region.label}
                        </button>
                      ))}
                    </div>

                    <div className="text-xs text-neutral-400 hidden lg:flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>
                        Showing <strong className="text-white">{filteredMovies.length}</strong> films from <strong className="text-white">{new Set(filteredMovies.map(m => m.country)).size}</strong> countries
                      </span>
                    </div>
                  </div>
                </section>

                {/* Filter and Date Bar */}
                <section className="border-b border-neutral-800/80 bg-neutral-900/60 backdrop-blur-md sticky top-16 z-30">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Date Selector Chips */}
                    <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                      <Calendar className="h-4 w-4 text-rose-500 shrink-0 mr-1 hidden sm:block" />
                      {dates.map(({ dateStr, dayName, formattedDate }) => (
                        <button
                          key={dateStr}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                            selectedDate === dateStr
                              ? 'bg-rose-600 text-white font-semibold shadow-sm'
                              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                          }`}
                        >
                          <span>{dayName}</span>{' '}
                          <span className="opacity-70 text-[11px]">({formattedDate})</span>
                        </button>
                      ))}
                    </div>

                    {/* Search & International Language Controls */}
                    <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
                      <div className="relative flex-1 md:w-56">
                        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search world movies, countries..."
                          className="w-full rounded-lg border border-neutral-800 bg-neutral-950 pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none"
                        />
                      </div>

                      {/* Language filter dropdown */}
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-rose-500 cursor-pointer"
                        title="Filter by original audio language"
                      >
                        {languages.map((l) => (
                          <option key={l} value={l} className="bg-neutral-900 text-white">
                            {l === 'All' ? 'All Languages' : `${l} Audio`}
                          </option>
                        ))}
                      </select>

                      {/* Genre selector */}
                      <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-rose-500 cursor-pointer"
                      >
                        {genres.map((g) => (
                          <option key={g} value={g} className="bg-neutral-900 text-white">
                            {g === 'All' ? 'All Genres' : g}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                {/* Movie Grid Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-rose-400 font-semibold mb-1">
                        <span>{selectedCinema.countryFlag} {selectedCinema.city} Premieres</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-neutral-400">All International Audio with Subtitles</span>
                      </div>
                      <h2 className="font-cinematic text-2xl sm:text-3xl font-bold text-white">
                        {selectedRegion === 'All' ? 'All Movies Worldwide' : `${selectedRegion} Showcase`}
                      </h2>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Reserve real-time seats in {selectedCinema.name.split('—')[0]}. Prices in {selectedCinema.currencySymbol} ({selectedCinema.currency}).
                      </p>
                    </div>

                    {/* Format filter pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
                      {formats.map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => setSelectedFormat(fmt)}
                          className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                            selectedFormat === fmt
                              ? 'bg-rose-600 text-white'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {filteredMovies.length === 0 ? (
                    <div className="py-20 text-center rounded-xl border border-dashed border-neutral-800 bg-neutral-950/40 p-8">
                      <Film className="h-10 w-10 text-neutral-600 mx-auto mb-2" />
                      <h3 className="text-sm font-semibold text-neutral-300">No movies match your criteria</h3>
                      <p className="text-xs text-neutral-500 mt-1">
                        Try resetting your search query or selecting "All Genres".
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedGenre('All');
                          setSelectedFormat('All');
                        }}
                        className="mt-4 rounded-lg bg-neutral-800 px-4 py-2 text-xs font-medium text-white hover:bg-neutral-700 transition-colors"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredMovies.map((movie) => (
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          onSelectMovie={(m) => setInspectMovie(m)}
                          onBookTickets={(m) => handleStartBooking(m)}
                          onWatchTrailer={(m) => setTrailerMovie(m)}
                        />
                      ))}
                    </div>
                  )}
                </section>
              </>
            ) : (
              /* Theaters & Experiences Section */
              <TheatersSection
                cinemas={CINEMAS}
                selectedCinema={selectedCinema}
                onSelectCinema={setSelectedCinema}
                onExploreMovies={() => setActiveSection('movies')}
              />
            )}
          </>
        )}
      </main>

      {/* Footer conforming to Section 1.B */}
      <footer className="border-t border-neutral-800/80 bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-500">
          <div className="flex items-center gap-2.5">
            <span className="font-cinematic text-sm font-bold text-neutral-300">Lumière Cinema Group</span>
            <span aria-hidden="true">·</span>
            <span>Architectural Entertainment & Laser Projection</span>
          </div>

          <div className="flex items-center gap-6">
            <span>PCI-DSS Level 1 Compliant</span>
            <span>256-bit SSL Security</span>
            <span>Full Refund &plusmn; 2h Prior</span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} Lumière Cinema. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Overlays and Modals */}
      <MovieDetailModal
        movie={inspectMovie}
        selectedCinema={selectedCinema}
        onClose={() => setInspectMovie(null)}
        onSelectShowtime={handleSelectShowtime}
        onWatchTrailer={(m) => setTrailerMovie(m)}
      />

      <TrailerModal
        movie={trailerMovie}
        onClose={() => setTrailerMovie(null)}
        onBookTickets={(m) => handleStartBooking(m)}
      />

      <SmartRecommenderModal
        isOpen={isRecommenderOpen}
        onClose={() => setIsRecommenderOpen(false)}
        onSelectMovieToBook={(m) => handleStartBooking(m)}
      />

      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onViewTicket={(b) => {
          setLastBooking(b);
          setBookingStep('confirmed');
        }}
      />
    </div>
  );
}
