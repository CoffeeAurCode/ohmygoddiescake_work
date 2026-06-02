import { SquareClient, SquareEnvironment } from 'square'

let _squareClient: SquareClient | undefined

export function getSquareClient(): SquareClient {
  if (!_squareClient) {
    const environment =
      process.env.SQUARE_ENVIRONMENT === 'production'
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox
    _squareClient = new SquareClient({
      token: process.env.SQUARE_ACCESS_TOKEN!,
      environment,
    })
  }
  return _squareClient
}

// Convenience alias — same name as before so existing callers at call sites still work
// after updating to call getSquareClient() instead of squareClient.*
export const squareClient = new Proxy({} as SquareClient, {
  get(_target, prop) {
    return (getSquareClient() as unknown as Record<string | symbol, unknown>)[prop]
  },
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
  pickupDate: string
  fulfillment: 'pickup' | 'delivery' | ''
  deliveryAddress: string
}

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
  const search = await squareClient.customers.search({
    query: { filter: { emailAddress: { exact: order.email } } },
  })

  if (search.customers && search.customers.length > 0) {
    return search.customers[0].id!
  }

  const parts = order.name.trim().split(/\s+/)
  const givenName = parts[0] ?? order.name
  const familyName = parts.slice(1).join(' ') || ''

  // Deterministic key so rapid duplicate submissions don't create two records
  const emailHash = Buffer.from(order.email.toLowerCase()).toString('base64url')
  const idempotencyKey = `customer-${emailHash}`.slice(0, 45)

  const { customer } = await squareClient.customers.create({
    idempotencyKey,
    givenName,
    familyName,
    emailAddress: order.email,
    ...(order.phone?.trim() ? { phoneNumber: order.phone.trim() } : {}),
  })

  return customer!.id!
}

export async function createBooking(
  customerId: string,
  order: OrderPayload,
  note: string
): Promise<string> {
  // Fetch real service variation version — Square rejects BigInt(1) if it doesn't match
  const { object: svcObj } = await squareClient.catalog.object.get({
    objectId: process.env.SQUARE_SERVICE_VARIATION_ID!,
  })
  const serviceVariationVersion = svcObj?.version ?? BigInt(1)

  // noon Calgary MDT (UTC-6)
  const startAt = `${order.pickupDate}T18:00:00Z`

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
          serviceVariationVersion,
          teamMemberId: process.env.SQUARE_TEAM_MEMBER_ID!,
          durationMinutes: 30,
        },
      ],
    },
  })

  return booking!.id!
}
