import Link from 'next/link'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export const metadata = {
  title: 'AI CMS Demo - 自動生成文章的內容平台',
  description:
    '這是一個由 Next.js + Supabase + OpenAI 打造的 AI CMS，支援自動生成內容、部落格前台與後台管理功能。',
  keywords: 'AI CMS, Next.js, Supabase, OpenAI, 自動產文, Headless CMS, 前台後台, 部落格',
  openGraph: {
    title: 'AI CMS Demo',
    description: '自動生成內容的部落格平台，支援前台瀏覽與後台管理。',
    url: 'https://ai-cms-mocha.vercel.app/',
    siteName: 'AI CMS Demo',
    type: 'website',
  },
}

export default function Home() {
  const t = useTranslations('home')

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white">
      <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="text-gray-600 mb-6 max-w-xl">{t('description')}</p>

      <div className="flex gap-4">
        <Link
          className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          href="/blog"
        >
          {t('goToBlog')}
        </Link>

        <Link
          className="px-6 py-3 rounded border border-gray-400 text-gray-800 hover:bg-gray-100 transition"
          href="/admin"
        >
          {t('goToAdmin')}
        </Link>
      </div>
      <LanguageSwitcher />
    </main>
  )
}
