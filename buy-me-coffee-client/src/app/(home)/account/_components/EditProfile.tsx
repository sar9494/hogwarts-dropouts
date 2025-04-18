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
import { useProfile } from "@/providers/ProfileProvider";
import { uploadImageToCloudinary } from "../../view/_components/SelectCoverImage";
import { useState } from "react";
import { usePathname } from "next/navigation";
export const EditProfile = () => {
  const pathName = usePathname();
  const { user, updateProfile } = useProfile();
  const [uploadImg, setUploadImg] = useState<File>();
  const [isSaving, setIsSaving] = useState(false);
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name,
      about: user?.about,
      avatarImage: user?.avatarImage,
      socialMediaURL: user?.socialMediaURL,
    },
  });
  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    setIsSaving(true);
    try {
      await updateProfile({
        ...values,
        avatarImage: uploadImg
          ? await uploadImageToCloudinary(uploadImg!)
          : user.avatarImage,
        id: 0,
        backgroundImage: undefined,
        successMessage: undefined,
        bankCards: [],
        userId: 0,
      });
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setIsSaving(false);
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
        className="space-y-4 py-5  z-10000">
        <div className="p-5 space-y-4 border rounded-md">
          {pathName.includes("acc") && (
            <p className="font-bold">Personal info</p>
          )}
          <FormField
            control={form.control}
            name="avatarImage"
            defaultValue={user?.avatarImage}
            render={({ field }) => (
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
                        src={field.value}
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
            defaultValue={user?.name}
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
          <Button type="submit" className="w-full" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
