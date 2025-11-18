"use client";

import { CartIndicatorSkeleton } from "@/components/skeletons/ProductSkeletons";
import { Button } from "@/components/ui/button";
import { User, UserPlus } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") return <CartIndicatorSkeleton />;
  if (status === "unauthenticated")
    return (
      <Button variant="ghost" size="icon" asChild>
        <Link href="/auth/signin">
          <UserPlus className="h-4 w-4" />
        </Link>
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 text-sm" align="center">
        <DropdownMenuLabel>
          {session?.user?.name || "My Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account">My Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AuthStatus;
