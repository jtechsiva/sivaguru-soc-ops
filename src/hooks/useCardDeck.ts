import { useState, useCallback } from 'react';
import { questions } from '../data/questions';

export interface CardDeckState {
  currentCard: string;
  cardCount: number;
}

export interface CardDeckActions {
  nextCard: () => void;
  resetDeck: () => void;
}

function getRandomCard(): string {
  return questions[Math.floor(Math.random() * questions.length)];
}

export function useCardDeck(): CardDeckState & CardDeckActions {
  const [currentCard, setCurrentCard] = useState<string>(() => getRandomCard());
  const [cardCount, setCardCount] = useState(1);

  const nextCard = useCallback(() => {
    setCurrentCard(getRandomCard());
    setCardCount((prev) => prev + 1);
  }, []);

  const resetDeck = useCallback(() => {
    setCurrentCard(getRandomCard());
    setCardCount(1);
  }, []);

  return {
    currentCard,
    cardCount,
    nextCard,
    resetDeck,
  };
}
