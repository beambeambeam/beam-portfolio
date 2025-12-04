import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Blog = {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
};

const blogsById: Record<string, Blog> = {
  "lorem-ipsum-1": {
    id: "lorem-ipsum-1",
    title: "Lorem Ipsum Dolor Sit Amet",
    publishedAt: "2024-11-12",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod " +
      "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, " +
      "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
};

export const Route = createFileRoute("/blogs/$id")({
  component: BlogDetailPage,
});

function BlogDetailPage() {
  const { id } = Route.useParams();
  const blog = blogsById[id];

  if (!blog) {
    return (
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <p className="text-muted-foreground">Blog post not found.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <article className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl tracking-tight">
              {blog.title}
            </CardTitle>
            <time
              className="text-muted-foreground text-xs"
              dateTime={blog.publishedAt}
            >
              {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </time>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {blog.body}
            </p>
          </CardContent>
        </Card>
      </article>
    </main>
  );
}
