// 🔹 IMPORTAZIONE DEL COMPONENTE FIGLIO
// Importa il componente MovieItem dalla stessa cartella
// MovieItem = componente che rappresenta un singolo film nella lista
import MovieItem from './MovieItem';

// 🔹 DEFINIZIONE DEL COMPONENTE FUNZIONALE
// MovieList = componente che gestisce la lista completa di film
// ({ movies = [], onSelectMovie }) = destrutturazione delle props:
//   - movies = array di oggetti film ricevuto dal componente genitore (App)
//   - = [] = valore predefinito: se movies non viene passato, usa array vuoto
//   - onSelectMovie = funzione callback per gestire la selezione di un film
const MovieList = ({ movies = [], onSelectMovie }) => {
  
  // 🔹 EARLY RETURN (Return Anticipato)
  // Controlla se l'array movies è vuoto prima di renderizzare la lista
  // !movies.length = se la lunghezza dell'array è 0 (falsy), la condizione è true
  // Questo pattern evita di renderizzare codice inutile quando non ci sono dati
  if (!movies.length) {
    return (
      // 🔹 MESSAGGIO QUANDO NON CI SONO FILM
      // "text-center" = centra il testo orizzontalmente
      // "py-5" = padding verticale (top e bottom) di 5 unità Bootstrap
      <div className="text-center py-5">
        
        {/* 🔹 ALERT BOOTSTRAP */}
        {/* "alert alert-info" = componente Bootstrap per messaggi informativi (sfondo azzurro) */}
        {/* "d-inline-block" = display inline-block (si adatta al contenuto) */}
        {/* "shadow-sm" = ombra sottile per dare profondità */}
        <div className="alert alert-info d-inline-block shadow-sm">
          Nessun film trovato. Prova a cercare un altro titolo 🎬 {/* Messaggio user-friendly con emoji */}
        </div>
      </div>
    );
  }

  // 🔹 RENDER PRINCIPALE (quando ci sono film da mostrare)
  return (
    // 🔹 CONTAINER BOOTSTRAP
    // "container" = contenitore Bootstrap con larghezza massima responsive
    // "my-4" = margin verticale (top e bottom) di 4 unità
    <div className="container my-4">
      
      {/* 🔹 SISTEMA DI GRIGLIA BOOTSTRAP */}
      {/* "row" = crea una riga nel sistema di griglia Bootstrap */}
      {/* "g-4" = gutter (spazio tra colonne) di 4 unità */}
      {/* "justify-content-center" = centra le colonne orizzontalmente */}
      <div className="row g-4 justify-content-center">
        
        {/* 🔹 METODO MAP PER RENDERIZZARE LISTA */}
        {/* movies.map() = metodo array che trasforma ogni elemento in JSX */}
        {/* (movie) => (...) = funzione arrow che riceve ogni singolo film */}
        {/* map() restituisce un nuovo array di elementi JSX */}
        {movies.map((movie) => (
          
          // 🔹 COLONNA BOOTSTRAP RESPONSIVE
          // key = attributo obbligatorio per liste React (deve essere unico)
          // movie.imdbID = ID univoco del film fornito dall'API OMDb
          // React usa key per ottimizzare il re-rendering quando la lista cambia
          <div
            key={movie.imdbID} // ⚠️ IMPORTANTE: key aiuta React a tracciare gli elementi
            
            // 🔹 CLASSI RESPONSIVE BOOTSTRAP
            // "col-6" = su schermi extra-small, ogni colonna occupa 6/12 = 50% (2 colonne per riga)
            // "col-sm-4" = su schermi small+, ogni colonna occupa 4/12 = 33.3% (3 colonne per riga)
            // "col-md-3" = su schermi medium+, ogni colonna occupa 3/12 = 25% (4 colonne per riga)
            // "col-lg-2" = su schermi large+, ogni colonna occupa 2/12 = 16.7% (6 colonne per riga)
            // "d-flex" = display flex sul contenitore
            // "justify-content-center" = centra il contenuto orizzontalmente con flexbox
            className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center"
          >
            
            {/* 🔹 COMPONENTE MOVIEITEM */}
            {/* Renderizza il componente figlio per ogni film */}
            {/* onSelectMovie={onSelectMovie} = passa la funzione callback come prop */}
            {/* movie={movie} = passa l'oggetto del film corrente come prop */}
            {/* Il componente MovieItem riceverà questi dati tramite props */}
            <MovieItem 
              onSelectMovie={onSelectMovie} // Prop: funzione per gestire la selezione
              movie={movie} // Prop: dati del film corrente
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// 🔹 EXPORT DEL COMPONENTE
// Permette ad altri componenti di importare MovieList
export default MovieList;






