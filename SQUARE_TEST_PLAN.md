# Square Integration - Local Test Plan

## Goal

Verify the full order booking flow locally before touching production:
Square sandbox booking created + SMS sent + form shows success - all without real money or real calendar events.

---

## Test environment overview

| Layer | Tool | Notes |
|---|---|---|
| Frontend | `npm run dev` (localhost:3000) | Real Next.js dev server |
| Square | Sandbox credentials | Safe fake data, visible in sandbox Dashboard |
| SMS | Twilio test credentials | SMS logged but not actually sent to phone |
| API verification | `scripts/*.ts` run with `npx tsx` | Direct API calls, no browser needed |

---

## Phase 0 - Prerequisites checklist

Before running any tests, confirm:

- [ ] `.env.local` exists with all variables filled (see SQUARE_INTEGRATION_PLAN.md)
- [ ] `npm install square twilio tsx` completed
- [ ] Square sandbox app created at developer.squareup.com
- [ ] Team member exists in Square Sandbox account (Square Dashboard > Team)
- [ ] `npx tsx scripts/setup-square.ts` has been run and IDs copied to `.env.local`
- [ ] Team member manually assigned to "Custom Cake Order" service in sandbox Dashboard
- [ ] `npx tsx scripts/verify-square.ts` passes all 3 checks

---

## Phase 1 - Verify Square credentials and IDs

### Script: `scripts/verify-square.ts`

```bash
npx tsx scripts/verify-square.ts
```

Expected output:
```
Location (L...): OK - Ony's Boutique
Service variation (W...): OK - Standard
Team member (TM...): OK - Ony [name]
All checks complete.
```

**If any line says NOT FOUND:**
- Location: re-check SQUARE_LOCATION_ID in .env.local vs Square Dashboard
- Service variation: re-run setup-square.ts
- Team member: add a team member in Square Dashboard (Team tab), then re-run verify

---

## Phase 2 - Test Square customer upsert in isolation

### Script: `scripts/test-customer.ts`

Create this script:

```typescript
import 'dotenv/config'
import { upsertCustomer } from '../lib/square'

async function main() {
  const testOrder = {
    name: 'Test Customer',
    email: `test-${Date.now()}@example.com`, // unique each run
    phone: '+15871234567',
    celebration: 'Birthday',
    celebrationOtherNote: '',
    servings: 12,
    flavour: 'Chocolate',
    frosting: 'Buttercream',
    addonIds: ['disco'],
    pickupDate: '2026-08-15',
    fulfillment: 'pickup' as const,
    deliveryAddress: '',
  }

  console.log('Creating customer:', testOrder.email)
  const customerId = await upsertCustomer(testOrder)
  console.log('Customer ID:', customerId)

  // Run again with same email - should return same ID (upsert, not duplicate)
  console.log('\nRunning again with same email (should return same ID)...')
  const sameId = await upsertCustomer(testOrder)
  console.log('Same ID?', customerId === sameId ? 'YES - upsert working' : 'NO - duplicate created!')
}

main().catch(console.error)
```

Run:
```bash
npx tsx scripts/test-customer.ts
```

Expected: Two lines with the same customer ID. Verify the customer appears in Square sandbox Dashboard under Customers.

---

## Phase 3 - Test Square booking creation in isolation

### Script: `scripts/test-booking.ts`

```typescript
import 'dotenv/config'
import { buildBookingNote, createBooking, upsertCustomer } from '../lib/square'

async function main() {
  const testOrder = {
    name: 'Booking Test',
    email: `booking-test-${Date.now()}@example.com`,
    phone: '+15871234567',
    celebration: 'Wedding',
    celebrationOtherNote: '3-tier, needs to feed 80 guests',
    servings: 80,
    flavour: 'Vanilla',
    frosting: 'Fondant',
    addonIds: ['freshFlorals', 'pearls'],
    pickupDate: '2026-09-20',
    fulfillment: 'delivery' as const,
    deliveryAddress: '123 Main St NW, Calgary AB T2N 1A1',
  }

  console.log('Step 1: Upsert customer...')
  const customerId = await upsertCustomer(testOrder)
  console.log('Customer ID:', customerId)

  console.log('\nStep 2: Build booking note...')
  const note = buildBookingNote(testOrder)
  console.log(note)

  console.log('\nStep 3: Create booking...')
  const bookingId = await createBooking(customerId, testOrder, note)
  console.log('Booking ID:', bookingId)
  console.log('\nSuccess! Check Square sandbox Dashboard > Appointments > Sept 20')
}

main().catch(console.error)
```

Run:
```bash
npx tsx scripts/test-booking.ts
```

Expected: Booking ID printed. Go to Square sandbox Dashboard > Appointments, navigate to the date (Sept 20), and confirm the appointment appears with the full note text.

---

## Phase 4 - Test SMS notification in isolation

### Script: `scripts/test-sms.ts`

```typescript
import 'dotenv/config'
import { buildSmsText, notifyBakery } from '../lib/sms'

async function main() {
  const testOrder = {
    name: 'Jane Smith',
    celebration: 'Birthday',
    servings: 24,
    flavour: 'Chocolate',
    frosting: 'Buttercream',
    addonIds: ['disco', 'freshFlorals'],
    pickupDate: '2026-08-15',
    fulfillment: 'delivery',
    deliveryAddress: '456 Oak Ave SW, Calgary AB',
    phone: '587-555-9999',
  }

  const text = buildSmsText(testOrder)
  console.log('SMS content:\n')
  console.log(text)
  console.log('\nSending...')

  await notifyBakery(text)
  console.log('Done. Check Twilio console > Monitor > Messaging > Logs for delivery status.')
}

main().catch(console.error)
```

**Twilio test mode:** To avoid sending a real SMS during development, use Twilio's test credentials:
- Account SID: `ACtest...` (from Twilio Console > Test Credentials)
- Auth Token: test token
- Messages created with test credentials are logged in Twilio dashboard but NOT delivered to any phone

Alternatively, use your real credentials and set `BAKERY_PHONE_NUMBER` to your own number to receive the test SMS.

Run:
```bash
npx tsx scripts/test-sms.ts
```

Expected: No error. Message visible in Twilio Console > Monitor > Messaging > Logs.

---

## Phase 5 - Test the API route directly (no browser)

Start the dev server first:
```bash
npm run dev
```

Then in a second terminal, send a test POST with curl or PowerShell:

### PowerShell
```powershell
$body = @{
  name = "API Route Test"
  email = "apitest@example.com"
  phone = "+15871234567"
  celebration = "Birthday"
  celebrationOtherNote = ""
  servings = 16
  flavour = "Red Velvet"
  frosting = "Cream Cheese"
  addonIds = @("crown", "cherries")
  pickupDate = "2026-10-01"
  fulfillment = "pickup"
  deliveryAddress = ""
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/book" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

Expected response:
```json
{ "success": true, "bookingId": "BOOKING_ID_HERE" }
```

**Failure cases to test:**

Missing required fields:
```powershell
$body = '{"name": "", "email": "", "pickupDate": ""}' 
Invoke-WebRequest -Uri "http://localhost:3000/api/book" -Method POST -ContentType "application/json" -Body $body
```
Expected: `400` with `{ "error": "Missing required fields" }`

Invalid JSON:
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/book" -Method POST -ContentType "application/json" -Body "not-json"
```
Expected: `400` with `{ "error": "Invalid request body" }`

---

## Phase 6 - End-to-end browser test

1. Start dev server: `npm run dev`
2. Open `http://localhost:3000`
3. Scroll to the order form
4. Complete all 5 steps:
   - Step 1: Select "Birthday"
   - Step 2: Choose Chocolate + Buttercream, set servings to 12
   - Step 3: Select Disco balls + Butterflies
   - Step 4: Pick a date at least 3 days from today
   - Step 5: Fill in Name, Email, Phone; select Pickup; click Submit
5. Watch for the success screen (the `submitted: true` state triggers it)
6. Open Square sandbox Dashboard > Appointments - confirm booking on selected date
7. Check your phone or Twilio logs for the SMS

**What to watch in the browser console (F12):**
- The POST to `/api/book` should appear in Network tab
- Response should be `200 { success: true, bookingId: "..." }`
- No red errors in Console tab

---

## Phase 7 - Error recovery test

Simulate a Square API failure to confirm the form handles it gracefully:

1. Temporarily set `SQUARE_ACCESS_TOKEN=invalid_token` in `.env.local`
2. Restart dev server (env changes require restart)
3. Submit the form
4. Expected: Submit button shows error message, NOT the success screen
5. Revert `SQUARE_ACCESS_TOKEN` to valid value

---

## Phase 8 - Verify what Square sandbox shows

After running phases 3 and 6, log in to `developer.squareup.com` and check:

| Location | What to look for |
|---|---|
| Dashboard > Appointments | Bookings appear on correct dates with full note text |
| Dashboard > Customers | Customer records created with name/email/phone |
| Developer Console > Sandbox > Logs | API calls visible (useful for debugging) |

---

## Automated test script (all phases, no browser)

### Script: `scripts/test-all.ts`

```typescript
/**
 * Runs all non-browser tests in sequence.
 * Run: npx tsx scripts/test-all.ts
 */
import 'dotenv/config'
import { squareClient } from '../lib/square'
import { upsertCustomer, buildBookingNote, createBooking } from '../lib/square'
import { buildSmsText } from '../lib/sms'
import { SquareEnvironment } from 'square'

const PASS = '[PASS]'
const FAIL = '[FAIL]'

async function check(label: string, fn: () => Promise<void>) {
  process.stdout.write(`${label}... `)
  try {
    await fn()
    console.log(PASS)
  } catch (err) {
    console.log(FAIL)
    console.error('  Error:', err instanceof Error ? err.message : err)
    process.exitCode = 1
  }
}

const testOrder = {
  name: 'Automated Test',
  email: `auto-test-${Date.now()}@example.com`,
  phone: '+15871234567',
  celebration: 'Birthday',
  celebrationOtherNote: 'Automated test run',
  servings: 8 as number | '',
  flavour: 'Chocolate',
  frosting: 'Buttercream',
  addonIds: ['disco', 'crown'],
  pickupDate: '2026-12-31',
  fulfillment: 'pickup' as const,
  deliveryAddress: '',
}

async function main() {
  console.log('=== Square Integration Test Suite ===\n')

  await check('Square credentials valid', async () => {
    const { locations } = await squareClient.locations.list()
    if (!locations?.length) throw new Error('No locations returned')
  })

  await check('Location ID resolves', async () => {
    const { locations } = await squareClient.locations.list()
    const found = locations?.find((l) => l.id === process.env.SQUARE_LOCATION_ID)
    if (!found) throw new Error(`SQUARE_LOCATION_ID ${process.env.SQUARE_LOCATION_ID} not found`)
  })

  await check('Service variation ID resolves', async () => {
    const { object } = await squareClient.catalog.retrieveObject(
      process.env.SQUARE_SERVICE_VARIATION_ID!
    )
    if (!object) throw new Error('Service variation not found')
  })

  await check('Team member ID resolves', async () => {
    const { teamMember } = await squareClient.team.retrieveTeamMember(
      process.env.SQUARE_TEAM_MEMBER_ID!
    )
    if (!teamMember) throw new Error('Team member not found')
  })

  let customerId = ''
  await check('Customer upsert (create)', async () => {
    customerId = await upsertCustomer(testOrder)
    if (!customerId) throw new Error('No customer ID returned')
  })

  await check('Customer upsert (idempotent - same email returns same ID)', async () => {
    const id2 = await upsertCustomer(testOrder)
    if (id2 !== customerId) throw new Error(`Duplicate created: ${customerId} vs ${id2}`)
  })

  let bookingId = ''
  await check('Booking creation', async () => {
    const note = buildBookingNote(testOrder)
    bookingId = await createBooking(customerId, testOrder, note)
    if (!bookingId) throw new Error('No booking ID returned')
  })

  await check('SMS text builds correctly', async () => {
    const text = buildSmsText(testOrder)
    if (!text.includes(testOrder.name)) throw new Error('Name missing from SMS')
    if (!text.includes(testOrder.pickupDate)) throw new Error('Date missing from SMS')
  })

  console.log('\n=== Results ===')
  console.log(`Booking ID: ${bookingId || '(not created)'}`)
  console.log(`Customer ID: ${customerId || '(not created)'}`)
  console.log(`\nCheck sandbox Dashboard > Appointments > Dec 31 to verify.`)
}

main().catch(console.error)
```

Run the full suite:
```bash
npx tsx scripts/test-all.ts
```

All lines should print `[PASS]`. Any `[FAIL]` line includes the error message.

---

## Switching to production

Once all tests pass in sandbox:

1. In `.env.local`:
   ```bash
   SQUARE_ENVIRONMENT=production
   SQUARE_ACCESS_TOKEN=EAAAl...your-PRODUCTION-token
   ```
2. Clear the Square IDs (they are different in production):
   ```bash
   SQUARE_LOCATION_ID=
   SQUARE_SERVICE_VARIATION_ID=
   SQUARE_TEAM_MEMBER_ID=
   ```
3. Run `npx tsx scripts/setup-square.ts` again - it will create the service in production
4. In production Square Dashboard: assign team member to "Custom Cake Order" service
5. Run `npx tsx scripts/verify-square.ts` - confirm all 3 IDs
6. Set Twilio to real credentials and `BAKERY_PHONE_NUMBER` to Ony's real number
7. Do one final end-to-end test in the browser (submit a real test order)
8. Cancel that booking in Square Dashboard afterward

---

## Troubleshooting quick reference

| Symptom | Likely cause | Fix |
|---|---|---|
| `UNAUTHORIZED` from Square | Wrong token or sandbox/production mismatch | Check `SQUARE_ENVIRONMENT` and `SQUARE_ACCESS_TOKEN` |
| `NOT_FOUND` on service variation | ID from sandbox not valid in production | Re-run setup-square.ts in production env |
| `INVALID_REQUEST` on booking create | Team member not assigned to service | Dashboard > Appointments > Services > assign manually |
| `booking.created` but no appointment visible | Wrong location ID | Verify SQUARE_LOCATION_ID matches the location in Dashboard |
| Twilio error 21211 | Invalid `to` number format | Use E.164 format: +1XXXXXXXXXX |
| Twilio error 21606 | Unverified number in Twilio trial | Verify the number in Twilio console, or upgrade trial |
| Form submit hangs | API route not running | Ensure `npm run dev` is running and check Network tab |
| SMS works but no Square booking | Square error caught but swallowed | Check server terminal for `Square booking error:` log |
