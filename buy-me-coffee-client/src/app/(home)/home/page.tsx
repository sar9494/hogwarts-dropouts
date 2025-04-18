"use client";

import { SearchByAmount } from "./_components/SearchByAmount";
import { TotalEarning } from "./_components/TotalEarning";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <div className="w-[955px] h-[990px] flex flex-col m-auto gap-6">
        <TotalEarning />
        <SearchByAmount />
      </div>
    </div>
  );
}
