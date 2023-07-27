import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Icons } from "@/components/icons";
import { userDataAtom } from "@/atoms/categoriesAtom";
import { useAtomValue, useSetAtom } from "jotai";

export function SheetDemo() {
  const user = useAtomValue(userDataAtom);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="mr-6 flex items-center ">
          {" "}
          <Icons.menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>My Data</SheetTitle>
          <SheetDescription>Your can see your user data here.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Avatar className=" w-32  h-32 place-self-center">
            <AvatarImage src={user.profile_picture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={user.name}
              className="col-span-3"
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input
              id="username"
              value={user.email}
              className="col-span-3"
              readOnly
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            {/** <Button type="submit">Save changes</Button> */}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
