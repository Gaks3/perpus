'use client'

import { signUp } from '@/lib/actions/auth'
import { SignUpSchema } from '@/lib/schema/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from './ui/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import Link from 'next/link'

export default function SignUp() {
  const [pending, startTransition] = useTransition()
  const [type, setType] = useState<{
    password: 'password' | 'text'
    confirm: 'password' | 'text'
  }>({ password: 'password', confirm: 'password' })

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
      confirm: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    const res = await signUp(values)

    if (res.error && typeof res.error === 'object') {
      for (const key in res.error) {
        form.setError(key as 'email' | 'username' | 'password', {
          message: res.error[key as 'email' | 'username' | 'password'],
        })
      }
    } else {
      toast({
        title: 'Success',
        description: `Authenticated as ${values.email}`,
      })
    }
  }

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              startTransition(form.handleSubmit(onSubmit))
            }}
            className='space-y-3'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='example@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='John' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input
                        placeholder='....'
                        type={type.password}
                        {...field}
                      />
                    </FormControl>
                    <div className='absolute right-3 top-[10px] cursor-pointer'>
                      {type.password === 'password' ? (
                        <Eye
                          onClick={() =>
                            setType((prev) => ({ ...prev, password: 'text' }))
                          }
                          strokeWidth={1.5}
                        />
                      ) : (
                        <EyeOff
                          onClick={() =>
                            setType((prev) => ({
                              ...prev,
                              password: 'password',
                            }))
                          }
                          strokeWidth={1.5}
                        />
                      )}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input
                        placeholder='....'
                        type={type.confirm}
                        {...field}
                      />
                    </FormControl>
                    <div className='absolute right-3 top-[10px] cursor-pointer'>
                      {type.confirm === 'password' ? (
                        <Eye
                          onClick={() =>
                            setType((prev) => ({ ...prev, confirm: 'text' }))
                          }
                          strokeWidth={1.5}
                        />
                      ) : (
                        <EyeOff
                          onClick={() =>
                            setType((prev) => ({
                              ...prev,
                              confirm: 'password',
                            }))
                          }
                          strokeWidth={1.5}
                        />
                      )}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button onClick={() => startTransition(form.handleSubmit(onSubmit))}>
          {pending ? 'Loading...' : 'Submit'}
        </Button>
        <Link href={'/sign-in'} className='underline text-xs'>
          Already have account?
        </Link>
      </CardFooter>
    </>
  )
}
