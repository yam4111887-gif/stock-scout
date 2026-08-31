export const locales = ["zh-TW"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "zh-TW";

export const localeNames: Record<Locale, string> = {
  "zh-TW": "繁體中文",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
