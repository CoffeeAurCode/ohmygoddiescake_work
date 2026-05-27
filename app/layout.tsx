import type { Metadata } from 'next'
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import ScrollProgressBar from '@/components/ScrollProgressBar'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
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
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body>
        <ScrollProgressBar />
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
