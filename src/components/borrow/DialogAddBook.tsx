'use client'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useRef, useState } from 'react'
import { Book } from '@prisma/client'
import { format } from 'date-fns'
import Image from 'next/image'
import { getBookById } from '@/lib/actions/book'
import { Badge } from '../ui/badge'
import { addBorrow } from '@/lib/actions/borrow'
import { toast } from '../ui/use-toast'

export default function DialogAddBook({ userId }: { userId: string }) {
  const [search, setSearch] = useState('')
  const [data, setData] = useState<Book | null>()
  const closeRef = useRef<HTMLButtonElement | null>(null)

  async function getData() {
    const data = await getBookById(Number(search))

    setData(data)
  }

  async function handleSubmit() {
    if (!data || data.status === 'borrowed') {
      toast({
        title: 'Error',
        description: 'Book already borrowed',
        variant: 'destructive',
      })

      return
    }

    try {
      await addBorrow(userId, Number(data.id))

      closeRef.current?.click()
      toast({
        title: 'Success',
        description: `Book ${data.id} success to borrow`,
      })

      setData(null)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Button>Add Book</Button>
      </DialogTrigger>
      <DialogContent className='max-h-[80vh]'>
        <DialogHeader>
          <DialogTitle>Add Book</DialogTitle>
        </DialogHeader>
        <div className='space-y-1'>
          <Label htmlFor='bookId'>Book Id</Label>
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input
              id='bookId'
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') getData()
              }}
            />
            <Button onClick={getData}>Search</Button>
          </div>
        </div>
        {data ? (
          <div className='bg-muted rounded-md p-4 h-32 w-full flex gap-3'>
            <div className='w-20 h-full rounded relative'>
              <Image
                src={data.image_url}
                fill
                alt='test'
                className='object-cover'
              />
            </div>
            <div className='relative flex-1'>
              <h3 className='line-clamp-1 truncate w-[70%]'>{data.title}</h3>
              <Badge className='capitalize text-xs absolute top-0 right-0'>
                {data.status}
              </Badge>
              <div className='flex gap-3 text-xs'>
                <span>{data.author}</span>
                <span>{data.publisher}</span>
                <span>{format(data.year_published, 'yyyy')}</span>
              </div>
              <p className='text-xs mt-3 line-clamp-2'>{data.description}</p>
            </div>
          </div>
        ) : (
          <div className='w-full h-full flex items-center justify-center'>
            <p>No Result.</p>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild ref={closeRef}>
            <Button variant={'secondary'}>Close</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
