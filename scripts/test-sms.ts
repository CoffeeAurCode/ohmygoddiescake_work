import { config } from 'dotenv'
config({ path: '.env.local' })
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
