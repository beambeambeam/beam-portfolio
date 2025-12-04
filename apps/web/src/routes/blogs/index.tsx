import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Blog = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
};

const blogs: Blog[] = [
  {
    id: "lorem-ipsum-1",
    title: "Lorem Ipsum Dolor Sit Amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    publishedAt: "2024-11-12",
  },
];

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
          {blogs.map((blog) => (
            <Card className="transition hover:border-primary" key={blog.id}>
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">
                      <Link
                        className="hover:underline"
                        params={{ id: blog.id }}
                        to="/blogs/$id"
                      >
                        {blog.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>{blog.description}</CardDescription>
                  </div>
                  <time
                    className="shrink-0 text-muted-foreground text-xs"
                    dateTime={blog.publishedAt}
                  >
                    {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </time>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
