import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma"; // 確保有這個檔案

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.slug) },
  });

  if (!post) return notFound();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        熊揆元 · {new Date(post.createdAt).toLocaleDateString("zh-TW")}
      </div>
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}
