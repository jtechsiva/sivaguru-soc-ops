interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 cozy-bg">
      <div className="text-center max-w-sm">
        <h1 className="text-4xl mb-2 cozy-title">Bingo Mixer</h1>
        <p className="text-lg mb-8 cozy-subtitle">Find your people!</p>
        
        <div className="cozy-card p-6 mb-8">
          <h2 className="font-semibold mb-3 cozy-title">How to play</h2>
          <ul className="text-left cozy-muted text-sm space-y-2">
            <li>• Find people who match the questions</li>
            <li>• Tap a square when you find a match</li>
            <li>• Get 5 in a row to win!</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full cozy-cta font-semibold text-lg"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
