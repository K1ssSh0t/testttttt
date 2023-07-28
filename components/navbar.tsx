"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { SheetDemo } from "./sideBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userDataAtom } from "@/atoms/categoriesAtom";
import { useAtomValue, useSetAtom } from "jotai";

export function MainNav() {
  const pathname = usePathname();
  const user = useAtomValue(userDataAtom);
  //console.log(user);

  return (
    <div className="mr-4 hidden md:flex">
      <SheetDemo />
      <div className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">CRUD APP</span>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const user = useAtomValue(userDataAtom);
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <MainNav />

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center text-sm font-medium">
            <Avatar className=" mx-2">
              <AvatarImage src={user.profile_picture} />
              <AvatarFallback>{user.id}</AvatarFallback>
            </Avatar>

            <Link
              href="/"
              className={cn(
                "transition-colors text-foreground/60 hover:text-foreground/80"
              )}
            >
              Log Out
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
