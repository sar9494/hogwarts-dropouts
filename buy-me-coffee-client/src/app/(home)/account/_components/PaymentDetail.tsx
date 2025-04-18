"use client";
import { payInfoSchema } from "@/validations/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/providers/ProfileProvider";
import { useState } from "react";
const countris = [
  "United States",
  "Australia",
  "Mongolia",
  "New Zealand",
  "United Kingdom",
];
export const PaymentDetail = (props: {
  values: {
    id: number;
    country: string;
    firstName: string;
    lastName: string;
    cardNumber: string;
    expiryDate: string;
  };
}) => {
  const { expiryDate } = props.values;
  const { updateCardInfo } = useProfile();
  const [isSaving, setIsSaving] = useState(false);
  const form = useForm<z.infer<typeof payInfoSchema>>({
    resolver: zodResolver(payInfoSchema),
    defaultValues: {
      ...props.values,
      expires: expiryDate.toString().split("/")[0],
      year: expiryDate.toString().split("/")[1],
      cvc: 0,
    },
  });
  const onSubmit = async (values: z.infer<typeof payInfoSchema>) => {
    setIsSaving(true);
    try {
      await updateCardInfo({
        id: values.id,
        expiryDate: form.getValues("expires") + "/" + form.getValues("year"),
        country: values.country,
        firstName: values.firstName,
        lastName: values.lastName,
        cardNumber: values.cardNumber,
      });
    } catch (err) {
      console.error(err, "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4 py-5 pt-5"
        onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" space-y-4 p-5 border rounded-md">
          <p className="font-bold">Payment detail</p>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Select country</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {countris.map((country, index) => {
                        return (
                          <SelectItem key={index} value={country}>
                            {country}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3 w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel htmlFor="firstName">First name</FormLabel>
                  <FormControl>
                    <Input
                      id="firstName"
                      type="text"
                      {...field}
                      placeholder="Enter your name here."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel htmlFor="lastName">Last name</FormLabel>
                  <FormControl>
                    <Input
                      id="lastName"
                      type="text"
                      {...field}
                      placeholder="Enter your name here."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="cardNumber">Enter card number</FormLabel>
                <FormControl>
                  <Input
                    id="cardNumber"
                    type="number"
                    {...field}
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="expires"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="expires">Expires</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="h-[200px] overflow-scroll">
                        {Array.from({ length: 12 }).map((_, index) => {
                          return (
                            <SelectItem
                              key={index}
                              value={
                                index < 10
                                  ? "0" + (index + 1).toString()
                                  : (index + 1).toString()
                              }>
                              {index + 1} сар
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="year">Year</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={`${field.value} f`} />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 6 }).map((_, index) => {
                          return (
                            <SelectItem
                              key={index}
                              value={(
                                parseInt(moment().format("YYYY")) + index
                              ).toString()}>
                              {parseInt(moment().format("YYYY")) + index}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="cvc">CVC</FormLabel>
                  <FormControl>
                    <Input
                      id="cvc"
                      type="number"
                      {...field}
                      placeholder="CVC"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
