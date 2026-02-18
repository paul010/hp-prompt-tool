export interface CertificationLevel {
  level: 1 | 2 | 3;
  badge: 'bronze' | 'silver' | 'gold';
  name: string;
  nameZh: string;
  audience: string;
  audiences: { number: number; description: string }[];
  prompts: {
    scenes: string[];
    count: number;
    difficulty: string[];
  };
  value: string;
  description: string;
  descriptionZh: string;
  color: string;
  emoji: string;
}

export const CERTIFICATION_LEVELS: CertificationLevel[] = [
  {
    level: 1,
    badge: 'bronze',
    name: 'AI Office Expert',
    nameZh: 'AI 办公能手认证',
    audience: '135 people · Office workers + Managers',
    audiences: [
      { number: 135, description: 'Office workers, managers, coordinators' }
    ],
    prompts: {
      scenes: ['办公协作', '数据分析', '演示汇报', '内容创作'],
      count: 48,
      difficulty: ['入门', '进阶']
    },
    value: '6.48M ¥/year',
    description: 'Master M365 Copilot to boost office efficiency by 1 hour/day',
    descriptionZh: '掌握 M365 Copilot，办公效率提升 1 小时/天',
    color: '#B87333', // 铜色
    emoji: '🎖️'
  },
  {
    level: 2,
    badge: 'silver',
    name: 'AI Assisted Expert',
    nameZh: 'AI 辅助专家认证',
    audience: '50 people · Programmers + Technical Support',
    audiences: [
      { number: 50, description: 'Developers, data analysts, technical team' }
    ],
    prompts: {
      scenes: ['技术开发', '数据分析'],
      count: 649,
      difficulty: ['入门', '进阶', '专家']
    },
    value: '2.4M ¥/year',
    description: 'Leverage AI for coding, analysis, and technical innovation',
    descriptionZh: '利用 AI 进行编程、数据分析、技术创新',
    color: '#C0C0C0', // 银色
    emoji: '🎖️'
  },
  {
    level: 3,
    badge: 'gold',
    name: 'AI Agent Creator',
    nameZh: 'AI Agent 创造者认证',
    audience: '30-40 people · Innovation champions',
    audiences: [
      { number: 30, description: 'Team leads, innovation champions, architects' }
    ],
    prompts: {
      scenes: ['客户服务', '商务决策', '学习成长'],
      count: 645,
      difficulty: ['进阶', '专家']
    },
    value: '288K ¥/year + Best Agents',
    description: 'Design and deploy AI agents using Copilot Studio',
    descriptionZh: '使用 Copilot Studio 设计和部署 AI Agent',
    color: '#FFD700', // 金色
    emoji: '🎖️'
  }
];

export function getCertificationById(level: 1 | 2 | 3): CertificationLevel {
  return CERTIFICATION_LEVELS[level - 1];
}
