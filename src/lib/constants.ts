export const SITE_NAME = "台股前哨站";
export const SITE_TOOL_NAME = "到價哨兵";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://stock-scout.vercel.app";
export const SITE_DESCRIPTION =
  "台股散戶的知識站：CCL 與先進封裝供應鏈地圖、磷化銦、銅箔、航運運價指數、除權息教學、VIX、主動式 ETF，加上免費的到價提醒工具。只解釋數據與產業結構，不提供任何個股買賣建議。";
export const CONTACT_EMAIL = "yassintw@gmail.com";
export const GSC_VERIFICATION = "uClyHOqctJ-RXdAOLDhKgkXRgO4AR02X2c3ocd_wlfQ";

export const LEGAL_UPDATED = "2026-08-31";

export function localePath(path: string, locale: string = "zh-TW"): string {
  if (path.startsWith("/")) return `/${locale}${path}`;
  return `/${locale}/${path}`;
}
