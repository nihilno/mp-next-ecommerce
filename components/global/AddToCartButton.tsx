"use client";

import { AddToCart } from "@/lib/actions/cart";
import { Product } from "@/prisma/generated/prisma/client";
import { ArrowRight, Loader2Icon, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

function AddToCartButton({ product }: { product: Product }) {
  const [isAdding, setIsAdding] = useState(false);
  const { id, inventory } = product;

  async function handleAddToCart() {
    try {
      setIsAdding(true);
      await AddToCart(id, 1);
      toast.success("Item added to Cart.", {
        description: (
          <div className="flex items-center gap-1">
            <Link
              href="/cart"
              className="flex items-center gap-1 underline"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <span>Go to Cart</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        ),
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={inventory < 1 || isAdding}
      className="w-38 transition-all"
    >
      {isAdding ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <ShoppingCart className="mr-1 h-4 w-4" />
      )}
      {inventory > 0 ? "Add to Cart" : "Out of stock"}
    </Button>
  );
}

export default AddToCartButton;
