// ============================================================
// 多语言支持类型
// ============================================================

// 支持的语言类型
export type Language = "en" | "zh-CN" | "zh-TW" | "ja" | "ko";

// 默认语言
export const DEFAULT_LANGUAGE: Language = "en";

// 多语言内容类型
export interface LocalizedContent {
  en: string;      // 英文（必填，作为默认值）
  "zh-CN"?: string; // 简体中文
  "zh-TW"?: string; // 繁体中文
  ja?: string;      // 日本語
  ko?: string;      // 한국어
}

// ============================================================
// 业务场景类型 - 简化的8个核心分类
// ============================================================

// 8个核心业务场景（简化版）
export type BusinessScenario =
  | "办公协作"     // 邮件、会议、文档、即时通讯、项目规划
  | "数据分析"     // 分析、报表、SQL、可视化、商业洞察
  | "技术开发"     // 编程、调试、代码审查、API、IT支持
  | "内容创作"     // 文案、文章、创意写作、营销、品牌
  | "客户服务"     // 支持、FAQ、投诉、成功管理
  | "学习成长"     // 教学、培训、辅导、认证
  | "演示汇报"     // PPT、演讲、培训、路演、多语言
  | "商务决策";    // 战略、投资、分析、决策、规划

// 场景分类配置类型
export interface ScenarioConfig {
  id: BusinessScenario;
  name: string;
  nameEn: string;
  nameZh?: string;
  icon: string;
  color: string;
  description?: string;
}

// 角色标签类型
export type JobRole =
  | "销售"
  | "产品"
  | "HR"
  | "人力资源"
  | "IT"
  | "IT支持"
  | "高管"
  | "工程师"
  | "经理"
  | "Marketing"
  | "客户成功";

export interface JobRoleConfig {
  id: JobRole;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
}

// ============================================================
// AI 平台类型
// ============================================================

export type AIPlatform = "chatgpt" | "claude" | "gemini" | "wenxin" | "tongyi" | "kimi" | "copilot";

// ============================================================
// 输入字段类型（用于占位符系统）
// ============================================================

// 字段类型
export type FieldType =
  | "text"        // 短文本
  | "textarea"    // 长文本/多行
  | "number"      // 数字
  | "date"        // 日期
  | "select"      // 单选（仅预设选项）
  | "multiselect" // 多选（仅预设选项）
  | "combobox"    // 组合框（预设选项 + 自定义输入，单选）
  | "multiselect-combobox" // 组合框（预设选项 + 自定义输入，多选）
  | "email"       // 邮箱
  | "url"         // URL
  | "json";       // JSON 数据

// 预设选项引用类型
export type PresetOptionSource =
  | "jobTitle"     // 职位预设
  | "language"     // 语言预设
  | "country"      // 国家/地区预设
  | "emailType"    // 邮件类型预设
  | "emailTone"    // 邮件语气预设
  | "dataSource"   // 数据来源预设
  | "analysisGoal" // 分析目标预设
  | "programmingLanguage" // 编程语言预设
  | "techDomain"   // 技术领域预设
  | "contentType"  // 内容类型预设
  | "writingStyle" // 写作风格预设
  | "learningTopic" // 学习主题预设
  | "learningGoal"; // 学习目标预设

// 选项值类型（可以是字符串或本地化内容）
export type OptionValue = string | LocalizedContent;

// 输入字段定义
export interface InputField {
  name: string;           // 字段标识符（用于占位符）
  label: LocalizedContent; // 显示名称（多语言）
  type: FieldType;        // 字段类型
  required: boolean;      // 是否必填
  placeholder?: LocalizedContent; // 输入提示
  defaultValue?: string | string[];  // 默认值（combobox类型支持数组）
  options?: OptionValue[]; // 选项值列表（用于 select/multiselect/combobox）
  preset?: PresetOptionSource; // 引用预设配置（简化选项定义）
  min?: number;          // 最小值/长度
  max?: number;          // 最大值/长度
  multiline?: boolean;   // 是否多行输入
  rows?: number;         // 多行行数
  group?: string;        // 分组标识
  groupName?: LocalizedContent; // 分组显示名称
  order?: number;        // 显示顺序
  hint?: LocalizedContent;      // 填写提示

  // Combobox 专用选项
  allowCustomInput?: boolean;  // 是否允许自定义输入（combobox默认true）
  displayPresetChips?: boolean; // 是否显示快速选择标签（combobox专用）
  maxDisplayValues?: number;   // 多选时最多显示多少个选中值
}

// ============================================================
// 提示词数据结构
// ============================================================

export interface Prompt {
  id: string;
  name: string | LocalizedContent;     // 支持旧版字符串和新版多语言
  nameZh?: string;                     // @deprecated 兼容旧版
  description: string | LocalizedContent; // 支持旧版字符串和新版多语言
  content: string | LocalizedContent;  // 支持旧版字符串和新版多语言
  scenario: BusinessScenario;
  tags: string[];
  forDevelopers: boolean;
  difficulty: "入门" | "进阶" | "专家";
  recommendedPlatforms: AIPlatform[];
  category?: string;
  examples?: string[];
  source?: "openai" | "community" | "custom"; // 数据来源
  sourceUrl?: string; // 来源链接
  imageUrl?: string; // 可选图片地址（主要用于 prompts.chat 来源）
  imageAlt?: string; // 图片替代文本
  imageSource?: string; // 图片来源标识
  inputFields?: string[] | InputField[]; // 支持旧版字符串数组和新版 InputField 对象
}

// AI 平台配置
export interface PlatformConfig {
  id: AIPlatform;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
  url: string;
  description: string;
  strengths: string[];
}

// 搜索过滤器
export interface SearchFilters {
  scenario?: BusinessScenario;
  platform?: AIPlatform;
  difficulty?: string;
  forDevelopers?: boolean;
  searchQuery?: string;
}

// 数据加载相关类型
export interface RawPromptData {
  act: string;
  prompt: string;
  for_devs: string;
  type: string;
}
