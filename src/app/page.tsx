import { nhost } from "@/app/lib/nhost";

export default async function Home() {
  // TODO handle type for historyEntries
  const query = `
    query GetHistoryentries {
      historyentries(limit: 100) {
        is_read
        subject
        type
        created_at
        user_id
        linkedin_seat_id
      }
    }
  `

  const {data, error} = await nhost.graphql.request(query)
  if (error) {
    console.error('error', error)
  } else {
    console.log(data)
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Nhost Auth History</h1>
      <ul>
        {JSON.stringify(data)}
      </ul>
    </main>
  );
}
