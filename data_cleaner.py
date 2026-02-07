#!/usr/bin/env python3
"""
HP FY26 数字学院提示词库 - 数据清洗脚本
从 prompts.csv 筛选企业相关提示词并添加中文分类
"""

import csv
import json
import re
from datetime import datetime

# 企业场景筛选规则（优先级从高到低）
ENTERPRISE_TYPES = {
    'high': ['professional', 'writing', 'academic', 'education'],
    'medium': ['coding', 'misc'],
    'low': ['creative'],
    'exclude': ['gaming', 'music', 'social', 'traveling']
}

# Type 到业务场景映射
TYPE_TO_SCENARIO = {
    'academic': '学习培训',
    'coding': '编程开发',
    'creative': '创意写作',
    'education': '学习培训',
    'misc': '办公效率',
    'professional': '办公效率',
    'writing': '创意写作',
    'TEXT': '办公效率'  # 默认值
}

# 需要排除的关键词（用于二次筛选）
EXCLUDE_KEYWORDS = [
    'game', 'gaming', 'video game', 'rpg',
    'music', 'song', 'composer', 'lyrics',
    'dating', 'romantic', 'relationship',
    'astrology', 'horoscope', 'fortune teller',
    'social media influencer', 'tiktok', 'instagram'
]

# 企业场景关键词映射（用于智能分类）
SCENARIO_KEYWORDS = {
    '办公效率': ['excel', 'powerpoint', 'word', 'email', 'spreadsheet', 'document', 'office', 'meeting', 'calendar', 'schedule'],
    '数据分析': ['data', 'analysis', 'statistics', 'chart', 'graph', 'sql', 'database', 'report'],
    '编程开发': ['code', 'programming', 'developer', 'software', 'javascript', 'python', 'api', 'debug'],
    '创意写作': ['write', 'writing', 'content', 'copy', 'blog', 'article', 'essay', 'story'],
    '学习培训': ['teach', 'learn', 'education', 'study', 'explain', 'tutorial', 'training'],
    '客户服务': ['customer', 'support', 'service', 'help', 'faq', 'assistant'],
    '项目管理': ['project', 'manage', 'plan', 'organize', 'timeline', 'deadline'],
    '演示汇报': ['presentation', 'slide', 'pitch', 'speak', 'speech'],
    '翻译本地化': ['translate', 'translation', 'language', 'localization', 'english', 'chinese']
}


def should_include_row(ptype, act, prompt):
    """根据类型和内容判断是否包含该行"""
    ptype = ptype.lower() if ptype else ''

    # 排除的类型
    if ptype in ENTERPRISE_TYPES['exclude']:
        return False

    # 检查是否包含排除关键词
    prompt_lower = (prompt or '').lower()
    act_lower = (act or '').lower()

    for keyword in EXCLUDE_KEYWORDS:
        if keyword in prompt_lower or keyword in act_lower:
            return False

    return True


def infer_scenario(ptype, act, prompt):
    """根据提示词内容推断业务场景"""
    act_lower = (act or '').lower()
    prompt_lower = (prompt or '').lower()
    content = act_lower + ' ' + prompt_lower

    # 先根据 type 映射
    ptype = ptype.lower() if ptype else ''
    if ptype in TYPE_TO_SCENARIO:
        scenario = TYPE_TO_SCENARIO[ptype]
    else:
        scenario = '办公效率'

    # 根据关键词内容进行二次判断（更精确）
    for scenario_name, keywords in SCENARIO_KEYWORDS.items():
        for keyword in keywords:
            if keyword in content:
                return scenario_name

    return scenario


def extract_tags(act, prompt):
    """从提示词内容提取技能标签"""
    prompt_lower = (prompt or '').lower()
    act_lower = (act or '').lower()
    content = act_lower + ' ' + prompt_lower

    tags = []

    # 工具类标签
    tool_tags = {
        'ChatGPT': ['chatgpt', 'gpt'],
        'Claude': ['claude'],
        'Gemini': ['gemini'],
        'Excel': ['excel', 'spreadsheet'],
        'PowerPoint': ['powerpoint', 'ppt', 'slide'],
        'Word': ['word', 'document'],
        'Python': ['python', 'python3'],
        'JavaScript': ['javascript', 'js', 'node'],
        'SQL': ['sql', 'database'],
    }

    # 技能类标签
    skill_tags = {
        '提示词工程': ['prompt', 'act as'],
        '数据分析': ['data', 'analysis', 'statistics'],
        '代码生成': ['code', 'function', 'programming'],
        '文案写作': ['write', 'content', 'copy'],
        '翻译': ['translate', 'translation'],
        '摘要': ['summarize', 'summary'],
    }

    all_tags = {**tool_tags, **skill_tags}

    for tag_name, keywords in all_tags.items():
        for keyword in keywords:
            if keyword in content and tag_name not in tags:
                tags.append(tag_name)
                break

    return tags[:5]  # 最多5个标签


def simple_translate(text):
    """简单的英文标题翻译（常见角色名称）"""
    if not text:
        return text

    translations = {
        # 专业角色
        'Developer': '开发者',
        'Programmer': '程序员',
        'Designer': '设计师',
        'Writer': '写作者',
        'Teacher': '教师',
        'Consultant': '顾问',
        'Analyst': '分析师',
        'Manager': '经理',
        'Assistant': '助理',
        'Specialist': '专家',
        'Engineer': '工程师',

        # 功能角色
        'Translator': '翻译',
        'Interviewer': '面试官',
        'Terminal': '终端',
        'Console': '控制台',
        'Guide': '向导',
        'Checker': '检查器',
        'Character': '角色',
        'Advertiser': '广告师',
        'Storyteller': '讲故事者',
        'Commentator': '评论员',
        'Comedian': '喜剧演员',
        'Coach': '教练',
        'Composer': '作曲家',

        # 常见组合
        'Excel Sheet': 'Excel表格',
        'Travel Guide': '旅行向导',
        'Plagiarism Checker': '抄袭检查器',
        'Stand-up': '脱口秀',
        'Motivational': '励志',

        # 技术相关
        'Linux Terminal': 'Linux终端',
        'JavaScript Console': 'JavaScript控制台',
        'English Translator': '英文翻译',
        'Spoken English': '英语口语',
    }

    result = text
    for en, zh in translations.items():
        result = result.replace(en, zh)

    # 如果没有翻译变化，添加前缀
    if result == text:
        return f"{text}"

    return result


def clean_data(input_csv, output_csv, stats_output):
    """主清洗函数"""
    print(f"开始处理: {input_csv}")

    seen_acts = set()
    filtered_rows = []
    scenario_counts = {}
    dev_count = 0
    tags_count = 0

    with open(input_csv, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        total = 0
        included = 0

        for row in reader:
            total += 1
            act = row.get('act', '').strip()
            prompt = row.get('prompt', '').strip()
            ptype = row.get('type', '').strip()
            for_devs = row.get('for_devs', 'FALSE').strip()
            contributor = row.get('contributor', '').strip()

            # 跳过空值
            if not act or not prompt:
                continue

            # 去重
            if act in seen_acts:
                continue
            seen_acts.add(act)

            # 应用筛选
            if not should_include_row(ptype, act, prompt):
                continue

            included += 1

            # 推断业务场景
            scenario = infer_scenario(ptype, act, prompt)
            scenario_counts[scenario] = scenario_counts.get(scenario, 0) + 1

            # 提取标签
            tags = extract_tags(act, prompt)
            if tags:
                tags_count += 1

            # 简单翻译标题
            zh_title = simple_translate(act)

            # 处理 for_devs
            is_dev = for_devs.upper() == 'TRUE'
            if is_dev:
                dev_count += 1

            filtered_rows.append({
                'act': act,
                '中文标题': zh_title,
                'prompt': prompt,
                '业务场景': scenario,
                '技能标签': json.dumps(tags, ensure_ascii=False),
                '面向开发者': 'TRUE' if is_dev else 'FALSE',
                'type': ptype,
                'contributor': contributor,
                '创建日期': datetime.now().strftime('%Y-%m-%d'),
                '状态': '已审核'
            })

        print(f"原始记录数: {total}")
        print(f"去重后: {len(seen_acts)}")
        print(f"筛选企业相关后: {included}")

    # 写入输出文件
    with open(output_csv, 'w', encoding='utf-8-sig', newline='') as f:
        fieldnames = ['act', '中文标题', 'prompt', '业务场景', '技能标签',
                     '面向开发者', 'type', 'contributor', '创建日期', '状态']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(filtered_rows)

    # 生成统计信息
    stats = {
        '总记录数': len(filtered_rows),
        '按业务场景统计': dict(sorted(scenario_counts.items(), key=lambda x: x[1], reverse=True)),
        '面向开发者数量': dev_count,
        '有技能标签的数量': tags_count
    }

    with open(stats_output, 'w', encoding='utf-8') as f:
        json.dump(stats, f, ensure_ascii=False, indent=2)

    print(f"\n清洗完成！")
    print(f"输出文件: {output_file}")
    print(f"统计信息:")

    for scenario, count in stats['按业务场景统计'].items():
        print(f"  {scenario}: {count} 条")

    print(f"总计: {stats['总记录数']} 条")

    return filtered_rows, stats


if __name__ == '__main__':
    base_dir = '/private/tmp/claude/-Users-panlei-Desktop-claude-Promptchat/560112ae-c706-482b-8422-2311f13d371b/scratchpad'
    input_file = f'{base_dir}/prompts.csv'
    output_file = f'{base_dir}/prompts_cleaned.csv'
    stats_file = f'{base_dir}/cleaning_stats.json'

    rows, stats = clean_data(input_file, output_file, stats_file)
