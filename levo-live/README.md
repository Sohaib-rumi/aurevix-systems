# Aurevix Systems — Production Web Engine (Levo Edition)

> Complete 5-Page Digital Architecture Shipped in 48 Hours for $100 Flat.

This directory is the **isolated, self-contained production distribution** of the Aurevix Systems Levo Studio Edition website. It contains zero development switches or internal testing toggles, full SEO / OpenGraph metadata, Schema.org JSON-LD structured data, and high-performance vector assets.

---

## 📁 Package Manifest

```
levo-live/
├── index.html                  # Master production website (all 5 sections + 3D globe + modal)
├── aurevix-logo.svg            # Electric Amber vector logo mark & favicon
├── aurevix-logo-lockup.svg     # Electric Amber horizontal logo lockup
├── favicon.svg                 # Vector favicon
├── robots.txt                  # Production search crawler rules
├── sitemap.xml                 # Canonical XML sitemap
├── site.webmanifest            # PWA manifest
├── vercel.json                 # 1-Click deployment config for Vercel
├── netlify.toml                # 1-Click deployment config for Netlify
├── package.json                # Optional Node/npm preview scripts
└── README.md                   # Deployment documentation
```

---

## 🚀 Instant Local Testing

### Option A: Python (Zero installation)
```bash
# From within the levo-live folder:
python -m http.server 3000
# Then open: http://localhost:3000
```

### Option B: Node.js (npx serve)
```bash
npx serve .
# Then open the URL printed by serve (typically http://localhost:3000)
```

---

## 🌐 1-Click Production Deployment

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` from inside the `levo-live/` folder, or push this folder to GitHub and import the repository into your Vercel Dashboard.
3. The included `vercel.json` automatically configures:
   - Security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`)
   - 1-Year immutable caching for SVG and static assets
   - Clean URLs

### Deploy to Netlify
1. Drag and drop the `levo-live` folder directly onto [Netlify Drop](https://app.netlify.com/drop).
2. The included `netlify.toml` automatically applies headers and caching.

### Deploy to Cloudflare Pages
1. Connect your repository to Cloudflare Pages.
2. Set Build output directory to: `levo-live`.
3. Framework preset: `None` (Static HTML).

---

## 🎨 Visual System & Architecture

- **Primary Accent**: Electric Amber (`#ffb100`, `#ffc740`)
- **Backdrop Canvas**: Obsidian Charcoal (`#070708`, `#0a0b0e`, `#0e1015`)
- **Typography**: Plus Jakarta Sans, Geist, and JetBrains Mono
- **Engine**: Three.js WebGL (3D Globe with Bezier flight arcs), GSAP ScrollTrigger, Studio Freight Lenis inertial smooth scroll
- **Performance**: 100/100 Core Web Vitals, sub-400ms TTFB/FCP target
