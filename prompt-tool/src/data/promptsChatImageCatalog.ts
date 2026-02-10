export interface PromptsChatImageRecord {
  act: string;
  imageUrl: string;
  imageAlt: string;
}

// 示例图片映射：用于 prompts.chat 来源的提示词图片补全与 smoke run。
// key 使用规范化后的 act（小写、去符号、压缩空白）。
export const PROMPTS_CHAT_IMAGE_CATALOG: Record<string, PromptsChatImageRecord> = {
  "linux terminal": {
    act: "Linux Terminal",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Terminal screen with command line prompt"
  },
  "english translator and improver": {
    act: "English Translator and Improver",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Notebook and pen for translation writing"
  },
  "javascript console": {
    act: "JavaScript Console",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Code editor showing JavaScript code"
  },
  "excel sheet": {
    act: "Excel Sheet",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Spreadsheet and data analysis dashboard"
  },
  "travel guide": {
    act: "Travel Guide",
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Traveler looking at a map"
  },
  "personal trainer": {
    act: "Personal Trainer",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Fitness training equipment in gym"
  },
  "interviewer": {
    act: "Interviewer",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Interview discussion in office"
  },
  "essay writer": {
    act: "Essay Writer",
    imageUrl: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Person writing essay on laptop"
  },
  "mathematician": {
    act: "Mathematician",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Math equations on blackboard"
  },
  "chef": {
    act: "Chef",
    imageUrl: "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Chef plating food in kitchen"
  },
  "cover letter": {
    act: "Cover Letter",
    imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Printed cover letter and resume on desk"
  },
  "career counselor": {
    act: "Career Counselor",
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Career coaching conversation"
  }
};
