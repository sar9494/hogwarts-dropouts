import { EditProfile } from "../../account/_components/EditProfile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const EditPro = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#F4F4F5] text-black">Edit page</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] z-100000 ">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <EditProfile />
      </DialogContent>
    </Dialog>
  );
};
