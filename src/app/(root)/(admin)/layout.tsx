import SideBar from '@/components/dashboard/SideBar'
import { getUser } from '@/lib/auth'
import { notFound, redirect } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  if (!user) return redirect('/sign-in')
  if (!user.user?.isAdmin) return notFound()

  return <SideBar>{children}</SideBar>
}
