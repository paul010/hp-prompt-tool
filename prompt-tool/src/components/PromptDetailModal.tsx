"use client";

import { X, Copy, Check, BookOpenCheck, LightbulbOff, ExternalLink, Settings } from "lucide-react";
import { Prompt, AIPlatform, InputField } from "../lib/types";
import { AI_PLATFORMS, getPlatformUrl } from "../lib/platforms";
import { useState, useMemo } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { getLocalized } from "../lib/i18n";
import { PromptBuilderModal } from "./PromptBuilderModal";

interface PromptDetailModalProps {
  prompt: Prompt;
  isOpen: boolean;
  onClose: () => void;
}

// 为不同场景的提示词生成示例使用场景
const generateUseScenarios = (prompt: Prompt, displayName: string, displayDescription: string): string[] => {
  const { scenario } = prompt;

  // 基于场景生成具体的使用案例
  const scenarioTemplates: Record<string, string[]> = {
    "办公效率": [
      `处理${displayName}相关的日常工作任务，快速完成${displayDescription.split("，")[0]}`,
      `团队协作中需要${displayName}，提高工作效率和文档质量`,
      `面对紧急的${displayName}需求，快速生成专业内容节省时间`,
    ],
    "数据分析": [
      `对销售数据进行深度分析，生成可视化报告和业务洞察`,
      `分析用户行为数据，发现产品优化机会和增长点`,
      `定期业务数据分析，为管理层提供决策支持报告`,
    ],
    "编程开发": [
      `开发新功能时，生成符合最佳实践的代码框架和示例`,
      `代码审查阶段，检查代码质量并提供优化建议`,
      `遇到技术难题时，获取调试指导和问题解决方案`,
    ],
    "创意写作": [
      `为新产品发布会撰写吸引人的营销文案和宣传材料`,
      `社交媒体运营中，快速生成多样化的内容创意`,
      `企业博客写作，创作有深度的行业分析文章`,
    ],
    "学习培训": [
      `新员工入职培训，${displayName}帮助快速掌握必备技能`,
      `团队技能提升，使用${displayName}进行系统性学习和练习`,
      `自我学习过程中，${displayName}作为私人教师讲解复杂概念`,
    ],
    "客户服务": [
      `处理客户关于产品功能的咨询，提供专业解答`,
      `客户反馈投诉时，使用${displayName}生成合适的回应方案`,
      `为客户服务团队培训，模拟常见问题场景进行练习`,
    ],
    "项目管理": [
      `新项目启动时，使用${displayName}制定详细的项目计划和时间表`,
      `项目执行过程中，跟踪进度并调整资源配置`,
      `项目复盘阶段，总结经验教训并优化后续流程`,
    ],
    "演示汇报": [
      `向客户提案时，使用${displayName}设计有说服力的演示结构`,
      `内部技术分享，整理知识点并制作清晰易懂的幻灯片`,
      `季度汇报会议，用${displayName}梳理工作成果和下阶段计划`,
    ],
    "翻译本地化": [
      `HP 全球产品文档的中英文互译，保持术语一致性`,
      `营销材料本地化，确保文案在不同市场的文化适应性`,
      `技术文档翻译，准确传达专业概念和技术细节`,
    ],
    "销售": [
      `撰写个性化的销售外联邮件，提高客户回复率`,
      `为客户演示准备针对性内容，突出产品价值`,
      `分析销售数据并生成高管汇报总结`,
    ],
    "产品": [
      `用户调研分析，提取关键洞察和需求模式`,
      `产品功能规划，撰写详细的 PRD 文档`,
      `竞品分析报告，识别差异化机会`,
    ],
    "人力资源": [
      `职位描述优化，吸引更合适的候选人`,
      `员工培训材料开发，提升培训效果`,
      `绩效评估反馈，提供专业的成长建议`,
    ],
    "IT支持": [
      `技术文档编写，确保清晰易懂`,
      `故障排查指导，快速定位问题`,
      `系统监控分析，预防潜在问题`,
    ],
    "高管": [
      `战略规划文档，梳理发展路径`,
      `投资者沟通材料，清晰传达价值`,
      `组织变革方案，平稳推动转型`,
    ],
  };

  return scenarioTemplates[scenario] || [
    `在日常工作中使用${displayName}，${displayDescription.split("，")[0]}`,
    `团队协作场景中，利用${displayName}提高沟通效率`,
    `专业任务处理时，通过${displayName}获得高质量输出`,
  ];
};

export function PromptDetailModal({ prompt, isOpen, onClose }: PromptDetailModalProps) {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showBuilderModal, setShowBuilderModal] = useState(false);

  // 获取本地化内容
  const displayName = useMemo(() => {
    if (typeof prompt.name === "string") {
      return language.startsWith("zh") ? (prompt.nameZh || prompt.name) : prompt.name;
    }
    return getLocalized(prompt.name, language);
  }, [prompt.name, prompt.nameZh, language]);

  const displayDescription = useMemo(() => {
    if (typeof prompt.description === "string") return prompt.description;
    return getLocalized(prompt.description, language);
  }, [prompt.description, language]);

  const displayContent = useMemo(() => {
    if (typeof prompt.content === "string") return prompt.content;
    return getLocalized(prompt.content, language);
  }, [prompt.content, language]);

  // 获取 inputFields
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

  if (!isOpen) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(displayContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlatformOpen = (platformId: AIPlatform) => {
    const url = getPlatformUrl(platformId, displayContent);
    window.open(url, "_blank");
  };

  const useScenarios = generateUseScenarios(prompt, displayName, displayDescription);
  const platformsToShow = prompt.recommendedPlatforms.length > 0
    ? AI_PLATFORMS.filter((p) => prompt.recommendedPlatforms.includes(p.id))
    : AI_PLATFORMS.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 模态框内容 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-slide-up">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* 头部 */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-hp-blue/5 to-hp-dark/5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-hp-blue to-hp-dark flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {displayName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {displayName}
              </h3>
              <p className="text-sm text-gray-600">{displayDescription}</p>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                  {prompt.scenario}
                </span>
                <span className={`px-2 py-0.5 text-xs rounded ${
                  prompt.difficulty === "入门" ? "bg-green-100 text-green-700" :
                  prompt.difficulty === "进阶" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {prompt.difficulty}
                </span>
                {prompt.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 可滚动内容区 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 使用场景 */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <LightbulbOff className="w-4 h-4 text-yellow-500" />
              使用场景案例
            </h4>
            <div className="space-y-2">
              {useScenarios.map((scenario, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{scenario}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 提示词内容 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <BookOpenCheck className="w-4 h-4 text-blue-500" />
                提示词内容
              </h4>
              <div className="flex gap-2">
                {hasInputFields && (
                  <button
                    onClick={() => setShowBuilderModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-all"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    填写参数
                  </button>
                )}
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    copied
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      复制
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed">
                {displayContent}
              </pre>
            </div>
          </div>

          {/* 使用建议 */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
            <h5 className="text-sm font-semibold text-amber-800 mb-2">💡 使用建议</h5>
            <ul className="text-xs text-amber-700 space-y-1">
              <li>• 根据具体需求调整提示词中的细节参数</li>
              <li>• 首次使用建议添加 HP 相关的上下文信息</li>
              <li>• 可以要求 AI 提供多个方案进行对比选择</li>
              {hasInputFields && <li>• 点击"填写参数"按钮快速填充占位符内容</li>}
            </ul>
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">在 AI 平台中使用：</span>
            <div className="flex gap-2">
              {platformsToShow.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformOpen(platform.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-gray-200 hover:border-hp-blue hover:bg-white transition-all group"
                  title={platform.description}
                >
                  <span className="text-lg">{platform.icon}</span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {platform.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-hp-blue" />
                </button>
              ))}
              {AI_PLATFORMS.length > 3 && (
                <button
                  onClick={() => {
                    AI_PLATFORMS.slice(3).forEach((p) =>
                      window.open(getPlatformUrl(p.id, displayContent), "_blank")
                    );
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-dashed border-gray-300 hover:border-hp-blue transition-all text-sm text-gray-500"
                >
                  更多平台
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <PromptBuilderModal
        prompt={prompt}
        isOpen={showBuilderModal}
        onClose={() => setShowBuilderModal(false)}
      />
    </div>
  );
}
