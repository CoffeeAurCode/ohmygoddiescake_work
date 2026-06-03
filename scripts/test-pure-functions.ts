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

// ─── buildBookingNote ──────────────────────────────────────────────────────

console.log('\n── buildBookingNote ─────────────────────────────────────────')

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

const deliveryNote = buildBookingNote({ ...baseOrder, fulfillment: 'delivery', deliveryAddress: '123 Main St NW, Calgary AB' })
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

// All 14 known add-on IDs should map to labels (not fall through to raw ID)
const allAddonIds = ['disco','butterflies','edible','freshFlorals','fauxFlorals','crown','macarons','strawberries','metallic','cherries','miniLiquor','burnaway','pearls','ribbons']
const allAddonsNote = buildBookingNote({ ...baseOrder, addonIds: allAddonIds })
assert('All 14 addons expand to labels (no raw IDs)', !allAddonIds.some(id => allAddonsNote.includes(`, ${id},`) || allAddonsNote.endsWith(id)))
assert('All 14 addons contain price markers', (allAddonsNote.match(/\(\+\$/g) || []).length === 14)

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

// SMS should not exceed Twilio's 1600-char soft limit for a realistic order
assert('SMS under 1600 chars', smsText.length < 1600)

// ─── Result ────────────────────────────────────────────────────────────────

console.log(`\n── Result: ${failures === 0 ? 'ALL PASS' : failures + ' FAILURE(S)'} ─────────────────────────────`)
if (failures > 0) process.exit(1)
