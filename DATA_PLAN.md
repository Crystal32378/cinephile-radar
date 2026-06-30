# Data Plan

## Principle

Code should do the repetitive collection work. Humans should only review,
correct, vote, or decide disputed titles.

## Near-Term Scope

Wait 48 hours after the first Facebook post before starting full data expansion.
Until then, keep the current demo intact and preserve the project files.

## Suggested Pipeline

1. Fetch structured winner data for one award first.
2. Normalize it into CSV or Google Sheets-ready rows.
3. Collect Chinese title candidates, but do not treat them as confirmed.
4. Review only the ambiguous or important rows.
5. Generate `data.js` from the reviewed table.

## Human Review Fields

- `confirmed_tw_title`
- `alt_titles`
- `review_status`
- `review_note`
- `reviewer`
- `source_url`

## Review Status Values

- `pending`
- `confirmed`
- `disputed`
- `needs_source`

## First Proof of Concept

Start with a small slice only:

- Oscar Best Picture, recent 10 years

This is enough to test whether the pipeline works without turning the prototype
into a large maintenance project too early.
