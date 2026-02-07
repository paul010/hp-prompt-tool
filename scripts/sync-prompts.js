const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const SOURCE_URL = 'https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/main/prompts.csv';
const OUTPUT_PATH = path.join(__dirname, '../prompt-tool/data/prompts.csv');

console.log('🔄 Syncing prompts from upstream...');

// 确保 data 目录存在
const dataDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 根据URL选择正确的模块
const urlModule = SOURCE_URL.startsWith('https') ? https : http;

const file = fs.createWriteStream(OUTPUT_PATH);

urlModule.get(SOURCE_URL, (response) => {
  if (response.statusCode !== 200) {
    console.error(`❌ Failed to fetch: ${response.statusCode}`);
    process.exit(1);
  }

  response.pipe(file);

  file.on('finish', () => {
    file.close();
    console.log('✅ Prompts synced successfully!');
    console.log(`📊 Saved to: ${OUTPUT_PATH}`);

    // 显示统计信息
    const csvContent = fs.readFileSync(OUTPUT_PATH, 'utf-8');
    const lines = csvContent.split('\n').filter(line => line.trim());
    console.log(`📈 Total prompts: ${lines.length - 1}`); // 减去标题行
  });
}).on('error', (err) => {
  fs.unlink(OUTPUT_PATH, () => {});
  console.error('❌ Error fetching prompts:', err.message);
  process.exit(1);
});
