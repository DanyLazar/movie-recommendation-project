import React from 'react';

const MovieCardCompact = ({ movie, onClick }) => {
  const hasPoster = movie.Poster && movie.Poster !== 'N/A';
  const rtRating = movie.Ratings?.find(r => r.Source === 'Rotten Tomatoes')?.Value;
  const imdbRating = movie.imdbRating;

  return (
    <div
      onClick={() => onClick(movie)}
      className="rounded-xl overflow-hidden transition-transform duration-200 hover:scale-105 cursor-pointer"
      style={{
        background: '#12121a',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      }}
    >
      <div className="relative" style={{ height: '280px' }}>
        {hasPoster ? (
          <img src={movie.Poster} alt={movie.Title} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1a1a28, #0f0f1a)' }}
          >
            <span className="text-4xl">🎬</span>
          </div>
        )}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: '60%', background: 'linear-gradient(to top, #12121a 0%, transparent 100%)' }}
        />
        {imdbRating && imdbRating !== 'N/A' && (
          <div className="absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-bold"
            style={{ background: '#f5c518', color: '#000' }}>
            ⭐ {imdbRating}
          </div>
        )}
        {rtRating && (
          <div className="absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-bold"
            style={{ background: 'rgba(250,50,10,0.85)', color: '#fff' }}>
            🍅 {rtRating}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm leading-tight truncate">{movie.Title}</h3>
        <p className="text-gray-600 text-xs mt-1">{movie.Year} · {movie.Runtime}</p>
        <p className="text-gray-500 text-xs mt-1 truncate">{movie.Genre}</p>
      </div>
    </div>
  );
};

export default MovieCardCompact;