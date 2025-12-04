import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRightIcon, GithubIcon, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

type NavigationOption = {
  label: string;
  to: string;
  icon?: LucideIcon;
};

const LINKS: {
  internal: NavigationOption[];
  external: NavigationOption[];
} = {
  internal: [
    {
      label: "Blogs",
      to: "/blogs",
    },
  ],
  external: [
    {
      label: "Github",
      to: "https://github.com/beambeambeam",
      icon: GithubIcon,
    },
  ],
};

function LinkButton({
  link,
  isInternal,
}: {
  link: NavigationOption;
  isInternal: boolean;
}) {
  const buttonContent = (
    <Button size="lg" variant="outline">
      {link.label}
      {link.icon ? <link.icon /> : <ArrowUpRightIcon />}
    </Button>
  );

  if (isInternal) {
    return (
      <Link className="flex" to={link.to} viewTransition>
        {buttonContent}
      </Link>
    );
  }

  return (
    <a
      className="flex"
      href={link.to}
      rel="noopener noreferrer"
      target="_blank"
    >
      {buttonContent}
    </a>
  );
}

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
        <div className="flex flex-col gap-1">
          <p>This web</p>
          <div className="flex">
            {LINKS.internal.map((link) => (
              <LinkButton isInternal key={link.to} link={link} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p>Links</p>
          <div className="flex">
            {LINKS.external.map((link) => (
              <LinkButton isInternal={false} key={link.to} link={link} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
