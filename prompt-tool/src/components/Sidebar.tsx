"use client";

import { SCENARIOS } from "@/data/prompts";
import { BookOpenCheck, GraduationCap, Shield, Zap, Crosshair } from "lucide-react";

interface SidebarProps {
  selectedScenario: string;
  onScenarioChange: (scenario: string) => void;
  counts: Record<string, number>;
}

export function Sidebar({ selectedScenario, onScenarioChange, counts }: SidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0 bg-academy-gray-light border-r border-4 border-academy-black p-4 hidden md:block">
      {/* 学习路径指示 */}
      <div className="mb-6 p-4 bg-gradient-to-br from-hp-blue/10 to-hp-dark/10 rounded-xl border border-hp-blue/20">
        <h3 className="text-sm font-semibold text-hp-dark mb-3 flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          学习路径
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-xs">1</div>
            <span className="text-gray-700">动手尝试</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-6 h-6 rounded-full bg-hp-blue text-white flex items-center justify-center font-bold text-xs">2</div>
            <span className="text-gray-700">系统学习</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-6 h-6 rounded-full bg-hp-dark text-white flex items-center justify-center font-bold text-xs">3</div>
            <span className="text-gray-700">深度探索</span>
          </div>
        </div>
      </div>

      {/* 核心理念 */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          核心理念
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-gray-700">
            <Shield className="w-4 h-4 text-green-600" />
            <span>安全合规使用</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Zap className="w-4 h-4 text-yellow-600" />
            <span>实用工具优先</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Crosshair className="w-4 h-4 text-hp-blue" />
            <span>有目的的应用</span>
          </div>
        </div>
      </div>

      {/* 场景导航 */}
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
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
            <BookOpenCheck className="w-4 h-4" />
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

      {/* Copilot 推荐 */}
      <div className="mt-6 p-4 bg-gradient-to-br from-[#00a4ef]/10 to-[#0078d4]/10 rounded-xl border border-[#00a4ef]/30">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🌐</span>
          <div>
            <h4 className="text-sm font-semibold text-academy-black">Microsoft Copilot</h4>
            <p className="text-xs text-gray-600">HP 首选 AI 工具</p>
          </div>
        </div>
        <p className="text-xs text-gray-600">
          深度集成 Office 365，安全合规，专为 HP 企业场景优化
        </p>
      </div>
    </aside>
  );
}
