import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Perpus',
    template: '%s | Perpus',
  },
  description: 'Website Perpus',
  generator: 'Next.js',
  applicationName: 'Next.js',
  keywords: ['Perpus', 'Perpus NextJS', 'Perpus LKS'],
  authors: [{ name: 'Ade Bagas Wicaksono' }],
  creator: 'Ade Bagas Wicaksono',
  publisher: 'Ade Bagas Wicaksono',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'bg-muted/40')}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
