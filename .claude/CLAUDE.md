# WE DO IT ALL — Project Context

## What this is
Static marketing site for **WE DO IT ALL**, a Las Vegas junk removal / clean-up / demolition business.
Single-page site: `index.html` + `css/styles.css` + `js/main.js`. No framework, no build step.

## Deploy
- Host: GitHub Pages
- Production domain: `www.wedoitallnv.com` (set via `CNAME`)
- Branch: `main`
- Do **not** add a build step, bundler, or framework without asking. Keep it plain HTML/CSS/JS.

## Business facts
- Phone: 562-538-7451
- Service area: Las Vegas, NV
- Instagram: @WE.CLEAN.JUNK
- Services: junk removal, house/garage clean-outs, tree trimming, landscaping, demolition, gravel & debris, furniture pickup, moving help, backyard clean-up
- Integrations in place: Formspree (contact form), Calendly (scheduling widget)

## Local dev
```
python3 -m http.server 8000      # then open http://localhost:8000
```
or `npx serve`.

## Known issues / cleanup backlog
- **OG and Twitter meta tags in `index.html` still reference the old domain `we-do-it-all-las-vegas.com`.** Current domain is `www.wedoitallnv.com`. Canonical/social preview URLs should be updated together.
- `PREMIUM_ENHANCEMENTS_COMPLETE.md` is a working doc from a prior session — treat as historical, not as spec.
- `temp_image_analysis/`, `temp_video_analysis/`, `temp_mcp/` are scratch dirs. Don't assume they're load-bearing.

## Conventions for Claude
- This is a **local-business SEO site** first, a web-dev project second. When making changes, weigh local-SEO impact (schema, NAP consistency, page speed, Core Web Vitals) alongside code quality.
- Prefer editing `index.html` directly over introducing partials/templating.
- Before claiming a visual change works, actually load the page (Playwright or `python3 -m http.server` + screenshot).
- Images live in `images/`. Keep filenames descriptive (used in alt text + SEO).

## Useful installed skills for this project
- `searchfit-seo:seo-audit` — full SEO audit
- `searchfit-seo:on-page-seo` — per-page optimization
- `searchfit-seo:schema-markup` — JSON-LD (LocalBusiness is already present, can extend)
- `searchfit-seo:technical-seo` — crawlability, speed, sitemaps
- `searchfit-seo:broken-links` — link check
- `searchfit-seo:create-content` — blog / service pages
- `frontend-design:frontend-design` — visual polish
- `plugin:playwright` — browser automation for visual QA
- `semgrep:setup-semgrep-plugin` — static security scan (form-handling JS)
- `firecrawl:firecrawl` — competitor research / scraping
