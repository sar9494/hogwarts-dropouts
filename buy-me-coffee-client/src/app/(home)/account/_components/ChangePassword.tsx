"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordTypes } from "@/validations/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

export const ChangePassword = () => {
  const form = useForm<z.infer<typeof PasswordTypes>>({
    resolver: zodResolver(PasswordTypes),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });
  const onSubmit = (values: z.infer<typeof PasswordTypes>) => {
    console.log(values);
  };
  return (
    <FormProvider {...form}>
      <form className="py-5 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 border p-5 rounded-md">
          <p className="font-bold">Set new password</p>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter new password"
                    id="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm password"
                    id="confirm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Save changes
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
