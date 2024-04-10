import { deleteBorrow, extendTimeBorrow } from '@/lib/actions/borrow'
import { toast } from '../ui/use-toast'
import { format } from 'date-fns'
import { id as Indo } from 'date-fns/locale'
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
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Ellipsis } from 'lucide-react'

export default function BorrowActionTable({
  id,
  userId,
}: {
  id: number
  userId: string
}) {
  async function handleDelete() {
    try {
      await deleteBorrow(id)

      toast({
        title: 'Success',
        description: 'Remove book from borrows',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  async function extendTime() {
    try {
      const res = await extendTimeBorrow(id)

      toast({
        title: 'Success',
        description: `Extend time to ${format(res.returnDate, 'dd MMMM yyyy', {
          locale: Indo,
        })}`,
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
          <DropdownMenuItem className='cursor-pointer' onClick={extendTime}>
            Extend Time
          </DropdownMenuItem>
          <DropdownMenuItem>
            <AlertDialogTrigger>
              <span className='text-destructive w-full text-left'>Delete</span>
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure to delete is?
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
