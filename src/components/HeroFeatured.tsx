import React from 'react';
import { Play, Calendar, Star, Sparkles, Volume2 } from 'lucide-react';
import { Movie, Cinema } from '../types/cinema';

interface HeroFeaturedProps {
  movie: Movie;
  selectedCinema: Cinema;
  onBookTickets: (movie: Movie) => void;
  onWatchTrailer: (movie: Movie) => void;
  onOpenRecommender: () => void;
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({
  movie,
  selectedCinema,
  onBookTickets,
  onWatchTrailer,
  onOpenRecommender
}) => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800/60 bg-neutral-950">
      {/* Background Backdrop with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-40 brightness-75 scale-105 transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/30" />
        <div className="cinema-screen-glow absolute inset-x-0 top-0 h-96 opacity-60 pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            {/* Recommendation badge & unboxed metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-300">
              <span className="font-semibold text-rose-400 tracking-wider uppercase text-[11px]">
                Featured Premiere
              </span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="flex items-center gap-1 text-amber-400 font-semibold tabular-nums">
                <Star className="h-3.5 w-3.5 fill-current" />
                {movie.rating} / 10
              </span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">{movie.ageRating}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400 tabular-nums">{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">{movie.genres.slice(0, 2).join(' / ')}</span>
            </div>

            {/* Title with balance constraint */}
            <h1 className="font-cinematic text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance leading-tight drop-shadow-md">
              {movie.title}
            </h1>

            {/* Tagline / Synopsis */}
            <p className="max-w-2xl text-base text-neutral-300 sm:text-lg leading-relaxed line-clamp-2">
              {movie.tagline}
            </p>

            {/* Formats and Venue Indicator */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <Volume2 className="h-3.5 w-3.5 text-neutral-400" />
                <span>Playing in</span>
                <strong className="text-white font-medium">{movie.formats.join(', ')}</strong>
              </span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>at {selectedCinema.name.split('—')[0]}</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              <button
                onClick={() => onBookTickets(movie)}
                className="flex items-center gap-2 rounded-lg bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/30 hover:bg-rose-500 transition-all transform active:scale-95 cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Select Seats & Book</span>
              </button>

              <button
                onClick={() => onWatchTrailer(movie)}
                className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/80 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer"
              >
                <Play className="h-4 w-4 text-rose-400 fill-rose-400" />
                <span>Watch Trailer</span>
              </button>
            </div>
          </div>

          {/* Quick AI Vibe Matchmaker Callout */}
          <div className="lg:col-span-4">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-5 backdrop-blur-sm shadow-xl">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Not sure what to watch?</h3>
                  <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                    Tell us your mood, who you're with, or your favorite movies for tailored recommendations.
                  </p>
                  <button
                    onClick={onOpenRecommender}
                    className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    <span>Launch AI Vibe Matchmaker</span>
                    <span aria-hidden="true">&rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
