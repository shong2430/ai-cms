"use client";

import { useState } from "react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("/api/gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `請幫我寫一段文章內容，主題是：「${title || "AI 在內容創作的應用"}」`,
      }),
    });
    const data = await res.json();
    setContent(data.result || "（AI 回應失敗）");
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 儲存文章：", { title, content });
    alert("✅ 模擬文章已儲存（實際串接資料庫之後會補）");
    setTitle("");
    setContent("");
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
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full border rounded px-3 py-2"
            placeholder="輸入文章內文"
          />
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
