# Antigravity Handoff Prompt

You are continuing a title localization POC for cinephile-radar, a static web app tracking award-winning films for a Facebook group.

Source of truth:
- Existing movie list in data-parts/part-*.js and data.js — do not regenerate or modify these files.
- Your job is to add localization verification fields only.

Current POC scope:
- Oscar Best Picture, most recent 10 winners (ceremonies 89th–98th).
- 9 rows evidenced, 1 pending (One Battle After Another, TBD).
- See attached A table and CSV for current state.

Your task:
1. Read the A table / CSV provided. Do not re-research titles already marked high.
2. For rows marked medium or low, fill source gaps using the Evidence / Source Policy (Section 3).
3. For TBD rows (OBAAN), attempt one source per region, max 2 retries per region, then mark gap and stop.
4. Update confidence and needs_human_review per the rules in Sections 4–5.
5. Output updated A table + CSV only. Do not write files unless explicitly approved.

Constraints:
- Do not modify app.js, index.html, style.css, data.js, or data-parts.
- Do not commit or push.
- Do not expand scope beyond Oscar Best Picture recent 10 years.
- Do not build a scraper.
- Run a small pilot batch first (1–2 rows) before full sweep.
- Frontend should show TW/HK/CN title comparison only — never expose confidence, review_status, or source gaps to users.

Language: Chinese (Traditional). Taiwan/HK titles in Traditional; Mainland titles in Simplified.
