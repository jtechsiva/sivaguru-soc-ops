import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const classes = ['sq-base', 'relative', 'transition-all', 'duration-150', 'select-none'];

  if (square.isMarked) {
    if (isWinning) classes.push('sq-winning');
    else classes.push('sq-marked');
  } else {
    // unmarked
  }

  if (square.isFreeSpace) classes.push('sq-free');

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={classes.join(' ')}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="sq-text">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="sq-checkmark">✓</span>
      )}
    </button>
  );
}
