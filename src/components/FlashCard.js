import React, { useState } from 'react';
import './FlashCard.css';

const FlashCard = ({ card, onStatusChange, onEdit, onDelete, onSave }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableFrontContent, setEditableFrontContent] = useState(card.frontContent);
  const [editableBackContent, setEditableBackContent] = useState(card.backContent);
  const [cardStatus, setCardStatus] = useState(card.status);

  const flipCard = () => setIsFlipped(!isFlipped);

  const handleEditClick = () => {
    setIsEditing(true);
    onEdit(card.id);
  };

  const handleSaveClick = () => {
    onSave(card.id, {
      frontContent: editableFrontContent,
      backContent: editableBackContent,
      status: cardStatus
    });
    setIsEditing(false);
  };

  const renderCardContent = (content, isEditable) => {
    return isEditable ? (
      <textarea 
        value={content} 
        onChange={e => isFlipped ? setEditableBackContent(e.target.value) : setEditableFrontContent(e.target.value)}
        onClick={(e) => e.stopPropagation()}
      />
    ) : (
      <p>{content}</p>
    );
  };

  const handleCardStatusChange = (e) => {
    const newStatus = e.target.value;
    setCardStatus(newStatus);
    onStatusChange(card.id, newStatus);
  };

  return (
    <div className="flashcard-container">
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
        <div className="card-front">
          {isEditing ? renderCardContent(editableFrontContent, true) : renderCardContent(card.frontContent, false)}
        </div>
        <div className="card-back">
          {isEditing ? renderCardContent(editableBackContent, true) : renderCardContent(card.backContent, false)}
        </div>
      </div>
      <div className="card-actions">
        {isEditing ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={() => onDelete(card.id)}>Delete</button>
          </>
        )}
      </div>
      <div className="card-details">
        <p>Last Modified: {new Date(card.lastModified).toLocaleDateString()}</p>
        <select value={cardStatus} onChange={handleCardStatusChange}>
          <option value="Learned">Learned</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Noted">Noted</option>
        </select>
      </div>
    </div>
  );
};

export default FlashCard;
