'use client';

import Link from 'next/link';
import { CertificationLevel } from '../lib/data/certifications';
import { useLanguage } from '../contexts/LanguageContext';
import { CertificationBadge } from './CertificationBadge';

interface CertificationCardProps {
  certification: CertificationLevel;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const { language } = useLanguage();
  const isZh = language.startsWith('zh');

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4" style={{ borderLeftColor: certification.color }}>
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* 左侧：徽章 */}
        <div className="flex-shrink-0">
          <CertificationBadge certification={certification} size="md" />
        </div>

        {/* 右侧：内容 */}
        <div className="flex-1 w-full">
          <h3 className="text-2xl font-bold mb-2">
            {isZh ? certification.nameZh : certification.name}
          </h3>

          <p className="text-gray-600 mb-4">
            {isZh ? certification.descriptionZh : certification.description}
          </p>

          {/* 受众信息 */}
          <div className="mb-4 space-y-1">
            {certification.audiences.map((aud, idx) => (
              <p key={idx} className="text-sm text-gray-600">
                👥 {aud.number} {isZh ? '人' : 'people'} - {aud.description}
              </p>
            ))}
          </div>

          {/* 提示词信息 */}
          <div className="mb-4 p-3 bg-gray-50 rounded">
            <p className="text-sm font-semibold text-gray-700">
              📚 {certification.prompts.count}+ {isZh ? '配套提示词' : 'Prompts'}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {isZh ? '场景' : 'Scenarios'}: {certification.prompts.scenes.join(', ')}
            </p>
          </div>

          {/* ROI */}
          <div className="mb-6 p-3 bg-green-50 rounded border-l-4 border-green-500">
            <p className="font-bold text-green-700">💰 ROI: {certification.value}</p>
          </div>

          {/* CTA 按钮 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/?scenario=all`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-center font-medium"
            >
              {isZh ? '查看提示词' : 'View Prompts'}
            </Link>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors font-medium">
              {isZh ? '了解详情' : 'Learn More'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
