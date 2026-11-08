"use client";

import { useState, useEffect } from "react";
import type { PromptPage } from "../lib/prompt-query";
import { loadPromptDetail } from "../lib/prompt-detail-client";
import { PromptCard } from "./PromptCard";
import { SearchBar } from "./SearchBar";
import { Sidebar } from "./Sidebar";
import { Pagination } from "./Pagination";
import { ActiveFilters } from "./ActiveFilters";
import { SCENARIOS } from "../data/prompts";
import { Shield, Zap, Crosshair, Users, Sparkles } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";


interface PromptListProps { initialPage: PromptPage; }

export function PromptList({ initialPage }: PromptListProps) {
  const { language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScenario, setSelectedScenario] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedSort, setSelectedSort] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);

  // 从 URL 参数初始化筛选状态 (客户端安全)
  useEffect(() => {
    // 只在客户端执行
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const difficultyParam = urlParams.get('difficulty');
      if (difficultyParam) {
        setSelectedDifficulty(difficultyParam);
        // 滚动到提示词列表区域
        const promptListElement = document.getElementById('prompt-list-section');
        if (promptListElement) {
          promptListElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, []);

  const [result, setResult] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setLoadError('');
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          search: searchQuery, scenario: selectedScenario, platform: selectedPlatform,
          difficulty: selectedDifficulty, sort: selectedSort, language,
          page: String(currentPage), pageSize: String(pageSize),
        });
        const response = await fetch(`/api/prompts?${params}`, { signal: controller.signal });
        if (!response.ok) throw new Error('提示词暂时无法加载，请重试。');
        const next: PromptPage = await response.json();
        if (!next || !Array.isArray(next.prompts) || !next.prompts.every(prompt => typeof prompt.id === 'string' && Array.isArray(prompt.tags) && Array.isArray(prompt.recommendedPlatforms))
          || !Number.isSafeInteger(next.total) || !Number.isSafeInteger(next.totalAll) || !Number.isSafeInteger(next.page)
          || !Number.isSafeInteger(next.totalPages) || !next.counts || typeof next.version !== 'string') {
          throw new Error('列表数据不完整，请重试。');
        }
        if (!controller.signal.aborted) {
          setResult(next);
          if (next.page !== currentPage) setCurrentPage(next.page);
        }
      } catch (error) {
        if (!controller.signal.aborted) setLoadError(error instanceof Error ? error.message : '加载失败，请重试。');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, searchQuery ? 180 : 0);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [searchQuery, selectedScenario, selectedPlatform, selectedDifficulty, selectedSort, language, currentPage, pageSize, retry]);

  const scenarioCounts = result.counts;
  const paginatedPrompts = result.prompts;
  const totalPages = result.totalPages;

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
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* 侧边栏 - 桌面端显示 */}
      <Sidebar
        selectedScenario={selectedScenario}
        onScenarioChange={(s) => { setSelectedScenario(s); setCurrentPage(1); }}
        counts={scenarioCounts}
      />

      {/* 主内容区 */}
      <div id="prompt-list-section" className="flex-1 flex flex-col min-w-0">
        {/* 顶部横幅 - AI Summit 2026 主题风格 */}
        <div className="bg-academy-black text-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
              HP FY26 数字学院
            </h1>

            {/* 副标题 - 核心理念 */}
            <p className="text-lg sm:text-xl text-white/90 mb-4">
              安全 · 实用 · 有目的
            </p>

            {/* 描述文案 */}
            <p className="text-white/80 text-sm sm:text-base max-w-3xl mb-6">
              从动手尝试到系统学习，再到深度探索。精选 <span className="text-white font-semibold">{result.totalAll}+</span> 企业场景 AI 提示词，
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
                <Crosshair className="w-4 h-4 text-blue-300" />
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
          onSearchChange={(query) => { setSearchQuery(query); setCurrentPage(1); }}
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
            <h2 className="text-lg font-semibold text-academy-black">
              {result.total > 0
                ? `找到 ${result.total} 个提示词`
                : "没有找到匹配的提示词"}
            </h2>
            <span className="text-sm text-gray-500 hidden sm:inline">
              共 {result.totalAll} 条
            </span>
          </div>

          {loading && <p role="status" className="mb-4 text-sm text-gray-600">正在加载提示词…</p>}
          {loadError && <div role="alert" className="mb-4 rounded bg-red-50 p-4 text-red-700">
            {loadError} <button onClick={() => setRetry(value => value + 1)} className="underline">重试</button>
          </div>}
          {/* 网格卡片 */}
          {!loading && !loadError && paginatedPrompts.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {paginatedPrompts.map((prompt) => (
                <PromptCard key={`${result.version}:${prompt.id}`} prompt={prompt} compact loadDetail={() => loadPromptDetail(prompt.id, result.version)} />
              ))}
            </div>
          ) : !loading && !loadError ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-academy-black mb-2">
                没有找到匹配的提示词
              </h3>
              <p className="text-gray-500">
                试试调整搜索关键词或筛选条件
              </p>
            </div>
          ) : null}

          {/* 页脚 */}
          <footer className="mt-12 pt-8 border-t border-4 border-academy-black bg-gradient-to-r from-hp-blue/5 to-hp-dark/5">
            <div className="text-center text-sm text-gray-600">
              {/* 品牌标识 */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-8 bg-hp-blue rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-academy-black">HP FY26 数字学院</span>
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
              <div className="mt-4 pt-4 border-t border-4 border-academy-black">
                <p className="text-xs text-gray-400">
                  🎯 AI Summit 2026 主题：赋能未来工作，安全引领转型
                </p>
              </div>
            </div>
          </footer>
        </main>

        {/* 分页 */}
        {!loading && !loadError && <Pagination
          currentPage={result.page}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={result.total}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
        />}
      </div>
    </div>
  );
}
