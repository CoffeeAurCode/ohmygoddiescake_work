import { config } from 'dotenv'
config({ path: '.env.local' })
import { SquareClient, SquareEnvironment } from 'square'

const c = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment: SquareEnvironment.Production,
})

async function main() {
  // Get the parent item ID from the variation
  const varResult = await c.catalog.object.get({
    objectId: process.env.SQUARE_SERVICE_VARIATION_ID!,
    includeRelatedObjects: true,
  })

  const parentId = varResult.object?.itemVariationData?.itemId
  if (!parentId) throw new Error('Could not find parent item ID from service variation')
  console.log('Parent item ID:', parentId)

  const parentItem = varResult.relatedObjects?.find((o) => o.id === parentId)
  if (!parentItem) throw new Error('Parent item not in relatedObjects')

  console.log('Current productType:', parentItem.itemData?.productType ?? '(none)')
  console.log('Current version:', parentItem.version?.toString())

  // Update the item with APPOINTMENTS_SERVICE product type
  const { catalogObject } = await c.catalog.object.upsert({
    idempotencyKey: crypto.randomUUID(),
    object: {
      type: 'ITEM',
      id: parentId,
      version: parentItem.version,
      itemData: {
        ...parentItem.itemData,
        productType: 'APPOINTMENTS_SERVICE',
      },
    },
  })

  console.log('\nUpdated! New productType:', catalogObject?.itemData?.productType)
  console.log('New version:', catalogObject?.version?.toString())
  console.log('\nGo to Square Dashboard > Appointments > Services - "Custom Cake Order" should now appear there.')
  console.log('Assign Onyinye Ekwulugo to it.')
}

main().catch(console.error)
