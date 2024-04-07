import Header from '@/components/Header'
import { getUser } from '@/lib/auth'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  return (
    <>
      <Header user={user?.user || null} />
      {children}
    </>
  )
}
