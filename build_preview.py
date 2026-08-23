#!/usr/bin/env python3
"""Pack the portfolio into one self-contained page.

A hosted artifact page can't reach any external host, so every photo has to be
embedded as a data URI, and the whole page must land under 16 MB. Covers get
the quality budget because they're what a visitor actually looks at; the hover
frames get less, and each project is capped. Quality steps down automatically
until the page fits.
"""
from PIL import Image
import io, json, base64, os, subprocess, sys
import imgtools

ROOT = os.path.dirname(os.path.abspath(__file__))
LIMIT = 15.0 * 1024 * 1024          # leave headroom under the 16 MB ceiling

raw = subprocess.check_output(['node', '-e', '''
const fs=require("fs"),vm=require("vm");const ctx={};vm.createContext(ctx);
vm.runInContext(fs.readFileSync("gallery-data.js","utf8")+"\\n;this.P=COMMERCIAL_PROJECTS;",ctx);
console.log(JSON.stringify(ctx.P));''']).decode()
PROJECTS = json.loads(raw)


def encode(path, px, q):
    im = imgtools.load_srgb(path)
    im.thumbnail((px, px), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, 'JPEG', quality=q, optimize=True, progressive=True)
    return buf.getvalue()


def build(cover_px, cover_q, frame_px, frame_q, cap):
    total, out = 0, []
    for p in PROJECTS:
        imgs = p['images'][:cap]
        enc = []
        for i, src in enumerate(imgs):
            b = encode(src, cover_px, cover_q) if i == 0 else encode(src, frame_px, frame_q)
            total += len(b) * 4 / 3            # base64 inflation
            enc.append(base64.b64encode(b).decode())
        out.append({'title': p['title'], 'client': p.get('client', ''),
                    'category': p['category'], 'featured': bool(p.get('featured')),
                    'images': enc})
    return out, total


SETTINGS = [
    (1280, 74, 900, 55, 8),
    (1200, 70, 860, 50, 7),
    (1120, 66, 800, 46, 6),
    (1040, 62, 760, 42, 5),
    (960,  58, 700, 38, 4),
]
for cpx, cq, fpx, fq, cap in SETTINGS:
    data, total = build(cpx, cq, fpx, fq, cap)
    n = sum(len(p['images']) for p in data)
    print('cover %dpx/q%d  frame %dpx/q%d  cap %d  ->  %d photos, %.1f MB'
          % (cpx, cq, fpx, fq, cap, n, total / 1048576))
    if total < LIMIT:
        json.dump(data, open('/tmp/preview_data.json', 'w'))
        print('\nFITS — using this setting. %d photos across %d projects.' % (n, len(data)))
        sys.exit(0)
print('\nstill over budget at the lowest setting')
sys.exit(1)
