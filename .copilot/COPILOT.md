# WE DO IT ALL - Copilot Project Guide

## Project Snapshot
- Static marketing site for WE DO IT ALL in Las Vegas
- Stack: plain `index.html`, `css/styles.css`, `js/main.js`
- No framework, no bundler, no build step unless explicitly requested
- Source control: GitHub repository `hopehamster/trash-collecting-biz-website`
- Deployment host: GitHub Pages
- Production domain: `www.wedoitallnv.com`

## Business Facts (Do Not Drift)
- Phone: 562-538-7451
- Service area: Las Vegas, NV
- Instagram: @WE.CLEAN.JUNK
- Core services: junk removal, clean-outs, tree trimming, landscaping, demolition, gravel and debris removal, furniture pickup, moving help, backyard clean-up
- Integrations in use: Formspree, Calendly

## Core Engineering Rules
- Prioritize local business SEO and conversion clarity over technical novelty
- Keep NAP details consistent everywhere (name, address/service area, phone)
- Prefer direct edits in `index.html` over introducing abstractions
- Keep JS lightweight and progressive; avoid heavy dependencies
- Preserve current visual language unless asked for redesign
- Optimize for Core Web Vitals and mobile first behavior

## Known Cleanup Item
- Social metadata in `index.html` still references the old domain. Canonical, OG, and Twitter URLs should stay aligned to `www.wedoitallnv.com`.

## Local Workflow
- Run locally with:
  - `python3 -m http.server 8000`
  - or `npx serve`
- Validate changes with:
  - visual smoke check on desktop and mobile widths
  - links and form behavior checks
  - HTML/CSS/JS sanity checks

## Change Discipline
- Do not add frameworks or build tooling without explicit approval
- Do not break existing Formspree or Calendly flows
- Keep image names descriptive for alt text and SEO
- Treat `temp_image_analysis/`, `temp_video_analysis/`, and `temp_mcp/` as non-critical scratch areas

## Suggested Copilot Working Style
1. Gather context from `index.html`, `css/styles.css`, and `js/main.js`
2. Propose minimal, reversible edits
3. Implement with clean diffs and no unrelated refactors
4. Verify behavior in browser after each substantial change
5. Summarize user impact, SEO impact, and any risk

## Definition of Done for Site Changes
- Desktop and mobile render correctly
- Primary CTA paths work (call, form, scheduling)
- No regressions in page speed-critical areas
- Metadata and structured content remain coherent
- Changes are ready for Netlify deploy from `main`
