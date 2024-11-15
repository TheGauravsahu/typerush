import ThemeToggle from "./theme-toggle";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center gap-3 justify-around p-2">
      <Link prefetch={true} href="/">
        <h1 className="font-bold text-xl">typerush</h1>
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </nav>
  );
}
