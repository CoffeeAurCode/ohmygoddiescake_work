import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, Fraunces, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
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
  title: "Ony's Boutique Custom Cakes | Calgary Custom Cakes",
  description:
    "Luxury custom cakes in Calgary, made with elevated design and exceptional taste. Wedding cakes, birthday cakes, and celebration cakes crafted to make every moment unforgettable.",
  keywords: ["custom cakes Calgary", "wedding cakes Calgary", "birthday cakes Calgary", "luxury cakes Calgary"],
  openGraph: {
    title: "Ony's Boutique Custom Cakes",
    description: "Luxury custom cakes in Calgary. Elevated design, exceptional taste.",
    siteName: "Ony's Boutique Custom Cakes",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${fraunces.variable} ${jakarta.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18161715420"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18161715420');
          `}
        </Script>
      </head>
      <body>
        <ScrollProgressBar />
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
