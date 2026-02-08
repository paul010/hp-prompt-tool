import Papa from 'papaparse';
import { Prompt, BusinessScenario, AIPlatform } from './types';
import { OPENAI_PROMPTS } from '@/data/openaiPrompts';

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
        const communityPrompts = convertToPrompts(results.data);
        // 合并社区提示词和 OpenAI 官方提示词
        const allPrompts = [...OPENAI_PROMPTS, ...communityPrompts];
        resolve(allPrompts);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
}

function convertToPrompts(rawData: RawPromptData[]): Prompt[] {
  return rawData.map((row, index) => {
    const forDevs = row.for_devs === 'TRUE';
    const scenario = inferScenario(row.act, row.prompt);

    return {
      id: `prompt-${index}`,
      name: row.act,
      nameZh: row.act,
      description: row.prompt.length > 150 ? row.prompt.substring(0, 150) + '...' : row.prompt,
      content: row.prompt,
      scenario: scenario,
      tags: extractTags(row.act, forDevs),
      forDevelopers: forDevs,
      difficulty: inferDifficulty(row.act, row.prompt, forDevs),
      recommendedPlatforms: inferPlatforms(row.act, row.prompt, scenario, forDevs),
    };
  });
}

function inferScenario(act: string, prompt: string): BusinessScenario {
  const keywords: Record<string, string[]> = {
    '销售': [
      'sales', 'selling', 'outreach', 'prospecting', 'lead', 'deal', 'pipeline', 'quota',
      'proposal', 'commission', 'customer', 'account', 'revenue', 'closing', 'negotiation'
    ],
    '产品': [
      'product', 'feature', 'roadmap', 'prd', 'user story', 'backlog', 'mvp', 'launch',
      'iteration', 'agile', 'scrum', 'kanban', 'stakeholder', 'prioritization'
    ],
    '人力资源': [
      'hr', 'human resources', 'recruit', 'hiring', 'interview', 'onboarding', 'performance',
      'review', 'compensation', 'benefits', 'policy', 'employee', 'training', 'learning'
    ],
    'IT支持': [
      'it', 'support', 'ticket', 'troubleshoot', 'infrastructure', 'server', 'network',
      'security', 'help desk', 'technical support', 'devops', 'system admin'
    ],
    '高管': [
      'executive', 'ceo', 'cto', 'strategy', 'board', 'leadership', 'vision', 'mission',
      'investor', 'stakeholder', 'crisis', 'announcement', 'decision', 'organization'
    ],
    '办公效率': [
      'excel', 'powerpoint', 'email', 'document', 'sheet', 'terminal', 'console', 'linux', 'windows', 'mac',
      'word', 'outlook', 'presentation', 'slide', 'deck', 'office', 'microsoft', 'spreadsheet',
      'calendar', 'schedule', 'meeting', 'note', 'notepad', 'organize', 'copilot'
    ],
    '数据分析': [
      'sql', 'data', 'chart', 'statistic', 'analyze', 'report', 'visualization', 'graph',
      'database', 'query', 'table', 'pivot', 'dashboard', 'metrics', 'kpi'
    ],
    '编程开发': [
      'code', 'developer', 'programming', 'javascript', 'python', 'git', 'api', 'function', 'debug', 'refactor',
      'algorithm', 'variable', 'syntax', 'compile', 'library', 'framework', 'frontend', 'backend'
    ],
    '创意写作': [
      'write', 'story', 'content', 'copy', 'essay', 'creative', 'novel', 'script',
      'blog', 'article', 'headline', 'caption', 'narrative', 'plot'
    ],
    '学习培训': [
      'teacher', 'tutor', 'learn', 'explain', 'education', 'study', 'instructor',
      'course', 'tutorial', 'train', 'instruct', 'example', 'understand'
    ],
    '客户服务': [
      'support', 'service', 'help', 'assistant', 'customer', 'faq',
      'inquiry', 'complaint', 'feedback', 'satisfaction'
    ],
    '项目管理': [
      'project', 'plan', 'manage', 'organize', 'timeline', 'milestone', 'agile',
      'scrum', 'kanban', 'sprint', 'roadmap', 'deadline', 'deliverable'
    ],
    '演示汇报': [
      'presentation', 'slide', 'speech', 'pitch', 'deck',
      'visual', 'diagram', 'chart', 'graph', 'proposal'
    ],
    '翻译本地化': [
      'translate', 'language', 'translation', 'localization', 'locale',
      'chinese', 'english', 'japanese', 'korean', 'multilingual'
    ],
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
  const actLower = act.toLowerCase();

  if (forDevs) tags.push('开发者');

  // 技术标签映射
  const techTags = [
    { keywords: ['javascript', 'js', 'node'], tag: 'JavaScript' },
    { keywords: ['python', 'py'], tag: 'Python' },
    { keywords: ['sql', 'database', 'query'], tag: 'SQL' },
    { keywords: ['git', 'github', 'version'], tag: 'Git' },
    { keywords: ['api', 'rest', 'graphql'], tag: 'API' },
    { keywords: ['react', 'vue', 'angular', 'frontend'], tag: 'Frontend' },
    { keywords: ['node', 'express', 'backend', 'server'], tag: 'Backend' },
    { keywords: ['linux', 'terminal', 'command', 'bash', 'shell'], tag: 'Linux' },
    { keywords: ['excel', 'spreadsheet', 'workbook'], tag: 'Excel' },
    { keywords: ['powerpoint', 'ppt', 'slide', 'presentation'], tag: 'PowerPoint' },
    { keywords: ['word', 'document'], tag: 'Word' },
    { keywords: ['office', 'microsoft', '365'], tag: 'Office' },
    { keywords: ['email', 'outlook'], tag: '邮件' },
    { keywords: ['data', 'analytics'], tag: '数据分析' },
    { keywords: ['code', 'programming'], tag: '编程' },
    { keywords: ['write', 'writing'], tag: '写作' },
    { keywords: ['english'], tag: '英语' },
    { keywords: ['translate', 'translation'], tag: '翻译' },
  ];

  techTags.forEach(({ keywords, tag }) => {
    if (keywords.some(k => actLower.includes(k))) {
      if (!tags.includes(tag)) tags.push(tag);
    }
  });

  return tags;
}

function inferDifficulty(act: string, prompt: string, forDevs: boolean): '入门' | '进阶' | '专家' {
  const length = prompt.length;
  const actLower = act.toLowerCase();
  const promptLower = prompt.toLowerCase();

  // 面向开发者的提示词通常是进阶或专家级
  if (forDevs) {
    if (length < 500) return '进阶';
    return '专家';
  }

  // 基础判断
  if (length < 300) return '入门';
  if (length < 800) return '进阶';

  // 检查是否包含高级关键词
  const advancedKeywords = [
    'architecture', 'optimization', 'security', 'scalability', 'design pattern',
    'strategy', 'comprehensive', 'detailed', 'complex', 'framework', 'advanced',
    'expert', 'professional'
  ];
  if (advancedKeywords.some(k => promptLower.includes(k) || actLower.includes(k))) {
    return '专家';
  }

  return '进阶';
}

function inferPlatforms(act: string, prompt: string, scenario: BusinessScenario, forDevs: boolean): AIPlatform[] {
  let platforms: AIPlatform[] = ['copilot', 'chatgpt', 'claude'];
  const text = `${act} ${prompt}`.toLowerCase();

  // 面向开发者
  if (forDevs) {
    platforms = ['claude', 'chatgpt', 'copilot'];
    if (text.includes('excel') || text.includes('office') || text.includes('microsoft')) {
      platforms = ['copilot', 'claude', 'chatgpt'];
    }
  }

  // 根据场景推荐
  switch (scenario) {
    case '销售':
      platforms = ['copilot', 'chatgpt', 'claude'];
      break;
    case '产品':
      platforms = ['claude', 'chatgpt', 'copilot'];
      break;
    case '人力资源':
      platforms = ['copilot', 'chatgpt', 'claude'];
      break;
    case 'IT支持':
      platforms = ['claude', 'chatgpt', 'copilot'];
      break;
    case '高管':
      platforms = ['claude', 'chatgpt', 'copilot'];
      break;
    case '办公效率':
      platforms = ['copilot', 'chatgpt', 'claude', 'kimi'];
      break;
    case '编程开发':
      platforms = ['claude', 'chatgpt', 'copilot'];
      break;
    case '创意写作':
      platforms = ['chatgpt', 'claude', 'gemini', 'copilot'];
      break;
    case '数据分析':
      platforms = ['copilot', 'claude', 'chatgpt', 'kimi'];
      break;
    case '翻译本地化':
      platforms = ['chatgpt', 'claude', 'wenxin', 'tongyi', 'copilot'];
      break;
    case '学习培训':
      platforms = ['chatgpt', 'claude', 'gemini', 'copilot'];
      break;
    case '客户服务':
      platforms = ['copilot', 'chatgpt', 'claude'];
      break;
    case '项目管理':
      platforms = ['copilot', 'chatgpt', 'claude'];
      break;
    case '演示汇报':
      platforms = ['copilot', 'chatgpt', 'claude'];
      break;
    default:
      platforms = ['copilot', 'chatgpt', 'claude'];
  }

  // 根据内容关键词微调
  if (text.includes('office') || text.includes('excel') || text.includes('powerpoint') || text.includes('word') || text.includes('outlook')) {
    if (!platforms.includes('copilot')) {
      platforms.unshift('copilot');
    }
  }
  if (text.includes('chinese') || text.includes('中文') || text.includes('翻译')) {
    if (!platforms.includes('wenxin')) platforms.push('wenxin');
    if (!platforms.includes('tongyi')) platforms.push('tongyi');
  }

  return [...new Set(platforms)];
}
