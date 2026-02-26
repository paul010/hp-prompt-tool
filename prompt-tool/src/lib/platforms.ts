import { PlatformConfig, AIPlatform } from "./types";

export const AI_PLATFORMS: PlatformConfig[] = [
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
  // 图像生成平台
  {
    id: "midjourney",
    name: "Midjourney",
    nameEn: "Midjourney",
    icon: "🖼️",
    color: "#ef4444",
    url: "https://www.midjourney.com",
    description: "高质量艺术图像生成，擅长创意和艺术风格",
    strengths: ["艺术风格", "高质量输出", "创意性强"],
  },
  {
    id: "dalle",
    name: "DALL-E 3",
    nameEn: "DALL-E 3",
    icon: "🎭",
    color: "#10a37f",
    url: "https://openai.com/dall-e-3",
    description: "OpenAI 图像生成，与 ChatGPT 深度集成",
    strengths: ["易用性", "文本理解", "ChatGPT 集成"],
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    nameEn: "Stable Diffusion",
    icon: "🌊",
    color: "#8b5cf6",
    url: "https://stability.ai",
    description: "开源图像生成，可本地部署",
    strengths: ["开源", "可定制", "本地部署"],
  },
];

// 生成 AI 平台跳转 URL
export function getPlatformUrl(platform: AIPlatform, prompt: string): string {
  const encodedPrompt = encodeURIComponent(prompt);

  switch (platform) {
    case "copilot":
      return `https://copilot.microsoft.com/?prompt=${encodedPrompt}`;
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
    // 图像生成平台（直接跳转到主页，因为大多数不支持 URL 参数传递提示词）
    case "midjourney":
      return "https://www.midjourney.com";
    case "dalle":
      return "https://chat.openai.com/?prompt=" + encodedPrompt; // DALL-E 3 通过 ChatGPT 访问
    case "stable-diffusion":
      return "https://stability.ai";
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

  // 办公效率场景优先推荐 Copilot
  if (scenario === "办公效率") {
    platforms.push("copilot", "chatgpt", "claude", "kimi");
  }
  // 面向开发者的提示词优先推荐 Claude 和 ChatGPT，但也包含 Copilot
  else if (forDevelopers) {
    platforms.push("claude", "chatgpt", "copilot");
  }
  // 根据场景推荐
  else {
    switch (scenario) {
      case "创意写作":
        platforms.push("chatgpt", "gemini", "wenxin", "copilot");
        break;
      case "数据分析":
        platforms.push("copilot", "claude", "chatgpt", "kimi");
        break;
      case "翻译本地化":
        platforms.push("claude", "chatgpt", "wenxin", "tongyi", "copilot");
        break;
      case "编程开发":
        platforms.push("claude", "chatgpt", "copilot");
        break;
      case "学习培训":
        platforms.push("chatgpt", "claude", "gemini", "copilot");
        break;
      case "客户服务":
        platforms.push("chatgpt", "claude", "copilot");
        break;
      case "项目管理":
        platforms.push("chatgpt", "claude", "copilot");
        break;
      case "演示汇报":
        platforms.push("copilot", "chatgpt", "claude");
        break;
      default:
        platforms.push("copilot", "chatgpt", "claude");
    }
  }

  // 去重
  return [...new Set(platforms)];
}
