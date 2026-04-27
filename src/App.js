import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieCardCompact from './components/MovieCardCompact';
import Loader from './components/Loader';
import GenreFilter from './components/GenreFilter';
import { useMovieData } from './hooks/useMovieData';
import { useGenreMovies } from './hooks/useGenreMovies';

function App() {
  const { movie, loading, error, searchMovie: fetchMovie } = useMovieData();
  const { genreMovies, loadingGenre, fetchGenreMovies } = useGenreMovies();
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchedMovie, setSearchedMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Cautare dupa titlu — reseteaza genul si modul browse
  const searchMovie = (title) => {
    setSelectedGenre('All');
    setSearchedMovie(title);
    setSelectedMovie(null);
    fetchMovie(title);
  };

  // Schimbare gen — reseteaza cautarea si incarca filmele din gen
  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setSearchedMovie(null);
    setSelectedMovie(null);
    fetchGenreMovies(genre);
  };

  const isSearchMode = !!searchedMovie;
  const isBrowseMode = !isSearchMode && selectedGenre !== 'All';

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      {/* Hero Header */}
      <header className="relative overflow-hidden py-16 px-4 text-center border-b border-yellow-500/20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(232,184,75,0.12) 0%, transparent 70%)',
          }}
        />
        <p className="text-yellow-400 tracking-[0.3em] text-xs uppercase mb-3 font-light opacity-80">
          Descoperă · Explorează · Vizionează
        </p>
        <h1
          style={{ fontFamily: '"Bebas Neue", cursive', letterSpacing: '0.05em' }}
          className="text-7xl md:text-9xl text-white leading-none"
        >
          Movie Finder
          <span className="text-yellow-400"> Pro</span>
        </h1>
        <p className="mt-4 text-gray-400 text-sm max-w-md mx-auto">
          Caută orice film sau explorează după gen.
        </p>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <SearchBar onSearch={searchMovie} />
        <GenreFilter selectedGenre={selectedGenre} onGenreChange={handleGenreChange} />

        {/* ── MOD SEARCH: rezultat unic ── */}
        {isSearchMode && (
          <>
            {loading && <Loader />}
            {error && (
              <div className="text-center mt-10 animate-fade-in-up">
                <p className="text-2xl mb-2">🎬</p>
                <p className="text-red-400 font-medium">{error}</p>
                <p className="text-gray-600 text-sm mt-1">Verifică titlul și încearcă din nou.</p>
              </div>
            )}
            {movie && !loading && <MovieCard movie={movie} />}
          </>
        )}

        {/* ── MOD BROWSE GEN: grila sau detaliu film selectat ── */}
        {isBrowseMode && (
          <>
            {loadingGenre && <Loader />}

            {/* Detaliu film selectat din grilă */}
            {selectedMovie && (
              <div className="animate-fade-in-up">
                <button
                  onClick={() => setSelectedMovie(null)}
                  className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  ← Înapoi la {selectedGenre}
                </button>
                <MovieCard movie={selectedMovie} />
              </div>
            )}

            {/* Grilă filme gen */}
            {!loadingGenre && !selectedMovie && genreMovies.length > 0 && (
              <div className="animate-fade-in-up">
                <p className="text-gray-600 text-xs uppercase tracking-widest mb-6">
                  {genreMovies.length} filme în categoria{' '}
                  <span className="text-yellow-500">{selectedGenre}</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {genreMovies.map((m, i) => (
                    <MovieCardCompact key={i} movie={m} onClick={setSelectedMovie} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ── EMPTY STATE ── */}
        {!isSearchMode && !isBrowseMode && (
          <div className="text-center mt-20 animate-fade-in-up">
            <p className="text-6xl mb-4">🎥</p>
            <p className="text-gray-500 text-lg">Caută un film sau alege un gen</p>
            <p className="text-gray-700 text-sm mt-2">Ex: Inception, Interstellar, The Dark Knight...</p>
          </div>
        )}
      </main>

      <footer className="text-center py-8 text-gray-700 text-xs border-t border-white/5 mt-10">
        Date furnizate de <span className="text-yellow-500">OMDb API</span> · Proiect 13 Web Dev
      </footer>
    </div>
  );
}

export default App;