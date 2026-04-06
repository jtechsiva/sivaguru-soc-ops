# Dogfooding Skill

Purpose
-------
Provide a concise, repeatable workflow for an agent or contributor to "dogfood" the app: run it, interact with the UI, capture usability and accessibility feedback, and surface prioritized action items.

Scope
-----
- Workspace-scoped skill for `sivaguru-soc-ops` Bingo Mixer.
- Intended for agents and humans running local dev or Codespaces.

Prerequisites
-------------
- Dev server can run: `npm install` then `npm run dev` (Vite).
- Browser tooling available (agent-built browser or human browser).

Outcome
-------
- A short usability report (strengths, issues, prioritized action list).
- A checklist of accessibility and UX regressions.
- Optionally: screenshots and a proposed PR scope.

Step-by-step workflow
---------------------
1. Start the app
   - Run: `npm run dev` and confirm app loads at `http://localhost:5173/`.
2. Quick smoke test (30–60s)
   - Confirm page title and visible grid.
   - Tap/click ~3 relevant squares, include the `Free Space` if present.
   - Verify a Bingo celebration appears when a line completes.
3. Full playthrough (2–5 minutes)
   - Play a full round: interact with UI, trigger modal, retry/keep playing.
   - Try edge cases: rapid taps, long label wrapping, narrow viewport.
4. Accessibility checks
   - Tab through all interactive squares and confirm focus is visible.
   - Check `aria-pressed` or equivalent state on toggled squares.
   - Confirm Bingo modal uses an accessible dialog role and receives focus.
5. Record observations
   - Note: clarity, fun factor, responsiveness, animation/sound, label truncation.
   - Record any failures: missing ARIA, keyboard traps, unreadable text.
6. Prioritize and recommend fixes
   - Classify findings: `P0` (blocker), `P1` (high), `P2` (improvement).
   - Provide minimal reproduction steps for each item.
7. Save artifacts
   - Attach screenshots, short video, and sample console errors if present.

Decision points & branching
---------------------------
- If the app fails to load → stop and report environment error (node version, missing deps).
- If major accessibility failures (keyboard inoperable or modal not reachable) → mark `P0` and create an issue immediately.
- If only visual/UX polish needed → recommend a small PR scope (hint: `aria-*` + `tabIndex` + a hint overlay).

Quality criteria / completion checks
----------------------------------
- App loads and square interactions are responsive.
- Bingo modal is reachable and announced by screen readers.
- No uncaught console errors during playthrough.
- Playthrough notes include >=3 actionable suggestions and at least one prioritized P0/P1/P2 label where applicable.

Example prompts to run this skill
---------------------------------
- "Run the dogfooding skill and produce a short usability report."
- "Play the app and check keyboard accessibility; create issues for P0s."
- "Dogfood: test mobile narrow viewport and report layout regressions."

How to save as a reusable skill
------------------------------
1. Paste this file as `.github/skills/dogfooding/SKILL.md` (done).
2. Use agent command (or manual process) to run the steps and store the report.

Ambiguities / questions
-----------------------
- Do you want the skill to automatically open and capture screenshots, or only produce a text report? (automation requires agent browser tooling permissions.)
- Should the skill create issues/PRs automatically for `P0` items, or just draft suggested titles and bodies?

Next steps (suggested)
----------------------
- Implement ARIA + keyboard checks as a focused PR (high priority).
- Optionally automate screenshot capture during the skill run.
- Teach agents to attach generated reports to issues or PR templates.
