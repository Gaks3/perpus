'use client'

import { Bookmark } from '@prisma/client'
import { Button } from './ui/button'
import { BookmarkIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useTransition } from 'react'
import { createBookmark, deleteBookmark } from '@/lib/actions/bookmark'
import { toast } from './ui/use-toast'

export default function BookmarkButton({
  userId,
  bookId,
  bookmark,
  className,
}: {
  userId: string
  bookId: number
  bookmark?: Bookmark | null
  className?: string
}) {
  const [pending, startTransition] = useTransition()
  const [booked, setBooked] = useState(!!bookmark)

  async function handleClick() {
    try {
      if (booked && bookmark) {
        await deleteBookmark(userId, bookId)

        setBooked(false)
        toast({
          title: 'Success',
          description: 'Unbookmark book ' + bookId,
        })
      } else {
        await createBookmark(userId, bookId)

        setBooked(true)
        toast({
          title: 'Success',
          description: 'Bookmark book ' + bookId,
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
    <Button
      className={cn('flex gap-3', className)}
      onClick={() => startTransition(handleClick)}
      disabled={pending}
    >
      <BookmarkIcon fill={booked ? 'white' : 'transparent'} />
      Bookmark
    </Button>
  )
}
