'use client';

import Link from 'next/link';
import { CertificationLevel } from '../lib/data/certifications';
import { useLanguage } from '../contexts/LanguageContext';
import { CertificationBadge } from './CertificationBadge';
import { Users, BookOpen, TrendingUp, ArrowRight } from 'lucide-react';

interface CertificationCardProps {
  certification: CertificationLevel;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const { language } = useLanguage();
  const isZh = language.startsWith('zh');

  return (
    <div className="group">
      {/* 卡片主体 */}
      <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* 左侧：徽章 */}
          <div className="flex-shrink-0">
            <CertificationBadge certification={certification} size="md" />
          </div>

          {/* 右侧：内容 */}
          <div className="flex-1 w-full">
            {/* 标题 */}
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              {isZh ? certification.nameZh : certification.name}
            </h3>

            {/* 描述 */}
            <p className="text-slate-600 text-base md:text-lg mb-6 leading-relaxed">
              {isZh ? certification.descriptionZh : certification.description}
            </p>

            {/* 信息卡片网格 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* 受众 */}
              <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-bold text-primary-900">
                    {isZh ? '受众' : 'Audience'}
                  </span>
                </div>
                {certification.audiences.map((aud, idx) => (
                  <p key={idx} className="text-sm text-primary-700 font-semibold">
                    {aud.number} {isZh ? '人' : 'people'}
                  </p>
                ))}
              </div>

              {/* 提示词 */}
              <div className="bg-secondary-50 border border-secondary-100 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-secondary-600" />
                  <span className="text-sm font-bold text-secondary-900">
                    {isZh ? '提示词' : 'Prompts'}
                  </span>
                </div>
                <p className="text-sm text-secondary-700 font-bold">
                  {certification.prompts.count}+
                </p>
              </div>

              {/* ROI */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-900">ROI</span>
                </div>
                <p className="text-sm text-emerald-700 font-bold">
                  {certification.value}
                </p>
              </div>
            </div>

            {/* 场景标签 */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {certification.prompts.scenes.map((scene) => (
                  <span
                    key={scene}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-full border border-slate-200"
                  >
                    {scene}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA 按钮 */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/?scenario=all`}
                className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-full shadow-button hover:-translate-y-0.5 hover:shadow-button transition-all duration-200"
              >
                <span>{isZh ? '查看提示词' : 'View Prompts'}</span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <button
                className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
              >
                {isZh ? '了解详情' : 'Learn More'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
