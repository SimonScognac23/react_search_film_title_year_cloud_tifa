import './App.css';
import { useState, useEffect } from 'react'; // useState = hook per gestire lo stato del componente | useEffect = hook per eseguire codice quando il componente viene montato o aggiornato
import MovieList from './components/MovieList'; // Importa il componente che mostra la lista di film
import Navbar from './components/Navbar'; // Importa il componente della barra di navigazione
import MovieDetail from './components/MovieDetail'; // Importa il componente che mostra i dettagli di un singolo film


const APIKEY = 'c44b12b1'; // Chiave API per autenticarsi con OMDb
const APIURL = 'https://www.omdbapi.com'; // URL base dell'API OMDb


// 🔹 Funzione ASINCRONA per recuperare la lista dei film dall'API
// async = permette di usare "await" dentro la funzione per aspettare le risposte
const fetchMovies = async (search = 'Guardians') => { // search = parametro di ricerca con valore predefinito 'Guardians'
  
  // Validazione: controlla che la ricerca sia valida (stringa di almeno 3 caratteri)
  if (!search || typeof search !== 'string' || search.length < 3) {
    return { movies: [], totalCount: 0, Error: 'Search too short' }; // Ritorna un oggetto con array vuoto e messaggio di errore
  }

  // fetch() = funzione JavaScript per fare richieste HTTP
  // await = aspetta che la richiesta si completi prima di continuare
  const response = await fetch(`${APIURL}?apikey=${APIKEY}&s=${search}`) // Costruisce l'URL con i parametri query (?apikey=...&s=...)
    .then(res => res.json()); // .then() = esegue questa funzione quando la risposta arriva | .json() = converte la risposta in oggetto JavaScript

  // Destrutturazione: estrae proprietà specifiche dall'oggetto response
  // Error = messaggio di errore dall'API (se presente)
  // Search = array di film (rinominato in "movies")
  // totalResults = numero totale di risultati (rinominato in "totalCount")
  // = [] e = 0 sono valori predefiniti se le proprietà non esistono
  const { Error, Search: movies = [], totalResults: totalCount = 0 } = response;
  
  // ?? = operatore nullish coalescing: se Error è null/undefined, usa stringa vuota ''
  return { movies, totalCount, Error: Error ?? '' }; // Ritorna un oggetto con i dati elaborati
};


// 🔹 Funzione ASINCRONA per recuperare i dettagli di un singolo film tramite ID
const fetchMovieById = async (movieId) => { // movieId = ID IMDb del film (es: "tt2015381")
  const response = await fetch(`${APIURL}?apikey=${APIKEY}&i=${movieId}`) // Parametro "i" = ID del film
    .then(res => res.json()); // Converte la risposta in oggetto JavaScript
  return response; // Ritorna l'oggetto con tutti i dettagli del film
};


function App() { // Componente principale dell'applicazione
  
  // 🔹 STATI DEL COMPONENTE (useState)
  // Ogni useState ritorna un array con 2 elementi: [valorCorrente, funzionePerAggiornarlo]
  
  const [movies, setMovies] = useState([]); // movies = array di film | setMovies = funzione per aggiornare movies | [] = valore iniziale (array vuoto)
  const [totalCount, setTotalCount] = useState(0); // totalCount = numero totale di film trovati | valore iniziale = 0
  const [error, setError] = useState(''); // error = messaggio di errore | valore iniziale = stringa vuota
  const [selectedMovie, setSelectedMovie] = useState(null); // selectedMovie = film selezionato per vedere i dettagli | null = nessun film selezionato inizialmente



  // 🔹 Funzione per selezionare un film e recuperarne i dettagli
  const selectMovie = async (movie) => { // movie = oggetto film cliccato dall'utente
    const newMovie = await fetchMovieById(movie.imdbID); // Chiama l'API per ottenere i dettagli completi usando l'ID del film
    setSelectedMovie(newMovie); // Aggiorna lo stato con il film dettagliato (questo causa un re-render del componente)
  };



  // 🔹 Funzione per chiamare l'API e cercare film
  const callApi = async (search = '') => { // search = termine di ricerca inserito dall'utente
    
    // Validazione: controlla che la ricerca sia valida
    // 🔹 VALIDAZIONE COMPLETA DELLA RICERCA CON OPERATORE LOGICO OR (||)
    // Questa condizione verifica 3 casi in cui la ricerca NON è valida:
     // 1. !search = se search è null, undefined, stringa vuota, 0, false, o NaN (valori "falsy")
     // 2. typeof search !== 'string' = se search NON è di tipo stringa (potrebbe essere number, object, ecc.)
     // 3. search.length < 3 = se la stringa ha meno di 3 caratteri
     // L'operatore || (OR logico) significa: se ALMENO UNA di queste condizioni è vera, esegui il blocco if
     // Se tutte e tre sono false, salta il blocco if e continua con il resto del codice
    if (!search || typeof search !== 'string' || search.length < 3) {
      console.warn('Ricerca troppo corta o indefinita:', search); // Stampa un avviso nella console del browser
      setMovies([]); // Svuota l'array dei film
      setTotalCount(0); // Azzera il conteggio
      setError('Search too short'); // Aggiorna stato errore
      return; // Esce dalla funzione senza fare la chiamata API
    }

    const data = await fetchMovies(search); // Chiama fetchMovies e aspetta il risultato
    setError(data.Error || ''); // Aggiorna lo stato error (se c'è un errore) | || '' = se data.Error è falsy, usa stringa vuota

    // Se NON c'è errore, aggiorna i film
    if (!data.Error) { // ! = operatore NOT (inverte il valore booleano)
      setMovies(data.movies); // Aggiorna l'array dei film nello stato
      setTotalCount(data.totalCount); // Aggiorna il numero totale di risultati
    } else { // Altrimenti (se c'è un errore)
      setMovies([]); // Svuota l'array dei film
      setTotalCount(0); // Azzera il conteggio
    }
  };

  // 🔹 useEffect = hook che esegue codice quando il componente viene montato (caricato la prima volta)
  useEffect(() => { // La funzione dentro useEffect viene eseguita automaticamente
    callApi('Guardians of the Galaxy'); // Fa una ricerca automatica all'avvio dell'app
  }, []); // [] = array di dipendenze vuoto = esegui solo UNA volta quando il componente viene montato





  

  // 🔹 RENDER (cosa viene visualizzato sullo schermo)
  return (
    <> {/* Fragment: contenitore invisibile per raggruppare più elementi senza aggiungere nodi DOM extra */}
      
      {/* Componente Navbar: passa la funzione callApi come prop "onSearchChange" */}
      <Navbar onSearchChange={callApi} /> 

      <div className="App container py-4"> {/* className = classi CSS di Bootstrap per lo styling */}
        
        {/* Interpolazione JavaScript: {totalCount} viene sostituito con il valore della variabile */}
        <h1 className="mb-4">My Movies ({totalCount})</h1>

        {/* Rendering condizionale: mostra il paragrafo SOLO se error è truthy (non vuoto) */}
        {/* && = operatore AND: se error è true, esegui la parte dopo && */}
        {error && <p className="text-danger">{error}</p>}

        {/* Operatore ternario: condizione ? seVero : seFalso */}
        {/* Se NON c'è un film selezionato (selectedMovie è null), mostra MovieList */}
        {!selectedMovie ? (
          <MovieList 
            onSelectMovie={selectMovie} // Passa la funzione selectMovie come prop
            movies={movies} // Passa l'array di film come prop
          />
        ) : ( // Altrimenti (se c'è un film selezionato)
          <MovieDetail 
            movie={selectedMovie} // Passa l'oggetto del film selezionato come prop
            onBack={() => setSelectedMovie(null)} // Passa una funzione arrow che resetta selectedMovie a null quando viene chiamata
          />
        )}
      </div>
    </>
  );
}

export default App; // Esporta il componente App per poterlo importare in altri file (index.js)  
