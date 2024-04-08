import BooksChart from '@/components/dashboard/BooksChart'
import MostBorrowChart from '@/components/dashboard/MostBorrowChart'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { bookStats } from '@/lib/actions/book'
import { getMostBorrowUser } from '@/lib/actions/user'
import { format } from 'date-fns'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'General Dashboard',
}

export default async function Page() {
  const stats = await bookStats()
  const mostBorrow = await getMostBorrowUser()

  return (
    <div className='container p-8'>
      <div className='space-y-10'>
        <Card>
          <CardHeader className='flex flex-row justify-between'>
            <CardTitle>Books</CardTitle>
            <CardDescription>
              {format(new Date(), 'MMM, dd yyyy')}
            </CardDescription>
          </CardHeader>
          <CardContent className='pb-0 h-[35vw] lg:h-[18vw]'>
            <BooksChart data={stats} />
          </CardContent>
          <CardFooter className='flex justify-end'>
            <Button asChild variant={'link'} className='p-0'>
              <Link href={'/dashboard/book'}>More detailed</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className='h-full'>
          <CardHeader className='flex flex-row justify-between'>
            <CardTitle>Most Borrow</CardTitle>
            <CardDescription>
              {format(new Date(), 'MMM, dd yyyy')}
            </CardDescription>
          </CardHeader>
          <CardContent className='pb-0 h-[30vw]'>
            {/* <BooksChart data={stats} /> */}
            <MostBorrowChart data={mostBorrow} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
