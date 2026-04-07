# Gabriel's Math Game

A single-file HTML/CSS/JS math game for kids — no build tools, no frameworks.

## Project structure

- `index.html` — the entire app (HTML + CSS + JS in one file)
- `tests/game.spec.js` — Playwright end-to-end tests
- `playwright.config.js` — test configuration (runs against local file)

## Key conventions

- **Single-file architecture**: Keep everything in `index.html`. Do not split into separate CSS/JS files unless explicitly asked.
- **No dependencies**: Vanilla JS, no npm, no build step. Just open the file in a browser.
- **Animations are pure CSS/JS**: Confetti, stars, and bounce effects use `@keyframes` and dynamically created DOM elements with `setTimeout` cleanup.

## Game features

- **Start screen** with level picker (1–8); choice is locked once the game starts
- **Random questions**: auto-generated multiplication and division, mixed by default
- **Progressive difficulty**: 8 levels scaling from 1×1 up to 99×50; levels up every 5 correct answers
- **Scoring**: +10 points per correct answer, streak tracking, +10 bonus every 10-streak
- **3-strike reveal**: after 3 wrong attempts on a question, "Show answer" button appears
- **Visual aids**: apple groups (small), apple grid (medium), interactive break-apart sub-problems (large)
- **Step-by-step workings**: toggleable long multiplication and division walkthroughs

## Git / GitHub

- Remote: `datajorgen-cloud/gabriels-game`
- Branch: `main`
- Hosted via GitHub Pages
