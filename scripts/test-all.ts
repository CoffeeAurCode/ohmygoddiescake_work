/**
 * Runs all non-browser tests in sequence.
 * Run: npx tsx scripts/test-all.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })
import { squareClient, upsertCustomer, buildBookingNote, createBooking } from '../lib/square'
import { buildSmsText } from '../lib/sms'

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
  phone: '',
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
    const result = await squareClient.catalog.object.get({
      objectId: process.env.SQUARE_SERVICE_VARIATION_ID!,
    })
    if (!result.object) throw new Error('Service variation not found')
  })

  await check('Team member ID resolves', async () => {
    const result = await squareClient.teamMembers.get({
      teamMemberId: process.env.SQUARE_TEAM_MEMBER_ID!,
    })
    if (!result.teamMember) throw new Error('Team member not found')
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

  await check('Appointments enrolled (booking profile)', async () => {
    const profile = await squareClient.bookings.getBusinessProfile()
    if (!profile.businessBookingProfile) throw new Error('No booking profile returned')
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
