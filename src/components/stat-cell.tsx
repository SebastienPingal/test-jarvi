import React from 'react'

const StatCell = ({ title, value, unity }: { title: string, value: string, unity: string }) => {
  return (
    <div className='flex flex-col items-center p-2'>
      <h2>{title}</h2>
      <p className="text-2xl font-bold">{value} {unity}</p>
    </div>
  )
}

export default StatCell