# Desaever Projects — Website

Marketing site for Desaever Projects (Belgisch renovatie- en klusbedrijf).

- **Framework**: [Astro](https://astro.build/) (static output)
- **Languages**: Nederlands (default, `/`) + English (`/en/`)
- **Form backend**: Formspree
- **Deploy**: GitHub Pages

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:4321/desaeverprojects/.

## Build

```bash
npm run build
npm run preview
```

## Configuration

### Formspree

Set the form endpoint via env var (defaults to `TODO_FORMSPREE_ID`, which produces a non-functional URL until replaced):

```bash
# .env
PUBLIC_FORMSPREE_ID=your_form_id
```

In CI, add `PUBLIC_FORMSPREE_ID` as a repository secret and uncomment the `env:` block in `.github/workflows/deploy.yml`.

### Site / base URL

Set in `astro.config.mjs`:

```js
site: "https://mediawaybv.github.io",
base: "/desaeverprojects",
```

If you add a custom domain, drop a `CNAME` file in `public/` containing the domain and set `base: "/"` (and update `site`).

## Where to drop assets

| Slot                  | Path                                              | Notes                                                  |
| --------------------- | ------------------------------------------------- | ------------------------------------------------------ |
| Wordmark logo         | `public/img/logo/wordmark.svg`                    | Used in header                                         |
| Wordmark logo (white) | `public/img/logo/wordmark-light.svg`              | Used in dark footer (falls back to inverted wordmark)  |
| Square mark           | `public/img/logo/mark.svg` / `.png`               | Apple touch icon / favicon                             |
| Hero photo            | `public/img/hero.svg` (or `.jpg`)                 | If `.jpg`, update path in `src/components/Hero.astro`  |
| About photo           | `public/img/about.svg` (or `.jpg`)                | Update path in `src/components/About.astro`            |
| Project photos        | `public/img/projects/p{1-4}-{before,after}.svg`   | Update paths in `src/components/Projects.astro`        |
| OG image              | `public/og-image.jpg`                             | 1200×630, used for social share                        |

All current placeholders are clearly labelled "TODO" and rendered as SVGs so the site previews cleanly until real assets land.

## Real content TODOs

Search the codebase for `TODO:` to find every placeholder that still needs real values. The main ones:

- `src/i18n/nl.json` and `src/i18n/en.json` — phone, email, region (`contact.phone_value`, `contact.email_value`, `contact.region_value`)
- `src/layouts/Base.astro` — `LocalBusiness` JSON-LD `telephone` / `email`

## Deploy

1. In GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main` (or the configured branch). The `Deploy to GitHub Pages` workflow builds and publishes.
3. Site is served at `https://mediawaybv.github.io/desaeverprojects/`.

## Project structure

```
src/
├── pages/
│   ├── index.astro            # NL home
│   └── en/index.astro         # EN home
├── layouts/Base.astro
├── components/                # Header, Hero, Services, Projects, …
├── i18n/{nl,en}.json + t.ts
└── styles/{tokens,global}.css
public/
├── img/                       # photos + logo
├── favicon.svg
└── robots.txt
```

## License

Proprietary — © Desaever Projects.
