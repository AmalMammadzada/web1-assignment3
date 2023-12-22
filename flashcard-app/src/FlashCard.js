import React, { useState } from 'react';

const FlashCard = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleCard = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="flash-card" onClick={toggleCard}>
      <div className={`card-inner ${showAnswer ? 'show-answer' : ''}`}>
        <div className="card-front">
          <p>{question}</p>
          {/* Additional content for the front side of the cardd */}
        </div>
        <div className="card-back">
          <p>{answer}</p>
          {/* Additional content for the back side of the card */}
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
