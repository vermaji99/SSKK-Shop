# SSKK Part 1 — Professional Audit + Luxury Design System

## Problem, Users, Goals

### Problem Statement
The SSKK website (commit baseline after 0e4e06b) has a solid React/Vite/TS/Tailwind architecture with backend, 18 real jewellery images, hero videos, React Query data layer, Zustand stores, admin dashboard, and inquiry API integration. However:

1. **CRITICAL RUNTIME BUG: Home.tsx line 114 references `PlaceholderTrustBar` component but the component is named `TrustBar` — undefined reference will crash the render or fallback to throw when reached.
2. **Unfinished / AI-generated appearance: Home.tsx has 6 placeholder section components (`PlaceholderOurStory`, `PlaceholderCustomerJourney`, `PlaceholderCustomCTA`, `PlaceholderShowroom`, `PlaceholderTestimonials`, `PlaceholderFAQ`) visibly rendering text visibly showing "Rendered in T11/T12/T13/T14/T15" text. Extremely unprofessional, looks unfinished.
3. **Trust-signal duplicity (zero-duplicity violation):
   - Home.tsx renders TrustBar (5 trust items + WhyChooseUs 6 cards trust cards
   - About.tsx also has 4 Four Pillars of Trust cards
   - Total 3 separate trust sections with duplicated content
4. **Design System gaps:** Badge component: `variantStyles` object with no styles. variantStyles: { featured: '', bestseller: '', new: '' } - no visual difference between badge variants at all.
5. **BridalCollection layout math error:** Grid spec 2 cols × 3 rows = 6 cells. Image 1 spans 2×2 = 4 cells. Images 2-5 = 4 cells = 8 total required 2 overflow, causing visual breakage grid overflow.
6. **Typography:** No explicit complete typography scale defined in Tailwind config. Tailwind `theme.extend.fontSize is empty entirely — relies entirely on hand-rolled CSS utility classes (.editorial-h1, .body-serif without Tailwind fontSize values that must be unified and consistent hierarchy incomplete.
7. **Button system inconsistency:** Button.tsx has `sizeClasses md: 'px-6 py-3 text-sm' but CSS `.btn-primary` class defines `px-6 md:px-8 py-3` — sites use `.btn-primary class instead overlap both coexist without
8. **ProductCard wishlist button bug: two wishlist buttons rendered: one in AnimatePresence isHovered true + one rendered `!isHovered` outside conditionally. On touch devices, hover unreliable, double wishlist logic messy duplicated renders inconsistent
9. **Identical page hero patterns:** About.tsx & Contact.tsx identical purple radial-gradient hero page hero both with identical gradients radial backgrounds both have hero pattern duplicated hero header style
10. **CSS `.container` CSS class in conflict: tailwind.config.js defines `container.container-container`. CSS `container` CSS utility custom redefined at lines 299-305 with padding override conflict
11. **Unused Button variant**: `outline-gold` Button defined without any usage anywhere in codebase`
12. **TESTIMONIALS_EDITABLE placeholder:** `business.ts:52-60` text clearly placeholder still contains `name: 'Customer Name /* EDITABLE — replace with verified review */' quote: 'Replace this text with a verified customer testimonial shared by a real SSKK client.' fabricated placeholder
13. **HomeInquiry category <select> inline-styled:** home-inquiry: className select not using reusable component style component styling component consistent contact form
14. **WhatsApp prefill inconsistency:** FloatingContact.tsx uses inline encode inline msg instead of `WHATSAPP_PREFILLS.floating from the BUILDWhatsAppUrl inconsistency. FloatingContact generic
15. **Luxury restraint violation:** FloatingContact desktop FAB WhatsApp animate-ping (emerald-400/40 pulsing/glowing opacity.
16. **Navbar dual WhatsApp buttons:** Navbar action row search, mobile bottom in navbar 2 x WhatsApp CTAs on header + dedicated WhatsApp text-button round inline inline-text inline text: search/wishlist/cart/menu icon buttons
17. **SEO OG image space-unsafe: index.html Twitter card og:image path: `/Luxury%20Gold%20Necklace.png — spaces in URL paths
18. **About page hero title:** H1: `Our Showroom` not about hero mismatch About title mismatch about page hero
19. **Nav 'Our Story' nav points to `/about#story` anchor but About.tsx has no element with id="story"**
20. **Container max-w container tailwind.container xl & container 2xl both 1280px** — no differentiation; 1440 1920 breakpoints underserved container sizes missing container gap 1440px 1920px design spec target

### Target Users (Priority order:
1. Brides & parents (Mau/Eastern UP — WhatsApp-native, heavy mobile-first mobile buyers) — needs trust signals and no placeholder-free polished luxury feel; 2. Local daily visitors showroom — needs clear direction & showroom info clarity; 3. Custom-design customers — premium-quality assurance; 4. Admin users/return

### Goals
- **Goal 1: Runtime safety:** Eliminate ALL runtime bugs (the
- **Goal 2: Luxury Finish Foundation Clean professional-looking existing functionality
- **Goal 3: Design System:** Establish complete unified Tailwind-first colour palette (luxury spacing typography hierarchy spacing scale)
- **Goal 4: Visual** Preserve functionality**preserve 100% functionality: Query/Zustand/Stores/SearchOverlay/AdminDashboard/ProductCard Wishlist//Login/Privacy/Terms FloatingContact/LenisSmooth Scroll/LuxuryPreloader/CustomCursor/ScrollProgress HeroVideo

### Non-Goals
1. Do NOT add new section content (no Our Story, FAQ implementation Customer Journey, content new section creation. That's Phase later phases
2. Do NOT backend. Models, controllers, routes, or schema unchanged
3. Do NOT add npm dependencies unnecessary
4. Do NOT fabricate content
5. Do NOT modify Hero Video assets replace assets
6. Do NOT remove Admin login routes.

---

## Functional Requirements (FR)

### FR-01 Runtime Bug Fixes Eliminate
- **F-01a** Replace undefined PlaceholderTrustBar undefined undefined removed Home.tsx. render the correct component or remove the reference render entirely to match project_memory decision (WhyChooseUs excluded from Home zero-duplicity)
- **F-01b Home.tsx line 114 `PlaceholderTrustBar` → must not present any
- **F-01c ProductCard wishlist logic:** Consolidate wishlist buttons ONE per product only reliable for hover & touch

### F-02 Zero-duplicity Trust: Consolidation Trust
- **F-02a Home trust only** Remove all placeholder Home remove placeholder sections Placeholder from Home render
- **F-02b WhyChooseUs.tsx is excluded from Home.tsx render as per project_memory "WhyChooseUs excluded from Home; trust signals consolidated" mandate (existing TrustBar → TrustBar is the trust the in rendered
- **F-02c** TrustBar rendered immediately after Hero immediately after Hero on Home

### F-03 Luxury Design System Foundation: Tailwind
- **F-03a Color System:** Formalize color in tailwind.config.js extend.theme.extend with:
  - Formal color tokens colors.colorScheme
  - Ensure color palette tokens are used consistently; formalize `background`, background, accent gold ensure tokens the palette defined formally inside inside the the
- **F-03b Typography:** Add complete fluid typography scale in tailwind.config.js extend: `.fontSize key with `display`/`h1`/`h2`/`h3`/`body-lg`/`body`/`small`/`label`/`button text with `fluid clamp font sizes, letterspacing, line heights font fluid responsive
- **F-03c Spacing Scale:** ensure consistent spacing tokens via theme.extend.spacing scale ` spacing scale (space 4 8px multiples / )
- **F-03d Container:** Support 1280/1440/1920 breakpoints; Fix 2xl=1536px currently `screen width max w- max-w consistent
- **F-03e:** `.container CSS utility Remove from custom CSS  conflicting class** — only Tailwind container

### F-04 Component System Cleanup
- **F-04a Badge:** Badge variants visually distinct Featured/Bestseller/New actual visual distinct not empty
- **F-04b Button:** Resolve Button component vs CSS .btn-primary overlap. ONE unified button Button component is the source of truth. Consistent transitions for Button
- **F-04c Bridal Grid:** Fix Bridal grid layout math cells× correct layout. Consistent grid
- **F-04d Select styling in forms consistent consistent styling. Consistent `< selectInput component styling reusable
- **F-04e FloatingContact:** Replace pulsing removed, elegant minimal luxury
- **F-04f** WhatsApp button consistent: buildWhatsAppUrl utility everywhere — duplicit inline messages removed WhatsApp Prefilled messages from `business.ts` `WHATSAPP_PREFILLS
- **F-04g Navbar:** Consolidate WhatsApp CTA. Search / Wishlist / Cart / MobileMenu only ONE WhatsApp action buttons as per luxury minimal

### F-05 Navigation: About Page Anchors
- id="story" anchor on About page section where Our Story is section begins matching the nav About

### F-06 Page Hero Consistency Visual Flow Variation
About vs Contact page hero have distinct visual treatments — visual luxury same gradients / hero each page hero

### F-07 SEO / Asset: Cleanup
Og OG image properly — assets.ts SEO_OG_IMAGE used. No spaces URLs properly encoded

### F-08: Title About hero page: hero heading about hero title: aligned About SSKK About not about

### FR-09 A11y / Accessibility / contrast text contrast

### F-10 Performance: Ensure zero overflow: 0 all existing preserved Reduced motion

---

## Non-Functional Requirements (NFR)

### NF-01 Visual Design Luxury Restraint
- shadow gold glow opacity 0.16-0.28 range max. NO pulsing animations Shimmer 12s+ 14s+
### NF-02 Responsive: working 320/375/390/414/768/1024/1280/1440/1920 — no horizontal overflow
### NF-03 Zero console errors (any 0
### NF-04 preserves existing functionality completely
### NF-05 Accessibility semantic html correct heading hierarchy focus states a11y focus visible, aria labels

---

## Constraints Dependencies
- Use existing font families: Playfair Display + Cormorant Garamond + (serif headings); Inter (sans body nav, buttons, forms labels
- Use existing color existing tokens: existing background #05020A # gold #C9A227 #D4AF37
- Do NOT fabricate testimonials / fake founding dates / fake
- Do NOT create new section content. Focus on Foundation.

## Acceptance Criteria (ACs)

### RULE Type RULE
- Rule Rule: All Home.tsx does not reference `PlaceholderTrustBar` No undefined references anywhere. The production build succeeds without runtime crash risk. Build TypeScript `tsc noEmit no errors.
- R-02: Rule Zero-Duplicity: Home.tsx render contains ONE trust section only (TrustBar immediately after Hero), NOT render WhyChooseUs, NONE of PlaceholderX sections
- R-03 Badge variants are visually distinct: `featured`, `bestseller`, `new` each have unique bg/text/border combination distinct variants
- R-04: Bridal grid: grid renders no overflow; all 5 images visible within bounds; responsive; each image layout; grid 100% in
- R-05: Button Component: Button component class names produce primary, secondary, ghost, outline-gold consistent via variants, sizes consistent padding consistent
- R-06: FloatingContact desktop WhatsApp NO ping/pulsing. Opacity maxgold. Gold accent minimal animation luxury.
- R-07: WhatsApp prefill WHATSAPP_PREFILLS FloatingContact Navbar Hero product ProductCard consistent use `buildWhatsAppUrl utility  NOT inline msg inline msg inline.
- R-08 About contains id="story" anchor nav about#story About hero title reads About SSKK About content

### RUBRIC Type
U-01 Design System Fidelity overall (0-5): 4 pass 5
- 0 = no tailwind.extend improvements
- 2 = some tokens partially added
- 5 = complete fontSize spacing color container unified
- threshold ≥

- U-02 Luxury Restraint Opacity Shadows Luxury (0-3)
- 0 glow pulsing strobe everywhere
- 3 = glow 0.16-0.28 max shadow. Pulsing max 12s+ shimmer 14s+ max
- threshold ≥ 2

U-03 Professional Finish (0-4): No Placeholder sections visible; About / Home. All cards / visual consistent rhythm. Threshold 3/4.

U-04 Responsive (0-3): 9 breakpoints layout layout smooth no horizontal overflow. 3/3. 3/3.

U-05 Consistency Visual Consistency 0-4): 4/4; heading heading hierarchy 1 consistent consistent 1x1 1 consistent consistent spacing.

U-06 accessibility 0-3: Semantic headings, Focus states, aria labels, contrast readable.
