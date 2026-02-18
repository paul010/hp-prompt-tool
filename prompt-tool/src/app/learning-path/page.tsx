'use client';

import { useLanguage } from '../../contexts/LanguageContext';
import { CERTIFICATION_LEVELS } from '../../lib/data/certifications';
import { CertificationCard } from '../../components/CertificationCard';
import Link from 'next/link';

export default function LearningPathPage() {
  const { language } = useLanguage();
  const isZh = language.startsWith('zh');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isZh ? '数字学院 AI 能力认证体系' : 'Digital Academy AI Certification'}
          </h1>
          <p className="text-xl opacity-90 mb-8">
            {isZh
              ? '从入门到精通，递进式培养 AI 时代人才'
              : 'Progressive AI talent development from beginner to expert'}
          </p>

          <Link
            href="/?difficulty=入门"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            {isZh ? '开始学习' : 'Start Learning'}
          </Link>
        </div>
      </section>

      {/* 认证体系介绍 */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">
          {isZh ? '三级认证体系' : 'Three-tier Certification System'}
        </h2>

        <div className="space-y-8">
          {CERTIFICATION_LEVELS.map((cert) => (
            <CertificationCard key={cert.level} certification={cert} />
          ))}
        </div>
      </section>

      {/* 学习路线图 */}
      <section className="bg-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {isZh ? '学习路线图' : 'Learning Roadmap'}
          </h2>

          <div className="relative">
            {/* 连接线 */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2" />

            {/* 步骤卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {[
                {
                  step: 1,
                  icon: '📚',
                  titleZh: '动手尝试',
                  titleEn: 'Hands-on',
                  descZh: '在线体验提示词库，尝试复制使用',
                  descEn: 'Explore prompts library and try them out',
                },
                {
                  step: 2,
                  icon: '🎓',
                  titleZh: '系统学习',
                  titleEn: 'Systematic Learning',
                  descZh: '完成课程模块，通过在线考核',
                  descEn: 'Complete course modules and pass assessments',
                },
                {
                  step: 3,
                  icon: '🏆',
                  titleZh: '深度探索',
                  titleEn: 'Deep Dive',
                  descZh: '获得认证徽章，持续应用实践',
                  descEn: 'Earn certification and apply in practice',
                },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="bg-white border-2 border-blue-500 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="inline-block w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mb-4 text-lg">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      {isZh ? item.titleZh : item.titleEn}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {isZh ? item.descZh : item.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isZh ? '准备好了吗？' : 'Ready to start?'}
          </h2>
          <p className="text-lg mb-8">
            {isZh ? '选择你的起点，开始 AI 学习之旅' : 'Choose your starting point and begin your AI journey'}
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center flex-wrap">
            <Link
              href="/?difficulty=入门"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors flex-1 md:flex-initial text-center"
            >
              {isZh ? 'Level 1: 办公能手' : 'Level 1: Office Expert'}
            </Link>
            <Link
              href="/?difficulty=进阶"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors flex-1 md:flex-initial text-center"
            >
              {isZh ? 'Level 2: 辅助专家' : 'Level 2: AI Expert'}
            </Link>
            <Link
              href="/?difficulty=专家"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors flex-1 md:flex-initial text-center"
            >
              {isZh ? 'Level 3: Agent 创造者' : 'Level 3: Agent Creator'}
            </Link>
          </div>
        </div>
      </section>

      {/* 底部导航 */}
      <section className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            {isZh ? '← 返回首页' : '← Back to Home'}
          </Link>
        </div>
      </section>
    </div>
  );
}
