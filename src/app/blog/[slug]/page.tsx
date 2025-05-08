"use client";

import { useParams } from "next/navigation";

const mockPosts = [
  {
    slug: "gpt-helper",
    title: "如何用 GPT 協助內容創作",
    content: `我們探索如何整合 GPT 到 CMS 中，讓使用者在寫文章時能自動生成段落、標題與 SEO 描述，大幅提升內容製作效率。`,
    author: "熊揆元",
    date: "2025-05-09",
  },
  {
    slug: "nextjs-setup",
    title: "Next.js 架站快速起手式",
    content: `從 create-next-app 開始建立你的部落格系統，整合 Tailwind、部署到 Vercel，打造完整開發流程。`,
    author: "Kuei",
    date: "2025-05-08",
  },
];

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = mockPosts.find((p) => p.slug === slug);

  if (!post) return <div className="p-6">找不到這篇文章。</div>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        {post.author} · {post.date}
      </div>
      <p className="text-lg leading-relaxed">{post.content}</p>
    </main>
  );
}
