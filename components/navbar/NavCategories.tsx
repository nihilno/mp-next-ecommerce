import Logo from "@/components/global/Logo";
import CategoriesList from "./CategoriesList";
import MobileNav from "./MobileNav";

function NavCategories() {
  return (
    <div className="flex items-center gap-6">
      <Logo />
      <CategoriesList />

      <div className="md:hidden">
        <MobileNav />
      </div>
    </div>
  );
}

export default NavCategories;
