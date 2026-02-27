// 测试数据分析分类效果
const fs = require('fs');
const path = require('path');

// 复制 data-loader.ts 中的分类逻辑
const scenarioKeywords = {
  '数据分析': [
    // 数据处理核心
    'data analyst', 'data scientist', 'data engineer', 'data analysis',
    // SQL & 数据库
    'sql', 'mysql', 'postgresql', 'query', 'select', 'join', 'aggregate',
    'database', 'db', 'schema', 'normalize',
    // 统计分析
    'statistic', 'statistics', 'statistical', 'regression', 'correlation',
    'hypothesis', 'distribution', 'variance', 'standard deviation',
    // 数据可视化
    'chart', 'graph', 'plot', 'visualization', 'visualize', 'dashboard',
    'histogram', 'scatter', 'bar chart', 'line graph', 'heatmap', 'pivot table',
    // 商业智能 & 报告
    'business intelligence', 'bi analyst', 'metrics', 'kpi', 'reporting',
    'analytics', 'insight', 'etl', 'data warehouse', 'datalake',
    // 数据处理
    'data cleaning', 'data wrangling', 'data transformation', 'data mining',
    // 机器学习 & 预测分析
    'machine learning', 'ml engineer', 'prediction model', 'predictive',
    'deep learning', 'neural network', 'clustering', 'classification',
    // 专业工具
    'tableau', 'power bi', 'excel analyst', 'spreadsheet',
    // 分析关键词（限定词，避免过度匹配）
    'analyze data', 'data analysis', 'predictive analysis', 'descriptive'
  ],
  '技术开发': [
    'code', 'developer', 'programming', 'javascript', 'python', 'java', 'git',
    'api', 'function', 'debug', 'refactor', 'algorithm', 'variable', 'syntax',
    'compile', 'library', 'framework', 'frontend', 'backend', 'fullstack',
    'software', 'engineering', 'architecture', 'design pattern',
  ],
  '办公协作': [
    'excel', 'powerpoint', 'email', 'document', 'sheet', 'word', 'outlook',
    'presentation', 'slide', 'deck', 'office', 'microsoft', 'spreadsheet',
  ]
};

function classifyPrompt(act, prompt) {
  const text = `${act} ${prompt}`.toLowerCase();

  // 优先级：数据分析 > 技术开发 > 办公协作
  if (scenarioKeywords['数据分析'].some(word => text.includes(word))) {
    return '数据分析';
  }
  if (scenarioKeywords['技术开发'].some(word => text.includes(word))) {
    return '技术开发';
  }
  if (scenarioKeywords['办公协作'].some(word => text.includes(word))) {
    return '办公协作';
  }
  return '其他';
}

// 测试案例
const testCases = [
  { act: "SQL Query Optimizer", prompt: "I want you to act as a SQL expert..." },
  { act: "Data Analyst", prompt: "Analyze sales data and create charts..." },
  { act: "Python Developer", prompt: "Write Python code for web scraping..." },
  { act: "Tableau Dashboard Creator", prompt: "Create interactive dashboards..." },
  { act: "Excel Expert", prompt: "Help me create pivot tables..." },
  { act: "Statistician", prompt: "Perform regression analysis..." },
  { act: "Machine Learning Engineer", prompt: "Build a prediction model..." },
  { act: "Business Intelligence Analyst", prompt: "Create KPI reports..." },
  { act: "Data Visualization Expert", prompt: "Design charts and graphs..." },
  { act: "JavaScript Developer", prompt: "Build a React component..." },
  { act: "PowerPoint Designer", prompt: "Create a presentation..." },
  { act: "Database Administrator", prompt: "Optimize database queries..." },
  // 新增机器学习相关测试案例
  { act: "ML Engineer", prompt: "Design a clustering algorithm..." },
  { act: "Data Scientist", prompt: "Build a classification model..." },
  { act: "Predictive Analytics Expert", prompt: "Create predictive analysis..." },
  { act: "Deep Learning Specialist", prompt: "Design neural networks..." },
  { act: "Python Data Analyst", prompt: "Use pandas for data analysis..." },
];

console.log('\n📊 数据分析分类测试结果\n');
console.log('═'.repeat(80));

let dataAnalysisCount = 0;
let totalCount = testCases.length;

testCases.forEach(({ act, prompt }, index) => {
  const classification = classifyPrompt(act, prompt);
  const isDataAnalysis = classification === '数据分析';
  const icon = isDataAnalysis ? '✅' : '❌';
  const label = isDataAnalysis ? '数据分析' : classification;

  console.log(`\n${icon} #${index + 1} [${label}]`);
  console.log(`   Act: ${act}`);
  console.log(`   Prompt: ${prompt.substring(0, 60)}...`);

  if (isDataAnalysis) dataAnalysisCount++;
});

console.log('\n' + '═'.repeat(80));
console.log(`\n📈 统计结果:`);
console.log(`   总测试案例: ${totalCount}`);
console.log(`   归类为数据分析: ${dataAnalysisCount} (${Math.round(dataAnalysisCount/totalCount*100)}%)`);
console.log(`\n改进说明:`);
console.log(`   ✨ 新增关键词覆盖: SQL, Tableau, Power BI, 统计分析, 数据可视化等`);
console.log(`   🤖 机器学习支持: ML Engineer, 预测模型, 深度学习, 聚类分类等`);
console.log(`   📈 提升优先级: 数据分析从第3位提升至第2位`);
console.log(`   🎯 更精确匹配: 避免 Excel 被技术开发抢走\n`);
