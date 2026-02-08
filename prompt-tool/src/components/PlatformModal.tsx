"use client";

import { X, ExternalLink } from "lucide-react";
import { Prompt, AIPlatform } from "../lib/types";
import { AI_PLATFORMS, getPlatformUrl } from "../lib/platforms";
import { useLanguage } from "../contexts/LanguageContext";
import { getLocalized } from "../lib/i18n";

interface PlatformModalProps {
  prompt: Prompt;
  isOpen: boolean;
  onClose: () => void;
}

export function PlatformModal({ prompt, isOpen, onClose }: PlatformModalProps) {
  const { language } = useLanguage();

  // Get localized content
  const content = typeof prompt.content === "string"
    ? prompt.content
    : getLocalized(prompt.content, language);

  // Get localized name
  const name = typeof prompt.name === "string"
    ? (language.startsWith("zh") ? (prompt.nameZh || prompt.name) : prompt.name)
    : getLocalized(prompt.name, language);

  if (!isOpen) return null;

  const handleSelect = (platformId: string) => {
    const url = getPlatformUrl(platformId as AIPlatform, content);
    window.open(url, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 模态框内容 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-slide-up">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* 头部 */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            选择 AI 平台
          </h3>
          <p className="text-gray-600 text-sm">
            为「{name}」选择最适合的 AI 平台使用
          </p>
        </div>

        {/* 平台列表 */}
        <div className="p-6">
          <div className="space-y-3">
            {AI_PLATFORMS.map((platform) => {
              const isRecommended = prompt.recommendedPlatforms.includes(
                platform.id
              );
              return (
                <button
                  key={platform.id}
                  onClick={() => handleSelect(platform.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 hover:border-hp-blue transition-all group"
                  style={{
                    borderColor: isRecommended ? platform.color : "#e5e7eb",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: platform.color + "20" }}
                  >
                    {platform.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">
                        {platform.name}
                      </span>
                      {isRecommended && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          推荐
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {platform.description}
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-hp-blue transition-colors" />
                </button>
              );
            })}
          </div>
        </div>

        {/* 底部提示 */}
        <div className="p-4 bg-gray-50 rounded-b-2xl">
          <p className="text-xs text-gray-500 text-center">
            点击平台按钮将在新标签页打开对应 AI 服务
          </p>
        </div>
      </div>
    </div>
  );
}
