import React from 'react';

const Recommendation = ({ movie }) => {
  // OMDb returnează Metascore sau scorul din Ratings[]
  // Căutăm scorul Rotten Tomatoes
  const rtRating = movie.Ratings?.find(r => r.Source === "Rotten Tomatoes")?.Value;
  const score = rtRating ? parseInt(rtRating) : parseInt(movie.Metascore);

  if (!score || isNaN(score)) return null;

  return (
    <div className="mt-4 p-4 rounded-md border-2">
      {score > 80 ? (
        <p className="text-green-500 font-bold underline">Ar trebui să vizionați acest film chiar acum!</p>
      ) : score < 50 ? (
        <p className="text-red-500 font-bold italic">Evitați filmul cu orice preț!</p>
      ) : (
        <p className="text-blue-400 font-semibold">Merită o vizionare dacă ești fan al genului.</p>
      )}
    </div>
  );
};

export default Recommendation;