import React, { useState } from 'react';

// Componenta bara de cautare - trimite titlul filmului catre parinte
const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) onSearch(term.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 animate-fade-in-up"
      style={{ animationDelay: '0.1s' }}
    >
      <div
        className="flex items-center rounded-xl overflow-hidden"
        style={{
          background: '#12121a',
          border: '1px solid rgba(232,184,75,0.25)',
          boxShadow: '0 0 30px rgba(232,184,75,0.06)',
        }}
      >
        <span className="pl-5 text-yellow-500 text-lg">🔍</span>
        <input
          className="flex-1 bg-transparent px-4 py-4 text-white placeholder-gray-600 outline-none text-base"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Introdu numele filmului... (ex: Inception)"
          autoFocus
        />
        <button
          type="submit"
          className="m-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #e8b84b, #d4a030)',
            color: '#0a0a0f',
            fontFamily: '"DM Sans", sans-serif',
          }}
          onMouseEnter={e => e.target.style.opacity = '0.85'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >
          Caută
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
