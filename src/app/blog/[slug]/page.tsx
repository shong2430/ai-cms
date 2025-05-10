import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.slug) },
  });

  if (!post) return {};

  return {
    title: `${post.title} | AI CMS`,
    description: post.content.slice(0, 100),
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 100),
      images: post.imageUrl ? [{ url: post.imageUrl }] : undefined,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.slug) },
  });

  if (!post) return notFound();

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
              className="rounded shadow aspect-square"
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
