import { useState } from 'react';
import { getMovieByTitle } from '../services/api';
import { getMovieFromCache, saveMovieToCache } from '../utils/storage';

export const useMovieData = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovie = async (title) => {
    setLoading(true);
    setError(null);

    // 1. Încearcă din Cache
    const cachedData = getMovieFromCache(title);
    if (cachedData) {
      setMovie(cachedData);
      setLoading(false);
      return;
    }

    // 2. Dacă nu e în cache, ia de pe API
    try {
      const data = await getMovieByTitle(title);
      if (data.Response === "True") {
        setMovie(data);
        saveMovieToCache(title, data);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError("Eroare de rețea.");
    } finally {
      setLoading(false);
    }
  };

  return { movie, loading, error, searchMovie };
};