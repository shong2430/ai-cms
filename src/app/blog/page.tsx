"use client";

import React from "react";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
};

const posts: Post[] = [
  {
    id: 1,
    title: "如何用 GPT 協助內容創作",
    excerpt: "我們探索如何整合 GPT 到 CMS 中，快速產出內容與 SEO 標題...",
    author: "熊揆元",
    date: "2025-05-09",
  },
  {
    id: 2,
    title: "Next.js 架站快速起手式",
    excerpt: "用 Next.js 搭配 Tailwind，10 分鐘內部署第一個部落格網站。",
    author: "Kuei",
    date: "2025-05-08",
  },
];

export default function BlogPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">部落格文章</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 border rounded-xl shadow hover:bg-gray-50 transition"
          >
            <Link href={`/blog/gpt-helper`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600 mt-2">{post.excerpt}</p>
              <div className="text-sm text-gray-500 mt-2">
                {post.author} · {post.date}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
