import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories } from "@/lib/links";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-background/95">
        <SheetHeader>
          <SheetTitle className="mb-2.5">Menu</SheetTitle>
          <Separator />
        </SheetHeader>

        <SheetDescription asChild>
          <nav className="flex flex-col gap-4">
            <h3 className="text-muted-foreground font-medium">Navigation</h3>
            <SheetClose asChild>
              <Link href="/" className="text-foreground">
                Home
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/products" className="text-foreground">
                Products
              </Link>
            </SheetClose>

            <div>
              <h3 className="text-muted-foreground mt-8 mb-4 font-medium">
                Categories
              </h3>
              {categories.map((category) => (
                <SheetClose key={category.id} asChild>
                  <Link
                    href={category.href}
                    className="text-foreground block py-2 text-sm font-medium capitalize"
                  >
                    {category.name}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </nav>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
