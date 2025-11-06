// 🔹 DEFINIZIONE DEL COMPONENTE FUNZIONALE
// MovieDetail = componente che mostra i dettagli completi di un film selezionato
// ({ movie, onBack }) = destrutturazione delle props ricevute dal componente genitore:
//   - movie = oggetto contenente tutti i dettagli del film (Title, Plot, Year, Genre, ecc.)
//   - onBack = funzione callback per tornare alla lista dei film
const MovieDetail = ({ movie, onBack }) => {
  
  // 🔹 GUARD CLAUSE (Clausola di Guardia) #1
  // Controlla se movie esiste prima di procedere
  // !movie = se movie è null, undefined, o falsy
  // return null = non renderizza nulla (componente invisibile)
  // Questo previene errori se il componente viene renderizzato senza dati
  if (!movie) return null;

  // 🔹 GUARD CLAUSE (Clausola di Guardia) #2
  // Gestisce il caso di errore dall'API OMDb
  // movie.Response === "False" = l'API OMDb restituisce questa stringa quando c'è un errore
  // (es: ID film non valido, film non trovato, ecc.)
  if (movie.Response === "False") {
    return (
      // 🔹 INTERFACCIA DI ERRORE
      // "alert alert-danger" = componente Bootstrap per messaggi di errore (sfondo rosso)
      // "text-center" = centra il testo orizzontalmente
      // "mt-4" = margin-top di 4 unità Bootstrap
      <div className="alert alert-danger text-center mt-4">
        
        {/* 🔹 MESSAGGIO DI ERRORE DINAMICO */}
        {/* ⚠️ = emoji per attirare l'attenzione */}
        {/* movie.Error = messaggio di errore specifico dall'API */}
        {/* || "Incorrect IMDb ID" = valore di fallback se Error non esiste */}
        ⚠️ Errore: {movie.Error || "Incorrect IMDb ID"}
        
        {/* 🔹 BOTTONE PER TORNARE INDIETRO */}
        <div className="mt-3"> {/* mt-3 = margin-top per spaziare il bottone */}
          <button 
            className="btn btn-secondary" // btn-secondary = bottone grigio Bootstrap
            onClick={onBack} // Event handler: chiama la funzione onBack quando cliccato
          >
            Torna alla Home
          </button>
        </div>
      </div>
    );
  }

  // 🔹 RENDER PRINCIPALE (quando il film è valido)
  return (
    // 🔹 CONTAINER PRINCIPALE
    // "container" = contenitore Bootstrap con larghezza massima responsive
    // "mt-5" = margin-top di 5 unità Bootstrap
    // "d-flex justify-content-center" = flexbox per centrare orizzontalmente
    <div className="container mt-5 d-flex justify-content-center">
      
      {/* 🔹 CARD BOOTSTRAP */}
      {/* "card" = componente card Bootstrap */}
      {/* "shadow-lg" = ombra grande per dare profondità */}
      {/* "border-0" = rimuove il bordo predefinito */}
      {/* style = CSS inline per limitare la larghezza massima */}
      <div className="card shadow-lg border-0" style={{ maxWidth: "700px" }}>
        
        {/* 🔹 SISTEMA DI GRIGLIA BOOTSTRAP */}
        {/* "row" = riga del sistema di griglia */}
        {/* "g-0" = rimuove il gutter (spazio tra colonne) */}
        <div className="row g-0">
          
          {/* 🔹 COLONNA SINISTRA - IMMAGINE */}
          {/* "col-md-4" = su schermi medium+, occupa 4/12 colonne (33.3%) */}
          {/* Su schermi piccoli, occuperà tutta la larghezza */}
          <div className="col-md-4">
            <img
              // 🔹 LOGICA CONDIZIONALE PER L'IMMAGINE
              // Operatore ternario per scegliere tra poster reale o placeholder
              src={
                movie.Poster !== "N/A" // Se l'API ha fornito un poster valido
                  ? movie.Poster // Usa l'URL del poster
                  : "https://via.placeholder.com/300x450?text=No+Image" // Altrimenti usa immagine segnaposto
              }
              alt={movie.Title} // Alt text per accessibilità e SEO
              
              // 🔹 CLASSI CSS PER L'IMMAGINE
              // "img-fluid" = immagine responsive (si adatta al contenitore)
              // "rounded-start" = arrotonda solo gli angoli sinistri
              // "h-100" = altezza 100% del contenitore genitore
              className="img-fluid rounded-start h-100"
            />
          </div>
          
          {/* 🔹 COLONNA DESTRA - DETTAGLI */}
          {/* "col-md-8" = su schermi medium+, occupa 8/12 colonne (66.7%) */}
          {/* "d-flex flex-column justify-content-between" = layout flexbox verticale con spazio distribuito */}
          <div className="col-md-8 d-flex flex-column justify-content-between">
            
            {/* 🔹 CORPO DELLA CARD - CONTENUTO PRINCIPALE */}
            <div className="card-body">
              
              {/* 🔹 TITOLO DEL FILM */}
              {/* h4 = header di livello 4 */}
              {/* "card-title" = classe Bootstrap per titoli delle card */}
              {/* "mb-3" = margin-bottom di 3 unità */}
              {/* {movie.Title} = interpolazione JSX del titolo */}
              <h4 className="card-title mb-3">{movie.Title}</h4>
              
              {/* 🔹 TRAMA */}
              <p className="card-text mb-2"> {/* mb-2 = margin-bottom di 2 unità */}
                <strong>Trama:</strong> {/* <strong> = testo in grassetto */}
                {/* movie.Plot || "Nessuna trama disponibile" = usa Plot se esiste, altrimenti messaggio predefinito */}
                {movie.Plot || "Nessuna trama disponibile"}
              </p>
              
              {/* 🔹 ANNO DI USCITA */}
              <p className="card-text mb-1"> {/* mb-1 = margin-bottom di 1 unità */}
                <strong>Anno:</strong> {movie.Year} {/* Interpolazione dell'anno */}
              </p>
              
              {/* 🔹 GENERE */}
              <p className="card-text mb-1">
                <strong>Genere:</strong> {movie.Genre} {/* Interpolazione del genere */}
              </p>
            </div>
            
            {/* 🔹 FOOTER DELLA CARD - BOTTONE AZIONE */}
            {/* "card-footer" = area footer della card Bootstrap */}
            {/* "bg-white" = sfondo bianco */}
            {/* "border-0" = rimuove il bordo */}
            {/* "text-end" = allinea il testo a destra */}
            <div className="card-footer bg-white border-0 text-end">
              <button 
                // 🔹 CLASSI DEL BOTTONE
                // "btn" = classe base per bottoni Bootstrap
                // "btn-outline-secondary" = bottone con bordo grigio (non pieno)
                // "btn-sm" = dimensione piccola
                className="btn btn-outline-secondary btn-sm" 
                
                // 🔹 EVENT HANDLER
                // onClick={onBack} = quando cliccato, chiama la funzione onBack
                // Questo comunica al componente genitore di tornare alla lista
                onClick={onBack}
              >
                ⬅ Torna alla Home {/* Emoji freccia + testo descrittivo */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🔹 EXPORT DEL COMPONENTE
// Permette ad altri componenti di importare MovieDetail
export default MovieDetail;
