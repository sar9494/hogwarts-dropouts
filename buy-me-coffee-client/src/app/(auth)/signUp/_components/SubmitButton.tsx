import { Button } from "@/components/ui/button";

export const SubmitButton = (props: { name: string }) => {
  return (
    <Button type="submit" className="w-full">
      {props.name}
    </Button>
  );
};
