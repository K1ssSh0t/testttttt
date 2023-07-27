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

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  profile_picture: string;
};
export function UpdateUser({ User }: { User: User }) {
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
      name: User.name,
      email: User.email,
      password: User.password,
      confirm_password: User.password,
      profile_picture: User.profile_picture,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    async function fetchData() {
      const data = await fetch(
        `https://laravel-api-production.up.railway.app/api/clientes/${User.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "aplication/json",
            Accept: "aplication/json",
          },
          body: JSON.stringify(values),
        }
      )
        .then((res) => {
          if (res.ok) {
            router.refresh();
            window.location.reload();
            return res.json();
          }
          throw new Error("Something went wrong");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className=" mx-4">
          ✒️ Update{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[670px]  overflow-y-scroll  ">
        <DialogHeader>
          <DialogTitle>Update Userr</DialogTitle>
          <DialogDescription></DialogDescription>
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
            />
            <FormField
              control={form.control}
              name="profile_picture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>Your profile picture link</FormDescription>
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
        <DialogFooter>
          <Button type="submit">Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
