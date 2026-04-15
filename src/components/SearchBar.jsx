import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input 
        className="text-black p-2 rounded-l-md"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Numele filmului..."
      />
      <button className="bg-blue-600 p-2 rounded-r-md hover:bg-blue-700" type="submit">
        Caută
      </button>
    </form>
  );
};

export default SearchBar;