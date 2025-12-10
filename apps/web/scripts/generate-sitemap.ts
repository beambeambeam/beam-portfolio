/**
 * Sitemap Generator Script
 *
 * This script generates a sitemap.xml file including all blog posts dynamically.
 * Run with: bun run scripts/generate-sitemap.ts
 *
 * To use:
 * 1. Update SITE_URL with your actual domain
 * 2. Add to package.json scripts: "generate-sitemap": "bun run scripts/generate-sitemap.ts"
 * 3. Run before deploying: npm run generate-sitemap
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";

// Update this with your actual domain
const SITE_URL = "https://yourwebsite.com";

// Import your blog posts (adjust path as needed)
// For now, we'll use a placeholder - uncomment and adjust when ready
// import { allPosts } from '../content-collections';

type Route = {
  path: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
};

function generateSitemap(routes: Route[]): string {
  const today = new Date().toISOString().split("T")[0];

  const urlEntries = routes
    .map(
      (route) => `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${route.lastmod || today}</lastmod>
    <changefreq>${route.changefreq || "monthly"}</changefreq>
    <priority>${route.priority || 0.5}</priority>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

function main() {
  const routes: Route[] = [
    {
      path: "/",
      changefreq: "monthly",
      priority: 1.0,
    },
    {
      path: "/blogs",
      changefreq: "weekly",
      priority: 0.8,
    },
  ];

  // Uncomment this section when you want to include blog posts dynamically
  /*
  if (allPosts) {
    const blogRoutes = allPosts.map((post) => ({
      path: `/blogs/${post._meta.path}`,
      lastmod: post.publishedAt ? new Date(post.publishedAt).toISOString().split('T')[0] : undefined,
      changefreq: 'monthly' as const,
      priority: 0.7,
    }));
    routes.push(...blogRoutes);
  }
  */

  const sitemap = generateSitemap(routes);
  const outputPath = join(process.cwd(), "public", "sitemap.xml");

  writeFileSync(outputPath, sitemap, "utf-8");
  console.log(`✅ Sitemap generated successfully at ${outputPath}`);
  console.log(`📄 Total URLs: ${routes.length}`);
}

// Run the script
main();
