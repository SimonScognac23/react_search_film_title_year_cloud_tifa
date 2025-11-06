import React from 'react';

export const Menu = ({ menuOpen }) => {
  return (
    <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link text-white" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">Contact</a>
        </li>
      </ul>
    </div>
  );
};
