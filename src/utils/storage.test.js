import { saveMovieToCache, getMovieFromCache } from './storage';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('storage utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saveMovieToCache salvează corect datele', () => {
    const fakeMovie = { Title: 'Inception', Year: '2010' };
    saveMovieToCache('inception', fakeMovie);
    const raw = localStorage.getItem('inception');
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw);
    expect(parsed.data).toEqual(fakeMovie);
    expect(parsed.timestamp).toBeDefined();
  });

  test('getMovieFromCache returnează datele salvate', () => {
    const fakeMovie = { Title: 'Interstellar', Year: '2014' };
    saveMovieToCache('interstellar', fakeMovie);
    const result = getMovieFromCache('interstellar');
    expect(result).toEqual(fakeMovie);
  });

  test('getMovieFromCache returnează null dacă filmul nu există', () => {
    const result = getMovieFromCache('film-inexistent');
    expect(result).toBeNull();
  });

  test('getMovieFromCache șterge și returnează null dacă cache-ul a expirat', () => {
    const fakeMovie = { Title: 'The Matrix', Year: '1999' };
    // Salvăm cu timestamp în trecut (25 ore în urmă)
    const expiredEntry = {
      data: fakeMovie,
      timestamp: Date.now() - 25 * 60 * 60 * 1000,
    };
    localStorage.setItem('the matrix', JSON.stringify(expiredEntry));
    const result = getMovieFromCache('the matrix');
    expect(result).toBeNull();
    // Trebuie și șters din localStorage
    expect(localStorage.getItem('the matrix')).toBeNull();
  });

  test('cache-ul este case-insensitive (titlu lowercase)', () => {
    const fakeMovie = { Title: 'Dune', Year: '2021' };
    saveMovieToCache('DUNE', fakeMovie);
    const result = getMovieFromCache('dune');
    expect(result).toEqual(fakeMovie);
  });
});
