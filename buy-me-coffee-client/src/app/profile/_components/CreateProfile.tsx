"use client";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profileSchema } from "@/validations/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { uploadImageToCloudinary } from "@/app/(home)/view/_components/SelectCoverImage";

export const CreateProfile = (props: {
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  const { setPage } = props;
  const [uploadImg, setUploadImg] = useState<File>();

  const userId =
    typeof window !== "undefined"
      ? parseInt(localStorage.getItem("userId") || "")
      : 0;
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      about: "",
      avatarImage: "",
      socialMediaURL: "",
    },
  });
  const createNewProfile = async (values: {
    userId: number;
    name: string;
    about: string;
    avatarImage: string;
    socialMediaURL: string;
  }) => {
    const response = await axios.post("http://localhost:4000/profile", values);
    console.log(response);

    if (response.data.id) {
      setPage(2);
    } else if (response.data.message.includes("Name")) {
      alert("Name exist enter another name.");
    }
  };
  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      await createNewProfile({
        ...values,
        avatarImage: await uploadImageToCloudinary(uploadImg!),
        userId: userId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadImg(file);
      const reader = new FileReader();
      reader.onload = () =>
        form.setValue("avatarImage", reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-10 py-40">
        <p className="font-bold text-3xl">Complete your profile page</p>
        <FormField
          control={form.control}
          name="avatarImage"
          render={() => (
            <FormItem>
              <FormLabel htmlFor="image">
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">Add image</p>
                  <div
                    className={cn(
                      "w-[150px] h-[150px] rounded-full flex items-center justify-center border border-dashed border-2",
                      form.getValues("avatarImage").length !== 0 && "hidden"
                    )}>
                    <Camera color="gray" />
                  </div>
                  {form.getValues("avatarImage").length !== 0 && (
                    <img
                      src={form.getValues("avatarImage")}
                      alt="Avatar Preview"
                      className="w-[150px] h-[150px] rounded-full"
                    />
                  )}
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  id="image"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input
                  id="name"
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
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="about">About</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write about yourself here."
                  id="about"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="socialMediaURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="socialMediaURL">Social media URL</FormLabel>
              <FormControl>
                <Input
                  id="socialMediaURL"
                  type="text"
                  {...field}
                  placeholder="https://"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          <Button
            type="submit"
            onClick={() => onSubmit(form.getValues())}
            className="w-1/2">
            Continue
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
//http://localhost:4000/profile/?currentUser=sar
