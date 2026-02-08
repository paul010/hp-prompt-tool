// ============================================================
// 语言选择器组件
// ============================================================

"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { SUPPORTED_LANGUAGES, formatLanguageName } from "../lib/i18n";
import { Language } from "../lib/types";

interface LanguageSelectorProps {
  className?: string;
  variant?: "dropdown" | "buttons";
}

export function LanguageSelector({ className = "", variant = "dropdown" }: LanguageSelectorProps) {
  const { language, setLanguage, isReady } = useLanguage();

  if (!isReady) {
    // 避免水合不匹配，显示占位符
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Globe className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-400">Loading...</span>
      </div>
    );
  }

  if (variant === "buttons") {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {Object.entries(SUPPORTED_LANGUAGES).map(([code, { flag, name }]) => (
          <button
            key={code}
            onClick={() => setLanguage(code as Language)}
            className={`px-2 py-1 text-sm rounded-md transition-all ${
              language === code
                ? "bg-hp-blue text-white font-medium"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            title={name}
          >
            {flag}
          </button>
        ))}
      </div>
    );
  }

  // 下拉菜单样式
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Globe className="w-4 h-4 text-gray-500" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="text-sm bg-transparent border-none outline-none cursor-pointer text-gray-700 hover:text-hp-blue transition-colors"
      >
        {Object.entries(SUPPORTED_LANGUAGES).map(([code, { flag, name }]) => (
          <option key={code} value={code}>
            {flag} {name}
          </option>
        ))}
      </select>
    </div>
  );
}
