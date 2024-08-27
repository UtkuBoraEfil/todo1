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
      <div className="p-2 ">
        <div className=" flex w-full justify-between gap-1 border rounded-md px-2 py-2 ">
          <h1 className="border py-2 px-5 rounded-lg bg-[#0F172A] w-full text-[#F8FAFC] text-center">Login</h1>
          <Link href={"/auth/register"} className=" py-2 px-5  rounded-md  w-full text-center  hover:bg-gray-100 transition-all duration-300">Register</Link>
        </div>
        <div className=" py-3 px-5 mt-2 border rounded-md ">
          <h1 className=" font-bold text-2xl py-2">Login</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@domain.com" {...field} />
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
                        <Input type="password" placeholder="******" {...field} />
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
    </div>
  );
}
