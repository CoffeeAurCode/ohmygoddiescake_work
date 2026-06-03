# Ony's Boutique - Codebase Context

> **Auto-maintained.** This file is updated by Claude whenever source files are edited. Read this before touching any file.

---

## Project Identity

| Field | Value |
|---|---|
| Package name | `omygoodies-website` |
| Version | `0.1.0` |
| Business | Ony's Boutique - luxury custom cake bakery, Calgary AB |
| Site title | "Ony's Boutique Custom Cakes \| Calgary Custom Cakes" |
| GitHub remote | `https://github.com/CoffeeAurCode/ohmygoddiescake_work` |

**What it is:** A single-page marketing + ordering website. The order form POSTs to `/api/book` which creates a Square Appointment and sends an SMS to the bakery. No payment is collected on the site.

---

## Tech Stack

| Layer | Library / Version |
|---|---|
| Framework | Next.js 16.2.4 (App Router) |
| UI | React 19.2.5 + TypeScript 5 |
| Styling | Tailwind CSS 3.4.1 + PostCSS/Autoprefixer |
| Animation (React) | Framer Motion 11.18.2 |
| Animation (imperative) | GSAP 3.15.0 |
| Icons | Lucide React 0.525.0 |
| Fonts | Playfair Display, DM Sans, Plus Jakarta Sans, Fraunces (Google Fonts via layout.tsx) |
| Booking backend | Square SDK (`square`) — Appointments + Customers APIs |
| SMS | Twilio (`twilio`) — notifies bakery on every order |

---

## Commands

```bash
npm install        # install deps
npm run dev        # dev server -> http://localhost:3000
npm run build      # production build
npm start          # serve production build

# One-off scripts (run from project root)
npx tsx scripts/verify-square.ts   # confirm all 3 Square IDs resolve
npx tsx scripts/test-all.ts        # full automated test suite (9 checks)
npx tsx scripts/test-sms.ts        # send a test SMS to BAKERY_PHONE_NUMBER
npx tsx scripts/test-booking.ts    # create a test booking in isolation
npx tsx scripts/test-customer.ts   # test customer upsert in isolation
```

Dev server config lives in `.claude/launch.json` (port 3000).

---

## Environment Variables (`.env.local` — never commit)

```bash
SQUARE_ENVIRONMENT=production
SQUARE_ACCESS_TOKEN=...           # Production personal access token
SQUARE_LOCATION_ID=LQM8M66HZ3T9Y
SQUARE_SERVICE_VARIATION_ID=5UMWC66OIJ34W5C3OZYJVYIQ
SQUARE_TEAM_MEMBER_ID=TMVuMCy5R3MIM7D5

TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_FROM_NUMBER=+13653892801
BAKERY_PHONE_NUMBER=+919998064026
```

**Critical pattern:** `lib/square.ts` and `lib/sms.ts` initialize their clients lazily (at call time, not module load time). This is required because scripts load `.env.local` via `config({ path: '.env.local' })` in the module body — ES module hoisting means the client must not be created at the top level or env vars won't be set yet. Next.js API routes are unaffected (Next.js loads env before any module), but do NOT revert the lazy pattern.

---

## Directory Map

```
ohmygoddiescake_work/
  app/
    layout.tsx            # Root layout - font imports, <html>, metadata, ScrollProgressBar
    page.tsx              # Main page - imports & orders all section components
    globals.css           # All global utilities, animations, grain overlay, marquee keyframes
    api/
      book/
        route.ts          # POST /api/book — upserts Square customer, creates booking, sends SMS
  components/
    Navbar.tsx            # Fixed top nav, desktop + mobile hamburger menu
    Hero.tsx              # Full-screen video background, Framer Motion staggered headline
    Services.tsx          # Bento/parallax image grid - 3 service cards
    HowItWorks.tsx        # 3-step timeline (fill form -> customize -> confirm)
    Pricing.tsx           # Price tables: Birthday, Wedding, Corporate, Extras
    OrderCTA.tsx          # 5-step order form — LIVE, POSTs to /api/book on submit
    FlavorsOptions.tsx    # Tabbed display: Flavors / Frostings / Sizes (used inside OrderCTA)
    AddOns.tsx            # Add-on picker: disco balls, florals, etc.
    Reviews.tsx           # Testimonials marquee strip
    About.tsx             # "Our Story" - founded 2020, Ony's background
    Footer.tsx            # Contact, nav links, Instagram
    FAQ.tsx               # FAQ accordion (NOT rendered in page.tsx)
    Policies.tsx          # Policies section (NOT rendered in page.tsx)
    WhyUs.tsx             # Brand-value section (NOT rendered in page.tsx)
    PillNav.tsx           # Reusable pill tab navigator - GSAP hover animations
    PillNav.css           # Scoped styles for PillNav
    SectionReveal.tsx     # Scroll-triggered fade-in wrapper (Framer Motion whileInView)
    ScrollProgressBar.tsx # Thin progress bar at top of viewport tied to page scroll
  lib/
    square.ts             # Square client (lazy Proxy) + OrderPayload type + helpers
    sms.ts                # Twilio client (lazy) + notifyBakery() + buildSmsText()
  scripts/
    setup-square.ts       # One-time: create "Custom Cake Order" service in Square Catalog
    fix-service-type.ts   # One-time: set productType=APPOINTMENTS_SERVICE (already run)
    verify-square.ts      # Confirm all 3 Square IDs resolve — run after any ID change
    test-all.ts           # Full automated test suite (9 checks, all PASS as of 2026-06-03)
    test-customer.ts      # Isolated customer upsert test
    test-booking.ts       # Isolated booking creation test
    test-sms.ts           # Isolated SMS send test
    check-bookings.ts     # Debug: dump booking profile + service variation + team member profiles
  public/
    logo.svg
    2165958_Ceremony_Wedding_1920x1080.mp4   # Hero video
    Startinglogorevealanimation.mp4
    Celebration_*.png     # Birthday, Wedding, Corporate, Baby Shower, Anniversary, Other
    Flavor_*.png          # Vanilla, Chocolate, Lemon, Coconut, Carrot, RedVelvet, Marble, Funfetti
    Frosting_*.png        # Buttercream, Fondant, Ganache, Naked, SemiNaked
    Addon_*.png           # Butterflies, Cherries, Crown, DippedStrawberries, Disco, etc.
    [UUID].jpg/png        # Portfolio showcase photos
  tailwind.config.js      # Custom color palette, shadows, animations - read before adding styles
  next.config.js          # Minimal (empty options object)
  tsconfig.json           # Target ES2017, strict mode
  postcss.config.js
  package.json
  .claude/
    launch.json           # Dev server launch config
    settings.json         # Claude Code hooks
  INTEGRATION_COMPLETE.md # Full record of what was built, IDs, test results, known limitations
  CLIENT_GUIDE_PLAN.md    # Plan for client-facing HTML guide on using Square Dashboard
  SQUARE_INTEGRATION_PLAN.md  # Original implementation spec (reference)
  SQUARE_TEST_PLAN.md         # Test strategy reference
```

---

## Page Composition (`app/page.tsx`)

Components render in this order — single page scroll flow:

1. `<Navbar />`
2. `<Hero />`
3. `<Services />`
4. `<HowItWorks />`
5. `<Pricing />`
6. `<OrderCTA />` ← main conversion section, form is live
7. `<Reviews />`
8. `<About />`
9. `<Footer />`

**Not currently on the page:** `FAQ`, `Policies`, `WhyUs` — built but not imported in `page.tsx`.

---

## OrderCTA.tsx — Key Component Detail

The most complex component. Self-contained 5-step wizard, fully wired to the backend:

| Step | Content |
|---|---|
| 1 | Occasion selection (Birthday, Wedding, Corporate, Baby Shower, Anniversary, Other) |
| 2 | Cake customization — flavor, frosting, size, layers (uses `FlavorsOptions`) |
| 3 | Add-on selection (uses `AddOns`) |
| 4 | Date picker — custom calendar UI with date validation |
| 5 | Contact form — name, email, phone, notes + **Submit** button |

- All wizard state is local React (`useState`).
- On submit: POSTs `form` state to `POST /api/book`.
- `submitting` state disables button and shows "Sending your order..." label.
- `submitError` state shows inline error if the API call fails.
- `submitted: true` triggers the success confirmation screen.
- Dynamic pricing preview updates as user selects options.

---

## `app/api/book/route.ts` — API Route

Receives `OrderPayload`, runs three operations in sequence:

1. `upsertCustomer(order)` — searches Square by email; creates if not found
2. `createBooking(customerId, order, note)` — creates Square Appointment at noon MDT on `pickupDate`
3. `notifyBakery(smsText)` — sends Twilio SMS to `BAKERY_PHONE_NUMBER` (non-fatal: logs error but doesn't fail the order if SMS fails)

Returns `{ success: true, bookingId }` on success, `{ error: string }` with 400/500 on failure.

---

## `lib/square.ts` — Key Exports

| Export | Type | Description |
|---|---|---|
| `squareClient` | `SquareClient` (Proxy) | Lazy Square client — reads env vars at first call |
| `OrderPayload` | type | Shape of the form data POSTed to `/api/book` |
| `buildBookingNote(order)` | function | Formats multi-line appointment note for Square calendar |
| `upsertCustomer(order)` | async function | Search-or-create customer in Square CRM, returns `customerId` |
| `createBooking(customerId, order, note)` | async function | Creates appointment, fetches real service variation version dynamically |

Booking time is always `${pickupDate}T18:00:00Z` (noon Calgary MDT / UTC-6). This is a calendar record, not a real appointment time.

---

## `lib/sms.ts` — Key Exports

| Export | Description |
|---|---|
| `notifyBakery(body)` | Sends SMS via Twilio to `BAKERY_PHONE_NUMBER` |
| `buildSmsText(order)` | Builds compact order summary string for SMS |

---

## Square Production Config

| Resource | ID |
|---|---|
| Location | `LQM8M66HZ3T9Y` — Ony's Boutique Cakes |
| Catalog Item | `FSLRXKRKWEBVWCMLHYCFCKTA` — Custom Cake Order |
| Service Variation | `5UMWC66OIJ34W5C3OZYJVYIQ` — Standard |
| Team Member | `TMVuMCy5R3MIM7D5` — Onyinye Ekwulugo |

---

## Design System

### Colors (defined in `tailwind.config.js`)

| Token | Value | Usage |
|---|---|---|
| `surface-*` | `#F3EDE4` to `#EFE7DB` | Page backgrounds |
| `ink` | `#2A241E` | Body text |
| `accent-rose` | `#C9956A` | Primary CTAs, highlights |
| `accent-gold` | `#C5A35A` | Decorative accents |
| `accent-amber` | `#F59E42` | Warm highlights |
| `clay-pink/gold/violet/mint/cream/sky` | Various | Decorative chip/badge colors |

### Shadows
Custom neumorphic shadow utilities in `tailwind.config.js`: `shadow-raised`, `shadow-pressed`, `shadow-inset-*`. Use these instead of raw Tailwind shadow classes.

### Typography
- **Headings:** Playfair Display (serif)
- **Body / UI:** DM Sans
- **Nav / Labels:** Plus Jakarta Sans
- **Decorative display:** Fraunces

### Animations
All keyframes live in `globals.css`, registered in `tailwind.config.js`:
- `fade-in`, `float`, `float-delayed`, `breathe`, `drift`, `wobble`
- `marquee` — horizontal scroll for Reviews strip
- `gradient-shift` — footer border gradient
- Framer Motion (`SectionReveal`, `Hero`, `Services`) for scroll-triggered reveals
- GSAP (`PillNav`) for tab hover timelines

---

## Conventions & Patterns

- **Backend exists at `/api/book` only.** Do not add more API routes without discussing first.
- **Static data in components.** Prices, flavor lists, add-on lists are hardcoded arrays inside their respective component files.
- **`lib/square.ts` and `lib/sms.ts` are server-only.** Never import them from client components — they read secret env vars.
- **Lazy client init.** Both Square and Twilio clients must be created inside function calls, not at module top level. See env var note above.
- **Scripts use `config({ path: '.env.local' })`** as the first two lines — not `import 'dotenv/config'` which loads `.env`.
- **Tailwind-first styling.** Avoid raw CSS unless it must be a keyframe or complex selector — put those in `globals.css`.
- **SectionReveal wrapper** — wrap any new full-width section with `<SectionReveal>` for consistent scroll-reveal behavior.
- **Images go in `/public`** and are referenced with Next.js `<Image>` component for optimization.
- **Single-page app** — there are no sub-routes. Do not add `app/` subdirectories unless explicitly requested.

---

## Known Gaps / Future Work

- No rate limiting on `/api/book` — add Vercel edge middleware before high-traffic launch
- No email confirmation to customer — could add Resend/SendGrid in the same route
- No CMS or admin panel
- FAQ, Policies, WhyUs components built but not rendered in page.tsx
- No analytics or tracking
- No authentication
- Client HTML guide (`client-guide.html`) not yet built — see `CLIENT_GUIDE_PLAN.md`

---

## Last Updated

**2026-06-03** — Square + Twilio integration complete and live on production. All 9 automated tests passing.
