import FormAddBook from '@/components/book/FormAddBook'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Add book',
}

export default async function Page() {
  return (
    <div className='flex justify-center'>
      <div className='w-[600px] space-y-5'>
        <h2 className='text-2xl font-bold'>Add Book</h2>
        <FormAddBook />
      </div>
    </div>
  )
}
