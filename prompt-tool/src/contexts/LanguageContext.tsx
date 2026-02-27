// ============================================================
// 语言上下文 - React 全局状态管理
// ============================================================

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, DEFAULT_LANGUAGE } from "@/lib/types";
import {
  getCurrentLanguage,
  saveLanguagePreference,
  getBrowserLanguage,
} from "@/lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isReady: boolean; // 是否已初始化（避免 SSR 水合不匹配）
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({ children, defaultLanguage }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage || DEFAULT_LANGUAGE);
  const [isReady, setIsReady] = useState(false);

  // 初始化语言设置
  useEffect(() => {
    // 2025-02-27 强制所有用户使用中文（提示词内容中文化）
    if (typeof window !== "undefined") {
      const forceChineseKey = "prompt-language-force-chinese-20250227";
      try {
        if (!localStorage.getItem(forceChineseKey)) {
          // 清除旧的语言偏好
          localStorage.removeItem("prompt-language");
          // 设置为中文并标记迁移完成
          localStorage.setItem("prompt-language", "zh-CN");
          localStorage.setItem(forceChineseKey, "true");
          console.log("🇨🇳 语言已强制设置为中文（中文化版本）");
        }
      } catch {
        // localStorage 可能不可用，忽略错误
      }
    }

    // 从 localStorage 或浏览器获取语言
    const savedLang = getCurrentLanguage();
    setLanguageState(savedLang);
    setIsReady(true);
  }, []);

  // 设置语言并保存到 localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    saveLanguagePreference(lang);
  };

  const value = {
    language,
    setLanguage,
    isReady,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * 使用语言上下文的 Hook
 */
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

/**
 * 简化版本：只返回当前语言
 */
export function useCurrentLanguage(): Language {
  const { language } = useLanguage();
  return language;
}
