"use client";
import { Input } from "@/components/ui/input";
import { ProfileType } from "@/providers/ProfileProvider";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export const SearchBox = (props: {
  setProfiles: Dispatch<SetStateAction<ProfileType[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const { setProfiles, setLoading } = props;
  const [searchValue, setSearchValue] = useState("");
  const getPros = async (value: string) => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:4000/profile/explore?name=${value}`
    );
    setProfiles(response.data);
    setLoading(false);
  };
  const handleSearchValueChange = async (e: string) => {
    setSearchValue(e);
    await getPros(e);
  };
  return (
    <div className="flex gap-2 items-center">
      <SearchIcon color="gray" />
      <Input
        type="text"
        placeholder={"Search name"}
        value={searchValue}
        onChange={e => handleSearchValueChange(e.target.value)}
        className=" w-[250px]"
      />
    </div>
  );
};
