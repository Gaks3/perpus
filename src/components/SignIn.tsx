'use client'

import { useState, useTransition } from 'react'
import { CardContent, CardFooter } from './ui/card'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SignInSchema } from '@/lib/schema/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from '@/lib/actions/auth'
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
import { Button } from './ui/button'
import Link from 'next/link'

export default function SignIn() {
  const [pending, startTransition] = useTransition()
  const [type, setType] = useState<'text' | 'password'>('password')

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    const res = await signIn(values)

    if (res.error && typeof res.error === 'object') {
      form.setError('root', { message: res.error.email })
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
                    <Input placeholder='Your Email' {...field} />
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
                        placeholder='Your Password'
                        type={type}
                        {...field}
                      />
                    </FormControl>
                    <div className='absolute right-3 top-[10px] cursor-pointer'>
                      {type === 'password' ? (
                        <Eye
                          onClick={() => setType('text')}
                          strokeWidth={1.5}
                        />
                      ) : (
                        <EyeOff
                          onClick={() => setType('password')}
                          strokeWidth={1.5}
                        />
                      )}
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <p className='text-destructive text-sm'>
              {form.formState.errors.root?.message || ''}
            </p>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button
          onClick={() => startTransition(form.handleSubmit(onSubmit))}
          disabled={pending}
        >
          {pending ? 'Loading...' : 'Submit'}
        </Button>
        <Link href={'/sign-up'} className='text-xs underline'>
          Don&apos;t have account?
        </Link>
      </CardFooter>
    </>
  )
}
