// ============================================================
// 提示词构建器模态框
// 用户通过表单填写占位符，实时预览填充结果
// ============================================================

"use client";

import { useState, useEffect, useMemo } from "react";
import { X, Copy, Check, Eye, EyeOff, ChevronDown } from "lucide-react";
import { Prompt, InputField, Language } from "../lib/types";
import { getLocalized } from "../lib/i18n";
import { useLanguage } from "../contexts/LanguageContext";
import {
  fillPlaceholders,
  validatePlaceholders,
  highlightPlaceholders,
} from "../lib/placeholders";
import {
  getFieldOptions,
  validateSelectValue,
  validateMultiselectValues,
} from "../lib/presetsUtils";
import { Combobox, MultiselectCombobox } from "./ui";

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
  const [values, setValues] = useState<Record<string, string | string[]>>(() => {
    const initialValues: Record<string, string | string[]> = {};
    for (const field of inputFields) {
      if (field.type === "multiselect") {
        initialValues[field.name] = (field as any).defaultValue || [];
      } else {
        initialValues[field.name] = (field as any).defaultValue || "";
      }
    }
    return initialValues;
  });

  // 多选下拉框展开状态
  const [expandedMultiselects, setExpandedMultiselects] = useState<Record<string, boolean>>({});

  // 验证状态
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 计算填充后的内容（处理多选值）
  const filledContent = useMemo(() => {
    const stringValues: Record<string, string> = {};
    for (const [key, value] of Object.entries(values)) {
      if (Array.isArray(value)) {
        stringValues[key] = value.join(", ");
      } else {
        stringValues[key] = value;
      }
    }
    return fillPlaceholders(content, stringValues);
  }, [content, values]);

  // 验证结果
  const validationResult = useMemo(() => {
    const stringValues: Record<string, string> = {};
    for (const [key, value] of Object.entries(values)) {
      if (Array.isArray(value)) {
        stringValues[key] = value.join(", ");
      } else {
        stringValues[key] = value;
      }
    }
    return validatePlaceholders(content, inputFields, stringValues);
  }, [content, inputFields, values]);

  // 处理字段值变化
  const handleFieldChange = (fieldName: string, value: string | string[]) => {
    setValues((prev) => ({ ...prev, [fieldName]: value }));
    // 清除该字段的错误
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  // 处理多选框选项点击
  const handleMultiselectToggle = (fieldName: string, optionValue: string) => {
    const currentValues = (values[fieldName] as string[]) || [];
    const newValues = currentValues.includes(optionValue)
      ? currentValues.filter((v) => v !== optionValue)
      : [...currentValues, optionValue];
    handleFieldChange(fieldName, newValues);
  };

  // 切换多选下拉框展开状态
  const toggleMultiselect = (fieldName: string) => {
    setExpandedMultiselects((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
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

    // 获取选项（支持 preset 和 options）
    const fieldOptions = getFieldOptions(field, language);

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
            className={`w-full px-3 py-2 border rounded-none focus:outline-none focus:ring-2 focus:ring-hp-blue transition-all ${
              error ? "border-red-300 focus:ring-red-200" : "border-4 border-academy-300"
            }`}
          />
        );
        break;

      case "select":
        inputElement = (
          <select
            value={values[field.name] || ""}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className={`w-full px-3 py-2 border rounded-none focus:outline-none focus:ring-2 focus:ring-hp-blue transition-all bg-white ${
              error ? "border-red-300 focus:ring-red-200" : "border-4 border-academy-300"
            }`}
          >
            <option value="">请选择...</option>
            {fieldOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        break;

      case "multiselect":
        const selectedValues = (values[field.name] as string[]) || [];
        inputElement = (
          <div className="relative">
            {/* 选中的值显示 */}
            <div
              onClick={() => toggleMultiselect(field.name)}
              className={`w-full min-h-[42px] px-3 py-2 border rounded-none cursor-pointer transition-all ${
                error ? "border-red-300" : "border-4 border-academy-300"
              } ${
                expandedMultiselects[field.name] ? "ring-2 ring-hp-blue ring-hp-blue/20" : ""
              }`}
            >
              {selectedValues.length === 0 ? (
                <span className="text-gray-400">请选择...</span>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {selectedValues.map((val) => {
                    const option = fieldOptions.find((o) => o.value === val);
                    return (
                      <span
                        key={val}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-hp-blue/10 text-hp-blue rounded-md text-xs"
                      >
                        {option?.label || val}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMultiselectToggle(field.name, val);
                          }}
                          className="hover:text-hp-dark"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
              <ChevronDown
                className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform ${
                  expandedMultiselects[field.name] ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* 下拉选项 */}
            {expandedMultiselects[field.name] && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-4 border-academy-300 rounded-none shadow-lg max-h-60 overflow-y-auto">
                {fieldOptions.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <div
                      key={option.value}
                      onClick={() => handleMultiselectToggle(field.name, option.value)}
                      className={`px-3 py-2 cursor-pointer hover:bg-hp-blue/5 flex items-center gap-2 ${
                        isSelected ? "bg-hp-blue/10" : ""
                      }`}
                    >
                      <div className={`w-4 h-4 border rounded flex items-center justify-center ${
                        isSelected ? "bg-hp-blue border-hp-blue" : "border-4 border-academy-300"
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm">{option.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
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
            className={`w-full px-3 py-2 border rounded-none focus:outline-none focus:ring-2 focus:ring-hp-blue transition-all ${
              error ? "border-red-300 focus:ring-red-200" : "border-4 border-academy-300"
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
            className={`w-full px-3 py-2 border rounded-none focus:outline-none focus:ring-2 focus:ring-hp-blue transition-all ${
              error ? "border-red-300 focus:ring-red-200" : "border-4 border-academy-300"
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
            className={`w-full px-3 py-2 border rounded-none focus:outline-none focus:ring-2 focus:ring-hp-blue transition-all ${
              error ? "border-red-300 focus:ring-red-200" : "border-4 border-academy-300"
            }`}
          />
        );
        break;

      case "combobox":
        inputElement = (
          <Combobox
            name={field.name}
            value={(values[field.name] as string) || ""}
            onChange={(value) => handleFieldChange(field.name, value)}
            options={fieldOptions}
            placeholder={placeholder || "请选择或输入..."}
            displayPresetChips={field.displayPresetChips}
            allowCustomInput={field.allowCustomInput !== false} // 默认允许
            error={!!error}
          />
        );
        break;

      case "multiselect-combobox":
        inputElement = (
          <MultiselectCombobox
            name={field.name}
            values={(values[field.name] as string[]) || []}
            onChange={(value) => handleFieldChange(field.name, value)}
            options={fieldOptions}
            placeholder={placeholder || "请选择或输入..."}
            allowCustomInput={field.allowCustomInput !== false} // 默认允许
            maxDisplayValues={field.maxDisplayValues || 3}
            error={!!error}
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
            className={`w-full px-3 py-2 border rounded-none focus:outline-none focus:ring-2 focus:ring-hp-blue transition-all ${
              error ? "border-red-300 focus:ring-red-200" : "border-4 border-academy-300"
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
        <div className="p-6 border-b border-4 border-academy-100 bg-gradient-to-r from-hp-blue/5 to-hp-dark/5">
          <h3 className="text-xl font-bold text-academy-black mb-1">
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
                <h4 className="text-sm font-semibold text-academy-black flex items-center gap-2">
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
                <div className="bg-gray-50 rounded-none p-4 border border-4 border-academy-200">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed break-words">
                    {filledContent}
                  </pre>
                </div>
              )}

              {/* 复制按钮 */}
              <button
                onClick={handleCopy}
                disabled={!validationResult.isValid}
                className={`w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-none font-medium transition-all ${
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
                <div className="mt-3 p-3 bg-amber-50 rounded-none border border-amber-200">
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
