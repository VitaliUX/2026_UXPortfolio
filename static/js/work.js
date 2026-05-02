/* =============================================================
   work.js — case study page renderer
   Reads ?id=<slug> from URL, pulls data from window.PROJECT_DATA,
   renders sections with block-level components. Supports:
   - h1, h3, mark, p, ul, toolbar, image, video, gallery
   - click-to-zoom lightbox
   - horizontal scroll gallery with prev/next + dot indicators
   - keyboard (arrow keys in gallery, Escape to go back)
   ============================================================= */

(function () {
  'use strict';

  /* -------------------- URL + data lookup -------------------- */
  function getId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || '';
  }

  const id = getId();
  const data = (window.PROJECT_DATA || {})[id];

  const scroller = document.getElementById('case-scroller');
  const loaderBar = document.getElementById('loader-bar');

  // Fake page loader (trickle 0→80% fast, then snap 100% + fade)
  if (loaderBar) {
    setTimeout(function () { loaderBar.classList.add('trickle'); }, 50);
    setTimeout(function () { loaderBar.classList.add('complete'); }, 650);
    setTimeout(function () {
      const l = document.getElementById('page-loader');
      if (l && l.parentNode) l.parentNode.removeChild(l);
    }, 1100);
  }

  // Title
  if (data && data.title) document.title = data.title + ' — Vitali Tsernosev';

  /* -------------------- Render -------------------- */
  if (!scroller) return;

  if (!data) {
    scroller.innerHTML = '<div class="case-404">Project not found.</div>';
    return;
  }

  const isGalleryOnly =
    data.sections.length === 1 &&
    data.sections[0].blocks.length === 1 &&
    data.sections[0].blocks[0].type === 'gallery';

  if (isGalleryOnly) scroller.classList.add('gallery-only');

  // Build the DOM for each section
  data.sections.forEach(function (section, idx) {
    const secEl = document.createElement('section');
    secEl.className = 'case-section' + (isGalleryOnly ? ' gallery-fill' : '');
    const inner = document.createElement('div');
    inner.className = 'case-inner' + (isGalleryOnly ? ' wide' : '');
    secEl.appendChild(inner);

    section.blocks.forEach(function (block) {
      inner.appendChild(renderBlock(block));
    });

    scroller.appendChild(secEl);
  });

  // Reveal sections on scroll
  if ('IntersectionObserver' in window && !isGalleryOnly) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { root: scroller, rootMargin: '-100px 0px', threshold: 0.01 });
    scroller.querySelectorAll('.case-section').forEach(function (s) { io.observe(s); });
  } else {
    scroller.querySelectorAll('.case-section').forEach(function (s) { s.classList.add('in-view'); });
  }

  /* -------------------- Block renderers -------------------- */
  function renderBlock(block) {
    switch (block.type) {
      case 'h1': {
        const h = document.createElement('h1');
        h.className = 'display-serif';
        h.textContent = block.text;
        return h;
      }
      case 'h3': {
        const h = document.createElement('h3');
        h.textContent = block.text;
        return h;
      }
      case 'mark': {
        const h = document.createElement('h5');
        h.textContent = block.text;
        return h;
      }
      case 'p': {
        const p = document.createElement('p');
        p.textContent = block.text;
        return p;
      }
      case 'ul': {
        const ul = document.createElement('ul');
        ul.className = 'list';
        block.items.forEach(function (it) {
          const li = document.createElement('li');
          li.textContent = it;
          ul.appendChild(li);
        });
        return ul;
      }
      case 'toolbar': {
        const wrap = document.createElement('div');
        wrap.className = 'toolbar';
        block.items.forEach(function (it) {
          const cell = document.createElement('div');
          const lbl = document.createElement('span');
          lbl.className = 'lbl';
          lbl.textContent = it.label;
          const val = document.createElement('span');
          val.className = 'val';
          val.textContent = it.value;
          cell.appendChild(lbl);
          cell.appendChild(val);
          wrap.appendChild(cell);
        });
        return wrap;
      }
      case 'image': {
        const wrap = document.createElement('div');
        wrap.className = 'case-img';
        const img = document.createElement('img');
        img.src = block.src;
        img.alt = block.alt || '';
        img.loading = 'lazy';
        wrap.appendChild(img);
        wrap.addEventListener('click', function () { openLightbox(block.src, block.alt || ''); });
        return wrap;
      }
      case 'video': {
        const wrap = document.createElement('div');
        wrap.className = 'case-video';
        const video = document.createElement('video');
        video.controls = true;
        if (block.poster) video.poster = block.poster;
        const src = document.createElement('source');
        src.src = block.src;
        src.type = 'video/mp4';
        video.appendChild(src);
        wrap.appendChild(video);
        return wrap;
      }
      case 'gallery':
        return renderGallery(block);
      default: {
        const d = document.createElement('div');
        return d;
      }
    }
  }

  /* -------------------- Gallery -------------------- */
  function renderGallery(block) {
    const root = document.createElement('div');
    root.className = 'gallery';

    const header = document.createElement('div');
    header.className = 'gallery-head';
    const h3 = document.createElement('h3');
    h3.textContent = block.title || '';
    header.appendChild(h3);

    const nav = document.createElement('div');
    nav.className = 'gallery-nav';
    const counter = document.createElement('span');
    counter.className = 'counter';
    const prevBtn = document.createElement('button');
    prevBtn.setAttribute('aria-label', 'Previous');
    prevBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
    const nextBtn = document.createElement('button');
    nextBtn.setAttribute('aria-label', 'Next');
    nextBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

    nav.appendChild(counter);
    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);
    header.appendChild(nav);
    root.appendChild(header);

    const track = document.createElement('div');
    track.className = 'gallery-track';
    const dots = document.createElement('div');
    dots.className = 'gallery-dots';

    const total = block.images.length;
    let current = 0;

    function updateUI() {
      counter.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current === total - 1;
      dots.querySelectorAll('button').forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
    }

    function scrollTo(i) {
      const clamped = Math.max(0, Math.min(i, total - 1));
      const child = track.children[clamped];
      if (child) {
        track.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
        current = clamped;
        updateUI();
      }
    }

    block.images.forEach(function (img, i) {
      const slide = document.createElement('div');
      slide.className = 'gallery-slide';
      const im = document.createElement('img');
      im.src = img.src;
      im.alt = img.alt || '';
      im.loading = 'lazy';
      slide.appendChild(im);
      slide.addEventListener('click', function () { openLightbox(img.src, img.alt || ''); });
      track.appendChild(slide);

      const dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', function () { scrollTo(i); });
      dots.appendChild(dot);
    });

    // Detect the current slide as user scrolls
    track.addEventListener('scroll', function () {
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0, minDist = Infinity;
      for (let i = 0; i < track.children.length; i++) {
        const child = track.children[i];
        const c = child.offsetLeft + child.clientWidth / 2;
        const dist = Math.abs(c - center);
        if (dist < minDist) { minDist = dist; closest = i; }
      }
      if (closest !== current) { current = closest; updateUI(); }
    }, { passive: true });

    prevBtn.addEventListener('click', function () { scrollTo(current - 1); });
    nextBtn.addEventListener('click', function () { scrollTo(current + 1); });

    root.appendChild(track);
    root.appendChild(dots);

    updateUI();
    return root;
  }

  /* -------------------- Lightbox -------------------- */
  function openLightbox(src, alt) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    const im = document.createElement('img');
    im.src = src;
    im.alt = alt;
    lb.appendChild(im);
    lb.addEventListener('click', function () {
      if (lb.parentNode) lb.parentNode.removeChild(lb);
    });
    document.body.appendChild(lb);
  }

  /* -------------------- Keyboard: Escape goes back -------------------- */
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      // If a lightbox is open, close it first
      const existing = document.querySelector('.lightbox');
      if (existing) { existing.parentNode.removeChild(existing); return; }
      if (document.referrer && document.referrer.indexOf(window.location.origin) === 0) {
        window.history.back();
      } else {
        window.location.href = './index.html';
      }
    }
    // Arrow keys advance the first visible gallery (if any)
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const track = document.querySelector('.gallery-track');
      if (!track) return;
      const nextBtn = track.parentNode.querySelector('.gallery-nav button:last-of-type');
      const prevBtn = track.parentNode.querySelector('.gallery-nav button:nth-last-of-type(2)');
      if (e.key === 'ArrowRight' && nextBtn && !nextBtn.disabled) nextBtn.click();
      if (e.key === 'ArrowLeft'  && prevBtn && !prevBtn.disabled) prevBtn.click();
    }
  });

})();
