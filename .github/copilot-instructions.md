# Project Guidelines

## Mandatory Development Checklist
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run test`

## Stack
- React 19, TypeScript, Vite, and Tailwind CSS v4.
- Use the Tailwind v4 guidance in `.github/instructions/tailwind-4.instructions.md` when changing styling.

## Architecture
- App entry is `src/main.tsx`, and screen orchestration lives in `src/App.tsx`.
- Keep UI rendering in `src/components/`.
- Keep game state, localStorage persistence, and screen transitions in `src/hooks/useBingoGame.ts`.
- Keep bingo rules and board mutations in pure utility functions in `src/utils/bingoLogic.ts`.
- Keep shared domain types in `src/types/index.ts` and question content in `src/data/questions.ts`.

## Build And Test
- Use Node.js 22 or newer.
- Install dependencies with `npm install`.
- Start local development with `npm run dev`.
- Run `npm run lint` and `npm run test` for code changes.
- Run `npm run build` for shipped behavior, config, or deployment-path changes.

## Conventions
- Preserve the separation between presentational components, the `useBingoGame` state hook, and pure bingo logic utilities.
- Keep board updates immutable and keep bingo logic side-effect free so tests stay focused on `src/utils/bingoLogic.ts`.
- Preserve SSR guards and runtime validation around localStorage access in `src/hooks/useBingoGame.ts`.
- Follow the existing pattern of defining component prop interfaces close to each component.
- Do not hardcode deployment paths that assume `/`; `vite.config.ts` sets a GitHub Pages base path from `VITE_REPO_NAME`.

## Docs
- Link to `README.md` for local setup and commands instead of repeating it.
- Link to `workshop/GUIDE.md` and the `workshop/` part files instead of duplicating workshop guidance.