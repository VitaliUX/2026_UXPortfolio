/* =============================================================
   main.js — landing page behavior
   - Marquee content
   - Work grid render
   - Services list render
   - Nav scroll-spy
   - Reveal-on-scroll (IntersectionObserver)
   ============================================================= */

(function () {
  'use strict';

  /* -------------------- Marquee -------------------- */
  const marqueeItems = [
    'UX Research', 'Wireframes', 'Visual Design', 'UI Engineering',
    'Prototyping', 'Usability Testing', 'Design Systems', 'Icon Design',
  ];
  const marqueeTrack = document.getElementById('marquee-track');
  if (marqueeTrack) {
    // double the items so the -50% translate animation loops seamlessly
    const html = [...marqueeItems, ...marqueeItems].map(function (item) {
      return (
        '<div class="marquee-item">' +
          '<span class="label">' + item + '</span>' +
          '<span class="dot">●</span>' +
        '</div>'
      );
    }).join('');
    marqueeTrack.innerHTML = html;
  }

  /* -------------------- Work grid -------------------- */
  const projects = [
    { num: '01', title: 'Extreme Networks', role: 'Sr UX/UI Engineer', year: '2020 — 2026',
      description: "Conversational engagement software that lets brands orchestrate campaigns and proactively engage consumers across voice, messaging, and email.",
      tags: ['SaaS', 'Enterprise', 'Data Viz'],
      image: './assets/extr.png',
      span: 'span-7', ratio: 'ratio-45', link: 'extreme' },
    { num: '02', title: 'Acqueon', role: 'Lead UX/UI Designer', year: '2020',
      description: "Conversational engagement software that lets brands orchestrate campaigns and proactively engage consumers across voice, messaging, and email.",
      tags: ['SaaS', 'Enterprise', 'Data Viz'],
      image: './mobi/img/ac_vd4.png',
      span: 'span-5', ratio: 'ratio-45', link: 'acqueon' },
    { num: '03', title: 'Cisco / Broadsoft', role: 'UX Designer / UI Engineer', year: '2018 — 2022',
      description: "Cisco Webex Contact Center — designed and built from the ground up as a cloud solution. Delivered a 70-icon set converted to an iconic web font.",
      tags: ['Contact Center', 'Cloud', 'Iconography'],
      image: './mobi/img/cisco_preview.jpg',
      span: 'span-5', ratio: 'ratio-1', link: 'cisco2' },
    { num: '04', title: 'Kollective Technology', role: 'UX/UI Designer', year: '2017',
      description: "Network Administration Tool for an enterprise content delivery platform — making bandwidth-hungry content efficient at the network edge.",
      tags: ['Admin Tool', 'Network', 'Dashboard'],
      image: './mobi/img/portfolios/kollective/1a.png',
      span: 'span-7', ratio: 'ratio-45', link: 'kollective' },
    { num: '05', title: 'Yuzu — Barnes & Noble', role: 'Mobile UX Designer', year: '2015 — 2016',
      description: "Next-generation reading and note-taking eReader. A learning platform that lets students build a personal experience around digital course materials.",
      tags: ['Mobile', 'eReader', 'Education'],
      image: './mobi/img/yuzu_preview.png',
      span: 'span-6', ratio: 'ratio-1', link: 'yuzu' },
    { num: '06', title: 'YP Holdings', role: 'Senior UX/UI Designer', year: '2013 — 2015',
      description: "YP app and yp.com — flagship consumer brands used by ~70M monthly visitors. Local search, display advertising, and direct marketing solutions.",
      tags: ['Mobile App', 'Local Search', 'Consumer'],
      image: './mobi/img/yp_preview.png',
      span: 'span-6', ratio: 'ratio-45', link: 'yp' },
    { num: '07', title: 'SolutionSet (now Epsilon)', role: 'Web/Mobile UI Designer & Developer', year: '2010 — 2013',
      description: "Web, mobile and digital marketing solutions for American Express, California Lottery, Cisco, Duke, Stanford, and TXU Energy.",
      tags: ['Agency', 'Front-end', 'Multi-client'],
      image: './mobi/img/ss_preview.png',
      span: 'span-6', ratio: 'ratio-1', link: 'solutionset' },
  ];

  const arrowSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>';

  const workGrid = document.getElementById('work-grid');
  if (workGrid) {
    workGrid.innerHTML = projects.map(function (p) {
      const tagsHtml = p.tags.map(function (t) { return '<li>' + t + '</li>'; }).join('');
      return (
        '<article class="project ' + p.span + ' reveal">' +
          '<a href="./work.html?id=' + encodeURIComponent(p.link) + '">' +
            '<div class="thumb ' + p.ratio + '">' +
              '<img src="' + p.image + '" alt="' + escapeHtml(p.title) + '" loading="lazy" />' +
              '<div class="num">[' + p.num + ']</div>' +
              '<div class="year">' + p.year + '</div>' +
            '</div>' +
            '<div class="meta">' +
              '<div class="info">' +
                '<h3>' + escapeHtml(p.title) + arrowSvg + '</h3>' +
                '<p class="eyebrow text-accent role">' + escapeHtml(p.role) + '</p>' +
                '<p class="desc">' + escapeHtml(p.description) + '</p>' +
              '</div>' +
              '<ul class="tags">' + tagsHtml + '</ul>' +
            '</div>' +
          '</a>' +
        '</article>'
      );
    }).join('');
  }

  /* -------------------- Services list -------------------- */
  const iconSearch = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>';
  const iconRuler = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 7 6.5 13.5 10 17l6.5-6.5"/><path d="m16 4 4 4-9 9-4-4Z"/><path d="m2 22 3-3"/></svg>';
  const iconSpark = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>';
  const iconCode = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>';
  const iconFlask = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V2"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/></svg>';

  const services = [
    { num: '01', icon: iconSearch, title: 'Research', desc: 'User interviews, analyzing study sessions, competitive audits — understanding the problem before sketching the solution.',
      items: ['User Interviews', 'Heuristic Audit', 'Analytics Review', 'Personas'] },
    { num: '02', icon: iconRuler, title: 'Wireframes', desc: 'Information architecture, user flows, low-fi wireframes — the structural argument of the product.',
      items: ['IA & Sitemaps', 'Flows', 'Wireframes', 'Prototypes'] },
    { num: '03', icon: iconSpark, title: 'Visuals', desc: 'Visual interface design, design systems, icon sets and bespoke iconographic web fonts.',
      items: ['UI Design', 'Design Systems', 'Icons', 'Brand'] },
    { num: '04', icon: iconCode, title: 'Code', desc: 'Front-end implementation in HTML, CSS and JavaScript — bridging the design file and production.',
      items: ['HTML / CSS', 'JavaScript', 'React', 'SVG / Animation'] },
    { num: '05', icon: iconFlask, title: 'Test', desc: 'Usability testing, iteration, validation — closing the loop between design intent and user reality.',
      items: ['Usability Testing', 'A/B', 'Iteration', 'QA'] },
  ];

  const serviceList = document.getElementById('service-list');
  if (serviceList) {
    serviceList.innerHTML = services.map(function (s) {
      const items = s.items.map(function (it) { return '<li>— ' + escapeHtml(it) + '</li>'; }).join('');
      return (
        '<div class="service-row reveal">' +
          '<div class="num">' + s.num + '</div>' +
          '<div class="head"><span style="color:var(--accent);display:inline-flex">' + s.icon + '</span><h3>' + escapeHtml(s.title) + '</h3></div>' +
          '<div class="desc">' + escapeHtml(s.desc) + '</div>' +
          '<ul class="items">' + items + '</ul>' +
        '</div>'
      );
    }).join('');
  }

  /* -------------------- Nav scroll-spy -------------------- */
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = ['work', 'about', 'services', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function updateActiveNav() {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const mid = vh / 3;
    let current = '';

    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top <= mid && rect.bottom >= mid) {
        current = sections[i].id;
      }
    }

    // At the bottom, force last section
    if (vh + y >= document.body.offsetHeight - 50) {
      current = sections[sections.length - 1].id;
    }
    // Near the top, clear
    if (y < 50) current = '';

    navLinks.forEach(function (a) {
      const match = a.getAttribute('data-section') === current;
      a.classList.toggle('active', match);
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* -------------------- Reveal on scroll -------------------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '-100px 0px', threshold: 0.01 });

    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* -------------------- helpers -------------------- */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
})();
