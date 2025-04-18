"use client";
import { useState, createContext, useContext, useEffect } from "react";
import { getReceivedDonations } from "@/app/utils/Axios";
import axios from "axios";
import { Loader } from "@/components/Loader";
import moment from "moment";
type receivedDonations = {
  id: number;
  amount: number;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
  recipientId: number;
  createdAt: string;
  donorId: number;
  donor: {
    id: number;
    email: string;
    username: string;
    Profile: {
      name: string;
      avatarImage: string;
      socialMediaURL: string;
    };
  };
};
export type Donation = {
  amount: number;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
  recipientId: number;
  donorId: number;
};
type DonationContextType = {
  donations: receivedDonations[];
  isLoading: boolean;
  fetchDonations: () => Promise<void>;
  createDonations: (donation: Donation) => Promise<void>;
  totalEarning: number;
  fetchTotalEarnings: (userId: number) => Promise<void>;
  searchDonations: (filters: {
    amount?: string;
    date?: string;
  }) => Promise<void>;
};
const DonationContext = createContext<DonationContextType>(
  {} as DonationContextType
);
export const DonationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [donations, setDonations] = useState<receivedDonations[]>([]);
  const [loading, setLoading] = useState(true);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : 0;
  const fetchDonations = async () => {
    try {
      setLoading(true);
      const data = await getReceivedDonations();

      const formattedData = data?.map((donation: receivedDonations) => ({
        ...donation,
        createdAt: moment().startOf("day").fromNow(),
      }));

      setDonations(formattedData || []);
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setLoading(false);
    }
  };

  const createDonations = async (donation: Donation) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/donation",
        donation
      );
      setDonations(prev => [response.data, ...prev]);
    } catch (err) {
      console.log("err while creating new donations", err);
    }
  };
  const [totalEarning, setTotalEarnings] = useState<number>(0);

  const fetchTotalEarnings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/donation/total-earnings/${userId}`
      );
      setTotalEarnings(res.data.totalEarnings || 0);
    } catch (err) {
      console.error("Error fetching total earnings:", err);
    }
  };

  const searchDonations = async (filters: {
    amount?: string;
    date?: string;
  }) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await axios.get(
        `http://localhost:4000/donation/search/${userId}?${params}`
      );

      const formattedData = res.data.donations?.map(
        (donation: receivedDonations) => ({
          ...donation,
          createdAt: moment().startOf("day").fromNow(),
        })
      );

      setDonations(formattedData || []);
    } catch (err) {
      console.error("Error searching donations:", err);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <DonationContext.Provider
      value={{
        donations,
        isLoading: loading,
        fetchDonations,
        createDonations,
        totalEarning,
        fetchTotalEarnings,
        searchDonations,
      }}>
      <Loader loading={loading}>{children}</Loader>
    </DonationContext.Provider>
  );
};

export const useDonations = () => useContext(DonationContext);
