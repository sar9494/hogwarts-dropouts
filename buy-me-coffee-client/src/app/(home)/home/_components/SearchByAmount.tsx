"use client";

import { useDonations } from "@/providers/DonationProvider";
import { Heart } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SmallLoader } from "@/components/Loader";
import { useProfile } from "@/providers/ProfileProvider";

export const SearchByAmount = () => {
  const { donations, searchDonations } = useDonations();
  const [selectedAmount, setSelectedAmount] = useState<string>("$1");
  const [loading, setLoading] = useState(false);

  const handleAmountChange = async (value: string) => {
    const numericAmount = value.replace("$", "");
    setLoading(true);
    setSelectedAmount(value);
    try {
      await searchDonations({ amount: numericAmount });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const { user } = useProfile();
  const hasSupporters = Array.isArray(donations) && donations.length > 0;

  return (
    <div className="w-[900px] h-auto bg-white flex flex-col gap-8">
      <div className="flex justify-between">
        <p>Recent transactions</p>
        <Select onValueChange={handleAmountChange} value={selectedAmount}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Amount" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="$1">$1</SelectItem>
            <SelectItem value="$2">$2</SelectItem>
            <SelectItem value="$5">$5</SelectItem>
            <SelectItem value="$10">$10</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <SmallLoader loading={loading}>
        <div className="w-[900px] border rounded-2xl p-6">
          <div className="space-y-4 p-4">
            {!hasSupporters && !loading && (
              <div className="flex flex-col border items-center justify-center text-center text-gray-500 space-y-2">
                <Heart className="w-6 h-6" />
                <p className="font-medium">
                  Be the first one to support {user?.name}
                </p>
              </div>
            )}

            {hasSupporters && (
              <div className="space-y-4">
                {donations.map(donation => (
                  <div key={donation.id} className="p-3">
                    <div className="flex justify-between">
                      <div className="flex gap-4">
                        <img
                          className="rounded-full"
                          src={donation.donor?.Profile.avatarImage}
                          width={48}
                          height={48}
                          alt="Jake's avatar"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="font-medium">
                            {donation.donor?.Profile.name}
                          </p>
                          <a className="text-xs">
                            {donation.donor?.Profile.socialMediaURL}
                          </a>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <p className="font-bold text-lg">
                          + ${donation.amount}
                        </p>
                        <p>{donation.createdAt}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p>{donation.specialMessage}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </SmallLoader>
    </div>
  );
};
