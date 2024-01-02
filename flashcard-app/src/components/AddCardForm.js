import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
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

export default AddCardForm;
