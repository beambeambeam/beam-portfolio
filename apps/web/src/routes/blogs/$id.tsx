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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <Link to="..">
          <Button variant="outline">BACK</Button>
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl tracking-tight">
              {post.title}
            </CardTitle>
            <time
              className="text-muted-foreground text-xs"
              dateTime={post.publishedAt}
            >
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </time>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap text-muted-foreground text-sm leading-relaxed">
              {post.content}
            </div>
          </CardContent>
        </Card>
      </article>
    </main>
  );
}
