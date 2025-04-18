import Link from "next/link";
import { NavButton } from "./NavButton";

export const Navigation = () => {
  return (
    <div className="px-20 flex flex-col w-1/5 z-20 fixed top-20">
      <Link href={"/home"}>
        <NavButton name="Home" />
      </Link>
      <Link href={"/explore"}>
        <NavButton name="Explore" />
      </Link>
      <Link href={"/view"}>
        <NavButton name="View page" />
      </Link>
      <Link href={"/account"}>
        <NavButton name="Account settings" />
      </Link>
    </div>
  );
};
