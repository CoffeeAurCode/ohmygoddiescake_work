import { config } from 'dotenv'
config({ path: '.env.local' })
import { SquareClient, SquareEnvironment } from 'square'

const c = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment: SquareEnvironment.Sandbox,
})

async function main() {
  console.log('--- Business booking profile ---')
  try {
    const profile = await c.bookings.getBusinessProfile()
    console.log(JSON.stringify(profile, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2))
  } catch (e: unknown) {
    console.error('getBusinessProfile failed:', e instanceof Error ? e.message : e)
  }

  console.log('\n--- Service variation details ---')
  try {
    const sv = await c.catalog.object.get({ objectId: process.env.SQUARE_SERVICE_VARIATION_ID! })
    console.log(JSON.stringify(sv.object, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2))
  } catch (e: unknown) {
    console.error('catalog.object.get failed:', e instanceof Error ? e.message : e)
  }

  console.log('\n--- Team member booking profiles ---')
  try {
    const profiles = await c.bookings.bulkRetrieveTeamMemberBookingProfiles({
      teamMemberIds: [process.env.SQUARE_TEAM_MEMBER_ID!],
    })
    console.log(JSON.stringify(profiles, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2))
  } catch (e: unknown) {
    console.error('bulkRetrieveTeamMemberBookingProfiles failed:', e instanceof Error ? e.message : e)
  }
}

main().catch(console.error)
