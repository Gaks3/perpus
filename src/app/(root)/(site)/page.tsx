import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getBooksCount } from '@/lib/actions/book'
import { getUsersCount } from '@/lib/actions/user'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const booksCount = await getBooksCount()
  const usersCount = await getUsersCount()

  return (
    <main className='container p-14 flex flex-col justify-center space-y-10'>
      <section className='md:hidden flex flex-col items-center space-y-3'>
        <h1 className='font-bold text-4xl drop-shadow-[0_50px_50px_rgb(0 0 0 / 0.15)] shadow-black'>
          &quot;Perpus&quot;
        </h1>
        <Image
          src={'/modern_library.jpg'}
          alt='Modern Library'
          width={1240}
          height={800}
          className='rounded-xl'
        />
        <p className='drop-shadow-md text-center'>
          A modern library is a place where people can go to access information
          and learn new things. It is more than just a collection of books; it
          is a community center where people of all ages can come together to
          read, study, and explore.
        </p>
      </section>
      <section className='relative hidden md:block'>
        <Image
          src={'/modern_library.jpg'}
          alt='Modern Library'
          width={1240}
          height={800}
          className='rounded-xl'
        />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-foreground p-4 text-center space-y-5'>
          <h1 className='font-bold text-7xl drop-shadow-[0_50px_50px_rgb(0 0 0 / 0.15)] shadow-black'>
            &quot;Perpus&quot;
          </h1>
          <p className='drop-shadow-md'>
            A modern library is a place where people can go to access
            information and learn new things. It is more than just a collection
            of books; it is a community center where people of all ages can come
            together to read, study, and explore.
          </p>
        </div>
      </section>
      <section className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
        <Card className='shadow-inner'>
          <CardHeader>
            <CardTitle>Catalog</CardTitle>
            <CardDescription>
              The library catalog is a database of all the materials that are
              available in the library. It can be searched by title, author,
              subject, and keyword.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={'/catalog'}>
              <Button variant={'link'}>Try here</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className='shadow-inner'>
          <CardHeader>
            <CardTitle>Books</CardTitle>
            <CardDescription>
              A library collection is a group of books and other materials that
              are organized and made accessible to users.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant={'ghost'}>{booksCount} Books</Button>
          </CardFooter>
        </Card>
        <Card className='shadow-inner'>
          <CardHeader>
            <CardTitle>Members</CardTitle>
            <CardDescription>
              Libraries provide a welcoming and inclusive space for people to
              learn, explore, and connect with others. Click{' '}
              <Link href={'/sign-up'} className='underline'>
                this link
              </Link>{' '}
              to be a member.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant={'ghost'}>{usersCount} Members</Button>
          </CardFooter>
        </Card>
      </section>
      <section className='flex flex-col items-center space-y-3'>
        <h2 className='text-3xl font-bold text-center'>About Us</h2>
        <div className='space-y-3 text-center w-[600px] max-w-[80vw]'>
          <p>
            The modern library is a welcoming and inclusive space for people of
            all ages to learn, explore, and connect. We offer a wide range of
            resources and services, including books, e-books, audiobooks,
            magazines, newspapers, databases, and more. We also offer a variety
            of programs and events for all ages, including storytime for
            children, book clubs for adults, computer classes, and more.
          </p>
          <p>
            Our mission is to provide our community with access to information
            and resources that will enrich their lives. We believe that everyone
            should have the opportunity to learn and grow, regardless of their
            age, background, or income level.
          </p>
        </div>
      </section>
      <section className='flex flex-col items-center space-y-3'>
        <h2 className='text-3xl font-bold text-center'>Location</h2>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1912745.9971456304!2d69.74508896266398!3d-49.68162341688419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb314bff236638e23%3A0xb49187bb6d4e9df0!2sLibrary!5e0!3m2!1sen!2sid!4v1711793749352!5m2!1sen!2sid'
          className='w-[600px] max-w-full h-72'
          loading='lazy'
        ></iframe>
      </section>
    </main>
  )
}
