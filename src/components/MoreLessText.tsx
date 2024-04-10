'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function MoreLessText({ text }: { text: string }) {
  const [readMore, setReadMore] = useState(false)

  function handleClick() {
    setReadMore(!readMore)
  }

  return (
    <div className='space-y-3 text-sm'>
      <p className={cn(readMore ? 'line-clamp-none' : 'line-clamp-3')}>
        {text}
      </p>
      <span
        className='font-bold underline cursor-pointer'
        onClick={handleClick}
      >
        {readMore ? 'Less' : 'More'}
      </span>
    </div>
  )
}
