import "server-only";
import { revalidatePath, updateTag } from "next/cache";
import { CONTENT_TAG } from "@/lib/supabase/public";

/** Called from admin server actions after content changes: clears cached data and pages so edits appear immediately. */
export function refreshPublicSite() {
  updateTag(CONTENT_TAG);
  revalidatePath("/[lang]", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");
}
