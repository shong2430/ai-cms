import BlogHomePageWrapper from '@/components/BlogHomePageWrapper'

export const metadata = {
  title: '部落格文章總覽 - AI CMS Demo',
  description: '瀏覽由 AI 自動生成的最新文章，涵蓋技術、產品、創作與開發心得。',
  keywords: 'AI 部落格, 自動生成內容, OpenAI Blog, 技術文章, CMS Blog, Next.js 部落格',
  openGraph: {
    title: 'AI CMS 部落格首頁',
    description: '瀏覽由 OpenAI 驅動的內容平台，探索最新技術與創作文章。',
    url: 'https://ai-cms-mocha.vercel.app/',
    siteName: 'AI CMS Demo',
    type: 'website',
  },
}

export default function BlogHomePage() {
  return <BlogHomePageWrapper />
}
