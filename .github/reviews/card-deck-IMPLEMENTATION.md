# Card Deck – Implementation Guide

Quick reference for applying the review recommendations.

## Critical Fixes (Apply First)

### 1. Fix Accessibility Contrast Issues

**File**: `src/components/CardDeckScreen.tsx`

Replace the status message color logic:

```tsx
{lastAction && (
  <p className={`text-sm font-semibold mt-1 transition-opacity duration-300 ${
    lastAction === 'success' 
      ? 'text-[var(--color-success)]'     // Use theme green instead of text-green-600
      : 'text-red-700'                     // Darker red for better contrast
  }`}>
    {lastAction === 'success' ? '💚 Liked!' : '👋 Skipped'}
  </p>
)}
```

**Fix Button Contrast**:

```tsx
{/* Replace Skip button */}
<button
  onClick={handleFail}
  className="flex-1 max-w-xs px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg border-2 border-red-300 transition-all active:scale-95"
>
  👋 Skip
</button>

{/* Replace Like button */}
<button
  onClick={handleSuccess}
  className="flex-1 max-w-xs px-6 py-3 bg-green-100 hover:bg-green-200 text-[var(--color-success)] font-semibold rounded-lg border-2 border-green-300 transition-all active:scale-95"
>
  💚 Like
</button>
```

---

### 2. Clarify Card Interaction & Remove Ambiguity

**Option A (Recommended): Remove card click handler, make buttons primary**

```tsx
{/* Card section - remove onClick handler and button class */}
<div className="flex-1 flex items-center justify-center p-6">
  <div
    className={`card-flip w-full max-w-sm aspect-[3/4] bg-[var(--color-card)] rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center border-2 border-[rgba(59,35,20,0.1)] transition-all ${
      lastAction === 'success' ? 'scale-105 opacity-100' : lastAction === 'fail' ? 'scale-95 opacity-50' : ''
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
  </div>
</div>
```

**Update Instructions for Clarity**:

```tsx
{/* Instructions */}
<p className="text-center cozy-muted text-xs sm:text-sm py-3 px-4">
  <span className="block sm:inline">👋 Skip: Button or ←</span>
  {' '}•{' '}
  <span className="block sm:inline">💚 Like: Button or →</span>
</p>
```

---

### 3. Mobile Responsive Buttons

**Fix button layout to stack on small screens**:

```tsx
{/* Action Buttons - updated layout */}
<div className="flex flex-col sm:flex-row gap-4 justify-center pb-6 px-4 sm:px-6">
  <button
    onClick={handleFail}
    className="flex-1 max-w-xs px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg border-2 border-red-300 transition-all active:scale-95"
  >
    👋 Skip
  </button>
  <button
    onClick={handleSuccess}
    className="flex-1 max-w-xs px-6 py-3 bg-green-100 hover:bg-green-200 text-[var(--color-success)] font-semibold rounded-lg border-2 border-green-300 transition-all active:scale-95"
  >
    💚 Like
  </button>
</div>
```

---

### 4. Increase Feedback Timeout & Sequence Properly

**File**: `src/components/CardDeckScreen.tsx`

Replace the callback functions:

```tsx
const handleFail = useCallback(() => {
  setLastAction('fail');
  setTimeout(() => {
    setLastAction(null);
    onNextCard();
  }, 600);  // Increased from 300ms
}, [onNextCard]);

const handleSuccess = useCallback(() => {
  setLastAction('success');
  setTimeout(() => {
    setLastAction(null);
    onNextCard();
  }, 600);  // Increased from 300ms
}, [onNextCard]);
```

---

## Polish Fixes (Apply Second)

### 5. Add Focus-Visible for Accessibility

**Update back button**:

```tsx
<button
  onClick={onReset}
  className="text-[var(--text-muted)] hover:text-[var(--text-strong)] hover:bg-black/5 text-sm px-3 py-1.5 rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(197,138,58,0.4)]"
>
  ← Back
</button>
```

---

### 6. Fix Card Gradient (Define Theme Variable)

**File**: `src/themes/cozy-coffee.css`

Add to the `[data-theme="cozy"]` section:

```css
[data-theme="cozy"] :root,
[data-theme="cozy"] {
  /* ... existing variables ... */
  --card-border: #E8D7C8;  /* Add this */
}
```

Or update CardDeckScreen to remove gradient dependency:

```tsx
className={`card-flip w-full max-w-sm aspect-[3/4] bg-[var(--color-card)] rounded-2xl shadow-lg...`}
```

---

### 7. Synchronize Animation Timings

**File**: `src/components/card-deck.css`

```css
@keyframes cardFlip {
  0% {
    transform: rotateY(0deg);
    opacity: 1;
  }
  50% {
    transform: rotateY(90deg);
    opacity: 0.5;
  }
  100% {
    transform: rotateY(0deg);
    opacity: 1;
  }
}

.card-flip {
  animation: cardFlip 0.6s ease-in-out;  /* Changed from 0.4s */
}
```

---

## Full Updated Component

Here's the complete refactored CardDeckScreen with all critical and polish fixes applied:

```tsx
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
    setTimeout(() => {
      setLastAction(null);
      onNextCard();
    }, 600);
  }, [onNextCard]);

  const handleSuccess = useCallback(() => {
    setLastAction('success');
    setTimeout(() => {
      setLastAction(null);
      onNextCard();
    }, 600);
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
          className="text-[var(--text-muted)] hover:text-[var(--text-strong)] hover:bg-black/5 text-sm px-3 py-1.5 rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(197,138,58,0.4)]"
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
      <p className="text-center cozy-muted text-xs sm:text-sm py-3 px-4">
        <span className="block sm:inline">👋 Skip: Button or ←</span>
        {' '}•{' '}
        <span className="block sm:inline">💚 Like: Button or →</span>
      </p>

      {/* Card Count & Status */}
      <div className="text-center py-2">
        <p className="cozy-muted text-xs">
          Cards drawn: <span className="font-semibold">{cardCount}</span>
        </p>
        {lastAction && (
          <p className={`text-sm font-semibold mt-1 transition-opacity duration-300 ${
            lastAction === 'success' 
              ? 'text-[var(--color-success)]'
              : 'text-red-700'
          }`}>
            {lastAction === 'success' ? '💚 Liked!' : '👋 Skipped'}
          </p>
        )}
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div
          key={`card-${cardCount}`}
          className={`card-flip w-full max-w-sm aspect-[3/4] bg-[var(--color-card)] rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center border-2 border-[rgba(59,35,20,0.1)] transition-all ${
            lastAction === 'success' ? 'scale-105 opacity-100' : lastAction === 'fail' ? 'scale-95 opacity-50' : ''
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
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pb-6 px-4 sm:px-6">
        <button
          onClick={handleFail}
          className="flex-1 max-w-xs px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg border-2 border-red-300 transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
        >
          👋 Skip
        </button>
        <button
          onClick={handleSuccess}
          className="flex-1 max-w-xs px-6 py-3 bg-green-100 hover:bg-green-200 text-[var(--color-success)] font-semibold rounded-lg border-2 border-green-300 transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
        >
          💚 Like
        </button>
      </div>
    </div>
  );
}
```

---

## Testing Before & After

### Before (Current State)
- [ ] Contrast audit: Red feedback text fails WCAG AA
- [ ] Mobile: Buttons crowd on iPhone SE
- [ ] Feedback: Disappears too quickly (300ms)
- [ ] UX: Unclear whether card click or button should be used

### After (Fixed)
- [ ] Contrast audit: All text passes WCAG AA
- [ ] Mobile: Buttons stack vertically on small screens
- [ ] Feedback: Visible for 600ms, feels intentional
- [ ] UX: Clear card is informational; buttons are primary interaction

---

## Verification Steps

```bash
# 1. Test accessibility
npm run lint

# 2. Test on multiple viewports
# Open DevTools → Responsive Mode
# Test: iPhone SE (375px), iPhone Pro (390px), iPad (768px), Desktop (1920px)

# 3. Test keyboard navigation
# Tab through all elements
# Arrow Left / Right should work in card screen

# 4. Test interactions
# Click skip / like buttons
# Use arrow keys
# Verify feedback displays for 600ms
# Verify card animates smoothly
```

---

## Pull Request checklist

- [ ] All contrast issues fixed (WCAG AA)
- [ ] Mobile responsive tested on real devices
- [ ] Feedback timeout increased to 600ms
- [ ] Instructions clarified for keyboard shortcuts
- [ ] Focus-visible styles added
- [ ] Animations synchronized
- [ ] Theme variable(s) added or gradient removed
- [ ] Run `npm run lint` – no errors
- [ ] Run `npm run build` – compiles successfully
- [ ] Run `npm test` – tests pass
