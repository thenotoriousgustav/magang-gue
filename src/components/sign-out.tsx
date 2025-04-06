import React from "react"

import signOut from "@/app/(auth)/auth/actions/sign-out"

import { Button } from "./ui/button"

export default function SignOut() {
  return (
    <form action={signOut}>
      <Button type="submit" variant="outline" className="cursor-pointer">
        Log Out
      </Button>
    </form>
  )
}
