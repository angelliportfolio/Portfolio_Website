/* ==========================================================
   ANGELLI PRODUCTIONS — main.js
   Tab navigation · Lightbox · Collection modal · Forms
   ========================================================== */

'use strict';

/* ----------------------------------------------------------
   STATE
   ---------------------------------------------------------- */
let currentSection = 'hero';   // 'hero' | 'commercial' | 'weddings' | 'contact'
let currentPanel   = 'hero';   // active panel ID (without 'panel-' prefix)

/* Lightbox state */
let lbItems   = [];     // NodeList of .masonry-item elements in current gallery
let lbIndex   = 0;      // current index within lbItems

/* ----------------------------------------------------------
   PANEL MAP — which section owns which panel
   ---------------------------------------------------------- */
const panelSectionMap = {
  'fashion':            'commercial',
  'beauty':             'commercial',
  'directing':          'commercial',
  'commercial-contact': 'commercial',
  'weddings-home':      'weddings',
  'about':              'weddings',
  'weddings':           'weddings',
  'couples':            'weddings',
  'portraits':          'weddings',
  'inquire':            'weddings',
  'contact':            'contact',
  'hero':               'hero',
};

/* ----------------------------------------------------------
   NAVIGATION — switchToSection
   Called when a primary tab is clicked, or CTA buttons on hero
   ---------------------------------------------------------- */
function switchToSection(section, defaultPanel) {
  currentSection = section;
  const panel = defaultPanel || getDefaultPanel(section);
  activatePrimaryTab(section);
  activateSubnav(section);
  showPanel(panel);
}

/* ----------------------------------------------------------
   NAVIGATION — switchToPanel
   Called when a secondary tab, footer link, or in-page button is clicked
   ---------------------------------------------------------- */
function switchToPanel(panelId) {
  const section = panelSectionMap[panelId] || currentSection;

  if (section !== currentSection) {
    currentSection = section;
    activatePrimaryTab(section);
    activateSubnav(section);
  }

  showPanel(panelId);
}

/* ----------------------------------------------------------
   NAVIGATION — goHero
   Logo click returns to hero
   ---------------------------------------------------------- */
function goHero() {
  currentSection = 'hero';
  activatePrimaryTab(null);
  hideSubnav();
  showPanel('hero');
}

/* ----------------------------------------------------------
   CORE — showPanel
   ---------------------------------------------------------- */
function showPanel(panelId) {
  /* Hide every panel */
  document.querySelectorAll('.panel').forEach(function(p) {
    p.classList.remove('active');
  });

  /* Show target */
  const target = document.getElementById('panel-' + panelId);
  if (target) {
    target.classList.add('active');
  }

  currentPanel = panelId;

  /* Sync secondary tab active state */
  document.querySelectorAll('.secondary-tab-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.panel === panelId);
    btn.setAttribute('aria-selected', btn.dataset.panel === panelId ? 'true' : 'false');
  });

  /* Update URL hash for deep-linking */
  if (history.pushState) {
    history.pushState(null, '', '#' + panelId);
  } else {
    window.location.hash = panelId;
  }

  /* Scroll to top */
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/* ----------------------------------------------------------
   HELPERS
   ---------------------------------------------------------- */
function activatePrimaryTab(section) {
  document.querySelectorAll('.primary-tab-btn').forEach(function(btn) {
    const isActive = btn.dataset.section === section;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
}

function activateSubnav(section) {
  const nav = document.getElementById('secondary-nav');
  nav.classList.add('visible');

  /* Show only the matching subnav tab group */
  document.querySelectorAll('.secondary-tabs').forEach(function(ul) {
    ul.classList.remove('active-subnav');
  });

  const target = document.getElementById('subnav-' + section);
  if (target) {
    target.classList.add('active-subnav');
  } else {
    /* 'contact' has no subnav — hide it */
    nav.classList.remove('visible');
  }
}

function hideSubnav() {
  document.getElementById('secondary-nav').classList.remove('visible');
  document.querySelectorAll('.secondary-tabs').forEach(function(ul) {
    ul.classList.remove('active-subnav');
  });
}

function getDefaultPanel(section) {
  const defaults = {
    commercial: 'fashion',
    weddings:   'weddings-home',
    contact:    'contact',
    hero:       'hero',
  };
  return defaults[section] || 'hero';
}

/* ----------------------------------------------------------
   PRIMARY NAV — click handlers
   ---------------------------------------------------------- */
document.querySelectorAll('.primary-tab-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    switchToSection(btn.dataset.section, btn.dataset.defaultPanel);
  });
});

/* Secondary nav — click handlers */
document.querySelectorAll('.secondary-tab-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    switchToPanel(btn.dataset.panel);
  });
});

/* ----------------------------------------------------------
   MOBILE MENU
   ---------------------------------------------------------- */
var hamburger   = document.getElementById('hamburger');
var mobileMenu  = document.getElementById('mobile-menu');
var mobileClose = document.getElementById('mobile-close');

hamburger.addEventListener('click', function() {
  mobileMenu.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
});

mobileClose.addEventListener('click', closeMobileMenu);

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function handleMobileNav(section, panel) {
  closeMobileMenu();
  switchToSection(section, panel);
}

/* ----------------------------------------------------------
   SCROLL HANDLER — header shadow + hero behaviour
   ---------------------------------------------------------- */
var siteHeader = document.getElementById('site-header');

window.addEventListener('scroll', function() {
  siteHeader.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

/* ----------------------------------------------------------
   KEYBOARD — nav logo accessible click
   ---------------------------------------------------------- */
document.querySelector('.nav-logo').addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    goHero();
  }
});

/* ----------------------------------------------------------
   LIGHTBOX — openLightbox(clickedItem)
   ---------------------------------------------------------- */
function openLightbox(clickedItem) {
  /* Find the parent gallery container */
  var grid = clickedItem.closest('[data-gallery]') ||
             clickedItem.closest('.masonry-grid') ||
             clickedItem.closest('.gallery-grid') ||
             clickedItem.closest('.lifestyle-strip');

  if (!grid) return;

  lbItems = Array.from(grid.querySelectorAll('.masonry-item'));
  lbIndex = lbItems.indexOf(clickedItem);

  renderLightboxFrame(lbIndex);

  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderLightboxFrame(index) {
  var item    = lbItems[index];
  var imgEl   = document.getElementById('lightbox-img');
  var phEl    = document.getElementById('lightbox-ph');
  var counter = document.getElementById('lightbox-counter');

  /* Try to use a real image src from the gallery item */
  var realSrc  = item.dataset.src || '';
  var realImg  = item.querySelector('img');
  var realAlt  = item.getAttribute('aria-label') || '';

  if (realImg && realImg.src && !realImg.src.endsWith('/')) {
    imgEl.src   = realImg.src;
    imgEl.alt   = realImg.alt || realAlt;
    imgEl.style.display = 'block';
    phEl.style.display  = 'none';
  } else if (realSrc) {
    imgEl.src   = realSrc;
    imgEl.alt   = realAlt;
    imgEl.style.display = 'block';
    phEl.style.display  = 'none';
  } else {
    /* Show a placeholder styled like the source item */
    imgEl.style.display = 'none';
    var sourcePh = item.querySelector('.photo-ph');
    phEl.className = 'photo-ph';
    if (sourcePh) {
      /* Copy the tone class */
      var toneClass = Array.from(sourcePh.classList).find(function(c) { return c.startsWith('t-'); });
      if (toneClass) phEl.classList.add(toneClass);
    }
    /* Fixed lightbox size */
    phEl.style.width   = 'min(75vw, 640px)';
    phEl.style.height  = 'min(80vh, 720px)';
    phEl.style.display = 'block';
  }

  counter.textContent = (index + 1) + ' / ' + lbItems.length;

  /* Show/hide prev-next based on count */
  document.querySelector('.lightbox-prev').style.visibility = lbItems.length > 1 ? 'visible' : 'hidden';
  document.querySelector('.lightbox-next').style.visibility = lbItems.length > 1 ? 'visible' : 'hidden';
}

function navigateLightbox(direction) {
  lbIndex = (lbIndex + direction + lbItems.length) % lbItems.length;
  renderLightboxFrame(lbIndex);
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  lbItems = [];
  lbIndex = 0;
  /* Reset */
  document.getElementById('lightbox-img').src = '';
}

function handleLightboxBackdropClick(e) {
  if (e.target === document.getElementById('lightbox')) {
    closeLightbox();
  }
}

/* ----------------------------------------------------------
   LIGHTBOX — keyboard
   ---------------------------------------------------------- */
document.addEventListener('keydown', function(e) {
  var lightbox = document.getElementById('lightbox');
  var collModal = document.getElementById('collection-modal');
  var mobileMenuEl = document.getElementById('mobile-menu');

  if (lightbox.classList.contains('open')) {
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigateLightbox(-1);
    if (e.key === 'ArrowRight')  navigateLightbox(1);
    return;
  }

  if (collModal.classList.contains('open')) {
    if (e.key === 'Escape') closeCollection();
    return;
  }

  if (mobileMenuEl.classList.contains('open')) {
    if (e.key === 'Escape') closeMobileMenu();
  }
});

/* ----------------------------------------------------------
   COLLECTION MODAL
   ---------------------------------------------------------- */

/* Template: 8 placeholder items per collection */
function buildCollectionGallery(tone) {
  var ratios = ['r-portrait-tall', 'r-landscape', 'r-portrait', 'r-portrait-tall',
                'r-square', 'r-landscape', 'r-portrait-tall', 'r-portrait'];
  var html = '';
  for (var i = 0; i < ratios.length; i++) {
    html += '<div class="masonry-item" onclick="openCollectionLightbox(this)"' +
            ' tabindex="0" role="button" aria-label="Collection photo ' + (i + 1) + '">' +
            '<div class="photo-ph ' + tone + ' ' + ratios[i] + '"></div>' +
            '<div class="hover-overlay"></div></div>';
  }
  return html;
}

var collectionTones = {
  'bonnie-blues': 't-wedding',
  'della-terra':  't-couples',
  'camp-hale':    't-portraits',
};

function openCollection(slug, venue, location) {
  var modal    = document.getElementById('collection-modal');
  var gallery  = document.getElementById('collection-modal-gallery');
  var venueEl  = document.getElementById('collection-modal-venue');
  var locEl    = document.getElementById('collection-modal-location');

  venueEl.textContent = venue;
  locEl.textContent   = location;
  gallery.innerHTML   = buildCollectionGallery(collectionTones[slug] || 't-wedding');

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modal.scrollTop = 0;
}

function openCollectionLightbox(item) {
  var grid = item.closest('.masonry-grid');
  if (!grid) return;
  lbItems = Array.from(grid.querySelectorAll('.masonry-item'));
  lbIndex = lbItems.indexOf(item);
  renderLightboxFrame(lbIndex);
  document.getElementById('lightbox').classList.add('open');
}

function closeCollection() {
  document.getElementById('collection-modal').classList.remove('open');
  document.body.style.overflow = '';
}

/* ----------------------------------------------------------
   FORM HANDLING
   Very lightweight client-side validation + success state.
   Wire up to Formspree / Resend / etc. by adding action="" to <form>.
   ---------------------------------------------------------- */
function setupForm(formId, successId) {
  var form    = document.getElementById(formId);
  var success = document.getElementById(successId);
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    /* Basic validation */
    var required = form.querySelectorAll('[required]');
    var valid = true;
    required.forEach(function(field) {
      if (!field.value.trim()) {
        field.style.borderBottomColor = '#c0392b';
        valid = false;
        field.addEventListener('input', function() {
          field.style.borderBottomColor = '';
        }, { once: true });
      }
    });

    if (!valid) return;

    /* If form has an action (real backend), submit it */
    if (form.action && form.action !== window.location.href) {
      var data = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function(res) {
        if (res.ok) {
          form.style.display = 'none';
          success.classList.add('show');
        }
      }).catch(function() {
        /* Fail silently — fallback to showing success for demo */
        form.style.display = 'none';
        success.classList.add('show');
      });
    } else {
      /* Demo mode: just show success */
      form.style.display = 'none';
      success.classList.add('show');
    }
  });
}

setupForm('commercial-form', 'commercial-form-success');
setupForm('inquire-form',    'inquire-form-success');
setupForm('contact-form',    'contact-form-success');

/* ----------------------------------------------------------
   HASH ROUTING — read URL hash on load for deep-links
   ---------------------------------------------------------- */
function initFromHash() {
  var hash = window.location.hash.slice(1);
  if (!hash) {
    /* Default: show hero */
    showPanel('hero');
    return;
  }

  var section = panelSectionMap[hash];
  if (section && section !== 'hero') {
    switchToSection(section, hash);
  } else {
    showPanel('hero');
  }
}

/* ----------------------------------------------------------
   POPSTATE — handle browser back/forward
   ---------------------------------------------------------- */
window.addEventListener('popstate', function() {
  initFromHash();
});

/* ----------------------------------------------------------
   INIT
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {
  initFromHash();
});
