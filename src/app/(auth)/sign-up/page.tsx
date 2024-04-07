import SignUp from '@/components/SignUp'
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
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your account</CardDescription>
      </CardHeader>
      <SignUp />
    </Card>
  )
}
