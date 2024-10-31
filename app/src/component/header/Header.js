// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/demand">Demand</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
