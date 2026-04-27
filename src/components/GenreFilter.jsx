import React from 'react';

// Lista de genuri disponibile pentru filtrare
const genres = ["All", "Action", "Adventure", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller", "Animation"];

const GenreFilter = ({ selectedGenre, onGenreChange }) => {
  return (
    <div
      className="flex flex-wrap gap-2 justify-center mb-10 animate-fade-in-up"
      style={{ animationDelay: '0.2s' }}
    >
      {genres.map(g => {
        const isActive = selectedGenre === g;
        return (
          <button
            key={g}
            onClick={() => onGenreChange(g)}
            className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200"
            style={{
              background: isActive ? 'rgba(232,184,75,0.15)' : 'rgba(255,255,255,0.04)',
              border: isActive ? '1px solid rgba(232,184,75,0.6)' : '1px solid rgba(255,255,255,0.08)',
              color: isActive ? '#e8b84b' : '#5a5a7a',
              transform: isActive ? 'scale(1.05)' : 'scale(1)',
              boxShadow: isActive ? '0 0 12px rgba(232,184,75,0.2)' : 'none',
            }}
          >
            {g}
          </button>
        );
      })}
    </div>
  );
};

export default GenreFilter;
