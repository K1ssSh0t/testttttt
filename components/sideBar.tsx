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
import { buttonVariants } from "@/components/ui/button";

import { Icons } from "@/components/icons";
import { userDataAtom } from "@/atoms/categoriesAtom";
import { useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function SheetDemo() {
  const user = useAtomValue(userDataAtom);
  const pathname = usePathname();

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
          <nav className=" grid gap-4 py-4  text-center  text-sm font-medium">
            <Link
              href="/dashboard/products"
              className={cn(
                "transition-colors hover:text-foreground/80 border border-slate-200 rounded-md py-1 ",
                pathname === "/dashboard/products"
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Products
            </Link>
            <Link
              href="/dashboard/users"
              className={cn(
                "transition-colors hover:text-foreground/80 border border-slate-200 rounded-md py-1",
                pathname?.startsWith("/dashboard/users")
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Users
            </Link>
            <Link
              href="/dashboard/categories"
              className={cn(
                "transition-colors hover:text-foreground/80 border border-slate-200 rounded-md py-1",
                pathname?.startsWith("/dashboard/categories")
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Categories
            </Link>
          </nav>
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
