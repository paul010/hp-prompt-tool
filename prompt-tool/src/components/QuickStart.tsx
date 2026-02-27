'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import { GraduationCap, Rocket, Compass, ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface QuickStartItem {
  icon: React.ReactNode;
  titleEn: string;
  titleZh: string;
  descEn: string;
  descZh: string;
  action: 'filter-beginner' | 'filter-advanced' | 'learning-path';
  number: string;
  gradient: string;
  iconBg: string;
}

export function QuickStart() {
  const { language } = useLanguage();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const isZh = language.startsWith('zh');

  // 确保在客户端渲染
  useEffect(() => {
    setIsClient(true);
  }, []);

  const QUICK_START_ITEMS: QuickStartItem[] = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      titleEn: 'New to AI?',
      titleZh: '初次接觸 AI？',
      descEn: 'Start with beginner prompts and master the basics',
      descZh: '從入門難度提示詞開始，掌握基礎技能',
      action: 'filter-beginner',
      number: '01',
      gradient: 'from-emerald-400 to-teal-500',
      iconBg: 'bg-emerald-500',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      titleEn: 'Already experienced?',
      titleZh: '有基礎？',
      descEn: 'Dive into advanced & expert level challenges',
      descZh: '深入學習進階和專家難度，挑戰更高目標',
      action: 'filter-advanced',
      number: '02',
      gradient: 'from-orange-400 to-pink-500',
      iconBg: 'bg-orange-500',
    },
    {
      icon: <Compass className="w-8 h-8" />,
      titleEn: 'Unsure where to start?',
      titleZh: '不知道選什麼？',
      descEn: 'View the learning path for personalized guidance',
      descZh: '查看學習路線，獲得個性化的學習建議',
      action: 'learning-path',
      number: '03',
      gradient: 'from-hp-blue to-hp-light',
      iconBg: 'bg-hp-blue',
    },
  ];

  const handleQuickStartClick = (action: string) => {
    if (action === 'learning-path') {
      router.push('/learning-path');
    } else if (action === 'filter-beginner') {
      router.push('/?difficulty=入門');
    } else if (action === 'filter-advanced') {
      router.push('/?difficulty=專家');
    }
  };

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* 装饰性背景 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-hp-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-hp-light/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-hp-blue/5 rounded-full border border-hp-blue/20 mb-6">
            <Sparkles className="w-4 h-4 text-hp-blue" />
            <span className="text-sm font-semibold text-hp-blue tracking-wide uppercase">
              {isZh ? '快速开始' : 'Quick Start'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            {isZh ? '选择最适合你的学习路径' : 'Choose Your Learning Path'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isZh
              ? '根据你的经验水平，立即开始 AI 提示词学习之旅'
              : 'Start your AI prompting journey based on your experience level'}
          </p>
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {QUICK_START_ITEMS.map((item, idx) => (
            <QuickStartCard
              key={item.action}
              item={item}
              language={language}
              index={idx}
              onClick={() => isClient && handleQuickStartClick(item.action)}
            />
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
  onClick,
}: {
  item: QuickStartItem;
  language: string;
  index: number;
  onClick: () => void;
}) {
  const isZh = language.startsWith('zh');
  const title = isZh ? item.titleZh : item.titleEn;
  const desc = isZh ? item.descZh : item.descEn;

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      {/* 发光效果 */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`}></div>

      {/* 卡片内容 */}
      <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
        {/* 顶部渐变条 */}
        <div className={`h-2 bg-gradient-to-r ${item.gradient}`}></div>

        <div className="p-8">
          {/* 编号和图标 */}
          <div className="flex items-start justify-between mb-6">
            <div className={`inline-flex items-center justify-center w-14 h-14 ${item.iconBg} text-white font-black text-xl rounded-xl shadow-lg`}>
              {item.number}
            </div>
            <div className={`p-3 rounded-xl ${item.iconBg}/10 group-hover/${item.iconBg}/20 transition-colors duration-300`}>
              <div className={`${item.iconBg} bg-clip-text text-transparent`}>
                {item.icon}
              </div>
            </div>
          </div>

          {/* 文字内容 */}
          <h3 className="text-2xl font-black text-gray-900 mb-4">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-8">
            {desc}
          </p>

          {/* CTA */}
          <div className={`inline-flex items-center gap-2 font-semibold text-hp-blue group-hover:gap-3 transition-all duration-300`}>
            <span>{isZh ? '开始' : 'Start'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>

        {/* 悬停时显示的渐变背景 */}
        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
      </div>
    </div>
  );
}
