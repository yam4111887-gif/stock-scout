import type { Metadata } from "next";
import { CONTACT_EMAIL, LEGAL_UPDATED, SITE_URL } from "@/lib/constants";

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "免責聲明",
  description: "台股前哨站免責聲明：非投資建議、公司名稱僅作結構說明、資料正確性與投資風險。",
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_URL}/zh-TW/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">免責聲明</h1>
      <p className="mt-2 text-xs text-slate-500">最後更新：{LEGAL_UPDATED}</p>

      <div className="guide-content">
        <h2>非投資建議</h2>
        <p>
          本站所有內容（包括但不限於產業結構說明、數據指標解釋、名詞定義、教育性文章，以及到價哨兵的「到價提醒／觸發通知」）僅供一般資訊與教育目的，<strong>不構成任何證券、金融商品之買賣建議、投資推介、要約或要約之引誘</strong>
          ，亦不構成財務、稅務或法律專業意見。到價提醒屬中性資訊通知，任何投資決策請自行判斷並自負風險。
        </p>
        <p>
          本站（及其維護者）非依《證券投資信託及顧問法》許可之證券投資信託或顧問事業，不從事證券投資顧問業務。
        </p>

        <h2>公司名稱之使用</h2>
        <p>
          文中出現之公司名稱與代號，僅作為產業結構之說明舉例，用於解釋供應鏈環節與市場角色，<strong>絕非對任何公司之推薦、評等或買賣暗示</strong>
          。公司之實際營運狀況、財務數據與未來展望，請以該公司於公開資訊觀測站及官方文件之揭露為準。
        </p>

        <h2>資料延遲與正確性</h2>
        <p>
          到價哨兵使用<strong>每日收盤後</strong>之行情資料（非盤中即時），來源為臺灣證券交易所
          OpenAPI，依政府資料開放授權條款使用。資料可能存在延遲、錯誤或中斷，<strong>一切以交易所官方公布為準</strong>
          ，本工具不對因資料延遲、錯誤或漏報造成之任何損失負責。
        </p>
        <p>
          知識內容依公開資訊整理，力求正確但不保證完整、即時或無誤。金融制度（稅率、費率、門檻）、指數編製方式與產業狀況均可能變動，<strong>使用前請務必以官方主管機關與原始資料來源核實</strong>
          。本站不對因使用或依賴本站內容所生之任何直接或間接損失負責。
        </p>

        <h2>非官方背書</h2>
        <p>
          本站為獨立開發之內容站與工具，與臺灣證券交易所、政府資料開放平台無隸屬或背書關係。資料標示來源僅依開放授權條款之要求。
        </p>

        <h2>投資風險</h2>
        <p>
          任何投資均有風險，包括本金損失。歷史資料與統計（如填息率、指數走勢）僅為歷史描述，不代表未來表現。投資決策應由您本人審慎判斷，必要時請諮詢合法執業之專業人員。
        </p>

        <h2>服務變更</h2>
        <p>本站內容與工具以現狀提供，不附任何保證。我們保留修改、暫停或終止服務之權利。</p>

        <h2>外部連結</h2>
        <p>本站連結之官方或第三方網站，其內容與隱私權政策由各該網站管理，與本站無涉。</p>

        <h2>聯絡</h2>
        <p>
          內容勘誤或權利事宜：<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </div>
    </div>
  );
}
