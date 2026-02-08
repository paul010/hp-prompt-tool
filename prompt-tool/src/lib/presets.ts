// ============================================================
// 预设选项配置
// 为不同场景的输入字段提供预设选项
// ============================================================

import { LocalizedContent } from "./types";

// 通用选项值类型
export interface OptionValue {
  value: string;
  label: LocalizedContent;
  keywords?: string[];
}

// 通用职位列表
export const JOB_TITLES: Record<string, OptionValue[]> = {
  sales: [
    { value: "销售代表", label: { en: "Sales Representative", "zh-CN": "销售代表" } },
    { value: "销售总监", label: { en: "Sales Director", "zh-CN": "销售总监" } },
    { value: "客户经理", label: { en: "Account Manager", "zh-CN": "客户经理" } },
    { value: "业务发展经理", label: { en: "Business Development Manager", "zh-CN":"业务发展经理" } },
    { value: "销售副总裁", label: { en: "VP of Sales", "zh-CN":"销售副总裁" } },
  ],
  product: [
    { value: "产品经理", label: { en: "Product Manager", "zh-CN": "产品经理" } },
    { value: "产品总监", label: { en: "Product Director", "zh-CN": "产品总监" } },
    { value: "产品负责人", label: { en: "Product Owner", "zh-CN": "产品负责人" } },
    { value: "高级产品经理", label: { en: "Senior Product Manager", "zh-CN": "高级产品经理" } },
  ],
  hr: [
    { value: "HR专员", label: { en: "HR Specialist", "zh-CN": "HR专员" } },
    { value: "HRBP", label: { en: "HR Business Partner", "zh-CN":"HRBP" } },
    { value: "招聘专员", label: { en: "Recruiter", "zh-CN":"招聘专员" } },
    { value: "培训经理", label: { en: "Training Manager", "zh-CN": "培训经理" } },
    { value: "人力资源总监", label: { en: "HR Director", "zh-CN": "人力资源总监" } },
  ],
  it: [
    { value: "IT支持", label: { en: "IT Support", "zh-CN":"IT支持" } },
    { value: "系统管理员", label: { en: "System Administrator", "zh-CN":"系统管理员" } },
    { value: "DevOps工程师", label: { en: "DevOps Engineer", "zh-CN":"DevOps工程师" } },
    { value: "IT经理", label: { en: "IT Manager", "zh-CN":"IT经理" } },
    { value: "技术支持专员", label: { en: "Technical Support", "zh-CN":"技术支持专员" } },
  ],
  engineering: [
    { value: "软件工程师", label: { en: "Software Engineer", "zh-CN":"软件工程师" } },
    { value: "高级工程师", label: { en: "Senior Engineer", "zh-CN": "高级工程师" } },
    { value: "架构师", label: { en: "Architect", "zh-CN":"架构师" } },
    { value: "技术主管", label: { en: "Tech Lead", "zh-CN":"技术主管" } },
    { value: "CTO", label: { en: "CTO", "zh-CN":"CTO" } },
  ],
  executive: [
    { value: "CEO", label: { en: "CEO", "zh-CN":"CEO" } },
    { value: "总经理", label: { en: "General Manager", "zh-CN":"总经理" } },
    { value: "副总裁", label: { en: "VP", "zh-CN":"副总裁" } },
    { value: "总监", label: { en: "Director", "zh-CN":"总监" } },
    { value: "部门负责人", label: { en: "Department Head", "zh-CN":"部门负责人" } },
  ],
  marketing: [
    { value: "市场专员", label: { en: "Marketing Specialist", "zh-CN":"市场专员" } },
    { value: "品牌经理", label: { en: "Brand Manager", "zh-CN": "品牌经理" } },
    { value: "数字营销", label: { en: "Digital Marketing", "zh-CN":"数字营销" } },
    { value: "内容营销", label: { en: "Content Marketing", "zh-CN":"内容营销" } },
    { value: "市场总监", label: { en: "Marketing Director", "zh-CN":"市场总监" } },
  ],
};

// 通用语言列表
export const LANGUAGE_OPTIONS: OptionValue[] = [
  { value: "English", label: { en: "English", "zh-CN": "英语" } },
  { value: "简体中文", label: { en: "Simplified Chinese", "zh-CN": "简体中文" } },
  { value: "繁體中文", label: { en: "Traditional Chinese", "zh-CN":"繁體中文" } },
  { value: "日本語", label: { en: "Japanese", "zh-CN":"日语" } },
  { value: "한국어", label: { en: "Korean", "zh-CN":"韩语" } },
];

// 地区/国家列表
export const REGION_OPTIONS: OptionValue[] = [
  { value: "中国", label: { en: "China", "zh-CN":"中国" } },
  { value: "美国", label: { en: "United States", "zh-CN":"美国" } },
  { value: "欧洲", label: { en: "Europe", "zh-CN":"欧洲" } },
  { value: "日本", label: { en: "Japan", "zh-CN":"日本" } },
  { value: "韩国", label: { en: "South Korea", "zh-CN":"韩国" } },
  { value: "新加坡", label: { en: "Singapore", "zh-CN":"新加坡" } },
];

// ============================================================
// 场景特定预设选项
// ============================================================

// 办公沟通场景预设
export const COMMUNICATION_PRESETS = {
  emailType: [
    { value: "会议跟进", label: { en: "Meeting Follow-up", "zh-CN":"会议跟进" } },
    { value: "项目更新", label: { en: "Project Update", "zh-CN":"项目更新" } },
    { value: "客户开发", label: { en: "Cold Outreach", "zh-CN":"客户开发" } },
    { value: "内部通知", label: { en: "Internal Announcement", "zh-CN":"内部通知" } },
    { value: "请求协调", label: { en: "Coordination Request", "zh-CN":"请求协调" } },
    { value: "感谢邮件", label: { en: "Thank You", "zh-CN":"感谢邮件" } },
    { value: "道歉邮件", label: { en: "Apology", "zh-CN":"道歉邮件" } },
    { value: "邀请邮件", label: { en: "Invitation", "zh-CN":"邀请邮件" } },
  ],
  emailTone: [
    { value: "正式专业", label: { en: "Formal & Professional", "zh-CN":"正式专业" } },
    { value: "友好亲切", label: { en: "Friendly & Approachable", "zh-CN":"友好亲切" } },
    { value: "紧急重要", label: { en: "Urgent & Important", "zh-CN":"紧急重要" } },
    { value: "说服性强", label: { en: "Persuasive", "zh-CN":"说服性强" } },
    { value: "简洁明了", label: { en: "Concise & Clear", "zh-CN":"简洁明了" } },
  ],
};

// 数据智能场景预设
export const DATA_INTELLIGENCE_PRESETS = {
  dataSource: [
    { value: "销售系统", label: { en: "Sales System", "zh-CN":"销售系统" } },
    { value: "用户行为数据", label: { en: "User Behavior Data", "zh-CN":"用户行为数据" } },
    { value: "财务系统", label: { en: "Financial System", "zh-CN":"财务系统" } },
    { value: "社交媒体", label: { en: "Social Media", "zh-CN":"社交媒体" } },
    { value: "调查问卷", label: { en: "Survey Data", "zh-CN":"调查问卷" } },
    { value: "运营数据", label: { en: "Operations Data", "zh-CN":"运营数据" } },
  ],
  analysisGoal: [
    { value: "趋势分析", label: { en: "Trend Analysis", "zh-CN":"趋势分析" } },
    { value: "用户画像", label: { en: "User Profiling", "zh-CN":"用户画像" } },
    { value: "转化优化", label: { en: "Conversion Optimization", "zh-CN":"转化优化" } },
    { value: "风险评估", label: { en: "Risk Assessment", "zh-CN":"风险评估" } },
    { value: "预测模型", label: { en: "Predictive Modeling", "zh-CN":"预测模型" } },
    { value: "仪表盘设计", label: { en: "Dashboard Design", "zh-CN":"仪表盘设计" } },
  ],
};

// 技术开发场景预设
export const TECH_DEVELOPMENT_PRESETS = {
  programmingLanguage: [
    { value: "Python", label: { en: "Python", "zh-CN":"Python" } },
    { value: "JavaScript", label: { en: "JavaScript", "zh-CN":"JavaScript" } },
    { value: "TypeScript", label: { en: "TypeScript", "zh-CN":"TypeScript" } },
    { value: "Java", label: { en: "Java", "zh-CN":"Java" } },
    { value: "C++", label: { en: "C++", "zh-CN":"C++" } },
    { value: "Go", label: { en: "Go", "zh-CN":"Go" } },
    { value: "Rust", label: { en: "Rust", "zh-CN":"Rust" } },
    { value: "SQL", label: { en: "SQL", "zh-CN":"SQL" } },
  ],
  techDomain: [
    { value: "Web开发", label: { en: "Web Development", "zh-CN":"Web开发" } },
    { value: "移动开发", label: { en: "Mobile Development", "zh-CN":"移动开发" } },
    { value: "数据分析", label: { en: "Data Analysis", "zh-CN":"数据分析" } },
    { value: "机器学习", label: { en: "Machine Learning", "zh-CN":"机器学习" } },
    { value: "DevOps", label: { en: "DevOps", "zh-CN":"DevOps" } },
    { value: "数据库", label: { en: "Database", "zh-CN":"数据库" } },
    { value: "API设计", label: { en: "API Design", "zh-CN":"API设计" } },
  ],
};

// 内容创作场景预设
export const CONTENT_CREATION_PRESETS = {
  contentType: [
    { value: "产品文案", label: { en: "Product Copy", "zh-CN":"产品文案" } },
    { value: "营销邮件", label: { en: "Marketing Email", "zh-CN":"营销邮件" } },
    { value: "社交媒体", label: { en: "Social Media Post", "zh-CN":"社交媒体" } },
    { value: "博客文章", label: { en: "Blog Article", "zh-CN":"博客文章" } },
    { value: "产品描述", label: { en: "Product Description", "zh-CN":"产品描述" } },
    { value: "广告脚本", label: { en: "Ad Script", "zh-CN":"广告脚本" } },
    { value: "视频脚本", label: { en: "Video Script", "zh-CN":"视频脚本" } },
  ],
  writingStyle: [
    { value: "专业正式", label: { en: "Professional", "zh-CN":"专业正式" } },
    { value: "轻松友好", label: { en: "Friendly & Casual", "zh-CN":"轻松友好" } },
    { value: "创意风趣", label: { en: "Creative & Fun", "zh-CN":"创意风趣" } },
    { value: "简洁直接", label: { en: "Concise", "zh-CN":"简洁直接" } },
    { value: "故事叙述", label: { en: "Storytelling", "zh-CN":"故事叙述" } },
    { value: "数据驱动", label: { en: "Data-Driven", "zh-CN":"数据驱动" } },
  ],
};

// 学习成长场景预设
export const LEARNING_PRESETS = {
  learningTopic: [
    { value: "编程开发", label: { en: "Programming", "zh-CN":"编程开发" } },
    { value: "数据分析", label: { en: "Data Analysis", "zh-CN":"数据分析" } },
    { value: "外语学习", label: { en: "Foreign Language", "zh-CN":"外语学习" } },
    { value: "职业技能", label: { en: "Professional Skills", "zh-CN":"职业技能" } },
    { value: "管理技能", label: { en: "Management", "zh-CN":"管理技能" } },
    { value: "技术概念", label: { en: "Technical Concepts", "zh-CN":"技术概念" } },
  ],
  learningGoal: [
    { value: "快速入门", label: { en: "Quick Start", "zh-CN":"快速入门" } },
    { value: "深入理解", label: { en: "Deep Understanding", "zh-CN":"深入理解" } },
    { value: "实战练习", label: { en: "Hands-on Practice", "zh-CN":"实战练习" } },
    { value: "考前复习", label: { en: "Exam Prep", "zh-CN":"考前复习" } },
    { value: "技能认证", label: { en: "Certification", "zh-CN":"技能认证" } },
  ],
};

// ============================================================
// 预设选项主配置
// ============================================================

export const PRESET_OPTIONS: Record<string, OptionValue[]> = {
  // 通用预设
  jobTitle: [...JOB_TITLES.sales, ...JOB_TITLES.product, ...JOB_TITLES.hr, ...JOB_TITLES.it, ...JOB_TITLES.engineering, ...JOB_TITLES.executive, ...JOB_TITLES.marketing],
  language: LANGUAGE_OPTIONS,
  country: REGION_OPTIONS,

  // 办公沟通预设
  emailType: COMMUNICATION_PRESETS.emailType,
  emailTone: COMMUNICATION_PRESETS.emailTone,

  // 数据智能预设
  dataSource: DATA_INTELLIGENCE_PRESETS.dataSource,
  analysisGoal: DATA_INTELLIGENCE_PRESETS.analysisGoal,

  // 技术开发预设
  programmingLanguage: TECH_DEVELOPMENT_PRESETS.programmingLanguage,
  techDomain: TECH_DEVELOPMENT_PRESETS.techDomain,

  // 内容创作预设
  contentType: CONTENT_CREATION_PRESETS.contentType,
  writingStyle: CONTENT_CREATION_PRESETS.writingStyle,

  // 学习成长预设
  learningTopic: LEARNING_PRESETS.learningTopic,
  learningGoal: LEARNING_PRESETS.learningGoal,
};

// 辅助函数：获取预设选项
export function getPresetOptions(presetKey: string): OptionValue[] {
  return PRESET_OPTIONS[presetKey] || [];
}

// 辅助函数：将预设选项转换为 LocalizedContent 格式
export function toLocalizedOptions(options: string[]): LocalizedContent[] {
  return options.map((opt) => ({
    en: opt,
    "zh-CN": opt,
  }));
}

// 辅助函数：根据场景获取建议的职位
export function getJobTitlesByScenario(scenario: string): OptionValue[] {
  const scenarioJobMap: Record<string, keyof typeof JOB_TITLES> = {
    "销售": "sales",
    "产品": "product",
    "人力资源": "hr",
    "IT支持": "it",
    "高管": "executive",
    "技术开发": "engineering",
    "客户服务": "sales", // 客户服务使用销售职位
  };

  const jobKey = scenarioJobMap[scenario];
  return jobKey ? JOB_TITLES[jobKey] : [];
}
