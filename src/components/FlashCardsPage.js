import React, { useState, useEffect } from 'react';
import AddCardForm from './AddCardForm';
import FlashCard from './FlashCard';
import './FlashCardsPage.css';

const FlashCardsPage = () => {
    const [cards, setCards] = useState([]);
    const [editingCard, setEditingCard] = useState(null);
    const [showAddCardForm, setShowAddCardForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        fetch('http://localhost:3001/cards')
            .then(response => response.json())
            .then(data => {
                setCards(data);
                console.log('Cards fetched:', data); // Debugging line
            })
            .catch(error => console.error('Error fetching cards:', error));
    }, []);

    const updateCardsOnServer = (updatedCards) => {
        fetch('http://localhost:3001/cards', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCards)
        })
        .then(response => response.json())
        .then(() => {
            setCards(updatedCards);
        })
        .catch(error => console.error('Error updating cards:', error));
    };

    const handleStatusChange = (cardId, newStatus) => {
        const updatedCards = cards.map(card =>
            card.id === cardId ? { ...card, status: newStatus, lastModified: new Date().toISOString() } : card
        );
        setCards(updatedCards);
        console.log('Cards after status change:', updatedCards); // Debugging line
    };

    const addNewCard = (cardData, id) => {
        const newCard = { ...cardData, id: id || new Date().getTime().toString(), lastModified: new Date().toISOString() };
        const updatedCards = id ? cards.map(card =>
            card.id === id ? newCard : card
        ) : [...cards, newCard];

        updateCardsOnServer(updatedCards);
    };

    const handleEditCard = (cardId) => {
        const cardToEdit = cards.find(card => card.id === cardId);
        setEditingCard(cardToEdit);
    };

    const handleDeleteCard = (cardId) => {
        const updatedCards = cards.filter(card => card.id !== cardId);
        updateCardsOnServer(updatedCards);
    };

    const onSave = (cardId, updatedCardData) => {
        const updatedCards = cards.map(card =>
            card.id === cardId ? { ...card, ...updatedCardData, lastModified: new Date().toISOString() } : card
        );
        updateCardsOnServer(updatedCards);
    };

    const toggleAddCardForm = () => {
        setShowAddCardForm(!showAddCardForm);
        setEditingCard(null);
    };

    const filteredCards = cards.filter(card => {
        const matchesSearchQuery = card.frontContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                   card.backContent.toLowerCase().includes(searchQuery.toLowerCase());
        return filterStatus === 'All' || card.status === filterStatus ? matchesSearchQuery : false;
    });

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

            <div className="flashcards-container">
            {/* ... controls section ... */}

            <div className="flashcards-display">
                {filteredCards.map(card => (
                    <FlashCard
                        key={card.id}
                        card={card}
                        onEdit={() => handleEditCard(card.id)}
                        onDelete={() => handleDeleteCard(card.id)}
                        onStatusChange={(newStatus) => handleStatusChange(card.id, newStatus)}
                        onSave={onSave}
                    />
                ))}
            </div>
        </div>
        </div>
    );
};

export default FlashCardsPage;
