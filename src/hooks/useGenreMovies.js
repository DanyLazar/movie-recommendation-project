import { useState, useCallback } from 'react';
import { getMovieByTitle } from '../services/api';
import { getMovieFromCache, saveMovieToCache } from '../utils/storage';
import moviesByGenre from '../data/moviesByGenre';

// Hook pentru fetch-ul filmelor dintr-un gen predefinit
export const useGenreMovies = () => {
  const [genreMovies, setGenreMovies] = useState([]);
  const [loadingGenre, setLoadingGenre] = useState(false);

  const fetchGenreMovies = useCallback(async (genre) => {
    if (genre === 'All') {
      setGenreMovies([]);
      return;
    }

    const titles = moviesByGenre[genre] || [];
    setLoadingGenre(true);
    setGenreMovies([]);

    // Fetch toate filmele din gen, cu cache
    const results = await Promise.all(
      titles.map(async (title) => {
        const cached = getMovieFromCache(title);
        if (cached) return cached;

        try {
          const data = await getMovieByTitle(title);
          if (data.Response === 'True') {
            saveMovieToCache(title, data);
            return data;
          }
          return null;
        } catch {
          return null;
        }
      })
    );

    setGenreMovies(results.filter(Boolean));
    setLoadingGenre(false);
  }, []);

  return { genreMovies, loadingGenre, fetchGenreMovies };
};