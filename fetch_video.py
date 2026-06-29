import urllib.request, re, json

req = urllib.request.Request(
    'https://pixabay.com/videos/search/ocean%20waves/',
    headers={'User-Agent': 'Mozilla/5.0'}
)
html = urllib.request.urlopen(req).read().decode('utf-8')
matches = re.findall(r'https://cdn\.pixabay\.com/video/[^\"]*\.mp4', html)
print(matches[0] if matches else "No matches found")
