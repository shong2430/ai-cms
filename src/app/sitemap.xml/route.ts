import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const posts = await prisma.post.findMany({
    select: { id: true },
    orderBy: { createdAt: 'desc' },
  })

  const baseUrl = 'https://ai-cms-mocha.vercel.app'

  const urls = posts.map((post) => `<url><loc>${baseUrl}/blog/${post.id}</loc></url>`).join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
