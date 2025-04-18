import { Coffee } from "lucide-react";
import Link from "next/link";
import { SwitchPageButton } from "@/app/(auth)/signUp/_components/SwitchPageButton";

export const Header = () => {
  return (
    <div className="flex p-5 justify-between px-15 w-full">
      <Link href="/" className="cursor-pointer">
        <div className="flex font-extrabold items-center gap-2 hover:opacity-80 transition cursor-pointer">
          <Coffee size={55} />
          <p className="text-xl">Buy Me Coffee</p>
        </div>
      </Link>

      <div className="flex gap-2">
        <SwitchPageButton name={"Log in"} link="logIn" />
        <SwitchPageButton name={"Sign up"} link="signUp" />
      </div>
    </div>
  );
};
