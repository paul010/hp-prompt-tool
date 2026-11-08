"use client";
/* eslint-disable @next/next/no-img-element */

import { Prompt, InputField, AIPlatform } from "../lib/types";
import { Copy, ChevronDown, ChevronUp, Eye, Award, Settings, Palette } from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import { AI_PLATFORMS, getPlatformUrl, getRecommendedPlatforms } from "../lib/platforms";
import { PlatformModal } from "./PlatformModal";
import { PromptDetailModal } from "./PromptDetailModal";
import { PromptBuilderModal } from "./PromptBuilderModal";
import { useLanguage } from "../contexts/LanguageContext";
import { getLocalized } from "../lib/i18n";
import { shouldRenderPromptImage } from "../lib/promptImageUtils";

interface PromptCardProps {
  prompt: Prompt;
  compact?: boolean;
  loadDetail?: () => Promise<Prompt>;
}

// 模型名称显示映射
function getModelDisplayName(model: string): string {
  const modelNames: Record<string, string> = {
    "midjourney": "Midjourney",
    "dalle": "DALL-E 3",
    "stable-diffusion": "Stable Diffusion"
  };
  return modelNames[model] || model;
}

export function PromptCard({ prompt: summary, compact = false, loadDetail }: PromptCardProps) {
  const [detail, setDetail] = useState<Prompt | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');
  const inFlight = useRef<Promise<Prompt> | null>(null);
  const prompt = detail || summary;
  const fullContent = (item: Prompt) => typeof item.content === 'string'
    ? item.contentZh || item.content : getLocalized(item.content, language);
  const ensureDetail = async (): Promise<Prompt> => {
    if (!loadDetail || detail) return detail || summary;
    if (inFlight.current) return inFlight.current;
    setDetailLoading(true);
    setDetailError('');
    const request = loadDetail().then(item => { setDetail(item); return item; });
    inFlight.current = request;
    try { return await request; }
    finally { inFlight.current = null; setDetailLoading(false); }
  };
  const withDetail = async (action: (item: Prompt) => void | Promise<void>) => {
    if (detailLoading) return;
    setDetailError('');
    try { await action(await ensureDetail()); }
    catch (error) { setDetailError(error instanceof Error ? error.message : '正文加载失败，请重试。'); }
  };
  const openPlatform = async (platform: AIPlatform) => {
    if (detailLoading) return;
    // Open during the user gesture so asynchronous loading cannot trigger popup blocking.
    const tab = window.open('about:blank', '_blank');
    if (tab) tab.opener = null;
    setDetailError('');
    try {
      const item = await ensureDetail();
      if (tab) tab.location.href = getPlatformUrl(platform, fullContent(item));
      else setDetailError('浏览器阻止了新窗口，请允许弹出窗口后重试。');
    } catch (error) {
      tab?.close();
      setDetailError(error instanceof Error ? error.message : '正文加载失败，请重试。');
    }
  };
  const detailStatus = <>
    {detailLoading && <p role="status" className="mb-2 text-xs text-gray-500">正在加载完整提示词…</p>}
    {detailError && <p role="alert" className="mb-2 text-xs text-red-700">{detailError} 可再次点击操作重试。</p>}
  </>;

  const { language, setLanguage } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showBuilderModal, setShowBuilderModal] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [prompt.id, prompt.imageUrl]);

  // 获取本地化内容（兼容多语言和单语言格式）
  const displayName = useMemo(() => {
    if (typeof prompt.name === "string") {
      // 优先使用中文
      if (prompt.nameZh) {
        return prompt.nameZh;
      }
      return prompt.name;
    }
    return getLocalized(prompt.name, language);
  }, [prompt.name, prompt.nameZh, language]);

  const displayDescription = useMemo(() => {
    if (typeof prompt.description === "string") {
      // 优先使用中文
      if (prompt.descriptionZh) {
        return prompt.descriptionZh;
      }
      return prompt.description;
    }
    return getLocalized(prompt.description, language);
  }, [prompt.description, prompt.descriptionZh, language]);

  const displayContent = useMemo(() => {
    if (typeof prompt.content === "string") {
      // 优先使用中文，如果没有中文则使用英文
      // 默认语言是中文（zh-CN），所以优先显示 contentZh
      if (prompt.contentZh) {
        return prompt.contentZh;
      }
      return prompt.content;
    }
    return getLocalized(prompt.content, language);
  }, [prompt.content, prompt.contentZh, language]);

  // 获取 inputFields（兼容新格式和旧格式）
  const inputFields = useMemo(() => {
    if (!prompt.inputFields) return [];
    if (Array.isArray(prompt.inputFields) && typeof prompt.inputFields[0] === "string") {
      return (prompt.inputFields as string[]).map((name) => ({
        name,
        label: { en: name, "zh-CN": name },
        type: "text" as const,
        required: true,
      }));
    }
    return prompt.inputFields as InputField[];
  }, [prompt.inputFields]);

  const hasInputFields = inputFields.length > 0;
  const canRenderImage = shouldRenderPromptImage(prompt) && !imageFailed;

  const handleCopy = () => {
    if (detailLoading) return;
    setDetailError('');
    // Start the clipboard operation in the click itself. WebKit otherwise loses
    // transient activation while the full text is being fetched.
    const item = ensureDetail();
    const operation = typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write
      ? navigator.clipboard.write([new ClipboardItem({
          'text/plain': item.then(value => new Blob([fullContent(value)], { type: 'text/plain' })),
        })])
      : item.then(value => {
          if (loadDetail && !detail) throw new Error('正文已加载，请再次点击复制。');
          return navigator.clipboard.writeText(fullContent(value));
        });
    operation.then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(error => setDetailError(error instanceof Error ? error.message : '复制失败，请重试。'));
  };

  const recommendedPlatforms = getRecommendedPlatforms(
    prompt.scenario,
    prompt.tags,
    prompt.forDevelopers
  );

  const platformsToShow = prompt.recommendedPlatforms.length > 0
    ? AI_PLATFORMS.filter((p) => prompt.recommendedPlatforms.includes(p.id))
    : AI_PLATFORMS.filter((p) => recommendedPlatforms.includes(p.id));

  // 紧凑模式
  if (compact) {
    return (
      <div aria-busy={detailLoading} className="bg-white rounded-xl border border-gray-200 hover:border-hp-blue hover:shadow-lg transition-all overflow-hidden p-4">
        {detailStatus}
        {canRenderImage && (
          <div className="mb-3 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
            <img
              src={prompt.imageUrl}
              alt={prompt.imageAlt || displayName}
              loading="lazy"
              onError={() => setImageFailed(true)}
              className="h-36 w-full object-cover"
            />
          </div>
        )}
        {/* 图像提示词专用徽章 */}
        {prompt.promptType === "image" && prompt.imagePromptMetadata && (
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 rounded-full flex items-center gap-1">
              <Palette className="w-3 h-3" />
              文生图
            </span>
            <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">
              {getModelDisplayName(prompt.imagePromptMetadata.model)}
            </span>
            {prompt.imagePromptMetadata.aspectRatio && (
              <span className="px-2 py-0.5 text-xs text-gray-500">
                {prompt.imagePromptMetadata.aspectRatio}
              </span>
            )}
          </div>
        )}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900 truncate">
              {displayName}
            </h3>
          </div>
          <span className={`px-2 py-0.5 text-xs font-medium rounded flex-shrink-0 ${
            prompt.difficulty === "入门" ? "bg-green-100 text-green-700" :
            prompt.difficulty === "进阶" ? "bg-yellow-100 text-yellow-700" :
            "bg-red-100 text-red-700"
          }`}>
            {prompt.difficulty}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {displayDescription}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
            {prompt.scenario}
          </span>
          {prompt.source === "openai" && (
            <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded flex items-center gap-1">
              <Award className="w-3 h-3" />
              OpenAI官方
            </span>
          )}
          {prompt.source === "prompts.chat" && (
            <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 rounded flex items-center gap-1">
              <Palette className="w-3 h-3" />
              prompts.chat
            </span>
          )}
          {prompt.tags.filter(t => t !== "OpenAI官方" && t !== "文生图").slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
              {tag}
            </span>
          ))}
          {prompt.tags.filter(t => t !== "OpenAI官方" && t !== "文生图").length > 2 && (
            <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">
              +{prompt.tags.filter(t => t !== "OpenAI官方" && t !== "文生图").length - 2}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex gap-2">
            {hasInputFields && (
              <button
                onClick={() => withDetail(() => setShowBuilderModal(true))}
                className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1 transition-all"
              >
                <Settings className="w-3.5 h-3.5" />
                填写
              </button>
            )}
            <button
              onClick={handleCopy}
              className={`text-sm font-medium transition-all ${
                copied ? "text-green-600" : "text-hp-blue hover:underline"
              }`}
            >
              {copied ? "已复制" : "复制"}
            </button>
            <button
              onClick={() => withDetail(() => setShowDetailModal(true))}
              className="text-sm font-medium text-gray-600 hover:text-hp-blue flex items-center gap-1 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              查看详情
            </button>
          </div>
          <div className="flex gap-1.5">
            {platformsToShow.slice(0, 4).map((platform) => (
              <button
                key={platform.id}
                onClick={() => openPlatform(platform.id)}
                className="w-8 h-8 rounded-lg border border-gray-200 hover:border-hp-blue hover:bg-gray-50 flex items-center justify-center transition-all"
                title={platform.name}
              >
                {platform.icon}
              </button>
            ))}
            {platformsToShow.length > 4 && (
              <button
                onClick={() => withDetail(() => setShowPlatformModal(true))}
                className="w-8 h-8 rounded-lg border border-dashed border-gray-300 hover:border-hp-blue flex items-center justify-center text-xs text-gray-500 hover:text-hp-blue transition-all"
              >
                +{platformsToShow.length - 4}
              </button>
            )}
          </div>
        </div>

        <PlatformModal
          prompt={prompt}
          isOpen={showPlatformModal}
          onClose={() => setShowPlatformModal(false)}
        />
        <PromptDetailModal
          prompt={prompt}
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
        />
        <PromptBuilderModal
          prompt={prompt}
          isOpen={showBuilderModal}
          onClose={() => setShowBuilderModal(false)}
        />
      </div>
    );
  }

  // 完整模式（原有布局）
  return (
    <div aria-busy={detailLoading} className="prompt-card p-6 animate-fade-in">
      {detailStatus}
      {canRenderImage && (
        <div className="mb-4 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
          <img
            src={prompt.imageUrl}
            alt={prompt.imageAlt || displayName}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-56 w-full object-cover"
          />
        </div>
      )}
      {/* 图像提示词专用徽章 */}
      {prompt.promptType === "image" && prompt.imagePromptMetadata && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-2.5 py-1 text-xs bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 rounded-full flex items-center gap-1.5 font-medium">
            <Palette className="w-3.5 h-3.5" />
            文生图
          </span>
          <span className="px-2.5 py-1 text-xs bg-gray-100 text-gray-700 rounded font-medium">
            {getModelDisplayName(prompt.imagePromptMetadata.model)}
          </span>
          {prompt.imagePromptMetadata.aspectRatio && (
            <span className="px-2.5 py-1 text-xs text-gray-500">
              宽高比: {prompt.imagePromptMetadata.aspectRatio}
            </span>
          )}
        </div>
      )}
      {/* 头部：标题和标签 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {displayName}
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">{displayDescription}</p>
          <div className="flex flex-wrap gap-2">
            <span className="tag bg-blue-100 text-blue-700">{prompt.scenario}</span>
            {prompt.source === "openai" && (
              <span className="tag bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 flex items-center gap-1">
                <Award className="w-3 h-3" />
                OpenAI官方
              </span>
            )}
            {prompt.source === "prompts.chat" && (
              <span className="tag bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 flex items-center gap-1">
                <Palette className="w-3 h-3" />
                prompts.chat
              </span>
            )}
            {prompt.tags.filter(t => t !== "OpenAI官方" && t !== "文生图").map((tag) => (
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
        {/* 语言切换按钮 */}
        <div className="absolute top-2 right-2 z-10 flex gap-1">
          <button
            onClick={() => setLanguage(language.startsWith("zh") ? "en" : "zh-CN")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border-2 transition-all ${
              language.startsWith("zh")
                ? "bg-hp-blue text-white border-hp-blue shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:border-hp-blue hover:text-hp-blue"
            }`}
            title="切换中英文"
          >
            {language.startsWith("zh") ? "🇨🇳 中文" : "🇺🇸 English"}
          </button>
        </div>

        <div
          className={`bg-gray-50 rounded-lg p-4 mb-4 transition-all ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
            {displayContent}
          </pre>
        </div>
        <button
          onClick={() => withDetail(() => setExpanded(!expanded))}
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
        <div className="flex gap-2">
          {hasInputFields && (
            <button
              onClick={() => withDetail(() => setShowBuilderModal(true))}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-purple-50 text-purple-700 hover:bg-purple-100 transition-all"
            >
              <Settings className="w-4 h-4" />
              填写参数
            </button>
          )}
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
          <button
            onClick={() => withDetail(() => setShowDetailModal(true))}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all"
          >
            <Eye className="w-4 h-4" />
            查看详情
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">在 AI 中使用：</span>
          <div className="flex gap-2">
            {platformsToShow.slice(0, 3).map((platform) => (
              <button
                key={platform.id}
                onClick={() => openPlatform(platform.id)}
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
                onClick={() => withDetail(() => setShowPlatformModal(true))}
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
      <PromptDetailModal
        prompt={prompt}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
      <PromptBuilderModal
        prompt={prompt}
        isOpen={showBuilderModal}
        onClose={() => setShowBuilderModal(false)}
      />
    </div>
  );
}
