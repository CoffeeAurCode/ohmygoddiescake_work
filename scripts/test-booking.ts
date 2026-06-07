import { config } from 'dotenv'
config({ path: '.env.local' })
import { buildBookingNote, createBooking, upsertCustomer } from '../lib/square'

async function main() {
  const testOrder = {
    name: 'Booking Test',
    email: `booking-test-${Date.now()}@example.com`,
    phone: '',
    celebration: 'Wedding',
    celebrationOtherNote: '3-tier, needs to feed 80 guests',
    servings: 80,
    flavour: 'Vanilla',
    frosting: 'Fondant',
    addonIds: ['freshFlorals', 'pearls'],
    pickupDate: '2026-09-20',
  pickupTime: '12:00 PM',
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
