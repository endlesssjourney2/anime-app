import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import {
  addFavoriteAnime,
  getFavoriteAnimeIds,
  removeFavoriteAnime,
} from "../api/supabase/userAnime";
import { toast } from "sonner";
import {
  addFavoriteCharacter,
  getFavoriteCharactersIds,
  removeFavoriteCharacter,
} from "../api/supabase/userCharacters";

const useFavorites = () => {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  ////////////anime
  const addAnimeToFavorite = useMutation({
    mutationFn: (animeId: number) => {
      if (!user) throw new Error("You must be registered");
      return addFavoriteAnime(user?.id, animeId);
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

  const removeAnimeFromFavorite = useMutation({
    mutationFn: (animeId: number) => {
      if (!user) throw new Error("You must be registered");
      return removeFavoriteAnime(user?.id, animeId);
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

  const { data: favoritesAnimeIds = [], isLoading: favoriteAnimeLoading } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: () => {
      if (!user) throw new Error("You must be registered");
      return getFavoriteAnimeIds(user?.id);
    },
    enabled: !!user,
    staleTime: 1000 * 5 * 60,
  });

  const isAnimeFavorite = (animeId: number) => {
    return favoritesAnimeIds.includes(animeId);
  };
  ////////////

  ////////////character
  const addCharacterToFavorite = useMutation({
    mutationFn: (characterId: number) => {
      if (!user) throw new Error("You must be registered");
      return addFavoriteCharacter(user?.id, characterId);
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

  const removeCharacterFromFavorite = useMutation({
    mutationFn: (characterId: number) => {
      if (!user) throw new Error("You must be registered");
      return removeFavoriteCharacter(user?.id, characterId);
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

  const { data: favoritesCharactersIds = [], isLoading: favoriteCharactersLoading } =
    useQuery({
      queryKey: ["favorite_characters", user?.id],
      queryFn: () => {
        if (!user) throw new Error("You must be registered");
        return getFavoriteCharactersIds(user?.id);
      },
      enabled: !!user,
      staleTime: 1000 * 5 * 60,
    });

  const isCharacterFavorite = (characterId: number) => {
    return favoritesCharactersIds.includes(characterId);
  };

  ////////////

  return {
    addAnimeToFavorite,
    removeAnimeFromFavorite,
    isAnimeFavPending: addAnimeToFavorite.isPending || removeAnimeFromFavorite.isPending,
    favoriteAnimeLoading,
    isAnimeFavorite,
    ////////////
    addCharacterToFavorite,
    removeCharacterFromFavorite,
    isCharacterFavPending:
      addCharacterToFavorite.isPending || removeCharacterFromFavorite.isPending,
    favoriteCharactersLoading,
    isCharacterFavorite,
  };
};

export default useFavorites;
