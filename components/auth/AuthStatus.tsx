"use client";

import { IconLoadingSkeleton } from "@/components/skeletons/ProductSkeletons";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User, UserPlus } from "lucide-react";
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

  if (status === "loading") return <IconLoadingSkeleton />;
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
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-accent/60 relative rounded-full"
        >
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-popover w-44 rounded-xl p-1 text-sm shadow-lg"
        align="end"
      >
        <DropdownMenuLabel className="py-2 text-center font-semibold">
          {session?.user?.name || "My Account"}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/account" className="flex items-center gap-2">
            <Settings className="h-4 w-4 opacity-80" />
            My Account
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => signOut()}
          className="text-destructive focus:text-destructive flex cursor-pointer items-center gap-2"
        >
          <LogOut className="h-4 w-4 opacity-80" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AuthStatus;
