import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isCozy, setIsCozy] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'cozy';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isCozy) {
      root.setAttribute('data-theme', 'cozy');
      localStorage.setItem('theme', 'cozy');
    } else {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'default');
    }
  }, [isCozy]);

  return (
    <button
      onClick={() => setIsCozy((v) => !v)}
      className="text-sm px-2 py-1 rounded text-[var(--text-muted)] hover:text-[var(--text-strong)]"
      aria-pressed={isCozy}
      aria-label="Toggle theme"
    >
      {isCozy ? '☕ Cozy' : '🌤️ Default'}
    </button>
  );
}
