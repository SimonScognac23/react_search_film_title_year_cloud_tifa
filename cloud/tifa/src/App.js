import './App.css';
import { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Navbar from './components/Navbar';

const APIKEY = 'c44b12b1';
const APIURL = 'https://www.omdbapi.com';

// Funzione per recuperare i film dall'API OMDb
const fetchMovies = async (search = 'Guardians') => {
  // ✅ se search non è una stringa, o troppo corta, ritorna subito
  if (!search || typeof search !== 'string' || search.length < 3) {
    return { movies: [], totalCount: 0, Error: 'Search too short' };
  }

  const response = await fetch(`${APIURL}?apikey=${APIKEY}&s=${search}`)
    .then(res => res.json());

  const { Error, Search: movies = [], totalResults: totalCount = 0 } = response;

  return { movies, totalCount, Error };
};

function App() {
  const [movies, setMovies] = useState([]); // elenco film
  const [totalCount, setTotalCount] = useState(0); // numero totale risultati
  const [error, setError] = useState(''); // eventuale errore

  const callApi = async (search = '') => {
  // 🔒 Evita crash se search è undefined o troppo corta
  if (!search || typeof search !== 'string' || search.length < 3) {
    console.warn('Ricerca troppo corta o indefinita:', search);
    setMovies([]);
    setTotalCount(0);
    return;
  }

  const data = await fetchMovies(search);
  setError(data.Error || '');
  
  if (!data.Error) {
    setMovies(data.movies);
    setTotalCount(data.totalCount);
  } else {
    setMovies([]);
    setTotalCount(0);
  }
};


  // Effettua la prima chiamata all’avvio
  useEffect(() => {
    callApi('Guardians of the Galaxy');
  }, []);

  return (
    <>
      <Navbar onSearchChange={callApi} />

      <div className="App">
        <h1>My Movies ({totalCount})</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}

    {
      !error ?  <MovieList movies={movies} /> : <h2>{ Error }</h2>// se non ce error alllora riotra movie list altrimenti
    }   
      </div>
    </>
  );
}

export default App;
