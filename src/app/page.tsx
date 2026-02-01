"use client";

import { useState, useMemo } from "react";
import { PromptCard } from "@/components/PromptCard";
import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/Header";
import { DEMO_PROMPTS } from "@/data/prompts";
import { Prompt } from "@/lib/types";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScenario, setSelectedScenario] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  // 过滤提示词
  const filteredPrompts = useMemo(() => {
    return DEMO_PROMPTS.filter((prompt) => {
      // 搜索过滤
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          prompt.nameZh.toLowerCase().includes(query) ||
          prompt.name.toLowerCase().includes(query) ||
          prompt.description.toLowerCase().includes(query) ||
          prompt.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          prompt.content.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // 场景过滤
      if (selectedScenario && prompt.scenario !== selectedScenario) {
        return false;
      }

      // 难度过滤
      if (selectedDifficulty && prompt.difficulty !== selectedDifficulty) {
        return false;
      }

      // 平台过滤（检查是否推荐该平台）
      if (selectedPlatform) {
        if (!prompt.recommendedPlatforms.includes(selectedPlatform as any)) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedScenario, selectedPlatform, selectedDifficulty]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 搜索和筛选栏 */}
      <SearchBar
        onSearchChange={setSearchQuery}
        onScenarioChange={setSelectedScenario}
        onPlatformChange={setSelectedPlatform}
        onDifficultyChange={setSelectedDifficulty}
        selectedScenario={selectedScenario}
        selectedPlatform={selectedPlatform}
        selectedDifficulty={selectedDifficulty}
        searchQuery={searchQuery}
      />

      {/* 主要内容区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 结果统计 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {searchQuery || selectedScenario || selectedPlatform || selectedDifficulty
              ? `找到 ${filteredPrompts.length} 个提示词`
              : "全部提示词"}
          </h2>
          <span className="text-sm text-gray-500">
            共 {filteredPrompts.length} / {DEMO_PROMPTS.length} 条
          </span>
        </div>

        {/* 提示词列表 */}
        {filteredPrompts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            {filteredPrompts.map((prompt, index) => (
              <div
                key={prompt.id}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <PromptCard prompt={prompt} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              没有找到匹配的提示词
            </h3>
            <p className="text-gray-500">
              试试调整搜索关键词或筛选条件
            </p>
          </div>
        )}

        {/* 页脚 */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">
              <strong>HP FY26 数字学院</strong> - AI 提示词库工具
            </p>
            <p>
              数据来源:{" "}
              <a
                href="https://prompts.chat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-hp-blue hover:underline"
              >
                prompts.chat
              </a>{" "}
              (CC0 许可)
            </p>
            <p className="mt-2 text-xs">
              本工具仅供内部培训演示使用 • 支持 ChatGPT、Claude、Gemini、文心一言、通义千问、Kimi
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
