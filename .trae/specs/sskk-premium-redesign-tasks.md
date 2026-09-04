# SSKK Premium Redesign — Implementation Tasks

Dependency graph (higher id depends on lower ids):
Foundations (T1-T3) → Layout/Navigation (T4-T6) → Home sections (T7-T15) → Contact/Collections pages (T16-T17) → ProductDetail enhancements (T18) → SEO/Accessibility polish (T19-T20) → Build QA (T21)

---

## Task 1: Tailwind Design System — Editorial Tokens & Gold Restraint

**Goal:** Tighten `tailwind.config.js` and `index.css` for the premium editorial language.

**Scope:** `client/tailwind.config.js`, `client/src/index.css`

- Add/confirm design tokens:
  - Section padding: `section-padding = py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32`
  - Consistent border radii: one primary `radius-xl = 1rem / 16px`, one micro `radius-sm = 0.375rem / 6px`
  - Typography scale: heading-serif (Playfair) + body-sans (Inter) line heights: `h1 1.05, h2 1.1, h3 1.2, body 1.65`
  - Container width: `container max-w-7xl px-5 sm:px-6 lg:px-8`
  - Soft shadow tokens (non-gold) for cards: `card-shadow = 0 10px 40px -20px rgba(0,0,0,0.5)`
  - Keep existing gold-glow restrained values (0.16/0.22/0.28) + no-pulse keyframes
- Body style: `html,body, #root` → `overflow-x: hidden` globally to prevent horizontal scroll at 320px
- `touch-target` min-h 44px w44 class helper
- Respect-reduced-motion: All parallax + hero shimmer off when useUIStore.reducedMotion=true

**Test Requirements (TR):**
- **RULE** build passes after config/css edits (exit 0)
- **RULE** No pulsing gold keyframes remain (grep keyframes.gold-glow empty result)
- **RUBRIC** css_consistency (0-4, T≥3) — uniform tokens used (padding section, radii, container)

**Completion Evidence:** tsc build exit 0, grep clean, css file size diff minimal (tokens reused, not bloated)

---

## Task 2: Home Sections Manifest — Create Visual Narrative Blueprint

**Goal:** Produce ONE authoritative file mapping Home page section order, images used per section (no dupes!), and section-aria-labels.

**Scope:** Create/modify `client/src/pages/Home.tsx` section list (non-rendering skeleton first to confirm order)

**Section order & image assignments (check against 18 public images):**
1. **CinematicHero** → `HERO_VIDEO` asset (hero-desktop-poster fallback) — image unique
2. **TrustBar** (new component) → icons only, no photo — unique
3. **Categories/Collections** → reuse `CATEGORY_IMAGE_BY_SLUG` for rings/earrings/necklaces/bangles/chains/bridal/nath; **Mang Tikka** → use `JEWELRY_IMAGES.bridalSet` crop or pendantNath; **Custom Jewellery** → use `JEWELRY_IMAGES.showcase`
4. **Signature Pieces (FeaturedProducts)** → Backend API product images or fallback to the remaining unused images
5. **Bridal Heritage (BridalCollection)** → editorial 6-image asymmetric composition using bridalSet, jhumka, jhumkaAlt, haarSet, bangle, bangleAlt, pendantNath (7 bridal-relevant images → pick 6 best)
6. **Why Choose SSKK (WhyChooseUs)** → icons only; no product photo
7. **The Art Behind Every Piece (OurStory)** → `JEWELRY_IMAGES.showcase` or the jewellery commercial still from `JEWELRY_IMAGES.necklace` (wide editorial)
8. **5-step CustomerJourney** → icons only
9. **Custom Jewellery CTA (CustomCTA)** → gold gradient backdrop only; no photo (avoids repetition)
10. **Showroom Visit** → map iframe; no photo (avoids repetition)
11. **Testimonials** → icons/star glyphs only; no photo (neutral placeholder)
12. **FAQ** → no photo
13. **Enquiry (HomeInquiry)** → no photo

**Test Requirements (TR):**
- **RULE** Every image path from `/public` occurs at most ONCE across sections 1-13 (grep all image URIs output, counts all ≤ 1)
- **RUBRIC** visual_narrative (0-4, T≥3) — section flow natural rhythm: IMG → TEXT/BAR → PRODUCT GRID → EDITORIAL IMG → TEXT → ICONS → ICONS → GRADIENT CTA → MAP → TEXT → ACCORDION → FORM

**Completion Evidence:** Section list renders, screenshot confirms ordering, image grep count shows 18 unique images across all sections ≤1 occurrence each

---

## Task 3: Navbar — New Link Set + Header WhatsApp CTA

**Goal:** F-01 exact 7 nav links + add WhatsApp button into Nav actions row next to Search & Wishlist

**Scope:** `client/src/components/layout/Navbar.tsx`

- navLinks order = [Home, Jewellery (/collections), Bridal (/collections/bridal), About (/about), Our Story (/about#story), Visit Us (/contact), Contact (/contact#enquiry)]
- Mobile menu sheet: same 7 links, animated list
- Header actions row: [Search][Wishlist][**WhatsApp Gold Pill Button**][Cart?][Hamburger (mobile only)]
- WhatsApp button gold pill: `<a>` to `BUSINESS.socials.whatsapp?text=...generic...`
- Preserve existing `scrolled` transparent→glass header transition (py3.5→py2.5 + border-b-gold-400/28)
- Add scroll progress bar on top of header (if not already present via ScrollProgress component)

**Test Requirements (TR):**
- **RULE** nav_exact_links === AC list
- **RULE** whatsapp_prefilled on header button (href contains "?text=")
- **RULE** mobile menu 7 links

**Completion Evidence:** Nav rendered in DOM, links order string-equal test in devtools

---

## Task 4: Footer — 4-Column Expansion + Our Story QuickLink

**Goal:** F-18 exact footer spec

**Scope:** `client/src/components/layout/Footer.tsx`

- Col2 Navigation links = [Home, Jewellery, Bridal, About, Our Story, Visit Us, Contact]
- Col3 Collections = [Rings, Earrings, Necklaces, Chains, Bangles, Bridal, Nath]  (7 items per spec exact list)
- Col4 Contact: address (Doharighat, Mau from BUSINESS.location), phone (primary + secondary), WhatsApp (BUSINESS.socials.whatsapp), email
- Bottom bar: © 2026 Shubham Swarn Kala Kendra. All Rights Reserved. · Privacy Policy · Terms of Service

**Test Requirements (TR):**
- **RULE** footer_links_exact (col2 + col3 names match spec AC-9)
- **RULE** social icons: IG/FB/WhatsApp (preserve existing set)
- **RUBRIC** visual_consistency (0-4, T≥3) — 4-col grid responsive collapse to 1 at mobile, padding consistent

---

## Task 5: TrustBar (New Component) — Immediately Post-Hero

**Goal:** F-03 clean 5-item BIS Hallmarked trust strip.

**Scope:** New file `client/src/components/sections/TrustBar.tsx`

- Horizontal row, 5 items, thin gold vertical hairline dividers between each.
- Minimal Lucide icons (Shield, Gem, Award, Sparkles, Compass). Uppercase labels.
- Mobile: wrap 5 → auto-fit grid (2 rows on sm: 2+3 items), dividers hidden
- No cards, no background fill — just typography, icons, hairline separators.
- Export from sections/index.ts

**Test Requirements (TR):**
- **RULE** trust_items = 5 labels in BIS/CertDiam/22K18K/Craftsmanship/Custom order
- **RULE** mobile: no horizontal overflow at 320px (width check)
- **RUBRIC** spacing clean (0-4, T≥3)

---

## Task 6: CinematicHero — Exact Spec Copy + 3 CTAs

**Goal:** F-02 exact copy + CTA set + preserve existing HeroVideo component, poster fallback, triple-height chain for iOS Safari (100vh/svh/dvh)

**Scope:** `client/src/components/sections/CinematicHero.tsx`

- Eyebrow = exact "SHUBHAM SWARN KALA KENDRA" uppercase tracking-widest
- H1 line 1: "Crafted in Gold." line 2: "Designed for Your Forever."
- Subtitle = spec sentence exact
- CTAs layout: primary row: [EXPLORE JEWELLERY (gold btn /collections)] [BOOK A SHOWROOM VISIT (ghost btn /contact)]; secondary pill link: `WHATSAPP US →` gold underline text anchor
- Preserve existing parallax/reduced motion handling; no sparkle bursts (per Phase 3-2)
- Mobile crop portrait-optimized
- Height: clamp(560px, 88svh, 920px) — avoids excessive height per spec

**Test Requirements (TR):**
- **RULE** hero_copy_exact AC
- **RULE** 3 CTAs present (Explore, Book showroom, WhatsApp link)
- **RUBRIC** hero_mobile_crop (0-4, T≥3)

---

## Task 7: Categories Section — Asymmetric Editorial Grid + 9 Items (incl Custom Jewellery)

**Goal:** F-04 9 categories with asymmetric grid (not uniform 4-col)

**Scope:** `client/src/components/sections/Categories.tsx` + `CategoryCard.tsx` styling

- 9 categories: Rings · Earrings · Necklaces · Bangles · Chains · Bridal · Nath · Mang Tikka · Custom Jewellery
- Category images:
  - Custom Jewellery → `/contact#enquiry` with Category="Custom Jewellery" prefilled (NOT product query route)
  - Mang Tikka → `JEWELRY_IMAGES.bridalSet` fallback
  - Other 7 via CATEGORY_IMAGE_BY_SLUG
- Editorial asymmetric grid pattern:
  ```
  lg grid cols-12, rows-auto:
  [Bridal col-span-7 row-span-2 BIG][Rings col-span-5]
  [Necklaces col-span-5      ][Earrings col-span-3][Bangles col-span-4]
  [Mang Tikka 4  ][Chains 4  ][Nath 4]
  [Custom Jewellery col-span-12 (wide banner)]
  ```
- Card hover: image scale-104 (350ms), thin gold border fade-in, "Explore →" text appear
- Mobile: responsive grid OR horizontal snap-scroll (whichever cleaner on 320-414)
- Image loading="lazy" except first 2

**Test Requirements (TR):**
- **RULE** 9 category tiles rendered
- **RULE** Custom Jewellery links to /contact#enquiry not /collections/...
- **RUBRIC** layout_asymmetry (0-4, T≥3) — NOT uniform grid on desktop

---

## Task 8: Signature Pieces (FeaturedProducts) — Rename + Layout Polish

**Goal:** F-05 rename title/subtitle to exact spec text, keep existing React Query fetches.

**Scope:** `client/src/components/sections/FeaturedProducts.tsx` + `ProductCard.tsx` minor polish

- Section title "Featured" label → "Signature" label; title=Signature Pieces; subtitle=spec exact
- Keep existing featured → fallback to all if featured < 4 query logic (already good)
- ProductCard: confirm WhatsApp enquiry button works with `encodeURIComponent(product.name)` + API-preserved price/purity/weight (NOT fabricated)
- Keep "View All Jewellery" CTA → /collections

**Test Requirements (TR):**
- **RULE** section_title_exact matches
- **RULE** WhatsApp per-card href includes product name in ?text=
- **RULE** product price rendered only if `product.price > 0`; otherwise hide or show POE

---

## Task 9: BridalCollection — Editorial Asymmetric 6-Image Restructure

**Goal:** F-06 asymmetric NOT simple 2-col; use overlapping / masonry / 6-tile mosaic

**Scope:** `client/src/components/sections/BridalCollection.tsx`

- Images (6 selected from bridal-relevant set without repeating T2 manifest): bridalSet, jhumka, haarSet, bangleAlt, jhumkaAlt, pendantNath — each image appears exactly once
- Mosaic grid pattern:
  ```
  [ 1 (big col-7 row-2) ][2 col-5]
  [                     ][3 col-5 row-1]
  [4 col-4][5 col-4][6 col-4]
  ```
- Text side: Bridal Heritage title, subtitle exact, list of pieces (Necklaces · Earrings · Maang Tikka · Nath · Bangles · Bridal Sets) as chips
- CTA: "Explore Bridal Collection" → /collections/bridal
- Subtle parallax only on the large image tile; disable on reduced-motion

**Test Requirements (TR):**
- **RULE** 6 bridal images rendered (no duplicate between this and Categories section bridalSet — that's okay, Categories section only shows ONE thumbnail tile for Bridal category; Bridal section shows DETAILED mosaic — spec allows same source image when used for different purposes at significantly different crops/sizes)
- **RUBRIC** bridal_editorial (0-4, T≥3) — asymmetric, NOT 6 simple equal cards

---

## Task 10: WhyChooseUs — Rewrite to EXACT 6 Items (Numbered 01-06)

**Goal:** F-07 6 items as specified; 3x2 grid; insert into Home after Bridal section (Home.tsx)

**Scope:** `client/src/components/sections/WhyChooseUs.tsx` + `Home.tsx` render insert

- Feature list (order & copy EXACT):
  1. 01 BIS Hallmarked Gold — Every piece certified.
  2. 02 Certified Diamonds — Graded stones with full disclosure.
  3. 03 Expert Craftsmanship — Meticulous finishing by hand.
  4. 04 Transparent Pricing — Clear gold-rate + making-charge model.
  5. 05 Custom Jewellery — Personalised designs tailored to you.
  6. 06 Personalised Service — Dedicated expert for every visit.
- Grid 1 col (mobile) → 2 col (md) → 3 col (lg)
- Minimal Lucide icons per tile; numbered "01..06" in small serif gold text above each title

**Test Requirements (TR):**
- **RULE** why_sskk_six === AC-14 list
- **RULE** rendered on Home page between Bridal section and OurStory

---

## Task 11: OurStory Component (New) — Editorial Split 1:1

**Goal:** F-08 Our Story split layout + About page #story anchor

**Scope:** New file `client/src/components/sections/OurStory.tsx` + `client/src/pages/About.tsx` insert `id="story"` heading + Home.tsx render

- Left column (image): `JEWELRY_IMAGES.showcase` or `JEWELRY_IMAGES.necklace` wide 5:4 aspect
- Right column (text): 
  - eyebrow: "THE ART BEHIND EVERY PIECE"
  - h2: "The Art Behind Every Piece"
  - Body: 2 short paragraphs max (not long blocks). Neutral craftsmanship copy.
  - CTA: "Discover Our Story →" → /about#story (link)
- About.tsx: add id="story" to the same component or duplicate the editorial block on About page as hero

**Test Requirements (TR):**
- **RULE** OurStory CTA links to /about#story
- **RULE** About page renders this section with id=story (so in-page anchor scroll works)
- **RUBRIC** editorial_split (0-4, T≥3) — NOT card style, text+image asymmetric with whitespace

---

## Task 12: CustomerJourney (New Component) — 5-step Discover → Celebrate

**Goal:** F-09 horizontal or vertical flow with lines, numbered 01-05

**Scope:** New file `client/src/components/sections/CustomerJourney.tsx`

- Steps EXACT order + copy:
  01 Discover — Explore our collections.
  02 Consult — Speak with our jewellery experts.
  03 Customize — Create a design tailored to you.
  04 Craft — Our craftsmen bring it to life.
  05 Celebrate — Wear something made for your story.
- Layout: desktop horizontal timeline with vertical hairline connectors; mobile: vertical stack with left rail
- Framer Motion reveal on scroll
- Icon per step: `Sparkles / MessageCircle / PenTool / Gem / PartyPopper` or similar 5 distinct Lucide

**Test Requirements (TR):**
- **RULE** journey_five_steps exact (AC)
- **RULE** reduced-motion disables scroll-reveal animation → renders immediately

---

## Task 13: CustomCTA Banner (New Component) — Full-Bleed Gold Gradient

**Goal:** F-10 Custom Jewellery CTA

**Scope:** New file `client/src/components/sections/CustomCTA.tsx`

- Full-bleed section, dark purple→black bg with a subtle 5% gold radial gradient (NOT flashy, NOT strobe)
- Heading: "Have Something Special in Mind?"
- Subtitle: "Let our craftsmen turn your idea into a one-of-a-kind piece."
- CTAs 2 column:
  - `START YOUR CUSTOM DESIGN` → /contact#enquiry prefill category=Custom Jewellery
  - `WHATSAPP US` → wa.me with custom-design enquiry text
- White-space generous; no additional product photos needed (prevents repetition)

**Test Requirements (TR):**
- **RULE** custom_cta_copy exact match
- **RULE** first CTA includes `#enquiry` + category=Custom Jewellery parameter or scroll-anchor behaviour

---

## Task 14: Testimonials Component (New, Safe Structure) + FAQ Accordion (New)

**Goal:** F-12 Testimonials neutral-safe editable structure + F-13 7-question FAQ

**Scope:** New files `client/src/components/sections/Testimonials.tsx` + `client/src/components/sections/FAQ.tsx`

Testimonials:
- Component with Framer Motion carousel
- Placeholder slide explicitly marked "EDITABLE: Add customer testimonials here" as label + neutral example marked "EXAMPLE". No "real" names that look genuine.
- Star glyphs + quote icon lucide
- Dots + Prev/Next arrows

FAQ:
- Framer Motion smooth accordion
- 7 questions EXACT spec order
- Answers concise (1-2 sentences), truthful to BUSINESS.ts data
- Chevron rotate expand icon

**Test Requirements (TR):**
- **RULE** testimonials_safe (AC): no real looking name/city without data source
- **RULE** faq_seven_items (AC)
- **RULE** accordion keyboard accessible (enter/space toggles)

---

## Task 15: Showroom Section (Home) — Enhance per F-11

**Goal:** F-11 enhance existing Home showroom section.

**Scope:** `client/src/pages/Home.tsx` existing showroom block

- Restyle existing address/phone/hours cards into ONE cohesive location block (no 3 separate cards — combine into a single block)
- Map iframe uses EXISTING BUSINESS.googleMapsEmbed
- Buttons row: [GET DIRECTIONS → Google Maps search URL] [CALL US → tel:] [WHATSAPP US → wa.me]
- Title: "Visit SSKK in Doharighat" (exact)
- Mobile: stack location block above map; map responsive 16:9

**Test Requirements (TR):**
- **RULE** three_buttons_exist (Directions / Call / WhatsApp) with correct href protocols
- **RULE** map renders within container at 320px without horizontal overflow

---

## Task 16: Contact Page — Enhanced Form per F-14 (Dropdown + Validation)

**Goal:** F-14 enhanced Contact/Enquiry form + preserve API submit

**Scope:** `client/src/pages/Contact.tsx` + `/contact` scroll anchors #enquiry + #visit

- Section `id="enquiry"` for form; showroom section existing `id="visit"` (or #visit-us anchor from nav links)
- Form:
  - Name (required, string min 2)
  - Phone (required, digits + 10-12 chars validation)
  - Email (optional, email pattern)
  - Jewellery Category dropdown (7 options EXACT F-14 list)
  - Message (required min 10 chars)
- Preserve existing api POST `/inquiries` call + react-hot-toast success/error
- Side column (form right on desktop, below on mobile): WhatsApp · Call · Visit Showroom quick action cards
- Add accessible labels; error states inline

**Test Requirements (TR):**
- **RULE** form_fields_exact (AC-15)
- **RULE** api_submit: POST to /inquiries endpoint preserved
- **RULE** nav "Visit Us" link → /contact; nav "Contact" → /contact#enquiry anchors work

---

## Task 17: Collections Page — Filter/Sort Controls (New)

**Goal:** F-17 Collections page sidebar or top filter bar

**Scope:** `client/src/pages/Collections.tsx`

- Filter bar (desktop top, mobile collapsible):
  - Category dropdown (from categories API)
  - Gold purity chips (if product.goldPurity non-empty)
  - Price slider ONLY if min/max price>0 from API returned products
- Sort dropdown EXACT options: Newest (sort=-createdAt), Featured (sort=-featured), Price Low→High, Price High→Low
- Preserve existing URL params (search query param from SearchOverlay navigate `/collections?search=...` — still works)
- Reset filters button

**Test Requirements (TR):**
- **RULE** 4 sort_options_exact
- **RULE** search? query param pre-fills search bar & filters

---

## Task 18: ProductDetail — Enhance Gallery (Swipe/Zoom)

**Goal:** F-16 ProductDetail enhancements (non-breaking)

**Scope:** `client/src/pages/ProductDetail.tsx`

- Gallery: Framer Motion swipe gestures on mobile between main images; pinch-zoom visual affordance (scale hover on desktop)
- Keep existing thumbnail strip; no `shadow-gold-glow` (already fixed in Phase 3-2)
- Related jewellery + "You may also like" preserved
- WhatsApp enquiry prefill: include name+SKU if slug available

**Test Requirements (TR):**
- **RULE** product_route /product/:slug still works (App.tsx route preserved)
- **RULE** no fabricated data; only fields from Product type rendered

---

## Task 19: SEO & OG Update — Spec Title/Description/Structured Data

**Goal:** F-20 + NFR-04

**Scope:** `client/src/config/seo.ts` + `client/index.html` head meta + `SEO.tsx` component

- Default PAGE_SEO.home = title EXACT spec: "Shubham Swarn Kala Kendra | Premium Gold & Diamond Jewellery"
- Default meta description EXACT spec text
- OpenGraph + Twitter Card meta tags via SEO component; canonical URL from SITE_URL
- LocalBusiness schema object → buildLocalBusinessSchema function (create if missing): uses BUSINESS.ts fields (name, address, telephone, geo if present)
- Image alt text preserved consistently across all components (no empty alt)

**Test Requirements (TR):**
- **RULE** seo_title_exact on home page default
- **RULE** structured data JSON-LD present in SEO component with @type=JewelryStore|LocalBusiness using BUSINESS.ts

---

## Task 20: Accessibility Pass

**Goal:** F-20 NFR

**Scope:** Cross-file a11y cleanup

- Every `<section>` has aria-label; one h1 per page
- All buttons have aria-label
- Color contrast: cream text on black / gold text on black passes WCAG AA (4.5:1); muted text minimum 10:1
- Focus rings: custom outline gold
- Tab order: header → hero → sections → footer (logical)
- Reduced motion: all framer-motion variants check `useUIStore().reducedMotion` and disable animations, return static opacity=1

**Test Requirements (TR):**
- **RULE** sections_with_aria: all 13 home sections have aria-label
- **RULE** reduced_motion: parallax + scroll-reveals disabled when mq prefers-reduced-motion matches
- **RUBRIC** a11y (0-4, T≥3)

---

## Task 21: Final Build QA + Zero Horizontal Overflow Check

**Goal:** NFR-01, NFR-02, all build quality

**Scope:** Run build, visual QA at all widths

- Execute `cd client && npm run build` → exit 0
- `GetDiagnostics` → empty array
- 320px width test: open page, scroll horizontally → 0px overscroll
- 375, 390, 414, 768, 1024, 1280, 1440, 1920: visual sanity no clipped text
- All interactive buttons: click → navigate / open (not # placeholder unless used intentionally for state)
- Grep console for errors in devtools output (logs clean)
- Run final pass against the 25-point Acceptance Criteria

**Test Requirements (TR):**
- **RULE** build_pass (AC)
- **RULE** routes_preserved (AC-3 string compare against original App.tsx paths)
- **RULE** tsc_noUnused (AC-2)
- **RULE** zero_horizontal_overflow (AC-5)
- **RULE** no_fake_content (AC-6)
- **RUBRIC** final_quality (0-4, T≥3) — average of all rubrics

---

## Implementation Queue Summary (by priority & dependency):

1. **HIGH P0** — MUST complete: T1 (design tokens), T3 (navbar), T4 (footer), T5 (trust bar), T6 (hero), T10 (why_sskk), T16 (contact form), T21 (build QA)
2. **HIGH P1** — critical: T2 (section manifest), T7 (categories 9 items), T8 (signature), T9 (bridal), T11 (our story), T15 (showroom)
3. **MEDIUM P2** — important: T12 (journey), T13 (custom CTA), T14 (testimonials + FAQ), T17 (collections filter), T18 (product gallery)
4. **MEDIUM P3** — polish: T19 (SEO meta), T20 (accessibility pass)

All tasks have explicit RULE + RUBRIC test requirements; no task is open-ended.
