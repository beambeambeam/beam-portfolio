import { createFileRoute, Link } from "@tanstack/react-router";
import { allPosts } from "content-collections";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      {
        title:
          "Blog - Technical Articles & Development Insights | Beam Portfolio",
      },
      {
        name: "description",
        content:
          "Read Beam's technical blog featuring software development insights, programming tutorials, and tech industry perspectives. Stay updated with the latest in web development.",
      },
      {
        property: "og:title",
        content:
          "Blog - Technical Articles & Development Insights | Beam Portfolio",
      },
      {
        property: "og:description",
        content:
          "Read Beam's technical blog featuring software development insights, programming tutorials, and tech industry perspectives.",
      },
      {
        property: "og:url",
        content: "https://yourwebsite.com/blogs",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:title",
        content:
          "Blog - Technical Articles & Development Insights | Beam Portfolio",
      },
      {
        name: "twitter:description",
        content:
          "Read Beam's technical blog featuring software development insights and programming tutorials.",
      },
    ],
  }),
  component: BlogsPage,
});

function BlogsPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <section className="space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Blogs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <header className="space-y-2">
          <h1 className="font-semibold text-3xl tracking-tight">Blogs</h1>
          <p className="text-muted-foreground">
            Technical articles, development insights, and programming tutorials
          </p>
        </header>

        <div className="space-y-3">
          {allPosts.map((post) => (
            <Link
              key={post._meta.path}
              params={{ id: post._meta.path }}
              to="/blogs/$id"
              viewTransition
            >
              <Card className="transition hover:cursor-pointer hover:border-accent">
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <CardDescription>{post.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
