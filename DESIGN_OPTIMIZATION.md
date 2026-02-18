# HP Prompt Tool 设计优化方案 v2.0

基于 designprompts.dev 等现代 AI 工具网站的设计风格

---

## 🎨 设计理念

### 核心特点
1. **科技感** - 渐变背景、毛玻璃效果、柔和阴影
2. **现代化** - 大圆角、宽松间距、清晰层次
3. **交互友好** - 平滑过渡、悬停反馈、微动画
4. **色彩丰富** - 多彩但协调的渐变配色
5. **视觉层次** - 字重、大小、颜色明确区分

### 配色方案

```typescript
// 主色调：紫蓝粉渐变系
const colors = {
  primary: {
    purple: '#8B5CF6',  // 紫色
    blue: '#3B82F6',    // 蓝色
    pink: '#EC4899',    // 粉色
    indigo: '#6366F1',  // 靛蓝
  },
  gradient: {
    hero: 'from-purple-600 via-blue-600 to-indigo-700',
    card: 'from-purple-50 to-blue-50',
    badge: 'from-amber-400 to-orange-500',
  },
  neutral: {
    bg: '#F9FAFB',      // 浅灰背景
    card: '#FFFFFF',    // 白色卡片
    text: '#111827',    // 深色文字
    muted: '#6B7280',   // 次要文字
  }
}
```

---

## 📋 优化清单

### 1. Hero 区域（全新）
- 渐变背景动画
- 大标题 + 副标题
- 搜索栏突出显示
- CTA 按钮组
- 背景装饰元素

### 2. 认证横幅
- 毛玻璃效果
- 渐变边框
- 动态光效
- 悬停动画

### 3. 快速开始卡片
- 大圆角 (rounded-3xl)
- 渐变背景
- 悬停缩放 (scale-105)
- 图标放大

### 4. 提示词卡片
- 毛玻璃背景
- 标签徽章设计
- 悬停阴影增强
- 复制按钮优化

### 5. 认证徽章
- 3D 效果
- 光泽动画
- 旋转效果

---

## 🚀 实施计划

**Phase 2.1: 视觉优化** (今天)
- 更新 Hero 区域
- 优化卡片样式
- 增强动画效果

**Phase 2.2: 交互优化** (明天)
- 添加页面过渡
- 优化加载状态
- 添加微交互

**Phase 2.3: 深色模式** (可选)
- 支持深色主题
- 自动切换
- 保存用户偏好

---

## 📐 设计规范

### 间距系统
```
xs: 4px   (p-1)
sm: 8px   (p-2)
md: 16px  (p-4)
lg: 24px  (p-6)
xl: 32px  (p-8)
2xl: 48px (p-12)
3xl: 64px (p-16)
```

### 圆角系统
```
sm: 8px   (rounded-lg)
md: 12px  (rounded-xl)
lg: 16px  (rounded-2xl)
xl: 24px  (rounded-3xl)
full: 9999px (rounded-full)
```

### 阴影系统
```
sm: shadow-sm (微阴影)
md: shadow-md (中阴影)
lg: shadow-lg (大阴影)
xl: shadow-xl (超大阴影)
2xl: shadow-2xl (强阴影)
```

### 动画时长
```
fast: 150ms
normal: 300ms
slow: 500ms
```

---

*创建时间: 2026-02-18*  
*负责人: 小雷 ⚡*
