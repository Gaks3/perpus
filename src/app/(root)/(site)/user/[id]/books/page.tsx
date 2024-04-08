import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getBooksByUserId } from '@/lib/actions/book'
import { getUser } from '@/lib/auth'
import { format } from 'date-fns'
import Image from 'next/image'
import { id as indo } from 'date-fns/locale'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Books',
}

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const user = await getUser()
  if (!user || (user.user?.id !== id && !user.user?.isAdmin)) return notFound()

  const books = await getBooksByUserId(id)

  return (
    <div className='container py-8'>
      <h1 className='text-3xl font-bold'>My Books</h1>
      <div className='grid w-full grid-cols-1 md:grid-cols-3 min-[1150px]:grid-cols-4 gap-14 mt-5'>
        {books.length > 0 ? (
          <>
            {books.map(
              (
                {
                  book: { title, image_url, author, year_published },
                  returnDate,
                },
                index
              ) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className='line-clamp-1'>{title}</CardTitle>
                    <div className='flex items-center justify-center w-full !mt-5 h-40 relative'>
                      <Image
                        src={image_url}
                        alt={title}
                        fill
                        className='object-contain'
                      />
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-3 !text-sm'>
                    <div className='flex items-center justify-between text-neutral-300'>
                      <span>{author}</span>
                      <span>{format(year_published, 'yyyy')}</span>
                    </div>
                    <p>
                      Return Date :{' '}
                      {format(returnDate, 'dd MMMM yyyy', { locale: indo })}
                    </p>
                  </CardContent>
                </Card>
              )
            )}
          </>
        ) : (
          <p>No Result.</p>
        )}
      </div>
    </div>
  )
}
