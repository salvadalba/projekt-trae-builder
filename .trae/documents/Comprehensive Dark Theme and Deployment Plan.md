## Project Audit Summary
- Static site with HTML/CSS/JS: pages in `index.html`, `projects.html`, `about.html`, `contact.html`.
- Design tokens defined in `css/main.css`; component styles in `css/components.css`; responsive rules in `css/responsive.css`.
- No explicit theme switcher; some dark-mode tweaks via `prefers-color-scheme` only.
- JS files inject inline styles (contact form, projects filter, navigation overlay) with hardcoded colors.
- No build tooling or CI/CD config; no env files; no Supabase/Sentry references.

## Theme Architecture
- Use `data-theme` on `html` to drive tokens: `html[data-theme="dark"]` and `html[data-theme="light"]`.
- Convert tokens to HSL: define `--hsl-*` bases and derive `--color-*` via `hsl(var(--hsl-*))` for better control.
- Centralize overlays, shadows, and accent tints: add `--overlay-weak/strong`, `--shadow-elev-1/2`, `--accent-1/2`.
- Keep brand tag colors but adjust their background/border tints via tokens to ensure contrast.

## Token Design (HSL)
- Background: `--hsl-background` (dark ~ `215 40% 6%`, light ~ `210 20% 98%`).
- Surface: `--hsl-surface` (dark ~ `215 30% 10%`, light ~ `210 15% 98%`).
- Text: `--hsl-text` (dark ~ `210 30% 90%`, light ~ `220 25% 15%`).
- Border: `--hsl-border` (dark ~ `215 15% 16%`, light ~ `210 20% 85%`).
- Primary: `--hsl-primary` (base accent), plus `--hsl-primary-light/dark` for hover/focus states.
- Success/Warning/Error/Info: HSL bases to ensure WCAG AA on both backgrounds.

## Theme Switching Logic
- Implement in `js/main.js` to avoid new files:
  - On load: read `localStorage.theme`; if null, detect `prefers-color-scheme` and set `data-theme`.
  - Provide a toggle button (in header) that flips `data-theme` and writes to `localStorage`.
  - Dispatch a custom event `themechange` so components can react if needed.
- No FOUC: apply a tiny inline script early in `index.html` to set `data-theme` before CSS paints.

## Accessibility & Contrast (WCAG AA)
- Use HSL math to derive text/background pairs with ≥4.5:1 (normal text) and ≥3:1 (large text).
- Add a small utility in `js/main.js` to verify contrast for primary text on background and tag pills; log warnings in dev.
- Increase hover/focus outlines to tokenized high-contrast rings; ensure focus-visible styles across components.

## Component Adjustments
- Replace explicit `white/black/rgba(255,...)` with tokenized values.
- Migrate JS inline style strings to CSS classes:
  - `js/contact-form.js`: error/success/counter styles → `.form__error`, `.form__success`, `.counter` styles in CSS, referenced via class toggles.
  - `js/projects-filter.js`: filter hover/active backgrounds/borders/shadows → CSS tokens.
  - `js/navigation.js`: overlay color → `--overlay-strong` token.
- Particles: parameterize colors to `--accent-1/2` and lower opacity for dark mode.

## Testing Strategy
- Visual & functional tests with Playwright:
  - Toggle theme and verify `html[data-theme]` + persistence across reload.
  - Ensure buttons/cards/inputs change token-driven styles (computed color snapshot).
  - Breakpoints: test common widths (375, 768, 1024, 1280); verify no contrast regressions.
- Performance tests:
  - Lighthouse CI: dark vs light theme runs; ensure good scores.
  - Web Vitals (`web-vitals` in browser) and report to console or optional endpoint.

## Deployment Architecture
- Hosting: Vercel for static assets; continuous deployment from `main` branch.
- Supabase: used for contact form backend via Edge Function:
  - Create `messages` table with RLS; Edge Function validates and inserts.
  - Client form posts to the Edge Function endpoint; no direct DB writes from client.
- Environment management:
  - `.env.local` for development; Vercel environments (`Development`, `Preview`, `Production`).
  - Vars: `SUPABASE_URL`, `SUPABASE_FUNCTIONS_URL`, `SUPABASE_ANON_KEY` (client), `SENTRY_DSN`, `DEPLOY_ENV`.

## CI/CD Pipeline
- GitHub Actions:
  - Job 1: Lint (optional), Playwright tests headless, Lighthouse CI.
  - Job 2: Deploy to Vercel with environment-specific config.
  - Artifacts: test reports (HTML/JSON) attached to build.

## Monitoring & Error Tracking
- Sentry (browser) initialized conditionally with sample rates tuned; ignore non-actionable errors.
- Performance monitoring: enable Vercel Analytics or send Web Vitals to Sentry custom metrics.

## Documentation & Deliverables
- Dark theme implementation: tokenized HSL palette, `data-theme` switching, JS persistence, component refactors.
- Deployment configuration: Vercel project settings, GitHub Actions workflow, Supabase Edge Function spec.
- Updated documentation: theme architecture overview, toggle usage, env var matrix, Supabase setup steps, CI/CD runbook.
- Testing reports: Playwright results and Lighthouse CI summaries.

## Implementation Plan (File-Level)
- `css/main.css`: add HSL tokens and map to `--color-*`; create `html[data-theme=light|dark]` blocks; replace hardcoded colors.
- `css/components.css` + `css/responsive.css`: migrate component and responsive colors to tokens; add overlay/shadow tokens.
- `js/main.js`: add theme init/toggle/persistence; contrast checks; remove inline style injections and switch to class toggles.
- `js/navigation.js`, `js/projects-filter.js`, `js/contact-form.js`: remove style strings, use CSS classes and tokens.
- HTML pages: add early theme boot script and toggle control in header.
- Deployment: add `vercel.json`, GitHub Actions workflow, Supabase function folder (reference only, or separate repo), env var docs.

Please confirm, and I’ll implement the dark theme, refactor JS styles, add theme switching with persistence, and set up Supabase + CI/CD with monitoring, then deliver reports and documentation.