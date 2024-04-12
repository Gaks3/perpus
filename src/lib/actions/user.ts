'use server'

import { Argon2id } from 'oslo/password'
import { getUser, lucia } from '../auth'
import prisma from '../db'
import { revalidatePath } from 'next/cache'

export type UserUpdate = {
  username?: string
  email?: string
  password?: string
  isAdmin?: boolean
}

export async function getUsers() {
  const user = await getUser()
  if (!user || !user.user?.isAdmin) throw new Error('Unauthorized')

  return await prisma.user.findMany()
}

export async function deleteUser(id: string) {
  const user = await getUser()
  if (!user || !user.user?.isAdmin) throw new Error('Unauthorized')

  await lucia.deleteExpiredSessions()

  const res = await prisma.user.delete({
    where: {
      id,
    },
  })

  revalidatePath('/dashboard/user')

  return res
}

export async function getUserById(id: string) {
  const user = await getUser()
  if (!user || !user.user?.isAdmin) throw new Error('Unauthorized')

  return await prisma.user.findUnique({
    where: {
      id,
    },
  })
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  })
}

export async function updateUser(id: string, data: UserUpdate) {
  const user = await getUser()
  if (!user || (user.user?.id !== id && !user.user?.isAdmin)) throw new Error()

  if (data.password) {
    const hash = await new Argon2id().hash(data.password)

    data.password = hash
  }

  const res = await prisma.user.update({
    where: {
      id,
    },
    data,
  })

  revalidatePath('/dashboard/user')

  return res
}

export async function getMostBorrowUser() {
  const user = await getUser()
  if (!user || !user.user?.isAdmin) throw new Error('Unauthorized')

  const data = await prisma.user.findMany({
    orderBy: {
      bookmarks: {
        _count: 'desc',
      },
    },
    take: 10,
  })

  return data.map(({ email, countBorrow }) => ({
    email: email,
    count: countBorrow,
  }))
}
