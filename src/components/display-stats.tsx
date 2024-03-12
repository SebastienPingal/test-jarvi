import React from 'react'
import LineChart from './line-chart'
import StatCell from './stat-cell'

const DisplayStats = ({ entries, className }: { entries: any[], className: string }) => {
  const calculateAverage = (type : string | null = null) => {
    const filteredEntries = type ? entries.filter(entry => entry.type === type) : entries
    const sum = filteredEntries.reduce((acc, entry) => acc + entry.reply_rate, 0)
    return (sum / filteredEntries.length).toFixed(1)
  }

  const averageReplyRate = calculateAverage()
  const averageRepliedRateEmail = calculateAverage('EMAIL_SENT')
  const averageRepliedRateLinkedinMessage = calculateAverage('LINKEDIN_MESSAGE_SENT')
  const averageRepliedRateLinkedinInmail = calculateAverage('LINKEDIN_INMAIL_SENT')

  return (
    <div className={className + " flex flex-col gap-4 items-center"}>
      <h2 className="text-2xl font-bold">Average reply rate</h2>
      <div className="flex justify-between w-full">
        <StatCell title="All" value={averageReplyRate} unity="%" />
        <StatCell title="Emails" value={averageRepliedRateEmail} unity="%" />
        <StatCell title="Linkedin messages" value={averageRepliedRateLinkedinMessage} unity="%" />
        <StatCell title="Linkedin inmails" value={averageRepliedRateLinkedinInmail} unity="%" />
      </div>
      <LineChart className="w-full h-96" entries={entries} />
    </div>
  )
}

export default DisplayStats