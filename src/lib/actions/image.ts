'use server'

import { writeFile, unlink } from 'fs/promises'
import { join } from 'path'
import slug from 'slug'

export const upload = async (data: FormData) => {
  const sizeLimit = 10_000_000

  const file: File | null = data.get('image') as unknown as File

  if (!file.type.includes('image')) throw new Error('Please upload an image')
  if (file.size > sizeLimit) throw new Error('Max size 10MB')
  if (!file) throw new Error('Something field are missing')

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const folderPathName = 'Code/belajar/lks/perpus/public'

  const randomString = crypto.randomUUID()

  const fileName = `${randomString.slice(0, 3)}-${file.name}`

  const path = join(
    '/',
    folderPathName,
    slug(fileName, { replacement: '-', lower: true })
  )
  await writeFile(path, buffer)

  return { url: '/' + fileName }
}

export const deleteImage = async (
  path: string
): Promise<void | { error?: string }> => {
  await unlink('public' + path)
}
