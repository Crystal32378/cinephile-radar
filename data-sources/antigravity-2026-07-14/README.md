# Antigravity Wikipedia Title Variant Pass - 2026-07-14

This folder preserves the first automated pass over the 96 early-film title
verification records collected on 2026-07-07.

## Contents

- `wikipedia_title_variants.json`: regional Chinese display-title candidates
  returned by Chinese Wikipedia for all 96 records.
- `fetch_wikipedia_title_variants.py`: the reusable collection script.

## Result Summary

- Records processed: 96 / 96
- Oscar: 16
- Cannes: 29
- Venice: 32
- Berlin: 19
- Records with at least one `zh-tw`, `zh-hk`, or `zh-cn` candidate: 35
- Records with no regional display-title candidate: 61
- Records missing a Wikidata ID in the inherited source mapping: 9
- Records missing a Chinese Wikipedia page title: 11

## Interpretation

These values are candidate labels from Chinese Wikipedia's regional language
conversion. They are not proof of a historical Taiwan release title and must
not be treated as verified titles by themselves.

The next research pass should use Taiwan-focused primary or institutional
sources, such as film archives, historical newspaper advertisements, library
catalogues, festival programmes, distributors, broadcasters, or documented
home-video releases. Conflicting Taiwan, Hong Kong, and China titles should
remain in separate fields.

## Custody Rules

- Do not overwrite `data.js` or `data-parts/` from this folder.
- Do not mark a title as confirmed using Wikipedia or Wikidata alone.
- Preserve unresolved records as `pending`.
- Continue source verification from this result instead of rerunning the same
  96-record Wikipedia pass.

