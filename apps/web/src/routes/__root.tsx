import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { TailwindIndicator } from "@/components/ui/tailwind-indicator";
import appCss from "@/index.css?url";

export type RouterAppContext = object;

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
      },
      {
        title: "Beam Portfolio - Full-Stack Developer & Software Engineer",
      },
      {
        name: "description",
        content:
          "Explore Beam's portfolio showcasing innovative software projects, technical blog posts, and development expertise. Full-stack developer specializing in modern web technologies.",
      },
      {
        name: "keywords",
        content:
          "portfolio, software development, web development, full-stack developer, programming, tech blog, software engineer, React, TypeScript",
      },
      {
        name: "author",
        content: "Beam",
      },
      {
        name: "robots",
        content: "index, follow",
      },
      // Open Graph tags
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: "Beam Portfolio - Full-Stack Developer & Software Engineer",
      },
      {
        property: "og:description",
        content:
          "Explore Beam's portfolio showcasing innovative software projects, technical blog posts, and development expertise.",
      },
      {
        property: "og:site_name",
        content: "Beam Portfolio",
      },
      {
        property: "og:locale",
        content: "en_US",
      },
      // Twitter Card tags
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Beam Portfolio - Full-Stack Developer & Software Engineer",
      },
      {
        name: "twitter:description",
        content:
          "Explore Beam's portfolio showcasing innovative software projects, technical blog posts, and development expertise.",
      },
      // Theme color for mobile browsers
      {
        name: "theme-color",
        content: "#000000",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&display=swap",
      },
      {
        rel: "canonical",
        href: "https://yourwebsite.com",
      },
      {
        rel: "sitemap",
        type: "application/xml",
        href: "/sitemap.xml",
      },
    ],
  }),

  component: RootDocument,
});

function RootDocument() {
  return (
    <html className="dark" lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="relative flex min-h-screen flex-col font-sans antialiased">
          <Outlet />
        </div>
        <Toaster richColors />
        <TailwindIndicator />
        <Scripts />
      </body>
    </html>
  );
}
