import React, { useState } from 'react';
import './FlashCard.css';

const FlashCard = ({ card, onStatusChange }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [status, setStatus] = useState(card.status);

  const flipCard = () => setIsFlipped(!isFlipped);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onStatusChange(card.id, newStatus);
  };

  return (
    <div className="flashcard-container">
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
        <div className="card-front">
          {card.frontContent}
        </div>
        <div className="card-back">
          <p>{card.backContent}</p>
        </div>
      </div>
      <div className="card-details">
        <p>Last Modified: {new Date(card.lastModified).toLocaleDateString()}</p>
        <select value={status} onChange={handleStatusChange}>
          <option value="Learned">Learned</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Noted">Noted</option>
        </select>
      </div>
    </div>
  );
};

export default FlashCard;