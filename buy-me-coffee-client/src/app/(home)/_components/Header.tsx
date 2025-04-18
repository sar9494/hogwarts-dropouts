import { ChevronDown, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { useProfile } from "@/providers/ProfileProvider";
import Link from "next/link";
export const Header = () => {
  const { user, handleLogout } = useProfile();
  return (
    <div className="flex p-5 justify-between px-15 w-full fixed top-0 bg-white z-40 ">
      <Link href="/home" className="cursor-pointer">
        <div className="flex font-extrabold gap-2">
          <Coffee />
          <p>Buy Me Coffee</p>
        </div>
      </Link>
      <Popover>
        <PopoverTrigger>
          <div className="flex gap-10 items-center">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={user?.avatarImage} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{user?.name}</p>
            </div>
            <ChevronDown size={15} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-5" align="center">
          <Button onClick={handleLogout}>Log out</Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};
