// FlashCardsPage.js

import React from 'react';
import FlashCard from './FlashCard';

const FlashCardsPage = () => {
  const [flashCards, setFlashCards] = React.useState([
    {
      id: 1,
      question: 'What is React?',
      answer: 'React is a JavaScript library for building user interfaces.',
      lastModified: new Date().toLocaleString(), // Initialize with current date/time
    },
    // Add more flash card objects as needed
  ]);

  // Function to add/update a flash card
  const handleAddOrUpdateCard = (cardData) => {
    const existingCardIndex = flashCards.findIndex((card) => card.id === cardData.id);
    if (existingCardIndex !== -1) {
      // Card exists, update it
      const updatedCards = [...flashCards];
      updatedCards[existingCardIndex] = {
        ...cardData,
        lastModified: new Date().toLocaleString(), // Update lastModified
      };
      setFlashCards(updatedCards);
    } else {
      // Card doesn't exist, add it
      setFlashCards([
        ...flashCards,
        {
          ...cardData,
          id: flashCards.length + 1, // Generate a new ID (replace with your logic)
          lastModified: new Date().toLocaleString(), // Update lastModified
        },
      ]);
    }
  };

  return (
    <div className="flash-cards-page">
      <h2>Flash Cards</h2>
      <div className="flash-cards-container">
        {flashCards.map((card) => (
          <FlashCard
            key={card.id}
            question={card.question}
            answer={card.answer}
            lastModified={card.lastModified}
          />
        ))}
      </div>
    </div>
  );
};

export default FlashCardsPage;
