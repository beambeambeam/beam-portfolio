import { createFileRoute, Link } from "@tanstack/react-router";
import { allPosts } from "content-collections";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/blogs/")({
  component: BlogsPage,
});

function BlogsPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <section className="space-y-4">
        <header className="space-y-2">
          <h1 className="font-semibold text-3xl tracking-tight">Blog</h1>
          <p className="text-muted-foreground">random notes</p>
        </header>

        <div className="space-y-3">
          {allPosts.map((post) => (
            <Link
              key={post._meta.path}
              params={{ id: post._meta.path }}
              to="/blogs/$id"
            >
              <Card className="transition hover:cursor-pointer hover:border-accent">
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <CardDescription>{post.description}</CardDescription>
                    </div>
                    <time
                      className="shrink-0 text-muted-foreground text-xs"
                      dateTime={post.publishedAt}
                    >
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </time>
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
