// ============================================================
// Scenario Category Mapping Utilities
// Maps old categories to new consolidated taxonomy
// ============================================================

import { BusinessScenario, CoreScenario, SpecializedScenario } from "./types";

/**
 * Old category to new category mapping
 * Maps Prompt.chat's 9+ categories and OpenAI's role-based categories to the new unified taxonomy
 */
export const CATEGORY_MAPPING: Record<string, CoreScenario | SpecializedScenario> = {
  // Prompt.chat old categories → New core scenarios
  "办公效率": "办公沟通",
  "办公沟通": "办公沟通",
  "办公": "办公沟通",

  "数据分析": "数据智能",
  "数据": "数据智能",

  "编程开发": "技术开发",
  "技术开发": "技术开发",
  "编程": "技术开发",

  "创意写作": "内容创作",
  "内容创作": "内容创作",
  "文案": "内容创作",
  "写作": "内容创作",

  "学习培训": "学习成长",
  "学习成长": "学习成长",
  "培训": "学习成长",
  "学习": "学习成长",

  "客户服务": "客户服务",
  "客服": "客户服务",

  "项目管理": "项目管理",

  "演示汇报": "演示演讲",
  "演示": "演示演讲",

  "翻译本地化": "多语言翻译",
  "翻译": "多语言翻译",

  // OpenAI Prompt Pack role-based categories → New scenarios
  "销售": "客户服务", // Sales prompts often customer-facing
  "产品": "商务决策", // Product management involves decision-making
  "人力资源": "办公沟通", // HR involves communication
  "HR": "办公沟通",
  "IT支持": "技术支持",
  "IT": "技术支持",
  "高管": "商务决策", // Executive roles involve decision-making
  "工程师": "技术开发", // Engineers do tech development
  "经理": "项目管理", // Managers handle projects
  "Marketing": "市场营销", // Marketing is self-explanatory
  "市场营销": "市场营销",
  "市场": "市场营销",
};

/**
 * Get the new category for an old category
 */
export function mapCategory(oldCategory: string): CoreScenario | SpecializedScenario {
  return CATEGORY_MAPPING[oldCategory] || "办公沟通"; // Default fallback
}

/**
 * Check if a category is a core scenario
 */
export function isCoreScenario(category: string): category is CoreScenario {
  const coreScenarios: CoreScenario[] = [
    "办公沟通",
    "数据智能",
    "技术开发",
    "内容创作",
    "客户服务",
    "学习成长",
    "项目管理",
    "商务决策",
  ];
  return coreScenarios.includes(category as CoreScenario);
}

/**
 * Check if a category is a specialized scenario
 */
export function isSpecializedScenario(category: string): category is SpecializedScenario {
  const specializedScenarios: SpecializedScenario[] = [
    "多语言翻译",
    "演示演讲",
    "技术支持",
    "市场营销",
  ];
  return specializedScenarios.includes(category as SpecializedScenario);
}

/**
 * Get all core scenarios
 */
export function getCoreScenarios(): CoreScenario[] {
  return [
    "办公沟通",
    "数据智能",
    "技术开发",
    "内容创作",
    "客户服务",
    "学习成长",
    "项目管理",
    "商务决策",
  ];
}

/**
 * Get all specialized scenarios
 */
export function getSpecializedScenarios(): SpecializedScenario[] {
  return [
    "多语言翻译",
    "演示演讲",
    "技术支持",
    "市场营销",
  ];
}

/**
 * Get all valid scenarios (core + specialized)
 */
export function getAllScenarios(): (CoreScenario | SpecializedScenario)[] {
  return [...getCoreScenarios(), ...getSpecializedScenarios()];
}

/**
 * Get scenarios by source (promptchat, openai, or both)
 */
export function getScenariosBySource(source: "promptchat" | "openai" | "all"): (CoreScenario | SpecializedScenario)[] {
  const promptchatScenarios: (CoreScenario | SpecializedScenario)[] = [
    "办公沟通", "数据智能", "技术开发", "内容创作", "客户服务",
    "学习成长", "项目管理", "多语言翻译", "演示演讲",
  ];

  const openaiScenarios: (CoreScenario | SpecializedScenario)[] = [
    "办公沟通", "客户服务", "技术支持", "内容创作", "学习成长",
    "项目管理", "商务决策", "市场营销", "演示演讲",
  ];

  if (source === "promptchat") return promptchatScenarios;
  if (source === "openai") return openaiScenarios;
  return getAllScenarios();
}

/**
 * Normalize scenario name (handles various aliases)
 */
export function normalizeScenarioName(name: string): CoreScenario | SpecializedScenario {
  // Remove whitespace and convert to simplified Chinese if needed
  const trimmed = name.trim();

  // Direct match
  if (getAllScenarios().includes(trimmed as any)) {
    return trimmed as CoreScenario | SpecializedScenario;
  }

  // Try mapping
  return mapCategory(trimmed);
}

/**
 * Get scenario metadata
 */
export interface ScenarioMetadata {
  id: CoreScenario | SpecializedScenario;
  category: "core" | "specialized";
  sources: ("promptchat" | "openai")[];
  aliases: string[];
}

export function getScenarioMetadata(scenario: CoreScenario | SpecializedScenario): ScenarioMetadata {
  const metadata: Record<string, ScenarioMetadata> = {
    "办公沟通": {
      id: "办公沟通",
      category: "core",
      sources: ["promptchat", "openai"],
      aliases: ["办公效率", "办公", "邮件", "文档", "会议"],
    },
    "数据智能": {
      id: "数据智能",
      category: "core",
      sources: ["promptchat"],
      aliases: ["数据分析", "数据", "报表", "SQL", "可视化"],
    },
    "技术开发": {
      id: "技术开发",
      category: "core",
      sources: ["promptchat", "openai"],
      aliases: ["编程开发", "编程", "开发", "代码", "API"],
    },
    "内容创作": {
      id: "内容创作",
      category: "core",
      sources: ["promptchat", "openai"],
      aliases: ["创意写作", "写作", "文案", "文章", "创意"],
    },
    "客户服务": {
      id: "客户服务",
      category: "core",
      sources: ["promptchat", "openai"],
      aliases: ["客服", "支持", "FAQ", "服务"],
    },
    "学习成长": {
      id: "学习成长",
      category: "core",
      sources: ["promptchat", "openai"],
      aliases: ["学习培训", "培训", "学习", "教育", "教程"],
    },
    "项目管理": {
      id: "项目管理",
      category: "core",
      sources: ["promptchat", "openai"],
      aliases: ["项目", "规划", "时间表", "里程碑"],
    },
    "商务决策": {
      id: "商务决策",
      category: "core",
      sources: ["openai"],
      aliases: ["决策", "战略", "分析", "高管"],
    },
    "多语言翻译": {
      id: "多语言翻译",
      category: "specialized",
      sources: ["promptchat"],
      aliases: ["翻译本地化", "翻译", "本地化", "语言"],
    },
    "演示演讲": {
      id: "演示演讲",
      category: "specialized",
      sources: ["promptchat", "openai"],
      aliases: ["演示汇报", "演示", "演讲", "PPT", "路演"],
    },
    "技术支持": {
      id: "技术支持",
      category: "specialized",
      sources: ["openai"],
      aliases: ["IT支持", "IT", "运维", "故障排查"],
    },
    "市场营销": {
      id: "市场营销",
      category: "specialized",
      sources: ["openai"],
      aliases: ["市场", "营销", "推广", "品牌"],
    },
  };

  return metadata[scenario] || {
    id: scenario,
    category: isCoreScenario(scenario) ? "core" : "specialized",
    sources: [],
    aliases: [],
  };
}
