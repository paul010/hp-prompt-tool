'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

interface QuickStartItem {
  icon: string;
  titleEn: string;
  titleZh: string;
  descEn: string;
  descZh: string;
  action: 'filter-beginner' | 'filter-advanced' | 'learning-path';
  color: string;
}

const QUICK_START_ITEMS: QuickStartItem[] = [
  {
    icon: '🎯',
    titleEn: 'New to AI?',
    titleZh: '初次接触 AI？',
    descEn: 'Start with beginner prompts',
    descZh: '从入门难度提示词开始',
    action: 'filter-beginner',
    color: 'from-blue-400 to-blue-600',
  },
  {
    icon: '🚀',
    titleEn: 'Already experienced?',
    titleZh: '有基础？',
    descEn: 'Dive into advanced & expert level',
    descZh: '深入学习进阶和专家难度',
    action: 'filter-advanced',
    color: 'from-purple-400 to-purple-600',
  },
  {
    icon: '🎓',
    titleEn: 'Unsure where to start?',
    titleZh: '不知道选什么？',
    descEn: 'View the learning path',
    descZh: '查看学习路线',
    action: 'learning-path',
    color: 'from-amber-400 to-amber-600',
  },
];

export function QuickStart() {
  const { language } = useLanguage();

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language.startsWith('zh') ? '🚀 快速开始' : '🚀 Quick Start'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

  if (item.action === 'learning-path') {
    return (
      <Link
        href="/learning-path"
        className={`group p-6 rounded-lg bg-gradient-to-br ${item.color} text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer`}
      >
        <div className="text-4xl mb-3">{item.icon}</div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{desc}</p>
      </Link>
    );
  }

  return (
    <a
      href={item.action === 'filter-beginner' ? '/?difficulty=入门' : '/?difficulty=进阶&difficulty=专家'}
      className={`group p-6 rounded-lg bg-gradient-to-br ${item.color} text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 block`}
    >
      <div className="text-4xl mb-3">{item.icon}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm opacity-90">{desc}</p>
    </a>
  );
}
