import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { getAnimeList, setAnimeWatchStatus } from "../api/supabase/userAnime";
import type { WatchStatus } from "../types/UserAnime";
import { toast } from "sonner";

const useAnimeList = (status?: WatchStatus | null) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: animeList, isLoading } = useQuery({
    queryKey: ["anime-list", user?.id],
    queryFn: () => {
      if (!user) throw new Error("You must be registered");
      return getAnimeList(user?.id);
    },
    enabled: !!user,
    staleTime: 1000 * 5 * 60,
  });

  const setStatus = useMutation({
    mutationFn: ({
      animeId,
      status,
    }: {
      animeId: number;
      status: WatchStatus | null;
    }) => {
      if (!user) throw new Error("You must be registered");
      return setAnimeWatchStatus(user?.id, animeId, status);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["anime-list", user?.id],
      });
      toast.success("Status Updated");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const getWatchStatus = (animeId: number) => {
    return animeList?.find((anime) => anime.anime_id === animeId)?.watch_status ?? null;
  };

  const filteredAnimeList = animeList?.filter(
    (anime) => status === null || anime.watch_status === status,
  );

  return { animeList, setStatus, getWatchStatus, filteredAnimeList, isLoading };
};

export default useAnimeList;
