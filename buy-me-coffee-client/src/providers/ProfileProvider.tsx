"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

export type ProfileType = {
  id: number;
  userId: number;
  name: string | undefined;
  avatarImage: string | undefined;
  socialMediaURL: string | undefined;
  about: string | undefined;
  backgroundImage: string | undefined;
  successMessage: string | undefined;
  bankCards: BankCard[];
};
export type BankCard = {
  id: number;
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string;
};
type ProfileContextType = {
  user: ProfileType;
  handleLogout: () => void;
  updateProfile: (values: ProfileType) => Promise<void>;
  updateCardInfo: (values: BankCard) => Promise<void>;
  userId: string | 0 | null;
  isLoading: boolean;
};
const ProfileContext = createContext<ProfileContextType>(
  {} as ProfileContextType
);

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : 0;
  const { data: user, refetch } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:4000/profile/?currentUser=${userId}`
      );
      if (!response.data) {
        router.push("/profile");
      }
      setIsLoading(false);
      return response.data;
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    router.push("/logIn");
  };

  const updateProfile = async (values: ProfileType) => {
    await axios.put("http://localhost:4000/profile", {
      profileId: user.id,
      ...values,
    });
    await refetch();
  };
  const updateCardInfo = async (values: BankCard) => {
    await axios.put("http://localhost:4000/bank-acc", {
      ...values,
      profileId: values.id,
    });
    await refetch();
  };

  return (
    <ProfileContext.Provider
      value={{
        user: user,
        handleLogout: handleLogout,
        updateProfile: updateProfile,
        updateCardInfo: updateCardInfo,
        userId: userId,
        isLoading: isLoading,
      }}>
      {isLoading == true ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <img src="https://s3-alpha-sig.figma.com/img/07f9/97c5/b22f6bc9ba535eec9efcdd0bacb3bb4d?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RVZlgTF6mUtalHooEWzMyYfM0RgAC90fdGSXBtxoXzCaWiMx1OwKNvEuhBZneVMa2Javz1blckCYcaoiQLyVwAjunKFlb5X5iHOaH9IPnaAUCpxYUaWwDkD8ATVuV9McSLVXQJqS1FPMS1PvmkzYDUZ3n5T8pxGNmBeYyLMd2v~JYlHAaEpePhO5h3xbPJafLXnq91XrGvuQCPPOcLXQZvPQdnqz1F-MugK4H3N~u7AjGkajbLu1wCfWyNaomxgQUGaHsFX8SUF3alEaKnDd73cJpsHgod0vXTQyZLudW78ekgKa01d1H7FdBPdf67K5Dvw0cUjkw6i1q4uK6av9Pw__" />
        </div>
      ) : (
        children
      )}
    </ProfileContext.Provider>
  );
};
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    console.log("context is not defined");
  }
  return context;
};
