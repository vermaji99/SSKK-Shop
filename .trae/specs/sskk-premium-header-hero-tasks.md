# SSKK Part 2 — Premium Header + Hero: Implementation Tasks

**Context:** Implement Part 2 of the redesign: Header (sticky, transparent→scrolled) and Hero (editorial luxury composition). Scope: `Navbar.tsx`, `CinematicHero.tsx`, and related CSS `index.css` tweaks only.

## Task 1: Navbar — Refined Sticky Header

**Status:** pending
**Priority:** high
**Maps AC:** AC-H-1, AC-H-2, AC-H-3, AC-H-4, AC-H-5, AC-H-6
**Depends on:** none

### Scope
File: `client/src/components/layout/Navbar.tsx`
(No deletions of wishlist/cart icons required; keep them but not oversized.)

### Sub-work
1. **Scroll threshold:** Change `handleScroll` threshold from `> 40` to `> 24` (earlier but smooth).
2. **Two states — scrolled:**
   - Background: dark premium `glass` class `rgba(11,5,19,0.74)`, `backdrop-filter: blur(20px) saturate(145%)`.
   - Bottom border: thin `rgba(212,175,55,0.18)` (not too thick).
   - Reduce scrolled py slightly (from 2.5/3 → 2/2.5 for more compact premium feel).
3. **Two states — pre-scroll:**
   - Fully transparent `bg-transparent`.
   - Brand text must still read over hero video — keep current `text-gold-gradient` serif.
4. **Nav links (lg:):**
   - Exact list order: HOME, JEWELLERY, BRIDAL, ABOUT, OUR STORY, VISIT US, CONTACT.
   - Uppercase, tracking in `0.18em`–`0.24em` range.
   - Active state gold text + gold underline via `.nav-underline.is-active`.
   - Links NOT oversized: reduce lg gap if needed (keep xl max, lg a touch tighter).
5. **Right cluster:**
   - Search → `toggleSearch()` from UIStore.
   - Wishlist (heart, with badge) — keep.
   - WhatsApp pill (gold gradient) from `md:` visible at desktop; use `HEADER_WHATSAPP_URL`.
   - Cart (bag, with badge) — keep.
   - Divider + Mobile menu toggle `< lg:`.
6. **Mobile menu:**
   - Fullscreen, `lg:hidden`.
   - Links staggered entrance, `min-h-[56px]` per link, `touch-target`.
   - Close on link click.
   - X icon when open.
   - Optional bottom triple of wishlist/cart/call tiles (already exists — keep).
7. **Safe area:** `padding-top: max(calc(env(safe-area-inset-top)+X), X)` — ensure both states account for notches.

### TRs — task-local

| ID | Type | Statement | Pass condition |
|---|---|---|---|
| T1-R1 | rule | Scroll threshold triggers at 24px | `handleScroll` uses `window.scrollY > 24` |
| T1-R2 | rule | Scrolled state = glass + blur + thin gold border | Classes applied contain glass, backdrop blur, `border-b border-gold-400/[0.18]` equivalent |
| T1-R3 | rule | Pre-scroll state = transparent no-border | `bg-transparent`, no `border-b` (or `border-transparent`) |
| T1-R4 | rule | Links = HOME / JEWELLERY / BRIDAL / ABOUT / OUR STORY / VISIT US / CONTACT in exact order | `navLinks` array matches exactly with right paths |
| T1-R5 | rule | Links uppercase, tracking 0.18–0.24em | Class list / style declares uppercase + tracking within range |
| T1-R6 | rule | Search triggers `toggleSearch` | onClick handler calls `toggleSearch` from uiStore |
| T1-R7 | rule | WhatsApp uses `HEADER_WHATSAPP_URL` | href attribute equals the const |
| T1-R8 | rule | Mobile toggle below lg only | Container toggle has `lg:hidden` (or equivalent) |
| T1-R9 | rule | Mobile min-h 56 per nav link | Mobile `<Link>` blocks declare `min-h-[56px]` OR `py-4` equivalent |
| T1-R10 | rule | Clicking mobile link closes menu | Link onClick calls `closeMobileMenu` |
| T1-R11 | rule | Safe-area padding-top present | Header `paddingTop` style uses `env(safe-area-inset-top)` |
| T1-R12 | rubric | Scrolled-state elegance (AC-HRQ-2) | Score ≥3 / 4 — rationale + screenshot class list |

### Completion Evidence
- File diff for Navbar.tsx lines 54–210 header block & 212–337 mobile menu block.

---

## Task 2: CinematicHero — Editorial Luxury Composition

**Status:** pending
**Priority:** high
**Maps AC:** AC-HR-1, AC-HR-2, AC-HRQ-3, AC-HRQ-4, AC-HRQ-5
**Depends on:** Task 1 (but can develop in parallel; read-only no conflict)

### Scope
File: `client/src/components/sections/CinematicHero.tsx`
CSS tweaks in `client/src/index.css` only for new hero editorial helper classes if required.

### Sub-work
1. **Hero media pipeline:**
   - Use the existing `/hero-video/hero-desktop.{webm,mp4}` + poster.
   - Mobile: `/hero-video/hero-mobile.{webm,mp4}` + poster.
   - Fallback: `/hero-frames/frame_006.jpg` poster fallback via existing HeroVideo.
   - Switch CinematicHero `mp4SrcOverride` to `null` to fall through to the base HeroVideo default paths (do not use commercial video).
2. **Editorial left-biased column — desktop:**
   - Container `container` with explicit left text column; NOT centered.
   - Eyebrow: uppercase `SHUBHAM SWARN KALA KENDRA` (BUSINESS.name), letter-spacing ~0.32em, small size, gold.
   - Immediately followed by a thin **gold hairline rule** (48–64px wide, 1.5–2px, `rgba(212,175,55,0.52)`) as visual anchor (this destroys AI-template feel).
   - H1: two-line block. First line `Crafted in Gold.` then hard `\n` to render `Designed for Your Forever.` on a second line.
     - Use Playfair / Cormorant as already declared by `.editorial-h1`.
     - Gold sheen + gradient text.
     - Drop cap-style visual: make line 1 SLIGHTLY heavier/fuller visually — no extra markup required, the line break is enough.
   - Support text — **cream** color, ~0.78 opacity on the cream scale (readability above video vignette), 16–18px md+, ~1.65 line-height.
   - Location line (MapPin + Doharighat, Mau, UP) — muted cream, ~12–13px, below support.
3. **CTAs — exact text, exact order, strong hierarchy:**
   - 1 PRIMARY `EXPLORE JEWELLERY` → gold gradient `variant="primary" size="lg"` → `/collections`
   - 2 SECONDARY `BOOK A SHOWROOM VISIT` → outlined / bordered gold `variant="secondary"` (invert fill) → `/contact#visit`
   - 3 ADDITIONAL `WHATSAPP US` → ghost/gold-outline `variant="ghost"` with MessageCircle icon → `HERO_WHATSAPP_URL`
   - Layout md+: row wrap with consistent gap (1rem+) but NOT evenly distributed; primary slightly more visual weight via size.
4. **Entrance choreography (calm):**
   - `reducedMotion` gates everything: use `useReducedMotion` + existing `useUIStore reducedMotion`.
   - Timeline order (desktop reference, delays scale down in reduced-motion):
     - T+0.15s — eyebrow fades in y+8.
     - T+0.30s — hairline rule `scaleX(0→1)` anchored left.
     - T+0.45s — H1 line 1 blur+translate.
     - T+0.62s — H1 line 2 blur+translate.
     - T+0.95s — supporting text y+6 fade.
     - T+1.15s — location line subtle fade.
     - T+1.35s — 3 CTAs stagger: primary first +18 y fade, secondary +0.08s later, WhatsApp +0.08s later.
   - All durations 0.8–1.1s, easing `cubic-bezier(0.22, 1, 0.36, 1)` (premium soft-out).
5. **Vignette refinements:**
   - Darken bottom-left slightly more for editorial readability on the left text column.
   - Keep the existing radial vignette; add a subtle left-to-right dark-to-brighter gradient if video has brighter detail on the right (acceptable for luxury composition).
6. **Background media reveal (image reveal):**
   - Use the HeroVideo component's existing `poster → videoReady` transition (opacity). DO NOT add particles.

### TRs — task-local

| ID | Type | Statement | Pass condition |
|---|---|---|---|
| T2-R1 | rule | Media from project `/hero-video/hero-desktop*` and `/hero-video/hero-mobile*` (NOT commercial override) | `HeroVideo` props `mp4SrcOverride` is `null` / omitted and `webmSrcOverride` is `null` / omitted so defaults flow |
| T2-R2 | rule | Exact headline two lines: `"Crafted in Gold.\nDesigned for Your Forever."` | H1 inner text exactly matches including the line break |
| T2-R3 | rule | Supporting text exactly: `"Timeless jewellery crafted with precision, passion and trusted craftsmanship in Doharighat, Mau."` | `<p>` inner text exactly matches |
| T2-R4 | rule | Primary CTA text uppercase `EXPLORE JEWELLERY` → `/collections` | Text & `to=` attribute match |
| T2-R5 | rule | Secondary CTA text uppercase `BOOK A SHOWROOM VISIT` → `/contact#visit` | Text & `to=` attribute match |
| T2-R6 | rule | WhatsApp CTA `WHATSAPP US` → `buildWhatsAppUrl(WHATSAPP_PREFILLS.hero)` | Text & href match |
| T2-R7 | rule | Hairline gold rule present in hero copy column | A `<div>` / `<span>` rendering `height:1.5–2px`, width 48–64px, gold-tinted background exists in the editorial column after eyebrow |
| T2-R8 | rule | Editorial column left-biased, NOT horizontally centered | Text container has `justify-start` and no centering on `≥md` |
| T2-R9 | rubric | Editorial campaign feel (AC-HRQ-3) | Self score ≥3 /4 with rationale |
| T2-R10 | rubric | Typographic polish + contrast (AC-HRQ-4) | Self score ≥3 /4 with rationale |
| T2-R11 | rubric | Cinematic motion restraint (AC-HRQ-5) | Self score ≥3 /4 with rationale |

### Completion Evidence
- File diff for CinematicHero.tsx (lines ~28–168 section block, all motion + JSX).
- If any new CSS utility classes are added, diff for index.css under a clearly-scoped `/* hero editorial */` block.

---

## Task 3: Mobile Safety & Height Stability

**Status:** pending
**Priority:** high
**Maps AC:** AC-HR-3, AC-HR-5, AC-HRQ-6
**Depends on:** Task 2 (same file — complete together)

### Scope
Same files as Task 2. Pure refinement.

### Sub-work
1. **Hero height chain:**
   - `.hero-section-height` already has triple chain; add a max-height clamp per breakpoint (no >100svh on desktop lg, max ~980px). (This may already exist — verify and tune if required.)
2. **Headline size clamp mobile:**
   - Ensure `.editorial-h1` on mobile (≤640px) caps so two lines combined never exceed ~52% of hero height. (Check `clamp()` sizes; if too aggressive add `max-w-[95vw]` + `hyphens: auto` fallback. NEVER allow the H1 to force CTAs off viewport.)
3. **CTA stack mobile:**
   - `< 640px`: CTAs render as column. Each button width: `w-full` or `min-w-full` with consistent gap ≥`12px`.
   - NO inline `sm:flex-row` below `sm`; ensure `flex-col` as base.
4. **Button text safety:**
   - WhatsApp: icon + `WHATSAPP US` — mobile must not wrap into two lines; if wrapping occurs, make font size slightly smaller or switch to icon on far left then text.
5. **Horizontal scroll test:**
   - Load Home page mobile viewport 375×667, 390×844; use DevTools element metrics — hero must not cause a horizontal overscroll.
6. **Performance:**
   - Hero video posters load `eager` (already set); video itself only plays via idle-tick scrub or hover. Mobile remains battery-friendly via `prefersHover: false` branch.

### TRs

| ID | Type | Statement | Pass condition |
|---|---|---|---|
| T3-R1 | rule | Triple height chain active (100vh → 100svh → 100dvh) | `.hero-section-height` CSS block retains 3-declaration chain `height: 100vh; 100svh; 100dvh;` |
| T3-R2 | rule | Min height per breakpoint: `<sm 480`, `≥sm 640`, `≥md 720`, `≥lg clamp(800,92svh,980)` | Media queries declare these mins |
| T3-R3 | rule | `<sm:` CTAs stack as column, full-width each | Base CTA container `flex-col`; buttons have `w-full` |
| T3-R4 | rule | No CTA button text wrap to 2 lines on 375w viewport | Visual assertion: WhatsApp, Explore, Book all single-line |
| T3-R5 | rule | H1 two lines ≤ 52% of hero height on 375×667 | Ratio computed / inspected |
| T3-R6 | rule | No horizontal scroll triggered by hero | `document.documentElement.scrollWidth == clientWidth` at 375 |
| T3-R7 | rubric | Mobile cohesion (AC-HRQ-6) | Self score ≥3 /4 with rationale |

### Completion Evidence
- Adjustments to the CTA stack JSX + any index.css helpers.

---

## Task 4: Build & Typecheck Verification

**Status:** pending
**Priority:** high
**Maps AC:** AC-B-1, AC-B-2
**Depends on:** Tasks 1–3 completed

### Sub-work
1. Run `cd client ; npm run lint` → `tsc --noEmit`.
2. Run `cd client ; npm run build`.
3. If errors, resolve and loop.
4. If no errors, record outputs.

### TRs
| ID | Type | Statement | Pass condition |
|---|---|---|---|
| T4-R1 | rule | `tsc --noEmit` exits 0 | Exit code 0, no stderr error block |
| T4-R2 | rule | `npm run build` exits 0 | Exit code 0, vite build success output printed |

### Completion Evidence
Terminal capture with exit codes.
