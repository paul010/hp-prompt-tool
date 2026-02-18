import { PromptList } from "../components/PromptList";
import { Hero } from "../components/Hero";
import { CertificationBanner } from "../components/CertificationBanner";
import { QuickStart } from "../components/QuickStart";
import { loadPrompts } from "../lib/data-loader";

export default async function HomePage() {
  const prompts = await loadPrompts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero 区域 - 大标题、搜索、CTA */}
      <Hero />

      {/* 认证横幅 - 毛玻璃效果 */}
      <CertificationBanner />

      {/* 快速开始 - 三张引导卡片 */}
      <QuickStart />

      {/* 提示词列表 */}
      <div className="bg-white">
        <PromptList prompts={prompts} />
      </div>
    </div>
  );
}
