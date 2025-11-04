import React, { useState } from 'react'; // Importiamo React e l'hook useState per gestire lo stato

// Esportiamo il componente SearchBar che riceve onSearchChange come prop
export const SearchBar = ({ onSearchChange }) => {
  // Creiamo uno stato locale 'search' per tenere traccia del testo digitato dall'utente
  // useState('') inizializza il valore con una stringa vuota
  const [search, setSearch] = useState('');

  // Funzione che gestisce il cambiamento del testo nell'input
  const manageSearch = (evt) => {
    // Prendiamo il valore dall'input e rimuoviamo spazi all'inizio e alla fine con .trim()
    const s = evt.target.value.trim();
    // Aggiorniamo lo stato 'search' con il nuovo valore pulito
    setSearch(s);
  };

  // Funzione che gestisce l'invio del form quando l'utente preme il pulsante "Search"
  const handleSubmit = (e) => {
    // Preveniamo il comportamento predefinito del form (che ricaricherebbe la pagina)
    e.preventDefault();
    // Controlliamo se il testo è più lungo di 3 caratteri E se la funzione onSearchChange esiste
    if (search.trim().length > 3 && onSearchChange) {
      // Se entrambe le condizioni sono vere, chiamiamo la funzione passata dal componente padre
      // Gli passiamo il testo di ricerca pulito (senza spazi)
      onSearchChange(search.trim());
    }
  };

  // Funzione per resettare la ricerca (svuotare l'input)
  const resetSearch = () => {
    // Impostiamo lo stato search a stringa vuota (svuotiamo l'input)
    setSearch('');
    // Se la funzione onSearchChange esiste, la chiamiamo con stringa vuota per resettare anche i risultati
    if (onSearchChange) onSearchChange('');
  };

  // Ritorniamo l'interfaccia utente del componente
  return (
    // Form che gestisce l'evento submit, con classi Bootstrap per lo styling
    <form onSubmit={handleSubmit} className="d-flex">
      {/* Input di testo dove l'utente digita la ricerca */}
      <input
        type="text" // Tipo di input: testo normale
        name="search" // Nome dell'input (utile per i form)
        onChange={manageSearch} // Quando il testo cambia, chiama la funzione manageSearch
        className="form-control me-2" // Classi Bootstrap: form-control per lo styling, me-2 per margine a destra
        placeholder="Search..." // Testo che appare quando l'input è vuoto
        value={search} // Il valore mostrato è quello dello stato 'search' (controlled component)
      />

      {/* Pulsante per inviare la ricerca */}
      <button type="submit" className="btn btn-primary me-2">
        Search {/* Testo del pulsante */}
      </button>

      {/* Pulsante per resettare la ricerca */}
      <button type="button" onClick={resetSearch} className="btn btn-info">
        Info {/* Testo del pulsante (probabilmente dovrebbe essere "Reset" o "Clear") */}
      </button>
    </form>
  );
};
