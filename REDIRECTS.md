# REDIRECTS.md — 舊頁 → 新路由對應

兩個舊靜態站整併為一個 Next.js App Router 站（本 repo，`stock-scout`）。
部署新站時，請為舊網域/路徑設定 301 轉址到下表新路由。

## 舊站 A：到價哨兵（stock-alerts）

舊基底：`https://yam4111887-gif.github.io/stock-alerts/`

| 舊頁 | 新路由 |
| --- | --- |
| `/` （index.html，工具首頁） | `/zh-TW/alerts` |
| `/about.html` | `/zh-TW/about` |
| `/privacy.html` | `/zh-TW/privacy` |
| `/disclaimer.html` | `/zh-TW/disclaimer` |
| `data/quotes.json` | `/data/quotes.json`（路徑不變，腳本改寫到 `public/data/`） |
| `scripts/update-quotes.js` | `scripts/update-quotes.js`（同功能，輸出路徑改為 `public/data/quotes.json`） |

備註：舊站的觀察清單存於瀏覽器 localStorage（舊 key `ps-watchlist` / `ps-history`）。
新站使用新 key `ss-watchlist` / `ss-history`（網域不同本來就不共用），使用者需重新輸入。

## 舊站 B：台股前哨站（stock-scout，本 repo 的前身靜態版）

舊基底：`https://yam4111887-gif.github.io/stock-scout/`

| 舊頁 | 新路由 |
| --- | --- |
| `/` （index.html） | `/zh-TW` |
| `/ccl-supply-chain.html` | `/zh-TW/guides/ccl-supply-chain` |
| `/inp-supply-chain.html` | `/zh-TW/guides/inp-supply-chain` |
| `/copper-foil.html` | `/zh-TW/guides/copper-foil` |
| `/freight-guide.html` | `/zh-TW/guides/freight-guide` |
| `/dividend-guide.html` | `/zh-TW/guides/dividend-guide` |
| `/vix-guide.html` | `/zh-TW/guides/vix-guide` |
| `/etf-active.html` | `/zh-TW/guides/etf-active` |
| `/about.html` | `/zh-TW/about` |
| `/privacy.html` | `/zh-TW/privacy` |
| `/disclaimer.html` | `/zh-TW/disclaimer` |
| `/sitemap.xml` | `/sitemap.xml`（Next `app/sitemap.ts` 產出） |
| `/robots.txt` | `/robots.txt`（Next `app/robots.ts` 產出） |
| `/style.css` | （不再需要，改用 Tailwind CSS 4） |

## 跨站連結調整

- 舊 `etf-active.html` 內文連到 `https://yam4111887-gif.github.io/stock-alerts/` 的「順手用工具」→ 改為內部連結 `/zh-TW/alerts`。

## 部署時的 301 建議（GitHub Pages 舊址）

若舊 GitHub Pages 專案保留，可在兩個舊 repo 放一個 `index.html` 做 meta refresh / JS redirect 指到新站對應路由，或改用自訂網域層級的 301。新站上線後記得：
1. 更新 `NEXT_PUBLIC_SITE_URL` 為正式網域（`src/lib/constants.ts` 的 fallback 也一併改）。
2. Google Search Console 重新提交新 sitemap。
3. 用 workspace `indexnow/` 工具提交新路由。
