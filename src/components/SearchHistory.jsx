import React from 'react';
import { clearHistory } from '../utils/storage';

// Afiseaza istoricul cautarilor recente ale utilizatorului
const SearchHistory = ({ history, onSelect, onClear }) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="mb-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-gray-600 uppercase tracking-widest">Căutări recente</p>
        <button
          onClick={() => { clearHistory(); onClear(); }}
          className="text-xs text-gray-700 hover:text-red-400 transition-colors"
        >
          Șterge tot
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((title, i) => (
          <button
            key={i}
            onClick={() => onSelect(title)}
            className="px-3 py-1.5 rounded-full text-xs transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#8888aa',
            }}
            onMouseEnter={e => {
              e.target.style.borderColor = 'rgba(232,184,75,0.4)';
              e.target.style.color = '#e8b84b';
            }}
            onMouseLeave={e => {
              e.target.style.borderColor = 'rgba(255,255,255,0.08)';
              e.target.style.color = '#8888aa';
            }}
          >
            🕐 {title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;