import { UserRound } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { User } from 'lucia'
import Link from 'next/link'
import { signOut } from '@/lib/actions/auth'

export default function UserHeader({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='cursor-pointer'>
        <div className='rounded-full bg-secondary'>
          <UserRound className='m-2 text-secondary-foreground' size={22} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-44'>
        <DropdownMenuItem>{user.username}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className='cursor-pointer'>
          <Link href={`/user/${user.id}`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className='cursor-pointer'>
          <Link href={`/user/${user.id}/books`}>My Books</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className='cursor-pointer'>
          <Link href={`/user/${user.id}/bookmark`}>My Bookmark</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer !text-destructive'
          onClick={async () => await signOut()}
        >
          SignOut
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
