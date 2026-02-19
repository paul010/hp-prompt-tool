import { PromptList } from "../components/PromptList";
import { Hero } from "../components/Hero";
import { CertificationBanner } from "../components/CertificationBanner";
import { QuickStart } from "../components/QuickStart";
import { loadPrompts } from "../lib/data-loader";

export default async function HomePage() {
  const prompts = await loadPrompts();

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
        <PromptList prompts={prompts} />
      </div>
    </div>
  );
}
