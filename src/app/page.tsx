'use client'
import { nhost } from "@/app/lib/nhost"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react"
import DisplayStats from "@/components/display-stats"

export default function Home() {
  const [historyEntries, setHistoryEntries] = useState([])
  const [selectedMonths, setSelectedMonths] = useState("3")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const user_id = '32ca93da-0cf6-4608-91e7-bc6a2dbedcd1'

  useEffect(() => {
    setLoading(true)
    setError('')
    console.log('isAuthenticated', nhost.auth.isAuthenticated())
    const fetchHistoryEntries = async () => {
      const now = new Date()
      const startDate = new Date(now.getFullYear(), now.getMonth() - parseInt(selectedMonths), now.getDate()).toISOString()
      let query = `
        query GetHistoryentries_monthly_stats($startDate: timestamptz, $user_id: uuid!) {
          historyentries_monthly_stats (
            where: {
              month: {_gte: $startDate},
              user_id: {_eq: $user_id}
            },
            order_by: {month: desc}
          ) {
            month
            replied_messages
            reply_rate
            total_messages
            type
          }
        }
      `
      let variables = {
        startDate: startDate,
        user_id: user_id,
      }

      const { data, error } = await nhost.graphql.request(query, variables)
      if (error) {
        console.error('error', error)
        setError('message' in error ? error.message : error.map(e => e.message).join(', '))
      } else {
        setHistoryEntries(data?.historyentries_monthly_stats || [])
      }
      setLoading(false)
    }

    if (nhost.auth.isAuthenticated()) {
      fetchHistoryEntries()
    }
  }, [selectedMonths, nhost.auth.isAuthenticated()])

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-8">
      <h1 className="text-4xl font-bold">Stats</h1>

      <RadioGroup defaultValue={selectedMonths} onValueChange={setSelectedMonths}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="3" id="r2" />
          <Label htmlFor="r2">Last 3 months</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="12" id="r3" />
          <Label htmlFor="r3">Last year</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="999" id="r4" />
          <Label htmlFor="r4">All time</Label>
        </div>
      </RadioGroup>

      {loading ? (
        <LoaderCircle className="w-8 h-8 animate-spin" />
      ) : error ? (
        <div>{JSON.stringify(error)}</div>
      ) : historyEntries.length > 0 ? (
        <div>
          <DisplayStats entries={historyEntries} className="w-full" />
        </div>
      ) : (
        <div>Aucune donnée...</div>
      )}
    </main>
  )
}