import Papa from 'papaparse';
import { Prompt, BusinessScenario, AIPlatform } from './types';

// 数据源 URL - 直接从上游获取
const DATA_SOURCE_URL = 'https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/main/prompts.csv';

export interface RawPromptData {
  act: string;
  prompt: string;
  for_devs: string;
  type: string;
}

// 从上游 URL 加载提示词（带缓存）
export async function loadPrompts(): Promise<Prompt[]> {
  const response = await fetch(DATA_SOURCE_URL, {
    next: { revalidate: 3600 }, // 缓存1小时
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch prompts: ${response.statusText}`);
  }

  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<RawPromptData>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const prompts = convertToPrompts(results.data);
        resolve(prompts);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
}

function convertToPrompts(rawData: RawPromptData[]): Prompt[] {
  return rawData.map((row, index) => ({
    id: `prompt-${index}`,
    name: row.act,
    nameZh: row.act,
    description: row.prompt.length > 150 ? row.prompt.substring(0, 150) + '...' : row.prompt,
    content: row.prompt,
    scenario: inferScenario(row.act, row.prompt),
    tags: extractTags(row.act, row.for_devs === 'TRUE'),
    forDevelopers: row.for_devs === 'TRUE',
    difficulty: inferDifficulty(row.prompt),
    recommendedPlatforms: inferPlatforms(row.act, row.prompt),
  }));
}

function inferScenario(act: string, prompt: string): BusinessScenario {
  const keywords: Record<string, string[]> = {
    '办公效率': ['excel', 'powerpoint', 'email', 'document', 'sheet', 'terminal', 'console', 'linux', 'windows', 'mac'],
    '数据分析': ['sql', 'data', 'chart', 'statistic', 'analyze', 'report', 'visualization', 'graph'],
    '编程开发': ['code', 'developer', 'programming', 'javascript', 'python', 'git', 'api', 'function', 'debug', 'refactor'],
    '创意写作': ['write', 'story', 'content', 'copy', 'essay', 'creative', 'novel', 'script'],
    '学习培训': ['teacher', 'tutor', 'learn', 'explain', 'education', 'study', 'instructor'],
    '客户服务': ['support', 'service', 'help', 'assistant', 'customer', 'faq'],
    '项目管理': ['project', 'plan', 'manage', 'organize', 'timeline', 'milestone', 'agile'],
    '演示汇报': ['presentation', 'slide', 'speech', 'pitch', 'deck'],
    '翻译本地化': ['translate', 'language', 'translation', 'localization'],
  };

  const text = `${act} ${prompt}`.toLowerCase();
  for (const [scenario, words] of Object.entries(keywords)) {
    if (words.some(word => text.includes(word))) {
      return scenario as BusinessScenario;
    }
  }
  return '办公效率';
}

function extractTags(act: string, forDevs: boolean): string[] {
  const tags: string[] = [];
  if (forDevs) tags.push('开发者');
  // 从 act 名称中提取标签
  const actLower = act.toLowerCase();
  if (actLower.includes('javascript') || actLower.includes('js')) tags.push('JavaScript');
  if (actLower.includes('python')) tags.push('Python');
  if (actLower.includes('sql')) tags.push('SQL');
  if (actLower.includes('git')) tags.push('Git');
  if (actLower.includes('linux') || actLower.includes('terminal')) tags.push('Linux');
  if (actLower.includes('excel')) tags.push('Excel');
  if (actLower.includes('powerpoint') || actLower.includes('ppt')) tags.push('PowerPoint');
  if (actLower.includes('english')) tags.push('英语');
  return tags;
}

function inferDifficulty(prompt: string): '入门' | '进阶' | '专家' {
  const length = prompt.length;
  if (length < 300) return '入门';
  if (length < 800) return '进阶';
  return '专家';
}

function inferPlatforms(act: string, prompt: string): AIPlatform[] {
  // 默认推荐所有平台
  const platforms: AIPlatform[] = ['chatgpt', 'claude'];
  const text = `${act} ${prompt}`.toLowerCase();

  // 根据内容推断推荐平台
  if (text.includes('code') || text.includes('programming') || text.includes('debug')) {
    return ['claude', 'chatgpt'];
  }
  if (text.includes('creative') || text.includes('story') || text.includes('write')) {
    return ['chatgpt', 'claude', 'gemini'];
  }
  if (text.includes('chinese') || text.includes('翻译') || text.includes('中文')) {
    return ['chatgpt', 'claude', 'wenxin', 'tongyi', 'kimi'];
  }

  return platforms;
}
