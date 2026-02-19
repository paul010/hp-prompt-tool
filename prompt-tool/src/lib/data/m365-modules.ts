export interface ModulePart {
  partNumber: number;
  title: string;
  description: string;
  timestamp: string;
  duration: string;
}

export interface Module {
  id: string;
  moduleNumber: string;
  title: string;
  description: string;
  duration: string;
  targetAudience: string;
  learningObjectives: string[];
  prerequisites: string[];
  parts: ModulePart[];
  sampleFiles: {
    name: string;
    type: 'xlsx' | 'docx' | 'pptx' | 'teams';
    url?: string;
  }[];
  keyPrompts: string[];
}

export const m365Modules: Module[] = [
  {
    id: 'm365-overview',
    moduleNumber: 'M1',
    title: 'M365 Copilot 概述',
    description:
      '深入了解 Microsoft 365 Copilot 的基本概念、许可证类型、应用场景，以及与其他 Copilot 产品的区别。',
    duration: '15 分钟',
    targetAudience: '所有办公人员',
    learningObjectives: [
      '理解 M365 Copilot 的核心价值',
      '掌握不同许可证的功能差异',
      '了解应用场景和最佳实践',
      '识别何时使用哪个 Copilot 产品',
    ],
    prerequisites: ['基本的 Microsoft 365 使用经验'],
    parts: [
      {
        partNumber: 1,
        title: 'Copilot 是什么',
        description: '介绍 M365 Copilot 的核心概念、AI 能力和工作原理',
        timestamp: '0:00-5:00',
        duration: '5 分钟',
      },
      {
        partNumber: 2,
        title: '许可证类型对比',
        description: '理解免费 vs 付费许可证的功能差异',
        timestamp: '5:00-10:00',
        duration: '5 分钟',
      },
      {
        partNumber: 3,
        title: '应用场景 & ROI',
        description: '实际工作场景和效率提升预期',
        timestamp: '10:00-15:00',
        duration: '5 分钟',
      },
    ],
    sampleFiles: [],
    keyPrompts: [
      '我如何启用 M365 Copilot？',
      'M365 Copilot 可以访问我的所有数据吗？',
      '免费版本和付费版本有什么区别？',
      '在我的行业中实施 Copilot 的成本效益是什么？',
    ],
  },
  {
    id: 'm365-word',
    moduleNumber: 'M2',
    title: 'Word 智能写作',
    description:
      '掌握如何在 Word 中使用 Copilot 快速生成内容、编辑改进和格式化，提升文档创作效率。',
    duration: '25 分钟',
    targetAudience: '文案、报告编写、内容创作人员',
    learningObjectives: [
      '使用 Copilot 快速生成各类文档',
      '编辑和改进生成的内容',
      '创建专业格式的文档',
      '利用提示词优化输出质量',
    ],
    prerequisites: ['M1 课程基础', 'Word 基本使用'],
    parts: [
      {
        partNumber: 1,
        title: '启动 Copilot & 快速开始',
        description: '如何在 Word 中打开 Copilot，基础操作',
        timestamp: '0:00-4:00',
        duration: '4 分钟',
      },
      {
        partNumber: 2,
        title: '内容生成技巧',
        description: '使用自然语言提示生成各类内容（报告、邮件、总结）',
        timestamp: '4:00-10:00',
        duration: '6 分钟',
      },
      {
        partNumber: 3,
        title: '编辑和改进',
        description: '调整语气、长度、格式，迭代优化内容',
        timestamp: '10:00-18:00',
        duration: '8 分钟',
      },
      {
        partNumber: 4,
        title: '高级技巧 & 最佳实践',
        description: '引用来源、批量操作、协作提示',
        timestamp: '18:00-25:00',
        duration: '7 分钟',
      },
    ],
    sampleFiles: [
      {
        name: 'sample-report.docx',
        type: 'docx',
      },
      {
        name: 'word-prompts-template.docx',
        type: 'docx',
      },
    ],
    keyPrompts: [
      '撰写关于 [主题] 的专业报告',
      '用 [语调] 的语气改写这段文本',
      '总结以下内容为 [字数] 字的摘要',
      '为这份文档创建执行摘要',
      '将以下列表转换为段落格式',
    ],
  },
  {
    id: 'm365-excel',
    moduleNumber: 'M3',
    title: 'Excel 数据分析',
    description:
      '学习如何在 Excel 中利用 Copilot 进行数据分析、创建公式、生成图表和透视表，实现数据驱动决策。',
    duration: '30 分钟',
    targetAudience: '数据分析师、项目经理、财务人员',
    learningObjectives: [
      '使用 Copilot 进行快速数据分析',
      '自动生成复杂公式（无需公式基础）',
      '创建专业数据可视化',
      '发现数据趋势和异常值',
      '使用 Excel Labs Agent 自动化多步骤任务',
    ],
    prerequisites: ['M1 课程基础', 'Excel 基本操作经验'],
    parts: [
      {
        partNumber: 1,
        title: '数据准备 & Copilot 入门',
        description: '组织数据结构，启动 Copilot for Excel',
        timestamp: '0:00-5:00',
        duration: '5 分钟',
      },
      {
        partNumber: 2,
        title: '用自然语言提问',
        description: '使用 Copilot 分析数据、找规律、回答业务问题',
        timestamp: '5:00-12:00',
        duration: '7 分钟',
      },
      {
        partNumber: 3,
        title: '创建公式和条件格式',
        description: '自动生成公式、应用条件格式、计算指标',
        timestamp: '12:00-20:00',
        duration: '8 分钟',
      },
      {
        partNumber: 4,
        title: '高级分析：图表 & 透视表 & Agent',
        description: '生成图表、创建透视表、使用 Excel Labs Agent 自动化',
        timestamp: '20:00-30:00',
        duration: '10 分钟',
      },
    ],
    sampleFiles: [
      {
        name: 'sales-data-2025.xlsx',
        type: 'xlsx',
      },
      {
        name: 'budget-analysis.xlsx',
        type: 'xlsx',
      },
    ],
    keyPrompts: [
      '分析这些销售数据，告诉我哪个地区表现最好',
      '创建公式计算每个产品的利润率',
      '找出这个数据集中的异常值',
      '为这些数据生成最合适的图表',
      '创建数据透视表按地区和产品统计销售额',
      '预测下个季度的趋势',
    ],
  },
  {
    id: 'm365-powerpoint',
    moduleNumber: 'M4',
    title: 'PowerPoint 快速生成',
    description:
      '使用 Copilot 快速创建专业幻灯片演示文稿，从思路到完成只需几分钟。',
    duration: '25 分钟',
    targetAudience: '管理人员、演讲者、销售人员',
    learningObjectives: [
      '快速生成演示文稿框架',
      '自动创建和优化幻灯片内容',
      '应用专业设计和品牌一致性',
      '使用数据和可视化增强演示',
      '为演讲准备讲稿和备注',
    ],
    prerequisites: ['M1 课程基础', 'PowerPoint 基本操作'],
    parts: [
      {
        partNumber: 1,
        title: '启动 Copilot & 创建演示文稿',
        description: '在 PowerPoint 中激活 Copilot，选择演示类型',
        timestamp: '0:00-4:00',
        duration: '4 分钟',
      },
      {
        partNumber: 2,
        title: '快速生成内容',
        description: '从文档或描述生成幻灯片，自动填充内容',
        timestamp: '4:00-10:00',
        duration: '6 分钟',
      },
      {
        partNumber: 3,
        title: '优化和定制',
        description: '调整设计、颜色、布局，添加品牌元素',
        timestamp: '10:00-18:00',
        duration: '8 分钟',
      },
      {
        partNumber: 4,
        title: '讲稿和展示技巧',
        description: '生成讲稿、设置演讲者备注、演讲模式',
        timestamp: '18:00-25:00',
        duration: '7 分钟',
      },
    ],
    sampleFiles: [
      {
        name: 'quarterly-review-template.pptx',
        type: 'pptx',
      },
      {
        name: 'product-pitch-example.pptx',
        type: 'pptx',
      },
    ],
    keyPrompts: [
      '为关于 [话题] 的会议创建 10 页幻灯片',
      '使用这份文档创建演示文稿大纲',
      '为这次演讲生成讲稿',
      '改进这个幻灯片的设计和布局',
      '为这些数据创建可视化图表',
    ],
  },
  {
    id: 'm365-teams',
    moduleNumber: 'M5',
    title: 'Teams 会议增强',
    description:
      '优化 Teams 会议体验，使用 Copilot 进行会议记录、实时翻译、内容总结和行动项追踪。',
    duration: '20 分钟',
    targetAudience: '团队领导、会议主持人、全球团队',
    learningObjectives: [
      '启用 Teams 会议 Copilot 功能',
      '实时获取会议记录和摘要',
      '翻译多语言对话',
      '自动提取会议中的行动项',
      '与团队共享会议洞见',
    ],
    prerequisites: ['M1 课程基础', 'Teams 基本使用'],
    parts: [
      {
        partNumber: 1,
        title: '会议 Copilot 入门',
        description: '启用会议记录、权限配置、隐私设置',
        timestamp: '0:00-4:00',
        duration: '4 分钟',
      },
      {
        partNumber: 2,
        title: '实时会议转录和摘要',
        description: '自动记录会议、生成要点总结',
        timestamp: '4:00-10:00',
        duration: '6 分钟',
      },
      {
        partNumber: 3,
        title: '提取行动项和决策',
        description: '自动识别谁负责什么、截止时间跟踪',
        timestamp: '10:00-15:00',
        duration: '5 分钟',
      },
      {
        partNumber: 4,
        title: '多语言和协作',
        description: '实时翻译、共享见解、团队协作最佳实践',
        timestamp: '15:00-20:00',
        duration: '5 分钟',
      },
    ],
    sampleFiles: [
      {
        name: 'teams-meeting-recording.mp4',
        type: 'teams',
      },
    ],
    keyPrompts: [
      '总结这次会议的要点',
      '提取我需要做的所有行动项',
      '谁负责完成 [任务]？',
      '这次会议的主要决议是什么？',
      '将会议摘要翻译成 [语言]',
    ],
  },
  {
    id: 'm365-integration',
    moduleNumber: 'M6',
    title: '跨应用协同',
    description:
      '学习如何在 Word、Excel、PowerPoint、Teams 之间无缝协作，构建端到端的工作流程。',
    duration: '20 分钟',
    targetAudience: '所有用户（进阶)',
    learningObjectives: [
      '理解跨应用数据流动',
      '使用 WorkIQ 访问企业数据',
      '创建端到端的自动化工作流',
      '安全地分享 Copilot 结果',
      '测量 ROI 和生产力提升',
    ],
    prerequisites: ['完成 M1-M5 所有课程'],
    parts: [
      {
        partNumber: 1,
        title: '跨应用数据流',
        description: '从 Excel 分析导入 Word 报告、PowerPoint 可视化',
        timestamp: '0:00-4:00',
        duration: '4 分钟',
      },
      {
        partNumber: 2,
        title: '企业数据访问 (WorkIQ)',
        description: '安全访问 SharePoint、OneDrive、Teams 数据',
        timestamp: '4:00-10:00',
        duration: '6 分钟',
      },
      {
        partNumber: 3,
        title: '自动化工作流',
        description: '使用 Power Automate 和 Copilot Studio 创建自动化',
        timestamp: '10:00-15:00',
        duration: '5 分钟',
      },
      {
        partNumber: 4,
        title: '测量和优化',
        description: '跟踪 Copilot 使用数据、计算 ROI、持续改进',
        timestamp: '15:00-20:00',
        duration: '5 分钟',
      },
    ],
    sampleFiles: [
      {
        name: 'end-to-end-workflow-example.pptx',
        type: 'pptx',
      },
    ],
    keyPrompts: [
      '为这份 Excel 销售数据创建完整的分析报告',
      '创建一个工作流来自动化月度报告',
      '在 SharePoint 中找到与 [主题] 相关的所有文档',
      '使用公司数据创建演示文稿',
      '设置警报以监控关键指标',
    ],
  },
];
