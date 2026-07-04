# Agent Handoff

## Status

The project has been moved into its own local project home:

`/Users/crystalchang/Documents/影迷觀影雷達/cinephile-radar/`

The old Three Body location remains as backup:

`/Users/crystalchang/Documents/三體遊戲/cinephile-radar/`

Do not delete the old folder unless the user explicitly asks for cleanup.

## Known External Locations

- GitHub: `https://github.com/Crystal32378/cinephile-radar`
- Netlify demo: `https://majestic-toffee-9733c4.netlify.app/`

## Roles

- Antigravity: data collection and first-pass dataset generation.
- Z Code: interface tuning and visual adjustments.
- Codex / Alfred: custody, repo discipline, documentation, data pipeline design, and validation.

## Before Editing

1. Confirm you are working in `/Users/crystalchang/Documents/影迷觀影雷達/cinephile-radar/`.
2. Check Git status before changing files.
3. Preserve the static-site shape unless the user explicitly expands scope.
4. Do not introduce backend, login, accounts, or a shared editor without a fresh user decision.

## Validation Checklist

After any change, verify:

- `index.html` loads locally.
- `data-parts/part-01.js` through `data-parts/part-06.js` exist.
- `data.js` remains the loader.
- `window.MOVIE_DATA` merges to 402 records unless the task intentionally changes data.
- Search, filters, tabs, watched toggles, roulette, and share card still work.

## Current Product Direction

The first useful follow-up is not a community editing system. The first useful follow-up is a clear list of early films whose Traditional Chinese titles need verification.
