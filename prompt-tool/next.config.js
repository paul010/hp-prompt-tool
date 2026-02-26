/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ✅ 修复 Vercel monorepo 配置冲突
  outputFileTracingRoot: process.env.VERCEL ? undefined : __dirname,
  
  // ✅ 扩展静态生成超时（处理大型 CSV 数据）
  staticPageGenerationTimeout: 120,
  
  // ✅ 禁用 ISR 缓存以避免 3.9MB CSV 缓存问题
  // 注意：onDemandISRRevalidate 已在最新版本中移除
  // onDemandISRRevalidate: {
  //   maxDuration: 60,
  // },
  
  // ✅ 优化图片处理
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
};

module.exports = nextConfig;
