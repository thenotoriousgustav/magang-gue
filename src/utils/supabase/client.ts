import { createBrowserClient } from "@supabase/ssr"

import { env } from "@/env/server"

export function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
}
