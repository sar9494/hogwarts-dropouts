import { ProfileType } from "@/providers/ProfileProvider";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CreatorProfile = (props: { creatorInfo: ProfileType }) => {
  const { avatarImage, about, name, socialMediaURL } = props.creatorInfo;
  return (
    <div className="w-full h-[225px] outline p-5 rounded-xl">
      <div className="flex gap-3 justify-between">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={avatarImage} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <h2 className="text-2xl font-bold">{name}</h2>
        </div>
        <Link href={`/explore/${name}`}>
          <Button variant="outline">View profile</Button>
        </Link>
      </div>
      <div className="flex justify-between">
        <div className="w-1/2">
          <h2 className="text-lg font-semibold w-[420px] h-[36px]">
            About {name}
          </h2>
          <p className="w-[420px] h-[80px]">{about}</p>
        </div>
        <div className="w-1/2">
          <h2 className="text-lg font-semibold">Social media URL</h2>
          <p>{socialMediaURL}</p>
        </div>
      </div>
    </div>
  );
};
