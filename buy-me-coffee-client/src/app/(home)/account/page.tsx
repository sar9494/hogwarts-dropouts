"use client";

import { useProfile } from "@/providers/ProfileProvider";
import { ChangePassword } from "./_components/ChangePassword";
import { EditProfile } from "./_components/EditProfile";
import { PaymentDetail } from "./_components/PaymentDetail";
import { SuccessMessage } from "./_components/SuccessMessage";

export default function Home() {
  const { user } = useProfile();
  return (
    <div className="w-3/7  flex flex-col justify-center ">
      <p className="font-bold  text-3xl">My account</p>
      <EditProfile />
      <ChangePassword />
      {user?.bankCards?.map((card, index) => {
        return <PaymentDetail key={index} values={card} />;
      })}
      <SuccessMessage />
    </div>
  );
}
