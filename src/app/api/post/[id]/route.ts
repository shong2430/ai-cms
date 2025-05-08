import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}
