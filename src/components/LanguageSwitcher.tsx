'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const targetLocale = currentLocale === 'en' ? 'zh' : 'en'

  const handleSwitch = () => {
    const segments = pathname.split('/')
    segments[1] = targetLocale
    router.push(segments.join('/'))
  }

  return (
    <button
      onClick={handleSwitch}
      className="cursor-pointer fixed bottom-4 right-4 z-50 px-4 py-2 text-sm rounded border border-gray-300 shadow-md bg-black hover:bg-gray-100 transition"
    >
      {targetLocale === 'en' ? 'English' : '中文'}
    </button>
  )
}
