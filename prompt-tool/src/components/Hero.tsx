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
    <section className="relative overflow-hidden bg-white">
      {/* 主内容 - Swiss 布局：单列 + 无边框 + 聚焦排版 */}
      <div className="max-w-2xl mx-auto px-8 sm:px-12 py-24 sm:py-32 lg:py-48">
        {/* 前导标签 - 清晰但次要 */}
        <div className="mb-12">
          <p className="text-sm font-medium tracking-widest text-gray-600 uppercase">
            {isZh ? 'HP 數字學院 FY26' : 'HP Digital Academy FY26'}
          </p>
        </div>

        {/* 主标题 - 超大、粗黑、简洁 */}
        <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black text-black leading-[0.95] mb-12"
          style={{ 
            fontWeight: 900,
            letterSpacing: '-0.02em',
          }}>
          {isZh ? (
            <>用AI<br/>拉想法</>
          ) : (
            <>Turn ideas<br/>into action</>
          )}
        </h1>

        {/* 副标题 - 较大但轻量 */}
        <p className="text-xl sm:text-2xl text-gray-600 font-light leading-relaxed mb-16 max-w-xl">
          {isZh ? (
            'HP 提示词工程學院。一站式探索 AI 驅動的工作方式，專為企業和個人設計。'
          ) : (
            'Discover AI-powered prompting strategies. Curated for enterprise and personal growth.'
          )}
        </p>

        {/* 搜索框 - 簡約、無邊框 */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder={isZh ? '搜索提示詞...' : 'Search prompts...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 text-base font-medium placeholder-gray-400 py-4 px-0 border-b-2 border-black focus:outline-none focus:bg-white transition"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-8 py-4 font-black text-base hover:bg-gray-900 transition"
            >
              {isZh ? '搜尋' : 'Search'}
            </button>
          </div>
        </form>

        {/* CTA 按鈕 - 清晰層級 */}
        <div className="flex gap-4 flex-wrap">
          <Link
            href="#prompts"
            className="bg-black text-white px-8 py-4 font-black text-base hover:bg-gray-900 transition inline-block"
          >
            {isZh ? '瀏覽全部提示詞' : 'Explore Prompts'}
          </Link>
          <Link
            href="/learning-path"
            className="bg-gray-100 text-black px-8 py-4 font-black text-base border-b border-black hover:bg-gray-200 transition inline-block"
          >
            {isZh ? '學習路徑' : 'Learning Path'}
          </Link>
        </div>

        {/* 底部說明 - 輕量文案 */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <p className="text-sm text-gray-500 font-light">
            {isZh ? (
              '精選 1000+ 高價值提示詞。由 HP AI 產品經理、數據科學家與工程師共同設計。'
            ) : (
              '1000+ curated prompts for modern workflows. Built for enterprises and creators.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
