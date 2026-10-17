# CookieRun: Crumble Guide MVP

一个无数据库、无后端的 CookieRun: Crumble 攻略站，支持英语、繁中、日语、韩语和泰语。生产域名为 `https://www.cookieruncrumbles.com`。

英语沿用根路径；新增语言分别使用 `/zh-tw/`、`/ja/`、`/ko/` 和 `/th/`。`/sitemap.xml` 从页面注册表和攻略数据生成 225 个正式网址，每个网址包含五种语言的互相对应关系，以及指向英语页的 `x-default`；`/robots.txt` 公布同一个 sitemap。语言数据和 112 篇补译攻略均保存在仓库中，正常构建和线上访问不依赖来源资料站或翻译服务。维护与验收记录见 [docs/i18n.md](docs/i18n.md)。

## 本地开发

```bash
npm install
npm run dev
```

## Cloudflare Workers 预览与部署

```bash
npm run preview
npm run deploy
```

网站使用 Next.js 静态导出，Cloudflare Workers Assets 发布 `out/`。`npm run preview` 会在本地 `workerd` 环境中运行。

## 数据与图片

- Cookie、Pet、Tier List 和 Codes 使用 2026-08-19 的公开游戏数据快照。
- 77 个 Cookie 和 57 个 Pet 的图鉴图片保存在 `public/images/cookies/` 与 `public/images/pets/`。
- 页面运行时不 hotlink 外部图片。
- 本站为非官方粉丝攻略站，游戏名称与美术资源版权归 Devsisters 所有。

## 游戏规划工具

`/tools/` 先展示三个计算工具：Sugar Runes、Stellar Link、Plate Enhancement，再展示 Team Builder 和 Tier List Builder。五种语言共用同一顺序。计算在浏览器中完成，不需要游戏账号、数据库或本地 Python 服务。

- 数据为游戏 1.5.002 的 2026-10-14 快照；来源核实记录截至 2026-10-16。
- 原版 HTML 模板保存在 `src/data/tools/replica/`；原版 CSS 与交互模块导入到 `public/tools/replica/`。React 只负责挂载和销毁，计算使用原始独立模块。
- 工具保留来源布局、颜色、搜索下拉菜单和素材，适配五种语言和静态路径；本站页头、页脚和底层纹理继续保留。所有工具文字遵守全站 26px 上限，只有强度榜页面既有的档位标签保留字号例外。
- 按站内界面需求省略三个工具底部的规则核实和原始配置表折叠区；原始资料仍可直接下载。
- 英文运行数据在 `public/data/tools/en/`；映射和官方 localization key 来源在 `public/data/tools/english-provenance.json`。优先使用数据库的 20,575 条英文文本、`nameEn` 与 `names.en`；自定义说明由 `scripts/tool-english.mjs` 维护，导入遇到未译界面文案会失败。
- 游戏原图在 `public/images/tools/`，按字节复制，不复用本站其他裁剪或重新压缩。原始数据、九张关联表及既有证据在 `public/data/tools/`；下载记录保留原文。
- 原有版本 1／2 的 JSON 方案可通过 `?plan=` 分享。糖符文按来源角色 ID 保存；星际保存十个星座；装备盘自动保存十二种装备盘进度，并支持 JSON 导出。
- 本地存储只在同一来源和浏览器内共享。要从原本地站迁移方案，保留旧链接中的 `plan` 参数并放到对应新工具地址；网站不会读取其他来源的浏览器存储。
- 星际默认使用游戏显示的整数面积；装备盘材料为不扣返还的平均总投入。页面保留各自的模型限制。

重新导入这份已核实快照时运行：

```powershell
node scripts/import-rea-tools.mjs E:/code/sy/rea/output/cookieruncrumble/local-site
```

导入脚本需要读取来源 SQLite 的本机 Python；日常开发、构建和线上运行均不需要它，也不依赖 REA 目录。导入后检查数据差异，再运行 `npm test`、`npx tsc --noEmit`、`npm run build` 与 `node scripts/verify-tools-static.mjs`。三个 `*.upstream.test.mjs` 直接校验发布的原版数学模块，保留独立枚举、解析公式、矩阵对照及冻结观察校验，合计 5,228 项检查。
