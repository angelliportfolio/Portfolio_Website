#!/usr/bin/env python3
"""Seed the picker with a sensible default selection.

The picker offers every final photo; this picks a defensible starting set per
project so the site is populated the moment the tool opens. All of it is
overridable in curate.html — this only decides what's ticked to begin with.
"""
from PIL import Image, ImageOps
import json, io, os, subprocess

ROOT = os.path.dirname(os.path.abspath(__file__))
man = json.load(open(os.path.join(ROOT, 'curate-manifest.json')))

def ahash(p, s=10):
    try:
        im = ImageOps.exif_transpose(Image.open(p)).convert('L').resize((s, s))
    except Exception:
        return None
    px = list(im.getdata()); avg = sum(px) / len(px)
    return sum(1 << i for i, v in enumerate(px) if v > avg)

# Rules learned from reviewing the frames.
SKIP_FIRST = {'serena': 35, 'acacia': 2}      # behind-the-scenes / polaroid tests
ONLY       = {'tatcha': [4,5,6,7,8,14,15,16,26,27]}  # frames with the jar in shot
CAP        = {'charlotte-tilbury':16,'tessi':18,'summer-fridays':14,'don-kaka':14,
              'product':13,'nail-editorial':16,'jordan':14,'tabatha':14,
              'o-models':12,'serena':12}
DEFAULT_CAP = 12
FEATURED = {'don-kaka','charlotte-tilbury','tessi','tatcha','summer-fridays',
            'product','nail-editorial','acacia','courtney','chloe'}
# Covers chosen by eye: 1-based position within that project's chosen list.
COVER = {'charlotte-tilbury':7, 'summer-fridays':5, 'tessi':18, 'tabatha':3}

state = []
for p in man:
    photos = p['photos']
    idxs = list(range(len(photos)))
    if p['slug'] in ONLY:
        idxs = [i for i in ONLY[p['slug']] if i < len(photos)]
    else:
        idxs = idxs[SKIP_FIRST.get(p['slug'], 0):]

    kept, hashes = [], []
    for i in idxs:
        h = ahash(os.path.join(ROOT, photos[i]['thumb']))
        if h is None: continue
        if any(bin(h ^ k).count('1') <= 6 for k in hashes): continue
        hashes.append(h); kept.append(i)

    cap = CAP.get(p['slug'], DEFAULT_CAP)
    if len(kept) > cap:
        step = len(kept) / cap
        kept = [kept[int(i * step)] for i in range(cap)]

    c = COVER.get(p['slug'])
    if c and c <= len(kept):
        kept.insert(0, kept.pop(c - 1))

    state.append({'slug': p['slug'], 'title': p['title'], 'client': p['client'],
                  'year': '', 'category': p['category'],
                  'featured': p['slug'] in FEATURED, 'chosen': kept})
    print('%-20s %3d available -> %2d chosen' % (p['slug'], len(photos), len(kept)))

io.open(os.path.join(ROOT, 'curate-state.json'), 'w', encoding='utf-8').write(
    json.dumps(state, indent=1))
print('\nseeded', sum(len(s['chosen']) for s in state), 'photos across', len(state), 'projects')
