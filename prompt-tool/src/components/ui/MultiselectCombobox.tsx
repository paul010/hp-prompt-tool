// ============================================================
// MultiselectCombobox Component
// 多选可组合输入框 - 支持从预设选项多选或自定义输入
// ============================================================

"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Plus, Star } from "lucide-react";

interface Option {
  value: string;
  label: string;
  keywords?: string[];
}

interface MultiselectComboboxProps {
  name: string;
  values: string[];
  onChange: (values: string[]) => void;
  options: Option[];
  placeholder?: string;
  allowCustomInput?: boolean; // 是否允许自定义输入（默认true）
  maxDisplayValues?: number; // 最多显示多少个选中值（超出显示+N）
  disabled?: boolean;
  error?: boolean;
}

export function MultiselectCombobox({
  name,
  values,
  onChange,
  options,
  placeholder = "请选择或输入...",
  allowCustomInput = true,
  maxDisplayValues = 3,
  disabled = false,
  error = false,
}: MultiselectComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 获取选中的选项对象
  const selectedOptions = options.filter((opt) => values.includes(opt.value));

  // 计算自定义值（不在预设选项中的值）
  const customValues = values.filter(
    (v) => !options.some((opt) => opt.value === v)
  );

  // 过滤选项（排除已选的）
  const availableOptions = options.filter((opt) => !values.includes(opt.value));

  const filteredOptions = inputValue
    ? availableOptions.filter((option) => {
        const searchLower = inputValue.toLowerCase();
        return (
          option.label.toLowerCase().includes(searchLower) ||
          option.value.toLowerCase().includes(searchLower) ||
          option.keywords?.some((k) => k.toLowerCase().includes(searchLower))
        );
      })
    : availableOptions;

  // 处理移除值
  const handleRemove = (valueToRemove: string) => {
    onChange(values.filter((v) => v !== valueToRemove));
  };

  // 处理添加选项
  const handleAddOption = (option: Option) => {
    onChange([...values, option.value]);
    setInputValue("");
    inputRef.current?.focus();
  };

  // 处理添加自定义值
  const handleAddCustom = () => {
    if (inputValue.trim() && !values.includes(inputValue.trim())) {
      onChange([...values, inputValue.trim()]);
      setInputValue("");
    }
  };

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  // 键盘处理
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const matchedOption = filteredOptions.find(
        (opt) => opt.value.toLowerCase() === inputValue.toLowerCase()
      );

      if (matchedOption) {
        handleAddOption(matchedOption);
      } else if (allowCustomInput) {
        handleAddCustom();
      }
    } else if (e.key === "Backspace" && !inputValue && values.length > 0) {
      // 删除最后一个值
      handleRemove(values[values.length - 1]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setInputValue("");
    }
  };

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setInputValue("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 计算显示的值
  const displayValues = values.slice(0, maxDisplayValues);
  const remainingCount = values.length - maxDisplayValues;

  return (
    <div ref={containerRef} className="relative">
      {/* 已选值和输入框 */}
      <div
        onClick={() => !disabled && inputRef.current?.focus()}
        className={`min-h-[42px] px-3 py-2 border rounded-none focus-within:ring-2 focus-within:ring-hp-blue transition-all bg-white flex flex-wrap gap-2 items-center cursor-text ${
          error ? "border-red-300 focus-within:ring-red-200" : "border-4 border-academy-300"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} ${
          isOpen ? "ring-2 ring-hp-blue/20" : ""
        }`}
      >
        {/* 已选值标签 */}
        {displayValues.map((val) => {
          const option = options.find((opt) => opt.value === val);
          const isCustom = !option;
          return (
            <span
              key={val}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs ${
                isCustom
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "bg-hp-blue/10 text-hp-blue"
              }`}
            >
              {isCustom && <Star className="w-3 h-3 fill-amber-400 text-amber-400" />}
              {option?.label || val}
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(val);
                  }}
                  aria-label={`移除 ${option?.label || val}`}
                  className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          );
        })}

        {/* 剩余数量指示器 */}
        {remainingCount > 0 && (
          <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs">
            +{remainingCount} 更多
          </span>
        )}

        {/* 输入框 */}
        {!disabled && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={values.length === 0 ? placeholder : ""}
            className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
          />
        )}

        {/* 下拉箭头 */}
        {!disabled && (
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </div>

      {/* 下拉选项列表 */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-4 border-academy-300 rounded-none shadow-lg max-h-60 overflow-y-auto">
          {/* 匹配的预设选项 */}
          {filteredOptions.length > 0 && (
            <>
              <div className="px-3 py-2 bg-gray-50 border-b border-4 border-academy-200">
                <p className="text-xs text-gray-500 font-medium">预设选项</p>
              </div>
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleAddOption(option)}
                  className="px-3 py-2 cursor-pointer hover:bg-hp-blue/5 flex items-center gap-2"
                >
                  <div className="w-4 h-4 border border-4 border-academy-300 rounded flex-shrink-0" />
                  <span className="text-sm">{option.label}</span>
                </div>
              ))}
            </>
          )}

          {/* 添加自定义值选项 */}
          {allowCustomInput && inputValue.trim() && !filteredOptions.some(
            (opt) => opt.value.toLowerCase() === inputValue.toLowerCase()
          ) && (
            <div
              onClick={handleAddCustom}
              className="px-3 py-2 cursor-pointer hover:bg-amber-50 border-t border-4 border-academy-200 flex items-center gap-2 text-amber-700"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">添加自定义值: "{inputValue.trim()}"</span>
            </div>
          )}

          {/* 无结果提示 */}
          {filteredOptions.length === 0 && (!inputValue || !allowCustomInput) && (
            <div className="px-3 py-4 text-center text-gray-500 text-sm">
              {inputValue ? "未找到匹配的选项" : "没有可选的预设值"}
            </div>
          )}
        </div>
      )}

      {/* 提示信息 */}
      {values.length > 0 && customValues.length > 0 && (
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-amber-600">
            {customValues.length} 个自定义值
          </span>
        </div>
      )}
    </div>
  );
}
