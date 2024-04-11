import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const containsUppercase = (str: string) => /[A-Z]/.test(str)

export const containsNumber = (str: string) => /\d/.test(str)

export const containsSpecialCharacter = (str: string) =>
  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str)
