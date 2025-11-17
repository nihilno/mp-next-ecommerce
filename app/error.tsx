"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RotateCw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex translate-y-55 flex-col items-center justify-center text-center">
      <div className="bg-muted animate-in fade-in slide-in-from-bottom-4 mb-6 rounded-full p-4 duration-700">
        <AlertCircle className="text-muted-foreground h-6 w-6" />
      </div>

      <h1 className="text-foreground mb-2 text-5xl font-bold tracking-tighter md:text-6xl">
        OOPS
      </h1>

      <h2 className="text-foreground mb-4 text-2xl font-bold tracking-tight">
        Something went wrong.
      </h2>

      <p className="text-muted-foreground mb-8 max-w-md text-sm">
        {error.message || "The app hiccuped. Don't worry — your jobs are safe."}
      </p>

      <div className="flex flex-row-reverse items-center gap-4">
        <Button asChild className="gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </Button>

        <Button variant="outline" className="gap-2" onClick={reset}>
          <RotateCw className="h-4 w-4" />
          Reload
        </Button>
      </div>
      <p className="mt-8 text-xs opacity-75">
        Error ID: {error.digest || "local"}
      </p>
    </div>
  );
}
