import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Elegant Houseware',
    template: '%s | Elegant Houseware',
  },
  description: 'Tempat belanja perabotan rumah tangga, keset, serbet, dan lainnya dengan harga terjangkau',
  keywords: ['perabotan rumah tangga', 'perabotan', 'keset', 'serbet', 'houseware', 'kitchenware', 'homeware'],
  authors: [{ name: 'Elegant Houseware' }],
  creator: 'Elegant Houseware',
  publisher: 'Elegant Houseware',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    title: 'Elegant Houseware',
    description: 'Tempat belanja perabotan rumah tangga, keset, serbet, dan lainnya dengan harga terjangkau',
    siteName: 'Elegant Houseware',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elegant Houseware',
    description: 'Tempat belanja perabotan rumah tangga, keset, serbet, dan lainnya dengan harga terjangkau',
    creator: '@eleganthouseware',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
