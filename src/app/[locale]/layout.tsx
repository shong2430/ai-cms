import { Geist, Geist_Mono } from 'next/font/google'
import '@/app/globals.css'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { Toaster } from 'react-hot-toast'
import { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { useLocale } from 'next-intl';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}

type Props = {
  children: ReactNode
}

export default function LocaleLayout({ children }: Props) {
  const messages = useMessages()
  const locale = useLocale();

  if (!['en', 'zh'].includes(locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <head>
        {/* Swiper CDN CSS */}
        <link rel="stylesheet" href="https://unpkg.com/swiper@10/swiper-bundle.min.css" />
        {/* Swiper CDN JS */}
        <script src="https://unpkg.com/swiper@10/swiper-bundle.min.js" defer />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
