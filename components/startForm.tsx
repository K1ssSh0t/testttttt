"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ProfileForm } from "./loginform";
import { userDataAtom } from "@/atoms/categoriesAtom";
import { useAtomValue, useSetAtom } from "jotai";
import { API_URL } from "@/atoms/categoriesAtom";

export function LoginForm() {
  const setUser = useSetAtom(userDataAtom);
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
  function onSubmitRegister(values: z.infer<typeof formSchema>) {
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
      })
        .then((res) => {
          if (res.ok) {
            router.push("/dashboard/products");
            //window.location.reload();
            const data = res.json();
            setUser(data);
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
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Login to your account here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ProfileForm />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>New Account</CardTitle>
            <CardDescription>Register Here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitRegister)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
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
                        <Input placeholder="Email" {...field} type="email" />
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
                        <Input placeholder="link" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your profile picture link
                      </FormDescription>
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
                        <Input
                          placeholder="Password"
                          {...field}
                          type="password"
                        />
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
                        <Input
                          placeholder="Password"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormDescription>Confirm your password</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
