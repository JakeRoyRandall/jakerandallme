import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const sofiaProSoft = localFont({ src: '/fonts/sofia-pro-soft.woff2', display: 'swap' })

export const metadata: Metadata = {
  title: 'JakeRandall.me',
  description: 'The Portfolio Site of Jake Randall',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={sofiaProSoft.className}>{children}</body>
    </html>
  )
}
