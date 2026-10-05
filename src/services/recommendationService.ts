import { GoogleGenAI } from '@google/genai';
import { Movie, RecommendationFilter } from '../types/cinema';
import { MOVIES } from '../data/mockData';

export interface ScoredMovie {
  movie: Movie;
  score: number; // 0 - 100
  reason: string;
  highlightTag: string;
}

// Client-safe recommendation engine with Gemini API capability
export async function getPersonalizedRecommendations(
  filter: RecommendationFilter,
  apiKey?: string
): Promise<ScoredMovie[]> {
  // If user provided custom open-ended search query and API key is present
  const activeKey = apiKey || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : undefined);

  if (filter.query && activeKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: activeKey });
      const prompt = `You are an elite cinema concierge.
Here is the current theater movie catalog in JSON:
${JSON.stringify(MOVIES.map(m => ({ id: m.id, title: m.title, genres: m.genres, moodTags: m.moodTags, synopsis: m.synopsis, formats: m.formats })))}

User query/preference: "${filter.query}"
User mood: "${filter.mood || 'any'}"
Companion: "${filter.companion || 'any'}"
Preferred format: "${filter.format || 'any'}"

Return a JSON array of the top 3 recommended movie IDs from the catalog with a match score (70-99) and a 1-sentence personalized explanation why it fits their vibe.
JSON schema format:
[
  { "id": "chrono-horizon", "score": 96, "reason": "...", "highlightTag": "Cosmic Immersion" }
]
Only return raw JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text) as { id: string; score: number; reason: string; highlightTag: string }[];
        const scored = parsed
          .map(item => {
            const movie = MOVIES.find(m => m.id === item.id);
            if (!movie) return null;
            return {
              movie,
              score: item.score,
              reason: item.reason,
              highlightTag: item.highlightTag || 'Best Vibe Match'
            };
          })
          .filter(Boolean) as ScoredMovie[];

        if (scored.length > 0) {
          // Fill rest with heuristic if less than 3
          const existingIds = new Set(scored.map(s => s.movie.id));
          const rest = getHeuristicRecommendations(filter).filter(s => !existingIds.has(s.movie.id));
          return [...scored, ...rest];
        }
      }
    } catch {
      // Fallback silently to heuristic engine
    }
  }

  return getHeuristicRecommendations(filter);
}

export function getHeuristicRecommendations(filter: RecommendationFilter): ScoredMovie[] {
  const scored = MOVIES.map(movie => {
    let score = 70;
    const reasons: string[] = [];

    // Mood match
    if (filter.mood && filter.mood !== 'All Vibes') {
      const hasMood = movie.moodTags.some(m => m.toLowerCase().includes(filter.mood.toLowerCase()));
      if (hasMood) {
        score += 15;
        reasons.push(`Tailor-made for a ${filter.mood.toLowerCase()} experience`);
      }
    }

    // Genre match
    if (filter.genre && filter.genre !== 'All Genres') {
      const hasGenre = movie.genres.some(g => g.toLowerCase().includes(filter.genre.toLowerCase()));
      if (hasGenre) {
        score += 10;
        reasons.push(`Top-rated in ${filter.genre}`);
      }
    }

    // Companion match
    if (filter.companion) {
      if (filter.companion === 'Date Night' && (movie.genres.includes('Romance') || movie.genres.includes('Drama') || movie.moodTags.includes('Date Night'))) {
        score += 12;
        reasons.push('Voted #1 pick for an intimate date night atmosphere');
      } else if (filter.companion === 'Family' && (movie.ageRating === 'PG' || movie.genres.includes('Animation') || movie.moodTags.includes('Family Outing'))) {
        score += 14;
        reasons.push('Wholesome entertainment perfect for all ages');
      } else if (filter.companion === 'Solo Cinema' && (movie.moodTags.includes('Mind-Bending') || movie.moodTags.includes('Dark Thriller'))) {
        score += 10;
        reasons.push('Captivating deep focus film best enjoyed in total immersion');
      } else if (filter.companion === 'Friends' && (movie.genres.includes('Action') || movie.moodTags.includes('Adrenaline Rush'))) {
        score += 10;
        reasons.push('High-energy thrill ride great to experience with friends');
      }
    }

    // Format match
    if (filter.format && filter.format !== 'Any Format') {
      if (movie.formats.includes(filter.format as any)) {
        score += 8;
        reasons.push(`Mastered specifically for ${filter.format}`);
      }
    }

    // World Region match
    if (filter.region && filter.region !== 'All' && filter.region !== 'All World') {
      if (movie.region.toLowerCase().includes(filter.region.toLowerCase()) || movie.country.toLowerCase().includes(filter.region.toLowerCase())) {
        score += 15;
        reasons.push(`Acclaimed ${movie.country} cinema (${movie.region})`);
      }
    }

    // Country match
    if (filter.country && filter.country !== 'All') {
      if (movie.country.toLowerCase() === filter.country.toLowerCase()) {
        score += 18;
        reasons.push(`Premiering from ${movie.country}`);
      }
    }

    // Query text match (country, director, title, language)
    if (filter.query && filter.query.trim()) {
      const q = filter.query.toLowerCase();
      if (
        movie.title.toLowerCase().includes(q) ||
        movie.synopsis.toLowerCase().includes(q) ||
        movie.country.toLowerCase().includes(q) ||
        movie.region.toLowerCase().includes(q) ||
        movie.originalLanguage.toLowerCase().includes(q) ||
        movie.genres.some(g => g.toLowerCase().includes(q))
      ) {
        score += 16;
        reasons.push(`Matches your search for "${filter.query}"`);
      }
    }

    // Rating boost
    score += Math.round((movie.rating - 8.0) * 5);
    score = Math.min(99, Math.max(72, score));

    // Determine highlight tag
    let highlightTag = 'Recommended For You';
    if (score >= 94) highlightTag = '99% Perfect Match';
    else if (movie.formats.includes('IMAX Laser')) highlightTag = 'Must-See in IMAX';
    else if (movie.rating >= 9.0) highlightTag = 'Critical Masterpiece';

    const fallbackReason = reasons.length > 0 
      ? reasons.join(' · ')
      : `High audience rating of ${movie.rating}/10 and breathtaking ${movie.formats[0]} presentation.`;

    return {
      movie,
      score,
      reason: fallbackReason,
      highlightTag
    };
  });

  return scored.sort((a, b) => b.score - a.score);
}
