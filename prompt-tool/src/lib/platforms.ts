import { PlatformConfig, AIPlatform } from "./types";

export const AI_PLATFORMS: PlatformConfig[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    nameEn: "ChatGPT",
    icon: "🤖",
    color: "#10a37f",
    url: "https://chat.openai.com",
    description: "OpenAI 的经典对话模型，擅长各类任务",
    strengths: ["创意写作", "逻辑推理", "代码生成", "通用问答"],
  },
  {
    id: "claude",
    name: "Claude",
    nameEn: "Claude",
    icon: "🧠",
    color: "#7c3aed",
    url: "https://claude.ai",
    description: "Anthropic 的 AI 助手，擅长长文本和分析",
    strengths: ["长文本处理", "代码分析", "文档总结", "复杂推理"],
  },
  {
    id: "gemini",
    name: "Gemini",
    nameEn: "Gemini",
    icon: "💎",
    color: "#4285f4",
    url: "https://gemini.google.com",
    description: "Google 的多模态 AI，擅长视觉任务",
    strengths: ["多模态理解", "图像分析", "创意生成", "知识问答"],
  },
  {
    id: "wenxin",
    name: "文心一言",
    nameEn: "Ernie Bot",
    icon: "🌟",
    color: "#2932e1",
    url: "https://yiyan.baidu.com",
    description: "百度的大语言模型，中文理解能力强",
    strengths: ["中文写作", "古诗词", "中国文化", "本地化服务"],
  },
  {
    id: "tongyi",
    name: "通义千问",
    nameEn: "Qwen",
    icon: "🎯",
    color: "#6b21a8",
    url: "https://tongyi.aliyun.com",
    description: "阿里的 AI 模型，擅长商业场景",
    strengths: ["商业分析", "文档处理", "代码生成", "企业应用"],
  },
  {
    id: "kimi",
    name: "Kimi",
    nameEn: "Kimi",
    icon: "🌙",
    color: "#0ea5e9",
    url: "https://kimi.moonshot.cn",
    description: "Moonshot 的长文本 AI，支持超长文档",
    strengths: ["超长文档", "资料分析", "研报解读", "论文阅读"],
  },
  {
    id: "copilot",
    name: "Copilot M365",
    nameEn: "Copilot",
    icon: "🌐",
    color: "#00a4ef",
    url: "https://copilot.microsoft.com",
    description: "微软的 AI 助手，深度集成 Office 365",
    strengths: ["Office 文档处理", "企业协作", "邮件写作", "Excel 分析"],
  },
];

// 生成 AI 平台跳转 URL
export function getPlatformUrl(platform: AIPlatform, prompt: string): string {
  const encodedPrompt = encodeURIComponent(prompt);

  switch (platform) {
    case "chatgpt":
      return `https://chat.openai.com/?prompt=${encodedPrompt}`;
    case "claude":
      return `https://claude.ai/new?q=${encodedPrompt}`;
    case "gemini":
      return `https://gemini.google.com/?prompt=${encodedPrompt}`;
    case "wenxin":
      return `https://yiyan.baidu.com/?prompt=${encodedPrompt}`;
    case "tongyi":
      return `https://tongyi.aliyun.com/qianwen/?prompt=${encodedPrompt}`;
    case "kimi":
      return `https://kimi.moonshot.cn/?prompt=${encodedPrompt}`;
    case "copilot":
      return `https://copilot.microsoft.com/?prompt=${encodedPrompt}`;
    default:
      return "#";
  }
}

// 根据提示词类型推荐最佳平台
export function getRecommendedPlatforms(
  scenario: string,
  tags: string[],
  forDevelopers: boolean
): AIPlatform[] {
  const platforms: AIPlatform[] = [];

  // 面向开发者的提示词优先推荐 Claude 和 ChatGPT
  if (forDevelopers) {
    platforms.push("claude", "chatgpt");
  }

  // 根据场景推荐
  switch (scenario) {
    case "创意写作":
      platforms.push("chatgpt", "gemini", "wenxin");
      break;
    case "数据分析":
      platforms.push("claude", "chatgpt", "kimi");
      break;
    case "翻译本地化":
      platforms.push("claude", "chatgpt", "wenxin", "tongyi");
      break;
    case "办公效率":
      platforms.push("chatgpt", "claude", "copilot", "kimi");
      break;
    case "编程开发":
      platforms.push("claude", "chatgpt");
      break;
    case "学习培训":
      platforms.push("chatgpt", "claude", "gemini");
      break;
    default:
      platforms.push("chatgpt", "claude");
  }

  // 去重
  return [...new Set(platforms)];
}
