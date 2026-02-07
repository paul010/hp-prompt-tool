import { PromptList } from "@/components/PromptList";
import { loadPrompts } from "@/lib/data-loader";

export default async function HomePage() {
  const prompts = await loadPrompts();

  return <PromptList prompts={prompts} />;
}
