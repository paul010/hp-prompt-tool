import Papa from 'papaparse';
import { Prompt, BusinessScenario, AIPlatform } from './types';
import { OPENAI_PROMPTS } from '@/data/openaiPrompts';
import { PROMPTS_CHAT_IMAGE_PROMPTS } from '@/data/promptsChatImagePrompts';
import { withPromptsChatImageMetadata } from './promptImageUtils';

// 常见提示词角色翻译映射
const ROLE_TRANSLATIONS: Record<string, { name: string; description?: string }> = {
  // 编程相关
  "linux terminal": { name: "Linux 终端" },
  "developer": { name: "开发者" },
  "programming": { name: "编程助手" },
  "code reviewer": { name: "代码审查员" },
  "software architect": { name: "软件架构师" },
  "web developer": { name: "Web 开发者" },
  "full-stack developer": { name: "全栈开发者" },

  // 写作相关
  "writer": { name: "写作助手" },
  "content writer": { name: "内容撰稿人" },
  "copywriter": { name: "文案撰稿人" },
  "essay writer": { name: "论文写作助手" },
  "storyteller": { name: "故事讲述者" },
  "novelist": { name: "小说家" },
  "screenwriter": { name: "编剧" },
  "journalist": { name: "新闻记者" },

  // 数据相关
  "data analyst": { name: "数据分析师" },
  "data scientist": { name: "数据科学家" },
  "statistician": { name: "统计学家" },
  "excel expert": { name: "Excel 专家" },
  "sql expert": { name: "SQL 专家" },

  // 设计相关
  "designer": { name: "设计师" },
  "ui/ux designer": { name: "UI/UX 设计师" },
  "graphic designer": { name: "平面设计师" },

  // 营销相关
  "marketing consultant": { name: "营销顾问" },
  "social media manager": { name: "社交媒体经理" },
  "seo expert": { name: "SEO 专家" },

  // 教育相关
  "teacher": { name: "教师" },
  "tutor": { name: "导师" },
  "professor": { name: "教授" },
  "educator": { name: "教育工作者" },
  "teaching assistant": { name: "助教" },

  // 商业相关
  "business consultant": { name: "商业顾问" },
  "entrepreneur": { name: "创业者" },
  "startup advisor": { name: "创业顾问" },
  "project manager": { name: "项目经理" },
  "product manager": { name: "产品经理" },

  // 客服相关
  "customer service": { name: "客服代表" },
  "support agent": { name: "支持专员" },
  "sales representative": { name: "销售代表" },

  // 创意相关
  "creative director": { name: "创意总监" },
  "artist": { name: "艺术家" },
  "photographer": { name: "摄影师" },
  "composer": { name: "作曲家" },

  // 技术相关
  "it support": { name: "IT 支持" },
  "system administrator": { name: "系统管理员" },
  "network engineer": { name: "网络工程师" },
  "cybersecurity expert": { name: "网络安全专家" },

  // 语言相关
  "translator": { name: "翻译员" },
  "english teacher": { name: "英语教师" },
  "language tutor": { name: "语言导师" },

  // 其他常见角色
  "assistant": { name: "智能助手" },
  "personal assistant": { name: "个人助理" },
  "virtual assistant": { name: "虚拟助理" },
  "researcher": { name: "研究员" },
  "analyst": { name: "分析师" },
  "consultant": { name: "顾问" },
  "advisor": { name: "顾问" },
  "coach": { name: "教练" },
  "mentor": { name: "导师" },
  "guidance counselor": { name: "指导顾问" },
  "career counselor": { name: "职业顾问" },
  "interviewer": { name: "面试官" },
  "recruiter": { name: "招聘专员" },
  "hr manager": { name: "人力资源经理" },

  // 专业领域
  "lawyer": { name: "律师" },
  "legal consultant": { name: "法律顾问" },
  "doctor": { name: "医生" },
  "nutritionist": { name: "营养师" },
  "fitness coach": { name: "健身教练" },
  "financial advisor": { name: "理财顾问" },
  "accountant": { name: "会计师" },
  "investment advisor": { name: "投资顾问" },
};

// 翻译提示词内容（简单规则）
function translatePromptContent(act: string, content: string): string {
  const actLower = act.toLowerCase().trim();

  // 查找角色翻译
  for (const [english, chinese] of Object.entries(ROLE_TRANSLATIONS)) {
    if (actLower.includes(english) || actLower === english) {
      // 简单的内容翻译策略：在原内容前添加中文说明
      return `[扮演${chinese.name}]\n\n${content}`;
    }
  }

  // 如果没有找到翻译，返回原内容
  return content;
}

// 翻译角色名称
function translateRoleName(act: string): string {
  const actLower = act.toLowerCase().trim();

  for (const [english, chinese] of Object.entries(ROLE_TRANSLATIONS)) {
    if (actLower.includes(english) || actLower === english) {
      return chinese.name;
    }
  }

  // 没有找到翻译，返回原名称
  return act;
}

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
  // 重新加载社区提示词，确保每个分类都有足够的提示词
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
        // 合并所有提示词：OpenAI 官方 + 社区提示词 + prompts.chat 图像提示词
        const allPrompts = [...OPENAI_PROMPTS, ...communityPrompts, ...PROMPTS_CHAT_IMAGE_PROMPTS];
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

    // 使用翻译函数为社区提示词添加中文支持
    const translatedName = translateRoleName(row.act);
    const translatedContent = translatePromptContent(row.act, row.prompt);
    const descriptionText = row.prompt.length > 150 ? row.prompt.substring(0, 150) + '...' : row.prompt;

    const prompt: Prompt = {
      id: `prompt-${index}`,
      name: row.act,
      nameZh: translatedName,
      description: descriptionText,
      descriptionZh: descriptionText,
      content: row.prompt,
      contentZh: translatedContent,
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
