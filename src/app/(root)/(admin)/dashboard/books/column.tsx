'use client'

import BookActionTable from '@/components/book/BookActionTable'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Book } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ChevronDown, ChevronsUpDown } from 'lucide-react'

export const column: ColumnDef<Book>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='flex gap-2'
      >
        Title
        <ChevronsUpDown size={16} />
      </Button>
    ),
  },
  {
    accessorKey: 'author',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='flex gap-2'
      >
        Author
        <ChevronsUpDown size={16} />
      </Button>
    ),
  },
  {
    accessorKey: 'publisher',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='flex gap-2'
      >
        Publisher
        <ChevronsUpDown size={16} />
      </Button>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ table }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='!ring-transparent w-full justify-start'
          >
            Status
            <ChevronDown className='w-4 h-4 ml-2' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem
            onClick={() => table.getColumn('status')?.setFilterValue('')}
          >
            None
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              table.getColumn('status')?.setFilterValue('available')
            }
          >
            Available
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              table.getColumn('status')?.setFilterValue('borrowed')
            }
          >
            Borrowed
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    accessorKey: 'language',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='flex gap-2'
      >
        Language
        <ChevronsUpDown size={16} />
      </Button>
    ),
  },
  {
    accessorKey: 'year_published',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='flex gap-2'
      >
        Published
        <ChevronsUpDown size={16} />
      </Button>
    ),
    cell: ({ row }) => format(row.original.year_published, 'MMM, dd yyyy'),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'page',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='flex gap-2'
      >
        Page
        <ChevronsUpDown size={16} />
      </Button>
    ),
  },
  {
    id: 'action',
    cell: ({ row }) => <BookActionTable id={row.original.id} />,
    enableHiding: false,
  },
]
