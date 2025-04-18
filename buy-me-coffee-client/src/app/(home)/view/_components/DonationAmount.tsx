"use client";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDonations } from "@/providers/DonationProvider";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ProfileType, useProfile } from "@/providers/ProfileProvider";
import { usePathname } from "next/navigation";

export const DonationAmount = (props: { currentUser: ProfileType }) => {
  const { currentUser } = props;
  const pathName = usePathname();
  const { createDonations } = useDonations();
  const { user } = useProfile();
  const [selectAmount, setSelectAmount] = useState<number | null>(null);

  const formik = useFormik({
    initialValues: {
      socialURL: "",
      message: "",
    },
    validationSchema: Yup.object({
      socialURL: Yup.string()
        .url("Must be a valid URL")
        .required("URL is required"),
      message: Yup.string().max(280, "Message too long"),
    }),
    onSubmit: async values => {
      if (!selectAmount) {
        alert("Please select a donation amount.");
        return;
      }

      try {
        await createDonations({
          amount: selectAmount,
          specialMessage: values.message,
          socialURLOrBuyMeACoffee: values.socialURL,
          recipientId: currentUser.userId,
          donorId: user.userId,
        });

        alert("Donation sent! 🎉");
        setSelectAmount(null);
      } catch (err) {
        console.error(err);
        alert("Failed to send donation.");
      }
    },
  });
  const amountOptions = [1, 2, 5, 10];
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-[600px] h-[500px] bg-white outline-1 rounded-2xl p-5 space-y-5">
      <div>
        <p className="font-bold text-xl">Buy {user?.name} a Coffee</p>
      </div>
      <div>
        <p className="font-medium">Select amount:</p>
        <div className="flex gap-4">
          {amountOptions.map(amt => (
            <Button
              key={amt}
              type="button"
              className={`w-[72px] h-[40px] ${
                amt === selectAmount
                  ? "bg-black text-white"
                  : "bg-[#F4F4F5] text-black"
              }`}
              onClick={() => setSelectAmount(amt)}>
              <Coffee className="mr-1" />${amt}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <p className="font-medium">Enter BuyMeCoffee or social account URL:</p>
        <Input
          id="socialURL"
          name="socialURL"
          placeholder="https://buymecoffee.com/yourname"
          value={formik.values.socialURL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.socialURL && formik.errors.socialURL && (
          <p className="text-sm text-red-500">{formik.errors.socialURL}</p>
        )}
      </div>
      <div>
        <p className="font-medium">Special message:</p>
        <Textarea
          id="message"
          name="message"
          placeholder="Please write your message here"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.message && formik.errors.message && (
          <p className="text-sm text-red-500">{formik.errors.message}</p>
        )}
      </div>
      <div>
        <Button
          type="submit"
          className="w-[560px]"
          disabled={formik.isSubmitting || pathName.includes("view")}>
          {formik.isSubmitting ? "Sending..." : "Support"}
        </Button>
      </div>
    </form>
  );
};
