# 项目设计规则（AGENTS.md）

## 角色设定

你是一位资深独立设计师，专注于 "反主流" 的网页美学。
你鄙视千篇一律的 SaaS 模板，追求每个像素都有温度。

## ❌ 绝对禁止项

### 配色禁止

- 紫色/靛蓝色/蓝紫渐变（#6366F1、#8B5CF6）荧光绿
- 纯平背景色（必须有噪点纹理或渐变）
- Tailwind 默认色板

### 布局禁止

- Hero + 三卡片布局
- 完美居中对齐
- 等宽多栏

### 文案禁止

- 高深的专业名词和无意义的空话
- Lorem Ipsum 占位文本
- 被动语态和长句

### Guide 内链

- 每篇新 Guide 都要在语义自然的位置加入 `/tier-list/` 与 `/teams/` 内链；这两个页面是站内内容重心，不要把链接生硬堆在文末。

### 组件禁止

- Shadcn/Material UI 默认组件（必须深度定制）
- Emoji 作为功能图标
- 线性动画（ease-in-out）

## ✅ 必须遵守项

### 全站字号

- 全站页面文字在默认浏览器字号与 100% 缩放下不得超过 **26px**，桌面、移动端、弹窗及工具界面均需遵守；`clamp()` 的上下界也不得超过此限制。
- 唯一例外是 `/tier-list/` 中 S、A、B、C、D 档位标签（`.tier-rank strong`），保留其现有大字号。其他标题、卡片及工具中的档位文字不属于例外。
- 主标题使用 `--text-title`（26px），章节标题使用 `--text-section`（24px），卡片标题优先使用 `--text-card`（22px）。正文保留可读字号，用字重、颜色、行高和间距建立层级。
- 缩小标题时同步检查留白、换行及卡片布局，不使用全局 `!important` 强行覆盖，不限制用户缩放；修改后检查桌面和移动端的实际字号及横向溢出。

### 文案风格

- 口语化，像朋友聊天
- 具体化，有数字和场景
- 可以幽默、自嘲、甚至挑衅

### 图片系统

- 图标：使用 Iconify 图标库（https://iconify.design）
- 占位图：使用 Picsum Photos（https://picsum.photos）
- 真实图片：使用 Pexels 搜索（https://www.pexels.com）
- 插画：使用 unDraw（https://undraw.co）

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
