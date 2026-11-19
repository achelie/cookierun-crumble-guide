# cookieruncrumbles.com GEO 审计与验收

2026-11-12，先对生产站执行 `curl` GET，再分批修改本地仓库。裸域跳转到 `https://www.cookieruncrumbles.com/`；本次沿用该规范主机和现有五种语言路径。没有发布或提交 IndexNow。

## 改动前

| 代表模板 | 无 JS 的 HTTP 响应与结构化数据 |
| --- | --- |
| 首页 | 可见导览和主要栏目。首页有一份 `WebSite`、`Organization`；组织没有描述。 |
| 强度榜 | 五档榜单在 HTML 中。85 个 ItemList 条目、85 个唯一角色链接、英文 sitemap 85 个角色详情一致。 |
| 饼干目录及详情 | 85 张目录卡片，代表页 GingerBrave 的正文、技能、基础属性都在 HTML 中。详情 schema 没有角色分类或升星字段；sitemap 用强度榜日期，页面没有可见资料日期。 |
| 宠物目录 | 61 张卡片的效果在 HTML 中。不存在独立宠物详情路由；该类深层 URL 返回 404。 |
| 配队 | 首屏 HTML 有 7 套阵容；线上 ItemList 声明 35 套。其余配队通过现有 JS 分页和筛选查看。 |
| 兑换码 | 三张卡片及兑换步骤在 HTML 中。日期可见，但“有效”需要按查核时间理解。 |
| 攻略 | 列表为 CollectionPage / ItemList；详情为 BlogPosting / FAQPage / BreadcrumbList。初学者攻略可见五组 FAQ；数组中至少有一个问题和多个回答不是原文。文章作者与 publisher 名不同；展示日期不是 `<time>`。 |
| 工具 | 目录是 CollectionPage / ItemList；独立工具是 WebApplication。原始工具说明 HTML 可读；交互、动态表格需 JS。部分应用描述字段没有对应展示。 |
| 关于、联系、隐私、免责声明 | AboutPage、ContactPage 或 WebPage，带 BreadcrumbList。有些 schema 日期缺少可见对应；关于页曾显示 8 月 28 日，schema 则为 8 月 30 日。 |
| 404、robots、sitemap | 404 的 OG 图片为 `http://localhost:3000/opengraph-image?…`；常规页面图片正确。robots 为 `User-Agent: * / Allow: /`。栏目 schema 在非首页引用了该文档未定义的站点 ID。 |

品牌原写法：`CookieRun: Crumble Guide` 用于 `og:site_name`、creator、publisher、首页实体、页脚；`Crumble Guide` 用于 application-name 和攻略署名；`CRUMBLE GUIDE` 是页眉及分享图字标；“Crumble Guide Editorial Team”出现在关于、联系和隐私说明，描述编辑团队。此次统一面向搜索与阅读的站点实体、页脚和攻略作者为 `Crumble Guide`，详情标题使用 `CookieRun: Crumble Guide` 后缀。

## 改动清单

| 文件 | 改动 |
| --- | --- |
| `src/app/robots.ts`、`src/app/llms.txt/route.ts`、`src/app/sitemap.ts` | 公共内容继续允许抓取；规则只排除无内容路径和内部搜索参数。生成七个栏目、五种语言及更新规则的 llms.txt。保留既有 URL 和 hreflang；sitemap 日期与页面日期使用同一来源。 |
| `public/92cb58da303d450c9e49772a63e75864.txt`、`scripts/publish-cloudflare.mjs`、`package.json` | 公开 IndexNow key；未来发布成功后才提交变更及删除 URL；首次发布这次全站模板改动时提交全部规范页。失败记日志，可重试。 |
| `next.config.ts`、`src/app/global-not-found.tsx`、`src/app/opengraph-image/route.tsx`、`public/_headers` | 独立全局 404 metadata；在原 URL 提供 PNG，明确图片和 llms.txt 的响应类型。 |
| `src/lib/site-identity.ts`、`src/lib/metadata.ts`、`src/lib/seo.ts`、`src/lib/structured-data.ts`、`src/i18n/translate.ts`、`src/components/{site-document,site-header,site-footer,structured-data,seo-page-header,last-updated,direct-answer}.tsx`、`src/app/globals.css` | 共享品牌、canonical 实体 ID 和日期样式。每份文档定义同一对实体，站点名保持不变，描述本地化。保留版权和非官方声明。 |
| `src/components/tier-list-view.tsx`、`src/lib/direct-answers.ts` | 首段报告 S 档和总数；ItemList 链接直达对应详情，数量取自同一榜单。 |
| `src/app/(monetized)/cookies/[slug]/page.tsx`、`src/components/cookie-detail.tsx`、`src/lib/cookie-details.ts` | 角色短答案列稀有度、属性、定位与最高星级；schema 同源。另标图鉴数据快照日期。 |
| `src/app/(monetized)/pets/page.tsx`、`src/components/{entity-card,entity-codex}.tsx` | 目录使用一行简介。宠物卡显示图片、稀有度、名称和效果，卡片锚点可直达，schema 列稀有度和效果。 |
| `src/app/(monetized)/teams/page.tsx`、`src/app/(ad-free)/codes/page.tsx` | 配队报告总阵容及首屏条数，schema 仅标首屏。兑换码报告有期限的查核结果和兑换方式。保留已有筛选、分页及广告。 |
| `src/app/(monetized)/guides/{page.tsx,[slug]/page.tsx}`、`src/components/{guides-explorer,guide-card,team-showcase}.tsx`、`src/data/guide-answers.ts`、`src/lib/guide-faq.ts` | 攻略目录输出首屏 5 张卡片；schema 对应这 5 张。对 30 篇英文攻略和已发布的 116 个翻译版加入对应语言摘要。作者和 publisher 引用 Crumble Guide；FAQ 直接读可见 MDX；沿用文章复核日期。攻略卡与配队卡采用同一日期样式。 |
| `src/app/(monetized)/tools/**`、`src/app/(ad-free)/tools/**`、`src/components/tools/{tool-page,original-tool}.tsx`、`src/lib/tool-answers.ts` | 工具入口、两个编排器、三个计算器都有短答案。计算器说明在原始 H1 后，不需执行 JS；数据来自 2026-10-14 的 1.5.002 快照。 |
| `src/app/(monetized)/page.tsx`、`src/app/(ad-free)/{about,disclaimer}/page.tsx`、`src/components/trust-page.tsx`、`src/data/data-method.ts`、对应 `src/app/[locale]/` 包装路由 | 首页和信任页有可见日期；关于页以五种语言说明出处、复核方法与触发条件。 |
| `src/lib/seo.test.ts`、`scripts/verify-geo.mjs` | 保留原测试并增加导出验证：短答案、日期、实体引用、ItemList、FAQ、发现文件及 404。 |

## 本地验收

- 静态导出包含 656 个规范 URL、616 个短答案和 35 个 ItemList。654 对可见 FAQ 与 JSON-LD 逐条一致，所有站点实体引用在本页均能解析。对 425 个饼干详情比较了 H1 和 schema 实体名称及四项可见属性。
- 无 JS 的 HTTP 检查：本地 Cloudflare Workers Assets 用 `curl` 取回 26 个 URL。中、英、日、韩、泰短答案均在 HTML；计算器的说明可读，计算状态仍由 JS 执行。`/llms.txt` 与 key 返回 `200 text/plain`，`/opengraph-image` 返回 `200 image/png`，不存在的 URL 返回 404 并输出生产图片地址。
- 浏览器：14 个代表页面分别在 1366px 和 390px 视口抽检，H1 均为 26px，无横向溢出；检查时按规则排除了强度榜的大档位标签。截图及原始记录在本地 `output/playwright/geo/`，没有为每个页面和语言组合单独截图。
- Tier List 和 Teams 的英文简介正文按 20–30 词检查。其他英文短答案按 40–60 词检查，其他语言检查本地化和内容。没有在游戏客户端重新复核历史攻略，也没有提交给线上结构化数据检查工具或查询 Bing 实际收录。

## 发布后人工操作

1. 登录 [Bing Webmaster Tools](https://www.bing.com/webmasters/)，选择或验证 `https://www.cookieruncrumbles.com/` 站点；到 [Sitemaps](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed) 提交或重新提交同一站点的 `/sitemap.xml`。
2. 到 [IndexNow](https://www.bing.com/webmasters/help/indexnow-0z209wby) 查看发布后的 URL 接收记录。key 由协议读取公开文件，无需在后台另填。如果发布日志显示 sitemap 或 key 尚未更新，等线上生效后在同一个工作区运行 `npm run indexnow:submit`。
3. 在 URL Inspection 检查强度榜、一篇攻略、一个角色详情和一个语言页的 canonical、抓取和索引状态。对遗漏的代表页按需请求索引；提交成功和正式收录是两件事。
