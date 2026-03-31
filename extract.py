import re

all_urls = set()
files_dir = "/Users/fastdanny/.claude/projects/-Users-fastdanny-Claude-northside/10bd8bfb-e490-4dff-bf5d-8c93530665d3/tool-results/"
files = ["bfom7yia6.txt","b7ij5x9fo.txt","b20sozned.txt","bq3f8qy55.txt","b6c2zgb7j.txt","bgebhpy16.txt","bda4m1do7.txt","b1ae6bxz8.txt"]

for fname in files:
    with open(files_dir + fname, "r", errors="ignore") as f:
        content = f.read()

    # All squarespace-cdn URLs
    urls = re.findall(r'https://images\.squarespace-cdn\.com/[^\s"\'\\,\)><]+', content)
    for u in urls:
        u = u.rstrip(";")
        base = re.sub(r'\?format=\d+w$', '', u)
        all_urls.add(base)

    # data-src
    data_srcs = re.findall(r'data-src="(http[^"]+)"', content)
    for u in data_srcs:
        base = re.sub(r'\?format=\d+w$', '', u)
        all_urls.add(base)

    # data-image
    data_imgs = re.findall(r'data-image="(http[^"]+)"', content)
    for u in data_imgs:
        base = re.sub(r'\?format=\d+w$', '', u)
        all_urls.add(base)

    # background-image url()
    bg_imgs = re.findall(r'background-image:\s*url\(["\']?(https?://[^"\')\s]+)', content)
    for u in bg_imgs:
        base = re.sub(r'\?format=\d+w$', '', u)
        all_urls.add(base)

    # JSON encoded image URLs with \u002F
    json_urls = re.findall(r'https://images\.squarespace-cdn\.com(?:\\u002F[^\s"\\,\)><]+)+', content)
    for u in json_urls:
        u = u.replace('\\u002F', '/')
        base = re.sub(r'\?format=\d+w$', '', u)
        all_urls.add(base)

    # img src that are NOT squarespace
    img_srcs = re.findall(r'<img[^>]+src="(http[^"]+)"', content)
    for u in img_srcs:
        if "squarespace" not in u:
            all_urls.add(u)

for u in sorted(all_urls):
    print(u)

print(f"\nTOTAL: {len(all_urls)}")
