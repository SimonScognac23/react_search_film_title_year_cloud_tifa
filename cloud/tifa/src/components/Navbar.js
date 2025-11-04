import React, { useState } from 'react';
import { Menu } from './Menu';
import { SearchBar } from './SearchBar';

const Navbar = (params) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-dark text-white p-3">
      <nav className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <h1 className="m-0">MyApp</h1>

        {/* Bottone toggle menu per mobile */}
        <button
          className="btn btn-outline-light d-lg-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menu e SearchBar */}
        <Menu menuOpen={menuOpen} />
        <SearchBar {...params} />
      </nav>
    </header>
  );
};

export default Navbar;
