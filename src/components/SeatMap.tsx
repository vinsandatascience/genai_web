import React, { useState, useEffect } from 'react';
import { Clock, Info, Check, X, ShieldCheck, Armchair, Accessibility } from 'lucide-react';
import { Movie, Cinema, Showtime, Seat, SeatTier } from '../types/cinema';
import { buildAuditoriumSeats, formatPrice } from '../data/mockData';

interface SeatMapProps {
  movie: Movie;
  cinema: Cinema;
  showtime: Showtime;
  selectedSeats: Seat[];
  onToggleSeat: (seat: Seat) => void;
  onProceed: () => void;
  onBack: () => void;
  holdSecondsLeft: number;
}

export const SeatMap: React.FC<SeatMapProps> = ({
  movie,
  cinema,
  showtime,
  selectedSeats,
  onToggleSeat,
  onProceed,
  onBack,
  holdSecondsLeft
}) => {
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null);
  const [liveOccupied, setLiveOccupied] = useState<string[]>(showtime.seatsOccupied);
  const [liveActivityNotice, setLiveActivityNotice] = useState<string | null>(null);

  // Seat layout rows
  const seatRows = React.useMemo(() => {
    return buildAuditoriumSeats(liveOccupied);
  }, [liveOccupied]);

  // Simulate subtle real-time theater activity every 25 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random seat that is not selected by current user
      const candidateRows = ['D', 'E', 'F', 'G', 'H'];
      const randomRow = candidateRows[Math.floor(Math.random() * candidateRows.length)];
      const randomNum = Math.floor(Math.random() * 12) + 1;
      const targetId = `${randomRow}-${randomNum}`;

      // If user hasn't selected it
      const isSelectedByUser = selectedSeats.some(s => s.id === targetId);
      if (!isSelectedByUser) {
        setLiveOccupied(prev => {
          if (prev.includes(targetId)) {
            // occasionally free up a seat
            setLiveActivityNotice(`Seat ${targetId} was just released by another guest.`);
            setTimeout(() => setLiveActivityNotice(null), 3500);
            return prev.filter(id => id !== targetId);
          } else {
            // reserve a seat
            setLiveActivityNotice(`Seat ${targetId} was just booked in real-time.`);
            setTimeout(() => setLiveActivityNotice(null), 3500);
            return [...prev, targetId];
          }
        });
      }
    }, 28000);

    return () => clearInterval(interval);
  }, [selectedSeats]);

  // Format timer MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price * showtime.priceMultiplier, 0);

  // Seat styling logic
  const getSeatStyle = (seat: { id: string; row: string; number: number; tier: SeatTier; price: number; status: 'available' | 'occupied' }) => {
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    const isOccupied = seat.status === 'occupied' || liveOccupied.includes(seat.id);

    if (isSelected) {
      return 'bg-rose-600 text-white shadow-lg shadow-rose-600/50 ring-2 ring-rose-400 scale-105 z-10 cursor-pointer';
    }

    if (isOccupied) {
      return 'bg-neutral-800/80 text-neutral-600 border border-neutral-700/30 cursor-not-allowed opacity-50';
    }

    // Available tiers
    switch (seat.tier) {
      case 'vip':
        return 'bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 hover:border-amber-400 hover:scale-110 cursor-pointer';
      case 'premium':
        return 'bg-neutral-800 border border-rose-500/30 text-rose-300 hover:bg-rose-950/40 hover:border-rose-400 hover:scale-110 cursor-pointer';
      case 'accessible':
        return 'bg-sky-500/15 border border-sky-400/40 text-sky-300 hover:bg-sky-500/30 hover:scale-110 cursor-pointer';
      default:
        return 'bg-neutral-800/90 border border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:border-neutral-500 hover:scale-110 cursor-pointer';
    }
  };

  // View angle description
  const getViewAngleDescription = (seat: Seat) => {
    let horizontal = 'Centered View';
    if (seat.number <= 3) horizontal = 'Left-Angle View';
    else if (seat.number >= 10) horizontal = 'Right-Angle View';

    let vertical = 'Optimal Middle Row';
    if (seat.row <= 'B') vertical = 'Front VIP Recliner';
    else if (seat.row >= 'H') vertical = 'Elevated Back Row';

    return `${vertical} · ${horizontal}`;
  };

  return (
    <div className="flex flex-col min-h-full max-w-5xl mx-auto px-4 py-6">
      {/* Header Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <button
            onClick={onBack}
            className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors mb-1 inline-flex items-center gap-1"
          >
            &larr; Change Showtime
          </button>
          <h2 className="font-cinematic text-2xl font-bold text-white flex items-center gap-2">
            <span>{movie.title}</span>
            <span className="text-xs font-normal text-rose-400 border border-rose-500/30 rounded px-2 py-0.5">
              {showtime.format}
            </span>
          </h2>
          <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
            <span>{cinema.name.split('—')[0]}</span>
            <span aria-hidden="true">·</span>
            <span>{showtime.auditoriumName}</span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-200 font-medium">{showtime.time} ({showtime.date})</span>
          </div>
        </div>

        {/* Live Hold Timer */}
        {selectedSeats.length > 0 && (
          <div className="flex items-center gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
            <Clock className="h-4 w-4 animate-pulse text-amber-400" />
            <div>
              <div className="text-[11px] uppercase tracking-wider text-amber-400/80 font-semibold">
                Seats Locked & Reserved
              </div>
              <div className="text-sm font-bold tabular-nums font-mono">
                {formatTime(holdSecondsLeft)} remaining
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Activity Notification */}
      {liveActivityNotice && (
        <div className="mt-3 flex items-center justify-between gap-2 rounded-lg bg-neutral-900 border border-neutral-800 px-3.5 py-1.5 text-xs text-neutral-300 transition-all">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{liveActivityNotice}</span>
          </div>
          <span className="text-[10px] text-neutral-500">Live Sync</span>
        </div>
      )}

      {/* Auditorium Screen Visual */}
      <div className="relative my-8 flex flex-col items-center">
        {/* Curved luminous screen line */}
        <div className="relative w-4/5 max-w-2xl h-8 overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-16 rounded-[50%] border-t-4 border-rose-500/80 screen-arc bg-gradient-to-b from-rose-500/20 to-transparent" />
        </div>
        <div className="text-[11px] font-semibold tracking-widest text-neutral-400 uppercase mt-1">
          Curved Laser Projection Screen
        </div>
        <div className="text-[10px] text-neutral-600">All eyes this way</div>
      </div>

      {/* Seating Grid */}
      <div className="overflow-x-auto py-2">
        <div className="min-w-[620px] flex flex-col items-center gap-2.5">
          {seatRows.map(({ row, seats }) => {
            const isVipRow = row === 'A' || row === 'B';
            const isPremiumRow = row === 'C' || row === 'D' || row === 'E' || row === 'F';

            return (
              <div key={row} className="flex items-center gap-2">
                {/* Row label left */}
                <span className="w-5 text-center text-xs font-bold text-neutral-400 font-mono">
                  {row}
                </span>

                {/* Seat buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {seats.map((seat, index) => {
                    const isSelected = selectedSeats.some(s => s.id === seat.id);
                    const isOccupied = liveOccupied.includes(seat.id);
                    const currentSeatObj: Seat = {
                      ...seat,
                      status: isSelected ? 'selected' : isOccupied ? 'occupied' : 'available'
                    };

                    // Add center aisle gap between seat 6 and 7
                    const addAisle = index === 5;

                    return (
                      <React.Fragment key={seat.id}>
                        <button
                          type="button"
                          disabled={isOccupied}
                          onClick={() => onToggleSeat(currentSeatObj)}
                          onMouseEnter={() => setHoveredSeat(currentSeatObj)}
                          onMouseLeave={() => setHoveredSeat(null)}
                          className={`relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-t-lg rounded-b-md text-xs font-semibold transition-all duration-150 ${getSeatStyle(seat)}`}
                          aria-label={`Seat ${seat.id}, Tier ${seat.tier}, Price $${(seat.price * showtime.priceMultiplier).toFixed(2)}`}
                        >
                          {isSelected ? (
                            <Check className="h-4 w-4" />
                          ) : seat.tier === 'accessible' ? (
                            <Accessibility className="h-4 w-4" />
                          ) : seat.tier === 'vip' ? (
                            <Armchair className="h-3.5 w-3.5 text-amber-300" />
                          ) : (
                            <span className="tabular-nums text-[11px]">{seat.number}</span>
                          )}
                        </button>
                        {addAisle && <div className="w-6 sm:w-8" />}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Row label right */}
                <span className="w-5 text-center text-xs font-bold text-neutral-400 font-mono">
                  {row}
                </span>

                {/* Row tier descriptor */}
                <span className="hidden sm:inline-block text-[10px] text-neutral-500 w-16 text-left pl-2">
                  {isVipRow ? 'VIP' : isPremiumRow ? 'Premium' : 'Standard'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hover Seat View Angle Tooltip Card */}
      {hoveredSeat && (
        <div className="mt-4 mx-auto max-w-sm rounded-lg border border-neutral-800 bg-neutral-900/90 p-3 text-xs text-neutral-300 shadow-xl backdrop-blur-md animate-in fade-in duration-150">
          <div className="flex items-center justify-between font-semibold">
            <span className="text-white">Seat {hoveredSeat.id} ({hoveredSeat.tier.toUpperCase()})</span>
            <span className="text-rose-400 font-mono tabular-nums">
              {formatPrice(hoveredSeat.price * showtime.priceMultiplier, cinema)}
            </span>
          </div>
          <div className="mt-1 text-[11px] text-neutral-400 flex items-center gap-1.5">
            <Info className="h-3 w-3 text-neutral-400" />
            <span>Perspective: {getViewAngleDescription(hoveredSeat)}</span>
          </div>
        </div>
      )}

      {/* Seat Tier Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-5 border-t border-neutral-800/80 pt-5 text-xs text-neutral-300">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-neutral-800 border border-neutral-700" />
          <span>Standard ({formatPrice(13.50, cinema)})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-neutral-800 border border-rose-500/40 text-rose-300" />
          <span>Premium Lounge ({formatPrice(18.50, cinema)})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-amber-500/20 border border-amber-500/50" />
          <span>VIP Recliner ({formatPrice(24.00, cinema)})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-rose-600" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-neutral-800/80 border border-neutral-700/30 opacity-50" />
          <span>Reserved</span>
        </div>
      </div>

      {/* Selected Seats Floating Bottom Bar */}
      <div className="sticky bottom-4 z-30 mt-8 rounded-xl border border-neutral-800 bg-neutral-900/95 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <div className="text-xs text-neutral-400">
              {selectedSeats.length === 0 ? 'No seats selected yet' : `${selectedSeats.length} Seat${selectedSeats.length > 1 ? 's' : ''} Selected:`}
            </div>
            {selectedSeats.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                {selectedSeats.map(s => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-1 rounded bg-rose-950/60 border border-rose-800/40 px-2 py-0.5 text-xs font-semibold text-rose-200"
                  >
                    <span>{s.id}</span>
                    <button
                      onClick={() => onToggleSeat(s)}
                      className="hover:text-white transition-colors"
                      title="Remove seat"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-500 mt-0.5">Click any available seat above to select.</p>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto">
            <div className="text-right">
              <div className="text-[11px] text-neutral-400">Subtotal</div>
              <div className="text-xl font-bold text-white tabular-nums font-mono">
                {formatPrice(totalPrice, cinema)}
              </div>
            </div>

            <button
              onClick={onProceed}
              disabled={selectedSeats.length === 0}
              className={`flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all shadow-lg ${
                selectedSeats.length > 0
                  ? 'bg-rose-600 text-white shadow-rose-600/30 hover:bg-rose-500 cursor-pointer active:scale-95'
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              }`}
            >
              <span>Continue to Concessions</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
