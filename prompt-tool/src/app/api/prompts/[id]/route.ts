import { NextRequest, NextResponse } from 'next/server';
import { getPromptCatalog } from '@/lib/prompt-catalog';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const { prompts, version } = await getPromptCatalog();
    if (request.nextUrl.searchParams.get('version') !== version) {
      return NextResponse.json({ error: '提示词库已更新，请刷新页面后重试。' }, { status: 409 });
    }
    const prompt = prompts.find(item => item.id === id);
    if (!prompt) return NextResponse.json({ error: '未找到这条提示词。' }, { status: 404 });
    const body = JSON.stringify(prompt);
    // Fail visibly rather than truncate text or exceed Vercel's response limit.
    if (Buffer.byteLength(body) > 3 * 1024 * 1024) {
      return NextResponse.json({ error: '此条提示词过大，暂时无法加载。' }, { status: 413 });
    }
    return new NextResponse(body, { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, no-store' } });
  } catch {
    return NextResponse.json({ error: '提示词正文暂时无法加载，请重试。' }, { status: 503 });
  }
}
