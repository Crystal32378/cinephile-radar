# Cinephile Radar & Tracker

影迷觀影雷達與追蹤器。

一個給影迷用的靜態網頁小工具，用來追蹤奧斯卡、坎城、威尼斯、柏林四大影展／獎項得獎片單的觀影進度，也可以隨機推薦「今晚看什麼」。

V0 demo for the Facebook group 「奧斯卡坎城柏林威尼斯都可以」.

## Live Demo

GitHub Pages:

```text
https://crystal32378.github.io/cinephile-radar/
```

Earlier Netlify Drop demo:

```text
https://majestic-toffee-9733c4.netlify.app/
```

## Current Status

- Prototype is live on GitHub Pages.
- Frontend is static HTML/CSS/JavaScript.
- Watch progress is stored locally in the browser with `localStorage`.
- The current dataset already includes 300+ films.
- The film list was initially collected with help from Antigravity.
- Traditional Chinese title handling is still under review.
- ZCode is being used to help prepare a Taiwan / Hong Kong / China title verification checklist.
- Current status: usable V0 demo, not yet a final reference database.

## Files

- `index.html`: Main page structure.
- `style.css`: Visual design and responsive layout.
- `app.js`: Interaction logic, filters, roulette, progress tracking, share card.
- `data.js`: Static film data used by the demo.

## What It Does

- Tracks viewing progress across major award/festival lists.
- Stores progress locally in the browser.
- Provides filtering and discovery flows.
- Includes a roulette-style recommendation feature for choosing what to watch next.
- Generates shareable progress cards.

## Data Notes

The current dataset is substantial enough for demo use, with 300+ film entries already collected. However, it should not yet be treated as a final reference database.

The long-term direction is to keep the frontend static, but generate `data.js` from a reviewed source table instead of hand-editing it.

Potential future fields:

- `award`
- `award_year`
- `original_title`
- `english_title`
- `director`
- `country`
- `source_url`
- `tw_title_candidate`
- `hk_title_candidate`
- `cn_title_candidate`
- `confirmed_tw_title`
- `alt_titles`
- `review_status`
- `notes`

Chinese title handling should stay conservative. Early films may have multiple Traditional Chinese titles, festival titles, Hong Kong titles, China titles, restored-release titles, or streaming-platform titles.

The site should collect candidates first and only mark a Taiwanese title as confirmed after review.

## Title Verification Plan

The next data step is to create a title verification checklist covering:

- Taiwan title candidate
- Hong Kong title candidate
- China title candidate
- original title
- English title
- award / festival source
- year
- source URL
- review status
- notes

The goal is not to force one universal Chinese title. The goal is to preserve title variants, identify Taiwan-appropriate display titles, and avoid overwriting culturally specific release histories.

## 48-Hour Rule

The original V0 rule was to observe community response before expanding the data work.

Possible signals to watch:

- People ask for a fuller list.
- People correct titles or years.
- People discuss Taiwanese translations.
- People share their progress cards.
- The moderator wants to keep or pin the project.

Since the project now has 300+ film entries, the next constraint is no longer whether a fuller list exists. The constraint is review quality: title verification, source consistency, and conservative handling of regional Chinese names.

## Deployment

This project is a static frontend and can be deployed to:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- any static hosting service

Current deployment:

```text
https://crystal32378.github.io/cinephile-radar/
```

## Project Status

Prototype / static web toy with a substantial draft film dataset and an active title-verification plan.
