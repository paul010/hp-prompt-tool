import Papa from 'papaparse';
import { Prompt, BusinessScenario, AIPlatform } from './types';
import { OPENAI_PROMPTS } from '@/data/openaiPrompts';
import { PROMPTS_CHAT_IMAGE_PROMPTS } from '@/data/promptsChatImagePrompts';
import { withPromptsChatImageMetadata } from './promptImageUtils';
import { getCuratedPrompts } from '@/data/curatedPrompts';

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
  "frontend developer": { name: "前端开发者" },
  "backend developer": { name: "后端开发者" },
  "mobile developer": { name: "移动应用开发者" },
  "devops engineer": { name: "DevOps 工程师" },
  "javascript developer": { name: "JavaScript 开发者" },
  "python developer": { name: "Python 开发者" },
  "java developer": { name: "Java 开发者" },
  "git": { name: "Git 专家" },
  "api": { name: "API 专家" },
  "debugger": { name: "调试专家" },
  "refactoring": { name: "代码重构专家" },
  "tech lead": { name: "技术负责人" },
  "cto": { name: "首席技术官" },

  // 写作相关
  "writer": { name: "写作助手" },
  "content writer": { name: "内容撰稿人" },
  "copywriter": { name: "文案撰稿人" },
  "essay writer": { name: "论文写作助手" },
  "storyteller": { name: "故事讲述者" },
  "novelist": { name: "小说家" },
  "screenwriter": { name: "编剧" },
  "journalist": { name: "新闻记者" },
  "blogger": { name: "博客作者" },
  "technical writer": { name: "技术文档撰写人" },
  "resume": { name: "简历写作专家" },
  "cv": { name: "简历专家" },
  "cover letter": { name: "求职信撰写专家" },

  // 办公软件相关
  "powerpoint": { name: "PPT 制作专家" },
  "presentation": { name: "演示文稿专家" },
  "slides": { name: "幻灯片制作专家" },
  "word": { name: "Word 文档专家" },
  "outlook": { name: "Outlook 邮件专家" },
  "office": { name: "Office 办公专家" },
  "email": { name: "邮件撰写专家" },
  "meeting": { name: "会议记录专家" },
  "note": { name: "笔记整理专家" },
  "calendar": { name: "日程管理专家" },
  "scheduler": { name: "日程安排专家" },
  "planner": { name: "计划制定专家" },
  "organizer": { name: "整理专家" },

  // 数据相关
  "data analyst": { name: "数据分析师" },
  "data scientist": { name: "数据科学家" },
  "data engineer": { name: "数据工程师" },
  "statistician": { name: "统计学家" },
  "statistic": { name: "统计分析专家" },
  "excel expert": { name: "Excel 专家" },
  "sql expert": { name: "SQL 专家" },
  "excel": { name: "Excel 专家" },
  "spreadsheet": { name: "电子表格专家" },
  "chart": { name: "图表制作专家" },
  "data visualization": { name: "数据可视化专家" },
  "visualization": { name: "可视化专家" },
  "business analyst": { name: "商业分析师" },
  "bi analyst": { name: "商业智能分析师" },
  "business intelligence": { name: "商业智能专家" },
  "database": { name: "数据库专家" },
  "machine learning": { name: "机器学习专家" },
  "ml engineer": { name: "机器学习工程师" },
  "data mining": { name: "数据挖掘专家" },
  "etl": { name: "ETL 工程师" },
  "analytics": { name: "分析专家" },
  "tableau": { name: "Tableau 专家" },
  "power bi": { name: "Power BI 专家" },
  "python": { name: "Python 数据分析师" },
  "r": { name: "R 语言分析师" },
  "pandas": { name: "Pandas 数据分析专家" },
  "numpy": { name: "NumPy 数值计算专家" },
  "ai assistant": { name: "AI 助手" },
  "chatgpt": { name: "ChatGPT 助手" },

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
  "instructor": { name: "讲师" },
  "trainer": { name: "培训师" },
  "learning assistant": { name: "学习助手" },
  "study partner": { name: "学习伙伴" },
  "exam prep": { name: "考试准备专家" },
  "homework": { name: "作业辅导专家" },
  "course creator": { name: "课程设计专家" },
  "curriculum": { name: "课程设计专家" },

  // 商业相关
  "business consultant": { name: "商业顾问" },
  "entrepreneur": { name: "创业者" },
  "startup advisor": { name: "创业顾问" },
  "project manager": { name: "项目经理" },
  "product manager": { name: "产品经理" },
  "ceo": { name: "首席执行官" },
  "executive": { name: "高管" },
  "leadership": { name: "领导力教练" },
  "strategy": { name: "战略顾问" },
  "investment": { name: "投资顾问" },
  "funding": { name: "融资顾问" },
  "budget": { name: "预算专家" },
  "revenue": { name: "收入增长顾问" },
  "swot": { name: "SWOT 分析专家" },
  "market research": { name: "市场研究专家" },
  "competitive": { name: "竞争分析专家" },
  "stakeholder": { name: "利益相关者管理" },

  // 客服相关
  "customer service": { name: "客服代表" },
  "support agent": { name: "支持专员" },
  "sales representative": { name: "销售代表" },
  "sales": { name: "销售专家" },
  "customer success": { name: "客户成功经理" },
  "help desk": { name: "技术支持" },
  "faq": { name: "常见问题解答专家" },
  "complaint": { name: "投诉处理专家" },
  "feedback": { name: "反馈处理专家" },

  // 演示汇报相关
  "public speaking": { name: "演讲教练" },
  "keynote": { name: "主题演讲专家" },
  "pitch": { name: "项目路演专家" },
  "proposal": { name: "方案撰写专家" },
  "report": { name: "报告撰写专家" },
  "summary": { name: "总结专家" },
  "translator": { name: "翻译专家" },
  "language": { name: "语言专家" },
  "multilingual": { name: "多语言专家" },

  // 创意相关
  "creative director": { name: "创意总监" },
  "artist": { name: "艺术家" },
  "photographer": { name: "摄影师" },
  "composer": { name: "作曲家" },
  "musician": { name: "音乐家" },
  "video editor": { name: "视频编辑师" },
  "content creator": { name: "内容创作者" },
  "influencer": { name: "网络红人" },
  "brand": { name: "品牌专家" },
  "advertising": { name: "广告专家" },
  "campaign": { name: "营销活动策划" },
  "seo": { name: "SEO 优化专家" },
  "social media": { name: "社交媒体专家" },
  "marketing": { name: "市场营销专家" },
  "negotiation": { name: "谈判专家" },

  // 技术相关
  "it support": { name: "IT 支持" },
  "system administrator": { name: "系统管理员" },
  "network engineer": { name: "网络工程师" },
  "cybersecurity expert": { name: "网络安全专家" },
  "cloud": { name: "云计算专家" },
  "devops": { name: "DevOps 专家" },
  "infrastructure": { name: "基础设施专家" },
  "server": { name: "服务器管理专家" },
  "security": { name: "安全专家" },
  "terminal": { name: "终端专家" },
  "bash": { name: "Bash 脚本专家" },
  "shell": { name: "Shell 脚本专家" },
  "command line": { name: "命令行专家" },

  // 语言相关
  "english teacher": { name: "英语教师" },
  "language tutor": { name: "语言导师" },
  "interpretation": { name: "口译员" },
  "localization": { name: "本地化专家" },
  "chinese": { name: "中文专家" },
  "english": { name: "英文专家" },
  "japanese": { name: "日文专家" },
  "korean": { name: "韩文专家" },
  "french": { name: "法文专家" },
  "spanish": { name: "西班牙文专家" },
  "german": { name: "德文专家" },

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
  "hr": { name: "人力资源" },
  "human resources": { name: "人力资源" },
  "motivational": { name: "激励教练" },
  "life coach": { name: "生活教练" },
  "productivity": { name: "生产力专家" },
  "time management": { name: "时间管理专家" },
  "goal": { name: "目标设定专家" },
  "planning": { name: "规划专家" },
  "organizing": { name: "整理专家" },
  "simplifier": { name: "简化解释专家" },
  "explainer": { name: "解释专家" },
  "fact checker": { name: "事实核查员" },
  "research": { name: "研究专家" },
  "investigator": { name: "调查员" },
  "detective": { name: "侦探" },
  "troubleshooter": { name: "故障排除专家" },
  "problem solver": { name: "问题解决专家" },
  "critical thinking": { name: "批判性思维专家" },
  "logic": { name: "逻辑专家" },
  "philosopher": { name: "哲学家" },
  "psychologist": { name: "心理学家" },
  "therapist": { name: "治疗师" },
  "counselor": { name: "咨询师" },
  "relationship": { name: "关系顾问" },
  "communication": { name: "沟通专家" },
  "negotiator": { name: "谈判专家" },
  "mediator": { name: "调解员" },
  "moderator": { name: "主持人" },
  "facilitator": { name: "引导者" },
  "leader": { name: "领导者" },
  "manager": { name: "管理者" },
  "team builder": { name: "团队建设者" },
  "collaborator": { name: "协作者" },

  // 专业领域
  "lawyer": { name: "律师" },
  "legal consultant": { name: "法律顾问" },
  "attorney": { name: "律师" },
  "doctor": { name: "医生" },
  "physician": { name: "内科医生" },
  "medical": { name: "医疗专家" },
  "health": { name: "健康顾问" },
  "nutritionist": { name: "营养师" },
  "dietitian": { name: "饮食专家" },
  "fitness coach": { name: "健身教练" },
  "personal trainer": { name: "私人教练" },
  "wellness": { name: "健康专家" },
  "mental health": { name: "心理健康专家" },
  "financial advisor": { name: "理财顾问" },
  "accountant": { name: "会计师" },
  "investment advisor": { name: "投资顾问" },
  "tax": { name: "税务专家" },
  "insurance": { name: "保险专家" },
  "real estate": { name: "房地产专家" },
  "agent": { name: "代理人" },
  "broker": { name: "经纪人" },
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
  try {
    // 重新加载社区提示词，确保每个分类都有足够的提示词
    const response = await fetch(DATA_SOURCE_URL, {
      next: { revalidate: 3600 }, // 缓存1小时
      // 增加超时设置，避免长时间等待
      signal: AbortSignal.timeout(30000), // 30秒超时
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
          // 应用精选限制：移除社区提示词中的重复项
          const dedupedPrompts = applyCuratedLimits(allPrompts);
          resolve(dedupedPrompts);
        },
        error: (error: Error) => {
          reject(error);
        },
      });
    });
  } catch (error) {
    // 网络错误或其他错误时，优雅降级到本地数据源
    console.warn('Failed to fetch community prompts from GitHub, using local data only:', error);

    // 只使用本地数据源
    const localPrompts = [...OPENAI_PROMPTS, ...PROMPTS_CHAT_IMAGE_PROMPTS];
    const dedupedPrompts = applyCuratedLimits(localPrompts);

    return dedupedPrompts;
  }
}

/**
 * 应用精选限制，移除特定分类的重复或低质量提示词
 * 对于有精选列表的分类，只保留精选提示词 + 其他分类的提示词
 */
function applyCuratedLimits(prompts: Prompt[]): Prompt[] {
  const curatedScenarios = ['数据分析', '内容创作', '学习成长', '演示汇报']; // 有精选列表的分类

  return prompts.filter((prompt) => {
    // 如果提示词来自精选源，保留
    if (prompt.source === 'curated') {
      return true;
    }

    // 如果提示词属于有精选列表的分类，且不是精选源，则过滤掉
    if (curatedScenarios.includes(prompt.scenario)) {
      return false;
    }

    // 其他分类的提示词保留
    return true;
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
      // 数据处理核心
      'data analyst', 'data scientist', 'data engineer', 'data analysis',
      // SQL & 数据库
      'sql', 'mysql', 'postgresql', 'query', 'select', 'join', 'aggregate',
      'database', 'db', 'schema', 'normalize',
      // 统计分析
      'statistic', 'statistics', 'statistical', 'regression', 'correlation',
      'hypothesis', 'distribution', 'variance', 'standard deviation',
      // 数据可视化
      'chart', 'graph', 'plot', 'visualization', 'visualize', 'dashboard',
      'histogram', 'scatter', 'bar chart', 'line graph', 'heatmap', 'pivot table',
      // 商业智能 & 报告
      'business intelligence', 'bi analyst', 'metrics', 'kpi', 'reporting',
      'analytics', 'insight', 'etl', 'data warehouse', 'datalake',
      // 数据处理
      'data cleaning', 'data wrangling', 'data transformation', 'data mining',
      // 机器学习 & 预测分析
      'machine learning', 'ml engineer', 'prediction model', 'predictive',
      'deep learning', 'neural network', 'clustering', 'classification',
      // 专业工具
      'tableau', 'power bi', 'excel analyst', 'spreadsheet',
      // 分析关键词（限定词，避免过度匹配）
      'analyze data', 'data analysis', 'predictive analysis', 'descriptive'
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
  // 数据分析优先级提升，确保数据相关提示词被正确归类
  const priorityOrder: BusinessScenario[] = [
    '商务决策',
    '数据分析',      // 提升优先级，避免被技术开发抢走
    '技术开发',
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
