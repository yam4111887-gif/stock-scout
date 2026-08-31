# 台股前哨站（stock-scout）

台股知識內容 hub：供應鏈地圖（CCL、磷化銦）、銅箔、航運運價、除權息、VIX、主動式 ETF
等指南，加上「到價哨兵」到價提醒工具。由 `stock-scout`（靜態站）與 `stock-alerts`（到價哨兵）
兩站於 2026-08 整併而成。

## Tech

- Next.js（App Router）+ TypeScript + Tailwind CSS 4 + lucide-react
- 路由結構：`src/app/[locale]/`，目前Locale：`zh-TW`（`en` 之後可加，見 `src/lib/i18n.ts`）
- 全靜態輸出（`generateStaticParams` + `dynamicParams = false`）
- SEO：`app/sitemap.ts`、`app/robots.ts`（含 AI 爬蟲允許清單）、`app/manifest.ts`、每頁 metadata
  與 JSON-LD（WebApplication / Article / FAQPage / HowTo / BreadcrumbList）、`public/llms.txt`

## 指令

```bash
npm run dev            # 本機開發
npm run build          # 生產 build
npm run typecheck      # tsc --noEmit
npm run update-quotes  # 抓 TWSE OpenAPI 更新 public/data/quotes.json（每交易日收盤後跑）
```

## 每日行情

到價哨兵的行情是靜態檔 `public/data/quotes.json`（約 700KB），由
`scripts/update-quotes.js` 向臺灣證券交易所 OpenAPI（STOCK_DAY_AVG_ALL）抓取產生。
資料依政府資料開放授權條款使用：標示來源、非官方背書。

## 環境變數（.env.local）

```
NEXT_PUBLIC_SITE_URL=https://你的網域
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX        # 選配，需 Cookie 同意後才載入
NEXT_PUBLIC_CLARITY_ID=xxxxxxx        # 選配，需 Cookie 同意後才載入
```

## 內容維護原則

- 指南內容都在 `src/data/guides.ts`（結構化區塊：p / h3 / ul / ol / table + FAQ）。
- 每頁保留「不構成投資建議」聲明。
- 舊網址對應見 `REDIRECTS.md`。
