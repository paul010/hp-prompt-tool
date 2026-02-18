'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { GraduationCap, Rocket, Compass } from 'lucide-react';

interface QuickStartItem {
  icon: React.ReactNode;
  titleEn: string;
  titleZh: string;
  descEn: string;
  descZh: string;
  action: 'filter-beginner' | 'filter-advanced' | 'learning-path';
  gradient: string;
  bgGradient: string;
}

export function QuickStart() {
  const { language } = useLanguage();

  const QUICK_START_ITEMS: QuickStartItem[] = [
    {
      icon: <GraduationCap className="w-12 h-12" />,
      titleEn: 'New to AI?',
      titleZh: '初次接触 AI？',
      descEn: 'Start with beginner prompts and master the basics',
      descZh: '从入门难度提示词开始，掌握基础技能',
      action: 'filter-beginner',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
      icon: <Rocket className="w-12 h-12" />,
      titleEn: 'Already experienced?',
      titleZh: '有基础？',
      descEn: 'Dive into advanced & expert level challenges',
      descZh: '深入学习进阶和专家难度，挑战更高目标',
      action: 'filter-advanced',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
    },
    {
      icon: <Compass className="w-12 h-12" />,
      titleEn: 'Unsure where to start?',
      titleZh: '不知道选什么？',
      descEn: 'View the learning path for personalized guidance',
      descZh: '查看学习路线，获得个性化的学习建议',
      action: 'learning-path',
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language.startsWith('zh') ? '🚀 快速开始' : '🚀 Quick Start'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language.startsWith('zh')
              ? '选择最适合你的学习路径，立即开启 AI 之旅'
              : 'Choose the best learning path for you and start your AI journey now'}
          </p>
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {QUICK_START_ITEMS.map((item) => (
            <QuickStartCard key={item.action} item={item} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickStartCard({
  item,
  language,
}: {
  item: QuickStartItem;
  language: string;
}) {
  const isZh = language.startsWith('zh');
  const title = isZh ? item.titleZh : item.titleEn;
  const desc = isZh ? item.descZh : item.descEn;

  const CardWrapper = item.action === 'learning-path' ? Link : 'a';
  const href =
    item.action === 'learning-path'
      ? '/learning-path'
      : item.action === 'filter-beginner'
      ? '/?difficulty=入门'
      : '/?difficulty=进阶&difficulty=专家';

  return (
    <CardWrapper
      href={href}
      className="group relative block"
    >
      {/* 背景光晕 */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* 卡片主体 */}
      <div className="relative h-full bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-gray-100 group-hover:-translate-y-2">
        {/* 图标容器 */}
        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          {item.icon}
        </div>

        {/* 文字内容 */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {desc}
        </p>

        {/* 箭头指示 */}
        <div className={`inline-flex items-center gap-2 mt-6 text-sm font-semibold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
          <span>{isZh ? '立即开始' : 'Get Started'}</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-2 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </CardWrapper>
  );
}
