# Gabriel's Math Game

A single-file HTML/CSS/JS math game for kids — no build tools, no frameworks.

## Project structure

- `index.html` — the entire app (HTML + CSS + JS in one file)

## Key conventions

- **Single-file architecture**: Keep everything in `index.html`. Do not split into separate CSS/JS files unless explicitly asked.
- **No dependencies**: Vanilla JS, no npm, no build step. Just open the file in a browser.
- **Animations are pure CSS/JS**: Confetti, stars, and bounce effects use `@keyframes` and dynamically created DOM elements with `setTimeout` cleanup.

## Game features

- Multiplication and division modes with configurable number ranges
- Answer input with validation and celebration effects (confetti, stars, bounce)
- "I give up" reveal button as fallback
- `answered` state flag prevents celebration spam and post-reveal cheating

## Git / GitHub

- Remote: `datajorgen-cloud/gabriels-game`
- Branch: `main`
