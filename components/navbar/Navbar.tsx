import SearchInput from "@/components/global/SearchInput";
import NavButtons from "@/components/navbar/NavButtons";
import NavCategories from "@/components/navbar/NavCategories";

function Navbar() {
  return (
    <header className="bg-background/90 sticky top-0 z-10 container mx-auto flex h-20 w-full items-center justify-between border-b border-dashed px-1 backdrop-blur-md">
      <NavCategories />
      <div className="mx-4 block w-full max-w-md md:mx-8">
        <SearchInput />
      </div>
      <NavButtons />
    </header>
  );
}

export default Navbar;
