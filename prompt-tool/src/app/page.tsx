import { PromptListWrapper } from "../components/PromptListWrapper";
import { Hero } from "../components/Hero";
import { CertificationBanner } from "../components/CertificationBanner";
import { QuickStart } from "../components/QuickStart";
import { getPromptCatalog } from "../lib/prompt-catalog";
import { queryPrompts } from "../lib/prompt-query";

export default async function HomePage() {
  const { prompts, version } = await getPromptCatalog();
  const initialPage = queryPrompts(prompts, {}, version);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero 区域 - 数字学院风格 */}
      <Hero />

      {/* 认证横幅 - 已暂时隐藏 */}
      {/* <CertificationBanner /> */}

      {/* 快速开始 - 三张引导卡片 */}
      <QuickStart />

      {/* 提示词列表 */}
      <div className="border-t-4 border-academy-black">
        <PromptListWrapper initialPage={initialPage} />
      </div>
    </div>
  );
}
