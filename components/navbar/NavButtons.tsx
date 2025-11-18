import { ModeToggle } from "@/components/global/ModeToggle";
import { CartIndicatorSkeleton } from "@/components/skeletons/ProductSkeletons";
import { Suspense } from "react";
import AuthStatus from "../auth/AuthStatus";
import CartIndicator from "./CartIndicator";

function NavButtons() {
  return (
    <div className="flex items-center gap-1">
      <AuthStatus />
      <Suspense fallback={<CartIndicatorSkeleton />}>
        <CartIndicator />
      </Suspense>
      <ModeToggle />
    </div>
  );
}

export default NavButtons;
