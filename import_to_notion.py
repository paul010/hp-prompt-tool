#!/usr/bin/env python3
"""
批量导入提示词到 Notion 数据库
"""

import csv
import json
import sys

# 数据源 ID
DATA_SOURCE_ID = "ae35c248-6e2d-46ce-9b45-2fa8a3365196"

# 技能标签颜色映射
TAG_COLORS = {
    'ChatGPT': 'blue',
    'Claude': 'orange',
    'Gemini': 'purple',
    'Excel': 'green',
    'PowerPoint': 'red',
    'Word': 'blue',
    'Python': 'purple',
    'JavaScript': 'yellow',
    'SQL': 'green',
    '提示词工程': 'red',
    '数据分析': 'blue',
    '代码生成': 'gray',
    '文案写作': 'pink',
    '翻译': 'brown',
    '摘要': 'yellow',
}

def create_notion_page(row):
    """将 CSV 行转换为 Notion 页面格式"""
    act = row['act']
    zh_title = row['中文标题']
    prompt = row['prompt']
    scenario = row['业务场景']
    tags_str = row['技能标签']
    for_devs = row['面向开发者']
    contributor = row.get('contributor', '')
    created_date = row['创建日期']
    status = row['状态']

    # 解析标签 JSON
    try:
        tags = json.loads(tags_str) if tags_str else []
    except:
        tags = []

    # 构建 multi_select 格式
    tags_list = []
    for tag in tags:
        if tag in TAG_COLORS:
            tags_list.append({"name": tag})
        else:
            tags_list.append({"name": tag})

    # 构建 checkbox 值
    checkbox_val = "__YES__" if for_devs == "TRUE" else "__NO__"

    # 构建页面属性 - 使用简化的 SQLite 格式
    page = {
        "url": f"page://{act[:50].replace(' ', '_')}",
        "提示词名称": act[:100],
        "中文标题": zh_title[:200],
        "提示词内容": prompt[:3000],
        "业务场景": scenario,
        "技能标签": json.dumps(tags_list, ensure_ascii=False),
        "面向开发者": checkbox_val,
        "date:创建日期:start": created_date,
        "date:创建日期:is_datetime": 0,
        "状态": status,
        "内容长度": len(prompt)
    }

    # 添加可选字段
    if contributor:
        page["贡献者"] = contributor

    return page


def load_csv_data(csv_file):
    """加载 CSV 数据"""
    rows = []
    with open(csv_file, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)
    return rows


def main():
    csv_file = '/private/tmp/claude/-Users-panlei-Desktop-claude-Promptchat/560112ae-c706-482b-8422-2311f13d371b/scratchpad/prompts_cleaned.csv'

    print(f"加载数据: {csv_file}")
    rows = load_csv_data(csv_file)
    print(f"共 {len(rows)} 条记录")

    # 生成批次
    batch_size = 50
    total_batches = (len(rows) + batch_size - 1) // batch_size

    print(f"\n将分 {total_batches} 批导入，每批最多 {batch_size} 条")

    # 输出所有批次的 JSON
    for batch_num in range(1, total_batches + 1):
        start_idx = (batch_num - 1) * batch_size
        end_idx = min(batch_num * batch_size, len(rows))

        batch_rows = rows[start_idx:end_idx]
        pages = [create_notion_page(row) for row in batch_rows]

        # 输出到文件
        output_file = f'/private/tmp/claude/-Users-panlei-Desktop-claude-Promptchat/560112ae-c706-482b-8422-2311f13d371b/scratchpad/batch_{batch_num}.json'

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump({
                "data_source_id": DATA_SOURCE_ID,
                "pages": pages,
                "batch_info": {
                    "batch_num": batch_num,
                    "total_batches": total_batches,
                    "count": len(pages)
                }
            }, f, ensure_ascii=False, indent=2)

        print(f"第 {batch_num}/{total_batches} 批已准备: {len(pages)} 条 -> {output_file}")


if __name__ == '__main__':
    main()
