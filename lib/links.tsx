import { Search, ShoppingCart } from "lucide-react";

export const navButtons = [
  { slug: "search", icon: <Search />, href: "/search" },
  { slug: "cart", icon: <ShoppingCart />, href: "/cart" },
];

export const categories = [
  { id: 1, name: "Electronics", href: "/cart" },
  { id: 2, name: "Clothes", href: "/cart" },
  { id: 3, name: "Home", href: "/cart" },
];
