// ============================================================
// Preset Options Resolution Utilities
// ============================================================

import { InputField, OptionValue, LocalizedContent, PresetOptionSource } from "./types";
import { PRESET_OPTIONS, type OptionValue as PresetOptionValue } from "./presets";
import { getLocalized } from "./i18n";

/**
 * Resolve preset options to standardized format
 */
export function resolvePresetOptions(
  preset: PresetOptionSource | undefined,
  language: string
): Array<{ value: string; label: string }> {
  if (!preset) return [];

  const options = PRESET_OPTIONS[preset];
  if (!options) return [];

  return options.map((opt: PresetOptionValue) => ({
    value: opt.value,
    label: getLocalized(opt.label, language as any),
  }));
}

/**
 * Get resolved options for an InputField
 */
export function getFieldOptions(
  field: InputField,
  language: string
): Array<{ value: string; label: string }> {
  // If field has direct options, use those
  if (field.options && field.options.length > 0) {
    return field.options.map((opt) => ({
      value: typeof opt === "string" ? opt : (opt as LocalizedContent).en,
      label: typeof opt === "string"
        ? opt
        : getLocalized(opt as LocalizedContent, language as any),
    }));
  }

  // Otherwise, resolve from preset
  if (field.preset) {
    return resolvePresetOptions(field.preset, language);
  }

  return [];
}

/**
 * Check if a field has options available
 */
export function fieldHasOptions(field: InputField): boolean {
  return !!(field.options && field.options.length > 0) || !!field.preset;
}

/**
 * Get default value for a field based on options
 */
export function getFieldDefaultValue(field: InputField, language: string): string {
  if (field.defaultValue) return field.defaultValue;

  // For select fields, default to first option if available
  if (field.type === "select") {
    const options = getFieldOptions(field, language);
    if (options.length > 0) {
      return options[0].value;
    }
  }

  return "";
}

/**
 * Validate select field value
 */
export function validateSelectValue(
  field: InputField,
  value: string,
  language: string
): { valid: boolean; error?: string } {
  if (!field.required && !value) {
    return { valid: true };
  }

  const options = getFieldOptions(field, language);
  const validValues = options.map((opt) => opt.value);

  if (!validValues.includes(value)) {
    return {
      valid: false,
      error: `Invalid value. Must be one of: ${validValues.join(", ")}`,
    };
  }

  return { valid: true };
}

/**
 * Validate multiselect field values
 */
export function validateMultiselectValues(
  field: InputField,
  values: string[],
  language: string
): { valid: boolean; error?: string } {
  if (!field.required && (!values || values.length === 0)) {
    return { valid: true };
  }

  const options = getFieldOptions(field, language);
  const validValues = options.map((opt) => opt.value);
  const invalidValues = values.filter((v) => !validValues.includes(v));

  if (invalidValues.length > 0) {
    return {
      valid: false,
      error: `Invalid values: ${invalidValues.join(", ")}`,
    };
  }

  return { valid: true };
}
