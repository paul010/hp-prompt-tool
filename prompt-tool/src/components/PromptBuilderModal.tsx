// ============================================================
// 提示词构建器模态框
// 用户通过表单填写占位符，实时预览填充结果
// ============================================================

"use client";

import { useState, useEffect, useMemo } from "react";
import { X, Copy, Check, Eye, EyeOff } from "lucide-react";
import { Prompt, InputField, Language } from "../lib/types";
import { getLocalized } from "../lib/i18n";
import { useLanguage } from "../contexts/LanguageContext";
import {
  fillPlaceholders,
  validatePlaceholders,
  highlightPlaceholders,
} from "../lib/placeholders";

interface PromptBuilderModalProps {
  prompt: Prompt;
  isOpen: boolean;
  onClose: () => void;
}

export function PromptBuilderModal({ prompt, isOpen, onClose }: PromptBuilderModalProps) {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  // 获取内容（兼容多语言和单语言格式）
  const content = typeof prompt.content === "string"
    ? prompt.content
    : getLocalized(prompt.content, language);

  // 获取 inputFields（兼容新格式和旧格式）
  const inputFields = useMemo(() => {
    if (!prompt.inputFields) return [];

    // 如果是旧格式字符串数组，转换为简单的 InputField 对象
    if (Array.isArray(prompt.inputFields) && typeof prompt.inputFields[0] === "string") {
      return (prompt.inputFields as string[]).map((name, index) => ({
        name,
        label: { en: name, "zh-CN": name },
        type: "text" as const,
        required: true,
        order: index,
        group: "default",
      }));
    }

    return prompt.inputFields as InputField[];
  }, [prompt.inputFields]);

  // 按分组和顺序排序的字段
  const sortedFields = useMemo(() => {
    return [...inputFields].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [inputFields]);

  // 按分组组织字段
  const groupedFields = useMemo(() => {
    const groups: Record<string, InputField[]> = {};

    for (const field of sortedFields) {
      const groupName = field.group || "default";
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(field);
    }

    return groups;
  }, [sortedFields]);

  // 表单状态
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initialValues: Record<string, string> = {};
    for (const field of inputFields) {
      initialValues[field.name] = (field as any).defaultValue || "";
    }
    return initialValues;
  });

  // 验证状态
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 计算填充后的内容
  const filledContent = useMemo(() => {
    return fillPlaceholders(content, values);
  }, [content, values]);

  // 验证结果
  const validationResult = useMemo(() => {
    return validatePlaceholders(content, inputFields, values);
  }, [content, inputFields, values]);

  // 处理字段值变化
  const handleFieldChange = (fieldName: string, value: string) => {
    setValues((prev) => ({ ...prev, [fieldName]: value }));
    // 清除该字段的错误
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  // 复制填充后的内容
  const handleCopy = async () => {
    await navigator.clipboard.writeText(filledContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 渲染输入字段
  const renderField = (field: InputField) => {
    const label = getLocalized(field.label, language);
    const placeholder = field.placeholder ? getLocalized(field.placeholder, language) : "";
    const hint = field.hint ? getLocalized(field.hint, language) : "";
    const error = errors[field.name] || validationResult.errors[field.name];

    // 根据 type 渲染不同的输入控件
    let inputElement: React.ReactNode;

    switch (field.type) {
      case "textarea":
        inputElement = (
          <textarea
            value={values[field.name] || ""}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={placeholder}
            rows={field.rows || 4}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hp-blue transition-all ${
              error ? "border-red-300 focus:ring-red-200" : "border-gray-300"
            }`}
          />
        );
        break;

      case "select":
        inputElement = (
          <select
            value={values[field.name] || ""}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hp-blue transition-all bg-white ${
              error ? "border-red-300 focus:ring-red-200" : "border-gray-300"
            }`}
          >
            <option value="">请选择...</option>
            {field.options?.map((option, index) => (
              <option key={index} value={getLocalized(option, language)}>
                {getLocalized(option, language)}
              </option>
            ))}
          </select>
        );
        break;

      case "number":
        inputElement = (
          <input
            type="number"
            value={values[field.name] || ""}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={placeholder}
            min={field.min}
            max={field.max}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hp-blue transition-all ${
              error ? "border-red-300 focus:ring-red-200" : "border-gray-300"
            }`}
          />
        );
        break;

      case "email":
        inputElement = (
          <input
            type="email"
            value={values[field.name] || ""}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hp-blue transition-all ${
              error ? "border-red-300 focus:ring-red-200" : "border-gray-300"
            }`}
          />
        );
        break;

      case "url":
        inputElement = (
          <input
            type="url"
            value={values[field.name] || ""}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hp-blue transition-all ${
              error ? "border-red-300 focus:ring-red-200" : "border-gray-300"
            }`}
          />
        );
        break;

      default: // text
        inputElement = (
          <input
            type="text"
            value={values[field.name] || ""}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hp-blue transition-all ${
              error ? "border-red-300 focus:ring-red-200" : "border-gray-300"
            }`}
          />
        );
    }

    return (
      <div key={field.name} className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {inputElement}
        {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 模态框内容 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* 头部 */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-hp-blue/5 to-hp-dark/5">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            填写提示词参数
          </h3>
          <p className="text-sm text-gray-600">
            根据您的需求填写以下信息，生成个性化提示词
          </p>
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 左侧：表单 */}
            <div className="space-y-4">
              {Object.entries(groupedFields).map(([groupName, fields]) => (
                <div key={groupName} className="space-y-3">
                  {groupName !== "default" && (
                    <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <span className="w-1 h-4 bg-hp-blue rounded"></span>
                      {getLocalized(fields[0].groupName!, language) || groupName}
                    </h4>
                  )}
                  {fields.map((field) => renderField(field))}
                </div>
              ))}
            </div>

            {/* 右侧：预览 */}
            <div className="lg:sticky lg:top-0">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  {showPreview ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  预览结果
                </h4>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  {showPreview ? "隐藏" : "显示"}
                </button>
              </div>

              {showPreview && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed break-words">
                    {filledContent}
                  </pre>
                </div>
              )}

              {/* 复制按钮 */}
              <button
                onClick={handleCopy}
                disabled={!validationResult.isValid}
                className={`w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  validationResult.isValid && inputFields.length > 0
                    ? copied
                      ? "bg-green-100 text-green-700"
                      : "bg-hp-blue text-white hover:bg-hp-dark"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    复制提示词
                  </>
                )}
              </button>

              {/* 验证状态提示 */}
              {inputFields.length > 0 && !validationResult.isValid && (
                <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs text-amber-700">
                    ⚠️ 请填写所有必填字段后再复制
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
