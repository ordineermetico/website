import "server-only";
import { randomUUID } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/svg+xml": "svg",
};
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

/**
 * Upload an image to the public "media" bucket as the signed-in staff member (RLS checks the role).
 * Returns the public URL, null if no file was chosen, or an error message.
 */
export async function uploadImage(db: SupabaseClient, file: FormDataEntryValue | null, folder: string): Promise<{ url: string | null; error?: string }> {
  if (!(file instanceof File) || file.size === 0) return { url: null };
  const ext = IMAGE_TYPES[file.type];
  if (!ext) return { url: null, error: "Images must be JPEG, PNG, WebP, AVIF or SVG." };
  if (file.size > MAX_IMAGE_BYTES) return { url: null, error: "Images must be 4 MB or smaller." };
  const path = `${folder}/${randomUUID()}.${ext}`;
  const { error } = await db.storage.from("media").upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { url: null, error: `The image could not be uploaded (${error.message}).` };
  return { url: db.storage.from("media").getPublicUrl(path).data.publicUrl };
}
