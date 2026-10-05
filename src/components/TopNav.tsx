import React from 'react';
import { Film, Ticket, Sparkles, MapPin } from 'lucide-react';
import { Cinema } from '../types/cinema';

interface TopNavProps {
  cinemas: Cinema[];
  selectedCinema: Cinema;
  onSelectCinema: (cinema: Cinema) => void;
  onOpenBookings: () => void;
  bookingCount: number;
  onOpenRecommender: () => void;
  activeSection: string;
  onNavigate: (section: 'movies' | 'theaters' | 'recommender') => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  cinemas,
  selectedCinema,
  onSelectCinema,
  onOpenBookings,
  bookingCount,
  onOpenRecommender,
  activeSection,
  onNavigate
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('movies')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-600/10 text-rose-500 border border-rose-500/20 group-hover:bg-rose-600/20 transition-colors">
              <Film className="h-5 w-5" />
            </div>
            <div>
              <span className="font-cinematic text-lg font-bold tracking-tight text-white group-hover:text-rose-400 transition-colors">
                Lumière Cinema
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-6 text navigation links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <button
            onClick={() => onNavigate('movies')}
            className={`transition-colors hover:text-white py-1 ${
              activeSection === 'movies' ? 'text-white border-b-2 border-rose-500 font-semibold' : ''
            }`}
          >
            World Cinema
          </button>

          <button
            onClick={() => onNavigate('theaters')}
            className={`transition-colors hover:text-white py-1 ${
              activeSection === 'theaters' ? 'text-white border-b-2 border-rose-500 font-semibold' : ''
            }`}
          >
            Global Auditoriums
          </button>

          <button
            onClick={onOpenRecommender}
            className="flex items-center gap-1.5 transition-colors hover:text-rose-300 py-1 text-neutral-300"
          >
            <Sparkles className="h-4 w-4 text-rose-400" />
            <span>AI Global Vibe</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Cinema Location Switcher with Country Flags & Currency */}
          <div className="relative">
            <label htmlFor="cinema-select" className="sr-only">Select Global City</label>
            <div className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/90 px-2.5 py-1.5 text-xs text-neutral-300 hover:border-neutral-700 transition-colors">
              <span className="text-sm shrink-0">{selectedCinema.countryFlag}</span>
              <select
                id="cinema-select"
                value={selectedCinema.id}
                onChange={(e) => {
                  const found = cinemas.find(c => c.id === e.target.value);
                  if (found) onSelectCinema(found);
                }}
                className="bg-transparent text-xs font-semibold text-neutral-200 focus:outline-none cursor-pointer pr-1 truncate max-w-[140px] sm:max-w-[190px]"
              >
                {cinemas.map(c => (
                  <option key={c.id} value={c.id} className="bg-neutral-900 text-white">
                    {c.countryFlag} {c.city} ({c.currencySymbol}{c.currency})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* My Tickets Button */}
          <button
            onClick={onOpenBookings}
            className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs font-medium text-white hover:border-neutral-700 hover:bg-neutral-800 transition-colors relative"
            title="View your booked tickets and QR boarding passes"
          >
            <Ticket className="h-4 w-4 text-rose-400" />
            <span className="hidden sm:inline">My Tickets</span>
            {bookingCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white tabular-nums">
                {bookingCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
