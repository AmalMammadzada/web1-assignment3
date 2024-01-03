import React, { useState, useEffect } from 'react';

const AddCardForm = ({ onAddCard, editingCard }) => {
    const [frontContent, setFrontContent] = useState(editingCard ? editingCard.frontContent : '');
    const [backContent, setBackContent] = useState(editingCard ? editingCard.backContent : '');
    const [frontImage, setFrontImage] = useState(editingCard ? editingCard.frontImage : '');
    const [backImage, setBackImage] = useState(editingCard ? editingCard.backImage : '');

    useEffect(() => {
        if (editingCard) {
            setFrontContent(editingCard.frontContent);
            setBackContent(editingCard.backContent);
            setFrontImage(editingCard.frontImage);
            setBackImage(editingCard.backImage);
        } else {
            resetFormFields();
        }
    }, [editingCard]);

    const resetFormFields = () => {
        setFrontContent('');
        setBackContent('');
        setFrontImage('');
        setBackImage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cardData = {
            frontContent,
            backContent,
            frontImage,
            backImage,
            lastModified: new Date().toISOString(),
            status: 'Want to Learn'
        };
        onAddCard(cardData, editingCard?.id);
        resetFormFields();
    };

    return (
      <form onSubmit={handleSubmit} className="add-card-form">
        <div>
          <label>Front Content: </label>
          <input
            type="text"
            value={frontContent}
            onChange={(e) => setFrontContent(e.target.value)}
            placeholder="Text or leave blank for image"
          />
          <label>Front Image URL: </label>
          <input
            type="text"
            value={frontImage}
            onChange={(e) => setFrontImage(e.target.value)}
            placeholder="URL for front image"
          />
        </div>
        <div>
          <label>Back Content: </label>
          <input
            type="text"
            value={backContent}
            onChange={(e) => setBackContent(e.target.value)}
            placeholder="Text or leave blank for image"
          />
          <label>Back Image URL: </label>
          <input
            type="text"
            value={backImage}
            onChange={(e) => setBackImage(e.target.value)}
            placeholder="URL for back image"
          />
        </div>
        <button type="submit">{editingCard ? 'Save Changes' : 'Add Card'}</button>
      </form>
    );
  };

export default AddCardForm;
