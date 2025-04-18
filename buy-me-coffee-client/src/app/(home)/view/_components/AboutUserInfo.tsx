"use client";
import { useDonations } from "@/providers/DonationProvider";
import { ProfileType, useProfile } from "@/providers/ProfileProvider";
import { Heart } from "lucide-react";
import { EditPro } from "./EditProfile";

export const AboutUserInfo = (props: { currentUser: ProfileType }) => {
  const { donations, isLoading } = useDonations();
  const { currentUser } = props;
  const { user } = useProfile();
  const hasSupporters = Array.isArray(donations) && donations.length > 0;

  return (
    <div className="w-[630px] h-auto bg-white space-y-6 p-4 rounded-2xl">
      <div className="space-y-5 border rounded-2xl p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              className="rounded-full"
              src={user?.avatarImage}
              width={48}
              height={48}
              alt="Jake's avatar"
            />
            <p className="font-bold">{currentUser?.name}</p>
          </div>
          {user?.id === currentUser?.id && <EditPro />}
        </div>
        <hr className="my-4" />
        <div>
          <p className="font-medium">About {currentUser?.name}</p>
          <p>{currentUser?.about}</p>
        </div>
      </div>

      <div className="space-y-2 border rounded-2xl p-4">
        <p className="font-medium">Social Media URL</p>
        <a
          className="text-blue-600 hover:underline"
          href="https://buymecoffee.com/spacerulz44"
          target="_blank">
          {currentUser?.socialMediaURL}
        </a>
      </div>
      <div className="space-y-4 border rounded-2xl p-4">
        <p className="font-medium">Recent Supporters</p>

        {!hasSupporters && !isLoading && (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 space-y-2">
            <Heart className="w-6 h-6" />
            <p className="font-medium">Be the first one to support Jake</p>
          </div>
        )}

        {hasSupporters && (
          <div className="space-y-2 h-[250px] overflow-scroll">
            {donations.map(donation => (
              <div
                key={donation.id}
                className="bg-gray-100 p-3 rounded-md shadow-sm">
                <p>
                  <span className="font-semibold">
                    {donation.donor?.username}
                  </span>{" "}
                  donated ${donation.amount}
                </p>
                {donation.specialMessage && (
                  <p className="text-sm text-gray-600">
                    {donation.specialMessage}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
