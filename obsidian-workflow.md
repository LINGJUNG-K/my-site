# Obsidian 寫作與發布流程筆記

記錄從安裝 Obsidian Git 外掛之後的所有設定，方便之後查閱或換裝置時重新設定。

## 1. Obsidian Git 外掛

**安裝**：設定 → 社群外掛 → 關閉安全模式 → 瀏覽 → 搜尋「Git」（作者 Vinzent / Vinzent03）→ 安裝 → 啟用

**設定（設定 → Git）**

| 項目 | 建議值 | 說明 |
|---|---|---|
| Auto commit-and-sync interval (minutes) | 10~15 | 定時自動 commit + push |
| Auto commit-and-sync after stopping file edits | 開啟 | 停止打字一段時間後也觸發同步 |
| Pull on startup | 開啟 | 啟動時先拉最新版本，避免多裝置衝突 |
| Push on commit-and-sync | 開啟 | 確保自動同步有推上 GitHub |
| Auto pull interval (minutes) | 10~15 | 跟上面同步頻率一致即可 |
| Merge strategy | Merge（預設） | 單人使用維持預設最單純 |

若提示找不到 git，設定裡填 Git binary path，通常是：
`C:\Program Files\Git\cmd\git.exe`

## 2. 文章資料夾結構

Lipi 模板採「一篇文章一個資料夾」的結構：

```
src/content/posts/
  └── my-post/
        ├── index.md          ← 文章本體
        ├── attachments/      ← 封面圖、內文插圖
        │     ├── cover.jpg
        │     └── section-image.jpg
        └── gallery/          ← 相簿功能，自動偵測，需手動建立
              ├── 01-first.jpg
              └── 02-second.jpg
```

- `cover` 欄位路徑寫法：`cover: ./attachments/cover.jpg`
- 內文插圖語法：`![說明文字](./attachments/section-image.jpg)`
- `gallery/` 資料夾目前沒有自動化，用不到就不用建

## 3. Frontmatter 格式（對應 src/content.config.ts）

```yaml
---
title: "文章標題"        # 必填
description: "一句話簡介"  # 必填
published: 2026-08-13    # 必填，格式 YYYY-MM-DD
updated:                 # 選填
category: "分類"          # 選填，預設 "Travels"
tags: ["標籤1", "標籤2"]   # 選填
cover: ./attachments/cover.jpg  # 選填，相對路徑或完整網址皆可
draft: false              # 選填，預設 false
lang:                     # 選填
annotation:               # 選填，手寫風格短語
---
```

## 4. Obsidian 設定：附件自動存放

設定 → Files and Links → Default location for new attachments
→ 改成 **In subfolder under current file**，資料夾名稱填 `attachments`

效果：貼圖片時會自動存進該篇文章同層的 `attachments/` 資料夾，不用手動搬移。
`gallery/` 資料夾例外，需要手動建立（右鍵文章資料夾 → New folder → 命名 `gallery`）。

## 5. QuickAdd：一鍵新增文章

**安裝**：設定 → 社群外掛 → 瀏覽 → 搜尋「QuickAdd」→ 安裝 → 啟用

**範本檔內容**（存在 vault 裡任一位置，不要放進 src/content/posts）：

```
---
title: "{{VALUE:title}}"
description: "{{VALUE:description}}"
published: {{DATE}}
category: "{{VALUE:category}}"
tags: []
draft: true
---


```

**QuickAdd Choice 設定**（設定 → QuickAdd → Add choice → 類型選 Template）：

| 欄位 | 填入內容 |
|---|---|
| Template Path | 上面那個範本檔 |
| Set file name format | `{{VALUE:slug}}/index` |
| Create in folder | `src/content/posts` |
| Open | 開啟（建立後自動打開） |

設定好後可在 QuickAdd 主畫面開啟閃電圖示，或指定熱鍵快速執行。
執行時會依序詢問 slug、title、description、category，自動建好資料夾與 index.md。

> 已直接寫入 `.obsidian/plugins/quickadd/data.json` 完成設定（choice 名稱「新增文章」），範本檔實際放在 `Templates/post-template.md`。換裝置只需把 vault 整個資料夾（含 `.obsidian/`）同步過去即可沿用，不用重新跑一次 GUI 設定。

## 6. 網站設定檔

實際路徑：**`configs\user.config.ts`**（注意不是 README 寫的 lipi.config.ts，模板已更新但文件未同步）

主要欄位：`title`、`description`、`url`、`author`、`logo`、`avatar`、`navigation`、`footerLinks`、`social`、`footerCredits`、`postsPerPage`、`recentPosts`、`relatedPosts`、`showThemeToggle`、`showReadingTime`、`heroVariant`、`annotation`

不需要的項目（例如 `social` 裡的範例連結）可以用 `/* ... */` 註解掉保留，不會影響建置。

`src/assets` 資料夾是模板自己的介面圖示（箭頭、深色模式圖示、logo、字型），**不是**文章圖片要放的地方。

## 7. 如何推送更新

**方式一：Obsidian Git**
`Ctrl+P` 打開命令面板 → 輸入「commit」→ 選 **Git: Commit-and-sync**
（想自訂 commit 訊息用 **Git: Commit-and-sync with specific message**）

**方式二：終端機**

```powershell
cd C:\Users\eric.kong\site
git add .
git commit -m "更新內容"
git push
```

**確認發布成功**：Cloudflare Pages 儀表板看建置日誌，或直接開
`https://my-site-8sm.pages.dev` 確認網站已更新（通常 1~2 分鐘內完成）。

## 8. GitHub 推送帳號設定（多帳號同機器）

這台機器上同時登入過 sf-cafe、LINGJUNG-K 兩個 GitHub 帳號，HTTPS + Git Credential Manager 只認一組快取，容易把 push 導去錯的帳號（`403`）。改用 SSH，每個帳號各自一把 key、各自一個 host 別名，一勞永逸：

**`~/.ssh/config`**
```
Host github-lingjungk
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_lingjungk
    IdentitiesOnly yes
```

**這個 repo 的 remote**（換裝置需重新設定一次）：
```bash
git remote set-url origin git@github-lingjungk:LINGJUNG-K/my-site.git
```

key 沒加到新裝置時，先 `ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_lingjungk`，把 `.pub` 內容貼到 GitHub → Settings → SSH and GPG keys → New SSH key（用 LINGJUNG-K 帳號登入貼）。

Obsidian Git 外掛呼叫的是系統 `git.exe`，跟終端機共用同一份 SSH 設定，不用額外設定。

## 9. Obsidian MCP Server（給 AI Agent 用）

讓 Zed 裡的 AI Agent（omp、claude-acp）能透過 MCP 直接操作這個 vault（依標題/區塊插入內容、觸發 Obsidian 指令、用 Obsidian 自己的搜尋索引），而不只是單純讀寫檔案。

**已完成**：
1. 安裝並啟用 **Local REST API** 外掛（`coddingtonbear/obsidian-local-rest-api`，v5.1.0，從官方 GitHub Release 下載，sha256 核對過），vault 內對應 `.obsidian/plugins/obsidian-local-rest-api/`
2. 該外掛的 `data.json`（含 API key 與 TLS 憑證私鑰）已加進 `.gitignore`，絕對不會被 commit 上 GitHub
3. v5.1.0 這個外掛本身內建 MCP server（Streamable HTTP，endpoint 是 `https://127.0.0.1:27124/mcp/`），**不需要**額外裝 `uvx mcp-obsidian` 之類的外部包裝
4. 已把 API key 寫進：
   - Zed `%APPDATA%\Zed\settings.json` → `context_servers.obsidian`
   - `~/.claude/settings.json` → `mcpServers.obsidian`

設定格式（兩邊都是同一把 key，`headers.Authorization` 是 `Bearer <apiKey>`）：
```json
{
  "url": "https://127.0.0.1:27124/mcp/",
  "headers": { "Authorization": "Bearer <從 .obsidian/plugins/obsidian-local-rest-api/data.json 的 apiKey 欄位複製>" }
}
```

**注意事項**：
- 這組 endpoint 只在 Obsidian 開著、且 Local REST API 外掛啟用時才活著；Obsidian 關掉 MCP 工具就會斷線。
- 憑證是外掛自簽的 TLS 憑證（非受信任 CA），走的是 loopback（127.0.0.1），Zed／Claude 的 HTTP MCP client 都能直接吃，不用額外處理。
- omp 的 MCP/Skill discovery 只在 process 啟動時掃一次，改完 Zed `settings.json` 後要整個重啟 `omp.exe acp`（不是只開新對話）才會出現新工具。
- **換裝置時**：金鑰是逐機器產生的，不會跟著 vault 同步過去。新機器要重跑一次「開啟 Obsidian → 讀新的 `data.json` 拿 apiKey → 更新兩邊設定檔」。
