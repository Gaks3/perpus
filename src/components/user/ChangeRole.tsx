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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Button } from '../ui/button'

const schema = z.object({
  isAdmin: z.boolean(),
})

export default function ChangeRole({
  id,
  isAdmin,
}: {
  id: string
  isAdmin: boolean
}) {
  const [pending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      isAdmin,
    },
  })

  async function applyChanges(values: z.infer<typeof schema>) {
    try {
      await updateUser(id, values)

      toast({
        title: 'Success',
        description: `Update role to "${values.isAdmin ? 'Admin' : 'User'}"`,
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
        <CardTitle>Role</CardTitle>
        <CardDescription>Change role</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              startTransition(form.handleSubmit(applyChanges))
            }}
            className='space-y-3'
          >
            <FormField
              control={form.control}
              name='isAdmin'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === 'true' ? true : false)
                      }
                      defaultValue={field.value ? 'true' : 'false'}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a verified email to display' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={'true'}>Admin</SelectItem>
                        <SelectItem value={'false'}>User</SelectItem>
                      </SelectContent>
                    </Select>
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
