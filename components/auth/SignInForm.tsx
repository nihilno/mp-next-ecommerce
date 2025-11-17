"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginSchema, LoginSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

function SignInForm() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchemaType) {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  className="text-sm!"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  className="text-sm!"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="-mt-4 ml-auto text-sm">
          <Link href="#" className="text-muted-foreground hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="mt-2 w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
}

export default SignInForm;
