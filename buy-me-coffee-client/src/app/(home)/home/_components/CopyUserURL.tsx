import { Button } from "@/components/ui/button";
import { useProfile } from "@/providers/ProfileProvider";
import { Copy } from "lucide-react";
import React from "react";

export const CopyUserURL: React.FC = () => {
  const { user } = useProfile();
  const textToCopy = user?.socialMediaURL;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy!);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <Button onClick={handleCopy} className="bg-[#F4F4F5] text-black">
      <Copy />
      Share page link
    </Button>
  );
};
