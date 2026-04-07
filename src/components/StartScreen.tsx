import type { GameMode } from '../types';

interface StartScreenProps {
  onSelectMode: (mode: GameMode) => void;
}

export function StartScreen({ onSelectMode }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 cozy-bg">
      <div className="text-center max-w-sm">
        <h1 className="text-4xl mb-2 cozy-title">Mixer Games</h1>
        <p className="text-lg mb-8 cozy-subtitle">Find your people!</p>
        
        <div className="space-y-4">
          {/* Bingo Mode */}
          <div className="cozy-card p-6">
            <h2 className="font-semibold mb-3 cozy-title">🎰 Bingo Mixer</h2>
            <p className="text-sm cozy-muted mb-4">
              Find people who match 5 questions in a row
            </p>
            <button
              onClick={() => onSelectMode('bingo')}
              className="w-full cozy-cta font-semibold py-2"
            >
              Play Bingo
            </button>
          </div>

          {/* Card Shuffle Mode */}
          <div className="cozy-card p-6">
            <h2 className="font-semibold mb-3 cozy-title">🎴 Card Shuffle</h2>
            <p className="text-sm cozy-muted mb-4">
              Draw random question cards one at a time
            </p>
            <button
              onClick={() => onSelectMode('card-deck')}
              className="w-full cozy-cta font-semibold py-2"
            >
              Draw Cards
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
