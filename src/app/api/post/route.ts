import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { title, content, imageUrl, author } = await req.json();

  if (!title || !content || !author) {
    return NextResponse.json({ error: "標題、內文與作者皆為必填" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      title,
      content,
      imageUrl,
      author,
    },
  });

  return NextResponse.json(post);
}


export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}