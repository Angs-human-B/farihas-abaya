import type { Metadata } from 'next'
import { Playfair_Display, Inter, Amiri } from 'next/font/google'
import '../styles/globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const amiri = Amiri({ 
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Farihas Abaya | Premium Luxury Abayas | Dhaka, Bangladesh',
  description: 'Discover exquisite handcrafted abayas where Arabian heritage meets modern elegance. Premium luxury collection featuring traditional and contemporary designs.',
  keywords: 'abaya, luxury abaya, premium abaya, Arabic fashion, Islamic clothing, Dhaka, Bangladesh, traditional wear, modest fashion',
  authors: [{ name: 'Farihas Abaya' }],
  creator: 'Farihas Abaya',
  publisher: 'Farihas Abaya',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://farihasabaya.com',
    title: 'Farihas Abaya | Premium Luxury Abayas',
    description: 'Where Arabian heritage meets modern elegance. Discover our exquisite collection of handcrafted premium abayas.',
    siteName: 'Farihas Abaya',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Farihas Abaya | Premium Luxury Abayas',
    description: 'Where Arabian heritage meets modern elegance. Discover our exquisite collection of handcrafted premium abayas.',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${amiri.variable}`}>
      <body className="antialiased">
        <div className="smooth-transition will-change-transform">
          {children}
        </div>
      </body>
    </html>
  )
}
