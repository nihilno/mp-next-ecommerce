"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function SearchInput() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const router = useRouter();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmedQuery = query.trim();
    const params = new URLSearchParams();

    if (trimmedQuery) {
      params.set("query", trimmedQuery);
      router.push(`/search?${params.toString()}`);
    } else router.push("/");
  }

  return (
    <form className="relative flex" onSubmit={handleSubmit}>
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
      <Input
        type="search"
        placeholder="Search products..."
        className="pl-8 text-xs sm:text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        maxLength={32}
      />
    </form>
  );
}

export default SearchInput;
