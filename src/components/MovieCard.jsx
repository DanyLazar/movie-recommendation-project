import React from 'react';
import Recommendation from './Recommendation';

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white text-black rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row p-6 gap-6">
      <img 
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=Fara+Poster"} 
        alt={movie.Title} 
        className="w-full md:w-64 object-cover rounded shadow-md"
      />
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-2">{movie.Title} <span className="text-gray-500 text-xl">({movie.Year})</span></h2>
        <p className="text-sm text-gray-600 mb-4 uppercase tracking-widest">{movie.Rated} | {movie.Runtime} | {movie.Genre}</p>
        <p className="text-lg italic mb-4">"{movie.Plot}"</p>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-bold mb-2 border-b border-gray-300 pb-1">Evaluări:</h4>
          {movie.Ratings && movie.Ratings.map((r, i) => (
            <div key={i} className="flex justify-between text-sm py-1">
              <span className="font-semibold">{r.Source}</span>
              <span className="text-blue-600 font-bold">{r.Value}</span>
            </div>
          ))}
        </div>

        {/* Chemăm componenta de recomandare în interiorul cardului */}
        <Recommendation movie={movie} />
      </div>
    </div>
  );
};

export default MovieCard;