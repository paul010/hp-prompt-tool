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
    sm: 'text-sm',
    md: 'text-2xl',
    lg: 'text-4xl',
  }[size];

  return (
    <button
      onClick={onClick}
      className={`${sizeClass} relative rounded-full cursor-pointer transition-transform hover:scale-110`}
      style={{ background: `linear-gradient(135deg, ${certification.color}, ${certification.color}dd)` }}
    >
      {/* 奖章丝带 */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-red-500 rounded-b-lg opacity-80" />
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-red-600 rounded-full" />

      {/* 徽章内容 */}
      <div className="flex flex-col items-center justify-center h-full text-white">
        <div className={textSize}>{certification.emoji}</div>
        <div className="text-xs font-bold mt-1">Level {certification.level}</div>
        <div className={`${levelSize} font-bold`}>{certification.level}</div>
      </div>

      {/* 外圈光效 */}
      <div
        className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse"
        style={{ background: 'none' }}
      />
    </button>
  );
}
