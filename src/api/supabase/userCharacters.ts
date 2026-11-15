import { supabase } from "../../db/supabase";

export const addCharacterToFavorites = async (userId: string, characterId: number) => {
  const { error } = await supabase.from("user_characters").insert({
    user_id: userId,
    character_id: characterId,
  });

  if (error) throw error;
};

export const removeCharacterFromFavorites = async (
  userId: string,
  characterId: number,
) => {
  const { error } = await supabase
    .from("user_characters")
    .delete()
    .eq("user_id", userId)
    .eq("character_id", characterId);

  if (error) throw error;
};

export const getFavoriteCharacterIds = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_characters")
    .select("character_id")
    .eq("user_id", userId);

  if (error) throw error;

  return data.map((i) => i.character_id);
};
