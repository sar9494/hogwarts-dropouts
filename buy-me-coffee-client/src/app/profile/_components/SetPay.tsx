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
import { useRouter } from "next/navigation";
import axios from "axios";
const countris = [
  "United States",
  "Australia",
  "Mongolia",
  "New Zealand",
  "United Kingdom",
];
export const SetPay = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof payInfoSchema>>({
    resolver: zodResolver(payInfoSchema),
    defaultValues: {
      country: "",
      firstName: "",
      lastName: "",
      cardNumber: "",
      expires: "",
      cvc: 0,
      year: "",
    },
  });
  const addNewCard = async (values: {
    country: string;
    firstName: string;
    lastName: string;
    cardNumber: string;
    expiryDate: string;
  }) => {
    const userId =
      typeof window !== "undefined"
        ? parseInt(localStorage.getItem("userId") || "")
        : 0;
    try {
      const response = await axios.post("http://localhost:4000/bank-acc", {
        userId: userId,
        ...values,
      });
      if (response.data.id) {
        router.push("/home");
      } else if (response.data.message.includes("number")) {
        alert("Card number exist enter another one.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (values: z.infer<typeof payInfoSchema>) => {
    await addNewCard({
      expiryDate: form.getValues("expires") + "/" + form.getValues("year"),
      country: values.country,
      firstName: values.firstName,
      lastName: values.lastName,
      cardNumber: values.cardNumber.toString(),
    });
  };

  return (
    <FormProvider {...form}>
      <form
        className="space-y-8 p-10 py-40"
        onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <p className="font-bold text-3xl">How would you like to be paid? </p>
          <p className="text-gray-300">Enter location and payment details</p>
        </div>

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
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
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
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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
        <div className="flex">
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
                      <SelectValue placeholder="Month" />
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
                      <SelectValue placeholder="Year" />
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
                  <Input id="cvc" type="number" {...field} placeholder="CVC" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex justify-end">
          <Button
            className="w-1/2"
            type="submit"
            onClick={() => onSubmit(form.getValues())}>
            Continue
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
