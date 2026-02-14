import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Меккеден дұға - Дұғаңызды жіберіңіз',
  description: 'Қасиетті Кағба жанында оқылатын дұғаңызды жіберіңіз. Әр дұға шын жүректен айтылады, Ин шаа Аллаһ.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="kk">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
