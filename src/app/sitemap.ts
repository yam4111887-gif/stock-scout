import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { SITE_URL } from "@/lib/constants";

const LASTMOD = "2026-08-31";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/zh-TW`, lastModified: LASTMOD, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/zh-TW/alerts`,
      lastModified: LASTMOD,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...guides.map((g) => ({
      url: `${SITE_URL}/zh-TW/guides/${g.slug}`,
      lastModified: LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${SITE_URL}/zh-TW/about`, lastModified: LASTMOD, priority: 0.5 },
  ];
  return entries;
}
