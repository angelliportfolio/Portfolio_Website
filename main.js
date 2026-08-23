document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     ACCORDION (top-level portfolio tabs)
     Tabs stay in place and the panel drops down beneath the one
     you clicked, then the page scrolls that tab up to the top.
     --------------------------------------------------------- */
  const items = document.querySelectorAll('.accordion-item');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Scrolls `target` to the top of the viewport, re-measuring every frame.
     The panels animate open/closed over ~0.8s, so the destination moves
     while we travel — recomputing each frame lands us in the right spot
     instead of somewhere the layout used to be. */
  let scrollRun = 0;   // bumped to cancel an in-flight animation

  function scrollToTop(target, duration) {
    const run = ++scrollRun;
    const from = window.scrollY;
    const dest = () => Math.max(0, target.getBoundingClientRect().top + window.scrollY);

    if (reduceMotion || duration === 0) {
      window.scrollTo(0, dest());
      return;
    }

    const t0 = performance.now();
    (function step(now) {
      if (run !== scrollRun) return;   // visitor took over, or a newer scroll started
      const p = Math.min(1, (now - t0) / duration);
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      window.scrollTo(0, from + (dest() - from) * eased);
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }

  // Any deliberate scroll input hands control straight back to the visitor.
  ['wheel', 'touchstart', 'keydown'].forEach(evt => {
    window.addEventListener(evt, () => { scrollRun++; }, { passive: true });
  });

  function setOpen(item, open) {
    item.classList.toggle('active', open);
    item.querySelector('.accordion-tab').setAttribute('aria-expanded', String(open));
  }

  function closeAll() {
    items.forEach(el => setOpen(el, false));
  }

  items.forEach(item => {
    item.querySelector('.accordion-tab').addEventListener('click', () => {
      const wasOpen = item.classList.contains('active');
      closeAll();

      if (wasOpen) {
        // Clicking an open tab folds it back up; return to the hero.
        scrollToTop(document.body, 700);
        return;
      }

      setOpen(item, true);
      if (location.hash !== '#' + item.id) history.replaceState(null, '', '#' + item.id);
      scrollToTop(item, 800);
    });
  });

  // Deep link: /#acc-commercial lands with that section already open.
  const deepLink = location.hash && document.querySelector(location.hash);
  if (deepLink && deepLink.classList.contains('accordion-item')) {
    setOpen(deepLink, true);
    requestAnimationFrame(() => scrollToTop(deepLink, 0));
  }

  /* ---------------------------------------------------------
     COMMERCIAL GALLERY (category sub-nav + rendering)
     --------------------------------------------------------- */
  const gallery = document.getElementById('commercialGallery');
  const contactPanel = document.getElementById('commercialContact');
  const navLinks = document.querySelectorAll('.cm-nav-link');

  // Tracks the images currently on screen, for the lightbox.
  let currentSet = [];

  const PROJECTS = (typeof COMMERCIAL_PROJECTS !== 'undefined' && COMMERCIAL_PROJECTS) || [];

  // Normalize a config entry (string OR object) into a uniform shape.
  function normalize(entry, project) {
    const fallback = project.title + ' — ' + project.category + ' photography by Angelli Nguyen';
    if (typeof entry === 'string') return { src: entry, alt: fallback };
    return { src: entry.src, alt: entry.alt || fallback };
  }

  const pad = n => String(n).padStart(2, '0');

  /* Builds one project tile. Only the cover image is in the DOM up front —
     the rest of the set is injected the first time you hover, so a page of
     thumbnails costs one request each instead of the whole archive. */
  function buildTile(project) {
    const shots = (project.images || []).map(e => normalize(e, project));
    if (!shots.length) return null;

    const tile = document.createElement('figure');
    tile.className = 'cm-project';

    // Don't repeat the client under a title that already is the client name.
    const client = (project.client || '').trim();
    const sameAsTitle = client.toLowerCase() === (project.title || '').trim().toLowerCase();
    const meta = [sameAsTitle ? '' : client, project.year].filter(Boolean).join(' · ');
    tile.innerHTML = `
      <div class="cm-stack">
        <img class="is-shown" loading="lazy" decoding="async" src="${shots[0].src}" alt="${shots[0].alt}">
        <span class="cm-count">01 / ${pad(shots.length)}</span>
      </div>
      <figcaption class="cm-caption">
        <span class="cm-title">${project.title}</span>
        <span class="cm-meta">${meta}</span>
      </figcaption>`;

    const stack = tile.querySelector('.cm-stack');
    const count = tile.querySelector('.cm-count');
    let timer = null;
    let idx = 0;
    let built = false;

    function show(i) {
      const layers = stack.querySelectorAll('img');
      idx = (i + layers.length) % layers.length;
      layers.forEach((l, n) => l.classList.toggle('is-shown', n === idx));
      count.textContent = pad(idx + 1) + ' / ' + pad(layers.length);
    }

    tile.addEventListener('mouseenter', () => {
      if (shots.length < 2) return;
      if (!built) {
        built = true;
        shots.slice(1).forEach(s => {
          const img = document.createElement('img');
          img.loading = 'lazy';
          img.decoding = 'async';
          img.src = s.src;
          img.alt = s.alt;
          stack.insertBefore(img, count);
        });
      }
      show(idx + 1);
      timer = setInterval(() => show(idx + 1), 800);
    });

    tile.addEventListener('mouseleave', () => {
      clearInterval(timer);
      timer = null;
      show(0);
    });

    tile.addEventListener('click', () => {
      currentSet = shots;
      openLightbox(idx);
    });

    return tile;
  }

  function renderCategory(cat) {
    // Toggle contact vs gallery panels
    if (cat === 'contact') {
      gallery.hidden = true;
      contactPanel.hidden = false;
      return;
    }
    contactPanel.hidden = true;
    gallery.hidden = false;

    // Each category gets its own grid structure — see the layout-* blocks in style.css.
    gallery.className = 'commercial-gallery layout-' + cat;

    // HOME is the curated reel: only projects marked `featured: true`.
    // Until any are marked, it falls back to showing everything.
    let list;
    if (cat === 'home') {
      const picked = PROJECTS.filter(p => p.featured);
      list = picked.length ? picked : PROJECTS;
    } else {
      list = PROJECTS.filter(p => p.category === cat);
    }

    gallery.innerHTML = '';

    if (!list.length) return;   // nothing added to this category yet

    const frag = document.createDocumentFragment();
    list.forEach(p => {
      const tile = buildTile(p);
      if (tile) frag.appendChild(tile);
    });
    gallery.appendChild(frag);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      renderCategory(link.dataset.cat);
    });
  });

  // Initial render — Home (best works).
  renderCategory('home');

  /* ---------------------------------------------------------
     LIGHTBOX
     --------------------------------------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const lbCounter = document.getElementById('lbCounter');
  let lbIndex = 0;

  function showLb(i) {
    if (!currentSet.length) return;
    lbIndex = (i + currentSet.length) % currentSet.length;
    const item = currentSet[lbIndex];
    lbImage.src = item.src;
    lbImage.alt = item.alt;
    lbCounter.textContent = (lbIndex + 1) + ' / ' + currentSet.length;
  }

  function openLightbox(i) {
    showLb(i);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lbImage.src = '';
    document.body.style.overflow = '';
  }

  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', () => showLb(lbIndex - 1));
  document.getElementById('lbNext').addEventListener('click', () => showLb(lbIndex + 1));

  // Click backdrop (but not the image) to close.
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox || e.target.classList.contains('lb-stage')) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
    if (e.key === 'ArrowRight') showLb(lbIndex + 1);
  });

  // Touch swipe on the lightbox.
  let touchX = null;
  lightbox.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showLb(dx > 0 ? lbIndex - 1 : lbIndex + 1);
    touchX = null;
  }, { passive: true });

  /* ---------------------------------------------------------
     INQUIRY FORMS (commercial + general)
     Both forms behave identically: post to Formspree if an endpoint is
     configured, otherwise fall back to a pre-filled mailto.
     --------------------------------------------------------- */
  const toEmail = (typeof CONTACT_EMAIL !== 'undefined' && CONTACT_EMAIL) || '';

  document.querySelectorAll('.contact-email-link').forEach(link => {
    if (link.getAttribute('href') === '#' && toEmail) link.href = 'mailto:' + toEmail;
  });

  // Field label → what to call it in the email body, in the order it reads.
  const FIELD_LABELS = {
    name: 'Name',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone',
    company: 'Brand / Company',
    project: 'Project type',
    dates: 'Shoot dates',
    budget: 'Budget range',
    usage: 'Usage',
    service: 'Service type',
    subject: 'How can I help',
    date: 'Preferred date',
  };

  function wireForm(formId, statusId, subjectPrefix) {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);
    if (!form || !status) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const endpoint = (typeof FORMSPREE_ENDPOINT !== 'undefined' && FORMSPREE_ENDPOINT) || '';

      // Preferred path: Formspree (collects submissions in a dashboard).
      if (endpoint) {
        status.textContent = 'Sending…';
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form),
          });
          if (!res.ok) throw new Error('Bad response');
          form.reset();
          status.textContent = 'Thank you — your inquiry is on its way.';
        } catch (err) {
          status.textContent = 'Something went wrong. Please email ' + toEmail + ' directly.';
        }
        return;
      }

      // Fallback: open the visitor's email client, pre-filled. Zero backend.
      const lines = Object.keys(FIELD_LABELS)
        .filter(key => data[key])
        .map(key => FIELD_LABELS[key] + ': ' + data[key]);

      const who = data.company || data.name ||
        [data.firstName, data.lastName].filter(Boolean).join(' ');
      const subject = encodeURIComponent(subjectPrefix + ' — ' + who);
      const body = encodeURIComponent(lines.join('\n') + '\n\n' + (data.message || ''));
      window.location.href = 'mailto:' + toEmail + '?subject=' + subject + '&body=' + body;
      status.textContent = 'Opening your email app…';
    });
  }

  wireForm('commercialForm', 'commercialFormStatus', 'Commercial inquiry');
  wireForm('generalForm', 'generalFormStatus', 'Inquiry');
});
