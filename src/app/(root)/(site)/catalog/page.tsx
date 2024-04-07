import { Search } from '@/components/catalog/Search'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getBooks, searchBooks, SearchBy } from '@/lib/actions/book'
import { Book } from '@prisma/client'
import { format } from 'date-fns'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Catalog',
}

export type Props = {
  searchParams: Record<string, string> | null | undefined
}

export default async function Page(props: Props) {
  let data: Book[]

  if (props.searchParams?.s)
    data = await searchBooks(
      props.searchParams.s,
      (props.searchParams?.by as SearchBy) || 'title'
    )
  else data = await getBooks(20)

  return (
    <div className='container py-8 space-y-5'>
      <h1 className='text-3xl font-bold !mb-8'>Catalog</h1>
      <Search initial={props.searchParams?.s} by={props.searchParams?.by} />
      {data.length > 0 ? (
        <div className='grid w-full grid-cols-1 md:grid-cols-3 min-[1150px]:grid-cols-4 gap-14'>
          {data.map(
            (
              {
                id,
                title,
                image_url,
                status,
                author,
                year_published,
                description,
              },
              index
            ) => (
              <Link key={index} href={`/books/${id}`}>
                <Card>
                  <CardHeader>
                    <CardTitle className='line-clamp-1'>{title}</CardTitle>
                    <div className='flex items-center justify-center w-full !mt-5 max-h-40 min-h-40'>
                      <Image
                        src={image_url}
                        alt={title}
                        width={200}
                        height={50}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-3 !text-sm'>
                    <div className='flex items-center justify-between'>
                      <Badge>{status}</Badge>
                      <div className='space-x-2 text-xs'>
                        <span>{author}</span>
                        <span>-</span>
                        <span>{format(year_published, 'yyyy')}</span>
                      </div>
                    </div>
                    <p className='line-clamp-3 text-neutral-400'>
                      {description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          )}
        </div>
      ) : (
        <p className='!mt-10 text-center'>No Result.</p>
      )}
    </div>
  )
}
