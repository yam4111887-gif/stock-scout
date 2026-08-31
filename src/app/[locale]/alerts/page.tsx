import type { Metadata } from "next";
import { Landmark, Lock, Wallet, Building2 } from "lucide-react";
import WatchlistClient from "@/components/alerts/WatchlistClient";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "到價哨兵｜台股到價提醒（收盤價確認）：免費、免帳號、資料不出瀏覽器",
  description:
    "免費台股到價提醒工具：設定你關注的股票與目標價，每天收盤後一鍵確認哪些已觸發。使用證券交易所官方開放資料，免帳號、不收集任何個資、不在線爬蟲。",
  keywords: [
    "到價提醒",
    "股票到價",
    "台股 提醒",
    "目標價 提醒",
    "免費 股票工具",
    "收盤價 查詢",
    "股票警示",
    "到價通知",
  ],
  alternates: { canonical: `${SITE_URL}/zh-TW/alerts` },
  openGraph: {
    title: `到價哨兵｜台股到價提醒（免費、免帳號）`,
    description: "設定目標價，收盤後一鍵確認。交易所官方開放資料，資料不出瀏覽器。",
    type: "website",
    url: `${SITE_URL}/zh-TW/alerts`,
  },
};

export default function AlertsPage() {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "到價哨兵",
    url: `${SITE_URL}/zh-TW/alerts`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    inLanguage: "zh-Hant",
    description:
      "台股到價提醒工具：設定目標價，收盤後一鍵確認。基於證券交易所官方開放資料。",
    offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "如何使用到價哨兵確認台股到價",
    inLanguage: "zh-Hant",
    step: [
      { "@type": "HowToStep", name: "加入股票", text: "輸入股票代號與目標價，選擇收盤價大於或小於目標的條件。" },
      { "@type": "HowToStep", name: "等待收盤", text: "行情資料於每個交易日收盤後更新。" },
      { "@type": "HowToStep", name: "一鍵檢查", text: "開啟頁面或按「立即檢查」，比對最新收盤價與你的目標。" },
      { "@type": "HowToStep", name: "查看記錄", text: "已觸發的項目會記錄在觸發記錄區，供你回顧。" },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Hero */}
      <section className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">你的股票，到價了嗎？</h1>
        <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
          設定關注的股票與目標價，每個交易日收盤後一鍵確認哪些已觸發。券商 App
          的提醒會漏抓；這裡的清單你自己掌握。
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800">
            <Wallet size={15} /> 免費、免帳號
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800">
            <Lock size={15} /> 清單只存在你的瀏覽器
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800">
            <Building2 size={15} /> 交易所官方開放資料
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-200 px-4 py-1.5 text-sm font-medium text-slate-700">
            <Landmark size={15} /> 不構成投資建議
          </span>
        </div>
      </section>

      <WatchlistClient />

      {/* How it works */}
      <section className="mt-8 rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-bold text-slate-900">運作方式（誠實版）</h2>
        <ol className="guide-content list-decimal space-y-3 pl-6 text-[0.95rem] leading-7 text-slate-700">
          <li>
            <strong>資料</strong>
            ：每個交易日收盤後，我們從證券交易所官方 OpenAPI 取得當日收盤價，更新到本站（依政府開放資料授權條款，標示來源、非官方背書）。
          </li>
          <li>
            <strong>清單</strong>
            ：你的觀察清單存在你自己瀏覽器的 localStorage。沒有帳號、沒有伺服器資料庫，換電腦需要重新輸入（這是隱私的代價）。
          </li>
          <li>
            <strong>提醒</strong>
            ：開啟頁面或按「立即檢查」時比對收盤價與你的目標，觸發的項目會記錄下來。這是<strong>收盤後確認</strong>型工具，不是盤中即時推播；如果需要盤中即時，請使用券商官方
            App 的到價警示。
          </li>
          <li>
            <strong>為什麼免費</strong>
            ：純前端工具幾乎零成本。未來可能放置廣告（如 Google AdSense）維持，屆時於隱私權政策揭露，功能永遠免費。
          </li>
        </ol>
      </section>
    </div>
  );
}
