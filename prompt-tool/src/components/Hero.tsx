'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { Search, ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  const { language } = useLanguage();
  const isZh = language.startsWith('zh');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-hp-light/10">
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-hp-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-hp-light/10 rounded-full blur-3xl"></div>
      </div>

      {/* 主内容 */}
      <div className="relative max-w-3xl mx-auto px-8 sm:px-12 py-20 sm:py-28 lg:py-36">
        {/* 前导标签 - HP Blue */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-hp-blue/5 rounded-full border border-hp-blue/20">
            <div className="w-2 h-2 bg-hp-blue rounded-full animate-pulse"></div>
            <p className="text-sm font-semibold text-hp-blue tracking-wide uppercase">
              {isZh ? 'HP 數字學院 FY26' : 'HP Digital Academy FY26'}
            </p>
          </div>
        </div>

        {/* 主标题 */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-900 leading-[1.05] mb-8 animate-slide-up">
          {isZh ? (
            <>
              用AI<br/>
              <span className="text-hp-blue">拉想法</span>
            </>
          ) : (
            <>
              Turn ideas<br/>
              <span className="text-hp-blue">into action</span>
            </>
          )}
        </h1>

        {/* 副标题 */}
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {isZh ? (
            'HP 提示词工程學院。一站式探索 AI 驱动的工作方式，专为企业和个人设计。'
          ) : (
            'Discover AI-powered prompting strategies. Curated for enterprise and personal growth.'
          )}
        </p>

        {/* 搜索框 - HP 风格 */}
        <form onSubmit={handleSearch} className="mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative group">
            {/* 发光效果 */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-hp-blue to-hp-light rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500 ${isFocused ? 'opacity-30' : ''}`}></div>

            <div className="relative flex items-stretch bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              {/* 搜索图标 */}
              <div className="flex items-center justify-center px-5 border-r border-gray-100">
                <Search className={`w-5 h-5 text-gray-400 transition-colors duration-300 ${isFocused ? 'text-hp-blue' : ''}`} />
              </div>

              {/* 输入框 */}
              <input
                type="text"
                placeholder={isZh ? '搜索 1000+ 提示词...' : 'Search 1000+ prompts...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 px-4 py-4 text-base font-medium placeholder-gray-400 focus:outline-none bg-transparent"
              />

              {/* 搜索按钮 */}
              <button
                type="submit"
                className="px-8 py-4 bg-hp-blue text-white font-semibold text-base rounded-r-xl hover:bg-hp-dark active:scale-95 transition-all duration-200 flex items-center gap-2 group/btn"
              >
                <span>{isZh ? '搜索' : 'Search'}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* 快速搜索标签 */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm text-gray-500">{isZh ? '热门:' : 'Popular:'}</span>
            {['Excel', '数据分析', '文案写作'].slice(0, isZh ? 3 : 1).map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="text-sm px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-hp-blue/10 hover:text-hp-blue transition-colors duration-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </form>

        {/* CTA 按钮组 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {/* 主要按钮 */}
          <Link
            href="#prompts"
            className="group relative px-8 py-4 bg-hp-blue text-white font-semibold text-base rounded-xl hover:bg-hp-dark active:scale-95 transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isZh ? '浏览全部提示词' : 'Explore Prompts'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>

          {/* 次要按钮 */}
          <Link
            href="/learning-path"
            className="group px-8 py-4 bg-white text-gray-800 font-semibold text-base rounded-xl border-2 border-gray-200 hover:border-hp-blue hover:text-hp-blue active:scale-95 transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            <span>{isZh ? '学习路径' : 'Learning Path'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* 底部说明 */}
        <div className="pt-8 border-t border-gray-200 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-hp-blue">1000+</span>
              </div>
              <span>{isZh ? '精选提示词' : 'curated prompts'}</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <p className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              {isZh ? '由 HP AI 专家团队设计' : 'Designed by HP AI experts'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
