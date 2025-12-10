/**
 * JSON-LD Structured Data Components
 *
 * These components help add structured data to your pages for better SEO.
 * Learn more: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
 */

type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}

// Website Schema
export function WebsiteSchema({
  url,
  name,
  description,
}: {
  url: string;
  name: string;
  description: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name,
        description,
        url,
      }}
    />
  );
}

// Person Schema (for portfolio/about pages)
export function PersonSchema({
  name,
  url,
  image,
  jobTitle,
  description,
  sameAs,
}: {
  name: string;
  url: string;
  image?: string;
  jobTitle?: string;
  description?: string;
  sameAs?: string[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name,
        url,
        ...(!!image && { image }),
        ...(!!jobTitle && { jobTitle }),
        ...(!!description && { description }),
        ...(!!sameAs && { sameAs }),
      }}
    />
  );
}

// Blog Posting Schema
export function BlogPostingSchema({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  url,
  image,
}: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline,
        description,
        author: {
          "@type": "Person",
          name: author,
        },
        datePublished,
        ...(!!dateModified && { dateModified }),
        url,
        ...(!!image && { image }),
      }}
    />
  );
}

// Breadcrumb Schema
export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

// Blog Collection Schema
export function BlogSchema({
  name,
  description,
  url,
  posts,
}: {
  name: string;
  description: string;
  url: string;
  posts: Array<{ headline: string; url: string; datePublished: string }>;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Blog",
        name,
        description,
        url,
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.headline,
          url: post.url,
          datePublished: post.datePublished,
        })),
      }}
    />
  );
}
