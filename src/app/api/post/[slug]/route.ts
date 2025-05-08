import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  const postId = Number(context.params.slug);

  if (isNaN(postId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(post);
}
