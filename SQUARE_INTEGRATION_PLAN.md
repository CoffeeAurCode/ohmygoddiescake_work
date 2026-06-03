# Square Integration Plan - Ony's Boutique

## What this builds

When a customer submits the order form (step 5), the site will:
1. POST all form data to a new Next.js API route `/api/book`
2. Upsert the customer in Square CRM (search by email, create if new)
3. Create a Square Appointment on the pickup/delivery date with full order details in the notes
4. Send an SMS to the bakery with a compact order summary via Twilio
5. Show the customer a success confirmation screen

No payment is collected on the website - Square booking is purely a calendar + CRM record.

---

## Prerequisites

### Square account
- Square developer account at developer.squareup.com
- One application created (gives you app ID + sandbox + production tokens)
- The seller account (Ony's) must be on **Appointments Plus ($35 CAD/mo)** to allow seller-level booking creation via API
- Before running setup scripts: add at least one team member (Ony/the baker) in Square Dashboard
- Before running setup scripts: ensure a Location exists in Square Dashboard

### Twilio account
- Twilio account at twilio.com (free trial works for testing)
- A Twilio phone number capable of sending SMS
- The bakery's phone number (destination for order notifications)

### Node packages to add
```bash
npm install square twilio
npm install --save-dev @types/node tsx dotenv
```
`tsx` is used to run the setup/test scripts directly without compiling.

---

## Environment variables

Create `.env.local` (already gitignored):

```bash
# Square - Sandbox (for local dev)
SQUARE_ENVIRONMENT=sandbox
SQUARE_ACCESS_TOKEN=EAAAl...your-sandbox-token
SQUARE_LOCATION_ID=          # filled after running setup script
SQUARE_SERVICE_VARIATION_ID= # filled after running setup script
SQUARE_TEAM_MEMBER_ID=       # filled after running setup script

# Square - Production (leave empty until ready to go live)
# SQUARE_ENVIRONMENT=production
# SQUARE_ACCESS_TOKEN=EAAAl...your-production-token

# Twilio
TWILIO_ACCOUNT_SID=ACxxxx
TWILIO_AUTH_TOKEN=xxxx
TWILIO_FROM_NUMBER=+1XXXXXXXXXX  # your Twilio number
BAKERY_PHONE_NUMBER=+1XXXXXXXXXX # Ony's phone number (receives SMS)
```

---

## One-time Square Dashboard setup (manual, before scripts)

These CANNOT be done via API - Square requires Dashboard for them:

1. **Location** - Go to Square Dashboard > Account & Settings > Business locations. Confirm or create "Ony's Boutique Calgary". Note the location name.
2. **Team member** - Go to Square Dashboard > Team. Add team member (Ony). Note the name.
3. **Assign team member to service** - After running `scripts/setup-square.ts` (which creates the service), go to Square Appointments > Services, open "Custom Cake Order", and assign the team member to it. This cannot be done via API.

---

## Files to create

```
ohmygoddiescake_work/
  lib/
    square.ts         # Square client singleton + helper functions
    sms.ts            # Twilio SMS sender
  app/api/book/
    route.ts          # POST handler - main integration logic
  scripts/
    setup-square.ts   # One-time: create service in Square catalog
    verify-square.ts  # Print location/team member/service IDs to confirm setup
```

Modify:
```
  components/OrderCTA.tsx   # Wire submit button to POST /api/book
```

---

## Implementation

### Step 1 - `lib/square.ts`

```typescript
import { SquareClient, SquareEnvironment } from 'square'

const environment =
  process.env.SQUARE_ENVIRONMENT === 'production'
    ? SquareEnvironment.Production
    : SquareEnvironment.Sandbox

export const squareClient = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment,
})

export type OrderPayload = {
  name: string
  email: string
  phone: string
  celebration: string
  celebrationOtherNote: string
  servings: number | ''
  flavour: string
  frosting: string
  addonIds: string[]
  pickupDate: string          // YYYY-MM-DD
  fulfillment: 'pickup' | 'delivery' | ''
  deliveryAddress: string
}

// Add-on ID to label map (mirrors OrderCTA.tsx ADD_ONS)
const ADDON_LABELS: Record<string, string> = {
  disco: 'Disco balls (+$10)',
  butterflies: 'Butterflies (+$5)',
  edible: 'Edible image sheet (+$20)',
  freshFlorals: 'Fresh florals (+$30)',
  fauxFlorals: 'Faux flowers (+$15)',
  crown: 'Crown (+$7)',
  macarons: 'French macarons (+$20)',
  strawberries: 'Dipped strawberries (+$15)',
  metallic: 'Gold/silver covered (+$25)',
  cherries: 'Cherries (+$5)',
  miniLiquor: 'Mini liquor bottles (+$7)',
  burnaway: 'Burn-away image (+$40)',
  pearls: 'Pearls (+$5)',
  ribbons: 'Ribbons (+$5)',
}

export function buildBookingNote(order: OrderPayload): string {
  const addons =
    order.addonIds.length > 0
      ? order.addonIds.map((id) => ADDON_LABELS[id] ?? id).join(', ')
      : 'None'

  const fulfillmentLine =
    order.fulfillment === 'delivery'
      ? `Delivery to: ${order.deliveryAddress}`
      : 'Pickup'

  const occasionNote = order.celebrationOtherNote
    ? `\nOccasion notes: ${order.celebrationOtherNote}`
    : ''

  return [
    `CAKE ORDER - Ony's Boutique`,
    `---`,
    `Occasion: ${order.celebration}${occasionNote}`,
    `Servings: ${order.servings || 'TBD'}`,
    `Cake: ${order.flavour || 'TBD'} + ${order.frosting || 'TBD'} frosting`,
    `Add-ons: ${addons}`,
    `Fulfillment: ${fulfillmentLine}`,
    `---`,
    `Customer: ${order.name}`,
    `Email: ${order.email}`,
    `Phone: ${order.phone}`,
  ].join('\n')
}

export async function upsertCustomer(order: OrderPayload): Promise<string> {
  // Search by email first to avoid duplicates
  const search = await squareClient.customers.search({
    query: { filter: { emailAddress: { exact: order.email } } },
  })

  if (search.customers && search.customers.length > 0) {
    const existing = search.customers[0]
    return existing.id!
  }

  // Split name into given + family (best-effort on single-field name)
  const parts = order.name.trim().split(/\s+/)
  const givenName = parts[0] ?? order.name
  const familyName = parts.slice(1).join(' ') || ''

  const { customer } = await squareClient.customers.create({
    idempotencyKey: crypto.randomUUID(),
    givenName,
    familyName,
    emailAddress: order.email,
    phoneNumber: order.phone,
  })

  return customer!.id!
}

export async function createBooking(
  customerId: string,
  order: OrderPayload,
  note: string
): Promise<string> {
  // Booking start: pickup date at noon Calgary time
  // Calgary = Mountain Time: UTC-7 (MDT summer) / UTC-6 (MST winter)
  // Using noon UTC as a safe cross-season default for a calendar record
  const startAt = `${order.pickupDate}T18:00:00Z` // noon MDT (UTC-6)

  const { booking } = await squareClient.bookings.create({
    idempotencyKey: crypto.randomUUID(),
    booking: {
      locationId: process.env.SQUARE_LOCATION_ID!,
      customerId,
      customerNote: note,
      startAt,
      appointmentSegments: [
        {
          serviceVariationId: process.env.SQUARE_SERVICE_VARIATION_ID!,
          serviceVariationVersion: BigInt(1), // updated by verify script
          teamMemberId: process.env.SQUARE_TEAM_MEMBER_ID!,
          durationMinutes: 30,
        },
      ],
    },
  })

  return booking!.id!
}
```

---

### Step 2 - `lib/sms.ts`

```typescript
import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export async function notifyBakery(body: string): Promise<void> {
  await client.messages.create({
    from: process.env.TWILIO_FROM_NUMBER!,
    to: process.env.BAKERY_PHONE_NUMBER!,
    body,
  })
}

export function buildSmsText(order: {
  name: string
  celebration: string
  servings: number | ''
  flavour: string
  frosting: string
  addonIds: string[]
  pickupDate: string
  fulfillment: string
  deliveryAddress: string
  phone: string
}): string {
  const addons = order.addonIds.length > 0 ? order.addonIds.join(', ') : 'none'
  const pickup = order.fulfillment === 'delivery'
    ? `Deliver to ${order.deliveryAddress}`
    : 'Pickup'
  return (
    `NEW ORDER - Ony's Boutique\n` +
    `From: ${order.name} (${order.phone})\n` +
    `Date: ${order.pickupDate} | ${pickup}\n` +
    `Occasion: ${order.celebration}\n` +
    `Cake: ${order.flavour}, ${order.frosting}, ${order.servings} servings\n` +
    `Add-ons: ${addons}`
  )
}
```

---

### Step 3 - `app/api/book/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import {
  buildBookingNote,
  createBooking,
  OrderPayload,
  upsertCustomer,
} from '@/lib/square'
import { buildSmsText, notifyBakery } from '@/lib/sms'

export async function POST(req: NextRequest) {
  let order: OrderPayload

  try {
    order = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  // Basic required-field validation
  if (!order.name || !order.email || !order.pickupDate) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    // 1. Upsert customer in Square CRM
    const customerId = await upsertCustomer(order)

    // 2. Build appointment note with all order details
    const note = buildBookingNote(order)

    // 3. Create Square appointment on the delivery/pickup date
    const bookingId = await createBooking(customerId, order, note)

    // 4. SMS notification to bakery (non-blocking - log error but don't fail the order)
    try {
      const smsText = buildSmsText(order)
      await notifyBakery(smsText)
    } catch (smsErr) {
      console.error('SMS failed (order still created):', smsErr)
    }

    return NextResponse.json({ success: true, bookingId }, { status: 200 })
  } catch (err: unknown) {
    console.error('Square booking error:', err)
    const message = err instanceof Error ? err.message : 'Booking failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
```

---

### Step 4 - `scripts/setup-square.ts`

Run once to create the "Custom Cake Order" service in Square Catalog.

```typescript
import 'dotenv/config'
import { SquareClient, SquareEnvironment } from 'square'

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment:
    process.env.SQUARE_ENVIRONMENT === 'production'
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
})

async function main() {
  console.log('Setting up Square catalog for Ony\'s Boutique...')

  // Create the service item + variation in Square Catalog
  const { idMappings } = await client.catalog.batchUpsert({
    idempotencyKey: crypto.randomUUID(),
    batches: [
      {
        objects: [
          {
            type: 'ITEM',
            id: '#cake-service',
            itemData: {
              name: 'Custom Cake Order',
              description:
                "Ony's Boutique custom cake appointment. Details are in the booking notes.",
              isTaxable: false,
              availableForBooking: true,
              variations: [
                {
                  type: 'ITEM_VARIATION',
                  id: '#cake-variation',
                  itemVariationData: {
                    name: 'Standard',
                    pricingType: 'VARIABLE_PRICING',
                    availableForBooking: true,
                    serviceDuration: BigInt(30 * 60 * 1000), // 30 min in ms
                    teamMemberIds: [], // assigned in Dashboard (API limitation)
                  },
                },
              ],
            },
          },
        ],
      },
    ],
  })

  const variationMapping = idMappings?.find((m) => m.clientObjectId === '#cake-variation')
  console.log('\nService created successfully.')
  console.log(
    'SQUARE_SERVICE_VARIATION_ID =',
    variationMapping?.objectId ?? '(not found in response - check Dashboard)'
  )

  // List locations
  const { locations } = await client.locations.list()
  console.log('\nLocations:')
  locations?.forEach((l) => console.log(` - ${l.name}: ${l.id}`))
  console.log('\nCopy your location ID above -> SQUARE_LOCATION_ID in .env.local')

  // List team members
  const { teamMembers } = await client.team.searchTeamMembers({
    query: { filter: { status: 'ACTIVE' } },
  })
  console.log('\nTeam members:')
  teamMembers?.forEach((m) =>
    console.log(` - ${m.displayName}: ${m.id}`)
  )
  console.log('\nCopy the team member ID above -> SQUARE_TEAM_MEMBER_ID in .env.local')
  console.log(
    '\nIMPORTANT: Go to Square Dashboard > Appointments > Services > Custom Cake Order'
  )
  console.log('and manually assign the team member to this service.')
}

main().catch(console.error)
```

Run it:
```bash
npx tsx scripts/setup-square.ts
```

---

### Step 5 - `scripts/verify-square.ts`

Confirm all IDs resolve correctly before going live.

```typescript
import 'dotenv/config'
import { SquareClient, SquareEnvironment } from 'square'

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment:
    process.env.SQUARE_ENVIRONMENT === 'production'
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
})

async function main() {
  console.log('Verifying Square configuration...\n')

  // Location
  const { locations } = await client.locations.list()
  const loc = locations?.find((l) => l.id === process.env.SQUARE_LOCATION_ID)
  console.log(`Location (${process.env.SQUARE_LOCATION_ID}):`, loc ? `OK - ${loc.name}` : 'NOT FOUND')

  // Service variation
  const { object: svc } = await client.catalog.retrieveObject(
    process.env.SQUARE_SERVICE_VARIATION_ID!
  ).catch(() => ({ object: null }))
  console.log(
    `Service variation (${process.env.SQUARE_SERVICE_VARIATION_ID}):`,
    svc ? `OK - ${svc.itemVariationData?.name}` : 'NOT FOUND'
  )

  // Team member
  const { teamMember } = await client.team.retrieveTeamMember(
    process.env.SQUARE_TEAM_MEMBER_ID!
  ).catch(() => ({ teamMember: null }))
  console.log(
    `Team member (${process.env.SQUARE_TEAM_MEMBER_ID}):`,
    teamMember ? `OK - ${teamMember.displayName}` : 'NOT FOUND'
  )

  console.log('\nAll checks complete.')
}

main().catch(console.error)
```

Run it:
```bash
npx tsx scripts/verify-square.ts
```

---

### Step 6 - Modify `components/OrderCTA.tsx`

In the existing component, the submit action currently does nothing. Find the step 5 "submit" button handler and replace it:

**Locate** the `submitted` state and the final step submit handler. Add above the component:

```typescript
// At the top of the file, after existing imports:
import type { OrderFormValues } from './OrderCTA'  // already in file
```

**Replace** the no-op submit handler with:

```typescript
const [submitting, setSubmitting] = useState(false)
const [submitError, setSubmitError] = useState('')

async function handleSubmit() {
  setSubmitting(true)
  setSubmitError('')
  try {
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error ?? 'Something went wrong')
    setWizard((w) => ({ ...w, submitted: true }))
  } catch (err) {
    setSubmitError(err instanceof Error ? err.message : 'Submission failed')
  } finally {
    setSubmitting(false)
  }
}
```

**In the JSX** for the submit button (step 5):

```tsx
<button
  onClick={handleSubmit}
  disabled={submitting || !form.name || !form.email || !form.phone}
  className="... existing classes ..."
>
  {submitting ? 'Sending your order...' : 'Submit Order'}
</button>
{submitError && (
  <p className="text-red-500 text-sm mt-2">{submitError}</p>
)}
```

The existing `submitted` state already controls a success screen - that renders when `submitted: true`.

---

## Data flow summary

```
Customer fills 5-step form
  |
  v
POST /api/book  { name, email, phone, celebration, flavour, frosting,
                  addonIds, pickupDate, servings, fulfillment, deliveryAddress }
  |
  +-- squareClient.customers.search(email)    -> existing customer?
  |     yes: use existing ID
  |     no:  squareClient.customers.create()
  |
  +-- squareClient.bookings.create()
  |     locationId: SQUARE_LOCATION_ID
  |     customerId: (from above)
  |     startAt:    pickupDate + T18:00:00Z (noon Calgary MDT)
  |     customerNote: full order details block
  |
  +-- twilio.messages.create()
  |     to: BAKERY_PHONE_NUMBER
  |     body: compact order summary SMS
  |
  v
{ success: true, bookingId }  --> form shows success screen
```

---

## Appointment notes format (what appears in Square Calendar)

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

---

## SMS format (what Ony receives on her phone)

```
NEW ORDER - Ony's Boutique
From: Jane Smith (587-555-1234)
Date: 2026-07-15 | Deliver to 123 Main St NW Calgary AB
Occasion: Birthday
Cake: Chocolate, Buttercream, 24 servings
Add-ons: freshFlorals, disco
```

---

## Square Dashboard after integration

Every submitted order will appear in:
- **Square Appointments** calendar on the pickup/delivery date
- **Square Customers** CRM with the customer's name, email, phone
- Click any appointment to see the full order details in the notes

---

## Implementation order

1. `npm install square twilio tsx`
2. Create `.env.local` with sandbox credentials
3. Create `lib/square.ts` and `lib/sms.ts`
4. Run `npx tsx scripts/setup-square.ts` -> copy IDs to `.env.local`
5. In Square Dashboard: assign team member to "Custom Cake Order" service
6. Run `npx tsx scripts/verify-square.ts` -> confirm all 3 IDs resolve
7. Create `app/api/book/route.ts`
8. Modify `OrderCTA.tsx` to POST on submit
9. Run `npm run dev` and submit a test order
10. Check Square Dashboard calendar and your phone for the SMS
11. When confirmed working in sandbox -> swap to production credentials

---

## Security notes

- `SQUARE_ACCESS_TOKEN` and `TWILIO_AUTH_TOKEN` are server-only. They are accessed inside `app/api/book/route.ts` (server-side). Never import `lib/square.ts` or `lib/sms.ts` from client components.
- `.env.local` is already in `.gitignore`. Never commit it.
- The API route does basic field validation. Add rate limiting (via Vercel edge config or a middleware) before going to production to prevent abuse.
