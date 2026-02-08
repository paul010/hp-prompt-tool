// ============================================================
// 占位符高亮显示组件
// 用于在提示词内容中高亮显示占位符
// ============================================================

"use client";

import { InputField, Language } from "../lib/types";
import { highlightPlaceholders } from "../lib/placeholders";
import { getLocalized } from "../lib/i18n";

interface PlaceholderHighlightProps {
  content: string;
  inputFields?: InputField[];
  language?: Language;
  className?: string;
}

export function PlaceholderHighlight({
  content,
  inputFields,
  language = "en",
  className = "",
}: PlaceholderHighlightProps) {
  const segments = highlightPlaceholders(content, inputFields);

  return (
    <span className={className}>
      {segments.map((segment, index) => {
        if (segment.type === "placeholder") {
          // 占位符样式
          const field = inputFields?.find((f) => f.name === segment.fieldName);
          const label = field ? getLocalized(field.label, language) : segment.fieldName;

          return (
            <span
              key={index}
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-mono font-medium transition-all ${
                segment.required
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-blue-100 text-blue-700 border border-blue-200"
              }`}
              title={label}
            >
              <span className="select-none">{segment.required ? "●" : "○"}</span>
              {segment.content}
            </span>
          );
        }

        // 普通文本
        return <span key={index}>{segment.content}</span>;
      })}
    </span>
  );
}

/**
 * 多行文本版本（用于 pre 标签）
 */
export function PlaceholderHighlightBlock({
  content,
  inputFields,
  language = "en",
  className = "",
}: PlaceholderHighlightProps) {
  const segments = highlightPlaceholders(content, inputFields);

  return (
    <div className={className}>
      {segments.map((segment, index) => {
        if (segment.type === "placeholder") {
          const field = inputFields?.find((f) => f.name === segment.fieldName);
          const label = field ? getLocalized(field.label, language) : segment.fieldName;

          return (
            <span
              key={index}
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-mono font-medium ${
                segment.required
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
              title={label}
            >
              <span className="select-none">{segment.required ? "●" : "○"}</span>
              {segment.content}
            </span>
          );
        }

        // 处理换行
        const lines = segment.content.split("\n");
        return (
          <span key={index}>
            {lines.map((line, lineIndex) => (
              <span key={lineIndex}>
                {line}
                {lineIndex < lines.length - 1 && "\n"}
              </span>
            ))}
          </span>
        );
      })}
    </div>
  );
}
