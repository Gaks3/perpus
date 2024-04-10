import { getBooksByUserId } from '@/lib/actions/book'
import { DataTable } from './data-table'
import { column } from './column'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Borrows Dashboard',
}

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const books = await getBooksByUserId(id)

  return (
    <div className='space-y-5'>
      <h2 className='text-2xl font-bold'>Borrows</h2>
      <DataTable columns={column} data={books} userId={id} />
    </div>
  )
}
