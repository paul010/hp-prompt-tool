// ============================================================
// 国际化 (i18n) 工具函数
// ============================================================

import { LocalizedContent, Language, DEFAULT_LANGUAGE } from "./types";

// 支持的语言列表
export const SUPPORTED_LANGUAGES: Record<Language, { name: string; flag: string; nativeName: string }> = {
  en: { name: "English", flag: "🇺🇸", nativeName: "English" },
  "zh-CN": { name: "Simplified Chinese", flag: "🇨🇳", nativeName: "简体中文" },
  "zh-TW": { name: "Traditional Chinese", flag: "🇹🇼", nativeName: "繁體中文" },
  ja: { name: "Japanese", flag: "🇯🇵", nativeName: "日本語" },
  ko: { name: "Korean", flag: "🇰🇷", nativeName: "한국어" },
} as const;

// 语言降级顺序（当指定语言的内容不存在时）
// 中文优先，适合教学场景
const LANGUAGE_FALLBACK_ORDER: Language[] = ["zh-CN", "en", "zh-TW", "ja", "ko"];

/**
 * 从多语言内容中获取指定语言的文本
 * @param content 多语言内容对象
 * @param language 目标语言
 * @returns 该语言的文本，如果不存在则降级到其他语言
 */
export function getLocalized<T extends LocalizedContent>(
  content: T | string,
  language: Language
): string {
  // 如果是字符串，直接返回（兼容旧格式）
  if (typeof content === "string") {
    return content;
  }

  // 优先返回指定语言
  if (content[language]) {
    return content[language];
  }

  // 按降级顺序查找
  for (const lang of LANGUAGE_FALLBACK_ORDER) {
    if (content[lang]) {
      return content[lang];
    }
  }

  // 如果都没有，返回英文（应该总是存在）
  return content.en || "";
}

/**
 * 检查多语言内容是否包含指定语言
 */
export function hasLanguage<T extends LocalizedContent>(
  content: T | string,
  language: Language
): boolean {
  if (typeof content === "string") {
    return false;
  }
  return !!content[language];
}

/**
 * 获取内容中可用的语言列表
 */
export function getAvailableLanguages<T extends LocalizedContent>(
  content: T | string
): Language[] {
  if (typeof content === "string") {
    return [];
  }
  return LANGUAGE_FALLBACK_ORDER.filter((lang) => !!content[lang]);
}

/**
 * 从浏览器获取默认语言
 */
export function getBrowserLanguage(): Language {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const browserLang = navigator.language;

  // 直接匹配
  if (SUPPORTED_LANGUAGES[browserLang as Language]) {
    return browserLang as Language;
  }

  // 处理 zh-CN 和 zh-TW
  if (browserLang.startsWith("zh")) {
    const region = browserLang.split("-")[1];
    if (region === "CN" || region === "TW") {
      return `zh-${region}` as Language;
    }
    // 默认使用简体中文
    return "zh-CN";
  }

  // 处理 ja 和 ko
  if (browserLang.startsWith("ja")) return "ja";
  if (browserLang.startsWith("ko")) return "ko";

  return DEFAULT_LANGUAGE;
}

/**
 * 从 localStorage 获取保存的语言偏好
 */
export function getSavedLanguage(): Language | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const saved = localStorage.getItem("prompt-language");
    if (saved && SUPPORTED_LANGUAGES[saved as Language]) {
      return saved as Language;
    }
  } catch {
    // localStorage 可能不可用
  }
  return null;
}

/**
 * 保存语言偏好到 localStorage
 */
export function saveLanguagePreference(language: Language): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem("prompt-language", language);
  } catch {
    // localStorage 可能不可用
  }
}

/**
 * 获取当前应该使用的语言
 * 优先级: 保存的偏好 > 浏览器语言 > 默认语言
 */
export function getCurrentLanguage(): Language {
  return getSavedLanguage() || getBrowserLanguage() || DEFAULT_LANGUAGE;
}

/**
 * 格式化语言显示名称
 */
export function formatLanguageName(language: Language, useNativeName = false): string {
  const lang = SUPPORTED_LANGUAGES[language];
  if (!lang) {
    return language;
  }
  return useNativeName ? `${lang.flag} ${lang.nativeName}` : `${lang.flag} ${lang.name}`;
}

/**
 * 判断是否为 RTL（从右到左）语言
 * 当前支持的语言都是 LTR，但预留接口
 */
export function isRTL(language: Language): boolean {
  // 未来可能添加阿拉伯语等 RTL 语言
  return false;
}
