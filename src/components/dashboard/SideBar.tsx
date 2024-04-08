'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SideBar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
      <div className='mx-auto grid w-full max-w-6xl gap-2'>
        <h1 className='text-3xl font-semibold'>Dashboard</h1>
      </div>
      <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr]'>
        <nav className='grid gap-4 text-sm text-muted-foreground'>
          <Link
            href='/dashboard'
            className={
              pathname.split('/').length === 2
                ? 'font-semibold text-primary'
                : ''
            }
          >
            General
          </Link>
          <Link
            href='/dashboard/books'
            className={
              pathname.split('/')[2] === 'books'
                ? 'font-semibold text-primary'
                : ''
            }
          >
            Books
          </Link>
          <Link
            href='/dashboard/users'
            className={
              pathname.split('/')[2] === 'users'
                ? 'font-semibold text-primary'
                : ''
            }
          >
            Users
          </Link>
        </nav>
        {children}
      </div>
    </div>
  )
}
