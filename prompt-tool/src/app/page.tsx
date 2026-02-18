import { PromptList } from "../components/PromptList";
import { Hero } from "../components/Hero";
import { CertificationBanner } from "../components/CertificationBanner";
import { QuickStart } from "../components/QuickStart";
import { loadPrompts } from "../lib/data-loader";

export default async function HomePage() {
  const prompts = await loadPrompts();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero 区域 - Corporate Trust 风格 */}
      <Hero />

      {/* 认证横幅 */}
      <CertificationBanner />

      {/* 快速开始 - 三张引导卡片 */}
      <QuickStart />

      {/* 提示词列表 */}
      <div className="bg-white border-t border-slate-200">
        <PromptList prompts={prompts} />
      </div>
    </div>
  );
}
