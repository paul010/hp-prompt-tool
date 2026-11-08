/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: { '/api/prompts': ['./data/prompts.csv'], '/api/prompts/*': ['./data/prompts.csv'] },
  // ✅ 修复 Vercel monorepo 配置冲突
  outputFileTracingRoot: process.env.VERCEL ? undefined : __dirname,
  
  // ✅ 扩展静态生成超时（处理大型 CSV 数据）
  staticPageGenerationTimeout: 120,
  
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
