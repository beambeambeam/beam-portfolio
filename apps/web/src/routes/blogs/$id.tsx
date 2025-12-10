import { createFileRoute, Link } from "@tanstack/react-router";
import { allPosts } from "content-collections";
import { ArrowDownLeftIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RelativeTimeCard } from "@/components/ui/relative-time-card";

export const Route = createFileRoute("/blogs/$id")({
  head: ({ params }) => {
    const post = allPosts.find((p) => p._meta.path === params.id);
    if (!post) {
      return {
        meta: [
          {
            title: "Blog Post Not Found | Beam Portfolio",
          },
        ],
      };
    }

    return {
      meta: [
        {
          title: `${post.title} | Beam Portfolio`,
        },
        {
          name: "description",
          content: post.description || post.title,
        },
        {
          name: "author",
          content: "Beam",
        },
        {
          name: "keywords",
          content: `${post.title}, software development, programming, tech blog, web development`,
        },
        {
          property: "og:title",
          content: `${post.title} | Beam Portfolio`,
        },
        {
          property: "og:description",
          content: post.description || post.title,
        },
        {
          property: "og:url",
          content: `https://yourwebsite.com/blogs/${params.id}`,
        },
        {
          property: "og:type",
          content: "article",
        },
        {
          property: "article:published_time",
          content: post.publishedAt,
        },
        {
          property: "article:author",
          content: "Beam",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: `${post.title} | Beam Portfolio`,
        },
        {
          name: "twitter:description",
          content: post.description || post.title,
        },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://yourwebsite.com/blogs/${params.id}`,
        },
      ],
    };
  },
  component: BlogDetailPage,
});

function BlogDetailPage() {
  const { id } = Route.useParams();
  const post = allPosts.find((p) => p._meta.path === id);

  if (!post) {
    return (
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <p className="text-muted-foreground">Blog post not found.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <article
        className="grid gap-4"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/" viewTransition>
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/blogs" viewTransition>
                  Blogs
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <header className="space-y-2">
          <h1
            className="font-semibold text-3xl tracking-tight"
            itemProp="headline"
          >
            {post.title}
          </h1>
          <p className="text-muted-foreground">
            <time
              className="text-muted-foreground text-xs"
              dateTime={post.publishedAt}
              itemProp="datePublished"
            >
              <RelativeTimeCard date={new Date(post.publishedAt)} />
            </time>
          </p>
          <meta content="Beam" itemProp="author" />
          <meta
            content={post.description || post.title}
            itemProp="description"
          />
        </header>
        <Card>
          <CardContent>
            <div
              className="prose prose-sm dark:prose-invert max-w-none prose-blockquote:border-l-muted-foreground prose-pre:bg-muted prose-blockquote:text-muted-foreground prose-code:text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground"
              itemProp="articleBody"
            >
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
        <Link to=".." viewTransition>
          <Button size="icon-lg" variant="outline">
            <ArrowDownLeftIcon />
          </Button>
        </Link>
      </article>
    </main>
  );
}
