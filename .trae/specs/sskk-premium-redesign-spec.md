# SSKK Premium Jewellery Website — Redesign Specification

## Problem, Users, Goals

**Problem:** Existing SSKK website at commit `0e4e06b` has functioning backend + React architecture + hero videos + product API + 18 real jewellery images, but:
- Information architecture is repetitive (duplicate trust sections eliminated in Phase 3-2 but hero → collections flow needs a stronger visual narrative; Our Story/Customer Journey/FAQ/Testimonial/Custom CTA sections are missing entirely or scattered)
- Homepage visual cadence is: Hero → Trust bar → Categories → Featured → Bridal → Showroom CTA → Inquiry — missing middle-story sections to hold engagement, and rhythm is too linear (every section = heading + cards/grid)
- No editorial asymmetric layouts — every section uses a card-grid or 2-col symmetric pattern
- Missing 6 required navigation labels from design spec: "Our Story" is missing from nav (About exists ≠ Story); "Contact" exists but navigation spec calls for both "VISIT US" (Contact page) *and* "CONTACT" (scroll-anchor or separate contact view vs visit-use case distinction needs resolution)
- Key sections with no implementation: Customer Journey 5-step process, Custom Jewellery CTA banner, FAQ accordion, Testimonial carousel structure, proper Our Story editorial split layout
- Footer column 2 quick-links is missing "Our Story" entry
- Design system: current tailwind palette is strong (black bg / purple-900-500 / gold / cream) but spacing is generic; typography hierarchy needs tighter editorial rules; the serif Playfair Display + sans Inter mix needs concrete sizes/weights/line-heights per context
- WhatsApp integration per-product is there but per-hero / per-Custom CTA / showroom-nav WhatsApp link needs explicit header-level placement as spec calls for dedicated WhatsApp button next to Search/Wishlist

**Target Users (in priority order):**
1. Bride/groom + parents (Mau/Eastern UP tier-2/3 audience) → heavy mobile users, WhatsApp-native, bridal-focused, need trust-markers (BIS) + quick call/WhatsApp
2. Local Doharighat/Mau daily-visitors → need showroom info fast
3. Custom-design customers → need clear custom-design CTA + process narrative
4. Return customers → wishlist + search + product recall

**Goals:**
- Within the FIRST 3-5 seconds: communicate PREMIUM JEWELLERY + TRUST + CRAFTSMANSHIP + SSKK BRAND (via BIS hallmark bar + hero headline + BIS/22K trust-strip IMMEDIATELY after hero)
- Conversion funnel: Landing → Hero (Explore/Showroom/WhatsApp) → Trust-bar → Collections → Signature Pieces → Bridal (editorial) → Why SSKK → Our Story → 5-step Journey → Custom CTA → Showroom → Testimonials → FAQ → Enquiry/Contact → Footer
- Preserve 100% of existing functionality: React Query (products/categories fetch), Zustand stores (ui/wishlist/cart/auth), SearchOverlay API search, admin routes (/admin, /admin/products etc.), inquiry form API post, HeroVideo desktop/mobile MP4/WEBM assets, Wishlist page, Login flow (admin auth), Privacy Policy, Terms of Service, FloatingContact mobile-bottom-bar / desktop-FAB, Lenis smooth scroll, LuxuryPreloader, CustomCursor, ScrollProgress bar
- Use EXISTING 18 images from `/public` + hero-videos at `/public/hero-video/` as primary visual material; no fake/placeholder image substitution
- 10/10 visual / responsive / a11y / polish targets

**Non-Goals:**
- Do NOT change backend (server/) models, controllers, routes, or DB schema
- Do NOT add image URLs to external services; everything must use `/public` assets or backend API product/category images
- Do NOT remove admin layout / login / admin routes
- Do NOT remove Zustand stores, React Query, existing cart/wishlist logic, SearchOverlay
- Do NOT add npm dependencies unless the functionality genuinely cannot be achieved with existing toolkit (framer-motion / lucide / react-router / react-query already cover animation, icons, routing, data fetching)
- Do NOT fabricate customer testimonials; create a well-designed testimonials container populated only with safe placeholder content that is visibly neutral/placeholder
- Do NOT fabricate product prices or specs; preserve the "price from API, goldPurity from Product type" model already used in ProductCard and ProductDetail

---

## Functional Requirements (FR)

### F-01 Navigation (Preserve & Enhance)
- Preserve existing scroll-aware `scrolled` state in Navbar (`window.scrollY > 40`)
- Nav links extended to: `[Home, Jewellery, Bridal, About, Our Story, Visit Us, Contact]` — "Our Story" = `/about#story` anchor; "Visit Us" = `/contact` showroom section; "Contact" = `/contact#enquiry` form anchor.
- Navbar actions row (right side): **[Search][Wishlist][WhatsApp][Hamburger]** → add dedicated WhatsApp CTA button (gold background) to Navbar actions (desktop + mobile)
- Keep existing mobile sheet navigation but insert the two new nav links ("Our Story", "Contact") into the mobile nav list

### F-02 Hero (Redesign, preserve video assets)
- Eyebrow: `SHUBHAM SWARN KALA KENDRA`
- Heading: `Crafted in Gold.\nDesigned for Your Forever.`
- Subtitle: "Timeless jewellery crafted with precision, passion and trusted craftsmanship in Doharighat, Mau."
- CTAs: `EXPLORE JEWELLERY` → `/collections`; `BOOK A SHOWROOM VISIT` → `/contact`; Secondary `WHATSAPP US` → wa.me with prefilling
- Use EXISTING `HERO_VIDEO` asset (desktop + mobile mp4/webm + poster) via HeroVideo component
- Image fallback: `SEO_OG_IMAGE` / `JEWELRY_IMAGES.bridalSet` for no-video users

### F-03 Trust Strip (New section)
- Immediately below hero, single horizontal row of 5 trust items: **BIS HALLMARKED · CERTIFIED DIAMONDS · 22K & 18K · AUTHENTIC CRAFTSMANSHIP · CUSTOM DESIGNS**
- Minimal Lucide icons, thin gold dividers, NOT cards

### F-04 Collections (Enhance)
- Heading: `Explore Our Collections`
- 9 categories: **Rings, Earrings, Necklaces, Bangles, Chains, Bridal, Nath, Mang Tikka, Custom Jewellery**
- Use `CATEGORY_IMAGE_BY_SLUG` image map + fallback images from JEWELRY_IMAGES for new categories without a slug match
- Editorial asymmetric grid (not 4-col uniform) on desktop; responsive grid / horizontal scroll on mobile
- Each card: image + category name + 1 short line + explore link + subtle zoom on hover

### F-05 Featured Products (Enhance)
- Section renamed to title: `Signature Pieces`, subtitle: "Timeless designs created to become part of your story."
- Use existing `featuredProducts` React Query fetch from `/products?featured=true&limit=8`
- ProductCard preserves existing fields (name / category / goldPurity / weight / price-from-API / View Details / Wishlist / WhatsApp enquiry)
- "View All Jewellery" CTA preserved

### F-06 Bridal (Editorial Restyle)
- Keep 6 existing bridal images, but change composition from 2-column symmetric to asymmetric editorial layout
- Use the user-specified item list: Necklaces, Earrings, Maang Tikka, Nath, Bangles, Bridal Sets
- Add subtle parallax reveal on image group, text side left/right depending on asymmetry

### F-07 Why SSKK (Preserve Component, Re-layout)
- Use existing `WhyChooseUs.tsx` component but restructure feature list to EXACTLY these 6 items: `01 BIS Hallmarked Gold | 02 Certified Diamonds | 03 Expert Craftsmanship | 04 Transparent Pricing | 05 Custom Jewellery | 06 Personalised Service`
- 3-col x 2-row grid, numbered labels, minimal icons. NO marketing copy, concise explanations. Component is NOT re-added to Home mid-page (Zero-Duplicity rule) — instead Why SSKK is rendered at its own logical position AFTER Bridal section as spec's section order mandates.

### F-08 Our Story Editorial (New)
- Split 1:1 layout (IMAGE | STORY). Use `JEWELRY_IMAGES.showcase` for the story image.
- Title: `The Art Behind Every Piece`
- Content: Neutral copy about SSKK craftsmanship/quality focus.
- CTA: "Discover Our Story →" → scroll anchor (or /about#story). No fabricated history.

### F-09 5-step Customer Journey (New Section)
- Flow: **01 Discover → 02 Consult → 03 Customize → 04 Craft → 05 Celebrate**
- Connected lines (SVG or CSS), scroll-reveal animation per step, Framer Motion.

### F-10 Custom Jewellery CTA Banner (New)
- Title: "Have Something Special in Mind?"
- Subtitle: "Let our craftsmen turn your idea into a one-of-a-kind piece."
- Buttons: `START YOUR CUSTOM DESIGN` → `/contact#enquiry` with category pre-fill = "Custom Jewellery" | `WHATSAPP US`

### F-11 Showroom Section (Preserve & Restyle)
- Title: "Visit SSKK in Doharighat"
- Keep 3 location cards (Address / Phone / Hours) from Home existing section but restyle into a single professional location block
- Keep Google Maps `<iframe>` via BUSINESS.googleMapsEmbed
- CTAs: Get Directions (Google Maps link) · Call Us · WhatsApp

### F-12 Testimonials (New Component, Safe Structure)
- Component structure only with neutral placeholder data that does NOT look like real testimonials (labels visibly indicate "Sample / Add your reviews" or similar safe tone per NO-FAKE-CONTENT rule)
- Carousel behaviour with dots / arrows, 5-star layout SVG Lucide `Star` components, and customer/location lines marked as editable

### F-13 FAQ Accordion (New)
- 7 questions as specified:
  1. What purity of gold do you offer?
  2. Do you provide BIS hallmarking?
  3. Do you offer custom jewellery?
  4. Can I visit the showroom?
  5. Do you provide bridal jewellery?
  6. How can I enquire about a product?
  7. Do you provide jewellery consultation?
- Framer Motion smooth expand/collapse

### F-14 Enquiry / Contact Form (Enhance)
- Preserve existing Contact page `/contact` form + API POST to `/inquiries`
- Add fields per spec: **Name, Phone, Email, Jewellery Category (dropdown), Message**; categories dropdown exactly: `Ring | Earrings | Necklace | Bangles | Bridal | Custom Jewellery | Other`
- Add proper validation (required fields: Name + Phone), plus loading/error/success states via React Query mutation (existing `react-hot-toast` for toasts)
- Form side column: WhatsApp / Call / Visit Showroom CTAs (mirroring FloatingContact set)

### F-15 WhatsApp Integration (Complete)
- Header WhatsApp button (F-01): pre-filled msg = general inquiry
- Hero secondary WhatsApp: same general inquiry
- Product card/ProductDetail: existing "Enquire on WhatsApp" behaviour preserved (with product name + SKU in prefill)
- Contact form side column WhatsApp CTA
- Custom Jewellery CTA WhatsApp (prefill with custom-design request)
- FloatingContact desktop FAB / mobile bottom WhatsApp: PRESERVED exactly

### F-16 ProductDetail (Enhance from existing)
- Keep existing product API fetch + image gallery + thumbnails
- Gallery: add touch-swipe via Framer Motion gestures, zoom visual affordance
- Keep Wishlist + Enquire WhatsApp buttons + Related jewellery section

### F-17 Search & Filter (Enhance)
- Keep SearchOverlay + `/products?keyword=` debounced search + popular categories
- Collections page `/collections`: implement filter/sort controls atop grid using existing categories API + product queries
- Filter UI controls rendered only for data that exists: only show "price filter slider" if returned products have price > 0 (per Product.price number field). Category dropdown always present; gold purity chips if Product.goldPurity is present.
- Sort dropdown: Newest, Featured, Price Low→High, Price High→Low

### F-18 Footer (Expand)
- 4-column footer as specified; Column 2 QuickLinks = [Home, Jewellery, Bridal, About, Our Story, Visit Us, Contact]; Column 3 Collections = [Rings, Earrings, Necklaces, Chains, Bangles, Bridal, Nath]; Column 4 Contact = Doharighat, Mau location + phone + whatsapp + email drawn from BUSINESS.ts
- Social icons preserved; Bottom bar: © 2026 SSKK · Privacy Policy · Terms of Service

### F-19 Routes Preserved Exact
App.tsx routes `/`, `/collections`, `/collections/:category`, `/jewelry`, `/product/:slug`, `/about`, `/contact`, `/login`, `/wishlist`, `/privacy-policy`, `/terms-of-service`, `/admin*`, `*` 404 — ALL preserved 1:1. No routes added, none deleted.

### F-20 Accessibility
- Every section uses semantic `<section aria-label>`; headings h1→h2→h3 proper hierarchy; alt text for images meaningful; keyboard navigation; focus states visible; `prefers-reduced-motion` respected (existing `useUIStore.getState().setReducedMotion`).

---

## Non-Functional Requirements (NFR)

### NFR-01 Build
- `npm run build` EXIT CODE 0; TypeScript `tsc` no errors; VSCode `GetDiagnostics` empty array
- No unused imports; no dead references

### NFR-02 Responsive
- Perfect on 320/375/390/414/768/1024/1280/1440/1920 px widths; ZERO horizontal overflow; text never clipped; buttons minimum touch-target ≥ 44×44 px

### NFR-03 Performance
- All below-the-fold images use `loading="lazy"`; hero video poster preloads first; existing React Query `staleTime` preserved; no unnecessary network calls

### NFR-04 SEO
- Title: `Shubham Swarn Kala Kendra | Premium Gold & Diamond Jewellery` preserved at SEO default; meta description updated per spec; canonical URL via existing `absoluteUrl()`; LocalBusiness schema uses BUSINESS.ts real fields

### NFR-05 Animation Timing
- 300-800ms per animation; reduced-motion disables parallax; card zooms 1.02-1.06 only

### NFR-06 No Fake Content Mandate (HARD RULE)
- No fabricated testimonials, prices, founding years, artisan names, awards, reviews. Product fields come strictly from types.ts Product interface or API
- If Testimonial content data does not exist → neutral editable placeholder with explicit label

### NFR-07 Image Rules
- 100% of `/public` images (18 jewellery PNGs + hero frames + hero poster JPGs) used INTELLIGENTLY with image hierarchy (Hero → bridal → story → featured/categories). No random repeat of same image.

---

## Constraints, Dependencies, Assumptions

**Constraints:**
- Existing stack: React 18 + Vite 5 + TypeScript 5.5 + Tanstack Query 5 + Framer Motion 11 + Zustand 4.5 + Lucide + TailwindCSS 3.4. NO new npm packages added by default
- Edit scope is `client/src/**` + minor `index.html` head updates for OG/Twitter tags only; server directory NOT touched
- WhatsApp msg always URL-encoded; opens wa.me `_blank` + `noopener noreferrer`
- All contact phone links use `tel:+91${BUSINESS.phonePrimary}` format (10-digit without +91 prefix in business.ts field; prefix added in href)

**Dependencies (already present):**
- `framer-motion` — section reveals, accordion, mobile sheet, image zoom, parallax
- `lucide-react` — minimal icons for trust/journey/contact (use `strokeWidth: 1.5` for premium feel consistently)
- `@tanstack/react-query` — mutations for enquiry form submit, products/categories fetch preserved
- `react-hot-toast` — success/error states for form
- Zustand stores: uiStore (searchOpen, mobileMenuOpen, isMobile, reducedMotion) preserved

**Assumptions:**
- User's "Our Story" nav link ≡ About page `#story` anchor on About page (no need to create `/story` route, avoids duplicate route)
- "Visit Us" and "Contact" both use `/contact` but scroll-to different anchors (Showroom block vs Enquiry block) to avoid two routes for effectively same info page
- Mang Tikka category → reuse `JEWELRY_IMAGES.bridalSet` subset image or use bridal split image
- Backend categories API will likely return 8 existing slugs (rings/earrings/necklaces/chains/bangles/bridal/nath/pendants) → for the 9th spec category (Custom Jewellery) render a static card linked to `/contact#enquiry` prefill

**Open Questions (resolved via assumptions):**
- *Do we need `/story` separate route?* — NO, use `/about#story` anchor on About page new editorial section
- *Where does `Why SSKK` live on Home?* — Immediately after Bridal editorial section (Home mid-funnel) before Our Story. No conflict because WhyChooseUs component was removed from Home in Phase 3-2 for duplicity → now reinserted at correct new location in F-07 with 6 properly-worded features

---

## Acceptance Criteria

### Rule — Binary Verifiable Conditions

1. **RULE** `build_pass`: `cd client && npm run build` exits 0 with no tsc errors
2. **RULE** `tsc_noUnused`: No unused imports; all variables referenced
3. **RULE** `routes_preserved`: App.tsx route list identical to existing route list; none added/removed (string compare all path strings)
4. **RULE** `stores_preserved`: uiStore, wishlistStore, cartStore, authStore imports + store files unchanged
5. **RULE** `zero_horizontal_overflow`: CSS check `overflow-x: hidden` at html,body and `<Layout>`; no elements wider than viewport at 320px width
6. **RULE** `no_fake`: grep for "Since 1985" / "generations" / "founder" / invented names returns 0 matches outside neutral placeholder label
7. **RULE** `testimonials_safe`: Testimonials component either uses only neutral placeholder OR renders no real-looking names/cities/stars without data
8. **RULE** `nav_exact_links`: Navbar link list === `[Home, Jewellery, Bridal, About, Our Story, Visit Us, Contact]`
9. **RULE** `footer_links_exact`: Footer Col2 + Col3 match specified link name lists exactly
10. **RULE** `whatsapp_prefilled`: All `<a>` wa.me links contain `?text=` URL-encoded message string
11. **RULE** `faq_seven_items`: FAQ section === exactly the 7 specified questions
12. **RULE** `journey_five_steps`: Customer Journey === exactly Discover → Consult → Customize → Craft → Celebrate
13. **RULE** `hero_copy_exact`: Hero eyebrow = SHUBHAM SWARN KALA KENDRA; heading = `Crafted in Gold.\nDesigned for Your Forever.`;
14. **RULE** `why_sskk_six`: Why SSKK features = exactly 6 items in BIS/CertDiam/Craft/Transparent/Custom/Personalised order
15. **RULE** `form_fields_exact`: Contact Enquiry form fields = Name, Phone, Email, Category dropdown (7), Message; required=Name+Phone
16. **RULE** `search_preserved`: SearchOverlay toggles, debounce search, results grid preserved exactly with `/products?keyword=` API call

### Rubric — Evaluative Quality Dimensions (0-4, pass threshold ≥ 3)

17. **RUBRIC** `visual_quality` (0-4, T≥3): 
   - 0 = broken/ugly; 
   - 1 = generic card-grid SaaS; 
   - 2 = good but inconsistent spacing/shadows/radii; 
   - 3 = premium editorial feel, asymmetric layouts, consistent micro-details, no clutter; 
   - 4 = could pass for a luxury international jeweller
18. **RUBRIC** `responsive_mobile` (0-4, T≥3): Mobile 320/390/414 layouts intentional, text not clipped, forms usable, CTA readable; no content hidden via overflow
19. **RUBRIC** `ux_funnel` (0-4, T≥3): Hero → Explore → Bridal → Why → Story → Journey → Custom → Showroom → Testimonials → FAQ → Enquiry natural conversion flow without friction
20. **RUBRIC** `a11y` (0-4, T≥3): Semantic sections, focus states, alt text, keyboard tab-order clean, color contrast gold-on-black text at least 4.5:1
21. **RUBRIC** `animations_subtle` (0-4, T≥3): All animations 300-800ms; no sparkle-burst, no strobe, hover card zooms gentle, reduced-motion disables parallax
22. **RUBRIC** `consistency` (0-4, T≥3): Uniform border-radius (one 2xl/one sm), shadow tokens, section padding consistent, icon strokeWidth consistent (1.5)
23. **RUBRIC** `image_hierarchy` (0-4, T≥3): Hero = unique strongest image (hero video poster/bridal); Bridal = bridal subset; Story = showcase; featured = product images; no repeated duplicate of same PNG in adjacent sections
24. **RUBRIC** `performance` (0-4, T≥3): Lazy loading present, below-fold images lazy, hero video posters first paint fast, no layout shift, reduced motion respected
25. **RUBRIC** `seo_metadata` (0-4, T≥3): SEO component title/description updated per spec, OpenGraph tags, canonical, JSON-LD LocalBusiness uses BUSINESS.ts real data, heading h1 per page correct
