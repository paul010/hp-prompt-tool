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
// 业务场景类型
// ============================================================

export type BusinessScenario =
  | "办公效率"
  | "数据分析"
  | "编程开发"
  | "创意写作"
  | "学习培训"
  | "客户服务"
  | "项目管理"
  | "演示汇报"
  | "翻译本地化"
  | "销售"
  | "产品"
  | "人力资源"
  | "IT支持"
  | "高管";

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
  | "select"      // 单选
  | "multiselect" // 多选
  | "email"       // 邮箱
  | "url"         // URL
  | "json";       // JSON 数据

// 输入字段定义
export interface InputField {
  name: string;           // 字段标识符（用于占位符）
  label: LocalizedContent; // 显示名称（多语言）
  type: FieldType;        // 字段类型
  required: boolean;      // 是否必填
  placeholder?: LocalizedContent; // 输入提示
  defaultValue?: string;  // 默认值
  options?: LocalizedContent[]; // 选项（用于 select 类型）
  min?: number;          // 最小值/长度
  max?: number;          // 最大值/长度
  multiline?: boolean;   // 是否多行输入
  rows?: number;         // 多行行数
  group?: string;        // 分组标识
  groupName?: LocalizedContent; // 分组显示名称
  order?: number;        // 显示顺序
  hint?: LocalizedContent;      // 填写提示
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
