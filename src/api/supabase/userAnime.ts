import { supabase } from "../../db/supabase";

export const addFavoriteAnime = async (userId: string, animeId: number) => {
  const { error } = await supabase.from("user_anime").insert({
    user_id: userId,
    anime_id: animeId,
    is_favorite: true,
  });

  if (error) throw error;
};

export const removeFavoriteAnime = async (userId: string, animeId: number) => {
  const { error } = await supabase
    .from("user_anime")
    .delete()
    .eq("user_id", userId)
    .eq("anime_id", animeId);

  if (error) throw error;
};

export const getFavoriteAnimeIds = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_anime")
    .select("anime_id")
    .eq("user_id", userId);

  if (error) throw error;

  return data.map((i) => i.anime_id);
};
