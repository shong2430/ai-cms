'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  ssr: false,
})

type Props = {
  author: string
}

export default function AdminPage({ author }: Props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const [isAILoading, setIsAILoading] = useState(false)

  const handleGenerate = async () => {
    setIsAILoading(true)
    const gptRes = await fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: `請幫我寫一段文章內容，主題是：「${title || 'AI 在內容創作的應用'}」`,
      }),
    })

    const gptData = await gptRes.json()
    setContent(`<p>${gptData.result}</p>`)

    setIsLoadingImage(true)
    setImageUrl('')
    try {
      const imageRes = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: title || 'AI in content creation',
        }),
      })

      const openAiUrl = (await imageRes.json()).url
      const uploadRes = await fetch('/api/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: openAiUrl }),
      })

      const finalImageUrl = (await uploadRes.json()).url
      setImageUrl(finalImageUrl)
    } catch (error) {
      console.error('圖片生成失敗', error)
    } finally {
      setIsLoadingImage(false)
      setIsAILoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, imageUrl, author }),
    })
    const data = await res.json()
    console.log('res：', data)
    if (res.ok) {
      toast.success('success')
      setTitle('')
      setContent('')
      setImageUrl('')
    } else {
      toast.error('fail')
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <p>Hi, {author}</p>
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

        {isLoadingImage && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
            <svg
              className="w-5 h-5 animate-spin text-purple-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            AI 正在產生封面圖片，請稍等...
          </div>
        )}

        {imageUrl && !isLoadingImage && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">✨ AI 產生的封面圖：</p>
            <img src={imageUrl} alt="AI 封面圖" className="rounded shadow" />
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleGenerate}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 cursor-pointer"
          >
            {isAILoading ? (
              <svg
                className="w-5 h-5 animate-spin text-white-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : (
              <span>✨ AI 協助產生段落</span>
            )}
          </button>
          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
              isAILoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
            disabled={isAILoading}
          >
            💾 儲存文章
          </button>
        </div>
      </form>
    </main>
  )
}
