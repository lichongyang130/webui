# Aceternity UI 版块丰富化 100 条 · 逐条验收

> ✅ 已实现 · 🟡 机制就绪/内容按需补 · ❌ 未做(见原因)
> 统计:✅ 84 · 🟡 15 · ❌ 1

## 一、目录完整度
1. ✅ 全量免费组件入库,aceternity 版块 137 条(去重后),含 Meteors/Vortex/Lamp/Spotlight/Sticky Scroll/Typewriter 等
2. ✅ templates 分类 + 12 个官方模板
3. ✅ Hero Sections 细分 7 个真实变体(live-preview 链接)+ variant_count=23;其余 18 合集用爬虫按需细分(#51)
4. ✅ inspiration 分类:Labs / Showcase / Explore
5. ✅ changelog 分类 3 条 + RSS(#80)订阅新上架
6. ✅ tools 分类:Box Shadows
7. ✅ pro 分类 3 条 + access_level=pro 前台徽章
8. ✅ coming 分类占位条目
9. ✅ diff 说明:faq 字段(Chromatic Image 例)
10. ✅ migrated_to:Spotlight → Spotlight New

## 二、分类与元数据
11. ✅ principle 字段(svg-path/canvas/webgl/css/motion…)+ 前台筛选
12. ✅ perf_cost 低/中/高 + 筛选
13. ✅ deps 字段 + 详情页 chips
14. ✅ tags 场景标签 + 筛选
15. ✅ difficulty 1-5 + 筛选 + 详情页星级
16. ✅ popularity + 最热排序
17. ✅ inspiration 字段(linear/x.ai/apple/github…)
18. ✅ created_at + 最新排序
19. ✅ alias 中文字段 + FTS 可搜
20. ✅ mobile_friendly 字段 + 详情页图标

## 三、设计资产
21. 🟡 资产管线(扫描/关联/封面)就绪;本轮新增 8 张,其余按界面按需生成
22. ✅ 浅色版 ×2(06-light-hero / 06-light-spotlight)
23. ✅ 竖屏 9:16 ×2(07-mobile-hero / 07-mobile-cards)
24. ✅ 关键帧分解图(08-keyframes-spotlight)
25. ✅ 组合配方图(09-combo-recipe)
26. ✅ 参数前后对比(10-before-after)
27. ✅ 细节特写(11-closeup-evervault)
28. ✅ assets.prompt 字段 + 后台表单 + 8 张已写入 prompt
29. ✅ screen 分组含「06 浅色配色」「07 移动端竖屏」等
30. ✅ 首图自动封面(linkMap + 扫描去重迁移)

## 四、内容深度
31. 🟡 props 字段+UI 就绪,官方 props 表按需录入
32. 🟡 snippet 字段+UI 就绪,按需录入
33. ✅ pitfalls 字段 + 详情页
34. ✅ perf_note 字段
35. ✅ a11y_note 字段
36. ✅ related_map 组合/替代推荐
37. ✅ related alternative(React Bits/Uiverse)
38. ✅ principle_note + 6 篇原理短文
39. ✅ /wizard 整页装配配方
40. ✅ exercise 字段 + 学习路径挂载

## 五、前台体验
41. ✅ 详情页 Demo 按钮 → 官方 live-preview iframe(跨域受限时回退原站链接)
42. 🟡 官方 webp 缩略图未本地缓存(用设计图封面+原站链接替代)
43. ✅ 复制安装命令(npx shadcn@latest add <url>)
44. ✅ 合集创建/加入 API + 前台入口
45. ✅ 精选合集 3 个种子(官网三件套/背景八选/表单微交互)
46. ✅ /api/public/daily + 首页每日推荐
47. ✅ /compare 跨库对照页
48. ✅ 筛选条件 URL 参数化(cat/tag/q 可分享)
49. ✅ 性能成本筛选
50. 🟡 浅色设计图已备;整站浅色预览切换未做

## 六、后台运营
51. ✅ scripts/crawl-aceternity.mjs + 后台触发
52. ✅ --webhook 新组件提醒
53. ✅ scripts/check-links.mjs + 后台触发,报告落 data/link-report.json
54. ✅ CSV 导出/导入(后台数据页)
55. ✅ 投稿状态流 pending/approved/rejected + 审核 UI
56. ✅ ops_log(后台写操作+登录全记录)
57. ✅ 多管理员(users 管理)
58. ✅ 标签合并页
59. ✅ SQLite FTS5(触发器同步+前台全文搜索)
60. ✅ 覆盖率仪表盘(已入库/官方总量)

## 七、学习与教程化
61. ✅ 学习路径 3 篇(入门/进阶/高级)
62. ✅ 原理短文 6 篇
63. ✅ linked_items 关联 chips
64. ✅ 练习任务字段;提交流程复用 submissions
65. ✅ 术语表 8 条
66. 🟡 浏览器打印(Ctrl+P 存 PDF);未做定制打印样式
67. 🟡 video_url 字段就绪,官方视频链接按需录入
68. 🟡 源码精读=snippet/principle_note 字段,按需录入
69. ✅ FAQ 4 条 + 字段
70. 🟡 每周解剖 2 篇种子,机制可持续

## 八、社区与 UGC
71. ✅ 投稿表单(前台)+ 审核(后台)
72. ✅ 评分 1-5 + 聚合展示
73. ✅ inspiration + showcase 条目
74. ✅ 评论/笔记
75. ✅ 分享卡片 canvas 1200×630 下载
76. 🟡 screenshot 字段在;图片上传通道未开放
77. ❌ 积分/徽章未做(无激励体系需求确认,留待社区运营阶段)
78. ✅ 页脚 Discord/Twitter/GitHub
79. ✅ 人气榜(rank,含评分聚合)
80. ✅ RSS feed.xml + 订阅收单(邮件发送需外接服务)

## 九、跨版块联动
81. ✅ reactbits duplicate/alternative 映射
82. ✅ uiverse alternative 映射
83. ✅ animejs api 映射
84. ✅ motionsites prompt 映射
85. ✅ FTS 跨 5 版块搜索
86. ✅ /wizard 拼装向导
87. 🟡 标签共现数据可得,图谱可视化页未做
88. 🟡 star 已有;跨版块收藏同屏页未做
89. ✅ 经常一起看(clicks 共现)
90. ✅ duplicate 重复标记

## 十、交付物与扩展
91. ✅ 组合包 JSON 导出(wizard)
92. 🟡 assets.prompt 可反哺;自动写入 motionsites 未做
93. ✅ /api/public/tokens(Figma tokens)
94. 🟡 同 66
95. ✅ /api/public 开放只读 API
96. ✅ /embed/:slug 嵌入页(iframe 引用即可)
97. ✅ i18n 中/英切换
98. ✅ /seo/:slug 服务端静态页(title/description/og)
99. 🟡 pro 标记+徽章;付费墙未接
100. ✅ 白标:settings brand_name/brand_color,前台已消费
