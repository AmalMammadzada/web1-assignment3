// FlashCard.js

import React, { useState } from 'react';

const FlashCard = ({ question, answer, lastModified }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleCard = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="flash-card" onClick={toggleCard}>
      <div className={`card-inner ${showAnswer ? 'show-answer' : ''}`}>
        <div className="card-front">
          <p>{question}</p>
          {/* Additional content for the front side of the card (e.g., images) */}
        </div>
        <div className="card-back">
          <p>{answer}</p>
          <p>Last Modified: {lastModified}</p>
          {/* Additional content for the back side of the card */}
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
