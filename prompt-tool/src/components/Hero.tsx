'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { Search, Sparkles, Zap, Target } from 'lucide-react';

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
    <section className="relative min-h-[600px] overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 渐变球 */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        
        {/* 网格 */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:32px_32px]" />
      </div>

      {/* 内容 */}
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
        <div className="text-center">
          {/* 徽章 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 text-white text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>{isZh ? 'HP FY26 数字学院 AI 能力认证' : 'HP FY26 Digital Academy AI Certification'}</span>
          </div>

          {/* 主标题 */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {isZh ? (
              <>
                探索 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">1342+</span> 个
                <br />
                AI 提示词模板
              </>
            ) : (
              <>
                Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">1342+</span>
                <br />
                AI Prompt Templates
              </>
            )}
          </h1>

          {/* 副标题 */}
          <p className="text-xl sm:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            {isZh
              ? '从入门到精通，释放 AI 生产力，获得专业认证徽章'
              : 'From beginner to expert, unleash AI productivity and earn professional badges'}
          </p>

          {/* 搜索栏 */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center">
                  <div className="pl-6">
                    <Search className="w-6 h-6 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isZh ? '搜索提示词、场景、标签...' : 'Search prompts, scenarios, tags...'}
                    className="flex-1 px-4 py-5 text-lg outline-none bg-transparent"
                  />
                  <button
                    type="submit"
                    className="px-8 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                  >
                    {isZh ? '搜索' : 'Search'}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* CTA 按钮组 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/learning-path"
              className="group px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <Target className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                {isZh ? '查看学习路线' : 'View Learning Path'}
              </span>
            </Link>
            <Link
              href="/?difficulty=入门"
              className="group px-8 py-4 bg-white/10 backdrop-blur-lg text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5 group-hover:scale-125 transition-transform" />
                {isZh ? '开始学习' : 'Start Learning'}
              </span>
            </Link>
          </div>

          {/* 统计数据 */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: isZh ? '提示词' : 'Prompts', value: '1342+' },
              { label: isZh ? '场景' : 'Scenarios', value: '12+' },
              { label: isZh ? '学员' : 'Students', value: '215+' },
              { label: isZh ? 'ROI' : 'ROI', value: '1176万' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部波浪 */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#F9FAFB"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(-20px, -20px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-white\\/\\[0\\.05\\] {
          background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
}
