# SSKK Premium Redesign — Implementation Tasks

Task decomposition from spec.md Acceptance Criteria. Order = dependency order (vertical slices). Every completed task includes Completion Evidence: links to touched files, self-verification of TRs.

## Task 1: Config & SEO Update (business.ts + seo.ts + assets.ts)

- **Priority**: high
- **Status**: pending
- **Depends on**: — (first task)
- **Scope**:
  - Add `TESTIMONIALS_EDITABLE` to `business.ts` with 0 or 1 clearly-marked editable example entry.
  - Add 9-category static visual map in `assets.ts` (incl Mang Tikka + Custom Jewellery with fallbacks).
  - Update `PAGE_SEO.home.title` and `PAGE_SEO.home.description` per FR-26.
  - Ensure `BUSINESS` is the ONLY source of phone/address/hours strings — grep-copy any duplicate strings into references.
- **Files touched**:
  - `client/src/config/business.ts`
  - `client/src/config/seo.ts`
  - `client/src/config/assets.ts`
- **Test Requirements (TR)**:
  - **Rule TR-1.1**: `BUSINESS.whatsappPrimary` is used for ALL 5 WhatsApp links (derive prefill texts from helpers in business.ts if needed).
  - **Rule TR-1.2**: `TESTIMONIALS_EDITABLE` exists and is exported; if non-empty, first entry has `/* EDITABLE — replace with verified reviews */` marker on name/quote fields.
  - **Rule TR-1.3**: `CATEGORY_IMAGE_BY_SLUG` covers Mang Tikka (fallback to haarSet/bridal) and Custom Jewellery (fallback to birdLocket/showcase).
  - **Rule TR-1.4**: `PAGE_SEO.home.title === "Shubham Swarn Kala Kendra | Premium Gold & Diamond Jewellery"` exactly.
  - **Rule TR-1.5**: `PAGE_SEO.home.description` contains both "Doharighat" and "Mau".
  - **Rubric TR-1.6 (0-2, threshold 2)**: No duplicated phone/address strings outside BUSINESS.ts (scan codebase). 2 = zero dups; 1 = <3; 0 = many.
- **Completion Evidence**: Diff of 3 config files; grep result showing zero stray address strings.

---

## Task 2: Global Design Tokens & CSS Cleanup (tailwind + index.css)

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 1
- **Scope**:
  - Adjust `box-shadow` gold-glow values to stay in 0.10–0.22 opacity range (`gold-glow-xl` max 0.22).
  - Ensure shimmer keyframes cycle ≥ 12s, sheen sweep ≥ 14s.
  - Verify all `@media (prefers-reduced-motion: reduce)` blocks cover new animations.
  - Add any new utility classes needed for the 9 sections: `faq-accordion`, `journey-line`, `editorial-grid` etc.
  - Audit hero height triple-fallback chain (100vh, 100svh, 100dvh) remains for hero + showcase.
- **Files touched**:
  - `client/tailwind.config.js`
  - `client/src/index.css`
- **Test Requirements (TR)**:
  - **Rule TR-2.1**: All gold-glow box-shadow rgba opacities are ≤ 0.22 (scan tailwind.config).
  - **Rule TR-2.2**: `@keyframes shimmer` duration ≥ 12s (8s in original; increase).
  - **Rule TR-2.3**: `prefers-reduced-motion: reduce` block at top of index.css → selector scope matches new reveal/journey classes.
  - **Rubric TR-2.4 (0-2, threshold 2)**: CSS architecture — no new global `overflow-x: hidden`; all containment via layout. 2 = compliant; 1 = one minor violation; 0 = global hack.
- **Completion Evidence**: CSS file diff; opacity scan output.

---

## Task 3: Navbar + Layout Audit (active underline + WhatsApp copy)

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 1, 2
- **Scope**:
  - Navbar active state: set `is-active` class on the current link via `useLocation()`.
  - Header WhatsApp pill prefill = FR-16#1 string from a BUSINESS helper.
  - Ensure mobile hamburger aria-expanded toggles.
  - Add `aria-current="page"` where applicable.
- **Files touched**:
  - `client/src/components/layout/Navbar.tsx`
  - `client/src/components/layout/Layout.tsx` (quick CustomCursor touch-disable audit)
- **Test Requirements (TR)**:
  - **Rule TR-3.1**: On `/about`, the About navbar link has class `is-active`.
  - **Rule TR-3.2**: Navbar WhatsApp href starts with `https://wa.me/919935178342?text=Hello%20SSKK%2C%20I%27d%20like%20to%20know%20more...`.
  - **Rule TR-3.3**: CustomCursor on coarse pointers disabled (pointer: coarse media guard).
  - **Rule TR-3.4**: Navbar scroll threshold 40px → transparent → glass; bottom border hairline visible when scrolled.
- **Completion Evidence**: Navbar file diff; test URL navigation active state.

---

## Task 4: Hero Section Redesign (CinematicHero.tsx) — Restrained Motion + New Copy

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 2, 3
- **Scope**:
  - REMOVE letter-by-letter cycling brand animation (5.6s strobe).
  - ADD single on-load fade-up of the 2 new lines.
  - H1 = "Crafted in Gold.\nDesigned for Your Forever."
  - Body = "Timeless jewellery crafted with precision, passion and trusted craftsmanship in Doharighat, Mau."
  - CTA 1: `EXPLORE JEWELLERY` → `/collections`.
  - CTA 2: `BOOK A SHOWROOM VISIT` → `/contact#visit`.
  - Secondary WhatsApp CTA: Hero-specific prefill (FR-16#2).
  - Shimmer 12s cycle; sheen sweep 14s (via CSS tokens from Task 2).
  - Hero video: desktop `Jewellery_commercial_for_SSKK_202608271422.mp4`, mobile `..._202608311433.mp4`.
  - Eyebrow: `SHUBHAM SWARN KALA KENDRA`.
- **Files touched**:
  - `client/src/components/sections/CinematicHero.tsx`
- **Test Requirements (TR)**:
  - **Rule TR-4.1**: H1 innerText when split by newline = `["Crafted in Gold.", "Designed for Your Forever."]`
  - **Rule TR-4.2**: No `BRAND_ANIMATION_TOTAL_MS` or letter-per-char animation variants remain; grep 0 matches.
  - **Rule TR-4.3**: 3 CTA buttons/links present (Explore, Book Visit, WhatsApp).
  - **Rule TR-4.4**: Eyebrow = `SHUBHAM SWARN KALA KENDRA` uppercase, letter-spacing ≥ 0.28em.
  - **Rubric TR-4.5 (0-5, threshold 4)**: Hero luxury feel (RU-06 proxy for hero). Evidence: screenshot at 1440w and 390w.
- **Completion Evidence**: CinematicHero diff; screenshots.

---

## Task 5: Trust Bar — Keep & Refine (shadows, labels, dividers)

- **Priority**: medium
- **Status**: pending
- **Depends on**: Task 2
- **Scope**:
  - TrustBar already has 5 items. Ensure labels exactly:
    1. BIS Hallmarked Gold (not "BIS Hallmarked")
    2. Certified Diamonds
    3. 22K & 18K Gold (not "22K & 18K")
    4. Authentic Craftsmanship
    5. Custom Designs
  - Tweak box-shadow / border-glow opacity per Task-2 tokens.
  - Mobile: 2-col grid, tablet 3-col, md+ 5-col with hairline dividers.
- **Files touched**:
  - `client/src/components/sections/TrustBar.tsx`
- **Test Requirements (TR)**:
  - **Rule TR-5.1**: `trustItems.length === 5` and labels match FR-04 strings exactly.
  - **Rule TR-5.2**: Each item has non-empty icon render + alt (decorative icons aria-hidden).
  - **Rule TR-5.3**: Mobile view shows 2-col grid, no overflow, all labels readable.
- **Completion Evidence**: TrustBar diff; responsive screenshot.

---

## Task 6: Collections Section (9 Categories with fallback images)

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 1, 2
- **Scope**:
  - Keep existing Categories component but:
    a. Union fetched DB categories with a front-end 9-category static map (name, slug fallback, description, image override).
    b. Cards use image zoom 1.038 hover + gold border.
    c. Mang Tikka and Custom Jewellery always render (use asset fallbacks from Task-1 if not in DB).
    d. Add a 1-line category description for each of 9.
    e. "Explore →" link: if slug exists in DB go to `/collections/:slug`, else go to `/collections?category=:name`.
  - Mobile: 2-col responsive grid (NOT horizontal scroll to avoid overflow — rule R-11).
  - Subtitle real copy: reference Doharighat craftsmanship and BIS hallmark.
- **Files touched**:
  - `client/src/components/sections/Categories.tsx`
- **Test Requirements (TR)**:
  - **Rule TR-6.1**: 9 category cards render regardless of DB response.
  - **Rule TR-6.2**: Each card has non-empty `img.alt`, name, description, Explore link.
  - **Rule TR-6.3**: No horizontal scroll at 320w (R-11).
  - **Rule TR-6.4**: "Explore Our Collections" title + real subtitle (no AI phrasing).
- **Completion Evidence**: Categories diff; 9-card DOM snapshot.

---

## Task 7: Signature Pieces / Featured Products (Title + WhatsApp prefill)

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 1, 2
- **Scope**:
  - Title: "Signature Pieces" (was "Featured Jewellery").
  - Subtitle: "Timeless designs created to become part of your story."
  - ProductCard WhatsApp prefill updated to include SLUG/SKU per FR-06.
  - Add optional "View All Jewellery" CTA to the right of title if not already.
  - ProductCard: goldPurity shown if present, weight shown if present, "Contact for Price" when no price.
  - Ensure no invented prices.
- **Files touched**:
  - `client/src/components/sections/FeaturedProducts.tsx`
  - `client/src/components/ui/ProductCard.tsx`
- **Test Requirements (TR)**:
  - **Rule TR-7.1**: `h2.textContent` of section = "Signature Pieces".
  - **Rule TR-7.2**: Subtitle matches FR-06 exactly.
  - **Rule TR-7.3**: Product card WhatsApp href includes product name + `SKU` keyword.
  - **Rule TR-7.4**: When `product.price` is missing, card shows "Contact for Price" (not ₹0).
- **Completion Evidence**: FeaturedProducts + ProductCard diff; screenshot of card with hover state.

---

## Task 8: Bridal Heritage Editorial Section (Asymmetric + Parallax)

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 2
- **Scope**:
  - Keep existing component but rework copy + layout + bullets:
    - Title: `"Bridal Heritage"`
    - Copy: `"Jewellery designed to make your most unforgettable moments even more extraordinary."`
    - 6 bullets: Necklaces, Earrings, Maang Tikka, Nath, Bangles, Bridal Sets
    - CTA: `EXPLORE BRIDAL COLLECTION` → `/collections/bridal`
  - Asymmetric grid (1 large + 4 small) already exists — polish with gold hairline dividers.
  - Parallax y ±4% only, disabled on prefers-reduced-motion via `useReducedMotion()`.
- **Files touched**:
  - `client/src/components/sections/BridalCollection.tsx`
- **Test Requirements (TR)**:
  - **Rule TR-8.1**: Title, copy, CTA strings match spec exactly.
  - **Rule TR-8.2**: 6 bullets rendered as list (ul).
  - **Rule TR-8.3**: Parallax transform skips when `useReducedMotion()` returns true.
  - **Rule TR-8.4**: 5 bridal images use bridalSet, haarSet, jhumkaAlt, pendantNath, bangleAlt from JEWELRY_IMAGES.
- **Completion Evidence**: BridalCollection diff; screenshot.

---

## Task 9: Why Choose SSKK — Expand to 6 Features (Zero-Duplicity with About 4-Pillar)

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 1, 2
- **Scope**:
  - Rewrite WhyChooseUs Home to 6 numbered cards (01–06):
    1. 01 — BIS Hallmarked Gold
    2. 02 — Certified Diamonds
    3. 03 — Expert Craftsmanship
    4. 04 — Transparent Pricing (includes disclaimer: estimates based on live gold rates + making charges)
    5. 05 — Custom Jewellery
    6. 06 — Personalised Service
  - Content must share 0 identical paragraphs with About's Four Pillars block.
  - 6-item grid: 2 col mobile / 3 col md / 6 col xl.
  - Numbered 01–06 (Playfair Display serif, gold faded large numerals).
- **Files touched**:
  - `client/src/components/sections/WhyChooseUs.tsx`
- **Test Requirements (TR)**:
  - **Rule TR-9.1**: 6 feature cards rendered.
  - **Rule TR-9.2**: Card titles exactly match FR-08 list (6 items with 01–06 prefix UI).
  - **Rule TR-9.3**: Transparent Pricing card contains substring "live gold rates" and "making charges".
  - **Rule TR-9.4**: Zero-duplicity: no feature description equals any line from About Four Pillars descriptions (R-15). Diff check.
- **Completion Evidence**: WhyChooseUs diff; 6-card screenshot.

---

## Task 10: Our Story Section (Art Behind Every Piece — NEW component)

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 1, 2
- **Scope**:
  - Write a NEW `OurStory.tsx` component (in sections/).
  - Split layout: left = collage (royalRing, birdLocket, showcase with 2 offset borders), right = copy + CTA.
  - Heading: `"The Art Behind Every Piece"`.
  - 3 short body paragraphs (not cliché) — focus on Doharighat showroom, BIS hallmarking, 22K & 18K, custom consultation.
  - CTA: `"Discover Our Story →"` → `/about#story`.
  - Scroll-reveal fade-up with sequential delay.
- **Files touched**:
  - `client/src/components/sections/OurStory.tsx` (NEW)
  - `client/src/components/sections/index.ts` (export)
  - `client/src/pages/Home.tsx` (replace placeholder)
- **Test Requirements (TR)**:
  - **Rule TR-10.1**: 3 body paragraphs exist, ZERO contain forbidden phrases (FR-27 blacklist).
  - **Rule TR-10.2**: CTA link href === "/about#story".
  - **Rule TR-10.3**: Left column collage uses ≥2 images from JEWELRY_IMAGES.
  - **Rule TR-10.4**: Heading text === "The Art Behind Every Piece".
- **Completion Evidence**: New component file; replace placeholder in Home; screenshot.

---

## Task 11: 5-Step Customer Journey (NEW component)

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 2
- **Scope**:
  - NEW `CustomerJourney.tsx` component in sections/.
  - Steps: 01 Discover · 02 Consult · 03 Customize · 04 Craft · 05 Celebrate.
  - Each step: eyebrow uppercase, heading, 1-line description.
  - Vertical gold gradient connecting line on md+; horizontal on mobile.
  - Sequential scroll-reveal fade-up.
- **Files touched**:
  - `client/src/components/sections/CustomerJourney.tsx` (NEW)
  - `client/src/components/sections/index.ts`
  - `client/src/pages/Home.tsx`
- **Test Requirements (TR)**:
  - **Rule TR-11.1**: 5 steps rendered; titles match FR-10 list exactly.
  - **Rule TR-11.2**: Each step has a numbered numeral UI (01–05).
  - **Rule TR-11.3**: Connector line rendered (vertical md+, horizontal mobile).
- **Completion Evidence**: New component; Home screenshot.

---

## Task 12: Custom Jewellery CTA Banner (NEW component)

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 1, 2
- **Scope**:
  - NEW `CustomCTA.tsx` component.
  - H2: `"Have Something Special in Mind?"`.
  - Sub: `"Let our craftsmen turn your idea into a one-of-a-kind piece."`.
  - Buttons:
    1. `START YOUR CUSTOM DESIGN` → `/contact#enquiry` (opens contact form + set default category=Custom via searchParam state or initial value).
    2. `WHATSAPP US` → FR-16#4 custom-design prefill.
  - Background: dark purple radial gradient + existing showcase image as low-opacity overlay; gold hairline top/bottom.
- **Files touched**:
  - `client/src/components/sections/CustomCTA.tsx` (NEW)
  - `client/src/components/sections/index.ts`
  - `client/src/pages/Home.tsx`
- **Test Requirements (TR)**:
  - **Rule TR-12.1**: H2 and Sub strings exact match.
  - **Rule TR-12.2**: Button 1 href ends with `/contact#enquiry`.
  - **Rule TR-12.3**: Button 2 WhatsApp href contains prefill with substring "custom jewellery design".
- **Completion Evidence**: New component; screenshot.

---

## Task 13: Showroom Visit Section (NEW component) + Map + 3 CTAs

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 1, 2
- **Scope**:
  - NEW `Showroom.tsx` component.
  - H2: `"Visit SSKK in Doharighat"`.
  - Two-column (lg+): left = glass location card (address · phone · WhatsApp · hours), right = map iframe.
  - Single col on mobile: card first, then map (max 360px height on mobile).
  - 3 Buttons (row md+, full-width mobile): GET DIRECTIONS, CALL US, WHATSAPP US.
  - Google Directions link: use encoded BUSINESS.address query.
- **Files touched**:
  - `client/src/components/sections/Showroom.tsx` (NEW)
  - `client/src/components/sections/index.ts`
  - `client/src/pages/Home.tsx`
- **Test Requirements (TR)**:
  - **Rule TR-13.1**: 3 buttons present with correct hrefs (Directions = Google Maps search; Call = tel:91...; WhatsApp = wa.me...).
  - **Rule TR-13.2**: Map iframe `title`, `loading="lazy"`, `height` responsive.
  - **Rule TR-13.3**: Address pulled from BUSINESS.address (no duplication).
  - **Rule TR-13.4**: Hours substring match BUSINESS.hours.
- **Completion Evidence**: New component; screenshot at 1440w and 390w.

---

## Task 14: Testimonials Section (SAFE — NEW component with editable watermark)

- **Priority**: medium
- **Status**: pending
- **Depends on**: Task 1, 2
- **Scope**:
  - NEW `Testimonials.tsx` component.
  - Consumes `TESTIMONIALS_EDITABLE` from business.ts.
  - If array empty → show ONE placeholder card with:
    - Quote: `"Replace this text with a verified customer testimonial."`
    - Name: `"Customer Name"` with `[EDITABLE]` watermark text
    - Location: `"Doharighat, Mau"`
    - 5 gold stars
    - Visible "Example · Edit in BUSINESS.ts" banner badge across card.
  - Carousel: prev/next arrow buttons + dot indicators; auto-advance disabled or 8s.
  - Keyboard: arrows navigate, Esc defocuses.
- **Files touched**:
  - `client/src/components/sections/Testimonials.tsx` (NEW)
  - `client/src/components/sections/index.ts`
  - `client/src/pages/Home.tsx`
- **Test Requirements (TR)**:
  - **Rule TR-14.1**: Renders structure even with TESTIMONIALS_EDITABLE = [] (no crash, no "undefined").
  - **Rule TR-14.2**: No fabricated customers/quotes outside editable array (R-13).
  - **Rule TR-14.3**: Prev/Next + dots interactive; aria-labels set.
  - **Rule TR-14.4**: Editable watermark/badge visible when empty/using example.
- **Completion Evidence**: New component; screenshots of both empty and 1-entry state.

---

## Task 15: FAQ Accordion (NEW component — 7 questions)

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 2
- **Scope**:
  - NEW `FAQ.tsx` component.
  - 7 items exactly (FR-14 list).
  - Smooth max-height + opacity + rotate chevron (350ms).
  - Keyboard: Enter/Space toggles summary; Tab through; aria-expanded.
  - Answers grounded in BUSINESS data (e.g., hours, address, hallmark YES). No fabrication.
- **Files touched**:
  - `client/src/components/sections/FAQ.tsx` (NEW)
  - `client/src/components/sections/index.ts`
  - `client/src/pages/Home.tsx`
- **Test Requirements (TR)**:
  - **Rule TR-15.1**: Exactly 7 accordion items; questions match FR-14 list exactly.
  - **Rule TR-15.2**: All 7 start closed; opening one does NOT auto-close others.
  - **Rule TR-15.3**: Smooth height animation works (no jumps <350ms).
  - **Rule TR-15.4**: Q2 answer includes substring "BIS hallmark" (or "Hallmark").
  - **Rule TR-15.5**: Q4 answer includes BUSINESS.hours substring.
- **Completion Evidence**: New component; FAQ screenshot with 2 items open.

---

## Task 16: Home Inquiry Form (Category required + validation polish)

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 1, 2
- **Scope**:
  - Update HomeInquiry: Jewellery Category select becomes REQUIRED.
  - Category options match FR-15 list: Ring, Earrings, Necklace, Bangles, Bridal, Custom Jewellery, Other.
  - Add aria-describedby + aria-invalid on error states.
  - Success: reset + inline green banner + toast.
  - Error: inline messages red per field + toast.
  - Loading: submit disabled, spinner.
- **Files touched**:
  - `client/src/components/sections/HomeInquiry.tsx`
- **Test Requirements (TR)**:
  - **Rule TR-16.1**: Form cannot submit when Category = "" (required).
  - **Rule TR-16.2**: Category options 7 exactly match FR-15.
  - **Rule TR-16.3**: Name empty → error shown. Phone non-10-digit → error shown. Message <10 → error shown.
  - **Rule TR-16.4**: Valid submit POSTs to `/inquiries` (check network or preserved api call path).
  - **Rule TR-16.5**: `aria-invalid="true"` present on errored fields.
- **Completion Evidence**: HomeInquiry diff; screenshot of error state + success state.

---

## Task 17: Assemble Home.tsx (Replace 6 placeholders, order correct)

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 4–16 inclusive
- **Scope**:
  - Remove the 6 Placeholder* components from Home.tsx.
  - Import & render 13 sections in FR-01 order (verified sequentially).
  - Add section `aria-label`s and `id`s so in-page anchors work (#bridal, #why-sskk, #our-story-home, #customer-journey, #custom-cta, #showroom-visit, #testimonials-home, #faq-home, #home-inquiry, #hero, #categories, #signature-pieces).
  - Remove leftover `PlaceholderTrustBar` (it was placeholder; real TrustBar already renders).
- **Files touched**:
  - `client/src/pages/Home.tsx`
- **Test Requirements (TR)**:
  - **Rule TR-17.1**: 13 sections in correct order in DOM (inspect order).
  - **Rule TR-17.2**: Zero strings in Home matching `/Placeholder|Rendered in T\d+/i` (R-01).
  - **Rule TR-17.3**: All section IDs match anchor strings from Navbar (Our Story → /about#story).
- **Completion Evidence**: Home.tsx diff; scroll-through DOM order.

---

## Task 18: Collections / Jewellery Page (Price Sort Disabled When No Price Data)

- **Priority**: medium
- **Status**: pending
- **Depends on**: Task 1, 2
- **Scope**:
  - In Collections page:
    a. Add "Contact showroom for pricing" notice if no product with price found.
    b. Price low/high sort options disabled (grey + aria-disabled) when no prices.
    c. Add Mang Tikka to quick filters chip list in SearchOverlay too.
    d. Ensure breadcrumbs are present.
- **Files touched**:
  - `client/src/pages/Collections.tsx`
  - `client/src/components/common/SearchOverlay.tsx` (quick categories +9)
- **Test Requirements (TR)**:
  - **Rule TR-18.1**: Collections search overlay 9 quick chips include "Mang Tikka" and "Custom".
  - **Rule TR-18.2**: With product.price missing on all items → price min/max inputs disabled and notice shown.
  - **Rule TR-18.3**: Sort dropdown option for Price Low→High disabled when no price data.
- **Completion Evidence**: Collections + SearchOverlay diff; screenshots of disabled state.

---

## Task 19: Product Detail Page (Audit Gallery + Zoom + Related)

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 1
- **Scope**:
  - Read full ProductDetail.tsx (200 lines done; finish audit remainder).
  - Ensure:
    a. Thumbnails strip (vertical/horizontal), swipe (touch) on mobile.
    b. Hover zoom (desktop) image lens with CSS.
    c. Fullscreen viewing button or native.
    d. WhatsApp action uses FR-06 prefill.
    e. Related products: 4 tiles (exclude self) from same category.
    f. Pricing disclaimer if price present ("Prices are estimates based on live gold rates and making charges. Contact showroom for final quote.")
    g. If no price → "Contact for Price" badge + WhatsApp CTA prominent.
- **Files touched**:
  - `client/src/pages/ProductDetail.tsx` (full file)
- **Test Requirements (TR)**:
  - **Rule TR-19.1**: Price disclaimer OR Contact for Price present (one or the other).
  - **Rule TR-19.2**: WhatsApp href uses product name + slug/SKU.
  - **Rule TR-19.3**: Related grid contains 4 items max.
  - **Rule TR-19.4**: Breadcrumb has Home/Collections/CategorySlug/Product (4 items).
  - **Rubric TR-19.5 (0-5, threshold 4)**: Gallery feel — mobile swipe and desktop zoom usable.
- **Completion Evidence**: ProductDetail diff; screenshot of gallery (desktop + mobile).

---

## Task 20: About Page (About → Our Story anchor + polish)

- **Priority**: medium
- **Status**: pending
- **Depends on**: Task 1, 2
- **Scope**:
  - Add `id="story"` to an appropriate section (second major block) so `/about#story` scrolls to it.
  - Verify Four Pillars of Trust block REMAINS (4 items, not 6).
  - Ensure copy: zero forbidden phrases.
  - Polish hero banner (no cheap gradients).
- **Files touched**:
  - `client/src/pages/About.tsx`
- **Test Requirements (TR)**:
  - **Rule TR-20.1**: `document.getElementById('story')` exists on About page.
  - **Rule TR-20.2**: Four Pillars count = 4 (unchanged, zero-duplicity with Home 6-item R-15).
  - **Rule TR-20.3**: No forbidden phrases (blacklist scan).
- **Completion Evidence**: About diff; anchor jump working from Home → About#story.

---

## Task 21: Contact Page (Form Category Required + id=visit + id=enquiry)

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 1, 2, 16
- **Scope**:
  - Add `id="visit"` to the map/showroom section.
  - Add `id="enquiry"` to the form section.
  - Update form category select options to FR-15; make Category required (consistent with Task 16).
  - Add same aria-invalid + aria-describedby pattern as HomeInquiry.
  - Form CTA label: `"SEND ENQUIRY"`.
  - Pre-fill category=Custom if user came from CustomCTA (read query param / state if available).
- **Files touched**:
  - `client/src/pages/Contact.tsx`
- **Test Requirements (TR)**:
  - **Rule TR-21.1**: `id="visit"` and `id="enquiry"` exist.
  - **Rule TR-21.2**: Category is required field (cannot submit blank).
  - **Rule TR-21.3**: Submit button reads "SEND ENQUIRY" (case insensitive match of words).
  - **Rule TR-21.4**: Map height responsive; no horizontal scroll on mobile.
- **Completion Evidence**: Contact diff; scroll anchors work.

---

## Task 22: Floating Contact / Bottom Bar (mobile <640px exclusive)

- **Priority**: medium
- **Status**: pending
- **Depends on**: Task 1, 2
- **Scope**:
  - Audit FloatingContact already handles the MOBILE_BREAKPOINT 639.98px switch.
  - Ensure bottom bar and floating FAB are MUTUALLY EXCLUSIVE (no double-render).
  - Bottom bar: Call | WhatsApp | Directions (3 tiles, full-width) — already there; ensure links match the 3 buttons used in Showroom section.
  - Floating WhatsApp FAB: prefill matches FR-16#5 generic greeting.
- **Files touched**:
  - `client/src/components/layout/FloatingContact.tsx`
- **Test Requirements (TR)**:
  - **Rule TR-22.1**: At viewport 390w → bottom bar visible, floating FAB hidden.
  - **Rule TR-22.2**: At viewport 768w → floating FAB visible, bottom bar hidden.
  - **Rule TR-22.3**: Directions link on both uses Google Maps search URL with encoded BUSINESS.address.
- **Completion Evidence**: FloatingContact diff; 2-width screenshots.

---

## Task 23: Footer Audit & Polish (Ensure 4 columns + Collections links)

- **Priority**: medium
- **Status**: pending
- **Depends on**: Task 1, 2
- **Scope**:
  - Footer already has 4 columns. Verify:
    - Col 1: brand, short description, 3 socials (Instagram / Facebook / WhatsApp).
    - Col 2 (Quick Links): Home, Jewellery, Bridal, About, Our Story (#story), Visit Us (#visit), Contact (7 links).
    - Col 3 (Collections): Rings, Earrings, Necklaces, Chains, Bangles, Bridal, Nath (7 links).
    - Col 4 (Contact): Address, Phones ×2 linked, WhatsApp, Email linked.
  - Bottom bar: Copyright left; Privacy · Terms · Crafted by Shubham Verma right.
  - Year uses `new Date().getFullYear()`.
- **Files touched**:
  - `client/src/components/layout/Footer.tsx`
- **Test Requirements (TR)**:
  - **Rule TR-23.1**: 7 Quick Links + 7 Collections links (R-09).
  - **Rule TR-23.2**: Footer Collections col has "Nath" link (not Nath + Mang Tikka combined since Mang Tikka is visual-only).
  - **Rule TR-23.3**: Credit line reads "Crafted by Shubham Verma".
  - **Rule TR-23.4**: All 7 footer category links actually route to `/collections/:slug` with slugs that exist in SEO config (R-09 200).
- **Completion Evidence**: Footer diff; screenshot at 1440w.

---

## Task 24: Lint / Typecheck / Build + QA Script (Full Functionality Audit)

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 3–23 inclusive
- **Scope**:
  - Run `npm run lint` (tsc --noEmit) in client folder.
  - Run `npm run build` — verify 0 TS errors, 0 fatal.
  - Boot dev server (backend if present required for API /products fallback; or let ErrorState render gracefully).
  - Manually audit FR-28 checklist (document as evidence).
- **Test Requirements (TR)**:
  - **Rule TR-24.1**: `tsc --noEmit` returns exit 0.
  - **Rule TR-24.2**: `vite build` completes with 0 errors (warnings tolerated if ≥ moderate only).
  - **Rule TR-24.3**: No console.error in 5-page walk (Home → Collections → About → Contact → a Product).
  - **Rubric TR-24.4 (0-5, threshold 4)**: Functional completeness — FR-28 checklist items verified ×28. 5 = all verified; 4 = 1–2 minor warnings; 3 = missing features.
- **Completion Evidence**: Build output log; QA checklist annotations.

---

## Task 25: Accessibility + Contrast + Responsive Walkthrough (Document)

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 24
- **Scope**:
  - Run axe-core scan on homepage; fix any ≥ moderate issues.
  - Verify focus visible ring 2px gold on every interactive.
  - Resize 9 breakpoints (320, 375, 390, 414, 768, 1024, 1280, 1440, 1920) — screenshot each width + confirm scrollMaxX = 0.
  - Toggle prefers-reduced-motion → no hero parallax, no shimmer sweep, no fade-up delays (instant opacity 1).
- **Test Requirements (TR)**:
  - **Rule TR-25.1**: axe ≥ moderate 0 or 1 only; if 1 explain and note.
  - **Rule TR-25.2**: `window.scrollMaxX === 0` at every breakpoint (R-11).
  - **Rule TR-25.3**: prefers-reduced-motion on → motion CSS animations all apply `animation: none` or instant opacity.
  - **Rubric TR-25.4 (0-5, threshold 4)**: Overall accessibility (RU-04).
- **Completion Evidence**: axe screenshot; 9 breakpoint image grid; reduced motion screenshot.

---

## Task 26: Performance Lighthouse + Image Lazyload Audit

- **Priority**: medium
- **Status**: pending
- **Depends on**: Task 24, 25
- **Scope**:
  - Run Lighthouse mobile, desktop on build output or `vite preview`.
  - Target ≥ 80 perf mobile, ≥ 90 desktop.
  - Ensure above-the-fold hero poster NOT lazy; everything below → lazy.
  - Ensure SEO scores ≥ 95 (titles, meta, OG, canonical present).
  - Check JS bundle size (homepage chunk). If > 600KB, note down and consider lazy-loading HeroVideo wrapper until near viewport.
- **Test Requirements (TR)**:
  - **Rule TR-26.1**: SEO score ≥ 95 (Lighthouse).
  - **Rule TR-26.2**: All `<img>` tags below hero → `loading="lazy"` attribute present.
  - **Rubric TR-26.3 (0-5, threshold 4)**: Lighthouse performance (RU-07 mobile).
- **Completion Evidence**: Lighthouse HTML/JSON; bundle-size screenshot.

---

## Task 27: Final Codebase Content Pass — Forbidden Phrase + Duplicity Sweep

- **Priority**: medium
- **Status**: pending
- **Depends on**: Task 10, 14, 20, 24
- **Scope**:
  - Grep entire client/src for FR-27 forbidden phrases.
  - Replace any remaining AI-sounding copy (e.g. "curated experience" → "hand-picked selection").
  - Sweep for any stray fabricated years like "Since 1985".
  - Run duplicity check: WhyChooseUs Home 6-item paragraphs × About 4-pillar paragraphs → 0 identical strings.
- **Test Requirements (TR)**:
  - **Rule TR-27.1**: Zero occurrences of 5 forbidden phrases (case-insensitive exact match).
  - **Rule TR-27.2**: Zero strings like "Since \d\d\d\d" or "Est. \d\d\d\d" or "Established \d\d\d\d".
  - **Rule TR-27.3**: Duplicity check: Home WhyChooseUs × About Four-Pillars — no paragraph share > 8 consecutive words (R-15).
- **Completion Evidence**: Grep output showing 0 forbidden; duplicity diff.

---

## Dependencies / Pipeline Graph (topological)

```
T1  ─┐
T2  ─┼─ T3 ─ T4 ─┬─ T5 ─ T6 ─ T7 ─ T8 ─ T9 ─┬─ T10, T11, T12, T13, T14, T15, T16 ─┬─ T17 ─┬─ T18, T19, T20, T21, T22, T23 ─┬─ T24 ─┬─ T25 ─┬─ T26 ─ T27
T1  ─┘              └───────────────────────────┘                                  │       │                                    │       │       │
                                                                                     │       │                                    │       │       │
                          (All 4–16 produce components needed by 17 Assemble)       │       │                                    │       │       │
                                                                                     │       │                                    │       │       │
                                                                                     ▼       ▼                                    ▼       ▼       ▼
                                                                                   (17 joins pages)                            (24 QA) (25 A11y) (26 Perf)
```

## Task Dependencies Table (Quick Reference)

| Task | Depends On |
|---|---|
| 1 Config & SEO | — |
| 2 CSS Tokens | — |
| 3 Navbar | 1, 2 |
| 4 Hero | 2, 3 |
| 5 Trust Bar | 2 |
| 6 Collections | 1, 2 |
| 7 Featured Products | 1, 2 |
| 8 Bridal | 2 |
| 9 Why Choose SSKK | 1, 2 |
| 10 Our Story (NEW) | 1, 2 |
| 11 Customer Journey (NEW) | 2 |
| 12 Custom CTA (NEW) | 1, 2 |
| 13 Showroom (NEW) | 1, 2 |
| 14 Testimonials (NEW) | 1, 2 |
| 15 FAQ (NEW) | 2 |
| 16 Home Inquiry Form | 1, 2 |
| 17 Assemble Home | 4–16 all |
| 18 Collections/Search polish | 1, 2 |
| 19 Product Detail audit | 1 |
| 20 About polish | 1, 2 |
| 21 Contact polish | 1, 2, 16 |
| 22 Floating Contact | 1, 2 |
| 23 Footer polish | 1, 2 |
| 24 Build & QA Script | 3–23 |
| 25 A11y & Responsive | 24 |
| 26 Lighthouse Perf | 24, 25 |
| 27 Content Final Sweep | 10, 14, 20, 24 |
