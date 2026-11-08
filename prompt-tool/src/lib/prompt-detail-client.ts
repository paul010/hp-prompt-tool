import type { Prompt } from './types';
const pending = new Map<string, Promise<Prompt>>();
export function loadPromptDetail(id: string, version: string): Promise<Prompt> {
  const key = `${version}:${id}`;
  if (!pending.has(key)) {
    const request = fetch(`/api/prompts/${encodeURIComponent(id)}?version=${encodeURIComponent(version)}`)
      .then(async response => {
        const body = await response.json();
        if (!response.ok) throw new Error(body.error || '正文加载失败，请重试。');
        if (body.id !== id || !body.content || !Array.isArray(body.tags) || !Array.isArray(body.recommendedPlatforms)) throw new Error('正文数据不完整，请刷新后重试。');
        return body as Prompt;
      }).catch(error => { pending.delete(key); throw error; });
    if (pending.size >= 96) pending.delete(pending.keys().next().value!);
    pending.set(key, request);
  }
  return pending.get(key)!;
}
