"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);

    fetch(`/api/post?id=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data || null);
      })
      .catch((err) => {
        console.error("Failed to fetch post:", err);
        setPost(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <p className="text-gray-500 animate-pulse">載入文章中...</p>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <p className="text-red-500">找不到文章</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-[30px]">
        <div className="w-1/2">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="text-sm text-gray-500 mb-4">
            {post.author || <span>unKnown</span>} ·{" "}
            {new Date(post.createdAt).toLocaleDateString("zh-TW")}
          </div>
        </div>
        {post.imageUrl && (
          <div className="w-1/2">
            <img
              src={post.imageUrl}
              alt="AI 封面圖"
              className="rounded shadow aspect-square
"
            />
          </div>
        )}
      </div>
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}
