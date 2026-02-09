// ============================================================
// Scenario Category Mapping Utilities
// 简化的8个核心分类映射
// ============================================================

import { BusinessScenario } from "./types";

/**
 * 旧分类到新分类的映射
 */
export const CATEGORY_MAPPING: Record<string, BusinessScenario> = {
  // Prompt.chat 旧分类 → 新分类
  "办公效率": "办公协作",
  "办公沟通": "办公协作",
  "办公": "办公协作",
  "项目管理": "办公协作",
  "项目": "办公协作",

  "数据分析": "数据分析",
  "数据智能": "数据分析",
  "数据": "数据分析",

  "编程开发": "技术开发",
  "技术开发": "技术开发",
  "编程": "技术开发",
  "技术支持": "技术开发",
  "IT支持": "技术开发",
  "IT": "技术开发",

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

  "演示汇报": "演示汇报",
  "演示演讲": "演示汇报",
  "演示": "演示汇报",
  "翻译本地化": "演示汇报",
  "多语言翻译": "演示汇报",
  "翻译": "演示汇报",

  "商务决策": "商务决策",
  "战略": "商务决策",
  "决策": "商务决策",

  // OpenAI Prompt Pack 岗位分类 → 新分类
  "销售": "客户服务",
  "产品": "商务决策",
  "人力资源": "办公协作",
  "HR": "办公协作",
  "高管": "商务决策",
  "经理": "商务决策",
  "工程师": "技术开发",
  "Marketing": "内容创作",
  "市场营销": "内容创作",
  "市场": "内容创作",
};

/**
 * 获取旧分类对应的新分类
 */
export function mapCategory(oldCategory: string): BusinessScenario {
  return CATEGORY_MAPPING[oldCategory] || "办公协作"; // 默认fallback
}

/**
 * 检查是否为有效的业务场景
 */
export function isValidScenario(category: string): category is BusinessScenario {
  const validScenarios: BusinessScenario[] = getAllScenarios();
  return validScenarios.includes(category as BusinessScenario);
}

/**
 * 获取所有8个核心场景
 */
export function getAllScenarios(): BusinessScenario[] {
  return [
    "办公协作",
    "数据分析",
    "技术开发",
    "内容创作",
    "客户服务",
    "学习成长",
    "演示汇报",
    "商务决策",
  ];
}

/**
 * 标准化场景名称（处理各种别名）
 */
export function normalizeScenarioName(name: string): BusinessScenario {
  const trimmed = name.trim();

  // 直接匹配
  if (isValidScenario(trimmed)) {
    return trimmed as BusinessScenario;
  }

  // 尝试映射
  return mapCategory(trimmed);
}

/**
 * 场景元数据接口
 */
export interface ScenarioMetadata {
  id: BusinessScenario;
  aliases: string[];
}

/**
 * 获取场景元数据
 */
export function getScenarioMetadata(scenario: BusinessScenario): ScenarioMetadata {
  const metadata: Record<BusinessScenario, ScenarioMetadata> = {
    "办公协作": {
      id: "办公协作",
      aliases: ["办公效率", "办公沟通", "办公", "邮件", "文档", "会议", "项目", "项目管理"],
    },
    "数据分析": {
      id: "数据分析",
      aliases: ["数据智能", "数据", "报表", "SQL", "可视化", "分析"],
    },
    "技术开发": {
      id: "技术开发",
      aliases: ["编程开发", "编程", "开发", "代码", "API", "技术支持", "IT支持", "IT"],
    },
    "内容创作": {
      id: "内容创作",
      aliases: ["创意写作", "写作", "文案", "文章", "创意", "市场营销", "市场"],
    },
    "客户服务": {
      id: "客户服务",
      aliases: ["客服", "支持", "FAQ", "服务", "销售"],
    },
    "学习成长": {
      id: "学习成长",
      aliases: ["学习培训", "培训", "学习", "教育", "教程"],
    },
    "演示汇报": {
      id: "演示汇报",
      aliases: ["演示演讲", "演示", "演讲", "PPT", "路演", "翻译本地化", "多语言翻译", "翻译"],
    },
    "商务决策": {
      id: "商务决策",
      aliases: ["决策", "战略", "分析", "高管", "产品"],
    },
  };

  return metadata[scenario] || {
    id: scenario,
    aliases: [],
  };
}
