import type { Metadata } from "next";
import { CONTACT_EMAIL, LEGAL_UPDATED, SITE_URL } from "@/lib/constants";

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "隱私權政策",
  description: "台股前哨站隱私權政策：匿名流量分析、Cookie 同意、localStorage 工具資料與 GDPR 權利說明。",
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_URL}/zh-TW/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">隱私權政策</h1>
      <p className="mt-2 text-xs text-slate-500">最後更新：{LEGAL_UPDATED}</p>

      <div className="guide-content">
        <h2>我們蒐集什麼資料</h2>
        <p>
          本站為靜態網站，不設會員系統、不要求註冊，也不經手你的個人文件。僅在你同意後，以 Google
          Analytics 與 Microsoft Clarity
          蒐集匿名化的流量統計（造訪頁面、停留時間、裝置類型等）。不同意 Cookie
          時，只載入網站運作所需的必要項目，不會啟用任何分析或廣告 Cookie。
        </p>

        <h2>到價哨兵工具資料（重要）</h2>
        <p>
          到價哨兵的觀察清單、觸發記錄與所有操作都只存在<strong>你自己瀏覽器的 localStorage</strong>
          ，永遠不會傳送到任何地方。我們沒有帳號系統、沒有後端伺服器、沒有資料庫、沒有表單。清除瀏覽器資料即完全刪除；換電腦需要重新輸入。
          行情資料（data/quotes.json）由網站方每日更新為靜態檔案，你的瀏覽器載入它時不會附帶任何個人資訊。
        </p>

        <h2>Cookie 與本地儲存</h2>
        <p>
          必要 Cookie 僅用於記住你的 Cookie 同意狀態。分析類 Cookie（_ga、_clck
          等）在你明確同意後才會設定，可隨時透過同意橫幅、頁尾的「Cookie 設定」或清除瀏覽器資料撤回。
        </p>

        <h2>第三方服務</h2>
        <p>
          本站使用 Google Analytics（Google LLC）與 Microsoft Clarity（Microsoft
          Corporation）進行匿名流量分析。這些服務可能依其自身政策處理資料，詳見各服務的隱私權政策。
        </p>

        <h2>GDPR 歐盟資料保護權利</h2>
        <p>
          若你位於歐洲經濟區（EEA）、英國或瑞士，依《一般資料保護規則》（GDPR）你享有下列權利：
        </p>
        <ul>
          <li>
            <strong>存取權：</strong>可要求我們提供所持有之個人資料副本。
          </li>
          <li>
            <strong>更正權：</strong>可要求更正不正確或不完整的個人資料。
          </li>
          <li>
            <strong>刪除權（被遺忘權）：</strong>可要求刪除你的個人資料。
          </li>
          <li>
            <strong>資料可攜權：</strong>可要求以機器可讀格式取得你提供給我們的資料。
          </li>
          <li>
            <strong>反對與限制處理權：</strong>
            可對基於正當利益（含分析統計）之處理提出反對或要求限制。
          </li>
          <li>
            <strong>撤回同意權：</strong>基於同意之處理（如分析 Cookie）可隨時透過 Cookie
            偏好設定或清除網站 Cookie 撤回同意。
          </li>
          <li>
            <strong>申訴權：</strong>可向你所在地的資料保護機關提出申訴。
          </li>
        </ul>
        <p>
          行使上述權利請來信{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          ，我們將於 30 天內回覆。我們僅在有合法基礎時處理個人資料，且不進行具法律效力的自動化決策。
        </p>

        <h2>資料控制者與資料保留期限</h2>
        <p>
          <strong>資料控制者：</strong>本網站由 Yam4（{CONTACT_EMAIL}）經營，為本網站蒐集之個人資料的資料控制者。
        </p>
        <p>
          <strong>資料保留期限：</strong>
          Google Analytics 分析資料最長保留 14 個月；Microsoft Clarity
          工作階段資料最長保留 18 個月；Cookie
          同意偏好儲存於你的瀏覽器本地，直至你清除為止。我們不會將個人資料保留超過本政策所述目的所必要之期限。
        </p>

        <h2>外部連結</h2>
        <p>本站連結之交易所與政府網站，其隱私權政策由各該網站管理。</p>

        <h2>準據法與管轄</h2>
        <p>
          本政策依中華民國（台灣）法律解釋，相關爭議以台灣法院為第一審管轄法院。
        </p>

        <h2>政策變更</h2>
        <p>本政策如有修改，將更新本頁之「最後更新」日期，不另行通知。</p>

        <h2>聯絡</h2>
        <p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </div>
    </div>
  );
}
