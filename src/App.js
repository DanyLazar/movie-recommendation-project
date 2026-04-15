import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import Loader from './components/Loader';
import GenreFilter from './components/GenreFilter';
import { useMovieData } from './hooks/useMovieData';

function App() {
  const { movie, loading, error, searchMovie } = useMovieData();
  const [selectedGenre, setSelectedGenre] = useState('All');

  // Filtrare simplă: dacă genul selectat nu se regăsește în film, nu-l afișăm
  const isVisible = movie && (selectedGenre === 'All' || movie.Genre.includes(selectedGenre));

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <header className="text-center my-8">
        <h1 className="text-3xl font-bold uppercase">Movie Finder Pro</h1>
      </header>

      <SearchBar onSearch={searchMovie} />
      
      <GenreFilter selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />

      {loading && <Loader />}
      
      {error && <p className="text-red-500 text-center">{error}</p>}

      {isVisible ? (
        <MovieCard movie={movie} />
      ) : (
        movie && <p className="text-center text-gray-400">Filmul nu aparține genului selectat.</p>
      )}
    </div>
  );
}

export default App;