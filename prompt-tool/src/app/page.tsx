import { PromptList } from "../components/PromptList";
import { CertificationBanner } from "../components/CertificationBanner";
import { QuickStart } from "../components/QuickStart";
import { loadPrompts } from "../lib/data-loader";

export default async function HomePage() {
  const prompts = await loadPrompts();

  return (
    <div>
      {/* 认证横幅 */}
      <CertificationBanner />

      {/* 快速开始 */}
      <QuickStart />

      {/* 提示词列表 */}
      <PromptList prompts={prompts} />
    </div>
  );
}
