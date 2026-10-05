import React from 'react';
import { Cinema } from '../types/cinema';
import { Volume2, Sparkles, MapPin, CheckCircle2, Award } from 'lucide-react';

interface TheatersSectionProps {
  cinemas: Cinema[];
  selectedCinema: Cinema;
  onSelectCinema: (cinema: Cinema) => void;
  onExploreMovies: () => void;
}

export const TheatersSection: React.FC<TheatersSectionProps> = ({
  cinemas,
  selectedCinema,
  onSelectCinema,
  onExploreMovies
}) => {
  const experiences = [
    {
      name: 'IMAX Laser 70mm',
      tag: 'Peak Immersion',
      desc: 'Next-generation 4K dual laser projection system with custom-tuned 12-channel sound and an 80-foot curved floor-to-ceiling screen.',
      specs: '1.43:1 & 1.90:1 Aspect Ratio · 4K Dual Laser'
    },
    {
      name: 'Dolby Cinema & Atmos',
      tag: 'Pure Acoustic Fidelity',
      desc: 'Dolby Vision dual 4K laser HDR delivering 1,000,000:1 contrast ratio paired with 64-channel discrete overhead spatial audio.',
      specs: 'Dolby Vision HDR · 64-Channel Spatial Atmos'
    },
    {
      name: 'Lumière Reserve VIP Dine-In',
      tag: 'Ultra-Luxury Comfort',
      desc: 'Plush motorized Italian leather chaises with personal swivel tables, gourmet in-seat chef dining, and craft sommelier cocktails.',
      specs: 'Private Butler Call · Heated Chaises'
    },
    {
      name: '4DX & ScreenX 270°',
      tag: 'Multi-Sensory Action',
      desc: 'High-velocity synchronized motion seating with real-time environmental elements (wind, fog, mist, scent) and 270-degree side panoramic wings.',
      specs: '270° Multi-Projection · Haptic Motion'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Premium Formats Showcase */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
            Uncompromising Presentation
          </span>
          <h2 className="font-cinematic text-3xl font-extrabold text-white mt-1">
            Engineered For Pure Cinema
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400">
            Every Lumière auditorium is acoustically treated and calibrated for reference-grade image luminosity and pin-sharp spatial audio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map(exp => (
            <div
              key={exp.name}
              className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div>
                <span className="text-[11px] font-semibold text-rose-400 tracking-wide uppercase">
                  {exp.tag}
                </span>
                <h3 className="font-cinematic text-lg font-bold text-white mt-1">
                  {exp.name}
                </h3>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                  {exp.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-800/80 text-[11px] font-medium text-neutral-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>{exp.specs}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cinema Venues Selector */}
      <div className="border-t border-neutral-800/80 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
            Flagship Locations
          </span>
          <h2 className="font-cinematic text-3xl font-extrabold text-white mt-1">
            Select Your Preferred Theater
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400">
            Choose a location to view live showtimes, auditorium amenities, and VIP seat configurations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cinemas.map(c => {
            const isCurrent = c.id === selectedCinema.id;

            return (
              <div
                key={c.id}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'border-rose-500 bg-neutral-900/90 shadow-xl shadow-rose-950/40 ring-1 ring-rose-500/50'
                    : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-rose-400 font-semibold flex items-center gap-1.5">
                      <span className="text-base">{c.countryFlag}</span>
                      <span>{c.city}, {c.country}</span>
                    </span>
                    {isCurrent ? (
                      <span className="rounded bg-rose-600/30 text-rose-300 border border-rose-500/40 px-2 py-0.5 text-[10px] font-bold">
                        Active Theater
                      </span>
                    ) : (
                      <span className="rounded bg-neutral-800 text-neutral-400 px-2 py-0.5 text-[10px] font-mono">
                        {c.currencySymbol} {c.currency}
                      </span>
                    )}
                  </div>

                  <h3 className="font-cinematic text-xl font-bold text-white mt-2">
                    {c.name}
                  </h3>

                  <div className="flex items-start gap-1.5 text-xs text-neutral-400 mt-2">
                    <MapPin className="h-4 w-4 text-neutral-500 shrink-0 mt-0.5" />
                    <span>{c.address} ({c.distance})</span>
                  </div>

                  <div className="mt-5 space-y-2 border-t border-neutral-800/80 pt-4">
                    <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                      Amenities
                    </span>
                    <ul className="space-y-1 text-xs text-neutral-300">
                      {c.amenities.map(a => (
                        <li key={a} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <button
                    onClick={() => onSelectCinema(c)}
                    className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-rose-600 text-white'
                        : 'border border-neutral-700 bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700'
                    }`}
                  >
                    {isCurrent ? 'Current Theater' : 'Select This Location'}
                  </button>

                  <button
                    onClick={() => {
                      onSelectCinema(c);
                      onExploreMovies();
                    }}
                    className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    View Showtimes &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
