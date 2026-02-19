// ============================================================
// Combobox Component
// 可组合输入框 - 支持从预设选项选择或自定义输入
// ============================================================

"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
  keywords?: string[];
}

interface ComboboxProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  displayPresetChips?: boolean; // 是否在输入框下方显示预设选项标签
  allowCustomInput?: boolean; // 是否允许自定义输入（默认true）
  disabled?: boolean;
  error?: boolean;
}

export function Combobox({
  name,
  value,
  onChange,
  options,
  placeholder = "请选择或输入...",
  displayPresetChips = false,
  allowCustomInput = true,
  disabled = false,
  error = false,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // 初始化 inputValue
  useEffect(() => {
    if (value) {
      const selectedOption = options.find((opt) => opt.value === value);
      setInputValue(selectedOption?.label || value);
    } else {
      setInputValue("");
    }
  }, [value, options]);

  // 过滤选项
  const filteredOptions = inputValue
    ? options.filter((option) => {
        const searchLower = inputValue.toLowerCase();
        return (
          option.label.toLowerCase().includes(searchLower) ||
          option.value.toLowerCase().includes(searchLower) ||
          option.keywords?.some((k) => k.toLowerCase().includes(searchLower))
        );
      })
    : options;

  // 检查当前值是否在预设选项中
  const isValueInPreset = options.some((opt) => opt.value === value);

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (!allowCustomInput) {
      // 如果不允许自定义输入，则不改变实际值
      setIsOpen(true);
      return;
    }

    // 如果允许自定义输入，则直接使用输入的值
    onChange(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  // 处理选项选择
  const handleSelectOption = (option: Option) => {
    setInputValue(option.label);
    onChange(option.value);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  // 清除选择
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInputValue("");
    onChange("");
    inputRef.current?.focus();
  };

  // 键盘导航
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelectOption(filteredOptions[highlightedIndex]);
        } else if (allowCustomInput && inputValue) {
          // 使用自定义输入
          onChange(inputValue);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
      case "Tab":
        if (isOpen) {
          setIsOpen(false);
        }
        break;
    }
  };

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 滚动高亮项到视图
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  return (
    <div ref={containerRef} className="relative">
      {/* 输入框 */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-3 py-2 pr-20 border rounded-none focus:outline-none focus:ring-2 focus:ring-hp-blue transition-all bg-white ${
            error ? "border-red-300 focus:ring-red-200" : "border-4 border-academy-300"
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} ${
            isOpen ? "ring-2 ring-hp-blue/20" : ""
          }`}
        />

        {/* 右侧按钮组 */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="清除选择"
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              tabIndex={-1}
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen);
              inputRef.current?.focus();
            }}
            aria-label={isOpen ? "收起选项" : "展开选项"}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            tabIndex={-1}
          >
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* 下拉选项列表 */}
      {isOpen && filteredOptions.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-10 w-full mt-1 bg-white border border-4 border-academy-300 rounded-none shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredOptions.map((option, index) => (
            <li
              key={option.value}
              onClick={() => handleSelectOption(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`px-3 py-2 cursor-pointer flex items-center justify-between ${
                highlightedIndex === index ? "bg-hp-blue/10" : "hover:bg-gray-50"
              } ${value === option.value ? "bg-hp-blue/5" : ""}`}
            >
              <span className="text-sm">{option.label}</span>
              {value === option.value && (
                <Check className="w-4 h-4 text-hp-blue flex-shrink-0" />
              )}
            </li>
          ))}
        </ul>
      )}

      {/* 无结果提示 */}
      {isOpen && inputValue && filteredOptions.length === 0 && allowCustomInput && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-4 border-academy-300 rounded-none shadow-lg px-3 py-2">
          <p className="text-sm text-gray-500">
            使用自定义值: <span className="font-medium text-gray-700">"{inputValue}"</span>
          </p>
        </div>
      )}

      {/* 预设选项标签（可选显示） */}
      {displayPresetChips && options.length > 0 && !isOpen && (
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="text-xs text-gray-500">快速选择:</span>
          {options.slice(0, 6).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelectOption(option)}
              aria-label={`选择 ${option.label}`}
              aria-pressed={value === option.value ? "true" : "false"}
              className={`px-2 py-1 text-xs rounded-full border transition-all ${
                value === option.value
                  ? "bg-hp-blue text-white border-hp-blue"
                  : "bg-gray-50 text-gray-600 border-4 border-academy-200 hover:border-hp-blue hover:text-hp-blue"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* 自定义值指示器 */}
      {value && !isValueInPreset && allowCustomInput && (
        <div className="mt-1 flex items-center gap-1">
          <span className="text-xs text-amber-600">★ 自定义值</span>
        </div>
      )}
    </div>
  );
}
