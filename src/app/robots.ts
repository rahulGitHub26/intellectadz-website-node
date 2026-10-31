import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/advertiser", "/publisher"] }, sitemap: "https://intellectads.co.in/sitemap.xml" };
}
