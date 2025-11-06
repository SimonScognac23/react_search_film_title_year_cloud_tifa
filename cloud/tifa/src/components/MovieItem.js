// 🔹 DEFINIZIONE DEL COMPONENTE FUNZIONALE
// MovieItem = nome del componente (PascalCase: prima lettera maiuscola)
// ({ movie, onSelectMovie }) = destrutturazione delle props ricevute dal componente genitore
//   - movie = oggetto contenente i dati del film (Title, Poster, imdbID, ecc.)
//   - onSelectMovie = funzione callback passata dal genitore per gestire la selezione del film
const MovieItem = ({ movie, onSelectMovie }) => {
  
  // 🔹 RETURN DEL JSX (JavaScript XML)
  // return = restituisce l'elemento JSX che rappresenta l'interfaccia utente di questo componente
  return (
    // 🔹 CONTAINER PRINCIPALE (Bootstrap Card)
    // className = attributo JSX equivalente a "class" in HTML (class è parola riservata in JS)
    // "card" = classe Bootstrap per creare un componente card
    // "border-0" = rimuove il bordo predefinito della card
    // "shadow-sm" = aggiunge un'ombra sottile
    // "text-center" = centra il testo all'interno
    // "h-100" = altezza 100% del contenitore genitore (per uniformare l'altezza delle card)
    // style = oggetto JavaScript per CSS inline (maxWidth limita la larghezza massima)
    <div className="card border-0 shadow-sm text-center h-100" style={{ maxWidth: '180px' }}>
      
      {/* 🔹 CONTENITORE IMMAGINE CON ASPECT RATIO */}
      {/* "ratio ratio-2x3" = classi Bootstrap per mantenere un rapporto larghezza:altezza fisso (2:3) */}
      {/* Questo evita che le immagini si deformino o abbiano dimensioni diverse */}
      <div className="ratio ratio-2x3">
        
        {/* 🔹 IMMAGINE DEL FILM */}
        <img
          // 🔹 LOGICA CONDIZIONALE PER IL SRC DELL'IMMAGINE
          // Operatore ternario: condizione ? seVero : seFalso
          // movie.Poster !== "N/A" = controlla se l'API ha fornito un'immagine valida
          // Se l'API non ha immagine, ritorna "N/A" come stringa
          src={
            movie.Poster !== "N/A" // Se il poster NON è "N/A"
              ? movie.Poster // Usa l'URL del poster dall'API
              : "https://via.placeholder.com/200x300?text=No+Image" // Altrimenti usa un'immagine segnaposto
          }
          className="card-img-top rounded" // "card-img-top" = styling Bootstrap per immagini in cima alle card | "rounded" = bordi arrotondati
          alt={movie.Title} // Attributo alt per accessibilità (screen readers) e SEO
        />
      </div>

      {/* 🔹 CORPO DELLA CARD */}
      {/* "card-body" = classe Bootstrap per il contenuto principale della card */}
      {/* "p-2" = padding di 2 unità su tutti i lati */}
      <div className="card-body p-2">
        
        {/* 🔹 TITOLO DEL FILM */}
        {/* h6 = header di livello 6 (il più piccolo) */}
        {/* "card-title" = classe Bootstrap per titoli delle card */}
        {/* "text-truncate" = tronca il testo se è troppo lungo aggiungendo "..." */}
        {/* "mb-2" = margin-bottom di 2 unità */}
        {/* "small" = riduce la dimensione del font */}
        {/* "fw-semibold" = font-weight semi-grassetto */}
        <h6 className="card-title text-truncate mb-2 small fw-semibold">
          
          {/* 🔹 INTERPOLAZIONE JSX */}
          {/* {movie.Title} = inserisce dinamicamente il titolo del film */}
          {/* Le graffe {} permettono di eseguire codice JavaScript dentro JSX */}
          {movie.Title}
        </h6>
        
        {/* 🔹 BOTTONE PER VEDERE I DETTAGLI */}
        <button
          // 🔹 EVENT HANDLER
          // onClick = gestore dell'evento click (equivalente a onclick in HTML)
          // () => onSelectMovie(movie) = funzione arrow che:
          //   1. Viene eseguita quando l'utente clicca il bottone
          //   2. Chiama la funzione onSelectMovie (ricevuta come prop)
          //   3. Passa l'oggetto movie come parametro
          // Questo comunica al componente genitore quale film è stato selezionato
          onClick={() => onSelectMovie(movie)}
          
          // 🔹 CLASSI CSS BOOTSTRAP
          // "btn" = classe base per bottoni Bootstrap
          // "btn-primary" = stile del bottone (colore blu primario)
          // "btn-sm" = dimensione piccola del bottone
          // "w-100" = larghezza 100% del contenitore (bottone a tutta larghezza)
          className="btn btn-primary btn-sm w-100"
        >
          Dettagli {/* Testo del bottone */}
        </button>
      </div>
    </div>
  );
};

// 🔹 EXPORT DEL COMPONENTE
// export default = esporta il componente come export predefinito
// Permette ad altri file di importarlo con: import MovieItem from './MovieItem'
export default MovieItem;
