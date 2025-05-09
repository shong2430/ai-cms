"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useDebounce from "@/hooks/useDebounce";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState("");
  const debounceQuery = useDebounce(query, 500);
  useEffect(() => {
    fetch("/api/post")
      .then((res) => res.json())
      .then(setAllPosts);
  }, []);
  useEffect(() => {
    if (debounceQuery) {
      let t = allPosts.filter(
        (sss) =>
          sss.title.indexOf(debounceQuery) !== -1 ||
        sss.author && sss.author.indexOf(debounceQuery) !== -1
      );
      setPosts(t);
    } else {
      setPosts(allPosts);
    }
  }, [debounceQuery, allPosts]);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-[30px]">
        <div className="w-1/2">
          <h1 className="text-3xl font-bold">部落格文章</h1>
        </div>
        <div className="relative w-1/2">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜尋文章..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </div>
      </div>

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
                {new Date(post.createdAt).toLocaleDateString("zh-TW")} ·{" "}
                {post.author || <span>unKnown</span>}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
