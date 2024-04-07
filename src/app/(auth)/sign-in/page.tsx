import SignIn from '@/components/SignIn'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getUser()
  if (user) return redirect('/')

  return (
    <Card className='lg:w-[35vw]'>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Access to app service</CardDescription>
      </CardHeader>
      <SignIn />
    </Card>
  )
}
