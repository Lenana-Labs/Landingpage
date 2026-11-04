import type { MetadataRoute } from "next";
import { site } from "@/config/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
    return site.url ? ["/", "/about", "/projects"].map(path => ({ url: new URL(path, site.url).href, changeFrequency: 'monthly', priority: path === '/' ? 1 : .8 })) : [];
}
