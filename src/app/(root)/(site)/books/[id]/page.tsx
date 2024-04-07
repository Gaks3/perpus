import { Badge } from '@/components/ui/badge'
import { getBookById } from '@/lib/actions/book'
import { format } from 'date-fns'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { id as indo } from 'date-fns/locale'
import MoreLessText from '@/components/MoreLessText'
import { getUser } from '@/lib/auth'
import BookmarkButtonWrapper from '@/components/BookmarkButtonWrapper'
import { Metadata } from 'next'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await getBookById(Number(params.id))

  return {
    title: book?.title,
  }
}

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const user = await getUser()

  const book = await getBookById(Number(id))
  if (!book) return notFound()

  return (
    <div className='container py-8 flex items-center justify-center min-h-[calc(100vh-72px)]'>
      <div className='w-[400px] md:w-[800px] min-w-fit h-fit flex flex-col md:flex-row gap-5 justify-center items-center md:items-start'>
        <div className='max-w-[270px]'>
          <Image
            src={book.image_url}
            alt={book.title}
            width={270}
            height={100}
          />
        </div>
        <div className='space-y-5 md:w-[400px]'>
          <Badge className='capitalize'>{book.status}</Badge>
          <h1 className='text-3xl font-bold line-clamp-1'>{book.title}</h1>
          <div className='grid grid-cols-2 text-sm gap-y-3 gap-x-3 md:gap-x-10'>
            <DetailBook label='Author' value={book.author} />
            <DetailBook label='Publisher' value={book.publisher} />
            <DetailBook
              label='Publish'
              value={format(book.year_published, 'dd MMMM yyyy', {
                locale: indo,
              })}
            />
            <DetailBook label='ISBN' value={book.ISBN} />
            <DetailBook label='Language' value={book.language} />
            <DetailBook label='Page' value={`${book.page}`} />
            <DetailBook label='Target Reader' value={book.target_reader} />
          </div>
          <MoreLessText text={book.description} />
          {user?.user && (
            <BookmarkButtonWrapper
              userId={user.user?.id as string}
              bookId={Number(id)}
              className='w-full'
            />
          )}
        </div>
      </div>
    </div>
  )
}

function DetailBook({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <p className='font-bold'>{value}</p>
    </div>
  )
}
