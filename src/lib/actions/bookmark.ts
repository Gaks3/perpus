'use server'

import { revalidatePath } from 'next/cache'
import { getUser } from '../auth'
import prisma from '../db'

export async function createBookmark(userId: string, bookId: number) {
  const user = await getUser()
  if (!user || (user.user?.id !== userId && !user.user?.isAdmin))
    throw new Error('Unauthorized')

  await prisma.bookmark.create({
    data: {
      userId,
      bookId,
    },
  })

  revalidatePath(`/user/[id]/bookmark`, 'page')
}

export async function deleteBookmark(userId: string, bookId: number) {
  const user = await getUser()
  if (!user || !user.user?.isAdmin) throw new Error('Unauthorized')

  await prisma.bookmark.delete({
    where: {
      bookId_userId: {
        bookId,
        userId,
      },
    },
  })

  revalidatePath(`/user/[id]/bookmark`, 'page')
}