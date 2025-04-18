import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SwitchPageButton = (props: { name: string; link: string }) => {
  const { name, link } = props;
  const pathName = usePathname();
  return (
    <Link href={`/${link}`}>
      <Button
        className="p-7 rounded-full bg-white text-black hover:bg-amber-200 font-bold text-lg  border-2 border-amber-300"
        style={
          pathName.length == 1 && (name.includes("tart") || name.includes("og"))
            ? { backgroundColor: "rgb(252, 211, 77)" }
            : {}
        }>
        {name}
      </Button>
    </Link>
  );
};
