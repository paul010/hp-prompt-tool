#!/usr/bin/env python3
"""
为 OpenAI 官方提示词批量添加中文翻译
"""
import re

# 读取文件
with open('prompt-tool/src/data/openaiPrompts.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 已添加翻译的提示词 ID（前5个）
translated_ids = {
    'sales-cold-email',
    'sales-demo-followup',
    'sales-renewal-pitch',
    'sales-daily-summary',
    'sales-pipeline-update'
}

# 查找所有需要添加翻译的提示词块
pattern = r'({\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*nameZh:\s*"([^"]+)",\s*description:\s*"([^"]*)"(?:,\s*descriptionZh:\s*"([^"]*)")?,\s*content:\s*)"([^"]*)"(?:,\s*contentZh:\s*"([^"]*)")?'
matches = re.finditer(pattern, content, re.MULTILINE | re.DOTALL)

count = 0
for match in matches:
    prompt_id = match.group(2)
    if prompt_id in translated_ids:
        continue

    # 这里需要手动添加翻译
    print(f"需要翻译: {prompt_id}")
    count += 1

print(f"\n总计需要翻译的提示词数量: {count}")
