// AddFlashCard.js

import React, { useState } from 'react';

const AddFlashCard = ({ onAdd }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Creating a new flash card object
    const newFlashCard = {
      question: question,
      answer: answer,
    };
    // Passing new flash card data to the parent component
    onAdd(newFlashCard);
    // After submission resetting input fields
    setQuestion('');
    setAnswer('');
  };

  return (
    <div className="add-flash-card">
      <h2>Add New Flash Card</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </label>
        <label>
          Answer:
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Flash Card</button>
      </form>
    </div>
  );
};

export default AddFlashCard;
