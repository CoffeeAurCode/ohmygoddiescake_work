# Square + SMS Integration — Completed

**Project:** Ony's Boutique Custom Cakes (ohmygoddiescake_work)  
**Completed:** 2026-06-03  
**Environment:** Production (Square + Twilio live credentials)

---

## What Was Built

When a customer fills out the 5-step order form and clicks **Submit**, the site now:

1. POSTs all form data to a new Next.js API route `/api/book`
2. Upserts the customer in Square CRM (searches by email first — no duplicates)
3. Creates a Square Appointment on the pickup/delivery date with full order details in the notes
4. Sends an SMS to the bakery phone (+919998064026) with a compact order summary
5. Shows the customer a success confirmation screen

No payment is collected on the website. Square is used purely as a calendar + CRM record.

---

## Files Created

| File | Purpose |
|---|---|
| `lib/square.ts` | Square client singleton (lazy-init) + `OrderPayload` type + `buildBookingNote()` + `upsertCustomer()` + `createBooking()` |
| `lib/sms.ts` | Twilio client (lazy-init) + `notifyBakery()` + `buildSmsText()` |
| `app/api/book/route.ts` | Next.js POST handler — orchestrates customer upsert → booking → SMS |
| `scripts/setup-square.ts` | One-time: creates "Custom Cake Order" service in Square Catalog |
| `scripts/fix-service-type.ts` | One-time fix: set `productType = APPOINTMENTS_SERVICE` so item appears under Appointments |
| `scripts/verify-square.ts` | Prints all 3 IDs and confirms they resolve in Square |
| `scripts/test-all.ts` | Automated test suite — 9 checks covering credentials, IDs, customer, booking, SMS |
| `scripts/test-customer.ts` | Isolated customer upsert test |
| `scripts/test-booking.ts` | Isolated booking creation test |
| `scripts/test-sms.ts` | Isolated SMS send test |
| `scripts/check-bookings.ts` | Debug: prints business booking profile + service variation + team member booking profiles |

---

## Files Modified

| File | What Changed |
|---|---|
| `components/OrderCTA.tsx` | Added `submitting` + `submitError` state; `handleSubmit()` POSTs to `/api/book`; submit button shows loading state and error message |
| `package.json` | Added `square`, `twilio`, `tsx`, `dotenv` dependencies |

---

## Environment Variables (`.env.local`)

```
SQUARE_ENVIRONMENT=production
SQUARE_ACCESS_TOKEN=EAAAl103...   # Production personal access token
SQUARE_LOCATION_ID=LQM8M66HZ3T9Y          # Ony's Boutique Cakes
SQUARE_SERVICE_VARIATION_ID=5UMWC66OIJ34W5C3OZYJVYIQ   # "Custom Cake Order - Standard"
SQUARE_TEAM_MEMBER_ID=TMVuMCy5R3MIM7D5    # Onyinye Ekwulugo

TWILIO_ACCOUNT_SID=AC8e15652b...
TWILIO_AUTH_TOKEN=7859c635...
TWILIO_FROM_NUMBER=+13653892801
BAKERY_PHONE_NUMBER=+919998064026
```

---

## Production IDs

| Resource | ID | Name |
|---|---|---|
| Square Location | `LQM8M66HZ3T9Y` | Ony's Boutique Cakes |
| Catalog Item | `FSLRXKRKWEBVWCMLHYCFCKTA` | Custom Cake Order |
| Service Variation | `5UMWC66OIJ34W5C3OZYJVYIQ` | Standard |
| Team Member | `TMVuMCy5R3MIM7D5` | Onyinye Ekwulugo |

---

## Data Flow

```
Customer fills 5-step form on website
        |
        v
POST /api/book
  {
    name, email, phone,
    celebration, celebrationOtherNote,
    flavour, frosting, servings,
    addonIds[],
    pickupDate (YYYY-MM-DD),
    fulfillment (pickup | delivery),
    deliveryAddress
  }
        |
        +-- squareClient.customers.search(email)
        |       found → reuse ID
        |       not found → customers.create()
        |
        +-- squareClient.bookings.create()
        |       locationId: LQM8M66HZ3T9Y
        |       startAt: pickupDate + T18:00:00Z  (noon Calgary MDT)
        |       customerNote: full order details block
        |       appointmentSegments[0]:
        |           serviceVariationId: 5UMWC66OIJ34W5C3OZYJVYIQ
        |           teamMemberId: TMVuMCy5R3MIM7D5
        |           durationMinutes: 30
        |
        +-- twilio.messages.create()
        |       to: +919998064026
        |       body: compact order summary
        |
        v
{ success: true, bookingId } → form shows success screen
```

---

## What Appears in Square Dashboard

**Square Appointments calendar** — booking appears on the pickup/delivery date at noon. Click it to see full note:

```
CAKE ORDER - Ony's Boutique
---
Occasion: Birthday
Occasion notes: 50th birthday, loves florals
Servings: 24
Cake: Chocolate + Buttercream frosting
Add-ons: Fresh florals (+$30), Disco balls (+$10)
Fulfillment: Delivery to 123 Main St NW Calgary AB
---
Customer: Jane Smith
Email: jane@example.com
Phone: 587-555-1234
```

**Square Customers CRM** — customer record created with name, email, phone.

---

## SMS Format (received on +919998064026)

```
NEW ORDER - Ony's Boutique
From: Jane Smith (587-555-1234)
Date: 2026-07-15 | Deliver to 123 Main St NW Calgary AB
Occasion: Birthday
Cake: Chocolate, Buttercream, 24 servings
Add-ons: freshFlorals, disco
```

---

## Test Results (2026-06-03, Production)

```
=== Square Integration Test Suite ===

Square credentials valid...                              [PASS]
Location ID resolves...                                  [PASS]
Service variation ID resolves...                         [PASS]
Team member ID resolves...                               [PASS]
Customer upsert (create)...                              [PASS]
Customer upsert (idempotent - same email returns same ID)[PASS]
Appointments enrolled (booking profile)...               [PASS]
Booking creation...                                      [PASS]
SMS text builds correctly...                             [PASS]

Booking ID: gohh3k6msezc6q
Customer ID: 8EGFKWN8A33F6HQHQA4WGPJ0Z0
```

SMS to +919998064026: **delivered**.

---

## Issues Encountered and Fixed

| Issue | Root Cause | Fix |
|---|---|---|
| `Please provide 'token'` on all Square calls | `import 'dotenv/config'` loads `.env`, not `.env.local`; ES module hoisting meant env vars weren't set when Square client initialized | Changed all scripts to `config({ path: '.env.local' })`; made `squareClient` lazy via Proxy in `lib/square.ts` |
| `username is required` on Twilio | Same ES module hoisting issue — Twilio client created at module load time | Changed `lib/sms.ts` to call `twilio(...)` lazily inside `getTwilioClient()` |
| `Merchant not onboarded to Appointments` | Sandbox account didn't have Appointments enabled | Switched to production credentials |
| "Custom Cake Order" not visible under Appointments > Services | Item was created with `productType: FOOD_AND_BEV` | Ran `fix-service-type.ts` to update `productType` to `APPOINTMENTS_SERVICE` |
| SMS blocked to +91 | Twilio Geographic Permissions for India disabled by default | User enabled India in Twilio Console → Messaging → Geo Permissions |

---

## Known Limitations / Future Work

- **No payment collected** — Square booking is a calendar record only. Payment happens offline (Ony invoices the customer separately).
- **No rate limiting** on `/api/book` — add Vercel edge middleware before high-traffic launch to prevent spam.
- **No email confirmation to customer** — could add a transactional email (Resend, SendGrid) in the same API route.
- **30-minute appointment slot** — arbitrary placeholder. Actual cake consultations may vary; Onyinye can adjust duration in Square Dashboard.
- **Booking time is always noon Calgary MDT** — suitable for a calendar record, but not a real appointment time. If Ony wants actual consultation times, add a time-slot picker to the form.
- **No webhook handling** — if Ony cancels a booking in Square Dashboard, the website doesn't know. Add `booking.cancelled` webhook if a customer-facing cancel flow is ever needed.
