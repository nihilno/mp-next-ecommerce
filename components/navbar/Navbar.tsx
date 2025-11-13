import NavButtons from "./NavButtons";
import NavCategories from "./NavCategories";

function Navbar() {
  return (
    <header className="bg-background/90 sticky top-0 z-10 container mx-auto flex h-20 w-full items-center justify-between border-b border-dashed px-1 backdrop-blur-md">
      <NavCategories />
      <NavButtons />
    </header>
  );
}

export default Navbar;
