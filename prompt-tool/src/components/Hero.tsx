'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { Search, Sparkles, Zap, Target, ArrowRight } from 'lucide-react';

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
    <section className="relative overflow-hidden bg-slate-50">
      {/* 背景装饰 - 柔和的渐变球 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary-200/30 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary-200/30 rounded-full blur-3xl opacity-50" />
      </div>

      {/* 主内容 */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左侧：文字内容 */}
          <div className="text-center lg:text-left">
            {/* 徽章 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary-50 border border-primary-200 rounded-full text-primary-700 text-sm font-semibold shadow-soft">
              <Sparkles className="w-4 h-4" />
              <span>{isZh ? 'HP FY26 数字学院 AI 能力认证' : 'HP FY26 Digital Academy AI Certification'}</span>
            </div>

            {/* 主标题 - 前3个词普通，后面渐变 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              {isZh ? (
                <>
                  探索 <span className="gradient-text">1342+ 个</span>
                  <br />
                  <span className="gradient-text">AI 提示词模板</span>
                </>
              ) : (
                <>
                  Explore <span className="gradient-text">1342+</span>
                  <br />
                  <span className="gradient-text">AI Prompt Templates</span>
                </>
              )}
            </h1>

            {/* 副标题 */}
            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {isZh
                ? '从入门到精通，释放 AI 生产力，获得专业认证徽章'
                : 'From beginner to expert, unleash AI productivity and earn professional badges'}
            </p>

            {/* CTA 按钮组 */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Link
                href="/learning-path"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-full shadow-button hover:-translate-y-0.5 hover:shadow-button transition-all duration-200"
              >
                <Target className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>{isZh ? '查看学习路线' : 'View Learning Path'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/?difficulty=入门"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
              >
                <Zap className="w-5 h-5 group-hover:scale-125 transition-transform" />
                <span>{isZh ? '开始学习' : 'Start Learning'}</span>
              </Link>
            </div>

            {/* 统计数据 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto lg:mx-0">
              {[
                { label: isZh ? '提示词' : 'Prompts', value: '1342+', color: 'primary' },
                { label: isZh ? '场景' : 'Scenarios', value: '12+', color: 'secondary' },
                { label: isZh ? '学员' : 'Students', value: '215+', color: 'emerald' },
                { label: isZh ? 'ROI' : 'ROI', value: '¥1176万', color: 'primary' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className={`text-3xl sm:text-4xl font-extrabold mb-1 ${
                    stat.color === 'primary' ? 'text-primary-600' :
                    stat.color === 'secondary' ? 'text-secondary-600' :
                    'text-emerald-600'
                  }`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧：搜索框 + 3D 效果 */}
          <div className="relative" style={{ perspective: '2000px' }}>
            {/* 3D 卡片容器 */}
            <div
              className="relative bg-white rounded-xl border border-slate-100 shadow-card-hover p-8 transition-all duration-500 hover:shadow-glow-lg"
              style={{
                transform: 'rotateX(5deg) rotateY(-8deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* 搜索栏 */}
              <form onSubmit={handleSearch} className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  {isZh ? '🔍 快速搜索提示词' : '🔍 Quick Search'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isZh ? '搜索提示词、场景、标签...' : 'Search prompts, scenarios, tags...'}
                    className="input-field pl-12 text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-lg shadow-button hover:-translate-y-0.5 hover:shadow-button transition-all duration-200"
                >
                  {isZh ? '搜索' : 'Search'}
                </button>
              </form>

              {/* 快速入口 */}
              <div className="space-y-3">
                <div className="text-sm font-bold text-slate-700 mb-3">
                  {isZh ? '🎯 热门场景' : '🎯 Popular Scenarios'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: isZh ? '文案创作' : 'Copywriting', href: '/?scenario=文案创作' },
                    { label: isZh ? '数据分析' : 'Analysis', href: '/?scenario=数据分析' },
                    { label: isZh ? '代码辅助' : 'Coding', href: '/?scenario=代码辅助' },
                    { label: isZh ? '会议助手' : 'Meetings', href: '/?scenario=会议助手' },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="inline-flex items-center px-3 py-1.5 bg-primary-50 border border-primary-200 text-primary-700 text-sm font-semibold rounded-full hover:bg-primary-100 hover:border-primary-300 transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
