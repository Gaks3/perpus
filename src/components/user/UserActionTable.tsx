import { deleteUser } from '@/lib/actions/user'
import { toast } from '../ui/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'

export default function UserActionTable({ id }: { id: string }) {
  async function handleDelete() {
    try {
      const user = await deleteUser(id)

      toast({
        title: 'Success',
        description: `Delete user ${user.email}`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <Link href={`/user/${id}`}>
            <DropdownMenuItem className='cursor-pointer'>Edit</DropdownMenuItem>
          </Link>
          <Link href={`/dashboard/users/${id}/books`}>
            <DropdownMenuItem className='cursor-pointer'>
              Books
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <AlertDialogTrigger>
              <span className='w-full text-left text-destructive'>Delete</span>
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete user</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure to delete this user?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
