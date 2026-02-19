'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { Award, ArrowRight } from 'lucide-react';

export function CertificationBanner() {
  const { language } = useLanguage();
  const isZh = language.startsWith('zh');

  return (
    <section className="border-t-4 border-b-4 border-academy-black bg-academy-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="group flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-12 bg-academy-yellow border-4 border-academy-black rounded-none"
          style={{
            boxShadow: '0 12px 24px rgba(26,26,26,0.2), -6px 6px 0 rgba(26,26,26,0.15)',
          }}>
          {/* 左侧内容 */}
          <div className="flex items-center gap-6">
            {/* 图标 */}
            <div className="flex-shrink-0 w-16 h-16 bg-academy-black border-4 border-academy-pink rounded-none flex items-center justify-center">
              <Award className="w-8 h-8 text-academy-yellow" />
            </div>

            {/* 文字 */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-academy-black mb-2"
                style={{ fontStyle: 'italic' }}>
                {isZh ? 'HP FY26 數字學院' : 'HP FY26 Digital Academy'}
              </h2>
              <p className="text-academy-black text-base font-bold">
                {isZh
                  ? '獲得專業認證徽章，釋放 AI 價值'
                  : 'Earn professional badges and unleash AI power'}
              </p>
            </div>
          </div>

          {/* 右侧按钮 */}
          <Link
            href="/learning-path"
            className="group/btn flex items-center gap-3 px-8 py-4 bg-academy-pink text-white font-black border-4 border-academy-black rounded-none shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-200 whitespace-nowrap"
            style={{ fontStyle: 'italic' }}
          >
            <span>{isZh ? '了解認證' : 'Learn More'}</span>
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
