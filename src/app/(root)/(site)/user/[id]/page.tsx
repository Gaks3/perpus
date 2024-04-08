import FormEditUser from '@/components/user/FormEditUser'
import { getUserById } from '@/lib/actions/user'
import { getUser } from '@/lib/auth'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'User',
}

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const user = await getUser()
  if (!user || (user.user?.id !== id && !user.user?.isAdmin)) return notFound()

  const data = await getUserById(id)
  if (!data) return notFound()

  return (
    <div className='flex justify-center container py-8'>
      <div className='w-[600px] space-y-5'>
        <h2 className='text-2xl font-bold'>Edit User</h2>
        <FormEditUser data={data} />
      </div>
    </div>
  )
}
