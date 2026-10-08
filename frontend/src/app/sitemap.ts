import type { MetadataRoute } from "next";
import { getAllSectionSlugs } from "@/app/content/fetchers";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = "https://kylezhao101.com";

  return [
    { url: origin },
    ...getAllSectionSlugs().map((slug) => ({ url: `${origin}/${slug}` })),
  ];
}
