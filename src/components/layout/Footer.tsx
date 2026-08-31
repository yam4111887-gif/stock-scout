import Link from "next/link";
import { Radar } from "lucide-react";

const FOOTER_GUIDES = [
  { href: "/zh-TW/guides/ccl-supply-chain", label: "CCL 供應鏈地圖" },
  { href: "/zh-TW/guides/inp-supply-chain", label: "磷化銦 InP" },
  { href: "/zh-TW/guides/copper-foil", label: "銅箔" },
  { href: "/zh-TW/guides/freight-guide", label: "航運運價指南" },
  { href: "/zh-TW/guides/dividend-guide", label: "除權息指南" },
  { href: "/zh-TW/guides/vix-guide", label: "VIX 恐慌指數" },
  { href: "/zh-TW/guides/etf-active", label: "主動式 ETF" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700">
                <Radar size={17} className="text-white" />
              </span>
              <span className="text-base font-bold text-slate-900">台股前哨站</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
              台股散戶的知識站：供應鏈地圖、運價指數指南、除權息教學，加上免費的到價哨兵工具。
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">知識指南</h3>
            <ul className="space-y-1.5">
              {FOOTER_GUIDES.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-600 hover:text-emerald-700"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">工具與其他</h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/zh-TW/alerts"
                  className="text-sm text-slate-600 hover:text-emerald-700"
                >
                  到價哨兵（到價提醒）
                </Link>
              </li>
              <li>
                <Link
                  href="/zh-TW/about"
                  className="text-sm text-slate-600 hover:text-emerald-700"
                >
                  關於本站
                </Link>
              </li>
              <li>
                <Link
                  href="/zh-TW/privacy"
                  className="text-sm text-slate-600 hover:text-emerald-700"
                >
                  隱私權政策
                </Link>
              </li>
              <li>
                <Link
                  href="/zh-TW/disclaimer"
                  className="text-sm text-slate-600 hover:text-emerald-700"
                >
                  免責聲明
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="text-sm text-slate-600 hover:text-emerald-700"
                  data-cookie-settings
                >
                  Cookie 設定
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-stone-200 pt-5 text-xs leading-5 text-slate-500">
          <p>
            © 2026 台股前哨站。內容僅供教育參考，不構成投資建議，投資決策風險請自負。
          </p>
          <p className="mt-1">
            到價哨兵資料來源：臺灣證券交易所 OpenAPI（政府資料開放授權條款），非官方背書，一切以交易所公告為準。
          </p>
        </div>
      </div>
    </footer>
  );
}
