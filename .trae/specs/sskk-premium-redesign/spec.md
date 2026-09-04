# SSKK Premium Jewellery Website — Redesign Specification

## Problem

The existing SSKK jewellery website has a solid technical foundation (React + Vite + TS + Tailwind + Express backend, Zustand stores, React Query, admin CMS, verified business data) but suffers from:

1. Six Home page sections are placeholders (OurStory, CustomerJourney, CustomCTA, Showroom, Testimonials, FAQ) contributing 40%+ dead visual space.
2. Hero copy and overall micro-copy still sounds generic/AI-generated rather than authentic luxury jewellery brand copy.
3. Trust/credibility signals are not consolidated into a single authoritative "pillars" narrative — WhyChooseUs and About Four Pillars overlap.
4. The CinematicHero animated letter-by-letter reveal cycles every 5.6s which feels strobey and breaks "luxury restraint".
5. WhatsApp integration exists but product-level prefilled messages lack SKU and category context.
6. WhyChooseUs (Home) duplicates the "Four Pillars of Trust" (About) → zero-duplicity violation.
7. Gold glow `gold-glow-xl` opacities (0.28) still edge into garish territory; project memory mandates 0.16–0.28 range and restraint.
8. Product detail thumbnail gallery, zoom, and fullscreen behaviour are not audited for mobile swipe and keyboard support.
9. Testimonials have zero verified review data; section must be SAFE (editable markers, no fabricated quotes).
10. No single place to audit that every link resolves, every button fires, zero console errors — a QA checklist is missing.

Goals (user perspective):
- Real customers in Doharighat / Mau land on the site and perceive SSKK as a trustworthy, established, premium local jewellery showroom they'd actually visit.
- Conversions via WhatsApp + contact form + showroom directions measurably increase.
- Admins continue to manage products/categories/inquiries without regressions.

Non-goals:
- Do NOT replace the backend, auth, admin CMS, or DB schema.
- Do NOT swap the tech stack (no Next.js migration, no new heavy libraries).
- Do NOT fabricate founding years, awards, founder quotes, reviews, or certification numbers.
- Do NOT replace real jewellery images with placeholder/generated ones; reuse every existing `JEWELRY_IMAGES` asset intelligently.
- Do NOT add the WhyChooseUs section back to Home once consolidated.

## Users

| Role | Goals |
|---|---|
| Local jewellery buyer (Doharighat/Mau) | Find bridal/everyday designs, verify trust (BIS hallmark), get directions, WhatsApp enquiry. |
| Wedding planner / gift buyer | Browse bridal sets, request custom design, see showroom hours. |
| Admin (SSKK staff) | Log in, add/edit products and categories, manage inquiries. No UX regression. |
| Search engine bot | Read LocalBusiness schema, canonical URLs, OG metadata; avoid `noIndex` on About / Contact. |

## Functional Requirements

### FR-01 Home Page Render (All Sections, No Placeholders)
Home page MUST render, in order, without placeholder panels:
1. Cinematic Hero (redesigned copy + restrained motion)
2. Trust Bar (5 pillars)
3. Collections grid (9 categories: Rings, Earrings, Necklaces, Bangles, Chains, Bridal, Nath, Mang Tikka, Custom)
4. Signature Pieces (Featured Products, 8 tiles)
5. Bridal Heritage editorial (asymmetric composition)
6. Why Choose SSKK — **SIX** numbered features (expanded & renamed)
7. The Art Behind Every Piece (Our Story split layout)
8. 5-Step Customer Journey (Discover → Celebrate)
9. Custom Jewellery CTA banner
10. Visit SSKK Showroom (address + hours + map + 3 CTAs)
11. Testimonials (SAFE: editable data markers)
12. FAQ accordion (7 questions)
13. Home Inquiry Form

### FR-02 Header / Navigation
- Top: transparent; after 40px scroll: glass + gold hairline bottom border.
- Logo renders full brand name on ≥640px, `SSKK` on <640px.
- Links: Home / Jewellery / Bridal / About / Our Story / Visit Us / Contact.
- Icons: Search, Wishlist (with count badge), WhatsApp CTA (pill on md+), Cart (badge), Hamburger (<1024px).
- Mobile nav: fullscreen glass, staggered reveal, footer contact block, 3 quick-action tiles (Wishlist/Cart/Call).
- Active page link uses gold underline (`is-active` class).

### FR-03 Hero Section (Redesigned)
- Eyebrow (uppercase, tracking 0.3em, gold): `SHUBHAM SWARN KALA KENDRA`.
- H1 (Playfair Display serif): `"Crafted in Gold.\nDesigned for Your Forever."`
- Body: `"Timeless jewellery crafted with precision, passion and trusted craftsmanship in Doharighat, Mau."`
- Primary CTA 1: `EXPLORE JEWELLERY` → `/collections`.
- Primary CTA 2: `BOOK A SHOWROOM VISIT` → `/contact#visit`.
- Secondary: `WHATSAPP US` → wa.me link with generic-but-useful prefill.
- Video: use existing `Jewellery_commercial_for_SSKK_202608271422.mp4` (desktop) + `..._202608311433.mp4` (mobile).
- Cycle animation SLOWED: shimmer 12s sweep, sheen interval 14s. No strobing.
- Triple fallback height: 100vh / 100svh / 100dvh. iOS video CSS centering.

### FR-04 Trust Bar (Immediately Below Hero)
5 items, single row ≥1024px, 2-col grid on mobile:
- BIS Hallmarked Gold (Shield icon)
- Certified Diamonds (Gem icon)
- 22K & 18K Gold (Award icon)
- Authentic Craftsmanship (Sparkles icon)
- Custom Designs (Compass icon)
Each: icon (1.25× gold) + uppercase label (11–13px, tracking 0.2em). Thin gold dividers at md+.

### FR-05 Collections Section (9 Categories)
- Title: `"Explore Our Collections"`; subtitle: real brand copy.
- 9 categories: Rings, Earrings, Necklaces, Bangles, Chains, Bridal, Nath, Mang Tikka, Custom Jewellery.
- If a category has no DB image → use `CATEGORY_IMAGE_BY_SLUG` or nearest existing asset. Never use empty image.
- Card: image (4/5), name (serif), 1-line description, "Explore →" link.
- Hover: image zoom 1.038, gold border accent, text fade.
- Desktop: 3/4-col editorial grid; mobile: ≤640px → horizontal scroll snap OR 2-col grid (no horizontal page overflow).

### FR-06 Signature Pieces (Featured Products)
- Title: `"Signature Pieces"`, subtitle: `"Timeless designs created to become part of your story."`
- Product card fields (only show IF data exists): image, name, category, goldPurity badge, weight, price, "Contact for Price".
- Each card: Wishlist heart (top-right, on-hover), View Details (entire card link), WhatsApp Enquire (bottom pill on hover).
- WhatsApp prefill for a product: `"Hello SSKK, I am interested in [PRODUCT NAME] (SKU: [product.slug]). Please share current price, purity, and availability at your Doharighat showroom."`
- "View All Jewellery" link → `/collections`.

### FR-07 Bridal Heritage Section
- Title: `"Bridal Heritage"`; copy: `"Jewellery designed to make your most unforgettable moments even more extraordinary."`
- Asymmetric grid (not simple cards): 1 large tile + 4 small tiles using existing bridal images (bridalSet, haarSet, jhumkaAlt, pendantNath, bangleAlt).
- Bullets: Necklaces, Earrings, Maang Tikka, Nath, Bangles, Bridal Sets.
- CTA: `EXPLORE BRIDAL COLLECTION` → `/collections/bridal`.
- Parallax y: ±4% only; disabled on prefers-reduced-motion.

### FR-08 Why Choose SSKK (6 Features — EXPANDED)
Numbered 01–06, each with minimal icon + concise explanation:
1. 01 — BIS Hallmarked Gold
2. 02 — Certified Diamonds
3. 03 — Expert Craftsmanship
4. 04 — Transparent Pricing (disclaimer: prices are estimates based on live gold rates + making charges)
5. 05 — Custom Jewellery
6. 06 — Personalised Service
About page Four Pillars block REMAINS; Home WhyChooseUs becomes 6-item above. Zero-duplicity: content differs (6 vs 4, different copy).

### FR-09 Our Story (Art Behind Every Piece)
- Heading: `"The Art Behind Every Piece"`.
- Split layout: left = existing jewellery/shop imagery (royalRing + birdLocket collage), right = brand copy.
- CTA: `"Discover Our Story →"` → `/about#story`.
- Copy: real, grounded — no "since 1985". Focus on: Doharighat showroom, hand-finished 22K & 18K pieces, BIS hallmarking, custom design consultations, personalised service.

### FR-10 5-Step Customer Journey
01 Discover → 02 Consult → 03 Customize → 04 Craft → 05 Celebrate.
- Vertical connector line (thin gold gradient) on md+, horizontal on mobile.
- Each step: large numeral (serif, gold-faded), eyebrow, heading, 1-line description.
- Scroll-reveal: each step fades-up sequentially.

### FR-11 Custom Jewellery CTA Banner
- H2: `"Have Something Special in Mind?"`
- Sub: `"Let our craftsmen turn your idea into a one-of-a-kind piece."`
- Buttons: `START YOUR CUSTOM DESIGN` → `/contact#enquiry` (preselect category=Custom), `WHATSAPP US` → wa.me with custom-design prefill.
- Background: dark with subtle purple radial + existing jewellery showcase image overlay + gold hairline top/bottom.

### FR-12 Visit SSKK Showroom
- H2: `"Visit SSKK in Doharighat"`.
- Professional location card (glass) with:
  - Address: `Sabji Mandi Road, Near Main Market, Doharighat, Mau, UP - 275303`
  - Phone: both numbers as tel: links
  - WhatsApp: direct link
  - Hours: `Monday – Sunday: 10:00 AM – 8:30 PM`
- Embedded Google Map (iframe, responsive 480px tall, `loading="lazy"`, border, title).
- 3 Buttons (full-width on mobile, row on desktop):
  - `GET DIRECTIONS` → Google Maps search query link with encoded address
  - `CALL US` → tel:+919935178342
  - `WHATSAPP US` → wa.me

### FR-13 Testimonials (SAFE: No Fake Content)
- Component renders structure only.
- Data driven by `TESTIMONIALS_EDITABLE` array exported from `business.ts`.
- Array is initially empty OR contains ONE example entry with comment clearly marked `/* EDITABLE — replace with verified reviews */`.
- Each card: 5 gold stars (star icons), quoted body, Customer Name, Location (Doharighat, Mau).
- Elegant carousel behaviour with prev/next + dot indicators.
- **RULE**: If no verified review data exists → still render ONE placeholder card with "Edit with verified review" watermark. Never invent customers/quotes.

### FR-14 FAQ Accordion (7 Questions)
Smooth height animation, arrow rotation on open:
1. What purity of gold do you offer? → 22K & 18K (24K available by special order — if true, else omit)
2. Do you provide BIS hallmarking? → YES, every gold piece carries BIS hallmark
3. Do you offer custom jewellery? → YES, in-person consultation at Doharighat showroom
4. Can I visit the showroom? → YES, hours + address
5. Do you provide bridal jewellery? → YES, complete sets, individual pieces
6. How can I enquire about a product? → WhatsApp / Form / Call
7. Do you provide jewellery consultation? → YES, free personalised consultation

### FR-15 Contact / Home Inquiry Form (Works End-to-End)
Fields (required marked *):
- Name * (text)
- Phone * (tel, min 10 digit validation)
- Email (email, optional but format-validated if present)
- Jewellery Category * (select: Ring, Earrings, Necklace, Bangles, Bridal, Custom Jewellery, Other)
- Message * (text-area, min 10 chars)

States:
- Loading (spinner + disabled submit)
- Success (toast + reset form + green inline confirmation)
- Error (toast + per-field red inline messages)
- Idle (gold hairline focus ring per existing CSS)
- Accessibility: every input has `<label htmlFor>`; aria-invalid on error; aria-describedby to error hint.
- Submit hits `POST /inquiries` via existing `api.ts`. Preserves existing mutation logic.

### FR-16 WhatsApp Integration (5 Touch Points)
Each with DISTINCT, useful prefill:
1. **Header WhatsApp pill** → `"Hello SSKK, I'd like to know more about your gold jewellery collection and showroom in Doharighat."`
2. **Hero WhatsApp CTA** → `"Hello SSKK, I loved your jewellery on the website. Please share your latest bridal and everyday collections available in Doharighat."`
3. **Product Card WhatsApp Enquiry** → product name + SKU + purity request (as in FR-06)
4. **Contact / Custom CTA WhatsApp** → `"Hello SSKK, I'd like to discuss a custom jewellery design. Can we book a consultation at your Doharighat showroom?"`
5. **Floating WhatsApp FAB** → generic friendly greeting (matches FR-03 secondary).
All links open in `_blank` with `noopener,noreferrer`.

### FR-17 Product Detail Page (Audit & Polish)
- Large image gallery: thumbnails strip, click to swap, mobile swipe (touch), zoom on hover (desktop), fullscreen button.
- All fields shown only if present: name, category, goldPurity, weight, price/discountPrice or "Contact for Price" with disclaimer.
- Description (line-clamp + "Read more").
- Actions: Enquire on WhatsApp (prefilled), Add to Wishlist (toggle), Back to list.
- Related jewellery: 4 cards from same category.
- Breadcrumb: Home / Collections / CategorySlug / Product.

### FR-18 Search Overlay (Functional & Beautiful)
- Search input (focus on open) with debounce 300ms.
- Results: product image + name + category + price → click navigates `/product/:slug`.
- No-result state: friendly message + "Browse all collections" button.
- Clear (X) button when query present.
- Quick categories chips: Rings, Earrings, Necklaces, Chains, Bangles, Bridal, Nath, Mang Tikka, Custom.

### FR-19 Filtering on Collections Page
- Category sidebar (lg) + drawer (mobile, left slide).
- Category list (all from DB).
- Price filters: min/max inputs (INR) — only if product data with price exists; otherwise disable & grey-out with "Contact showroom for pricing" note.
- Gold Purity chips: All, 18K, 22K, 24K.
- Collection type toggles: Featured only, Bestseller only.
- Sort: Newest (-createdAt), Featured (-featured), Price low→high, Price high→low (Price sorts disabled if no price data).
- Pagination preserved.

### FR-20 Multi-Column Footer
Column 1 (SSKK):
- Brand serif logo (gold gradient)
- 2-line short description
- 3 social icons: Instagram, Facebook, WhatsApp → links from BUSINESS.socials

Column 2 (Quick Links):
Home, Jewellery, Bridal, About, Our Story (/about#story), Visit Us (/contact#visit), Contact

Column 3 (Collections):
Rings, Earrings, Necklaces, Chains, Bangles, Bridal, Nath

Column 4 (Contact):
Address (Doharighat, Mau), Phone 1+2 (tel links), WhatsApp (wa.me), Email (mailto)

Bottom bar:
- Left: `© 2026 Shubham Swarn Kala Kendra. All Rights Reserved.`
- Right: Privacy Policy · Terms & Conditions · Credit line `Crafted by Shubham Verma`

### FR-21 Animations (Timing & Restraint)
All durations: 300–800ms primary, 800–1400ms cinematic.
- Page transitions: fade + slight up (500ms cubic-bezier[0.22,1,0.36,1])
- Section reveals: fade-up (scroll-reveal, 750ms, viewport margin -60px)
- Image reveal: mask scaleY (1250ms cubic-bezier[0.77,0,0.175,1])
- Card image zoom: 1250ms hover 1.038
- Buttons: 550–700ms cubic-bezier
- Navbar: transparent → glass (400ms after 40px Y)
- Testimonial slide: 650ms
- FAQ accordion: 350ms max-height + opacity
- Parallax ONLY on Bridal + Our Story; disabled when `prefers-reduced-motion: reduce`.
**PROHIBITED**: pulsing/strobe gold, heavy particles, spinning objects, letter-by-letter strobe <5s cycle, full-page cursor trail on mobile.

### FR-22 Images (Asset Reuse Hierarchy, No Distortion)
| Section | Image Source (preferred → fallback) |
|---|---|
| Hero | Hero video → poster frames → `JEWELRY_IMAGES.showcase` |
| Collections | category.image.url → `CATEGORY_IMAGE_BY_SLUG[slug]` → nearest match |
| Bridal Heritage | bridalSet, haarSet, jhumkaAlt, pendantNath, bangleAlt |
| Our Story | royalRing, birdLocket, showcase collage |
| Signature Pieces | product.images[0].url → `DEFAULT_PRODUCT_IMAGE` |
| Showroom | Use map embed; existing hero-frames frame_008 as card accent if needed |

Rules:
- Every `<img>` has meaningful alt text (never empty, never "image").
- Every image has explicit `aspect-ratio` container + `object-fit: cover/contain` as appropriate.
- Lazy loading (`loading="lazy"`) on all images except above-the-fold hero poster.
- `decoding="async"` on content images.
- Zero stretch / distortion on any breakpoint.

### FR-23 Responsive Design (All Breakpoints PERFECT)
Tested viewport widths: 320, 375, 390, 414, 768, 1024, 1280, 1440, 1920.
- **320–639 (mobile)**: 2-col product/category grids; horizontal snap for Collections if needed; bottom sticky triple-contact bar (Call | WhatsApp | Directions) full-bleed; map ≤360px height; hero H1 clamp min 2rem.
- **640–767**: 2/3-col grids; floating WhatsApp FAB replaces bottom bar.
- **768–1023**: 3-col grids; desktop nav hidden; map ≥420px.
- **1024+**: Full sidebar filter, 4-col grids, hero 92svh max.
- **ZERO horizontal scrolling** on any width. No global `overflow-x: hidden` hack; root cause layout fixes only.

### FR-24 Accessibility
- Semantic HTML: `<header>/<nav>/<main>/<section>/<article>/<footer>`; each `<section>` has `aria-label`.
- Heading hierarchy per page: exactly one H1; H2 for sections; H3 for cards/sub-sections.
- Alt text: all images descriptive and jewellery-specific (e.g., `"Handcrafted 22K gold bridal necklace set with maang tikka"`).
- Keyboard navigation: Tab order matches visual; `:focus-visible` 2px gold outline + 3px offset (per existing CSS).
- ARIA: `aria-expanded` on accordion/mobile menu, `aria-current="page"` on active nav link, `aria-hidden` on decorative icons, `aria-live="polite"` on success/error toast mount regions.
- Forms: visible labels; required markers; error hints linked via `aria-describedby`; `aria-invalid=true` on error.
- Colour contrast: cream text `#F5F1E8` on `#05020A` ≥ 10:1; gold accents must NOT be sole carrier of information (icons + labels).
- `prefers-reduced-motion`: every `@media` block in index.css honoured; no exceptions; motion-based framer-motion variants conditional on `useReducedMotion()`.

### FR-25 Performance
- Lazy loading: all images below fold; iframe map; video poster preloaded, video metadata only.
- Code splitting already done via `React.lazy` routes → preserved.
- Remove unused 3D libs (`three`, `@react-three/*`) from render paths if unused in Home/About/Contact. (Keep in package.json if admin needs; don't import on marketing routes.)
- Images: explicit width/height through Tailwind aspect ratio classes → zero CLS.
- GPU-friendly transforms only (`transform`, `opacity`, `filter`); no height/left/top animation.
- `will-change` only on known animated layers; remove after animation stops.
- JS bundle: audit with `vite build` (target < 550KB gzipped homepage). If over, lazy-load hero video player until in view.

### FR-26 SEO (Professional)
- Titles match PAGE_SEO entries; verify canonical URLs match route.
- **Title (Home)**: `"Shubham Swarn Kala Kendra | Premium Gold & Diamond Jewellery"`
- **Meta description (Home)**: `"Discover premium gold, diamond and bridal jewellery at Shubham Swarn Kala Kendra in Doharighat, Mau. Explore timeless designs and personalised jewellery."`
- OG + Twitter metadata via SEO component: OG image = `SEO_OG_IMAGE`.
- Structured data: `buildDefaultSchemaGraph()` (Organization + WebSite + JewelryStore) on every page; `buildCategoryPageSchema()` for `/collections/:slug`; `buildBreadcrumbSchema()` on collections and product detail.
- **LocalBusiness / JewelryStore**: populated ONLY from BUSINESS.ts (no fabrication).
- About page: `noIndex: false`. Contact page: `noIndex: false`. Wishlist/Login: `noIndex: true`.

### FR-27 Content Quality (Authentic Luxury Copy, No AI Cliché)
FORBIDDEN PHRASES — zero occurrences in final site:
- "Experience unparalleled luxury"
- "Where dreams become reality"
- "Elevate your style to new heights"
- "Exquisite masterpiece" (only if describing a real piece; avoid)
- "Unrivalled craftsmanship" (use "expert craftsmanship" or "trusted craftsmanship")

APPROVED VOICE: warm, grounded, Indian jewellery showroom. Refer to Doharighat/Mau, showroom visits, personalised consultations, live gold rates, making charges.

### FR-28 Functionality Audit (NO Dead Buttons)
Every interactive element in the application MUST:
- Resolve to a real route or action (no "#" dead links except controlled-UI anchors like faq/accordion IDs).
- Produce zero console errors (React, JS runtime, Network).
- Produce zero broken images (404 on /public assets).
- Work on: Chrome latest, Safari latest (mobile + desktop), Firefox latest.

Audit checklist:
- Navigation links (7 desktop + mobile)
- Mobile menu open/close + quick action tiles
- Search overlay open + 8 category chips + search results
- Jewellery categories (9)
- Product cards (Wishlist, WhatsApp, View Details)
- Product detail (image gallery, thumbs, zoom, related)
- Collections filters (category, purity, price, sort, pagination)
- Wishlist add/remove + `/wishlist` page
- All 5 WhatsApp touch points
- Contact form + Home Inquiry form (validation, submit)
- Showroom buttons (Directions, Call, WhatsApp)
- FAQ accordion (7 items)
- Testimonials carousel
- Footer links (3 columns × 7 items + 3 social)
- Scroll-to-section links (#story, #visit, #enquiry)
- Admin routes preserve: /admin, /admin/products, /admin/categories, /admin/orders, /admin/inquiries, /login

### FR-29 Existing Features Preserved (NO Regression)
MUST continue to work 100%:
- Backend API: GET `/products`, `/categories`, `/products/slug/:slug`, POST `/inquiries`
- Zustand stores: `useAuthStore`, `useCartStore`, `useWishlistStore`, `useUIStore`
- Admin CMS: Login → AdminDashboard → AdminProducts → AdminCategories → AdminOrders → AdminInquiries
- React Query caching (staleTime preserved)
- Lenis smooth scroll + CustomCursor desktop only (disable CustomCursor on touch/coarse)
- LuxuryPreloader on first visit (respect prefers-reduced-motion)
- ScrollProgress thin gold bar
- Error fallbacks on product/category API failures
- Wishlist persistence (localStorage via store) — if implemented
- InquiryModal component (if triggered from a product)

## Non-Functional Requirements

### NFR-01 Luxury = Restraint (Rubric-driven)
- Gold glow opacities in box-shadow values stay in 0.10–0.22 range on cards; never ≥0.30.
- Gold shimmer animation cycles ≥ 12s; sheen ≥14s intervals.
- No neon gradients; no fire/explosion visuals; no rotating 3D.

### NFR-02 Zero Duplicity
- Home page does NOT contain both placeholder sections and real sections.
- WhyChooseUs (Home 6-item) and About Four Pillars (4-item) share zero card-copy.
- No duplicate section IDs.

### NFR-03 Real-Data Integrity
- BUSINESS.ts values are the SINGLE source of truth. No competing phone/address/email strings anywhere.
- Testimonials, if rendered, use a clearly marked editable array; do NOT invent customers.

## Constraints, Dependencies, Assumptions

### Constraints
- **Tech stack fixed**: React + Vite + TS + Tailwind + framer-motion + @tanstack/react-query + zustand + lucide-react + axios + express backend (Mongo via models).
- **No new heavy libraries**: No GSAP ScrollTrigger, no AOS, no locomotive-scroll (already have Lenis).
- **No fabricated content**: No founding dates, no awards, no fake reviews, no fake certifications beyond BIS hallmark.
- **Hero video**: must use existing `.mp4` files in `/client/public/hero-video/` and `Jewellery_commercial_for_SSKK_202608271422.mp4`. Do not request new footage.

### Dependencies
- Existing backend endpoints must serve products/categories for featured and collection pages. If API is down, graceful skeletons + ErrorState components render (FR-29).
- BUSINESS.googleMapsEmbed URL is the embed source. If the URL is not final, the iframe still renders it.

### Assumptions (mark any unknown resolved during implement as ✅)
- ✅ BUSINESS data in `/client/src/config/business.ts` is final and verified.
- ✅ Product images are optional; defaults exist in `JEWELRY_IMAGES`.
- ✅ WhatsApp numbers are INDIA format (+91 10-digit).
- ⚠️ Mang Tikka and Custom Jewellery categories may NOT yet exist in `CATEGORY_IMAGE_BY_SLUG` → use nearest asset (bridal images + chain/pendant respectively).
- ⚠️ Testimonials array has no verified data → render with EDITABLE watermark card.

## Open Questions (Resolved Inline During Implement)

**Q1**: Do we keep the letter-by-letter CinematicHero brand animation? → **A1**: Retire the cycling 5.6s animation. Replace with single on-load fade-up of the 2-line tagline; shimmer applied via `hero-gold-sheen` 12s cycle.

**Q2**: Do we add a "Mang Tikka" category to the backend? → **A2**: Collections section renders 9 categories visually from a static front-end map; backend categories are still fetched and if a slug matches, we link; otherwise we link to `/collections` with a search prefilled. No DB change required.

**Q3**: Price data is sparse — do we keep price filters? → **A3**: Price filters remain but are conditionally disabled when no products have `price > 0`. UI shows "Contact showroom for pricing" notice. Price low/high sort disabled when no price.

## Acceptance Criteria

### Rule-type (Objective binary pass/fail)
1. **R-01**: Home page renders 13 sections (FR-01 list) with zero placeholder `<span>` strings containing "Placeholder" or "Rendered in T". Verified by grep on production bundle and DOM snapshot.
2. **R-02**: Hero section H1 text matches exactly `Crafted in Gold.` on line 1 + `Designed for Your Forever.` on line 2. Verified by `.editorial-h1` innerText.
3. **R-03**: Trust Bar has 5 items with icons and correct labels. Verified by `trustItems.length === 5` and visual.
4. **R-04**: Collections section shows 9 category cards (Rings, Earrings, Necklaces, Bangles, Chains, Bridal, Nath, Mang Tikka, Custom Jewellery) — each has non-empty image alt text, category name, description, "Explore" link. Verified by DOM count 9 and attribute checks.
5. **R-05**: WhatsApp links at 5 touch points (FR-16 list) are all unique non-empty wa.me URLs with prefilled `text=`. Verified by scanning hrefs.
6. **R-06**: FAQ accordion contains EXACTLY 7 expanded-by-default-none questions. Open/close keyboard (Enter/Space) works on summary.
7. **R-07**: Product card WhatsApp prefill includes product name + slug/SKU. Verified on any non-empty FeaturedProducts grid.
8. **R-08**: Contact & Home inquiry forms have fields Name, Phone, Email, Category, Message, with Name/Phone/Category/Message required (non-empty POST only if valid). Validation fires on submit. Network tab POST to `/inquiries` on valid submit.
9. **R-09**: Footer 4-column layout: 1 Brand + 2 Nav + 3 Collections (7 links: Rings, Earrings, Necklaces, Chains, Bangles, Bridal, Nath) + 4 Contact. All nav links resolve 200 (SPA navigation, no route 404).
10. **R-10**: Mobile <640px renders full-width bottom sticky bar (Call | WhatsApp | Directions) and NO floating WhatsApp; ≥640px renders floating WhatsApp FAB bottom-right and NO bottom sticky bar. Verified by resizing browser.
11. **R-11**: `window.scrollMaxX === 0` at all breakpoints 320→1920 (no horizontal scroll). Verified via DevTools responsive mode.
12. **R-12**: `PAGE_SEO.home.title` updated to `"Shubham Swarn Kala Kendra | Premium Gold & Diamond Jewellery"`; `PAGE_SEO.home.description` updated to FR-26 string.
13. **R-13**: Testimonials section does NOT contain fabrications. Verified by (a) inspecting TESTIMONIALS_EDITABLE array, (b) confirming no hardcoded customer names+quotes outside that array.
14. **R-14**: No `console.error` or uncaught runtime errors after navigating Home → Collections → About → Contact → Product Detail. Verified via manual QA run.
15. **R-15**: The `WhyChooseUs` rendered on the Home page has EXACTLY 6 features; the About "Four Pillars of Trust" has exactly 4 pillars (zero-duplicity pass), and their copy shares 0 identical paragraphs (diff check).
16. **R-16**: Admin routes render under their existing paths. `/login` loads, `/admin` loads, `/admin/products` + `/admin/categories` render skeleton/table correctly.

### Rubric-type (Evaluative, 0-5 scale, threshold 4.2 average)
1. **RU-01 — Visual Quality (0-5, threshold 4)**:
   0 = looks like AI template; 2 = generic SaaS-looking; 3 = decent local business; 4 = clearly premium jewellery brand, consistent typography/gold/cream/purple; 5 = world-class editorial campaign level (Apple/Leica restraint).
   Evidence: Full-page screenshots at 1440w, 390w.

2. **RU-02 — Responsive Design (0-5, threshold 4)**:
   0 = broken on mobile; 2 = works ≥768 but breaks 320/414; 4 = perfect on ALL listed widths (320, 375, 390, 414, 768, 1024, 1280, 1440, 1920); 5 = extra care for iPhone dynamic island / notch padding.
   Evidence: Screenshots at each breakpoint.

3. **RU-03 — UX / Interaction (0-5, threshold 4)**:
   0 = confusing; 2 = functional but clunky; 4 = every interaction feels intentional, no dead clicks, clear affordances; 5 = anticipatory, delightful, brand-consistent micro-interactions.

4. **RU-04 — Accessibility (0-5, threshold 4)**:
   0 = broken for screen readers; 2 = basic semantic but missing labels/focus; 4 = passes axe-core scan, keyboard-only full journey; 5 = full WCAG AA (contrast, focus, ARIA, reduced-motion).

5. **RU-05 — Functionality (0-5, threshold 4)**:
   0 = major broken flows; 2 = some features broken; 4 = FR-01…FR-28 all pass with zero regression; 5 = zero console warnings and no Lighthouse errors.

6. **RU-06 — Premium / Luxury Branding (0-5, threshold 4)**:
   0 = cheap jewellery store; 2 = excessive gold/glow; 4 = restrained luxury, typography carries value, editorial whitespace; 5 = museum/campaign level craft.

7. **RU-07 — Performance (0-5, threshold 4)**:
   Lighthouse mobile: 0 <50; 2 = 50-74; 4 = 75-94; 5 ≥95 on Perf, FCP <1.2s, LCP <2.5s, CLS 0.0x.
   Evidence: Lighthouse JSON or screenshot.

8. **RU-08 — Professional Polish (0-5, threshold 4)**:
   0 = clearly WIP; 2 = some inconsistent spacing/corners; 4 = pixel-perfect spacing, consistent border-radius (0-16px editorial), 1px hairline borders, letter-spacing, line-height all aligned; 5 = Trae perfection, looks like a Figma-to-production exact match.
