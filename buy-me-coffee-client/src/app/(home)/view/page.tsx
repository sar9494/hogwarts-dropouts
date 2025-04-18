"use client";

import { DonationAmount } from "./_components/DonationAmount";
import { AboutUserInfo } from "./_components/AboutUserInfo";
import { SelectCoverImage } from "./_components/SelectCoverImage";
import { useProfile } from "@/providers/ProfileProvider";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useProfile();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerHeight - 100);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  return (
    <div className="w-full relative " style={{ height: `${height}px` }}>
      <SelectCoverImage currentUser={user} />
      <div className="flex gap-5 absolute left-1/2 top-[250px] transform -translate-x-1/2">
        <AboutUserInfo currentUser={user} />
        <DonationAmount currentUser={user} />
      </div>
    </div>
  );
}
