import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  BellRing,
  CalendarDays,
  Compass,
  Disc3,
  Landmark,
  Layers,
  Lightbulb,
  Link2,
  PieChart,
  Ship,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { guides } from "@/data/guides";
import { SITE_URL } from "@/lib/constants";

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "台股前哨站｜CCL 供應鏈地圖・航運運價指南・除權息教學・到價哨兵",
  description:
    "台股散戶的知識站：CCL 與先進封裝供應鏈地圖、磷化銦、銅箔、航運運價指數、除權息教學、VIX、主動式 ETF，加上免費的到價提醒工具。只解釋數據與產業結構，不提供任何個股買賣建議。",
  keywords: [
    "CCL 供應鏈",
    "先進封裝",
    "ABF 載板",
    "概念股是什麼",
    "SCFI 運價指數",
    "航運運價",
    "除權息",
    "填權息",
    "台股 知識",
    "股票 入門",
    "到價提醒",
  ],
  alternates: { canonical: `${SITE_URL}/zh-TW` },
  openGraph: {
    title: "台股前哨站｜只報數據與知識，不報明牌",
    description:
      "CCL 供應鏈地圖、航運運價指南、除權息教學，加上到價哨兵工具。散戶的知識前哨站。",
    type: "website",
    url: `${SITE_URL}/zh-TW`,
  },
};

const iconMap: Record<string, LucideIcon> = {
  Layers,
  Lightbulb,
  Disc3,
  Ship,
  CalendarDays,
  Activity,
  PieChart,
};

function GuideIcon({ name }: { name: string }) {
  const Cmp = iconMap[name];
  if (!Cmp) return null;
  return <Cmp size={26} />;
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-stone-200 bg-gradient-to-br from-emerald-50 via-stone-50 to-amber-50/60">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:py-16">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            看懂結構，再決定怎麼想
          </h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            熱門關鍵字每天都在變，但背後的產業結構與數據邏輯不會。這裡整理散戶最常搜尋主題的知識版：誰做什麼、指數怎麼讀、數字去哪查；買不買，永遠是你自己的決定。
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800">
              <Compass size={15} /> 只報事實與知識
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800">
              <ShieldCheck size={15} /> 不報明牌、不做投資建議
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800">
              <Link2 size={15} /> 一律附官方查證來源
            </span>
          </div>
        </div>
      </section>

      {/* Guides grid */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-center text-2xl font-bold text-slate-900">知識主題</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-600">
          資料日期都標在頁面上，金融知識會過時，查證永遠以官方來源為準。
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/zh-TW/guides/${g.slug}`}
              className="group flex flex-col rounded-xl border border-stone-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
            >
              <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <GuideIcon name={g.icon} />
              </span>
              <h3 className="mb-1.5 font-bold text-slate-900 group-hover:text-emerald-800">
                {g.cardTitle}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-6 text-slate-600">{g.cardDesc}</p>
              <span className="text-sm font-semibold text-emerald-700">看指南 →</span>
            </Link>
          ))}

          {/* Tool card */}
          <Link
            href="/zh-TW/alerts"
            className="group flex flex-col rounded-xl border-2 border-amber-200 bg-amber-50/50 p-5 transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
          >
            <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <BellRing size={24} />
            </span>
            <h3 className="mb-1.5 font-bold text-slate-900 group-hover:text-amber-800">
              到價哨兵：台股到價提醒
            </h3>
            <p className="mb-4 flex-1 text-sm leading-6 text-slate-600">
              設定你關注的股票與目標價，每個交易日收盤後一鍵確認哪些已觸發。免費、免帳號，清單只存在你的瀏覽器，資料使用證交所官方開放資料。
            </p>
            <span className="text-sm font-semibold text-amber-700">開始使用 →</span>
          </Link>
        </div>
      </section>

      {/* Notice */}
      <section className="mx-auto max-w-4xl px-4 pb-4">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
          <strong className="flex items-center gap-1.5">
            <Landmark size={15} /> 重要聲明
          </strong>
          <p className="mt-1.5">
            本站內容僅供一般資訊與教育目的，不構成任何證券的買賣建議、投資推介或財務建議。本站非證券投資信託顧問事業。文中出現的公司名稱僅作產業結構說明，絕非推薦。任何投資決策請自行判斷並自負風險，詳細規範請見
            <Link href="/zh-TW/privacy" className="font-medium underline">
              隱私權政策
            </Link>{" "}
            與{" "}
            <Link href="/zh-TW/disclaimer" className="font-medium underline">
              免責聲明
            </Link>
            。
          </p>
        </div>
      </section>
    </>
  );
}
