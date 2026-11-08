import { NextRequest, NextResponse } from 'next/server';
import { getPromptCatalog } from '@/lib/prompt-catalog';
import { queryPrompts } from '@/lib/prompt-query';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const { prompts, version } = await getPromptCatalog();
    const result = queryPrompts(prompts, {
      search: params.get('search') || '', scenario: params.get('scenario') || '',
      platform: params.get('platform') || '', difficulty: params.get('difficulty') || '',
      sort: params.get('sort') || '', language: params.get('language') || 'zh-CN',
      page: Number(params.get('page') || 1), pageSize: Number(params.get('pageSize') || 24),
    }, version);
    if (Buffer.byteLength(JSON.stringify(result)) > 512 * 1024) {
      return NextResponse.json({ error: '列表数据过大，请减少每页条数后重试。' }, { status: 413 });
    }
    return NextResponse.json(result, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch {
    return NextResponse.json({ error: '提示词暂时无法加载，请重试。' }, { status: 503 });
  }
}
