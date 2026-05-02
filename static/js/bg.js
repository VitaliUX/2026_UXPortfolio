/* =============================================================
   bg.js — 2D canvas "network" background
   Ported visual concept from src/components/NetworkBackground.tsx
   (Three.js). Uses vanilla 2D canvas: floating nodes, connecting
   lines whose alpha falls off with distance, and traveling pulses
   along active edges. Respects prefers-reduced-motion.
   ============================================================= */

(function () {
  'use strict';

  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const NODE_COUNT = 80;
  const MAX_DIST = 180;     // px — connection threshold
  const ACCENT = [47, 114, 255];  // rgb of --accent
  const PULSE_MAX = 80;
  const PULSE_RATE = 0.25;  // chance per frame to spawn one when edges exist

  const DPR_CAP = 1.5;

  let W = 0, H = 0, DPR = 1;
  const nodes = [];
  let pulses = [];

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function init() {
    nodes.length = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      });
    }
  }

  window.addEventListener('mousemove', function (e) {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 40;
    mouse.ty = (e.clientY / window.innerHeight - 0.5) * 20;
  }, { passive: true });

  window.addEventListener('resize', function () {
    resize();
    init();
  });

  resize();
  init();

  function step() {
    // Smooth parallax offset
    mouse.x += (mouse.tx - mouse.x) * 0.02;
    mouse.y += (mouse.ty - mouse.y) * 0.02;

    ctx.clearRect(0, 0, W, H);

    // Update node positions
    for (let i = 0; i < NODE_COUNT; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    }

    const activeEdges = [];

    // Draw edges
    ctx.lineWidth = 1;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        const max2 = MAX_DIST * MAX_DIST;
        if (d2 < max2) {
          const alpha = (1 - Math.sqrt(d2) / MAX_DIST) * 0.22;
          ctx.strokeStyle = 'rgba(' + ACCENT[0] + ',' + ACCENT[1] + ',' + ACCENT[2] + ',' + alpha + ')';
          ctx.beginPath();
          ctx.moveTo(a.x + mouse.x, a.y + mouse.y);
          ctx.lineTo(b.x + mouse.x, b.y + mouse.y);
          ctx.stroke();
          activeEdges.push(i * 1000 + j);
        }
      }
    }

    // Draw nodes (soft blue dots)
    for (let i = 0; i < NODE_COUNT; i++) {
      const n = nodes[i];
      const g = ctx.createRadialGradient(n.x + mouse.x, n.y + mouse.y, 0, n.x + mouse.x, n.y + mouse.y, 4);
      g.addColorStop(0, 'rgba(' + ACCENT[0] + ',' + ACCENT[1] + ',' + ACCENT[2] + ',0.65)');
      g.addColorStop(1, 'rgba(' + ACCENT[0] + ',' + ACCENT[1] + ',' + ACCENT[2] + ',0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x + mouse.x, n.y + mouse.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Spawn pulse
    if (!reduced && activeEdges.length > 0 && pulses.length < PULSE_MAX) {
      if (Math.random() < PULSE_RATE) {
        const edge = activeEdges[Math.floor(Math.random() * activeEdges.length)];
        const a = Math.floor(edge / 1000);
        const b = edge % 1000;
        pulses.push({ a: a, b: b, t: 0, speed: 0.008 + Math.random() * 0.012 });
      }
    }

    // Draw pulses
    const next = [];
    for (let i = 0; i < pulses.length; i++) {
      const p = pulses[i];
      p.t = Math.min(p.t + p.speed, 1);
      const a = nodes[p.a], b = nodes[p.b];
      if (!a || !b) continue;
      const x = a.x + (b.x - a.x) * p.t + mouse.x;
      const y = a.y + (b.y - a.y) * p.t + mouse.y;
      // glow
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 14);
      glow.addColorStop(0, 'rgba(180, 210, 255, 0.9)');
      glow.addColorStop(0.3, 'rgba(' + ACCENT[0] + ',' + ACCENT[1] + ',' + ACCENT[2] + ',0.6)');
      glow.addColorStop(1, 'rgba(' + ACCENT[0] + ',' + ACCENT[1] + ',' + ACCENT[2] + ',0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, 14, 0, Math.PI * 2);
      ctx.fill();
      if (p.t < 1) next.push(p);
    }
    pulses = next;

    if (!reduced) requestAnimationFrame(step);
  }

  if (reduced) {
    step(); // render one static frame only
  } else {
    requestAnimationFrame(step);
  }
})();
