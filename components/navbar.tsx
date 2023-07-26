"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { SheetDemo } from "./sideBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <SheetDemo />
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">CRUD APP</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/dashboard/products"
          className={cn(
            "transition-colors hover:text-foreground/80",
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
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/dashboard/users")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Users
        </Link>
      </nav>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <MainNav />

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center text-sm font-medium">
            <Avatar className=" mx-2">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <Link
              href="/"
              className={cn(
                "transition-colors text-foreground/60 hover:text-foreground/80"
              )}
            >
              Cerrar Sesion
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
