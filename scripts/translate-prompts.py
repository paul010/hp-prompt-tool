#!/usr/bin/env python3
"""
为 OpenAI 官方提示词批量添加中文翻译
"""
import re

# 翻译映射表
translations = {
    "sales-territory-plan": "Create a territory plan framework for [region/segment].\n\nInclude:\n- Market analysis and opportunity sizing\n- Target account list\n- Quota breakdown\n- Resource allocation\n- Key activities and milestones\n\nFormat as a structured planning document.",
    "sales-account-prioritization": "Prioritize this list of accounts based on these criteria:\n\n[paste accounts]\n\nCriteria: [insert criteria like revenue potential, fit, timing]\n\nOutput:\n1. Tier 1 (pursue now)\n2. Tier 2 (develop)\n3. Tier 3 (maintain)\n\nWith rationale for each tier.",
    "sales-account-scoring": "Create a scoring model for these accounts.\n\n[paste accounts]\n\nScore 1-5 on:\n- Revenue potential\n- Strategic fit\n- Engagement level\n- Competitive position\n- Timeline urgency\n\nOutput with scores, totals, and ranking.",
    # ... 更多翻译
}

def translate_content(content_en):
    """
    将英文内容翻译成中文
    这是一个简化版本，实际应用中应该使用专业的翻译 API
    """
    # 这里提供一个基本的翻译示例
    translations_map = {
        "Create a territory plan framework": "创建区域规划框架",
        "Prioritize this list of accounts": "对这些账户进行优先级排序",
        "Create a scoring model": "创建评分模型",
        # 更多翻译映射...
    }

    # 简单的替换（实际应用需要更复杂的翻译逻辑）
    for en, zh in translations_map.items():
        content_en = content_en.replace(en, zh)

    return content_en

# 读取文件
with open('prompt-tool/src/data/openaiPrompts.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 这里应该有完整的翻译逻辑
# 由于完整翻译需要专业翻译工具，这里只是示例

print("翻译脚本已创建")
print("注意：完整的翻译需要使用专业翻译 API 或人工翻译")
