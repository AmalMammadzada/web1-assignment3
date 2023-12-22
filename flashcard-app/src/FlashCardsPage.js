
import React from 'react';
import FlashCard from './FlashCard';

const FlashCardsPage = () => {
  // Sample flash card data
  const flashCardsData = [
    {
      id: 1,
      question: 'What is React?',
      answer: 'React is a JavaScript library',
    },
    {
      id: 2,
      question: 'What is JSX?',
      answer: 'JSX is a syntax extension',
    },
    // Add more flash card objects as needed
  ];

  return (
    <div className="flash-cards-page">
      <h2>Flash Cards</h2>
      <div className="flash-cards-container">
        {flashCardsData.map((card) => (
          <FlashCard
            key={card.id}
            question={card.question}
            answer={card.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default FlashCardsPage;