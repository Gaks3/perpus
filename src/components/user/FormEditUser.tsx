import { User } from '@prisma/client'
import ChangeUsername from './ChangeUsername'
import { getUser } from '@/lib/auth'
import { notFound } from 'next/navigation'
import ChangeRole from './ChangeRole'
import ChangePassword from './ChangePassword'

export default async function FormEditUser({ data }: { data: User }) {
  const user = await getUser()
  if (!user || (user.user?.id !== data.id && !user.user?.isAdmin))
    return notFound()
  return (
    <>
      <ChangeUsername id={data.id} username={data.username} />
      {user.user.isAdmin && <ChangeRole id={data.id} isAdmin={data.isAdmin} />}
      <ChangePassword userId={data.id} />
    </>
  )
}
