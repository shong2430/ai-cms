import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const isProd = process.env.NODE_ENV === 'production'

// 📦 Next.js 設定
const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['next-intl'],

  webpack: (config, { isServer }) => {
    if (!isServer && isProd) {
      config.externals = {
        ...config.externals,
        swiper: 'Swiper',
      }
    }
    return config
  },
}

// ✅ 使用 next-intl plugin 包裝你的 config
const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
