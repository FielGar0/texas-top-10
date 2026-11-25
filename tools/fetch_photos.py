"""Find a freely licensed photo for every city and place, and write data/photos.js.

Usage:
    python -I tools/fetch_photos.py

For each city and place, finds the matching English Wikipedia article (tools/photo_overrides.json pins
an article or a specific Commons file when search picks the wrong one), takes the article's lead image
(free licenses only), and reads the author and license from Wikimedia Commons. Images are not
downloaded: the site shows Wikimedia's own thumbnails, with credit.
"""
import html
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = "TexasTop10-photo-credits/0.1 (static travel guide; contact via project repository)"
WIDTH = 960  # a standard Wikimedia thumbnail width


def api(host, **params):
    """One API call, paced to stay well inside Wikimedia's rate limits, with backoff on 429."""
    params.update(format="json", formatversion="2", maxlag="5")
    url = f"https://{host}/w/api.php?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for attempt in range(6):
        time.sleep(1.0)
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r)
        except Exception:
            time.sleep(10 * (attempt + 1))
    raise RuntimeError("request failed: " + url)


def chunks(seq, n):
    for i in range(0, len(seq), n):
        yield seq[i : i + n]


def load_cities():
    src = open(os.path.join(ROOT, "data", "cities.js"), encoding="utf-8").read()
    # Pull out slugs, city names and place names without executing the file.
    cities = []
    for block in re.split(r"\n  \{\n", src)[1:]:
        slug = re.search(r'slug: "([^"]+)"', block).group(1)
        name = re.search(r'\n    name: "([^"]+)"', block).group(1)
        places = re.findall(r'\{ name: "((?:[^"\\]|\\.)*)"', block)
        cities.append({"slug": slug, "name": name, "places": [p.replace('\\"', '"') for p in places]})
    return cities


def find_article(query):
    d = api("en.wikipedia.org", action="query", list="search", srsearch=query, srlimit=1)
    hits = d["query"]["search"]
    return hits[0]["title"] if hits else None


def lead_images(titles):
    """Map article title -> lead image filename (free licenses only), 50 titles per request."""
    result = {}
    for batch in chunks(sorted(set(titles)), 50):
        d = api("en.wikipedia.org", action="query", titles="|".join(batch), prop="pageimages",
                piprop="name", pilicense="free", redirects=1)
        q = d["query"]
        alias = {}
        for n in q.get("normalized", []) + q.get("redirects", []):
            alias[n["to"]] = alias.get(n["from"], n["from"])
        for page in q["pages"]:
            if page.get("pageimage"):
                t = page["title"]
                result[t] = page["pageimage"]
                # Also index under the title we asked for, through normalization and redirects.
                src = t
                while src in alias:
                    src = alias[src]
                    result[src] = page["pageimage"]
    return result


def strip(s):
    s = re.sub(r"<[^>]+>", "", s or "")
    return re.sub(r"\s+", " ", html.unescape(s)).strip()


def commons_infos(filenames):
    """Map filename -> photo info for files on Commons with a free license, 50 per request."""
    result = {}
    for batch in chunks(sorted(set(filenames)), 50):
        d = api("commons.wikimedia.org", action="query", titles="|".join("File:" + f for f in batch),
                prop="imageinfo", iiprop="url|extmetadata|size", iiurlwidth=WIDTH)
        for page in d["query"]["pages"]:
            if page.get("missing") or "imageinfo" not in page:
                continue  # not on Commons (e.g. a local non-free file): skip
            ii = page["imageinfo"][0]
            meta = ii.get("extmetadata", {})
            lic = strip(meta.get("LicenseShortName", {}).get("value"))
            if not lic or "fair use" in lic.lower() or "non-free" in lic.lower():
                continue
            artist = strip(meta.get("Artist", {}).get("value")) or "Unknown author"
            if len(artist) > 80:
                artist = artist[:77] + "…"
            name = page["title"].split(":", 1)[1].replace(" ", "_")
            result[name] = {
                "src": ii.get("thumburl") or ii["url"],
                "w": ii.get("thumbwidth") or ii["width"],
                "h": ii.get("thumbheight") or ii["height"],
                "credit": artist,
                "license": lic,
                "licenseUrl": meta.get("LicenseUrl", {}).get("value", ""),
                "page": ii["descriptionurl"],
            }
    return result


def main():
    overrides_path = os.path.join(ROOT, "tools", "photo_overrides.json")
    overrides = json.load(open(overrides_path, encoding="utf-8")) if os.path.exists(overrides_path) else {}
    cache_path = os.path.join(ROOT, "tools", ".article_cache.json")
    cache = json.load(open(cache_path, encoding="utf-8")) if os.path.exists(cache_path) else {}

    # 1. Decide the article (or pinned file) for every city and place.
    rows = []  # (slug, key, article, pinned_file)
    for c in load_cities():
        items = [("city", f"{c['name']}, Texas", None)] + [(p, None, f"{p} {c['name']} Texas") for p in c["places"]]
        for key, title, query in items:
            ov = overrides.get(f"{c['slug']}/{key}", {})
            if ov.get("skip"):
                continue
            title = ov.get("article") or title
            if not title and not ov.get("file"):
                # Searching costs one request per place; only do it when asked (--search).
                if query not in cache and "--search" not in sys.argv:
                    continue
                if query not in cache:
                    cache[query] = find_article(query)
                    json.dump(cache, open(cache_path, "w", encoding="utf-8"), indent=1)
                title = cache[query]
            rows.append((c["slug"], key, title, ov.get("file")))

    # 2. Lead images for those articles, then 3. license and credit from Commons.
    leads = lead_images([t for _, _, t, f in rows if t and not f])
    files = {}
    for slug, key, title, pinned in rows:
        files[(slug, key)] = pinned or leads.get(title)
    infos = commons_infos([f.replace(" ", "_") for f in files.values() if f])

    out, report = {}, []
    for slug, key, title, _ in rows:
        entry = out.setdefault(slug, {"city": None, "places": {}})
        f = files[(slug, key)]
        info = infos.get(f.replace(" ", "_")) if f else None
        if info:
            info = dict(info, alt=key if key != "city" else slug)
            if key == "city":
                entry["city"] = info
            else:
                entry["places"][key] = info
        report.append((slug, key, title, f if info else "NO PHOTO"))

    with open(os.path.join(ROOT, "data", "photos.js"), "w", encoding="utf-8", newline="\n") as f:
        f.write("// Generated by tools/fetch_photos.py. Photos are from Wikimedia Commons under the licenses listed.\n")
        f.write("window.PHOTOS = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n")
    for row in report:
        print(" | ".join(str(x) for x in row))


if __name__ == "__main__":
    main()
