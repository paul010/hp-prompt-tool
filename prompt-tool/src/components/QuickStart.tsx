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
  number: string;
}

export function QuickStart() {
  const { language } = useLanguage();
  const isZh = language.startsWith('zh');

  const QUICK_START_ITEMS: QuickStartItem[] = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      titleEn: 'New to AI?',
      titleZh: '初次接觸 AI？',
      descEn: 'Start with beginner prompts and master the basics',
      descZh: '從入門難度提示詞開始，掌握基礎技能',
      action: 'filter-beginner',
      number: '01',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      titleEn: 'Already experienced?',
      titleZh: '有基礎？',
      descEn: 'Dive into advanced & expert level challenges',
      descZh: '深入學習進階和專家難度，挑戰更高目標',
      action: 'filter-advanced',
      number: '02',
    },
    {
      icon: <Compass className="w-8 h-8" />,
      titleEn: 'Unsure where to start?',
      titleZh: '不知道選什麼？',
      descEn: 'View the learning path for personalized guidance',
      descZh: '查看學習路線，獲得個性化的學習建議',
      action: 'learning-path',
      number: '03',
    },
  ];

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-white via-academy-gray-light to-white">
      {/* 点阵背景 */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle, #ddd 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* 标题 */}
        <div className="text-center mb-20 lg:mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-academy-black mb-6"
            style={{ fontStyle: 'italic', transform: 'skewY(-2deg)' }}>
            {isZh ? '快速開始' : 'Quick Start'}
          </h2>
          <p className="text-lg text-academy-black max-w-2xl mx-auto font-semibold">
            {isZh
              ? '選擇最適合你的學習路徑，立即開啟 AI 之旅'
              : 'Choose the best learning path for you and start your AI journey now'}
          </p>
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
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
      ? '/?difficulty=入門'
      : '/?difficulty=進階&difficulty=專家';

  // 卡片颜色循环
  const bgColors = [
    'bg-academy-yellow', // 01 - 黄色
    'bg-academy-pink',   // 02 - 粉红
    'bg-academy-blue',   // 03 - 蓝色
  ];
  const bgColor = bgColors[index % 3];
  const textColor = index === 2 ? 'text-white' : 'text-academy-black';

  return (
    <CardWrapper
      href={href}
      className="group block"
    >
      <div
        className={`relative ${bgColor} ${textColor} border-4 border-academy-black rounded-none p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-3`}
        style={{
          boxShadow: '0 8px 16px rgba(26,26,26,0.3), -4px 4px 0 rgba(26,26,26,0.2)',
        }}
      >
        {/* 编号标签 */}
        <div className="inline-flex items-center justify-center w-14 h-14 bg-academy-black text-white font-black text-2xl rounded-none mb-6">
          {item.number}
        </div>

        {/* 图标 */}
        <div className="mb-6 text-4xl">
          {item.icon}
        </div>

        {/* 文字内容 */}
        <h3 className={`text-2xl font-black mb-4 ${textColor}`}
          style={{ fontStyle: 'italic' }}>
          {title}
        </h3>
        <p className={`leading-relaxed mb-8 font-semibold ${textColor} opacity-90`}>
          {desc}
        </p>

        {/* CTA 按钮 */}
        <div className={`inline-flex items-center gap-2 font-black group-hover:gap-3 transition-all ${
          index === 2 ? 'bg-white text-academy-blue' : 'bg-academy-black text-white'
        } px-4 py-2 border-3 border-${index === 2 ? 'white' : 'academy-black'} rounded-none`}
          style={{ fontStyle: 'italic' }}>
          <span>{isZh ? '開始' : 'Start'}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </CardWrapper>
  );
}
