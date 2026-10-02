# Juliana Moore — Portfolio

A dark-editorial personal portfolio. Vite + React + TypeScript, animated with
[Motion](https://motion.dev), styled with plain CSS custom properties (no UI framework).

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
npm run assets     # regenerate portrait / favicons / OG image from the source photo
```

---

## Editing content

**All copy and data lives in one file: [`src/data/content.ts`](src/data/content.ts).**
You should never need to touch a component to update your CV.

| Export        | What it drives                                           |
| ------------- | -------------------------------------------------------- |
| `profile`     | Name, headline, intro, email, LinkedIn, GitHub, location  |
| `stats`       | The four-up number strip under the hero                   |
| `about`       | About section lede, paragraphs and signature line         |
| `experience`  | The scroll-driven timeline                                |
| `skillGroups` | The three skills cards                                    |
| `languages`   | Language list in the About section                        |
| `projects`    | Selected work cards                                       |
| `education`   | Education cards                                           |
| `credentials` | The certification badge grid                              |

Adding a new job or project is just adding an object to the relevant array — the
layout, animation and staggering all adapt automatically.

### Adding a project later

The Selected Work section is deliberately built to grow. Append to `projects`:

```ts
{
  id: 'my-project',
  title: 'Project name',
  org: 'Where it happened',
  kind: 'Case study',
  blurb: 'Two or three sentences on the problem and what you did.',
  tags: ['Tag', 'Tag'],
}
```

---

## Replacing the photo

1. Drop the new image at `src/assets/source-photo.jpg`.
2. Adjust the `CROP` constant at the top of [`scripts/build-assets.mjs`](scripts/build-assets.mjs)
   (`{ left, top, width, height }`, in source pixels) to frame it.
3. Run `npm run assets`.

That regenerates AVIF/WebP/JPEG portraits, a low-quality blur placeholder, the
favicon set and the 1200x630 Open Graph card in one pass.

---

## Deployment

The site is a fully static build — the contents of `dist/` can be hosted anywhere.

**Live at <https://julianamoore.github.io> via GitHub Pages.**

### Option A — GitHub Pages (current setup)

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and deploys on
every push to `main`. One-time setup:

1. Create a **public** repo named exactly `julianamoore.github.io`.
2. Push this folder to it (`main` branch).
3. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Watch the **Actions** tab; the site is live a minute or so later.

After that, deploying is just `git push`. No build artifacts are committed —
`dist/` is gitignored and rebuilt by CI.

> If you ever rename the repo to something other than `<username>.github.io`,
> the site moves to a subpath and you must add `base: '/repo-name/'` to
> `vite.config.ts` and update `VITE_SITE_URL`.

### Option B — Netlify Drop (no git needed)

1. `npm run build`
2. Go to <https://app.netlify.com/drop>
3. Drag the `dist` folder (or `portfolio-dist.zip`) onto the page.

You get a live URL immediately. Rename the site under **Site settings → Change site name**
to get something like `https://julianamoore.netlify.app`.

### Option C — Netlify or Vercel from GitHub

Push this folder to a GitHub repo, then import it.
`netlify.toml` and `vercel.json` are already configured — build command `npm run build`,
publish directory `dist`. Every push to `main` redeploys.

### Option D — Vercel CLI

```bash
npx vercel          # preview deploy
npx vercel --prod   # production deploy
```

### After you have your real URL — important

Social previews (LinkedIn, X, Slack, iMessage) need **absolute** URLs, so update
the domain in three places and rebuild:

1. `.env` → `VITE_SITE_URL=https://your-real-url` (no trailing slash)
2. `public/robots.txt` → the `Sitemap:` line
3. `public/sitemap.xml` → the `<loc>` value

Then `npm run build` and redeploy. To force LinkedIn to refresh a cached preview,
run the URL through the
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

### Custom domain

Both Netlify and Vercel issue a free HTTPS certificate — add the domain in the
dashboard, point the DNS records it gives you, then update `VITE_SITE_URL` as above.

---

## Notes on the build

- **Accessibility** — semantic landmarks, a skip link, visible focus rings, labelled
  icon links, and a full `prefers-reduced-motion` path that disables parallax, the
  cursor halo, the marquee and all scroll reveals.
- **Performance** — AVIF/WebP portraits with a blurred inline placeholder, preloaded
  hero image, `font-display: swap`, and animations driven by transform/opacity only.
- **SEO** — title, meta description, canonical, Open Graph + Twitter card,
  `Person` JSON-LD, `robots.txt` and `sitemap.xml`.
- **Privacy** — the phone number and home address from the CV are intentionally not
  published. Only the professional email, LinkedIn, GitHub and city are shown.
