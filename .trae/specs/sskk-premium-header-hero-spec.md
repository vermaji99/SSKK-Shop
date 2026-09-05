# SSKK Premium Header + Hero Section — Part 2 Specification

## 1. Problem

The current SSKK website header + hero area are functional but lack the editorial, non-template polish that a real luxury jewellery campaign demands. Within the first 3 seconds of landing, a visitor must feel:

> "This is a premium jewellery brand — not a generic storefront."

The current scroll transition, typographic contrast, and CTA hierarchy are close but need a deliberate editorial pass. Mobile typography, overflow safety, and the first-impression visual weight also need tightening.

## 2. Users & Goals

| User | Goal in first 3s |
|---|---|
| High-intent jewellery buyer in Doharighat / Mau | Trust the showroom, feel luxury, spot a primary action |
| Bridal couple / wedding shopper | See bridal focus, feel "forever" positioning, book a showroom visit |
| Mobile visitor on WhatsApp/call journey | Access contact paths without accidental overflow |
| Search engine crawler | Clean semantic structure, canonical nav, non-blocking hero media |

## 3. Scope

- **In scope:**
  - Sticky `<header>` (transparent → scrolled state) on desktop + mobile.
  - Desktop nav: HOME, JEWELLERY, BRIDAL, ABOUT, OUR STORY, VISIT US, CONTACT (all uppercase).
  - Desktop right-side: Search, WhatsApp pill, mobile menu toggle below `<lg`.
  - Full-screen mobile menu with staggered link entrance, close on navigation, large touch targets.
  - Hero section using ONLY existing project media (hero video / hero-frames poster; no new stock).
  - Hero copy:
    - Headline: `"Crafted in Gold.\nDesigned for Your Forever."` (exact two-line break).
    - Support: `"Timeless jewellery crafted with precision, passion and trusted craftsmanship in Doharighat, Mau."`
    - Primary CTA: `EXPLORE JEWELLERY` → `/collections`
    - Secondary CTA: `BOOK A SHOWROOM VISIT` → `/contact#visit`
    - Additional CTA: `WHATSAPP US` → WhatsApp prefill from `WHATSAPP_PREFILLS.hero`
  - Subtle cinematic movement (fade, reveal, entrance); particles / flashy motion explicitly excluded.
  - `prefers-reduced-motion: reduce` respected for every animation.
  - Mobile: intentional crop, no button overflow, readable text, bounded height (`100svh / 100dvh / 100vh` fallback chain, capped per breakpoint), performance-safe.
  - Verify: `tsc --noEmit` pass; `npm run build` pass.

- **Out of scope (NOT touched in this part):**
  - TrustBar, Categories, FeaturedProducts, BridalCollection, HomeInquiry, Footer.
  - Admin dashboard, auth flows, backend server, routes, DB schema.
  - Product grid re-layout, SEO meta changes outside the SEO component usage already present.
  - Replacing existing video asset with a generated one (must use existing `hero-desktop*` / `hero-mobile*` plus poster fallbacks; `Jewellery_commercial_*` allowed only if explicitly needed as a secondary source — prefer the dedicated hero-video assets first).

## 4. Constraints & Non-Goals

- **Luxury Restraint (Non-negotiable):**
  - No pulsing/strobe gold glows. `shadow-gold-glow` family opacities stay in 0.12–0.22 range.
  - No particle backgrounds, no confetti, no "aurora" gradients, no animated sparkles.
  - Subtle motion only; hero shimmer cycle must be long (12s+ gradient shimmer, 14s+ sweep per project conventions).
- **Zero Fake Content:** No new testimonials, founding dates, or stats anywhere (even in header/hero).
- **No global overflow hacks:** No `overflow-x: hidden` on `<body>`, `<html>`, or root-level containers. Use the existing `overflow-x: clip` chain.
- **Hero height stability:** Must use the existing triple chain (`100vh` → `100svh` → `100dvh`) with a sensible `min-height` per breakpoint and a max (no runaway tall sections on ultra-wide monitors).
- **Asset reuse:** Hero visual MUST come from the project's existing public folder ONLY. Prefer:
  1. `/hero-video/hero-desktop.{webm,mp4}` + poster (desktop)
  2. `/hero-video/hero-mobile.{webm,mp4}` + poster (mobile)
  3. Fallback: `/hero-frames/frame_006.jpg`
- **No navigation oversized:** Nav bar height on scrolled state should feel compact. Brand block should never push links off-center on standard laptop widths (1024–1440).
- **"AI template" feel:** Explicitly avoided — real campaigns use:
  - Off-center (left-biased) editorial text column on desktop;
  - Measured whitespace, not symmetric "hero card" padding;
  - A thin but noticeable hairline or gold rule as an anchor;
  - A specific eyebrow (brand name with precise uppercase tracking) followed by a two-line serif H1 that doesn't feel like a single block.

## 5. Assumptions & Dependencies

- Browser engines support `backdrop-filter: blur(...)` (Safari 9+, all evergreen; fall back to solid background if not).
- Lenis smooth scroll remains active; header is `fixed top-0` and uses `env(safe-area-inset-top)` for notch devices — keep that convention.
- Existing zustand stores (`useUIStore` for mobileMenu, search; `useCartStore`, `useWishlistStore`) are the contract. Do not introduce new stores.
- The `HeroVideo` component is the existing, well-tested video renderer. Wrap it, do not rewrite it. Adjust props only if media paths need to switch to the explicit `hero-video` pipeline that already exists.
- `SECTION_ID` semantics: `id="hero"` on the hero wrapper (existing). Ensure no duplicate section wrappers (already in Home via outer `<section aria-label>`; keep that or merge but not duplicate).

## 6. Open Questions

None at time of writing; requirements are explicit enough to move to Acceptance Criteria.

---

## 7. Acceptance Criteria

### ACs — `rule` (binary pass/fail)

#### Header / Navigation

- **AC-H-1 (rule):** Sticky fixed header
  - Rendered via `<header>` element with `position: fixed`, `top: 0`, correct `z-index` (≥ 50).
  - Scroll threshold: exactly `window.scrollY > 24` triggers the `scrolled` state (40px is too late for 3s impression).

- **AC-H-2 (rule):** Two visual states (transparent / scrolled)
  - Pre-scroll (`scrolled=false`): fully transparent background, no bottom border (or `border-transparent`), brand text visibly reads well over hero dark vignette.
  - Post-scroll (`scrolled=true`): dark premium backdrop `rgba(11,5,19,0.74)` + `backdrop-filter: blur(20px) saturate(145%)` + thin `border-b rgba(212,175,55,0.18)`.
  - Smooth transition between states (≥380ms, easing `cubic-bezier(0.22,1,0.36,1)`).

- **AC-H-3 (rule):** Desktop nav links (uppercase, precise set)
  - From `lg:` breakpoint onward, a horizontal `<nav>` renders exactly:
    1. HOME → `/`
    2. JEWELLERY → `/collections`
    3. BRIDAL → `/collections/bridal`
    4. ABOUT → `/about`
    5. OUR STORY → `/about#story`
    6. VISIT US → `/contact#visit`
    7. CONTACT → `/contact#enquiry`
  - Each is uppercase with tracking between `0.18em` and `0.24em`; font-weight 500.
  - Active state uses a gold text color plus the underline.

- **AC-H-4 (rule):** Right-side controls (Search + WhatsApp + Menu)
  - Search icon button triggers `toggleSearch()` from `useUIStore`.
  - WhatsApp visible as CTA from `md:` upward as a pill-shaped gold-gradient button (the inline `<a>`) or at minimum an icon+label from `lg:` up; uses `HEADER_WHATSAPP_URL`.
  - Menu (hamburger / X) toggle appears strictly below `lg:` breakpoint; controls `mobileMenuOpen` via `useUIStore`.
  - Wishlist + Cart keep their badge counts and work as before; do not remove.

- **AC-H-5 (rule):** Mobile menu covers screen, closes on nav, big touch targets
  - Below `lg:`, open state renders a full-viewport overlay.
  - All 7 links present, `min-height: 56px` each, `touch-target` compliant.
  - Clicking a link closes the menu.
  - Closing via `X` icon also works.
  - Animation: smooth (`≤0.5s`, staggered per-link); no jumps in reduced-motion.

- **AC-H-6 (rule):** Safe-area & height stability
  - Header `padding-top` uses `max(calc(env(safe-area-inset-top) + X), X)` for both states; no clipping on notch devices.

#### Hero

- **AC-HR-1 (rule):** Uses existing project media ONLY
  - Hero visual pipeline: existing `/hero-video/hero-desktop.*` + `/hero-video/hero-mobile.*` + poster + `/hero-frames/frame_006.jpg` fallback.
  - No `Unsplash`, `Pexels`, `text_to_image`, or external URLs introduced for the hero background.

- **AC-HR-2 (rule):** Exact copy, two-line headline, exact CTA verbs
  - Headline renders as two visual lines (`Crafted in Gold.` then `Designed for Your Forever.`) — DO NOT flatten to one block on `≥sm`.
  - Support text exactly as written above (Doharighat, Mau).
  - Primary CTA text is uppercase `EXPLORE JEWELLERY` → `/collections`
  - Secondary CTA text is uppercase `BOOK A SHOWROOM VISIT` → `/contact#visit`
  - WhatsApp CTA is `WHATSAPP US` → uses `buildWhatsAppUrl(WHATSAPP_PREFILLS.hero)`.

- **AC-HR-3 (rule):** Hero height triple chain (no excessive tall)
  - Height rule uses `100vh / 100svh / 100dvh` chain with min cap.
  - Breakpoint caps: `<sm: min-height: 480px`, `≥sm: min 640px`, `≥md: min 720px`, `≥lg: max clamp(800px, 92svh, 980px)`.

- **AC-HR-4 (rule):** Motion disabled under `prefers-reduced-motion`
  - Every `framer-motion` variant uses `useReducedMotion` hook OR CSS media query (already partially in place; ensure new animations also respect reduced motion).
  - CSS shimmer / sheen animations already have PRM blocks; verify no new keyframes missing PRM counterpart.

- **AC-HR-5 (rule):** Mobile: buttons no overflow, text readable, image not awkward
  - On `<640px`, CTA stack: columnar wrap (not inline-flex row).
  - All buttons fit within `container` padding (no horizontal scroll triggered on page).
  - Hero H1 size clamped so two lines never exceed hero height's ~55% reading column.
  - Video/image uses `object-fit: cover` (desktop) and the existing contain/fallback for mobile via `hero-video-contain` already in index.css — keep.

#### Build & TypeScript

- **AC-B-1 (rule):** `tsc --noEmit` inside `/client` → exit 0, 0 errors.
- **AC-B-2 (rule):** `npm run build` inside `/client` → exit 0.

---

### ACs — `rubric` (evaluative, 0–4 scale, threshold ≥3)

#### Header

- **AC-HRQ-1 (rubric):** Brand-identifying first glance (Desktop)
  - `0`: Logo nav competes; can't tell jewellery within 2s.
  - `1`: Present, but gold accents heavy-handed OR missing; feels generic.
  - `2`: Clear jewellery brand, but "luxury" reads as template.
  - `3`: Brand is present, gold accents strategic, nav is compact and balanced.
  - `4`: Within 1.5s, reads as luxury jewellery with clear showroom signal.
  - Pass threshold: ≥3.

- **AC-HRQ-2 (rubric):** Scrolled-state elegance
  - `0`: Hard visual jump; no transition.
  - `1`: Transition exists but border too thick / backdrop too fogged.
  - `2`: Works, but doesn't feel premium.
  - `3`: Smooth, restrained, premium without distraction.
  - `4`: Delightfully subtle; you feel it only when you notice the transition.
  - Pass threshold: ≥3.

#### Hero

- **AC-HRQ-3 (rubric):** Editorial campaign feel (not template)
  - `0`: Generic centered "hero card" layout.
  - `1`: Left-biased, but all elements equidistant; no visual hierarchy.
  - `2`: Good column, but copy feels blocky, buttons stacked without tension.
  - `3`: Strong left editorial column, clear hierarchy, hairline anchoring.
  - `4`: Could credibly appear in a Vogue / print jewellery campaign.
  - Pass threshold: ≥3.

- **AC-HRQ-4 (rubric):** Typographic polish (contrast, readability, balance)
  - `0`: Headline unreadable over media; or contrast too stark.
  - `1`: Readable, but sizes wrong (headline too large/small).
  - `2`: Readable, sizes OK, but no special care for sheen / cream balance.
  - `3`: Exquisite contrast (gold headline + cream support + hairline), never clashes with media.
  - `4`: Masterclass editorial typography.
  - Pass threshold: ≥3.

- **AC-HRQ-5 (rubric):** Cinematic restraint in motion
  - `0`: Flashy, flash-of-blinding-content, or particle-spam.
  - `1`: Motion present but distracting / too fast.
  - `2`: Motion OK, but out of rhythm (elements pop randomly).
  - `3`: Calm, choreographed sequence; entrance feels intentional.
  - `4`: You barely notice the motion — it simply makes the page feel alive.
  - Pass threshold: ≥3.

- **AC-HRQ-6 (rubric):** Mobile hero cohesion (crop + typography + buttons)
  - `0`: Content overflows, video crops heads, buttons cut.
  - `1`: Fits, but hero is too tall / buttons too cramped.
  - `2`: Functional, not elegant.
  - `3`: Mobile-first editorial crop, buttons readable and tappable.
  - `4`: Feels like a high-end native mobile landing experience.
  - Pass threshold: ≥3.
