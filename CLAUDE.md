# HP Prompt Tool - AI 提示词库管理工具

## Project Overview

This is an **AI Prompt Library and Management Tool** (HP FY26 数字学院 - AI 提示词库) designed for HP Digital Academy. It provides a curated collection of enterprise-focused AI prompts for business scenarios with bilingual (Chinese/English) support.

### Key Features
- Browse and search 995+ prompts by scenario, tags, and difficulty
- One-click copy prompt content
- Quick access to use prompts across multiple AI platforms (ChatGPT, Claude, Gemini, 文心一言, 通义千问, Kimi)
- Smart platform recommendations based on prompt type
- Responsive bilingual interface

## Project Structure

```
promptchat/
├── prompt-tool/          # Next.js frontend application
│   ├── src/
│   │   ├── app/         # Next.js app router pages
│   │   ├── components/  # React components
│   │   ├── lib/         # Utilities and types
│   │   └── data/        # Demo prompt data
│   ├── package.json
│   └── tailwind.config.ts
├── data_cleaner.py       # Data cleaning/categorization script
├── import_to_notion.py   # Notion import batch generator
├── prompts.csv           # Raw prompt data
└── prompts_cleaned.csv   # Cleaned prompt data
```

## Technology Stack

**Frontend**
- Next.js 15.5.11 (App Router)
- React 19.0.0
- TypeScript 5+
- Tailwind CSS 3.4.17
- Lucide React (icons)

**Backend/Data Processing**
- Python 3
- CSV/JSON data formats

## Business Scenarios (9 Categories)

| Scenario | Chinese | Description |
|----------|---------|-------------|
| Office Efficiency | 办公效率 | Excel, PowerPoint, email, documents (369 prompts) |
| Data Analysis | 数据分析 | Statistics, charts, SQL, reports (289 prompts) |
| Creative Writing | 创意写作 | Content, copywriting, articles (104 prompts) |
| Programming | 编程开发 | Code, APIs, debugging (93 prompts) |
| Customer Service | 客户服务 | Support, FAQ, assistance (52 prompts) |
| Learning & Training | 学习培训 | Education, tutorials (40 prompts) |
| Project Management | 项目管理 | Planning, timelines (33 prompts) |
| Translation | 翻译本地化 | Language, localization (11 prompts) |
| Presentations | 演示汇报 | Slides, pitches, speeches (4 prompts) |

## Type Definitions

**Key Types** (`src/lib/types.ts`):
- `BusinessScenario`: 9 business scenario categories
- `AIPlatform`: "chatgpt" | "claude" | "gemini" | "wenxin" | "tongyi" | "kimi"
- `Prompt`: Main prompt data structure with id, name, description, content, scenario, tags, difficulty
- `PlatformConfig`: AI platform configuration with icon, color, URL, strengths
- `SearchFilters`: Filter state for search/筛选

## Development

```bash
cd prompt-tool

# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Data Processing Pipeline

### 1. Data Cleaning (`data_cleaner.py`)
- Filters enterprise-relevant prompts from raw CSV
- Maps to 9 business scenarios using keyword matching
- Extracts skill tags (ChatGPT, Python, SQL, etc.)
- Translates English titles to Chinese
- Removes duplicates and inappropriate content (gaming, dating, etc.)

### 2. Notion Import (`import_to_notion.py`)
- Creates batch JSON files (50 records per batch)
- Formats for Notion database structure

## Design System

**HP Brand Colors** (`tailwind.config.ts`):
- `hp-blue`: #0096D6
- `hp-dark`: #0096D6 (darker variant)
- `hp-light`: #E8F4F8

## Supported AI Platforms

| Platform | URL Prefix | Strengths |
|----------|-----------|-----------|
| ChatGPT | chatgpt.com | General purpose, large context |
| Claude | claude.ai | Long-form content, nuanced reasoning |
| Gemini | gemini.google.com | Google integration |
| 文心一言 | yiyan.baidu.com | Chinese language |
| 通义千问 | tongyi.aliyun.com | Alibaba ecosystem |
| Kimi | kimi.moonshot.cn | Chinese context |

## Deployment

Designed for Vercel deployment (see README.md for deploy button).

## License

MIT
