import { z } from 'zod'
import {
  containsNumber,
  containsSpecialCharacter,
  containsUppercase,
} from '@/lib/utils'
import { getUserByEmail } from '../actions/user'

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .email('Not a valid email')
      .refine(
        async (value) => {
          const duplicate = await getUserByEmail(value)

          if (duplicate) return false

          return true
        },
        { message: 'Email already use' }
      ),
    username: z
      .string()
      .min(2, { message: 'Username must be at least 2 characters' }),
    password: z.string().superRefine((value, ctx) => {
      if (value.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Must be 8 or more characters long',
          fatal: true,
        })

        return z.NEVER
      }

      if (!containsUppercase(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'At least contains one uppercase letter',
          fatal: true,
        })

        return z.NEVER
      }

      if (!containsNumber(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'At least contains one number',
          fatal: true,
        })

        return z.NEVER
      }

      if (!containsSpecialCharacter(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'At least contains one special characters (@, #, $, etc.)',
          fatal: true,
        })

        return z.NEVER
      }
    }),
    confirm: z.string(),
  })
  .refine((values) => values.password === values.confirm, {
    message: 'Password dont match',
    path: ['confirm'],
  })
