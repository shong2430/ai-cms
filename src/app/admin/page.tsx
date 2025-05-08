"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("/api/gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `請幫我寫一段文章內容，主題是：「${
          title || "AI 在內容創作的應用"
        }」`,
      }),
    });

    const data = await res.json();
    setContent(`<p>${data.result}</p>`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    console.log("res：", data);
    if (res.ok) {
      toast.success("success");
      setTitle("");
      setContent("");
    } else {
      toast.error("fail");
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">後台：新增文章</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">標題</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="輸入文章標題"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">內文</label>
          <RichTextEditor value={content} onChange={setContent} />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleGenerate}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            ✨ AI 協助產生段落
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            💾 儲存文章
          </button>
        </div>
      </form>
    </main>
  );
}
