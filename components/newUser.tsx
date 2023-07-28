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
import { ScrollArea } from "@/components/ui/scroll-area";
import { API_URL } from "@/atoms/categoriesAtom";

export function AddUser() {
  const formSchema = z
    .object({
      name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
      profile_picture: z.string(),
      email: z.string().email({
        message: "Must be email",
      }),
      password: z.string().min(6),
      confirm_password: z.string().min(6),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Password doesn't match",
      path: ["confirm_password"],
    });

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      profile_picture: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    async function fetchData() {
      const data = await fetch(`${API_URL}clientes`, {
        method: "POST",
        headers: {
          "Content-Type": "aplication/json",
          Accept: "aplication/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        return res.json();
      });
      // console.log(data);
      router.refresh();
      window.location.reload();
    }
    fetchData();
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New User ➕</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[430px] max-h-[670px]  overflow-y-scroll  ">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>Your name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} type="email" />
                  </FormControl>
                  <FormDescription>Your email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="profile_picture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input placeholder="link" {...field} />
                  </FormControl>
                  <FormDescription>Your profile picture Link</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} type="password" />
                  </FormControl>
                  <FormDescription>Your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} type="password" />
                  </FormControl>
                  <FormDescription>Confirm your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
