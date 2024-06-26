'use server'

import { addDays } from 'date-fns'
import { getUser } from '../auth'
import prisma from '../db'
import { revalidatePath } from 'next/cache'

export async function addBorrow(userId: string, bookId: number) {
  const user = await getUser()
  if (!user || !user.user?.isAdmin) throw new Error('Unauthorized')

  const now = new Date()

  const borrow = await prisma.borrow.create({
    data: {
      bookId,
      userId,
      returnDate: addDays(now, 7),
    },
  })

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      countBorrow: {
        increment: 1,
      },
    },
  })

  await prisma.book.update({
    where: {
      id: bookId,
    },
    data: {
      status: 'borrowed',
    },
  })

  revalidatePath(`/dashboard/users/[id]/books`, 'page')

  return borrow
}

export async function deleteBorrow(id: number) {
  const res = await prisma.borrow.delete({
    where: {
      id,
    },
  })

  await prisma.book.update({
    where: {
      id: res.bookId,
    },
    data: {
      status: 'available',
    },
  })

  revalidatePath(`/dashboard/users/[id]/books`, 'page')

  return res
}

export async function extendTimeBorrow(id: number) {
  const res = await prisma.borrow.update({
    where: {
      id,
    },
    data: {
      returnDate: addDays(new Date(), 7),
    },
  })

  revalidatePath(`/dashboard/users/[id]/books`, 'page')

  return res
}
