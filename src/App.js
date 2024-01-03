// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import FlashCardsPage from './components/FlashCardsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flashcards" element={<FlashCardsPage />} />    
        </Routes>
      </div>
    </Router>
  );
}

export default App;
