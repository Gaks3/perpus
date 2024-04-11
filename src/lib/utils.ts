import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const containsUppercase = (str: string) => /[A-Z]/.test(str)

export const containsNumber = (str: string) => /\d/.test(str)

export const containsSpecialCharacter = (str: string) =>
  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str)

export const getKeys = (data: Array<{ [key: string]: any }>) => {
  const combinedObject = data.reduce((result, obj) => {
    for (const key in obj) {
      result[key] = obj[key]
    }
    return result
  }, {})

  const uniqueKeys = Array.from(new Set(Object.keys(combinedObject)))

  return uniqueKeys
}
