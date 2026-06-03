import { config } from 'dotenv'
config({ path: '.env.local' })
import { SquareClient, SquareEnvironment } from 'square'

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment:
    process.env.SQUARE_ENVIRONMENT === 'production'
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
})

async function main() {
  console.log("Setting up Square catalog for Ony's Boutique...")

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
              variations: [
                {
                  type: 'ITEM_VARIATION',
                  id: '#cake-variation',
                  itemVariationData: {
                    name: 'Standard',
                    pricingType: 'VARIABLE_PRICING',
                    availableForBooking: true,
                    serviceDuration: BigInt(30 * 60 * 1000),
                    teamMemberIds: [],
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

  const { locations } = await client.locations.list()
  console.log('\nLocations:')
  locations?.forEach((l) => console.log(` - ${l.name}: ${l.id}`))
  console.log('\nCopy your location ID above -> SQUARE_LOCATION_ID in .env.local')

  const searchResult = await client.teamMembers.search({
    query: { filter: { status: 'ACTIVE' } },
  })
  console.log('\nTeam members:')
  searchResult.teamMembers?.forEach((m) =>
    console.log(` - ${[m.givenName, m.familyName].filter(Boolean).join(' ')}: ${m.id}`)
  )
  console.log('\nCopy the team member ID above -> SQUARE_TEAM_MEMBER_ID in .env.local')
  console.log(
    '\nIMPORTANT: Go to Square Dashboard > Appointments > Services > Custom Cake Order'
  )
  console.log('and manually assign the team member to this service.')
}

main().catch(console.error)
