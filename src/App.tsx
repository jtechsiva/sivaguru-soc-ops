import { useState } from 'react';
import { useBingoGame } from './hooks/useBingoGame';
import { useCardDeck } from './hooks/useCardDeck';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { CardDeckScreen } from './components/CardDeckScreen';
import { BingoModal } from './components/BingoModal';
import type { GameMode } from './types';

function App() {
  const [gameMode, setGameMode] = useState<GameMode | null>(null);

  const {
    gameState,
    board,
    winningSquareIds,
    showBingoModal,
    startGame,
    handleSquareClick,
    resetGame,
    dismissModal,
  } = useBingoGame();

  const {
    currentCard,
    cardCount,
    nextCard,
    resetDeck,
  } = useCardDeck();

  const handleSelectMode = (mode: GameMode) => {
    setGameMode(mode);
    if (mode === 'bingo') {
      startGame();
    }
  };

  const handleBackToMenu = () => {
    setGameMode(null);
    resetGame();
    resetDeck();
  };

  // Show mode selection when no mode is selected
  if (gameMode === null) {
    return <StartScreen onSelectMode={handleSelectMode} />;
  }

  // Show bingo game
  if (gameMode === 'bingo') {
    if (gameState === 'start') {
      return <StartScreen onSelectMode={handleSelectMode} />;
    }

    return (
      <>
        <GameScreen
          board={board}
          winningSquareIds={winningSquareIds}
          hasBingo={gameState === 'bingo'}
          onSquareClick={handleSquareClick}
          onReset={handleBackToMenu}
        />
        {showBingoModal && (
          <BingoModal onDismiss={dismissModal} />
        )}
      </>
    );
  }

  // Show card deck game
  if (gameMode === 'card-deck') {
    return (
      <CardDeckScreen
        currentCard={currentCard}
        cardCount={cardCount}
        onNextCard={nextCard}
        onReset={handleBackToMenu}
      />
    );
  }

  return null;
}

export default App;
