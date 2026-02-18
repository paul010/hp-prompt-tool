'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

export function CertificationBanner() {
  const { language } = useLanguage();
  const isZh = language.startsWith('zh');

  return (
    <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              🎯 {isZh ? 'HP FY26 数字学院 - AI 能力认证' : 'HP FY26 Digital Academy - AI Certification'}
            </h2>
            <p className="text-sm opacity-90">
              {isZh
                ? '获得专业认证徽章，释放 AI 价值 | Earn professional badges and unleash AI power'
                : 'Earn professional badges and unleash AI power'}
            </p>
          </div>
          <Link
            href="/learning-path"
            className="px-6 py-2 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            {isZh ? '了解更多 →' : 'Learn More →'}
          </Link>
        </div>
      </div>
    </section>
  );
}
