import { getBooks } from '@/lib/actions/book'
import { column } from './column'
import { DataTable } from './data-table'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Books Dashboard',
}

export default async function Page() {
  const books = await getBooks()

  return (
    <div className='space-y-10'>
      <h2 className='text-2xl font-bold'>Books</h2>
      <DataTable columns={column} data={books} />
    </div>
  )
}
