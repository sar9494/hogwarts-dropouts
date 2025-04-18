"use client";
import { Header } from "@/components/Header";
import { CreateProfile } from "./_components/CreateProfile";
import { SetPay } from "./_components/SetPay";
import { useState } from "react";
export default function Home() {
  const [page, setPage] = useState(1);
  return (
    <div className="flex flex-col w-full items-center">
      <Header />
      {page == 1 ? <CreateProfile setPage={setPage} /> : <SetPay />}
    </div>
  );
}
