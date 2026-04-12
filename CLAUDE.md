# Gabriel's Math Game

A single-file HTML/CSS/JS math game for kids — no build tools, no frameworks.

## Project structure

- `index.html` — the entire app (HTML + CSS + JS in one file)
- `tests/game.spec.js` — Playwright end-to-end tests
- `playwright.config.js` — test configuration (runs against local file)

## Key conventions

- **Single-file architecture**: Keep everything in `index.html`. Do not split into separate CSS/JS files unless explicitly asked.
- **No dependencies**: Vanilla JS, no npm, no build step. Just open the file in a browser.
- **No dev server needed**: Open `index.html` directly in a browser (`file://` protocol). Do not create `.claude/launch.json` or start HTTP servers — everything works as a local file.
- **Animations are pure CSS/JS**: Confetti, stars, and bounce effects use `@keyframes` and dynamically created DOM elements with `setTimeout` cleanup.

## Game features

- **Start screen** with level picker (1–12); choice is locked once the game starts
- **Random questions**: auto-generated multiplication and division, mixed by default
- **Progressive difficulty**: 12 levels scaling from 1×1 up to 9999×999; levels up every 5 correct answers
- **Scoring**: +10 points per correct answer, streak tracking, +10 bonus every 10-streak
- **3-strike reveal**: after 3 wrong attempts on a question, "Show answer" button appears
- **Visual aids**: apple groups (small), apple grid (medium), interactive break-apart sub-problems (large)
- **Interactive column multiplication**: digit-by-digit input with carry reveals and row celebrations (large numbers)
- **Interactive bus-stop long division**: digit-by-digit quotient entry with carry/remainder superscripts, working steps, and a multiples reference table (levels 1–8, dividend >= 100)
- **Step-by-step workings**: toggleable long multiplication and division walkthroughs
- **Multi-language**: English and Swedish

## Git / GitHub

- Remote: `datajorgen-cloud/gabriels-game`
- Branch: `main`
- Hosted via GitHub Pages
