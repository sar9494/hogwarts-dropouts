"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";
export const NavButton = (props: { name: string }) => {
  const { name } = props;
  const pathName = usePathname();

  return (
    <>
      <Button
        className={cn(
          "bg-white text-black w-[145px]",
          name.toLocaleLowerCase().includes(pathName.split("/")[1]) &&
            "bg-gray-300"
        )}>
        {name}
        {name.toLocaleLowerCase().includes("view") && <ExternalLink />}
      </Button>
    </>
  );
};
