import React, { useState, useEffect } from 'react';
import AddCardForm from './AddCardForm'; // Assuming AddCardForm is in the same directory
import FlashCard from './FlashCard';
import './FlashCardsPage.css';

const FlashCardsPage = () => {
    const [cards, setCards] = useState([]);
    const [editingCard, setEditingCard] = useState(null);
    const [showAddCardForm, setShowAddCardForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
      fetch('http://localhost:3000/cards')
        .then(response => response.json())
        .then(data => setCards(data))
        .catch(error => console.error('Error fetching cards:', error));
    }, []);

    const handleStatusChange = (cardId, newStatus) => {
        setCards(prevCards => prevCards.map(card =>
            card.id === cardId ? { ...card, status: newStatus, lastModified: new Date().toISOString() } : card
        ));
    };

    const addNewCard = (cardData, id) => {
        if (id) {
            setCards(prevCards => prevCards.map(card =>
                card.id === id ? { ...card, ...cardData, lastModified: new Date().toISOString() } : card
            ));
        } else {
          // Add new card
          fetch('http://localhost:3000/cards', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...cardData, lastModified: new Date().toISOString() })
          })
          .then(response => response.json())
          .then(newCard => setCards(prevCards => [...prevCards, newCard]))
          .catch(error => console.error('Error adding card:', error));
      
          setShowAddCardForm(false);
        }
      };

    const handleEditCard = (cardId) => {
        const cardToEdit = cards.find(card => card.id === cardId);
        setEditingCard(cardToEdit);
    };

    const handleDeleteCard = (cardId) => {
      fetch(`http://localhost:3000/cards/${cardId}`, {
        method: 'DELETE',
      })
      .then(() => {
        setCards(prevCards => prevCards.filter(card => card.id !== cardId));
      })
      .catch(error => console.error('Error deleting card:', error));
    };

    const handleSaveEditedCard = (cardId, frontContent, backContent) => {
      const updatedCard = { frontContent, backContent, lastModified: new Date().toISOString() };
      
      fetch(`http://localhost:3000/cards/${cardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCard)
      })
      .then(response => response.json())
      .then(updatedCard => {
        setCards(prevCards => prevCards.map(card => 
          card.id === cardId ? { ...card, ...updatedCard } : card
        ));
      })
      .catch(error => console.error('Error updating card:', error));
    };

    const toggleAddCardForm = () => {
        setShowAddCardForm(!showAddCardForm);
        setEditingCard(null);
    };

    const filteredCards = cards.filter(card =>
        (card.frontContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.backContent.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterStatus === 'All' || card.status === filterStatus)
    );

    return (
      <div className="flashcards-container">
          <div className="controls-section">
              <div className="top-controls">
                  <button className="open-add-card-btn" onClick={toggleAddCardForm}>
                      {showAddCardForm ? 'Close Add Card Form' : 'Open Add Card Form'}
                  </button>

                  <input 
                      type="text" 
                      className="search-input"
                      placeholder="Search cards..." 
                      value={searchQuery} 
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  <div className="filter-section">
                      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                          <option value="All">All</option>
                          <option value="Learned">Learned</option>
                          <option value="Want to Learn">Want to Learn</option>
                          <option value="Noted">Noted</option>
                      </select>
                  </div>
              </div>

              {showAddCardForm && (
                  <AddCardForm onAddCard={addNewCard} editingCard={editingCard} />
              )}
          </div>

          {cards.map(card => (
    <FlashCard key={card.id} card={card} {...otherProps} />
))}
      </div>
  );
};

export default FlashCardsPage;