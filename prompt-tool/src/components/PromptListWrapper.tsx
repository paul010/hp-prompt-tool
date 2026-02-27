"use client";

import { Suspense } from "react";
import { PromptList } from "./PromptList";
import { Prompt } from "../lib/types";

interface PromptListWrapperProps {
  prompts: Prompt[];
}

export function PromptListWrapper({ prompts }: PromptListWrapperProps) {
  return (
    <Suspense fallback={<PromptListLoading prompts={prompts} />}>
      <PromptList prompts={prompts} />
    </Suspense>
  );
}

function PromptListLoading({ prompts }: { prompts: Prompt[] }) {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* 侧边栏占位 */}
      <div className="hidden md:block w-64 bg-gray-50 border-r border-gray-200"></div>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 搜索栏占位 */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
        </div>

        {/* 提示词列表占位 */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 h-48 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
