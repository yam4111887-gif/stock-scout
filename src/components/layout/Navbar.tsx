"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Radar, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/zh-TW/guides/ccl-supply-chain", label: "CCL 供應鏈" },
  { href: "/zh-TW/guides/inp-supply-chain", label: "磷化銦" },
  { href: "/zh-TW/guides/copper-foil", label: "銅箔" },
  { href: "/zh-TW/guides/freight-guide", label: "運價指南" },
  { href: "/zh-TW/guides/dividend-guide", label: "除權息" },
  { href: "/zh-TW/guides/vix-guide", label: "VIX" },
  { href: "/zh-TW/guides/etf-active", label: "主動式 ETF" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2.5">
        <Link
          href="/zh-TW"
          className="flex shrink-0 items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700">
            <Radar size={17} className="text-white" />
          </span>
          <span className="text-lg font-bold text-slate-900">
            台股<span className="text-emerald-700">前哨站</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                isActive(l.href)
                  ? "bg-emerald-50 font-semibold text-emerald-800"
                  : "text-slate-600 hover:bg-stone-100 hover:text-slate-900"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/zh-TW/alerts"
            className={`ml-1 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
              isActive("/zh-TW/alerts")
                ? "bg-amber-100 text-amber-800"
                : "bg-amber-50 text-amber-700 hover:bg-amber-100"
            }`}
          >
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-amber-500" />
            到價哨兵
          </Link>
          <Link
            href="/zh-TW/about"
            className={`rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
              isActive("/zh-TW/about")
                ? "bg-emerald-50 font-semibold text-emerald-800"
                : "text-slate-600 hover:bg-stone-100 hover:text-slate-900"
            }`}
          >
            關於
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "關閉選單" : "開啟選單"}
          className="ml-auto rounded-lg p-2 text-slate-600 hover:bg-stone-100 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-stone-200 bg-white px-4 pb-4 pt-2 lg:hidden">
          <ul className="space-y-1">
            <li>
              <Link
                href="/zh-TW/alerts"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800"
              >
                到價哨兵（工具）
              </Link>
            </li>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-stone-100"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/zh-TW/about"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-stone-100"
              >
                關於
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
