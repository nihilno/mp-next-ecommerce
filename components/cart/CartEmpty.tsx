import { ShoppingCart } from "lucide-react";
import Link from "next/link";

function CartEmpty() {
  return (
    <div className="flex translate-y-55 flex-col items-center justify-center text-center">
      <div className="bg-muted animate-in fade-in slide-in-from-bottom-4 mb-6 rounded-full p-4 duration-700">
        <ShoppingCart className="text-muted-foreground h-6 w-6" />
      </div>
      <h1 className="text-foreground mb-2 text-2xl font-bold tracking-tight">
        Your cart is empty.
      </h1>
      <p className="text-muted-foreground max-w-md text-sm">
        Add some items to your{" "}
        <span className="text-foreground font-medium">Cart </span>
        to get started.
        <br />
      </p>
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground mt-1 text-sm underline transition-colors"
      >
        Start browsing.
      </Link>
    </div>
  );
}

export default CartEmpty;
