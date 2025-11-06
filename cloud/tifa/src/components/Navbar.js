// 🔹 IMPORTAZIONI
import React, { useState } from 'react'; // React = libreria principale | useState = hook per gestire lo stato locale
import { Menu } from './Menu'; // Importa il componente Menu (probabilmente lista di link di navigazione)
import { SearchBar } from './SearchBar'; // Importa il componente SearchBar che abbiamo visto prima

// 🔹 DEFINIZIONE DEL COMPONENTE FUNZIONALE
// Navbar = componente per la barra di navigazione principale dell'app
// (params) = riceve tutte le props come un singolo oggetto chiamato "params"
// Questo è diverso dalla destrutturazione ({ prop1, prop2 }) che abbiamo visto prima

const Navbar = (params) => {
  
  // 🔹 STATO LOCALE PER IL MENU MOBILE
  // useState(false) = crea stato per controllare se il menu mobile è aperto o chiuso
  // menuOpen = valore booleano (true/false) che indica se il menu è visibile
  // setMenuOpen = funzione per aggiornare lo stato del menu
  // false = valore iniziale (menu chiuso all'avvio)
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔹 RENDER DEL COMPONENTE (JSX)
  return (
    // 🔹 ELEMENTO SEMANTICO HTML5
    // <header> = elemento semantico che indica l'intestazione della pagina
    // Migliora l'accessibilità e la SEO
    <header>
      
      {/* 🔹 NAVBAR BOOTSTRAP */}
      {/* <nav> = elemento semantico per la navigazione */}
      {/* "navbar" = classe base Bootstrap per barre di navigazione */}
      {/* "navbar-expand-lg" = il menu si espande su schermi large+ (≥992px) */}
      {/* "navbar-dark" = testo bianco per sfondi scuri */}
      {/* "bg-dark" = sfondo scuro Bootstrap */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        
        {/* 🔹 CONTENITORE FLUIDO */}
        {/* "container-fluid" = contenitore che occupa tutta la larghezza disponibile */}
        {/* Alternativa: "container" per larghezza massima fissa */}
        <div className="container-fluid">
          
          {/* 🔹 LOGO/BRAND DELL'APPLICAZIONE */}
          {/* <a> = link (anche se href="#" non porta da nessuna parte) */}
          {/* "navbar-brand" = classe Bootstrap per il logo/nome dell'app */}
          {/* "fw-bold" = font-weight bold (testo in grassetto) */}
          <a href="#" className="navbar-brand fw-bold">
            MyApp {/* Nome dell'applicazione */}
          </a>

          {/* 🔹 BOTTONE HAMBURGER PER MENU MOBILE */}
          {/* Questo bottone appare solo su schermi piccoli (<992px) */}
          <button
            // 🔹 CLASSI BOOTSTRAP PER TOGGLER
            // "navbar-toggler" = styling Bootstrap per il bottone hamburger
            className="navbar-toggler"
            
            type="button" // Tipo button per evitare submit di form
            
            // 🔹 EVENT HANDLER PER TOGGLE
            // onClick = gestore evento click
            // () => setMenuOpen(!menuOpen) = funzione arrow che:
            //   1. Prende il valore attuale di menuOpen
            //   2. Lo inverte con l'operatore NOT (!)
            //   3. Aggiorna lo stato con setMenuOpen
            // Questo crea un effetto toggle: aperto→chiuso, chiuso→aperto
            onClick={() => setMenuOpen(!menuOpen)}
            
            // 🔹 ATTRIBUTI DI ACCESSIBILITÀ
            // aria-controls = indica quale elemento è controllato da questo bottone
            aria-controls="navbarMenu"
            
            // aria-expanded = indica se l'elemento controllato è espanso
            // {menuOpen} = interpolazione JSX del valore booleano (true/false)
            aria-expanded={menuOpen}
            
            // aria-label = etichetta per screen reader (accessibilità)
            aria-label="Toggle navigation"
          >
            
            {/* 🔹 ICONA HAMBURGER */}
            {/* <span> con classe Bootstrap che crea le 3 linee del menu hamburger */}
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* 🔹 CONTENUTO DELLA NAVBAR (Menu + SearchBar) */}
          {/* "collapse navbar-collapse" = classi Bootstrap per il comportamento responsive */}
          {/* Su schermi piccoli, questo div è nascosto/mostrato dal bottone toggle */}
          {/* "justify-content-between" = spazio distribuito tra gli elementi (flexbox) */}
          {/* id="navbarMenu" = ID collegato al aria-controls del bottone */}
          <div className="collapse navbar-collapse justify-content-between" id="navbarMenu">
            
            {/* 🔹 COMPONENTE MENU */}
            {/* Passa lo stato menuOpen come prop al componente Menu */}
            {/* Il componente Menu può usare questa informazione per gestire il suo comportamento */}
            <Menu menuOpen={menuOpen} />
            
            {/* 🔹 CONTENITORE PER SEARCHBAR */}
            {/* "d-flex" = display flex */}
            {/* "ms-lg-3" = margin-start (sinistra) di 3 unità solo su schermi large+ */}
            {/* "mt-3" = margin-top di 3 unità */}
            {/* "mt-lg-0" = margin-top 0 su schermi large+ (annulla mt-3) */}
            <div className="d-flex ms-lg-3 mt-3 mt-lg-0">
              
              {/* 🔹 COMPONENTE SEARCHBAR */}
              {/* {...params} = SPREAD OPERATOR */}
              {/* Passa TUTTE le props ricevute da Navbar al componente SearchBar */}
              {/* È equivalente a scrivere ogni prop manualmente: onSearchChange={params.onSearchChange} */}
              {/* Questo pattern è utile quando il componente fa da "proxy" */}
              <SearchBar {...params} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

// 🔹 EXPORT DEL COMPONENTE
export default Navbar;
