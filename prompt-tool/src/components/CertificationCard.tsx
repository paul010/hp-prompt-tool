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
    <div className="group relative">
      {/* 背景光晕 */}
      <div
        className="absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${certification.color}44, transparent)` }}
      />

      {/* 卡片主体 */}
      <div
        className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 group-hover:-translate-y-2"
        style={{ borderColor: `${certification.color}33` }}
      >
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* 左侧：徽章 */}
          <div className="flex-shrink-0">
            <CertificationBadge certification={certification} size="md" />
          </div>

          {/* 右侧：内容 */}
          <div className="flex-1 w-full">
            {/* 标题 */}
            <h3
              className="text-3xl font-bold mb-3 bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${certification.color}, ${certification.color}cc)`,
              }}
            >
              {isZh ? certification.nameZh : certification.name}
            </h3>

            {/* 描述 */}
            <p className="text-gray-600 text-lg mb-6">
              {isZh ? certification.descriptionZh : certification.description}
            </p>

            {/* 信息卡片网格 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* 受众 */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-900">
                    {isZh ? '受众' : 'Audience'}
                  </span>
                </div>
                {certification.audiences.map((aud, idx) => (
                  <p key={idx} className="text-sm text-blue-700">
                    {aud.number} {isZh ? '人' : 'people'}
                  </p>
                ))}
              </div>

              {/* 提示词 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-900">
                    {isZh ? '提示词' : 'Prompts'}
                  </span>
                </div>
                <p className="text-sm text-purple-700 font-bold">
                  {certification.prompts.count}+
                </p>
              </div>

              {/* ROI */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-green-900">ROI</span>
                </div>
                <p className="text-sm text-green-700 font-bold">
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
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: `${certification.color}15`,
                      color: certification.color,
                    }}
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
                className="group/btn flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:scale-105"
                style={{
                  background: `linear-gradient(to right, ${certification.color}, ${certification.color}dd)`,
                }}
              >
                <span>{isZh ? '查看提示词' : 'View Prompts'}</span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <button
                className="px-6 py-3 rounded-xl font-bold border-2 transition-all hover:shadow-lg"
                style={{
                  borderColor: certification.color,
                  color: certification.color,
                }}
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
