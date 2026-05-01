const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 ore în milisecunde

export const saveMovieToCache = (title, data) => {
  const entry = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(title.toLowerCase(), JSON.stringify(entry));
};

export const getMovieFromCache = (title) => {
  const cached = localStorage.getItem(title.toLowerCase());
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > EXPIRATION_TIME) {
    localStorage.removeItem(title.toLowerCase()); // Expiră
    return null;
  }
  return data;
};
// Salvează un titlu în istoricul de căutări
export const saveToHistory = (title) => {
  const history = getHistory();
  const updated = [title, ...history.filter(t => t.toLowerCase() !== title.toLowerCase())].slice(0, 10);
  localStorage.setItem('search_history', JSON.stringify(updated));
};

// Returnează istoricul de căutări
export const getHistory = () => {
  try {
    return JSON.parse(localStorage.getItem('search_history')) || [];
  } catch {
    return [];
  }
};

// Șterge tot istoricul
export const clearHistory = () => {
  localStorage.removeItem('search_history');
};