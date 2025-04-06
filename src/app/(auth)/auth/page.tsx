"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import React, { startTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import GoogleOAuth from "./actions/google-oauth"
import otpAuth from "./actions/otp-auth"
import { authSchema } from "./schema"

export default function AuthenticationPage() {
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  })

  async function onSubmit(values: z.infer<typeof authSchema>) {
    startTransition(async () => {
      const data = await otpAuth(values)

      if (data.status === "error") {
        toast.error(data.message)
      } else {
        toast.success(data.message)
      }
    })
  }

  return (
    <section className="flex h-screen w-full">
      <div className="w-1/2 bg-zinc-900 p-8 text-white">
        <div className="flex h-full flex-col justify-between">
          <h1>Magang Gue</h1>
          <p>
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat
            deserunt, eligendi impedit debitis obcaecati quos?" - Gustam Rheza
          </p>
        </div>
      </div>

      <div className="flex w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <h1 className="mb-1 text-3xl font-semibold">Create an account</h1>
            <p className="text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="gustam@example.com" {...field} />
                    </FormControl>
                    <FormDescription className="text-sm text-zinc-500">
                      This is the email that will be used to login to your
                      account.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full cursor-pointer">
                Submit
              </Button>
            </form>
          </Form>

          <form action={GoogleOAuth}>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background text-muted-foreground px-2">
                  Or continue with
                </span>
              </div>
            </div>
            <Button variant={"secondary"} className="w-full cursor-pointer">
              Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
