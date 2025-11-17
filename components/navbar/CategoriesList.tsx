import { navCategories } from "@/lib/links";
import Link from "next/link";

function CategoriesList() {
  return (
    <nav className="hidden md:flex md:items-center md:gap-6">
      {navCategories.map((category) => (
        <Link
          key={category.id}
          href={category.href}
          className="text-muted-foreground hover:text-foreground text-sm capitalize transition-colors"
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}

export default CategoriesList;
