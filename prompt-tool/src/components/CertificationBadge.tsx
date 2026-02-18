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
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  }[size];

  const textSize = {
    sm: 'text-lg',
    md: 'text-3xl',
    lg: 'text-5xl',
  }[size];

  const levelSize = {
    sm: 'text-base',
    md: 'text-2xl',
    lg: 'text-4xl',
  }[size];

  // 根据级别选择颜色
  const colorClass = {
    1: 'from-amber-400 to-yellow-500',
    2: 'from-slate-300 to-slate-400',
    3: 'from-yellow-500 to-amber-600',
  }[certification.level] || 'from-primary-500 to-secondary-500';

  const shadowColor = {
    1: 'shadow-[0_4px_20px_rgba(251,191,36,0.3)]',
    2: 'shadow-[0_4px_20px_rgba(148,163,184,0.3)]',
    3: 'shadow-[0_4px_20px_rgba(245,158,11,0.4)]',
  }[certification.level] || 'shadow-card';

  return (
    <button
      onClick={onClick}
      className={`${sizeClass} relative cursor-pointer group`}
    >
      {/* 主徽章 */}
      <div
        className={`relative w-full h-full rounded-full bg-gradient-to-br ${colorClass} ${shadowColor} transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1`}
        style={{
          boxShadow: `0 10px 30px -5px ${certification.color}66, inset 0 -3px 10px rgba(0,0,0,0.1), inset 0 3px 10px rgba(255,255,255,0.3)`,
        }}
      >
        {/* 顶部光泽 */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-transparent to-transparent" />

        {/* 徽章内容 */}
        <div className="relative flex flex-col items-center justify-center h-full text-white z-10">
          <div className={`${textSize} mb-1 group-hover:scale-110 transition-transform`}>
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

        {/* 边框 */}
        <div className="absolute inset-0 rounded-full border-4 border-white/30" />
      </div>
    </button>
  );
}
