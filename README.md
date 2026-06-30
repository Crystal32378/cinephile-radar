# Cinephile Radar & Tracker

V0 demo for the Facebook group "奧斯卡坎城柏林威尼斯都可以".

Live demo:
https://majestic-toffee-9733c4.netlify.app/

## Current Status

- Prototype is live on Netlify Drop.
- Frontend is static HTML/CSS/JavaScript.
- Watch progress is stored locally in the browser with `localStorage`.
- Film data is incomplete and currently suitable for demo/testing only.
- Community response will be observed for 48 hours before expanding the data work.

## Files

- `index.html`: Main page structure.
- `style.css`: Visual design and responsive layout.
- `app.js`: Interaction logic, filters, roulette, progress tracking, share card.
- `data.js`: Static film data used by the demo.

## Data Notes

The long-term direction is to keep the frontend static, but generate `data.js`
from a reviewed source table instead of hand-editing it.

Potential future fields:

- `award`
- `award_year`
- `original_title`
- `english_title`
- `director`
- `country`
- `source_url`
- `tw_title_candidate`
- `confirmed_tw_title`
- `alt_titles`
- `review_status`
- `notes`

Chinese title handling should stay conservative. Early films may have multiple
traditional Chinese titles, festival titles, Hong Kong titles, or China titles.
The site should collect candidates first and only mark a Taiwanese title as
confirmed after review.

## 48-Hour Rule

Do not start a full 300-film data cleanup until the Facebook post has had enough
time to show whether people actually engage.

Possible signals to watch:

- People ask for a fuller list.
- People correct titles or years.
- People discuss Taiwanese translations.
- People share their progress cards.
- The moderator wants to keep or pin the project.

If response is light, keep this as a preserved demo rather than a full project.
