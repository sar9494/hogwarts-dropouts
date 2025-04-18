"use client";
import { useRef, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { ProfileType, useProfile } from "@/providers/ProfileProvider";

const CLOUDINARY_CLOUD_NAME = "dnxg6ckrh";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";

const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.secure_url;
  } catch (err) {
    console.error("Error uploading image", err);
    return null;
  }
};

const saveProfile = async (values: {
  profileId: number;
  successMessage: string;
  backgroundImage: string;
}) => {
  try {
    await axios.put("http://localhost:4000/profile", values);
  } catch (err) {
    console.error("Error updating profile", err);
  }
};

export const SelectCoverImage = (props: { currentUser: ProfileType }) => {
  const { user } = useProfile();
  const { currentUser } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    currentUser?.backgroundImage
  );
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    currentUser?.backgroundImage
  );
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);

    setIsUploading(true);
    const uploadedUrl = await uploadImageToCloudinary(file);
    setIsUploading(false);

    if (uploadedUrl) {
      setImageUrl(uploadedUrl);
      if (!currentUser) return null;

      await saveProfile({
        profileId: currentUser.id,
        successMessage: "Profile updated successfully",
        backgroundImage: uploadedUrl,
      });
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full h-[320px] bg-[#F4F4F5] relative flex items-center justify-center overflow-hidden">
      {(previewImage || imageUrl) && (
        <img
          src={previewImage || imageUrl!}
          alt="Selected cover"
          className="absolute inset-0 object-cover w-full h-full"
        />
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
      />

      {currentUser?.id === user?.id && (
        <div
          className={`absolute z-10 ${
            imageUrl
              ? "top-4 right-4" // Top-right when there's an image
              : " flex items-center left-1/2  transform -translate-x-1/2" // Center when no image
          }`}>
          <Button
            className="flex gap-2 bg-white/80 hover:bg-white text-black"
            onClick={handleButtonClick}
            disabled={isUploading}>
            <Camera className="w-4 h-4" />
            {isUploading
              ? "Uploading..."
              : imageUrl
              ? "Change cover image"
              : "Add a cover image"}
          </Button>
        </div>
      )}
    </div>
  );
};
