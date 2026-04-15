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