import React from 'react';
import Recommendation from './Recommendation';

// Mapare sursa rating -> emoji si culoare
const ratingMeta = {
  "Internet Movie Database": { label: "IMDb", emoji: "⭐", color: "#f5c518" },
  "Rotten Tomatoes":         { label: "Rotten Tomatoes", emoji: "🍅", color: "#fa320a" },
  "Metacritic":              { label: "Metacritic", emoji: "🟡", color: "#ffcc34" },
};

// Card principal cu toate informatiile despre film
const MovieCard = ({ movie }) => {
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <div
      className="rounded-2xl overflow-hidden animate-fade-in-up"
      style={{
        background: '#12121a',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        animationDelay: '0.15s',
      }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Poster */}
        <div className="md:w-60 flex-shrink-0 relative">
          {hasPoster ? (
            <img
              src={movie.Poster}
              alt={`Poster ${movie.Title}`}
              className="w-full h-full object-cover"
              style={{ minHeight: '300px', maxHeight: '420px' }}
            />
          ) : (
            <div
              className="w-full flex items-center justify-center text-gray-700"
              style={{
                minHeight: '300px',
                background: 'linear-gradient(135deg, #1a1a28, #0f0f1a)',
              }}
            >
              <div className="text-center">
                <p className="text-5xl mb-2">🎬</p>
                <p className="text-xs text-gray-600">Fără poster</p>
              </div>
            </div>
          )}
          {/* Overlay gradient pe poster */}
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background: 'linear-gradient(to right, transparent 60%, #12121a 100%)',
            }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 p-6 md:p-8">
          {/* Titlu + An */}
          <div className="mb-1">
            <h2
              style={{ fontFamily: '"Bebas Neue", cursive', fontSize: '2.8rem', lineHeight: 1, letterSpacing: '0.03em' }}
              className="text-white"
            >
              {movie.Title}
            </h2>
            <span className="text-yellow-500 text-lg font-light">{movie.Year}</span>
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-2 mt-3 mb-5">
            {[movie.Rated, movie.Runtime, ...movie.Genre.split(', ')].map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#8888aa',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Plot */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6 italic border-l-2 border-yellow-500/30 pl-4">
            {movie.Plot}
          </p>

          {/* Director & Actori */}
          {movie.Director && movie.Director !== 'N/A' && (
            <p className="text-xs text-gray-600 mb-1">
              <span className="text-gray-500 uppercase tracking-wider">Regie: </span>
              <span className="text-gray-400">{movie.Director}</span>
            </p>
          )}
          {movie.Actors && movie.Actors !== 'N/A' && (
            <p className="text-xs text-gray-600 mb-5">
              <span className="text-gray-500 uppercase tracking-wider">Actori: </span>
              <span className="text-gray-400">{movie.Actors}</span>
            </p>
          )}

          {/* Ratinguri din multiple surse */}
          {movie.Ratings && movie.Ratings.length > 0 && (
            <div
              className="rounded-xl p-4 mb-4"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">Evaluări</p>
              <div className="flex flex-wrap gap-4">
                {movie.Ratings.map((r, i) => {
                  const meta = ratingMeta[r.Source] || { label: r.Source, emoji: '📊', color: '#888' };
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-lg">{meta.emoji}</span>
                      <div>
                        <p className="text-xs text-gray-600">{meta.label}</p>
                        <p className="font-bold text-sm" style={{ color: meta.color }}>{r.Value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recomandare */}
          <Recommendation movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
