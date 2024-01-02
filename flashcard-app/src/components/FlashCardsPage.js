import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import './FlashCardsPage.css';

const AddCardForm = ({ onAddCard }) => {
  const [frontContent, setFrontContent] = useState('');
  const [backContent, setBackContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!frontContent || !backContent) return; // Basic validation

    onAddCard({
      frontContent,
      backContent,
      lastModified: new Date().toISOString(),
      status: 'Want to Learn' // Default status
    });

    // Reset form fields
    setFrontContent('');
    setBackContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-card-form">
      <div>
        <label>Front Content: </label>
        <input
          type="text"
          value={frontContent}
          onChange={(e) => setFrontContent(e.target.value)}
        />
      </div>
      <div>
        <label>Back Content: </label>
        <input
          type="text"
          value={backContent}
          onChange={(e) => setBackContent(e.target.value)}
        />
      </div>
      <button type="submit">Add Card</button>
    </form>
  );
};

const FlashCardsPage = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchedCards = [
      {
        id: 1,
        frontContent: 'What is the capital of France?',
        backContent: 'Paris',
        lastModified: new Date().toISOString(),
        status: 'Want to Learn'
      },
      {
        id: 2,
        frontContent: 'What is the capital of Azerbaijan?',
        backContent: 'Baku',
        lastModified: new Date().toISOString(),
        status: 'Want to Learn'
      },
      // Add more cards
    ];
    
    setCards(fetchedCards);
  }, []);

  const handleStatusChange = (cardId, newStatus) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === cardId ? { ...card, status: newStatus, lastModified: new Date().toISOString() } : card
      )
    );
  };

  const addNewCard = (newCardData) => {
    setCards(prevCards => [...prevCards, { ...newCardData, id: Date.now() }]);
  };

  return (
    <div className="flashcards-container">
      <AddCardForm onAddCard={addNewCard} />
      {cards.map(card => (
        <FlashCard key={card.id} card={card} onStatusChange={handleStatusChange} />
      ))}
    </div>
  );
};

export default FlashCardsPage;