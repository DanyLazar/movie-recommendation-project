import React from 'react';

// Indicator de incarcare afisat in timp ce se obtin datele din API
const Loader = () => (
  <div className="flex flex-col items-center justify-center my-16 gap-4 animate-fade-in-up">
    {/* Spinner cu gradient auriu */}
    <div
      className="h-14 w-14 rounded-full animate-spin"
      style={{
        border: '3px solid rgba(232,184,75,0.1)',
        borderTopColor: '#e8b84b',
      }}
    />
    <p className="text-gray-600 text-sm tracking-widest uppercase">Se încarcă...</p>
  </div>
);

export default Loader;
