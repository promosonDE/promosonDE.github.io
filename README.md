# Promoson Poudel — Portfolio

A Minecraft-themed, single-page portfolio site for **Promoson Poudel**, Senior Data Engineer.
The site turns a classic résumé into a "world": skills are an **inventory**, experience is a
**quest log**, education is a list of **achievements**, and a pixel-art character walks across
the screen as you scroll.

Built with React + TypeScript + Vite + Tailwind CSS. No backend, no database — a fully static
bundle that can be deployed to GitHub Pages, Netlify, Vercel, or any static host.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [How It Works](#how-it-works)
- [Deployment](#deployment)
- [Customization](#customization)
- [Accessibility & Security](#accessibility--security)
- [License](#license)

---

## Features

### Minecraft-inspired UI
- **Pixel-art theme** built from scratch — bevelled `mc-btn` buttons, `mc-panel` cards,
  `mc-slot` inventory slots, grass/dirt textures, and block-shadow typography.
- **Fonts**: `Press Start 2P` (pixel headings) and `VT323` (body), served from Google Fonts.
- **Animated parallax village** background (`MinecraftVillage.tsx`) — houses, trees and
  mountains that shift with the scroll position.
- **Running character** (`MinecraftCharacter.tsx`) that walks left/right along the bottom of
  the viewport in the direction you scroll.
- **Floating particles** and a **loading screen** with a progress bar and rotating
  "data-engineering" tips (`LoadingScreen.tsx`).

### Portfolio content
| Section      | Nav label    | Content                                             |
| ------------ | ------------ | --------------------------------------------------- |
| `home`       | Home         | Hero, name plate, headline, CTAs                    |
| `about`      | Player Stats | Portrait, bio, years of experience, key stats       |
| `skills`     | Inventory    | 14 skill categories as expandable inventory grids    |
| `experience` | Quest Log    | Roles with levels, XP bars, achievements, tech tags  |
| `education`  | Achievements | Degrees + certifications with rarity tiers           |
| —            | Footer       | Nav, contact links, download CV                     |

### Interactive niceties
- **Scroll-triggered animations** via `IntersectionObserver` — fade, slide, scale and rotate
  variants (`scroll-animate`, `-up`, `-left`, `-right`, `-scale`, `-rotate`).
- **Mouse parallax** on hero blocks and layered backgrounds.
- **Dynamic browser title** — the tab title changes to match the section in view
  ("Inventory | Promoson Poudel", "Quest Log | Promoson Poudel", …).
- **Active-section highlighting** in the navbar, throttled with `requestAnimationFrame`.
- **On-demand PDF résumé** — the CV is generated client-side with jsPDF and downloaded as
  `Promoson_Poudel_CV.pdf` (summary, skills, experience, education, certifications).
  jsPDF is lazy-loaded, so it costs nothing on initial page load.
- **Download button feedback** — idle → "Crafting PDF…" → "CV Saved!" / "Failed – Retry".
- **Client-side 404** — unknown URLs render a themed *"Chunk Not Found"* screen instead of a
  blank page, with a matching static `public/404.html` for hosts that serve their own 404 page.
- **Error boundary** — a render crash shows a themed *"Game Crashed"* screen with reload and
  return-home buttons instead of a white page.
- **Responsive** across breakpoints (`sm` 640 px, `lg` 1024 px, plus mobile-specific rules
  under 480 px and in portrait tablet orientation), with a dedicated mobile nav drawer below
  the `lg` breakpoint.

---

## Tech Stack

| Layer      | Choice                                                     |
| ---------- | ---------------------------------------------------------- |
| Framework  | React 18 (`react-dom/client`, StrictMode)                  |
| Language   | TypeScript 5.7 (`strict: true`)                            |
| Build tool | Vite 6                                                     |
| Styling    | Tailwind CSS 4 (`@tailwindcss/vite`) + custom CSS layer     |
| PDF        | jsPDF 4 (lazy-loaded), jspdf-autotable                     |
| Fonts      | Google Fonts — Press Start 2P, VT323                       |

> `jspdf-autotable` is installed as a dependency, but the résumé layout in
> `src/utils/generateCV.ts` is hand-rolled with jsPDF primitives for full control over
> pagination and hanging indents.

---

## Getting Started

### Prerequisites
- **Node.js 18+** (Vite 6 requirement; Node 20+ recommended)
- **npm 9+** (ships with Node 18+)

### Install & run

```bash
# 1. Clone the repository
git clone https://github.com/RojanDA/promoson-portfolio.git
cd promoson-portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server (http://localhost:3000)
npm run dev
```

The dev server binds to `0.0.0.0:3000` with `strictPort`, so it is reachable from other
devices on your network — handy for previewing the mobile layout on a real phone.

### Build & preview

```bash
npm run build     # production bundle in dist/
npm run preview   # serve dist/ locally on port 3000
npm run typecheck # tsc --noEmit, no output emitted
```

---

## Project Structure

```
promoson-portfolio/
├── index.html                  # Entry HTML: SEO/OG meta, CSP, fonts, #root mount
├── vite.config.js              # Vite config (port 3000, manual chunks, es2020 target)
├── tsconfig.json               # Strict TypeScript config
├── public/
│   ├── 404.html                # Static "Chunk Not Found" page for static hosts
│   └── favicon.svg             # Pixel-art grass block favicon
└── src/
    ├── main.tsx                # React root + ErrorBoundary + StrictMode
    ├── App.tsx                 # Layout, loading gate, scroll spy, 404 routing, observers
    ├── index.css               # Tailwind + Minecraft utility classes & keyframes
    ├── vite-env.d.ts
    ├── assets/
    │   └── player-avatar.svg   # Pixel-art portrait used in the "Player Portrait" slot
    ├── components/
    │   ├── Navbar.tsx          # Fixed nav, active section, mobile drawer
    │   ├── HeroSection.tsx     # Landing hero with floating blocks & mouse parallax
    │   ├── AboutSection.tsx    # "Player Stats" — bio, portrait, stat cards
    │   ├── SkillsSection.tsx   # "Inventory" — collapsible skill categories
    │   ├── ExperienceSection.tsx # "Quest Log" — roles, XP bars, achievements
    │   ├── EducationSection.tsx  # "Achievements" — degrees & certifications
    │   ├── Footer.tsx          # Footer nav, contact, download CV
    │   ├── DownloadCVButton.tsx # Button state machine around the PDF download
    │   ├── LoadingScreen.tsx   # Progress bar + rotating tips
    │   ├── NotFound.tsx        # Client-side 404 screen
    │   ├── ErrorBoundary.tsx   # Crash screen fallback
    │   ├── Particles.tsx       # Drifting pixel particles
    │   ├── MinecraftCharacter.tsx # Scrolling pixel character
    │   └── MinecraftVillage.tsx   # Parallax village background
    ├── hooks/
    │   └── useScrollAnimation.ts  # useScrollAnimation, useParallax, useMouseParallax
    └── utils/
        └── generateCV.ts       # jsPDF CV generator (paginated, on demand)
```

---

## Available Scripts

| Script              | What it does                                       |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Start Vite dev server with HMR on port 3000        |
| `npm run build`     | Type-safe production build into `dist/`            |
| `npm run preview`   | Serve the production build locally on port 3000    |
| `npm run typecheck` | Run `tsc --noEmit` to catch type errors            |

---

## How It Works

### App shell (`src/App.tsx`)
The site has **no router**. On mount it inspects `window.location.pathname` (stripping
`import.meta.env.BASE_URL` so it works under a sub-path such as a GitHub Pages project site).
Anything that is not `/`, `/index.html`, or `/404.html` renders the 404 screen.

Otherwise it shows a loading screen for ~2.2 s, then the real page. Two observers then take over:

- a **scroll spy** that marks the section in view as active and updates `document.title`;
- an **IntersectionObserver** that adds the `visible` class to `.scroll-animate*` elements as
  they enter the viewport.

### Theming (`src/index.css`)
Reusable Minecraft utilities are defined once and used throughout:

| Class              | Purpose                                              |
| ------------------ | ---------------------------------------------------- |
| `.mc-btn`          | 3D bevelled block button with press/hover states     |
| `.mc-panel`        | Framed panel with a highlight edge                   |
| `.mc-slot`         | Inventory-style square slot for icons/portraits      |
| `.mc-block`        | Solid block with hover lift                          |
| `.pixel-font`      | Pixel typeface treatment                             |
| `.dirt-bg` / `.grass-top` | Layered terrain textures                       |
| `.particle`        | Falling particle animation (CSS custom properties)   |
| `.scroll-animate*` | Entrance animations driven by the `visible` class    |

### Performance
- `jsPDF` is only fetched when the user clicks **Download CV** (`await import('jspdf')`).
- `vite.config.js` splits heavy vendor code into separate chunks:
  - `jspdf` — the PDF library,
  - `react` — React + scheduler.
- Scroll and mouse handlers are `passive` and throttled through `requestAnimationFrame`, so
  scrolling never blocks the main thread.
- The build targets `es2020` and CSS is code-split.

### CV generation (`src/utils/generateCV.ts`)
`downloadCV()` builds the PDF at runtime with a small layout helper:

- A4 page, 20 mm margins, Helvetica throughout.
- `ensure()` adds a new page whenever a block would overflow the bottom margin.
- `centered()`, `wrapped()`, `bullet()` and `labeled()` helpers handle headings, paragraphs,
  bulleted achievements (with hanging indent) and "label: value" rows.
- Sections written: Professional Summary, Technical Skills, Professional Experience,
  Education, Certifications.
- The file is saved as `Promoson_Poudel_CV.pdf`.

---

## Deployment

The build output in `dist/` is a plain static site — no server runtime required.

### GitHub Pages

```bash
npm run build
# copy dist/ into a gh-pages branch, or use an action:
```

A minimal workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [master]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

> Set **Settings → Pages → Source** to *GitHub Actions*.
> If you deploy to a project sub-path, add `base: '/promoson-portfolio/'` to `vite.config.js`.

### Netlify / Vercel / Cloudflare Pages
Set the build command to `npm run build` and the publish directory to `dist`. No environment
variables or server-side configuration are required.

---

## Customization

| I want to change…                     | Where                                                        |
| ------------------------------------- | ------------------------------------------------------------ |
| Résumé content (roles, skills, certs)| `src/components/SkillsSection.tsx`, `ExperienceSection.tsx`, `EducationSection.tsx` |
| The PDF résumé text                   | `src/utils/generateCV.ts`                                     |
| Bio and headline                      | `src/components/AboutSection.tsx`, `HeroSection.tsx`          |
| Colours and block styles              | `src/index.css` (colour literals like `#5D8C3E`, `#FCDB05`)  |
| Page title, meta and OG tags          | `index.html`                                                  |
| Port, chunking, build target          | `vite.config.js`                                              |
| Favicon                               | `public/favicon.svg`                                          |

Content is intentionally kept as plain arrays/objects at the top of each component, so editing
the site never requires touching the JSX.

---

## Accessibility & Security

- `prefers-reduced-motion` is respected: parallax, the running character and entrance animations
  are disabled for users who ask for reduced motion.
- Semantic landmarks (`<nav>`, `<main>`, `<section>`, `<footer>`), labelled buttons,
  `aria-expanded` / `aria-controls` on the mobile menu, and `aria-live` on the download button.
- Visible focus states and keyboard-operable controls (including the logo, which responds to
  <kbd>Enter</kbd>/<kbd>Space</kbd>).
- A **Content-Security-Policy** is declared in `index.html`, alongside
  `Referrer-Policy: strict-origin-when-cross-origin` and a restrictive `Permissions-Policy`.
- SEO metadata: canonical title, description, Open Graph and Twitter Card tags.
- The static `public/404.html` is marked `noindex`.

---

## License

Released under the MIT License — add a `LICENSE` file to the repository root to formalise it.

Fonts (Press Start 2P, VT323) are provided by Google Fonts under the SIL Open Font License.
