#!/bin/bash
# Download L Magazine articles from the Wayback Machine
# Run this overnight: bash scripts/download-lmag-archive.sh
#
# This will:
# 1. Read the article URL index
# 2. Look up the best Wayback snapshot for each URL
# 3. Download the HTML
# 4. Save to research/lmag-archive/raw/
#
# Estimated time: 8-12 hours at ~2 requests/sec (to avoid rate limiting)
# Estimated size: ~2-4 GB of raw HTML

set -e

INDEX_FILE="research/lmag-complete-index.txt"
OUTPUT_DIR="research/lmag-archive/raw"
PROGRESS_FILE="research/lmag-archive/progress.txt"
ERRORS_FILE="research/lmag-archive/errors.txt"

mkdir -p "$OUTPUT_DIR"
touch "$PROGRESS_FILE"
touch "$ERRORS_FILE"

TOTAL=$(wc -l < "$INDEX_FILE" | tr -d ' ')
echo "=== L Magazine Archive Download ==="
echo "Total articles to download: $TOTAL"
echo "Output directory: $OUTPUT_DIR"
echo "Starting at: $(date)"
echo ""

COUNTER=0
SKIPPED=0
DOWNLOADED=0
FAILED=0

while IFS= read -r url; do
    COUNTER=$((COUNTER + 1))

    # Create a safe filename from the URL
    FILENAME=$(echo "$url" | sed 's|https\?://||' | sed 's|[^a-zA-Z0-9]|_|g' | head -c 200)
    OUTFILE="$OUTPUT_DIR/${FILENAME}.html"

    # Skip if already downloaded
    if [ -f "$OUTFILE" ] && [ -s "$OUTFILE" ]; then
        SKIPPED=$((SKIPPED + 1))
        continue
    fi

    # Skip if already marked as error
    if grep -qF "$url" "$ERRORS_FILE" 2>/dev/null; then
        SKIPPED=$((SKIPPED + 1))
        continue
    fi

    # Progress update every 100 articles
    if [ $((COUNTER % 100)) -eq 0 ]; then
        echo "[$COUNTER/$TOTAL] Downloaded: $DOWNLOADED | Skipped: $SKIPPED | Failed: $FAILED | $(date +%H:%M:%S)"
    fi

    # Fetch from Wayback Machine
    WAYBACK_URL="https://web.archive.org/web/2id_/${url}"

    HTTP_CODE=$(curl -sL -w "%{http_code}" -o "$OUTFILE" --max-time 30 "$WAYBACK_URL" 2>/dev/null)

    if [ "$HTTP_CODE" = "200" ] && [ -s "$OUTFILE" ]; then
        DOWNLOADED=$((DOWNLOADED + 1))
        echo "$url" >> "$PROGRESS_FILE"
    else
        FAILED=$((FAILED + 1))
        echo "$url" >> "$ERRORS_FILE"
        rm -f "$OUTFILE"
    fi

    # Rate limit: ~2 requests per second
    sleep 0.5

done < "$INDEX_FILE"

echo ""
echo "=== Download Complete ==="
echo "Total: $TOTAL"
echo "Downloaded: $DOWNLOADED"
echo "Skipped: $SKIPPED"
echo "Failed: $FAILED"
echo "Finished at: $(date)"
echo ""
echo "Next step: run 'python3 scripts/parse-lmag-archive.py' to extract article content"
