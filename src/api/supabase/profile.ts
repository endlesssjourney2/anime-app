import { supabase } from "../../db/supabase";
import type { Profile, UpdateProfilePayload } from "../../types/Profile";

export const getProfile = async (userId: string): Promise<Profile> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;

  return data;
};

export const updateProfile = async (userId: string, payload: UpdateProfilePayload) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;

  return data;
};

export const uploadAvatar = async (userId: string, file: File) => {
  const extensions: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };

  const extension = extensions[file.type];

  if (!extension) {
    throw new Error("Invalid file type");
  }

  if (file.size > 2 * 1024 * 1024) {
    throw new Error("File size exceeds 2MB");
  }

  const path = `${userId}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from("avatars").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);

  return data.publicUrl;
};
