"use client";

import Link from "next/link";
import { Zap, BookOpenCheck } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";

export function Header() {
  return (
    <header className="bg-academy-blue text-white border-b-4 border-academy-black">
      {/* Navigation Bar */}
      <nav className="bg-academy-black border-b-4 border-academy-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-8">
          <Link href="/" className="text-white font-black hover:text-academy-yellow transition-colors">
            📚 提示词库
          </Link>
          <Link href="/learning-path" className="text-white font-black hover:text-academy-yellow transition-colors">
            🎓 学习路线
          </Link>
          <Link href="/modules" className="text-white font-black hover:text-academy-yellow transition-colors">
            📖 M365 课程
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-academy-yellow text-academy-blue border-4 border-academy-black flex items-center justify-center rounded-none" style={{
                boxShadow: '0 4px 0 rgba(26,26,26,0.3)',
              }}>
                <Zap className="w-8 h-8 font-black" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-white" style={{ fontStyle: 'italic' }}>
                  用 AI 發電
                </h1>
                <p className="text-blue-100 text-sm font-bold">
                  FY26 數字學院 · AI 提示詞庫
                </p>
              </div>
            </div>
            <p className="text-white/95 max-w-2xl text-lg leading-relaxed font-semibold">
              精選 1342+ 企業級 AI 提示詞模板，安全·實用·有目的。
              <br />
              一鍵複製，讓 ChatGPT、Claude、Gemini 成為你的高效工作助手。
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-academy-yellow text-academy-blue border-4 border-academy-black rounded-none p-6 text-center font-black"
              style={{
                boxShadow: '0 8px 0 rgba(26,26,26,0.2), -4px 4px 0 rgba(26,26,26,0.1)',
              }}>
              <div className="text-5xl font-black mb-2">1342+</div>
              <div className="text-academy-black text-sm font-black">提示詞</div>
            </div>
          </div>
        </div>

        {/* 特性标签 */}
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 border-4 border-white rounded-none font-bold">
            <BookOpenCheck className="w-4 h-4" />
            <span className="text-sm">即用即走</span>
          </div>
          <div className="flex items-center gap-2 bg-academy-pink px-4 py-2 border-4 border-white rounded-none font-bold">
            <Zap className="w-4 h-4" />
            <span className="text-sm">安全合規</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 border-4 border-white rounded-none font-bold">
            <span className="text-sm">12+ 場景</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 border-4 border-white rounded-none font-bold">
            <span className="text-sm">多語言支援</span>
          </div>
          {/* 语言选择器 */}
          <LanguageSelector className="bg-academy-yellow text-academy-blue border-4 border-white px-3 py-2 rounded-none font-bold" />
        </div>
      </div>
    </header>
  );
}
