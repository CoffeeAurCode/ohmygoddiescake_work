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
  console.log('Verifying Square configuration...\n')

  const { locations } = await client.locations.list()
  const loc = locations?.find((l) => l.id === process.env.SQUARE_LOCATION_ID)
  console.log(
    `Location (${process.env.SQUARE_LOCATION_ID}):`,
    loc ? `OK - ${loc.name}` : 'NOT FOUND'
  )

  const svcResult = await client.catalog.object
    .get({ objectId: process.env.SQUARE_SERVICE_VARIATION_ID! })
    .catch(() => ({ object: null }))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svcObj = svcResult.object as any
  console.log(
    `Service variation (${process.env.SQUARE_SERVICE_VARIATION_ID}):`,
    svcObj
      ? `OK - ${svcObj.itemVariationData?.name} (version: ${svcObj.version})`
      : 'NOT FOUND'
  )

  const memberResult = await client.teamMembers
    .get({ teamMemberId: process.env.SQUARE_TEAM_MEMBER_ID! })
    .catch(() => ({ teamMember: null }))
  const m = memberResult.teamMember
  const memberName = m
    ? [m.givenName, m.familyName].filter(Boolean).join(' ')
    : null
  console.log(
    `Team member (${process.env.SQUARE_TEAM_MEMBER_ID}):`,
    memberName ? `OK - ${memberName}` : 'NOT FOUND'
  )

  console.log('\nAll checks complete.')
}

main().catch(console.error)
