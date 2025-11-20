import CategorySidebar from "@/components/products/CategorySidebar";
import CategorySorting from "@/components/products/CategorySorting";
import { getCategoriesCached } from "@/lib/actions/cart";
import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex gap-8">
        <div className="flex flex-col items-center gap-12">
          <Suspense fallback={<h1>loading in layout</h1>}>
            <CategorySidebarServerWrapper />
            <CategorySorting />
          </Suspense>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </section>
  );
}

async function CategorySidebarServerWrapper() {
  const categories = await getCategoriesCached();
  return <CategorySidebar categories={categories} />;
}
