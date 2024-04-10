'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserActionTable from '@/components/user/UserActionTable'
import { User } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ChevronDown, ChevronsUpDown } from 'lucide-react'

export const column: ColumnDef<User>[] = [
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button
        variant={'ghost'}
        className='flex gap-2'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Email
        <ChevronsUpDown size={16} />
      </Button>
    ),
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <Button
        variant={'ghost'}
        className='flex gap-2'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Username
        <ChevronsUpDown size={16} />
      </Button>
    ),
  },
  {
    accessorKey: 'isAdmin',
    header: ({ table }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className='flex gap-2'>
            Role <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem
            onClick={() => table.getColumn('isAdmin')?.setFilterValue('')}
          >
            None
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => table.getColumn('isAdmin')?.setFilterValue(true)}
          >
            Admin
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => table.getColumn('isAdmin')?.setFilterValue(false)}
          >
            User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    cell: ({ row }) => (row.original.isAdmin ? 'Admin' : 'User'),
  },
  {
    accessorKey: 'countBorrow',
    header: ({ column }) => (
      <Button
        className='flex gap-2'
        variant={'ghost'}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Borrow
        <ChevronsUpDown size={16} />
      </Button>
    ),
  },
  {
    id: 'action',
    cell: ({ row }) => <UserActionTable id={row.original.id} />,
    enableHiding: false,
  },
]
