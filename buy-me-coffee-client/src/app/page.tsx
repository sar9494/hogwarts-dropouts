"use client";
import { Header } from "@/components/Header";
import { SwitchPageButton } from "./(auth)/signUp/_components/SwitchPageButton";
export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-between relative">
      <Header />
      <div className="flex justify-center h-full items-center flex-col gap-8">
        <img
          src="https://res.cloudinary.com/dszot6j60/image/upload/v1744874396/coffee_tetumj.png"
          alt=""
          className="w-[350px] h-[350px]"
        />
        <div>
          <SwitchPageButton name={"Start my page"} link="signUp" />
        </div>
      </div>
      <div className="flex justify-end items-end absolute bottom-0.5 right-0">
        <img
          src="https://res.cloudinary.com/dszot6j60/image/upload/v1744874578/coffeegang_ylxuqy.png"
          alt=""
          className="w-[400px] h-[400px] "
        />
      </div>
      <div className="flex justify-start items-start absolute bottom-1 p-10">
        <img
          src="https://res.cloudinary.com/dszot6j60/image/upload/v1744874635/cup_n7qzxb.png"
          alt=""
          className="w-[250px] h-[250px]"
        />
      </div>
    </div>
  );
}
