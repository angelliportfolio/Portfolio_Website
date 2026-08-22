#!/usr/bin/env python3
"""Build the picker manifest + thumbnails for every final photo.

Every shoot folder in the content library becomes a project in the picker,
whether or not it's currently on the site — a project with no photos chosen
simply doesn't appear. That's how you add a new project: pick photos from a
folder that has none yet.

Thumbnails are gitignored; full-size web copies are built on save.
"""
import glob, json, os, sys
import imgtools

V     = '/Volumes/Samsung_T7_4TB'
C     = V + '/Angelli Social/content'
ROOT  = os.path.dirname(os.path.abspath(__file__))
THUMB = os.path.join(ROOT, 'images/_thumbs')
IMG   = ('.jpg', '.jpeg', '.png', '.tif', '.tiff')

# Nicer titles + categories for folders we've already placed.
KNOWN = {
 'charlotte_tilbury_campaign': ('charlotte-tilbury','Charlotte Tilbury','Charlotte Tilbury','campaigns'),
 'tessi':            ('tessi','Tessi','Tessi','campaigns'),
 'leona_vanessa':    ('summer-fridays','Summer Fridays','Summer Fridays','campaigns'),
 'alessandra_kiara': ('tatcha','Tatcha','Tatcha','campaigns'),
 'don_kaka':         ('don-kaka','Don Kaka','Don Kaka','fashion'),
 'product':          ('product','Product','','product'),
 'nail_shoot':       ('nail-editorial','Nail Editorial','','beauty'),
 'acacia_mcbride':   ('acacia','Acacia','','beauty'),
 'courtney_jones':   ('courtney','Courtney','','beauty'),
 'alicia_skincare':  ('alicia','Alicia','','beauty'),
 'lucas_skincare':   ('lucas','Lucas','','beauty'),
 'chase_vanderpol':  ('chase','Chase','','beauty'),
 'cameron_jones':    ('cameron','Cameron','','beauty'),
 'destiny':          ('destiny','Destiny','','beauty'),
 'chloe_helina':     ('chloe','Chloe','','beauty'),
 'tabatha':          ('tabatha','Tabatha','','beauty'),
 'nicole_o_models':  ('o-models','O Models','','beauty'),
 'jordan':           ('jordan','Jordan','','fashion'),
 'hope_elizabeth':   ('hope','Hope','','fashion'),
 'isabel_cameron':   ('isabel','Isabel','','fashion'),
 'serena_morizio':   ('serena','Serena','','fashion'),
 'ally_kendricks':   ('ally','Ally','','fashion'),
}
# Folders folded into another project rather than standing alone.
MERGE = {'liliana_o_models': 'nicole_o_models'}
# Extra sources beyond the content folder.
EXTRA = {'don_kaka': [V + '/26.06.09_Don_Kaka_Campaign/05. EXPORTS/HIGH RES/JPEG/*']}

def is_ai(name):
    """Generator output, not photography — surfaced but flagged and off by default."""
    return name.startswith('hf_') or name.startswith('Gemini_Generated')

def gather(globs):
    seen, out = set(), []
    for g in globs:
        for f in sorted(glob.glob(g, recursive=True)):
            if not f.lower().endswith(IMG): continue
            b = os.path.basename(f)
            key = (b.lower(), os.path.getsize(f))
            if key in seen: continue
            seen.add(key); out.append(f)
    return out

folders = sorted(d for d in os.listdir(C) if os.path.isdir(os.path.join(C, d)))
manifest = []
for folder in folders:
    if folder in MERGE: continue
    slug, title, client, cat = KNOWN.get(
        folder, (folder.replace('_', '-'), folder.replace('_', ' ').title(), '', 'beauty'))
    globs = [os.path.join(C, folder, '**', '*')]
    globs += [os.path.join(C, m, '**', '*') for m, t in MERGE.items() if t == folder]
    globs += EXTRA.get(folder, [])
    files = gather(globs)
    if not files: continue

    os.makedirs(os.path.join(THUMB, slug), exist_ok=True)
    photos = []
    for i, src in enumerate(files, 1):
        name  = '%s-%03d.jpg' % (slug, i)
        thumb = 'images/_thumbs/%s/%s' % (slug, name)
        full  = os.path.join(ROOT, thumb)
        if not os.path.exists(full):
            try:
                imgtools.save_thumb(src, full)
            except Exception as e:
                print('skip', os.path.basename(src), e); continue
        photos.append({'src': src, 'thumb': thumb, 'ai': is_ai(os.path.basename(src)),
                       'web': 'images/commercial/%s/%s' % (slug, name)})
    ai = sum(1 for p in photos if p['ai'])
    manifest.append({'slug': slug, 'title': title, 'client': client,
                     'category': cat, 'photos': photos})
    print('%-20s %4d photos%s' % (slug, len(photos), '  (%d AI-flagged)' % ai if ai else ''))

json.dump(manifest, open(os.path.join(ROOT, 'curate-manifest.json'), 'w'), indent=1)
print('\nprojects:', len(manifest), ' photos:', sum(len(p['photos']) for p in manifest))
