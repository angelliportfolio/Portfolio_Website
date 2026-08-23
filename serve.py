#!/usr/bin/env python3
"""Dev server for the portfolio.

Serves the site with caching disabled (so edits show up on reload) and accepts
POST /save from curate.html, which rewrites gallery-data.js in place.

    python3 serve.py        # then open http://localhost:8765
"""
import http.server, socketserver, json, io, os, shutil, datetime
import imgtools, scanner, glob, re

PORT = 8765
ROOT = os.path.dirname(os.path.abspath(__file__))
CATS = ('campaigns', 'product', 'beauty', 'fashion')
IMG_EXT = ('.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp')
DRIVE = '/Volumes/Samsung_T7_4TB'
DRIVE_BASES = [DRIVE, os.path.join(DRIVE, 'Angelli Social', 'content')]

HEADER = '''/* ============================================================
   ANGELLI PRODUCTIONS — Commercial Work
   ------------------------------------------------------------
   EDIT THIS BY HAND, OR USE THE CURATION TOOL:
       http://localhost:8765/curate.html
   The tool writes straight back to this file.

   ONE SHOOT = ONE PROJECT = ONE THUMBNAIL. Hovering a thumbnail
   cycles through that shoot; clicking opens it in the lightbox.

     title    — shown under the thumbnail
     client   — brand, e.g. "Charlotte Tilbury" (optional)
     year     — e.g. "2025" (optional)
     category — "campaigns" | "product" | "beauty" | "fashion"
     images   — array of paths. THE FIRST ONE IS THE COVER.
     featured — add `featured: true` to put a project on SELECTED.
   ============================================================ */

const COMMERCIAL_PROJECTS = [

'''

TAIL = '''];

/* Where every inquiry goes — both the commercial form and the general one. */
const CONTACT_EMAIL = "inquiries@angelliproductions.com";

/* OPTIONAL — Formspree endpoint for the contact form.
   Leave as-is and the form falls back to opening the visitor's
   email app addressed to you (works with zero setup).
   To collect submissions in a dashboard instead, create a free
   form at https://formspree.io and paste its endpoint here. */
const FORMSPREE_ENDPOINT = ""; // e.g. "https://formspree.io/f/abcdwxyz"
'''


def esc(s):
    return str(s or '').replace('\\', '\\\\').replace('"', '\\"')


def render(projects):
    rank = {c: i for i, c in enumerate(CATS)}
    projects.sort(key=lambda p: (rank.get(p.get('category'), 9),
                                 0 if p.get('featured') else 1,
                                 p.get('title', '')))
    out = []
    for p in projects:
        fe = '    featured: true,\n' if p.get('featured') else ''
        imgs = "\n".join('      "%s",' % esc(s) for s in p['images'])
        out.append('  {\n    title: "%s",\n%s    client: "%s",\n    year: "%s",\n'
                   '    category: "%s",\n    images: [\n%s\n    ],\n  },\n'
                   % (esc(p.get('title')), fe, esc(p.get('client')),
                      esc(p.get('year')), esc(p.get('category')), imgs))
    return HEADER + "\n".join(out) + TAIL


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        if self.path.split('?')[0].rstrip('/') == '/folders':
            try:
                man = json.load(io.open(os.path.join(ROOT, 'curate-manifest.json'),
                                        encoding='utf-8'))
                used = {os.path.normpath(ph['src']).rsplit('/content/', 1)[-1].split('/')[0]
                        for p in man for ph in p['photos'][:1]}
                found = scanner.shoots(DRIVE_BASES)
                for f in found:
                    f['already'] = f['name'] in used
                body = json.dumps(found).encode()
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Cache-Control', 'no-store')
                self.send_header('Content-Length', str(len(body)))
                self.end_headers()
                self.wfile.write(body)
            except Exception as e:
                self.send_error(500, str(e))
            return
        return super().do_GET()

    def _add_project(self, req):
        """Thumbnail a chosen source folder and append it to the manifest."""
        src_dir = req.get('path')
        title   = (req.get('title') or '').strip()
        cat     = req.get('category') or 'beauty'
        if not src_dir or not os.path.isdir(src_dir):
            raise ValueError('folder not found: %s' % src_dir)
        if not title:
            raise ValueError('give the project a title')

        slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-') or 'project'
        man_path = os.path.join(ROOT, 'curate-manifest.json')
        man = json.load(io.open(man_path, encoding='utf-8'))
        if any(p['slug'] == slug for p in man):
            raise ValueError('a project called "%s" already exists' % title)

        files = sorted(f for f in glob.glob(os.path.join(src_dir, '*'))
                       if f.lower().endswith(IMG_EXT))
        if not files:
            raise ValueError('no images directly in that folder')
        files = files[:400]

        os.makedirs(os.path.join(ROOT, 'images/_thumbs', slug), exist_ok=True)
        photos = []
        for i, src in enumerate(files, 1):
            name  = '%s-%03d.jpg' % (slug, i)
            thumb = 'images/_thumbs/%s/%s' % (slug, name)
            full  = os.path.join(ROOT, thumb)
            if not os.path.exists(full):
                try:
                    imgtools.save_thumb(src, full)
                except Exception:
                    continue
            photos.append({'src': src, 'thumb': thumb,
                           'ai': os.path.basename(src).startswith(('hf_', 'Gemini_Generated')),
                           'web': 'images/commercial/%s/%s' % (slug, name)})
        if not photos:
            raise ValueError('could not read any images in that folder')

        man.append({'slug': slug, 'title': title, 'client': req.get('client', ''),
                    'category': cat, 'photos': photos})
        io.open(man_path, 'w', encoding='utf-8').write(json.dumps(man, indent=1))
        return 'Added "%s" with %d photos. Reload to pick from it.' % (title, len(photos))

    def do_POST(self):
        if self.path.rstrip('/') == '/add-project':
            try:
                n = int(self.headers.get('Content-Length', 0))
                msg = self._add_project(json.loads(self.rfile.read(n).decode('utf-8')))
                body = msg.encode(); code = 200
                print('[add]', msg)
            except Exception as e:
                body = str(e).encode(); code = 400
                print('[add] FAILED:', e)
            self.send_response(code)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        if self.path.rstrip('/') != '/save':
            self.send_error(404); return
        try:
            n = int(self.headers.get('Content-Length', 0))
            payload = json.loads(self.rfile.read(n).decode('utf-8'))
            if not isinstance(payload, list):
                raise ValueError('bad payload')

            live = [p for p in payload if p.get('images')]
            if not live:
                raise ValueError('nothing chosen — pick at least one photo')

            # Build the full-size web copy for any chosen photo that lacks one.
            built, missing = 0, []
            for p in live:
                for im in p['images']:
                    web = os.path.join(ROOT, im['web'])
                    if os.path.exists(web):
                        continue
                    src = im['src']
                    if not os.path.exists(src):
                        missing.append(os.path.basename(src)); continue
                    os.makedirs(os.path.dirname(web), exist_ok=True)
                    try:
                        # Converts through the embedded profile to sRGB — wide-gamut
                        # files render yellow in a browser otherwise.
                        imgtools.save_web(src, web)
                        built += 1
                    except Exception:
                        missing.append(os.path.basename(src))
            if missing:
                raise ValueError('could not build %d image(s) — is the drive connected? '
                                 'first: %s' % (len(missing), missing[0]))

            projects = [{'title': p.get('title'), 'client': p.get('client'),
                         'year': p.get('year'), 'category': p.get('category'),
                         'featured': p.get('featured'),
                         'images': [im['web'] for im in p['images']]}
                        for p in live]

            target = os.path.join(ROOT, 'gallery-data.js')
            stamp = datetime.datetime.now().strftime('%Y%m%d-%H%M%S')
            backup = os.path.join(ROOT, '.gallery-backups')
            os.makedirs(backup, exist_ok=True)
            if os.path.exists(target):
                shutil.copy2(target, os.path.join(backup, 'gallery-data.%s.js' % stamp))

            io.open(target, 'w', encoding='utf-8').write(render(projects))

            # Remember the picker's own state (selection + order) for next open.
            state = [{'slug': p.get('slug'), 'title': p.get('title'),
                      'client': p.get('client'), 'year': p.get('year'),
                      'category': p.get('category'), 'featured': p.get('featured'),
                      'chosen': p.get('chosen', [])} for p in payload]
            io.open(os.path.join(ROOT, 'curate-state.json'), 'w',
                    encoding='utf-8').write(json.dumps(state, indent=1))

            total = sum(len(p['images']) for p in projects)
            msg = 'Saved %d projects, %d photos%s.' % (
                len(projects), total, ' (%d newly built)' % built if built else '')
            body = msg.encode()
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            print('[save]', msg)
        except Exception as e:
            body = str(e).encode()
            self.send_response(400)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            print('[save] FAILED:', e)


if __name__ == '__main__':
    os.chdir(ROOT)
    socketserver.TCPServer.allow_reuse_address = True
    print('Serving %s on http://localhost:%d  (curate: /curate.html)' % (ROOT, PORT))
    socketserver.TCPServer(('', PORT), Handler).serve_forever()
