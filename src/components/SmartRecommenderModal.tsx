import React, { useState, useEffect } from 'react';
import { Sparkles, X, Star, Calendar, ArrowRight, Compass, Film, Zap } from 'lucide-react';
import { Movie, RecommendationFilter } from '../types/cinema';
import { getPersonalizedRecommendations, ScoredMovie } from '../services/recommendationService';

interface SmartRecommenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMovieToBook: (movie: Movie) => void;
}

export const SmartRecommenderModal: React.FC<SmartRecommenderModalProps> = ({
  isOpen,
  onClose,
  onSelectMovieToBook
}) => {
  const [selectedMood, setSelectedMood] = useState<string>('Mind-Bending');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCompanion, setSelectedCompanion] = useState<string>('Solo Cinema');
  const [selectedFormat, setSelectedFormat] = useState<string>('IMAX Laser');
  const [customQuery, setCustomQuery] = useState<string>('');
  const [recommendations, setRecommendations] = useState<ScoredMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const regionOptions = [
    { label: 'All World 🌍', value: 'All' },
    { label: 'Hollywood / USA 🇺🇸', value: 'North America' },
    { label: 'Bollywood & India 🇮🇳', value: 'India & South Asia' },
    { label: 'East Asia 🇯🇵 🇰🇷', value: 'East Asia' },
    { label: 'Europe 🇫🇷 🇬🇧', value: 'Europe' },
    { label: 'Latin America 🇲🇽', value: 'Latin America' },
    { label: 'Middle East 🇦🇪', value: 'Middle East' }
  ];

  const moodOptions = [
    'Mind-Bending',
    'Visual Spectacle',
    'Adrenaline Rush',
    'Dark Thriller',
    'Feel Good',
    'Epic Immersion'
  ];

  const companionOptions = [
    'Solo Cinema',
    'Date Night',
    'Friends Crew',
    'Family Outing'
  ];

  const formatOptions = [
    'Any Format',
    'IMAX Laser',
    'Dolby Atmos',
    '4DX Motion'
  ];

  const presetQueries = [
    'Bollywood epic with massive battles & music',
    'Japanese anime fantasy with spirit worlds',
    'High stakes Korean neo-noir thriller',
    'Interstellar cosmic sci-fi space odyssey',
    'Romantic Parisian Montmartre indie drama',
    'Ancient desert epic across the dunes'
  ];

  const runRecommendation = async () => {
    setIsLoading(true);
    const filter: RecommendationFilter = {
      mood: selectedMood,
      companion: selectedCompanion,
      format: selectedFormat,
      genre: 'All Genres',
      region: selectedRegion,
      query: customQuery
    };

    const results = await getPersonalizedRecommendations(filter);
    setRecommendations(results);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      runRecommendation();
    }
  }, [isOpen, selectedMood, selectedRegion, selectedCompanion, selectedFormat]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-neutral-700 bg-neutral-900 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 text-rose-400 mb-2">
          <Sparkles className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Personalized Global Cinema Intelligence
          </span>
        </div>
        <h2 className="font-cinematic text-2xl sm:text-3xl font-bold text-white">
          Lumière World Vibe Matchmaker
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-neutral-400">
          Match your mood with movies from all over the world: Hollywood, Bollywood, Japanese Anime, Korean Thrillers, and European Masterpieces.
        </p>

        {/* Questionnaire Controls */}
        <div className="my-6 space-y-5 rounded-xl border border-neutral-800 bg-neutral-950/60 p-5">
          {/* World Region selection */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-2">
              1. Which part of the world would you like to explore?
            </label>
            <div className="flex flex-wrap gap-2">
              {regionOptions.map(r => (
                <button
                  key={r.value}
                  onClick={() => setSelectedRegion(r.value)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    selectedRegion === r.value
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mood selection */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-2">
              2. What vibe are you craving?
            </label>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map(mood => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                    selectedMood === mood
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          {/* Companion selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2">
                2. Who is joining you?
              </label>
              <div className="flex flex-wrap gap-2">
                {companionOptions.map(comp => (
                  <button
                    key={comp}
                    onClick={() => setSelectedCompanion(comp)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      selectedCompanion === comp
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    {comp}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2">
                3. Preferred Audio-Visual Experience
              </label>
              <div className="flex flex-wrap gap-2">
                {formatOptions.map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      selectedFormat === fmt
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Natural Language Prompt Input */}
          <div className="pt-2 border-t border-neutral-800/80">
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Or describe in your own words (films you liked, themes, pacing):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && runRecommendation()}
                placeholder="e.g. Like Interstellar with deep synths and jaw-dropping space visuals..."
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none"
              />
              <button
                onClick={runRecommendation}
                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500 transition-colors shrink-0 flex items-center gap-1.5"
              >
                <Zap className="h-3.5 w-3.5" />
                <span>Match</span>
              </button>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] text-neutral-500">Quick suggestions:</span>
              {presetQueries.map(preset => (
                <button
                  key={preset}
                  onClick={() => {
                    setCustomQuery(preset);
                    setTimeout(() => runRecommendation(), 50);
                  }}
                  className="rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-[11px] text-neutral-400 hover:text-rose-300 hover:border-rose-900 transition-colors"
                >
                  "{preset}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Showcase */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-cinematic text-lg font-bold text-white flex items-center gap-2">
              <span>Top Matches For You</span>
            </h3>
            <span className="text-xs text-neutral-400">
              Ranked by personalized affinity algorithm
            </span>
          </div>

          {isLoading ? (
            <div className="py-12 text-center text-xs text-neutral-400 animate-pulse">
              Analyzing cinematic catalog & matching audio-visual specs...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.slice(0, 4).map(({ movie, score, reason, highlightTag }) => (
                <div
                  key={movie.id}
                  className="flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 hover:border-neutral-700 transition-all group"
                >
                  <div>
                    <div className="flex items-start gap-3">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        referrerPolicy="no-referrer"
                        className="h-24 w-18 rounded-lg object-cover border border-neutral-800 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="rounded bg-rose-600/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 text-[10px] font-bold">
                            {score}% Match
                          </span>
                          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 tabular-nums">
                            <Star className="h-3 w-3 fill-current" />
                            {movie.rating}
                          </span>
                        </div>

                        <h4 className="font-cinematic text-sm font-bold text-white mt-1 group-hover:text-rose-400 transition-colors truncate flex items-center gap-1.5">
                          <span>{movie.countryFlag}</span>
                          <span className="truncate">{movie.title}</span>
                        </h4>

                        <div className="text-[11px] text-neutral-400 mt-0.5">
                          {movie.country} · {movie.originalLanguage} · {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
                        </div>

                        <div className="text-[11px] text-neutral-400 mt-0.5 truncate">
                          Formats: {movie.formats.join(', ')}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 rounded-lg bg-neutral-900/80 p-2.5 border border-neutral-800/80 text-xs text-rose-300/90 leading-relaxed">
                      <strong className="text-white block text-[11px] mb-0.5">Why this fits:</strong>
                      {reason}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-400">
                      {highlightTag}
                    </span>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectMovieToBook(movie);
                      }}
                      className="flex items-center gap-1.5 rounded-lg bg-rose-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-rose-500 transition-colors shadow-sm"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Book Seats</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
