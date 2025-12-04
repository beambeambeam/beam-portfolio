import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <section className="space-y-4">
        <h1 className="font-semibold text-3xl tracking-tight">
          Beam&apos;s Portfolio
        </h1>
        <p className="text-muted-foreground">
          I built a lot of shit; Hope it works.
        </p>
      </section>
      <div>
        <Button variant="link">
          <Link to="/blogs">Blogs</Link>
        </Button>
      </div>
    </main>
  );
}
