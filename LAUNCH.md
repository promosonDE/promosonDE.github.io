# Launch Guide

Everything between "it builds on my laptop" and "it's live on my own domain over
HTTPS". Work through the parts in order — each one takes a few minutes.

**Total time:** about an hour, most of it waiting for DNS.

---

## Part 1 — Turn on the contact form (5 minutes)

The code is already written and wired to [Formspree](https://formspree.io). You
only need to create the form and paste in its ID.

### 1.1 Create the form

1. Sign up at <https://formspree.io/register> using `Promosonpoudel440@gmail.com`.
2. Confirm the email they send you.
3. In the dashboard choose **+ New form**, name it `Portfolio Contact`, and leave
   the destination email as your account address. Click **Create form**.
4. Open the form and go to the **Integration** tab. Find the line that starts
   *"Your form's endpoint is"*:

   ```
   https://formspree.io/f/xxxxxxxx
   ```

   The `xxxxxxxx` part is your **form ID**. Copy it.

### 1.2 Give the ID to the site

Pick **one** of these — they do the same thing:

**Option A — environment variable (recommended).** Create a file called
`.env.local` in the project root:

```
VITE_FORMSPREE_ID=xxxxxxxx
```

`.env.local` is already git-ignored, so the ID never lands in your repo. When you
deploy, add the same variable in your host's build settings instead (Part 3).

**Option B — paste it into the config.** Open `src/config/contact.ts` and replace
`'YOUR_FORM_ID'`:

```ts
const FORMSPREE_ID = (import.meta.env.VITE_FORMSPREE_ID as string | undefined)?.trim() || 'xxxxxxxx'
```

### 1.3 Lock the endpoint to your domain

The form endpoint ships in the public JavaScript bundle, so anyone can read it
and post to it. Formspree can reject every origin except yours:

**Formspree → your form → Settings → Restrict to Domain** → add both
`yourdomain.com` and `www.yourdomain.com`.

> Do this **after** the site is deployed, otherwise your own site gets blocked.
> While testing locally, either leave it off or temporarily add `localhost`.

### 1.4 Test it

Rebuild, open the site, send yourself a message, and confirm it arrives. You
should get an email with the visitor's name, email and message, and **Reply**
goes straight back to them.

Free plan: **50 submissions/month**. If the portfolio ever outgrows that, the
Personal tier is $10/month for 200.

---

## Part 2 — Get a domain name (15 minutes)

A domain costs roughly **$10–15 per year** for a `.com`. There is no such thing
as a permanently free one — anyone offering that is lending you a subdomain they
control.

### 2.1 Pick a name

For a developer portfolio, the safest pattern is your own name:

| Name                   | Notes                                              |
| ---------------------- | -------------------------------------------------- |
| `promosonpoudel.com`   | Best for a CV. Easy to say out loud and put on paper. |
| `promoson.dev`         | Shorter. `.dev` is HTTPS-only, which you'll have anyway. |
| `promosonpoudel.dev`   | Good if the `.com` is taken.                        |

Avoid hyphens and numbers if you can — they get lost when spoken.

### 2.2 Buy it

Good registrars:

- **Cloudflare Registrar** — sells at wholesale cost, no markup, no upsells. The
  catch is you must use Cloudflare for DNS (which you probably want anyway).
- **Porkbun** — cheap, clean interface, free WHOIS privacy.
- **Namecheap** — long-standing, free WHOIS privacy on most TLDs.

Skip the add-ons at checkout — hosting, "premium DNS", site builders and email
plans are all things you're getting elsewhere for free. WHOIS privacy is
included free at all three of the above.

### 2.3 Two things people forget

1. **Click the ICANN verification email.** Registrars are required to verify your
   contact address. If you ignore it for ~15 days, **the domain is suspended.**
2. **Turn on auto-renew and two-factor authentication.** Losing a domain to an
   expired card is a genuinely common way to lose a portfolio, and a hijacked
   registrar account is worse.

DNS records are managed in the registrar's control panel (or in Cloudflare if you
point your nameservers there). You'll need that in Part 4.

---

## Part 3 — Put the site online (HTTPS included)

All three options below give you **free, automatic HTTPS** with a certificate
from Let's Encrypt. You never have to buy or install a certificate, and you never
have to write an `https://` redirect by hand.

First, put the project on GitHub (skip if it's already there):

```powershell
git add -A
git commit -m "Add contact form, CV download, and launch config"
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

### Option A — Cloudflare Pages (recommended)

Free, unlimited bandwidth, fast global CDN, and it honours the `public/_headers`
file in this repo (real HTTP security headers, not just the `<meta>` CSP).

1. Go to <https://dash.cloudflare.com> → **Workers & Pages** → **Create** →
   **Pages** → **Connect to Git**.
2. Pick the repository.
3. Build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Under **Environment variables** add `VITE_FORMSPREE_ID` = your form ID, and
   `NODE_VERSION` = `20`.
5. **Save and Deploy.** You get a live URL like `promoson.pages.dev` over HTTPS
   within a minute.

Every `git push` to `main` redeploys automatically, and pull requests get their
own preview URL.

### Option B — Netlify

Also free, also honours `_headers`, also drag-and-drop friendly.

1. <https://app.netlify.com> → **Add new site** → **Import an existing project**.
2. Build command `npm run build`, publish directory `dist`.
3. **Site configuration → Environment variables** → add `VITE_FORMSPREE_ID`.
4. Deploy.

### Option C — GitHub Pages

Free and already where your code lives, but it ignores `_headers`, so you get the
`<meta>` CSP and nothing else. Still perfectly secure for a static portfolio.

1. Push the repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**, then
   choose the **Vite** starter workflow. It builds and publishes `dist`.
3. **If you are *not* using a custom domain**, the site lives at
   `https://<username>.github.io/<repo>/`. Vite needs to know about that path or
   every asset 404s and you get a blank page:

   ```
   Settings → Secrets and variables → Actions → Variables
   New variable: VITE_BASE_PATH = /<repo>/
   ```

   The workflow must pass it through as an env var on the build step. With a
   custom domain you can skip this — the site sits at the root.

### Option D — Vercel

<https://vercel.com/new> → import the repo → framework **Vite** → build
`npm run build`, output `dist` → add `VITE_FORMSPREE_ID` → Deploy.

---

## Part 4 — Connect your domain

You're pointing DNS at the host from Part 3. Changes usually apply in minutes but
can take up to 24 hours.

> **A vs CNAME, in one line:** an `A` record points a name at an IP address; a
> `CNAME` points a name at another name. Use `CNAME` for `www`, and follow your
> host's instructions for the bare domain.

### Cloudflare Pages

1. In your Pages project → **Custom domains** → **Set up a domain** → enter
   `yourdomain.com`.
2. If you're using the **bare domain**, the domain must be a zone in the same
   Cloudflare account: add the site to Cloudflare and change the **nameservers**
   at your registrar to the two Cloudflare gives you. Cloudflare then creates the
   DNS records for you.
3. For `www`, add a `CNAME` record pointing at your `*.pages.dev` hostname.
4. HTTPS is provisioned automatically. Repeat for `www` if you want both.

### Netlify

**Domain management → Add a domain you already own** → enter the domain. Netlify
shows the exact records to create — typically a `CNAME` to
`your-site.netlify.app` for `www`, and an `A`/`ALIAS` record for the apex. Let it
manage DNS entirely by pointing your nameservers at Netlify if you'd rather not
touch records.

### GitHub Pages

At your DNS provider:

| Type    | Name  | Value                                                    |
| ------- | ----- | -------------------------------------------------------- |
| `A`     | `@`   | `185.199.108.153`                                         |
| `A`     | `@`   | `185.199.109.153`                                         |
| `A`     | `@`   | `185.199.110.153`                                         |
| `A`     | `@`   | `185.199.111.153`                                         |
| `CNAME` | `www` | `<username>.github.io`                                    |

Then **Settings → Pages → Custom domain**, enter the domain and save. GitHub
starts issuing a certificate; when the check mark appears next to the domain,
tick **Enforce HTTPS**.

Do **not** create a wildcard (`*.yourdomain.com`) record — it's a domain-takeover
risk.

### Verify DNS

```powershell
nslookup yourdomain.com
nslookup www.yourdomain.com
```

Or paste the domain into <https://dnschecker.org> to see propagation worldwide.

---

## Part 5 — Confirm you're actually secure

Work through this list once the site is live.

**HTTPS is on and forced.** Visit `http://yourdomain.com` — it must land on
`https://`. The padlock must show, with no "Not secure" warning.

**No mixed content.** With the site open press `F12` → **Console**. Anything
loaded over `http://` shows up as a warning and breaks the padlock. This project
loads everything from its own origin plus Google Fonts over HTTPS, so the console
should be clean.

**Security headers.** Paste the URL into <https://securityheaders.com>.

- On Cloudflare Pages or Netlify you should get an **A** — `public/_headers`
  supplies `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy` and `Strict-Transport-Security`.
- On GitHub Pages you'll score lower, because it can't send custom headers.
  That's a hosting limitation, not a flaw in the site; the CSP in `index.html`
  still applies.

**Content-Security-Policy is active.** In DevTools → **Network** → reload → click
the `index.html` request → **Response Headers**. You'll see the policy. It
restricts scripts to this site's own files, blocks framing, and only allows
network calls to Google Fonts and Formspree. If you ever add an analytics script
or a new API, you must add its domain to `connect-src` in `index.html`.

**The form endpoint is domain-restricted.** Visit your Formspree form →
**Settings → Restrict to Domain**. Confirm your real domain is listed.

**Accounts have 2FA.** Registrar, GitHub, hosting, and Formspree. The domain and
the repo are the two things that would actually hurt to lose.

**Dependencies are clean.**

```powershell
npm audit
```

---

## Part 6 — Launch checklist

- [ ] `npm run build` succeeds and `npm run typecheck` is silent
- [ ] Contact form delivers to your inbox; **Reply** addresses the visitor
- [ ] The form refuses to send while `VITE_FORMSPREE_ID` is unset (setup notice shown)
- [ ] **Download CV** downloads the PDF and it opens correctly
- [ ] Your photo renders in the About section
- [ ] Every nav link scrolls to the right section, on desktop and mobile
- [ ] Site works at 375 px wide — no horizontal scrolling
- [ ] `http://` redirects to `https://`
- [ ] Custom domain resolves, and `www` resolves too
- [ ] Favicon appears in the browser tab
- [ ] Lighthouse (DevTools → Lighthouse) — aim for 90+ on Performance, Accessibility, Best Practices, SEO
- [ ] Add the live URL to your LinkedIn, GitHub profile and CV
- [ ] Submit the site to [Google Search Console](https://search.google.com/search-console) so it gets indexed

### Optional cleanups

- `jspdf` and `jspdf-autotable` in `package.json`, plus `src/utils/generateCV.ts`,
  are leftovers from the old generated-CV button. Nothing imports them, so they
  never reach the browser bundle — removing them only trims `node_modules`.
- If you want a `robots.txt` and sitemap, add them to `public/` now that you know
  the final domain.
