const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
export const getMovieByTitle = async (title) => {
  const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`);
  const data = await response.json();
  return data;
};