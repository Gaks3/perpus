'use client'

import { updateUser } from '@/lib/actions/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from '../ui/use-toast'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const schema = z.object({
  username: z.string(),
})

export default function ChangeUsername({
  id,
  username,
}: {
  id: string
  username: string
}) {
  const [pending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username,
    },
  })

  async function applyChanges(values: z.infer<typeof schema>) {
    try {
      await updateUser(id, values)

      toast({
        title: 'Success',
        description: `Update username to ${values.username}`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Username</CardTitle>
        <CardDescription>Change your username</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              startTransition(form.handleSubmit(applyChanges))
            }}
            className='space-y-5'
          >
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='John' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <CardFooter className='justify-end p-0'>
              <Button type='submit' disabled={pending}>
                {pending ? 'Loading...' : 'Update Role'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
