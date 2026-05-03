# Desaever Projects — Website

Marketing site for Desaever Projects (Belgisch klus-, onderhouds- en renovatiebedrijf).

- **Stack**: plain HTML + CSS + JavaScript. No build step, no dependencies.
- **Languages**: Nederlands (default, `/`) + English (`/en/`)
- **Form backend**: [FormSubmit](https://formsubmit.co) — submissions email to `tibo@dgroup.be`
- **Icons**: Lucide via CDN (`unpkg.com/lucide@latest`)
- **Fonts**: Inter via Google Fonts
- **Deploy**: GitHub Pages

## Local development

No tooling required. Use any static file server. Examples:

```bash
# Python
python3 -m http.server 8000

# Node (npx)
npx --yes serve -l 8000 .
```

Then open http://localhost:8000/.

> Don't open `index.html` via `file://` — the lang toggle and form will work,
> but relative `assets/` paths still resolve, so it does load. The `file://`
> caveat from the previous Astro version no longer applies.

## Project structure

```
/
├── index.html                    # NL homepage
├── en/index.html                 # EN homepage
├── assets/
│   ├── css/styles.css            # all styles
│   └── js/main.js                # header, mobile menu, slider, form, reveal
├── img/
│   ├── logo/                     # client logo (TODO drop here)
│   ├── hero.svg                  # placeholder hero
│   ├── about.svg                 # placeholder about photo
│   └── projects/p{1-4}-{before,after}.svg
├── favicon.svg
├── robots.txt
├── .nojekyll                     # tells Pages not to run Jekyll
└── .github/workflows/deploy.yml  # GitHub Pages deploy
```

## Contact form (FormSubmit)

The contact form posts JSON to `https://formsubmit.co/ajax/tibo@dgroup.be`.

**One-time activation**: the very first time someone submits the form,
FormSubmit emails `tibo@dgroup.be` with a confirmation link. After that link
is clicked, every subsequent submission is delivered to the inbox.

To hide the email address from the page source, replace `tibo@dgroup.be` in
the `action` URL with the random hash FormSubmit returns in the activation
email — search for `formsubmit.co/ajax/` in `index.html` and `en/index.html`.

To use a different provider (Formspree, Web3Forms, etc.) just change the
`action` attribute on both forms; the JS already submits with `Accept:
application/json` and handles success/error states.

## Where to drop assets

| Slot              | Path                                              |
| ----------------- | ------------------------------------------------- |
| Wordmark logo     | `img/logo/wordmark.svg` (or `.png`)               |
| Square mark       | `img/logo/mark.svg` / `.png`                      |
| Hero photo        | `img/hero.svg` (replace with real `.jpg`)         |
| About photo       | `img/about.svg` (replace with real `.jpg`)        |
| Project photos    | `img/projects/p{1-4}-{before,after}.svg`          |
| OG share image    | `img/og-image.jpg` (1200×630)                     |

If you swap an `.svg` placeholder for a `.jpg`, update the `src` / background
URL in the corresponding spot in `index.html` and `en/index.html`.

## Deploy

1. In GitHub: **Settings → Pages → Build and deployment → Source: GitHub
   Actions**.
2. Push to `main`. The `Deploy to GitHub Pages` workflow uploads the repo
   root to Pages.
3. Site is served at `https://mediawaybv.github.io/desaeverprojects/`.

To use a custom domain: drop a `CNAME` file at the repo root containing the
domain, then update DNS per GitHub's instructions.

## License

Proprietary — © Desaever Projects.
