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

import { Label } from "@/components/ui/label";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";

import { categoriesAtom } from "@/atoms/categoriesAtom";

export function DialogDemo() {
  const [categories, setCategories] = useAtom(categoriesAtom);
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
      name: "",
      category_id: "1",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    async function fetchData() {
      const data = await fetch(
        "http://apiparaprincipiantes.test/api/videoGames",
        {
          method: "POST",
          headers: {
            "Content-Type": "aplication/json",
            Accept: "aplication/json",
          },
          body: JSON.stringify(values),
        }
      ).then((res) => {
        return res.json();
      });
      // console.log(data);
      router.refresh();
      window.location.reload();
    }

    //router.push("/dashboard/products");
    //console.log(res);
    //router.refresh();
    fetchData();
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Product ➕</Button>
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
