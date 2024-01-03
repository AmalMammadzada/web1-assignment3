// NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">Flashcard App</div>
      <ul className="nav-items">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/flashcards">Flashcards</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
