import { useState, useEffect, useCallback } from 'react';
import { ThemeToggle } from './ThemeToggle';
import './card-deck.css';

interface CardDeckScreenProps {
  currentCard: string;
  cardCount: number;
  onNextCard: () => void;
  onReset: () => void;
}

export function CardDeckScreen({
  currentCard,
  cardCount,
  onNextCard,
  onReset,
}: CardDeckScreenProps) {
  const [lastAction, setLastAction] = useState<'success' | 'fail' | null>(null);

  const handleFail = useCallback(() => {
    setLastAction('fail');
    setTimeout(() => setLastAction(null), 300);
    onNextCard();
  }, [onNextCard]);

  const handleSuccess = useCallback(() => {
    setLastAction('success');
    setTimeout(() => setLastAction(null), 300);
    onNextCard();
  }, [onNextCard]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleFail();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleSuccess();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFail, handleSuccess]);

  return (
    <div className="flex flex-col min-h-full cozy-bg">
      {/* Header */}
      <header className="flex items-center justify-between p-3 cozy-card">
        <button
          onClick={onReset}
          className="text-[var(--text-muted)] text-sm px-3 py-1.5 rounded"
        >
          ← Back
        </button>

        <div className="flex items-center gap-3">
          <img src="/assets/coffee.svg" alt="Coffee" className="w-8 h-8" />
          <h1 className="font-bold cozy-title">Card Shuffle</h1>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      {/* Instructions */}
      <p className="text-center cozy-muted text-sm py-3 px-4">
        👈 Skip or 👉 Like • Use arrow keys or buttons
      </p>

      {/* Card Count & Status */}
      <div className="text-center py-2">
        <p className="cozy-muted text-xs">
          Cards drawn: {cardCount}
        </p>
        {lastAction && (
          <p className={`text-sm font-semibold mt-1 ${lastAction === 'success' ? 'text-green-600' : 'text-red-500'}`}>
            {lastAction === 'success' ? '💚 Liked!' : '👋 Skipped'}
          </p>
        )}
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center p-6">
        <button
          key={`card-${cardCount}`}
          onClick={handleSuccess}
          className={`card-flip w-full max-w-sm aspect-[3/4] bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-border)] rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 border-2 border-[var(--card-border)] ${
            lastAction === 'success' ? 'scale-110' : lastAction === 'fail' ? 'scale-90 opacity-60' : ''
          }`}
        >
          <div className="text-center">
            <p className="text-2xl font-semibold cozy-title mb-4">
              ☕️
            </p>
            <p className="text-lg font-medium cozy-subtitle leading-relaxed">
              {currentCard}
            </p>
          </div>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center pb-8 px-6">
        <button
          onClick={handleFail}
          className="flex-1 max-w-xs px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-600 font-semibold rounded-lg border-2 border-red-500/30 transition-all active:scale-95"
        >
          👋 Skip
        </button>
        <button
          onClick={handleSuccess}
          className="flex-1 max-w-xs px-6 py-3 bg-green-500/10 hover:bg-green-500/20 text-green-600 font-semibold rounded-lg border-2 border-green-500/30 transition-all active:scale-95"
        >
          💚 Like
        </button>
      </div>
    </div>
  );
}
