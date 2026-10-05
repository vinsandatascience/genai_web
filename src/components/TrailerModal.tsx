import React from 'react';
import { X, Play, Volume2, Film } from 'lucide-react';
import { Movie } from '../types/cinema';

interface TrailerModalProps {
  movie: Movie | null;
  onClose: () => void;
  onBookTickets: (movie: Movie) => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
  movie,
  onClose,
  onBookTickets
}) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-2xl border border-neutral-700 bg-neutral-950 overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-black/70 p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Video Screen Container */}
        <div className="relative aspect-video w-full bg-black">
          {movie.trailerYoutubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${movie.trailerYoutubeId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center text-center p-8 bg-neutral-900">
              <Film className="h-16 w-16 text-rose-500 mb-4 animate-pulse" />
              <h3 className="font-cinematic text-xl font-bold text-white">{movie.title} - Official Teaser</h3>
              <p className="mt-2 text-xs text-neutral-400 max-w-md">
                Experiencing theater preview stream with master Dolby Atmos soundtrack.
              </p>
            </div>
          )}
        </div>

        {/* Lower Info Bar */}
        <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-neutral-800 bg-neutral-900/90">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span className="font-bold text-rose-400">{movie.formats.join(' · ')}</span>
              <span aria-hidden="true">·</span>
              <span>{movie.duration} mins</span>
              <span aria-hidden="true">·</span>
              <span>Rated {movie.ageRating}</span>
            </div>
            <h4 className="font-cinematic text-lg font-bold text-white mt-0.5">
              {movie.title}
            </h4>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onBookTickets(movie);
              }}
              className="rounded-lg bg-rose-600 px-5 py-2 text-xs font-semibold text-white hover:bg-rose-500 transition-colors shadow-lg shadow-rose-600/30 cursor-pointer"
            >
              Book Tickets Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
