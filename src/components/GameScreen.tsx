import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';
import { ThemeToggle } from './ThemeToggle';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
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
          <h1 className="font-bold cozy-title">Bingo Mixer</h1>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      {/* Instructions */}
      <p className="text-center cozy-muted text-sm py-2 px-4">
        Tap a square when you find someone who matches it.
      </p>

      {/* Bingo indicator */}
      {hasBingo && (
        <div className="text-center py-2 font-semibold text-sm" style={{ background: 'linear-gradient(90deg, rgba(197,138,58,0.12), rgba(76,138,103,0.06))' }}>
          ☕️ BINGO! You got a line!
        </div>
      )}

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-3">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
