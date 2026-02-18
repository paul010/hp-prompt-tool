'use client';

import { CertificationLevel } from '../lib/data/certifications';

interface CertificationBadgeProps {
  certification: CertificationLevel;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function CertificationBadge({
  certification,
  onClick,
  size = 'md',
}: CertificationBadgeProps) {
  const sizeClass = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-56 h-56',
  }[size];

  const textSize = {
    sm: 'text-xl',
    md: 'text-4xl',
    lg: 'text-6xl',
  }[size];

  const levelSize = {
    sm: 'text-lg',
    md: 'text-3xl',
    lg: 'text-5xl',
  }[size];

  const ribbonWidth = {
    sm: 'w-6',
    md: 'w-10',
    lg: 'w-14',
  }[size];

  return (
    <button
      onClick={onClick}
      className={`${sizeClass} relative cursor-pointer group`}
    >
      {/* 外部光晕 */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"
        style={{ background: `radial-gradient(circle, ${certification.color}, transparent)` }}
      />

      {/* 主徽章 */}
      <div
        className="relative w-full h-full rounded-full transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500"
        style={{
          background: `linear-gradient(135deg, ${certification.color}, ${certification.color}dd)`,
          boxShadow: `
            0 10px 30px -5px ${certification.color}66,
            inset 0 -3px 10px rgba(0,0,0,0.2),
            inset 0 3px 10px rgba(255,255,255,0.3)
          `,
        }}
      >
        {/* 顶部光泽 */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-transparent to-transparent" />

        {/* 丝带 */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <div className={`${ribbonWidth} h-16 bg-gradient-to-b from-red-500 to-red-600 rounded-b-lg shadow-lg relative`}>
            {/* 丝带顶部圆形 */}
            <div className={`absolute -top-2 left-0 right-0 ${ribbonWidth} h-4 bg-red-600 rounded-full`} />
            {/* 丝带阴影 */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 rounded-b-lg" />
          </div>
        </div>

        {/* 徽章内容 */}
        <div className="relative flex flex-col items-center justify-center h-full text-white z-20">
          <div className={`${textSize} mb-2 group-hover:scale-125 transition-transform`}>
            {certification.emoji}
          </div>
          <div className="text-xs font-bold tracking-wider opacity-90">
            LEVEL {certification.level}
          </div>
          <div className={`${levelSize} font-extrabold drop-shadow-lg`}>
            {certification.level}
          </div>
          <div className="text-xs font-semibold tracking-widest opacity-80 mt-1">
            {certification.badge.toUpperCase()}
          </div>
        </div>

        {/* 旋转光环 */}
        <div className="absolute inset-0 rounded-full border-4 border-white/20 group-hover:animate-spin-slow" />
        
        {/* 内部光环 */}
        <div className="absolute inset-4 rounded-full border-2 border-white/30 animate-pulse" />
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .group-hover\\:animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </button>
  );
}
