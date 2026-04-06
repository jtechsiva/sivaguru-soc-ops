## Development Checklist (mandatory)

- [ ] Lint: `npm run lint`
- [ ] Build: `npm run build`
- [ ] Test: `npm test`

# Copilot / Agent Instructions (workspace)

Purpose
-------
Short guidelines for agents working in this repo. Link to canonical docs rather than copying them.

Quick links
-----------
- [package.json](package.json) — scripts and deps
- [vite.config.ts](vite.config.ts) — dev/build settings
- [.github/instructions/tailwind-4.instructions.md](.github/instructions/tailwind-4.instructions.md) — Tailwind v4 notes
- [workshop/GUIDE.md](workshop/GUIDE.md) — onboarding & tasks

Common commands
---------------
- `npm install`
- `npm run dev` (Vite)
- `npm run build` (runs `tsc -b` then `vite build`)
- `npm test` (Vitest)
- `npm run lint` (ESLint)

Quick facts
-----------
- Tech: React + TypeScript + Vite; Tailwind CSS v4 for styling.
- Key code: `src/components`, `src/hooks`, `src/utils`.
- Tests: `src/test/setup.ts` and Vitest (jsdom).

Conventions
-----------
- Link, don't embed: prefer linking to `workshop/` or `docs/`.
- Check `.github/instructions/tailwind-4.instructions.md` before changing styles.
- Keep PRs small and focused to a single purpose.

Agent guidance
--------------
- Scan for existing files before creating new ones; reuse names/locations when possible.
- Verify changes locally with `npm run dev` and run `npm test`.
- When editing docs, prefer updating `workshop/GUIDE.md` or adding short files in `.github/instructions/`.

Example prompts
---------------
- Update the Bingo UI to add accessible ARIA attributes and tests.
- Add an `onboard-new-contributor.agent.md` that runs `npm install` and `npm run dev` and links to `workshop/01-setup.md`.

Next suggestions
----------------
- Add a short `onboard-new-contributor.agent.md` under `.github/agents/`.
- Add a PR checklist file under `.github/instructions/` for reviewers.

Maintainers: prefer small diffs and link to workshop/docs for background.
