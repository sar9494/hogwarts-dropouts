"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { SubmitButton } from "./SubmitButton";
import axios from "axios";
import { useRouter } from "next/navigation";
export const Step2 = () => {
  const usernameSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(4, "Password must be at least 4 characters"),
  });
  const router = useRouter();
  const handleSignUp = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/sign-up",
        values
      );

      if (response.data.id) {
        router.push("/logIn");
      } else if (response.data.message.includes("name")) {
        alert("Username is exist. Please enter new one.");
      } else if (response.data.message.includes("email")) {
        alert("Email is exist. Please enter new one.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const form = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = () => {
    const userInfo =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("signUp") || "")
        : {};
    localStorage.setItem(
      "signUp",
      JSON.stringify({ ...userInfo, ...form.getValues() })
    );
    handleSignUp(
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("signUp") || "")
        : {}
    );
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/3 space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton name="Submit" />
        </form>
      </FormProvider>
    </>
  );
};
