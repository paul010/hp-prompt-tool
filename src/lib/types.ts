// 业务场景类型
export type BusinessScenario =
  | "办公效率"
  | "数据分析"
  | "编程开发"
  | "创意写作"
  | "学习培训"
  | "客户服务"
  | "项目管理"
  | "演示汇报"
  | "翻译本地化";

// AI 平台类型
export type AIPlatform = "chatgpt" | "claude" | "gemini" | "wenxin" | "tongyi" | "kimi";

// 提示词数据结构
export interface Prompt {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  content: string;
  scenario: BusinessScenario;
  tags: string[];
  forDevelopers: boolean;
  difficulty: "入门" | "进阶" | "专家";
  recommendedPlatforms: AIPlatform[];
  category?: string;
  examples?: string[];
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
