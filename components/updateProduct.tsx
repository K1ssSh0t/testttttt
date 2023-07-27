"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { categoriesAtom } from "@/atoms/categoriesAtom";

import { Label } from "@/components/ui/label";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { atom, useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

type Product = {
  id: number;
  name: string;
  category_id: number;
  score: number;
};
export function UpdateProduct({ Product }: { Product: Product }) {
  const [categories, setCategories] = useAtom(categoriesAtom);
  //console.log(categories.map(({ id }) => id));
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    category_id: z.string(),
    score: z.coerce.number().gte(1).lte(100, {
      message: "Score  must be lest than 100",
    }),
  });

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: Product.name,
      category_id: Product.category_id as unknown as string,
      score: Product.score,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    async function updateData() {
      const data = await fetch(
        `https://laravel-api-production.up.railway.app/api/videoGames/${Product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "aplication/json",
            "Cache-Control": "no-cache, private",
            Accept: "aplication/json",
          },
          body: JSON.stringify(values),
        }
      ).then((res) => {
        return res;
      });
      // console.log(data);
      router.refresh();
      window.location.reload();
    }

    // window.location.reload();
    updateData();
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className=" mx-4">
          ✒️ Update{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you &apos re
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>Name of the Video Game</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>

                  <FormControl>
                    <select
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-[200px] appearance-none bg-transparent font-normal"
                      )}
                      itemType="number"
                      {...field}
                    >
                      {categories.map((category: any) => {
                        return (
                          <option
                            value={parseInt(category.id)}
                            key={category.id}
                            className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                          >
                            {category.name}
                          </option>
                        );
                      })}
                    </select>
                  </FormControl>

                  <FormDescription>Category of the Video Game</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Score</FormLabel>

                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>Score of the Video Game</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit">Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
