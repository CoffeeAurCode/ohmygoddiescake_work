# Square Integration — Full Test Plan

**Project:** Ony's Boutique Custom Cakes  
**Environment:** Production (live Square + Twilio)  
**Last Updated:** 2026-06-03

---

## Overview

This document is the authoritative test plan for the Square + SMS integration. It covers every layer from environment sanity checks through automated API scripts to manual browser flows and adversarial failure cases. Run tests in the order they are listed — later phases build on earlier ones passing.

---

## Architecture Under Test

```
Browser form (5-step wizard)
        │
        ▼  POST /api/book  (JSON)
app/api/book/route.ts
        │
        ├──▶ lib/square.ts → upsertCustomer()  → Square Customers API
        ├──▶ lib/square.ts → createBooking()   → Square Bookings API
        └──▶ lib/sms.ts    → notifyBakery()    → Twilio Messages API
```

**Files exercised by these tests:**

| File | What it does |
|---|---|
| `app/api/book/route.ts` | POST handler — orchestrates the whole flow |
| `lib/square.ts` | Square client (lazy proxy), `upsertCustomer`, `createBooking`, `buildBookingNote` |
| `lib/sms.ts` | Twilio client (lazy), `notifyBakery`, `buildSmsText` |
| `components/OrderCTA.tsx` | Frontend wizard — sends the POST, shows success/error states |

---

## Phase 0 — Prerequisites Checklist

Before running any tests, confirm every item below. A missing env var or uninstalled package will cause misleading failures.

```bash
# 1. All dependencies installed
npm install

# 2. Confirm .env.local exists and is populated
# Required vars:
#   SQUARE_ENVIRONMENT=production
#   SQUARE_ACCESS_TOKEN=EAAAl...
#   SQUARE_LOCATION_ID=LQM8M66HZ3T9Y
#   SQUARE_SERVICE_VARIATION_ID=5UMWC66OIJ34W5C3OZYJVYIQ
#   SQUARE_TEAM_MEMBER_ID=TMVuMCy5R3MIM7D5
#   TWILIO_ACCOUNT_SID=AC...
#   TWILIO_AUTH_TOKEN=...
#   TWILIO_FROM_NUMBER=+13653892801
#   BAKERY_PHONE_NUMBER=+919998064026

# 3. Verify tsx is available
npx tsx --version
```

**Checklist:**

- [ ] `.env.local` exists with all 9 variables filled
- [ ] `node_modules/` exists (run `npm install` if not)
- [ ] `npx tsx --version` returns a version number (not an error)
- [ ] Square production account has Appointments enabled
- [ ] Team member `TMVuMCy5R3MIM7D5` is assigned to the "Custom Cake Order" service in Square Dashboard
- [ ] Twilio geographic permissions include India (+91) — required for `BAKERY_PHONE_NUMBER`

---

## Phase 1 — Environment Variable Validation

**Goal:** Confirm all env vars are present and non-empty before making any API calls.

### Script: `scripts/verify-square.ts` (already exists)

```bash
npx tsx scripts/verify-square.ts
```

**Expected output:**
```
Location (LQM8M66HZ3T9Y): OK - Ony's Boutique Cakes
Service variation (5UMWC66OIJ34W5C3OZYJVYIQ): OK - Standard
Team member (TMVuMCy5R3MIM7D5): OK - Onyinye Ekwulugo
All checks complete.
```

**What it validates:**
- `SQUARE_ACCESS_TOKEN` is valid (any Square call fails if not)
- `SQUARE_LOCATION_ID` matches a real location in this account
- `SQUARE_SERVICE_VARIATION_ID` resolves to a real catalog object
- `SQUARE_TEAM_MEMBER_ID` resolves to a real team member

**Failure handling:**

| Error | Cause | Fix |
|---|---|---|
| `Please provide 'token'` | `SQUARE_ACCESS_TOKEN` empty | Check `.env.local` |
| `UNAUTHORIZED` | Wrong token or environment mismatch | Verify `SQUARE_ENVIRONMENT=production` and token matches |
| `Location ... NOT FOUND` | Wrong location ID | Check Square Dashboard → Locations |
| `Service variation ... NOT FOUND` | Item deleted or wrong ID | Re-run `scripts/setup-square.ts` |
| `Team member ... NOT FOUND` | Member deleted or wrong ID | Check Square Dashboard → Team |

---

## Phase 2 — Unit Tests: Pure Function Correctness

These tests require **no API calls** and verify the output of pure functions in `lib/square.ts` and `lib/sms.ts`.

### Script: `scripts/test-pure-functions.ts` ← create and run this

```typescript
import { config } from 'dotenv'
config({ path: '.env.local' })
import { buildBookingNote } from '../lib/square'
import { buildSmsText } from '../lib/sms'

const PASS = '[PASS]'
const FAIL = '[FAIL]'
let failures = 0

function assert(label: string, condition: boolean, detail?: string) {
  if (condition) {
    console.log(`  ${PASS} ${label}`)
  } else {
    console.log(`  ${FAIL} ${label}${detail ? ': ' + detail : ''}`)
    failures++
  }
}

// ─── buildBookingNote ──────────────────────────────────────────────────────

console.log('\n── buildBookingNote ─────────────────────────────────────────')

const baseOrder = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  phone: '+15871234567',
  celebration: 'Birthday',
  celebrationOtherNote: '',
  servings: 24 as number | '',
  flavour: 'Chocolate',
  frosting: 'Buttercream',
  addonIds: ['disco', 'crown'],
  pickupDate: '2026-08-15',
  fulfillment: 'pickup' as const,
  deliveryAddress: '',
}

const pickupNote = buildBookingNote(baseOrder)
assert('Contains header', pickupNote.includes("CAKE ORDER - Ony's Boutique"))
assert('Contains occasion', pickupNote.includes('Occasion: Birthday'))
assert('Contains servings', pickupNote.includes('Servings: 24'))
assert('Contains flavour', pickupNote.includes('Chocolate'))
assert('Contains frosting', pickupNote.includes('Buttercream'))
assert('Disco ball addon label', pickupNote.includes('Disco balls (+$10)'))
assert('Crown addon label', pickupNote.includes('Crown (+$7)'))
assert('Pickup fulfillment', pickupNote.includes('Pickup'))
assert('Contains customer name', pickupNote.includes('Jane Smith'))
assert('Contains email', pickupNote.includes('jane@example.com'))
assert('Contains phone', pickupNote.includes('+15871234567'))

const deliveryOrder = { ...baseOrder, fulfillment: 'delivery' as const, deliveryAddress: '123 Main St NW, Calgary AB' }
const deliveryNote = buildBookingNote(deliveryOrder)
assert('Delivery address in note', deliveryNote.includes('123 Main St NW'))
assert('Delivery keyword in note', deliveryNote.includes('Delivery to:'))

const noteWithOccasion = buildBookingNote({ ...baseOrder, celebrationOtherNote: 'Gluten-free tiers' })
assert('Occasion notes appear when set', noteWithOccasion.includes('Occasion notes: Gluten-free tiers'))

const noAddonsNote = buildBookingNote({ ...baseOrder, addonIds: [] })
assert('No add-ons shows None', noAddonsNote.includes('Add-ons: None'))

const unknownAddonNote = buildBookingNote({ ...baseOrder, addonIds: ['unknownThing'] })
assert('Unknown addon ID falls back to raw ID', unknownAddonNote.includes('unknownThing'))

const tbdNote = buildBookingNote({ ...baseOrder, servings: '', flavour: '', frosting: '' })
assert('Empty servings shows TBD', tbdNote.includes('Servings: TBD'))
assert('Empty flavour shows TBD', tbdNote.includes('TBD + TBD'))

// ─── buildSmsText ──────────────────────────────────────────────────────────

console.log('\n── buildSmsText ─────────────────────────────────────────────')

const smsOrder = {
  name: 'Jane Smith',
  celebration: 'Birthday',
  servings: 24 as number | '',
  flavour: 'Chocolate',
  frosting: 'Buttercream',
  addonIds: ['disco', 'freshFlorals'],
  pickupDate: '2026-08-15',
  fulfillment: 'pickup',
  deliveryAddress: '',
  phone: '587-555-9999',
}

const smsText = buildSmsText(smsOrder)
assert('SMS header present', smsText.includes("NEW ORDER - Ony's Boutique"))
assert('SMS name present', smsText.includes('Jane Smith'))
assert('SMS phone present', smsText.includes('587-555-9999'))
assert('SMS date present', smsText.includes('2026-08-15'))
assert('SMS occasion present', smsText.includes('Birthday'))
assert('SMS flavour present', smsText.includes('Chocolate'))
assert('SMS frosting present', smsText.includes('Buttercream'))
assert('SMS addons present', smsText.includes('disco'))
assert('SMS Pickup keyword', smsText.includes('Pickup'))

const deliverySms = buildSmsText({ ...smsOrder, fulfillment: 'delivery', deliveryAddress: '456 Oak Ave SW' })
assert('SMS delivery address present', deliverySms.includes('456 Oak Ave SW'))
assert('SMS Deliver to keyword', deliverySms.includes('Deliver to'))

const noAddonSms = buildSmsText({ ...smsOrder, addonIds: [] })
assert('SMS empty addons shows none', noAddonSms.includes('none'))

console.log(`\n── Result: ${failures === 0 ? 'ALL PASS' : failures + ' FAILURE(S)'} ─────────────────────────────`)
if (failures > 0) process.exit(1)
```

```bash
npx tsx scripts/test-pure-functions.ts
```

**Expected:** All assertions print `[PASS]`. Zero failures exit code.

---

## Phase 3 — Square API: Credentials & IDs

### Script: `scripts/test-all.ts` (already exists — subset of this phase)

```bash
npx tsx scripts/test-all.ts
```

This runs 9 checks in sequence. The first 4 are credential/ID validation (no writes):

1. `Square credentials valid` — lists locations, confirms at least one returned
2. `Location ID resolves` — finds `SQUARE_LOCATION_ID` in the location list
3. `Service variation ID resolves` — fetches catalog object by ID
4. `Team member ID resolves` — fetches team member by ID

**Expected for checks 1-4:** `[PASS]` on all four.

---

## Phase 4 — Square API: Customer Upsert

### Script: `scripts/test-customer.ts` (already exists)

```bash
npx tsx scripts/test-customer.ts
```

**What it tests:**
- Creates a customer with a unique timestamped email
- Runs the same call again with the same email — must return the **same ID** (idempotent upsert, no duplicate)

**Expected output:**
```
Creating customer: test-1748900000000@example.com
Customer ID: XXXXXXXXXXXXXXXXXXXXXXXXXX

Running again with same email (should return same ID)...
Same ID? YES - upsert working
```

**Also verify in Square Dashboard:** Go to Dashboard → Customers and search for the email. One record should exist with the name, email, and phone from the script.

### Additional manual check: Name splitting

Single-name customers (no space) should not crash. Verify `upsertCustomer` handles `name: 'Onyinye'` without throwing. The code does `parts[0] ?? order.name` and `parts.slice(1).join(' ') || ''`, so given name = "Onyinye", family name = "". Confirm:

```bash
# One-liner test (no dedicated script needed):
npx tsx -e "
import { config } from 'dotenv'; config({ path: '.env.local' });
import { upsertCustomer } from './lib/square';
upsertCustomer({ name: 'Mononym', email: 'mononym-$(date +%s)@test.com', phone: '', celebration: 'Birthday', celebrationOtherNote: '', servings: 1, flavour: 'Vanilla', frosting: 'Buttercream', addonIds: [], pickupDate: '2026-12-01', fulfillment: 'pickup', deliveryAddress: '' }).then(id => console.log('OK:', id)).catch(e => { console.error('FAIL:', e.message); process.exit(1); })
"
```

---

## Phase 5 — Square API: Booking Creation

### Script: `scripts/test-booking.ts` (already exists)

```bash
npx tsx scripts/test-booking.ts
```

**What it tests:**
1. Upserts a customer (Wedding scenario, 80 servings, delivery)
2. Builds and prints the full booking note
3. Creates a booking for 2026-09-20 at noon Calgary MDT

**Expected output:**
```
Step 1: Upsert customer...
Customer ID: [ID]

Step 2: Build booking note...
CAKE ORDER - Ony's Boutique
---
Occasion: Wedding
Occasion notes: 3-tier, needs to feed 80 guests
Servings: 80
Cake: Vanilla + Fondant frosting
Add-ons: Fresh florals (+$30), Pearls (+$5)
Fulfillment: Delivery to: 123 Main St NW, Calgary AB T2N 1A1
---
Customer: Booking Test
Email: booking-test-[timestamp]@example.com
Phone:

Step 3: Create booking...
Booking ID: [ID]

Success! Check Square sandbox Dashboard > Appointments > Sept 20
```

**Manual verification in Square Dashboard:**
- Go to Appointments → navigate to September 20, 2026
- Confirm appointment appears at noon with "Booking Test" as the customer
- Click into the appointment → note text must match the printed note exactly

---

## Phase 6 — SMS: Text Build + Live Send

### Script: `scripts/test-sms.ts` (already exists)

```bash
npx tsx scripts/test-sms.ts
```

**What it tests:**
1. Builds the SMS body for a test order and prints it to console
2. Sends it via Twilio to `BAKERY_PHONE_NUMBER`

**Expected output:**
```
SMS content:

NEW ORDER - Ony's Boutique
From: Jane Smith (587-555-9999)
Date: 2026-08-15 | Pickup
Occasion: Birthday
Cake: Chocolate, Buttercream, 24 servings
Add-ons: disco, freshFlorals

Sending...
Done. Check Twilio console > Monitor > Messaging > Logs for delivery status.
```

**Manual verification:**
- Twilio Console → Monitor → Messaging → Logs — entry appears with `Status: delivered`
- If `BAKERY_PHONE_NUMBER` is your own number: SMS arrives on the phone

**SMS failure modes to watch for:**

| Twilio Error | Meaning | Fix |
|---|---|---|
| `21211` | Invalid "to" number format | Use E.164 format: `+1XXXXXXXXXX` or `+91XXXXXXXXXX` |
| `21606` | Unverified number (trial account) | Verify in Twilio Console or upgrade account |
| `21408` | Geographic permission blocked | Enable the destination country in Twilio Console → Messaging → Geo Permissions |
| `20003` | Invalid credentials | Check `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` |

---

## Phase 7 — Full Automated Suite

### Script: `scripts/test-all.ts` (already exists)

Runs all 9 checks: credentials, IDs, customer upsert (×2), booking profile, booking creation, SMS text.

```bash
npx tsx scripts/test-all.ts
```

**Expected output (all green):**
```
=== Square Integration Test Suite ===

Square credentials valid...                               [PASS]
Location ID resolves...                                   [PASS]
Service variation ID resolves...                          [PASS]
Team member ID resolves...                                [PASS]
Customer upsert (create)...                               [PASS]
Customer upsert (idempotent - same email returns same ID) [PASS]
Appointments enrolled (booking profile)...                [PASS]
Booking creation...                                       [PASS]
SMS text builds correctly...                              [PASS]

=== Results ===
Booking ID: [ID]
Customer ID: [ID]

Check sandbox Dashboard > Appointments > Dec 31 to verify.
```

Exit code: `0`. Any `[FAIL]` sets `process.exitCode = 1`.

---

## Phase 8 — API Route: Direct HTTP Tests (no browser)

Start the dev server **first**, then run these in a second terminal.

```bash
# Terminal 1
npm run dev
```

### 8.1 — Happy Path (valid complete order)

```powershell
$body = @{
  name              = "API Route Test"
  email             = "apitest-$(Get-Date -UFormat %s)@example.com"
  phone             = "+15871234567"
  celebration       = "Birthday"
  celebrationOtherNote = "30th birthday"
  servings          = 16
  flavour           = "Red Velvet"
  frosting          = "Cream Cheese"
  addonIds          = @("crown", "cherries")
  pickupDate        = "2026-10-01"
  fulfillment       = "pickup"
  deliveryAddress   = ""
} | ConvertTo-Json -Compress

Invoke-WebRequest -Uri "http://localhost:3000/api/book" `
  -Method POST -ContentType "application/json" -Body $body |
  Select-Object -ExpandProperty Content
```

**Expected:** `{"success":true,"bookingId":"..."}`  HTTP 200.

### 8.2 — Missing Required Fields

```powershell
# Missing name, email, pickupDate
$body = '{"phone":"+15871234567","celebration":"Birthday"}'
try {
  Invoke-WebRequest -Uri "http://localhost:3000/api/book" `
    -Method POST -ContentType "application/json" -Body $body
} catch {
  $_.Exception.Response.StatusCode.value__
  $_.ErrorDetails.Message
}
```

**Expected:** HTTP `400`, body `{"error":"Missing required fields"}`.

### 8.3 — Invalid JSON Body

```powershell
try {
  Invoke-WebRequest -Uri "http://localhost:3000/api/book" `
    -Method POST -ContentType "application/json" -Body "not-valid-json"
} catch {
  $_.Exception.Response.StatusCode.value__
  $_.ErrorDetails.Message
}
```

**Expected:** HTTP `400`, body `{"error":"Invalid request body"}`.

### 8.4 — Empty String Required Fields

```powershell
$body = '{"name":"","email":"","phone":"","pickupDate":"","celebration":"Birthday","servings":8,"flavour":"Vanilla","frosting":"Buttercream","addonIds":[],"fulfillment":"pickup","deliveryAddress":"","celebrationOtherNote":""}'
try {
  Invoke-WebRequest -Uri "http://localhost:3000/api/book" `
    -Method POST -ContentType "application/json" -Body $body
} catch {
  $_.Exception.Response.StatusCode.value__
  $_.ErrorDetails.Message
}
```

**Expected:** HTTP `400`, body `{"error":"Missing required fields"}`.

### 8.5 — Invalid Square Token (simulate Square failure)

1. Temporarily change `SQUARE_ACCESS_TOKEN` to `invalid_token_abc` in `.env.local`
2. Restart dev server (`Ctrl+C` → `npm run dev`)
3. Send the happy-path request from 8.1

```powershell
try {
  Invoke-WebRequest -Uri "http://localhost:3000/api/book" `
    -Method POST -ContentType "application/json" -Body $body
} catch {
  $_.Exception.Response.StatusCode.value__
  $_.ErrorDetails.Message
}
```

**Expected:** HTTP `500`, body contains `{"error":"..."}` (Square error message). The form should NOT show a success screen.

4. **Revert** `SQUARE_ACCESS_TOKEN` to the real value and restart dev server.

### 8.6 — Rapid Duplicate Submissions (idempotency stress)

Send the same order 3 times in quick succession with the **same email address**.

```powershell
$body = @{
  name = "Duplicate Test"
  email = "duplicate-fixed@example.com"
  phone = "+15871234567"
  celebration = "Birthday"
  celebrationOtherNote = ""
  servings = 8
  flavour = "Vanilla"
  frosting = "Buttercream"
  addonIds = @()
  pickupDate = "2026-11-01"
  fulfillment = "pickup"
  deliveryAddress = ""
} | ConvertTo-Json -Compress

1..3 | ForEach-Object {
  $r = Invoke-WebRequest -Uri "http://localhost:3000/api/book" `
    -Method POST -ContentType "application/json" -Body $body
  Write-Host "Request $_`: $($r.Content)"
}
```

**Expected:** 3 successful responses. In Square Dashboard → Customers, search for `duplicate-fixed@example.com` — exactly **1 customer record** should exist (not 3). Three booking entries will appear in Appointments (one per submit), which is correct — the customer is deduplicated, not the booking.

---

## Phase 9 — End-to-End Browser Test

**Goal:** Verify the full user-facing flow from form entry to success screen, with real Square + SMS firing.

### Setup

```bash
npm run dev
```

Open `http://localhost:3000` and scroll to the **Order** section.

### 9.1 — Happy Path (Pickup, all options)

| Step | Action | Expected |
|---|---|---|
| Step 1 | Click "Birthday" | Card highlights, Next button appears |
| Step 2 | Select Chocolate + Buttercream; set servings to 12 | Pricing preview updates |
| Step 2 | Click "2 layers" | Reflected in summary |
| Step 3 | Click Disco balls + Butterflies | Both show as selected |
| Step 4 | Pick a date at least 3 days from today | Dates before today and within 3 days are disabled |
| Step 5 | Fill Name, Email, Phone; select Pickup; click Submit | Loading spinner appears on button |
| Success | — | Success confirmation screen appears (not the form) |

**Post-submission checks:**
- Square Dashboard → Appointments → selected date → booking appears with full note
- Twilio Console → Messaging → Logs → entry shows delivered status
- SMS arrives on `BAKERY_PHONE_NUMBER`
- Square Dashboard → Customers → customer with the entered email exists

**Browser checks (F12 → Network tab):**
- POST to `/api/book` → Status `200`
- Response body: `{"success":true,"bookingId":"..."}`
- No red errors in Console tab

### 9.2 — Happy Path (Delivery)

Repeat 9.1 but:
- Step 5: Select "Delivery", fill in `456 Oak Ave SW, Calgary AB T2J 2R8`
- Step 5: Use a different email

**Expected:** Booking note in Square shows "Delivery to: 456 Oak Ave SW, Calgary AB T2J 2R8". SMS shows "Deliver to 456 Oak Ave SW".

### 9.3 — Occasion: Other (free-text note)

- Step 1: Select "Other", type "Quinceanera" in the text field
- Complete remaining steps

**Expected:** Booking note contains `Occasion: Other` and `Occasion notes: Quinceanera`.

### 9.4 — No Add-ons Selected

- Step 3: Don't select any add-ons, click Next

**Expected:** Booking note shows `Add-ons: None`.

### 9.5 — Validation: Submit With Empty Fields

- Navigate to Step 5 without filling Name/Email/Phone
- Click Submit

**Expected:** Browser-level HTML5 required-field validation fires (or the submit button stays in error state). The POST must **not** fire to `/api/book` with empty fields. Confirm in Network tab that no request was sent.

### 9.6 — Error State Recovery

1. With dev server running, temporarily set `SQUARE_ACCESS_TOKEN=invalid` in `.env.local` and restart
2. Submit the form with valid data
3. **Expected:** Submit button enters error state and shows an error message. The success screen does NOT appear. Form fields remain editable.
4. Revert token, restart

---

## Phase 10 — Booking Note Content Audit

For every order variation, verify the booking note in Square Dashboard matches exactly what `buildBookingNote` would produce. This is a manual spot-check after Phase 9 runs.

| Variation | What to check in Square note |
|---|---|
| Birthday, pickup | `Occasion: Birthday`, `Fulfillment: Pickup` |
| Wedding, delivery | `Occasion: Wedding`, `Fulfillment: Delivery to: [address]` |
| Other + custom note | `Occasion: Other\nOccasion notes: [text]` |
| All 14 add-ons | Each mapped to its full label with price |
| No add-ons | `Add-ons: None` |
| Empty servings | `Servings: TBD` |
| Single-word name | Customer shows correct given/family name split in Square CRM |

---

## Phase 11 — Regression Checklist

After any change to `lib/square.ts`, `lib/sms.ts`, `app/api/book/route.ts`, or `components/OrderCTA.tsx`, re-run the following before deploying:

```bash
# Step 1: Static type check
npx tsc --noEmit

# Step 2: Pure function tests
npx tsx scripts/test-pure-functions.ts

# Step 3: Full automated suite
npx tsx scripts/test-all.ts

# Step 4: API route smoke test (requires npm run dev in another terminal)
# Run Phase 8.1 (happy path) and 8.2 (missing fields) manually
```

**All four must pass** before the change ships.

---

## Phase 12 — Production Smoke Test (post-deploy)

After deploying to Vercel (or any host), run this minimal check against the live URL to confirm the route is reachable and env vars are set:

```powershell
# Replace with actual deployed URL
$url = "https://your-deployed-site.vercel.app/api/book"

# Test: missing fields → must return 400 (proves route is alive and env vars loaded)
try {
  Invoke-WebRequest -Uri $url -Method POST -ContentType "application/json" -Body '{}'
} catch {
  if ($_.Exception.Response.StatusCode.value__ -eq 400) {
    Write-Host "Route alive - returned 400 as expected"
  } else {
    Write-Host "UNEXPECTED STATUS: $($_.Exception.Response.StatusCode.value__)"
  }
}
```

**Expected:** `Route alive - returned 400 as expected`.

A `500` here typically means an env var is missing in the Vercel project settings.

Then do one real end-to-end submit in the browser on the deployed URL, confirm the booking appears in Square Dashboard and SMS is received, then cancel that test booking in Square.

---

## Phase 13 — Edge Cases & Adversarial Inputs

### 13.1 — Special Characters in Fields

```powershell
$body = @{
  name = "O'Reilly & Sons <test>"
  email = "special+tag@example.com"
  phone = "+1 (587) 555-0199"
  celebration = "Other"
  celebrationOtherNote = "Cake for <script>alert(1)</script>"
  servings = 8
  flavour = "Chocolate"
  frosting = "Buttercream"
  addonIds = @()
  pickupDate = "2026-12-15"
  fulfillment = "pickup"
  deliveryAddress = ""
} | ConvertTo-Json -Compress

Invoke-WebRequest -Uri "http://localhost:3000/api/book" `
  -Method POST -ContentType "application/json" -Body $body |
  Select-Object -ExpandProperty Content
```

**Expected:** HTTP 200, booking created. The raw strings are stored in Square notes — they are never rendered as HTML so XSS is not a risk. Verify the Square Dashboard note shows the literal text including `<script>`.

### 13.2 — Very Long Strings

```powershell
$longNote = "A" * 500
$body = @{
  name = "B" * 100
  email = "longtest@example.com"
  phone = "+15871234567"
  celebration = "Other"
  celebrationOtherNote = $longNote
  servings = 999
  flavour = "Chocolate"
  frosting = "Buttercream"
  addonIds = @("disco","butterflies","edible","freshFlorals","fauxFlorals","crown","macarons","strawberries","metallic","cherries","miniLiquor","burnaway","pearls","ribbons")
  pickupDate = "2026-12-31"
  fulfillment = "delivery"
  deliveryAddress = "C" * 200
} | ConvertTo-Json -Compress

Invoke-WebRequest -Uri "http://localhost:3000/api/book" `
  -Method POST -ContentType "application/json" -Body $body |
  Select-Object -ExpandProperty Content
```

**Expected:** HTTP 200 or a Square-level error if their API enforces note length limits. Either way the API route must return a well-formed JSON response (not crash with an unhandled exception).

### 13.3 — All 14 Add-ons Selected

Send an order with every add-on ID:
```
addonIds: ["disco","butterflies","edible","freshFlorals","fauxFlorals","crown","macarons","strawberries","metallic","cherries","miniLiquor","burnaway","pearls","ribbons"]
```

**Expected:** All 14 labels appear in the booking note. None fall through to the raw ID (all have entries in `ADDON_LABELS`).

### 13.4 — Future Date Boundary

Set `pickupDate` to exactly today's date and to a date 2 days from now. The API route itself doesn't validate dates — it's the frontend that blocks past/near dates. Confirm the API still returns 200 for any valid YYYY-MM-DD string (date enforcement is a UX concern, not a security one here).

### 13.5 — Wrong HTTP Method

```powershell
try {
  Invoke-WebRequest -Uri "http://localhost:3000/api/book" -Method GET
} catch {
  $_.Exception.Response.StatusCode.value__
}
```

**Expected:** HTTP `405` (Next.js returns this for unhandled methods on route handlers).

### 13.6 — Content-Type Mismatch

```powershell
try {
  Invoke-WebRequest -Uri "http://localhost:3000/api/book" `
    -Method POST -ContentType "text/plain" -Body "some text"
} catch {
  $_.Exception.Response.StatusCode.value__
  $_.ErrorDetails.Message
}
```

**Expected:** HTTP `400` with `{"error":"Invalid request body"}` — `req.json()` throws when content is not valid JSON.

---

## Test Results Log

Record results here after each test run.

| Date | Phase | Result | Notes |
|---|---|---|---|
| 2026-06-03 | All (test-all.ts) | ALL PASS | Booking `gohh3k6msezc6q`, Customer `8EGFKWN8A33F6HQHQA4WGPJ0Z0` |
| | | | |

---

## Troubleshooting Quick Reference

| Symptom | Likely cause | Fix |
|---|---|---|
| `Please provide 'token'` | `SQUARE_ACCESS_TOKEN` empty or env not loaded | Check `.env.local`; confirm lazy-init pattern in `lib/square.ts` |
| `UNAUTHORIZED` from Square | Token/environment mismatch | Verify `SQUARE_ENVIRONMENT=production` and token is production token |
| `NOT_FOUND` on service variation | ID stale or env mismatch | Re-run `scripts/setup-square.ts` in correct environment |
| `INVALID_REQUEST` on booking create | Team member not assigned to service | Square Dashboard → Appointments → Services → assign team member |
| `Merchant not onboarded to Appointments` | Appointments not enabled | Use production account; sandbox may not have Appointments |
| Booking created but not visible in Dashboard | Wrong `SQUARE_LOCATION_ID` | Re-run `verify-square.ts` |
| Twilio error 21211 | Invalid phone number format | Use E.164: `+1XXXXXXXXXX` |
| Twilio error 21606 | Unverified number (trial) | Verify in Twilio Console or upgrade |
| Twilio error 21408 | India Geo Permission blocked | Enable India in Twilio Console → Messaging → Geo Permissions |
| Form submit hangs (spinner never stops) | API route not running | Confirm `npm run dev` is running; check Network tab |
| SMS sends but no Square booking | Square error caught silently | Check dev server terminal for `Square booking error:` log line |
| Customer duplicated in Square | Upsert logic bypassed | Verify email search runs before `customers.create` in `lib/square.ts` |
| `process.exitCode` 1 on test-all | One or more checks failed | Read the `[FAIL]` line + error below it for the specific cause |
| TypeScript build fails (`npx tsc --noEmit`) | Type mismatch in API payload | Check `OrderPayload` type in `lib/square.ts` matches form fields |

---

## Automated Test Commands Reference

All commands run from the project root directory.

```bash
# Type check (no network, no writes)
npx tsc --noEmit

# Pure function unit tests (no network)
npx tsx scripts/test-pure-functions.ts

# Verify Square IDs (read-only Square API calls)
npx tsx scripts/verify-square.ts

# Customer upsert test (writes to Square Customers)
npx tsx scripts/test-customer.ts

# Booking creation test (writes to Square Appointments)
npx tsx scripts/test-booking.ts

# SMS send test (sends a real SMS to BAKERY_PHONE_NUMBER)
npx tsx scripts/test-sms.ts

# Full suite — all non-browser checks in one run
npx tsx scripts/test-all.ts
```

**Safe to run repeatedly:** `test-pure-functions.ts`, `verify-square.ts`, `tsc --noEmit`  
**Creates real Square records:** `test-customer.ts`, `test-booking.ts`, `test-all.ts`  
**Sends real SMS:** `test-sms.ts`, `test-all.ts` does NOT send SMS (only builds the text)
