import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCharacterToFavorites,
  getFavoriteCharacterIds,
  removeCharacterFromFavorites,
} from "../api/supabase/userCharacters";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const useCharacterFavorites = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const addFavorite = useMutation({
    mutationFn: (characterId: number) => {
      if (!user) throw new Error("You must be registered");
      return addCharacterToFavorites(user?.id, characterId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorite_characters", user?.id],
      });
      toast.success("Character added");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const removeFavorite = useMutation({
    mutationFn: (characterId: number) => {
      if (!user) throw new Error("You must be registered");
      return removeCharacterFromFavorites(user?.id, characterId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorite_characters", user?.id],
      });
      toast.success("Character removed");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { data: favoriteIds = [], isLoading } = useQuery({
    queryKey: ["favorite_characters", user?.id],
    queryFn: () => {
      if (!user) throw new Error("You must be registered");
      return getFavoriteCharacterIds(user?.id);
    },
    enabled: !!user,
    staleTime: 1000 * 5 * 60,
  });

  const isFavorite = (characterId: number) => favoriteIds.includes(characterId);

  const isPending = addFavorite.isPending || removeFavorite.isPending;

  return { addFavorite, removeFavorite, isLoading, isFavorite, isPending };
};

export default useCharacterFavorites;
