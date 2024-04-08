'use client'

import { BookStatsType } from '@/lib/actions/book'
import { ResponsivePie } from '@nivo/pie'
import useWindow from 'use-window-width-breakpoints'

export default function BooksChart({ data }: { data: BookStatsType }) {
  const breakout = useWindow({
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  })

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 20, right: 100, bottom: 20, left: 0 }}
      innerRadius={0.85}
      padAngle={4}
      cornerRadius={10}
      activeOuterRadiusOffset={8}
      colors={{ scheme: 'set1' }}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor='#333333'
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      enableArcLabels={false}
      arcLabelsTextColor={{ theme: 'background' }}
      legends={[
        {
          anchor: 'right',
          direction: 'column',
          justify: false,
          translateX: breakout.sm ? 80 : 150,
          translateY: 4,
          itemsSpacing: 6,
          itemWidth: 150,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 9,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  )
}
