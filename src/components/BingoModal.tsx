interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 cozy-modal-overlay flex items-center justify-center p-4 z-50">
      <div className="cozy-card p-6 max-w-xs w-full text-center animate-[bounce_0.5s_ease-out]">
        <div className="mb-4 cozy-emoji">☕️</div>
        <h2 className="text-3xl font-bold cozy-heading mb-2">BINGO!</h2>
        <p className="cozy-muted mb-6">You completed a line!</p>
        
        <button
          onClick={onDismiss}
          className="w-full cozy-cta font-semibold py-3 px-6"
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}
