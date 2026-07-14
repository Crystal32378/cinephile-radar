"""Collect regional Chinese Wikipedia display-title candidates.

Run from the repository root. Results are research candidates, not verified
Taiwan release titles.
"""

import csv
import json
import os
import re
import time
import urllib.parse
import urllib.request


INPUT_PATH = "data-sources/antigravity-2026-07-07/early_title_verification_needed.csv"
SOURCE_TABLE_PATH = "data-sources/antigravity-2026-07-07/cinephile_awards_source_table.csv"
OUTPUT_PATH = "data-sources/antigravity-2026-07-14/wikipedia_title_variants.json"
VARIANTS = ("zh-tw", "zh-hk", "zh-cn")
HEADERS = {
    "User-Agent": "CinephileRadar/2.0 (https://github.com/Crystal32378/cinephile-radar)"
}


def get_variants_from_wiki(page_title):
    if not page_title:
        return {}

    results = {}
    page_name = page_title.replace("_", " ")
    for variant in VARIANTS:
        params = urllib.parse.urlencode(
            {
                "action": "parse",
                "page": page_name,
                "prop": "displaytitle",
                "variant": variant,
                "format": "json",
            }
        )
        request = urllib.request.Request(
            f"https://zh.wikipedia.org/w/api.php?{params}", headers=HEADERS
        )
        try:
            with urllib.request.urlopen(request) as response:
                payload = json.loads(response.read().decode("utf-8"))
            display_title = payload.get("parse", {}).get("displaytitle", "")
            results[variant] = re.sub(r"<[^>]+>", "", display_title).strip()
        except Exception:
            results[variant] = ""

    return results


def load_title_mapping():
    mapping = {}
    with open(SOURCE_TABLE_PATH, encoding="utf-8") as source_file:
        for row in csv.DictReader(source_file):
            source_url = row.get("title_source_url", "")
            zh_page = (
                urllib.parse.unquote(source_url.split("/wiki/")[-1])
                if "/wiki/" in source_url
                else ""
            )
            notes = row.get("notes", "")
            qid = (
                notes.split("Wikidata: ")[-1].split(";")[0]
                if "Wikidata: " in notes
                else ""
            )
            key = (row["festival"], row["award_year"], row["english_title"])
            mapping[key] = {"zh_page": zh_page, "qid": qid}
    return mapping


def save_progress(progress):
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as output_file:
        json.dump(progress, output_file, ensure_ascii=False, indent=2)


def main():
    with open(INPUT_PATH, encoding="utf-8") as input_file:
        movies = list(csv.DictReader(input_file))

    progress = {}
    if os.path.exists(OUTPUT_PATH):
        with open(OUTPUT_PATH, encoding="utf-8") as progress_file:
            progress = json.load(progress_file)

    title_mapping = load_title_mapping()
    for index, movie in enumerate(movies, start=1):
        title = movie["english_title"]
        key = f"{movie['festival']}_{movie['year']}_{title}"
        if key in progress:
            continue

        mapping_key = (movie["festival"], movie["year"], title)
        inherited = title_mapping.get(mapping_key, {})
        zh_page = inherited.get("zh_page") or movie.get("current_chinese_title", "")
        progress[key] = {
            "festival": movie["festival"],
            "year": movie["year"],
            "english_title": title,
            "existing_candidate": movie.get("current_chinese_title", ""),
            "zh_page": zh_page,
            "qid": inherited.get("qid", ""),
            "variants": get_variants_from_wiki(zh_page),
        }

        if index % 5 == 0:
            save_progress(progress)
        time.sleep(0.3)

    save_progress(progress)
    print(f"Completed {len(progress)} records: {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
