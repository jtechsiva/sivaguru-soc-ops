# Design Guide — Cozy Coffee Shop

Purpose
- Capture design decisions, patterns, and rules for the "Cozy Coffee Shop" redesign so contributors and agents produce consistent UI changes.

Scope
- Applies to all UI styling, component visuals, and assets in the repository (`src/`, `public/`).
- Specifically targets CSS, Tailwind usage, images, fonts, and small presentational component changes. Does NOT mandate app behavior or data model changes.

Core Rules
- Use the theme variables defined in `src/themes/cozy-coffee.css` for colors, radii, shadows, and spacing. Do not hardcode hex colors in components; prefer `var(--...)` or the helper classes provided.
- Use `Inter` for body copy and `Lora` for headings unless a PR documents a deliberate alternative (must include accessibility justification).
- Prefer semantic helper classes (e.g., `cozy-card`, `cozy-cta`, `cozy-bg`, `sq-text`) instead of scattering raw Tailwind color classes across components. This keeps the look consistent across light/default and cozy themes.
- Follow the existing Tailwind v4 "CSS-first" approach. Avoid adding `tailwind.config.js` unless you explicitly update the project README and get signoff.

Component Guidelines
- Cards: use `cozy-card` for panels and modals. Keep border-radius and shadow from the theme variables.
- Buttons: use `cozy-cta` for primary CTAs. Keep rounded corners and subtle translate-on-press animations.
- Bingo squares: use `sq-base`, `sq-text`, `sq-marked`, `sq-winning` classes. Ensure text wraps (use `.sq-text`) and does not overflow.
- Header: show `public/assets/coffee.svg` when using the Cozy theme; ensure the image is optimized (SVG preferred).

Assets & Fonts
- Add new decorative assets under `public/assets/`. Optimize images (SVG for icons; compressed PNG/JPG for photos). Keep individual images small (< 100KB when possible).
- If adding fonts locally, put them in `public/fonts/` and reference them in `index.html` or `src/index.css`. Document in PR why local hosting is necessary.

Accessibility
- Maintain minimum contrast for body text and CTA buttons (WCAG AA). Run a quick contrast check for all color pairings introduced.
- Ensure keyboard focus states are visible for interactive elements (buttons, links, squares).

Testing & Visual Verification
- Run the dev server and visually check `StartScreen` and `GameScreen` at different viewport widths. Use `ThemeToggle` to verify both default and cozy themes.
- Add or update small unit/snapshot tests only if the change affects component output deterministically.

How to propose changes
- Small visual tweaks: open a PR that updates CSS variables or helper classes and include screenshots (light and cozy themes).
- New theme assets or font changes: include size, license source, and an optional fallback strategy.

Example agent prompts
- "Apply cozy CTA to `src/components/MyButton.tsx` using `cozy-cta`."
- "Convert component X to use `sq-text` for inner text wrapping and ensure no overflow on narrow screens."

Maintenance
- Keep this file updated when adding new helpers or changing the palette. Major changes (palette, font family) require a short design note in the PR description.
