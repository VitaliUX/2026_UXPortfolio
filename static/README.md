# Static HTML/CSS/JS portfolio

A vanilla rewrite of the React app — no build step, no npm, no framework.
Suitable for GitHub Pages, Netlify, S3, or just opening files locally.

## File layout

```
static/
├── index.html        Landing page
├── work.html         Case study page (reads ?id=<slug>)
├── 404.html          Fallback
├── css/
│   └── style.css
├── js/
│   ├── bg.js         Animated 2D-canvas network background
│   ├── main.js       Landing page (nav, marquee, work grid, services)
│   ├── data.js       Case-study content (ported from src/data/projectData.ts)
│   └── work.js       Case-study renderer (blocks, gallery, lightbox)
├── assets/           Portrait, thumbnails, logo (see "Before first deploy")
└── mobi/             Case-study image/video assets (see "Before first deploy")
```

## Before first deploy — copy the image assets

The HTML/CSS/JS references images that live elsewhere in this repo. Run
these two commands once from the **repo root** to copy them into `static/`:

```bash
# Case-study images + video (~25 MB). Already organized in public/mobi.
cp -R public/mobi static/mobi

# Landing page thumbnails + portrait + logo
mkdir -p static/assets
cp src/assets/extr.png                                 static/assets/
cp src/assets/portrait.jpg                             static/assets/
cp public/logo4.svg                                    static/assets/
# All other thumbnails referenced by main.js already live under public/mobi,
# which you copied in the first command.
```

Verify these files exist after the copy:

- `static/assets/extr.png`
- `static/assets/portrait.jpg`
- `static/assets/logo4.svg`
- `static/mobi/img/ac_vd4.png`
- `static/mobi/img/cisco_preview.jpg`
- `static/mobi/img/yuzu_preview.png`
- `static/mobi/img/yp_preview.png`
- `static/mobi/img/ss_preview.png`
- `static/mobi/img/portfolios/kollective/1a.png`

## Run locally

Because browsers restrict some features when a page is opened via `file://`,
serve the folder with any static server:

```bash
# Python 3
python3 -m http.server 8000 --directory static
# → http://localhost:8000
```

Or:

```bash
npx --yes serve static
```

Opening `static/index.html` directly in a browser works too — only the
`file://` protocol sometimes blocks a couple of minor behaviors.

## Deploy to GitHub Pages

Two common options:

### Option A — Publish from `/docs` on `main`

1. Rename this folder: `mv static docs`
2. Push to GitHub.
3. In the repo's **Settings → Pages**, set:
   - Source: `Deploy from a branch`
   - Branch: `main` · Folder: `/docs`
4. Wait ~1 minute. Your site will be at
   `https://<user>.github.io/<repo>/`.

### Option B — Publish the `gh-pages` branch

```bash
# from repo root
git subtree push --prefix static origin gh-pages
```

Then set **Settings → Pages → Branch = `gh-pages` / root**.

### URL base note

All links in the HTML use **relative paths** (`./css/style.css`,
`./work.html?id=...`, `./assets/...`, `./mobi/...`). That means the site works
whether it's served at the domain root or at `/<repo>/`. No base-path
configuration required.

## What's different from the React version

- **Network background** is a 2D-canvas implementation instead of Three.js
  (same visual: floating nodes, connecting lines, traveling pulses). Much
  smaller and has no external dependencies.
- **framer-motion** animations replaced with CSS transitions +
  `IntersectionObserver` reveals.
- **Routing** uses plain `./work.html?id=<slug>` query string instead of
  `react-router`. Hash-based state or browser history not needed.
- **shadcn/ui** primitives (tooltip, toaster, etc.) dropped — they weren't
  visible in the final UI.

Everything else — layout, typography, colors, copy, case-study content,
work grid — matches the React version.

## Editing content

- **Landing page copy** → `index.html` (static HTML) and the arrays at the
  top of `js/main.js` (projects, services, marquee labels).
- **Case studies** → `js/data.js`. Same block types as the TS original:
  `h1 | h3 | mark | p | ul | toolbar | image | video | gallery`.
- **Design tokens** (colors, fonts) → top of `css/style.css` under `:root`.
