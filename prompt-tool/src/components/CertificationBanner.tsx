'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { Award, ArrowRight } from 'lucide-react';

export function CertificationBanner() {
  const { language } = useLanguage();
  const isZh = language.startsWith('zh');

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <div className="group bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] overflow-hidden">
          {/* 渐变边框效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-6">
            {/* 左侧内容 */}
            <div className="flex items-center gap-4">
              {/* 图标 */}
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-white" />
              </div>

              {/* 文字 */}
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1">
                  {isZh ? 'HP FY26 数字学院' : 'HP FY26 Digital Academy'}
                </h2>
                <p className="text-gray-600 text-sm">
                  {isZh
                    ? '获得专业认证徽章，释放 AI 价值'
                    : 'Earn professional badges and unleash AI power'}
                </p>
              </div>
            </div>

            {/* 右侧按钮 */}
            <Link
              href="/learning-path"
              className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap"
            >
              <span>{isZh ? '了解认证体系' : 'Learn More'}</span>
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
