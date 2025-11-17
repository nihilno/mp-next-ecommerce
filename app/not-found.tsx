"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Ghost, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function NotFound() {
  const router = useRouter();

  return (
    <div className="flex translate-y-55 flex-col items-center justify-center text-center">
      <div className="bg-muted animate-in fade-in slide-in-from-bottom-4 mb-6 rounded-full p-4 duration-700">
        <Ghost className="text-muted-foreground h-6 w-6" />
      </div>

      <h1 className="text-foreground mb-2 text-5xl font-bold tracking-tighter md:text-6xl">
        404
      </h1>

      <h2 className="text-foreground mb-4 text-2xl font-bold tracking-tight">
        Page not found.
      </h2>

      <p className="text-muted-foreground mb-8 max-w-md text-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        <br />
        Let&apos;s get you back on track.
      </p>

      <div className="flex flex-row-reverse items-center gap-4">
        <Button asChild className="gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </Button>

        <Button
          variant="outline"
          className="gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
