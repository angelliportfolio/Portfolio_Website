#!/usr/bin/env python3
"""Dev server for the portfolio.

Serves the site with caching disabled (so edits show up on reload) and accepts
POST /save from curate.html, which rewrites gallery-data.js in place.

    python3 serve.py        # then open http://localhost:8765
"""
import http.server, socketserver, json, io, os, shutil, datetime

PORT = 8765
ROOT = os.path.dirname(os.path.abspath(__file__))
CATS = ('campaigns', 'product', 'beauty', 'fashion')

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

    def do_POST(self):
        if self.path.rstrip('/') != '/save':
            self.send_error(404); return
        try:
            n = int(self.headers.get('Content-Length', 0))
            projects = json.loads(self.rfile.read(n).decode('utf-8'))
            if not isinstance(projects, list) or not projects:
                raise ValueError('no projects supplied')

            missing = []
            for p in projects:
                if not p.get('images'):
                    raise ValueError('project "%s" has no photos' % p.get('title'))
                for s in p['images']:
                    if not os.path.exists(os.path.join(ROOT, s)):
                        missing.append(s)
            if missing:
                raise ValueError('%d image path(s) not found, e.g. %s'
                                 % (len(missing), missing[0]))

            target = os.path.join(ROOT, 'gallery-data.js')
            stamp = datetime.datetime.now().strftime('%Y%m%d-%H%M%S')
            backup = os.path.join(ROOT, '.gallery-backups')
            os.makedirs(backup, exist_ok=True)
            if os.path.exists(target):
                shutil.copy2(target, os.path.join(backup, 'gallery-data.%s.js' % stamp))

            io.open(target, 'w', encoding='utf-8').write(render(projects))
            total = sum(len(p['images']) for p in projects)
            msg = 'Saved %d projects, %d photos.' % (len(projects), total)
            body = msg.encode()
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            print('[save]', msg, '(backup: %s)' % stamp)
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
