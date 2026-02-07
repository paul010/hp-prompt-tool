"use client";

import { SCENARIOS } from "@/data/prompts";

interface SidebarProps {
  selectedScenario: string;
  onScenarioChange: (scenario: string) => void;
  counts: Record<string, number>;
}

export function Sidebar({ selectedScenario, onScenarioChange, counts }: SidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 p-4 hidden md:block">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
        按场景浏览
      </h3>
      <nav className="space-y-1">
        <button
          onClick={() => onScenarioChange("")}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedScenario === ""
              ? "bg-hp-blue text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span className="flex items-center gap-2">
            <span>📚</span>
            全部提示词
          </span>
          <span className={`text-xs ${selectedScenario === "" ? "text-white/80" : "text-gray-400"}`}>
            {counts["all"] || 0}
          </span>
        </button>
        {SCENARIOS.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => onScenarioChange(scenario.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedScenario === scenario.id
                ? "bg-hp-blue text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="flex items-center gap-2">
              <span>{scenario.icon}</span>
              {scenario.name}
            </span>
            <span className={`text-xs ${selectedScenario === scenario.id ? "text-white/80" : "text-gray-400"}`}>
              {counts[scenario.id] || 0}
            </span>
          </button>
        ))}
      </nav>

      {/* 热门标签 */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          热门技能
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Excel', 'Python', 'SQL', '写作', '邮件', 'PPT'].map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
