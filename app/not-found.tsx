import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        That link doesn&apos;t go anywhere. Everything on this site lives on the home page.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">
          <ArrowLeft aria-hidden="true" />
          Back to home
        </Link>
      </Button>
    </section>
  );
}
