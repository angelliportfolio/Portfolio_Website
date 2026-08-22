#!/usr/bin/env python3
"""Build the picker manifest + small thumbnails for every final photo.

Thumbs are only used by curate.html and are gitignored. The full-size web
copies under images/commercial/ are generated on save, for chosen photos only,
so the repo only ever carries what's actually on the site.
"""
from PIL import Image, ImageOps
import glob, json, os

V    = '/Volumes/Samsung_T7_4TB'
C    = V + '/Angelli Social/content'
ROOT = os.path.dirname(os.path.abspath(__file__))
THUMB_DIR = os.path.join(ROOT, 'images/_thumbs')

# slug -> (title, client, category, [source globs])
PROJECTS = [
 ('don-kaka','Don Kaka','Don Kaka','fashion',
   [V+'/26.06.09_Don_Kaka_Campaign/05. EXPORTS/HIGH RES/JPEG/*']),
 ('charlotte-tilbury','Charlotte Tilbury','Charlotte Tilbury','campaigns',[C+'/charlotte_tilbury_campaign/**/*']),
 ('tessi','Tessi','Tessi','campaigns',[C+'/tessi/**/*']),
 ('summer-fridays','Summer Fridays','Summer Fridays','campaigns',[C+'/leona_vanessa/**/*']),
 ('tatcha','Tatcha','Tatcha','campaigns',[C+'/alessandra_kiara/**/*']),
 ('product','Product','','product',[C+'/product/*']),
 ('nail-editorial','Nail Editorial','','beauty',[C+'/nail_shoot/**/*']),
 ('acacia','Acacia','','beauty',[C+'/acacia_mcbride/**/*']),
 ('courtney','Courtney','','beauty',[C+'/courtney_jones/**/*']),
 ('alicia','Alicia','','beauty',[C+'/alicia_skincare/**/*']),
 ('lucas','Lucas','','beauty',[C+'/lucas_skincare/**/*']),
 ('chase','Chase','','beauty',[C+'/chase_vanderpol/**/*']),
 ('cameron','Cameron','','beauty',[C+'/cameron_jones/**/*']),
 ('destiny','Destiny','','beauty',[C+'/destiny/**/*']),
 ('chloe','Chloe','','beauty',[C+'/chloe_helina/**/*']),
 ('tabatha','Tabatha','','beauty',[C+'/tabatha/**/*']),
 ('o-models','O Models','','beauty',[C+'/nicole_o_models/**/*', C+'/liliana_o_models/**/*']),
 ('jordan','Jordan','','fashion',[C+'/jordan/**/*']),
 ('hope','Hope','','fashion',[C+'/hope_elizabeth/**/*']),
 ('isabel','Isabel','','fashion',[C+'/isabel_cameron/**/*']),
 ('serena','Serena','','fashion',[C+'/serena_morizio/**/*']),
]

IMG = ('.jpg', '.jpeg', '.png', '.tif', '.tiff')
# AI-generated output found in the product folder — never offer it as a photo.
BAD_PREFIX = ('hf_', 'Gemini_Generated')

def sources(globs):
    seen, out = set(), []
    for g in globs:
        for f in sorted(glob.glob(g, recursive=True)):
            if not f.lower().endswith(IMG): continue
            b = os.path.basename(f)
            if b.startswith(BAD_PREFIX): continue
            key = (b.lower(), os.path.getsize(f))     # drop cross-folder duplicates
            if key in seen: continue
            seen.add(key); out.append(f)
    return out

manifest = []
for slug, title, client, cat, globs in PROJECTS:
    files = sources(globs)
    if not files:
        print('!! no files for', slug); continue
    os.makedirs(os.path.join(THUMB_DIR, slug), exist_ok=True)
    photos = []
    for i, src in enumerate(files, 1):
        name = '%s-%03d.jpg' % (slug, i)
        thumb = 'images/_thumbs/%s/%s' % (slug, name)
        full  = os.path.join(ROOT, thumb)
        if not os.path.exists(full):
            try:
                im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
                im.thumbnail((520, 520))
                im.save(full, 'JPEG', quality=68)
            except Exception as e:
                print('skip', src, e); continue
        photos.append({'src': src, 'thumb': thumb,
                       'web': 'images/commercial/%s/%s' % (slug, name)})
    manifest.append({'slug': slug, 'title': title, 'client': client,
                     'category': cat, 'photos': photos})
    print('%-20s %4d photos' % (slug, len(photos)))

json.dump(manifest, open(os.path.join(ROOT, 'curate-manifest.json'), 'w'), indent=1)
print('\ntotal photos:', sum(len(p['photos']) for p in manifest))
