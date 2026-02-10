import Papa from 'papaparse';
import { Prompt, BusinessScenario, AIPlatform } from './types';
import { OPENAI_PROMPTS } from '@/data/openaiPrompts';
import { withPromptsChatImageMetadata } from './promptImageUtils';

// 数据源 URL - 直接从上游获取
const DATA_SOURCE_URL = 'https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/main/prompts.csv';

export interface RawPromptData {
  act: string;
  prompt: string;
  for_devs: string;
  type: string;
  source_url?: string;
  sourceUrl?: string;
  image_url?: string;
  imageUrl?: string;
  image_alt?: string;
  imageAlt?: string;
  [key: string]: string | undefined;
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
    const sourceUrl = pickFirstNonEmpty(
      row.source_url,
      row.sourceUrl,
      row.source,
      row.url
    );
    const imageUrl = pickFirstNonEmpty(
      row.image_url,
      row.imageUrl,
      row.thumbnail,
      row.image
    );
    const imageAlt = pickFirstNonEmpty(
      row.image_alt,
      row.imageAlt,
      row.image_description
    );

    const prompt: Prompt = {
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
      source: 'community',
      sourceUrl,
      imageUrl,
      imageAlt,
      imageSource: imageUrl ? 'upstream' : undefined,
    };

    return withPromptsChatImageMetadata(prompt);
  });
}

function pickFirstNonEmpty(...values: Array<string | undefined>): string | undefined {
  const nextValue = values.find((value) => typeof value === 'string' && value.trim().length > 0);
  return nextValue?.trim();
}

function inferScenario(act: string, prompt: string): BusinessScenario {
  // 直接使用8个核心分类的关键词进行匹配
  const scenarioKeywords: Record<string, string[]> = {
    '办公协作': [
      // 办公效率相关
      'excel', 'powerpoint', 'email', 'document', 'sheet', 'word', 'outlook',
      'presentation', 'slide', 'deck', 'office', 'microsoft', 'spreadsheet',
      'calendar', 'schedule', 'meeting', 'note', 'notepad', 'organize', 'copilot',
      // 项目管理相关
      'project', 'plan', 'manage', 'organize', 'timeline', 'milestone',
      'agile', 'scrum', 'kanban', 'sprint', 'roadmap', 'deadline', 'deliverable',
      // 人力资源相关
      'hr', 'human resources', 'recruit', 'hiring', 'interview', 'onboarding',
      'performance', 'review', 'compensation', 'benefits', 'policy', 'employee', 'training',
      // 办公沟通
      'communication', 'coordination', 'collaboration', 'teamwork'
    ],
    '数据分析': [
      'sql', 'data', 'chart', 'statistic', 'analyze', 'report', 'visualization', 'graph',
      'database', 'query', 'table', 'pivot', 'dashboard', 'metrics', 'kpi',
      'analytics', 'insight', 'business intelligence', 'etl', 'warehouse'
    ],
    '技术开发': [
      // 编程开发
      'code', 'developer', 'programming', 'javascript', 'python', 'java', 'git',
      'api', 'function', 'debug', 'refactor', 'algorithm', 'variable', 'syntax',
      'compile', 'library', 'framework', 'frontend', 'backend', 'fullstack',
      'software', 'engineering', 'architecture', 'design pattern',
      // IT支持
      'it', 'support', 'ticket', 'troubleshoot', 'infrastructure', 'server', 'network',
      'security', 'help desk', 'technical support', 'devops', 'system admin',
      'linux', 'terminal', 'console', 'bash', 'shell', 'command line'
    ],
    '内容创作': [
      // 创意写作
      'write', 'story', 'content', 'copy', 'essay', 'creative', 'novel', 'script',
      'blog', 'article', 'headline', 'caption', 'narrative', 'plot',
      // 市场营销
      'marketing', 'brand', 'advertising', 'social media', 'influencer',
      'campaign', 'seo', 'sem', 'ppc', 'conversion', 'funnel',
      'sales', 'selling', 'outreach', 'prospecting', 'lead', 'deal', 'negotiation'
    ],
    '客户服务': [
      'support', 'service', 'help', 'assistant', 'customer', 'faq',
      'inquiry', 'complaint', 'feedback', 'satisfaction', 'ticket',
      'call center', 'helpdesk', 'troubleshooting', 'issue', 'problem'
    ],
    '学习成长': [
      'teacher', 'tutor', 'learn', 'explain', 'education', 'study', 'instructor',
      'course', 'tutorial', 'train', 'instruct', 'example', 'understand',
      'coach', 'mentor', 'guide', 'practice', 'exercise', 'quiz', 'test',
      'exam', 'certification', 'skill', 'knowledge'
    ],
    '演示汇报': [
      'presentation', 'slide', 'speech', 'pitch', 'deck',
      'visual', 'diagram', 'chart', 'proposal', 'powerpoint', 'ppt',
      // 翻译本地化
      'translate', 'language', 'translation', 'localization', 'locale',
      'chinese', 'english', 'japanese', 'korean', 'multilingual',
      // 公开演讲
      'public speaking', 'keynote', 'talk', 'conference', 'workshop'
    ],
    '商务决策': [
      // 高管相关
      'executive', 'ceo', 'cto', 'cfo', 'strategy', 'board', 'leadership',
      'vision', 'mission', 'investor', 'stakeholder', 'crisis', 'announcement',
      // 产品相关
      'product management', 'product owner', 'feature', 'roadmap', 'prd',
      'user story', 'backlog', 'mvp', 'launch', 'iteration', 'stakeholder',
      'prioritization', 'market research', 'competitive analysis',
      // 决策相关
      'decision', 'analysis', 'investment', 'funding', 'finance', 'budget',
      'revenue', 'growth', 'startup', 'business model', 'swot', 'pester'
    ],
  };

  const text = `${act} ${prompt}`.toLowerCase();

  // 按优先级顺序检查（从最具体到最通用）
  const priorityOrder: BusinessScenario[] = [
    '商务决策',
    '技术开发',
    '数据分析',
    '内容创作',
    '演示汇报',
    '学习成长',
    '客户服务',
    '办公协作'
  ];

  // 先尝试按优先级匹配
  for (const scenario of priorityOrder) {
    const keywords = scenarioKeywords[scenario];
    if (keywords && keywords.some(word => text.includes(word))) {
      return scenario;
    }
  }

  // 如果都没有匹配，默认为办公协作
  return '办公协作';
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

  // 根据场景推荐（使用新的8个分类）
  switch (scenario) {
    case '办公协作':
      platforms = ['copilot', 'chatgpt', 'claude', 'kimi'];
      break;
    case '数据分析':
      platforms = ['copilot', 'claude', 'chatgpt', 'kimi'];
      break;
    case '技术开发':
      platforms = ['claude', 'chatgpt', 'copilot'];
      break;
    case '内容创作':
      platforms = ['chatgpt', 'claude', 'gemini', 'copilot'];
      break;
    case '客户服务':
      platforms = ['copilot', 'chatgpt', 'claude'];
      break;
    case '学习成长':
      platforms = ['chatgpt', 'claude', 'gemini', 'copilot'];
      break;
    case '演示汇报':
      platforms = ['chatgpt', 'claude', 'wenxin', 'tongyi', 'copilot'];
      break;
    case '商务决策':
      platforms = ['claude', 'chatgpt', 'copilot'];
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
