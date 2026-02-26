/**
 * 批量为 OpenAI 提示词添加中文翻译
 * 使用说明：在 prompt-tool 目录下运行 node scripts/batch-translate.js
 */

const fs = require('fs');
const path = require('path');

// 读取文件
const filePath = path.join(__dirname, '../prompt-tool/src/data/openaiPrompts.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 检查哪些提示词还需要添加 contentZh
const promptPattern = /{\s*id:\s*"([^"]+)"/g;
let match;
const prompts = [];

while ((match = promptPattern.exec(content)) !== null) {
    const promptId = match[1];
    // 查找这个 prompt 是否有 contentZh
    const promptBlock = content.substring(match.index, match.index + 1000);
    if (!promptBlock.includes('contentZh')) {
        prompts.push(promptId);
    }
}

console.log(`找到 ${prompts.length} 个需要添加中文翻译的提示词`);
console.log('提示词 ID 列表:');
prompts.forEach((id, index) => {
    console.log(`${index + 1}. ${id}`);
});

// 生成翻译任务列表
console.log('\n建议的翻译流程：');
console.log('1. 为每个提示词提供 contentZh 翻译');
console.log('2. 添加到对应的提示词对象中');
console.log('3. 确保翻译质量和一致性');

// 输出需要翻译的提示词到文件
fs.writeFileSync(
    path.join(__dirname, 'prompts-to-translate.txt'),
    prompts.join('\n'),
    'utf-8'
);

console.log('\n提示词列表已保存到 scripts/prompts-to-translate.txt');
