import type { Prompt, Language } from './types';
import { getLocalized } from './i18n';

export interface PromptPage {
  prompts: Prompt[];
  total: number;
  totalAll: number;
  counts: Record<string, number>;
  page: number;
  pageSize: number;
  totalPages: number;
  version: string;
}

export interface PromptQuery {
  search?: string;
  scenario?: string;
  platform?: string;
  difficulty?: string;
  sort?: string;
  language?: string;
  page?: number;
  pageSize?: number;
}

export function promptSummary(prompt: Prompt): Prompt {
  // Full bodies remain server-side. Metadata retains all existing card controls.
  const { content, contentZh, examples, ...metadata } = prompt;
  return { ...metadata, content: '' };
}

export function queryPrompts(prompts: Prompt[], query: PromptQuery, version: string): PromptPage {
  const language: Language = ['en', 'zh-CN', 'zh-TW', 'ja', 'ko'].includes(query.language || '')
    ? query.language as Language : 'zh-CN';
  const name = (prompt: Prompt) => typeof prompt.name === 'string'
    ? (language.startsWith('zh') ? prompt.nameZh || prompt.name : prompt.name)
    : getLocalized(prompt.name, language);
  const counts: Record<string, number> = { all: prompts.length };
  for (const prompt of prompts) counts[prompt.scenario] = (counts[prompt.scenario] || 0) + 1;
  const search = (query.search || '').toLowerCase();
  const filtered = prompts.filter(prompt => {
    if (query.scenario && prompt.scenario !== query.scenario) return false;
    if (query.platform && !prompt.recommendedPlatforms.includes(query.platform as never)) return false;
    if (query.difficulty && prompt.difficulty !== query.difficulty) return false;
    // Preserve the old full-body, name, description and tag search semantics.
    return !search || name(prompt).toLowerCase().includes(search)
      || getLocalized(prompt.description, language).toLowerCase().includes(search)
      || getLocalized(prompt.content, language).toLowerCase().includes(search)
      || prompt.tags.some(tag => tag.toLowerCase().includes(search));
  });
  if (query.sort === 'name') filtered.sort((a, b) => name(a).localeCompare(name(b)));
  if (query.sort === 'difficulty') {
    const order = { '入门': 1, '进阶': 2, '专家': 3 };
    filtered.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
  }
  const pageSize = [12, 24, 48].includes(query.pageSize || 24) ? query.pageSize || 24 : 24;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const requestedPage = Number.isFinite(query.page) ? Math.floor(query.page!) : 1;
  const page = Math.max(1, Math.min(requestedPage, totalPages || 1));
  return {
    prompts: filtered.slice((page - 1) * pageSize, page * pageSize).map(promptSummary),
    total: filtered.length, totalAll: prompts.length, counts, page, pageSize, totalPages, version,
  };
}
