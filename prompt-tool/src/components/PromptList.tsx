"use client";

import { useState, useMemo } from "react";
import { Prompt } from "@/lib/types";
import { PromptCard } from "./PromptCard";
import { SearchBar } from "./SearchBar";
import { Sidebar } from "./Sidebar";
import { Pagination } from "./Pagination";
import { ActiveFilters } from "./ActiveFilters";
import { SCENARIOS } from "@/data/prompts";
import { Shield, Zap, Target, Users, Sparkles } from "lucide-react";

interface PromptListProps {
  prompts: Prompt[];
}

export function PromptList({ prompts }: PromptListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScenario, setSelectedScenario] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedSort, setSelectedSort] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);

  // 计算各场景数量
  const scenarioCounts = useMemo(() => {
    const counts: Record<string, number> = { all: prompts.length };
    SCENARIOS.forEach((s) => {
      counts[s.id] = prompts.filter((p) => p.scenario === s.id).length;
    });
    return counts;
  }, [prompts]);

  // 过滤和排序
  const filteredAndSortedPrompts = useMemo(() => {
    let filtered = prompts.filter((prompt) => {
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

    // 排序逻辑
    if (selectedSort === "difficulty") {
      const order: Record<string, number> = { "入门": 1, "进阶": 2, "专家": 3 };
      filtered.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
    } else if (selectedSort === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [prompts, searchQuery, selectedScenario, selectedPlatform, selectedDifficulty, selectedSort]);

  // 分页
  const totalPages = Math.ceil(filteredAndSortedPrompts.length / pageSize);
  const paginatedPrompts = filteredAndSortedPrompts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleClearFilter = (key: string) => {
    switch (key) {
      case "scenario": setSelectedScenario(""); break;
      case "platform": setSelectedPlatform(""); break;
      case "difficulty": setSelectedDifficulty(""); break;
      case "search": setSearchQuery(""); break;
    }
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setSelectedScenario("");
    setSelectedPlatform("");
    setSelectedDifficulty("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* 侧边栏 - 桌面端显示 */}
      <Sidebar
        selectedScenario={selectedScenario}
        onScenarioChange={(s) => { setSelectedScenario(s); setCurrentPage(1); }}
        counts={scenarioCounts}
      />

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 顶部横幅 - AI Summit 2026 主题风格 */}
        <div className="bg-gradient-to-r from-hp-dark via-hp-blue to-hp-light text-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* 主题标签 */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium mb-4">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              AI Summit 2026
            </div>

            {/* 主标题 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
              HP AI Learning Academy
            </h1>

            {/* 副标题 - 核心理念 */}
            <p className="text-lg sm:text-xl text-white/90 mb-4">
              安全 · 实用 · 有目的
            </p>

            {/* 描述文案 */}
            <p className="text-white/80 text-sm sm:text-base max-w-3xl mb-6">
              从动手尝试到系统学习，再到深度探索。精选 <span className="text-white font-semibold">{prompts.length}+</span> 企业场景 AI 提示词，
              以 <span className="text-white font-semibold">Microsoft Copilot</span> 为核心工具生态，
              助力 HP 员工在实际业务场景中建立 AI 应用信心。
            </p>

            {/* 特性标签 */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm">
                <Shield className="w-4 h-4 text-green-300" />
                <span>安全合规</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span>即用即走</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm">
                <Target className="w-4 h-4 text-blue-300" />
                <span>业务导向</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm">
                <Users className="w-4 h-4 text-purple-300" />
                <span>全员参与</span>
              </div>
            </div>
          </div>
        </div>

        {/* 搜索和筛选栏 */}
        <SearchBar
          onSearchChange={setSearchQuery}
          onScenarioChange={(s) => { setSelectedScenario(s); setCurrentPage(1); }}
          onPlatformChange={(p) => { setSelectedPlatform(p); setCurrentPage(1); }}
          onDifficultyChange={(d) => { setSelectedDifficulty(d); setCurrentPage(1); }}
          onSortChange={(s) => { setSelectedSort(s); setCurrentPage(1); }}
          selectedScenario={selectedScenario}
          selectedPlatform={selectedPlatform}
          selectedDifficulty={selectedDifficulty}
          selectedSort={selectedSort}
          searchQuery={searchQuery}
        />

        {/* 活跃筛选条件 */}
        <ActiveFilters
          filters={{
            scenario: selectedScenario,
            platform: selectedPlatform,
            difficulty: selectedDifficulty,
            search: searchQuery,
          }}
          onClear={handleClearFilter}
          onClearAll={handleClearAll}
          scenarioLabel={SCENARIOS.find((s) => s.id === selectedScenario)?.name}
          platformLabel={selectedPlatform ? {
            "copilot": "Copilot M365",
            "chatgpt": "ChatGPT",
            "claude": "Claude",
            "gemini": "Gemini",
            "wenxin": "文心一言",
            "tongyi": "通义千问",
            "kimi": "Kimi",
          }[selectedPlatform] : selectedPlatform}
        />

        {/* 主内容 */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-y-auto">
          {/* 结果统计 */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {filteredAndSortedPrompts.length > 0
                ? `找到 ${filteredAndSortedPrompts.length} 个提示词`
                : "没有找到匹配的提示词"}
            </h2>
            <span className="text-sm text-gray-500 hidden sm:inline">
              共 {prompts.length} 条
            </span>
          </div>

          {/* 网格卡片 */}
          {paginatedPrompts.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {paginatedPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} compact />
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
          <footer className="mt-12 pt-8 border-t border-gray-200 bg-gradient-to-r from-hp-blue/5 to-hp-dark/5">
            <div className="text-center text-sm text-gray-600">
              {/* 品牌标识 */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-8 bg-hp-blue rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">HP AI Learning Academy</span>
              </div>

              <p className="mb-2">
                <strong>HP FY26 数字学院</strong> - AI 提示词库工具
              </p>

              {/* 核心理念 */}
              <p className="text-xs text-gray-500 mb-3">
                以「安全、实用、有目的」为理念，重点推广 Microsoft Copilot 工具生态
              </p>

              <p className="mb-1">
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

              <p className="mt-3 text-xs text-gray-400">
                本工具仅供 HP 内部培训演示使用 • 支持平台：Copilot M365、ChatGPT、Claude、Gemini、文心一言、通义千问、Kimi
              </p>

              {/* AI Summit 标识 */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-400">
                  🎯 AI Summit 2026 主题：赋能未来工作，安全引领转型
                </p>
              </div>
            </div>
          </footer>
        </main>

        {/* 分页 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredAndSortedPrompts.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
        />
      </div>
    </div>
  );
}
