'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m365Modules } from '@/lib/data/m365-modules';

export default function ModulesPage() {
  const [selectedModule, setSelectedModule] = useState(m365Modules[0].id);
  const currentModule = m365Modules.find((m) => m.id === selectedModule)!;

  return (
    <div className="min-h-screen bg-academy-gray-light py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-academy-black mb-4">
            📚 M365 办公协作课程
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            6 个模块 | 2.5 小时课程 | 从入门到精通 M365 Copilot
          </p>
          <div className="flex gap-3 flex-wrap">
            <span className="px-3 py-1 bg-gray-200 text-gray-800 font-bold text-xs rounded-none border border-gray-400">
              初级→中级
            </span>
            <span className="px-3 py-1 bg-gray-200 text-gray-800 font-bold text-xs rounded-none border border-gray-400">
              实战案例 + 样本文件
            </span>
            <span className="px-3 py-1 bg-gray-200 text-gray-800 font-bold text-xs rounded-none border border-gray-400">
              认证可获得学分
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Module List */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-lg p-6 border-4 border-academy-black">
              <h2 className="text-xl font-black mb-4 text-academy-black">
                课程目录
              </h2>
              <div className="space-y-2">
                {m365Modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModule(module.id)}
                    className={`w-full text-left px-4 py-3 rounded-none font-bold transition-all ${
                      selectedModule === module.id
                        ? 'bg-academy-pink text-white border-l-4 border-academy-black'
                        : 'bg-gray-100 text-academy-black hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-black text-sm">{module.moduleNumber}</div>
                    <div className="text-sm leading-tight">{module.title}</div>
                  </button>
                ))}
              </div>

              {/* Progress */}
              <div className="mt-6 pt-6 border-t-2 border-academy-black">
                <div className="text-xs font-black text-gray-600 mb-2">
                  学习进度
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-none border border-academy-black">
                  <div
                    className="h-full bg-academy-yellow"
                    style={{
                      width: `${
                        (m365Modules.findIndex((m) => m.id === selectedModule) + 1) /
                        m365Modules.length *
                        100
                      }%`,
                    }}
                  />
                </div>
                <p className="text-xs mt-2">
                  {m365Modules.findIndex((m) => m.id === selectedModule) + 1} / 6
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border-4 border-academy-black p-8 mb-8">
              {/* Module Header */}
              <div className="mb-8">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-5xl font-black text-academy-pink">
                    {currentModule.moduleNumber}
                  </span>
                  <h2 className="text-3xl font-black text-academy-black">
                    {currentModule.title}
                  </h2>
                </div>

                <p className="text-gray-700 mb-4">{currentModule.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-academy-yellow p-4 rounded-none border-2 border-academy-black">
                    <div className="text-xs font-black text-gray-600">课程时长</div>
                    <div className="text-2xl font-black text-academy-black">
                      ⏱️ {currentModule.duration}
                    </div>
                  </div>
                  <div className="bg-academy-blue bg-opacity-10 p-4 rounded-none border-2 border-academy-black">
                    <div className="text-xs font-black text-gray-600">目标受众</div>
                    <div className="text-sm font-bold text-academy-black">
                      {currentModule.targetAudience}
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Player */}
              {currentModule.video?.youtubeId && (
                <div className="mb-8">
                  <h3 className="text-lg font-black text-academy-black mb-3 border-b-4 border-academy-pink pb-2">
                    🎬 课程视频
                  </h3>
                  <div className="relative w-full bg-black rounded-sm overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full border-2 border-academy-black"
                      src={`https://www.youtube.com/embed/${currentModule.video.youtubeId}?cc_load_policy=1&hl=zh-CN`}
                      title={currentModule.video.title || currentModule.title}
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                  {currentModule.video.subtitleUrl && (
                    <p className="text-xs text-gray-600 mt-2">
                      💡 <a href={currentModule.video.subtitleUrl} className="text-academy-blue hover:underline">
                        下载字幕文件
                      </a>
                    </p>
                  )}
                </div>
              )}


              <div className="mb-8">
                <h3 className="text-lg font-black text-academy-black mb-3 border-b-4 border-academy-pink pb-2">
                  📋 前置条件
                </h3>
                <ul className="space-y-2">
                  {currentModule.prerequisites.map((prereq, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="font-black text-academy-blue">✓</span>
                      <span className="text-gray-700">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning Objectives */}
              <div className="mb-8">
                <h3 className="text-lg font-black text-academy-black mb-3 border-b-4 border-academy-pink pb-2">
                  🎯 学习目标
                </h3>
                <ul className="space-y-2">
                  {currentModule.learningObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="font-black text-academy-pink text-lg flex-shrink-0">
                        {i + 1}.
                      </span>
                      <span className="text-gray-700">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Course Structure */}
              <div className="mb-8">
                <h3 className="text-lg font-black text-academy-black mb-4 border-b-4 border-academy-pink pb-2">
                  📺 课程结构
                </h3>
                <div className="space-y-3">
                  {currentModule.parts.map((part) => (
                    <div
                      key={part.partNumber}
                      className="bg-gray-50 border-l-4 border-academy-blue p-4 rounded-sm"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-black text-academy-black">
                            Part {part.partNumber}: {part.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {part.description}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-academy-yellow text-academy-black font-bold text-xs whitespace-nowrap">
                          {part.duration}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-gray-500">
                        ⏱️ {part.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Files */}
              {currentModule.sampleFiles.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-black text-academy-black mb-3 border-b-4 border-academy-pink pb-2">
                    📁 可下载资源
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentModule.sampleFiles.map((file, i) => (
                      <button
                        key={i}
                        className="bg-academy-blue bg-opacity-10 border-2 border-academy-blue p-4 rounded-none hover:bg-opacity-20 transition-all text-left font-bold"
                      >
                        {file.type === 'xlsx' && '📊'}
                        {file.type === 'docx' && '📄'}
                        {file.type === 'pptx' && '🎨'}
                        {file.type === 'teams' && '🎥'}
                        <span className="ml-2">{file.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Prompts */}
              <div className="mb-8">
                <h3 className="text-lg font-black text-academy-black mb-3 border-b-4 border-academy-pink pb-2">
                  💡 关键提示词示例
                </h3>
                <div className="space-y-2">
                  {currentModule.keyPrompts.map((prompt, i) => (
                    <div
                      key={i}
                      className="bg-academy-pink bg-opacity-10 border-l-4 border-academy-pink p-3 rounded-sm font-mono text-sm text-gray-700"
                    >
                      &quot;{prompt}&quot;
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-4 pt-6 border-t-4 border-academy-black">
                {m365Modules.findIndex((m) => m.id === selectedModule) > 0 && (
                  <button
                    onClick={() => {
                      const prevIndex =
                        m365Modules.findIndex((m) => m.id === selectedModule) - 1;
                      setSelectedModule(m365Modules[prevIndex].id);
                    }}
                    className="flex-1 bg-gray-200 text-academy-black font-black py-3 rounded-none border-2 border-academy-black hover:bg-gray-300 transition-all"
                  >
                    ← 上一课
                  </button>
                )}
                <button className="flex-1 bg-academy-pink text-white font-black py-3 rounded-none border-2 border-academy-black hover:shadow-lg transition-all">
                  ▶️ 开始学习
                </button>
                {m365Modules.findIndex((m) => m.id === selectedModule) <
                  m365Modules.length - 1 && (
                  <button
                    onClick={() => {
                      const nextIndex =
                        m365Modules.findIndex((m) => m.id === selectedModule) + 1;
                      setSelectedModule(m365Modules[nextIndex].id);
                    }}
                    className="flex-1 bg-academy-yellow text-academy-black font-black py-3 rounded-none border-2 border-academy-black hover:bg-opacity-90 transition-all"
                  >
                    下一课 →
                  </button>
                )}
              </div>
            </div>

            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-academy-blue font-bold hover:underline"
            >
              ← 返回首页
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
