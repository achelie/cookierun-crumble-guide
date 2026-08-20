# CookieRun: Crumble Guide MVP

一个无数据库、无后端的 CookieRun: Crumble 英文攻略站。生产域名按 `https://www.cookieruncrumbles.com` 配置。

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

Cloudflare 使用 OpenNext 适配器。`npm run preview` 会在本地 `workerd` 环境中运行，比普通 Next.js 开发服务器更接近线上。

## 数据与图片

- Cookie、Pet、Tier List 和 Codes 使用 2026-08-19 的公开游戏数据快照。
- 70 张 Cookie 图片保存在 `public/images/cookies/`。
- 54 张 Pet 图片保存在 `public/images/pets/`。
- 页面运行时不 hotlink 外部图片。
- 本站为非官方粉丝攻略站，游戏名称与美术资源版权归 Devsisters 所有。
