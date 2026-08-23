"""Find shoot folders on the drive and work out where their finals live.

Shoot folders are messy — PROOFS, DESELECTS, raw catalogues and half a dozen
retouch revisions of the same frame. This ranks the subfolders so the picker
can suggest the one that actually holds finished images, while still showing
the alternatives so the choice stays yours.
"""
import os

IMG = ('.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp')

# Folder names that are usually the delivered work, best first.
GOOD = ('final_photos', 'final photos', 'final', 'exports', 'high res', 'highres',
        'jpeg', 'selects', 'delivered', 'web')
# Folder names that are working files, not finals.
BAD  = ('deselect', 'proof', 'raw', 'capture one', 'cocatalog', 'lightroom',
        'photoshop', 'revision', 'psd', 'tiff', 'scan', 'low res',
        'export presets', 'cache', 'preview')
# AI / generative retouch tools — output is not photography, so never suggest it.
AI_TOOLS = ('higgsfield', 'faceapp', 'evoto', 'remini', 'topaz', 'midjourney',
            'gemini', 'firefly', 'generative')


def _score(rel):
    low = rel.lower()
    s = 0
    for i, g in enumerate(GOOD):
        if g in low:
            s += 100 - i * 4
    for b in BAD:
        if b in low:
            s -= 60
    for b in AI_TOOLS:
        if b in low:
            s -= 400          # push generator output to the very bottom
    s -= low.count(os.sep) * 3          # prefer shallower folders
    return s


def subfolders_with_images(root, limit=400):
    """Every subfolder holding images, with a count and a suitability score."""
    found = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if not d.startswith('.')]
        imgs = [f for f in filenames
                if f.lower().endswith(IMG) and not f.startswith('.')]
        if not imgs:
            continue
        rel = os.path.relpath(dirpath, root)
        rel = '' if rel == '.' else rel
        found.append({'rel': rel, 'path': dirpath, 'count': len(imgs),
                      'score': _score(rel)})
        if len(found) > limit:
            break
    found.sort(key=lambda f: (-f['score'], -f['count']))
    return found


def shoots(bases):
    """Candidate shoots: each top-level folder under any of `bases`."""
    out = []
    for base in bases:
        if not os.path.isdir(base):
            continue
        for name in sorted(os.listdir(base)):
            if name.startswith('.') or name.startswith('$'):
                continue
            path = os.path.join(base, name)
            if not os.path.isdir(path):
                continue
            subs = subfolders_with_images(path)
            total = sum(s['count'] for s in subs)
            if not total:
                continue
            out.append({
                'name': name,
                'path': path,
                'base': base,
                'total': total,
                'options': [{'rel': s['rel'] or '(top level)', 'path': s['path'],
                             'count': s['count'],
                             'ai': any(t in s['rel'].lower() for t in AI_TOOLS)}
                            for s in subs[:8]],
            })
    return out
