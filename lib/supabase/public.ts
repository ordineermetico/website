import { createClient } from "@supabase/supabase-js";
import { supabaseConfigured, supabasePublishableKey, supabaseUrl } from "./env";

export const CONTENT_TAG = "site-content";

/**
 * Read-only client for public pages. Uses the publishable key, so row-level security
 * limits it to published posts, open jobs and published partner houses.
 */
export function publicClient() {
  if (!supabaseConfigured) return null;
  return createClient(supabaseUrl, supabasePublishableKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    // Every public query is cached under one tag; publishing from the admin area clears it (lib/admin/revalidate.ts).
    global: { fetch: (input, init) => fetch(input, { ...init, next: { revalidate: 300, tags: [CONTENT_TAG] } }) },
  });
}
