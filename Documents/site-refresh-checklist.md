# Site Refresh Execution Checklist

## Phase 1 - Repo Reconciliation
- [ ] Confirm `origin/main` is the production baseline for GitHub Pages.
- [ ] Restore tracked files in the working tree to match `origin/main`.
- [ ] Preserve intentional untracked local-only directories: `.claude/`, `.copilot/`, `.github/`, `.history/`, and scratch analysis folders until reviewed.
- [ ] Remove or ignore audit artifacts that should not become part of production state.
- [ ] Re-run `git status` and verify only intentional local additions remain.

## Phase 2 - Technical SEO Baseline
- [ ] Choose and enforce one canonical host across all metadata and structured data.
- [ ] Update homepage title, meta description, canonical tag, OG tags, Twitter tags, and LocalBusiness schema URL to match the chosen host.
- [ ] Fix broken asset references and add favicon assets.
- [ ] Add `sitemap.xml` and publish it in `robots.txt`.
- [ ] Validate business facts remain consistent: phone, Las Vegas service area, Instagram, and services.

## Phase 3 - Performance and Media Cleanup
- [ ] Audit hero, gallery, and social-share imagery for size, dimensions, and format.
- [ ] Compress or replace oversized assets before adding new motion.
- [ ] Keep decorative assets out of the critical render path.
- [ ] Re-run Lighthouse and confirm performance improves from the current baseline.

## Phase 4 - Motion Direction

### Visual Direction
- Use Jitter-inspired motion as layered, editorial polish rather than spectacle.
- Favor scroll-triggered reveals, soft parallax, staggered card entrances, and badge movement.
- Keep motion in support of trust and conversion, not as a distraction from quote and call CTAs.

### Motion Placements
- Hero: subtle staggered entrance for headline, description, CTA row, and trust badges.
- About section: floating experience badge, gentle image parallax, and reveal for feature blocks.
- Services: staggered reveal grid with slight lift/settle motion instead of dead `data-aos` attributes.
- Gallery: fade and translate-in on scroll, with light hover emphasis on overlays.
- Contact: restrained reveal for form and info cards to reinforce the conversion endpoint.

### Implementation Rules
- Build a reusable reveal system in plain JS using `IntersectionObserver`.
- Define motion tokens in CSS for duration, easing, distance, and delay.
- Add `prefers-reduced-motion` handling before shipping any new effects.
- Avoid adding always-on canvas effects in the first pass.

### Three.js Decision
- Default: keep Three.js out of scope for the initial rollout.
- Optional later experiment: one lazy-loaded, desktop-only decorative scene behind the hero or between sections.
- Hard constraints if revisited: no impact to CTA usability, no blocking render, no mobile requirement, and measurable Lighthouse regression threshold of effectively zero for SEO/accessibility and minimal for performance.

## Phase 5 - Blog Architecture

### Structure
- [ ] Create `/blog/index.html` as the blog hub.
- [ ] Create `/blog/posts-data.json` for post metadata.
- [ ] Create posts at `/blog/posts/{slug}/index.html`.
- [ ] Add blog links to the homepage and sitemap.

### Page Requirements
- [ ] Reuse site header/footer styles and keep navigation consistent.
- [ ] Give each post a unique title, meta description, canonical URL, OG/Twitter tags, and `BlogPosting` schema.
- [ ] Add strong internal links from posts to homepage services and contact CTA.
- [ ] Keep layouts lightweight and image-aware for GitHub Pages delivery.

## Phase 6 - Editorial Plan

### Core Content Buckets
- Local junk removal guidance for Las Vegas homeowners and landlords.
- Clean-out prep checklists for moves, estate cleanups, and renovation debris.
- Seasonal landscaping and yard cleanup advice for desert properties.
- Demolition, hauling, and debris-removal FAQs focused on local intent.

### Initial Blog Post Ideas
- [ ] "How to Prepare for a Junk Removal Pickup in Las Vegas"
- [ ] "What to Do Before a Garage Clean Out"
- [ ] "Backyard Cleanup Tips for Las Vegas Wind and Dust Season"
- [ ] "When to Hire Help for a House Clean Out vs. DIY"
- [ ] "Tree Trimming Cleanup: What Gets Hauled Away?"
- [ ] "How Much Debris Can Be Removed in One Visit?"
- [ ] "Property Cleanup Tips Before Listing a Home in Las Vegas"
- [ ] "Estate Clean Out Checklist for Families"

### Editorial Standards
- Write for local intent first, not generic national SEO.
- Include service relevance, trust proof, and one clear CTA per post.
- Use original project photos where possible.
- Keep posts helpful and specific, with concise sections and scannable subheads.

## Phase 7 - Verification
- [ ] Validate HTML/CSS/JS after each phase.
- [ ] Run Lighthouse on homepage before and after SEO/motion changes.
- [ ] Check desktop and mobile layouts.
- [ ] Verify phone CTA and Formspree submission path.
- [ ] Validate sitemap, robots, canonical tags, and structured data on production.
