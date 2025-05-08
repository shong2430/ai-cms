"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/post")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">部落格文章</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 border rounded-xl shadow hover:bg-gray-50 transition"
          >
            <Link href={`/blog/${post.id}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p
                className="text-gray-600 mt-2 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <div className="text-sm text-gray-500 mt-2">
                {new Date(post.createdAt).toLocaleDateString("zh-TW")} · 系統
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
