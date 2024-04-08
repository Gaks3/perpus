'use client'

import { getKeys } from '@/lib/utils'
import { ResponsiveBar } from '@nivo/bar'

export type Data = Array<{ [key: string]: number | string }>

export default function MostBorrowChart({ data }: { data: Data }) {
  const keys = getKeys(data).filter((key) => key !== 'email')

  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy='email'
      margin={{ top: 50, right: 130, bottom: 70, left: 60 }}
      padding={0.3}
      groupMode='stacked'
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'category10' }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'date',
        legendPosition: 'middle',
        legendOffset: 50,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendPosition: 'middle',
        legendOffset: -40,
        truncateTickAt: 2,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  )
}
