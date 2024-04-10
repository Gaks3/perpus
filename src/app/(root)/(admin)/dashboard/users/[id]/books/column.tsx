'use client'

import { Button } from '@/components/ui/button'
import { Book, Borrow } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ChevronsUpDown } from 'lucide-react'
import { id } from 'date-fns/locale'
import BorrowActionTable from '@/components/borrow/BorrowActionTable'

export const column: ColumnDef<{ book: Book } & Borrow>[] = [
  {
    accessorKey: 'book.id',
    header: ({ column }) => (
      <Button
        variant={'ghost'}
        className='flex gap-2'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Book Id
        <ChevronsUpDown size={16} />
      </Button>
    ),
  },
  {
    accessorKey: 'book.title',
    header: ({ column }) => (
      <Button
        variant={'ghost'}
        className='flex gap-2'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Title
        <ChevronsUpDown size={16} />
      </Button>
    ),
  },
  {
    accessorKey: 'book.author',
    header: ({ column }) => (
      <Button
        variant={'ghost'}
        className='flex gap-2'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Author
        <ChevronsUpDown size={16} />
      </Button>
    ),
  },
  {
    accessorKey: 'returnDate',
    header: ({ column }) => (
      <Button
        variant={'ghost'}
        className='flex gap-2'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Return Date
        <ChevronsUpDown size={16} />
      </Button>
    ),
    cell: ({ row }) =>
      format(row.original.returnDate, 'dd MMMM yyyy', { locale: id }),
  },
  {
    id: 'action',
    cell: ({ row }) => (
      <BorrowActionTable id={row.original.id} userId={row.original.userId} />
    ),
    enableHiding: false,
  },
]
