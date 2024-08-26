"use client";
import { login } from "@/actions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CheckCheck, LoaderCircle, TriangleAlert } from "lucide-react";
import Link from "next/link";
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
import { useState } from "react";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export default function Login() {
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "nigga@nigga.nigga",
      password: "31",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(undefined);

    // const message = await login(values);
    await login(values);
    // console.log(message);
    // if (message?.error) {
    //   setError(message.error);
    // }
  }

  return (
    <div className="grid min-h-screen  place-content-center ">
      <div className="p-2 border border-red-800">
        <div className=" flex w-full justify-between">
          <h1>Login</h1>
          <Link href={"/auth/register"}>Register31</Link>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="****" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {error && (
              <div className="border bg-red-400 text-sm p-2 rounded-md flex gap-2 items-center text-white">
                <TriangleAlert className="size-4" />
                {error}
              </div>
            )}
            <Button disabled={form.formState.isSubmitting} type="submit">
              {form.formState.isSubmitting ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="size-4 animate-spin" />
                  Submitting
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
