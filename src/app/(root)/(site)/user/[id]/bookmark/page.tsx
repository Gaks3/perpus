import BookmarkButtonWrapper from '@/components/BookmarkButtonWrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getBookmarkByUserId } from '@/lib/actions/bookmark'
import { getUser } from '@/lib/auth'
import { format } from 'date-fns'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'My Bookmarks',
}

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const user = await getUser()
  if (!user || !user.user || (user.user?.id !== id && !user.user?.isAdmin))
    return notFound()

  const bookmarks = await getBookmarkByUserId(id)

  return (
    <div className='container py-8'>
      <h1 className='text-3xl font-bold'>My Bookmark</h1>
      <div className='grid w-full grid-cols-1 md:grid-cols-3 min-[1150px]:grid-cols-4 gap-14 mt-5'>
        {bookmarks.length > 0 ? (
          <>
            {bookmarks.map(
              (
                { book: { id, title, image_url, author, year_published } },
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
                    <div className='flex items-center justify-between text-neutral-400'>
                      <span>{author}</span>
                      <span>{format(year_published, 'yyyy')}</span>
                    </div>
                    <BookmarkButtonWrapper
                      userId={user.user?.id as string}
                      bookId={id}
                      className='w-full'
                    />
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
