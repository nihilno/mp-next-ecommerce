import { ModeToggle } from "@/components/global/ModeToggle";
import { IconLoadingSkeleton } from "@/components/skeletons/ProductSkeletons";
import { Suspense } from "react";
import AuthStatus from "../auth/AuthStatus";
import CartIndicator from "./CartIndicator";

function NavButtons() {
  return (
    <div className="flex items-center gap-1">
      <AuthStatus />
      <Suspense fallback={<IconLoadingSkeleton />}>
        <CartIndicator />
      </Suspense>
      <ModeToggle />
    </div>
  );
}

export default NavButtons;
