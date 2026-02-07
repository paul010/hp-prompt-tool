"use client";

import { Prompt } from "@/lib/types";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { AI_PLATFORMS, getPlatformUrl, getRecommendedPlatforms } from "@/lib/platforms";
import { PlatformModal } from "./PlatformModal";

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showPlatformModal, setShowPlatformModal] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const recommendedPlatforms = getRecommendedPlatforms(
    prompt.scenario,
    prompt.tags,
    prompt.forDevelopers
  );

  const platformsToShow = prompt.recommendedPlatforms.length > 0
    ? AI_PLATFORMS.filter((p) => prompt.recommendedPlatforms.includes(p.id))
    : AI_PLATFORMS.filter((p) => recommendedPlatforms.includes(p.id));

  return (
    <div className="prompt-card p-6 animate-fade-in">
      {/* 头部：标题和标签 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {prompt.nameZh}
            </h3>
            <span className="text-sm text-gray-500">({prompt.name})</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{prompt.description}</p>
          <div className="flex flex-wrap gap-2">
            <span className="tag bg-blue-100 text-blue-700">{prompt.scenario}</span>
            {prompt.tags.map((tag) => (
              <span key={tag} className="tag bg-gray-100 text-gray-600">
                {tag}
              </span>
            ))}
            {prompt.forDevelopers && (
              <span className="tag bg-purple-100 text-purple-700">面向开发者</span>
            )}
            <span
              className={`tag ${
                prompt.difficulty === "入门"
                  ? "bg-green-100 text-green-700"
                  : prompt.difficulty === "进阶"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {prompt.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* 提示词内容 */}
      <div className="relative">
        <div
          className={`bg-gray-50 rounded-lg p-4 mb-4 transition-all ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
            {prompt.content}
          </pre>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="absolute bottom-6 right-4 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              收起
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              展开全部
            </>
          )}
        </button>
      </div>

      {/* 示例 */}
      {prompt.examples && prompt.examples.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">使用示例：</p>
          <div className="flex flex-wrap gap-2">
            {prompt.examples.map((example, index) => (
              <span
                key={index}
                className="text-xs bg-white border border-gray-200 px-2 py-1 rounded text-gray-600"
              >
                {example}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            copied
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Copy className="w-4 h-4" />
          {copied ? "已复制" : "复制提示词"}
        </button>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">在 AI 中使用：</span>
          <div className="flex gap-2">
            {platformsToShow.slice(0, 3).map((platform) => (
              <button
                key={platform.id}
                onClick={() => {
                  const url = getPlatformUrl(platform.id, prompt.content);
                  window.open(url, "_blank");
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all hover:shadow-sm group"
                title={platform.description}
              >
                <span className="text-lg">{platform.icon}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {platform.name}
                </span>
              </button>
            ))}
            {platformsToShow.length > 3 && (
              <button
                onClick={() => setShowPlatformModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-dashed border-gray-300 hover:border-hp-blue transition-all hover:shadow-sm group"
              >
                <span className="text-sm font-medium text-gray-500 group-hover:text-hp-blue">
                  +{platformsToShow.length - 3} 更多
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <PlatformModal
        prompt={prompt}
        isOpen={showPlatformModal}
        onClose={() => setShowPlatformModal(false)}
      />
    </div>
  );
}
