"use client";
import { ProfileProvider } from "@/providers/ProfileProvider";
import { Header } from "./_components/Header";
import { Navigation } from "./_components/Navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DonationProvider } from "@/providers/DonationProvider";
import { usePathname } from "next/navigation";

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return (
    <div className="relative">
      <QueryClientProvider client={queryClient}>
        <ProfileProvider>
          <DonationProvider>
            <Header />
            {!pathName.includes("view") && <Navigation />}

            <div className="w-full overflow-y-scroll flex justify-center absolute top-20  ">
              {children}
            </div>
          </DonationProvider>
        </ProfileProvider>
      </QueryClientProvider>
    </div>
  );
}
