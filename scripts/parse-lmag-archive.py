#!/usr/bin/env python3
"""
Parse downloaded L Magazine HTML files into structured JSON.
Run after download-lmag-archive.sh completes.

Usage: python3 scripts/parse-lmag-archive.py
"""

import os
import re
import json
import html
from pathlib import Path

RAW_DIR = Path("research/lmag-archive/raw")
OUTPUT_FILE = Path("research/lmag-archive/articles.json")
STATS_FILE = Path("research/lmag-archive/stats.json")

def extract_article(filepath):
    """Extract title, date, author, and body text from an L Magazine HTML file."""
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception:
        return None

    if len(content) < 500:
        return None

    article = {}

    # Extract title from <title> tag or <h1>
    title_match = re.search(r'<title[^>]*>(.*?)</title>', content, re.DOTALL | re.IGNORECASE)
    if title_match:
        title = title_match.group(1).strip()
        # Clean up common suffixes
        title = re.sub(r'\s*[-–|]\s*(The L Magazine|L Magazine|thelmagazine\.com).*$', '', title, flags=re.IGNORECASE)
        title = html.unescape(title).strip()
        article['title'] = title
    else:
        return None

    # Extract date from URL or meta tags
    date_match = re.search(r'/(\d{4})/(\d{2})/', filepath.name)
    if date_match:
        article['year'] = date_match.group(1)
        article['month'] = date_match.group(2)
    else:
        # Try meta tags
        date_meta = re.search(r'<meta[^>]*property=["\']article:published_time["\'][^>]*content=["\']([^"\']+)', content, re.IGNORECASE)
        if date_meta:
            article['date'] = date_meta.group(1)[:10]
            article['year'] = article['date'][:4]
            article['month'] = article['date'][5:7]
        else:
            date_meta2 = re.search(r'"datePublished"\s*:\s*"([^"]+)"', content)
            if date_meta2:
                article['date'] = date_meta2.group(1)[:10]
                article['year'] = article['date'][:4]
                article['month'] = article['date'][5:7]

    # Extract author
    author_match = re.search(r'<meta[^>]*name=["\']author["\'][^>]*content=["\']([^"\']+)', content, re.IGNORECASE)
    if author_match:
        article['author'] = html.unescape(author_match.group(1).strip())
    else:
        author_match2 = re.search(r'class=["\'][^"\']*author[^"\']*["\'][^>]*>([^<]+)', content, re.IGNORECASE)
        if author_match2:
            article['author'] = html.unescape(author_match2.group(1).strip())

    # Extract body text
    # Try to find the main content area
    body = content

    # Remove scripts, styles, nav, footer, sidebar
    body = re.sub(r'<script[^>]*>.*?</script>', '', body, flags=re.DOTALL | re.IGNORECASE)
    body = re.sub(r'<style[^>]*>.*?</style>', '', body, flags=re.DOTALL | re.IGNORECASE)
    body = re.sub(r'<nav[^>]*>.*?</nav>', '', body, flags=re.DOTALL | re.IGNORECASE)
    body = re.sub(r'<footer[^>]*>.*?</footer>', '', body, flags=re.DOTALL | re.IGNORECASE)
    body = re.sub(r'<aside[^>]*>.*?</aside>', '', body, flags=re.DOTALL | re.IGNORECASE)
    body = re.sub(r'<header[^>]*>.*?</header>', '', body, flags=re.DOTALL | re.IGNORECASE)

    # Try to find article/entry content div
    article_match = re.search(r'<(?:article|div)[^>]*class=["\'][^"\']*(?:entry-content|post-content|article-body|single-content)[^"\']*["\'][^>]*>(.*?)</(?:article|div)>', body, re.DOTALL | re.IGNORECASE)
    if article_match:
        body = article_match.group(1)

    # Strip remaining HTML tags
    body = re.sub(r'<[^>]+>', ' ', body)
    body = re.sub(r'\s+', ' ', body)
    body = html.unescape(body).strip()

    # Only keep articles with meaningful content
    if len(body) < 100:
        return None

    # Truncate very long bodies (some pages have tons of sidebar/comment text)
    article['body'] = body[:10000]
    article['body_length'] = len(body)

    # Extract URL slug for reference
    slug = filepath.stem
    article['slug'] = slug
    article['file'] = filepath.name

    return article


def main():
    if not RAW_DIR.exists():
        print(f"Error: {RAW_DIR} does not exist. Run download-lmag-archive.sh first.")
        return

    html_files = sorted(RAW_DIR.glob("*.html"))
    print(f"Found {len(html_files)} HTML files to parse")

    articles = []
    skipped = 0

    for i, filepath in enumerate(html_files):
        if (i + 1) % 500 == 0:
            print(f"  Parsed {i + 1}/{len(html_files)}...")

        article = extract_article(filepath)
        if article and article.get('title'):
            articles.append(article)
        else:
            skipped += 1

    # Sort by year/month
    articles.sort(key=lambda a: (a.get('year', ''), a.get('month', ''), a.get('title', '')))

    # Save articles
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(articles, f, indent=2, ensure_ascii=False)

    # Generate stats
    years = {}
    authors = {}
    for a in articles:
        y = a.get('year', 'unknown')
        years[y] = years.get(y, 0) + 1
        auth = a.get('author', 'unknown')
        authors[auth] = authors.get(auth, 0) + 1

    top_authors = sorted(authors.items(), key=lambda x: -x[1])[:30]

    stats = {
        'total_articles': len(articles),
        'skipped': skipped,
        'by_year': dict(sorted(years.items())),
        'top_authors': dict(top_authors)
    }

    with open(STATS_FILE, 'w') as f:
        json.dump(stats, f, indent=2)

    print(f"\n=== Parse Complete ===")
    print(f"Total articles: {len(articles)}")
    print(f"Skipped: {skipped}")
    print(f"\nBy year:")
    for y, c in sorted(years.items()):
        print(f"  {y}: {c}")
    print(f"\nTop authors:")
    for auth, c in top_authors[:10]:
        print(f"  {auth}: {c}")
    print(f"\nSaved to: {OUTPUT_FILE}")
    print(f"Stats saved to: {STATS_FILE}")


if __name__ == '__main__':
    main()
