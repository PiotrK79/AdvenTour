import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SwipeCard from '../components/SwipeCard';
import useSwipe from '../hooks/useSwipe';
import { useGroup } from '../context/GroupContext';
import '../styles/pages/SwipeDeck.scss';

interface Destination {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  price: number;
}

const SwipeDeck: React.FC = () => {
  const navigate = useNavigate();
  const { addMatch } = useGroup();
  const [cards, setCards] = useState<Destination[]>([
    {
      id: '1',
      title: 'Kraków',
      description: 'Zabytkowe miasto pełne historii i kultury',
      image: '/images/krakow.jpg',
      rating: 4.8,
      price: 1200,
    },
    {
      id: '2',
      title: 'Bałtyk',
      description: 'Piękne plaże i wakacje na wybrzeżu',
      image: '/images/baltyk.jpg',
      rating: 4.5,
      price: 800,
    },
    {
      id: '3',
      title: 'Tatry',
      description: 'Góry idealne do trekkingu i wspinaczki',
      image: '/images/tatry.jpg',
      rating: 4.9,
      price: 1500,
    },
  ]);

  const [matches, setMatches] = useState<string[]>([]);
  const { position, rotate, handleTouchStart, handleTouchMove, handleTouchEnd } =
    useSwipe(
      (direction) => {
        const currentCard = cards[0];
        if (currentCard) {
          if (direction === 'right') {
            setMatches([...matches, currentCard.id]);
            addMatch(currentCard.id);
          }
          setCards(cards.slice(1));
        }
      },
      { threshold: 50 }
    );

  return (
    <>
      <Navbar currentStep="Przewijanie" />
      <div className="swipe-deck-container">
        <div className="deck-stats">
          <span>Polubione: {matches.length}</span>
          <span>Pozostało: {cards.length}</span>
        </div>

        <div
          className="card-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `translateX(${position}px) rotate(${rotate}deg)`,
            cursor: 'grab',
          }}
        >
          {cards.length > 0 ? (
            <SwipeCard {...cards[0]} />
          ) : (
            <div className="empty-state">
              <h2>Brak więcej kart!</h2>
              <p>Kliknij przycisk poniżej, aby zobaczyć wyniki</p>
              <button className="btn btn-primary" onClick={() => navigate('/final')}>
                Przejdź do podsumowania
              </button>
            </div>
          )}
        </div>

        <div className="swipe-actions">
          <button className="action-btn dislike">Nie</button>
          <button className="action-btn">Cofnij</button>
          <button className="action-btn like">Tak</button>
          <button className="btn btn-secondary" onClick={() => navigate('/setup')}>
            Wróć do ustawień
          </button>
        </div>
      </div>
    </>
  );
};

export default SwipeDeck;
