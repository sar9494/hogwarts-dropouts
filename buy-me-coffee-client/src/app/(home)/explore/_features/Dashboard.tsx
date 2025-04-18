"use client";
import axios from "axios";
import { CreatorProfile } from "../_components/CreatorProfile";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ProfileType } from "@/providers/ProfileProvider";
import { SmallLoader } from "@/components/Loader";

export const Dashboard = (props: {
  profiles: ProfileType[];
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}) => {
  const { profiles, loading, setLoading } = props;
  const [allCreators, setAllCreators] = useState<ProfileType[]>([]);
  const getAllCreators = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:4000/profile/explore");
    setAllCreators(response.data);
    setLoading(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      await getAllCreators();
    };
    fetchData();
  }, []);
  return (
    <SmallLoader loading={loading}>
      <div className="flex flex-col gap-5">
        {profiles.map((creator, index) => {
          return <CreatorProfile key={index} creatorInfo={creator} />;
        })}
        {profiles.length == 0 &&
          allCreators.map((creator, index) => {
            return <CreatorProfile key={index} creatorInfo={creator} />;
          })}
      </div>
    </SmallLoader>
  );
};
