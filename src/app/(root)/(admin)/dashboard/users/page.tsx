import { getUsers } from '@/lib/actions/user'
import { DataTable } from './data-table'
import { column } from './column'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Users Dashboard',
}

export default async function Page() {
  const users = await getUsers()

  return (
    <div className='space-y-5'>
      <h2 className='text-2xl font-bold'>Users</h2>
      <DataTable columns={column} data={users} />
    </div>
  )
}
