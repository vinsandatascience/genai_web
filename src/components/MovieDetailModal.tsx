import React, { useState } from 'react';
import { X, Star, Clock, Calendar, Film, Play, Volume2, Shield, Users } from 'lucide-react';
import { Movie, Cinema, Showtime } from '../types/cinema';
import { getAvailableDates, generateShowtimes } from '../data/mockData';

interface MovieDetailModalProps {
  movie: Movie | null;
  selectedCinema: Cinema;
  onClose: () => void;
  onSelectShowtime: (showtime: Showtime) => void;
  onWatchTrailer: (movie: Movie) => void;
}

export const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  movie,
  selectedCinema,
  onClose,
  onSelectShowtime,
  onWatchTrailer
}) => {
  if (!movie) return null;

  const dates = getAvailableDates();
  const [selectedDate, setSelectedDate] = useState(dates[0].dateStr);

  const showtimes = generateShowtimes(movie.id, selectedCinema.id, selectedDate);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-neutral-700 bg-neutral-900 shadow-2xl p-6 sm:p-8 my-8 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 rounded-full bg-black/60 p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Movie Backdrop Header with Scrim */}
        <div className="relative -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 h-64 sm:h-80 overflow-hidden rounded-t-2xl">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />

          {/* Watch Trailer Floating Button */}
          <button
            onClick={() => onWatchTrailer(movie)}
            className="absolute bottom-6 right-6 flex items-center gap-2 rounded-lg bg-black/70 border border-neutral-600/60 backdrop-blur-md px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shadow-lg cursor-pointer"
          >
            <Play className="h-4 w-4 text-rose-500 fill-current" />
            <span>Play Official Trailer</span>
          </button>
        </div>

        {/* Overview Content */}
        <div className="relative z-10 pt-2">
          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-200 font-semibold bg-neutral-800/80 px-2 py-0.5 rounded border border-neutral-700/60">
              <span className="text-sm">{movie.countryFlag}</span>
              <span>{movie.country} ({movie.region})</span>
            </span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="flex items-center gap-1 text-amber-400 font-semibold tabular-nums">
              <Star className="h-3.5 w-3.5 fill-current" />
              {movie.rating} / 10
            </span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{movie.ageRating}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="tabular-nums">{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{movie.genres.join(' / ')}</span>
          </div>

          <h2 className="font-cinematic text-3xl font-extrabold text-white mt-1">
            {movie.title}
          </h2>
          <p className="text-sm font-medium text-rose-400/90 mt-0.5">
            {movie.tagline}
          </p>

          {movie.festivalAward && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs text-amber-300 font-semibold">
              <span>🏆</span>
              <span>{movie.festivalAward}</span>
            </div>
          )}

          <p className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
            {movie.synopsis}
          </p>

          {/* World Cinema Audio & Subtitle Specifications */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/70 text-xs">
            <div>
              <span className="text-neutral-400 font-medium">Original Audio Language:</span>
              <p className="text-white font-semibold mt-0.5 flex items-center gap-1.5">
                <span>{movie.countryFlag}</span>
                <span>{movie.originalLanguage}</span>
              </p>
            </div>
            <div>
              <span className="text-neutral-400 font-medium">Subtitles Available:</span>
              <p className="text-white font-medium mt-0.5">
                {movie.subtitles.join(', ')}
              </p>
            </div>
            {movie.dubbedLanguages && movie.dubbedLanguages.length > 0 && (
              <div className="sm:col-span-2 pt-1 border-t border-neutral-800/80">
                <span className="text-neutral-400 font-medium">Available Audio Dubs:</span>
                <span className="text-neutral-300 ml-2">{movie.dubbedLanguages.join(', ')}</span>
              </div>
            )}
          </div>

          {/* Cast and Director Info */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-t border-neutral-800 pt-5">
            <div>
              <span className="text-neutral-500 font-medium">Director</span>
              <p className="text-neutral-200 font-semibold mt-0.5">{movie.director}</p>
            </div>
            <div>
              <span className="text-neutral-500 font-medium">Starring Cast</span>
              <p className="text-neutral-200 font-semibold mt-0.5">{movie.cast.join(', ')}</p>
            </div>
          </div>

          {/* Formats masteries */}
          <div className="mt-6 border-t border-neutral-800 pt-5">
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Cinema Presentation Formats Available
            </h4>
            <div className="flex flex-wrap gap-2">
              {movie.formats.map(fmt => (
                <div
                  key={fmt}
                  className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-200 flex items-center gap-2"
                >
                  <Volume2 className="h-3.5 w-3.5 text-rose-500" />
                  <span className="font-medium">{fmt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Select Showtime & Date Section */}
          <div className="mt-8 border-t border-neutral-800 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-cinematic text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="h-4 w-4 text-rose-500" />
                <span>Select Screening Date & Time</span>
              </h3>
              <span className="text-xs text-neutral-400">
                Playing at {selectedCinema.name.split('—')[0]}
              </span>
            </div>

            {/* Date selector tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {dates.map(({ dateStr, dayName, formattedDate }) => (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`flex flex-col items-center justify-center rounded-xl px-4 py-2 text-xs transition-all shrink-0 cursor-pointer ${
                    selectedDate === dateStr
                      ? 'bg-rose-600 text-white font-bold shadow-md shadow-rose-600/30'
                      : 'border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  <span className="font-semibold">{dayName}</span>
                  <span className="text-[11px] opacity-80">{formattedDate}</span>
                </button>
              ))}
            </div>

            {/* Showtime chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {showtimes.map(st => (
                <button
                  key={st.id}
                  onClick={() => {
                    onClose();
                    onSelectShowtime(st);
                  }}
                  className="group flex flex-col items-start rounded-xl border border-neutral-800 bg-neutral-950/70 p-3 hover:border-rose-500/80 hover:bg-neutral-900 transition-all text-left cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-base font-bold text-white group-hover:text-rose-400 transition-colors">
                      {st.time}
                    </span>
                    <span className="text-[10px] font-semibold text-rose-400/90 border border-rose-500/30 rounded px-1.5 py-0.5">
                      {st.format}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400 mt-1 truncate w-full">
                    {st.auditoriumName}
                  </span>
                  <span className="text-[10px] text-emerald-400 mt-1 font-medium">
                    Select Seats &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
