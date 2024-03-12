'use client'
import { nhost } from "@/app/lib/nhost"
import LineChart from "@/components/line-chart"
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

  useEffect(() => {
    console.log('selectedMonths', selectedMonths)
    setLoading(true)
    setError(null)

    const fetchHistoryEntries = async () => {
      console.log('fetchHistoryEntries')
      const now = new Date()
      const startDate = new Date(now.getFullYear(), now.getMonth() - parseInt(selectedMonths), now.getDate()).toISOString()
      let query = ``

      query = `
        query GetHistoryentries_monthly_stats {
          historyentries_monthly_stats (
            where: {
              ${selectedMonths !== '999' ? `month: {_gte: "${startDate}"}` : ''}
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

      const { data, error } = await nhost.graphql.request(query)
      if (error) {
        console.error('error', error)
        if ('message' in error) setError(error.message)        
        else setError(error.map(e => e.message).join(', '))

      } else {
        setHistoryEntries(data?.historyentries_monthly_stats || [])
        console.log('historyEntries', data?.historyentries_monthly_stats || 'no data')
      }
      setLoading(false)
    }

    fetchHistoryEntries()
  }, [selectedMonths])

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-8">
      <h1 className="text-4xl font-bold">Statistiques</h1>

      <RadioGroup defaultValue={selectedMonths} onValueChange={setSelectedMonths}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="3" id="r2" />
          <Label htmlFor="r2">Les 3 derniers mois</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="12" id="r3" />
          <Label htmlFor="r3">la dernière année</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="999" id="r4" />
          <Label htmlFor="r4">Tout</Label>
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