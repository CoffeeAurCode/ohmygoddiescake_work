import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import ScrollProgressBar from '@/components/ScrollProgressBar'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "O' My Goodies Custom Cakes | Calgary Custom Cakes",
  description:
    "Luxury custom cakes in Calgary, made with elevated design and exceptional taste. Wedding cakes, birthday cakes, and celebration cakes crafted to make every moment unforgettable.",
  keywords: ["custom cakes Calgary", "wedding cakes Calgary", "birthday cakes Calgary", "luxury cakes Calgary"],
  openGraph: {
    title: "O' My Goodies Custom Cakes",
    description: "Luxury custom cakes in Calgary. Elevated design, exceptional taste.",
    siteName: "O' My Goodies Custom Cakes",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <ScrollProgressBar />
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
