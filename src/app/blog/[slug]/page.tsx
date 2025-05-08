'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function BlogPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/post/${slug}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(() => setPost(null));
  }, [slug]);

  if (!post) return <div className="p-6">載入中...</div>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        熊揆元 · {new Date(post.createdAt).toLocaleDateString('zh-TW')}
      </div>
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}
