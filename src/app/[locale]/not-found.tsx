import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <p className="font-mono text-5xl font-bold text-emerald-700">404</p>
      <h1 className="mt-4 text-xl font-bold text-slate-900">找不到這一頁</h1>
      <p className="mt-2 text-sm text-slate-600">
        你要找的內容可能已搬家或從未存在。知識指南都還在首頁。
      </p>
      <Link
        href="/zh-TW"
        className="mt-6 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
      >
        回首頁
      </Link>
    </div>
  );
}
