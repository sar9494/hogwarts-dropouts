import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { SubmitButton } from "./SubmitButton";

export const Step1 = (props: { setStep: Dispatch<SetStateAction<number>> }) => {
  const { setStep } = props;
  const usernameSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters"),
  });
  const form = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  });
  const onSubmit = () => {
    localStorage.setItem("signUp", JSON.stringify(form.getValues()));
    setStep(1);
  };
  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton name="Next" />
        </form>
      </FormProvider>
    </>
  );
};
