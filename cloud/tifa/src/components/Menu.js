import React from 'react';

export const Menu = ({ menuOpen }) => {
  return (
    <ul className={`list-unstyled d-flex flex-column flex-lg-row mb-0 ${menuOpen ? 'd-flex' : 'd-none d-lg-flex'}`}>
      <li className="ms-0 ms-lg-3 mt-2 mt-lg-0">
        <a href="#" className="text-white text-decoration-none">Home</a>
      </li>
      <li className="ms-0 ms-lg-3 mt-2 mt-lg-0">
        <a href="#" className="text-white text-decoration-none">About</a>
      </li>
      <li className="ms-0 ms-lg-3 mt-2 mt-lg-0">
        <a href="#" className="text-white text-decoration-none">Contact</a>
      </li>
    </ul>
  );
};
