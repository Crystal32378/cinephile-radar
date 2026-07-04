# Data Pipeline

## Goal

Keep the frontend simple while making the film dataset easier to verify, regenerate, and review.

## Current Data Layout

- `data-parts/part-01.js`
- `data-parts/part-02.js`
- `data-parts/part-03.js`
- `data-parts/part-04.js`
- `data-parts/part-05.js`
- `data-parts/part-06.js`
- `data.js`

Each part appends rows to `window.MOVIE_DATA_PARTS`. The loader flattens those parts into `window.MOVIE_DATA`.

Expected current total: 402 records.

## Recommended Workflow

1. Generate or update a source table outside the app.
2. Preserve fields for award, year, original title, English title, director, country, source URL, title candidates, review status, and notes.
3. Mark Chinese titles as candidates until verified.
4. Produce a review list for uncertain rows before changing public-facing titles.
5. Regenerate the six data parts from reviewed data.
6. Validate the merged count and the app workflow before committing.

## Title Verification Fields

- `tw_title_candidate`
- `confirmed_tw_title`
- `alt_titles`
- `review_status`
- `review_note`
- `source_url`
- `reviewer`

Suggested `review_status` values:

- `pending`
- `confirmed`
- `disputed`
- `needs_source`

## Next Data Task

Produce an early-film Traditional Chinese title verification list. Start with older records where translation confidence is lower, especially films before 1970 or rows with generic, missing, disputed, or non-Taiwan title candidates.

The output should be a review table, not an automatic overwrite.
