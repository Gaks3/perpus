'use server'

import { getUser } from '../auth'
import prisma from '../db'

export type UserUpdate = {
  username?: string
  email?: string
  isAdmin?: boolean
}

export async function getUsers() {
  const user = await getUser()
  if (!user || !user.user?.isAdmin) throw new Error('Unauthorized')

  return await prisma.user.findMany()
}
