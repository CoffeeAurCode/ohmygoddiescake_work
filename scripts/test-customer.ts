import { config } from 'dotenv'
config({ path: '.env.local' })
import { upsertCustomer } from '../lib/square'

async function main() {
  const testOrder = {
    name: 'Test Customer',
    email: `test-${Date.now()}@example.com`,
    phone: '',
    celebration: 'Birthday',
    celebrationOtherNote: '',
    servings: 12,
    flavour: 'Chocolate',
    frosting: 'Buttercream',
    addonIds: ['disco'],
    pickupDate: '2026-08-15',
  pickupTime: '12:00 PM',
    fulfillment: 'pickup' as const,
    deliveryAddress: '',
  }

  console.log('Creating customer:', testOrder.email)
  const customerId = await upsertCustomer(testOrder)
  console.log('Customer ID:', customerId)

  console.log('\nRunning again with same email (should return same ID)...')
  const sameId = await upsertCustomer(testOrder)
  console.log('Same ID?', customerId === sameId ? 'YES - upsert working' : 'NO - duplicate created!')
}

main().catch(console.error)
