import { z } from 'zod'

export const AddBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  publisher: z.string(),
  ISBN: z.string(),
  language: z.string(),
  page: z.coerce.number(),
  year_published: z.date(),
  target_reader: z.string(),
  description: z.string(),
  image_url: z
    .custom<FileList>((v) => v instanceof FileList)
    .refine((file) => file?.length == 1, 'File is required.')
    .or(z.string()),
})
