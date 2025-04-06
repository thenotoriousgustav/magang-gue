"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"

export default async function GoogleOAuth() {
  const supabase = await createClient()

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  })

  if (data.url) {
    redirect(data.url)
  }

  revalidatePath("/", "layout")
}
