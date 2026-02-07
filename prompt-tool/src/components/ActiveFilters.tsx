"use client";

import { X } from "lucide-react";

interface ActiveFiltersProps {
  filters: {
    scenario?: string;
    platform?: string;
    difficulty?: string;
    search?: string;
  };
  onClear: (key: string) => void;
  onClearAll: () => void;
  scenarioLabel?: string;
  platformLabel?: string;
}

export function ActiveFilters({
  filters,
  onClear,
  onClearAll,
  scenarioLabel,
  platformLabel,
}: ActiveFiltersProps) {
  const activeCount = Object.values(filters).filter(Boolean).length;

  if (activeCount === 0) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 border-b border-blue-100 flex-wrap">
      <span className="text-sm font-medium text-blue-800">筛选条件:</span>
      <div className="flex flex-wrap gap-2">
        {filters.scenario && (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-white rounded border border-blue-200 text-blue-700">
            场景: {scenarioLabel || filters.scenario}
            <button onClick={() => onClear("scenario")} className="hover:text-blue-900">
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
        {filters.platform && (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-white rounded border border-blue-200 text-blue-700">
            平台: {platformLabel || filters.platform}
            <button onClick={() => onClear("platform")} className="hover:text-blue-900">
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
        {filters.difficulty && (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-white rounded border border-blue-200 text-blue-700">
            难度: {filters.difficulty}
            <button onClick={() => onClear("difficulty")} className="hover:text-blue-900">
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
        {filters.search && (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-white rounded border border-blue-200 text-blue-700">
            搜索: {filters.search.length > 15 ? filters.search.slice(0, 15) + "..." : filters.search}
            <button onClick={() => onClear("search")} className="hover:text-blue-900">
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
      </div>
      <button
        onClick={onClearAll}
        className="ml-auto text-xs font-medium text-blue-600 hover:text-blue-800"
      >
        清除全部
      </button>
    </div>
  );
}
