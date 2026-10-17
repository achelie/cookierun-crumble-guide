# 本地关键词取证：2026-10-17

Google Trends 已取得台湾、日本、韩国、泰国各两组结果：目标地区、全部类别、Google 网页搜索，分别为近 12 个月与近 90 天。此前的 429 已通过用户浏览器中的可见图表完成取证；没有绕过验证码。原始观察包含失败或未加载完的尝试，整理后的 evidence 只采用已显示的有效图表。

| 地区 | 比较词 | 12 个月图内平均指数 | 90 天图内平均指数 | 页面用词 |
| --- | --- | --- | --- | --- |
| 台湾 | 薑餅人放置大戰爭 / CookieRun Crumble | 10 / 0 | 17 / 0 | 采用繁中游戏名；序號、攻略、角色有相关查询证据 |
| 日本 | クッキーラン クランブル / CookieRun Crumble | 6 / 0 | 0 / 1 | 采用官方日文名；近期日语样本很稀疏，90 天内仍有 1 个非零采样日 |
| 韩国 | 쿠키런 키우기 / 쿠키런 크럼블 | 1 / 10 | 1 / 32 | 标题采用常搜的 크럼블，简介兼顾官方 키우기 |
| 泰国 | CookieRun Crumble / คุกกี้รัน ครัมเบิล | 7 / 0 | 4 / 0 | 保留官方英语游戏名，说明与功能用泰语 |

这些是各自比较图内的相对兴趣指数，不能跨地区、跨时间图直接比较，更不能换算成月搜索量。平均值 0 也不等于无人搜索：日本日语词在 90 天图中有非零采样日，但平均值取整后为 0。泰语音译在两段时间内均未观察到非零值，因此没有把它标成有效主词。

台湾 90 天页面显示上升相关查询「薑餅人放置大戰爭序號」「薑餅人放置大戰爭攻略」「薑餅人放置大戰爭角色」，分别对应 `/zh-tw/codes/`、`/zh-tw/`、`/zh-tw/cookies/`。Google 显示的字间空格只在报告中合并，不改变原始记录。「巴哈」属于论坛导航意图，未用作本站目标词。

强度榜、配队、角色养成和计算器等更长查询均保留为**辅助长尾、尚未验证**。没有用游戏名的搜索兴趣冒充某篇攻略或某个计算器的搜索量。`page-keyword-map.json` 为 180 个新增语言页面逐页保存意图、候选词、证据编号与状态；具体攻略使用不同主题，目录页负责浏览，工具页负责操作。

## 文件

- `trends-observations-2026-10-17.json`：浏览器可见表格和观察记录，包含未完成尝试。
- `keyword-evidence.json`：筛选后的 8 组有效比较，含来源链接、词、相对指数、非零采样数与相关查询。
- `trends-observed-data.csv`：由已观察的表格生成的 CSV，**不是伪称 Google 下载的原始导出**。台湾 90 天为当时保存的摘要和最近 8 行，其余为完整可见时间表；capture 列明确区分。
- `page-keyword-map.json` / `.csv`：地区—关键词—时间证据—目标页面清单。

官方名称依据：[台湾 App Store](https://apps.apple.com/tw/app/id6749251466)、[日本 App Store](https://apps.apple.com/jp/app/id6749251466)、[韩国 App Store](https://apps.apple.com/kr/app/id6749251466)、[泰国 App Store](https://apps.apple.com/th/app/cookierun-crumble-idle-rpg/id6749251466)及[泰语官方网站](https://cookieruncrumble.com/th)。

实现依据：[Google 多语言页面规范](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh-cn)、[Google Trends 数据说明](https://support.google.com/trends/answer/4365533?hl=zh-Hans)。
