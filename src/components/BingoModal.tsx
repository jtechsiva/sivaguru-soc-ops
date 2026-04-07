import { useEffect, useId, useRef } from 'react';

interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const prevActiveRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    prevActiveRef.current = document.activeElement as HTMLElement | null;

    const modal = modalRef.current;
    if (!modal) return;

    // focus the first focusable element inside the modal (Keep Playing button)
    const focusable = modal.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onDismiss();
        return;
      }

      if (e.key === 'Tab') {
        // trap focus inside modal
        const focusableEls = Array.from(modal!.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(Boolean);
        if (focusableEls.length === 0) return;
        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // restore focus to previous element
      try {
        prevActiveRef.current?.focus();
      } catch (error: unknown) {
        // Intentionally ignore errors when restoring focus
        void error;
      }
    };
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 cozy-modal-overlay flex items-center justify-center p-4 z-50" role="presentation">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="cozy-card p-6 max-w-xs w-full text-center animate-[bounce_0.5s_ease-out]"
      >
        <div className="mb-4 cozy-emoji" aria-hidden>
          ☕️
        </div>
        <h2 id={titleId} className="text-3xl font-bold cozy-heading mb-2">
          BINGO!
        </h2>
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
