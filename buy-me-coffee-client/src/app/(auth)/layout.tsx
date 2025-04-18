import { Coffee } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full  bg-gray-100 ">
      <div className="w-1/2  bg-amber-300">
        <div className="flex  font-bold text-2xl gap-2 items-center h-1/10 p-10 px-20">
          <Coffee />
          <p> Buy Me Coffee </p>
        </div>
        <div className="flex flex-col items-center justify-center h-8/10 ">
          <img src="https://res.cloudinary.com/dszot6j60/image/upload/v1744874396/coffee_tetumj.png" />
          <p className="font-bold text-3xl pt-7">Fund your creative work</p>
          <p className="p-3 text-xl">
            Accept support. Start a membership. Set up a shop. Its easier than
            you think.
          </p>
        </div>
      </div>
      <div className="w-1/2">{children}</div>
    </div>
  );
}
