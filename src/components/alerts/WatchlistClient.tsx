"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BellRing,
  CheckCircle2,
  CircleAlert,
  Clock,
  RefreshCw,
  Trash2,
} from "lucide-react";

type Quotes = {
  updated: string;
  rocDate: string;
  source: string;
  license: string;
  stocks: Record<string, [string, string]>;
};

type WatchItem = {
  code: string;
  target: number;
  dir: "gte" | "lte";
  note: string;
  added: string;
};

type HistItem = {
  code: string;
  name: string;
  price: number;
  target: number;
  dir: "gte" | "lte";
  date: string;
};

type Row = {
  code: string;
  name: string;
  price: number | null;
  item: WatchItem;
  status: "hit" | "wait" | "err" | "unknown";
};

const WATCH_KEY = "ss-watchlist";
const HIST_KEY = "ss-history";

function loadJson<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key: string, v: unknown) {
  localStorage.setItem(key, JSON.stringify(v));
}

function judge(item: WatchItem, price: number | null): Row["status"] {
  if (price == null || Number.isNaN(price)) return "err";
  if (item.dir === "lte") return price <= item.target ? "hit" : "wait";
  return price >= item.target ? "hit" : "wait";
}

export default function WatchlistClient() {
  const [quotes, setQuotes] = useState<Quotes | null>(null);
  const [quotesError, setQuotesError] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useState<WatchItem[]>([]);
  const [history, setHistory] = useState<HistItem[]>([]);
  const [checking, setChecking] = useState(false);
  const [checkStatus, setCheckStatus] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [code, setCode] = useState("");
  const [target, setTarget] = useState("");
  const [dir, setDir] = useState<"gte" | "lte">("gte");
  const [note, setNote] = useState("");

  const loadQuotes = useCallback(async (force = false) => {
    if (force) setQuotesError(null);
    try {
      const res = await fetch("/data/quotes.json", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Quotes = await res.json();
      setQuotes(data);
      return data;
    } catch (e) {
      setQuotesError(String((e as Error).message || e));
      setQuotes(null);
      return null;
    }
  }, []);

  // initial mount: load list + quotes, then auto-record hits
  useEffect(() => {
    const list = loadJson<WatchItem[]>(WATCH_KEY, []);
    const hist = loadJson<HistItem[]>(HIST_KEY, []);
    setWatchlist(list);
    setHistory(hist);
    setLoaded(true);
    (async () => {
      const q = await loadQuotes();
      if (q) recordHits(q, list, hist);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function recordHits(q: Quotes, list: WatchItem[], histIn: HistItem[]) {
    const hist = [...histIn];
    let added = 0;
    for (const item of list) {
      const meta = q.stocks[item.code];
      const price = meta ? parseFloat(meta[1]) : null;
      if (judge(item, price) !== "hit") continue;
      const dup = hist.some(
        (h) => h.code === item.code && h.date === q.updated && h.target === item.target,
      );
      if (dup) continue;
      hist.unshift({
        code: item.code,
        name: meta ? meta[0] : "—",
        price: price ?? 0,
        target: item.target,
        dir: item.dir,
        date: q.updated,
      });
      added++;
    }
    if (added) {
      const trimmed = hist.slice(0, 100);
      saveJson(HIST_KEY, trimmed);
      setHistory(trimmed);
    }
    return added;
  }

  const rows: Row[] = watchlist
    .map((item) => {
      const meta = quotes ? quotes.stocks[item.code] : null;
      const price = meta ? parseFloat(meta[1]) : null;
      return {
        code: item.code,
        name: meta ? meta[0] : "—",
        price,
        item,
        status: quotes ? judge(item, price) : "unknown",
      };
    })
    .sort((a, b) => {
      const order = { hit: 0, err: 1, wait: 2, unknown: 3 } as const;
      return order[a.status] - order[b.status];
    });

  function addItem() {
    const c = code.trim();
    const t = parseFloat(target);
    if (!/^\d{3,6}[A-Z]?$/.test(c)) {
      alert("請輸入正確的股票代號（數字 3-6 碼，權證請自行確認代號）");
      return;
    }
    if (Number.isNaN(t) || t <= 0) {
      alert("請輸入有效的目標價");
      return;
    }
    if (
      quotes &&
      !quotes.stocks[c] &&
      !confirm(
        `資料中找不到代號 ${c}（可能為上櫃或新商品，目前僅支援上市）。仍要加入嗎？`,
      )
    ) {
      return;
    }
    if (watchlist.some((x) => x.code === c && x.target === t && x.dir === dir)) {
      alert("這個條件已經在清單裡了。");
      return;
    }
    const list = [
      { code: c, target: t, dir, note: note.trim(), added: new Date().toISOString().slice(0, 10) },
      ...watchlist,
    ];
    setWatchlist(list);
    saveJson(WATCH_KEY, list);
    setCode("");
    setTarget("");
    setNote("");
  }

  function removeItem(code_: string, target_: number, dir_: "gte" | "lte") {
    const list = watchlist.filter(
      (x) => !(x.code === code_ && x.target === target_ && x.dir === dir_),
    );
    setWatchlist(list);
    saveJson(WATCH_KEY, list);
  }

  async function check() {
    setChecking(true);
    setCheckStatus("檢查中…");
    const q = await loadQuotes(true);
    if (q) {
      const added = recordHits(q, watchlist, history);
      const hits = watchlist.filter((item) => {
        const meta = q.stocks[item.code];
        const price = meta ? parseFloat(meta[1]) : null;
        return judge(item, price) === "hit";
      }).length;
      setCheckStatus(
        `${q.updated} 收盤資料：${hits} 檔觸發${added ? `（新增記錄 ${added} 筆）` : ""}`,
      );
    } else {
      setCheckStatus("檢查失敗，請稍後再試");
    }
    setChecking(false);
  }

  const stockCount = quotes ? Object.keys(quotes.stocks).length : 0;

  return (
    <div className="space-y-6">
      {/* data status */}
      <div className="rounded-xl border border-stone-200 bg-white p-4 text-sm">
        {quotesError ? (
          <p className="font-medium text-red-700">
            行情資料載入失敗（{quotesError}）。請稍後再試，或以交易所官方網站為準。
          </p>
        ) : quotes ? (
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-slate-600">
            <span>
              行情日期：<strong className="text-slate-900">{quotes.updated}</strong>（每日收盤後更新）
            </span>
            <span>
              收錄 <strong className="text-slate-900">{stockCount.toLocaleString()}</strong> 檔上市證券
            </span>
            <span>
              來源：{quotes.source}｜{quotes.license}
            </span>
          </div>
        ) : (
          <p className="text-slate-500">正在載入行情資料…</p>
        )}
      </div>

      {/* watchlist card */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
          <BellRing size={19} className="text-amber-600" />
          我的到價清單
        </h2>

        <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto]">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-500">股票代號</span>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              inputMode="numeric"
              placeholder="例如 2330"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-500">目標價（元）</span>
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              inputMode="decimal"
              placeholder="例如 2400"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-500">提醒條件</span>
            <select
              value={dir}
              onChange={(e) => setDir(e.target.value as "gte" | "lte")}
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            >
              <option value="gte">收盤價 ≥ 目標</option>
              <option value="lte">收盤價 ≤ 目標</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-500">備註（選填）</span>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="例如：停利點"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </label>
          <div className="flex items-end">
            <button
              type="button"
              onClick={addItem}
              className="w-full rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 lg:w-auto"
            >
              ＋ 加入
            </button>
          </div>
        </div>

        {loaded && rows.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500">
            還沒有項目，加入第一檔股票吧。
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-xs uppercase tracking-wide text-slate-500">
                  <th className="py-2 pr-3 font-semibold">代號</th>
                  <th className="py-2 pr-3 font-semibold">名稱</th>
                  <th className="py-2 pr-3 font-semibold">條件</th>
                  <th className="py-2 pr-3 font-semibold">最新收盤</th>
                  <th className="py-2 pr-3 font-semibold">狀態</th>
                  <th className="py-2 font-semibold" aria-label="操作" />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={`${r.code}-${r.item.target}-${r.item.dir}`} className="border-b border-stone-100">
                    <td className="py-2.5 pr-3 font-mono font-semibold text-slate-900">{r.code}</td>
                    <td className="py-2.5 pr-3 text-slate-700">{r.name}</td>
                    <td className="py-2.5 pr-3 text-slate-700">
                      {r.item.dir === "lte" ? "≤" : "≥"} {r.item.target}
                      {r.item.note && (
                        <span className="block text-xs text-slate-400">{r.item.note}</span>
                      )}
                    </td>
                    <td className="py-2.5 pr-3 font-mono text-slate-700">
                      {r.price != null && !Number.isNaN(r.price) ? r.price.toFixed(2) : "—"}
                    </td>
                    <td className="py-2.5 pr-3">
                      {r.status === "hit" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                          <CheckCircle2 size={13} /> 已觸發
                        </span>
                      )}
                      {r.status === "wait" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                          <Clock size={13} /> 未觸發
                        </span>
                      )}
                      {r.status === "err" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-600">
                          <CircleAlert size={13} /> 查無資料
                        </span>
                      )}
                      {r.status === "unknown" && <span className="text-slate-400">—</span>}
                    </td>
                    <td className="py-2.5 text-right">
                      <button
                        type="button"
                        aria-label={`刪除 ${r.code}`}
                        onClick={() => removeItem(r.code, r.item.target, r.item.dir)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={check}
            disabled={checking}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
          >
            <RefreshCw size={15} className={checking ? "animate-spin" : ""} />
            立即檢查
          </button>
          <span className="text-xs text-slate-500">{checkStatus}</span>
        </div>

        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-[0.83rem] leading-6 text-amber-800">
          <p>
            資料說明：本工具使用<strong>每日收盤後</strong>的收盤價資料（非盤中即時）。資料來源：臺灣證券交易所
            OpenAPI（每日平均成交資訊），依
            <a
              href="https://data.gov.tw/license"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline"
            >
              政府資料開放授權條款
            </a>
            使用；資料以
            <a
              href="https://www.twse.com.tw"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline"
            >
              交易所官方
            </a>
            為準，本工具不保證即時與正確。到價提醒屬資訊通知，<strong>不構成任何投資建議</strong>，詳見免責聲明。目前支援上市股票與
            ETF（上櫃規劃中）。
          </p>
        </div>
      </section>

      {/* history card */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-bold text-slate-900">觸發記錄</h2>
        {history.length === 0 ? (
          <p className="py-4 text-center text-sm text-slate-500">還沒有觸發記錄。</p>
        ) : (
          <ul className="divide-y divide-stone-100">
            {history.map((h, i) => (
              <li
                key={`${h.code}-${h.target}-${h.date}-${i}`}
                className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 py-2.5 text-sm"
              >
                <strong className="font-mono text-slate-900">{h.code}</strong>
                <span className="text-slate-700">{h.name}</span>
                <span className="text-slate-600">
                  收盤 <span className="font-mono">{Number(h.price).toFixed(2)}</span> 觸發{" "}
                  {h.dir === "lte" ? "≤" : "≥"} {h.target}
                </span>
                <span className="ml-auto text-xs text-slate-400">{h.date}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
