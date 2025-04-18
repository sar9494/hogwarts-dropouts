"use client";

import { useDonations } from "@/providers/DonationProvider";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfile } from "@/providers/ProfileProvider";
import { CopyUserURL } from "./CopyUserURL";

export const TotalEarning = () => {
  const { totalEarning, fetchTotalEarnings } = useDonations();
  const { user } = useProfile();
  useEffect(() => {
    fetchTotalEarnings(user?.id);
  }, []);
  return (
    <div className="w-[900px] h-[260px] space-y-5 border rounded-2xl p-8 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            className="rounded-full"
            src={user?.avatarImage}
            width={48}
            height={48}
            alt="User's avatar"
          />
          <p className="font-bold">{user?.name}</p>
        </div>
        <CopyUserURL />
      </div>
      <hr className="my-4" />
      <div className="flex gap-4">
        <p className="font-bold text-2xl">Earnings</p>
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="all time">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <p className="font-bold text-3xl">${totalEarning}</p>
      </div>
    </div>
  );
};
