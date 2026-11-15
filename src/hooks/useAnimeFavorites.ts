import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import {
  addAnimeToFavorites,
  getFavoriteAnimeIds,
  removeAnimeFromFavorites,
} from "../api/supabase/userAnime";
import { toast } from "sonner";

const useAnimeFavorites = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const addFavorite = useMutation({
    mutationFn: (animeId: number) => {
      if (!user) throw new Error("You must be registered");
      return addAnimeToFavorites(user?.id, animeId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", user?.id],
      });
      toast.success("Anime saved");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const removeFavorite = useMutation({
    mutationFn: (animeId: number) => {
      if (!user) throw new Error("You must be registered");
      return removeAnimeFromFavorites(user?.id, animeId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", user?.id],
      });
      toast.success("Anime removed");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { data: favoriteIds = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: () => {
      if (!user) throw new Error("You must be registered");
      return getFavoriteAnimeIds(user?.id);
    },
    enabled: !!user,
    staleTime: 1000 * 5 * 60,
  });

  const isFavorite = (animeId: number) => {
    return favoriteIds.includes(animeId);
  };

  const isPending = addFavorite.isPending || removeFavorite.isPending;

  return { addFavorite, removeFavorite, isLoading, isFavorite, isPending };
};

export default useAnimeFavorites;
