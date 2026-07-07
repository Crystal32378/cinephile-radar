# Antigravity Data Intake - 2026-07-07

This folder preserves Antigravity's first-pass data collection for Cinephile Radar.

## Files

- `cinephile_awards_source_table.csv`: first-pass source table for Oscar Best Picture, Cannes top prize, Venice top prize, and Berlin top prize winners.
- `early_title_verification_needed.csv`: early-film Traditional Chinese title verification queue.
- `DATA_GAPS_REPORT.md`: Antigravity's summary of data completeness, missing title candidates, and metadata gaps.

## Work Completed

Antigravity completed the first large-scale collection and cleanup pass. This was not only a proposal or research note; it produced concrete source files for later review.

Confirmed work includes:

- Collected raw English winner data for the four award families, around 402 raw records before cleanup.
- Checked festival distribution across Oscar, Cannes, Venice, and Berlin.
- Handled complex early-award cases, including Cannes 1939 / 1946 tied winners, Venice Mussolini Cup records, Venice 1946-1949 early top-prize records, and early Berlin winners.
- Tested Wikidata API access, sitelinks, claims, and `zh`, `zh-tw`, `zh-hk`, and `zh-cn` labels.
- Produced three core outputs: `cinephile_awards_source_table.csv`, `early_title_verification_needed.csv`, and `DATA_GAPS_REPORT.md`.

## Intake Status

- Source table rows: 378
- Early title verification rows: 96
- Confirmed title rows reported by Antigravity: 238
- `needs_source` rows reported by Antigravity: 30
- `pending` rows reported by Antigravity: 110

## Custody Notes

These files are preserved as source material only.

Do not directly overwrite `data.js` or `data-parts/` from these files. The current site loader still expects 402 movie records. Antigravity's table is a cleaned source layer that filters and reframes parts of the raw 402-record scrape, especially Venice lifetime-achievement and early-award records.

The next step is review, not publication:

1. Compare this source table against the current `data-parts` dataset.
2. Validate early Traditional Chinese title candidates.
3. Resolve award-scope differences before generating new public data parts.
4. Keep disputed or low-confidence titles in the verification queue.
