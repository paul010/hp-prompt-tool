'use client';

import { useLanguage } from '../../contexts/LanguageContext';
import { CERTIFICATION_LEVELS } from '../../lib/data/certifications';
import { CertificationCard } from '../../components/CertificationCard';
import Link from 'next/link';
import { Target, BookOpen, Award, ArrowRight, Home } from 'lucide-react';

export default function LearningPathPage() {
  const { language } = useLanguage();
  const isZh = language.startsWith('zh');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[500px] overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          {/* 徽章 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 text-white text-sm font-medium">
            <Award className="w-4 h-4" />
            <span>{isZh ? 'HP FY26 数字学院' : 'HP FY26 Digital Academy'}</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {isZh ? 'AI 能力认证体系' : 'AI Certification System'}
          </h1>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            {isZh
              ? '从入门到精通，递进式培养 AI 时代人才'
              : 'Progressive AI talent development from beginner to expert'}
          </p>

          <Link
            href="/?difficulty=入门"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <Target className="w-5 h-5" />
            {isZh ? '开始学习' : 'Start Learning'}
          </Link>
        </div>

        {/* 底部波浪 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#F9FAFB"
            />
          </svg>
        </div>
      </section>

      {/* 认证体系介绍 */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {isZh ? '三级认证体系' : 'Three-tier Certification System'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isZh
              ? '针对不同人群和技能水平，设计了递进式的认证体系'
              : 'Progressive certification system designed for different groups and skill levels'}
          </p>
        </div>

        <div className="space-y-8">
          {CERTIFICATION_LEVELS.map((cert) => (
            <CertificationCard key={cert.level} certification={cert} />
          ))}
        </div>
      </section>

      {/* 学习路线图 */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {isZh ? '学习路线图' : 'Learning Roadmap'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isZh
                ? '三步走，从动手尝试到获得认证'
                : 'Three steps from hands-on to certification'}
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* 连接线 */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform -translate-y-1/2 rounded-full" />

            {/* 步骤卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {[
                {
                  step: 1,
                  icon: <BookOpen className="w-8 h-8" />,
                  titleZh: '动手尝试',
                  titleEn: 'Hands-on',
                  descZh: '在线体验提示词库，尝试复制使用',
                  descEn: 'Explore prompts library and try them out',
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  step: 2,
                  icon: <Target className="w-8 h-8" />,
                  titleZh: '系统学习',
                  titleEn: 'Systematic Learning',
                  descZh: '完成课程模块，通过在线考核',
                  descEn: 'Complete course modules and pass assessments',
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  step: 3,
                  icon: <Award className="w-8 h-8" />,
                  titleZh: '深度探索',
                  titleEn: 'Deep Dive',
                  descZh: '获得认证徽章，持续应用实践',
                  descEn: 'Earn certification and apply in practice',
                  color: 'from-amber-500 to-orange-500',
                },
              ].map((item) => (
                <div key={item.step} className="relative group">
                  {/* 步骤编号 */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-125 transition-transform`}>
                      {item.step}
                    </div>
                  </div>

                  {/* 卡片 */}
                  <div className="mt-6 bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200 group-hover:-translate-y-2">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white mb-4`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {isZh ? item.titleZh : item.titleEn}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
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
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {isZh ? '准备好了吗？' : 'Ready to start?'}
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            {isZh ? '选择你的起点，开始 AI 学习之旅' : 'Choose your starting point and begin your AI journey'}
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center flex-wrap">
            {CERTIFICATION_LEVELS.map((cert) => (
              <Link
                key={cert.level}
                href={`/?difficulty=${cert.prompts.difficulty[0]}`}
                className="group px-8 py-4 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-all hover:scale-105 shadow-xl"
              >
                <span className="flex items-center gap-2">
                  <span>{cert.emoji}</span>
                  <span>Level {cert.level}: {isZh ? cert.nameZh.split('认证')[0] : cert.name}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 底部导航 */}
      <section className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-blue-400 transition-colors text-lg font-semibold"
          >
            <Home className="w-5 h-5" />
            {isZh ? '返回首页' : 'Back to Home'}
          </Link>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(-20px, -20px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
