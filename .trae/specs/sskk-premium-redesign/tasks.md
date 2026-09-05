# SSKK Part 1 — Implementation Tasks

## Overview
All tasks focus on Foundation clean-up: bug fixes, Design System tokens, component consistency, Home placeholder removal, zero-duplicity trust consolidation. No new section content implementations (that is later phases).

Dependency order: T1 (runtime bugs & Home clean-up → highest priority → T2 Design System Tailwind tokens → T3 component fixes → T4 remaining consistency/SEO/accessibility.

---

## Task 1: Runtime Bug Fixes + Home Zero-Duplicity Cleanup
**Status: pending**
**Priority: high**
**Depends on:** none
**Blocks:** T2, T3, T4, T5, T6, T7, T8, T9, T10, T11

### Objective
Fix the critical undefined PlaceholderTrustBar render bug. Remove 6 placeholder sections and WhyChooseUs from Home.tsx render per zero-duplicity project_memory mandate. Render correct TrustBar immediately after Hero only.

### Scope
- Files: `client/src/pages/Home.tsx` (only)
- **Remove undefined ref:** PlaceholderTrustBar → replace with `<TrustBar />` import → render immediately after `CinematicHero`
- **Remove from Home render (not delete component files):**
  - WhyChooseUs section + 6 placeholder components (OurStory, CustomerJourney, CustomCTA, Showroom, Testimonials, FAQ) — delete Placeholder component functions from Home.tsx file as they are only there as scaffolding — not used elsewhere.
- Home sections order AFTER Task 1 render:
  1. CinematicHero
  2. TrustBar
  3. Categories
  4. FeaturedProducts
  5. BridalCollection
  6. HomeInquiry
  7. InquiryModal (keep modal)

### Test Requirements (TRs)
#### RULE Type (TR)
- TR-1.1: Rule — `Home.tsx` renders `TrustBar` (correct component not undefined placeholder reference). `tsc --noEmit` passes 0 TS errors. 0 undefined references.
- TR-1.2: Rule — Grep Home.tsx: zero occurrences of `Placeholder` (all 6 PlaceholderX skeleton components removed from file).
- TR-1.3: Rule — Zero-duplicity: Home.tsx does NOT import/render `WhyChooseUs`. Only `TrustBar` as trust section.
- TR-1.4: Rule — Home sections count: Hero, TrustBar, Categories, Featured, Bridal, HomeInquiry. No scaffold/placeholder rendering.

#### RUBRIC Type
- RU-1.1: Home visual polish (0-2): 0 = still render placeholders; 1 = placeholders removed but render order jarring; 2 = clean ordered render with zero placeholders → threshold ≥ 2

**Completion Evidence:**

---

## Task 2: Tailwind Design System — Color, Typography, Spacing, Container Foundation
**Status: pending**
**Priority: high**
**Depends on:** T1
**Blocks:** T3, T4, T5, T6, T7, T8, T9, T10, T11

### Objective
Formalize complete Luxury Design System tokens in `tailwind.config.js`: unified fluid typography scale, verified color tokens, spacing scale, 1440/1920 container breakpoints support. Remove conflicting `.container` CSS utility from `index.css`.

### Scope
Files: `client/tailwind.config.js` + `client/src/index.css`

#### tailwind.config.js extends:
- **theme.extend.fontSize** (add key — missing currently):
  ```
  display: clamp(3.5rem, 8.5vw, 7rem) with leading 1.02 tracking -0.024em
  h1: clamp(2.5rem, 6.2vw, 5.5rem) leading 1.04 tracking -0.02em
  h2: clamp(2rem, 4.5vw, 3.875rem) leading 1.08 tracking -0.016em
  h3: clamp(1.5rem, 3.1vw, 2.5rem) leading 1.15 tracking -0.01em
  'body-lg': clamp(1.05rem, 1.42vw, 1.25rem) leading 1.65
  body: clamp(0.95rem, 1.18vw, 1.0625rem) leading 1.65
  small: clamp(0.8125rem, 0.98vw, 0.9375rem) leading 1.5
  label: clamp(0.6875rem, 0.92vw, 0.8125rem) leading 1.4 tracking 0.14em uppercase
  button: clamp(0.75rem, 0.98vw, 0.875rem) leading 1 tracking 0.16em uppercase
  ```
- **theme.extend.spacing** (ensure 4/8px multiples: 4.5 (18px), 5.5 (22px), 6.5 (26px), 7.5 (30px), 8.5 (34px), 9.5 (38px), 10.5 (42px), 11.5 (46px), 12.5 (50px), 13 (52px), 14 (56px), 15 (60px), 16 (64px), 17 (68px), 18 (72px), 19 (76px), 21 (84px), 22 (88px), 25 (100px), 26 (104px), 30 (120px), 31 (124px), 34 (136px), 38 (152px), 46 (184px), 50 (200px), 62 (248px), 70 (280px), 88 (352px), 100 (400px), 104 (416px), 108 (432px), 112 (448px), 116 (464px), 120 (480px), 128 (512px), 144 (576px), 160 (640px), 200 (800px)
- **theme.extend.screens** — Update container screens: keep sm, md, lg; update xl: 1280px (as-is); add '2xl': 1440px; add '3xl': 1920px
- **theme.extend.container.screens — match screens to match screens above** {sm:640, md:768, lg:1024, xl:1280, '2xl':1440, '3xl':1920}
- **theme.extend.boxShadow — Enforce luxury restraint: gold-glow → 0.18 opacity; gold-glow-lg 0.22; gold-glow-xl 0.26 opacity max (not >)

#### index.css cleanup:
- Remove `.container` and `.container-tight` CSS rules (lines 299-306 currently) they conflict with Tailwind's container. Use Tailwind container only.
- Keep all other classes (.gold-gradient, .btn-primary, btn-secondary etc.) but ensure no `.container` utility collision.

### TRs (Test Requirements):
#### RULE Type
- TR-2.1: Rule — tailwind.config.js contains complete `fontSize` with display/h1/h2/h3/body-lg/body/small/label/button keys with clamp() fluid responsive.
- TR-2.2: Rule — tailwind.config.js spacing 4px/8px scale with 18px to 800px.
- TR-2.3: Rule — container screens xl 1280 / 2xl 1440 / 3xl 1920
- TR-2.4: Rule — index.css `.container` CSS rules deleted 0 occurrences.
- TR-2.5: Rule — shadow gold-glow opacity ≤0.18, lg ≤ 0.22, xl ≤ 0.26

#### RUBRIC
- RU-2.1 Design System Tokens completeness 0-3): 0 missing; 1 some; 3 complete typography+spacing+screens+shadows → threshold ≥ 2
- RU-2.2: Opacity Restraint (0-2): 0 excessive glow; 2: all opacities in spec range threshold ≥ 2

**Completion Evidence:**

---

## Task 3: Badge Component Variants Visual Distinction
**Status: pending**
**Priority: high**
**Depends on:** T1, T2
**Blocks:** none

### Objective
Empty variantStyles object is currently rendering every badge identically. Distinguish variants visually, consistent with luxury palette.

### Scope
File: `client/src/components/ui/Badge.tsx`

Implement `variantStyles`:
- **featured:** gold-gradient (class) + text-purple-900 + border-gold-400/60 (high-contrast primary callout)
- **bestseller:** background-purple-900/60 backdrop-blur + border-gold-400/40 + text-gold-300
- **new:** background-emerald-500/18 backdrop-blur-sm + border-emerald-400/40 + text-emerald-300

### TRs
#### RULE
- TR-3.1: Badge featured/bestseller/new each unique bg/text/border combination (3 distinct visual styles; inspect)
- TR-3.2: `tsc --noEmit` 0 TS errors.

#### RUBRIC
- RU-3.1 Variant clarity (0-2): 0 identical; 2 clearly visually distinct threshold ≥ 2

**Completion Evidence:**

---

## Task 4: BridalCollection Grid Layout Math Fix
**Status: pending**
**Priority: high**
**Depends on:** T1, T2
**Blocks:** none

### Objective
BridalCollection grid broken. 2 cols × 3 rows = 6 cells. First image takes 2x2=4 cells; remaining 4 images take 1 cell each = total 8 cells > 6 = overflow / broken. Fix grid definition.

### Scope
File: `client/src/components/sections/BridalCollection.tsx`

Corrected editorial grid proposal:
- Grid = grid-cols-2 lg:grid-cols-3 (mobile: 2 cols; desktop: 3 cols) with `auto-rows-[140px] md:auto-rows-[170px] lg:auto-rows-[200px]`
- Image 1 (bridalSet) = col-span-2 row-span-2 (large feature top-left)
- Image 2 (jhumkaAlt) = col-span-1 row-span-1
- Image 3 (haarSet) = col-span-1 row-span-2 (tall portrait right column desktop / col-span-1 row-span-1 mobile)
- Image 4 (pendantNath) = col-span-1 row-span-1
- Image 5 (bangleAlt) = col-span-1 row-span-1

OR alternative: grid-template `grid-cols-4` desktop with one 2x2, three 1x1 — any math-correct layout that shows 5 images without overflow, responsive & editorial.

### TRs
#### RULE
- TR-4.1: Grid cell math correct: N cols × N rows ≥ sum individual image cells. All 5 images fully visible, no clipping.
- TR-4.2: Mobile (<640px) 2-column grid layout works. No horizontal overflow. DevTools at 320/375/390/414 no overflow.
- TR-4.3: 1024px+ works as editorial asymmetric layout.

#### RUBRIC
- RU-4.1 Editorial Quality (0-2): 0 broken layout; 2 visually pleasing asymmetric threshold ≥2

**Completion Evidence:**

---

## Task 5: Button System Unification (Component + CSS Consistency)
**Status: pending**
**Priority: medium**
**Depends on:** T1, T2
**Blocks:** none

### Objective
Button.tsx component classes and CSS `.btn-primary` / `.btn-secondary` classes define overlapping padding, letter-spacing. Unify so Button component is the source of truth for button styling; keep CSS classes but ensure they do not produce inconsistent buttons when used via className vs `<Button variant>`.

### Scope
Files: `client/src/components/ui/Button.tsx` + `client/src/index.css` (btn-primary/secondary only, not removing them)

- Button.tsx `sizeClasses` align to Tailwind size: sm=px-5 py-2.5 text-[11px]; md=px-7 py-3 text-xs; lg=px-8 sm:px-10 py-3.5 sm:py-4 text-[13px]
- Button.tsx `variantClasses`: Ensure 'primary' exactly matches gold-gradient text-purple-900 uppercase tracking-wider
- index.css `.btn-primary`, `.btn-secondary` must use the same px/py/letterspacing values
- Ensure the Button component `whileHover y:-2` uses duration / easing consistent with CSS transitions.

### TRs
#### RULE
- TR-5.1: Button primary variant lg has same padding, font-size, letter-spacing independent of usage (Button component vs .btn-primary class string). Inspect DOM: rendered `<button>` or `<a>` with identical styles both paths.
- TR-5.2: All 4 variants (primary / secondary / ghost / outline-gold) render in Button.tsx without TS errors. 4 distinct visual outputs.
- TR-5.3: tsc noEmit 0 errors.

#### RUBRIC
- RU-5.1 Button Coherence (0-2): 0 inconsistent; 2 identical rendering both paths threshold ≥2

**Completion Evidence:**

---

## Task 6: ProductCard Wishlist Single-Render Fix
**Status: pending**
**Priority: medium**
**Depends on:** T1, T2
**Blocks:** none

### Objective
Two wishlist buttons exist — one inside `<AnimatePresence isHovered>` + one outside `!isHovered`. On touch devices, `isHovered` is never reliable — produces UX inconsistency. Consolidate to single wishlist button that works reliably across hover + touch.

### Scope
File: `client/src/components/ui/ProductCard.tsx`

Remove duplicated wishlist:
- Keep single `<button>` wishlist always visible (top-right overlay opacity 0.75 → 1 hover)
- Keep AnimatePresence for WhatsApp enquiry overlay only (Enquire on WhatsApp reveals on hover/tap-tap)
- No duplicate rendering

### TRs
#### RULE
- TR-6.1: ProductCard wishlist button appears exactly once per card in both hover (mouse) & touch (390px devtools tap simulation). Only 1 wishlist `<button>` in DOM.
- TR-6.2: tsc noEmit 0 errors.

#### RUBRIC
- RU-6.1 Hover+Touch reliability 0-2: 0 duplicated or broken; 2 works both interactions threshold ≥2

**Completion Evidence:**

---

## Task 7: WhatsApp Prefill Consistency + FloatingContact Luxury Restraint
**Status: pending**
**Priority: medium**
**Depends on:** T1, T2
**Blocks:** none

### Objective
1) Eliminate floating inline whatsapp message encoding — every WhatsApp link uses unified `WHATSAPP_PREFILLS` from `business.ts` + `buildWhatsAppUrl` utility. 2) Remove `animate-ping` pulsing from FloatingContact desktop WhatsApp FAB. Replace with elegant subtle sheen.

### Scope
Files: `FloatingContact.tsx` + ensure `Navbar.tsx`/`Hero`/`ProductCard` already use WHATSAPP_PREFILLS correctly (verify + fix any stray)

- FloatingContact.tsx: Replace current inline `whatsappGenericMsg` encode with `WHATSAPP_PREFILLS.floating` + `buildWhatsAppUrl`
- FloatingContact.tsx desktop FAB: delete lines with `animate-ping` (`emerald-400/40 animate-ping` pulsing span). Subtle ring border only with subtle shadow.
- Verify Navbar WhatsApp button uses HEADER_WHATSAPP_URL (already present)

### TRs
#### RULE
- TR-7.1: FloatingContact.tsx uses `buildWhatsAppUrl(WHATSAPP_PREFILLS.floating)` exactly, 0 inline encodeURIComponent whatsapp message within FloatingContact file.
- TR-7.2: FloatingContact desktop a-tag children `<div>` contains ZERO `animate-ping` class. Search `animate-ping` in FloatingContact.tsx = 0.

#### RUBRIC
- RU-7.1 Luxury Restraint FAB (0-2): 0 strobing ping; 2 elegant & minimal threshold ≥2

**Completion Evidence:**

---

## Task 8: About & Contact Page Hero Visual Variation + About anchor + Title
**Status: pending**
**Priority: medium**
**Depends on:** T1, T2
**Blocks:** none

### Objective
1) Add id="story" anchor on first content section of About page (nav /about#story scrolls correctly)
2) Change About page hero H1 from "Our Showroom" → "About SSKK"
3) Distinguish About vs Contact page heroes so they are not identical purple radial gradient patterns:

### Scope
Files: `About.tsx` + `Contact.tsx`

- About.tsx:
  - Add `id="story"` attr to second section (Craftsmanship, Purity, and Personal Care section wrapper 112 or after page hero)
  - Hero H1 text replace: 'Our Showroom' → 'About SSKK'
  - Hero gradient: Keep purple base but alter radial positions + opacity (about more warm gold gradient blend radial @ 60% 40% gold, contact richer deep purple blend)
- Contact.tsx:
  - Hero gradient deeper purple less gold

### TRs
#### RULE
- TR-8.1: About.tsx contains element with id="story". URL /about#story scrolls to content.
- TR-8.2: About.tsx H1 ≈ "About SSKK" not "Our Showroom".
- TR-8.3: About.tsx hero background gradient CSS ≠ Contact.tsx hero gradient. (gradient strings visually different)
- TR-8.4: tsc noEmit 0 errors.

#### RUBRIC
- RU-8.1 Hero visual variation 0-2): 0 identical; 2 visually distinct each page threshold ≥1

**Completion Evidence:**

---

## Task 9: HomeInquiry Category Select Consistent Styling + Accessible Input/Select
**Status: pending**
**Priority: medium**
**Depends on:** T1, T2
**Blocks:** none

### Objective
HomeInquiry `<select>` category input currently inline className (lines 134-149) — not matching Contact form select styling (300-316). Both selects must use same exact className pattern from Contact for consistency + Accessibility.

### Scope
Files: `HomeInquiry.tsx` + optionally (optional) create reusable `<Select>` in Input.tsx but minimum both inline select style identical.

- Both HomeInquiry `<select>` + Contact `<select>` have identical padding/background/border/focus/hover/ring tokens (same exact className string or same Input component wrapper pattern)

### TRs
#### RULE
- TR-9.1: className select in HomeInquiry === className select in Contact.tsx (copied identical strings visual same)
- TR-9.2: tsc noEmit 0 errors.
- TR-9.3: Each select label htmlFor/id match (already yes, verify)

#### RUBRIC
- RU-9.1 Form visual coherence (0-2): 0 inconsistent; 2 identical styling threshold ≥2

**Completion Evidence:**

---

## Task 10: Navbar Luxury Restraint — Consolidate WhatsApp to one CTA
**Status: pending**
**Priority: medium**
**Depends on:** T1, T2, T7
**Blocks:** none

### Objective
Navbar currently contains inline-text WhatsApp button (gold-gradient, md+) + Mobile menu shows WhatsApp again via quick-link tile (mobile). Action row (Search, Wishlist, WhatsApp CTA, Cart, Menu) — one WhatsApp button is luxury minimal. Keep md+ desktop: one WhatsApp CTA button only. Remove duplicates.

### Scope
File: Navbar.tsx

Keep only ONE WhatsApp CTA in desktop header: keep the existing dedicated WhatsApp pill button (visible ≥ md). Ensure mobile menu 3-column grid still has WhatsApp quick-link Call/Wishlist/Cart; mobile bottom FloatingContact covers the WhatsApp quick-contact for <640px.

### TRs
#### RULE
- TR-10.1: Navbar lg action area: exactly one WhatsApp button `<a>` visible desktop viewport.
- TR-10.2: Mobile menu has WhatsApp quick-link OR FloatingContact covers it; not duplicates if redundant.

#### RUBRIC
- RU-10.1 Navbar minimalism 0-2): 0 multiple whatsapp buttons stacked; 2 single CTA clean threshold ≥2

**Completion Evidence:**

---

## Task 11: SEO Asset Cleanup + TESTIMONIALS_EDITABLE neutralization safe + Build/Typecheck
**Status: pending**
**Priority: medium**
**Depends on:** T1-T10
**Blocks:** Completion of all previous

### Objective
1. index.html OG image — ensure uses path matching assets. Keep SEO_OG_IMAGE path consistent.
2. business.ts TESTIMONIALS_EDITABLE must not accidentally propagate to live UI. Ensure empty safe array.
3. Run `tsc --noEmit` lint script + `npm run build` success without errors.

### Scope
Files: `index.html`, `business.ts`, build run

- business.ts TESTIMONIALS_EDITABLE: Keep array EMPTY if testimonials aren't rendered or replace with 0 items = `[]` (safe neutral — no fabrication).
- index.html og:image path canonical matches asset URL without spaces (ensure it's encoded properly).
- Run `npm run build` (inside client) — success with 0 TS errors.

### TRs
#### RULE
- TR-11.1: business.ts TESTIMONIALS_EDITABLE contains 0 fake reviews (length 0 or 1 clearly neutral/placeholder but safe. No fabricated names/quotes as real).
- TR-11.2: `npm run build` inside `client/` completes with exit code 0.
- TR-11.3: `tsc --noEmit` inside `client/` → 0 errors.

#### RUBRIC
- RU-11.1 Build Quality (0-2): 0 build errors; 2 clean build + no warnings threshold ≥ 1

**Completion Evidence:**

---

## Cross-Cutting Design System Visual Consistency
T2 tokens must be used: heading sizes h2/h3 via text-h2 / text-h3 utility classes available after T2 in Tailwind. Use them in SectionTitle where possible.
