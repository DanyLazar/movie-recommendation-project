import React from 'react';

// Afiseaza o recomandare bazata pe scorul Rotten Tomatoes sau Metascore
const Recommendation = ({ movie }) => {
  const rtRating = movie.Ratings?.find(r => r.Source === "Rotten Tomatoes")?.Value;
  const score = rtRating ? parseInt(rtRating) : parseInt(movie.Metascore);

  if (!score || isNaN(score)) return null;

  let config;
  if (score > 80) {
    config = {
      emoji: '🍿',
      text: 'Ar trebui să vizionezi acest film chiar acum!',
      sub: `Scor critic: ${rtRating || movie.Metascore}`,
      borderColor: 'rgba(75,232,122,0.4)',
      bgColor: 'rgba(75,232,122,0.06)',
      textColor: '#4be87a',
    };
  } else if (score < 50) {
    config = {
      emoji: '🚫',
      text: 'Evită filmul cu orice preț!',
      sub: `Scor critic: ${rtRating || movie.Metascore}`,
      borderColor: 'rgba(232,75,75,0.4)',
      bgColor: 'rgba(232,75,75,0.06)',
      textColor: '#e84b4b',
    };
  } else {
    config = {
      emoji: '🎭',
      text: 'Merită o vizionare dacă ești fan al genului.',
      sub: `Scor critic: ${rtRating || movie.Metascore}`,
      borderColor: 'rgba(232,184,75,0.3)',
      bgColor: 'rgba(232,184,75,0.05)',
      textColor: '#e8b84b',
    };
  }

  return (
    <div
      className="mt-5 p-4 rounded-xl flex items-start gap-3 animate-fade-in-up"
      style={{
        border: `1px solid ${config.borderColor}`,
        background: config.bgColor,
      }}
    >
      <span className="text-2xl">{config.emoji}</span>
      <div>
        <p className="font-semibold" style={{ color: config.textColor }}>{config.text}</p>
        <p className="text-gray-600 text-xs mt-0.5">{config.sub}</p>
      </div>
    </div>
  );
};

export default Recommendation;
