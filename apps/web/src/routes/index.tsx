import { createFileRoute } from "@tanstack/react-router";

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
          This is a clean starting point. Replace this section with your actual
          portfolio content, projects, and links.
        </p>
      </section>
    </main>
  );
}
