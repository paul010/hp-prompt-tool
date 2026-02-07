"use client";

import { X, Copy, Check, BookOpen, Lightbulb, ExternalLink } from "lucide-react";
import { Prompt, AIPlatform } from "@/lib/types";
import { AI_PLATFORMS, getPlatformUrl } from "@/lib/platforms";
import { useState } from "react";

interface PromptDetailModalProps {
  prompt: Prompt;
  isOpen: boolean;
  onClose: () => void;
}

// 为不同场景的提示词生成示例使用场景
const generateUseScenarios = (prompt: Prompt): string[] => {
  const { scenario, nameZh, description } = prompt;

  // 基于场景生成具体的使用案例
  const scenarioTemplates: Record<string, string[]> = {
    "办公效率": [
      `处理${nameZh}相关的日常工作任务，快速完成${description.split("，")[0]}`,
      `团队协作中需要${nameZh}，提高工作效率和文档质量`,
      `面对紧急的${nameZh}需求，快速生成专业内容节省时间`,
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
      `新员工入职培训，${nameZh}帮助快速掌握必备技能`,
      `团队技能提升，使用${nameZh}进行系统性学习和练习`,
      `自我学习过程中，${nameZh}作为私人教师讲解复杂概念`,
    ],
    "客户服务": [
      `处理客户关于产品功能的咨询，提供专业解答`,
      `客户反馈投诉时，使用${nameZh}生成合适的回应方案`,
      `为客户服务团队培训，模拟常见问题场景进行练习`,
    ],
    "项目管理": [
      `新项目启动时，使用${nameZh}制定详细的项目计划和时间表`,
      `项目执行过程中，跟踪进度并调整资源配置`,
      `项目复盘阶段，总结经验教训并优化后续流程`,
    ],
    "演示汇报": [
      `向客户提案时，使用${nameZh}设计有说服力的演示结构`,
      `内部技术分享，整理知识点并制作清晰易懂的幻灯片`,
      `季度汇报会议，用${nameZh}梳理工作成果和下阶段计划`,
    ],
    "翻译本地化": [
      `HP 全球产品文档的中英文互译，保持术语一致性`,
      `营销材料本地化，确保文案在不同市场的文化适应性`,
      `技术文档翻译，准确传达专业概念和技术细节`,
    ],
  };

  return scenarioTemplates[scenario] || [
    `在日常工作中使用${nameZh}，${description.split("，")[0]}`,
    `团队协作场景中，利用${nameZh}提高沟通效率`,
    `专业任务处理时，通过${nameZh}获得高质量输出`,
  ];
};

export function PromptDetailModal({ prompt, isOpen, onClose }: PromptDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlatformOpen = (platformId: AIPlatform) => {
    const url = getPlatformUrl(platformId, prompt.content);
    window.open(url, "_blank");
  };

  const useScenarios = generateUseScenarios(prompt);
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
              {prompt.nameZh.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {prompt.nameZh}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{prompt.name}</p>
              <p className="text-sm text-gray-600">{prompt.description}</p>

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
              <Lightbulb className="w-4 h-4 text-yellow-500" />
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
                <BookOpen className="w-4 h-4 text-blue-500" />
                提示词内容
              </h4>
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
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed">
                {prompt.content}
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
                      window.open(getPlatformUrl(p.id, prompt.content), "_blank")
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
    </div>
  );
}
