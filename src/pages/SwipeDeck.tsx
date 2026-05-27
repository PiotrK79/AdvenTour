import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SwipeCard from '../components/SwipeCard';
import useSwipe from '../hooks/useSwipe';
import { useGroup } from '../context/GroupContext';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import PageHeader from '../components/ui/PageHeader';
import StatPill from '../components/ui/StatPill';
import { destinations, type Destination } from '../data/destinations';
import '../styles/pages/SwipeDeck.scss';

const SwipeDeck: React.FC = () => {
  const navigate = useNavigate();
  const {
    addMatch,
    groupName,
    matches,
    removeMatch,
    setCurrentStep,
  } = useGroup();
  const [cards, setCards] = useState<Destination[]>(
    destinations.filter((destination) => !matches.includes(destination.id))
  );
  const [history, setHistory] = useState<Array<{ card: Destination; liked: boolean }>>([]);
  const totalCards = cards.length + history.length;
  const progress = totalCards === 0 ? 100 : Math.round((history.length / totalCards) * 100);

  const handleDecision = useCallback((direction: 'left' | 'right') => {
    setCards((currentCards) => {
      const [currentCard, ...nextCards] = currentCards;
      if (!currentCard) {
        return currentCards;
      }

      const liked = direction === 'right';
      setHistory((currentHistory) => [...currentHistory, { card: currentCard, liked }]);

      if (liked) {
        addMatch(currentCard.id);
      }

      return nextCards;
    });
  }, [addMatch]);

  const handleUndo = () => {
    setHistory((currentHistory) => {
      const previous = currentHistory.at(-1);
      if (!previous) {
        return currentHistory;
      }

      setCards((currentCards) => [previous.card, ...currentCards]);
      if (previous.liked) {
        removeMatch(previous.card.id);
      }

      return currentHistory.slice(0, -1);
    });
  };

  const goToFinalPlan = () => {
    setCurrentStep('final');
    navigate('/final');
  };

  const { position, rotate, directionHint, handlePointerDown, handlePointerMove, handlePointerUp } =
    useSwipe(
      (direction) => {
        if (direction === 'left' || direction === 'right') {
          handleDecision(direction);
        }
      },
      { threshold: 80 }
    );

  return (
    <>
      <Navbar currentStep="Przewijanie" groupName={groupName} />
      <div className="swipe-deck-container">
        <PageHeader
          eyebrow="Krok 2"
          title="Wybierzcie najlepsze pomysły"
          description="Przeciągnij kartę albo użyj przycisków. Polubione miejsca trafią do końcowego planu."
        />

        <div className="deck-stats">
          <StatPill label="Polubione" value={matches.length} />
          <StatPill label="Pozostało" value={cards.length} />
          <StatPill label="Postęp" value={`${progress}%`} />
        </div>

        <div className="deck-progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>

        <div
          className={`card-container hint-${directionHint}`}
          onPointerDown={cards.length > 0 ? handlePointerDown : undefined}
          onPointerMove={cards.length > 0 ? handlePointerMove : undefined}
          onPointerUp={cards.length > 0 ? handlePointerUp : undefined}
          onPointerCancel={cards.length > 0 ? handlePointerUp : undefined}
          style={{
            transform: `translateX(${position}px) rotate(${rotate}deg)`,
            cursor: cards.length > 0 ? 'grab' : 'default',
          }}
        >
          {cards.length > 0 ? (
            <>
              <span className="swipe-hint swipe-hint-like">Tak</span>
              <span className="swipe-hint swipe-hint-dislike">Nie</span>
              <SwipeCard {...cards[0]} />
            </>
          ) : (
            <EmptyState
              title="Brak więcej kart!"
              description="Kliknij przycisk poniżej, aby zobaczyć wyniki."
              action={
                <Button onClick={goToFinalPlan}>
                  Przejdź do podsumowania
                </Button>
              }
            />
          )}
        </div>

        <div className="swipe-actions">
          <button className="action-btn dislike" onClick={() => handleDecision('left')} disabled={cards.length === 0}>
            Nie
          </button>
          <button className="action-btn undo" onClick={handleUndo} disabled={history.length === 0}>
            Cofnij
          </button>
          <button className="action-btn like" onClick={() => handleDecision('right')} disabled={cards.length === 0}>
            Tak
          </button>
          <Button variant="secondary" onClick={() => navigate('/setup')}>
            Wróć do ustawień
          </Button>
        </div>
      </div>
    </>
  );
};

export default SwipeDeck;
