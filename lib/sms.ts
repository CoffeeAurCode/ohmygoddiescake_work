import twilio from 'twilio'

function getTwilioClient() {
  return twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)
}

export async function notifyBakery(body: string): Promise<void> {
  await getTwilioClient().messages.create({
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
  const pickup =
    order.fulfillment === 'delivery'
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
