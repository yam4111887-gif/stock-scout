import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/zh-TW",
    display: "standalone",
    lang: "zh-Hant-TW",
  };
}
