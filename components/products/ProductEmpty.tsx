import { SearchX } from "lucide-react";
import Link from "next/link";

function ProductEmpty({ query }: { query: string | undefined }) {
  return (
    <div className="flex translate-y-55 flex-col items-center justify-center text-center">
      <div className="bg-muted animate-in fade-in slide-in-from-bottom-4 mb-6 rounded-full p-4 duration-700">
        <SearchX className="text-muted-foreground h-6 w-6" />
      </div>
      <h1 className="text-foreground mb-2 text-2xl font-bold tracking-tight">
        No products found.
      </h1>
      <p className="text-muted-foreground max-w-md text-sm">
        We couldn&apos;t find anything for{" "}
        <span className="text-foreground font-medium">
          &quot;{query}&quot;{" "}
        </span>
        category.
        <br />
        Try adjusting your search or{" "}
        <Link
          href="/"
          className="hover:text-foreground underline transition-colors"
        >
          explore our categories.
        </Link>
      </p>
    </div>
  );
}

export default ProductEmpty;
