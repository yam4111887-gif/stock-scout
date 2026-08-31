"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

const COOKIE_NAME = "cookie-consent";

function setConsentCookie(value: "accepted" | "rejected") {
  document.cookie = `${COOKIE_NAME}=${value};path=/;max-age=${180 * 24 * 3600};samesite=lax`;
  window.dispatchEvent(new Event("cookie-consent-change"));
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`));
    if (!m) setVisible(true);

    const onOpen = () => {
      document.cookie = `${COOKIE_NAME}=;path=/;max-age=0`;
      setVisible(true);
      window.dispatchEvent(new Event("cookie-consent-change"));
    };
    document.addEventListener("open-cookie-settings", onOpen);

    const bindFooterButtons = () => {
      document
        .querySelectorAll("[data-cookie-settings]")
        .forEach((el) => el.addEventListener("click", onOpen));
    };
    bindFooterButtons();

    return () => {
      document.removeEventListener("open-cookie-settings", onOpen);
      document
        .querySelectorAll("[data-cookie-settings]")
        .forEach((el) => el.removeEventListener("click", onOpen));
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 p-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Cookie size={18} className="shrink-0 text-amber-600" />
        <p className="text-sm leading-5 text-slate-600">
          本站在你同意後使用 Google Analytics 與 Microsoft Clarity
          做匿名流量分析。你的到價清單永遠只存在瀏覽器本地，與此無關。詳見隱私權政策。
        </p>
        <div className="flex shrink-0 gap-2 sm:ml-auto">
          <button
            type="button"
            className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-stone-100"
            onClick={() => {
              setConsentCookie("rejected");
              setVisible(false);
            }}
          >
            僅必要
          </button>
          <button
            type="button"
            className="rounded-lg bg-emerald-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-800"
            onClick={() => {
              setConsentCookie("accepted");
              setVisible(false);
            }}
          >
            接受
          </button>
        </div>
      </div>
    </div>
  );
}
