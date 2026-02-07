import { Sparkles, BookOpen } from "lucide-react";

export function Header() {
  return (
    <header className="bg-gradient-to-r from-hp-blue to-hp-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">HP FY26 数字学院</h1>
                <p className="text-white/80 text-sm">AI 提示词库工具</p>
              </div>
            </div>
            <p className="text-white/90 max-w-2xl text-lg leading-relaxed">
              精选企业级 AI 提示词模板，一键复制，智能推荐 AI 平台。
              <br />
              让 ChatGPT、Claude、Gemini 等成为你的高效工作助手。
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <div className="text-5xl font-bold mb-2">15+</div>
              <div className="text-white/80 text-sm">精选提示词</div>
            </div>
          </div>
        </div>

        {/* 特性标签 */}
        <div className="flex flex-wrap gap-3 mt-8">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm">即用即走</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">智能平台推荐</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
            <span className="text-sm">多场景覆盖</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
            <span className="text-sm">中英双语</span>
          </div>
        </div>
      </div>
    </header>
  );
}
