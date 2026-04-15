import React from 'react';

const genres = ["All", "Action", "Adventure", "Comedy", "Drama", "Sci-Fi", "Thriller"];

const GenreFilter = ({ selectedGenre, onGenreChange }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {genres.map(g => (
        <button
          key={g}
          onClick={() => onGenreChange(g)}
          className={`px-4 py-1 rounded-full border transition-all ${
            selectedGenre === g 
            ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
            : 'bg-transparent text-gray-500 border-gray-300 hover:border-blue-400'
          }`}
        >
          {g}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;