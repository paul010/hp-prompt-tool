'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { GraduationCap, Rocket, Compass, ArrowRight } from 'lucide-react';

interface QuickStartItem {
  icon: React.ReactNode;
  titleEn: string;
  titleZh: string;
  descEn: string;
  descZh: string;
  action: 'filter-beginner' | 'filter-advanced' | 'learning-path';
  iconBg: string;
  iconColor: string;
}

export function QuickStart() {
  const { language } = useLanguage();
  const isZh = language.startsWith('zh');

  const QUICK_START_ITEMS: QuickStartItem[] = [
    {
      icon: <GraduationCap className="w-7 h-7" />,
      titleEn: 'New to AI?',
      titleZh: '初次接触 AI？',
      descEn: 'Start with beginner prompts and master the basics',
      descZh: '从入门难度提示词开始，掌握基础技能',
      action: 'filter-beginner',
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-600',
    },
    {
      icon: <Rocket className="w-7 h-7" />,
      titleEn: 'Already experienced?',
      titleZh: '有基础？',
      descEn: 'Dive into advanced & expert level challenges',
      descZh: '深入学习进阶和专家难度，挑战更高目标',
      action: 'filter-advanced',
      iconBg: 'bg-secondary-100',
      iconColor: 'text-secondary-600',
    },
    {
      icon: <Compass className="w-7 h-7" />,
      titleEn: 'Unsure where to start?',
      titleZh: '不知道选什么？',
      descEn: 'View the learning path for personalized guidance',
      descZh: '查看学习路线，获得个性化的学习建议',
      action: 'learning-path',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 标题 */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {isZh ? '🚀 快速开始' : '🚀 Quick Start'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {isZh
              ? '选择最适合你的学习路径，立即开启 AI 之旅'
              : 'Choose the best learning path for you and start your AI journey now'}
          </p>
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {QUICK_START_ITEMS.map((item, idx) => (
            <QuickStartCard key={item.action} item={item} language={language} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickStartCard({
  item,
  language,
  index,
}: {
  item: QuickStartItem;
  language: string;
  index: number;
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

  // 3D 效果：奇数向右倾斜，偶数向左倾斜
  const rotation = index % 2 === 0 ? 'hover:rotate-y-[3deg]' : 'hover:rotate-y-[-3deg]';

  return (
    <CardWrapper
      href={href}
      className="group block"
      style={{ perspective: '1000px' }}
    >
      <div
        className={`feature-card h-full ${rotation}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* 图标容器 */}
        <div className={`inline-flex p-4 rounded-xl ${item.iconBg} ${item.iconColor} mb-5 shadow-soft`}>
          {item.icon}
        </div>

        {/* 文字内容 */}
        <h3 className="text-xl font-bold text-slate-900 mb-3">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          {desc}
        </p>

        {/* 箭头指示 */}
        <div className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 group-hover:text-secondary-600 transition-colors">
          <span>{isZh ? '立即开始' : 'Get Started'}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </CardWrapper>
  );
}
