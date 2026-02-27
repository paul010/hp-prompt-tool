import { PromptListWrapper } from "../components/PromptListWrapper";
import { Hero } from "../components/Hero";
import { CertificationBanner } from "../components/CertificationBanner";
import { QuickStart } from "../components/QuickStart";
import { loadPrompts } from "../lib/data-loader";
import {
  FEATURED_DATA_ANALYSIS_PROMPTS,
  FEATURED_CONTENT_CREATION_PROMPTS,
  FEATURED_LEARNING_GROWTH_PROMPTS,
  FEATURED_PRESENTATION_PROMPTS,
} from "@/data/curatedPrompts";

export default async function HomePage() {
  const prompts = await loadPrompts();

  // 合并所有精选提示词到主列表
  const allPrompts = [
    ...FEATURED_DATA_ANALYSIS_PROMPTS,
    ...FEATURED_CONTENT_CREATION_PROMPTS,
    ...FEATURED_LEARNING_GROWTH_PROMPTS,
    ...FEATURED_PRESENTATION_PROMPTS,
    ...prompts,
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero 区域 - 数字学院风格 */}
      <Hero />

      {/* 认证横幅 */}
      <CertificationBanner />

      {/* 快速开始 - 三张引导卡片 */}
      <QuickStart />

      {/* 提示词列表 */}
      <div className="border-t-4 border-academy-black">
        <PromptListWrapper prompts={allPrompts} />
      </div>
    </div>
  );
}
