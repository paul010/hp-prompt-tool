// ============================================================
// 占位符解析和处理工具
// ============================================================

import { InputField } from "./types";

/**
 * 占位符匹配正则表达式
 * 匹配格式: [field_name] 或 [field_name|type|required|default]
 */
const PLACEHOLDER_REGEX = /\[([^\]]+)\]/g;

/**
 * 扩展占位符格式解析
 * 格式: [name|type|required|default_value|options...]
 */
interface ParsedPlaceholder {
  name: string;           // 字段名称
  type?: string;          // 字段类型
  required?: boolean;     // 是否必填
  defaultValue?: string;  // 默认值
  options?: string[];     // 选项（用于 select）
}

/**
 * 从文本中提取所有占位符
 * @param text 包含占位符的文本
 * @returns 提取的占位符名称数组
 */
export function extractPlaceholders(text: string): string[] {
  const matches = text.match(PLACEHOLDER_REGEX);
  if (!matches) return [];

  return matches.map((match) => {
    // 移除方括号，获取内容
    const content = match.slice(1, -1);
    // 如果包含 |，取第一部分作为名称
    return content.split("|")[0].trim();
  });
}

/**
 * 解析扩展格式的占位符
 * @param placeholder 占位符内容（不含方括号）
 * @returns 解析后的占位符信息
 */
export function parsePlaceholder(placeholder: string): ParsedPlaceholder {
  const parts = placeholder.split("|").map((p) => p.trim());

  return {
    name: parts[0] || "",
    type: parts[1],
    required: parts[2] === "required" || parts[2] === "true",
    defaultValue: parts[3],
    options: parts[4] ? parts[4].split(",").map((o) => o.trim()) : undefined,
  };
}

/**
 * 从文本中提取所有占位符及其元数据
 * @param text 包含占位符的文本
 * @returns 解析后的占位符信息数组
 */
export function extractPlaceholdersWithMeta(text: string): ParsedPlaceholder[] {
  const matches = text.match(PLACEHOLDER_REGEX);
  if (!matches) return [];

  return matches.map((match) => {
    const content = match.slice(1, -1);
    return parsePlaceholder(content);
  });
}

/**
 * 用值替换文本中的占位符
 * @param text 包含占位符的文本
 * @param values 占位符名称到值的映射
 * @returns 替换后的文本
 */
export function fillPlaceholders(text: string, values: Record<string, string>): string {
  return text.replace(PLACEHOLDER_REGEX, (match, placeholder) => {
    const name = placeholder.split("|")[0].trim();
    const value = values[name];

    if (value === undefined || value === null || value === "") {
      // 保留原占位符或返回空字符串
      return match;
    }

    return value;
  });
}

/**
 * 验证必填字段是否都已填写
 * @param text 包含占位符的文本
 * @param inputFields 字段定义
 * @param values 用户填写的值
 * @returns 验证结果
 */
export function validatePlaceholders(
  text: string,
  inputFields: InputField[],
  values: Record<string, string>
): {
  isValid: boolean;
  missingFields: string[];
  errors: Record<string, string>;
} {
  const missingFields: string[] = [];
  const errors: Record<string, string> = {};

  // 检查必填字段
  for (const field of inputFields) {
    if (field.required) {
      const value = values[field.name];
      if (!value || value.trim() === "") {
        missingFields.push(field.name);
        errors[field.name] = "此字段为必填项";
      }
    }

    // 类型验证
    const value = values[field.name];
    if (value && value.trim()) {
      switch (field.type) {
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors[field.name] = "请输入有效的邮箱地址";
          }
          break;
        case "url":
          try {
            new URL(value.startsWith("http") ? value : `https://${value}`);
          } catch {
            errors[field.name] = "请输入有效的 URL";
          }
          break;
        case "number":
          if (isNaN(Number(value))) {
            errors[field.name] = "请输入有效的数字";
          } else {
            // 检查范围
            const num = Number(value);
            if (field.min !== undefined && num < field.min) {
              errors[field.name] = `最小值为 ${field.min}`;
            }
            if (field.max !== undefined && num > field.max) {
              errors[field.name] = `最大值为 ${field.max}`;
            }
          }
          break;
        case "text":
          // 检查长度
          if (field.min !== undefined && value.length < field.min) {
            errors[field.name] = `至少需要 ${field.min} 个字符`;
          }
          if (field.max !== undefined && value.length > field.max) {
            errors[field.name] = `最多允许 ${field.max} 个字符`;
          }
          break;
      }
    }
  }

  return {
    isValid: missingFields.length === 0 && Object.keys(errors).length === 0,
    missingFields,
    errors,
  };
}

/**
 * 高亮文本中的占位符（用于显示）
 * @param text 包含占位符的文本
 * @param inputFields 字段定义
 * @returns 带高亮标记的文本（React 节点数组）
 */
export function highlightPlaceholders(
  text: string,
  inputFields?: InputField[]
): Array<{ type: "text" | "placeholder"; content: string; fieldName?: string; required?: boolean }> {
  const result: Array<{
    type: "text" | "placeholder";
    content: string;
    fieldName?: string;
    required?: boolean;
  }> = [];

  let lastIndex = 0;
  let match;

  // 创建字段查找映射
  const fieldMap = new Map<string, InputField>();
  if (inputFields) {
    for (const field of inputFields) {
      fieldMap.set(field.name, field);
    }
  }

  while ((match = PLACEHOLDER_REGEX.exec(text)) !== null) {
    // 添加匹配前的文本
    if (match.index > lastIndex) {
      result.push({
        type: "text",
        content: text.slice(lastIndex, match.index),
      });
    }

    // 解析占位符
    const placeholder = match[1];
    const name = placeholder.split("|")[0].trim();
    const field = fieldMap.get(name);

    result.push({
      type: "placeholder",
      content: match[0],
      fieldName: name,
      required: field?.required,
    });

    lastIndex = match.index + match[0].length;
  }

  // 添加剩余文本
  if (lastIndex < text.length) {
    result.push({
      type: "text",
      content: text.slice(lastIndex),
    });
  }

  return result;
}

/**
 * 检测文本中是否包含占位符
 */
export function hasPlaceholders(text: string): boolean {
  return PLACEHOLDER_REGEX.test(text);
}

/**
 * 清除文本中的所有占位符
 */
export function clearPlaceholders(text: string): string {
  return text.replace(PLACEHOLDER_REGEX, "");
}

/**
 * 获取占位符的显示名称（用于 UI）
 */
export function getPlaceholderDisplay(name: string, inputFields?: InputField[]): string {
  if (!inputFields) return name;

  const field = inputFields.find((f) => f.name === name);
  return field?.label?.en || name;
}
