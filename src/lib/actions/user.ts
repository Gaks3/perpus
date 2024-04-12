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
