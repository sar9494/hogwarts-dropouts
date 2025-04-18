"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { DonationAmount } from "../../view/_components/DonationAmount";
import { AboutUserInfo } from "../../view/_components/AboutUserInfo";
import { SelectCoverImage } from "../../view/_components/SelectCoverImage";
import axios from "axios";
import { ProfileType } from "@/providers/ProfileProvider";

export default function Home() {
  const { username } = useParams();
  const [height, setHeight] = useState(0);
  const [user, setUser] = useState({} as ProfileType);

  const getUserInfo = async () => {
    const response = await axios.get(
      `http://localhost:4000/profile/view/${username}`
    );
    setUser(response.data);
  };

  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerHeight - 100);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    getUserInfo();
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  return (
    <div
      style={{ height: `${height}px` }}
      className="w-full relative z-100 bg-white">
      <SelectCoverImage currentUser={user} />
      <div className="flex gap-5 absolute left-1/2 top-[250px] transform -translate-x-1/2 ">
        <AboutUserInfo currentUser={user} />
        <DonationAmount currentUser={user} />
      </div>
    </div>
  );
}
