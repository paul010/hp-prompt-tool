"use client";

import { SearchCheck, X } from "lucide-react";
import { SCENARIOS, DIFFICULTY_LEVELS } from "@/data/prompts";
import { AI_PLATFORMS } from "@/lib/platforms";
import { useState } from "react";

interface SearchBarProps {
  onSearchChange: (query: string) => void;
  onScenarioChange: (scenario: string) => void;
  onPlatformChange: (platform: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onSortChange?: (sort: string) => void;
  selectedScenario: string;
  selectedPlatform: string;
  selectedDifficulty: string;
  selectedSort?: string;
  searchQuery: string;
}

export function SearchBar({
  onSearchChange,
  onScenarioChange,
  onPlatformChange,
  onDifficultyChange,
  onSortChange,
  selectedScenario,
  selectedPlatform,
  selectedDifficulty,
  selectedSort = "relevance",
  searchQuery,
}: SearchBarProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleClear = () => {
    setLocalQuery("");
    onSearchChange("");
  };

  return (
    <div className="bg-white border-b border-4 border-academy-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* 搜索框 */}
        <div className="relative mb-4">
          <SearchCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={localQuery}
            onChange={(e) => {
              setLocalQuery(e.target.value);
              onSearchChange(e.target.value);
            }}
            placeholder="搜索提示词...（如：邮件、代码、数据分析）"
            className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-4 border-academy-200 rounded-xl focus:ring-2 focus:ring-hp-blue focus:border-transparent outline-none transition-all"
          />
          {localQuery && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* 筛选器 */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* 业务场景筛选 */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">场景:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onScenarioChange("")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedScenario === ""
                    ? "bg-hp-blue text-white"
                    : "bg-gray-100 text-academy-black hover:bg-gray-200"
                }`}
              >
                全部
              </button>
              {SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => onScenarioChange(scenario.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                    selectedScenario === scenario.id
                      ? "bg-hp-blue text-white"
                      : "bg-gray-100 text-academy-black hover:bg-gray-200"
                  }`}
                >
                  <span>{scenario.icon}</span>
                  {scenario.name}
                </button>
              ))}
            </div>
          </div>

          {/* AI 平台筛选 */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">平台:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onPlatformChange("")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedPlatform === ""
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-academy-black hover:bg-gray-200"
                }`}
              >
                全部
              </button>
              {AI_PLATFORMS.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => onPlatformChange(platform.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                    selectedPlatform === platform.id
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-academy-black hover:bg-gray-200"
                  }`}
                  title={platform.description}
                >
                  <span>{platform.icon}</span>
                  {platform.name}
                </button>
              ))}
            </div>
          </div>

          {/* 难度筛选 */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">难度:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onDifficultyChange("")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedDifficulty === ""
                    ? "bg-gray-600 text-white"
                    : "bg-gray-100 text-academy-black hover:bg-gray-200"
                }`}
              >
                全部
              </button>
              {DIFFICULTY_LEVELS.map((level) => (
                <button
                  key={level.id}
                  onClick={() => onDifficultyChange(level.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedDifficulty === level.id
                      ? "bg-gray-600 text-white"
                      : "bg-gray-100 text-academy-black hover:bg-gray-200"
                  }`}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>

          {/* 排序选择器 */}
          {onSortChange && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">排序:</span>
              <select
                value={selectedSort}
                onChange={(e) => onSortChange(e.target.value)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 border-none focus:ring-2 focus:ring-hp-blue cursor-pointer"
              >
                <option value="relevance">相关度</option>
                <option value="difficulty">难度级别</option>
                <option value="name">名称 A-Z</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
