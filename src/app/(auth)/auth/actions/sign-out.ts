"use server"

import { revalidatePath } from "next/cache"

import { createClient } from "@/utils/supabase/server"

export default async function signOut() {
  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error during sign out:", error.message)
      throw new Error("Failed to sign out. Please try again.")
    }

    revalidatePath("/")
  } catch (error) {
    console.error("Unexpected error during sign out:", error)
    throw error
  }
}
