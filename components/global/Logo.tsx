import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="mr-6 hidden text-2xl font-bold md:inline-block">
      Next
    </Link>
  );
}

export default Logo;
