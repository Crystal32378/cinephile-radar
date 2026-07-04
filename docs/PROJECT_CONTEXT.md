# Project Context

## Project

影迷觀影雷達 / Cinephile Radar is a static demo site for tracking award-winning films from Oscar, Cannes, Venice, and Berlin.

## Current Custody

- New local project home: `/Users/crystalchang/Documents/影迷觀影雷達/cinephile-radar/`
- Previous local backup: `/Users/crystalchang/Documents/三體遊戲/cinephile-radar/`
- GitHub repo: `https://github.com/Crystal32378/cinephile-radar`
- Current public Netlify demo: `https://majestic-toffee-9733c4.netlify.app/`

The previous Three Body folder is kept as a backup and should not be deleted during the move.

## Provenance

- Antigravity shaped the original website and is expected to help generate future data drafts when credits recover.
- Z Code adjusted the interface.
- Codex / Alfred is responsible for custody, GitHub hygiene, documentation, data workflow, and validation.

## Current Technical Shape

- Static HTML/CSS/JavaScript site.
- No backend, login, database, or shared editing system.
- Watch progress is stored in each visitor's browser through `localStorage`.
- Movie data is split into `data-parts/part-01.js` through `data-parts/part-06.js`.
- `data.js` is only the loader that merges the six parts into `window.MOVIE_DATA`.
- The current merged dataset should contain 402 movie records.

## Operating Principle

Keep this project lightweight until community interest proves the work should expand. The next data work should focus on title verification quality, especially early-film Traditional Chinese titles, rather than building a collaboration system too early.
