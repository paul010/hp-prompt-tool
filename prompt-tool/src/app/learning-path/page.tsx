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
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-200/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary-200/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 lg:py-32 text-center">
          {/* 徽章 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary-50 border border-primary-200 rounded-full text-primary-700 text-sm font-semibold shadow-soft">
            <Award className="w-4 h-4" />
            <span>{isZh ? 'HP FY26 数字学院' : 'HP FY26 Digital Academy'}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            {isZh ? (
              <>
                AI 能力<span className="gradient-text">认证体系</span>
              </>
            ) : (
              <>
                AI <span className="gradient-text">Certification System</span>
              </>
            )}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {isZh
              ? '从入门到精通，递进式培养 AI 时代人才'
              : 'Progressive AI talent development from beginner to expert'}
          </p>

          <Link
            href="/?difficulty=入门"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-full shadow-button hover:-translate-y-0.5 hover:shadow-button transition-all duration-200"
          >
            <Target className="w-5 h-5" />
            {isZh ? '开始学习' : 'Start Learning'}
          </Link>
        </div>
      </section>

      {/* 认证体系介绍 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {isZh ? '三级认证体系' : 'Three-tier Certification System'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
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
      <section className="bg-white border-y border-slate-200 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {isZh ? '学习路线图' : 'Learning Roadmap'}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {isZh
                ? '三步走，从动手尝试到获得认证'
                : 'Three steps from hands-on to certification'}
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* 连接线 */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform -translate-y-1/2 rounded-full" />

            {/* 步骤卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {[
                {
                  step: 1,
                  icon: <BookOpen className="w-7 h-7" />,
                  titleZh: '动手尝试',
                  titleEn: 'Hands-on',
                  descZh: '在线体验提示词库，尝试复制使用',
                  descEn: 'Explore prompts library and try them out',
                  bg: 'bg-primary-50',
                  border: 'border-primary-200',
                  iconBg: 'bg-primary-600',
                },
                {
                  step: 2,
                  icon: <Target className="w-7 h-7" />,
                  titleZh: '系统学习',
                  titleEn: 'Systematic Learning',
                  descZh: '完成课程模块，通过在线考核',
                  descEn: 'Complete course modules and pass assessments',
                  bg: 'bg-secondary-50',
                  border: 'border-secondary-200',
                  iconBg: 'bg-secondary-600',
                },
                {
                  step: 3,
                  icon: <Award className="w-7 h-7" />,
                  titleZh: '深度探索',
                  titleEn: 'Deep Dive',
                  descZh: '获得认证徽章，持续应用实践',
                  descEn: 'Earn certification and apply in practice',
                  bg: 'bg-emerald-50',
                  border: 'border-emerald-200',
                  iconBg: 'bg-emerald-600',
                },
              ].map((item) => (
                <div key={item.step} className="relative group">
                  {/* 步骤编号 */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                    <div className={`w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center text-white font-bold text-xl shadow-card group-hover:scale-110 transition-transform`}>
                      {item.step}
                    </div>
                  </div>

                  {/* 卡片 */}
                  <div className={`mt-6 bg-white ${item.bg} border ${item.border} rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group-hover:-translate-y-1`}>
                    <div className={`inline-flex p-3 rounded-xl ${item.iconBg} text-white mb-4 shadow-soft`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {isZh ? item.titleZh : item.titleEn}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
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
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {isZh ? '准备好了吗？' : 'Ready to start?'}
          </h2>
          <p className="text-lg md:text-xl text-primary-100 mb-10">
            {isZh ? '选择你的起点，开始 AI 学习之旅' : 'Choose your starting point and begin your AI journey'}
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center flex-wrap">
            {CERTIFICATION_LEVELS.map((cert) => (
              <Link
                key={cert.level}
                href={`/?difficulty=${cert.prompts.difficulty[0]}`}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-bold rounded-full hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>{cert.emoji}</span>
                <span>Level {cert.level}: {isZh ? cert.nameZh.split('认证')[0] : cert.name}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 底部导航 */}
      <section className="bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-primary-300 transition-colors text-lg font-semibold"
          >
            <Home className="w-5 h-5" />
            {isZh ? '返回首页' : 'Back to Home'}
          </Link>
        </div>
      </section>
    </div>
  );
}
