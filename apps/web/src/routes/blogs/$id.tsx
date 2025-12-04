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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RelativeTimeCard } from "@/components/ui/relative-time-card";

export const Route = createFileRoute("/blogs/$id")({
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
      <article className="grid gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/blogs">Blogs</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <header className="space-y-2">
          <h1 className="font-semibold text-3xl tracking-tight">
            {post.title}
          </h1>
          <p className="text-muted-foreground">
            <time
              className="text-muted-foreground text-xs"
              dateTime={post.publishedAt}
            >
              <RelativeTimeCard date={new Date(post.publishedAt)} />
            </time>
          </p>
        </header>
        <Card>
          <CardContent>
            <div className="whitespace-pre-wrap text-muted-foreground text-sm leading-relaxed">
              {post.content}
            </div>
          </CardContent>
        </Card>
        <Link to="..">
          <Button variant="outline">BACK</Button>
        </Link>
      </article>
    </main>
  );
}
