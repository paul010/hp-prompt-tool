'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { Search, Zap, Target, ArrowRight } from 'lucide-react';

export function Hero() {
  const { language } = useLanguage();
  const isZh = language.startsWith('zh');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-academy-gray-light via-white to-academy-gray-light">
      {/* 点阵背景 */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle, #ddd 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />

      {/* 主内容 */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* 左侧：文字内容 */}
          <div className="text-center lg:text-left">
            {/* 徽章 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white border-4 border-academy-black rounded-none text-academy-black text-sm font-extrabold shadow-lg">
              <Zap className="w-4 h-4 text-academy-yellow" />
              <span>{isZh ? '用AI發電 FY26' : 'AI Generator FY26'}</span>
            </div>

            {/* 主标题 - 倾斜体，大胆 */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-academy-black mb-8 leading-tight"
              style={{ 
                fontStyle: 'italic',
                transform: 'skewY(-3deg)',
                textShadow: '2px 2px 0 rgba(0,0,0,0.1)',
              }}>
              {isZh ? (
                <>
                  用AI<span className="text-academy-pink">拉想法</span>
                  <br/>
                  變成<span className="text-academy-yellow">現實</span>
                </>
              ) : (
                <>
                  Use AI to turn <span className="text-academy-pink">ideas</span>
                  <br />
                  into <span className="text-academy-yellow">reality</span>
                </>
              )}
            </h1>

            {/* 副标题 */}
            <p className="text-lg sm:text-xl text-academy-black mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-semibold">
              {isZh
                ? '精選 1342+ 企業場景 AI 提示詞，全員參與，安全·實用·有目的'
                : 'Select 1342+ enterprise AI prompts, safe, practical, purposeful'}
            </p>

            {/* CTA 按钮组 */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16">
              <Link
                href="/learning-path"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-academy-pink text-white font-black border-4 border-academy-black rounded-none shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
                style={{ fontStyle: 'italic' }}
              >
                <Target className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>{isZh ? '查看學習路線' : 'View Learning Path'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                href="/?difficulty=入門"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-academy-black font-black border-4 border-academy-black rounded-none hover:bg-academy-yellow transition-all duration-200"
                style={{ fontStyle: 'italic' }}
              >
                <Zap className="w-5 h-5 group-hover:scale-125 transition-transform" />
                <span>{isZh ? '立即開始' : 'Get Started'}</span>
              </Link>
            </div>

            {/* 统计数据 - 粗体卡片风格 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto lg:mx-0">
              {[
                { label: isZh ? '提示詞' : 'Prompts', value: '1342+', icon: '📋' },
                { label: isZh ? '場景' : 'Scenarios', value: '12+', icon: '🎯' },
                { label: isZh ? '學員' : 'Students', value: '215+', icon: '👥' },
                { label: 'ROI', value: '¥1176萬', icon: '💰' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white border-4 border-academy-black rounded-none p-4 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-200">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl sm:text-3xl font-black text-academy-black mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-academy-black font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧：搜索框 + 热门场景 */}
          <div className="relative">
            {/* 卡片容器 - 粗黑边框 */}
            <div className="relative bg-white border-4 border-academy-black rounded-none p-8 shadow-lg"
              style={{
                boxShadow: '0 12px 24px rgba(0,0,0,0.1), -8px 8px 0 rgba(26,26,26,0.5)',
              }}>
              
              {/* 搜索栏 */}
              <form onSubmit={handleSearch} className="mb-8">
                <label className="block text-sm font-black text-academy-black mb-3"
                  style={{ fontStyle: 'italic' }}>
                  {isZh ? '🔍 快速搜索提示詞' : '🔍 Quick Search'}
                </label>
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-academy-black" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isZh ? '搜索提示詞、場景、標籤...' : 'Search prompts, scenarios, tags...'}
                    className="w-full pl-12 pr-4 py-3 border-4 border-academy-black rounded-none font-semibold text-academy-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-academy-pink"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-academy-pink text-white font-black border-4 border-academy-black rounded-none shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                  style={{ fontStyle: 'italic' }}
                >
                  {isZh ? '搜索' : 'Search'}
                </button>
              </form>

              {/* 快速入口 - 热门场景 */}
              <div className="space-y-4">
                <div className="text-sm font-black text-academy-black mb-4"
                  style={{ fontStyle: 'italic' }}>
                  🎯 {isZh ? '熱門場景' : 'Popular Scenarios'}
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: isZh ? '文案創作' : 'Copywriting', href: '/?scenario=文案创作' },
                    { label: isZh ? '數據分析' : 'Analysis', href: '/?scenario=数据分析' },
                    { label: isZh ? '代碼輔助' : 'Coding', href: '/?scenario=代码辅助' },
                    { label: isZh ? '會議助手' : 'Meetings', href: '/?scenario=会议助手' },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="inline-flex items-center px-4 py-2 bg-academy-yellow text-academy-black font-black border-4 border-academy-black rounded-none hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                      style={{ fontStyle: 'italic' }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* 装饰角标 */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-4 border-academy-black rounded-none opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
}
