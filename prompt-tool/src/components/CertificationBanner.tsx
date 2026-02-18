'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { Award, ArrowRight } from 'lucide-react';

export function CertificationBanner() {
  const { language } = useLanguage();
  const isZh = language.startsWith('zh');

  return (
    <section className="bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="group flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-100 shadow-card hover:shadow-card-hover transition-all duration-300">
          {/* 左侧内容 */}
          <div className="flex items-center gap-4">
            {/* 图标 */}
            <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-button">
              <Award className="w-7 h-7 text-white" />
            </div>

            {/* 文字 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                {isZh ? 'HP FY26 数字学院' : 'HP FY26 Digital Academy'}
              </h2>
              <p className="text-slate-600 text-sm font-medium">
                {isZh
                  ? '获得专业认证徽章，释放 AI 价值'
                  : 'Earn professional badges and unleash AI power'}
              </p>
            </div>
          </div>

          {/* 右侧按钮 */}
          <Link
            href="/learning-path"
            className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-full shadow-button hover:-translate-y-0.5 hover:shadow-button transition-all duration-200 whitespace-nowrap"
          >
            <span>{isZh ? '了解认证体系' : 'Learn More'}</span>
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
