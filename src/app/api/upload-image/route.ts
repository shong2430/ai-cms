// app/api/upload-image/route.ts
import { NextRequest, NextResponse } from 'next/server'
import supabase from '@/lib/supabase'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  const { imageUrl } = await req.json()

  if (!imageUrl) {
    return NextResponse.json({ error: 'Missing imageUrl' }, { status: 400 })
  }

  const imageRes = await fetch(imageUrl)
  const buffer = await imageRes.arrayBuffer()
  const file = new Uint8Array(buffer)

  const filename = `ai-${randomUUID()}.png`

  const { data, error } = await supabase.storage.from('images').upload(filename, file, {
    contentType: 'image/png',
    upsert: false,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/images/${filename}`
  return NextResponse.json({ url: publicUrl })
}
