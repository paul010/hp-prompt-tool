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
    <div className="min-h-screen bg-academy-gray-light">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b-4 border-academy-black">
        {/* 背景装饰 - 点阵 */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle, #ddd 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 lg:py-32 text-center">
          {/* 徽章 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-academy-yellow border-4 border-academy-black rounded-none text-academy-black text-sm font-black stack-shadow"
            style={{ fontStyle: 'italic' }}>
            <Award className="w-4 h-4" />
            <span>{isZh ? 'HP FY26 數字學院' : 'HP FY26 Digital Academy'}</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-academy-black mb-6 leading-tight"
            style={{ fontStyle: 'italic', transform: 'skewY(-3deg)' }}>
            {isZh ? (
              <>
                AI 能力<span className="text-academy-pink">認證體系</span>
              </>
            ) : (
              <>
                AI <span className="text-academy-pink">Certification</span>
              </>
            )}
          </h1>
          <p className="text-lg md:text-xl text-academy-black mb-10 max-w-3xl mx-auto leading-relaxed font-semibold">
            {isZh
              ? '從入門到精通，遞進式培養 AI 時代人才'
              : 'Progressive AI talent development from beginner to expert'}
          </p>

          <Link
            href="/?difficulty=入門"
            className="inline-flex items-center gap-2 px-8 py-4 bg-academy-pink text-white font-black border-4 border-academy-black rounded-none shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-200"
            style={{ fontStyle: 'italic' }}
          >
            <Target className="w-5 h-5" />
            {isZh ? '開始學習' : 'Start Learning'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* 认证体系介绍 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-academy-black mb-4"
            style={{ fontStyle: 'italic', transform: 'skewY(-2deg)' }}>
            {isZh ? '三級認證體系' : 'Three-tier Certification'}
          </h2>
          <p className="text-lg text-academy-black max-w-2xl mx-auto font-semibold">
            {isZh
              ? '針對不同人群和技能水平，設計了遞進式的認證體系'
              : 'Progressive system designed for different skill levels'}
          </p>
        </div>

        <div className="space-y-8">
          {CERTIFICATION_LEVELS.map((cert) => (
            <CertificationCard key={cert.level} certification={cert} />
          ))}
        </div>
      </section>

      {/* 学习路线图 */}
      <section className="bg-white border-t-4 border-b-4 border-academy-black py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-academy-black mb-4"
              style={{ fontStyle: 'italic', transform: 'skewY(-2deg)' }}>
              {isZh ? '學習路線圖' : 'Learning Roadmap'}
            </h2>
            <p className="text-lg text-academy-black max-w-2xl mx-auto font-semibold">
              {isZh
                ? '三步走，從動手嘗試到獲得認證'
                : 'Three steps from hands-on to certification'}
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* 连接线 */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-4 border-t-4 border-b-4 border-academy-black transform -translate-y-1/2" />

            {/* 步骤卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {[
                {
                  step: 1,
                  icon: <BookOpen className="w-8 h-8" />,
                  titleZh: '動手嘗試',
                  titleEn: 'Hands-on',
                  descZh: '在線體驗提示詞庫，嘗試複製使用',
                  descEn: 'Explore prompts library and try them out',
                  bgColor: 'bg-academy-yellow',
                  stepColor: 'bg-academy-black',
                },
                {
                  step: 2,
                  icon: <Target className="w-8 h-8" />,
                  titleZh: '系統學習',
                  titleEn: 'Systematic Learning',
                  descZh: '完成課程模塊，通過在線考核',
                  descEn: 'Complete course modules and pass assessments',
                  bgColor: 'bg-academy-pink',
                  stepColor: 'bg-academy-black',
                },
                {
                  step: 3,
                  icon: <Award className="w-8 h-8" />,
                  titleZh: '深度探索',
                  titleEn: 'Deep Dive',
                  descZh: '獲得認證徽章，持續應用實踐',
                  descEn: 'Earn certification and apply in practice',
                  bgColor: 'bg-academy-blue',
                  stepColor: 'bg-academy-yellow',
                },
              ].map((item) => (
                <div key={item.step} className="relative group">
                  {/* 步骤编号 */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20">
                    <div className={`w-16 h-16 ${item.stepColor} text-white flex items-center justify-center text-3xl font-black border-4 border-academy-black rounded-none shadow-lg group-hover:scale-110 transition-transform`}>
                      {item.step}
                    </div>
                  </div>

                  {/* 卡片 */}
                  <div className={`mt-8 ${item.bgColor} text-academy-black border-4 border-academy-black rounded-none p-8 stack-shadow hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2`}>
                    <div className="inline-flex p-3 bg-academy-black text-white rounded-none mb-4 stack-shadow">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-black mb-3"
                      style={{ fontStyle: 'italic' }}>
                      {isZh ? item.titleZh : item.titleEn}
                    </h3>
                    <p className="text-academy-black leading-relaxed font-semibold">
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
      <section className="bg-academy-black py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6"
            style={{ fontStyle: 'italic', transform: 'skewY(-3deg)' }}>
            {isZh ? '準備好了嗎？' : 'Ready to start?'}
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 font-semibold">
            {isZh ? '選擇你的起點，開始 AI 學習之旅' : 'Choose your starting point and begin your AI journey'}
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center flex-wrap">
            {CERTIFICATION_LEVELS.map((cert) => (
              <Link
                key={cert.level}
                href={`/?difficulty=${cert.prompts.difficulty[0]}`}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-academy-yellow text-academy-black font-black border-4 border-white rounded-none hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                style={{ fontStyle: 'italic' }}
              >
                <span>{cert.emoji}</span>
                <span>Level {cert.level}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 底部导航 */}
      <section className="bg-academy-black border-t-4 border-academy-pink py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white font-black hover:text-academy-yellow transition-colors text-lg"
            style={{ fontStyle: 'italic' }}
          >
            <Home className="w-5 h-5" />
            {isZh ? '返回首頁' : 'Back to Home'}
          </Link>
        </div>
      </section>
    </div>
  );
}
