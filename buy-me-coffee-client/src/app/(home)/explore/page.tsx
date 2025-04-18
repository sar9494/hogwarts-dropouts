"use client";
import { SearchBox } from "./_features/SearchBox";
import { Dashboard } from "./_features/Dashboard";
import { useState } from "react";
import { ProfileType } from "@/providers/ProfileProvider";

export default function Home() {
  const [profiles, setProfiles] = useState<ProfileType[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-4/7  flex flex-col justify-center p-5 gap-5">
      <p className="text-2xl font-bold">Explore creators</p>
      <SearchBox setProfiles={setProfiles} setLoading={setLoading} />
      <Dashboard
        profiles={profiles}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}
