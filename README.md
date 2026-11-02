# Promoson Poudel — Portfolio

A Minecraft-themed, single-page portfolio site for **Promoson Poudel**, Senior Data Engineer.
The site turns a classic résumé into a "world": skills are an **inventory**, experience is a
**quest log**, education is a list of **achievements**, and a pixel-art character walks across
the screen as you scroll.

Built with React + TypeScript + Vite + Tailwind CSS. No backend, no database — a fully static
bundle that can be deployed to GitHub Pages, Netlify, Vercel, or any static host.

**Live site:** <https://promosonde.github.io/>

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
| Section      | Nav label    | Content                                                       |
| ------------ | ------------ | ------------------------------------------------------------- |
| `home`       | Home         | Hero, name plate, headline, stats strip, CTAs                 |
| `about`      | Player Stats | Portrait, full professional summary, focus areas, quick facts |
| `impact`     | Impact       | Measured outcomes, platform blueprint, case studies, capabilities |
| `skills`     | Inventory    | 22 searchable skill categories + complete skill matrix        |
| `experience` | Quest Log    | Roles with levels, XP bars, 15 achievements each, tech tags   |
| `education`  | Achievements | Degree + 3 certifications with issuers and focus areas        |
| `contact`    | Mailbox      | Direct contact cards, copy buttons, contact form              |
| —            | Footer       | Nav, contact links, download CV                              |

### Interactive niceties
- **Searchable skill inventory** — filter 22 categories by any skill name, with match
  highlighting, result counts, a no-results state, and a collapsible full skill matrix.
- **Impact dashboard** — quantified outcomes from the CV, an end-to-end medallion
  architecture blueprint, three featured missions, and six core capabilities.
- **Copy-to-clipboard contact cards** for email and phone, alongside the existing form.
- **Scroll-progress bar** under the navbar plus a one-per-session loading screen.
- **Scroll-triggered animations** via `IntersectionObserver` — fade, slide, scale and rotate
  variants (`scroll-animate`, `-up`, `-left`, `-right`, `-scale`, `-rotate`).
- **Mouse parallax** on hero blocks and layered backgrounds.
- **Dynamic browser title** — the tab title changes to match the section in view
  ("Inventory | Promoson Poudel", "Quest Log | Promoson Poudel", …).
- **Active-section highlighting** in the navbar, throttled with `requestAnimationFrame`.
- **One-click PDF résumé** — the CV is served straight from `src/assets` and downloaded as
  `Promoson_Poudel_CV.pdf`. No PDF library is shipped to the browser.
- **Download button feedback** — idle → "CV Saved!" confirmation once the file is handed off.
- **Working contact form** — name / email / message with client-side validation, a honeypot
  against bots, and success / failure states. Submissions are forwarded to a form-to-email
  provider and land in your inbox.
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
| PDF        | Static PDF asset (`src/assets`) — no client-side PDF library |
| Contact    | Form-to-email provider (Formspree / Web3Forms / Basin)       |
| Fonts      | Google Fonts — Press Start 2P, VT323                       |

> The résumé is a pre-built PDF served as a static asset, so no PDF library is bundled at all.
> `src/utils/generateCV.ts` is a legacy jsPDF generator kept for reference — it is no longer
> imported anywhere and is therefore excluded from the build.

---

## Getting Started

### Prerequisites
- **Node.js 18+** (Vite 6 requirement; Node 20+ recommended)
- **npm 9+** (ships with Node 18+)

### Install & run

```bash
# 1. Clone the repository
git clone https://github.com/promosonDE/promosonDE.github.io.git
cd promosonDE.github.io

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
promosonDE.github.io/
├── index.html                  # Entry HTML: SEO/OG meta, CSP, fonts, #root mount
├── vite.config.js              # Vite config (base path, port 3000, manual chunks, es2020)
├── tsconfig.json               # Strict TypeScript config
├── .env.example                # Documents VITE_FORMSPREE_ID
├── LAUNCH.md                   # Domain, hosting, HTTPS and go-live walkthrough
├── public/
│   ├── 404.html                # Static "Chunk Not Found" page for static hosts
│   ├── _headers                # Security + cache headers for Netlify / Cloudflare Pages
│   ├── og-image.png            # 1200×630 social preview card
│   └── favicon.svg             # Pixel-art grass block favicon
└── src/
    ├── main.tsx                # React root + ErrorBoundary + StrictMode
    ├── App.tsx                 # Layout, loading gate, scroll spy, 404 routing, observers
    ├── index.css               # Tailwind + Minecraft utility classes & keyframes
    ├── vite-env.d.ts
    ├── assets/
    │   ├── player-avatar.jpg              # Portrait used in the "Player Portrait" slot
    │   └── PROMOSON_POUDEL_MASTER_ALL.pdf # Résumé served by the "Download CV" button
    ├── data/
    │   └── resume.ts           # Single source of truth for all résumé content
    ├── components/
    │   ├── Navbar.tsx          # Fixed nav, active section, progress bar, mobile drawer
    │   ├── HeroSection.tsx     # Landing hero with floating blocks, stats & CTAs
    │   ├── SectionHeading.tsx  # Shared, animated section header
    │   ├── AboutSection.tsx    # "Player Stats" — summary, portrait, focus, quick facts
    │   ├── ImpactSection.tsx   # "Impact" — metrics, blueprint, missions, capabilities
    │   ├── SkillsSection.tsx   # "Inventory" — searchable 22-category skill matrix
    │   ├── ExperienceSection.tsx # "Quest Log" — roles, XP bars, full achievements
    │   ├── EducationSection.tsx  # "Achievements" — degree & certifications
    │   ├── ContactSection.tsx    # "Mailbox" — contact cards + validated form
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
    ├── config/
    │   └── contact.ts         # Form endpoint, inbox address, provider config
    └── utils/
        ├── contact.ts          # Builds and POSTs the message for the active provider
        └── generateCV.ts       # Legacy jsPDF CV generator (reference only, not imported)
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
- The résumé PDF is a static asset — it is only fetched when the user clicks **Download CV**.
- `vite.config.js` splits heavy vendor code into separate chunks:
  - `react` — React + scheduler.
- Scroll and mouse handlers are `passive` and throttled through `requestAnimationFrame`, so
  scrolling never blocks the main thread.
- The build targets `es2020` and CSS is code-split.

### CV download (`src/components/DownloadCVButton.tsx`)
The résumé is a pre-built PDF checked into `src/assets`:

- `PROMOSON_POUDEL_MASTER_ALL.pdf` is imported as a module, so Vite fingerprints it and emits
  it into `dist/assets/` under a content hash.
- The `download` attribute renames it to `Promoson_Poudel_CV.pdf` in the browser's save dialog.
- The button is an `<a>` styled with `.mc-btn`, so right-click → "Save as" and keyboard
  activation behave natively.
- Used in both the hero CTA row (`HeroSection.tsx`) and the footer (`Footer.tsx`).

### Contact form (`src/components/ContactSection.tsx`)

The site has no backend, so the "Mailbox" form posts to **Formspree**, which forwards each
submission to `Promosonpoudel440@gmail.com`.

**Setup:** follow [LAUNCH.md → Part 1](LAUNCH.md). In short — create a form at
[formspree.io](https://formspree.io), then give its ID to the build. Preferred way, because
it keeps the ID out of the repo and lets each deployment use a different form:

```
# .env.local (git-ignored) or your host's build environment
VITE_FORMSPREE_ID=xxxxxxxx
```

Alternatively edit the fallback constant in `src/config/contact.ts`. Until either is set the
form renders a "setup required" notice, disables the submit button, and points visitors at
your direct email address — so it never looks broken on a live site.

| Provider    | Endpoint                                | What you need                              | Free tier        |
| ----------- | --------------------------------------- | ------------------------------------------ | ---------------- |
| Formspree   | `https://formspree.io/f/<id>`           | Create a form, copy its ID                 | 50/mo            |
| FormSubmit  | `https://formsubmit.co/ajax/<email>`    | Nothing — no account                       | Unlimited        |
| Web3Forms   | `https://api.web3forms.com/submit`      | Access key → `FORM_EXTRA_FIELDS`           | 250/mo           |
| Basin       | `https://usebasin.com/api/v1/<token>`   | Create a form, copy its token              | 100/mo           |

Switching provider means changing `PROVIDER`, `FORM_ENDPOINT` and `FORM_ACTION` in
`src/config/contact.ts` — nothing else:

```ts
// Web3Forms example — the provider needs its access key in the payload
export const PROVIDER = 'web3forms'
export const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
export const FORM_EXTRA_FIELDS = { access_key: 'YOUR_ACCESS_KEY' }
```

**How it works**
- `src/config/contact.ts` — endpoint, inbox address, hidden fallback fields, provider extras,
  and the `IS_FORM_CONFIGURED` flag that gates the form.
- `src/utils/contact.ts` — builds the payload for the active provider, POSTs it form-encoded
  with `Accept: application/json` (no CORS preflight), caps the wait at 30 seconds, and handles
  both failure styles providers use (an HTTP error status, or HTTP 200 with `success: false`).
  A 429 is translated into "too many messages" rather than the provider's raw wording.
- Field names are provider-aware: Formspree wants `subject` and `_gotcha` and treats `email`
  as Reply-To, while FormSubmit wants `_subject`, `_replyto` and `_honey`. Getting this wrong
  fails silently, so it lives in one mapper instead of the component.
- Client-side validation (required fields, email pattern, 10-character minimum) with per-field
  messages, plus a honeypot field that silently absorbs bot submissions without a network call.
- The inputs use `name="name"` / `name="email"` / `name="message"`, and the `<form>` has a real
  `action`/`method`, so the no-JavaScript fallback still delivers correctly.
- The Content-Security-Policy in `index.html` allows `connect-src` and `form-action` for
  Formspree, FormSubmit and Web3Forms — add your provider's domain if you use another one.

> **Restrict the endpoint.** It ships in the public JS bundle, so anyone can read it and post
> to it. In Formspree open **Settings → Restrict to Domain** and list your domain. FormSubmit
> has no equivalent, which is one reason Formspree is the default here.

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
    branches: [main]
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
        env:
          VITE_FORMSPREE_ID: ${{ vars.VITE_FORMSPREE_ID }}
          # "/" suits this user site or a custom domain; use "/<repo>/" for a project site.
          VITE_BASE_PATH: ${{ vars.VITE_BASE_PATH || '/' }}
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

> **Pages needs a public repo on the free plan.** If the deploy fails with *"Your current plan
> does not support GitHub Pages for this repository"*, either change the repository visibility
> (Settings → General → Danger Zone → Change visibility) or use Netlify / Cloudflare Pages /
> Vercel, which serve private repos for free. GitHub Pro and the Student Developer Pack also
> unlock Pages for private repos.
>
> Set **Settings → Pages → Source** to *GitHub Actions*, then add repository variables under
> **Settings → Secrets and variables → Actions → Variables**:
> `VITE_FORMSPREE_ID` (your Formspree form ID). The workflow defaults the base path to `/`
> (correct for a `<username>.github.io` site or a custom domain); set `VITE_BASE_PATH` to
> `/<repo>/` only for a project site. `vite.config.js` reads both at build time.
> GitHub Pages cannot send custom headers, so `public/_headers` is ignored there.

### Netlify / Vercel / Cloudflare Pages
Build command `npm run build`, publish directory `dist`. Add `VITE_FORMSPREE_ID` as a build
environment variable (and `NODE_VERSION=20` if the host defaults to something older).

Netlify and Cloudflare Pages also read `public/_headers`, which adds real HTTP security headers
(`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS)
plus long-lived caching for the fingerprinted `assets/*` files.

**Full walkthrough, including buying a domain and attaching it over HTTPS:**
[LAUNCH.md](LAUNCH.md).

---

## Customization

| I want to change…                     | Where                                                        |
| ------------------------------------- | ------------------------------------------------------------ |
| Résumé content (roles, skills, certs)| `src/data/resume.ts` (single source of truth)                 |
| The PDF résumé file                    | `src/assets/PROMOSON_POUDEL_MASTER_ALL.pdf`                  |
| Bio and headline                      | `src/data/resume.ts` (`profile`)                              |
| Impact metrics, blueprint & missions  | `src/data/resume.ts` (`impactMetrics`, `architectureLayers`, `featuredWork`) |
| Where visitor messages are delivered  | `VITE_FORMSPREE_ID` in `.env.local`, or `src/config/contact.ts` |
| Recipient email address               | `src/config/contact.ts` (`CONTACT_EMAIL`)                     |
| Security headers / asset caching      | `public/_headers`                                             |
| Content-Security-Policy               | `index.html`                                                  |
| Colours and block styles              | `src/index.css` (colour literals like `#5D8C3E`, `#FCDB05`)  |
| Page title, meta, OG tags & JSON-LD   | `index.html`                                                  |
| Social preview image                  | `public/og-image.png` (1200×630)                              |
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
- A **Content-Security-Policy** is declared in `index.html` (works on every host, including
  GitHub Pages), alongside `Referrer-Policy: strict-origin-when-cross-origin` and a
  restrictive `Permissions-Policy`.
- `public/_headers` adds `X-Content-Type-Options`, `X-Frame-Options`, HSTS and
  `Permissions-Policy` as real HTTP headers on hosts that support them (Netlify,
  Cloudflare Pages), plus immutable caching for the fingerprinted assets.
- HTTPS is expected in production; every recommended host provisions a free certificate
  automatically. See [LAUNCH.md](LAUNCH.md).
- SEO metadata: canonical title, description, keywords, Open Graph and Twitter Card tags,
  a 1200×630 social preview image, and `Person` JSON-LD listing skills and credentials.
- A print stylesheet turns the page into a readable document and reveals collapsed résumé
  detail when printing or saving to PDF.
- The static `public/404.html` is marked `noindex`.

---

## License

Released under the MIT License — add a `LICENSE` file to the repository root to formalise it.

Fonts (Press Start 2P, VT323) are provided by Google Fonts under the SIL Open Font License.
