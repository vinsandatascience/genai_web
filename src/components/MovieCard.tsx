import React, { useState } from 'react';
import { Star, Film, Play, Calendar } from 'lucide-react';
import { Movie } from '../types/cinema';

interface MovieCardProps {
  movie: Movie;
  onSelectMovie: (movie: Movie) => void;
  onBookTickets: (movie: Movie) => void;
  onWatchTrailer: (movie: Movie) => void;
  matchScore?: number;
  matchReason?: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onSelectMovie,
  onBookTickets,
  onWatchTrailer,
  matchScore,
  matchReason
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden transition-all duration-300 hover:border-neutral-700 hover:shadow-xl hover:shadow-black/60 hover:-translate-y-1">
      {/* Poster Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950">
        {!imgError ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* High-Fidelity Resilient Fallback Container */
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
            <Film className="h-12 w-12 text-rose-500/40 mb-3" />
            <span className="font-cinematic text-lg font-bold text-neutral-200">{movie.title}</span>
            <span className="mt-2 text-xs text-neutral-400">{movie.genres.join(' · ')}</span>
          </div>
        )}

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

        {/* Top Badges / Indicators */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
          {matchScore ? (
            <span className="rounded bg-rose-600/90 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
              {matchScore}% Match
            </span>
          ) : movie.badge ? (
            <span className="rounded bg-neutral-900/80 backdrop-blur-md px-2 py-0.5 text-[11px] font-medium text-neutral-200 border border-neutral-700/60">
              {movie.badge}
            </span>
          ) : <span />}

          <span className="flex items-center gap-1 rounded bg-black/70 backdrop-blur-md px-2 py-0.5 text-[11px] font-semibold text-amber-400 border border-neutral-700/40 tabular-nums">
            <Star className="h-3 w-3 fill-current" />
            {movie.rating}
          </span>
        </div>

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 backdrop-blur-[2px] bg-black/40 transition-opacity duration-200 group-hover:opacity-100">
          <button
            onClick={() => onWatchTrailer(movie)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-neutral-950 transition-colors shadow-lg cursor-pointer"
            title="Watch Trailer"
          >
            <Play className="h-5 w-5 fill-current ml-0.5" />
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="flex flex-1 flex-col p-4">
        {/* Unboxed Metadata */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
          <span className="text-neutral-200 font-medium flex items-center gap-1">
            <span>{movie.countryFlag}</span>
            <span>{movie.country}</span>
          </span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="tabular-nums">{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="truncate">{movie.genres[0]}</span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelectMovie(movie)}
          className="mt-1.5 font-cinematic text-base font-bold text-white group-hover:text-rose-400 transition-colors cursor-pointer line-clamp-1"
        >
          {movie.title}
        </h3>

        {/* Language & Subtitle indicator */}
        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-neutral-400">
          <span className="text-neutral-300 font-medium">{movie.originalLanguage}</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="text-neutral-400 truncate">Subs: {movie.subtitles.slice(0, 2).join(', ')}</span>
        </div>

        {/* Formats and festival award */}
        <div className="mt-1 flex items-center justify-between text-[11px]">
          <span className="text-neutral-400 truncate">{movie.formats.join(' · ')}</span>
        </div>

        {movie.festivalAward && (
          <div className="mt-1.5 text-[10px] text-amber-300/90 font-medium truncate flex items-center gap-1">
            <span>🏆</span>
            <span>{movie.festivalAward}</span>
          </div>
        )}

        {/* Match reason if provided */}
        {matchReason && (
          <p className="mt-2 text-[11px] text-rose-300/90 leading-tight bg-rose-950/30 border border-rose-800/30 rounded p-1.5 line-clamp-2">
            {matchReason}
          </p>
        )}

        {/* Card Footer with Working CTA */}
        <div className="mt-auto pt-4 flex items-center gap-2">
          <button
            onClick={() => onBookTickets(movie)}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-rose-600/90 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-500 transition-colors cursor-pointer"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Book Seats</span>
          </button>
          
          <button
            onClick={() => onSelectMovie(movie)}
            className="rounded-lg border border-neutral-700 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
