---
title: "完整文章 Frontmatter 範本與說明"
description: "這是一篇不會發布的範本檔案，包含 Lipi 網站模板支援的所有設定欄位與說明。"
published: 2026-08-18
updated: 2026-08-18
category: "範本說明"
tags:
  - "template"
  - "guide"
cover: "./attachments/cover.jpg"
draft: true
lang: "zh-TW"
annotation: "這是一行手寫風格的筆記註解~"
---

# Frontmatter 欄位完整說明

這份檔案保存在 `src/content/posts/template-guide.md` 中，因為設定了 `draft: true`，所以**絕對不會發布**到線上網站。您在 Obsidian 中寫新文章時，可以隨時參考或複製上方 `---` 之間的 Frontmatter 設定。

---

## 各欄位說明對照

| 欄位名稱 | 資料類型 | 是否必填 | 說明與預設行為 | 範例 |
|---|---|---|---|---|
| `title` | 字串 | **必填** | 文章主標題 | `title: "山的小學第一天"` |
| `description` | 字串 | 建議填寫 | 文章摘要／導讀。會顯示在首頁列表、文章標題下方、SEO 與分享卡片中 | `description: "緊張依舊，但感動非凡"` |
| `published` | 日期 | **必填** | 發布日期 (格式：`YYYY-MM-DD`)。文章依此日期排序（最新在最前面） | `published: 2026-08-18` |
| `category` | 字串 | 選填 | 文章分類（顯示在文章上方橘色字體）。若沒寫預設顯示 `Travels` | `category: "育兒"` |
| `tags` | 陣列 | 選填 | 標籤列表（顯示於文章底部 `filed under` 區域與歸檔頁） | `tags:\n  - "生活"\n  - "隨筆"` |
| `draft` | 布林值 | 選填 | 草稿開關。`true` 代表草稿（**不發布**），要發布時改為 `false` | `draft: true` |
| `cover` | 字串 | 選填 | 文章封面圖路徑。會顯示在文章頂部與社群分享圖 (OG Image) | `cover: "./attachments/cover.jpg"` |
| `updated` | 日期 | 選填 | 文章更新日期 (格式：`YYYY-MM-DD`) | `updated: 2026-08-18` |
| `lang` | 字串 | 選填 | 文章語言設定 | `lang: "zh-TW"` |
| `annotation` | 字串 | 選填 | 手寫風格短語，會在文章頁頂部標題附近渲染出一行草書註解 | `annotation: "值得紀念的一刻"` |
