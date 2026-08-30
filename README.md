# webui — 动效 UI 资源库后台管理系统

管理 5 大动效/UI 资源版块的后台系统,每个版块下挂真实二级分类与资源条目:

| 版块 | 站点 | 二级分类数 |
|---|---|---|
| Aceternity UI | ui.aceternity.com | 5(背景/卡片/文字/交互/Blocks) |
| MotionSites | motionsites.ai | 7(SaaS/Hero/Landing/Portfolio/Agency/Web3/其他) |
| React Bits | reactbits.dev | 5(文字动画/动画/背景/组件/工具) |
| Uiverse | uiverse.io | 6(按钮/卡片/加载器/输入/开关/其他) |
| Anime.js | animejs.com | 5(基础/核心API/交互/效果/进阶) |

## 技术栈

- 前端:React 18 + Vite + TypeScript + Tailwind CSS v4(深色霓虹)
- 后端:Express + Node 22 内置 `node:sqlite`(SQLite 文件库,零原生依赖)
- 鉴权:scrypt 密码哈希 + Bearer token 会话(7 天)

## 本地开发

```bash
npm install
npm run build          # 构建前端到 dist/
npm start              # 启动 http://localhost:3001 (admin / admin123)
# 或开发模式:先 npm start 再 npm run dev(Vite 5173,自动代理 /api)
```

## 功能

- 仪表盘:统计卡片、版块资源分布、收藏速览、最新资源
- 版块/分类:三级结构 CRUD,版块可启停
- 资源条目:搜索 + 版块/分类/状态/标签过滤、批量收藏/打标签/删除、分页
- 设计资产库:`design/` 设计图画廊,可关联资源作封面,一键扫描新图
- 系统设置:改密码、JSON 导出/恢复(整库迁移)

## 部署

见 [DEPLOY.md](./DEPLOY.md)(PM2 + nginx,Node ≥ 22)。

## 目录

```
design/          # 界面设计图(25 张计划,已生成 10 张)
server/          # Express API + SQLite(data.db 首次启动自动生成)
src/             # React 前端
deploy/          # nginx 配置样例
```
