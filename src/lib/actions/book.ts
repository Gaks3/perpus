'use server'

import { z } from 'zod'
import { getUser } from '../auth'
import prisma from '../db'
import { AddBookSchema } from '../schema/book'
import { revalidatePath } from 'next/cache'
import { deleteImage } from './image'
import { redirect } from 'next/navigation'
import { Book, Prisma } from '@prisma/client'

export type BookStatsType = Array<{ id: string; label: string; value: number }>

export async function bookStats(): Promise<BookStatsType> {
  const user = await getUser()
  if (!user || !user.user?.isAdmin) throw new Error('Unauthorized')

  const stats = await prisma.book.groupBy({
    _count: true,
    by: 'status',
  })

  return stats.map(({ _count, status }) => ({
    id: status,
    label: status,
    value: _count,
  }))
}

export async function getBooks(take?: number) {
  if (take && take !== 0) return await prisma.book.findMany({ take })

  return await prisma.book.findMany()
}

export async function addBook(values: z.infer<typeof AddBookSchema>) {
  const user = await getUser()
  if (!user || !user.user?.isAdmin) throw new Error('Unauthorized')

  const {
    title,
    author,
    description,
    publisher,
    year_published,
    ISBN,
    language,
    page,
    target_reader,
    image_url,
  } = values

  await prisma.book.create({
    data: {
      title,
      author,
      description,
      publisher,
      year_published,
      ISBN,
      language,
      page,
      target_reader,
      image_url: image_url as string,
    },
  })

  revalidatePath('/dashboard/books')
  revalidatePath('/books/[id]', 'page')

  redirect('/dashboard/books')
}

export async function deleteBook(id: number) {
  const user = await getUser()
  if (!user || !user.user?.isAdmin) throw new Error('Unauthorized')

  const data = await prisma.book.delete({
    where: {
      id,
    },
  })

  revalidatePath('/dashboard/books')
  revalidatePath('/books/[id]', 'page')

  try {
    await deleteImage(data.image_url)
  } catch (error) {
    throw new Error('Something wrong when delete image')
  }
}

export async function getBookById(id: number) {
  return await prisma.book.findUnique({
    where: {
      id,
    },
  })
}

export async function editBook(id: number, data: Book) {
  const user = await getUser()
  if (!user || !user.user?.isAdmin) throw new Error('Unauthorized')

  await prisma.book.update({
    where: {
      id,
    },
    data,
  })

  revalidatePath('/dashboard/books')
  revalidatePath('/books/[id]', 'page')

  redirect('/dashboard/books')
}

export async function getBooksByUserId(userId: string) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')

  return await prisma.borrow.findMany({
    where: {
      userId,
    },
    include: {
      book: true,
    },
  })
}

export type SearchBy = 'title' | 'author' | 'publisher' | 'ISBN'

export async function searchBooks(search: string, by: SearchBy) {
  const where: Prisma.BookWhereInput = {}

  where[by] = { contains: search }

  return await prisma.book.findMany({ where })
}

export async function getBooksCount() {
  return await prisma.book.count()
}
