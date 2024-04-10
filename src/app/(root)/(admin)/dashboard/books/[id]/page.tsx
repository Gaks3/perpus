import FormEditBook from '@/components/book/FormEditBook'
import { getBookById } from '@/lib/actions/book'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Edit book',
}

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const book = await getBookById(Number(id))
  if (!book) return notFound()

  return (
    <div className='flex justify-center'>
      <div className='w-[600px] space-y-5'>
        <h2 className='text-2xl font-bold'>
          Edit Book &quot;{book.title}&quot;
        </h2>
        <FormEditBook id={book.id} data={book} />
      </div>
    </div>
  )
}
