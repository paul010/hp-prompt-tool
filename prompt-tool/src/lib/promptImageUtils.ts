import { Prompt } from "./types";
import { PROMPTS_CHAT_IMAGE_CATALOG } from "@/data/promptsChatImageCatalog";

const PROMPTS_CHAT_HOST = "prompts.chat";
const DEFAULT_PROMPTS_CHAT_SOURCE_URL = "https://prompts.chat";

export function normalizePromptsChatSource(sourceUrl?: string): string | undefined {
  if (!sourceUrl) return undefined;

  try {
    const url = new URL(sourceUrl);
    const host = url.hostname.toLowerCase();
    if (host === PROMPTS_CHAT_HOST || host.endsWith(`.${PROMPTS_CHAT_HOST}`)) {
      return DEFAULT_PROMPTS_CHAT_SOURCE_URL;
    }
  } catch {
    const fallback = sourceUrl.toLowerCase();
    if (fallback.includes(PROMPTS_CHAT_HOST)) {
      return DEFAULT_PROMPTS_CHAT_SOURCE_URL;
    }
  }

  return undefined;
}

export function isPromptsChatPrompt(prompt: Pick<Prompt, "sourceUrl">): boolean {
  return Boolean(normalizePromptsChatSource(prompt.sourceUrl));
}

export function normalizeActKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function withPromptsChatImageMetadata(prompt: Prompt): Prompt {
  const normalizedSource = normalizePromptsChatSource(prompt.sourceUrl);
  if (!normalizedSource) {
    return prompt;
  }

  const normalizedAct = normalizeActKey(typeof prompt.name === "string" ? prompt.name : prompt.id);
  const catalogRecord = PROMPTS_CHAT_IMAGE_CATALOG[normalizedAct];

  return {
    ...prompt,
    sourceUrl: normalizedSource,
    imageUrl: prompt.imageUrl || catalogRecord?.imageUrl,
    imageAlt: prompt.imageAlt || catalogRecord?.imageAlt || (typeof prompt.name === "string" ? prompt.name : undefined),
    imageSource: prompt.imageSource || (catalogRecord ? "prompts.chat-catalog" : "prompts.chat"),
  };
}

export function isPromptsChatImageFeatureEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_PROMPTS_CHAT_IMAGES !== "false";
}

export function shouldRenderPromptImage(prompt: Prompt): boolean {
  if (!isPromptsChatImageFeatureEnabled()) {
    return false;
  }
  return isPromptsChatPrompt(prompt) && Boolean(prompt.imageUrl);
}
