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
3. v5.1.0 這個外掛本身內建 MCP server（Streamable HTTP），**不需要**額外裝 `uvx mcp-obsidian` 之類的外部包裝
4. 已在 Local REST API 設定頁打開「Enable non-encrypted (HTTP) server」並完整重啟 Obsidian 讓設定生效，改連 `http://127.0.0.1:27123/mcp/`（純 HTTP，不走自簽憑證那條路）
5. 兩個 client 的設定**形狀不同**（見下），因為 Zed 跟 Claude Code 對 MCP transport 的支援程度不一樣：
   - Zed `%APPDATA%\Zed\settings.json` → `context_servers.obsidian`（stdio + `mcp-remote` 橋接）
   - `~/.claude/settings.json` → `mcpServers.obsidian`（原生 `type: "http"` 直連）

**Claude Code（原生支援，直連即可）**：
```json
{
  "obsidian": {
    "type": "http",
    "url": "http://127.0.0.1:27123/mcp/",
    "headers": { "Authorization": "Bearer <從 .obsidian/plugins/obsidian-local-rest-api/data.json 的 apiKey 複製>" }
  }
}
```

**Zed（必須用 `mcp-remote` 當 stdio 橋接）**：
```json
{
  "obsidian": {
    "timeout": 60,
    "enabled": true,
    "remote": false,
    "command": "C:/Program Files/nodejs/node.exe",
    "args": [
      "C:/Users/eric.kong/AppData/Roaming/npm/node_modules/mcp-remote/dist/proxy.js",
      "http://127.0.0.1:27123/mcp/",
      "--allow-http",
      "--transport", "http-only",
      "--silent",
      "--header", "Authorization: Bearer <apiKey>"
    ]
  }
}
```
前置作業：`npm install -g mcp-remote`（裝到 `%APPDATA%\npm\node_modules\mcp-remote`）。

### 踩過的三個坑（依序發生，都有 Zed.log 證據）

**坑 1：HTTPS 自簽憑證被拒**（原本連 `https://127.0.0.1:27124/mcp/`）
```
ERROR [rustls_platform_verifier::verification::windows] failed to verify TLS certificate:
      invalid peer certificate: UnknownIssuer
ERROR obsidian context server failed to start: error sending request for url (https://127.0.0.1:27124/mcp/)
```
Zed 的 HTTP client（Rust rustls）不會像 `curl -k` 那樣跳過憑證驗證。→ 改走純 HTTP 埠 `27123`。

**坑 2：改成純 HTTP 後，`initialize` 掛 60 秒逾時**
```
ERROR [context_server::client] cancelled csp request task for "initialize" id 0 which took over 60s
ERROR obsidian context server failed to start: Context server request timeout
```
同一個請求用 curl 打是 0.05 秒回應、串流正常關閉，所以 endpoint 沒問題。原因是外掛的 POST 回應是 `content-type: text/event-stream`（Streamable HTTP 規格），而 Zed 內建的 HTTP MCP client 吃不了這種 SSE 形式的回應；外掛也不支援舊版 SSE transport（`GET /mcp/` 直接回 400）。→ 用 `mcp-remote` 把 Streamable HTTP 轉成 stdio 給 Zed。

**坑 3：橋接不要用 `npx.cmd`**。Windows 上 `.cmd` 會經 cmd.exe 二次解析，路徑含空格就炸：
```
'C:\Program' 不是內部或外部命令
```
→ 直接用 `node.exe` 執行 `mcp-remote/dist/proxy.js`（跟同檔案裡 `fetch` 用絕對 `python.exe` 路徑的慣例一致）。

**已驗證可用的 16 個 MCP 工具**（實際跑過 handshake + `tools/list` 確認）：

| 分類 | 工具 |
|---|---|
| 檔案 CRUD | `vault_list`、`vault_read`、`vault_write`、`vault_append`、`vault_delete`、`vault_move`、`vault_copy` |
| 結構化編輯 | `vault_patch`（依標題/區塊/frontmatter 精準插入）、`vault_get_document_map`（取得標題樹） |
| 搜尋 | `search_simple`（Obsidian 內建搜尋）、`search_query`（JsonLogic 查 frontmatter/tags/path） |
| Obsidian 操控 | `command_list`、`command_execute`、`open_file`、`active_file_get_path`、`tag_list` |

**好用的指令 ID**（給 `command_execute` 用，全 vault 共 242 個指令）：

| 指令 ID | 作用 |
|---|---|
| `obsidian-git:push` | Git: Commit-and-sync（一步完成 commit + push，等於觸發 Cloudflare 重新部署） |
| `obsidian-git:pull` | Git: Pull |
| `obsidian-git:open-git-view` | 開啟版本控制面板 |
| `quickadd:choice:e4c7dd7f-0f17-4691-b6d8-f5ffa4ef4387` | QuickAdd: 新增文章（第 5 節那個 Choice） |

意思是：AI Agent 可以「用 `vault_patch` 改文章 → 用 `command_execute` 跑 `obsidian-git:push`」，全程不碰終端機就完成發布。

**注意事項**：
- 這組 endpoint 只在 Obsidian 開著、且 Local REST API 外掛啟用時才活著；Obsidian 關掉 MCP 工具就會斷線。
- 純 HTTP 只綁 loopback（127.0.0.1），不會對外網路暴露，同機器風險可接受；千萬不要把這個埠轉發到網路上。
- 在 Local REST API 設定頁切換「Enable non-encrypted (HTTP) server」這個開關，實測需要**完整重啟 Obsidian**（不是切換分頁）server 才會真的綁定 27123，光切開關、`data.json` 寫入 `true` 不夠。
- omp 的 MCP/Skill discovery 只在 process 啟動時掃一次，改完 Zed `settings.json` 後要整個重啟 `omp.exe acp`（不是只開新對話）才會出現新工具。
- **換裝置時**：金鑰是逐機器產生的，不會跟著 vault 同步過去。新機器要重跑一次：①開啟 Obsidian ②到 Local REST API 設定頁打開 HTTP server 開關 ③重啟 Obsidian ④`npm install -g mcp-remote` ⑤讀新的 `data.json` 拿 apiKey ⑥更新兩邊設定檔（注意 node.exe 與 mcp-remote 的實際路徑可能不同）
