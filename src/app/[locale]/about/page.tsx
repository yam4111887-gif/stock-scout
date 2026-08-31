import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/constants";

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "關於台股前哨站｜為什麼只報知識，不報明牌",
  description:
    "台股前哨站是獨立整理的台股知識站：解釋產業結構、數據指標與查證方法，並提供免費的到價哨兵工具。我們不做投資建議、不收會員、不報明牌。",
  alternates: { canonical: `${SITE_URL}/zh-TW/about` },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">關於台股前哨站</h1>

      <div className="guide-content">
        <p>
          台股前哨站是一個獨立整理的知識站，2026 年成立。觀察起點很簡單：台灣每日熱門搜尋裡，股票相關關鍵字幾乎天天上榜，散戶大量搜尋「XX
          是什麼」「指數去哪看」，但搜到的內容多半是明牌文與業配。
        </p>
        <p>
          2026 年 8 月，本站與同為獨立開發的到價提醒工具「到價哨兵」整併，成為一個同時提供知識指南與免費工具的內容站。指南解釋結構，工具幫你追蹤價位，兩者都不碰「買賣建議」這條線。
        </p>

        <h2>我們做什麼</h2>
        <ul>
          <li>把熱門主題背後的<strong>產業結構</strong>整理成地圖（誰做什麼、在哪個環節）</li>
          <li>解釋<strong>數據與指標</strong>的定義、來源與正確解讀方式</li>
          <li>每個主題附上<strong>官方查證管道</strong>，鼓勵你查第一手資料</li>
          <li>
            提供免費的{" "}
            <Link href="/zh-TW/alerts">到價哨兵</Link>{" "}
            工具：設定目標價，收盤後一鍵確認
          </li>
        </ul>

        <h2>我們刻意不做什麼</h2>
        <p>
          我們不推薦、不評論任何個股的買賣，不猜指數、不猜漲跌，也不收會員費，內容全部免費。為什麼這麼保守？因為在台灣，提供個股買賣建議屬於證券投資顧問業務，需主管機關許可；更重要的是，<strong>「知道結構」對散戶的長期價值遠大於「聽一個明牌」</strong>。
        </p>

        <h2>到價哨兵是什麼定位</h2>
        <p>
          到價哨兵原本是 2026 年上線的獨立工具站，起源是身邊有朋友反應，券商 App
          的到價提醒有時會漏發、延遲，等發現時價位早已錯過。它做「清單自己掌握、打開就能確認」這一件事：
        </p>
        <ul>
          <li>
            <strong>收盤後確認，不是盤中即時</strong>
            ：使用交易所每日收盤後的官方開放資料。需要盤中即時提醒，請使用券商官方 App，那需要行情授權與推播基礎設施，不是免費工具能做的。
          </li>
          <li>
            <strong>只通知，不建議</strong>
            ：到價提醒是中性的資訊通知，我們不會、也依法不能提供任何買賣建議。
          </li>
          <li>
            <strong>清單屬於你</strong>
            ：觀察清單只存在你瀏覽器的 localStorage，我們沒有帳號系統、沒有伺服器資料庫，看不到你追蹤哪些股票。
          </li>
        </ul>

        <h2>資料來源與授權</h2>
        <p>
          到價哨兵的行情資料來自{" "}
          <a href="https://openapi.twse.com.tw" target="_blank" rel="noopener noreferrer">
            臺灣證券交易所 OpenAPI
          </a>
          （每日平均成交資訊），依{" "}
          <a href="https://data.gov.tw/license" target="_blank" rel="noopener noreferrer">
            政府資料開放授權條款
          </a>
          使用：標示來源、不暗示官方背書。若資料與交易所官方不同，一律以官方為準。
        </p>

        <h2>營運方式</h2>
        <p>
          本站目前為個人維護的靜態網站，成本極低。未來可能透過廣告（如 Google
          AdSense）或券商官方聯盟計畫維持，會在導入時於本頁與隱私權政策揭露。揭露原則：任何商業合作都不會影響內容，且內容頁不放任何「買賣暗示」；工具功能本身永遠免費。
        </p>

        <h2>內容正確性</h2>
        <p>
          每頁標示「知識整理日期」。產業結構與制度名詞相對穩定，但公司營運、稅制費率、指數數值都會變動，<strong>請永遠以官方來源為準</strong>（各頁均附連結）。發現內容有誤，歡迎來信指正：
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </div>
    </div>
  );
}
