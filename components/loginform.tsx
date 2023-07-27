"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { userDataAtom } from "@/atoms/categoriesAtom";
import { useAtomValue, useSetAtom } from "jotai";

export function ProfileForm() {
  const setUser = useSetAtom(userDataAtom);
  const router = useRouter();
  const formSchemaLogin = z.object({
    email: z.string().email({
      message: "Must be email",
    }),
    password: z.string().min(6),
  });
  // 1. Define your form.
  const formLogin = useForm<z.infer<typeof formSchemaLogin>>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmitLogin(values: z.infer<typeof formSchemaLogin>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    async function fetchData() {
      const data = await fetch(
        `http://apiparaprincipiantes.test/api/clientes/${values.email}/${values.password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "aplication/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            router.push("/dashboard/products");
            //window.location.reload();
            setUser(res.json());
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
    <Form {...formLogin}>
      <form
        onSubmit={formLogin.handleSubmit(onSubmitLogin)}
        className="space-y-8"
      >
        <FormField
          control={formLogin.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>Your email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formLogin.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormDescription>Your passsword</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
