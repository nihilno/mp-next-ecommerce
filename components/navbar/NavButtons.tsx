import { ModeToggle } from "@/components/global/ModeToggle";
import { Button } from "@/components/ui/button";
import { navButtons } from "@/lib/links";
import Link from "next/link";

function NavButtons() {
  return (
    <div className="flex items-center gap-1">
      {navButtons.map((button) => (
        <Button asChild variant="ghost" size="icon" key={button.slug}>
          <Link href={button.href}>{button.icon}</Link>
        </Button>
      ))}
      <ModeToggle />
    </div>
  );
}

export default NavButtons;
