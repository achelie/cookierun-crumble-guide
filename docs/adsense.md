# cookieruncrumbles.com 手动广告操作手册

## 广告位

真实投放默认关闭。表内「基础」表示开启全站投放后生效。窄屏为 768px 以下，紧凑布局为 768–1199px，桌面为 1200px 起。紧凑布局沿用窄屏广告形态。实际容器宽度决定是否请求广告。

| 页面和位置 | 配置键 | 窄屏与紧凑 | 桌面 | 启用 |
| --- | --- | --- | --- | --- |
| 首页 Browse the guide 入口组之后 | `home-after-browse` | 横向 Display | 横向 Display | 基础 |
| 工具目录两组完整工具卡之后 | `tools-after-directory` | 横向 Display | 横向 Display | 基础 |
| Cookies 和 Pets 第一批完整行之后 | `cookies-after-first-rows`、`pets-after-first-rows` | 矩形 Display | 容器宽至少 600px 时横向 Display | 基础 |
| Cookie 档案的技能、属性、战斗和收藏资料之后 | `cookie-after-profile` | 矩形 Display | 矩形 Display | 基础。至少有基础属性，以及一项有说明和数值的技能 |
| 完整 S 档与 A 档之间 | `tier-between-s-and-a` | 矩形 Display | 横向 Display | 基础 |
| S–D 榜单及补充排名资料之后 | `tier-after-ranks` | 矩形 Display | 横向 Display | 基础 |
| 队伍第 2 个完整队伍之后 | `teams-after-second` | 矩形 Display | 横向 Display | 基础 |
| 队伍第 4 个完整队伍之后 | `teams-after-fourth` | 矩形 Display | 横向 Display | 基础 |
| 队伍第 6 个完整队伍之后 | `teams-after-sixth` | 矩形 Display | 横向 Display | 基础 |
| 攻略目录第一张重点卡与随后一整行之后 | `guides-after-first-rows` | 矩形 Display | 横向 Display | 基础。当前页至少 5 篇 |
| 攻略首个完整答案章节之后 | `guide-after-answer` | In-article | In-article | 基础 |
| 长攻略中部章节之后 | `guide-mid-article` | In-article | In-article | 默认关闭 |
| 糖符文、星链、装备盘计算器的独立参考区之后 | `sugar-runes-after-reference`、`stellar-link-after-reference`、`plate-enhancement-after-reference` | 横向 Display | 横向 Display | 基础 |

- Cookies/Pets 按网格实际列数放在前 5、6 或 8 张卡之后，且须有后续结果。搜索或筛选结果不足时移除该位。本次页面访问中已经请求过的广告位不会因清除筛选而重新请求。
- 攻略从已有目录读取章节 ID，并在完整 MDX `GuideSection` 之后放置广告。基础位要求至少 4 分钟和 3 个目录章节。长文要求至少 8 分钟和 6 个章节。第二处放在前半部分最后一个完整章节之后。阈值在 `src/lib/ads/config.ts` 的 `guideAdRules`。编写新攻略时让首个目录章节提供核心答案，目录和正文需使用相同 ID。
- In-article 高度由 AdSense 决定。预留空间只设最小高度。横向容器不足 250px，或矩形及文章内容器不足 300px 时不请求。
- 兑换码页当前跳过。兑换教程和官方 DevPlay 按钮位于同一块。About、Contact、Privacy、Disclaimer、404、错误页、两个搭建器和空结果无广告位。In-feed、Multiplex 和自动格式未接入首批。

## 构建配置和 AdSense 单元

在 `.env.local` 或构建环境设置下列变量。Next.js 静态导出会在构建时读取 `NEXT_PUBLIC_` 配置，修改后重新构建。

```dotenv
NEXT_PUBLIC_ADSENSE_ENABLED=true
NEXT_PUBLIC_ADSENSE_GOOGLE_CMP_READY=true
NEXT_PUBLIC_ADSENSE_PUBLISHER=ca-pub-7443237558968985
NEXT_PUBLIC_ADSENSE_DISPLAY=6498064854
NEXT_PUBLIC_ADSENSE_IN_ARTICLE=2512707489
```

后三项已有上面的默认值。AdSense 的 **Ads → By ad unit** 已有一组用户提供的响应式 Display 和 In-article 代码，首批无需新建。Display 位置可以共用 `6498064854`。两处 In-article 可以共用 `2512707489`。需要按位置单独看报表时，在后台为该位置创建同类型单元，再把生成代码的 `data-ad-slot` 写入 `NEXT_PUBLIC_ADSENSE_SLOT_OVERRIDES`，格式为 `位置=数字ID,位置=数字ID`。可按 `模板-位置-设备` 命名，例如 `teams-after-second-all`、`guide-after-answer-all`。同一响应式单元用后台平台或设备维度比较。文章首位与中段分别建 In-article 单元。两种类型各用后台生成的对应 ID。发布商变更时同步核对 `public/ads.txt` 中的 `pub-` ID。无效或显式留空的单元 ID 会停用该位。

- `NEXT_PUBLIC_ADSENSE_DISABLED_SLOTS` 用逗号列出暂时停用的位置。
- 队伍按当前页实际显示的队伍数决定是否展示第 2、4、6 队之后的广告位。
- 长攻略用 `NEXT_PUBLIC_ADSENSE_GUIDE_SECOND=inline` 开启第二个正文位。
- `npm run dev` 默认标注 `DEV`，只显示布局占位。开发环境设 `NEXT_PUBLIC_ADSENSE_ENABLED=false` 可隐藏占位。

[响应式尺寸](https://support.google.com/adsense/answer/9183363?hl=en) · [响应式标签参数](https://support.google.com/adsense/answer/9183460?hl=en) · [创建 In-article 单元](https://support.google.com/adsense/answer/9274522?hl=en) · [广告放置政策](https://support.google.com/adsense/answer/1346295?hl=en)

## 上线前后台操作

1. 进入 **Ads → By site → cookieruncrumbles.com → Edit**，关闭 Auto ads，确认 In-page、Anchor、Vignette、自动 Side rails 均未启用，也没有进行中的自动格式实验。点击 **Apply to site**，回到站点列表确认已保存。可关闭 **Fill empty in-page ads**，让未填充单元按本项目逻辑收起。 [Auto ads 说明](https://support.google.com/adsense/answer/9261805?hl=en) · [未填充状态](https://support.google.com/adsense/answer/10762946?hl=en)
2. 在 **Privacy & messaging → European regulations** 为实际站点发布 Google 认证 CMP 消息，核对覆盖 EEA、英国、瑞士，检查同意、拒绝、管理选项、隐私政策链接和适用语言。页脚入口调用 Google 的撤回 API。无广告文档的入口会打开同语言首页再启动该流程。保留 Google 提供的同意记录及撤回机制。 [Google CMP 要求](https://support.google.com/adsense/answer/13554116?hl=en) · [欧盟用户同意政策](https://www.google.com/about/company/user-consent-policy/) · [撤回入口](https://support.google.com/adsense/answer/10959060?hl=en)
3. 在 **Privacy & messaging → US state regulations** 为实际站点发布州法规消息。用当地连接检查 Google 提供的 **Do Not Sell or Share** 入口，验证退出后再次访问仍生效。打开真实浏览器 GPC，在适用州验证请求进入 RDP，并检查后台相应设置。Google 通过 GPP 与适用地区的 GPC 处理信号，代码不按站点语言推断地区。US 入口由 Google 在加载 CMP 的页面渲染，AdSense 的自定义覆盖 API 仅支持 Ad Manager。 [美国消息](https://support.google.com/adsense/answer/10961479?hl=en) · [RDP 与 GPC](https://support.google.com/adsense/answer/14182916?hl=en) · [Privacy & Messaging API](https://developers.google.com/funding-choices/fc-api-docs)
4. 打开 `https://cookieruncrumbles.com/ads.txt` 和 `https://www.cookieruncrumbles.com/ads.txt`，两条路径都应最终返回 HTTP 200 及 `google.com, pub-7443237558968985, DIRECT, f08c47fec0942fa0`。本次两条路径均已验证，裸域最终跳至 `www`。在 AdSense 的 **Sites** 中确认抓取状态。 [Google ads.txt 抓取说明](https://support.google.com/adsense/answer/7679060?hl=en)
5. 仓库当前使用 Ahrefs Web Analytics，未找到 GA4。单独复核 Ahrefs 和 Cloudflare 的配置、隐私披露及适用同意要求。由站长结合目标受众、营销和内容判断是否需要儿童定向处理，并复核现有隐私政策措辞。 [儿童定向处理说明](https://support.google.com/webmasters/answer/3221080?hl=en)
6. 确认前述账户设置后再把两个开关同时设为 `true`。Google 的 AdSense 脚本也负责启动 CMP。每个文档最多加载一次。手动广告请求会等待脚本加载、TCF 状态可用及 GPP 信号就绪。欧洲只在 TCF 明确对 Google 给出所需同意时请求。GPP 报告没有适用地区规则时可继续请求，有适用规则时等同意字符串就绪，由 Google 处理退出信号。欧洲拒绝或状态未知时不会发手动广告请求。 [Google TCF 集成](https://support.google.com/adsense/answer/9804260) · [GPP API](https://developers.google.com/funding-choices/fc-api-docs)

## 验收和回滚

- 在受控发布版本用手机、紧凑布局和宽屏检查广告与前后内容顺序，含 767/768、1199/1200px、缩放、窄容器、泰语长文本及快速导航。检查短列表、无结果、缺失单元 ID、广告拦截和未填充。
- 用新浏览器会话验证欧洲首次访问、接受、拒绝、撤回和重访。用美国适用州连接验证默认、退出、退出后重访及真实 GPC。Google 文档中的调试参数可以验证已发布的消息界面。地区识别、选择持久化、Google 收到的信号与真实填充需要在目标站单独验收。 [消息调试](https://developers.google.com/funding-choices/fc-api-docs#testing_and_debugging_on_your_site)
- 核对广告之外的功能。搜索、筛选、复制兑换码、打开官方兑换链接、计算器的输入和结果、搭建器的拖拽、分享及导出应正常。用开发工具检查每个文档只有一个 AdSense 脚本，每个已激活的位置只请求一次。检查移动端页面无横向滚动，广告文案字号为 12px。
- 全局回滚时设 `NEXT_PUBLIC_ADSENSE_ENABLED=false`，重新构建并发布静态产物，或切回已知无广告的部署版本。单位置回滚用 `NEXT_PUBLIC_ADSENSE_DISABLED_SLOTS` 后重新构建。发布后用无缓存会话检查脚本及广告请求消失。保留已核验的 `ads.txt`。

## 实验顺序

先观察基础手动位置，再测试长攻略第二正文位。之后测试 In-feed 替换目录展示位，最后评估 Multiplex 或自动格式。每次改一个主要变量。按设备、模板和国家记录预估收入、页面 RPM、Active View 可见率及站内任务完成情况。用实际报表比较表现。
