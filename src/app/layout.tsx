import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { BOOK } from '@/lib/content'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0b',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://maikagency-ebooks.vercel.app'),
  title: `${BOOK.title} | Ebook offert par Maikagency`,
  description: BOOK.subtitle,
  keywords: [
    'prompt engineering',
    'ebook prompt engineering',
    'IA',
    'ChatGPT',
    'intelligence artificielle',
    'maikagency',
    'context engineering',
  ],
  authors: [{ name: 'Maikagency' }],
  creator: 'Maikagency',
  publisher: 'Maikagency',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Maikagency',
    title: `${BOOK.title} | Ebook offert`,
    description: BOOK.subtitle,
    images: [
      {
        url: BOOK.coverSrc,
        width: 1000,
        height: 1333,
        alt: BOOK.coverAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BOOK.title} | Ebook offert`,
    description: BOOK.subtitle,
    images: [BOOK.coverSrc],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-dark-950 text-white overflow-x-hidden">
        {/* Gradient orbs background (cohérent avec le portfolio) */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="gradient-orb gradient-orb-1" />
          <div className="gradient-orb gradient-orb-2" />
          <div className="gradient-orb gradient-orb-3" />
        </div>
        {/* Grid background */}
        <div className="fixed inset-0 z-0 grid-background pointer-events-none" aria-hidden="true" />

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
