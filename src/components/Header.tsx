'use client'

import { User } from 'lucia'
import { AlignLeft, LibraryBig } from 'lucide-react'
import Link from 'next/link'
import Headroom from 'react-headroom'
import { Button } from './ui/button'
import UserHeader from './UserHeader'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import Image from 'next/image'

export default function Heade({ user }: { user: User | null }) {
  return (
    <Headroom style={{ zIndex: 20 }}>
      <div className='container flex justify-between py-4 shadow-sm h-fit shadow-neutral-100 bg-background'>
        <div className='flex items-center gap-5'>
          <Sheet>
            <SheetTrigger className='block md:hidden'>
              <AlignLeft />
            </SheetTrigger>
            <SheetContent side={'left'}>
              <SheetHeader className='text-left'>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className='flex flex-col items-start w-full mt-8 space-y-3'>
                <Button asChild variant={'link'}>
                  <Link href={'/'} className='w-full justify-stretch'>
                    Home
                  </Link>
                </Button>
                <Button asChild variant={'link'}>
                  <Link href={'/catalog'} className='w-full justify-stretch'>
                    Catalog
                  </Link>
                </Button>
                {user && user?.isAdmin && (
                  <Button asChild variant={'link'}>
                    <Link
                      href={'/dashboard'}
                      className='w-full justify-stretch'
                    >
                      Dashboard
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <Link href={'/'} className='flex items-center gap-2'>
            <Image src={'/logo.png'} alt='Logo' width={50} height={50} />
            <span className='text-xl font-bold'>Perpus</span>
          </Link>
        </div>
        <div className='flex items-center gap-8'>
          <nav className='items-center hidden gap-3 md:flex'>
            <Button asChild variant={'link'}>
              <Link href={'/'}>Home</Link>
            </Button>
            <Button asChild variant={'link'}>
              <Link href={'/catalog'}>Catalog</Link>
            </Button>
            {user && user?.isAdmin && (
              <Button asChild variant={'link'}>
                <Link href={'/dashboard'}>Dashboard</Link>
              </Button>
            )}
          </nav>
          {user && <UserHeader user={user} />}
        </div>
      </div>
    </Headroom>
  )
}
