import React from 'react'
import { Line } from 'react-chartjs-2'
import { ChartOptions, Scale, CoreScaleOptions} from 'chart.js'

import 'chart.js/auto'

const LineChart = ({ entries, className }: { entries: any[], className?: string }) => {

  const formatData = (type: string) => {
    return entries
      .filter(entry => entry.type === type)
      .map(entry => (entry.reply_rate * 100))
  }

  const labels = entries.filter(entry => entry.type === 'EMAIL_SENT').map(entry => new Date(entry.month).toLocaleString('default', { month: 'long' }))

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Reply rate'
        },
        ticks: {
          callback: function(this: Scale<CoreScaleOptions>, tickValue: string | number) {
            return `${tickValue}%`
          }
        }
      }
    }
  }

  const emailData = formatData('EMAIL_SENT')
  const linkedinMessageData = formatData('LINKEDIN_MESSAGE_SENT')
  const linkedinInmailData = formatData('LINKEDIN_INMAIL_SENT')

  const data = {
    labels,
    datasets: [
      {
        label: 'Email Sent',
        data: emailData,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'LinkedIn Message Sent',
        data: linkedinMessageData,
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
      },
      {
        label: 'LinkedIn InMail Sent',
        data: linkedinInmailData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  }

  return <Line data={data} options={options} className={className} />
}

export default LineChart
