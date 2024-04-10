import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import prisma from './db'
import { Lucia } from 'lucia'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (attributes) => ({
    id: attributes.id,
    username: attributes.username,
    email: attributes.email,
    isAdmin: attributes.isAdmin,
  }),
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  id: string
  username: string
  email: string
  isAdmin: boolean
}

export const getUser = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
  if (!sessionId) return null

  const { user, session } = await lucia.validateSession(sessionId)

  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }

    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }
  } catch (error) {
    redirect('/sign-up')
  }

  return { user, session }
})
