'use server'

import { z } from 'zod'
import { SignInSchema, SignUpSchema } from '../schema/auth'
import prisma from '../db'
import { Argon2id } from 'oslo/password'
import { getUser, lucia } from '../auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface ActionResult {
  error?: {
    email?: string
    username?: string
    password?: string
  }
}

export async function signUp(
  values: z.infer<typeof SignUpSchema>
): Promise<ActionResult> {
  const exist = await prisma.user.findUnique({ where: { email: values.email } })
  if (exist) return { error: { email: 'Email already in user' } }

  const hashedPassword = await new Argon2id().hash(values.password)

  const user = await prisma.user.create({
    data: {
      email: values.email,
      username: values.username,
      hashed_password: hashedPassword,
      isAdmin: false,
    },
  })

  await lucia.deleteExpiredSessions()

  const session = await lucia.createSession(user.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect(cookies().get('callback_url')?.value || '/')
}

export async function signIn(
  values: z.infer<typeof SignInSchema>
): Promise<ActionResult> {
  const user = await prisma.user.findUnique({ where: { email: values.email } })
  if (!user)
    return {
      error: {
        email: 'Email or Password is wrong',
        password: 'Email or Password is wrong',
      },
    }

  const compare = new Argon2id().verify(user.hashed_password, values.password)
  if (!compare)
    return {
      error: {
        email: 'Email or Password is wrong',
        password: 'Email or Password is wrong',
      },
    }

  await lucia.deleteExpiredSessions()

  const session = await lucia.createSession(user.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  redirect(cookies().get('callback_url')?.value || '/')
}

export async function signOut() {
  const user = await getUser()
  if (!user?.session) return redirect('/sign-in')

  await lucia.invalidateSession(user.session.id)
  await lucia.deleteExpiredSessions()

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect('/sign-in')
}
