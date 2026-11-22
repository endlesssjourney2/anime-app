import { supabase } from "../../db/supabase";
import type { WatchStatus } from "../../types/UserAnime";

export const addAnimeToFavorites = async (userId: string, animeId: number) => {
  const { data, error: updateError } = await supabase
    .from("user_anime")
    .update({ is_favorite: true })
    .eq("user_id", userId)
    .eq("anime_id", animeId)
    .select("anime_id")
    .maybeSingle();

  if (updateError) throw updateError;

  if (data) return;

  const { error: insertError } = await supabase.from("user_anime").insert({
    user_id: userId,
    anime_id: animeId,
    is_favorite: true,
  });

  if (insertError) throw insertError;
};

export const removeAnimeFromFavorites = async (userId: string, animeId: number) => {
  const { error } = await supabase
    .from("user_anime")
    .update({
      is_favorite: false,
    })
    .eq("user_id", userId)
    .eq("anime_id", animeId);

  if (error) throw error;
};

export const getFavoriteAnimeIds = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_anime")
    .select("anime_id")
    .eq("user_id", userId)
    .eq("is_favorite", true);

  if (error) throw error;

  return data.map((i) => i.anime_id);
};

export const setAnimeWatchStatus = async (
  userId: string,
  animeId: number,
  status: WatchStatus | null,
) => {
  const { data, error: updateError } = await supabase
    .from("user_anime")
    .update({ watch_status: status })
    .eq("user_id", userId)
    .eq("anime_id", animeId)
    .select("anime_id")
    .maybeSingle();

  if (updateError) throw updateError;

  if (data) return;

  const { error: insertError } = await supabase.from("user_anime").insert({
    user_id: userId,
    anime_id: animeId,
    watch_status: status,
  });

  if (insertError) throw insertError;
};

export const getAnimeList = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_anime")
    .select("anime_id, watch_status")
    .eq("user_id", userId)
    .not("watch_status", "is", null);

  if (error) throw error;

  return data;
};
